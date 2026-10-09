/**
 * Applier: turns a normalized `CustomThemeConfig` into DOM effects.
 *
 * - Writes `--dsu-*` custom properties on <html> (consumed by
 *   custom.module.css).
 * - Injects a `<style id="dsu-custom">` with the user's `customCss` escape
 *   hatch (kept in sync on re-apply).
 * - Writes `customVars` as extra custom properties.
 *
 * The whole override set is gated behind `html[data-dsu-active]` in the
 * stylesheet; the gate is only removed when the config is fully neutral (the
 * stock look — stock accent, opaque surfaces), so the plugin changes nothing
 * out of the box.
 */
import type { CustomThemeConfig } from './config.ts'
import { clampNumber, cleanString, DEFAULTS } from './config.ts'

const CUSTOM_STYLE_ID = 'dsh-ui-custom-css'

/**
 * True when the normalized config overrides nothing — the exact stock look.
 * The applier drops the theme gate then, so an unconfigured profile is
 * byte-for-byte identical to the stock UI (the "zero changes out of the box"
 * contract). Every knob the user turns makes the config non-neutral and
 * activates the theme. Derived from DEFAULTS so a default-value change can
 * never silently flip the gate; darkSurfaceOpacity derives from surfaceOpacity,
 * so 100 is the neutral.
 */
const isNeutralConfig = (config: CustomThemeConfig): boolean =>
  config.accent === DEFAULTS.accent
  && config.surfaceOpacity === DEFAULTS.surfaceOpacity
  && config.sidebarOpacity === DEFAULTS.sidebarOpacity
  && config.inputOpacity === DEFAULTS.inputOpacity
  && config.codeBlockOpacity === DEFAULTS.codeBlockOpacity
  && config.darkSurfaceOpacity === 100
  && config.fontFamily === DEFAULTS.fontFamily
  && config.codeFontFamily === DEFAULTS.codeFontFamily
  && config.fontScale === DEFAULTS.fontScale
  && config.scrollbarAccent === DEFAULTS.scrollbarAccent
  && config.darkAccent === DEFAULTS.darkAccent
  && config.customCss === DEFAULTS.customCss
  && Object.keys(config.customVars).length === 0

/**
 * Apply the normalized config to the document.
 * @param config - normalized config from normalizeConfig().
 */
export function applyConfig(config: CustomThemeConfig): void {
  const root = document.documentElement
  if (isNeutralConfig(config)) {
    // Nothing to override: drop the gate so every override disappears.
    root.removeAttribute('data-dsu-active')
    document.getElementById(CUSTOM_STYLE_ID)?.remove()
    return
  }
  root.setAttribute('data-dsu-active', '1')

  const set = (name: string, value: string): void => root.style.setProperty(name, value)
  set('--dsu-accent', cleanString(config.accent, '#4176e6'))
  set('--dsu-surface-alpha', `${clampNumber(config.surfaceOpacity, 0, 100, 50)}%`)
  set('--dsu-sidebar-alpha', `${clampNumber(config.sidebarOpacity, 0, 100, 50)}%`)
  set('--dsu-input-alpha', `${clampNumber(config.inputOpacity, 0, 100, 82)}%`)
  set('--dsu-code-alpha', `${clampNumber(config.codeBlockOpacity, 0, 100, 45)}%`)
  set('--dsu-dark-alpha', `${clampNumber(config.darkSurfaceOpacity, 0, 100, config.surfaceOpacity)}%`)
  const font = cleanString(config.fontFamily, '')
  if (font !== '') set('--dsu-font', font)
  else root.style.removeProperty('--dsu-font')
  const codeFont = cleanString(config.codeFontFamily, '')
  if (codeFont !== '') set('--dsu-code-font', codeFont)
  else root.style.removeProperty('--dsu-code-font')
  // Whole-UI font scale: only written when it differs from 1 (the stylesheet
  // falls back to zoom: 1 = stock size).
  if (config.fontScale !== 1) set('--dsu-font-scale', `${clampNumber(config.fontScale, 0.9, 1.1, 1)}`)
  else root.style.removeProperty('--dsu-font-scale')
  set('--dsu-scrollbar', config.scrollbarAccent ? '1' : '0')

  const darkAccent = cleanString(config.darkAccent, '')
  if (darkAccent !== '') set('--dsu-dark-accent', darkAccent)
  else root.style.removeProperty('--dsu-dark-accent')

  // customVars: write each entry ('' removes the property).
  for (const [key, value] of Object.entries(config.customVars)) {
    if (value === '') root.style.removeProperty(key)
    else root.style.setProperty(key, value)
  }

  // customCss: a single plugin-owned style tag, kept in sync.
  let style = document.getElementById(CUSTOM_STYLE_ID) as HTMLStyleElement | null
  if (config.customCss !== '') {
    if (style === null) {
      style = document.createElement('style')
      style.id = CUSTOM_STYLE_ID
      style.dataset.plugin = 'oh-my-dsh-ui'
      document.head.appendChild(style)
    }
    style.textContent = config.customCss
  } else {
    style?.remove()
  }
}
