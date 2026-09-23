/**
 * Web-surface theme plugin, node half: registers the runtime-editable
 * settings section (theme "外观") so the browser scope can read/write it.
 * The theme itself is pure browser work.
 */
import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import {
  DEFAULT_MOTION_STYLE, DEFAULT_NEW_CHAT_MOTION_STYLE,
  DEFAULT_SIDEBAR_MOTION_STYLE, FEATURES, isMotionStyle, isNewChatMotionStyle,
  isSidebarMotionStyle, MOTION_STYLES, NEW_CHAT_MOTION_STYLES, SIDEBAR_MOTION_STYLES, UI_CUSTOM_SETTINGS_NS,
} from './shared.ts'
import type { MotionStyle, NewChatMotionStyle, PluginFeature, SidebarMotionStyle, SmoothSection, ThemeSection, ZhSection } from './shared.ts'
import { installAll } from './server/index.ts'

/** The ui-custom section's field map (schemastery defaults = the plugin's neutral defaults). */
const SECTION_FIELDS = {
  // theme
  accent: z.string().default('#4176e6'),
  autoAccent: z.boolean().default(false),
  surfaceOpacity: z.number().default(100),
  sidebarOpacity: z.number().default(100),
  chatSurfaceOpacity: z.number().default(100),
  inputOpacity: z.number().default(100),
  codeBlockOpacity: z.number().default(100),
  darkSurfaceOpacity: z.number().default(100),
  fontFamily: z.string().default(''),
  codeFontFamily: z.string().default(''),
  fontScale: z.number().default(1),
  scrollbarAccent: z.boolean().default(false),
  // opt-in refinement knobs (neutral defaults: the plugin changes nothing)
  cornerRadius: z.string().default('inherit'),
  surfaceShadow: z.string().default('inherit'),
  darkAccent: z.string().default(''),
  // user's own presets: id → JSON string of { name, config }
  myPresets: z.dict(z.string()).default({}),
  // render the user's own messages as Markdown (General-settings toggle)
  renderUserMarkdown: z.boolean().default(false),
  // conversation entrance motion (动效 settings-section toggle + styles)
  motionEnabled: z.boolean().default(true),
  motionStyle: z.union([...MOTION_STYLES]).default(DEFAULT_MOTION_STYLE),
  sidebarMotionStyle: z.union([...SIDEBAR_MOTION_STYLES]).default(DEFAULT_SIDEBAR_MOTION_STYLE),
  sidebarMotionEnabled: z.boolean().default(true),
  selectionMotionEnabled: z.boolean().default(true),
  newChatMotionEnabled: z.boolean().default(true),
  newChatMotionStyle: z.union([...NEW_CHAT_MOTION_STYLES]).default(DEFAULT_NEW_CHAT_MOTION_STYLE),
  settingsMotionEnabled: z.boolean().default(true),
  // ── zh feature（中文优化，默认与 deepseek-harness-zh_pro 增强设置一致）──
  zhComplete: z.boolean().default(true),
  statsFull: z.boolean().default(true),
  chatWidthEnabled: z.boolean().default(true),
  chatWidth: z.number().default(90),
  thinkingAuto: z.boolean().default(true),
  thinkMaxLines: z.number().default(20),
  thinkMaxLinesFrom: z.union(['latest', 'earliest']).default('latest'),
  thinkMode: z.union(['button', 'scroll']).default('button'),
  deleteSessionEnabled: z.boolean().default(true),
  archiveViewEnabled: z.boolean().default(true),
  batchOpsEnabled: z.boolean().default(true),
  zhAutoArchiveDays: z.number().default(7),
  // 服务监控（默认关：进程归属/定位按平台尽力而为）
  serviceMonitorEnabled: z.boolean().default(false),
  serviceMonitorIntervalSec: z.number().default(10),
  serviceMonitorTargets: z.array(z.object({
    name: z.string().default(''),
    host: z.string(),
    port: z.number(),
  })).default([]),
  serviceMonitorSettingsOpen: z.boolean().default(false),
  // ── smooth feature（丝滑流式，默认与 dsh-smooth-stream StreamSettings 一致）──
  smoothEnabled: z.boolean().default(true),
  smoothPreset: z.union(['realtime', 'balanced', 'silky']).default('balanced'),
  smoothThinkAutoExpand: z.boolean().default(true),
  smoothDebugEnabled: z.boolean().default(false),
  smoothMotionPreference: z.union(['auto', 'force-smooth', 'force-reduced']).default('auto'),
  // 自适应对数透明度淡出（默认开；不支持 Highlight/color-mix 时自动退化）
  smoothLogFadeEnabled: z.boolean().default(true),
  // feature whitelist: which independently selectable features mount on the
  // web client (absent/empty = all; see resolveFeatures on the client side)
  features: z.array(z.union([...FEATURES])).default([]),
} as const

