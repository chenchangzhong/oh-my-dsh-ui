/**
 * Minimal HostContext type for the server-side Node code.
 * Mirrors the HostContext interface from deepseek-harness-zh_pro, adapted for
 * the single-namespace ui-custom plugin.
 */
export type MaybePromise<T> = T | Promise<T>
export type Disposer = () => MaybePromise<void>

export interface LoaderEntryLike {
  options?: {
    id?: string
    name?: string
  }
  fiber?: {
    dispose?: Disposer
  }
}

export interface LoaderLike {
  entries(): Iterable<LoaderEntryLike>
  create(options: { id: string; name: string }): Promise<unknown>
  remove(id: string): Promise<unknown>
}

export interface PluginHandleLike {
  await(): Promise<unknown>
  dispose(): Promise<unknown>
}

/** DSH/Cordis dynamic service interface — minimal shape this plugin uses. */
export interface HostContext {
  fiber?: {
    entry?: LoaderEntryLike
  }
  loader: LoaderLike
  get(name: string): unknown
  effect(setup: () => unknown, label?: string): unknown
  on(name: string, handler: (...args: unknown[]) => unknown): unknown
  off(name: string, handler: (...args: unknown[]) => unknown): unknown
  plugin(plugin: unknown, config: Record<string, unknown>): PluginHandleLike
}
