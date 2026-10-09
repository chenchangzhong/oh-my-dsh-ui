/**
 * Pure, DOM-free color math: hex formatting, HSL conversion, harmony swatches
 * and the "随机灵感" accent recipe. Side-effect free so it is unit-testable.
 */

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  const rf = r / 255
  const gf = g / 255
  const bf = b / 255
  const max = Math.max(rf, gf, bf)
  const min = Math.min(rf, gf, bf)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === rf) h = ((gf - bf) / d + (gf < bf ? 6 : 0)) / 6
  else if (max === gf) h = ((bf - rf) / d + 2) / 6
  else h = ((rf - gf) / d + 4) / 6
  return { h, s, l }
}

/** Format an RGB triple as '#rrggbb'. */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const hex = (n: number): string => Math.round(n).toString(16).padStart(2, '0')
  return `#${hex(r)}${hex(g)}${hex(b)}`
}

/** Parse a '#rrggbb' (or '#rgb') hex color into an RGB triple. */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const match = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex.trim())
  if (match === null) return null
  const group = match[1] ?? ''
  const text = group.length === 3 ? group.split('').map((c) => c + c).join('') : group
  const value = Number.parseInt(text, 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}

/** Format an HSL triple as '#rrggbb'. */
const hslToHex = (h: number, s: number, l: number): string => {
  const f = (n: number): number => {
    const k = (n + h * 12) % 12
    const a = s * Math.min(l, 1 - l)
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }
  return rgbToHex(f(0) * 255, f(8) * 255, f(4) * 255)
}

/**
 * Derive a harmonious accent palette from one hex color (Material-You style):
 * the base, two analogous neighbors, the complementary, two triadic partners,
 * and one darkened tint — seven swatches the appearance page offers as
 * one-click accent alternatives. Pure and DOM-free.
 * @param hex - a '#rrggbb' accent color.
 * @returns '#rrggbb' swatches (the base first); an invalid hex yields [].
 */
export function harmonySwatches(hex: string): string[] {
  const rgb = hexToRgb(hex)
  if (rgb === null) return []
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b)
  if (s === 0) return [rgbToHex(rgb.r, rgb.g, rgb.b)]
  const hue = h * 360
  const wrap = (deg: number): number => ((deg % 360) + 360) % 360
  const at = (deg: number, sat: number, light: number): string => hslToHex(wrap(deg) / 360, sat, light)
  return [
    rgbToHex(rgb.r, rgb.g, rgb.b),
    at(hue + 30, s, l),
    at(hue - 30, s, l),
    at(hue + 180, s, l),
    at(hue + 120, s, l),
    at(hue - 120, s, l),
    at(hue, Math.min(1, s * 1.1), Math.max(0.12, l * 0.62)),
  ]
}

/** A curated set of muted hues (degrees) for the "随机灵感" button — warm to
 * cool, all low-key enough to read as 高级 rather than neon. */
const INSPIRATION_HUES: readonly number[] = [0, 10, 20, 32, 46, 62, 82, 104, 124, 148, 172, 196, 220, 244, 264, 286, 306, 328]

const pick = <T>(rng: () => number, options: readonly T[]): T =>
  options[Math.min(options.length - 1, Math.floor(rng() * options.length))] ?? options[0] ?? (undefined as T)
const between = (rng: () => number, lo: number, hi: number): number => lo + rng() * (hi - lo)

/**
 * Generate one harmonious "random inspiration" theme from the color palette
 * algorithm: a muted accent sampled from a curated hue pool and a coherent
 * surface opacity recipe. Pure and DOM-free; the RNG is injectable so the
 * output is deterministic in tests.
 * @param rng - random source (default Math.random).
 * @returns a partial theme config (fonts untouched).
 */
export function randomInspirationConfig(rng: () => number = Math.random): Partial<import('./config.ts').CustomThemeConfig> {
  const hue = pick(rng, INSPIRATION_HUES) + between(rng, -6, 6)
  const sat = between(rng, 0.30, 0.46)
  const light = between(rng, 0.52, 0.64)
  const dark = rng() < 0.35 // roughly a third of the time: a night scheme
  const accent = hslToHex(hue / 360, sat, light)
  const surface = Math.round(between(rng, 30, 46))
  return {
    accent,
    surfaceOpacity: surface,
    sidebarOpacity: surface,
    inputOpacity: Math.min(100, surface + 28),
    codeBlockOpacity: Math.min(100, surface + 12),
    darkSurfaceOpacity: surface,
    fontFamily: '',
    codeFontFamily: '',
    fontScale: 1,
    scrollbarAccent: rng() < 0.7,
    darkAccent: dark ? accent : '',
  }
}
