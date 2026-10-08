import { memo, useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type ComponentProps, type ReactNode, type RefObject } from 'react'
import { JsonBlock, MarkdownText } from '@deepseek-ai/dsh-client-ui-primitives'
import { ImageGallery, type ImageLoader, type MessageImageLabels } from '@deepseek-ai/dsh-client-ui-attachment'
import type { ChatNodeViewProps, TurnTailOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import { AnimatedDisclosure } from './AnimatedDisclosure.tsx'
import { IconThink } from './harnessIcons.ts'
import { notifyFollowCommit } from './teleprompterGlide.ts'
import { useSmoothStreamContent, type StreamSmoothingPreset } from './useSmoothStreamContent.ts'
import { useFpsGuard } from './useFpsGuard.ts'
import { useLogarithmicFade } from './useLogarithmicFade.ts'
import { useDecoupledMarkdown } from './useDecoupledMarkdown.ts'
import { FollowHost } from './FollowHost.tsx'
import { isReasoningDraining, setReasoningDraining, subscribeReasoningDraining } from './reasoningGate.ts'
import { DEFAULT_STREAM_CONFIG, type StreamMode } from './config.ts'
import { DEFAULT_STREAM_SETTINGS, type StreamMotionPreference } from './settings.ts'
import css from './TypewriterAssistantNodeView.module.css'

type AssistantProps = ChatNodeViewProps<'assistant-step'>
type MarkdownProps = Pick<ComponentProps<typeof MarkdownText>, 'labels' | 'fileMentions' | 'text'>

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
  )
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia === undefined) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/**
 * Resolve whether the reveal engine should stay off for this view. The OS
 * preference wins only in `auto` mode: `force-smooth` keeps the engine on
 * machines where a system-wide reduce-motion switch (or a forced browser
 * flag) would otherwise silently bypass smoothing, and `force-reduced`
 * disables it even when the OS asks for motion. Credit: three-state design
 * proposed by @Zn-Dk in #21/#22.
 */
function useMotionReduced(preference: StreamMotionPreference): boolean {
  const system = usePrefersReducedMotion()
  if (preference === 'force-smooth') return false
  if (preference === 'force-reduced') return true
  return system
}

interface AnimatedMarkdownTextProps extends MarkdownProps {
  streaming: boolean
  logarithmicFade: boolean
  /** Whether the resolved reduced-motion gate keeps the reveal engine off. */
  motionReduced: boolean
  followSpeedCpsRef?: { current: number } | undefined
  followRevealedCharsRef?: { current: number } | undefined
  followRevealScaleRef?: { current: number } | undefined
  onPredictiveChange?: ((predictive: boolean) => void) | undefined
  /** Reports whether the final text arm still has visible reveal work. */
  onRevealActivityChange?: ((active: boolean) => void) | undefined
  preset: StreamSmoothingPreset
  shouldHoldBack: () => boolean
}

/** Conservative fallback before the streaming Markdown tail has geometry. */
const PREDICTIVE_WRAP_FALLBACK_CHARS = 32
const STREAM_ANNOUNCEMENT_INTERVAL_MS = 800
const STREAM_ANNOUNCEMENT_MAX_CHARS = 320

interface PendingTextGeometry {
  root: HTMLElement
  visibleText: string
  fontSize: number
  wrapThresholdWidth: number | null
}

function approximateInlineWidth(text: string, emPx: number): number {
  let width = 0
  for (const char of text) {
    if (/\s/u.test(char)) width += emPx * 0.33
    else if (/^[\x00-\x7f]$/u.test(char)) width += emPx * 0.56
    else width += emPx
  }
  return width
}


/** Whether buffered source can reach a new visual line before it drains. */
function pendingTextCanGrow(
  root: HTMLElement | null,
  visibleText: string,
  pending: string,
  geometryRef: { current: PendingTextGeometry | null },
): boolean {
  if (pending === '') return false
  if (/[\r\n]/u.test(pending)) return true
  const pendingChars = [...pending]
  if (pendingChars.length >= PREDICTIVE_WRAP_FALLBACK_CHARS) return true
  if (root === null) return false

  let geometry = geometryRef.current
  if (geometry?.root !== root) {
    const rootWidth = root.clientWidth || 600
    geometry = { root, visibleText, fontSize: 14, wrapThresholdWidth: Math.max(120, rootWidth * 0.4) }
    geometryRef.current = geometry
  }
  return approximateInlineWidth(pending, geometry.fontSize) >= (geometry.wrapThresholdWidth ?? (geometry.fontSize * PREDICTIVE_WRAP_FALLBACK_CHARS))
}

