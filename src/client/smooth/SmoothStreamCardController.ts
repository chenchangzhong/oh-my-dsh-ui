/**
 * Adapted SmoothStreamCardController that uses the host's settingsScope
 * instead of the source's loopback RPC channel.
 *
 * Source: /tmp/dsh-smooth-stream/src/client/smooth-stream-card-controller.ts
 * Adaptation: uses `ctx.settingsScope` under the ui-custom namespace.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { createSnapshotStore, type SnapshotStore } from '../snapshot-store.ts'
import {
  DEFAULT_STREAM_DEBUG_TUNING,
  DEFAULT_STREAM_SETTINGS,
  type StreamDebugTuning,
  type StreamSettings,
} from './settings.ts'

/** What the smooth settings card renders. */
export interface SmoothStreamCardState {
  status: 'loading' | 'ready' | 'unavailable'
  writable: boolean
  dirty: boolean
  saving: boolean
  failed: boolean
  enabled: boolean
  thinkAutoExpand: boolean
  debugEnabled: boolean
  debugTuning: StreamDebugTuning
  debugAvailable: boolean
  version: string | undefined
  installation: 'npm' | 'development' | 'unmanaged'
  canUpgrade: boolean
  upgrading: boolean
  upgradeFailed: boolean
  restartRequired: boolean
}

/** The registration-side face injected into the settings slot renderer. */
export interface SmoothStreamCardFace {
  hooks: {
    smoothStreamCard: SnapshotStore<SmoothStreamCardState>
  }
  edit: (patch: Partial<StreamSettings>) => void
  save: () => void
  discard: () => void
  reload: () => void
  upgrade: () => void
}

/** Bridge the host settingsScope onto a staged settings form. */
export class SmoothStreamCardController {
  private readonly store = createSnapshotStore<SmoothStreamCardState>(this.projection())
  private loadedBase: Pick<StreamSettings, 'enabled' | 'thinkAutoExpand'> | undefined
  private loadedDebug: Pick<StreamSettings, 'debugEnabled' | 'debugTuning'> | undefined
  private stagedBase: Pick<StreamSettings, 'enabled' | 'thinkAutoExpand'> | undefined
  private stagedDebug: Pick<StreamSettings, 'debugEnabled' | 'debugTuning'> | undefined
  private saving = false
  private failed = false
  private upgrading = false
  private upgradeFailed = false
  private restartRequired = false
  private loadStatus: 'loading' | 'ready' | 'unavailable' = 'loading'

  constructor(private readonly ctx: ClientContext) {}

  start(): void {
    void this.load()
  }

  stop(): void {
    this.loadStatus = 'loading'
    this.publish()
  }

  getSnapshot(): SmoothStreamCardState {
    return this.store.getSnapshot()
  }

  subscribe(listener: () => void): () => void {
    return this.store.subscribe(listener)
  }

  inject(): SmoothStreamCardFace {
    return {
      hooks: { smoothStreamCard: this.store },
      edit: (patch) => {
        if (this.saving) return
        if (patch.enabled !== undefined || patch.thinkAutoExpand !== undefined) {
          this.stagedBase = {
            ...this.baseValues(),
            ...(patch.enabled === undefined ? {} : { enabled: patch.enabled }),
            ...(patch.thinkAutoExpand === undefined ? {} : { thinkAutoExpand: patch.thinkAutoExpand }),
          }
        }
        if (patch.debugEnabled !== undefined || patch.debugTuning !== undefined) {
          this.stagedDebug = {
            ...this.debugValues(),
            ...(patch.debugEnabled === undefined ? {} : { debugEnabled: patch.debugEnabled }),
            ...(patch.debugTuning === undefined ? {} : { debugTuning: { ...this.debugValues().debugTuning, ...patch.debugTuning } }),
          }
        }
        this.failed = false
        this.publish()
      },
      save: () => { void this.save() },
      discard: () => {
        if (this.stagedBase === undefined && this.stagedDebug === undefined && !this.failed) return
        this.stagedBase = undefined
        this.stagedDebug = undefined
        this.failed = false
        this.publish()
      },
      reload: () => { void this.load() },
      upgrade: () => { void this.upgrade() },
    }
  }

