// Session deletion & trash (Host side).
//
// Semantic difference from official "archive session":
//   - "Archive" hides the session from the list; log stays in place.
//   - "Delete" moves the entire session log directory into the OS Trash
//     (Windows Recycle Bin / macOS .Trash / XDG Trash), and removes the
//     session slot from the workspace ledger — no restore flag kept.
//
// Implementation notes:
//   1. Locate sessions via sessionPersistence service (list/inspect/locate/
//      readRaw) to get authoritative cwd, id, and physical log path.  locate()
//      is a zero-side-effect location hint; the JSONL backend resolves it to
//      the real file (session.jsonl[.zstd]).  We move its parent directory
//      (unique to the session; may contain future session artefacts).
//   2. Deletion order: move physical dir → remove workspace ledger slot →
//      remove from archive set → handle in-memory active session.  Any step
//      failure reports the error but tries to leave state intact; physical
//      move failure aborts to avoid "removed from list but log still there".
//   3. Active session: only "running" sessions refuse deletion (writing log
//      while moving files is unsafe).  Idle open sessions are allowed; we
//      cancel pending messages and wait for idle convergence before moving.
//   4. All side-effects are reversible via Fiber.
//   5. Trash inventory: in-memory Map + unique token, served via /dsh-zh/api/*
//      routes (compatible with deepseek-harness-zh_pro client).  Inventory is
//      lost on process restart (expected — contents managed by the OS).

import { dirname } from 'node:path'
import { rm } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { PKG } from './util.js'
import { log, warn } from './util.js'
import { trashItem, restoreItem } from './trash.js'
import type { HostContext } from './types.js'

const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/

export function isValidSessionId(id: string): boolean {
  return SESSION_ID_PATTERN.test(id)
}

export interface TrashEntry {
  sessionId: string
  title: string
  cwd: string
  originalPath: string
  trashLocation: string
  trashedAt: number
  token: string
}

function createSessionTrash() {
  const items = new Map<string, TrashEntry>()
  return {
    remember(entry: Omit<TrashEntry, 'token'>): TrashEntry {
      const token = randomUUID()
      const full: TrashEntry = { ...entry, token }
      items.set(entry.sessionId, full)
      return full
    },
    forget(sessionId: string): boolean {
      return items.delete(sessionId)
    },
    list(): TrashEntry[] {
      return [...items.values()].sort((a, b) => b.trashedAt - a.trashedAt)
    },
    get(sessionId: string): TrashEntry | undefined {
      return items.get(sessionId)
    },
  }
}

export const sessionTrash = createSessionTrash()

function isLoopbackHostname(hostname: string): boolean {
  if (hostname === 'localhost' || hostname === '[::1]') return true
  const parts = hostname.split('.')
  return parts.length === 4
    && parts[0] === '127'
    && parts.every(part => /^\d{1,3}$/.test(part) && Number(part) <= 255)
}

