/**
 * 客户端入口：按 build-client.mjs BODY_ORDER 顺序导入所有片段。
 * esbuild 会将这些导入内联到单个 IIFE bundle 中。
 */

// data/ 片段
import './data/settings-dicts'
import './data/terms'
import './data/zh-dict'
import './data/dom-labels'
import './data/traj-patterns'

// logic/ 片段
import './logic/settings-store'
import './logic/prompt-store'
import './logic/format-utils'
import './logic/settings-section'
import './logic/auto-archive'
import './logic/session-menu'
import './logic/archive-view'
import './logic/register'
import './logic/dom-enhance'
import './logic/apply'
