/**
 * Server-side constants adapted from deepseek-harness-zh_pro for ui-custom.
 *
 * Namespace key adaptation:
 *   - ZH_SETTINGS_NS ('dsh-zh') → UI_CUSTOM_SETTINGS_NS ('ui-custom')
 *   - PKG remains 'oh-my-dsh-ui' (client compatibility route /dsh-zh/api/* kept)
 *
 * The API route prefix /dsh-zh/api/* is preserved verbatim so that the web
 * client (deepseek-harness-zh_pro or any compatible caller) can reach the
 * trash/restore endpoints without changes.
 */

// Settings namespace key for ui-custom.
export const ZH_SETTINGS_NS = 'ui-custom'

// Auto-archive: when the new-session UI opens, sessions inactive for more than
// this many days are added to the official archive list (hidden from the list;
// log stays in place). Default 7 days; 0 = off.
export const ZH_AUTO_ARCHIVE_DAYS_DEFAULT = 7