function announcementChunkEnd(source: string, start: number): number {
  const hardEnd = Math.min(source.length, start + STREAM_ANNOUNCEMENT_MAX_CHARS)
  if (hardEnd === source.length) return hardEnd
  const softStart = start + Math.floor(STREAM_ANNOUNCEMENT_MAX_CHARS * 0.6)
  for (let index = hardEnd - 1; index >= softStart; index -= 1) {
    if (/[\s.,;:!?]/u.test(source[index] ?? '')) return index + 1
  }
  return hardEnd
}

/** Pace screen-reader updates independently from visual reveal frames. */
interface StreamAnnouncementState {
  text: string
  revision: number
  present: boolean
}

/** A commit-driven live region isolated from the visible Markdown subtree. */
const StreamAnnouncement = memo(function StreamAnnouncement({
  text,
  active,
}: {
  text: string
  active: boolean
}) {
  const [announcement, setAnnouncement] = useState<StreamAnnouncementState>({
    text: '',
    revision: 0,
    present: active,
  })
  const sourceRef = useRef(text)
  const activeRef = useRef(active)
  const announcedOffsetRef = useRef(active ? 0 : text.length)
  const drainSourceRef = useRef<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const clearTimer = (): void => {
      if (timerRef.current === null) return
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    const publishNext = (source: string): boolean => {
      const start = Math.min(announcedOffsetRef.current, source.length)
      const end = announcementChunkEnd(source, start)
      if (end <= start) return false
      announcedOffsetRef.current = end
      setAnnouncement(previous => ({
        text: source.slice(start, end),
        revision: previous.revision + 1,
        present: true,
      }))
      return end < source.length
    }

    const hideAfterLinger = (): void => {
      timerRef.current = setTimeout(() => {
        timerRef.current = null
        if (activeRef.current) return
        drainSourceRef.current = null
        setAnnouncement(previous => ({ ...previous, present: false }))
      }, STREAM_ANNOUNCEMENT_INTERVAL_MS)
    }

    const drainNext = (): void => {
      const source = drainSourceRef.current
      if (source === null) return
      if (!publishNext(source)) {
        hideAfterLinger()
        return
      }
      timerRef.current = setTimeout(() => {
        timerRef.current = null
        if (activeRef.current) return
        drainNext()
      }, STREAM_ANNOUNCEMENT_INTERVAL_MS)
    }

    const scheduleLive = (): void => {
      if (timerRef.current !== null || announcedOffsetRef.current >= sourceRef.current.length) return
      timerRef.current = setTimeout(() => {
        timerRef.current = null
        if (!activeRef.current) return
        const source = sourceRef.current
        if (publishNext(source)) scheduleLive()
      }, STREAM_ANNOUNCEMENT_INTERVAL_MS)
    }

    const wasActive = activeRef.current
    const previousSource = sourceRef.current
    const continuingDrain = !active && !wasActive && drainSourceRef.current !== null
    if (
      !continuingDrain
      && (!text.startsWith(previousSource) || announcedOffsetRef.current > text.length)
    ) {
      announcedOffsetRef.current = 0
    }
    sourceRef.current = text
    activeRef.current = active

    if (active) {
      if (!wasActive) {
        clearTimer()
        drainSourceRef.current = null
        setAnnouncement(previous => ({
          text: '',
          revision: previous.revision + 1,
          present: true,
        }))
      }
      scheduleLive()
      return
    }

    if (!wasActive) {
      if (drainSourceRef.current === null) announcedOffsetRef.current = text.length
      return
    }

    clearTimer()
    drainSourceRef.current = text
    drainNext()
  }, [active, text])

  useEffect(() => () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current)
    timerRef.current = null
  }, [])

  if (!active && !announcement.present) return null
  const activating = active && !activeRef.current
  return (
    <span
      className={css.visuallyHidden}
      aria-live="polite"
      aria-atomic="true"
    >
      <span key={announcement.revision}>{activating ? '' : announcement.text}</span>
    </span>
  )
})

/**
 * Smooth streaming text arm. While the reply runs, the accumulated source is
 * revealed through the smoother at a rate that tracks the model's arrival
 * and rendered by the Harness `MarkdownText`
 * streaming arm (incremental parse, frozen non-tail blocks), so there is no
 * raw-text tail and no text-to-markdown swap: the tree stays markdown
 * throughout. The outer assistant owner follows all text growth, including
 * the final drain, so wraps glide without a completion handoff. Once the
 * queue drains, the settled full parse (KaTeX math, fence highlighting, file
 * mentions) swaps in exactly once.
 */
