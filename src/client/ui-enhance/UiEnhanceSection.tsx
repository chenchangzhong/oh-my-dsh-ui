/**
 * Unified "UI增强" settings section: tabbed container that embeds the three
 * sub-sections (appearance / motion / zh) under a single left-nav entry.
 *
 * Tab order: 外观 → 动效 → 增强
 * Default tab: 外观 (appearance)
 *
 * IMPORTANT (DSH host contract for `settings.section`):
 *   The inject may carry a `hooks` map. The host wraps every value under
 *   `hooks` and delivers it to the component as a TOP-LEVEL prop named
 *   `use<Key>` for hook/snapshot sources (e.g. `hooks.appearance` → prop
 *   `useAppearance`, `hooks.motion` → `useMotion`), and passes ScopeFace
 *   values (`settings` / `promptSettings`) through as top-level props of the
 *   same name. The host does NOT forward a `hooks` object itself — so this
 *   component must read `useAppearance` / `useMotion` / `settings` /
 *   `promptSettings` as top-level props, exactly like each sub-section
 *   expects them.
 */
import { useState, useMemo } from 'react'
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { AppearanceInjected } from '../appearance/controller.ts'
import type { MotionSectionInjected } from '../motion/MotionSection.tsx'
import type { ScopeFace } from '@deepseek-ai/dsh-client-ui-settings/client'
import type { ZhSettingsSection, ZhPromptSection } from '../zh/shared.ts'
import { AppearanceSection } from '../appearance/AppearanceSection.tsx'
import { MotionSection } from '../motion/MotionSection.tsx'
import { ZhSettingsSectionComponent } from '../zh/logic/settings-section.tsx'
import css from './UiEnhanceSection.module.css'

/** Union of all tab ids */
export type UiEnhanceTab = 'appearance' | 'motion' | 'zh'

/** All tab ids in display order */
export const UI_ENHANCE_TABS: UiEnhanceTab[] = ['appearance', 'motion', 'zh']

/** Locale key → tab id mapping */
export const TAB_LABELS: Record<UiEnhanceTab, string> = {
  appearance: 'nav',
  motion: 'nav',
  zh: 'nav',
} as const

// ─── Combined inject face ────────────────────────────────────────────────────
// `enabledTabs` and the action callbacks are plain (top-level) values. The host
// turns `hooks` into delivered component props: hook/snapshot sources become
// `use<Key>` (hooks.appearance → useAppearance, hooks.sessions → useSessions,
// hooks.motion → useMotion). The zh scopes (`settings`/`promptSettings`) are
// ScopeFace values delivered at the TOP LEVEL (NOT under `hooks`) — the host
// then passes them through as ScopeFace with getSnapshot()/subscribe()/set().
// (The original separate zh registration also passed them top-level; putting
// them under `hooks` would wrap them into callable hooks lacking getSnapshot().)
export interface UiEnhanceInjected {
  enabledTabs: readonly UiEnhanceTab[]
  /** Raw snapshot sources the host wraps into callable hooks. */
  hooks: {
    appearance: AppearanceInjected['hooks']['appearance']
    motion: MotionSectionInjected['hooks']['motion']
  }
  // ── zh scopes (ScopeFace, top-level) ─────────────────────────────────────
  settings: ScopeFace<ZhSettingsSection>
  promptSettings: ScopeFace<ZhPromptSection>
  // ── appearance actions ─────────────────────────────────────────────────────
  setField: (field: Parameters<AppearanceInjected['setField']>[0], value: Parameters<AppearanceInjected['setField']>[1]) => void
  applyFontPreset: (id: string) => void
  randomInspiration: () => void
  resetGroup: (group: Parameters<AppearanceInjected['resetGroup']>[0]) => void
  preview: () => void
  applyPreset: (id: string) => void
  saveMyPreset: (name: string) => void
  removeMyPreset: (id: string) => void
  applyMyPreset: (id: string) => void
  cancelPreview: () => void
  save: () => void
  resetAll: () => void
  // ── motion actions ─────────────────────────────────────────────────────────
  setMotionEnabled: (v: boolean) => void
  setMotionStyle: (v: Parameters<MotionSectionInjected['setMotionStyle']>[0]) => void
  setSidebarMotionEnabled: (v: boolean) => void
  setSidebarMotionStyle: (v: Parameters<MotionSectionInjected['setSidebarMotionStyle']>[0]) => void
  setSelectionMotionEnabled: (v: boolean) => void
  setNewChatMotionEnabled: (v: boolean) => void
  setNewChatMotionStyle: (v: Parameters<MotionSectionInjected['setNewChatMotionStyle']>[0]) => void
  setSettingsMotionEnabled: (v: boolean) => void
  applyMotionPreset: (presetId: string) => void
  // ── zh ────────────────────────────────────────────────────────────────────
  zhT: (key: string) => string
  // ── per-section translators (each bound to its OWN locale namespace) ────────
  // The host binds the section's `t` to UI_ENHANCE_NS only; the sub-sections
  // call keys from their own namespaces (APPEARANCE_NS / MOTION_NS),
  // so each must receive a translator bound to that namespace.
  appearanceT: (key: string) => string
  motionT: (key: string) => string
}

