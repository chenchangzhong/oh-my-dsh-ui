/**
 * Logging utilities for the server-side Node code.
 */
import { join } from 'node:path'
import { homedir } from 'node:os'

/** Package name used in log prefixes. */
export const PKG = 'oh-my-dsh-ui'

export function log(message: string): void {
  console.log(`[${PKG}] ${message}`)
}

export function warn(message: string): void {
  console.warn(`[${PKG}] ${message}`)
}

/** DSH home directory (same logic as deepseek-harness-zh_pro). */
export function dshHome(): string {
  return process.env.DSH_HOME ?? join(homedir(), '.dsh')
}

/** Current profile name parsed from --profile argv flag, default 'web'. */
export function argvProfile(): string {
  const argv = process.argv
  const flag = argv.indexOf('--profile')
  if (flag !== -1 && flag + 1 < argv.length && !argv[flag + 1].startsWith('-')) return argv[flag + 1]
  return 'web'
}

/** Absolute path to the current profile directory. */
export function localProfileDir(): string {
  return join(dshHome(), 'profiles', argvProfile())
}

/** Absolute path to the profile's package.json manifest. */
export function manifestPath(): string {
  return join(localProfileDir(), 'package.json')
}

/** Slugify a string for safe use in filenames. */
export function slug(text: string): string {
  return text.replace(/[^A-Za-z0-9_.-]/g, '-')
}
