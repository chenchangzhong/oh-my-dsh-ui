// Cross-platform "move to system Trash" and "restore from Trash" utilities.
// Ported verbatim from deepseek-harness-zh_pro/src/lib/trash.ts.
//
// Target: move a session log directory into the OS trash (Windows Recycle Bin /
// macOS .Trash / Linux XDG Trash) so files can be restored from the system
// trash while DSH no longer treats the directory as a session log.
//
// Platform implementation:
//   - win32: PowerShell Microsoft.VisualBasic.FileIO.FileSystem.DeleteDirectory
//   - darwin: move into ~/.Trash/ (Finder-visible; name collision → timestamp suffix)
//   - linux: freedesktop XDG Trash spec — files go to $XDG_DATA_HOME/Trash/files/
//     with a matching .trashinfo metadata file; cross-volume via copy+delete.
//
// Restore:
//   - win32: enumerate Shell.Namespace(0xa) to find the deleted directory by
//     original parent+name, then move it back.
//   - darwin: move ~/.Trash/<name> back to original path.
//   - linux: read .trashinfo to locate the file and move it back.

import { execFile } from 'node:child_process'
import { access, cp, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import { homedir, platform, tmpdir } from 'node:os'

function psSingleQuote(value: string): string {
  return `'${value.replaceAll("'", "''")}'`
}

function runPowerShellTrash(path: string): Promise<void> {
  const quoted = psSingleQuote(path)
  const command = `Add-Type -AssemblyName Microsoft.VisualBasic; ` +
    `[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory(${quoted}, 'OnlyErrorDialogs', 'SendToRecycleBin')`
  return new Promise((resolve, reject) => {
    const child = execFile(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', command],
      { windowsHide: true, maxBuffer: 4 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          const detail = String(stderr || stdout || error.message).trim()
          reject(new Error(`PowerShell 回收站失败: ${detail || error.message}`))
          return
        }
        resolve()
      },
    )
    child.on('spawn', () => { child.stdout?.resume(); child.stderr?.resume() })
  })
}

async function trashWin32(path: string): Promise<string> {
  await runPowerShellTrash(path)
  return path
}

async function restoreWin32(originalPath: string): Promise<void> {
  const quotedParent = psSingleQuote(dirname(originalPath))
  const quotedName = psSingleQuote(basename(originalPath))
  const script = [
    `$Target = ${psSingleQuote(originalPath)}`,
    `$Parent = ${quotedParent}`,
    `$Name = ${quotedName}`,
    '$shell = New-Object -ComObject Shell.Application',
    '$bin = $shell.Namespace(0xA)',
    'foreach ($item in $bin.Items()) {',
    '  $from = $item.ExtendedProperty(\'System.Recycle.DeletedFrom\')',
    '  if ($from -ne $Parent) { continue }',
    '  if ($item.Name -ne $Name) { continue }',
    '  $physical = $item.Path',
    '  if ($physical) {',
    '    if (Test-Path -LiteralPath $Target) { Remove-Item -LiteralPath $Target -Recurse -Force }',
    '    if (-not (Test-Path -LiteralPath $Parent)) { New-Item -ItemType Directory -Path $Parent -Force | Out-Null }',
    '    Move-Item -LiteralPath $physical -Destination $Parent -Force',
    '    $moved = Join-Path $Parent $Name',
    '    $landed = Join-Path $Parent (Split-Path -Leaf $physical)',
    '    if ($landed -ne $moved -and (Test-Path -LiteralPath $landed)) { Move-Item -LiteralPath $landed -Destination $moved -Force }',
    '    Write-Output "RESTORED:$Target"',
    '    exit 0',
    '  }',
    '}',
    'Write-Output "NOT-FOUND:$Target"',
    'exit 1',
  ].join('\n')
  await new Promise<void>((resolve, reject) => {
    const child = execFile(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script],
      { windowsHide: true, maxBuffer: 4 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          const detail = String(stdout || stderr || error.message).trim()
          reject(new Error(`Windows 回收站恢复失败: ${detail || error.message}`))
          return
        }
        resolve()
      },
    )
    child.on('spawn', () => { child.stdout?.resume(); child.stderr?.resume() })
  })
}

