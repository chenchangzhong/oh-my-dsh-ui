// Session deletion & trash (Host side).
//
// Semantic difference from official "archive session":
//   - "Archive" hides the session from the list; log stays in place.
//   - "Delete" moves the entire session log directory into the OS Trash
//     (Windows Recycle Bin / macOS .Trash / XDG Trash), and removes the
//     session slot from the workspace ledger — no restore flag kept.
//
// Implementation notes:
//   1. Target resolution prefers the authoritative header from the upstream
//      service face, and stays compatible across the contract change:
//        - 0.1.2-rc.1 exposes list / readRaw / locate; locate() is a
//          zero-side-effect hint and the JSONL backend resolves it to the real
//          file (session.jsonl[.zstd]); we move its parent directory (unique to
//          the session; may contain future session artefacts).
//        - 0.1.3-alpha.1 onwards the public face is handle-based
//          (create/open/stat/list): readRaw / locate are no longer public and
//          list() returns { header, ... } snapshots.  The header then comes
//          from stat(), and the physical directory is scanned from the DSH
//          session root layout `<root>/<project dir>/<session id>/`
//          (locateSessionDirById, exact directory-name match — the upstream
//          encoding algorithm is not copied).
//      When the target cannot be located the delete ABORTS (loud error, no
//      data touched).  It never degrades to a "logical delete": detaching the
//      ledger slot while the log stays in place leaves the session in the
//      list / "ungrouped" bucket.
//   2. Deletion order: move physical dir (must succeed, abort otherwise) →
//      remove workspace ledger slot → register the trash inventory → hide an
//      in-memory (live) session via the official archive set.  Any step
//      failure leaves state intact; there is never a state where the list
//      dropped the session while the log is still in place.
//   3. Active session: only "running" sessions refuse deletion (writing log
//      while moving files is unsafe).  Idle open sessions are allowed; we
//      cancel pending messages and wait for idle convergence before moving.
//   4. All side-effects are reversible via Fiber.
//   5. Trash inventory: in-memory Map + unique token, served via /dsh-zh/api/*
//      routes (compatible with deepseek-harness-zh_pro client).  Inventory is
//      lost on process restart (expected — contents managed by the OS).

import { dirname, join } from 'node:path'
import { homedir } from 'node:os'
import { readdir, rm, stat as fsStat } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { PKG } from './util.js'
import { log, warn } from './util.js'
import { trashItem, restoreItem } from './trash.js'
import {
  ensureFreshScan, getServiceMonitorSnapshot, openServiceOwnerDirectory, probeTargets, resolveServiceOwner,
} from './service-monitor.js'
import type { HostContext } from './types.js'

const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/

/** Backend kinds confirmed to be a recyclable JSONL log directory. */
const CONFIRMED_JSONL_KINDS = new Set(['jsonl', 'jsonl-zstd'])

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
  if (hostname === 'localhost' || hostname === '[::1]' || hostname === '127.0.0.1') return true
  return false  // 不再信任 127.x.x.x
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
  const secFetchSite = req.headers['sec-fetch-site']
  if (Array.isArray(secFetchSite)) return false
  if (secFetchSite === 'cross-site') return false
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
    list?(): Promise<Array<{ id: string; cwd?: string } | { header?: { id: string; cwd?: string } }>>
    /** 0.1.2-rc.1 public face: zero-side-effect physical location hint. */
    locate?(meta: { id: string; cwd?: string }): { kind: string; path: string } | undefined
    /** 0.1.2-rc.1 public face: read the artifact (carries the header meta). */
    readRaw?(id: string): Promise<{ meta: { id: string; cwd?: string } } | undefined>
    /**
     * DSH 0.1.3-alpha.1+ public face: readRaw / locate are no longer public and
     * the snapshot returned here carries the header instead of a path.
     */
    stat?(id: string): Promise<
      { header?: { id: string; cwd?: string }; meta?: { id: string; cwd?: string } } | undefined
    >
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
    /**
     * 上游 2026-09-12 起公开：registry 串行链上的官方取消归档（全量状态写入 +
     * 内存缓存同步）。存在时必须优先于 storageDomain 直写——后者绕过 registry
     * 串行器，仅作旧版回退。
     */
    unarchiveSession?(id: string): Promise<void>
  }
  storageDomain?: {
    get?(name: string): {
      global?: {
        get(): { archivedSessionIds?: readonly string[] } | undefined
        /**
         * 整体替换写入（DSH DomainGlobal.set 无合并）：value 必须是回读到的
         * 全量 state 加字段覆盖——只写单字段会丢掉 workspace 域 schema 必填的
         * initialized/workspaceIds，下次启动 domain 打开时校验失败，
         * workspaceRegistry 整体挂载失败、dsh 无法启动。
         */
        set(value: { archivedSessionIds: readonly string[] }): Promise<void>
      }
    } | undefined
  }
}

