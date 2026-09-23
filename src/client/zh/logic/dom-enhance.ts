/**
 * Chinese enhancement core: locale.translate hook + DOM text enhancement.
 *
 * ADAPTED from deepseek-harness-zh_pro's dom-enhance.ts:
 *   - DSH 0.1.2+ no longer exposes ctx.locale.lookup publicly; only translate on the instance
 *   - Target: monkey-patches ctx.locale.translate only (instance-level, not prototype)
 *   - settingsStore: replaced with local settings-store module
 *   - ctx.get('locale'): replaced with ctx.locale
 *
 * Effect scope: only active when Chinese UI + "中文补全" is on.
 * DOM effects (stats full, thinking lines, chat width): language-independent.
 *
 * Host dependencies:
 *   - ctx.locale (must support bind(), register(), subscribe(), getLocale(), translate)
 *   - settingsStore (local module, bridged to ctx.settingsScope)
 */
import type { ClientContext } from '../../dsh-client-types.ts'
import { ZH, ZH_PARTIAL } from '../data/zh-dict.ts'
import { TERMS } from '../data/terms.ts'
import { PERMISSION_NAMES, PERMISSION_DESCRIPTIONS, COMMAND_DESCRIPTIONS, CHAT_LABELS } from '../data/dom-labels.ts'
import { TRAJ_PATTERNS, TRAJ_REVERSE } from '../data/traj-patterns.ts'
import { SETTINGS_ZH, SETTINGS_EN } from '../data/settings-dicts.ts'
import { enStepCount, enToolCallCount, applyPatterns, rewriteText, resolvePairs, applyPairs, formatZhSeconds, interpolateZh, PARAM_TRANSFORMS } from './format-utils.ts'
import { settingsStore } from '../store/settings-store.ts'
import type { ZhApplyContext } from './apply.ts'

// ─── Forward / reverse label tables (built once) ─────────────────────────────
const FORWARD = Object.assign({}, PERMISSION_NAMES, PERMISSION_DESCRIPTIONS, COMMAND_DESCRIPTIONS, CHAT_LABELS)
const REVERSE: Record<string, string> = {}
for (const k of Object.keys(FORWARD)) {
  if (REVERSE[FORWARD[k]] === undefined) REVERSE[FORWARD[k]] = k
}

// ─── DOM attribute keys (unique to zh feature) ────────────────────────────────
const STATS_FULL_KEY = 'data-dsh-zh-stats-full'
const PROMPT_PROVIDER_KEY = 'data-dsh-zh-hide-prompt-provider'
const PROMPT_PROVIDER_NAME = '提示词注入（deepseek-harness-zh_pro）'
const THINK_LINES_ATTR = 'data-dsh-zh-think'
const THINK_CTRL_ATTR = 'data-dsh-zh-think-control'
const THINK_OPEN_ATTR = 'data-dsh-zh-think-open'
const THINK_SHOWN_ATTR = 'data-dsh-zh-think-shown'
const THINK_LIVE_ATTR = 'data-dsh-zh-think-live'

// ─── Stats full display constants ───────────────────────────────────────────
const STATS_FULL_STYLES: Array<[string, string]> = [
  ['white-space', 'nowrap'], ['overflow', 'hidden'],
  ['text-overflow', 'clip'], ['max-width', 'none'],
  ['width', '100%'], ['height', 'auto'], ['min-height', '0'],
]
const STATS_BASE_FONT = 12
const STATS_MIN_FONT = 9
// 0.1.5 StatsPills 的 pill（button/span）样式子集：不强行拉满宽度，只放开
// 省略号并保持单行，让 fit 字号逻辑基于 label 内容宽度工作。
const STATS_PILL_STYLES: Array<[string, string]> = [
  ['white-space', 'nowrap'], ['overflow', 'hidden'],
  ['text-overflow', 'clip'], ['max-width', 'none'],
]
// 0.1.5 起计数组以空格分隔（「9 轮 203 步」），旧版用「 · 」，两者都认。
const STATS_COUNTS_ZH = /^\s*\d+\s*轮(?:\s*·\s*|\s+)\d+\s*步\s*$/
const STATS_COUNTS_EN = /^\s*\d+\s*turns?(?:\s*·\s*|\s+)\d+\s*steps?\s*$/

