/**
 * Adapter that bridges the host's settingsScope (ui-custom namespace) to the
 * SmoothStreamCardController's settings API.
 *
 * The source dsh-smooth-stream uses a loopback RPC channel `/smooth-stream`.
 * This port uses the host's `ctx.settingsScope` under the `ui-custom` namespace,
 * with smooth-specific fields stored there.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import {
  DEFAULT_STREAM_DEBUG_TUNING,
  DEFAULT_STREAM_SETTINGS,
  publishMotionPreference,
  toMotionPreference,
  type StreamDebugTuning,
  type StreamSettings,
} from './settings.ts'

/**
 * What the smooth settings scope stores under the ui-custom namespace.
 * These fields mirror the StreamSettings shape.
 */
export interface SmoothScopeSnapshot {
  smoothEnabled: boolean
  smoothThinkAutoExpand: boolean
  smoothDebugEnabled: boolean
  smoothDebugTuning: StreamDebugTuning
  smoothMotionPreference: string
}

/** Default values for smooth scope fields. */
const SMOOTH_DEFAULTS: SmoothScopeSnapshot = {
  smoothEnabled: DEFAULT_STREAM_SETTINGS.enabled,
  smoothThinkAutoExpand: DEFAULT_STREAM_SETTINGS.thinkAutoExpand,
  smoothDebugEnabled: DEFAULT_STREAM_SETTINGS.debugEnabled,
  smoothDebugTuning: DEFAULT_STREAM_DEBUG_TUNING,
  smoothMotionPreference: DEFAULT_STREAM_SETTINGS.motionPreference,
}

/** Parse debug tuning from a raw scope value. */
function parseDebugTuning(raw: unknown): StreamDebugTuning {
  if (raw === null || raw === undefined || typeof raw !== 'object') return { ...DEFAULT_STREAM_DEBUG_TUNING }
  const t = raw as Record<string, unknown>
  return {
    revealScale: typeof t.revealScale === 'number' ? t.revealScale : DEFAULT_STREAM_DEBUG_TUNING.revealScale,
    queuePressure: typeof t.queuePressure === 'number' ? t.queuePressure : DEFAULT_STREAM_DEBUG_TUNING.queuePressure,
    maxRevealCps: typeof t.maxRevealCps === 'number' ? t.maxRevealCps : DEFAULT_STREAM_DEBUG_TUNING.maxRevealCps,
    springStiffness: typeof t.springStiffness === 'number' ? t.springStiffness : DEFAULT_STREAM_DEBUG_TUNING.springStiffness,
    springDamping: typeof t.springDamping === 'number' ? t.springDamping : DEFAULT_STREAM_DEBUG_TUNING.springDamping,
    springMass: typeof t.springMass === 'number' ? t.springMass : DEFAULT_STREAM_DEBUG_TUNING.springMass,
    runwayPx: typeof t.runwayPx === 'number' ? t.runwayPx : DEFAULT_STREAM_DEBUG_TUNING.runwayPx,
    reserveResponseMs: typeof t.reserveResponseMs === 'number' ? t.reserveResponseMs : DEFAULT_STREAM_DEBUG_TUNING.reserveResponseMs,
    backpressureMinScale: typeof t.backpressureMinScale === 'number' ? t.backpressureMinScale : DEFAULT_STREAM_DEBUG_TUNING.backpressureMinScale,
  }
}

/** Build the current snapshot from a raw settings scope value. */
function buildSnapshot(raw: unknown): StreamSettings {
  if (raw === undefined || raw === null || typeof raw !== 'object') {
    return { ...DEFAULT_STREAM_SETTINGS }
  }
  const obj = raw as Record<string, unknown>
  return {
    enabled: typeof obj.smoothEnabled === 'boolean' ? obj.smoothEnabled : DEFAULT_STREAM_SETTINGS.enabled,
    thinkAutoExpand: typeof obj.smoothThinkAutoExpand === 'boolean' ? obj.smoothThinkAutoExpand : DEFAULT_STREAM_SETTINGS.thinkAutoExpand,
    debugEnabled: typeof obj.smoothDebugEnabled === 'boolean' ? obj.smoothDebugEnabled : DEFAULT_STREAM_SETTINGS.debugEnabled,
    motionPreference: toMotionPreference(obj.smoothMotionPreference),
    debugTuning: parseDebugTuning(obj.smoothDebugTuning),
  }
}

/** Minimal settings API face consumed by SmoothStreamCardController. */
export interface SmoothSettingsFace {
  read(): StreamSettings
  write(settings: Partial<StreamSettings>): void
  writable(): boolean
}

/** Create a settings API backed by the host's settingsScope. */
export function createHostSettingsApi(
  scope: ClientContext extends { settingsScope: infer S } ? S extends { bind: (ns: unknown) => { getSnapshot: () => { value: unknown } } } ? S : never : never,
): SmoothSettingsFace {
  // The scope is already bound; read from it directly.
  return {
    read(): StreamSettings {
      try {
        const snapshot = (scope as { getSnapshot: () => { value: unknown } }).getSnapshot()
        const settings = buildSnapshot(snapshot.value)
        // Mirror the preference to live renderers (they hold no scope).
        publishMotionPreference(settings.motionPreference)
        return settings
      } catch {
        return { ...DEFAULT_STREAM_SETTINGS }
      }
    },
    write(settings: Partial<StreamSettings>): void {
      try {
        const patch: Record<string, unknown> = {}
        if (settings.enabled !== undefined) patch.smoothEnabled = settings.enabled
        if (settings.thinkAutoExpand !== undefined) patch.smoothThinkAutoExpand = settings.thinkAutoExpand
        if (settings.debugEnabled !== undefined) patch.smoothDebugEnabled = settings.debugEnabled
        if (settings.motionPreference !== undefined) {
          patch.smoothMotionPreference = toMotionPreference(settings.motionPreference)
          publishMotionPreference(settings.motionPreference)
        }
        if (settings.debugTuning !== undefined) {
          patch.smoothDebugTuning = {
            ...DEFAULT_STREAM_DEBUG_TUNING,
            ...settings.debugTuning,
          }
        }
        // Write to scope - the exact API depends on the host's settingsScope binding
        const scopeAny = scope as { set?: (key: string, value: unknown) => void }
        if (typeof scopeAny.set === 'function') {
          for (const [key, value] of Object.entries(patch)) {
            scopeAny.set(key, value)
          }
        }
      } catch {
        // Settings scope not available
      }
    },
    writable(): boolean {
      try {
        const snapshot = (scope as { getSnapshot: () => { status?: string } }).getSnapshot()
        return snapshot.status !== 'readonly'
      } catch {
        return false
      }
    },
  }
}
