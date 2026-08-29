/**
 * Simple snapshot store implementation.
 * Replaces the import from @deepseek-ai/dsh-client-runtime which is not
 * available via require() in the DSH browser plugin context.
 */
export interface SnapshotStore<T> {
  getSnapshot: () => T
  subscribe: (listener: () => void) => () => void
  update: (updater: (state: T) => void) => void
  set: (state: T) => void
}

export function createSnapshotStore<T>(initialState: T): SnapshotStore<T> {
  let state = initialState
  const listeners = new Set<() => void>()

  return {
    getSnapshot: () => state,
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    update: (updater: (state: T) => void) => {
      updater(state)
      listeners.forEach((l) => l())
    },
    set: (newState: T) => {
      state = newState
      listeners.forEach((l) => l())
    },
  }
}
