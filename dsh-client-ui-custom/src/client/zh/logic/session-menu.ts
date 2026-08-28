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
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { ZhApplyContext } from './apply.ts'
import { settingsStore } from '../store/settings-store.ts'

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
const INJECTED_MARK = 'data-dsh-zh-delete-session'

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
function readSessionIdFromRow(row: HTMLElement): string | null {
  // Fiber path: __reactFiber$ → memoizedProps.node.id
  try {
    const fiberKeys = Object.keys(row).filter(k => k.startsWith('__reactFiber$'))
    for (const key of fiberKeys) {
      let fiber = (row as Record<string, unknown>)[key] as { memoizedProps?: { node?: { id?: string } }; return?: unknown } | null
      let depth = 0
      while (fiber && depth < 40) {
        const mp = fiber.memoizedProps
        if (mp && typeof mp === 'object' && mp.node && typeof mp.node === 'object' && typeof mp.node.id === 'string') {
          return mp.node.id
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

// ─── Delete execution ─────────────────────────────────────────────────────────
function performDelete(sessionId: string, title: string, ctx: ClientContext): void {
  let currentSessionId: string | null = null
  try {
    const snap = ctx.sessions.list.getSnapshot() as { current?: string }
    if (snap?.current) currentSessionId = snap.current
  } catch { /* ignore */ }

  void fetch('/dsh-zh/api/session.delete', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sessionId, title, currentSessionId }),
  }).then(r => r.json().catch(() => null)).then((parsed: { ok?: boolean; error?: { message?: string } } | null) => {
    if (!parsed?.ok) {
      showToast('删除失败：' + (parsed?.error?.message ?? 'HTTP'), 5000)
      return
    }
    showToast('会话已删除（日志已移入系统回收站）', 4000)
    if (currentSessionId === sessionId) {
      try { (ctx.sessions as { clear?: () => void }).clear?.() } catch { /* ignore */ }
    }
    try { void ctx.workspaces.refresh?.() } catch { /* ignore */ }
    try { void ctx.sessions.refresh?.() } catch { /* ignore */ }
  }, () => showToast('删除失败：网络错误', 5000))
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
    overlay.style.cssText = 'position:fixed;inset:0;z-index:1200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.35)'
    const card = document.createElement('div')
    // 适配明暗主题：--dsw-alias-surface-primary 在当前 DSH 未定义，深色下会
    // fallback 成白卡片；改用实际的卡片层级 token（bg-layer-2）。
    card.style.cssText = 'width:min(440px,calc(100vw - 48px));border-radius:16px;padding:20px;background:var(--dsw-alias-bg-layer-2, var(--dsw-alias-bg-layer-1, #fff));color:var(--dsw-alias-label-primary,#1f2329);box-shadow:var(--dsw-shadow-lv3,0 8px 24px rgba(0,0,0,0.18))'
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
    ok.style.cssText = 'padding:6px 16px;border-radius:10px;border:none;background:var(--dsw-alias-danger-strong, #d93026);color:#fff;cursor:pointer;font:inherit;font-size:14px'
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

    // Clean orphans
    try {
      const orphans = document.querySelectorAll('button[' + INJECTED_MARK + ']')
      for (const o of Array.from(orphans)) {
        if (o.parentNode && !menu.contains(o)) o.parentNode.removeChild(o)
      }
    } catch { /* ignore */ }

    // Find anchor: menuitem with "归档会话" / "Archive session"
    let anchor: HTMLElement | null = null
    const items = menu.querySelectorAll<HTMLElement>('[role="menuitem"]')
    for (const item of Array.from(items)) {
      const text = item.textContent?.trim() ?? ''
      if (SESSION_MENU_MARKS.includes(text)) { anchor = item; break }
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
    const labelSpan = btn.querySelector('span:last-child')
    if (labelSpan) { labelSpan.textContent = copy.deleteLabel; labelSpan.title = copy.deleteHint }
    btn.style.color = 'var(--dsw-alias-danger-strong, #d93026)'
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      // Close menu
      try { document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })) } catch { /* ignore */ }
      showConfirm(copy.title, copy.desc, () => performDelete(sessionId!, titleOf(row), ctx))
    }, false)

    if (wrap.nextSibling) wrap.parentNode?.insertBefore(clone, wrap.nextSibling)
    else wrap.parentNode?.appendChild(clone)
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
    if (!Array.isArray(records)) { runPass(document); return }
    for (const rec of records) {
      const added = rec.addedNodes
      if (!added?.length) continue
      for (const n of Array.from(added)) {
        if (n.nodeType !== Node.ELEMENT_NODE) continue
        const el = n as HTMLElement
        if (el.getAttribute?.('role') === 'menu') { injectIntoMenu(el); continue }
        if (typeof el.querySelectorAll === 'function') runPass(el)
      }
    }
  })
  observer.observe(document.documentElement, { childList: true, subtree: true })
  runPass(document)

  return function () {
    if (observer) { observer.disconnect(); observer = undefined }
    document.removeEventListener('pointerdown', onPointerDown, true)
    if (toastTimer !== null) { clearTimeout(toastTimer); toastTimer = null }
    if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl)
    if (toastStyleEl?.parentNode) toastStyleEl.parentNode.removeChild(toastStyleEl)
    removeConfirm()
  }
}