function AnimatedMarkdownText({
  text,
  labels,
  fileMentions,
  streaming,
  logarithmicFade,
  motionReduced,
  followSpeedCpsRef,
  followRevealedCharsRef,
  followRevealScaleRef,
  onPredictiveChange,
  onRevealActivityChange,
  preset,
  shouldHoldBack,
}: AnimatedMarkdownTextProps) {
  const reduced = motionReduced
  const [typing, setTyping] = useState(streaming)
  const localSpeedCpsRef = useRef(35)
  const followRootRef = useRef<HTMLDivElement>(null)
  const predictionSourceRef = useRef<string | null>(null)
  const predictionStateRef = useRef(false)
  const predictionGeometryRef = useRef<PendingTextGeometry | null>(null)
  const speedCpsRef = followSpeedCpsRef ?? localSpeedCpsRef
  const displayed = useSmoothStreamContent(text, {
    enabled: typing && !reduced,
    inputComplete: !streaming,
    preset,
    shouldHoldBack,
    speedCpsRef,
    revealedCharsRef: followRevealedCharsRef,
    revealScaleRef: followRevealScaleRef,
    onRevealCommit: () => { notifyFollowCommit(followRootRef.current) },
  })
  const shown = reduced ? text : displayed
  const live = typing && !reduced
  const markdownShown = useDecoupledMarkdown(shown, live)
  useLogarithmicFade(followRootRef, logarithmicFade && !reduced, live, speedCpsRef)

  useEffect(() => {
    const root = followRootRef.current
    if (root === null || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      if (predictionGeometryRef.current?.root === root) predictionGeometryRef.current = null
    })
    observer.observe(root)
    return () => { observer.disconnect() }
  }, [])

  useLayoutEffect(() => {
    if (onPredictiveChange === undefined) return
    const pending = text.slice(shown.length)
    const sourceChanged = predictionSourceRef.current !== text
    const next = !live || !streaming || pending === ''
      ? false
      : sourceChanged
        ? pendingTextCanGrow(followRootRef.current, shown, pending, predictionGeometryRef)
        : predictionStateRef.current
    predictionSourceRef.current = text
    predictionStateRef.current = next
    onPredictiveChange(next)
  }, [live, onPredictiveChange, shown, streaming, text])

  useLayoutEffect(() => {
    onRevealActivityChange?.(live)
  }, [live, onRevealActivityChange])

  // The stream closed: keep revealing the remaining queue, then swap to the
  // settled parse exactly once. The markdown tree stays mounted until then.
  useEffect(() => {
    if (typing && !streaming && shown.length === text.length) setTyping(false)
  }, [shown, streaming, text, typing])

  // A row can mount before the projection flips its assistant step to
  // `running`, which would freeze `typing` at false forever and leave the
  // reveal engine off for the whole reply. Re-arm on the rising edge so late
  // stream starts are still smoothed. (Adopted from #22 by @Zn-Dk.)
  useEffect(() => {
    if (streaming) setTyping(true)
  }, [streaming])

  if (!streaming && !live && text.trim() === '') return null

  return (
    <div ref={followRootRef} className={css.follow} data-follow-text="">
      <MarkdownText
        // `shown` stays authoritative through the completion drain: the
        // settled parse swaps in only when the queue has actually emptied.
        // Rendering `text` early bypasses the drain and teleports the tail.
        text={live ? markdownShown : text}
        streaming={live}
        labels={labels}
        fileMentions={live ? undefined : fileMentions}
      />
    </div>
  )
}

function imageLabels(t: AssistantProps['t']): MessageImageLabels {
  return {
    image: t('image.label'),
    open: t('image.openOriginal'),
    openNamed: label => t('image.openOriginalLabel', { label }),
    loading: t('image.loading'),
    loadFailed: t('image.loadFailed'),
    lightbox: {
      dialog: t('image.preview'),
      close: t('image.closePreview'),
    },
  }
}

/**
 * Apply searchable hidden state without unmounting a stable subtree — the
 * Host's completion fold hides the answer-inline reasoning this way, so the
 * takeover renderer must reproduce it to stay inside the contract: the row
 * disappears into the Host's process summary and comes back on find-in-page.
 * (Mirrors the Harness chat kit's `useSearchableHidden`.)
 */
function useSearchableHidden(
  hidden: boolean,
  reveal: () => void,
): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = ref.current
    if (element === null) return
    if (hidden && element.contains(element.ownerDocument.activeElement)) {
      reveal()
      return
    }
    if (hidden) element.setAttribute('hidden', 'until-found')
    else element.removeAttribute('hidden')
  }, [hidden, reveal])
  useEffect(() => {
    const element = ref.current
    if (element === null) return
    element.addEventListener('beforematch', reveal)
    return () => { element.removeEventListener('beforematch', reveal) }
  }, [reveal])
  return ref
}