function isTrustedApiRequest(req: { headers: Record<string, string | string[] | undefined> }): boolean {
  const host = req.headers['host']
  if (typeof host !== 'string') return false
  let hostname: string
  try {
    hostname = new URL(`http://${host}`).hostname
  } catch {
    return false
  }
  if (!isLoopbackHostname(hostname)) return false
  if (req.headers['sec-fetch-site'] === 'cross-site') return false
  const origin = req.headers['origin']
  if (origin === undefined) return true
  if (Array.isArray(origin)) return false
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

interface DeleteDeps {
  sessions?: { get(id: string): unknown }
  agents?: {
    get(id: string): unknown
  }
  sessionPersistence?: {
    list?(): Promise<Array<{ id: string; cwd?: string }>>
    locate?(meta: { id: string; cwd?: string }): { kind: string; path: string } | undefined
    readRaw?(id: string): Promise<{ meta: { id: string; cwd?: string } } | undefined>
  }
  workspaceRegistry?: {
    list(): Array<{
      path: string
      sessionIds: readonly string[]
      detachSession(id: string): Promise<void>
      attachSession(id: string): Promise<void>
    }>
    archivedSessionIds?: readonly string[]
    archiveSession?(id: string): Promise<void>
  }
  storageDomain?: {
    get?(name: string): {
      global?: {
        get(): { archivedSessionIds?: readonly string[] } | undefined
        set(value: { archivedSessionIds: readonly string[] }): Promise<void>
      }
    } | undefined
  }
}

const IDLE_CONVERGE_TIMEOUT_MS = 3000

export async function unarchiveSession(
  deps: DeleteDeps,
  sessionId: string,
): Promise<{ ok: boolean; changed: boolean }> {
  const storage = deps.storageDomain
  if (storage === undefined || typeof storage.get !== 'function') return { ok: false, changed: false }
  let domain: { global?: unknown } | undefined
  try {
    domain = storage.get('workspace') as { global?: unknown } | undefined
  } catch {
    return { ok: false, changed: false }
  }
  if (domain === undefined || domain.global === undefined) return { ok: false, changed: false }
  const global = domain.global as {
    get(): { archivedSessionIds?: readonly string[] } | undefined
    set(value: { archivedSessionIds: readonly string[] }): Promise<void>
  }
  let state: { archivedSessionIds?: readonly string[] } | undefined
  try {
    state = typeof global.get === 'function' ? global.get() : undefined
  } catch {
    return { ok: false, changed: false }
  }
  if (state === undefined || state === null) return { ok: false, changed: false }
  const archived = state.archivedSessionIds ?? []
  const next = archived.filter(id => String(id) !== sessionId)
  const changed = next.length !== archived.length
  const nextState = { ...state, archivedSessionIds: next }
  if (changed) {
    try {
      await global.set(nextState as { archivedSessionIds: readonly string[] })
    } catch (error) {
      warn(`取消归档会话 ${sessionId} 失败: ${error instanceof Error ? error.message : String(error)}`)
      return { ok: false, changed: false }
    }
  }
  try {
    const registryAny = deps.workspaceRegistry as unknown as { state?: unknown }
    if (registryAny !== undefined && registryAny !== null && typeof registryAny === 'object') {
      ;(registryAny as { state: unknown }).state = nextState
    }
  } catch {
    // cache sync failure — session stays hidden until restart; persistence is updated
  }
  return { ok: true, changed }
}

async function resolveSessionTarget(
  deps: DeleteDeps,
  sessionId: string,
): Promise<{ header: { id: string; cwd?: string }; dir: string | null } | null> {
  const persistence = deps.sessionPersistence
  if (persistence === undefined) return null

  let header: { id: string; cwd?: string } | undefined
  if (typeof persistence.readRaw === 'function') {
    try {
      const artifact = await persistence.readRaw(sessionId)
      if (artifact !== undefined && artifact !== null && artifact.meta !== undefined) {
        header = artifact.meta
      }
    } catch {
      header = undefined
    }
  }
  if (header === undefined && typeof persistence.list === 'function') {
    try {
      const headers = await persistence.list()
      const match = headers.find(candidate => String(candidate.id) === sessionId)
      if (match !== undefined) header = match
    } catch {
      header = undefined
    }
  }
  if (header === undefined) return null

  let dir: string | null = null
  if (typeof persistence.locate === 'function') {
    try {
      const location = persistence.locate(header)
      if (location !== undefined && location !== null && typeof location.path === 'string' && location.path !== '') {
        const parent = dirname(location.path)
        if (parent !== '' && parent !== '.') dir = parent
      }
    } catch {
      dir = null
    }
  }
  return { header, dir }
}

export async function deleteSession(
  deps: DeleteDeps,
  sessionId: string,
  options: { trash: boolean; title?: string; currentSessionId?: string },
): Promise<{ ok: true; trashed: boolean; hint?: string } | { ok: false; code: string; message: string }> {
  const agent = deps.agents?.get(sessionId) as
    | { status?: string; cancel?: (cause: unknown, options?: unknown) => void; whenIdle?: () => Promise<unknown> }
    | undefined
  if (agent !== undefined && agent !== null && agent.status === 'running') {
    return { ok: false, code: 'session-busy', message: '该会话正在运行，请先停止或等待其结束。' }
  }
  if (agent !== undefined && agent !== null) {
    try {
      if (typeof agent.cancel === 'function') {
        agent.cancel({ kind: 'hook', reason: 'oh-my-dsh-ui 删除会话（移入回收站）' })
      }
      if (typeof agent.whenIdle === 'function') {
        await Promise.race([
          agent.whenIdle(),
          new Promise(resolve => setTimeout(resolve, IDLE_CONVERGE_TIMEOUT_MS)),
        ])
      }
    } catch {
      // convergence failure does not block deletion
    }
  }

  const target = await resolveSessionTarget(deps, sessionId)
  const cwd = target === null ? '' : (target.header as { cwd?: string }).cwd ?? ''
  const title = options.title !== undefined && options.title !== '' ? options.title : sessionId

  let trashLocation = ''
  let dirRemoved = false
  if (target !== null && target.dir !== null) {
    try {
      if (options.trash) {
        const result = await trashItem(target.dir)
        trashLocation = result.location
      } else {
        await rm(target.dir, { recursive: true, force: true })
        trashLocation = target.dir
      }
      dirRemoved = true
    } catch (error) {
      return {
        ok: false,
        code: 'trash-failed',
        message: `移入回收站失败：${error instanceof Error ? error.message : String(error)}`,
      }
    }
  }

  const registry = deps.workspaceRegistry
  if (registry !== undefined) {
    try {
      const workspaces = registry.list()
      for (const workspace of workspaces) {
        if (workspace.sessionIds.includes(sessionId)) {
          await workspace.detachSession(sessionId)
        }
      }
    } catch (error) {
      warn(`移除会话 ${sessionId} 的工作区账本槽位失败: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (dirRemoved && options.trash && target !== null && target.dir !== null) {
    sessionTrash.remember({
      sessionId,
      title,
      cwd,
      originalPath: target.dir,
      trashLocation,
      trashedAt: Date.now(),
    })
  }

  const liveAfter = deps.sessions?.get(sessionId)
  if (liveAfter !== undefined && registry !== undefined
    && typeof registry.archiveSession === 'function') {
    try {
      await registry.archiveSession(sessionId)
    } catch (error) {
      warn(`归档已删除的驻留会话 ${sessionId} 失败: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return {
    ok: true,
    trashed: dirRemoved && options.trash,
    ...(target !== null && target.dir === null
      ? { hint: '该会话日志无法定位，已从列表移除（后端不支持回收）。' }
      : {}),
  }
}

export async function restoreSession(
  deps: DeleteDeps,
  entry: TrashEntry,
): Promise<{ ok: true } | { ok: false; code: string; message: string }> {
  try {
    await restoreItem(entry.trashLocation, entry.originalPath)
  } catch (error) {
    return { ok: false, code: 'restore-failed', message: `恢复失败：${error instanceof Error ? error.message : String(error)}` }
  }
  const registry = deps.workspaceRegistry
  if (registry !== undefined) {
    try {
      const workspaces = registry.list()
      for (const workspace of workspaces) {
        if (workspace.path === entry.cwd) {
          if (!workspace.sessionIds.includes(entry.sessionId)) {
            await workspace.attachSession(entry.sessionId)
          }
          break
        }
      }
    } catch (error) {
      warn(`恢复会话 ${entry.sessionId} 后重新挂载工作区失败: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  await unarchiveSession(deps, entry.sessionId)
  sessionTrash.forget(entry.sessionId)
  return { ok: true }
}

// ---------- HTTP route ----------

interface RouteRequest {
  method?: string
  url?: string
  headers: Record<string, string | string[] | undefined>
  [Symbol.asyncIterator](): AsyncIterator<string | Uint8Array>
}

interface RouteResponse {
  statusCode: number
  writeHead(status: number, headers?: Record<string, string>): void
  end(body?: string | Uint8Array): void
}

async function readJsonBody(req: RouteRequest): Promise<unknown> {
  const chunks: Uint8Array[] = []
  let total = 0
  for await (const chunk of req) {
    const buffer = typeof chunk === 'string' ? Buffer.from(chunk) : Buffer.from(chunk)
    total += buffer.length
    if (total > 1 << 20) throw new Error('request body too large')
    chunks.push(buffer)
  }
  const text = Buffer.concat(chunks).toString('utf8')
  if (text.trim() === '') return {}
  try {
    return JSON.parse(text) as unknown
  } catch {
    throw new Error('request body is not valid JSON')
  }
}

function writeJson(res: RouteResponse, status: number, body: unknown): void {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(body))
}

/**
 * Install /dsh-zh/api routes: session delete / trash list / restore.
 * Route prefix kept as /dsh-zh/api/* for client compatibility with
 * deepseek-harness-zh_pro and other compatible callers.
 */
export function installSessionDeleteRoute(ctx: HostContext, deps: () => DeleteDeps): void {
  const install = function (): boolean {
    const webServer = ctx.get('webServer')
    if (webServer === undefined || webServer === null || typeof (webServer as { register?: unknown })?.register !== 'function') {
      return false
    }
    const ws = webServer as { register(handler: unknown): () => void }
    const handler = async (req: RouteRequest, res: RouteResponse): Promise<void> => {
      if (!isTrustedApiRequest(req)) {
        writeJson(res, 403, { ok: false, error: { code: 'forbidden', message: 'forbidden' } })
        return
      }
      if (req.method !== 'POST') {
        writeJson(res, 405, { ok: false, error: { code: 'method-error', message: 'method not allowed' } })
        return
      }
      let payload: Record<string, unknown>
      try {
        const body = await readJsonBody(req)
        if (body === null || typeof body !== 'object' || Array.isArray(body)) {
          writeJson(res, 400, { ok: false, error: { code: 'bad-request', message: 'payload must be a JSON object' } })
          return
        }
        payload = body as Record<string, unknown>
      } catch (error) {
        writeJson(res, 400, { ok: false, error: { code: 'bad-request', message: error instanceof Error ? error.message : String(error) } })
        return
      }

      const url = new URL(req.url ?? '/', 'http://dsh.internal')
      const pathname = url.pathname
      try {
        if (pathname === '/dsh-zh/api/session.unarchive') {
          const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId : ''
          if (!isValidSessionId(sessionId)) {
            writeJson(res, 400, { ok: false, error: { code: 'bad-request', message: 'invalid sessionId' } })
            return
          }
          const result = await unarchiveSession(deps(), sessionId)
          if (!result.ok) {
            writeJson(res, 400, { ok: false, error: { code: 'unarchive-failed', message: 'unarchive failed' } })
            return
          }
          writeJson(res, 200, { ok: true, value: { unarchived: true, changed: result.changed } })
          return
        }
        if (pathname === '/dsh-zh/api/session.delete') {
          const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId : ''
          if (!isValidSessionId(sessionId)) {
            writeJson(res, 400, { ok: false, error: { code: 'bad-request', message: 'invalid sessionId' } })
            return
          }
          const title = typeof payload.title === 'string' ? payload.title : ''
          const currentSessionId = typeof payload.currentSessionId === 'string' ? payload.currentSessionId : ''
          const result = await deleteSession(deps(), sessionId, {
            trash: true,
            title,
            ...(currentSessionId === '' ? {} : { currentSessionId }),
          })
          if (!result.ok) {
            writeJson(res, 400, { ok: false, error: { code: result.code, message: result.message } })
            return
          }
          writeJson(res, 200, { ok: true, value: result })
          return
        }
        if (pathname === '/dsh-zh/api/trash.list') {
          writeJson(res, 200, { ok: true, value: { items: sessionTrash.list() } })
          return
        }
        if (pathname === '/dsh-zh/api/trash.restore') {
          const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId : ''
          const token = typeof payload.token === 'string' ? payload.token : ''
          if (!isValidSessionId(sessionId) || token === '') {
            writeJson(res, 400, { ok: false, error: { code: 'bad-request', message: 'invalid sessionId or token' } })
            return
          }
          const entry = sessionTrash.get(sessionId)
          if (entry === undefined || entry.token !== token) {
            writeJson(res, 404, { ok: false, error: { code: 'not-found', message: 'trash entry not found' } })
            return
          }
          const result = await restoreSession(deps(), entry)
          if (!result.ok) {
            writeJson(res, 400, { ok: false, error: { code: result.code, message: result.message } })
            return
          }
          writeJson(res, 200, { ok: true, value: { restored: true } })
          return
        }
        writeJson(res, 404, { ok: false, error: { code: 'not-found', message: 'unknown method' } })
      } catch (error) {
        writeJson(res, 500, { ok: false, error: { code: 'internal', message: error instanceof Error ? error.message : String(error) } })
      }
    }

    const disposer = ws.register({ kind: 'prefix', path: '/dsh-zh/api', handler })
    ctx.effect(() => disposer, 'oh-my-dsh-ui: /dsh-zh/api routes')
    log('「删除会话（回收站）」路由已就绪')
    return true
  }

  if (!install()) {
    const retryService = function (name: string) {
      if (name === 'webServer') {
        if (install() && typeof ctx.off === 'function') ctx.off('internal/service', retryService)
      }
    }
    ctx.on('internal/service', retryService)
    ctx.effect(function () {
      return function () {
        if (typeof ctx.off === 'function') ctx.off('internal/service', retryService)
      }
    }, 'oh-my-dsh-ui: session delete route retry')
  }
}
