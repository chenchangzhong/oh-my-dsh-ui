/**
 * Keyed chat renderer shadowing `conversation.chat.node` for `user` and
 * `steering` cells (priority -1 beats ui-conversation's default renderer).
 * Reads the ui-custom settings scope's `renderUserMarkdown`: on, the bubble
 * text renders through MarkdownText; off, it falls back to the plain-text
 * bubble with /name @name reference chips — visually identical to stock.
 *
 * Self-contained on purpose: the platform purity gate forbids importing
 * another plugin's internals, so the bubble geometry, image gallery wiring,
 * reference chips and the copy/clock actions row are replicated here from
 * ui-conversation's MessageItem (only platform atoms are imported).
 */

import { Component, memo, useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import type { InjectFace, PropsLocale, PropsRuntime, TranslateNS } from '@deepseek-ai/dsh-client-ui-slots'
import {
  JsonBlock, MarkdownText, Tooltip, writeClipboard,
  IconCheckOutlineRegular, IconCopyOutlineRegular,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type { SettingsScope } from '../dsh-client-types.ts'
import type { UserMessageNode } from '../dsh-client-types.ts'
import type { UiCustomSection } from '../../shared.ts'
import css from './MarkdownRender.module.css'

// Type-only: pulls the merged slot/locale maps (the `conversation.chat.node`
// keyed slot and the `conversation` locale namespace) from the platform
// package — erased before bundling, so the purity gate never sees it.
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'

/** Local plain-text primitive — 0.1.7 removed primitives' MessageText, so the
 * two-line wrapper (pre-wrap + break-word, metrics inherited from the bubble)
 * is replicated here with the file's own CSS module. */
function MessageText({ text }: { text: string }): ReactNode {
  return <div className={css.plainText}>{text}</div>
}

type UserImage = Extract<UserMessageNode['content'][number], { type: 'image' }>

/** Registration-side face: the ui-custom scope behind the toggle. */
export interface MarkdownRenderInjected {
  hooks: {
    mdRender: SettingsScope<UiCustomSection>
  }
}

/** Full props of the shadowed user/steering renderer. */
export type UserMarkdownNodeProps =
  PropsRuntime<'conversation.chat.node', 'user' | 'steering'>
  & PropsLocale<'conversation'>
  & InjectFace<MarkdownRenderInjected>

/** Split a user node's content into text / images / remaining blocks. */
function contentParts(content: readonly unknown[]): {
  text: string
  images: { attachment: UserImage['attachment'] }[]
  rest: unknown[]
} {
  const texts: string[] = []
  const images: { attachment: UserImage['attachment'] }[] = []
  const rest: unknown[] = []
  for (const block of content) {
    const b = block as { type?: string; text?: string; attachment?: unknown }
    if (b.type === 'text' && typeof b.text === 'string') texts.push(b.text)
    else if (b.type === 'image' && b.attachment !== undefined) {
      images.push({ attachment: (b as UserImage).attachment })
    }
    else rest.push(block)
  }
  return { text: texts.join(''), images, rest }
}

/**
 * Markdown chrome labels for the host MarkdownText. The host renderer reads
 * `labels.code.copyLabel` / `labels.code.copiedLabel` / `labels.footnotes`
 * without optional chaining (primitives v0.1.2 renderCode), so a missing or
 * malformed `labels` throws on any fenced code block — the keys below resolve
 * through the shared common namespace.
 */
function markdownLabels(t: TranslateNS<'conversation'>): ComponentProps<typeof MarkdownText>['labels'] {
  return {
    code: { copyLabel: t('copy'), copiedLabel: t('copied') },
    footnotes: t('markdown.footnotes'),
  }
}

const pad2 = (n: number): string => String(n).padStart(2, '0')

/** Same-day clock `HH:MM`, otherwise `M/D HH:MM` / `Y/M/D HH:MM`. */
function formatClock(time: number, t: TranslateNS<'conversation'>, now: number = Date.now()): string {
  const d = new Date(time)
  const n = new Date(now)
  const clock = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
  if (d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate()) {
    return clock
  }
  const params = { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() }
  const md = d.getFullYear() === n.getFullYear() ? t('clock.md', params) : t('clock.ymd', params)
  return `${md} ${clock}`
}

/** Plain-text projection with /name @name reference chips (stock look). */
function projectUserText(text: string): ReactNode {
  const re = /(^|\s)([/@][\w-]+)(?=\s|$)/g
  const parts: ReactNode[] = []
  let cursor = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    const tokenStart = m.index + (m[1]?.length ?? 0)
    const label = m[2] ?? ''
    if (tokenStart > cursor) parts.push(<MessageText key={cursor} text={text.slice(cursor, tokenStart)} />)
    parts.push(
      <span key={tokenStart} className={css.refChip} data-ref-chip={label.startsWith('@') ? 'subagent' : 'skill'}>
        {label}
      </span>,
    )
    cursor = tokenStart + label.length
  }
  if (parts.length === 0) return <MessageText text={text} />
  if (cursor < text.length) parts.push(<MessageText key={cursor} text={text.slice(cursor)} />)
  return <>{parts}</>
}

/** Copy + clock actions row (user bubble chrome). */
function UserBubbleActions({ text, time, t }: {
  text: string
  time?: number | undefined
  t: TranslateNS<'conversation'>
}) {
  const [copied, setCopied] = useState(false)
  const onCopy = (): void => {
    void writeClipboard(text).then((ok) => {
      if (!ok) return
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1000)
    })
  }
  return (
    <div className={css.actions}>
      {time !== undefined ? <span className={css.timeStart}>{formatClock(time, t)}</span> : null}
      <Tooltip label={copied ? t('copied') : t('copy')} side="bottom">
        <button type="button" className={css.action} aria-label={copied ? t('copied') : t('copy')} onClick={onCopy}>
          {copied ? <IconCheckOutlineRegular size={16} /> : <IconCopyOutlineRegular size={16} />}
        </button>
      </Tooltip>
    </div>
  )
}

