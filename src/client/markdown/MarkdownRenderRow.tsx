/**
 * Markdown rendering toggle row for the UI增强 → Markdown tab.
 * Reads/writes the ui-custom settings scope's `renderUserMarkdown`; the chat
 * renderer shadows the user node cell and switches on this flag.
 */

import type { InjectFace, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import type { UiCustomSection } from '../../shared.ts'
import css from './MarkdownRenderRow.module.css'

/** Registration-side preference face. */
export interface MarkdownRenderRowInjected {
  hooks: {
    /** The ui-custom settings scope, read for renderUserMarkdown. */
    mdRender: SettingsScope<UiCustomSection>
  }
  /** Toggle Markdown rendering for the user's own messages. */
  setRenderUserMarkdown: (enabled: boolean) => void
}

/** Full component props. */
export type MarkdownRenderRowProps =
  InjectFace<MarkdownRenderRowInjected>
  & { t: (key: string) => string }

/**
 * Render the Markdown-rendering toggle row.
 * @param props - composed Settings slot props.
 */
export function MarkdownRenderRow({ useMdRender, setRenderUserMarkdown, t }: MarkdownRenderRowProps) {
  const scope = useMdRender((value) => value)
  const enabled = scope?.value?.renderUserMarkdown ?? false
  return (
    <div className={css.row}>
      <div className={css.rowText}>
        <div className={css.title}>{t('renderTitle')}</div>
        <div className={css.desc}>{t('renderDesc')}</div>
      </div>
      <label className={css.switch}>
        <input
          type="checkbox"
          className={css.checkbox}
          aria-label={t('renderTitle')}
          checked={enabled}
          onChange={(event) => setRenderUserMarkdown(event.target.checked)}
        />
      </label>
    </div>
  )
}