// ─── Helper predicates ────────────────────────────────────────────────────────
function isStatsCounts(text: string): boolean {
  return STATS_COUNTS_ZH.test(text) || STATS_COUNTS_EN.test(text)
}

function activeIsZh(ctx: ClientContext): boolean {
  try {
    const locale = ctx.locale
    if (locale && typeof locale.getLocale === 'function') {
      return locale.getLocale().active === 'zh'
    }
  } catch { /* ignore */ }
  return false
}

function zhEnhanceOn(ctx: ClientContext): boolean {
  return activeIsZh(ctx) && settingsStore.getSnapshot().zhComplete === true
}

// ─── Stats row font-fit ──────────────────────────────────────────────────────
function fitStatsRow(row: HTMLElement): void {
  if (typeof window === 'undefined' || row.clientWidth <= 0) return
  row.style.fontSize = STATS_BASE_FONT + 'px'
  row.style.removeProperty('overflow-x')
  let size = STATS_BASE_FONT
  for (let i = 0; i < 4; i += 1) {
    if (row.scrollWidth <= row.clientWidth) break
    size = Math.max(STATS_MIN_FONT, Math.round(size * (row.clientWidth / row.scrollWidth) * 10) / 10)
    row.style.fontSize = size + 'px'
    if (size <= STATS_MIN_FONT) break
  }
  if (row.scrollWidth > row.clientWidth) {
    row.style.setProperty('overflow-x', 'auto', 'important')
  }
}

// ─── Chat width ─────────────────────────────────────────────────────────────
const CHAT_WIDTH_MIN_SCREEN = 1200
function chatWidthRoot(): HTMLElement | null {
  if (typeof document === 'undefined' || document.body === null) return null
  return document.body.querySelector('[data-conversation-scroll]')?.parentElement ?? null
}

function applyChatWidth(): void {
  const root = chatWidthRoot()
  if (root === null) return
  const snap = settingsStore.getSnapshot()
  const large = typeof window !== 'undefined' && window.innerWidth >= CHAT_WIDTH_MIN_SCREEN
  if (snap.chatWidthEnabled && large && snap.chatWidth > 0) {
    const scroll = root.querySelector<HTMLElement>('[data-conversation-scroll]')
    const baseWidth = scroll?.clientWidth ?? root.clientWidth ?? 0
    if (baseWidth > 0) {
      root.style.setProperty('--dsh-chat-content-width', (baseWidth * snap.chatWidth / 100) + 'px', 'important')
    } else {
      root.style.removeProperty('--dsh-chat-content-width')
    }
  } else {
    root.style.removeProperty('--dsh-chat-content-width')
  }
}

// ─── Thinking lines ──────────────────────────────────────────────────────────
function thinkRoots(): NodeListOf<Element> {
  return document.body?.querySelectorAll('[data-variant="think"]') ?? new NodeList()
}

function isThinkOpen(root: Element): boolean {
  let child = root.firstElementChild
  while (child !== null) {
    if (child.hasAttribute?.('data-open')) return true
    child = child.nextElementSibling
  }
  return false
}

function latestRunningThink(): Element | null {
  const roots = thinkRoots()
  for (const r of Array.from(roots)) {
    if (r.getAttribute?.('data-state') === 'running') return r
  }
  return null
}

function toggleThink(root: Element): void {
  const row = root.querySelector<HTMLElement>('[data-disclosure-row]')
  if (row?.click) row.click()
}

function thinkMaxNow(): number {
  return settingsStore.getSnapshot().thinkMaxLines
}
function thinkMaxFromNow(): 'latest' | 'earliest' {
  return settingsStore.getSnapshot().thinkMaxLinesFrom === 'earliest' ? 'earliest' : 'latest'
}
function thinkModeNow(): 'scroll' | 'button' {
  return settingsStore.getSnapshot().thinkMode === 'scroll' ? 'scroll' : 'button'
}

function thinkBodyDiv(root: Element): HTMLElement | null {
  const open = root.querySelector('[data-variant="think"] [data-open]')
  const child = open?.firstElementChild
  if (!child) return null
  let c = child
  while (c) {
    if (c !== open && !c.hasAttribute?.('data-disclosure-row') && !c.hasAttribute?.(THINK_CTRL_ATTR) && !c.hasAttribute?.(THINK_LIVE_ATTR)) {
      return c as HTMLElement
    }
    c = c.nextElementSibling
  }
  return null
}

