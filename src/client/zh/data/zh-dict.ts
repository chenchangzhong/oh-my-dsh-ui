// 整句覆盖（命名空间 -> 键 -> 全中文值）。
// 仅保留「必须改写整句」的键；能只换个别词的键一律放 ZH_PARTIAL。
const ZH = {
  // DSH 0.1.2 起重试倒计时位于 chat 命名空间（已迁移自 conversation）。
  chat: {
    'message.retry.status': '{label}（{retry}/{maximum}） · {seconds}秒',
  },
  command: {
    // 0.1.5 起斜杠命令描述走 command 命名空间（ui-commands），上游 zh 已
    // 本地化（description.xxx）；此处保留本插件的既定叫法，按键级覆盖。
    'description.compact': '压缩较早的对话历史',
    'description.export': '将会话日志下载为 ZIP 压缩包',
    'description.feedback': '记录对本会话的反馈',
    'description.goal': '设置或查看长期任务的目标',
    'description.permission': '切换权限预设（沙箱模式 + 审批策略）',
    // description.plan 与上游「进入或退出计划模式」叫法一致，无需覆盖。
  },
  model: {
    retry: '重试',
  },
  trajectory: {
    // 0.1.5 轨迹视图完全词典化（trajectory 命名空间），但 zh 值仍夹带英文
    // 残留（Round/token/tok/tok-s/Schema）。整句覆盖只处理无法用术语替换
    // 修正的键，其余走 ZH_PARTIAL。
    // source.goalRound 上游 zh 为「目标 · Round {round}」：术语替换无法重排
    // 语序，整句覆盖为「目标 · 第 {round} 轮」。
    'source.goalRound': '目标 · 第 {round} 轮',
  },
  cordis: {
    // 上游 zh 词典漏翻：Cordis 面板按钮标题与运行数量。
    'panel.trigger': 'Cordis 插件',
    'panel.runningCount': '{count} 个运行中',
  },
  'settings.agentPreset': {
    // 用户自定义叫法：上游官方名为「PTC 模式」，按既定要求改称「程序模式」；
    // 描述中的「PTC 模式 SDK」同步译作「程序模式开发包」。整句覆盖，不随上游措辞变化。
    presetPtcName: '程序模式',
    presetPtcDescription: '具备标准模式的全部能力，并通过程序模式开发包呈现工具，让模型用一个 TypeScript 程序组合多步操作。',
  },
  '*': {
    retry: '重试', submit: '提交', submitting: '正在提交', save: '保存', cancel: '取消',
    close: '关闭', copy: '复制', copied: '复制成功', delete: '删除', edit: '编辑',
    open: '打开', search: '搜索', settings: '设置', none: '无', unknown: '未知',
    done: '已完成', failed: '失败', running: '运行中', stopped: '已停止',
    completed: '已完成', pending: '待处理', idle: '空闲', error: '错误', ok: '确定',
    back: '返回', next: '下一步', previous: '上一步', more: '更多', expand: '展开',
    collapse: '收起', truncated: '已截断', loading: '加载中', 'load.failed': '加载失败',
    empty: '空', warning: '警告', success: '成功', confirm: '确认', apply: '应用',
    reset: '重置', remove: '移除', add: '添加', rename: '重命名', refresh: '刷新',
    reload: '重新加载', view: '查看', preview: '预览', details: '详情', status: '状态',
    options: '选项', general: '通用设置', language: '语言', appearance: '外观',
  },
}

