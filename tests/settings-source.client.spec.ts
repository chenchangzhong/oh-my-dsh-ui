// @vitest-environment node
/**
 * Settings scope face: the effective section the plugin renders and diffs
 * against. Regression coverage for the 0.1.7 lagging `value`: the Host's
 * `value` (the entry's runtime config) trails the document row (`user`), so
 * the appearance form showed stale values and reset to them after each save.
 * The face must serve `base` overlaid by `user`, while keeping the snapshot
 * reference stable — React re-reads it through `useSyncExternalStore`.
 */
import { describe, expect, it } from 'vitest'
import { bindSettingsScope, type SettingsScopeSnapshot } from '../src/client/settings-source.ts'
import type { ClientContext } from '../src/client/dsh-client-types.ts'

type Section = Record<string, unknown>

/** Fake browser context whose `configForms.get(ns)` answers a mutable snapshot. */
function fakeCtx(initial?: SettingsScopeSnapshot<Section>): {
  ctx: ClientContext
  publish: (next: SettingsScopeSnapshot<Section>) => void
} {
  let snapshot = initial
  const form = {
    getSnapshot: () => snapshot,
    subscribe: () => () => {},
    set: () => Promise.resolve(true),
    unset: () => Promise.resolve(true),
  }
  return {
    ctx: {
      inject: (names: string[], run: (scoped: Record<string, unknown>) => void) => {
        if (names[0] === 'configForms' && initial !== undefined) {
          run({ configForms: { get: () => form } })
        }
      },
    } as unknown as ClientContext,
    publish: (next) => { snapshot = next },
  }
}

/** Overlay fixture mirroring the reported profile (lagging value, live row). */
const withLegacyValue = (): SettingsScopeSnapshot<Section> => ({
  status: 'ready',
  value: { surfaceOpacity: 0, darkSurfaceOpacity: 0 },
  base: { surfaceOpacity: 100, darkSurfaceOpacity: 100 },
  user: { surfaceOpacity: 34 },
  revision: 11,
  writable: true,
  mode: 'host',
})

describe('bindSettingsScope', () => {
  it('serves base overlaid by user, not the lagging runtime value', () => {
    const face = bindSettingsScope<Section>(fakeCtx(withLegacyValue()).ctx)
    const snapshot = face.getSnapshot()
    expect(snapshot.value).toEqual({ surfaceOpacity: 34, darkSurfaceOpacity: 100 })
    // The raw layers stay untouched: `explicitDark` keys off `user`.
    expect(snapshot.user).toEqual({ surfaceOpacity: 34 })
    expect(snapshot.base).toEqual({ surfaceOpacity: 100, darkSurfaceOpacity: 100 })
    expect(snapshot.status).toBe('ready')
    expect(snapshot.revision).toBe(11)
    expect(snapshot.writable).toBe(true)
  })

  it('keeps one stable snapshot reference until the backing one changes', () => {
    const { ctx, publish } = fakeCtx(withLegacyValue())
    const face = bindSettingsScope<Section>(ctx)
    const first = face.getSnapshot()
    expect(face.getSnapshot()).toBe(first)
    publish({ ...withLegacyValue(), revision: 12, user: { surfaceOpacity: 42 } })
    const second = face.getSnapshot()
    expect(second).not.toBe(first)
    expect(second.value).toEqual({ surfaceOpacity: 42, darkSurfaceOpacity: 100 })
    expect(face.getSnapshot()).toBe(second)
  })

  it('keeps the served value for a generation that carries neither layer', () => {
    const face = bindSettingsScope<Section>(fakeCtx({
      status: 'ready', value: { surfaceOpacity: 42 },
    }).ctx)
    expect(face.getSnapshot().value).toEqual({ surfaceOpacity: 42 })
  })

  it('stays loading while no backing scope is attached', () => {
    const face = bindSettingsScope<Section>(fakeCtx().ctx)
    const snapshot = face.getSnapshot()
    expect(snapshot).toEqual({ status: 'loading' })
    expect(face.getSnapshot()).toBe(snapshot)
  })
})
