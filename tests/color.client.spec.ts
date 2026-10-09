// @vitest-environment node
/**
 * ui-custom color math (color.ts): pure hex/HSL helpers behind the accent ramp
 * the stylesheet consumes. Pure functions, so they are cheap to pin down here.
 */
import { describe, expect, it } from 'vitest'
import { harmonySwatches, rgbToHex } from '../src/client/color.ts'

describe('rgbToHex', () => {
  it('formats rgb triples as #rrggbb', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
    expect(rgbToHex(65, 118, 230)).toBe('#4176e6')
  })
})

describe('harmonySwatches', () => {
  it('derives a fixed-size, all-hex palette from one accent', () => {
    const swatches = harmonySwatches('#4176e6')
    expect(swatches.length).toBeGreaterThan(0)
    for (const hex of swatches) expect(hex).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('is stable for the same input', () => {
    expect(harmonySwatches('#ff0000')).toEqual(harmonySwatches('#ff0000'))
  })
})