export type UiEnhanceSectionProps =
  PropsRuntime<'settings.section'>
  & PropsLocale<'ui-enhance'>
  & InjectFace<UiEnhanceInjected>

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Unified UI增强 settings section.
 * Renders a tab bar and delegates to the original section components.
 */
export function UiEnhanceSection(props: UiEnhanceSectionProps): React.ReactElement {
  const {
    t: uiEnhanceT,
    enabledTabs,
    useAppearance,
    useMotion,
    settings,
    promptSettings,
    setField,
    applyFontPreset,
    randomInspiration,
    resetGroup,
    preview,
    applyPreset,
    saveMyPreset,
    removeMyPreset,
    applyMyPreset,
    cancelPreview,
    save,
    resetAll,
    setMotionEnabled,
    setMotionStyle,
    setSidebarMotionEnabled,
    setSidebarMotionStyle,
    setSelectionMotionEnabled,
    setNewChatMotionEnabled,
    setNewChatMotionStyle,
    setSettingsMotionEnabled,
    applyMotionPreset,
    zhT,
    appearanceT,
    motionT,
    close,
  } = props

  // Derive the effective tab list from the inject's enabledTabs; fall back to
  // ['appearance'] so the section is never blank.
  const tabs: readonly UiEnhanceTab[] = enabledTabs.length > 0 ? enabledTabs : (['appearance'] as const)

  // Default to the first enabled tab; if the stored tab is not in enabledTabs
  // (e.g. it was disabled since the last visit), fall back to the first tab.
  const [activeTab, setActiveTab] = useState<UiEnhanceTab>(() =>
    tabs.includes('appearance') ? 'appearance' : tabs[0],
  )

  // Per-tab translators: appearanceT/motionT come from the inject,
  // each already bound to its own locale namespace. Tab-bar labels use the
  // section's own ui-enhance t.
  const tabLabels = useMemo(() => ({
    appearance: uiEnhanceT('tabAppearance') || '外观',
    motion: uiEnhanceT('tabMotion') || '动效',
    zh: uiEnhanceT('tabZh') || '增强',
  }), [uiEnhanceT])

  return (
    <div className={css.section}>
      {/* Tab bar — only render buttons for enabled tabs */}
      <div className={css.tabBar} role="tablist" aria-label="UI增强">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`ui-enhance-tab-${tab}`}
            data-active={activeTab === tab}
            className={css.tab}
            onClick={() => setActiveTab(tab)}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Tab panels — only render for tabs present in enabledTabs; only mount a
          panel when its required hook is non-null (defense-in-depth against a
          disabled feature whose store was never created). The host passes the
          wrapped hooks as top-level props (useAppearance / useMotion /
          settings / promptSettings), so we guard on those. */}
      <div className={css.panels}>
        {tabs.includes('appearance') && useAppearance != null && (
          <div
            id={`ui-enhance-tab-appearance`}
            role="tabpanel"
            aria-labelledby={`ui-enhance-tab-btn-appearance`}
            className={`${css.panel} ${activeTab !== 'appearance' ? css.panelHidden : ''}`}
          >
            <AppearanceSection
              t={appearanceT}
              useAppearance={useAppearance}
              setField={setField}
              applyFontPreset={applyFontPreset}
              randomInspiration={randomInspiration}
              resetGroup={resetGroup}
              preview={preview}
              applyPreset={applyPreset}
              saveMyPreset={saveMyPreset}
              removeMyPreset={removeMyPreset}
              applyMyPreset={applyMyPreset}
              cancelPreview={cancelPreview}
              save={save}
              resetAll={resetAll}
              close={close}
            />
          </div>
        )}

        {tabs.includes('motion') && useMotion != null && (
          <div
            id={`ui-enhance-tab-motion`}
            role="tabpanel"
            aria-labelledby={`ui-enhance-tab-btn-motion`}
            className={`${css.panel} ${activeTab !== 'motion' ? css.panelHidden : ''}`}
          >
            <MotionSection
              t={motionT}
              useMotion={useMotion}
              setMotionEnabled={setMotionEnabled}
              setMotionStyle={setMotionStyle}
              setSidebarMotionEnabled={setSidebarMotionEnabled}
              setSidebarMotionStyle={setSidebarMotionStyle}
              setSelectionMotionEnabled={setSelectionMotionEnabled}
              setNewChatMotionEnabled={setNewChatMotionEnabled}
              setNewChatMotionStyle={setNewChatMotionStyle}
              setSettingsMotionEnabled={setSettingsMotionEnabled}
              applyMotionPreset={applyMotionPreset}
            />
          </div>
        )}

        {tabs.includes('zh') && settings != null && promptSettings != null && (
          <div
            id={`ui-enhance-tab-zh`}
            role="tabpanel"
            aria-labelledby={`ui-enhance-tab-btn-zh`}
            className={`${css.panel} ${activeTab !== 'zh' ? css.panelHidden : ''}`}
          >
            <ZhSettingsSectionComponent t={zhT} settings={settings} promptSettings={promptSettings} />
          </div>
        )}
      </div>
    </div>
  )
}