const IDLE_CONVERGE_TIMEOUT_MS = 3000

/**
 * Deleted-session ids (process memory): deleteSession records every successful
 * delete, restoreSession removes it. The archive view fetches this set to filter
 * sessions that were deleted but still have an in-memory agent — upstream exposes
 * no API to unload a live agent, so the delete flow hides such sessions through
 * the official archive set, and without this reverse filter they would come back
 * in the archive view (measured 2026-09 regression).
 */
const deletedSessionIds = new Set<string>()

/** Ids that count as deleted: the explicit set ∪ the trash inventory. */
function collectDeletedSessionIds(): string[] {
  const ids = new Set(deletedSessionIds)
  for (const item of sessionTrash.list()) ids.add(item.sessionId)
  return [...ids]
}

/**
 * Self-heal after a hot reload (which drops this module's memory): any archived
 * id whose log directory no longer exists was deleted, so record it again. Keeps
 * the archive view honest across reloads.
 */
async function pruneDeletedSessionIds(deps: DeleteDeps): Promise<void> {
  let archived: readonly string[] = []
  try {
    const domain = deps.storageDomain?.get?.('workspace') as
      | { global?: { get?(): { archivedSessionIds?: readonly string[] } | undefined } }
      | undefined
    archived = domain?.global?.get?.()?.archivedSessionIds ?? []
  } catch {
    return
  }
  for (const raw of archived) {
    const sessionId = String(raw)
    if (deletedSessionIds.has(sessionId)) continue
    if (sessionTrash.get(sessionId) !== undefined) continue
    if (await locateSessionDirById(sessionId) === null) deletedSessionIds.add(sessionId)
  }
}

let unarchiveFallbackWarned = false

/**
 * 把会话从工作区归档集合移除（取消归档）。
 *
 * 优先走上游公开 API：workspaceRegistry.unarchiveSession（上游 2026-09-12 起
 * 公开）在 registry 串行链上做全量状态写入并同步内存缓存，即官方取消归档语义。
 * 该 API 缺席（旧版 dsh）才回退 storageDomain 直写——此时 registry 没有公开
 * unarchive/事务写 API，只能绕过串行器直写持久层；且 global.set 是整体替换
 * （无合并）：必须回写「回读到的全量 state + archivedSessionIds 覆盖」，只写
 * 单字段会把 workspace 域 schema 必填的 initialized/workspaceIds 冲掉，下次
 * 启动 domain 打开校验失败、整个 workspaceRegistry 挂载失败、dsh 无法启动。
 *
 * 回退路径的写入无事务保障，但 global.set 排队在域的单一 FIFO 写链上：set
 * resolve 时所有先前写入均已完成，随后的同步 get 读到的是链上权威真值。因此
 * 写后重读一次，目标 id 仍在则基于当时的全量真值重放一次覆盖写；无法覆盖的
 * 仅剩「排队更晚的官方 archiveSession 落地覆盖本写」——那属于归档请求后到、
 * 归档生效，语义本应如此。
 */