/**
 * Mark one field as a live preference (volatile).
 *
 * 0.1.7's schemastery exposes `volatile()`; the copy this plugin resolves at
 * runtime does not have it yet (the harness hands a profile plugin its own
 * 0.1.5-era schemastery), and calling a missing method would abort the whole
 * module import — the entry then reads as `failed to import`. Every 0.1.7
 * consumer of the mark reads `schema.meta.volatile`, which `volatile()` itself
 * only sets through `extra('volatile', true)`, so the fallback writes the same
 * mark directly.
 * @param field - the field's schema node.
 * @returns the field, marked volatile.
 */
function liveField<T extends { meta?: Record<string, unknown>; volatile?: () => T }>(field: T): T {
  if (typeof field.volatile === 'function') return field.volatile()
  if (field.meta !== undefined) field.meta.volatile = true
  return field
}

/**
 * The profile entry's declarative settings schema.
 *
 * 0.1.7 projects an entry's `Config` into the shared settings form the
 * browser reaches through `ctx.configForms.get('ui-custom')`, and only a
 * volatile field is writable there (a non-volatile change reloads the plugin
 * instead of committing into it). Every field below is a live user preference,
 * so the whole section is volatile.
 */
export const Config = z.object(
  Object.fromEntries(Object.entries(SECTION_FIELDS).map(([key, field]) => [key, liveField(field)])),
)

/**
 * ≤0.1.6 registration schema: the same fields, without the 0.1.7 volatility
 * contract (`settings.register(namespace, schema, { base })`).
 */
const LegacySectionSchema = z.object(SECTION_FIELDS)

/** Plugin config shape accepted at the loader layer (flat theme). */
interface UiCustomConfig extends Partial<ThemeSection>, Partial<ZhSection>, Partial<SmoothSection> {
  /**
   * Feature whitelist: which independently selectable features to mount
   * (markdown / appearance / motion / zh / smooth). Absent or empty =
   * every feature (backward compatible); present = only the listed features
   * register on the web client.
   */
  features?: readonly PluginFeature[]
  /** Conversation entrance motion (default true). */
  motionEnabled?: boolean
  /** Conversation entrance-motion style (default 'fade-up'). */
  motionStyle?: MotionStyle
  /** Sidebar entrance-motion style (default 'slide-left'). */
  sidebarMotionStyle?: SidebarMotionStyle
  /** Sidebar motion (initial tree + group expand), default true. */
  sidebarMotionEnabled?: boolean
  /** Persistent selection-box trace on the active row, default true. */
  selectionMotionEnabled?: boolean
  /** Blank-session (new conversation) entrance, default true. */
  newChatMotionEnabled?: boolean
  /** Blank-session entrance style (default 'reveal'). */
  newChatMotionStyle?: NewChatMotionStyle
  /** Settings-panel motion (dialog expansion, nav highlight, page switch), default true. */
  settingsMotionEnabled?: boolean
}

/**
 * Host plugin body: expose the plugin's settings section to the web client
 * through whichever settings surface the running harness provides.
 *
 * 0.1.7 (official per-plugin mode, see `@deepseek-ai/dsh-settings` README):
 * the entry's own `Config` IS the settings schema — the browser reads it via
 * `ctx.configForms.get(entryId)` — and a plugin that ships its own editor
 * registers `configure({ auto: false }, ctx.fiber)` inside the optional
 * `ctx.inject(['settings'], …)` child. Business plugins read their own Config
 * references directly; no shared helper and no runtime namespace registration.
 *
 * ≤0.1.6: the settings provider still owns runtime namespaces
 * (`settings.register(namespace, schema, { base })`).
 *
 * The namespace helper is deliberately not imported: newer `dsh-settings`
 * builds no longer export it, and a missing named export is an import-time
 * failure — the entry would read as `failed to import` and never activate.
 * @param ctx - Host context that may acquire the settings service.
 * @param config - the plugin's loader-layer config.
 */
export function apply(ctx: Context, config?: UiCustomConfig): void {
  ctx.inject(['settings'], (settingsCtx) => {
    const settings = (settingsCtx as unknown as { settings?: SettingsServiceLike }).settings
    if (typeof settings?.configure === 'function') {
      // 0.1.7: this plugin's unified section is the editor, so opt out of the
      // schema-generated page. Registered inside the child as an effect, so a
      // late-loaded settings service still adopts the policy.
      settingsCtx.effect(() => settings.configure?.({ auto: false }, ctx.fiber))
    }
    if (typeof settings?.register === 'function') {
      // ≤0.1.6: register the runtime namespace the bound browser scopes read.
      settings.register(UI_CUSTOM_SETTINGS_NS, LegacySectionSchema, {
        base: legacyBase(config),
      })
    }
  })

  // Install remaining Node-side capability: session-delete routes.
  ctx.inject(['webServer'], () => {
    installAll(ctx as unknown as import('./server/types.js').HostContext)
  })
}

