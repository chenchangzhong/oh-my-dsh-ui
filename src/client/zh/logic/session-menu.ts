/**
 * Session menu: injects "Delete session" into the official session row menu.
 *
 * ADAPTED from deepseek-harness-zh_pro's session-menu.ts:
 *   - Source: MutationObserver on div[role="menu"], reads __reactFiber$ for sessionId
 *   - Target: same approach (DOM-only, no React involvement)
 *   - API: fetch('/dsh-zh/api/session.delete') — MUST be hosted route
 *
 * HOST API DEPENDENCY:
 *   POST /dsh-zh/api/session.delete { sessionId, title, currentSessionId? }
 *
 * Language-independent: the delete item is injected regardless of UI language,
 * with文案 following the current locale (zh/en).
 */
import type { ClientContext } from '../../dsh-client-types.ts'
import { ZhApplyContext } from './apply.ts'
import { settingsStore } from '../store/settings-store.ts'
import { batchSelectionIds, batchSelectionSize, clearBatchSelection } from './session-batch.ts'

// ─── Locale strings ───────────────────────────────────────────────────────────
const DELETE_LABELS = { zh: '删除会话', en: 'Delete session' }
const DELETE_HINTS = {
  zh: '删除会话（日志移入系统回收站，不保留恢复位）',
  en: 'Delete session (log moves to the system recycle bin; no restore position)',
}
const CONFIRM_TEXTS = {
  zh: {
    title: '删除会话',
    desc: '将把该会话的日志目录移入系统回收站，并从工作区账本移除（不保留恢复位）。删除后可从系统回收站手工还原目录，但不会自动恢复为会话。若删除的是当前查看的会话，将自动跳转到新会话页面。确定继续吗？',
    ok: '删除', cancel: '取消',
    deleted: '会话已删除（日志已移入系统回收站）',
    failed: '删除失败：{message}',
    deleting: '正在删除会话…',
  },
  en: {
    title: 'Delete session',
    desc: 'The session log directory will move to the system recycle bin and the workspace ledger slot will be removed (no restore position). Continue?',
    ok: 'Delete', cancel: 'Cancel',
    deleted: 'Session deleted (log moved to the system recycle bin)',
    failed: 'Delete failed: {message}',
    deleting: 'Deleting session…',
  },
}

const SESSION_MENU_MARKS = ['归档会话', 'Archive session']
const SESSION_MENU_UNARCHIVE_MARKS = ['取消归档', 'Unarchive session']
const INJECTED_MARK = 'data-dsh-zh-delete-session'
const BATCH_ITEM_MARK = 'data-dsh-zh-batch-item'

// ─── Batch-operation strings (bulk delete / bulk archive) ─────────────────────
const BATCH_TEXTS = {
  zh: {
    deleteLabel: '批量删除会话（{n}）',
    archiveLabel: '批量归档会话（{n}）',
    deleteTitle: '批量删除会话',
    deleteDesc: '将把选中的 {n} 个会话删除：日志移入系统回收站、并从工作区账本移除（不保留恢复位）；运行中的会话会被跳过。确定继续吗？',
    archiveTitle: '批量归档会话',
    archiveDesc: '将把选中的 {n} 个会话加入归档（从列表隐藏，日志原地保留，可随时在归档视图中恢复）。确定继续吗？',
    deleting: '正在批量删除 {n} 个会话…',
    deleted: '已删除 {n} 个会话（日志已移入系统回收站）',
    archiving: '正在批量归档 {n} 个会话…',
    archived: '已归档 {n} 个会话',
    partial: '完成 {ok} 个，失败 {failed} 个：{message}',
    archiveUnavailable: '批量归档不可用（工作区服务未就绪）',
  },
  en: {
    deleteLabel: 'Delete {n} sessions',
    archiveLabel: 'Archive {n} sessions',
    deleteTitle: 'Delete selected sessions',
    deleteDesc: 'The {n} selected sessions will be deleted: logs move to the system recycle bin and workspace ledger slots are removed (no restore position); running sessions are skipped. Continue?',
    archiveTitle: 'Archive selected sessions',
    archiveDesc: 'The {n} selected sessions will be archived (hidden from the list, logs kept in place; restore anytime from the archive view). Continue?',
    deleting: 'Deleting {n} selected sessions…',
    deleted: 'Deleted {n} sessions (logs moved to the system recycle bin)',
    archiving: 'Archiving {n} selected sessions…',
    archived: 'Archived {n} sessions',
    partial: '{ok} done, {failed} failed: {message}',
    archiveUnavailable: 'Bulk archive unavailable (workspace service not ready)',
  },
}

// ─── Deleted-session set (drives the archive-view filter) ─────────────────────
// Every successful delete response returns the host's authoritative set, which we
// cache here; the archive view pulls it once on open as a fallback (covering
// deletes made before this page load or through another entry point).
const deletedSessionIds = new Set<string>()

/** Replace the cache with the host's authoritative id list. */
function applyDeletedSessionIds(ids: unknown): void {
  if (!Array.isArray(ids)) return
  deletedSessionIds.clear()
  for (const id of ids) deletedSessionIds.add(String(id))
  deletedSetVersion += 1
  for (const listener of deletedSetListeners) {
    try { listener() } catch { /* 单个订阅失败不影响其余 */ }
  }
}

