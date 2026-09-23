/**
 * Settings section registration for the zh feature.
 *
 * Adapts deepseek-harness-zh_pro's register.ts to the dsh-client-ui-custom
 * ctx.slots.inject / ctx.locale.register pattern.
 *
 * Host dependency: ctx.slots.inject('settings.section') must be available.
 * This is declared in the host's inject list, so it is always available.
 */
import type React from 'react'
import type { ClientContext } from '../../dsh-client-types.ts'
import { ZH_SETTINGS_NS } from '../shared.ts'
import { SETTINGS_ZH, SETTINGS_EN } from '../data/settings-dicts.ts'
import { settingsLocales } from '../locales/zh-locales.ts'
import type { ZhApplyContext } from './apply.ts'
import { ZhSettingsSectionComponent } from './settings-section.tsx'

export function registerSettingsSection(zhCtx: ZhApplyContext): () => void {
  const { ctx } = zhCtx
  const disposeEffects: Array<() => void> = []

  // Register locale dictionaries for the settings namespace.
  // Using ctx.effect so the registration is cleaned up when the feature unmounts.
  const localeReg = ctx.locale.register(ZH_SETTINGS_NS, {
    zh: SETTINGS_ZH,
    en: SETTINGS_EN,
  })
  disposeEffects.push(() => {
    try { localeReg() } catch { /* ignore */ }
  })

  // Register the settings.section slot.
  // The t() function reads from the bound locale NS.
  const t = ctx.locale.bind(ZH_SETTINGS_NS)

  const slotDispose = ctx.slots.inject('settings.section', () =>
    ctx.slots.register({
      name: 'settings.section',
      id: 'zh-enhance',
      order: 50,
      label: () => t('nav'),
      locale: ZH_SETTINGS_NS,
      // Inject the settings scope so the section can use it directly.
      inject: (): object => ({
        settings: zhCtx.settingsScope,
        promptSettings: zhCtx.promptScope,
      }),
    }, ZhSettingsSectionComponent),
  )

  disposeEffects.push(slotDispose)

  return function () {
    for (const d of disposeEffects) {
      try { d() } catch { /* ignore */ }
    }
  }
}
