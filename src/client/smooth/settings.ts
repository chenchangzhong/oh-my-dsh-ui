/**
 * User-owned settings for the smooth feature, persisted in dsh-client-ui-custom's
 * settings scope (ui-custom namespace).
 *
 * Settings are stored in the host's settingsScope under the ui-custom namespace.
 * The runtime-editable preferences live in the durable user-settings document
 * and take effect live, complementing the composition-time StreamConfig.
 */

import type { StreamSmoothingPreset } from './useSmoothStreamContent.ts'

/** Settings namespace used by the smooth feature within ui-custom. */
export const STREAM_SETTINGS_NS = 'smooth-stream'

/**
 * How the OS `prefers-reduced-motion` preference is honoured.
 *
 * `auto` keeps the accessibility-first bypass (default). The other two exist
 * because the OS preference is frequently forced on by tooling — remote desktop,
 * browser flags, performance profiles — which used to silence smoothing entirely
 * with no way back.
 */
export type MotionPreference = 'auto' | 'force-smooth' | 'force-reduced'

/** 上游命名（StreamMotionPreference）与本地 MotionPreference 同义——取入的上游组件按此名导入。 */
export type StreamMotionPreference = MotionPreference

/** Default motion preference. */
export const DEFAULT_MOTION_PREFERENCE: MotionPreference = 'auto'

/** Parse an unknown value into a MotionPreference (anything invalid → default). */
export function toMotionPreference(value: unknown): MotionPreference {
  return value === 'force-smooth' || value === 'force-reduced' ? value : DEFAULT_MOTION_PREFERENCE
}

// Live mirror of the preference. The renderers have no settings scope of their
// own (they are mounted per message row), so they subscribe to this instead of
// threading the scope through every props chain.
let liveMotionPreference: MotionPreference = DEFAULT_MOTION_PREFERENCE
const motionPreferenceListeners = new Set<() => void>()

/** Read the live motion preference (see {@link subscribeMotionPreference}). */
export function getMotionPreference(): MotionPreference {
  return liveMotionPreference
}

/** Publish the preference read from the settings scope to live renderers. */
export function publishMotionPreference(value: unknown): void {
  const next = toMotionPreference(value)
  if (next === liveMotionPreference) return
  liveMotionPreference = next
  for (const listener of [...motionPreferenceListeners]) listener()
}

/** Subscribe to motion-preference changes (useSyncExternalStore contract). */
export function subscribeMotionPreference(listener: () => void): () => void {
  motionPreferenceListeners.add(listener)
  return () => { motionPreferenceListeners.delete(listener) }
}

/** Default for the adaptive logarithmic opacity fade (new glyphs fade in). */
export const DEFAULT_LOG_FADE = true

// Live mirror of the fade switch, for the same reason as the motion preference:
// renderers are mounted per message row and carry no settings scope.
let liveLogFade: boolean = DEFAULT_LOG_FADE
const logFadeListeners = new Set<() => void>()

/** Read the live logarithmic-fade switch. */
export function getLogFade(): boolean {
  return liveLogFade
}

/** Publish the fade switch read from the settings scope to live renderers. */
export function publishLogFade(value: unknown): void {
  const next = value !== false
  if (next === liveLogFade) return
  liveLogFade = next
  for (const listener of [...logFadeListeners]) listener()
}

/** Subscribe to fade-switch changes (useSyncExternalStore contract). */
export function subscribeLogFade(listener: () => void): () => void {
  logFadeListeners.add(listener)
  return () => { logFadeListeners.delete(listener) }
}

/** Runtime knobs exposed only while the diagnostics switch is enabled. */
export interface StreamDebugTuning {
  /** Multiplier applied to the reveal cadence (1 = preset default). */
  revealScale: number
  /** Multiplier for backlog pressure in the adaptive reveal queue. */
  queuePressure: number
  /** Upper bound for reveal cadence, in characters per second. */
  maxRevealCps: number
  /** Spring stiffness used by the conversation follower. */
  springStiffness: number
  /** Spring damping used by the conversation follower. */
  springDamping: number
  /** Spring mass used by the conversation follower. */
  springMass: number
  /** Predictive runway before the fixed conversation chrome, in pixels. */
  runwayPx: number
  /** Response time for opening/closing the predictive runway, in ms. */
  reserveResponseMs: number
  /** Lowest reveal multiplier when visual lag fills the safe paint room. */
  backpressureMinScale: number
}

/** Defaults preserve the production engine exactly. */
export const DEFAULT_STREAM_DEBUG_TUNING: StreamDebugTuning = {
  revealScale: 1,
  queuePressure: 0.85,
  maxRevealCps: 600,
  springStiffness: 130,
  springDamping: 24,
  springMass: 1,
  runwayPx: 48,
  reserveResponseMs: 180,
  backpressureMinScale: 0.55,
}

/**
 * Preferences a user may set. Deliberately separate from {@link StreamConfig}
 * because the two change at different times: composition-time values go
 * through the config, a live UI edit goes through the settings scope.
 */
export interface StreamSettings {
  /**
   * Whether this feature replaces and wraps Harness conversation renderers.
   * Off returns all rendering ownership to the built-in UI.
   */
  enabled: boolean
  /**
   * Whether a reasoning ("Think") block auto-expands while it is the
   * streaming tail. Off keeps the block collapsed — the user can still open
   * it by hand — and stops the running state from re-owning the disclosure.
   */
  thinkAutoExpand: boolean
  /** Whether the live renderer diagnostics panel is enabled. */
  debugEnabled: boolean
  /** How the OS reduce-motion preference is honoured (see {@link MotionPreference}). */
  motionPreference: MotionPreference
  /**
   * 节奏预设（realtime / balanced / silky）：决定 EMA 种子与滞后倍率。
   *
   * 上游 f3cad7e 起可在设置页修改；在此之前本地只能经 profile config 的
   * `preset` 设定（`streamConfig.preset` 仍作为未设置时的回落值）。
   */
  preset: StreamSmoothingPreset
  /**
   * Adaptive logarithmic opacity fade: newly revealed characters start
   * translucent and settle to ink. Paint-only, default on.
   */
  logarithmicFade: boolean
  /** Values edited by the diagnostics panel. */
  debugTuning: StreamDebugTuning
}

/** Defaults shared by the client-side fallback and the settings scope. */
export const DEFAULT_STREAM_SETTINGS: StreamSettings = {
  enabled: true,
  thinkAutoExpand: true,
  debugEnabled: false,
  motionPreference: DEFAULT_MOTION_PREFERENCE,
  preset: 'balanced',
  logarithmicFade: DEFAULT_LOG_FADE,
  debugTuning: DEFAULT_STREAM_DEBUG_TUNING,
}