// ─── 官方列表/搜索里的已删除会话行隐藏 ────────────────────────────────────────
/**
 * 删除驻留内存的会话只能靠官方归档集合隐藏，而归档集合只作用于「隐藏已归档」
 * 视图。用户把视图切到「全部对话（显示已归档）」或「仅显示已归档」时，被删
 * 会话会作为灰色归档行重新出现；官方内容搜索同样会列出它。这里补上官方列表行
 * 与搜索结果行的同一层过滤。
 *
 * 手段是**打标记 + 样式隐藏**，绝不摘除节点：这些行由 React 托管，外部移除会
 * 让下一次渲染（reconcile）找不到节点而报错；display:none 之后行的父级 span
 * 自然塌陷为 0 高，列表不留空位。样式挂在属性选择器上而不是内联 style，因为
 * archive-view 的视图切换也会读写同一批行的 inline display。
 */
const DELETED_ROW_SELECTOR = 'div[class*="sessionRow"][role="treeitem"],div[class*="searchResultRow"][role="treeitem"]'
/** 命中已删除集合的行（样式隐藏）。 */
const DELETED_ROW_MARK = 'data-dsh-zh-deleted-row'
/** 「已按集合版本判定过」的行：值为 `<版本>|<会话 id>`，版本或 id 变化时重判。 */
const DELETED_ROW_CHECKED = 'data-dsh-zh-deleted-checked'
/** 因已删除行被隐藏而整体变空的分组容器（官方「仅显示已归档」视图里，一个
 *  分组只剩被删会话时，官方不会替我们丢掉这个分组）。 */
const DELETED_GROUP_MARK = 'data-dsh-zh-deleted-group'
/** 是否还有存活标记：集合清空时用它短路，避免每次 observer 批次都做一遍
 *  「撤销标记」的 DOM 全量查询（绝大多数会话未删除时集合恒为空）。 */
let deletedRowMarksActive = false
let deletedRowStyleEl: HTMLStyleElement | null = null
/** 集合版本：每次写入自增，供「已按当前集合判定过」的行做增量跳过。 */
let deletedSetVersion = 0
/** 集合变化订阅（官方列表/搜索行的隐藏 pass 挂在上面）。 */
const deletedSetListeners: Array<() => void> = []

function ensureDeletedRowStyle(): void {
  try {
    if (typeof document === 'undefined' || document.head === undefined || document.head === null) return
    if (deletedRowStyleEl !== null && document.head.contains(deletedRowStyleEl)) return
    if (typeof document.createElement !== 'function') return
    deletedRowStyleEl = document.createElement('style')
    deletedRowStyleEl.setAttribute('data-dsh-zh', 'deleted-rows')
    deletedRowStyleEl.textContent = [
      '[' + DELETED_ROW_MARK + ']{display:none!important}',
      '[' + DELETED_GROUP_MARK + ']{display:none!important}',
    ].join('')
    document.head.appendChild(deletedRowStyleEl)
    // 样式本身也是副作用：即使一行都没命中（例如删除过的会话已不在当前视图里），
    // 集合清空时也必须把它移除，否则「没删过任何会话」的界面会残留一个空样式标签。
    deletedRowMarksActive = true
  } catch { /* 样式失败不影响删除语义（标记仍在，可诊断） */ }
}

function removeDeletedRowStyle(): void {
  try {
    if (deletedRowStyleEl !== null && deletedRowStyleEl.parentNode !== null) {
      deletedRowStyleEl.parentNode.removeChild(deletedRowStyleEl)
    }
  } catch { /* 忽略 */ }
  deletedRowStyleEl = null
}

/**
 * 从行读会话 id：`data-row-key="session:<id>"`（官方 Rows.tsx 稳定输出）优先，
 * 其次 fiber 链上的 `node.id`（会话行）与 `result.id`（搜索结果行）。
 */
function deletedRowIdOf(row: HTMLElement): string | null {
  try {
    const key = row.getAttribute('data-row-key')
    if (typeof key === 'string' && key.indexOf('session:') === 0 && key.length > 'session:'.length) {
      return key.slice('session:'.length)
    }
  } catch { /* 退到 fiber */ }
  try {
    const fiberKeys = Object.keys(row).filter(k => k.startsWith('__reactFiber$'))
    for (const key of fiberKeys) {
      let fiber = (row as unknown as Record<string, { memoizedProps?: unknown; return?: unknown } | null>)[key]
      let depth = 0
      while (fiber !== null && fiber !== undefined && depth < 40) {
        const props = fiber.memoizedProps
        if (props !== null && props !== undefined && typeof props === 'object') {
          const node = (props as { node?: { id?: unknown } }).node
          if (node !== null && typeof node === 'object' && typeof node.id === 'string') return node.id
          const result = (props as { result?: { id?: unknown } }).result
          if (result !== null && typeof result === 'object' && typeof result.id === 'string') return result.id
        }
        fiber = fiber.return as typeof fiber
        depth += 1
      }
    }
  } catch { /* 忽略 */ }
  return null
}