function isThinkRunning(root: Element): boolean {
  return root.getAttribute?.('data-state') === 'running'
}

function countThinkLines(text: string): number {
  return String(text).split('\n').length
}

function thinkLineHeight(body: HTMLElement): number {
  try {
    const cs = window.getComputedStyle(body)
    const n = parseFloat(cs.lineHeight)
    if (Number.isFinite(n) && n > 0) return n
    const fs = parseFloat(cs.fontSize)
    if (Number.isFinite(fs) && fs > 0) return fs * 1.2
  } catch { /* ignore */ }
  return 24
}

function thinkLabel(key: string, params?: Record<string, string | number>): string {
  const dict = activeIsZh(arguments[2] as ClientContext) ? SETTINGS_ZH : SETTINGS_EN
  let s = dict[key as keyof typeof SETTINGS_ZH] ?? SETTINGS_ZH[key as keyof typeof SETTINGS_ZH] ?? key
  if (params) {
    for (const k of Object.keys(params)) s = s.split('{' + k + '}').join(String(params[k]))
  }
  return s
}

function liveLineText(full: string): string {
  const visible = String(full).trimEnd()
  const newline = visible.lastIndexOf('\n')
  return newline === -1 ? visible : visible.slice(newline + 1)
}

// ─── installChineseEnhance ────────────────────────────────────────────────────
// DSH 0.1.2 起 LocaleRuntime 不再暴露公开的 lookup，translate 也移出公开面
// （TS 私有，但运行时仍是实例可达方法；bind 的闭包在调用时解析 this.translate）。
// 因此只在实例上覆盖 translate：无论 ui 包在我们之前还是之后 bind，都会经过本包装。
export function installChineseEnhance(zhCtx: ZhApplyContext): () => void {
  const { ctx } = zhCtx

  let observer: MutationObserver | undefined
  let autoThinkTarget: Element | null = null
  let statsResizeTimer: ReturnType<typeof setTimeout> | undefined
  let localeUnsubscribe: (() => void) | undefined
  let settingsUnsubscribe: (() => void) | undefined

  // Monkey-patch locale.translate for zh lookup (preserve originals).
  // DSH 0.1.2+: lookup is no longer exposed publicly, only translate on the instance.
  const originalTranslate = ctx.locale.translate?.bind(ctx.locale)
  const translateWasOwn = Object.prototype.hasOwnProperty.call(ctx.locale, 'translate')

  if (ctx.locale.translate) {
    ctx.locale.translate = function (ns: string, key: string, params?: Record<string, unknown>): string {
      // 只在中文界面 + 「中文补全」开启时生效：其余情况保持原样。
      if (!zhEnhanceOn(ctx)) return originalTranslate?.call(this, ns, key, params) ?? ''
      // 本插件自带词典的命名空间跳过通用词兜底：它们按界面语言自备
      // 完整译文（含 {n} 参数模板），不能被 ZH['*'] 的通用词（如「展开」）
      // 吞掉归档视图的「再展开 N 个归档」等参数文案。
      if (ns === 'dsh-zh-settings' || ns === 'dsh-zh-archive') {
        return originalTranslate?.call(this, ns, key, params) ?? ''
      }
      // 重试倒计时（DSH 0.1.2 起位于 chat 命名空间）：原始秒数按时/分/秒
      // 显示，直接拼装整句。
      if (ns === 'chat' && key === 'message.retry.status' && params) {
        const label = String(params.label ?? '')
        const retry = String(params.retry ?? '')
        const maximum = String(params.maximum ?? '')
        return label + '（' + retry + '/' + maximum + '） · ' + formatZhSeconds(params.seconds)
      }
      // 参数转换（时长/数量单位）先于模板解析，模板命中顺序与旧版一致：
      // ZH 整句 → ZH_PARTIAL 术语 → ZH['*'] 通用词 → 上游原值。
      let nextParams = params
      const table = (PARAM_TRANSFORMS as Record<string, Record<string, Record<string, (v: unknown) => unknown>>>)[ns]
      if (table?.[key] !== undefined && params) {
        nextParams = {}
        for (const k of Object.keys(params)) {
          const fn = table[key][k]
          nextParams[k] = fn !== undefined ? fn(params[k]) : params[k]
        }
      }
      const zhTable = (ZH as Record<string, Record<string, string>>)[ns]
      if (zhTable?.[key] !== undefined) return interpolateZh(zhTable[key], nextParams)
      // 部分翻译：先取上游原模板（不带参数调用返回原文模板），只替换引用的
      // 术语，其余随上游更新，再自行插值参数。
      const partial = (ZH_PARTIAL as Record<string, Record<string, string[]>>)[ns]
      if (partial?.[key] !== undefined) {
        const template = originalTranslate?.call(this, ns, key) ?? ''
        if (typeof template === 'string') {
          return interpolateZh(applyPairs(template, resolvePairs(partial[key])), nextParams)
        }
      }
      // 通配表 ZH['*']：按「键名」跨命名空间兜底，只用于补上游没本地化的通用英文词
      // （open/done/failed…）。**上游 zh 值已含中文时必须尊重上游**——否则 `empty`
      // 这类通用键名会把整句中文压成一个词（实测：0.1.7 的 settings.plugins.empty
      // 「本部署没有开放任何插件视图。」被压成「空」，settings.pluginInventory.empty
      // 「暂无插件。」同样中招）。
      const star = (ZH as Record<string, Record<string, string>>)['*']?.[key]
      if (star !== undefined) {
        const upstreamValue = originalTranslate?.call(this, ns, key)
        const upstreamLocalized = typeof upstreamValue === 'string' && /[\u4e00-\u9fff]/.test(upstreamValue)
        if (!upstreamLocalized) return interpolateZh(star, nextParams)
        return originalTranslate?.call(this, ns, key, nextParams) ?? ''
      }
      return originalTranslate?.call(this, ns, key, params) ?? ''
    }
  }

  // ── Helpers that need ctx ──────────────────────────────────────────────────
  const fixStatsFull = (textNode: Text): void => {
    if (settingsStore.getSnapshot().statsFull !== true) return
    if (!isStatsCounts(textNode.data)) return
    const group = textNode.parentElement
    if (group?.nodeType !== 1) return
    // 0.1.5 StatsPills：计数组 span[class*="label"] 位于 button/span[class*="pill"]。
    if (group.tagName === 'SPAN'
      && (group.getAttribute('class') ?? '').indexOf('label') !== -1
      && group.parentElement?.nodeType === 1
      && (group.parentElement.tagName === 'BUTTON' || group.parentElement.tagName === 'SPAN')) {
      const pill = group.parentElement
      if (pill.getAttribute(STATS_FULL_KEY) === null) {
        for (const [k, v] of STATS_PILL_STYLES) pill.style.setProperty(k, v, 'important')
        pill.setAttribute(STATS_FULL_KEY, '')
      }
      fitStatsRow(pill)
      return
    }
    // 旧版 StatsLine：DIV 行 > 首个 SPAN 计数组（0.1.4 及之前的结构）。
    if (group.tagName !== 'SPAN') return
    const row = group.parentElement
    if (row?.nodeType !== 1 || row.tagName !== 'DIV') return
    if (row.firstElementChild !== group) return
    if (row.getAttribute(STATS_FULL_KEY) === null) {
      for (const [k, v] of STATS_FULL_STYLES) row.style.setProperty(k, v, 'important')
      row.setAttribute(STATS_FULL_KEY, '')
    }
    fitStatsRow(row as HTMLElement)
  }

  const hidePromptProviderText = (textNode: Text): void => {
    if (!activeIsZh(ctx)) return
    if (textNode.data !== PROMPT_PROVIDER_NAME) return
    let el = textNode.parentElement
    for (let depth = 0; el !== null && depth < 6; depth += 1) {
      if (el.tagName === 'LI') {
        if (el.getAttribute(PROMPT_PROVIDER_KEY) === null) el.setAttribute(PROMPT_PROVIDER_KEY, '')
        el.style.setProperty('display', 'none', 'important')
        return
      }
      if (el.tagName === 'OPTION') {
        if (el.getAttribute(PROMPT_PROVIDER_KEY) === null) el.setAttribute(PROMPT_PROVIDER_KEY, '')
        ;(el as HTMLOptionElement).hidden = true
        return
      }
      el = el.parentElement
    }
  }

  // ── Core rewrite pass ──────────────────────────────────────────────────────
  const rewrite = (root: Node, exact: Record<string, string>, patterns: Array<unknown>): void => {
    if (root.nodeType === Node.TEXT_NODE) {
      const tn = root as Text
      const to = rewriteText(tn.data, exact, patterns as Parameters<typeof rewriteText>[2])
      if (to !== tn.data) tn.data = to
      fixStatsFull(tn)
      if (activeIsZh(ctx)) hidePromptProviderText(tn)
      return
    }
    if (root.nodeType !== Node.ELEMENT_NODE) return
    const el = root as HTMLElement
    if (el.hasAttribute?.(THINK_LINES_ATTR) || el.hasAttribute?.(THINK_CTRL_ATTR) || el.hasAttribute?.(THINK_LIVE_ATTR)) return
    if (el.hasAttribute?.('title') || el.hasAttribute?.('aria-label')) {
      for (const attr of ['title', 'aria-label'] as (keyof HTMLElement)[]) {
        const val = el.getAttribute(attr)
        if (val === null) continue
        const to = rewriteText(val, exact, patterns as Parameters<typeof rewriteText>[2])
        if (to !== val) el.setAttribute(attr, to)
      }
    }
    let child = el.firstChild
    while (child !== null) {
      rewrite(child, exact, patterns)
      child = child.nextSibling
    }
  }

  const runThinkAuto = (): void => {
    if (!settingsStore.getSnapshot().thinkingAuto) {
      if (autoThinkTarget && document.contains(autoThinkTarget) && isThinkOpen(autoThinkTarget)) {
        toggleThink(autoThinkTarget)
      }
      autoThinkTarget = null
      return
    }
    const target = latestRunningThink()
    if (target === null) {
      // 没有正在流式输出的思考：思考已结束。
      // 1) 若最近思考块正是我们自动展开的那条（autoThinkTarget 已被宿主重建
      //    而失效，或仍有效但被折叠），重新展开它——保持"流完仍展开供阅读"。
      // 2) 同时清理"已结束思考"的残留样式：当思考结束且正文已不在 max-height
      //    折叠态时，不再保留空白占位。原厂在 max<=0 时会 restoreAllThinkLines，
      //    此处做最小清理：对仍被标记为 clamped 的已完成思考正文立即还原。
      //    历史会话的思考块（不是 autoThinkTarget）不做自动展开。
      const roots = thinkRoots()
      const last = roots.length > 0 ? roots[roots.length - 1] as Element : null
      const isDoneThink = (el: Element): boolean => el.getAttribute?.('data-state') !== 'running'
      // 先清理已完成思考的"已收起但占位"残留：仅当思考已结束且正文仍被 clamped 时还原，
      // 这样空白不会等到下一次思考出现才消失。smooth 接管块由 smooth 的 grid 负责。
      for (const r of Array.from(roots)) {
        if (!isDoneThink(r)) continue
        const body = thinkBodyDiv(r as Element)
        if (!body) continue
        if (isSmoothStreamBlock(r as Element)) continue
        if (body.hasAttribute?.(THINK_LINES_ATTR) && body.textContent !== null) {
          // 已完成且正文为空/仅空白，或 max 已为 0 时，立即还原，避免 0 高度占位。
          const txt = body.textContent?.trim() ?? ''
          const max = thinkMaxNow()
          if (txt === '' || max <= 0) {
            if (body.style) { body.style.maxHeight = ''; body.style.overflow = ''; body.style.overflowY = ''; body.style.scrollTop = 0 }
            body.__dshZhThink = undefined
            if (typeof body.removeAttribute === 'function') body.removeAttribute(THINK_LINES_ATTR)
          }
        }
      }
      if (last === null) return
      if (autoThinkTarget !== null && !document.contains(autoThinkTarget)) {
        // 宿主用新节点替换了旧的思考块：把引用指向新的最近思考块。
        autoThinkTarget = last
      }
      if (autoThinkTarget === last && !isThinkOpen(last)) {
        toggleThink(last)
      }
      return
    }
    if (target === autoThinkTarget) return
    if (autoThinkTarget && document.contains(autoThinkTarget) && isThinkOpen(autoThinkTarget)) {
      toggleThink(autoThinkTarget)
    }
    autoThinkTarget = target
    if (!isThinkOpen(target)) toggleThink(target)
  }

  // ── Stats resize handler ───────────────────────────────────────────────────
  const statsResizeListener = (): void => {
    if (statsResizeTimer !== undefined) clearTimeout(statsResizeTimer)
    statsResizeTimer = setTimeout(() => {
      statsResizeTimer = undefined
      if (document.body === null) return
      const rows = document.body.querySelectorAll<HTMLElement>('[' + STATS_FULL_KEY + ']')
      for (const row of rows) fitStatsRow(row)
      applyChatWidth()
    }, 100)
  }

  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('resize', statsResizeListener)
  }

  // ── Main DOM pass ──────────────────────────────────────────────────────────
  let domStarted = false
  const runPass = (roots?: Node[]): void => {
    if (document.body === null) return
    const snap = settingsStore.getSnapshot()
    const zh = activeIsZh(ctx)

    // 自动展开流式中的最新思考（原插件在 rewrite 前调用 runThinkAuto）。
    runThinkAuto()

    // Stats full
    if (snap.statsFull !== true) {
      const fixed = document.body.querySelectorAll<HTMLElement>('[' + STATS_FULL_KEY + ']')
      for (const el of fixed) {
        for (const [k, v] of STATS_FULL_STYLES) el.style.removeProperty(k)
        el.style.removeProperty('overflow-x')
        el.style.removeProperty('font-size')
        el.removeAttribute(STATS_FULL_KEY)
      }
    }

    if (!zh) {
      const hidden = document.body.querySelectorAll('[data-dsh-zh-hide-prompt-provider]')
      for (const el of Array.from(hidden)) {
        if (el.tagName === 'OPTION') (el as HTMLOptionElement).hidden = false
        else el.style.removeProperty('display')
        el.removeAttribute(PROMPT_PROVIDER_KEY)
      }
    }

    const targets = roots ?? [document.body]
    const exact = (zh && snap.zhComplete) ? FORWARD : REVERSE
    const patterns = (zh && snap.zhComplete) ? TRAJ_PATTERNS : TRAJ_REVERSE
    for (const target of targets) rewrite(target, exact, patterns)

    if (snap.thinkMaxLines > 0) {
      const rts = thinkRoots()
      for (const rt of Array.from(rts)) {
        applyThinkLinesToBody(rt as Element, thinkBodyDiv(rt as Element), snap.thinkMaxLines)
      }
    } else {
      // 思考折叠关闭时，即使 body 已卸载也要清理孤儿控件/残留空白。
      const rts = thinkRoots()
      for (const rt of Array.from(rts)) {
        applyThinkLinesToBody(rt as Element, thinkBodyDiv(rt as Element), 0)
      }
    }
    applyChatWidth()
  }

  const mutationRoots = (records: MutationRecord[]): Node[] | undefined => {
    if (!records) return undefined
    const roots: Node[] = []
    const addRoot = (node: Node): void => {
      if (!node || (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.TEXT_NODE)) return
      for (let i = roots.length - 1; i >= 0; i--) {
        const cur = roots[i]
        if (cur === node) return
        if (cur.contains?.(node)) return
        if (node.contains?.(cur)) { roots.splice(i, 1); break }
      }
      roots.push(node)
    }
    for (const rec of records) {
      if (rec.type === 'childList') {
        for (const n of rec.addedNodes) addRoot(n)
      } else {
        addRoot(rec.target)
      }
    }
    return roots
  }

  const observerOptions: MutationObserverInit = { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['title', 'aria-label'] }

  const runObservedPass = (roots?: Node[]): void => {
    if (observer) observer.disconnect()
    try { runPass(roots) } finally { if (observer) observer.observe(document.documentElement, observerOptions) }
  }

  settingsUnsubscribe = settingsStore.subscribe(() => {
    if (document.body === null) return
    runObservedPass()
  })

  if (typeof ctx.locale.subscribe === 'function') {
    localeUnsubscribe = ctx.locale.subscribe(() => {
      if (document.body === null) return
      runObservedPass()
    })
  }

  observer = new MutationObserver((records) => {
    runObservedPass(mutationRoots(records))
  })

  const resetDomEffects = (): void => {
    domStarted = false
    if (autoThinkTarget && document.contains(autoThinkTarget) && isThinkOpen(autoThinkTarget)) {
      toggleThink(autoThinkTarget)
    }
    autoThinkTarget = null
    if (document.body) {
      const roots = thinkRoots()
      for (const rt of Array.from(roots)) {
        applyThinkLinesToBody(rt as Element, thinkBodyDiv(rt as Element), 0)
      }
      const fixed = document.body.querySelectorAll<HTMLElement>('[' + STATS_FULL_KEY + ']')
      for (const el of fixed) {
        for (const [k] of STATS_FULL_STYLES) el.style.removeProperty(k)
        el.style.removeProperty('overflow-x')
        el.style.removeProperty('font-size')
        el.removeAttribute(STATS_FULL_KEY)
      }
    }
  }

  const start = (): void => {
    domStarted = true
    runObservedPass()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true })
  } else {
    start()
  }

  return function () {
    if (observer) observer.disconnect()
    if (statsResizeTimer !== undefined) clearTimeout(statsResizeTimer)
    if (typeof window !== 'undefined' && window.removeEventListener) {
      window.removeEventListener('resize', statsResizeListener)
    }
    if (settingsUnsubscribe) settingsUnsubscribe()
    if (localeUnsubscribe) localeUnsubscribe()
    resetDomEffects()
    // 还原 translate：原本是原型方法时移除实例覆盖，避免留下多余的自有属性。
    if (ctx.locale && translateWasOwn) ctx.locale.translate = originalTranslate
    else if (ctx.locale) delete ctx.locale.translate
  }
}