export async function unarchiveSession(
  deps: DeleteDeps,
  sessionId: string,
): Promise<{ ok: boolean; changed: boolean }> {
  const registry = deps.workspaceRegistry
  if (registry !== undefined && typeof registry.unarchiveSession === 'function') {
    try {
      const wasArchived = Array.isArray(registry.archivedSessionIds)
        ? registry.archivedSessionIds.includes(sessionId)
        : true
      await registry.unarchiveSession(sessionId)
      return { ok: true, changed: wasArchived }
    } catch (error) {
      warn(`取消归档会话 ${sessionId} 失败: ${error instanceof Error ? error.message : String(error)}`)
      return { ok: false, changed: false }
    }
  }
  const storage = deps.storageDomain
  if (storage === undefined || typeof storage.get !== 'function') return { ok: false, changed: false }
  if (!unarchiveFallbackWarned) {
    unarchiveFallbackWarned = true
    warn('workspaceRegistry 未公开 unarchive API，回退 storageDomain 直写归档集合（整体替换写入，保全量 state）')
  }
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
  const removeFrom = (ids: readonly string[]): readonly string[] | null => {
    const next = ids.filter(id => String(id) !== sessionId)
    return next.length !== ids.length ? next : null
  }
  const first = removeFrom(archived)
  if (first === null) return { ok: true, changed: false }
  try {
    await global.set({ ...state, archivedSessionIds: first })
    // 域 FIFO 写链上串行：resolve 后重读即权威真值。目标 id 仍在（先前并发
    // 的 archiveSession 已落地、被本写覆盖）则基于当时的全量真值重放一次覆盖写。
    const rereadState = global.get()
    const reread = rereadState?.archivedSessionIds
    if (rereadState !== undefined && reread !== undefined && reread.some(id => String(id) === sessionId)) {
      const retry = removeFrom(reread)
      if (retry !== null) await global.set({ ...rereadState, archivedSessionIds: retry })
    }
  } catch (error) {
    warn(`取消归档会话 ${sessionId} 失败: ${error instanceof Error ? error.message : String(error)}`)
    return { ok: false, changed: false }
  }
  return { ok: true, changed: true }
}

/**
 * DSH session store root: `DSH_HOME/sessions` (default `~/.dsh/sessions`),
 * matching the `dshHomePath('sessions')` deployment convention.  Since
 * 0.1.3-alpha.1 the public service face no longer exposes physical paths, so
 * recycling relies on scanning this root.
 */
function sessionRootDir(): string {
  const home = process.env.DSH_HOME !== undefined && process.env.DSH_HOME !== ''
    ? process.env.DSH_HOME
    : join(homedir(), '.dsh')
  return join(home, 'sessions')
}

/**
 * Locate a session's physical log directory by scanning
 * `<root>/<project dir>/<session id>/`.  Session ids are safe characters
 * (`[A-Za-z0-9_-]`, so the encoded directory name equals the id) while project
 * directory names use a DSH-private encoding — hence enumerate the project
 * directories and match the id segment exactly, which stays immune to changes
 * in that layout algorithm.  Returns null when no such directory exists.
 */
async function locateSessionDirById(sessionId: string): Promise<string | null> {
  const root = sessionRootDir()
  let projects: string[] = []
  try {
    const entries = await readdir(root, { withFileTypes: true })
    projects = entries.filter(entry => entry.isDirectory()).map(entry => entry.name)
  } catch {
    return null // Root missing (no sessions) or unreadable: not locatable.
  }
  for (const project of projects) {
    const candidate = join(root, project, sessionId)
    try {
      const info = await fsStat(candidate)
      if (info.isDirectory()) return candidate
    } catch {
      // No such session under this project directory; keep looking.
    }
  }
  return null
}

/**
 * Resolve a session's physical log directory (absolute path) and display info.
 * Returns null when the session cannot be located at all (backend exposes no
 * location and/or the log never landed on disk).
 *
 * Contract evolution: 0.1.2-rc.1 exposes `readRaw`/`locate` (locate yields the
 * physical path); 0.1.3-alpha.1 onwards is handle-based (create/open/stat/list)
 * and no longer exposes a path, so the directory is recovered by
 * {@link locateSessionDirById}.
 */
