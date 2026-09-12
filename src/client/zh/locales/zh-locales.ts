/**
 * Locale dictionaries for the zh feature.
 *
 * Registers three namespaces:
 *   - ZH_SETTINGS_NS ('dsh-zh-settings')  → 增强设置 section labels
 *   - ZH_ARCHIVE_NS ('dsh-zh-archive')   → 归档会话视图 labels
 *
 * The SETTINGS_ZH / SETTINGS_EN dicts are imported from ../data/settings-dicts.ts.
 * The ARCHIVE_COPY dicts are the single source for the archive view copy —
 * archive-view.ts registers and binds ZH_ARCHIVE_NS from archiveLocales.
 */
import { SETTINGS_ZH, SETTINGS_EN } from '../data/settings-dicts.ts'
import { ZH_SETTINGS_NS, ZH_ARCHIVE_NS } from '../shared.ts'

export { ZH_SETTINGS_NS, ZH_ARCHIVE_NS }

/** Archive view locale copy (zh + en). */
const ARCHIVE_COPY_ZH = {
  buttonLabel: '查看已归档会话',
  buttonTitle: '查看该工作区已归档的会话',
  'group.ungrouped': '未分组',
  empty: '暂无归档会话',
  expand: '再展开 {n} 个归档',
  collapse: '收起',
  'actions.aria': '会话"{name}"的操作',
  'select.aria': '选择会话"{name}"',
  'menu.rename': '重命名',
  'menu.fork': '分叉会话',
  'menu.unarchive': '取消归档',
  'menu.delete': '删除会话',
  'rename.title': '重命名会话',
  'rename.ok': '保存',
  'rename.cancel': '取消',
  'rename.failed': '重命名失败：{message}',
  'delete.title': '删除会话',
  'delete.desc': '将把该会话的日志目录移入系统回收站，并从工作区账本移除（不保留恢复位）。删除后可从系统回收站手工还原目录，但不会自动恢复为会话。若删除的是当前查看的会话，将自动跳转到新会话页面。确定继续吗？',
  'delete.ok': '删除',
  'delete.cancel': '取消',
  'delete.deleting': '正在删除会话…',
  'delete.done': '会话已删除（日志已移入系统回收站）',
  'delete.failed': '删除失败：{message}',
  'time.now': '刚刚',
  'time.minutes': '{n}分钟',
  'time.hours': '{n}小时',
  'time.days': '{n}天',
  'time.months': '{n}个月',
  'time.years': '{n}年',
} as const

const ARCHIVE_COPY_EN = {
  buttonLabel: 'Archived sessions',
  buttonTitle: 'View archived sessions of this workspace',
  'group.ungrouped': 'Ungrouped',
  empty: 'No archived sessions',
  expand: 'Show {n} more archived sessions',
  collapse: 'Show less',
  'actions.aria': 'Session actions for {name}',
  'select.aria': 'Select session {name}',
  'menu.rename': 'Rename',
  'menu.fork': 'Fork session',
  'menu.unarchive': 'Unarchive',
  'menu.delete': 'Delete session',
  'rename.title': 'Rename session',
  'rename.ok': 'Save',
  'rename.cancel': 'Cancel',
  'rename.failed': 'Rename failed: {message}',
  'delete.title': 'Delete session',
  'delete.desc': 'The session log directory will move to the system recycle bin and the workspace ledger slot will be removed (no restore position). You can manually restore the directory from the recycle bin, but it will not automatically become a session again. If you delete the currently viewed session, the UI will jump to a new session. Continue?',
  'delete.ok': 'Delete',
  'delete.cancel': 'Cancel',
  'delete.deleting': 'Deleting session…',
  'delete.done': 'Session deleted (log moved to the system recycle bin)',
  'delete.failed': 'Delete failed: {message}',
  'time.now': 'now',
  'time.minutes': '{n}min',
  'time.hours': '{n}h',
  'time.days': '{n}d',
  'time.months': '{n}mo',
  'time.years': '{n}y',
} as const

export const archiveLocales = {
  [ZH_ARCHIVE_NS]: {
    zh: ARCHIVE_COPY_ZH,
    en: ARCHIVE_COPY_EN,
  },
} as const

export const settingsLocales = {
  [ZH_SETTINGS_NS]: {
    zh: SETTINGS_ZH,
    en: SETTINGS_EN,
  },
} as const
