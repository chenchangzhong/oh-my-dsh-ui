// @vitest-environment node
/**
 * Session-batch row-id resolution: the row-title fallback.
 *
 * Regression coverage for a dangling reference. `resolveBatchRowId` called
 * `matchSessionIdByTitle`, but the local rewrite of this module never defined
 * or imported it (upstream keeps it in `session-menu.ts`, which the local
 * build cannot import here without a module cycle). The call sat inside a
 * `try/catch`, so the resulting ReferenceError was swallowed: "fiber chain
 * first, unique-title match as fallback" quietly degraded to "fiber chain
 * only", and rows whose React fiber carries no `node.id` never got a batch
 * checkbox.
 *
 * The semantics the caller depends on, and that these tests pin down:
 *   - the matcher compares the snapshot's `displayTitle` — never the `byId`
 *     key — against the row's rendered title;
 *   - it resolves **only an unambiguous** match. Two sessions sharing a title
 *     return null rather than guessing, so the caller degrades to "no
 *     checkbox" instead of operating on the wrong session.
 */
import { describe, expect, it } from 'vitest'
import { matchSessionIdByTitle } from '../src/client/zh/logic/session-batch.ts'

/** A sessions-list snapshot shaped like `ctx.sessions.list.getSnapshot()`. */
function snapshot(byId: Record<string, unknown>): unknown {
  return { byId }
}

describe('matchSessionIdByTitle', () => {
  it('returns the session id for an unambiguous title', () => {
    expect(matchSessionIdByTitle('部署笔记', snapshot({
      'session-a': { displayTitle: '部署笔记' },
      'session-b': { displayTitle: '另一件事' },
    }))).toBe('session-a')
  })

  it('returns null when two sessions share the title (never guesses)', () => {
    expect(matchSessionIdByTitle('同名会话', snapshot({
      'session-a': { displayTitle: '同名会话' },
      'session-b': { displayTitle: '同名会话' },
    }))).toBe(null)
  })

  it('returns null when no session carries the title', () => {
    expect(matchSessionIdByTitle('不存在', snapshot({
      'session-a': { displayTitle: '部署笔记' },
    }))).toBe(null)
  })

  it('matches displayTitle, not the byId key', () => {
    expect(matchSessionIdByTitle('session-a', snapshot({
      'session-a': { displayTitle: '部署笔记' },
    }))).toBe(null)
  })

  it('is exact about the title (no trimming, no prefix match)', () => {
    expect(matchSessionIdByTitle(' 部署笔记 ', snapshot({
      'session-a': { displayTitle: '部署笔记' },
    }))).toBe(null)
    expect(matchSessionIdByTitle('部署', snapshot({
      'session-a': { displayTitle: '部署笔记' },
    }))).toBe(null)
  })

  it('skips non-object entries and non-string titles', () => {
    const byId: Record<string, unknown> = {
      'session-a': null,
      'session-b': { displayTitle: 42 },
      'session-c': { displayTitle: '部署笔记' },
    }
    expect(matchSessionIdByTitle('部署笔记', { byId })).toBe('session-c')
  })

  it('ignores a non-string title even when it is the only entry', () => {
    const byId: Record<string, unknown> = { 'session-a': { displayTitle: ['部署笔记'] } }
    expect(matchSessionIdByTitle('部署笔记', { byId })).toBe(null)
  })

  it('tolerates absent or malformed snapshots', () => {
    const malformed = [null, undefined, 'session-a', 42, {}, { byId: null }, { byId: 'x' }, { byId: 7 }]
    for (const bad of malformed) {
      expect(matchSessionIdByTitle('部署笔记', bad)).toBe(null)
    }
  })
})
