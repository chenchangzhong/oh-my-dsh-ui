/**
 * zh feature apply entry: registers all subsystems.
 *
 * Registration order (same semantics as deepseek-harness-zh_pro):
 *   1. registerSettingsSection   — settings.section slot + locale dicts
 *   2. bindScopes                — bind settingsScope for UI settings + prompt
 *   3. installAutoArchive         — auto-archive old sessions
 *   4. installChineseEnhance      — locale hooks + DOM effects
 *   5. installSessionMenu        — delete session menu item
 *   6. installArchiveView        — archived session DOM view
 *
 * All subsystems are wrapped in ctx.effect() so they are tied to the Fiber
 * lifecycle and automatically cleaned up on unmount.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { ScopeFace } from '@deepseek-ai/dsh-client-ui-settings/client'
import type { UiCustomSection } from '../../../shared.ts'
import { UI_CUSTOM_SETTINGS_NS } from '../../../shared.ts'
import {
  ZH_SETTINGS_DEFAULTS,
  ZH_PROMPT_DEFAULTS,
  type ZhSettingsSection,
  type ZhPromptSection,
} from '../shared.ts'
import { registerSettingsSection } from './register-section.ts'
import { SETTINGS_ZH, SETTINGS_EN } from '../data/settings-dicts.ts'
import { ZH_SETTINGS_NS } from '../shared.ts'
import { installAutoArchive } from './auto-archive.ts'
import { installChineseEnhance } from './dom-enhance.ts'
import { installSessionMenu, readSessionIdFromRow } from './session-menu.ts'
import { installSessionBatch } from './session-batch.ts'
import { installArchiveView } from './archive-view.ts'
import { installServiceMonitor } from './service-monitor.ts'
import { settingsStore } from '../store/settings-store.ts'

export interface ZhApplyContext {
  ctx: ClientContext
  settingsScope: ScopeFace<ZhSettingsSection>
  promptScope: ScopeFace<ZhPromptSection>
}

export interface ApplyZhOptions {
  /** Skip registering the settings.section slot (used when consolidating into ui-enhance). */
  skipSection?: boolean
}

export function applyZh(ctx: ClientContext, opts?: ApplyZhOptions): () => void {
  // Single-plugin contract: the zh feature reads its fields from the SAME
  // `ui-custom` settings namespace the host registers (UiCustomSection extends
  // ZhSection), so no second settings namespace is created. The scope shape is
  // ZhSection; unknown theme/motion fields are ignored by the zh reads.
  // After prompt/locale removal only zhAutoArchiveDays remains on promptScope,
  // still bound to the same namespace.
  const settingsScope = ctx.settingsScope.bind<ZhSettingsSection>({
    namespace: UI_CUSTOM_SETTINGS_NS,
  }) as unknown as ScopeFace<ZhSettingsSection>
  const promptScope = ctx.settingsScope.bind<ZhPromptSection>({
    namespace: UI_CUSTOM_SETTINGS_NS,
  }) as unknown as ScopeFace<ZhPromptSection>

  const zhCtx: ZhApplyContext = { ctx, settingsScope, promptScope }

  // Bridge the zh UI settings into the local settingsStore so the DOM-level
  // features (中文补全 gate, session menu, archive view) read the same values
  // the settings section writes. Without this bind the store stays on its
  // defaults forever.
  settingsStore.bind(settingsScope)

  // 1. Settings section + locale dictionaries.
  // When skipSection is set (ui-enhance consolidation), register locale directly
  // so ZhSettingsSectionComponent's ctx.locale.bind(ZH_SETTINGS_NS) has something to bind.
  const disposeEffects: Array<() => void> = []
  const localeReg = ctx.locale.register(ZH_SETTINGS_NS, {
    zh: SETTINGS_ZH,
    en: SETTINGS_EN,
  })
  disposeEffects.push(() => { try { localeReg() } catch { /* ignore */ } })
  if (!opts?.skipSection) {
    const disposeSection = registerSettingsSection(zhCtx)
    disposeEffects.push(disposeSection)
  }
  const disposeRegister = () => { for (const d of disposeEffects) { try { d() } catch { /* ignore */ } } }

  // 2. Auto-archive (watches sessions.list + promptScope for zhAutoArchiveDays).
  const disposeAutoArchive = installAutoArchive(zhCtx)

  // 3. Chinese enhance: locale hooks + DOM observation ( MutationObserver ).
  const disposeChineseEnhance = installChineseEnhance(zhCtx)

  // 4. Session menu: inject "Delete session" into the session row menu.
  const disposeSessionMenu = installSessionMenu(zhCtx)

  // 5. Session batch: row-leading checkboxes + multi-select state. The menu
  //    additions and the bulk execution itself live in session-menu.ts.
  const disposeSessionBatch = installSessionBatch(ctx, readSessionIdFromRow)

  // 6. Archive view: pure-DOM archived session list injected into the session browser.
  const disposeArchiveView = installArchiveView(zhCtx)

  // 7. Service monitor: side-panel list of local services that started listening
  //    during this session (polls the host's /dsh-zh/api/service-monitor route).
  const disposeServiceMonitor = installServiceMonitor(ctx)

  // Return a single teardown that reverses the full registration.
  return function () {
    disposeRegister()
    disposeAutoArchive()
    disposeChineseEnhance()
    disposeSessionMenu()
    disposeSessionBatch()
    disposeArchiveView()
    disposeServiceMonitor()
  }
}