/**
 * 分组容器：行的祖先中、其父级正是官方滚动容器（role=tree）的那一层。
 * 只对**官方会话行**有意义——搜索结果行挂在另一个 role=tree 容器里，没有
 * 「分组」概念，不能参与分组收拾（否则会把搜索结果区整体隐藏）。
 */
function deletedGroupHostOf(row: HTMLElement): HTMLElement | null {
  try {
    if ((row.getAttribute('class') ?? '').indexOf('sessionRow') === -1) return null
    const tree = document.body.querySelector<HTMLElement>('div[data-slot="sidebar.workspaces"] [role="tree"]')
    if (tree === null || tree === undefined) return null
    let el = row.parentElement
    while (el !== null && el !== undefined && (el as HTMLElement) !== document.body) {
      if (el.parentElement === tree) return el
      el = el.parentElement
    }
  } catch { /* 忽略 */ }
  return null
}

/** 分组内是否还有「可见的会话行」（未被本模块隐藏、也不是 archive-view 的视图
 *  切换隐藏）。有任何一行即视为分组非空。 */
function groupHasVisibleRow(host: HTMLElement): boolean {
  try {
    const rows = host.querySelectorAll<HTMLElement>(DELETED_ROW_SELECTOR)
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i]
      if (row.getAttribute(DELETED_ROW_MARK) !== null) continue
      const style = row.style
      if (style !== null && style !== undefined && style.display === 'none') continue
      return true
    }
  } catch { /* 忽略 */ }
  return false
}

/** 移除全部标记（开关/卸载时）：样式与标记一起清，界面回到官方原生形态。 */
function clearDeletedRowMarks(): void {
  try {
    const marked = document.body.querySelectorAll<HTMLElement>(
      '[' + DELETED_ROW_MARK + '],[' + DELETED_ROW_CHECKED + '],[' + DELETED_GROUP_MARK + ']',
    )
    for (let i = 0; i < marked.length; i += 1) {
      marked[i].removeAttribute(DELETED_ROW_MARK)
      marked[i].removeAttribute(DELETED_ROW_CHECKED)
      marked[i].removeAttribute(DELETED_GROUP_MARK)
    }
  } catch { /* 忽略 */ }
  removeDeletedRowStyle()
  deletedRowMarksActive = false
}

/**
 * 全量（或子树）重放：给命中已删除集合的官方行打标记，并收拾因此变空的分组。
 * 集合为空（从未删除 / 已全部恢复）时反向清理：撤销全部标记并移除样式，界面
 * 回到与官方完全一致的形态——没删过任何会话时不留任何副作用。
 */
function runDeletedRowPass(root: HTMLElement | Document | null): void {
  if (typeof document === 'undefined' || document.body === null || document.body === undefined) return
  if (deletedSessionIds.size === 0) {
    if (deletedRowMarksActive) clearDeletedRowMarks()
    return
  }
  ensureDeletedRowStyle()
  const scope = (root === null || root === undefined || root === document.body
    || root === document.documentElement || typeof (root as HTMLElement).querySelectorAll !== 'function')
    ? document.body
    : root
  // 快速短路：本次子树里没有任何官方会话行/搜索结果行（绝大多数 observer 批次
  // ——聊天流、菜单、提示条都不含行）时，不做任何 DOM 查询。这一步是流式输出
  // 期间不拖慢页面的关键。
  let hasRow = false
  try {
    if (typeof (scope as HTMLElement).matches === 'function' && (scope as HTMLElement).matches(DELETED_ROW_SELECTOR)) hasRow = true
  } catch { /* 忽略 */ }
  if (!hasRow) {
    try { hasRow = scope.querySelector(DELETED_ROW_SELECTOR) !== null } catch { hasRow = false }
  }
  if (!hasRow) return
  const candidates: HTMLElement[] = []
  try {
    if (typeof (scope as HTMLElement).matches === 'function' && (scope as HTMLElement).matches(DELETED_ROW_SELECTOR)) {
      candidates.push(scope as HTMLElement)
    }
  } catch { /* 忽略 */ }
  try {
    const found = scope.querySelectorAll<HTMLElement>(DELETED_ROW_SELECTOR)
    for (let i = 0; i < found.length; i += 1) candidates.push(found[i])
  } catch { /* 忽略 */ }
  const token = String(deletedSetVersion)
  for (const row of candidates) {
    try {
      const id = deletedRowIdOf(row)
      // 版本 + id 都没变 → 该行的判定仍然有效，跳过（避免每次 observer 批次都
      // 做一遍 fiber 遍历）。
      if (row.getAttribute(DELETED_ROW_CHECKED) === token + '|' + String(id ?? '')) continue
      if (id !== null && deletedSessionIds.has(id)) {
        row.setAttribute(DELETED_ROW_MARK, '')
        deletedRowMarksActive = true
      } else {
        row.removeAttribute(DELETED_ROW_MARK)
      }
      row.setAttribute(DELETED_ROW_CHECKED, token + '|' + String(id ?? ''))
    } catch { /* 单行失败不影响其余行 */ }
  }
  // 分组收拾：只看本次（或此前）被标记的行所在的分组。
  try {
    const marked = document.body.querySelectorAll<HTMLElement>('[' + DELETED_ROW_MARK + ']')
    if (marked.length > 0) {
      const hosts: HTMLElement[] = []
      for (let i = 0; i < marked.length; i += 1) {
        const host = deletedGroupHostOf(marked[i])
        if (host !== null && hosts.indexOf(host) === -1) hosts.push(host)
      }
      for (const host of hosts) {
        // 插件自建的归档行容器挂进同一分组时（查看已归档视图），分组不是
        // 「空的」，绝不能整体隐藏。
        let hasOwnSection = false
        try { hasOwnSection = host.querySelector('[data-dsh-zh-archive-section]') !== null } catch { /* 忽略 */ }
        if (hasOwnSection || groupHasVisibleRow(host)) host.removeAttribute(DELETED_GROUP_MARK)
        else host.setAttribute(DELETED_GROUP_MARK, '')
      }
    }
    // 不再含已删除行的分组：撤销标记（用户切回隐藏已归档视图后分组要复原）。
    const groups = document.body.querySelectorAll<HTMLElement>('[' + DELETED_GROUP_MARK + ']')
    for (let i = 0; i < groups.length; i += 1) {
      let stillSuppressed = false
      try { stillSuppressed = groups[i].querySelector('[' + DELETED_ROW_MARK + ']') !== null } catch { /* 忽略 */ }
      if (!stillSuppressed) groups[i].removeAttribute(DELETED_GROUP_MARK)
    }
  } catch { /* 忽略 */ }
}

