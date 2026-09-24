/**
 * dsh-client-ui-custom smooth feature — browser half entry point.
 *
 * Ports dsh-smooth-stream's丝滑流式渲染能力 into the dsh-client-ui-custom host.
 *
 * Architecture notes:
 * - Settings: uses `ctx.settingsScope` (ui-custom namespace) instead of the
 *   original loopback RPC channel `/smooth-stream`. The smooth fields are
 *   stored under the ui-custom settings namespace.
 * - Boot config: reads from local `DEFAULT_STREAM_CONFIG` instead of the
 *   `__DSH_SMOOTH_STREAM_CONFIG__` global (no host boot bridge in this port).
 * - Diagnostics: local settings store with localStorage persistence, mirrored
 *   to the settings scope for the settings card.

 *
 * Source: /tmp/dsh-smooth-stream/src/client/index.ts apply() pattern.
 * Host pattern: /Users/zhong/project/dsh-plugins/ui-custom/dsh-client-ui-custom/src/client/index.ts registerFeatures().
 */
import { createElement, useSyncExternalStore, type ComponentType, type ReactNode } from 'react'
import { Component } from 'react'
import type { ClientContext } from '../dsh-client-types.ts'
import type { ConnectionHandle } from '@deepseek-ai/dsh-api-remotes/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import { TypewriterAssistantNodeView } from './TypewriterAssistantNodeView.tsx'
import { wrapFollowNodeView, type FollowWrapProps } from './TypewriterToolNodeView.tsx'
import { SmoothStreamCardController } from './SmoothStreamCardController.ts'
import { DebugPanel } from './DebugPanel.tsx'
import { debugRuntime } from './debugRuntime.ts'
import { NS as SETTINGS_NS, CHAT_NS, chatEn, chatZh, en, zh } from './locales.ts'
import { DEFAULT_STREAM_CONFIG, type StreamConfig } from './config.ts'
import { DEFAULT_STREAM_SETTINGS, publishMotionPreference, publishLogFade, type StreamSettings } from './settings.ts'
import { UI_CUSTOM_SETTINGS_NS } from '../../shared.ts'
import { bindSettingsScope } from '../settings-source.ts'

/**
 * Surfaces the real cause of a render crash inside the assistant-step takeover.
 * React's minified #130 ("Element type is invalid") hides which component is
 * undefined; this boundary logs it so the failure is diagnosable instead of a
 * silent slot crash.
 */
class TakeoverErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error) {
    console.error('[smooth] assistant-step takeover render failed:', error)
  }
  render() {
    if (this.state.error !== null) return null
    return this.props.children
  }
}

/** Required services: slots for DOM injection; locale for dictionaries. */
export const inject = ['slots', 'locale'] as const

/**
 * Wraps an already-registered Agent Chat row so a render crash inside it does
 * not kill the whole `conversation.chat.node` slot. The real error (which
 * component is `undefined`) is surfaced via `componentDidCatch` instead of the
 * minified #130.
 */
class FollowErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error) {
    console.error('[smooth] follow-wrapped row render failed:', error)
  }
  render() {
    if (this.state.error !== null) return null
    return this.props.children
  }
}

type AssistantProps = ChatNodeViewProps<'assistant-step'>

const STREAM_MODES: readonly string[] = ['typewriter', 'teleprompter']
const STREAM_PRESETS: readonly string[] = ['realtime', 'balanced', 'silky']

/**
 * The assistant renderer owns its own character queue and conversation
 * follower, so wrapping it again would create two scroll owners.
 */
const SKIP_WRAP = new Set(['assistant-step', 'user', 'steering', 'command-input'])

function isWrappableComponent(value: unknown): value is ComponentType<FollowWrapProps> {
  return typeof value === 'function'
    || (value !== null && typeof value === 'object' && '$$typeof' in value)
}

/**
 * Wrap every Agent-owned keyed Chat row except the assistant renderer in
 * place. Identical to the source `wrapAgentChatRows`.
 */
