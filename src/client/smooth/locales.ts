/** Locale bundles for the smooth feature settings card. */

/** Dictionary namespace owned by this feature's settings card. */
export const NS = 'settings.smoothStream'

/** Locale keys the card renders. */
export type SmoothStreamLocaleKey =
  | 'title' | 'description'
  | 'enabled' | 'enabledHint'
  | 'thinkAutoExpand' | 'thinkAutoExpandHint'
  | 'debugEnabled' | 'debugEnabledHint' | 'debugUnavailable'
  | 'debugPanelTitle' | 'debugPanelToggle' | 'debugPanelClose' | 'debugGuide'
  | 'debugLive' | 'debugIdle' | 'debugUnsaved'
  | 'debugSave' | 'debugDiscard' | 'debugReset' | 'debugCopy' | 'debugCopied'
  | 'debugSectionLive' | 'debugSectionReveal' | 'debugSectionFollow'
  | 'debugFps' | 'debugFrameTime' | 'debugBacklog' | 'debugRevealSpeed' | 'debugProgress'
  | 'debugFollowState' | 'debugFollowing' | 'debugReleased'
  | 'debugLag' | 'debugVelocity' | 'debugReserve' | 'debugCapacity' | 'debugAppliedScale'
  | 'debugRevealMultiplier' | 'debugQueuePressure' | 'debugMaxReveal'
  | 'debugSpringStiffness' | 'debugSpringDamping' | 'debugSpringMass'
  | 'debugRunway' | 'debugReserveResponse' | 'debugBackpressureMin'
  | 'debugTipRevealMultiplier' | 'debugTipQueuePressure' | 'debugTipMaxReveal'
  | 'debugTipSpringStiffness' | 'debugTipSpringDamping' | 'debugTipSpringMass'
  | 'debugTipRunway' | 'debugTipReserveResponse' | 'debugTipBackpressureMin'
  | 'readOnly' | 'loading' | 'unavailable' | 'retry'
  | 'version' | 'developmentVersion'
  | 'updates' | 'updateHint' | 'developmentBuild' | 'updateUnavailable'
  | 'update' | 'updating' | 'restartRequired' | 'updateFailed'
  | 'save' | 'saving' | 'discard' | 'unsaved' | 'saveFailed'

/** English copy. */
export const en: Record<SmoothStreamLocaleKey, string> = {
  title: 'Smooth stream',
  description: 'How replies are revealed while they stream.',
  enabled: 'Enable smooth streaming',
  enabledHint: 'Let this feature render and follow streaming replies. Turn off to use the built-in renderer.',
  thinkAutoExpand: 'Auto-expand thinking',
  thinkAutoExpandHint: 'Open the thinking block while it streams. Turn off to keep it collapsed.',
  debugEnabled: 'Show render diagnostics',
  debugEnabledHint: 'Show live streaming and scroll metrics on the right side of the chat.',
  debugUnavailable: 'Live diagnostics require a newer version.',
  debugPanelTitle: 'Render diagnostics',
  debugPanelToggle: 'Toggle render diagnostics',
  debugPanelClose: 'Hide diagnostics panel',
  debugGuide: 'Tune one value at a time while a reply streams. Keep FPS stable and backlog near zero.',
  debugLive: 'Streaming',
  debugIdle: 'Idle',
  debugUnsaved: 'Unsaved tuning',
  debugSave: 'Save tuning',
  debugDiscard: 'Discard changes',
  debugReset: 'Reset tuning',
  debugCopy: 'Copy diagnostics',
  debugCopied: 'Copied',
  debugSectionLive: 'Live renderer',
  debugSectionReveal: 'Reveal tuning',
  debugSectionFollow: 'Scroll tuning',
  debugFps: 'FPS',
  debugFrameTime: 'Frame',
  debugBacklog: 'Backlog',
  debugRevealSpeed: 'Reveal',
  debugProgress: 'Progress',
  debugFollowState: 'Follow',
  debugFollowing: 'Pinned',
  debugReleased: 'Released',
  debugLag: 'Visual lag',
  debugVelocity: 'Velocity',
  debugReserve: 'Reserve',
  debugCapacity: 'Capacity',
  debugAppliedScale: 'Applied scale',
  debugRevealMultiplier: 'Reveal multiplier',
  debugQueuePressure: 'Queue pressure',
  debugMaxReveal: 'Maximum reveal',
  debugSpringStiffness: 'Spring stiffness',
  debugSpringDamping: 'Spring damping',
  debugSpringMass: 'Spring mass',
  debugRunway: 'Predictive runway',
  debugReserveResponse: 'Runway response',
  debugBackpressureMin: 'Minimum backpressure',
  debugTipRevealMultiplier: 'Overall reveal speed multiplier. Higher reveals text faster.',
  debugTipQueuePressure: 'Backlog acceleration strength. Higher catches up more aggressively.',
  debugTipMaxReveal: 'Hard cap for reveal speed in characters per second.',
  debugTipSpringStiffness: 'Scroll spring strength. Higher closes lag faster but can feel sharp.',
  debugTipSpringDamping: 'Scroll energy damping. Higher suppresses overshoot and jitter.',
  debugTipSpringMass: 'Scroll inertia. Higher makes movement slower and heavier.',
  debugTipRunway: 'Predictive blank space reserved while content grows.',
  debugTipReserveResponse: 'How quickly the reserved runway opens or closes.',
  debugTipBackpressureMin: 'Slowest reveal multiplier under scroll pressure.',
  readOnly: 'This deployment stores settings read-only.',
  loading: 'Loading smooth stream settings…',
  unavailable: 'Settings are unavailable in this connection.',
  retry: 'Retry',
  version: 'Version {version}',
  developmentVersion: 'Development version {version}',
  updates: 'Updates',
  updateHint: 'Install the newest version, then restart.',
  developmentBuild: 'Linked source; updates are managed in the checkout.',
  updateUnavailable: 'Updates are available only for an npm installation.',
  update: 'Update',
  updating: 'Updating…',
  restartRequired: 'Updated. Restart to load the new version.',
  updateFailed: 'The update failed; your current version is unchanged.',
  save: 'Save',
  saving: 'Saving…',
  discard: 'Discard',
  unsaved: 'Unsaved',
  saveFailed: 'The deployment did not accept these values.',
}

