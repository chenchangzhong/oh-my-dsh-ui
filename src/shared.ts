/**
 * Settings-namespace contract shared by the Host registration (node half)
 * and the browser scope (client half). Node-safe: no DOM, no React.
 */

/** Settings namespace owned by ui-custom (runtime-editable section). */
export const UI_CUSTOM_SETTINGS_NS = 'ui-custom'

/**
 * Individually selectable plugin features. The loader config's `features`
 * field is a whitelist: absent or empty = every feature mounts (backward
 * compatible); present = only the listed features register. Each feature
 * owns its settings rows / pages, so an unlisted feature is simply absent
 * from the Settings surface and the DOM.
 */
export const FEATURES = ['markdown', 'appearance', 'motion', 'zh', 'smooth'] as const

/** One opt-in plugin feature id (see {@link FEATURES}). */
export type PluginFeature = typeof FEATURES[number]

/**
 * Runtime-editable theme fields (the "外观" section). Mirrors
 * CustomThemeConfig. Keys are always present in the resolved section; values
 * may be undefined while the scope has not resolved yet.
 */
export interface ThemeSection {
  accent: string | undefined
  autoAccent: boolean | undefined
  surfaceOpacity: number | undefined
  sidebarOpacity: number | undefined
  chatSurfaceOpacity: number | undefined
  inputOpacity: number | undefined
  codeBlockOpacity: number | undefined
  darkSurfaceOpacity: number | undefined
  fontFamily: string | undefined
  /** Code-font stack override ('' = theme default; pairs with fontFamily). */
  codeFontFamily: string | undefined
  /** Whole-UI font scale, 0.9–1.1 (1 = stock size, step 0.05). */
  fontScale: number | undefined
  scrollbarAccent: boolean | undefined
  /** Dark-mode accent override ('' = inherit the main accent). */
  darkAccent: string | undefined
  /**
   * User's own presets ("另存为我的预设"): id → JSON string of
   * `{ name, config }`. Stored in the settings document so they survive
   * reloads and can be one-click restored from the preset gallery.
   */
  myPresets?: Record<string, string>
  /**
   * Render messages the user sends as Markdown (headings / lists / code
   * blocks). Defaults to true; the General-settings row can turn it off for
   * plain-text display.
   */
  renderUserMarkdown?: boolean
  /**
   * Conversation entrance motion: when a conversation loads or switches,
   * freshly mounted messages fade in with a subtle rise instead of popping in
   * at once. Defaults to true; the 动效 settings section can turn it off.
   */
  motionEnabled?: boolean
  /**
   * Which entrance-motion style fresh messages use ('fade-up' default;
   * see MOTION_STYLES). Only meaningful while motionEnabled is on.
   */
  motionStyle?: MotionStyle
  /**
   * Which entrance-motion style the sidebar tree uses ('slide-left' default;
   * see SIDEBAR_MOTION_STYLES). Independently selectable from the
   * transcript's style — the sidebar rail suits horizontal motion.
   */
  sidebarMotionStyle?: SidebarMotionStyle
  /**
   * Sidebar motion (initial tree entrance + workspace-group expand rows).
   * Defaults to true; the 动效 settings section can turn it off.
   */
  sidebarMotionEnabled?: boolean
  /**
   * The persistent selection-box trace on the active sidebar row. Defaults
   * to true; the 动效 settings section can turn it off.
   */
  selectionMotionEnabled?: boolean
  /**
   * The blank-session entrance (a brand-new conversation's welcome dialog
   * fades in). Defaults to true; the 动效 settings section can turn it off.
   */
  newChatMotionEnabled?: boolean
  /**
   * Which entrance style the blank-session (new conversation) dialog uses
   * ('reveal' default; see NEW_CHAT_MOTION_STYLES).
   */
  newChatMotionStyle?: NewChatMotionStyle
  /**
   * Settings-panel motion: the settings dialog expands from the lower-left,
   * nav rows fade their highlight, and section pages fade in on switch.
   * Defaults to true; the 动效 settings section can turn it off.
   */
  settingsMotionEnabled?: boolean
}

/** One selectable conversation entrance-motion style. */
export const MOTION_STYLES = ['fade-up', 'fade', 'rise-scale', 'slide-in', 'blur-in', 'scale-in'] as const

/** One entrance-motion style id (see {@link MOTION_STYLES}). */
export type MotionStyle = typeof MOTION_STYLES[number]

/** Default entrance style when the user-settings document has no override. */
export const DEFAULT_MOTION_STYLE: MotionStyle = 'fade-up'

/** Guard for a MotionStyle value (unknown ids fall back to the default). */
export const isMotionStyle = (value: unknown): value is MotionStyle =>
  typeof value === 'string' && (MOTION_STYLES as readonly string[]).includes(value)