const TRASH_DIR_DARWIN = join(homedir(), '.Trash')

async function trashDarwin(path: string): Promise<string> {
  const name = basename(path)
  let target = join(TRASH_DIR_DARWIN, name)
  if (await exists(target)) {
    target = join(TRASH_DIR_DARWIN, `${name}-${Date.now()}`)
  }
  await rename(path, target)
  return target
}

async function restoreDarwin(location: string, originalPath: string): Promise<void> {
  await mkdir(dirname(originalPath), { recursive: true })
  if (await exists(location)) {
    await rename(location, originalPath)
    return
  }
  await mkdir(originalPath, { recursive: true })
}

function xdgTrashDir(): string {
  const dataHome = process.env.XDG_DATA_HOME
  return dataHome !== undefined && dataHome !== ''
    ? join(dataHome, 'Trash')
    : join(homedir(), '.local', 'share', 'Trash')
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function trashXdg(path: string): Promise<string> {
  const trash = xdgTrashDir()
  const filesDir = join(trash, 'files')
  const infoDir = join(trash, 'info')
  await mkdir(filesDir, { recursive: true })
  await mkdir(infoDir, { recursive: true })
  const name = basename(path)
  let targetName = name
  let suffix = 1
  while (
    await exists(join(filesDir, targetName)) ||
    await exists(join(infoDir, `${targetName}.trashinfo`))
  ) {
    suffix += 1
    targetName = `${name}.${suffix}`
  }
  try {
    await rename(path, join(filesDir, targetName))
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code !== 'EXDEV') throw error
    await cp(path, join(filesDir, targetName), { recursive: true })
    await rm(path, { recursive: true, force: true })
  }
  const deletedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
  const info = `[Trash Info]\nPath=${escapeTrashPath(path)}\nDeletionDate=${deletedAt}\n`
  await writeFile(join(infoDir, `${targetName}.trashinfo`), info, 'utf8')
  return join(filesDir, targetName)
}

function escapeTrashPath(path: string): string {
  return path.split('/').map(segment => encodeURIComponent(segment)).join('/')
}

function unescapeTrashPath(escaped: string): string {
  return escaped.split('/').map(segment => decodeURIComponent(segment)).join('/')
}

async function restoreXdg(location: string, originalPath: string): Promise<void> {
  let resolved: string | null = null
  const infoDir = join(xdgTrashDir(), 'info')
  try {
    const entries = await readdir(infoDir)
    for (const entry of entries) {
      if (!entry.endsWith('.trashinfo')) continue
      const content = await readFile(join(infoDir, entry), 'utf8')
      const match = /^Path=(.+)$/m.exec(content)
      if (match === null) continue
      if (unescapeTrashPath(match[1]) === originalPath) {
        resolved = join(xdgTrashDir(), 'files', entry.slice(0, -'.trashinfo'.length))
        await rm(join(infoDir, entry), { force: true })
        break
      }
    }
  } catch {
    resolved = null
  }
  const source = resolved ?? location
  await mkdir(dirname(originalPath), { recursive: true })
  if (await exists(source)) {
    await rename(source, originalPath)
    return
  }
  await mkdir(originalPath, { recursive: true })
}

export async function trashItem(path: string): Promise<{ ok: true; location: string }> {
  const current = platform()
  const location = current === 'win32'
    ? await trashWin32(path)
    : current === 'darwin'
      ? await trashDarwin(path)
      : await trashXdg(path)
  return { ok: true, location }
}

export async function restoreItem(location: string, originalPath: string): Promise<void> {
  const current = platform()
  if (current === 'win32') await restoreWin32(originalPath)
  else if (current === 'darwin') await restoreDarwin(location, originalPath)
  else await restoreXdg(location, originalPath)
}

export { tmpdir as _tmpdir }