// 部分翻译（命名空间 -> 键 -> 术语名列表）。
// 命中时先取上游词典原值，只替换引用的术语，其余部分随上游更新自动变化；
// 上游改词后未命中的片段原样保留 —— 正是「跟随上游」而不是整句覆盖。
// 条目可以是术语名（查 TERMS），也可以是 [原文, 译文] 字面对（仅此键使用）。
const ZH_PARTIAL = {
  // DSH 0.1.2 起 stats/message 键由 conversation 迁至 chat。
  chat: {
    'stats.llm': ['llm'],
    'stats.ttftAverage': ['token'],
    'stats.tokensPerSecond': ['tokPerSec'],
    'stats.tokens': ['tok'],
    'message.compaction.completed': ['token'],
    'message.unknownSurface': ['surface'],
    'message.maxTokens': ['token'],
    'message.ttft': ['token'],
    'message.tokensPerSecond': ['tokPerSec'],
    // 上游 0.1.2-alpha.2 起回答末尾的用量/耗时统计（TurnUsagePanel）与轮次
    // 过程摘要行，模板仍夹带英文单元（{count} tok / 首 token 用时 / subagent）。
    'message.turnUsage.count': ['tok'],
    'message.turnTime.ttft': ['token'],
    'message.turnProcess.subagents.one': ['subagent'],
    'message.turnProcess.subagents.other': ['subagent'],
    // 0.1.5 StatsPills 统计对话框（stats.dialog.*）：zh 值仍夹带英文。
    'stats.dialog.usageTitle': [['Token', '词元']],
    'stats.dialog.ttft': ['token'],
  },
  conversation: {
    'access.confirm.title': ['fullAccess'],
    'access.confirm.description': ['fullAccess', 'agent'],
    'access.confirm.enable': ['fullAccess'],
  },
  trajectory: {
    // 该命名空间 zh 词典整体还是英文，按整条短语替换；上游补齐 zh 后这些术语自然不再命中。
    'toolbar.duration': ['trajDuration'],
    'toolbar.useActualDuration': ['trajUseActualDuration'],
    'toolbar.useEqualWidth': ['trajUseEqualWidth'],
    'toolbar.turns': ['trajTurns'],
    'toolbar.expandTurns': ['trajExpandTurns'],
    'toolbar.collapseTurns': ['trajCollapseTurns'],
    'toolbar.calls': ['trajCalls'],
    'toolbar.expandCalls': ['trajExpandCalls'],
    'toolbar.collapseCalls': ['trajCollapseCalls'],
    // 0.1.5 轨迹视图词典化后 zh 值仍夹带英文残留，术语层修正：
    'unit.tokens': ['tok'],
    'unit.tokensPerSecond': ['tokPerSec'],
    'usage.tokens': [['Token', '词元']],
    'tab.schema': [['Schema', '模式']],
    'record.schemaUnavailable': [['Schema', '模式']],
    'timing.firstTokenUnavailable': ['token'],
    'timing.outputTokensUnavailable': ['token'],
    'timing.ttft': ['token'],
    'timeline.ttftDecoding': ['token'],
  },
  'settings.models': {
    intro: ['api'],
    deleteDescriptionWithCredential: ['api'],
    credentialConfigured: ['api'],
    credentialMissing: ['api'],
    keyInput: ['api'],
    keyPlaceholder: ['api'],
    keyPlaceholderNative: ['api'],
    keyBlank: ['api'],
    keyBlankNew: ['api'],
    keyIllegalCharacters: ['api'],
    baseUrl: ['api'],
    modelId: ['modelId'],
    modelNamePlaceholder: ['modelId'],
    maxTokens: ['token'],
    modelsEmpty: ['modelId'],
    modelIdRequired: ['modelId'],
    modelIdDuplicate: ['modelId'],
    modelDuplicate: ['modelId'],
    modelMaxTokens: ['token'],
    fetchNeedsBaseUrl: ['api'],
    customRoute: ['providerId'],
    customRouteTaken: ['modelId'],
    customApi: ['api'],
    customNeedsBaseUrl: ['api'],
    onboardingTitle: ['apiKey'],
    keyRequired: ['api'],
  },
  'settings.plugins': {
    bashDescription: ['agent'],
    agentLoopTitle: ['agentLabel'],
    agentLoopDescription: ['agentLabel'],
    webSearchApiKey: ['apiKey'],
    // 上游 0.1.2-rc.1 新增的子代理模型选择卡：zh 模板仍夹带 Agent/Subagent。
    subagentModelSelectionTitle: ['subagent'],
    subagentModelSelectionDescription: ['subagent', 'agentLabel'],
    subagentModelSelectionToggle: ['subagent', 'agentLabel'],
    subagentModelSelectionChoose: ['subagent', 'agentLabel'],
    subagentModelSelectionAllowed: ['agentLabel'],
    subagentModelSelectionOff: ['subagent', 'agentLabel'],
  },
  'settings.agentPreset': {
    title: ['agentLabel'],
    error: ['agentLabel'],
    seatHint: ['agentLabel'],
    headerHint: ['agentLabel'],
    nav: ['agentLabel'],
    sectionIntro: ['agentLabel'],
    presetStandardDescription: ['agentLabel', 'shell', 'skills'],
    presetCodeName: ['ptc'],
    presetCodeDescription: ['codeModeSdk'],
    // 0.1.5 minimal 描述为「仅提供持久 shell 的单工具编码 Agent.」，已不含
    // bash / str_replace_editor 字面量，仅 Agent 术语仍生效。
    presetMinimalDescription: ['agentLabel'],
    presetCordisDescription: ['agentLabel', 'preset'],
  },
  'settings.permission': {
    'confirm.title': ['fullAccess'],
    'confirm.description': ['fullAccess'],
    'confirm.enable': ['fullAccess'],
  },
  'permission.access': {
    'confirm.title': ['fullAccess'],
    'confirm.description': ['fullAccess', 'agent'],
    'confirm.enable': ['fullAccess'],
  },
  plan: {
    'chip.on.aria': ['planMode'],
    'chip.on.title': ['planMode'],
    'chip.off.aria': ['planMode'],
    'chip.off.title': ['planMode'],
  },
  skill: {
    'row.running': ['skill'],
    'row.failed': ['skill'],
    'row.stopped': ['skill'],
  },
  model: {
    'effort.providerDefault': ['defaultLabel'],
  },
  'settings.pluginInventory': {
    cordis: ['cordisStatus'],
    // 上游 0.1.2-rc.1 插件清单面板：预设切换与按会话提供说明仍夹带 Agent。
    switcherLabel: ['agentLabel'],
    presetProvidedDetail: ['agentLabel'],
  },
  'session-log-download': {
    // 上游 zh 词典里夹带英文 Session（导出会话 ZIP 的弹窗文案），键级修正。
    'dialog.preparingTitle': ['session'],
    'dialog.preparingDescription': ['session'],
    'dialog.successTitle': ['session'],
    'dialog.successDescription': ['session'],
    'dialog.errorTitle': ['session'],
    'dialog.commandFailed': ['session'],
    // 0.1.5 上游新增的菜单项（下载 Session 日志）仍夹带英文。
    'menu.download': ['session'],
  },
}

export { ZH, ZH_PARTIAL }