/** Pull the deleted-session set from the host. */
export function fetchDeletedSessionIds(): Promise<void> {
  return fetch('/dsh-zh/api/session.deleted', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{}',
  }).then(response => response.json().catch(() => null)).then((parsed) => {
    const typed = parsed as { ok?: boolean; value?: { ids?: unknown } } | null
    if (typed?.ok === true && typed.value !== undefined) applyDeletedSessionIds(typed.value.ids)
  }).catch(() => { /* keep the old cache when the fetch fails */ })
}

/** Cache the set carried by a delete response. */
function syncDeletedSessionIdsFromValue(value: unknown): void {
  const ids = (value as { deletedIds?: unknown } | null)?.deletedIds
  if (ids !== undefined) applyDeletedSessionIds(ids)
}

/** Whether a session id is known to be deleted (archive-view row filter). */
export function isSessionDeleted(id: string): boolean {
  return deletedSessionIds.has(id)
}

// ─── Toast helpers (reused from auto-archive) ─────────────────────────────────
let toastTimer: ReturnType<typeof setTimeout> | null = null
let toastEl: HTMLElement | null = null
let toastStyleEl: HTMLStyleElement | null = null

function ensureToastStyle(): void {
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

function showToast(text: string, duration: number): void {
  try {
    if (toastTimer !== null) { clearTimeout(toastTimer); toastTimer = null }
    if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl)
    ensureToastStyle()
    toastEl = document.createElement('div')
    toastEl.className = 'dsh-zh-toast'
    toastEl.setAttribute('role', 'status')
    toastEl.textContent = text
    document.body.appendChild(toastEl)
    toastTimer = setTimeout(() => {
      toastTimer = null
      if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl)
      toastEl = null
    }, duration)
  } catch { /* ignore */ }
}

// ─── Session ID extraction ────────────────────────────────────────────────────
/** Resolve a session row's id (fiber chain, then unique title fallback).
 *  Exported so session-batch.ts can resolve ids without a module cycle. */
export function readSessionIdFromRow(row: HTMLElement): string | null {
  // Fiber path: __reactFiber$ → memoizedProps.node.id
  try {
    const fiberKeys = Object.keys(row).filter(k => k.startsWith('__reactFiber$'))
    for (const key of fiberKeys) {
      let fiber = (row as Record<string, unknown>)[key] as { memoizedProps?: { node?: { id?: string } }; return?: unknown } | null
      let depth = 0
      while (fiber && depth < 40) {
        const mp = fiber.memoizedProps
        if (mp && typeof mp === 'object' && mp.node && typeof mp.node === 'object' && typeof mp.node.id === 'string') {
          return mp.node?.id
        }
        fiber = fiber.return as typeof fiber
        depth++
      }
    }
  } catch { /* ignore */ }
  // Props path: __reactProps$ → node.id
  try {
    const propsKeys = Object.keys(row).filter(k => k.startsWith('__reactProps$'))
    for (const key of propsKeys) {
      const props = (row as Record<string, unknown>)[key] as { node?: { id?: string } }
      if (props?.node?.id) return props.node.id
    }
  } catch { /* ignore */ }
  return null
}

function sessionRowOf(el: HTMLElement | null): HTMLElement | null {
  while (el && el !== document.body) {
    if (el.getAttribute?.('role') === 'treeitem') return el
    el = el.parentElement
  }
  return null
}

function titleOf(row: HTMLElement): string {
  try {
    const span = row.querySelector<HTMLElement>('span[class*="title"]')
    if (span?.textContent) return span.textContent.trim()
  } catch { /* ignore */ }
  return row.textContent?.trim().slice(0, 80) ?? ''
}

