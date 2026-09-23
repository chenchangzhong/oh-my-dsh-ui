/**
 * Settings access that spans harness generations.
 *
 * 0.1.5 / 0.1.6 expose `ctx.settingsScope`, a factory bound with
 * `bind({ namespace })`. 0.1.7 removed that service outright: the settings
 * namespace IS a profile entry id and the browser reaches it through
 * `ctx.configForms.get(entryId)`. Both faces answer the same snapshot —
 * `{ status, value, base, user, revision, writable, mode }` — and both write
 * through `set(field, value)`, so one binder covers both: it attaches to
 * whichever service the running harness provides.
 *
 * The harness also makes either service a REQUIRED dependency if it appears in
 * the plugin's `inject` list, and `settingsScope` no longer exists on 0.1.7 —
 * a required `settingsScope` left this plugin pending forever, which the web
 * boot audit turns into `web boot: N entries did not activate`. Neither name is
 * therefore a static dependency: this binder waits for them dynamically.
 *
 * The backing service may appear after this plugin, so binding is lazy — the
 * face starts on `loading` and forwards to the real scope once it attaches.
 */
import type { ClientContext } from '../dsh-client-types.ts'
import { UI_CUSTOM_SETTINGS_NS } from '../shared.ts'

/** Snapshot shape both harness generations answer with. */
export interface SettingsScopeSnapshot<T> {
  status: 'loading' | 'ready' | 'unavailable'
  value?: T
  base?: unknown
  user?: unknown
  revision?: number
  writable?: boolean
  mode?: 'host' | 'memory'
}

/** Read/write face the features consume (useSyncExternalStore + writes). */
export interface SettingsScopeFace<T> {
  getSnapshot(): SettingsScopeSnapshot<T>
  subscribe(listener: () => void): () => void
  set(field: string, value: unknown): void
  unset(field: string): void
}

/** `ctx.configForms.get(ns)` (0.1.7) and `settingsScope.bind({ namespace })` (≤0.1.6). */
interface ConfigFormLike<T> {
  getSnapshot?: () => unknown
  subscribe?: (listener: () => void) => unknown
  set?: (field: string, value: unknown) => unknown
  unset?: (field: string) => unknown
}

/** Shape of the 0.1.7 `configForms` service as this plugin uses it. */
interface ConfigFormsLike {
  get?: (namespace: string) => unknown
}

/** Shape of the ≤0.1.6 `settingsScope` service as this plugin uses it. */
interface LegacySettingsScopeLike {
  bind?: (options: { namespace: string }) => unknown
}

/** Snapshot served while no backing scope is attached. */
function loadingSnapshot<T>(): SettingsScopeSnapshot<T> {
  return { status: 'loading' }
}

/**
 * Bind this plugin's settings section for whichever harness generation runs.
 *
 * @param ctx - browser plugin context (services are resolved dynamically).
 * @param namespace - settings namespace; the profile entry id on 0.1.7.
 * @returns a stable snapshot/read/write face, `loading` until a scope attaches.
 */
export function bindSettingsScope<T = unknown>(
  ctx: ClientContext,
  namespace: string = UI_CUSTOM_SETTINGS_NS,
): SettingsScopeFace<T> {
  let backing: ConfigFormLike<T> | undefined
  const listeners = new Set<() => void>()
  const backingDisposers = new Map<() => void, () => void>()

  /** Forward one listener to the attached scope (no-op while unattached). */
  const subscribeBacking = (listener: () => void): void => {
    if (backing === undefined || typeof backing.subscribe !== 'function') return
    try {
      const off = backing.subscribe(listener)
      if (typeof off === 'function') backingDisposers.set(listener, off as () => void)
    } catch {
      // A scope that cannot subscribe still serves snapshots.
    }
  }

  /** Attach the first scope the harness actually provides. */
  const attach = (candidate: unknown): void => {
    if (backing !== undefined) return
    const form = candidate as ConfigFormLike<T> | null | undefined
    if (form === null || form === undefined || typeof form.getSnapshot !== 'function') return
    backing = form
    for (const listener of [...listeners]) subscribeBacking(listener)
    // Late arrival: make subscribers re-read the now-real section.
    for (const listener of [...listeners]) {
      try {
        listener()
      } catch {
        // A listener that throws must not block the others.
      }
    }
  }

  // 0.1.7: one form per profile entry id, which IS the settings namespace.
  ctx.inject(['configForms'], (scoped: { configForms?: ConfigFormsLike }) => {
    const forms = scoped.configForms
    if (forms !== undefined && typeof forms.get === 'function') attach(forms.get(namespace))
  })
  // ≤0.1.6: the namespace factory. Never provided on 0.1.7, so only one attaches.
  ctx.inject(['settingsScope'], (scoped: { settingsScope?: LegacySettingsScopeLike }) => {
    const root = scoped.settingsScope
    if (root !== undefined && typeof root.bind === 'function') attach(root.bind({ namespace }))
  })

  return {
    getSnapshot(): SettingsScopeSnapshot<T> {
      if (backing === undefined) return loadingSnapshot<T>()
      try {
        const snapshot = backing.getSnapshot?.()
        if (snapshot !== null && snapshot !== undefined) return snapshot as SettingsScopeSnapshot<T>
      } catch {
        // Keep serving `loading` rather than throwing into React.
      }
      return loadingSnapshot<T>()
    },
    subscribe(listener: () => void): () => void {
      listeners.add(listener)
      subscribeBacking(listener)
      return () => {
        listeners.delete(listener)
        const off = backingDisposers.get(listener)
        backingDisposers.delete(listener)
        if (off !== undefined) {
          try {
            off()
          } catch {
            // Disposal failures are not actionable here.
          }
        }
      }
    },
    set(field: string, value: unknown): void {
      try {
        void backing?.set?.(field, value)
      } catch {
        // Writes require a live scope; a missing one is a no-op.
      }
    },
    unset(field: string): void {
      try {
        void backing?.unset?.(field)
      } catch {
        // See set().
      }
    },
  }
}
