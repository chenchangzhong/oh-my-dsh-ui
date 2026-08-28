/**
 * User-owned settings for the smooth feature, persisted in dsh-client-ui-custom's
 * settings scope (ui-custom namespace).
 *
 * Settings are stored in the host's settingsScope under the ui-custom namespace.
 * The runtime-editable preferences live in the durable user-settings document
 * and take effect live, complementing the composition-time StreamConfig.
 */

/** Settings namespace used by the smooth feature within ui-custom. */
export const STREAM_SETTINGS_NS = 'smooth-stream'

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
  /**
   * Whether a finished turn folds its work process (thinking, tool calls,
   * context injection, intermediate replies) behind one "已处理" summary row,
   * leaving only the final answer visible. The summary row can always be
   * toggled by hand, and turns still expand live while they stream.
   */
  autoCollapse: boolean
  /** Whether the live renderer diagnostics panel is enabled. */
  debugEnabled: boolean
  /** Values edited by the diagnostics panel. */
  debugTuning: StreamDebugTuning
}

/** Defaults shared by the client-side fallback and the settings scope. */
export const DEFAULT_STREAM_SETTINGS: StreamSettings = {
  enabled: true,
  thinkAutoExpand: true,
  autoCollapse: true,
  debugEnabled: false,
  debugTuning: DEFAULT_STREAM_DEBUG_TUNING,
}
