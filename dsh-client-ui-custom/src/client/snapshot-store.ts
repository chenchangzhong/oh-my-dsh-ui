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
    // Immutable update: create a shallow copy before applying the updater,
    // so React's useSyncExternalStore detects a new reference and re-renders.
    update: (updater: (state: T) => void) => {
      const next = Object.assign({}, state)
      updater(next)
      state = next
      listeners.forEach((l) => l())
    },
    set: (newState: T) => {
      state = newState
      listeners.forEach((l) => l())
    },
  }
}
