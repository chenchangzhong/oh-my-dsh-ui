/**
 * Logging utilities for the server-side Node code.
 */

/** Package name used in log prefixes. */
export const PKG = 'oh-my-dsh-ui'

export function log(message: string): void {
  console.log(`[${PKG}] ${message}`)
}

export function warn(message: string): void {
  console.warn(`[${PKG}] ${message}`)
}