// ─── Menu item anatomy ────────────────────────────────────────────────────────
/**
 * Read a menu item's label text.
 *
 * 0.1.7 renders items as icon + label + shortcut spans, and the shortcut's keys
 * (`⌥⌘A`) are part of the item's `textContent` — so matching on `textContent`
 * silently stops finding the anchor item. Read the label's own span; older
 * Harness versions have no label class, so fall back to `textContent`.
 */
function menuItemLabel(item: HTMLElement): string {
  const span = item.querySelector<HTMLElement>('span[class*="itemLabel"]')
  return (span?.textContent ?? item.textContent ?? '').trim()
}

/** The span holding a menu item's label (see {@link menuItemLabel}). */
function menuItemLabelSpan(item: HTMLElement): HTMLElement | null {
  return item.querySelector<HTMLElement>('span[class*="itemLabel"]')
    ?? item.querySelector<HTMLElement>('span:last-child')
}

/** Drop the Harness-rendered shortcut hint a cloned item inherits from its anchor. */
function stripMenuItemShortcut(item: HTMLElement): void {
  item.removeAttribute('aria-keyshortcuts')
  const span = item.querySelector<HTMLElement>('span[class*="shortcut"]')
  if (span?.parentNode) span.parentNode.removeChild(span)
}

// ─── Delete execution ─────────────────────────────────────────────────────────
function performDelete(sessionId: string, title: string, ctx: ClientContext): void {
  let currentSessionId: string | null = null
  try {
    const snap = ctx.sessions.list.getSnapshot() as { current?: string }
    if (snap?.current) currentSessionId = snap.current
  } catch { /* ignore */ }

  void (async () => {
    try {
      const response = await fetch('/dsh-zh/api/session.delete', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sessionId, title, currentSessionId }),
      })
      if (!response.ok) {
        showToast('删除失败：HTTP ' + response.status, 5000)
        return
      }
      const parsed = await response.json().catch(() => null) as { ok?: boolean; error?: { message?: string }; value?: unknown } | null
      if (!parsed?.ok) {
        showToast('删除失败：' + (parsed?.error?.message ?? '未知错误'), 5000)
        return
      }
      syncDeletedSessionIdsFromValue(parsed.value)
      showToast('会话已删除（日志已移入系统回收站）', 4000)
      if (currentSessionId === sessionId) {
        try { (ctx.sessions as { clear?: () => void }).clear?.() } catch { /* ignore */ }
      }
      try { void ctx.workspaces.refresh?.() } catch { /* ignore */ }
      try { void ctx.sessions.refresh?.() } catch { /* ignore */ }
    } catch (error) {
      showToast('删除失败：网络错误', 5000)
    }
  })()
}

// ─── Batch execution ──────────────────────────────────────────────────────────
/** One delete result as aggregated by the bulk runner. */
interface BatchDeleteResult { id: string; ok: boolean; message: string }

/** Delete one session through the host route; never throws (the bulk caller aggregates). */
async function batchDeleteOne(
  ctx: ClientContext, sessionId: string, title: string, currentSessionId: string | null,
): Promise<BatchDeleteResult> {
  try {
    const response = await fetch('/dsh-zh/api/session.delete', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sessionId, title, currentSessionId }),
    })
    const parsed = await response.json().catch(() => null) as { ok?: boolean; error?: { message?: string }; value?: unknown } | null
    if (!parsed?.ok) {
      return { id: sessionId, ok: false, message: parsed?.error?.message ?? ('HTTP ' + response.status) }
    }
    syncDeletedSessionIdsFromValue(parsed.value)
    return { id: sessionId, ok: true, message: '' }
  } catch (error) {
    return { id: sessionId, ok: false, message: error instanceof Error ? error.message : String(error) }
  }
}

/** Refresh the session and workspace lists so affected rows update immediately. */
function refreshSessionLists(ctx: ClientContext): void {
  try { void ctx.workspaces.refresh?.() } catch { /* ignore */ }
  try { void ctx.sessions.refresh?.() } catch { /* ignore */ }
}

/** Bulk delete: strictly serial (each request waits for the previous to settle). */
async function performBatchDelete(ctx: ClientContext, ids: string[], copy: typeof BATCH_TEXTS.zh): Promise<void> {
  const n = ids.length
  if (n === 0) return
  let currentSessionId: string | null = null
  let listSnapshot: { byId?: Record<string, { displayTitle?: string }> } | null = null
  try {
    const snap = ctx.sessions.list.getSnapshot() as { current?: string; byId?: Record<string, { displayTitle?: string }> }
    if (snap?.current) currentSessionId = snap.current
    listSnapshot = snap ?? null
  } catch { /* ignore */ }

  showToast(copy.deleting.replace('{n}', String(n)), 2500)
  const results: BatchDeleteResult[] = []
  for (const id of ids) {
    const summary = listSnapshot?.byId?.[id]
    const title = typeof summary?.displayTitle === 'string' ? summary.displayTitle : ''
    results.push(await batchDeleteOne(ctx, id, title, currentSessionId))
  }
  const okResults = results.filter(r => r.ok)
  const failures = results.filter(r => !r.ok)
  if (failures.length === 0) {
    showToast(copy.deleted.replace('{n}', String(okResults.length)), 4000)
  } else {
    showToast(copy.partial
      .replace('{ok}', String(okResults.length))
      .replace('{failed}', String(failures.length))
      .replace('{message}', failures[0].message), 6000)
  }
  if (currentSessionId !== null && okResults.some(r => r.id === currentSessionId)) {
    try { (ctx.sessions as { clear?: () => void }).clear?.() } catch { /* ignore */ }
  }
  refreshSessionLists(ctx)
  clearBatchSelection()
}