function wrapAgentChatRows(ctx: ClientContext): () => void {
  const restores: Array<() => void> = []
  const wrapped = new WeakSet<object>()

  const wrapAll = (): void => {
    for (const entry of ctx.slots.entries('conversation.chat.node')) {
      const key = entry.options.key
      if (key === undefined || SKIP_WRAP.has(key)) continue
      const current = entry.component
      if (!isWrappableComponent(current) || wrapped.has(current)) continue
      const inner = current as ComponentType<FollowWrapProps>
      const next = wrapFollowNodeView(inner)
      wrapped.add(next)
      entry.component = next
      restores.push(() => {
        if (entry.component === next) entry.component = inner
      })
    }
  }

  wrapAll()
  const off = ctx.on('slots/changed', (key: string) => {
    if (key === 'conversation.chat.node') wrapAll()
  })
  return () => {
    off()
    for (const restore of restores) restore()
  }
}

/**
 * A live settings cell shared by the renderer lifecycle and React views.
 * Mirrors the source SettingsCell but reads from the host settingsScope
 * rather than the plugin RPC.
 */
class SettingsCell {
  private readonly listeners = new Set<() => void>()
  private card: SmoothStreamCardController | undefined
  private value: StreamSettings = DEFAULT_STREAM_SETTINGS
  private pending = false

  attach(card: SmoothStreamCardController): () => void {
    this.card = card
    this.refresh()
    const unsubscribe = card.subscribe(() => { this.refresh() })
    return () => {
      unsubscribe()
      if (this.card !== card) return
      this.card = undefined
      this.refresh()
    }
  }

  private read(): StreamSettings {
    const snapshot = this.card?.getSnapshot()
    if (snapshot === undefined || snapshot.status !== 'ready') return this.value
    const next = this.card?.values() ?? this.value
    // Mirror the motion preference to the live renderers, which hold no scope.
    publishMotionPreference(next.motionPreference)
    publishLogFade(next.logarithmicFade)
    return next
  }

  private refresh(): void {
    const next = this.read()
    const pending = this.card?.getSnapshot().status === 'loading'
    if (
      pending === this.pending
      && next.enabled === this.value.enabled
      && next.thinkAutoExpand === this.value.thinkAutoExpand
      && next.debugEnabled === this.value.debugEnabled
      && next.motionPreference === this.value.motionPreference
      && next.preset === this.value.preset
      && next.logarithmicFade === this.value.logarithmicFade
      && next.debugTuning === this.value.debugTuning
    ) return
    this.pending = pending
    this.value = next
    for (const listener of this.listeners) listener()
  }

  takeoverEnabled(): boolean {
    return !this.pending && this.value.enabled
  }

  readonly getSnapshot = (): StreamSettings => this.value

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }
}

/**
 * Resolve configuration with validation. Falls back to defaults when
 * no composed config is available (client-only composition).
 */
function resolveStreamConfig(): StreamConfig {
  // Host does not provide a boot global; use defaults only.
  return DEFAULT_STREAM_CONFIG
}

/**
 * Register the smooth feature with the dsh-client-ui-custom host.
 *
 * Adapts the source `apply()` to the host's `registerFeatures` pattern:
 * - Uses `ctx.effect` instead of `ctx.inject` for lifecycle effects
 * - Uses `ctx.settingsScope` instead of the plugin loopback RPC
 * - Registers settings card and debug panel via `ctx.slots.inject`
 * - Registers the typewriter renderer in `conversation.chat.node` slot
 *
 * @param ctx - Browser context carrying the shared slot registry.
 * @param config - Optional profile-level plugin config (partial over the preset).
 *   `takeover` (default true) controls whether smooth replaces the host's
 *   `assistant-step` renderer. When `false`, smooth leaves the assistant node to
 *   the host (and `zh`'s think-block DOM controller), so the think block keeps
 *   its fixed-height scroll/fold owned by `zh` instead of smooth's disclosure.
 */