/** 0.1.7 image dispatch: the platform passes the owner-bound
 * `renderMessageImages` helper (backed by the attachment plugin's
 * `conversation.message.images` slot and the outlet's loadImage) through the
 * standard kit — image blocks render through it exactly like stock. */
type RenderMessageImages = (owner: {
  images: readonly { attachment: UserImage['attachment'] }[]
  align?: 'start' | 'end'
  compact?: boolean
}) => ReactNode

/** Right-aligned bubble shared by user and steering rows. */
function UserStyleBubble({ content, renderMessage, renderMarkdown, t, actions }: {
  content: readonly unknown[]
  /** Platform-provided image renderer (stock UserMessageNodeView props share). */
  renderMessage: RenderMessageImages | undefined
  /** Whether the text renders through MarkdownText (else plain + chips). */
  renderMarkdown: boolean
  t: TranslateNS<'conversation'>
  actions?: (text: string) => ReactNode
}): ReactNode {
  const { text, images, rest } = contentParts(content)
  const truncated = (total: number): string => t('json.truncated', { total })
  const showBubble = text !== '' || rest.length > 0
  return (
    <div className={css.userRow} data-time-hover-root>
      <div className={css.userStack}>
        {typeof renderMessage === 'function' ? (
          images.length > 0 ? renderMessage({ images, align: 'end', compact: images.length > 1 }) : null
        ) : images.length > 0 ? (
          <div className={css.bubble} style={{ opacity: 0.6, fontSize: 12 }}>{t('image.label')}: {images.length}</div>
        ) : null}
        {showBubble && (
          <div className={css.bubble}>
            {renderMarkdown ? <MarkdownText text={text} labels={markdownLabels(t)} /> : projectUserText(text)}
            {rest.map((block, i) => (
              <JsonBlock key={i} label={t('message.extraBlock')} payload={block} truncatedLabel={truncated} />
            ))}
          </div>
        )}
      </div>
      {actions?.(text)}
    </div>
  )
}

