/**
 * Prompt store: binds the archive setting from ctx.settingsScope.
 *
 * Previously also hosted prompt injection fields; now only zhAutoArchiveDays.
 */
import type { ScopeFace } from '@deepseek-ai/dsh-client-settings/client'
import { ZH_PROMPT_DEFAULTS, type ZhPromptSection } from '../shared.ts'

/** Sentinel when scope is unavailable. */
export const PROMPT_SCOPE_PENDING = Object.freeze({
  status: 'unavailable' as const,
  value: undefined,
  base: undefined,
  user: undefined,
  revision: undefined,
  writable: false,
  mode: 'memory' as const,
})

function readScopeSnapshot(
  scope: ScopeFace<ZhPromptSection>,
): typeof PROMPT_SCOPE_PENDING {
  try {
    const snap = scope.getSnapshot()
    if (snap !== null && snap !== undefined) return snap
  } catch { /* fall through */ }
  return PROMPT_SCOPE_PENDING
}

/** Prompt binding: scope reference + current snapshot (useSyncExternalStore contract). */
export interface PromptBinding {
  scope: ScopeFace<ZhPromptSection>
  snapshot: typeof PROMPT_SCOPE_PENDING | ZhPromptSection
}



/** Build a prompt binding from a scope. */
export function makePromptBinding(
  scope: ScopeFace<ZhPromptSection>,
): PromptBinding {
  return {
    scope,
    snapshot: readScopeSnapshot(scope),
  }
}

export { ZH_PROMPT_DEFAULTS }
export type { ZhPromptSection }