/**
 * One answer-inline reasoning block wrapped in the Host's fold contract. The
 * Host computes the fold decision (turn closed, compact transcript, this node
 * is the answer) and delivers it through the `turnProcess` owner prop; when
 * folded the block hides into the Host's "thought" summary row instead of
 * staying mounted above the answer.
 */
function FoldableReasoning({
  hidden,
  reveal,
  children,
}: {
  hidden: boolean
  reveal: () => void
  children: ReactNode
}) {
  const ref = useSearchableHidden(hidden, reveal)
  return (
    <div ref={ref} data-turn-process-inline={hidden || undefined}>
      {children}
    </div>
  )
}

function firstLine(text: string): string {
  const newline = text.indexOf('\n')
  return newline === -1 ? text : text.slice(0, newline)
}

function latestLine(text: string): string {
  const visible = text.trimEnd()
  const newline = visible.lastIndexOf('\n')
  return newline === -1 ? visible : visible.slice(newline + 1)
}

/**
 * Built-in Think disclosure with a smoothed `text` feed. Chevron and row
 * click stay on the disclosure chrome, which the plugin's AnimatedDisclosure
 * renders with a height-animated body (the harness primitive would mount and
 * unmount it, which cannot glide). The row opens while this block is the
 * streaming tail and stays open until its OWN reveal has drained, then closes
 * as soon as thinking ends — a later block, or the assistant node settling —
 * not when the rest of the reply is still streaming.
 */
