import { Context } from "@deepseek-ai/cordis";
//#region src/shared.d.ts
/**
 * Individually selectable plugin features. The loader config's `features`
 * field is a whitelist: absent or empty = every feature mounts (backward
 * compatible); present = only the listed features register. Each feature
 * owns its settings rows / pages, so an unlisted feature is simply absent
 * from the Settings surface and the DOM.
 */
declare const FEATURES: readonly ["markdown", "appearance", "motion", "zh", "smooth"];
/** One opt-in plugin feature id (see {@link FEATURES}). */
type PluginFeature = typeof FEATURES[number];
/**
 * Runtime-editable theme fields (the "外观" section). Mirrors
 * CustomThemeConfig. Keys are always present in the resolved section; values
 * may be undefined while the scope has not resolved yet.
 */
interface ThemeSection {
  accent: string | undefined;
  autoAccent: boolean | undefined;
  surfaceOpacity: number | undefined;
  sidebarOpacity: number | undefined;
  inputOpacity: number | undefined;
  codeBlockOpacity: number | undefined;
  darkSurfaceOpacity: number | undefined;
  fontFamily: string | undefined;
  /** Code-font stack override ('' = theme default; pairs with fontFamily). */
  codeFontFamily: string | undefined;
  /** Whole-UI font scale, 0.9–1.1 (1 = stock size, step 0.05). */
  fontScale: number | undefined;
  scrollbarAccent: boolean | undefined;
  /** Dark-mode accent override ('' = inherit the main accent). */
  darkAccent: string | undefined;
  /**
   * User's own presets ("另存为我的预设"): id → JSON string of
   * `{ name, config }`. Stored in the settings document so they survive
   * reloads and can be one-click restored from the preset gallery.
   */
  myPresets?: Record<string, string>;
  /**
   * Render messages the user sends as Markdown (headings / lists / code
   * blocks). Defaults to true; the General-settings row can turn it off for
   * plain-text display.
   */
  renderUserMarkdown?: boolean;
  /**
   * Conversation entrance motion: when a conversation loads or switches,
   * freshly mounted messages fade in with a subtle rise instead of popping in
   * at once. Defaults to true; the 动效 settings section can turn it off.
   */
  motionEnabled?: boolean;
  /**
   * Which entrance-motion style fresh messages use ('fade-up' default;
   * see MOTION_STYLES). Only meaningful while motionEnabled is on.
   */
  motionStyle?: MotionStyle;
  /**
   * Which entrance-motion style the sidebar tree uses ('slide-left' default;
   * see SIDEBAR_MOTION_STYLES). Independently selectable from the
   * transcript's style — the sidebar rail suits horizontal motion.
   */
  sidebarMotionStyle?: SidebarMotionStyle;
  /**
   * Sidebar motion (initial tree entrance + workspace-group expand rows).
   * Defaults to true; the 动效 settings section can turn it off.
   */
  sidebarMotionEnabled?: boolean;
  /**
   * The persistent selection-box trace on the active sidebar row. Defaults
   * to true; the 动效 settings section can turn it off.
   */
  selectionMotionEnabled?: boolean;
  /**
   * The blank-session entrance (a brand-new conversation's welcome dialog
   * fades in). Defaults to true; the 动效 settings section can turn it off.
   */
  newChatMotionEnabled?: boolean;
  /**
   * Which entrance style the blank-session (new conversation) dialog uses
   * ('reveal' default; see NEW_CHAT_MOTION_STYLES).
   */
  newChatMotionStyle?: NewChatMotionStyle;
  /**
   * Settings-panel motion: the settings dialog expands from the lower-left,
   * nav rows fade their highlight, and section pages fade in on switch.
   * Defaults to true; the 动效 settings section can turn it off.
   */
  settingsMotionEnabled?: boolean;
}
/** One selectable conversation entrance-motion style. */
declare const MOTION_STYLES: readonly ["fade-up", "fade", "rise-scale", "slide-in", "blur-in", "scale-in"];
/** One entrance-motion style id (see {@link MOTION_STYLES}). */
type MotionStyle = typeof MOTION_STYLES[number];
/**
 * Selectable sidebar entrance-motion styles. The sidebar is a horizontal
 * rail, so its motion is horizontal (slide from the screen edge) or a plain
 * cross-fade — deliberately distinct from the transcript's vertical styles.
 * The tree rows also suit a drop-in (slide-down) or a vertical unfold
 * (expand), both of which read as rows settling into the list.
 */
declare const SIDEBAR_MOTION_STYLES: readonly ["slide-left", "fade", "expand", "slide-down"];
/**
 * Selectable new-conversation entrance styles. The welcome dialog is a LARGE
 * surface, so its motion is deliberately gentler than the transcript's:
 * slower (420ms), barely-there travel (4px) and no pronounced scaling or
 * sideways slides — a large block moving visibly reads as mechanical.
 * `zoom` keeps the same discipline: a whisper-quiet scale with no travel.
 */
declare const NEW_CHAT_MOTION_STYLES: readonly ["reveal", "fade", "bloom", "zoom"];
/** One new-conversation entrance style id (see {@link NEW_CHAT_MOTION_STYLES}). */
type NewChatMotionStyle = typeof NEW_CHAT_MOTION_STYLES[number];
/** One sidebar entrance-motion style id (see {@link SIDEBAR_MOTION_STYLES}). */
type SidebarMotionStyle = typeof SIDEBAR_MOTION_STYLES[number];
/**
 * zh（中文优化）feature 的运行时配置，语义与 deepseek-harness-zh_pro
 * 的增强设置保持一致（localStorage → settings scope 迁移后）。
 */
