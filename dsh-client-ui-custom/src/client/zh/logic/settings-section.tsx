/**
 * Settings section React component for the zh feature.
 *
 * Prompt injection (zhPrompt / zhAgentPrompt / zhToolDesc) has been removed;
 * zhAutoArchiveDays remains as the only prompt-scope field.
 */

import React from 'react'
import type { ScopeFace } from '@deepseek-ai/dsh-client-settings/client'
import { ZH_SETTINGS_NS } from '../shared.ts'
import { SETTINGS_ZH, SETTINGS_EN } from '../data/settings-dicts.ts'
import type { ZhSettingsSection, ZhPromptSection } from '../shared.ts'

// ─── Styles (identical to source) ────────────────────────────────────────────
const s = {
  section: {
    display: 'flex' as const, flexDirection: 'column' as const, gap: '12px', maxWidth: '720px',
    color: 'var(--dsw-alias-label-primary, inherit)',
  },
  title: {
    margin: 0, fontSize: 18, lineHeight: '28px', fontWeight: 600,
    color: 'var(--dsw-alias-label-primary, inherit)',
  },
  intro: {
    margin: 0, fontSize: 14, lineHeight: '22px',
    color: 'var(--dsw-alias-label-tertiary, #666)',
  },
  rows: {
    listStyle: 'none' as const, margin: '8px 0 0', padding: 0,
    display: 'flex', flexDirection: 'column' as const,
  },
  row: {
    display: 'flex', alignItems: 'center', flexWrap: 'wrap' as const, gap: '10px',
    padding: '14px 0',
    borderBottom: '1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.28))',
  },
  rowText: {
    flex: '1 1 180px', minWidth: 0,
    display: 'flex', flexDirection: 'column' as const, gap: '2px',
  },
  rowTitle: {
    fontSize: 14, lineHeight: '22px', fontWeight: 500,
    color: 'var(--dsw-alias-label-primary, inherit)',
  },
  desc: {
    fontSize: 12, lineHeight: '18px',
    color: 'var(--dsw-alias-label-tertiary, #666)',
  },
  rowActions: {
    display: 'inline-flex', alignItems: 'center', gap: '6px', marginLeft: 'auto',
  },
  switchBtn: {
    display: 'inline-flex', flex: 'none', alignItems: 'center', justifyContent: 'center',
    width: 32, height: 20, padding: 0, border: 0, borderRadius: 0,
    background: 'transparent', cursor: 'pointer',
  },
  inputNum: {
    width: 72, padding: '4px 8px', borderRadius: 8,
    border: '1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.35))',
    background: 'var(--dsw-specific-input-minor, transparent)',
    color: 'var(--dsw-alias-label-primary, inherit)',
    fontSize: 14, lineHeight: '20px', textAlign: 'center' as const,
  },
  select: {
    flex: 'none', padding: '4px 8px', borderRadius: 8,
    border: '1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.35))',
    background: 'var(--dsw-specific-input-minor, transparent)',
    color: 'var(--dsw-alias-label-primary, inherit)',
    fontSize: 13, lineHeight: '20px',
  },
  groupHeader: {
    fontSize: 14, lineHeight: '22px', fontWeight: 600,
    color: 'var(--dsw-alias-label-primary, inherit)',
  },
  group: {
    display: 'flex', flexDirection: 'column' as const,
  },
}

function switchTrack(on: boolean): React.CSSProperties {
  return {
    position: 'relative' as const, display: 'inline-block', flex: 'none',
    width: 28, height: 16, borderRadius: 8,
    background: on
      ? 'var(--dsw-alias-state-business-primary, #4D6BFE)'
      : 'var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.45))',
    transition: 'background-color 120ms',
  }
}

function switchKnob(on: boolean): React.CSSProperties {
  return {
    position: 'absolute' as const, top: 2, left: 2, width: 12, height: 12, borderRadius: '50%',
    background: 'var(--dsw-alias-bg-layer-1, #ffffff)',
    transition: 'transform 120ms',
    transform: on ? 'translateX(12px)' : 'translateX(0px)',
  }
}

interface ZhSettingsSectionProps {
  t: (key: string) => string
  settings: ScopeFace<ZhSettingsSection>
  promptSettings: ScopeFace<ZhPromptSection>
}

