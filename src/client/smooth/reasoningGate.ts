/**
 * Cross-seat reveal gate for one streamed Assistant step.
 *
 * 0.1.7 projects a single assistant step into TWO Chat seats — `reasoning` and
 * `response` — rendered as independent React instances, each owning its own
 * smooth reveal queue. Neither can see the other's progress, yet the host hands
 * the answer over the moment thinking ends: `block-start` creates an empty
 * `text` block (host `emptyAssistantBlock`), so the reasoning block stops being
 * the stream tail long before its own reveal has drained. Without a gate the
 * reply starts typing under a think block that is still typing, and the think
 * block is collapsed mid-reveal because the tail test already flipped.
 *
 * Keyed by the assistant Node key, which both seats share. A step may hold more
 * than one reasoning block (thinking resumes after a tool call), so entries are
 * a SET of draining sources rather than a single flag: the reply starts only
 * once every think block has finished typing. Sources are removed on unmount,
 * so a seat that never finishes revealing cannot block the reply forever.
 */
type Listener = () => void

const draining = new Map<string, Set<string>>()
const listeners = new Set<Listener>()

function notify(): void {
  for (const listener of Array.from(listeners)) listener()
}

/**
 * Publish whether one think block still has text to reveal.
 * @param key - assistant Node key shared by both seats.
 * @param source - stable identity of the reporting think block.
 * @param value - true while that block's reveal is still draining.
 */
export function setReasoningDraining(key: string, source: string, value: boolean): void {
  const sources = draining.get(key)
  if (value) {
    if (sources?.has(source) === true) return
    if (sources === undefined) draining.set(key, new Set([source]))
    else sources.add(source)
  } else {
    if (sources?.delete(source) !== true) return
    if (sources.size === 0) draining.delete(key)
  }
  notify()
}

/**
 * @param key - assistant Node key shared by both seats.
 * @returns whether any think block of that node is still draining.
 */
export function isReasoningDraining(key: string): boolean {
  return draining.has(key)
}

/** @param listener - called whenever any node's draining state changes. */
export function subscribeReasoningDraining(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