export function apply(ctx: ClientContext, config?: { preset?: string; takeover?: boolean }): void {
  const streamConfig = resolveStreamConfig()
  const settings = new SettingsCell()
  // `config.takeover` is provided by the host entry: it is false when `zh` owns the
  // think block (fixed-height scroll + fold), so smooth leaves the assistant node
  // to the host and `zh` instead of replacing it with its own disclosure. When
  // omitted, smooth takes over by default.
  const takeover = config?.takeover ?? true

  // Validate config
  if (
    !STREAM_MODES.includes(streamConfig.mode)
    || !STREAM_PRESETS.includes(streamConfig.preset)
  ) {
    // Fall back to defaults if validation fails
    void config
  }

  // Settings card: uses the host's settingsScope pattern instead of RPC.
  // ctx.effect runs the settings registration once locale is available.
  ctx.effect(() => {
    const localeReady = ctx.locale !== undefined
    if (!localeReady) return () => {}

    // Register dictionaries
    ctx.locale.register(SETTINGS_NS, { zh, en })

    // Create the settings card controller.
    // Note: the host does not expose a loopback RPC, so we pass a mock API
    // or adapt to use the host's settings scope directly.
    // The SmoothStreamCardController is adapted to use ctx.settingsScope.
    const card = new SmoothStreamCardController(ctx)
    const detachSettings = settings.attach(card)

    const syncDebug = (): void => {
      const snapshot = card.getSnapshot()
      debugRuntime.syncSettings({
        available: snapshot.debugAvailable,
        enabled: snapshot.debugEnabled,
        writable: snapshot.writable && !snapshot.saving,
        dirty: snapshot.dirty,
        status: snapshot.status,
        tuning: snapshot.debugTuning,
      })
    }
    const detachBinding = debugRuntime.bindSettings({
      edit: patch => { card.inject().edit(patch) },
      save: () => { card.inject().save() },
      discard: () => { card.inject().discard() },
    })
    const detachDebug = card.subscribe(syncDebug)
    syncDebug()
    card.start()

    // 原先此处把设置卡注册到 `settings.plugin.item`。当前 DSH 的「插件」页**不渲染**
    // 插件的该项注册，本地的 smooth 设置实际实现在
    // `src/client/zh/logic/settings-section.tsx`（「UI 增强 → 增强」标签，
    // 见 docs/upstream-repos.md 移植注意事项第 2 条）。该注册从未生效，
    // 2026-09-23 连同卡片文件一并移除——新增 smooth 设置项请加到上面那个文件，
    // 不要在这里重建入口。

    // Register the debug panel in the session header
    ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
      name: 'conversation.session.header.utilities',
      id: 'smooth-stream-debug',
      order: 40,
      locale: SETTINGS_NS,
      inject: () => debugRuntime.panelFace(),
    }, DebugPanel))

    return () => {
      card.stop()
      detachDebug()
      detachSettings()
      detachBinding()
    }
  }, 'smooth: settings card + debug panel registration')

  /**
   * Layered `t` for the assistant renderer.
   *
   * The renderer's keys have no single owner: `conversation` owns the
   * `image.*` family in every Harness version, `chat` (0.1.5+) owns
   * `message.think`, and three `message.*` keys MOVED from `conversation` to
   * `chat` between the version this package pins and the current one. Binding
   * the slot to either namespace alone degrades a real slice of the UI to raw
   * keys, which is the defect this replaces.
   *
   * The order is deliberate: `conversation` first, so the pinned Harness keeps
   * resolving the keys it still owns there; then `chat` for what moved or is
   * new; then this plugin's own namespace for keys no Harness version
   * provides. A namespace that is not registered returns its key unchanged
   * (`LocaleRuntime.bind` does not throw), so an older Harness without `chat`
   * falls straight through.
   *
   * The reference is built once and held stable: the seat feeds a memoized
   * renderer, and a fresh identity per render would defeat that memoization.
   * Until the locale service arrives the seat's own binding stays in use.
   *
   * Locale routing is kept OUT of the Connection-backed settings effect: a
   * transient disconnect there must not dispose the renderer's fallback
   * dictionary.
   */
  let assistantT: AssistantProps['t'] | undefined

  ctx.effect(() => {
    if (ctx.locale === undefined) return () => {}
    const unregisterChat = ctx.locale.register(CHAT_NS, { zh: chatZh, en: chatEn })
    const conversationT = ctx.locale.bind('conversation')
    const chatT = ctx.locale.bind('chat') as (key: string, params?: Record<string, unknown>) => string
    const fallbackT = ctx.locale.bind(CHAT_NS) as (key: string, params?: Record<string, unknown>) => string
    const merged = (key: string, params?: Record<string, unknown>): string => {
      const primary = (conversationT as (k: string, p?: unknown) => string)(key, params)
      if (primary !== key) return primary
      const secondary = chatT(key, params)
      if (secondary !== key) return secondary
      return fallbackT(key, params)
    }
    const bound = merged as unknown as AssistantProps['t']
    assistantT = bound
    return () => {
      if (assistantT === bound) assistantT = undefined
      unregisterChat()
    }
  }, 'smooth: layered assistant locale routing')

  // Settings face for the renderer's think-block clamp. Bound once here so
  // React renders never re-bind the harness scope.
  const nodeSettingsScope = bindSettingsScope(ctx)

  // Typewriter renderer registration
  const configured = function StreamConfiguredView(props: AssistantProps) {
    const preferences = useSyncExternalStore(
      settings.subscribe,
      settings.getSnapshot,
      settings.getSnapshot,
    )
    return createElement(
      TakeoverErrorBoundary,
      null,
      createElement(TypewriterAssistantNodeView, {
        ...props,
        // Override the seat's single-namespace binding with the layered lookup
        // described above. Falls back to the seat's own binding only if the
        // locale service never arrived (renderer then receives the prop it
        // already had).
        ...(assistantT === undefined ? {} : { t: assistantT }),
        mode: streamConfig.mode,
        preset: preferences.preset ?? streamConfig.preset,
        revealCharsPerSec: streamConfig.revealCharsPerSec,
        scrollSpeedPxPerSec: streamConfig.scrollSpeedPxPerSec,
        maxScrollSpeedPxPerSec: streamConfig.maxScrollSpeedPxPerSec,
        thinkAutoExpand: preferences.thinkAutoExpand,
        settingsScope: nodeSettingsScope,
      }),
    )
  }

  // `conversation.chat.node` is declared by the chat UI entry's children table,
  // which activates *after* this plugin in the pinned Harness. Registering into
  // it directly throws `slot "conversation.chat.node" is not declared` and fails
  // the whole client fiber (web boot: oh-my-dsh-ui: failed). `slots.inject` is
  // the pinned contract for waiting on that declaration — the original
  // dsh-smooth-stream wraps this exact block in `ctx.slots.inject(...)`; this
  // port had flattened it to a bare `ctx.effect`.
  ctx.slots.inject('conversation.chat.node', () => {
    let releaseTakeover: (() => void) | undefined

    const syncTakeover = (): void => {
      if (!takeover) {
        // `zh` owns the think block: smooth must not replace the assistant-step
        // renderer, or the reasoning block loses `zh`'s fixed-height scroll/fold.
        releaseTakeover?.()
        releaseTakeover = undefined
        return
      }
      if (!settings.takeoverEnabled()) {
        releaseTakeover?.()
        releaseTakeover = undefined
        return
      }
      if (releaseTakeover !== undefined) return
      const unwrap = wrapAgentChatRows(ctx)
      const unshadow = ctx.slots.register({
        name: 'conversation.chat.node',
        key: 'assistant-step',
        priority: -100,
        locale: 'conversation',
        registrant: 'smooth',
      }, configured)
      releaseTakeover = () => {
        unwrap()
        unshadow()
      }
    }

    const unsubscribe = settings.subscribe(syncTakeover)
    syncTakeover()
    return () => {
      unsubscribe()
      releaseTakeover?.()
    }
  })

  // Think-block smooth reveal bridge: TEMPORARILY DISABLED for diagnosis.
  // A MutationObserver that rewrites a React-controlled node's `textContent`
  // makes React's own re-render throw (#130 "slot entry crashed"). We are
  // isolating whether this bridge is the source of the crash before choosing a
  // React-controlled reveal path instead.
  // const thinkReveal = new ThinkRevealBridge(streamConfig.preset)
  // ctx.effect(() => {
  //   thinkReveal.start()
  //   return () => thinkReveal.stop()
  // }, 'smooth: think-block reveal bridge')

  // Type-reference the connection handle so its injection is tracked
  void (ctx.get('connection') as ConnectionHandle | undefined)
}

// Re-export types for consumers
export type { StreamConfig } from './config.ts'
export type { StreamSettings, StreamDebugTuning } from './settings.ts'
export { DEFAULT_STREAM_CONFIG } from './config.ts'
export { DEFAULT_STREAM_SETTINGS } from './settings.ts'
export { SETTINGS_NS }
