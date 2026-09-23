/**
 * zh feature — Chinese UI enhancement: browser half.
 *
 * Ported from deepseek-harness-zh_pro/src/lib/client/ to dsh-client-ui-custom/src/client/zh/.
 *
 * Feature summary:
 *   - Chinese UI completion (locale hooks for zh-dict + terms)
 *   - Thinking auto-expand + default line clamp
 *   - Full-width stats line
 *   - Chat column width control
 *   - Prompt injection into system prompt / first user message
 *   - Auto-archive old sessions
 *   - Archived session view (pure DOM)
 *   - Session delete button
 *
 * Host dependencies:
 *   - Runtime settings read from the host's 'ui-custom' settings namespace
 *     (single-plugin contract; UiCustomSection extends ZhSection).
 *   - Locale dictionaries registered under 'dsh-zh-settings' NS.
 *   - API routes:
 *       POST /dsh-zh/api/session.unarchive
 *       POST /dsh-zh/api/session.delete
 *     (These must be provided by the host — see migration report H4/H5;
 *      in the integrated host they degrade gracefully when absent.)
 *   - ctx.inject: slots, locale, sessions, workspaces, settingsScope
 *     (all declared in the host's inject list — always available)
 *
 * Entry: applyZh(ctx) — called by the host's apply() after importing this module.
 * The host's src/client/index.ts imports it as:
 *   import { applyZh } from './zh/index.ts'
 * and mounts it inside registerFeatures under enabled('zh').
 */
import type { ClientContext } from '../dsh-client-types.ts'
import { applyZh } from './logic/apply.ts'

export { applyZh }
export type { ZhApplyContext, ApplyZhOptions } from './logic/apply.ts'

/**
 * Convenience apply for standalone use (matches the Cordis plugin factory signature).
 * In the ui-custom host, prefer calling applyZh(ctx) directly from the host's apply().
 */
export default function factory(ctx: ClientContext): void {
  ctx.effect(() => applyZh(ctx), 'zh: feature apply teardown')
}
