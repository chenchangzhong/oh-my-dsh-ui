/**
 * Settings store: bridges the zh feature's UI settings to ctx.settingsScope.
 *
 * Source (deepseek-harness-zh_pro) used localStorage with a fixed key:
 *   SETTINGS_KEY = 'deepseek-harness-zh_pro:enhancements'
 *
 * Target: uses ctx.settingsScope.bind({ namespace: 'dsh-zh-settings' })
 * which mirrors the host's registered settings namespace.
 *
 * The store maintains the same getSnapshot()/subscribe()/set() interface
 * so that settings-section.ts and dom-enhance.ts require minimal changes.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { ScopeFace } from '@deepseek-ai/dsh-client-ui-settings/client'
import {
  ZH_SETTINGS_NS,
  ZH_SETTINGS_DEFAULTS,
  type ZhSettingsSection,
} from '../shared.ts'

/** Snapshottable settings face (mirrors useSyncExternalStore contract). */
export interface SettingsSnapshot extends ZhSettingsSection {}

/** Sentinel value when the scope is not yet available. */
const SCOPE_PENDING = Object.freeze({
  zhComplete: ZH_SETTINGS_DEFAULTS.zhComplete,
  statsFull: ZH_SETTINGS_DEFAULTS.statsFull,
  chatWidthEnabled: ZH_SETTINGS_DEFAULTS.chatWidthEnabled,
  chatWidth: ZH_SETTINGS_DEFAULTS.chatWidth,
  thinkingAuto: ZH_SETTINGS_DEFAULTS.thinkingAuto,
  thinkMaxLines: ZH_SETTINGS_DEFAULTS.thinkMaxLines,
  thinkMaxLinesFrom: ZH_SETTINGS_DEFAULTS.thinkMaxLinesFrom,
  thinkMode: ZH_SETTINGS_DEFAULTS.thinkMode,
  deleteSessionEnabled: ZH_SETTINGS_DEFAULTS.deleteSessionEnabled,
  archiveViewEnabled: ZH_SETTINGS_DEFAULTS.archiveViewEnabled,
  renderUserMarkdown: ZH_SETTINGS_DEFAULTS.renderUserMarkdown,
})

/** Clamp a numeric setting within [min, max]. */
function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(n)))
}

/**
 * Normalize a snapshot from the scope into the exact shape we use.
 * The scope's getSnapshot() returns a `{ status, value, user }` wrapper
 * (the same shape the host reads as snapshot.value), so the section fields
 * live under `.value`; a wrapper whose status is not 'ready' yields defaults.
 */
function normalize(raw: unknown): SettingsSnapshot {
  const wrapped = typeof raw === 'object' && raw !== null ? raw as { status?: unknown; value?: unknown } : undefined
  const ready = wrapped !== undefined
    && wrapped.status === 'ready'
    && wrapped.value !== null
    && typeof wrapped.value === 'object'
  const snap = ready ? wrapped!.value as Partial<ZhSettingsSection> : {}
  return {
    zhComplete: snap.zhComplete !== false,
    statsFull: snap.statsFull !== false,
    chatWidthEnabled: snap.chatWidthEnabled !== false,
    chatWidth: clamp(snap.chatWidth ?? ZH_SETTINGS_DEFAULTS.chatWidth, 50, 100),
    thinkingAuto: snap.thinkingAuto !== false,
    thinkMaxLines: clamp(snap.thinkMaxLines ?? ZH_SETTINGS_DEFAULTS.thinkMaxLines, 0, 200),
    thinkMaxLinesFrom:
      snap.thinkMaxLinesFrom === 'earliest' ? 'earliest' : ZH_SETTINGS_DEFAULTS.thinkMaxLinesFrom,
    thinkMode:
      snap.thinkMode === 'scroll' ? 'scroll' : ZH_SETTINGS_DEFAULTS.thinkMode,
    deleteSessionEnabled: snap.deleteSessionEnabled !== false,
    archiveViewEnabled: snap.archiveViewEnabled !== false,
    renderUserMarkdown: snap.renderUserMarkdown === true,
  }
}

/** The shared settings store for the zh feature. */
class SettingsStore {
  private _scope: ScopeFace<ZhSettingsSection> | null = null
  private _snapshot: SettingsSnapshot = SCOPE_PENDING
  private _listeners: Array<() => void> = []

  /** Bind to a settingsScope (called once from apply). */
  bind(scope: ScopeFace<ZhSettingsSection>): void {
    if (this._scope === scope) return
    if (this._scope) {
      // We only support one scope — rebinding resets.
      this._scope = null
      this._snapshot = SCOPE_PENDING
    }
    this._scope = scope
    const tryRead = (): void => {
      if (this._scope === null) return
      try {
        const raw = this._scope.getSnapshot()
        if (raw !== null && raw !== undefined) {
          this._snapshot = normalize(raw)
        }
      } catch {
        // Snapshot read failure — keep previous state.
      }
    }
    tryRead()
    if (this._scope && typeof this._scope.subscribe === 'function') {
      this._scope.subscribe(() => {
        tryRead()
        this._notify()
      })
    }
  }

  getSnapshot(): SettingsSnapshot {
    return this._snapshot
  }

  subscribe(listener: () => void): () => void {
    this._listeners.push(listener)
    return () => {
      const i = this._listeners.indexOf(listener)
      if (i !== -1) this._listeners.splice(i, 1)
    }
  }

  set(field: keyof ZhSettingsSection, value: unknown): void {
    if (this._scope === null) return
    let normalized: unknown = value
    if (field === 'chatWidth') normalized = clamp(Number(value), 50, 100)
    else if (field === 'thinkMaxLines') normalized = clamp(Number(value), 0, 200)
    else if (field === 'zhComplete' || field === 'statsFull' || field === 'thinkingAuto' || field === 'deleteSessionEnabled' || field === 'archiveViewEnabled' || field === 'chatWidthEnabled' || field === 'renderUserMarkdown')
      normalized = Boolean(value)
    else if (field === 'thinkMaxLinesFrom') normalized = value === 'earliest' ? 'earliest' : 'latest'
    else if (field === 'thinkMode') normalized = value === 'scroll' ? 'scroll' : 'button'
    // Update local snapshot optimistically
    const next = Object.assign({}, this._snapshot)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(next as any)[field] = normalized
    this._snapshot = next
    this._notify()
    void this._scope.set(field as string, normalized)
  }

  private _notify(): void {
    for (const listener of this._listeners.slice()) listener()
  }
}

export const settingsStore = new SettingsStore()