/**
 * Selectable sidebar entrance-motion styles. The sidebar is a horizontal
 * rail, so its motion is horizontal (slide from the screen edge) or a plain
 * cross-fade — deliberately distinct from the transcript's vertical styles.
 * The tree rows also suit a drop-in (slide-down) or a vertical unfold
 * (expand), both of which read as rows settling into the list.
 */
export const SIDEBAR_MOTION_STYLES = ['slide-left', 'fade', 'expand', 'slide-down'] as const

/**
 * Selectable new-conversation entrance styles. The welcome dialog is a LARGE
 * surface, so its motion is deliberately gentler than the transcript's:
 * slower (420ms), barely-there travel (4px) and no pronounced scaling or
 * sideways slides — a large block moving visibly reads as mechanical.
 * `zoom` keeps the same discipline: a whisper-quiet scale with no travel.
 */
export const NEW_CHAT_MOTION_STYLES = ['reveal', 'fade', 'bloom', 'zoom'] as const

/** One new-conversation entrance style id (see {@link NEW_CHAT_MOTION_STYLES}). */
export type NewChatMotionStyle = typeof NEW_CHAT_MOTION_STYLES[number]

/** Default new-conversation style when the user-settings document has no override. */
export const DEFAULT_NEW_CHAT_MOTION_STYLE: NewChatMotionStyle = 'reveal'

/** Guard for a NewChatMotionStyle value (unknown ids fall back to the default). */
export const isNewChatMotionStyle = (value: unknown): value is NewChatMotionStyle =>
  typeof value === 'string' && (NEW_CHAT_MOTION_STYLES as readonly string[]).includes(value)

/** One sidebar entrance-motion style id (see {@link SIDEBAR_MOTION_STYLES}). */
export type SidebarMotionStyle = typeof SIDEBAR_MOTION_STYLES[number]

/** Default sidebar style when the user-settings document has no override. */
export const DEFAULT_SIDEBAR_MOTION_STYLE: SidebarMotionStyle = 'slide-left'

/** Guard for a SidebarMotionStyle value (unknown ids fall back to the default). */
export const isSidebarMotionStyle = (value: unknown): value is SidebarMotionStyle =>
  typeof value === 'string' && (SIDEBAR_MOTION_STYLES as readonly string[]).includes(value)

/**
 * One curated motion combo: a single click applies the whole configuration
 * (every toggle + every style), so a user who wants motion without tuning each
 * option can adopt a preset as-is. Presets are pure configuration bundles —
 * they are not persisted as a field; the applied values land in the ordinary
 * settings document and stay editable afterwards.
 */
export interface MotionPresetConfig {
  /** Conversation entrance-motion toggle. */
  motionEnabled: boolean
  /** Transcript entrance style. */
  motionStyle: MotionStyle
  /** Sidebar tree entrance toggle. */
  sidebarMotionEnabled: boolean
  /** Sidebar tree entrance style. */
  sidebarMotionStyle: SidebarMotionStyle
  /** Persistent selection-box toggle. */
  selectionMotionEnabled: boolean
  /** New-conversation entrance toggle. */
  newChatMotionEnabled: boolean
  /** New-conversation entrance style. */
  newChatMotionStyle: NewChatMotionStyle
  /** Settings-shell motion toggle. */
  settingsMotionEnabled: boolean
}

/** One curated motion-combo preset id (see {@link MOTION_PRESETS}). */
export type MotionPresetId = 'fluid' | 'elegant' | 'minimal'

/** One curated motion-combo preset (see {@link MOTION_PRESETS}). */
export interface MotionPreset {
  /** Stable preset id (labels live in the motion locales). */
  id: MotionPresetId
  /** The full motion configuration the preset applies. */
  config: MotionPresetConfig
}

/**
 * The three curated motion presets, in display order. Personality:
 * fluid — a lively cascade (rise-scale rows, sliding sidebar, everything on);
 * elegant — a quiet high-end feel (soft blur, plain sidebar fade, bloom);
 * minimal — barely-there fades with the selection box and settings motion off.
 */
export const MOTION_PRESETS: readonly MotionPreset[] = [
  {
    id: 'fluid',
    config: {
      motionEnabled: true,
      motionStyle: 'rise-scale',
      sidebarMotionEnabled: true,
      sidebarMotionStyle: 'slide-left',
      selectionMotionEnabled: true,
      newChatMotionEnabled: true,
      newChatMotionStyle: 'reveal',
      settingsMotionEnabled: true,
    },
  },
  {
    id: 'elegant',
    config: {
      motionEnabled: true,
      motionStyle: 'blur-in',
      sidebarMotionEnabled: true,
      sidebarMotionStyle: 'fade',
      selectionMotionEnabled: true,
      newChatMotionEnabled: true,
      newChatMotionStyle: 'bloom',
      settingsMotionEnabled: true,
    },
  },
  {
    id: 'minimal',
    config: {
      motionEnabled: true,
      motionStyle: 'fade',
      sidebarMotionEnabled: true,
      sidebarMotionStyle: 'fade',
      selectionMotionEnabled: false,
      newChatMotionEnabled: true,
      newChatMotionStyle: 'fade',
      settingsMotionEnabled: false,
    },
  },
] as const