// ─── Thinking lines (CSS clamp + scroll follow) ──────────────────────────────
// (Adapted from source — full implementation inlined for completeness)

/**
 * smooth-stream 接管思考块时（其 AnimatedDisclosure 折叠体带
 * data-disclosure-content 特征），zh 跳过 max-height 压缩，由 smooth 的
 * grid 折叠动画负责，避免双重折叠在同一块叠加（源插件同款检测）。
 */
function isSmoothStreamBlock(root: Element): boolean {
  if (root === null || typeof root.querySelector !== 'function') return false
  return root.querySelector('[data-disclosure-content]') !== null
}

function applyThinkLinesToBody(root: Element, body: HTMLElement | null, max: number): void {
  // 原版"收起"只卸载正文，按钮/实时行作为正文兄弟残留；无论 body 是否存在都要清理。
  if (root !== null && typeof (root as unknown as { querySelectorAll?: unknown }).querySelectorAll === 'function') {
    const nodes = (root as HTMLElement).querySelectorAll('[data-dsh-zh-think-control], [data-dsh-zh-think-live]')
    for (const node of Array.from(nodes)) {
      const isCtrl = (node as HTMLElement).hasAttribute?.(THINK_CTRL_ATTR)
      const keep = isCtrl && body !== null && body.parentNode === (node as HTMLElement).parentNode
        && ((node as HTMLElement).nextSibling === body || (node as HTMLElement).previousSibling === body)
      if (!keep && (node as HTMLElement).parentNode) try { (node as HTMLElement).parentNode!.removeChild(node as HTMLElement) } catch { /* ignore */ }
    }
  }
  if (body === null) return
  if (isSmoothStreamBlock(root)) return
  const from = thinkMaxFromNow()
  const running = isThinkRunning(root)

  if (max <= 0 || !body.textContent?.trim()) {
    if (body.style) { body.style.maxHeight = ''; body.style.overflow = ''; body.style.overflowY = ''; body.style.scrollTop = 0 }
    body.__dshZhThink = undefined
    return
  }

  if (thinkModeNow() === 'scroll') {
    const lh = thinkLineHeight(body)
    const total = countThinkLines(body.textContent)
    if (total <= max) {
      if (body.style) { body.style.maxHeight = ''; body.style.overflow = '' }
      return
    }
    if (body.style) {
      body.style.maxHeight = Math.round(lh * max) + 'px'
      body.style.overflow = 'hidden'
      body.style.overflowY = 'auto'
      if (from === 'latest' && running) body.scrollTop = Math.max(0, body.scrollHeight - body.clientHeight)
      else if (from === 'earliest') body.scrollTop = 0
    }
    body.__dshZhThink = { shown: max, from }
    return
  }

  // Button mode
  const lh = thinkLineHeight(body)
  if (body.style) {
    body.style.maxHeight = Math.round(lh * max) + 'px'
    body.style.overflow = 'hidden'
    body.style.overflowY = ''
    body.style.scrollTop = from === 'latest'
      ? Math.max(0, body.scrollHeight - body.clientHeight) : 0
  }
  body.__dshZhThink = { shown: max, from }
}