function AnimatedReasoning({
  gateKey,
  text,
  running,
  preset,
  thinkAutoExpand,
  motionReduced,
  logarithmicFade,
  shouldHoldBack,
  followSpeedCpsRef,
  followRevealScaleRef,
  t,
}: {
  /** Assistant Node key shared with the response seat of the same step. */
  gateKey: string
  text: string
  running: boolean
  preset: StreamSmoothingPreset
  thinkAutoExpand: boolean
  motionReduced: boolean
  logarithmicFade: boolean
  shouldHoldBack: () => boolean
  followSpeedCpsRef?: { current: number } | undefined
  followRevealScaleRef?: { current: number } | undefined
  t: AssistantProps['t']
}) {
  const reduced = motionReduced
  const [expanded, setExpanded] = useState(running && thinkAutoExpand)
  const [autoClosed, setAutoClosed] = useState(false)
  const summaryRef = useRef<HTMLSpanElement>(null)
  const fadeRootRef = useRef<HTMLDivElement>(null)
  // The custom thinking auto-scroll drives the SAME node as the logarithmic
  // fade, so it reuses that ref object rather than installing a second one
  // (a callback ref would re-attach on every render).
  const thinkBodyRef = fadeRootRef
  const localFadeSpeedRef = useRef(35)
  const fadeSpeedRef = followSpeedCpsRef ?? localFadeSpeedRef
  const userScrolledRef = useRef(false)
  const rafIdRef = useRef(0)
  // Latest "this body is still expanded" state. Tracked on every render so the
  // queued frame can re-read it: a collapse landing between scheduling and the
  // frame must not move the viewport. Whether a frame may follow AT ALL is
  // decided where it is scheduled (a changed `shown`, or `live`) — see below;
  // `expanded` alone must never authorize a scroll, or expanding a finished
  // reasoning card would jump to its last line.
  const followActiveRef = useRef(false)
  followActiveRef.current = expanded
  const commitAnchorRef = useRef<HTMLDivElement>(null)
  // The live→false flip is the AUTO-close: it collapses instantly and the
  // follower's settle spring absorbs the height step. A later manual toggle
  // keeps the CSS glide.
  //
  // Previous frame's revealed slice. `running` flips false the moment the host
  // opens the answer block — and the host opens it with an EMPTY `block-start`
  // placeholder (host `emptyAssistantBlock`), long before the smoothed think
  // reveal has drained. Without carrying the reveal past that flip the hook
  // sees `enabled: false` and jumps straight to the full text
  // (useSmoothStreamContent syncImmediate), so the think block would collapse
  // with most of its text never shown.
  const revealedRef = useRef(text)
  const keepRevealing = revealedRef.current !== text
  const displayed = useSmoothStreamContent(text, {
    enabled: !reduced && (running || keepRevealing),
    preset,
    shouldHoldBack,
    speedCpsRef: fadeSpeedRef,
    revealScaleRef: followRevealScaleRef,
    onRevealCommit: () => { notifyFollowCommit(commitAnchorRef.current) },
  })
  useLayoutEffect(() => {
    revealedRef.current = displayed
  }, [displayed])
  // The block is "live" until its own text has been fully revealed, no matter
  // what the host status says: that is what keeps it open, keeps the summary
  // following, and keeps the sweep on while the last lines type out.
  const revealing = !reduced && displayed !== text
  const live = running || revealing
  const shown = live ? displayed : text
  const summary = live ? latestLine(shown) : firstLine(text)
  useLogarithmicFade(fadeRootRef, logarithmicFade && !reduced && expanded, live, fadeSpeedRef)

  useLayoutEffect(() => {
    // Auto-expand owns the disclosure while the block is live; with it off, a
    // manual toggle is never wrestled back by the stream. A reply arriving
    // mid-reveal must not snap the think text away before it has been read, so
    // the close waits for the reveal to drain (`live`), not for `running`.
    if (thinkAutoExpand) {
      setExpanded(live)
      setAutoClosed(!live)
    }
    if (live) {
      userScrolledRef.current = false
    }
    // A commit that changes this block's height must hand the follower its
    // correction in the SAME task, before the grown-but-uncompensated frame
    // can reach a paint.
    notifyFollowCommit(commitAnchorRef.current)
  }, [live, running, thinkAutoExpand])

  // Tell the response seat how long to hold the reply back: it renders the
  // answer only once every think block of this step has stopped typing. The
  // source id keeps one block's drain from clearing another's.
  const gateSource = useId()
  useEffect(() => {
    setReasoningDraining(gateKey, gateSource, revealing)
  }, [gateKey, gateSource, revealing])
  useEffect(() => () => { setReasoningDraining(gateKey, gateSource, false) }, [gateKey, gateSource])

  // Last slice actually written into the viewport. Follow ownership is keyed
  // to THIS, not to `expanded`.
  const followedShownRef = useRef(shown)
  useEffect(() => {
    // An open body stays pinned to its newest line only while it is being
    // written: `shown` grows every frame during the reveal, and the settle
    // commit — where it flips from the revealed slice to the full text in one
    // commit — is one more write. Measured with the old `!running` bail-out:
    // scrollHeight 368 vs clientHeight 248, so the last 120px never surfaced.
    //
    // A settled block whose text did NOT change owns nothing: expanding a
    // finished reasoning card must leave its scroll position alone, or its
    // first lines become unreachable — the reason the old guard bailed out on
    // `!running`. `live` covers the frame where the stream is still running but
    // this frame's slice happens to be unchanged. A reader who scrolled up
    // keeps the position (userScrolledRef re-arms on the way back down).
    const shownChanged = followedShownRef.current !== shown
    followedShownRef.current = shown
    if (!expanded || userScrolledRef.current) return
    if (!shownChanged && !live) return
    const el = thinkBodyRef.current
    if (el === null) return
    if (rafIdRef.current === 0) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = 0
        // Re-checked at frame time: the block may have collapsed, or the user
        // may have scrolled since scheduling. A queued frame never steals the
        // position back.
        if (!followActiveRef.current || userScrolledRef.current || el === null) return
        const delta = el.scrollHeight - el.scrollTop - el.clientHeight
        if (delta > 2) {
          // Pin to the bottom by asking for a position past the end and letting
          // the browser clamp it. `Number.MAX_SAFE_INTEGER` does NOT survive
          // that clamp on this host's Chromium: measured in the running app, a
          // frame with 40px of scrollable overflow (`scrollHeight` 348,
          // `clientHeight` 308) read back `scrollTop` 0 immediately after the
          // write, while a plain 1e7 from the console reached the end. The
          // reasoning block therefore never followed its own text. Asking for
          // `scrollHeight` is the exact bottom and needs no magic constant.
          // Upstream carries the MAX_SAFE_INTEGER form, so this is a local fix.
          el.scrollTop = el.scrollHeight
        }
      })
    }
  }, [running, expanded, shown, live])

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== 0) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = 0
      }
    }
  }, [])

  useEffect(() => {
    const el = thinkBodyRef.current
    if (el === null) return
    let isPointerDown = false
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        userScrolledRef.current = true
      } else if (e.deltaY > 0) {
        if (el.scrollHeight - el.scrollTop - el.clientHeight <= 30) {
          userScrolledRef.current = false
        }
      }
    }
    const onPointerDown = () => {
      isPointerDown = true
    }
    const onPointerUp = () => {
      isPointerDown = false
    }
    const onScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 30
      if (atBottom) {
        userScrolledRef.current = false
      } else if (isPointerDown) {
        userScrolledRef.current = true
      }
    }
    el.addEventListener('wheel', onWheel, { passive: true })
    el.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    window.addEventListener('pointercancel', onPointerUp, { passive: true })
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      el.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const element = summaryRef.current
    if (element === null) return
    element.scrollLeft = live ? element.scrollWidth - element.clientWidth : 0
  }, [live, summary])

  // Preserve FollowHost's layout wrapper without mounting a second scroll owner.
  return (
    <div className={css.follow} ref={commitAnchorRef}>
      <div className={css.think} data-variant="think" data-state={live ? 'running' : 'ok'}>
        {live && <span className={css.visuallyHidden}>{t('row.running')}</span>}
        <AnimatedDisclosure
          rowClassName={css.thinkRow}
          leadingClassName={css.thinkLeading}
          titleClassName={css.thinkTitle}
          chevronClassName={css.thinkChevron}
          icon={<IconThink size={14} />}
          // `message.think` is not in the `conversation` key union this prop is
          // typed with: no Harness version owns it there. On 0.1.5+ it lives in
          // the `chat` namespace, and on older builds only this plugin's own
          // fallback dictionary has it. The layered lookup installed in
          // index.ts resolves it either way, so the cast widens the key domain
          // rather than skipping a lookup. No hardcoded label and no
          // `<html lang>` sniffing: a key that resolves nowhere shows the key,
          // which the locale routing test catches.
          title={(t as unknown as (key: string) => string)('message.think')}
          open={expanded}
          onToggle={() => {
            setAutoClosed(false)
            setExpanded(value => !value)
          }}
          // The auto-close at stream end snaps (no grid-track animation): the
          // follower's settle spring absorbs the height step through the
          // compositor, so animating the track too would double-animate the
          // collapse. Manual toggles while streaming keep the glide.
          bodyTransition={!autoClosed}
          collapsedContent={(
            <>
              <span className={css.thinkSeparator} aria-hidden />
              <span ref={summaryRef} className={css.thinkSummary} data-follow-end={live || undefined}>{summary}</span>
            </>
          )}
        >
          <div ref={fadeRootRef} className={css.thinkBody}>{shown}</div>
        </AnimatedDisclosure>
      </div>
    </div>
  )
}