/** Bulk archive: official workspaces.archiveSession; running/blank rows are skipped. */
async function performBatchArchive(ctx: ClientContext, ids: string[], copy: typeof BATCH_TEXTS.zh): Promise<void> {
  const n = ids.length
  if (n === 0) return
  const workspaces = ctx.workspaces as unknown as { archiveSession?: (id: string) => Promise<unknown> } | undefined
  if (workspaces === undefined || typeof workspaces.archiveSession !== 'function') {
    showToast(copy.archiveUnavailable, 5000)
    return
  }
  let listSnapshot: { byId?: Record<string, { running?: boolean; blank?: boolean }> } | null = null
  try { listSnapshot = ctx.sessions.list.getSnapshot() as typeof listSnapshot } catch { /* ignore */ }
  showToast(copy.archiving.replace('{n}', String(n)), 2500)
  let archived = 0
  let failed = 0
  let firstFailure = ''
  for (const id of ids) {
    const summary = listSnapshot?.byId?.[id]
    if (summary === undefined || summary === null || summary.running === true || summary.blank === true) {
      failed += 1
      if (firstFailure === '') firstFailure = 'skipped'
      continue
    }
    try {
      await workspaces.archiveSession(id)
      archived += 1
    } catch (error) {
      failed += 1
      if (firstFailure === '') firstFailure = error instanceof Error ? error.message : String(error)
    }
  }
  if (failed === 0) {
    showToast(copy.archived.replace('{n}', String(archived)), 4000)
  } else {
    showToast(copy.partial
      .replace('{ok}', String(archived))
      .replace('{failed}', String(failed))
      .replace('{message}', firstFailure), 6000)
  }
  refreshSessionLists(ctx)
  clearBatchSelection()
}

