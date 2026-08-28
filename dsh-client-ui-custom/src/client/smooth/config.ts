/**
 * Shared smooth feature configuration for dsh-client-ui-custom.
 *
 * Host schema validation lives in the host half (not present in this port);
 * the browser half falls back to these defaults when no composed config
 * is provided (client-only composition without a host entry).
 */

import type { StreamSmoothingPreset } from './useSmoothStreamContent.ts'

/** @deprecated Both values use the current adaptive reveal engine. */
export type StreamMode = 'typewriter' | 'teleprompter'

/** Plugin configuration validated by the Host schema and bridged to the browser half. */
export interface StreamConfig {
  /** @deprecated Both values use the current adaptive reveal engine. */
  readonly mode: StreamMode
  /** Smoothing preset for the reveal cadence. */
  readonly preset: StreamSmoothingPreset
  /**
   * Unused at runtime; kept so existing overlays load. Live reveal tracks
   * observed arrival and ignores this seed.
   */
  readonly revealCharsPerSec: number
  /**
   * Unused at runtime; kept so existing overlays load. Follow is a
   * smooth-damp, not a cruise speed.
   */
  readonly scrollSpeedPxPerSec: number
  /** Unused at runtime; retained so existing overlays continue to load. */
  readonly maxScrollSpeedPxPerSec: number
}

/** Defaults shared by the Host schema and the client-side fallback. */
export const DEFAULT_STREAM_CONFIG: StreamConfig = {
  mode: 'typewriter',
  preset: 'balanced',
  revealCharsPerSec: 80,
  scrollSpeedPxPerSec: 48,
  maxScrollSpeedPxPerSec: 1000,
}