/**
 * Assistant node renderer for the typewriter overlay. Text observed while
 * streaming is revealed by the smoother through the Harness Markdown
 * renderer at a rate that tracks arrival. Reasoning blocks keep the
 * built-in Think disclosure and only receive a smoothed text feed; the
 * outer node owns conversation-port follow through both streaming and the
 * final text drain. Keeping one owner avoids a lifecycle handoff that would
 * reopen and later retire a second runway. The FPS guard holds offscreen
 * reveals when the frame rate is degraded. Settled text renders with the full
 * Markdown pipeline.
 */
export const TypewriterAssistantNodeView = memo(function TypewriterAssistantNodeView({
  mode: _mode = DEFAULT_STREAM_CONFIG.mode,
  preset = DEFAULT_STREAM_CONFIG.preset,
  revealCharsPerSec: _revealCharsPerSec = DEFAULT_STREAM_CONFIG.revealCharsPerSec,
  scrollSpeedPxPerSec: _scrollSpeedPxPerSec = DEFAULT_STREAM_CONFIG.scrollSpeedPxPerSec,
  maxScrollSpeedPxPerSec: _maxScrollSpeedPxPerSec = DEFAULT_STREAM_CONFIG.maxScrollSpeedPxPerSec,
  thinkAutoExpand = DEFAULT_STREAM_SETTINGS.thinkAutoExpand,
  logarithmicFade = DEFAULT_STREAM_SETTINGS.logarithmicFade,
  controlScroll = true,
  motionPreference = DEFAULT_STREAM_SETTINGS.motionPreference,
  node,
  useTurnData,
  openFile,
  loadImage,
  fileMentions,
  turnProcess,
  t,
  groupPart,
}: AssistantProps & {
  mode?: StreamMode
  preset?: StreamSmoothingPreset
  revealCharsPerSec?: number
  scrollSpeedPxPerSec?: number
  maxScrollSpeedPxPerSec?: number
  thinkAutoExpand?: boolean
  logarithmicFade?: boolean
  controlScroll?: boolean
  motionPreference?: StreamMotionPreference
}) {
  const data = node.data
  const streaming = data.status === 'running'
  const reduced = useMotionReduced(motionPreference)
  // The reasoning seat of this same Node reveals the think text at its own
  // pace; the host hands the answer over as soon as thinking ends (an empty
  // `block-start`), so the reply must wait for that reveal to drain before it
  // starts typing underneath.
  const nodeKey = node.key
  const readReasoningDraining = useCallback(
    () => isReasoningDraining(nodeKey),
    [nodeKey],
  )
  const reasoningDraining = useSyncExternalStore(
    subscribeReasoningDraining,
    readReasoningDraining,
    readReasoningDraining,
  )
  // The Host's completion-fold decision for THIS node's inline reasoning:
  // only the answer step folds, only in compact-transcript mode, and only
  // once the turn has closed (foldable implies it). Mirrors the built-in
  // assistant renderer so the takeover keeps the official behavior.
  const reasoningHidden = turnProcess !== undefined
    && turnProcess.foldable
    && turnProcess.spec.answerStep === data.step
    && turnProcess.spec.inlineReasoning
    && !turnProcess.open
  const revealProcess = useCallback(() => { turnProcess?.setOpen(true) }, [turnProcess])
  const { ref: guardRef, shouldHoldBack } = useFpsGuard(streaming)
  const rootSpeedRef = useRef(35)
  const rootRevealedCharsRef = useRef(0)
  const rootRevealScaleRef = useRef(1)
  const previousStreamingRef = useRef(streaming)
  const [textRevealActive, setTextRevealActive] = useState(false)
  const completionCandidate = !streaming
    && previousStreamingRef.current
    && data.blocks.some(block => block.kind === 'text' && block.text.trim() !== '')
  useLayoutEffect(() => {
    previousStreamingRef.current = streaming
  }, [streaming])
  const updateTextRevealActivity = useCallback((active: boolean): void => {
    setTextRevealActive(previous => previous === active ? previous : active)
  }, [])
  const reasoningTailIndex = streaming && data.blocks[data.blocks.length - 1]?.kind === 'reasoning'
    ? data.blocks.length - 1
    : -1
  const reasoningOwnsSpeed = reasoningTailIndex !== -1
  const rootPredictiveRef = useRef(false)
  const previousReasoningTailRef = useRef(-1)
  if (reasoningTailIndex !== previousReasoningTailRef.current) {
    // Think growth is already paced by its own text reveal. Opening additional
    // speculative runway here exposes that runway as an empty gap above the
    // fixed turn status, especially when reasoning arrives in fast bursts.
    // The follower still smooths real height growth within the measured gap
    // and catches up any unsafe remainder in the same frame.
    rootPredictiveRef.current = false
    if (!reasoningOwnsSpeed) rootSpeedRef.current = 35
    previousReasoningTailRef.current = reasoningTailIndex
  }
  const updateTextPrediction = useMemo(
    () => (predictive: boolean): void => { rootPredictiveRef.current = predictive },
    [],
  )
  const turn = node.location.kind === 'turn' || node.location.kind === 'step'
    ? node.location.turn
    : undefined
  const tail = useTurnData('turn-tail')
  const owner = useMemo<TurnTailOwnerProps | undefined>(() => {
    if (turn?.status !== 'closed' || data.finalNode === undefined) return undefined
    if (tail?.closing?.finalNode.seq !== data.finalNode.seq) return undefined
    return { turn, seq: data.finalNode.seq, openFile }
  }, [data.finalNode, openFile, tail, turn])
  const mentions = useMemo(
    () => owner === undefined ? undefined : fileMentions(owner),
    [fileMentions, owner],
  )
  const markdownLabels = useMemo(() => ({
    code: { copyLabel: t('copy'), copiedLabel: t('copied') },
    footnotes: t('markdown.footnotes'),
  }), [t])
  const imageLoader: ImageLoader = loadImage ?? (async () => {
    throw new Error(t('image.serviceUnavailable'))
  })
  // 0.1.7 host contract: an assistant step is projected as TWO seats
  // (ProcessGroup split). `groupPart === 'reasoning'` renders ONLY reasoning
  // blocks, `'response'` ONLY non-reasoning blocks; absent = everything
  // (0.1.5 Desktop behavior). The host's own AssistantMarkdown filters the
  // same way (dsh-client-ui-chat 0.1.7 AssistantMarkdown). Rendering full
  // blocks in both seats duplicated the think and reply blocks.
  //
  // The filter keeps every kept block's ORIGINAL index, exactly like the host
  // ("Render only the requested business portion, preserving original block
  // indexes" — AssistantMarkdownProps.groupPart): the stream-tail test below
  // must run against the FULL block list. Judging the tail from the seat-local
  // index made the reasoning block look like the tail for the whole step, so
  // the think block kept revealing at its own pace while the reply seat was
  // already typing the answer below it.
  const visibleBlocks: Array<(typeof data.blocks)[number]> = []
  const visibleOriginalIndexes: number[] = []
  for (let index = 0; index < data.blocks.length; index += 1) {
    const block = data.blocks[index]
    if (block === undefined) continue
    if (groupPart === 'reasoning' && block.kind !== 'reasoning') continue
    if (groupPart === 'response' && block.kind === 'reasoning') continue
    visibleBlocks.push(block)
    visibleOriginalIndexes.push(index)
  }
  const hasVisible = streaming
    || data.status === 'interrupted'
    || visibleBlocks.some(block => block.kind !== 'tool-call')
  if (!hasVisible) return null
  const announcementText = data.blocks
    .filter(block => block.kind === 'text')
    .map(block => block.text)
    .join('\n')

  const rendered: ReactNode[] = []
  let lastFollow = -1
  let lastText = -1
  for (let index = 0; index < visibleBlocks.length; index += 1) {
    const kind = visibleBlocks[index]?.kind
    if (kind === 'text' || kind === 'reasoning') lastFollow = index
    if (kind === 'text') lastText = index
  }
  for (let index = 0; index < visibleBlocks.length; index += 1) {
    const block = visibleBlocks[index]
    if (block === undefined) continue
    // Host-equivalent stream-tail test (`streaming && i === last` in the host's
    // AssistantMarkdown), taken against the FULL block list rather than this
    // seat's slice: a reasoning block stops being the tail as soon as any later
    // block exists, which is what settles its reveal when the reply arrives.
    const isStreamTail = (visibleOriginalIndexes[index] ?? index) === data.blocks.length - 1
    switch (block.kind) {
      case 'text':
        if (!streaming && block.text.trim() === '') break
        // The answer waits for the think block to finish typing (see
        // reasoningGate): mounting it early would race the reveal and land the
        // reply under a think block that is still mid-sentence.
        if (reasoningDraining) break
        rendered.push(
          <AnimatedMarkdownText
            key={index}
            text={block.text}
            labels={markdownLabels}
            fileMentions={mentions}
            streaming={streaming}
            logarithmicFade={logarithmicFade && data.status !== 'interrupted'}
            motionReduced={reduced}
            followSpeedCpsRef={index === lastFollow ? rootSpeedRef : undefined}
            followRevealedCharsRef={index === lastFollow ? rootRevealedCharsRef : undefined}
            followRevealScaleRef={index === lastFollow ? rootRevealScaleRef : undefined}
            onPredictiveChange={index === lastFollow ? updateTextPrediction : undefined}
            onRevealActivityChange={index === lastText ? updateTextRevealActivity : undefined}
            preset={preset}
            shouldHoldBack={shouldHoldBack}
          />,
        )
        break
      case 'reasoning':
        rendered.push(
          <FoldableReasoning key={index} hidden={reasoningHidden} reveal={revealProcess}>
            <AnimatedReasoning
              gateKey={nodeKey}
              text={block.text}
              running={streaming && isStreamTail}
              preset={preset}
              thinkAutoExpand={thinkAutoExpand}
              logarithmicFade={logarithmicFade && data.status !== 'interrupted'}
              motionReduced={reduced}
              shouldHoldBack={shouldHoldBack}
              followSpeedCpsRef={reasoningOwnsSpeed && isStreamTail ? rootSpeedRef : undefined}
              followRevealScaleRef={reasoningOwnsSpeed && isStreamTail ? rootRevealScaleRef : undefined}
              t={t}
            />
          </FoldableReasoning>,
        )
        break
      case 'image': {
        const start = index
        const group = [block]
        while (index + 1 < visibleBlocks.length) {
          const next = visibleBlocks[index + 1]
          if (next === undefined || next.kind !== 'image') break
          group.push(next)
          index += 1
        }
        rendered.push(
          <ImageGallery key={start} images={group} load={imageLoader} align="start" labels={imageLabels(t)} />,
        )
        break
      }
      case 'tool-call':
        break
      case 'other':
        rendered.push(
          <JsonBlock
            key={index}
            label={t('message.unknownBlock')}
            payload={block.block}
            truncatedLabel={total => t('json.truncated', { total })}
          />,
        )
        break
    }
  }

  return (
    <div ref={guardRef} className={css.root} data-streaming={streaming || undefined}>
      <StreamAnnouncement text={announcementText} active={streaming && !reduced} />
      <FollowHost
        // The status can close before its final text arm drains. Retain this
        // same owner across that boundary; the candidate bridges the one
        // layout commit before the child reports its live reveal state.
        active={!reduced && (streaming || completionCandidate || textRevealActive)}
        speedCpsRef={rootSpeedRef}
        revealedCharsRef={rootRevealedCharsRef}
        revealScaleRef={rootRevealScaleRef}
        predictiveRef={rootPredictiveRef}
        controlScroll={controlScroll}
      >
        <div className={css.body}>
          {rendered}
          {data.status === 'interrupted' && (groupPart === undefined || groupPart === 'response' || visibleBlocks.some(block => block.kind !== 'reasoning' && block.kind !== 'tool-call')) && <span className={css.stopped}>{t('message.stopped')}</span>}
        </div>
      </FollowHost>
    </div>
  )
})
