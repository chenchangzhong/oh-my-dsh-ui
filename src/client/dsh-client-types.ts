/**
 * Type shims for the @deepseek-ai types the client code imports as types only.
 *
 * 0.1.7 removed the `dsh-client-runtime` package; every runtime import here is
 * erased at build, so these aliases only keep TypeScript honest:
 *   - ClientContext: @deepseek-ai/cordis Context (the settings base re-exports
 *     `Context` under this very name, see dsh-client-locale types).
 *   - SettingsScope / SettingsScopeSnapshot: dsh-client-ui-settings' ConfigForm /
 *     ConfigFormSnapshot (same field and method contract this plugin's
 *     bindSettingsScope consumes).
 *   - SessionListState: dsh-api-session-controller's wire session list state.
 *   - UserMessageNode: dsh-client-ui-conversation's message record.
 */
export type { Context as ClientContext } from '@deepseek-ai/cordis'
export type { ConfigForm as SettingsScope, ConfigFormSnapshot as SettingsScopeSnapshot } from '@deepseek-ai/dsh-client-ui-settings/client'
export type { SessionListState } from '@deepseek-ai/dsh-api-session-controller/client'
export type { UserMessageNode } from '@deepseek-ai/dsh-client-ui-conversation/client'
