/**
 * Shared constants for the zh (Chinese enhancement) feature.
 * Namespace identifiers and TypeScript types for settings schema.
 */

/** Settings namespace for UI enhancement preferences (local to browser). */
export const ZH_SETTINGS_NS = 'dsh-zh-settings'

/** Archive locale namespace. */
export const ZH_ARCHIVE_NS = 'dsh-zh-archive'

/** zh feature id (for feature whitelist). */
export const ZH_FEATURE = 'zh' as const

/** One user-defined monitored service (host probes it over TCP). */
export interface ServiceMonitorTarget {
  name: string
  host: string
  port: number
}

/**
 * Settings section schema (mirrors what host registers in src/index.ts).
 * These fields are stored in the 'dsh-zh-settings' settings namespace.
 */
export interface ZhSettingsSection {
  zhComplete: boolean
  chatWidthEnabled: boolean
  chatWidth: number
  thinkingAuto: boolean
  thinkMaxLines: number
  thinkMaxLinesFrom: 'latest' | 'earliest'
  thinkMode: 'button' | 'scroll'
  deleteSessionEnabled: boolean
  archiveViewEnabled: boolean
  renderUserMarkdown: boolean
  batchOpsEnabled: boolean
  serviceMonitorEnabled: boolean
  serviceMonitorIntervalSec: number
  serviceMonitorTargets: ServiceMonitorTarget[]
  serviceMonitorSettingsOpen: boolean
}

/**
 * Archive settings read from the single ui-custom section.
 * Only zhAutoArchiveDays remains after prompt/locale removal.
 */
export interface ZhPromptSection {
  zhAutoArchiveDays: number
}

/** Default values for the UI settings store (before scope resolves). */
export const ZH_SETTINGS_DEFAULTS: ZhSettingsSection = {
  zhComplete: true,
  chatWidthEnabled: true,
  chatWidth: 90,
  thinkingAuto: true,
  thinkMaxLines: 20,
  thinkMaxLinesFrom: 'latest',
  thinkMode: 'button',
  deleteSessionEnabled: true,
  archiveViewEnabled: true,
  renderUserMarkdown: false,
  batchOpsEnabled: true,
  serviceMonitorEnabled: false,
  serviceMonitorIntervalSec: 10,
  serviceMonitorTargets: [],
  serviceMonitorSettingsOpen: false,
}

/** Default values for the archive settings. */
export const ZH_PROMPT_DEFAULTS: ZhPromptSection = {
  zhAutoArchiveDays: 7,
}
