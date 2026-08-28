/**
 * Auto-archive: automatically archives sessions inactive for more than N days
 * when the New Session view opens (blank session selected).
 *
 * ADAPTED from deepseek-harness-zh_pro's auto-archive.ts:
 *   - Source: used ctx.inject(['settingsScope'], ...) + ctx.get() for services
 *   - Target: uses zhCtx.settingsScope / zhCtx.promptScope directly
 *   - Source: used internal/service Cordis event for retry
 *   - Target: uses scope.subscribe() for service readiness
 *
 * Host dependencies:
 *   - ctx.sessions.list.subscribe() / getSnapshot()
 *   - ctx.workspaces.list.subscribe() / getSnapshot()
 *   - ctx.workspaces.archiveSession(id)
 *   - promptScope (for zhAutoArchiveDays)
 */
import type { ZhApplyContext } from './apply.ts'

const ZH_AUTO_ARCHIVE_DAYS_DEFAULT = 7

export function installAutoArchive(zhCtx: ZhApplyContext): () => void {
  const { ctx, promptScope } = zhCtx

  // ── State ──────────────────────────────────────────────────────────────────
  let autoArchiveState = { days: ZH_AUTO_ARCHIVE_DAYS_DEFAULT, ready: false }
  let archiving = false
  let toastTimer: ReturnType<typeof setTimeout> | null = null
  let toastEl: HTMLElement | null = null
  let toastStyleEl: HTMLStyleElement | null = null

  // ── Read archive days from prompt scope ───────────────────────────────────
  const readArchiveDays = (): void => {
    try {
      const snap = promptScope.getSnapshot()
      if (snap && typeof snap === 'object' && snap.status === 'ready' && snap.value !== null) {
        autoArchiveState.ready = true
        const n = (snap.value as Record<string, unknown>).zhAutoArchiveDays
        autoArchiveState.days = typeof n === 'number' ? n : ZH_AUTO_ARCHIVE_DAYS_DEFAULT
      } else {
        autoArchiveState.ready = false
      }
    } catch {
      autoArchiveState.ready = false
    }
  }

  // ── Toast helpers ──────────────────────────────────────────────────────────
  const ensureToastStyle = (): void => {
    if (toastStyleEl && document.head?.contains(toastStyleEl)) return
    toastStyleEl = document.createElement('style')
    toastStyleEl.setAttribute('data-dsh-zh', 'toast')
    toastStyleEl.textContent = [
      '.dsh-zh-toast{position:fixed;top:120px;left:50%;z-index:1100;pointer-events:none;',
      'display:flex;align-items:center;gap:10px;max-width:min(560px,calc(100vw - 48px));',
      'padding:12px 16px;border-radius:14px;',
      'background:var(--dsw-alias-button-contrast-fill);',
      'color:var(--dsw-alias-label-primary-inverted);font-size:14px;line-height:22px;',
      'box-shadow:var(--dsw-shadow-lv3);transform:translateX(-50%);',
      'animation:dsh-zh-toast-in 160ms ease-out,dsh-zh-toast-fade 1000ms ease 3000ms forwards}',
      '@keyframes dsh-zh-toast-in{from{opacity:0;transform:translate(-50%,-6px)}to{opacity:1;transform:translate(-50%,0)}}',
      '@keyframes dsh-zh-toast-fade{to{opacity:0}}',
    ].join('')
    document.head?.appendChild(toastStyleEl)
  }

  const showArchiveToast = (count: number): void => {
    try {
      if (typeof document === 'undefined' || document.body === null) return
      const locale = ctx.locale
      const isZh = locale && typeof locale.getLocale === 'function' && locale.getLocale().active === 'zh'
      const dict = isZh ? { autoArchiveNotified: '有 {n} 个会话已归档' } : { autoArchiveNotified: '{n} session(s) archived' }
      const text = dict.autoArchiveNotified.replace('{n}', String(count))
      if (toastTimer !== null) { clearTimeout(toastTimer); toastTimer = null }
      if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl)
      ensureToastStyle()
      toastEl = document.createElement('div')
      toastEl.className = 'dsh-zh-toast'
      toastEl.setAttribute('role', 'alert')
      toastEl.textContent = text
      document.body.appendChild(toastEl)
      toastTimer = setTimeout(() => {
        toastTimer = null
        if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl)
        toastEl = null
      }, 4000)
    } catch { /* ignore toast failures */ }
  }

  // ── Archive pass ──────────────────────────────────────────────────────────
  const runArchivePass = (): void => {
    if (autoArchiveState.ready !== true || archiving) return
    if (autoArchiveState.days <= 0) return

    let sessionsSnap: { byId: Record<string, { blank?: boolean; running?: boolean; updatedAt?: number; cwd?: string }>; current?: string } | null = null
    let workspacesSnap: { archivedSessionIds?: string[]; items?: Array<{ path?: string; sessionIds?: string[] }> } | null = null

    try {
      sessionsSnap = ctx.sessions.list.getSnapshot() as typeof sessionsSnap
    } catch { /* ignore */ }
    try {
      workspacesSnap = ctx.workspaces.list.getSnapshot() as typeof workspacesSnap
    } catch { /* ignore */ }

    if (!sessionsSnap || !workspacesSnap) return

    const current = sessionsSnap.current
    if (!current) return
    const currentSummary = sessionsSnap.byId[current]
    if (!currentSummary || currentSummary.blank !== true) return

    const cwd = currentSummary.cwd
    let workspaceSessionIds: string[] | null = null
    if (typeof cwd === 'string' && Array.isArray(workspacesSnap.items)) {
      for (const ws of workspacesSnap.items) {
        if (ws.path === cwd && Array.isArray(ws.sessionIds)) {
          workspaceSessionIds = ws.sessionIds
          break
        }
      }
    }
    if (!workspaceSessionIds) return

    const cutoff = Date.now() - autoArchiveState.days * 86400000
    const candidates: string[] = []
    const archived = workspacesSnap.archivedSessionIds ?? []
    for (const id of workspaceSessionIds) {
      const summary = sessionsSnap.byId[id]
      if (!summary) continue
      if (summary.running === true || summary.blank === true) continue
      if (typeof summary.updatedAt !== 'number' || summary.updatedAt > cutoff) continue
      if (archived.includes(id)) continue
      candidates.push(id)
    }
    if (candidates.length === 0) return

    archiving = true
    void Promise.all(candidates.map(async (id) => {
      try {
        await ctx.workspaces.archiveSession(id)
        return true
      } catch {
        return false
      }
    })).then((results) => {
      archiving = false
      const count = results.filter(Boolean).length
      if (count > 0) showArchiveToast(count)
    }, () => { archiving = false })
  }

  // ── Subscriptions ─────────────────────────────────────────────────────────
  readArchiveDays()

  const unsubScope = ((): (() => void) | null => {
    try {
      if (typeof promptScope.subscribe !== 'function') return null
      return promptScope.subscribe(() => { readArchiveDays(); runArchivePass() })
    } catch { return null }
  })()

  const unsubSessions = ((): (() => void) | null => {
    try {
      if (typeof ctx.sessions.list.subscribe !== 'function') return null
      return ctx.sessions.list.subscribe(runArchivePass)
    } catch { return null }
  })()

  const unsubWorkspaces = ((): (() => void) | null => {
    try {
      if (typeof ctx.workspaces.list.subscribe !== 'function') return null
      return ctx.workspaces.list.subscribe(runArchivePass)
    } catch { return null }
  })()

  // Run once on mount (in case we're already on the new session view).
  runArchivePass()

  return function () {
    if (unsubScope) unsubScope()
    if (unsubSessions) unsubSessions()
    if (unsubWorkspaces) unsubWorkspaces()
    if (toastTimer !== null) { clearTimeout(toastTimer); toastTimer = null }
    if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl)
    if (toastStyleEl?.parentNode) toastStyleEl.parentNode.removeChild(toastStyleEl)
  }
}