async function resolveSessionTarget(
  deps: DeleteDeps,
  sessionId: string,
): Promise<{ header: { id: string; cwd?: string }; dir: string | null; kind: string | null } | null> {
  const persistence = deps.sessionPersistence
  if (persistence === undefined) return null

  let header: { id: string; cwd?: string } | undefined
  // 1) Legacy contract: readRaw returns the artifact carrying the header —
  //    cheaper than scanning every session.
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
  // 2) New contract: stat returns a snapshot carrying the header, without
  //    reading the full log.
  if (header === undefined && typeof persistence.stat === 'function') {
    try {
      const snapshot = await persistence.stat(sessionId)
      if (snapshot !== undefined && snapshot !== null && snapshot.header !== undefined) {
        header = snapshot.header
      }
    } catch {
      header = undefined
    }
  }
  // 3) Last resort: scan list() headers (both old `{id,cwd}` arrays and new
  //    `{header}` snapshots).
  if (header === undefined && typeof persistence.list === 'function') {
    try {
      const candidates = await persistence.list()
      const match = candidates.find(candidate => {
        const candidateId = (candidate as { id?: string }).id
          ?? (candidate as { header?: { id?: string } }).header?.id
        return String(candidateId) === sessionId
      })
      if (match !== undefined) {
        header = (match as { header?: { id: string; cwd?: string } }).header
          ?? (match as { id: string; cwd?: string })
      }
    } catch {
      header = undefined
    }
  }
  if (header === undefined) return null

  // 4) Legacy contract: locate() yields the physical path, whose parent is the
  //    session-private directory.  The reported kind doubles as the recyclable
  //    backend signal.
  let dir: string | null = null
  let kind: string | null = null
  if (typeof persistence.locate === 'function') {
    try {
      const location = persistence.locate(header)
      if (location !== undefined && location !== null && typeof location.kind === 'string') {
        kind = location.kind
        if (CONFIRMED_JSONL_KINDS.has(location.kind) && typeof location.path === 'string' && location.path !== '') {
          const parent = dirname(location.path)
          if (parent !== '' && parent !== '.') dir = parent
        }
      }
    } catch {
      dir = null
    }
  }
  // 5) New contract: no locate (or an unconfirmed kind) — scan the layout.
  //    A confirmed non-JSONL backend is never scanned.
  if (dir === null && kind === null) {
    dir = await locateSessionDirById(sessionId)
    if (dir !== null) kind = 'jsonl'
  }
  return { header, dir, kind }
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

  // Locate the physical directory. When the target cannot be resolved (no
  // header from the service face, or the layout scan finds nothing) the delete
  // ABORTS rather than degrading to a "logical delete": detaching the ledger
  // first would drop the session into the official "ungrouped" bucket while
  // its log stays in place (measured on DSH 0.1.3-alpha.1, where the
  // handle-based sessionPersistence face dropped locate/readRaw).
  const target = await resolveSessionTarget(deps, sessionId)
  if (target === null || target.dir === null || target.kind === null
    || !CONFIRMED_JSONL_KINDS.has(target.kind)) {
    // 幂等完成：会话仍驻留内存而日志目录已不在磁盘 = 此前删除已把日志移入
    // 回收站（或日志从未落盘），本次属重复删除。重新确保官方归档集合隐藏
    // （可能被「取消归档」解除过）并记入已删除集合，返回成功——中止会留下
    // 「查看得到却删不掉」的僵尸行（2026-09-25 实测）。
    //
    // 但**确认不可回收的后端**（kind 已知且非 JSONL）不算「日志不在磁盘」：
    // 它的日志仍在原地，隐藏它等于本函数开头明令禁止的「逻辑删除」，且没有
    // 回收站恢复通道，会话会永久卡在「看不见也恢复不了」。上游把两者合并进
    // 同一条件（与本段注释自相矛盾），这里把后端判据单独排除，其余错误码与
    // 中止语义保持原样。
    const logAbsent = target === null
      || target.kind === null
      || CONFIRMED_JSONL_KINDS.has(target.kind)
    const liveStill = deps.sessions?.get(sessionId)
    if (logAbsent && liveStill !== undefined && liveStill !== null) {
      const registryForHide = deps.workspaceRegistry
      if (registryForHide !== undefined && typeof registryForHide.archiveSession === 'function') {
        try {
          await registryForHide.archiveSession(sessionId)
        } catch (error) {
          warn(`重新归档已删除的驻留会话 ${sessionId} 失败: ${error instanceof Error ? error.message : String(error)}`)
        }
      }
      deletedSessionIds.add(sessionId)
      return { ok: true, trashed: false, hint: '会话日志已在此前删除，已将其从会话列表隐藏。' }
    }
    if (target === null) {
      warn(`删除会话 ${sessionId} 中止：无法定位会话日志目录`)
      return {
        ok: false,
        code: 'locate-failed',
        message: '无法定位会话日志目录，已中止删除（未改动任何数据）。',
      }
    }
    warn(`删除会话 ${sessionId} 中止：后端类型不支持移入回收站（kind=${String(target.kind)}）`)
    return {
      ok: false,
      code: 'unsupported-backend',
      message: '该会话的日志后端不支持移入系统回收站，已中止删除（未改动任何数据）。',
    }
  }
  const cwd = target.header.cwd ?? ''
  const title = options.title !== undefined && options.title !== '' ? options.title : sessionId

  let trashLocation = ''
  try {
    if (options.trash) {
      const result = await trashItem(target.dir)
      trashLocation = result.location
    } else {
      await rm(target.dir, { recursive: true, force: true })
      trashLocation = target.dir
    }
  } catch (error) {
    return {
      ok: false,
      code: 'trash-failed',
      message: `移入回收站失败：${error instanceof Error ? error.message : String(error)}`,
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

  if (options.trash) {
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

  deletedSessionIds.add(sessionId)
  return { ok: true, trashed: options.trash }
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
  // 重新挂回工作区：找到 cwd 匹配的 workspace（恢复后日志已回原位）。
  const registry = deps.workspaceRegistry
  let reattachFailed = registry === undefined
  if (registry !== undefined) {
    try {
      const workspaces = registry.list()
      const workspace = workspaces.find(candidate => candidate.path === entry.cwd)
      if (workspace === undefined) {
        reattachFailed = true
      } else if (!workspace.sessionIds.includes(entry.sessionId)) {
        await workspace.attachSession(entry.sessionId)
      }
    } catch (error) {
      reattachFailed = true
      warn(`恢复会话 ${entry.sessionId} 后重新挂载工作区失败: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  // 删除驻留内存的会话时会把它加入归档集合（隐藏）；恢复后取消归档。
  // attach 已失败时跳过：失败路径不动账本（归档集合保留、条目可重试），
  // 避免「目录已恢复 + 归档集合被顺手清理」的部分副作用泄漏。
  const unarchive = reattachFailed
    ? { ok: false, changed: false }
    : await unarchiveSession(deps, entry.sessionId)
  if (reattachFailed || !unarchive.ok) {
    return {
      ok: false,
      code: 'reattach-failed',
      message: '目录已恢复到原位置，但重新挂载工作区/取消归档未完成；请重试恢复或在列表刷新后检查',
    }
  }
  sessionTrash.forget(entry.sessionId)
  deletedSessionIds.delete(entry.sessionId)
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

/** Panel refresh interval (seconds → ms, capped at 300s). 0 = always rescan. */
function parseScanMaxAgeMs(raw: unknown): number {
  const seconds = typeof raw === 'number' && Number.isFinite(raw) ? Math.round(raw) : Number.parseInt(String(raw ?? ''), 10)
  if (!Number.isFinite(seconds) || seconds <= 0) return 0
  return Math.min(300, seconds) * 1000
}

/**
 * Service-monitor snapshot route: fetching checks the scan cache (a rescan runs
 * only once the panel's refresh interval has elapsed); a POST body additionally
 * carries the user-defined targets, which are probed in parallel with the scan.
 * @returns whether the route handled the request.
 */
async function handleServiceMonitorRoutes(
  req: RouteRequest,
  res: RouteResponse,
  pathname: string,
  payload: Record<string, unknown>,
  url: URL,
): Promise<boolean> {
  if (pathname !== '/dsh-zh/api/service-monitor') return false
  const maxAgeMs = req.method === 'GET'
    ? parseScanMaxAgeMs(url.searchParams.get('intervalSec'))
    : parseScanMaxAgeMs(payload.intervalSec)
  const [, probeResults] = await Promise.all([
    ensureFreshScan(process.platform, maxAgeMs),
    req.method === 'GET' ? Promise.resolve([]) : probeTargets(payload.targets),
  ])
  writeJson(res, 200, {
    ok: true,
    value: Object.assign(getServiceMonitorSnapshot(), { targets: probeResults as unknown[] }),
  })
  return true
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
      warn('Session delete route registration failed: webServer service unavailable')
      return false
    }
    const ws = webServer as { register(handler: unknown): () => void }
    const handler = async (req: RouteRequest, res: RouteResponse): Promise<void> => {
      if (!isTrustedApiRequest(req)) {
        writeJson(res, 403, { ok: false, error: { code: 'forbidden', message: 'forbidden' } })
        return
      }
      const url = new URL(req.url ?? '/', 'http://dsh.internal')
      const pathname = url.pathname
      // GET only serves the service-monitor snapshot: fetching it checks the scan
      // cache, so a rescan happens only once the panel's refresh interval
      // (carried as ?intervalSec=) has elapsed.
      if (req.method === 'GET') {
        if (await handleServiceMonitorRoutes(req, res, pathname, {}, url)) return
        writeJson(res, 404, { ok: false, error: { code: 'not-found', message: 'unknown method' } })
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

      try {
        if (await handleServiceMonitorRoutes(req, res, pathname, payload, url)) return
        if (pathname === '/dsh-zh/api/service-monitor/resolve') {
          // Resolve the listening process for one endpoint (hover-triggered),
          // cached per endpoint; the scan sweep drops the cache once the service
          // stops listening. A non-local target yields value.owner = null.
          try {
            const owner = await resolveServiceOwner(process.platform, payload.address, payload.port)
            writeJson(res, 200, { ok: true, value: { owner } })
          } catch {
            writeJson(res, 200, { ok: true, value: { owner: null } })
          }
          return
        }
        if (pathname === '/dsh-zh/api/service-monitor/open') {
          // Reveal the listening process's directory in the file manager: the host
          // reads the endpoint's ALREADY-CACHED owner; a request-supplied path is
          // never accepted.
          try {
            const opened = await openServiceOwnerDirectory(process.platform, payload.address, payload.port)
            if (opened === null) {
              writeJson(res, 404, { ok: false, error: { code: 'owner-unavailable', message: '未定位到监听进程目录' } })
              return
            }
            writeJson(res, 200, { ok: true, value: opened })
          } catch (error) {
            warn(`打开服务目录失败: ${error instanceof Error ? error.message : String(error)}`)
            writeJson(res, 500, { ok: false, error: { code: 'open-failed', message: '打开服务目录失败，请稍后重试。' } })
          }
          return
        }
        if (pathname === '/dsh-zh/api/session.deleted') {
          // Deleted-session set (used by the archive view to filter). Self-heals
          // first (a hot reload drops the in-memory set), then merges the trash list.
          await pruneDeletedSessionIds(deps())
          writeJson(res, 200, { ok: true, value: { ids: collectDeletedSessionIds() } })
          return
        }
        if (pathname === '/dsh-zh/api/session.unarchive') {
          const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId : ''
          if (!isValidSessionId(sessionId)) {
            writeJson(res, 400, { ok: false, error: { code: 'bad-request', message: 'invalid sessionId' } })
            return
          }
          const result = await unarchiveSession(deps(), sessionId)
          if (!result.ok) {
            // 消息由客户端直接显示（「取消归档失败：{message}」），故与本文件
            // 其余路由一样用面向用户的中文，而非英文内部串。
            writeJson(res, 400, { ok: false, error: { code: 'unarchive-failed', message: '工作区服务未完成该写入' } })
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
          const title = typeof payload.title === 'string' ? payload.title.slice(0, 256) : ''
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
          writeJson(res, 200, { ok: true, value: { ...result, deletedIds: collectDeletedSessionIds() } })
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