/** Simplified Chinese copy. */
export const zh: Record<SmoothStreamLocaleKey, string> = {
  title: '丝滑流式',
  description: '回复在流式输出时如何逐字展现。',
  enabled: '启用丝滑流式渲染',
  enabledHint: '由本特性渲染并跟随流式回复；关闭后使用内置渲染。',
  thinkAutoExpand: '自动展开思考',
  thinkAutoExpandHint: '思考块在流式时自动展开；关闭后保持折叠，可手动展开。',
  debugEnabled: '显示渲染调试面板',
  debugEnabledHint: '在聊天右侧显示流式渲染和滚动的实时参数。',
  debugUnavailable: '当前版本不支持实时调试。',
  debugPanelTitle: '渲染诊断',
  debugPanelToggle: '显示或隐藏渲染诊断',
  debugPanelClose: '收起诊断面板',
  debugGuide: '流式输出时一次只调一个参数，观察帧率、积压和视觉滞后。',
  debugLive: '正在流式输出',
  debugIdle: '空闲',
  debugUnsaved: '参数尚未保存',
  debugSave: '保存参数',
  debugDiscard: '放弃修改',
  debugReset: '恢复默认参数',
  debugCopy: '复制诊断数据',
  debugCopied: '已复制',
  debugSectionLive: '实时渲染',
  debugSectionReveal: '流式参数',
  debugSectionFollow: '滚动参数',
  debugFps: '帧率',
  debugFrameTime: '帧耗时',
  debugBacklog: '积压字符',
  debugRevealSpeed: '揭示速度',
  debugProgress: '渲染进度',
  debugFollowState: '跟随状态',
  debugFollowing: '跟随底部',
  debugReleased: '用户已释放',
  debugLag: '视觉滞后',
  debugVelocity: '滚动速度',
  debugReserve: '预留空间',
  debugCapacity: '安全容量',
  debugAppliedScale: '实际倍率',
  debugRevealMultiplier: '揭示倍率',
  debugQueuePressure: '队列压力',
  debugMaxReveal: '最大揭示速度',
  debugSpringStiffness: '弹簧刚度',
  debugSpringDamping: '弹簧阻尼',
  debugSpringMass: '弹簧质量',
  debugRunway: '预测预留空间',
  debugReserveResponse: '预留响应时间',
  debugBackpressureMin: '最小背压倍率',
  debugTipRevealMultiplier: '整体文字揭示速度倍率。调大能更快清空积压。',
  debugTipQueuePressure: '积压对加速的影响强度。调大能更积极追赶。',
  debugTipMaxReveal: '每秒揭示字符数上限。',
  debugTipSpringStiffness: '滚动弹簧刚度。调大更快收拢视觉滞后。',
  debugTipSpringDamping: '滚动能量阻尼。调大能抑制过冲和抖动。',
  debugTipSpringMass: '滚动惯性。调大移动更慢更沉。',
  debugTipRunway: '内容增长时预留的预测空白。',
  debugTipReserveResponse: '预留空间打开或关闭的响应时间。',
  debugTipBackpressureMin: '滚动压力下允许的最低揭示倍率。',
  readOnly: '本部署的设置为只读。',
  loading: '正在加载丝滑流式设置…',
  unavailable: '当前连接无法访问设置。',
  retry: '重试',
  version: '版本 {version}',
  developmentVersion: '开发版本 {version}',
  updates: '更新',
  updateHint: '安装最新版本后重启。',
  developmentBuild: '当前为本地链接版本，请在源码目录管理更新。',
  updateUnavailable: '只有 npm 安装时才能更新。',
  update: '更新',
  updating: '更新中…',
  restartRequired: '已更新；重启后加载新版本。',
  updateFailed: '更新失败，当前版本未改变。',
  save: '保存',
  saving: '保存中…',
  discard: '放弃修改',
  unsaved: '未保存',
  saveFailed: '本部署没有接受这些值。',
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'settings.smoothStream': SmoothStreamLocaleKey
  }
}
