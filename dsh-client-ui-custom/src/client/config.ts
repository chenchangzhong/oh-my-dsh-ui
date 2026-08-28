/**
 * Theme config model + normalization pipeline for the ui-custom plugin.
 *
 * The pipeline is: `DEFAULTS` ← preset (presets.ts) ← profile `config`
 * (explicit user values always win), then every field is coerced and clamped
 * into a `CustomThemeConfig` the applier can trust. Keeping normalization
 * here (pure, DOM-free) makes it unit-testable and gives GitHub users a
 * single documented contract for what each knob accepts.
 */
import type { PluginFeature } from '../shared.ts'
import { FEATURES } from '../shared.ts'

/** Every knob the plugin understands. New art options extend this interface. */
export interface CustomThemeConfig {
  /** Preset id from presets.ts ('' = none; preset fields merge under explicit config). */
  preset: string
  /** Accent color; the whole deepseek ramp is derived from it. */
  accent: string
  /** Derive the accent color automatically from a sampled source (overrides `accent` on success). */
  autoAccent: boolean
  /** Main surface opacity, 0–100 (chat/details columns). */
  surfaceOpacity: number
  /** Sidebar surface opacity, 0–100. */
  sidebarOpacity: number
  /** Chat column opacity, 0–100 (read via --dsw-chat-surface). */
  chatSurfaceOpacity: number
  /** Composer input opacity, 0–100. */
  inputOpacity: number
  /** Code block / inline code opacity, 0–100. */
  codeBlockOpacity: number
  /** Dark-mode surface opacity, 0–100 (defaults to surfaceOpacity when unset). */
  darkSurfaceOpacity?: number
  /** Interface font stack override (empty = theme default). */
  fontFamily: string
  /** Code-font stack override (empty = theme default; pairs with fontFamily). */
  codeFontFamily: string
  /** Whole-UI font scale, 0.9–1.1 in 0.05 steps (1 = stock size). */
  fontScale: number
  /** Tint the scrollbar with the accent color. */
  scrollbarAccent: boolean
  /**
   * Opt-in refinement knobs. Every knob defaults to its neutral value
   * ('inherit' / ''): the plugin changes nothing until the user picks one.
   */
  /** Corner radius: 'inherit' | 'sm' | 'md' | 'lg' | 'xl'. */
  cornerRadius: CornerRadius
  /** Surface shadow: 'inherit' | 'none' | 'soft' | 'medium' | 'strong'. */
  surfaceShadow: SurfaceShadow
  /** Focus glow: 'inherit' | 'on'. */
  focusGlow: FocusGlow
  /** Dark-mode accent override ('' = inherit the main accent). */
  darkAccent: string
  /** Raw CSS appended verbatim (escape hatch for personal tweaks). */
  customCss: string
  /** Extra CSS custom properties written onto <html> (escape hatch). */
  customVars: Record<string, string>
  /**
   * Feature whitelist: which independently selectable features to mount.
   * Absent or empty = every feature (backward compatible); present = only
   * the listed features register. Loader-level selection, not a theme knob.
   */
  features?: readonly PluginFeature[]
}

/** Opt-in corner radius (inherit = keep the stock look). */
export type CornerRadius = 'inherit' | 'sm' | 'md' | 'lg' | 'xl'
/** Opt-in surface shadow (inherit = keep the stock look). */
export type SurfaceShadow = 'inherit' | 'none' | 'soft' | 'medium' | 'strong'
/** Opt-in focus glow (inherit = stock focus, no added ring). */
export type FocusGlow = 'inherit' | 'on'

/** Valid corner-radius values (in UI order). */
export const CORNER_RADIUS_LEVELS: readonly CornerRadius[] = ['inherit', 'sm', 'md', 'lg', 'xl']
/** Valid surface-shadow values (in UI order). */
export const SURFACE_SHADOW_LEVELS: readonly SurfaceShadow[] = ['inherit', 'none', 'soft', 'medium', 'strong']
/** Valid focus-glow values. */
export const FOCUS_GLOW_LEVELS: readonly FocusGlow[] = ['inherit', 'on']

const isOneOf = <T extends string>(value: unknown, options: readonly T[], fallback: T): T =>
  typeof value === 'string' && (options as readonly string[]).includes(value) ? value as T : fallback

export const isCornerRadius = (value: unknown): value is CornerRadius =>
  typeof value === 'string' && (CORNER_RADIUS_LEVELS as readonly string[]).includes(value)
export const isSurfaceShadow = (value: unknown): value is SurfaceShadow =>
  typeof value === 'string' && (SURFACE_SHADOW_LEVELS as readonly string[]).includes(value)
export const isFocusGlow = (value: unknown): value is FocusGlow =>
  typeof value === 'string' && (FOCUS_GLOW_LEVELS as readonly string[]).includes(value)

/**
 * Shipped defaults: deliberately neutral — stock blue accent,
 * opaque surfaces. Out of the box the plugin changes nothing; users compose
 * their own look with a preset and/or explicit fields in their profile row.
 */
export const DEFAULTS: CustomThemeConfig = {
  preset: '',
  accent: '#4176e6',
  autoAccent: false,
  surfaceOpacity: 100,
  sidebarOpacity: 100,
  chatSurfaceOpacity: 100,
  inputOpacity: 100,
  codeBlockOpacity: 100,
  fontFamily: '',
  codeFontFamily: '',
  fontScale: 1,
  scrollbarAccent: false,
  cornerRadius: 'inherit',
  surfaceShadow: 'inherit',
  focusGlow: 'inherit',
  darkAccent: '',
  customCss: '',
  customVars: {},
}