interface ZhSection {
  /** 中文补全：整句/术语/正则三层翻译 + DOM 文本增强（仅中文界面生效）。默认开。 */
  zhComplete?: boolean;
  /** 对话宽度开关（默认开）与宽度百分比 50–100（默认 90）。 */
  chatWidthEnabled?: boolean;
  chatWidth?: number;
  /** 自动展开最新思考。默认开。 */
  thinkingAuto?: boolean;
  /** 思考折叠最大行数（默认 20，0 = 关闭折叠）。 */
  thinkMaxLines?: number;
  /** 折叠起始方向：'latest' = 显示最后 N 行 / 'earliest' = 显示前 N 行。 */
  thinkMaxLinesFrom?: 'latest' | 'earliest';
  /** 折叠呈现模式：'button' = 按钮再展开 / 'scroll' = 固定高度滚动区。 */
  thinkMode?: 'button' | 'scroll';
  /** 会话删除按钮（回收站）。默认开。 */
  deleteSessionEnabled?: boolean;
  /** 已归档会话视图。默认开。 */
  archiveViewEnabled?: boolean;
  /** 自动归档天数（默认 7，0 = 关）。 */
  zhAutoArchiveDays?: number;
  /** 用户消息 Markdown 渲染。默认关。 */
  renderUserMarkdown?: boolean;
  /** 会话批量操作：行首复选框多选 + 批量删除/归档。默认开。 */
  batchOpsEnabled?: boolean;
  /**
   * 服务监控：侧栏面板显示本机在会话期间新出现的监听服务。
   * **默认关**——进程归属/定位能力按平台尽力而为，用户显式开启才工作。
   */
  serviceMonitorEnabled?: boolean;
  /** 服务监控面板刷新间隔（秒，2–300，默认 10）。 */
  serviceMonitorIntervalSec?: number;
  /** 自定义监控项（主机对每项做 TCP 探活，与自动发现条目一并显示）。 */
  serviceMonitorTargets?: Array<{
    name: string;
    host: string;
    port: number;
  }>;
  /** 设置页「服务监控」分组的折叠态。 */
  serviceMonitorSettingsOpen?: boolean;
}
/**
 * smooth（丝滑流式）feature 的运行时配置，语义与 dsh-smooth-stream
 * 的 StreamSettings 保持一致（loopback RPC → settings scope 迁移后）。
 */
interface SmoothSection {
  /** 流式渲染接管总开关。默认开。 */
  smoothEnabled?: boolean;
  /** 揭示节奏预设：'realtime' | 'balanced' | 'silky'。默认 'balanced'。 */
  smoothPreset?: 'realtime' | 'balanced' | 'silky';
  /** 思考块流式时自动展开。默认开。 */
  smoothThinkAutoExpand?: boolean;
  /** 渲染诊断面板。默认关。 */
  smoothDebugEnabled?: boolean;
  /**
   * 动效偏好：'auto'（跟随系统，默认）/ 'force-smooth'（无视系统设置强制平滑）/
   * 'force-reduced'（始终按原始文本渲染）。系统偏好常被远程桌面、浏览器开关、
   * 性能配置强制打开且无法关掉，故给用户一个显式覆盖。
   */
  smoothMotionPreference?: 'auto' | 'force-smooth' | 'force-reduced';
  /**
   * 自适应对数透明度淡出：新出现的字符由半透明渐入到正常色（纯绘制层，
   * 不改 DOM、不影响选择与复制）。默认开。
   */
  smoothLogFadeEnabled?: boolean;
}
//#endregion
//#region src/index.d.ts
/**
 * The profile entry's declarative settings schema.
 *
 * 0.1.7 projects an entry's `Config` into the shared settings form the
 * browser reaches through `ctx.configForms.get('ui-custom')`, and only a
 * volatile field is writable there (a non-volatile change reloads the plugin
 * instead of committing into it). Every field below is a live user preference,
 * so the whole section is volatile.
 */
export declare const Config: any;
/** Plugin config shape accepted at the loader layer (flat theme). */
interface UiCustomConfig extends Partial<ThemeSection>, Partial<ZhSection>, Partial<SmoothSection> {
  /**
   * Feature whitelist: which independently selectable features to mount
   * (markdown / appearance / motion / zh / smooth). Absent or empty =
   * every feature (backward compatible); present = only the listed features
   * register on the web client.
   */
  features?: readonly PluginFeature[];
  /** Conversation entrance motion (default true). */
  motionEnabled?: boolean;
  /** Conversation entrance-motion style (default 'fade-up'). */
  motionStyle?: MotionStyle;
  /** Sidebar entrance-motion style (default 'slide-left'). */
  sidebarMotionStyle?: SidebarMotionStyle;
  /** Sidebar motion (initial tree + group expand), default true. */
  sidebarMotionEnabled?: boolean;
  /** Persistent selection-box trace on the active row, default true. */
  selectionMotionEnabled?: boolean;
  /** Blank-session (new conversation) entrance, default true. */
  newChatMotionEnabled?: boolean;
  /** Blank-session entrance style (default 'reveal'). */
  newChatMotionStyle?: NewChatMotionStyle;
  /** Settings-panel motion (dialog expansion, nav highlight, page switch), default true. */
  settingsMotionEnabled?: boolean;
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
export declare function apply(ctx: Context, config?: UiCustomConfig): void;
//#endregion