/** Guard for a MotionPresetId value. */
export const isMotionPresetId = (value: unknown): value is MotionPresetId =>
  typeof value === 'string' && (MOTION_PRESETS as readonly MotionPreset[]).some(preset => preset.id === value)

/**
 * zh（中文优化）feature 的运行时配置，语义与 deepseek-harness-zh_pro
 * 的增强设置保持一致（localStorage → settings scope 迁移后）。
 */
export interface ZhSection {
  /** 中文补全：整句/术语/正则三层翻译 + DOM 文本增强（仅中文界面生效）。默认开。 */
  zhComplete?: boolean
  /** 对话宽度开关（默认开）与宽度百分比 50–100（默认 90）。 */
  chatWidthEnabled?: boolean
  chatWidth?: number
  /** 自动展开最新思考。默认开。 */
  thinkingAuto?: boolean
  /** 思考折叠最大行数（默认 20，0 = 关闭折叠）。 */
  thinkMaxLines?: number
  /** 折叠起始方向：'latest' = 显示最后 N 行 / 'earliest' = 显示前 N 行。 */
  thinkMaxLinesFrom?: 'latest' | 'earliest'
  /** 折叠呈现模式：'button' = 按钮再展开 / 'scroll' = 固定高度滚动区。 */
  thinkMode?: 'button' | 'scroll'
  /** 会话删除按钮（回收站）。默认开。 */
  deleteSessionEnabled?: boolean
  /** 已归档会话视图。默认开。 */
  archiveViewEnabled?: boolean
  /** 自动归档天数（默认 7，0 = 关）。 */
  zhAutoArchiveDays?: number
  /** 用户消息 Markdown 渲染。默认关。 */
  renderUserMarkdown?: boolean
  /** 会话批量操作：行首复选框多选 + 批量删除/归档。默认开。 */
  batchOpsEnabled?: boolean
  /**
   * 服务监控：侧栏面板显示本机在会话期间新出现的监听服务。
   * **默认关**——进程归属/定位能力按平台尽力而为，用户显式开启才工作。
   */
  serviceMonitorEnabled?: boolean
  /** 服务监控面板刷新间隔（秒，2–300，默认 10）。 */
  serviceMonitorIntervalSec?: number
  /** 自定义监控项（主机对每项做 TCP 探活，与自动发现条目一并显示）。 */
  serviceMonitorTargets?: Array<{ name: string; host: string; port: number }>
  /** 设置页「服务监控」分组的折叠态。 */
  serviceMonitorSettingsOpen?: boolean
}

/**
 * smooth（丝滑流式）feature 的运行时配置，语义与 dsh-smooth-stream
 * 的 StreamSettings 保持一致（loopback RPC → settings scope 迁移后）。
 */
export interface SmoothSection {
  /** 流式渲染接管总开关。默认开。 */
  smoothEnabled?: boolean
  /** 揭示节奏预设：'realtime' | 'balanced' | 'silky'。默认 'balanced'。 */
  smoothPreset?: 'realtime' | 'balanced' | 'silky'
  /** 思考块流式时自动展开。默认开。 */
  smoothThinkAutoExpand?: boolean
  /** 渲染诊断面板。默认关。 */
  smoothDebugEnabled?: boolean
  /**
   * 动效偏好：'auto'（跟随系统，默认）/ 'force-smooth'（无视系统设置强制平滑）/
   * 'force-reduced'（始终按原始文本渲染）。系统偏好常被远程桌面、浏览器开关、
   * 性能配置强制打开且无法关掉，故给用户一个显式覆盖。
   */
  smoothMotionPreference?: 'auto' | 'force-smooth' | 'force-reduced'
  /**
   * 自适应对数透明度淡出：新出现的字符由半透明渐入到正常色（纯绘制层，
   * 不改 DOM、不影响选择与复制）。默认开。
   */
  smoothLogFadeEnabled?: boolean
}

/** The plugin's full settings section, flat on one namespace. */
export interface UiCustomSection extends ThemeSection, ZhSection, SmoothSection {
  /**
   * Feature whitelist: which independently selectable features mount on the
   * web client (markdown / appearance / motion / zh / smooth). Absent
   * or empty = every feature; present = only the listed ones register. Lives
   * in the settings namespace (the client never receives the loader config),
   * seeded from the loader config's `features`.
   */
  features?: readonly PluginFeature[]
}
