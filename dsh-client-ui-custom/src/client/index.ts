/**
 * Web-surface theme plugin, browser half: theme customization,
 * plus the "外观" settings section.
 *
 * Theme pipeline (config.ts / presets.ts / apply.ts):
 *   DEFAULTS ← preset (preset: '<id>') ← profile config, then
 *   normalizeConfig() clamps every field and applyConfig() writes the
 *   `--dsu-*` variables the stylesheet consumes. The whole override set is
 *   gated behind `html[data-dsu-active]`; with no overrides the theme side
 *   is a no-op and the profile stays stock.
 *
 * Feature selection (config.ts resolveFeatures / shared.ts FEATURES): each
 * independently selectable feature (markdown / appearance /
 * usage / motion) mounts its own settings rows, pages and DOM effects. The
 * loader config's `features` whitelist decides which mount; absent or
 * empty = everything (backward compatible).
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { ConnectionHandle } from '@deepseek-ai/dsh-api-remotes/client'
// Type-only: pulls the locale Context merge (ctx.locale) and the settings
// scope + settings.section slot declarations (ctx.settingsScope, SlotMap).
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: pulls the ui-layout SlotMap merge (the shell.overlay seat).
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
// Type-only: pulls the ui-conversation SlotMap merge (the
// conversation.chat.assistant-actions entry + its owner props).
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { ScopeFace } from '@deepseek-ai/dsh-client-ui-settings/client'
import { ZH_SETTINGS_NS, type ZhSettingsSection, type ZhPromptSection } from './zh/shared.ts'
import { applyConfig } from './apply.ts'
import { normalizeConfig, resolveFeatures, type CustomThemeConfig } from './config.ts'
import { resolvePreset } from './presets.ts'
import {
  DEFAULT_MOTION_STYLE, DEFAULT_NEW_CHAT_MOTION_STYLE, DEFAULT_SIDEBAR_MOTION_STYLE,
  MOTION_PRESETS, isMotionPresetId, isMotionStyle, isNewChatMotionStyle, isSidebarMotionStyle,
  UI_CUSTOM_SETTINGS_NS,
  type PluginFeature, type ThemeSection, type UiCustomSection,
} from '../shared.ts'
import { usageOverlay } from './usage-overlay.ts'
import { USAGE_NS, en as usageEn, zh as usageZh } from './usage/usage-locales.ts'
import { APPEARANCE_NS, en as appearanceEn, zh as appearanceZh } from './appearance/appearance-locales.ts'
import { AppearanceSettingsController, type AppearanceInjected } from './appearance/controller.ts'
import { AppearanceSection } from './appearance/AppearanceSection.tsx'
import { PreviewBar, type PreviewBarInjected } from './appearance/PreviewBar.tsx'
import { previewBar } from './preview-bar.ts'
import { UsageSection } from './usage/UsageSection.tsx'
import { UsageOverlay } from './usage/UsageOverlay.tsx'
import type { UsageInjected, UsageOverlayInjected } from './usage/contract.ts'
import { configFromThemeSection } from './theme-section.ts'
import { MARKDOWN_NS, zh as markdownZh, en as markdownEn } from './markdown/markdown-locales.ts'
import { UserMarkdownNodeView, type MarkdownRenderInjected } from './markdown/UserMarkdownNodeView.tsx'
import { MOTION_NS, zh as motionZh, en as motionEn } from './motion/motion-locales.ts'
import { MotionSection, type MotionSectionInjected } from './motion/MotionSection.tsx'
import { installConversationEntrance, installSettingsMotion } from './motion/motion.ts'
import { applyZh, type ApplyZhOptions } from './zh/index.ts'
import { apply as applySmooth } from './smooth/index.ts'
import { UiEnhanceSection, type UiEnhanceInjected, type UiEnhanceTab } from './ui-enhance/UiEnhanceSection.tsx'
import { UI_ENHANCE_NS, en as uiEnhanceEn, zh as uiEnhanceZh } from './ui-enhance/ui-enhance-locales.ts'
import './custom.css'

export { UI_ENHANCE_NS }

export type { CustomThemeConfig } from './config.ts'
export type { ThemePreset } from './presets.ts'
export { DEFAULTS, CONFIG_KEYS, normalizeConfig, resolveFeatures, clampNumber, cleanString } from './config.ts'
export { PRESETS, PRESET_MAP, resolvePreset } from './presets.ts'
export { FEATURES, type PluginFeature } from '../shared.ts'

/** Required services: theme (none extra), settings UI (slots/locale/settingsScope/sessions). */
export const inject = ['slots', 'locale', 'connection', 'sessions', 'workspaces', 'settingsScope', 'remote', 'remote.pluginInventory']

