// @vitest-environment node
/**
 * ui-custom theme-section mapping: settings section → effective config.
 */
import { describe, expect, it } from 'vitest'
import { DEFAULTS, normalizeConfig } from '../src/client/config.ts'
import { configFromThemeSection } from '../src/client/theme-section.ts'

const normalized = normalizeConfig(undefined, undefined)

describe('configFromThemeSection', () => {
  it('returns the normalized config when the section is absent', () => {
    expect(configFromThemeSection(normalized, undefined)).toEqual(normalized)
  })

  it('overlays section fields over the loader defaults', () => {
    const config = configFromThemeSection(normalized, {
      accent: '#ff7fb2',
      autoAccent: true,
      surfaceOpacity: 42,
      sidebarOpacity: 50,
      inputOpacity: 70,
      codeBlockOpacity: 55,
      darkSurfaceOpacity: 40,
      fontFamily: 'MiSans',
      codeFontFamily: 'JetBrains Mono',
      fontScale: 1.05,
      scrollbarAccent: true,
      darkAccent: '#223355',
    })
    expect(config.accent).toBe('#ff7fb2')
    expect(config.autoAccent).toBe(true)
    expect(config.surfaceOpacity).toBe(42)
    expect(config.darkSurfaceOpacity).toBe(40)
    expect(config.fontFamily).toBe('MiSans')
    expect(config.codeFontFamily).toBe('JetBrains Mono')
    expect(config.fontScale).toBe(1.05)
    expect(config.scrollbarAccent).toBe(true)
    expect(config.darkAccent).toBe('#223355')
    // Untouched fields keep loader defaults.
    expect(config.preset).toBe(normalized.preset)
  })

  it('falls back per field when the section leaves it undefined', () => {
    const config = configFromThemeSection(normalized, {
      accent: undefined,
      autoAccent: undefined,
      surfaceOpacity: undefined,
      sidebarOpacity: undefined,
      inputOpacity: undefined,
      codeBlockOpacity: undefined,
      darkSurfaceOpacity: undefined,
      fontFamily: undefined,
      codeFontFamily: undefined,
      fontScale: undefined,
      scrollbarAccent: undefined,
      darkAccent: undefined,
    })
    expect(config).toEqual(normalized)
  })

  it('never lands an explicit undefined on the optional darkSurfaceOpacity', () => {
    const config = configFromThemeSection(normalized, {
      accent: undefined, autoAccent: undefined,
      surfaceOpacity: undefined, sidebarOpacity: undefined,
      inputOpacity: undefined, codeBlockOpacity: undefined, darkSurfaceOpacity: undefined,
      fontFamily: undefined, codeFontFamily: undefined,
      fontScale: undefined, scrollbarAccent: undefined, darkAccent: undefined,
    })
    expect(typeof config.darkSurfaceOpacity).toBe('number')
  })

  it('treats an explicit empty string as "clear the field" (preset reset)', () => {
    // An explicit '' from a preset clears the knob (back to stock defaults):
    // a visual preset resets fontFamily even if a font preset was active.
    // Absent fields (undefined) fall back to the loader layer instead — that
    // is the per-field fallback test above, not this one.
    const config = configFromThemeSection(normalized, {
      accent: '', autoAccent: undefined,
      surfaceOpacity: undefined, sidebarOpacity: undefined,
      inputOpacity: undefined, codeBlockOpacity: undefined, darkSurfaceOpacity: undefined,
      fontFamily: '', codeFontFamily: '', darkAccent: '',
      fontScale: undefined, scrollbarAccent: undefined,
    })
    expect(config.accent).toBe('')
    expect(config.fontFamily).toBe('')
    expect(config.darkAccent).toBe('')
  })

  it('inherits the dark surface opacity from the live surfaceOpacity when unset', () => {
    // No explicit darkSurfaceOpacity in the section → the dark main surface
    // follows 表面不透明度 (index.ts drops the loader-base dark value unless
    // the raw user layer carries an explicit override).
    const config = configFromThemeSection(normalized, {
      accent: '#123456', autoAccent: undefined,
      surfaceOpacity: 72, sidebarOpacity: undefined,
      inputOpacity: undefined, codeBlockOpacity: undefined, darkSurfaceOpacity: undefined,
      fontFamily: undefined, codeFontFamily: undefined, fontScale: undefined,
      scrollbarAccent: undefined, darkAccent: undefined,
    })
    expect(config.darkSurfaceOpacity).toBe(72)
    // An explicit dark override still wins.
    const overridden = configFromThemeSection(normalized, {
      accent: undefined, autoAccent: undefined,
      surfaceOpacity: 72, sidebarOpacity: undefined,
      inputOpacity: undefined, codeBlockOpacity: undefined, darkSurfaceOpacity: 41,
      fontFamily: undefined, codeFontFamily: undefined, fontScale: undefined,
      scrollbarAccent: undefined, darkAccent: undefined,
    })
    expect(overridden.darkSurfaceOpacity).toBe(41)
  })

  it('respects DEFAULTS as the section seed', () => {
    // The plugin's shipped defaults are neutral; mapping an empty section
    // over DEFAULTS reproduces DEFAULTS exactly.
    expect(configFromThemeSection(DEFAULTS, undefined)).toEqual(DEFAULTS)
  })
})