// ─── installSessionMenu ───────────────────────────────────────────────────────
export function installSessionMenu(zhCtx: ZhApplyContext): () => void {
  const { ctx } = zhCtx
  if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return () => {}

  let observer: MutationObserver | undefined
  let lastEllipsisRow: HTMLElement | null = null
  let confirmEl: HTMLElement | null = null
  const currentCopy = { zh: false, deleteLabel: '', deleteHint: '', title: '', desc: '', ok: '', cancel: '', deleted: '', failed: '', deleting: '' }

  const resolveCopy = (): typeof currentCopy => {
    const isZh = (): boolean => {
      try {
        const locale = ctx.locale
        return !!(locale && typeof locale.getLocale === 'function' && locale.getLocale().active === 'zh')
      } catch { return false }
    }
    const lang = isZh() ? 'zh' : 'en'
    const c = CONFIRM_TEXTS[lang]
    return {
      zh: lang === 'zh',
      deleteLabel: DELETE_LABELS[lang],
      deleteHint: DELETE_HINTS[lang],
      title: c.title, desc: c.desc, ok: c.ok, cancel: c.cancel,
      deleted: c.deleted, failed: c.failed, deleting: c.deleting,
    }
  }

  const removeConfirm = (): void => {
    if (confirmEl?.parentNode) confirmEl.parentNode.removeChild(confirmEl)
    confirmEl = null
  }

  const showConfirm = (title: string, desc: string, onOk: () => void): void => {
    removeConfirm()
    const overlay = document.createElement('div')
    overlay.style.cssText = 'position:fixed;inset:0;z-index:1200;display:flex;align-items:center;justify-content:center;background:var(--dsw-alias-bg-mask-1,rgba(0,0,0,0.35))'
    const card = document.createElement('div')
    // 适配明暗主题：--dsw-alias-surface-primary 在当前 DSH 未定义，深色下会
    // fallback 成白卡片；改用实际的卡片层级 token（bg-layer-2）。
    card.style.cssText = 'width:min(440px,calc(100vw - 48px));border-radius:16px;padding:20px;background:var(--dsw-alias-bg-layer-2, var(--dsw-alias-bg-layer-1, #fff));color:var(--dsw-alias-label-primary,#1f2329);box-shadow:var(--dsw-elevation-prominent,0 8px 24px rgba(0,0,0,0.18))'
    const titleEl = document.createElement('div')
    titleEl.textContent = title
    titleEl.style.cssText = 'font-size:16px;line-height:24px;font-weight:600;margin-bottom:10px'
    const descEl = document.createElement('div')
    descEl.textContent = desc
    descEl.style.cssText = 'font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,#666);margin-bottom:18px'
    const actions = document.createElement('div')
    actions.style.cssText = 'display:flex;justify-content:flex-end;gap:10px'
    const cancel = document.createElement('button')
    cancel.type = 'button'
    cancel.textContent = currentCopy.cancel || '取消'
    cancel.style.cssText = 'padding:6px 16px;border-radius:10px;border:1px solid rgba(127,127,127,0.35);background:transparent;cursor:pointer;font:inherit;font-size:14px'
    const ok = document.createElement('button')
    ok.type = 'button'
    ok.textContent = currentCopy.ok || '删除'
    ok.style.cssText = 'padding:6px 16px;border-radius:10px;border:none;background:var(--dsw-alias-state-error-primary, #d93026);color:var(--dsw-alias-label-primary-foreground,#fff);cursor:pointer;font:inherit;font-size:14px'
    cancel.addEventListener('click', removeConfirm, false)
    ok.addEventListener('click', () => { removeConfirm(); onOk() }, false)
    actions.appendChild(cancel)
    actions.appendChild(ok)
    card.appendChild(titleEl)
    card.appendChild(descEl)
    card.appendChild(actions)
    overlay.appendChild(card)
    overlay.addEventListener('click', (e) => { if (e.target === overlay) removeConfirm() }, false)
    document.body.appendChild(overlay)
    confirmEl = overlay
  }

  const injectIntoMenu = (menu: HTMLElement): void => {
    if (settingsStore.getSnapshot().deleteSessionEnabled !== true) return
    if (menu.getAttribute(INJECTED_MARK) !== null) return
    // 跳过**本插件自建**的菜单：归档视图的行菜单也是 div[role="menu"]
    // （data-dsh-zh-archive-menu），它自带「取消归档」文案与自己的删除项，
    // 若在这里再注入一遍会出现重复的「删除会话」。自建菜单的删除项由
    // archive-view 自己维护。
    if (menu.getAttribute('data-dsh-zh-archive-menu') !== null) return

    // Clean orphans
    try {
      const orphans = document.querySelectorAll<HTMLElement>('button[' + INJECTED_MARK + '], [' + BATCH_ITEM_MARK + ']')
      for (const o of Array.from(orphans)) {
        // Batch items are whole cloned wrappers; delete items are the button itself.
        const target = o.getAttribute(BATCH_ITEM_MARK) !== null ? (o.parentElement ?? o) : o
        if (target.parentNode && !menu.contains(target)) target.parentNode.removeChild(target)
      }
    } catch { /* ignore */ }

    // Find anchor: menuitem labelled "归档会话" / "Archive session"，兜底
    // 「取消归档」/「Unarchive session」——官方「显示已归档」视图里的归档行
    // 菜单只有重命名 / 分叉会话 / 取消归档，用归档文案匹配会落空，已归档会话
    // 因此拿不到删除入口（官方明确不做删除，这是唯一盲区）。
    let anchor: HTMLElement | null = null
    const items = menu.querySelectorAll<HTMLElement>('[role="menuitem"]')
    for (const item of Array.from(items)) {
      if (SESSION_MENU_MARKS.includes(menuItemLabel(item))) { anchor = item; break }
    }
    if (!anchor) {
      for (const item of Array.from(items)) {
        if (SESSION_MENU_UNARCHIVE_MARKS.includes(menuItemLabel(item))) { anchor = item; break }
      }
    }
    if (!anchor) return

    const row = lastEllipsisRow
    if (!row) return

    let sessionId = readSessionIdFromRow(row)
    if (!sessionId) return

    const copy = resolveCopy()
    const wrap = anchor.parentElement
    if (!wrap) return
    const clone = wrap.cloneNode(true) as HTMLElement
    const btn = clone.querySelector<HTMLElement>('[role="menuitem"]')
    if (!btn) return
    btn.setAttribute(INJECTED_MARK, '')
    // Replace icon with trash emoji
    const iconSpan = btn.querySelector('span:first-child')
    if (iconSpan) { iconSpan.textContent = '🗑'; iconSpan.style.fontSize = '14px' }
    stripMenuItemShortcut(btn)
    const labelSpan = menuItemLabelSpan(btn)
    if (labelSpan) { labelSpan.textContent = copy.deleteLabel; labelSpan.title = copy.deleteHint }
    btn.style.color = 'var(--dsw-alias-state-error-primary, #d93026)'
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      // Close menu
      try { document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })) } catch { /* ignore */ }
      showConfirm(copy.title, copy.desc, () => performDelete(sessionId!, titleOf(row), ctx))
    }, false)

    if (wrap.nextSibling) wrap.parentNode?.insertBefore(clone, wrap.nextSibling)
    else wrap.parentNode?.appendChild(clone)

    // ── Batch items ──────────────────────────────────────────────────────────
    // Injected whenever the multi-select is non-empty; they do NOT depend on the
    // current row's session id. Bulk delete follows the delete-button switch
    // (hiding the delete entry hides it too); bulk archive stands alone.
    if (settingsStore.getSnapshot().batchOpsEnabled === true && batchSelectionSize() > 0) {
      const ids = batchSelectionIds()
      const count = String(ids.length)
      const batchCopy = copy.zh ? BATCH_TEXTS.zh : BATCH_TEXTS.en
      const makeItem = (icon: string, label: string, danger: boolean, onClick: () => void): void => {
        const item = wrap.cloneNode(true) as HTMLElement
        const b = item.querySelector<HTMLElement>('[role="menuitem"]')
        if (!b) return
        b.setAttribute(BATCH_ITEM_MARK, '')
        const iconSpan = b.querySelector('span:first-child')
        if (iconSpan) { iconSpan.textContent = icon; iconSpan.style.fontSize = '14px' }
        stripMenuItemShortcut(b)
        const labelSpan = menuItemLabelSpan(b)
        if (labelSpan) labelSpan.textContent = label
        if (danger) b.style.color = 'var(--dsw-alias-state-error-primary, #d93026)'
        b.addEventListener('click', (e) => {
          e.preventDefault()
          e.stopPropagation()
          try { document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })) } catch { /* ignore */ }
          onClick()
        }, false)
        // Append after any already-injected batch item, else right after the anchor.
        const injected = wrap.parentNode?.querySelectorAll<HTMLElement>('[' + BATCH_ITEM_MARK + ']')
        const tail = injected !== undefined && injected.length > 0 ? injected[injected.length - 1].parentElement ?? wrap : wrap
        if (tail.nextSibling) tail.parentNode?.insertBefore(item, tail.nextSibling)
        else tail.parentNode?.appendChild(item)
      }
      if (settingsStore.getSnapshot().deleteSessionEnabled === true) {
        makeItem('🗑', batchCopy.deleteLabel.replace('{n}', count), true, () => {
          showConfirm(
            batchCopy.deleteTitle,
            batchCopy.deleteDesc.replace('{n}', count),
            () => { void performBatchDelete(ctx, ids.slice(), batchCopy) },
          )
        })
      }
      makeItem('📦', batchCopy.archiveLabel.replace('{n}', count), false, () => {
        showConfirm(
          batchCopy.archiveTitle,
          batchCopy.archiveDesc.replace('{n}', count),
          () => { void performBatchArchive(ctx, ids.slice(), batchCopy) },
        )
      })
    }

    menu.setAttribute(INJECTED_MARK, '')
  }

  // Capture ellipsis button clicks
  const onPointerDown = (e: PointerEvent): void => {
    const target = e.target as HTMLElement
    if (!target?.closest) return
    const btn = target.closest<HTMLElement>('button')
    if (!btn) return
    const label = btn.getAttribute('aria-label') ?? ''
    if ((label.includes('会话') && label.includes('的操作')) || label.includes('Session actions')) {
      lastEllipsisRow = sessionRowOf(btn)
    }
  }
  document.addEventListener('pointerdown', onPointerDown, true)

  const runPass = (root: HTMLElement | Document): void => {
    const menus = root === document
      ? document.body.querySelectorAll<HTMLElement>('div[role="menu"]')
      : root.querySelectorAll?.<HTMLElement>('div[role="menu"]') ?? new NodeList()
    for (const menu of Array.from(menus)) injectIntoMenu(menu)
  }

  observer = new MutationObserver((records) => {
    if (!Array.isArray(records)) { runPass(document); runDeletedRowPass(null); return }
    for (const rec of records) {
      const added = rec.addedNodes
      if (!added?.length) continue
      for (const n of Array.from(added)) {
        if (n.nodeType !== Node.ELEMENT_NODE) continue
        const el = n as HTMLElement
        if (el.getAttribute?.('role') === 'menu') { injectIntoMenu(el); continue }
        if (typeof el.querySelectorAll === 'function') { runPass(el); runDeletedRowPass(el) }
      }
    }
  })
  observer.observe(document.documentElement, { childList: true, subtree: true })
  runPass(document)

  // ─── 官方列表/搜索里的已删除会话行：隐藏 pass 的触发源 ───
  // 集合变化（删除成功回包 / 安装时兜底拉取）→ 重跑。
  const onDeletedSetChanged = (): void => { runDeletedRowPass(null) }
  deletedSetListeners.push(onDeletedSetChanged)
  // 会话/工作区快照变化（视图筛选切换、列表刷新）→ 重跑。
  const deletedRowUnsubs: Array<() => void> = []
  try {
    if (typeof ctx.sessions.list.subscribe === 'function') {
      deletedRowUnsubs.push(ctx.sessions.list.subscribe(() => { runDeletedRowPass(null) }))
    }
  } catch { /* 订阅失败时只靠 observer */ }
  try {
    if (typeof ctx.workspaces.list.subscribe === 'function') {
      deletedRowUnsubs.push(ctx.workspaces.list.subscribe(() => { runDeletedRowPass(null) }))
    }
  } catch { /* 订阅失败时只靠 observer */ }
  // 安装时先向主机拉一次集合（覆盖本页加载前或其它入口的删除）。
  void fetchDeletedSessionIds()
  runDeletedRowPass(null)

  return function () {
    if (observer) { observer.disconnect(); observer = undefined }
    document.removeEventListener('pointerdown', onPointerDown, true)
    const listenerIndex = deletedSetListeners.indexOf(onDeletedSetChanged)
    if (listenerIndex !== -1) deletedSetListeners.splice(listenerIndex, 1)
    for (const unsub of deletedRowUnsubs) {
      try { unsub() } catch { /* 忽略 */ }
    }
    clearDeletedRowMarks()
    if (toastTimer !== null) { clearTimeout(toastTimer); toastTimer = null }
    if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl)
    if (toastStyleEl?.parentNode) toastStyleEl.parentNode.removeChild(toastStyleEl)
    removeConfirm()
  }
}
