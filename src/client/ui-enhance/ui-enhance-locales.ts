/** Locale dictionaries for the unified UI增强 settings section (tab bar + nav label). */

/** Dictionary namespace owned by the unified section. */
export const UI_ENHANCE_NS = 'ui-enhance'

/** All ui-enhance copy keys. */
export type UiEnhanceKey =
  | 'nav'
  | 'tabAppearance'
  | 'tabUsage'
  | 'tabMotion'
  | 'tabZh'

/** Simplified Chinese copy. */
export const zh: Record<UiEnhanceKey, string> = {
  nav: 'UI增强',
  tabAppearance: '外观',
  tabUsage: '用量',
  tabMotion: '动效',
  tabZh: '增强',
}

/** English copy. */
export const en: Record<UiEnhanceKey, string> = {
  nav: 'UI Enhancements',
  tabAppearance: 'Appearance',
  tabUsage: 'Usage',
  tabMotion: 'Motion',
  tabZh: 'Enhancements',
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The unified ui-enhance section copy. */
    'ui-enhance': UiEnhanceKey
  }
}