/**
 * Client plugin body: mount each enabled feature (appearance /
 * usage / markdown). The loader config's `features` whitelist
 * decides which features register; absent = everything.
 * @param ctx - client root context.
 * @param config - profile-level plugin config (partial over the preset).
 */
export function apply(ctx: ClientContext, config?: Partial<CustomThemeConfig>): void {
  const scope = ctx.settingsScope.bind<UiCustomSection>({ namespace: UI_CUSTOM_SETTINGS_NS })
  const presetId = typeof config?.preset === 'string' ? config.preset : ''
  const normalized = normalizeConfig(config, resolvePreset(presetId))
  // The runtime settings scope is the only config channel that reaches the
  // browser (the loader config arrives via the host-registered namespace
  // base, never as the apply argument). Its first snapshot arrives
  // asynchronously, so feature registration waits for it (registerFeatures).

  // ── Shared outer-scope refs for the unified ui-enhance inject ───────────────
  // Created inside registerFeatures when their feature is enabled.
  let appearanceCtrl: AppearanceSettingsController | undefined
  let appearanceActionsRef: ReturnType<AppearanceSettingsController['mount']>['actions'] | undefined
  let zhSettingsScope: ScopeFace<ZhSettingsSection> | undefined
  let zhPromptScope: ScopeFace<ZhPromptSection> | undefined

  // Native widgets (range tracks, select dropdown panels, color pickers) are
  // drawn from the root color-scheme. The shell sets it once at boot from the
  // OS preference and never re-syncs it to the app theme, so keep it pinned to
  // the ACTIVE theme (body[data-ds-dark-theme]) here — otherwise a light theme
  // on a dark OS leaves black slider tracks, and a dark theme on a light OS
  // leaves white dropdown panels.
  ctx.effect(() => {
    const syncColorScheme = (): void => {
      const dark = document.body.hasAttribute('data-ds-dark-theme')
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    }
    syncColorScheme()
    const observer = new MutationObserver(syncColorScheme)
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })
    return () => { observer.disconnect() }
  }, 'ui-custom: color-scheme follows the active theme')

  // ── 动效：对话入场动效引擎 ─────────────────────────────────────────────
  // Starts before the settings scope resolves so the very first conversation
  // render is captured (batches buffer until the whitelist + toggle land).
  // The isEnabled check gates on both: the whitelist (feature excluded =
  // inert) and the 动效 settings-section toggle. Shared by the conversation
  // engine AND the settings-shell trigger below.
  const sharedMotionSource = {
    getState: () => {
      const snapshot = scope.getSnapshot()
      // A blank current session = a brand-new conversation (its main dialog
      // animates in); the engine reads this to gate the composer entrance.
      const sessionList = ctx.sessions.list.getSnapshot()
      const blank = sessionList.current !== undefined
        && sessionList.byId[sessionList.current]?.blank === true
      const motionOn = resolveFeatures(snapshot.value ?? {}).has('motion')
      if (snapshot.status === 'ready' && snapshot.value !== undefined) {
        const value = snapshot.value
        return {
          transcript: motionOn && (value.motionEnabled ?? true),
          sidebar: motionOn && (value.sidebarMotionEnabled ?? true),
          selection: motionOn && (value.selectionMotionEnabled ?? true),
          newChat: motionOn && (value.newChatMotionEnabled ?? true),
          style: isMotionStyle(value.motionStyle) ? value.motionStyle : DEFAULT_MOTION_STYLE,
          sidebarStyle: isSidebarMotionStyle(value.sidebarMotionStyle)
            ? value.sidebarMotionStyle
            : DEFAULT_SIDEBAR_MOTION_STYLE,
          newChatStyle: isNewChatMotionStyle(value.newChatMotionStyle)
            ? value.newChatMotionStyle
            : DEFAULT_NEW_CHAT_MOTION_STYLE,
          blank,
        }
      }
      // Not resolved yet: stay inert and let the engine buffer the first
      // load, which flushes when the settings land. Unavailable (namespace
      // not exposed / memory mode): fall back to the default-on state.
      const fallback = snapshot.status === 'unavailable'
      return {
        transcript: fallback,
        sidebar: fallback,
        selection: fallback,
        newChat: fallback,
        style: DEFAULT_MOTION_STYLE,
        sidebarStyle: DEFAULT_SIDEBAR_MOTION_STYLE,
        newChatStyle: DEFAULT_NEW_CHAT_MOTION_STYLE,
        blank,
      }
    },
    subscribe: (listener: () => void) => {
      // Both the settings scope and the session ledger feed the engine:
      // settings gate enable/style, sessions gate the blank flag.
      const unsubscribeScope = scope.subscribe(listener)
      const unsubscribeSessions = ctx.sessions.list.subscribe(listener)
      return () => {
        unsubscribeScope()
        unsubscribeSessions()
      }
    },
  }
  const motionEngine = installConversationEntrance(sharedMotionSource)
  ctx.effect(() => motionEngine.dispose, 'ui-custom: motion engine teardown')

  // Settings-shell motion trigger: the original plugin's "animation" feature
  // behavior — the dialog/backdrop animate via pure CSS on mount, and this
  // trigger re-applies the content-column .dsu-anim-reveal class on every
  // page switch. Inert unless html[data-dsu-anim] is set (see syncSettingsMotion).
  const settingsMotion = installSettingsMotion(sharedMotionSource)
  ctx.effect(() => settingsMotion, 'ui-custom: settings-motion engine teardown')

  // Settings-panel motion gate (html[data-dsu-anim]) + style-tier knobs
  // (--dsu-anim-duration / --dsu-anim-ease / --dsu-anim-rise), exactly like
  // the original plugin's 动效 section. Defaults ON until the scope resolves.
  const syncSettingsMotion = (): void => {
    const snapshot = scope.getSnapshot()
    const on = snapshot.status === 'ready' && snapshot.value !== undefined
      ? resolveFeatures(snapshot.value).has('motion') && (snapshot.value.settingsMotionEnabled ?? true)
      : true
    const root = document.documentElement
    if (on) {
      root.setAttribute('data-dsu-anim', '')
      // Standard style tier (matches the original plugin's MOTION_STYLE.standard).
      root.style.setProperty('--dsu-anim-duration', '200ms')
      root.style.setProperty('--dsu-anim-ease', 'cubic-bezier(0.2, 0, 0, 1)')
      root.style.setProperty('--dsu-anim-rise', '6px')
    } else {
      root.removeAttribute('data-dsu-anim')
      root.style.removeProperty('--dsu-anim-duration')
      root.style.removeProperty('--dsu-anim-ease')
      root.style.removeProperty('--dsu-anim-rise')
    }
  }
  syncSettingsMotion()
  ctx.effect(() => scope.subscribe(syncSettingsMotion), 'ui-custom: settings-motion gate sync')

  // Every conversation open/switch force-replays the entrance (the observer
  // covers mounts it can correlate; this covers the rest), so a conversation
  // animates on each visit, not just the first.
  let lastSessionId: string | undefined
  const syncSession = (): void => {
    const current = ctx.sessions.list.getSnapshot().current
    if (current === lastSessionId) return
    lastSessionId = current
    if (current !== undefined) motionEngine.notifySessionSwitch()
  }
  syncSession()
  const unsubscribeSessions = ctx.sessions.list.subscribe(syncSession)
  ctx.effect(() => unsubscribeSessions, 'ui-custom: session switch signal')

  // ── Feature registration ──────────────────────────────────────────────────
  // The whitelist arrives through the settings scope's first snapshot (which
  // lands asynchronously), so registration runs once the scope is ready and
  // re-runs on its arrival if it is still loading. Every feature's settings
  // rows, pages and DOM effects are gated below.
  // UI增强 entry is always visible (must not be gated by FEATURES); the
  // dictionaries for that entry are registered eagerly so the left nav can
  // render immediately. Only the inner tab content is gated by FEATURES.
  ctx.effect(() => ctx.locale.register(UI_ENHANCE_NS, { zh: uiEnhanceZh, en: uiEnhanceEn }), 'ui-custom: ui-enhance dictionaries')

  let featuresRegistered = false
  const registerFeatures = (): void => {
    if (featuresRegistered) return
    const snapshot = scope.getSnapshot()
    if (snapshot.status !== 'ready' || snapshot.value === undefined) return
    featuresRegistered = true
    const features = resolveFeatures(snapshot.value)
    const enabled = (feature: PluginFeature): boolean => features.has(feature)

    // Keep ui-enhance translator available for the section label inside tabs.
    const uiEnhanceT = ctx.locale.bind(UI_ENHANCE_NS)

    // ── Locales: register mounted features' dictionaries (needed for t() inside tabs) ──
    if (enabled('usage')) ctx.effect(() => ctx.locale.register(USAGE_NS, { zh: usageZh, en: usageEn }), 'ui-custom: usage dictionaries')
    if (enabled('appearance')) {
      ctx.effect(
        () => ctx.locale.register(APPEARANCE_NS, { zh: appearanceZh, en: appearanceEn }),
        'ui-custom: appearance dictionaries',
      )
    }
    if (enabled('markdown')) {
      ctx.effect(
        () => ctx.locale.register(MARKDOWN_NS, { zh: markdownZh, en: markdownEn }),
        'ui-custom: markdown dictionaries',
      )
    }
    if (enabled('motion')) {
      ctx.effect(
        () => ctx.locale.register(MOTION_NS, { zh: motionZh, en: motionEn }),
        'ui-custom: motion dictionaries',
      )
    }

  // ── 外观：theme pipeline + appearance controller + preview overlay ──────────
  if (enabled('appearance')) {
    applyConfig(normalized)
    const applyTheme = (): void => {
      const snap = scope.getSnapshot()
      const user = snap.user
      const explicitDark = typeof user === 'object' && user !== null && 'darkSurfaceOpacity' in user
      let effective: ThemeSection | undefined
      if (snap.value === undefined) {
        effective = undefined
      } else if (explicitDark) {
        effective = snap.value
      } else {
        const { darkSurfaceOpacity: _inherited, ...rest } = snap.value
        effective = { ...rest, darkSurfaceOpacity: undefined }
      }
      applyConfig(configFromThemeSection(normalized, effective))
    }
    applyTheme()
    ctx.effect(() => scope.subscribe(applyTheme), 'ui-custom: theme settings sync')

    // The appearance controller: provides the appearance.store observable + actions.
    // Stored at outer scope so the unified ui-enhance inject can reach it.
    appearanceCtrl = new AppearanceSettingsController(
      scope,
      normalized,
      (config) => applyConfig(config),
    )
    const { dispose: disposeAppearance, actions: appearanceActions } = appearanceCtrl.mount()
    appearanceActionsRef = appearanceActions
    ctx.effect(() => () => disposeAppearance(), 'ui-custom: appearance settings scope')

    // Preview overlay (F2 to exit + Apply/Cancel bar): still registered separately.
    const reopenSettings = (): void => {
      const triggers = document.querySelectorAll<HTMLElement>('[aria-haspopup="dialog"]')
      for (const trigger of triggers) {
        const label = trigger.textContent ?? ''
        if (label.includes('设置') || label.includes('Settings') || label.includes('設定')) {
          trigger.click()
          break
        }
      }
      window.setTimeout(() => {
        const rows = document.querySelectorAll<HTMLElement>('button')
        for (const row of rows) {
          const text = (row.textContent ?? '').trim()
          if (text === '外观' || text === 'Appearance' || text === '外觀') {
            row.click()
            return
          }
        }
      }, 60)
    }
    ctx.slots.inject('shell.overlay', () => ctx.slots.register({
      name: 'shell.overlay',
      id: 'ui-custom-preview',
      order: 90,
      locale: APPEARANCE_NS,
      inject: (): PreviewBarInjected => ({
        hooks: { previewVisible: previewBar },
        onExit: () => { previewBar.hide(); reopenSettings() },
      }),
    }, PreviewBar))
  }

  // ── 用量 overlay（settings section is now inside ui-enhance）───────────────
  if (enabled('usage')) {
    ctx.slots.inject('shell.overlay', () => ctx.slots.register({
      name: 'shell.overlay',
      id: 'ui-custom-usage',
      order: 100,
      locale: USAGE_NS,
      inject: (): UsageOverlayInjected => ({
        hooks: { sessions: ctx.sessions.list, usageVisible: usageOverlay },
      }),
    }, UsageOverlay))
  }

  // ── 用户消息 Markdown 渲染：user/steering node shadowing ─────────────────
  if (enabled('markdown')) {
    ctx.slots.inject('conversation.chat.node', () => ctx.slots.register({
      name: 'conversation.chat.node',
      key: 'user',
      priority: -2,
      locale: 'conversation',
      inject: (): MarkdownRenderInjected => ({ hooks: { mdRender: scope } }),
    }, UserMarkdownNodeView))
    ctx.slots.inject('conversation.chat.node', () => ctx.slots.register({
      name: 'conversation.chat.node',
      key: 'steering',
      priority: -2,
      locale: 'conversation',
      inject: (): MarkdownRenderInjected => ({ hooks: { mdRender: scope } }),
    }, UserMarkdownNodeView))
  }

  // ── 中文优化（zh）feature：汉化 + DOM 增强 + 会话管理（skipSection）────
  // Prepare zh scopes BEFORE the unified section so the inject can capture them.
  // The section registration itself is skipped (consolidated into ui-enhance).
  if (enabled('zh')) {
    zhSettingsScope = ctx.settingsScope.bind<ZhSettingsSection>({ namespace: UI_CUSTOM_SETTINGS_NS }) as unknown as ScopeFace<ZhSettingsSection>
    zhPromptScope = ctx.settingsScope.bind<ZhPromptSection>({ namespace: UI_CUSTOM_SETTINGS_NS }) as unknown as ScopeFace<ZhPromptSection>
  }

  // ── 统一 UI增强 settings.section（外观/用量/动效/增强 → tab）────────────
  // Registers ONE left-nav entry; the four sub-sections render as tabs inside.
  // This entry is always registered (the unified UI增强 is the single entry point);
  // the inner tabs are filtered by FEATURES below — the left nav never shows the
  // four separate rows again.
  const zhT = enabled('zh') ? ctx.locale.bind(ZH_SETTINGS_NS) : (_k: string) => ''
  // Per-section translators: the host binds the unified section's `t` to
  // UI_ENHANCE_NS only, but each sub-section calls keys from its OWN namespace.
  // Bind a translator for each so t() resolves the right dictionary.
  const appearanceT = ctx.locale.bind(APPEARANCE_NS)
  const usageT = ctx.locale.bind(USAGE_NS)
  const motionT = ctx.locale.bind(MOTION_NS)
  // Build the tab allowlist from the feature whitelist so disabled features
  // don't render inside the unified panel.
  const enabledTabs = ((): UiEnhanceTab[] => {
    const tabs: UiEnhanceTab[] = []
    if (enabled('appearance')) tabs.push('appearance')
    if (enabled('motion')) tabs.push('motion')
    if (enabled('zh')) tabs.push('zh')
    if (enabled('usage')) tabs.push('usage')
    return tabs.length > 0 ? tabs : (['appearance'] as UiEnhanceTab[])
  })()
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'ui-enhance',
    order: 10,
    label: () => uiEnhanceT('nav'),
    locale: UI_ENHANCE_NS,
    active: enabledTabs.length >= 0,
    inject: (): UiEnhanceInjected => ({
      enabledTabs,
      // ── Raw snapshot sources under `hooks` ──
      // The host wraps every `hooks.*` value into a callable SnapshotSelectorHook
      // (engine products carry bare snapshot sources; hook binding is the host's
      // job). The four sub-sections call these as hooks (useAppearance /
      // useSessions / useMotion) or as ScopeFace (settings / promptSettings).
      // Flattening them to top-level props would skip the wrapping and crash.
      hooks: {
        appearance: appearanceCtrl?.store ?? null,
        sessions: ctx.sessions.list,
        motion: scope,
      },
      // zh scopes: delivered at top level as ScopeFace (NOT under hooks, which
      // would wrap them into callable hooks and break ZhSettingsSectionComponent).
      settings: zhSettingsScope ?? null,
      promptSettings: zhPromptScope ?? null,
      // appearance actions
      setField: appearanceActionsRef?.setField ?? (() => {}),
      applyFontPreset: appearanceActionsRef?.applyFontPreset ?? (() => {}),
      randomInspiration: appearanceActionsRef?.randomInspiration ?? (() => {}),
      resetGroup: appearanceActionsRef?.resetGroup ?? (() => {}),
      preview: appearanceActionsRef?.preview ?? (() => {}),
      applyPreset: appearanceActionsRef?.applyPreset ?? (() => {}),
      saveMyPreset: appearanceActionsRef?.saveMyPreset ?? (() => {}),
      removeMyPreset: appearanceActionsRef?.removeMyPreset ?? (() => {}),
      applyMyPreset: appearanceActionsRef?.applyMyPreset ?? (() => {}),
      cancelPreview: appearanceActionsRef?.cancelPreview ?? (() => {}),
      save: appearanceActionsRef?.save ?? (() => {}),
      resetAll: appearanceActionsRef?.resetAll ?? (() => {}),
      // motion actions
      setMotionEnabled: (v) => { void scope.set('motionEnabled', v) },
      setMotionStyle: (s) => { void scope.set('motionStyle', s) },
      setSidebarMotionEnabled: (v) => { void scope.set('sidebarMotionEnabled', v) },
      setSidebarMotionStyle: (s) => { void scope.set('sidebarMotionStyle', s) },
      setSelectionMotionEnabled: (v) => { void scope.set('selectionMotionEnabled', v) },
      setNewChatMotionEnabled: (v) => { void scope.set('newChatMotionEnabled', v) },
      setNewChatMotionStyle: (s) => { void scope.set('newChatMotionStyle', s) },
      setSettingsMotionEnabled: (v) => { void scope.set('settingsMotionEnabled', v) },
      applyMotionPreset: (presetId) => {
        if (!isMotionPresetId(presetId)) return
        const config = MOTION_PRESETS.find(p => p.id === presetId)?.config
        if (config === undefined) return
        void scope.set('motionEnabled', config.motionEnabled)
        void scope.set('motionStyle', config.motionStyle)
        void scope.set('sidebarMotionEnabled', config.sidebarMotionEnabled)
        void scope.set('sidebarMotionStyle', config.sidebarMotionStyle)
        void scope.set('selectionMotionEnabled', config.selectionMotionEnabled)
        void scope.set('newChatMotionEnabled', config.newChatMotionEnabled)
        void scope.set('newChatMotionStyle', config.newChatMotionStyle)
        void scope.set('settingsMotionEnabled', config.settingsMotionEnabled)
      },
      // zh
      zhT,
      appearanceT,
      usageT,
      motionT,
    }),
  }, UiEnhanceSection))

  if (enabled('zh')) {
    ctx.effect(() => applyZh(ctx, { skipSection: true }), 'ui-custom: zh feature')
  }

  // ── 丝滑流式（smooth）feature：打字机渲染 + 滚动跟随 ──────────────────
  if (enabled('smooth')) {
    // Smooth takes over the assistant-step renderer (so text streams with the
    // smooth reveal) but renders the think block itself with a zh-style
    // fixed-height internal-scroll container, so the think block keeps its
    // per-line scroll regardless of `zh`'s DOM controller.
    ctx.effect(() => applySmooth(ctx, { takeover: true }), 'ui-custom: smooth feature')
  }
  } // end of registerFeatures

  // Kick registration; if the settings snapshot has not landed yet, wait for
  // its arrival (the loader config reaches the browser asynchronously).
  registerFeatures()
  if (!featuresRegistered) {
    const disposeRegistration = scope.subscribe(() => { registerFeatures() })
    ctx.effect(() => disposeRegistration, 'ui-custom: feature registration waiter')
  }

  // Type-reference the connection face so its injection is tracked.
  void (ctx.get('connection') as ConnectionHandle)
}
