
import { Context as ClientContext } from "@deepseek-ai/cordis";
import "@deepseek-ai/dsh-client-ui-settings/client";
import "@deepseek-ai/dsh-api-session-controller/client";
import "@deepseek-ai/dsh-client-ui-conversation/client";
//#region src/shared.d.ts
/**
 * Individually selectable plugin features. The loader config's `features`
 * field is a whitelist: absent or empty = every feature mounts (backward
 * compatible); present = only the listed features register. Each feature
 * owns its settings rows / pages, so an unlisted feature is simply absent
 * from the Settings surface and the DOM.
 */
export declare const FEATURES: readonly ["markdown", "appearance", "motion", "zh", "smooth"];
/** One opt-in plugin feature id (see {@link FEATURES}). */
type PluginFeature = typeof FEATURES[number];
//#endregion
//#region src/client/config.d.ts
/** Every knob the plugin understands. New art options extend this interface. */
interface CustomThemeConfig {
  /** Preset id from presets.ts ('' = none; preset fields merge under explicit config). */
  preset: string;
  /** Accent color; the whole deepseek ramp is derived from it. */
  accent: string;
  /** Derive the accent color automatically from a sampled source (overrides `accent` on success). */
  autoAccent: boolean;
  /** Main surface opacity, 0–100 (chat/details columns). */
  surfaceOpacity: number;
  /** Sidebar surface opacity, 0–100. */
  sidebarOpacity: number;
  /** Composer input opacity, 0–100. */
  inputOpacity: number;
  /** Code block / inline code opacity, 0–100. */
  codeBlockOpacity: number;
  /** Dark-mode surface opacity, 0–100 (defaults to surfaceOpacity when unset). */
  darkSurfaceOpacity?: number;
  /** Interface font stack override (empty = theme default). */
  fontFamily: string;
  /** Code-font stack override (empty = theme default; pairs with fontFamily). */
  codeFontFamily: string;
  /** Whole-UI font scale, 0.9–1.1 in 0.05 steps (1 = stock size). */
  fontScale: number;
  /** Tint the scrollbar with the accent color. */
  scrollbarAccent: boolean;
  /** Dark-mode accent override ('' = inherit the main accent). */
  darkAccent: string;
  /** Raw CSS appended verbatim (escape hatch for personal tweaks). */
  customCss: string;
  /** Extra CSS custom properties written onto <html> (escape hatch). */
  customVars: Record<string, string>;
  /**
   * Feature whitelist: which independently selectable features to mount.
   * Absent or empty = every feature (backward compatible); present = only
   * the listed features register. Loader-level selection, not a theme knob.
   */
  features?: readonly PluginFeature[];
}
/**
 * Shipped defaults: deliberately neutral — stock blue accent,
 * opaque surfaces. Out of the box the plugin changes nothing; users compose
 * their own look with a preset and/or explicit fields in their profile row.
 */
export declare const DEFAULTS: CustomThemeConfig;
/** Clamp a number into [lo, hi], falling back when absent/non-finite. */
export declare const clampNumber: (value: unknown, lo: number, hi: number, fallback: number) => number;
/** Trim a string, returning the fallback when empty/non-string. */
export declare const cleanString: (value: unknown, fallback: string) => string;
/**
 * Resolve the enabled feature set from the loader config. The `features`
 * field is a whitelist: absent or empty means every feature mounts (backward
 * compatible); present means only the listed features register. Unknown ids
 * are dropped. Pure: no DOM access, fully unit-testable.
 * @param raw - the profile-level plugin config.
 * @returns the set of features to mount.
 */
export declare function resolveFeatures(raw: {
  readonly features?: readonly PluginFeature[] | undefined;
} | undefined): Set<PluginFeature>;
/**
 * Merge DEFAULTS ← preset ← explicit config, then coerce/clamp every field.
 * Pure: no DOM access, fully unit-testable.
 * @param raw - profile-level plugin config (may be partial / malformed).
 * @param preset - resolved preset partial (undefined when no preset matched).
 * @returns a normalized config ready for the applier.
 */
export declare function normalizeConfig(raw: Partial<CustomThemeConfig> | undefined, preset: Partial<CustomThemeConfig> | undefined): CustomThemeConfig;
/** All supported knob names (drives docs and future settings UI). */
export declare const CONFIG_KEYS: readonly (keyof CustomThemeConfig)[];
//#endregion
//#region src/client/ui-enhance/ui-enhance-locales.d.ts
/** Locale dictionaries for the unified UI增强 settings section (tab bar + nav label). */
/** Dictionary namespace owned by the unified section. */
export declare const UI_ENHANCE_NS = "ui-enhance";
/** All ui-enhance copy keys. */
type UiEnhanceKey = 'nav' | 'tabAppearance' | 'tabMotion' | 'tabZh';
declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The unified ui-enhance section copy. */
    'ui-enhance': UiEnhanceKey;
  }
}
//#endregion
//#region src/client/presets.d.ts
/** One named preset. */
interface ThemePreset {
  /** Stable id used in config (`preset: '<id>'`). */
  id: string;
  /** Short display name. */
  name: string;
  /** One-line description (README + settings gallery). */
  description: string;
  /** Partial config overlaid on DEFAULTS. */
  config: Partial<CustomThemeConfig>;
}
/** All shipped presets, in display order. */
export declare const PRESETS: readonly ThemePreset[];
/** Id → preset lookup. */
export declare const PRESET_MAP: ReadonlyMap<string, ThemePreset>;
/**
 * Resolve a preset id to its partial config.
 * @param id - preset id ('' or unknown ids resolve to undefined).
 * @returns the preset's partial config, or undefined.
 */
export declare function resolvePreset(id: string | undefined): Partial<CustomThemeConfig> | undefined;
//#endregion
//#region src/client/index.d.ts
/**
 * Required services: theme (none extra), settings UI (slots/locale/sessions).
 *
 * The settings service itself is deliberately absent: it is
 * `ctx.settingsScope` on ≤0.1.6 and `ctx.configForms` on 0.1.7, and a
 * required name that one generation never provides leaves this client
 * fiber pending forever — the fatal `web boot: N entries did not
 * activate`. `bindSettingsScope` waits for whichever one exists.
 */
export declare const inject: string[];
/**
 * Client plugin body: mount each enabled feature (appearance /
 * markdown). The loader config's `features` whitelist
 * decides which features register; absent = everything.
 * @param ctx - client root context.
 * @param config - profile-level plugin config (partial over the preset).
 */
export declare function apply(ctx: ClientContext, config?: Partial<CustomThemeConfig>): void;
//#endregion
export type { CustomThemeConfig, PluginFeature, ThemePreset };
