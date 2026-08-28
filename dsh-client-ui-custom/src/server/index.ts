/**
 * Server-side installers entry point.
 * Host-side prompt injection and model-locale have been removed.
 * Remaining capability: session-delete routes.
 */
import type { HostContext } from './types.js'
import { installSessionDeleteRoute, type DeleteDeps } from './session-delete.js'
import { log } from './util.js'

export type { TrashEntry } from './session-delete.js'
export { sessionTrash } from './session-delete.js'
export { deleteSession, restoreSession, unarchiveSession } from './session-delete.js'

function resolveSessionDeleteDeps(ctx: HostContext): DeleteDeps {
  const sessions = ctx.get('sessions')
  const agents = ctx.get('agents')
  const persistence = ctx.get('sessionPersistence')
  const registry = ctx.get('workspaceRegistry')
  const storage = ctx.get('storageDomain')
  return {
    sessions: sessions === undefined || sessions === null ? undefined : sessions as DeleteDeps['sessions'],
    agents: agents === undefined || agents === null ? undefined : agents as DeleteDeps['agents'],
    sessionPersistence: persistence === undefined || persistence === null ? undefined : persistence as DeleteDeps['sessionPersistence'],
    workspaceRegistry: registry === undefined || registry === null ? undefined : registry as DeleteDeps['workspaceRegistry'],
    storageDomain: storage === undefined || storage === null ? undefined : storage as DeleteDeps['storageDomain'],
  }
}

/**
 * Install remaining Node-side capabilities:
 *   - Session delete/restore HTTP routes (webServer, /dsh-zh/api/*)
 */
export function installAll(ctx: HostContext): void {
  installSessionDeleteRoute(ctx, () => resolveSessionDeleteDeps(ctx))
  log('Node-side 功能已就绪')
}