  private projection(): SmoothStreamCardState {
    return {
      status: this.loadStatus,
      writable: true,
      dirty: this.stagedBase !== undefined || this.stagedDebug !== undefined,
      saving: this.saving,
      failed: this.failed,
      ...this.baseValues(),
      ...this.debugValues(),
      debugAvailable: true,
      version: undefined,
      installation: 'unmanaged',
      canUpgrade: false,
      upgrading: this.upgrading,
      upgradeFailed: this.upgradeFailed,
      restartRequired: this.restartRequired,
    }
  }

  private baseValues(): Pick<StreamSettings, 'enabled' | 'thinkAutoExpand'> {
    return this.stagedBase ?? this.loadedBase ?? {
      enabled: DEFAULT_STREAM_SETTINGS.enabled,
      thinkAutoExpand: DEFAULT_STREAM_SETTINGS.thinkAutoExpand,
    }
  }

  private debugValues(): Pick<StreamSettings, 'debugEnabled' | 'debugTuning'> {
    return this.stagedDebug ?? this.loadedDebug ?? {
      debugEnabled: DEFAULT_STREAM_SETTINGS.debugEnabled,
      debugTuning: DEFAULT_STREAM_DEBUG_TUNING,
    }
  }

  values(): StreamSettings {
    return { ...this.baseValues(), ...this.debugValues() }
  }

  private load(): void {
    this.loadStatus = 'loading'
    this.loadedBase = undefined
    this.loadedDebug = undefined
    this.publish()

    try {
      const scope = this.ctx.settingsScope
      if (scope) {
        const snapshot = scope.getSnapshot()
        if (snapshot.value !== undefined && typeof snapshot.value === 'object') {
          const obj = snapshot.value as Record<string, unknown>
          this.loadedBase = {
            enabled: typeof obj.smoothEnabled === 'boolean' ? obj.smoothEnabled : DEFAULT_STREAM_SETTINGS.enabled,
            thinkAutoExpand: typeof obj.smoothThinkAutoExpand === 'boolean' ? obj.smoothThinkAutoExpand : DEFAULT_STREAM_SETTINGS.thinkAutoExpand,
          }
          if (obj.smoothDebugEnabled !== undefined || obj.smoothDebugTuning !== undefined) {
            this.loadedDebug = {
              debugEnabled: typeof obj.smoothDebugEnabled === 'boolean' ? obj.smoothDebugEnabled : DEFAULT_STREAM_SETTINGS.debugEnabled,
              debugTuning: this.parseDebugTuning(obj.smoothDebugTuning),
            }
          }
          this.loadStatus = 'ready'
          this.publish()
          return
        }
      }
    } catch {
      // Scope not available
    }

    this.loadStatus = 'unavailable'
    this.publish()
  }

  private parseDebugTuning(raw: unknown): StreamDebugTuning {
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

  private save(): void {
    if ((this.stagedBase === undefined && this.stagedDebug === undefined) || this.saving) return
    this.saving = true
    this.failed = false
    this.publish()

    try {
      const scope = this.ctx.settingsScope
      if (scope) {
        if (this.stagedBase !== undefined) {
          if (this.stagedBase.enabled !== undefined) scope.set('smoothEnabled', this.stagedBase.enabled)
          if (this.stagedBase.thinkAutoExpand !== undefined) scope.set('smoothThinkAutoExpand', this.stagedBase.thinkAutoExpand)
        }
        if (this.stagedDebug !== undefined) {
          if (this.stagedDebug.debugEnabled !== undefined) scope.set('smoothDebugEnabled', this.stagedDebug.debugEnabled)
          if (this.stagedDebug.debugTuning !== undefined) scope.set('smoothDebugTuning', this.stagedDebug.debugTuning)
        }
        this.loadedBase = { ...this.baseValues() }
        this.loadedDebug = { ...this.debugValues() }
        this.stagedBase = undefined
        this.stagedDebug = undefined
      }
    } catch {
      this.failed = true
    }

    this.saving = false
    this.publish()
  }

  private upgrade(): void {
    // Upgrade not available in this port (no npm package)
    this.upgrading = true
    this.upgradeFailed = false
    this.restartRequired = false
    this.publish()
    this.upgradeFailed = true
    this.upgrading = false
    this.publish()
  }

  private publish(): void {
    this.store.set(this.projection())
  }
}