class MarkdownRowErrorBoundary extends Component<{ children: ReactNode; renderMessage?: RenderMessageImages | undefined }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) { return { error } }
  componentDidCatch(error: Error, info: unknown) {
    const stack = (info as { componentStack?: string })?.componentStack ?? ''
    // Serialize fully so minified #130's undefined component is visible
    console.error('[oh-my] UserMarkdownNodeView render failed:', {
      message: error?.message ?? String(error),
      name: (error as { name?: string })?.name,
      stack: error?.stack,
      componentStack: stack,
      // Extra: which platform atoms are available at render time
      hasMarkdownText: typeof MarkdownText !== 'undefined',
      hasJsonBlock: typeof JsonBlock !== 'undefined',
      hasTooltip: typeof Tooltip !== 'undefined',
      hasRenderMessageImages: typeof (this.props.renderMessage) === 'function',
    }, info)
  }
  render() {
    if (this.state.error !== null) return null
    return this.props.children as ReactNode
  }
}

// Inner component that always calls the hook - only rendered when hook exists
const UserMarkdownNodeViewInner = memo(function UserMarkdownNodeViewInner({
  node, renderMessageImages, t, useMdRender,
}: UserMarkdownNodeProps) {
  const md = useMdRender((value) => value)
  const renderMarkdown = (md as { value?: { renderUserMarkdown?: boolean } })?.value?.renderUserMarkdown ?? false
  const data = (node as { data?: { content?: unknown; time?: number } })?.data ?? {}
  const content = Array.isArray((data as { content?: unknown }).content) ? (data as { content: unknown[] }).content : []
  const time = typeof (data as { time?: unknown }).time === 'number' ? (data as { time: number }).time : undefined
  const safeRender = (typeof renderMessageImages === 'function' ? renderMessageImages : undefined) as RenderMessageImages | undefined
  const safeT = (typeof t === 'function' ? t : ((k: string) => k)) as typeof t
  return (
    <UserStyleBubble
      content={content}
      renderMessage={safeRender}
      renderMarkdown={renderMarkdown}
      t={safeT}
      actions={(text) => <UserBubbleActions text={text} time={time} t={safeT} />}
    />
  )
})

/** User and admitted-steering keyed Chat renderer (shadow, priority -1). */
export const UserMarkdownNodeView = memo(function UserMarkdownNodeView(props: UserMarkdownNodeProps) {
  const useMdRender = (props as unknown as { useMdRender?: unknown }).useMdRender
  // Historical refresh may deliver props without injected hook - avoid conditional hook call
  if (typeof useMdRender !== 'function') {
    const { node, renderMessageImages, t } = props as UserMarkdownNodeProps & Record<string, unknown>
    const data = (node as { data?: { content?: unknown; time?: number } })?.data ?? {}
    const content = Array.isArray((data as { content?: unknown }).content) ? (data as { content: unknown[] }).content : []
    const time = typeof (data as { time?: unknown }).time === 'number' ? (data as { time: number }).time : undefined
    const safeRender = (typeof renderMessageImages === 'function' ? renderMessageImages : undefined) as RenderMessageImages | undefined
    const safeT = (typeof t === 'function' ? t : ((k: string) => k)) as unknown as typeof t
    return (
      <MarkdownRowErrorBoundary renderMessage={safeRender}>
        <UserStyleBubble
          content={content}
          renderMessage={safeRender}
          renderMarkdown={false}
          t={safeT}
          actions={(text) => <UserBubbleActions text={text} time={time} t={safeT} />}
        />
      </MarkdownRowErrorBoundary>
    )
  }
  const renderMessageImages = (props as unknown as { renderMessageImages?: unknown }).renderMessageImages
  const safeRender = (typeof renderMessageImages === 'function' ? renderMessageImages : undefined) as RenderMessageImages | undefined
  return (
    <MarkdownRowErrorBoundary renderMessage={safeRender}>
      <UserMarkdownNodeViewInner {...props} />
    </MarkdownRowErrorBoundary>
  )
})