/** Probed shape of the `settings` service across harness generations. */
interface SettingsServiceLike {
  register?: (namespace: string, schema: unknown, options: { base: Record<string, unknown> }) => void
  configure?: (presentation: { auto?: boolean }, owner: unknown) => () => void
}

/**
 * Composition base for the ≤0.1.6 namespace: the loader config's flat fields,
 * so a cleared field reverts to the loader default there. 0.1.7 resolves that
 * layer from the entry's own config instead.
 * @param config - the plugin's loader-layer config.
 * @returns the namespace's composition base.
 */
function legacyBase(config?: UiCustomConfig): Record<string, unknown> {
  return {
    accent: config?.accent ?? '#4176e6',
    autoAccent: config?.autoAccent ?? false,
    surfaceOpacity: config?.surfaceOpacity ?? 100,
    sidebarOpacity: config?.sidebarOpacity ?? 100,
    chatSurfaceOpacity: config?.chatSurfaceOpacity ?? 100,
    inputOpacity: config?.inputOpacity ?? 100,
    codeBlockOpacity: config?.codeBlockOpacity ?? 100,
    darkSurfaceOpacity: config?.darkSurfaceOpacity ?? 100,
    fontFamily: config?.fontFamily ?? '',
    codeFontFamily: config?.codeFontFamily ?? '',
    fontScale: config?.fontScale ?? 1,
    scrollbarAccent: config?.scrollbarAccent ?? false,
    cornerRadius: config?.cornerRadius ?? 'inherit',
    surfaceShadow: config?.surfaceShadow ?? 'inherit',
    darkAccent: config?.darkAccent ?? '',
    myPresets: config?.myPresets ?? {},
    renderUserMarkdown: config?.renderUserMarkdown ?? false,
    motionEnabled: config?.motionEnabled ?? true,
    motionStyle: isMotionStyle(config?.motionStyle) ? config.motionStyle : DEFAULT_MOTION_STYLE,
    sidebarMotionStyle: isSidebarMotionStyle(config?.sidebarMotionStyle)
      ? config.sidebarMotionStyle
      : DEFAULT_SIDEBAR_MOTION_STYLE,
    sidebarMotionEnabled: config?.sidebarMotionEnabled ?? true,
    selectionMotionEnabled: config?.selectionMotionEnabled ?? true,
    newChatMotionEnabled: config?.newChatMotionEnabled ?? true,
    newChatMotionStyle: isNewChatMotionStyle(config?.newChatMotionStyle)
      ? config.newChatMotionStyle
      : DEFAULT_NEW_CHAT_MOTION_STYLE,
    settingsMotionEnabled: config?.settingsMotionEnabled ?? true,
    // ── zh feature base（默认与 deepseek-harness-zh_pro 增强设置一致）──
    zhComplete: config?.zhComplete ?? true,
    statsFull: config?.statsFull ?? true,
    chatWidthEnabled: config?.chatWidthEnabled ?? true,
    chatWidth: typeof config?.chatWidth === 'number' ? Math.max(50, Math.min(100, config.chatWidth)) : 90,
    thinkingAuto: config?.thinkingAuto ?? true,
    thinkMaxLines: typeof config?.thinkMaxLines === 'number' ? Math.max(0, Math.min(200, config.thinkMaxLines)) : 20,
    thinkMaxLinesFrom: config?.thinkMaxLinesFrom === 'earliest' ? 'earliest' : 'latest',
    thinkMode: config?.thinkMode === 'scroll' ? 'scroll' : 'button',
    deleteSessionEnabled: config?.deleteSessionEnabled ?? true,
    archiveViewEnabled: config?.archiveViewEnabled ?? true,
    zhAutoArchiveDays: typeof config?.zhAutoArchiveDays === 'number' ? config.zhAutoArchiveDays : 7,
    // ── smooth feature base（默认与 dsh-smooth-stream StreamSettings 一致）──
    smoothEnabled: config?.smoothEnabled ?? true,
    smoothPreset: config?.smoothPreset === 'realtime' || config?.smoothPreset === 'silky'
      ? config.smoothPreset : 'balanced',
    smoothThinkAutoExpand: config?.smoothThinkAutoExpand ?? true,
    smoothDebugEnabled: config?.smoothDebugEnabled ?? false,
    features: config?.features ? [...config.features] : [],
  }
}
