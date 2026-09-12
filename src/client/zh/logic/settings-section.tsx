/**
 * Settings section React component for the zh feature.
 *
 * Prompt injection (zhPrompt / zhAgentPrompt / zhToolDesc) has been removed;
 * zhAutoArchiveDays remains as the only prompt-scope field.
 */

import React from 'react'
import type { ScopeFace } from '@deepseek-ai/dsh-client-ui-settings/client'
import { ZH_SETTINGS_NS } from '../shared.ts'
import { SETTINGS_ZH, SETTINGS_EN } from '../data/settings-dicts.ts'
import type { ZhSettingsSection, ZhPromptSection, ServiceMonitorTarget } from '../shared.ts'
import { parseServiceAddress, isLoopbackServiceHost } from './service-monitor.ts'
import { publishMotionPreference, publishLogFade } from '../../smooth/settings.ts'

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

  // ── Service monitor card: the fold state persists in settings, while the
  //    add/edit drafts are local state (so typing never writes the scope). ──
  const [svcDraft, setSvcDraft] = React.useState({ name: '', addr: '' })
  const [svcError, setSvcError] = React.useState(false)
  const [svcEditDrafts, setSvcEditDrafts] = React.useState<Record<string, { name?: string; addr?: string }>>({})
  const [svcEditErrorIndex, setSvcEditErrorIndex] = React.useState<number | null>(null)

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
    zhComplete: true, statsFull: true,
    thinkingAuto: true, thinkMaxLines: 20, thinkMaxLinesFrom: 'latest' as const,
    thinkMode: 'button' as const, deleteSessionEnabled: true, archiveViewEnabled: true,
    renderUserMarkdown: false,
    batchOpsEnabled: true,
    serviceMonitorEnabled: false,
    serviceMonitorIntervalSec: 10,
    serviceMonitorTargets: [] as ServiceMonitorTarget[],
    serviceMonitorSettingsOpen: false,
  }

  // ── smooth（丝滑流式）字段 ──────────────────────────────────────────────────
  // smooth 的设置卡注册在 `settings.plugin.item`，而当前 DSH 的「插件」页并不会
  // 渲染插件的该项注册，所以它从来没有出现过。这里把 smooth 的设置并进「增强」
  // 标签——两者读写的是同一个 ui-custom 命名空间，直接走 scope 即可。
  const smoothScope = uiSnap as (ZhSettingsSection & {
    smoothEnabled?: boolean
    smoothThinkAutoExpand?: boolean
    smoothMotionPreference?: string
    smoothLogFadeEnabled?: boolean
  }) | undefined
  const smoothEnabled = smoothScope?.smoothEnabled !== false
  const smoothMotionPreference = smoothScope?.smoothMotionPreference ?? 'auto'
  const smoothLogFade = smoothScope?.smoothLogFadeEnabled !== false

  // ── Service monitor card handlers ──────────────────────────────────────────
  const svcTargets: ServiceMonitorTarget[] = ui.serviceMonitorTargets ?? []
  const setSvcTargets = (next: ServiceMonitorTarget[]): void => { settings.set('serviceMonitorTargets', next) }

  const addServiceTarget = (): void => {
    const parsed = parseServiceAddress(svcDraft.addr)
    // Only loopback addresses: the host probe supports loopback literals only
    // (anything else reports permanently offline).
    if (parsed === null || !isLoopbackServiceHost(parsed.host)) { setSvcError(true); return }
    setSvcError(false)
    setSvcTargets(svcTargets.concat([
      { name: svcDraft.name.trim().slice(0, 60), host: parsed.host, port: parsed.port },
    ]))
    setSvcDraft({ name: '', addr: '' })
  }

  const removeServiceTarget = (index: number): void => {
    const next = svcTargets.slice()
    next.splice(index, 1)
    setSvcTargets(next)
    const drafts = Object.assign({}, svcEditDrafts)
    delete drafts[String(index)]
    setSvcEditDrafts(drafts)
    if (svcEditErrorIndex === index) setSvcEditErrorIndex(null)
  }

  // Inline edit commit (Enter or blur): unchanged rows return early, missing
  // fields fall back to the stored value, and an invalid address keeps the
  // draft and marks that row red instead of writing.
  const commitServiceTarget = (index: number): void => {
    const draft = svcEditDrafts[String(index)]
    if (draft === undefined) return
    const stored = svcTargets[index]
    if (stored === null || stored === undefined) return
    const draftName = typeof draft.name === 'string' ? draft.name : stored.name
    const draftAddr = typeof draft.addr === 'string'
      ? draft.addr
      : stored.host + ':' + String(stored.port)
    const parsed = parseServiceAddress(draftAddr)
    if (parsed === null) { setSvcEditErrorIndex(index); return }
    // Loopback is required only when the address actually changed; renaming a
    // pre-existing non-loopback entry stays allowed (the host reports it offline).
    if ((parsed.host !== stored.host || parsed.port !== stored.port)
      && !isLoopbackServiceHost(parsed.host)) { setSvcEditErrorIndex(index); return }
    const next = svcTargets.slice()
    next.splice(index, 1, { name: draftName.trim().slice(0, 60), host: parsed.host, port: parsed.port })
    setSvcTargets(next)
    const drafts = Object.assign({}, svcEditDrafts)
    delete drafts[String(index)]
    setSvcEditDrafts(drafts)
    setSvcEditErrorIndex(null)
  }

  // ── Collapsible card styles (mirrors the official plugin settings card) ────
  const svcCardStyle = (open: boolean): React.CSSProperties => ({
    border: '1px solid var(--dsw-alias-border-l2, rgba(127,127,127,0.28))',
    borderRadius: 12,
    background: open
      ? 'var(--dsw-alias-bg-layer-2, rgba(127,127,127,0.06))'
      : 'var(--dsw-alias-bg-layer-3, transparent)',
    borderColor: open ? 'var(--dsw-alias-label-dimmed, rgba(127,127,127,0.45))' : undefined,
    transition: 'border-color .16s, background .16s',
  })
  const svcCardHeadStyle: React.CSSProperties = {
    width: '100%', appearance: 'none', border: 0, background: 'none',
    font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12,
  }
  const svcCardHeadTextStyle: React.CSSProperties = { flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }
  const svcCardNameStyle: React.CSSProperties = { fontSize: 15, fontWeight: 600, lineHeight: '1.4', color: 'var(--dsw-alias-label-primary, inherit)' }
  const svcCardDescStyle: React.CSSProperties = { fontSize: 13, lineHeight: 1.5, color: 'var(--dsw-alias-label-tertiary, #666)' }
  const svcCardBadgeStyle: React.CSSProperties = {
    flex: 'none', borderRadius: 999, padding: '1px 8px', fontSize: 11, lineHeight: '17px',
    fontWeight: 500, whiteSpace: 'nowrap',
    background: 'var(--dsw-alias-bg-module-platform, rgba(127,127,127,0.12))',
    color: 'var(--dsw-alias-label-secondary, inherit)',
  }
  const svcChevronStyle = (open: boolean): React.CSSProperties => ({
    flex: 'none', display: 'inline-flex', alignItems: 'center',
    color: 'var(--dsw-alias-label-tertiary, #666)',
    transition: 'transform .16s',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  })
  const svcCardBodyStyle: React.CSSProperties = {
    borderTop: '1px solid var(--dsw-alias-border-l2, rgba(127,127,127,0.28))',
    margin: '0 16px', padding: '4px 0 12px',
  }
  const svcTextNameStyle: React.CSSProperties = {
    flex: '0 1 120px', minWidth: 0, boxSizing: 'border-box',
    border: '1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.35))',
    background: 'var(--dsw-specific-input-minor, transparent)',
    color: 'var(--dsw-alias-label-primary, inherit)',
    fontSize: 13, lineHeight: '20px',
  }
  const svcTextAddrStyle: React.CSSProperties = Object.assign({}, svcTextNameStyle, { flex: '0 1 220px' })
  const svcGhostButtonStyle: React.CSSProperties = {
    flex: 'none', padding: '4px 12px', borderRadius: 8,
    border: '1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.35))',
    background: 'transparent', color: 'var(--dsw-alias-label-secondary, inherit)',
    cursor: 'pointer', font: 'inherit', fontSize: 13, lineHeight: '20px',
  }
  const svcAddButtonStyle: React.CSSProperties = {
    flex: 'none', padding: '4px 14px', borderRadius: 8, border: 0,
    background: 'var(--dsw-alias-state-business-primary, #4D6BFE)',
    color: 'var(--dsw-alias-label-primary-inverted, #fff)',
    cursor: 'pointer', font: 'inherit', fontSize: 13, lineHeight: '20px',
  }
  const svcErrorStyle: React.CSSProperties = {
    fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-state-error-primary, #d93026)',
  }

  const serviceMonitorCard = (): React.ReactElement => {
    const open = ui.serviceMonitorSettingsOpen === true
    return (
      <div key="serviceMonitorCard" style={svcCardStyle(open)}>
        <button
          type="button"
          aria-expanded={open}
          aria-label={t('serviceMonitor')}
          onClick={() => settings.set('serviceMonitorSettingsOpen', !open)}
          style={svcCardHeadStyle}
        >
          <span style={svcCardHeadTextStyle}>
            <span style={svcCardNameStyle}>{t('serviceMonitor')}</span>
            <span style={svcCardDescStyle}>{t('serviceMonitorCardDesc')}</span>
          </span>
          {svcTargets.length > 0
            ? <span style={svcCardBadgeStyle}>{String(svcTargets.length)}</span>
            : null}
          <span style={svcChevronStyle(open)} aria-hidden="true">
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
        {open
          ? (
            <div style={svcCardBodyStyle}>
              {row('serviceMonitor', t('serviceMonitor'), t('serviceMonitorDesc'),
                toggle(ui.serviceMonitorEnabled, () => settings.set('serviceMonitorEnabled', !ui.serviceMonitorEnabled), false, t('serviceMonitor')),
                true)}
              {row('serviceMonitorInterval', t('serviceMonitorInterval'), t('serviceMonitorIntervalDesc'),
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number" min={2} max={300} step={1}
                    value={ui.serviceMonitorIntervalSec}
                    style={s.inputNum}
                    aria-label={t('serviceMonitorInterval')}
                    onChange={(e) => {
                      const n = parseInt(e.target.value, 10)
                      if (!isNaN(n)) settings.set('serviceMonitorIntervalSec', Math.max(2, Math.min(300, Math.round(n))))
                    }}
                  />
                  <span style={s.desc}>{t('serviceMonitorIntervalUnit')}</span>
                </div>)}
              <div key="serviceTargets" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}>
                <div style={Object.assign({}, s.rowText, { flex: '0 0 auto' })}>
                  <div style={s.rowTitle}>{t('serviceTargetsLabel')}</div>
                  <div style={s.desc}>{t('serviceTargetsDesc')}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    value={svcDraft.name}
                    placeholder={t('serviceTargetNamePlaceholder')}
                    aria-label={t('serviceTargetNamePlaceholder')}
                    style={svcTextNameStyle}
                    onChange={(e) => { setSvcError(false); setSvcDraft({ name: e.target.value, addr: svcDraft.addr }) }}
                  />
                  <input
                    type="text"
                    value={svcDraft.addr}
                    placeholder={t('serviceTargetAddrPlaceholder')}
                    aria-label={t('serviceTargetAddrPlaceholder')}
                    style={svcTextAddrStyle}
                    onChange={(e) => { setSvcError(false); setSvcDraft({ name: svcDraft.name, addr: e.target.value }) }}
                    onKeyDown={(e) => { if (e.key === 'Enter') addServiceTarget() }}
                  />
                  <button type="button" onClick={() => addServiceTarget()} style={svcAddButtonStyle}>
                    {t('serviceTargetAdd')}
                  </button>
                </div>
                {svcError ? <div style={svcErrorStyle}>{t('serviceTargetInvalid')}</div> : null}
                {svcTargets.map((item, index) => {
                  const draft = svcEditDrafts[String(index)]
                  const nameValue = draft !== undefined && typeof draft.name === 'string' ? draft.name : item.name
                  const addrValue = draft !== undefined && typeof draft.addr === 'string'
                    ? draft.addr
                    : item.host + ':' + String(item.port)
                  const invalid = svcEditErrorIndex === index
                  const setDraftField = (field: 'name' | 'addr') => (e: React.ChangeEvent<HTMLInputElement>) => {
                    const base = { name: nameValue, addr: addrValue }
                    const nextDraft = Object.assign({}, base, { [field]: e.target.value })
                    const drafts = Object.assign({}, svcEditDrafts)
                    drafts[String(index)] = nextDraft
                    setSvcEditDrafts(drafts)
                    if (svcEditErrorIndex === index) setSvcEditErrorIndex(null)
                  }
                  return (
                    <div key={'svc-target-' + String(index)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="text"
                        value={nameValue}
                        placeholder={t('serviceTargetNamePlaceholder')}
                        aria-label={t('serviceTargetNamePlaceholder')}
                        style={svcTextNameStyle}
                        onChange={setDraftField('name')}
                        onKeyDown={(e) => { if (e.key === 'Enter') commitServiceTarget(index) }}
                        onBlur={() => commitServiceTarget(index)}
                      />
                      <input
                        type="text"
                        value={addrValue}
                        placeholder={t('serviceTargetAddrPlaceholder')}
                        aria-label={t('serviceTargetAddrPlaceholder')}
                        style={invalid
                          ? Object.assign({}, svcTextAddrStyle, { borderColor: 'var(--dsw-alias-state-error-primary, #d93026)' })
                          : svcTextAddrStyle}
                        onChange={setDraftField('addr')}
                        onKeyDown={(e) => { if (e.key === 'Enter') commitServiceTarget(index) }}
                        onBlur={() => commitServiceTarget(index)}
                      />
                      <button
                        type="button"
                        aria-label={t('serviceTargetRemove')}
                        onClick={() => removeServiceTarget(index)}
                        style={svcGhostButtonStyle}
                      >
                        {t('serviceTargetRemove')}
                      </button>
                    </div>
                  )
                })}
                {svcEditErrorIndex !== null ? <div style={svcErrorStyle}>{t('serviceTargetInvalid')}</div> : null}
              </div>
            </div>
          )
          : null}
      </div>
    )
  }

  return React.createElement('div', { style: s.section },
    // Title + intro
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
          toggle(ui.deleteSessionEnabled, () => settings.set('deleteSessionEnabled', !ui.deleteSessionEnabled))),
        row('batchOps', t('batchOps'), t('batchOpsDesc'),
          toggle(ui.batchOpsEnabled, () => settings.set('batchOpsEnabled', !ui.batchOpsEnabled))),
        row('renderUserMarkdown', t('renderUserMarkdown'), t('renderUserMarkdownDesc'),
          toggle(ui.renderUserMarkdown, () => settings.set('renderUserMarkdown', !ui.renderUserMarkdown)), true)
      ),

      // ── 丝滑流式（smooth）────────────────────────────────────────────────
      React.createElement('div', {
        key: 'smoothFeatures',
        style: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' },
      },
        React.createElement('div', { style: s.groupHeader }, t('smoothSection')),
        row('smoothEnabled', t('smoothEnabled'), t('smoothEnabledDesc'),
          toggle(smoothEnabled, () => settings.set('smoothEnabled', !smoothEnabled))),
        row('smoothLogFade', t('smoothLogFade'), t('smoothLogFadeDesc'),
          toggle(smoothLogFade, () => {
            settings.set('smoothLogFadeEnabled', !smoothLogFade)
            // 渲染器拿不到 scope，需要显式把新值推给它们。
            publishLogFade(!smoothLogFade)
          })),
        row('smoothMotionPreference', t('smoothMotionPreference'), t('smoothMotionPreferenceDesc'),
          selectInput(
            smoothMotionPreference,
            [
              ['auto', t('smoothMotionAuto')],
              ['force-smooth', t('smoothMotionForceSmooth')],
              ['force-reduced', t('smoothMotionForceReduced')],
            ],
            (v) => {
              settings.set('smoothMotionPreference', v)
              // 渲染器按消息行挂载、拿不到 scope，需要显式把新偏好推给它们。
              publishMotionPreference(v)
            },
            t('smoothMotionPreference'),
          ), true),
      ),

      // ── 服务监控卡片（复刻官方插件设置卡的收缩样式，位于设置页最下方）──
      serviceMonitorCard()
    )
  )
}