/** Clamp a number into [lo, hi], falling back when absent/non-finite. */
export const clampNumber = (value: unknown, lo: number, hi: number, fallback: number): number => {
  const n = typeof value === 'number' && Number.isFinite(value) ? value : fallback
  return Math.min(hi, Math.max(lo, n))
}

/** Trim a string, returning the fallback when empty/non-string. */
export const cleanString = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.trim() !== '' ? value.trim() : fallback

const toBoolean = (value: unknown, fallback: boolean): boolean =>
  typeof value === 'boolean' ? value : fallback

const toPercent = (value: unknown, fallback: number): number =>
  clampNumber(value, 0, 100, fallback)

const toVars = (value: unknown): Record<string, string> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return {}
  const out: Record<string, string> = {}
  for (const [key, raw] of Object.entries(value)) {
    if (typeof raw === 'string' || typeof raw === 'number') out[key] = String(raw)
  }
  return out
}

/**
 * Resolve the enabled feature set from the loader config. The `features`
 * field is a whitelist: absent or empty means every feature mounts (backward
 * compatible); present means only the listed features register. Unknown ids
 * are dropped. Pure: no DOM access, fully unit-testable.
 * @param raw - the profile-level plugin config.
 * @returns the set of features to mount.
 */
export function resolveFeatures(raw: { readonly features?: readonly PluginFeature[] | undefined } | undefined): Set<PluginFeature> {
  const list = raw?.features
  if (!Array.isArray(list) || list.length === 0) return new Set([...FEATURES])
  return new Set(list.filter((id): id is PluginFeature => (FEATURES as readonly string[]).includes(id)))
}

/**
 * Merge DEFAULTS ← preset ← explicit config, then coerce/clamp every field.
 * Pure: no DOM access, fully unit-testable.
 * @param raw - profile-level plugin config (may be partial / malformed).
 * @param preset - resolved preset partial (undefined when no preset matched).
 * @returns a normalized config ready for the applier.
 */
export function normalizeConfig(
  raw: Partial<CustomThemeConfig> | undefined,
  preset: Partial<CustomThemeConfig> | undefined,
): CustomThemeConfig {
  const merged = { ...DEFAULTS, ...preset, ...raw }
  const surfaceOpacity = toPercent(merged.surfaceOpacity, DEFAULTS.surfaceOpacity)
  // darkSurfaceOpacity is derived: explicit (raw/preset) value, else surfaceOpacity.
  const darkSurfaceOpacity = merged.darkSurfaceOpacity === undefined
    ? surfaceOpacity
    : toPercent(merged.darkSurfaceOpacity, surfaceOpacity)
  return {
    preset: cleanString(merged.preset, DEFAULTS.preset),
    accent: cleanString(merged.accent, DEFAULTS.accent),
    autoAccent: toBoolean(merged.autoAccent, DEFAULTS.autoAccent),
    surfaceOpacity,
    sidebarOpacity: toPercent(merged.sidebarOpacity, DEFAULTS.sidebarOpacity),
    chatSurfaceOpacity: toPercent(merged.chatSurfaceOpacity, DEFAULTS.chatSurfaceOpacity),
    inputOpacity: toPercent(merged.inputOpacity, DEFAULTS.inputOpacity),
    codeBlockOpacity: toPercent(merged.codeBlockOpacity, DEFAULTS.codeBlockOpacity),
    darkSurfaceOpacity,
    fontFamily: typeof merged.fontFamily === 'string' ? merged.fontFamily.trim() : '',
    codeFontFamily: typeof merged.codeFontFamily === 'string' ? merged.codeFontFamily.trim() : '',
    // Whole-UI font scale: clamp to 0.9–1.1 and snap to 0.05 steps (1 = stock).
    fontScale: Math.round(clampNumber(merged.fontScale, 0.9, 1.1, DEFAULTS.fontScale) * 20) / 20,
    scrollbarAccent: toBoolean(merged.scrollbarAccent, DEFAULTS.scrollbarAccent),
    cornerRadius: isOneOf(merged.cornerRadius, CORNER_RADIUS_LEVELS, DEFAULTS.cornerRadius),
    surfaceShadow: isOneOf(merged.surfaceShadow, SURFACE_SHADOW_LEVELS, DEFAULTS.surfaceShadow),
    focusGlow: isOneOf(merged.focusGlow, FOCUS_GLOW_LEVELS, DEFAULTS.focusGlow),
    darkAccent: cleanString(merged.darkAccent, DEFAULTS.darkAccent),
    customCss: typeof merged.customCss === 'string' ? merged.customCss : '',
    customVars: toVars(merged.customVars),
  }
}

/** All supported knob names (drives docs and future settings UI). */
export const CONFIG_KEYS: readonly (keyof CustomThemeConfig)[] = [
  'preset', 'accent', 'autoAccent',
  'surfaceOpacity', 'sidebarOpacity', 'chatSurfaceOpacity', 'inputOpacity',
  'codeBlockOpacity', 'darkSurfaceOpacity',
  'fontFamily', 'codeFontFamily', 'fontScale', 'scrollbarAccent', 'cornerRadius', 'surfaceShadow',
  'focusGlow', 'darkAccent', 'customCss', 'customVars',
]