/** Read a value from a scope snapshot, with a fallback. */
function getField<T>(snap: ZhSettingsSection | undefined, key: keyof ZhSettingsSection, fallback: T): T {
  if (snap === undefined) return fallback
  const v = snap[key]
  return (v === undefined || v === null) ? fallback : (v as T)
}

function getPromptField<T>(snap: ZhPromptSection | undefined, key: keyof ZhPromptSection, fallback: T): T {
  if (snap === undefined) return fallback
  const v = snap[key]
  return (v === undefined || v === null) ? fallback : (v as T)
}

/**
 * Unwrap a settingsScope snapshot: getSnapshot() returns a
 * `{ status, value, user }` wrapper (the host reads snapshot.value too),
 * never the raw section. Return undefined until the scope is ready and its
 * value is an object — matching the source's "scope not ready = controls
 * disabled" behavior.
 */
function scopeValue<T>(snap: unknown): T | undefined {
  if (snap === null || snap === undefined) return undefined
  const s = snap as { status?: unknown; value?: unknown }
  if (s.status !== 'ready' || s.value === null || typeof s.value !== 'object') return undefined
  return s.value as T
}

export function ZhSettingsSectionComponent(props: ZhSettingsSectionProps): React.ReactElement {
  const { t, settings, promptSettings } = props

  // Subscribe to both scopes.
  const [uiSnap, setUiSnap] = React.useState<ZhSettingsSection | undefined>(() => {
    try { return scopeValue<ZhSettingsSection>(settings.getSnapshot()) } catch { return undefined }
  })
  const [promptSnap, setPromptSnap] = React.useState<ZhPromptSection | undefined>(() => {
    try { return scopeValue<ZhPromptSection>(promptSettings.getSnapshot()) } catch { return undefined }
  })

  React.useEffect(() => {
    const unsubUi = settings.subscribe(() => {
      try { setUiSnap(scopeValue<ZhSettingsSection>(settings.getSnapshot())) } catch { /* ignore */ }
    })
    const unsubPrompt = promptSettings.subscribe(() => {
      try { setPromptSnap(scopeValue<ZhPromptSection>(promptSettings.getSnapshot())) } catch { /* ignore */ }
    })
    return () => { unsubUi(); unsubPrompt() }
  }, [settings, promptSettings])

  const row = (key: string, title: string, desc: string, control: React.ReactNode, noDivider = false): React.ReactElement => (
    React.createElement('div', { key, style: Object.assign({}, s.row, noDivider ? { borderBottom: 'none' } : {}) },
      React.createElement('div', { style: s.rowText },
        React.createElement('div', { style: s.rowTitle }, title),
        React.createElement('div', { style: s.desc }, desc)),
      React.createElement('div', { style: s.rowActions }, control))
  )

  const group = (key: string, ...items: React.ReactElement[]): React.ReactElement =>
    React.createElement('div', { key, style: s.group }, ...items)

  const toggle = (
    on: boolean,
    onChange: () => void,
    disabled = false,
    label = '',
  ): React.ReactElement => {
    const disabledStyle = disabled ? { opacity: 0.45, cursor: 'not-allowed' } : {}
    return React.createElement('button', {
      type: 'button' as const, 'aria-label': label, 'aria-pressed': on,
      disabled: disabled === true, onClick: onChange,
      style: Object.assign({}, s.switchBtn, disabledStyle),
    },
      React.createElement('span', { style: switchTrack(on) },
        React.createElement('span', { style: switchKnob(on) })))
  }

  const numInput = (
    value: number, min: number, max: number, step: number,
    onChange: (n: number) => void, label: string, unit?: string,
  ): React.ReactElement => (
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
      React.createElement('input', {
        type: 'number', min, max, step, value,
        style: s.inputNum,
        'aria-label': label,
        onChange: (e) => {
          const n = parseInt(e.target.value, 10)
          if (!isNaN(n)) onChange(Math.max(min, Math.min(max, Math.round(n))))
        },
      }),
      unit ? React.createElement('span', { style: s.desc }, unit) : null)
  )

  const selectInput = (
    value: string, options: Array<[string, string]>, onChange: (v: string) => void, label: string,
  ): React.ReactElement => (
    React.createElement('select', {
      value,
      'aria-label': label,
      style: s.select,
      onChange: (e) => onChange(e.target.value),
    },
      options.map(([k, v]) => React.createElement('option', { key: k, value: k }, v)))
  )

  const ui = uiSnap ?? {
    zhComplete: true, statsFull: true, chatWidthEnabled: true, chatWidth: 90,
    thinkingAuto: true, thinkMaxLines: 20, thinkMaxLinesFrom: 'latest' as const,
    thinkMode: 'button' as const, deleteSessionEnabled: true, archiveViewEnabled: true,
    renderUserMarkdown: false,
  }

  return React.createElement('div', { style: s.section },
    // Title + intro
    React.createElement('h3', { style: s.title }, t('nav')),
    React.createElement('p', { style: s.intro }, t('sectionIntro')),

    React.createElement('div', { style: s.rows },
      // ── 中文补全 ──
      row('zhComplete', t('zhComplete'), t('zhCompleteDesc'),
        toggle(ui.zhComplete, () => settings.set('zhComplete', !ui.zhComplete))),

      // ── 统计全显示 ──
      row('statsFull', t('statsFull'), t('statsFullDesc'),
        toggle(ui.statsFull, () => settings.set('statsFull', !ui.statsFull))),

      // ── 思考展开分组 ──
      group('thinkingGroup',
        row('thinkingAuto', t('thinkingAuto'), t('thinkingAutoDesc'),
          toggle(ui.thinkingAuto, () => settings.set('thinkingAuto', !ui.thinkingAuto)), true),
        row('thinkMaxLines', t('thinkMaxLines'), t('thinkMaxLinesDesc'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
            numInput(ui.thinkMaxLines, 0, 200, 1,
              (n) => settings.set('thinkMaxLines', n), t('thinkMaxLines'), t('thinkMaxLinesUnit')),
            selectInput(
              ui.thinkMaxLinesFrom,
              [['latest', t('thinkMaxLinesFromLatest')], ['earliest', t('thinkMaxLinesFromEarliest')]],
              (v) => settings.set('thinkMaxLinesFrom', v), t('thinkMaxLinesFrom')),
          ), true),
        row('thinkMode', t('thinkMode'), t('thinkModeDesc'),
          selectInput(
            ui.thinkMode,
            [['button', t('thinkModeButton')], ['scroll', t('thinkModeScroll')]],
            (v) => settings.set('thinkMode', v), t('thinkMode'),
          ))),

      // ── 对话宽度 ──
      row('chatWidth', t('chatWidth'), t('chatWidthDesc'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
          toggle(ui.chatWidthEnabled, () => settings.set('chatWidthEnabled', !ui.chatWidthEnabled)),
          ui.chatWidthEnabled
            ? numInput(ui.chatWidth, 50, 100, 5,
                (n) => settings.set('chatWidth', n), t('chatWidthPercent'), '%')
            : null)),

      // ── 归档分组 ──
      group('archiveGroup',
        row('autoArchive', t('autoArchive'), t('autoArchiveDesc'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
            numInput(
              getPromptField(promptSnap, 'zhAutoArchiveDays', 7),
              0, 365, 1,
              (n) => { void promptSettings.set('zhAutoArchiveDays', n) },
              t('autoArchive'), t('autoArchiveUnit'),
            )
          ), true),
        row('archiveView', t('archiveView'), t('archiveViewDesc'),
          toggle(ui.archiveViewEnabled, () => settings.set('archiveViewEnabled', !ui.archiveViewEnabled)))),

      // ── 其他功能 ──
      React.createElement('div', {
        key: 'otherFeatures',
        style: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' },
      },
        React.createElement('div', { style: s.groupHeader }, t('otherFeatures')),
        row('deleteSession', t('deleteSession'), t('deleteSessionDesc'),
          toggle(ui.deleteSessionEnabled, () => settings.set('deleteSessionEnabled', !ui.deleteSessionEnabled)), true),
        row('renderUserMarkdown', t('renderUserMarkdown'), t('renderUserMarkdownDesc'),
          toggle(ui.renderUserMarkdown, () => settings.set('renderUserMarkdown', !ui.renderUserMarkdown)))
      )
    )
  )
}
