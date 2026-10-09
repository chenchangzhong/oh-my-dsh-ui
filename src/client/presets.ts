/**
 * Theme preset registry: named, reusable partial configs.
 *
 * This is the plugin's main extension surface — adding a new "art choice" is
 * one entry here: pick an id/name/description and a partial config. Users
 * select it from the appearance page (one-click preview) or with
 * `preset: '<id>'` in their profile row; any explicit config field still
 * overrides the preset (DEFAULTS ← preset ← explicit config).
 *
 * Each preset is a complete art direction: accent color, surface opacity
 * recipe, the refinement knobs (scrollbarAccent) and the dark-mode accent.
 *
 * The six schemes use muted, low-saturation "高级" tones and are named after
 * their dominant color with a minimal two-character name.
 */
import type { CustomThemeConfig } from './config.ts'

/** One named preset. */
export interface ThemePreset {
  /** Stable id used in config (`preset: '<id>'`). */
  id: string
  /** Short display name. */
  name: string
  /** One-line description (README + settings gallery). */
  description: string
  /** Partial config overlaid on DEFAULTS. */
  config: Partial<CustomThemeConfig>
}

/** 黛青 — ink-teal jade, quiet and deep. */
const INK_TEAL: ThemePreset = {
  id: 'ink-teal',
  name: '黛青',
  description: '青玉色主题，静谧沉稳。',
  config: {
    accent: '#1e8f7e',
    surfaceOpacity: 40,
    sidebarOpacity: 40,
    inputOpacity: 70,
    codeBlockOpacity: 50,
    darkSurfaceOpacity: 40,
    fontFamily: '',
    scrollbarAccent: true,
    darkAccent: '',
  },
}

/** 黛蓝 — deep ink blue, restrained. */
const INK_BLUE: ThemePreset = {
  id: 'ink-blue',
  name: '黛蓝',
  description: '黛蓝主题，深邃克制的蓝。',
  config: {
    accent: '#3f63d8',
    surfaceOpacity: 38,
    sidebarOpacity: 38,
    inputOpacity: 68,
    codeBlockOpacity: 48,
    darkSurfaceOpacity: 38,
    fontFamily: '',
    scrollbarAccent: true,
    darkAccent: '',
  },
}

/** 藕荷 — dusty lotus rose, warm and gentle. */
const DUSTY_ROSE: ThemePreset = {
  id: 'dusty-rose',
  name: '藕荷',
  description: '藕荷色主题，温润柔和的粉。',
  config: {
    accent: '#c2788f',
    surfaceOpacity: 42,
    sidebarOpacity: 42,
    inputOpacity: 70,
    codeBlockOpacity: 52,
    darkSurfaceOpacity: 42,
    fontFamily: '',
    scrollbarAccent: true,
    darkAccent: '',
  },
}

/** 杏金 — apricot gold, understated warmth. */
const APRICOT_GOLD: ThemePreset = {
  id: 'apricot-gold',
  name: '杏金',
  description: '杏金色主题，温雅低调的金。',
  config: {
    accent: '#c0863c',
    surfaceOpacity: 42,
    sidebarOpacity: 42,
    inputOpacity: 72,
    codeBlockOpacity: 52,
    darkSurfaceOpacity: 42,
    fontFamily: '',
    scrollbarAccent: true,
    darkAccent: '',
  },
}

/** 雾灰 — cool slate mist, calm and quiet. */
const MIST_GRAY: ThemePreset = {
  id: 'mist-gray',
  name: '雾灰',
  description: '雾灰色主题，清冷安静的灰蓝。',
  config: {
    accent: '#64728e',
    surfaceOpacity: 30,
    sidebarOpacity: 30,
    inputOpacity: 60,
    codeBlockOpacity: 40,
    darkSurfaceOpacity: 30,
    fontFamily: '',
    scrollbarAccent: false,
    darkAccent: '',
  },
}

/** 墨紫 — ink violet, quiet mystery for dark mode. */
const INK_VIOLET: ThemePreset = {
  id: 'ink-violet',
  name: '墨紫',
  description: '墨紫色主题，沉静神秘。',
  config: {
    accent: '#8268c4',
    surfaceOpacity: 28,
    sidebarOpacity: 28,
    inputOpacity: 60,
    codeBlockOpacity: 40,
    darkSurfaceOpacity: 28,
    fontFamily: '',
    scrollbarAccent: true,
    darkAccent: '#8268c4',
  },
}

/** All shipped presets, in display order. */
export const PRESETS: readonly ThemePreset[] = [
  INK_TEAL, INK_BLUE, DUSTY_ROSE, APRICOT_GOLD, MIST_GRAY, INK_VIOLET,
]

/** Id → preset lookup. */
export const PRESET_MAP: ReadonlyMap<string, ThemePreset> = new Map(PRESETS.map((preset) => [preset.id, preset]))

/**
 * Resolve a preset id to its partial config.
 * @param id - preset id ('' or unknown ids resolve to undefined).
 * @returns the preset's partial config, or undefined.
 */
export function resolvePreset(id: string | undefined): Partial<CustomThemeConfig> | undefined {
  if (id === undefined || id === '') return undefined
  return PRESET_MAP.get(id)?.config
}
