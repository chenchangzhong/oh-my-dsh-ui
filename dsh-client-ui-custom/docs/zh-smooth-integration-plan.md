# 基座集成方案：dsh-client-ui-custom 扩展 zh / smooth Feature

> 目标：为 `dsh-client-ui-custom` 基座新增 `zh`（中文优化）和 `smooth`（流畅增强）两个独立 feature。
> 宿主路径：`/Users/zhong/project/dsh-plugins/ui-custom/dsh-client-ui-custom`

---

## 1. 共享类型变更 (src/shared.ts)

### 1.1 FEATURES 数组扩展

**位置**：第 16 行

```diff
- export const FEATURES = ['markdown', 'appearance', 'usage', 'motion'] as const
+ export const FEATURES = ['markdown', 'appearance', 'usage', 'motion', 'zh', 'smooth'] as const
```

---

### 1.2 新增 ZhSection 接口

在 `MotionPreset` 定义之后、`UiCustomSection` 之前插入：

```typescript
/**
 * 中文优化（zh）feature 的运行时配置字段。
 * 所有字段均有合理默认值，安装插件不改变既有行为。
 */
export interface ZhSection {
  /** 开启 zh feature 总开关（默认 true）。 */
  zhEnabled?: boolean
  /** 启用完整中文优化：完整统计面板 + 高级思考折叠（默认 false）。 */
  zhComplete?: boolean
  /** 启用完整用量统计（默认 false）——默认只显示简化版。 */
  statsFull?: boolean
  /** 自动折叠 AI 思考过程（默认 true）。与 smoothAutoCollapse 互斥，由 resolveThinkingOwner 统一决策。 */
  thinkingAuto?: boolean
  /** thinkingAuto 开启时，折叠区域最大行数（默认 5）。 */
  thinkMaxLines?: number
  /** 聊天区域宽度模式：'normal' | 'wide' | 'fullwidth'（默认 'normal'）。 */
  chatWidth?: 'normal' | 'wide' | 'fullwidth'
  /** 启用自定义中文提示词模板（默认 false）。 */
  zhPrompt?: boolean
  /** 提示词模板内容（zhPrompt 开启时生效）。 */
  zhPromptText?: string
  /** 提示词模板应用目标：'system' | 'context'（默认 'system'）。 */
  zhPromptTarget?: 'system' | 'context'
  /** 自动归档天数（默认 30，0 = 禁用）。 */
  zhAutoArchiveDays?: number
  /** Agent 级别提示词追加内容（默认 ''）。 */
  zhAgentPrompt?: string
  /** 工具描述中文化开关（默认 false）。 */
  zhToolDesc?: boolean
}
```

---

### 1.3 新增 SmoothSection 接口

在 `ZhSection` 之后插入：

```typescript
/**
 * 流畅增强（smooth）feature 的运行时配置字段。
 * 所有字段均有合理默认值，安装插件不改变既有行为。
 */
export interface SmoothSection {
  /** 开启 smooth feature 总开关（默认 true）。 */
  smoothEnabled?: boolean
  /** 预设模式：'none' | 'subtle' | 'aggressive'（默认 'none'）。 */
  smoothPreset?: 'none' | 'subtle' | 'aggressive'
  /** 思考过程自动展开（默认 false）。与 thinkingAuto 互斥，由 resolveThinkingOwner 统一决策。 */
  smoothThinkAutoExpand?: boolean
  /** 思考过程自动折叠（默认 true）。与 thinkingAuto 互斥，由 resolveThinkingOwner 统一决策。 */
  smoothAutoCollapse?: boolean
  /** 开启调试信息覆盖层（默认 false）。 */
  smoothDebugEnabled?: boolean
}
```

---

### 1.4 UiCustomSection extends 扩展

**位置**：第 255 行附近

```diff
- export interface UiCustomSection extends ThemeSection {
+ export interface UiCustomSection extends ThemeSection, ZhSection, SmoothSection {
```

---

## 2. Host 注册层变更 (src/index.ts)

### 2.1 UiCustomSectionSchema 扩展

**位置**：第 17–52 行（`UiCustomSectionSchema = z.object({...})`）

在 `features: z.array(...)` 之后、`})` 之前追加：

```typescript
  // ── zh feature 字段 ────────────────────────────────────────────────
  zhEnabled: z.boolean().default(true),
  zhComplete: z.boolean().default(false),
  statsFull: z.boolean().default(false),
  thinkingAuto: z.boolean().default(true),
  thinkMaxLines: z.number().default(5),
  chatWidth: z.union(['normal', 'wide', 'fullwidth']).default('normal'),
  zhPrompt: z.boolean().default(false),
  zhPromptText: z.string().default(''),
  zhPromptTarget: z.union(['system', 'context']).default('system'),
  zhAutoArchiveDays: z.number().default(30),
  zhAgentPrompt: z.string().default(''),
  zhToolDesc: z.boolean().default(false),
  // ── smooth feature 字段 ─────────────────────────────────────────────
  smoothEnabled: z.boolean().default(true),
  smoothPreset: z.union(['none', 'subtle', 'aggressive']).default('none'),
  smoothThinkAutoExpand: z.boolean().default(false),
  smoothAutoCollapse: z.boolean().default(true),
  smoothDebugEnabled: z.boolean().default(false),
```

---

### 2.2 UiCustomConfig 接口扩展

**位置**：第 54–79 行（`interface UiCustomConfig extends Partial<ThemeSection>`）

在 `settingsMotionEnabled?: boolean` 之后追加：

```typescript
  // ── zh feature ─────────────────────────────────────────────────────
  zhEnabled?: boolean
  zhComplete?: boolean
  statsFull?: boolean
  thinkingAuto?: boolean
  thinkMaxLines?: number
  chatWidth?: 'normal' | 'wide' | 'fullwidth'
  zhPrompt?: boolean
  zhPromptText?: string
  zhPromptTarget?: 'system' | 'context'
  zhAutoArchiveDays?: number
  zhAgentPrompt?: string
  zhToolDesc?: boolean
  // ── smooth feature ─────────────────────────────────────────────────
  smoothEnabled?: boolean
  smoothPreset?: 'none' | 'subtle' | 'aggressive'
  smoothThinkAutoExpand?: boolean
  smoothAutoCollapse?: boolean
  smoothDebugEnabled?: boolean
```

---

### 2.3 apply().base 对象扩展

**位置**：第 92–124 行（`base: { ... }` 对象）

在 `features: config?.features ? [...config.features] : [],` 之后追加：

```typescript
        // ── zh feature base ──────────────────────────────────────────
        zhEnabled: config?.zhEnabled ?? true,
        zhComplete: config?.zhComplete ?? false,
        statsFull: config?.statsFull ?? false,
        thinkingAuto: config?.thinkingAuto ?? true,
        thinkMaxLines: config?.thinkMaxLines ?? 5,
        chatWidth: (config?.chatWidth === 'wide' || config?.chatWidth === 'fullwidth')
          ? config.chatWidth : 'normal',
        zhPrompt: config?.zhPrompt ?? false,
        zhPromptText: config?.zhPromptText ?? '',
        zhPromptTarget: config?.zhPromptTarget === 'context' ? 'context' : 'system',
        zhAutoArchiveDays: typeof config?.zhAutoArchiveDays === 'number' ? config.zhAutoArchiveDays : 30,
        zhAgentPrompt: config?.zhAgentPrompt ?? '',
        zhToolDesc: config?.zhToolDesc ?? false,
        // ── smooth feature base ───────────────────────────────────────
        smoothEnabled: config?.smoothEnabled ?? true,
        smoothPreset: (config?.smoothPreset === 'subtle' || config?.smoothPreset === 'aggressive')
          ? config.smoothPreset : 'none',
        smoothThinkAutoExpand: config?.smoothThinkAutoExpand ?? false,
        smoothAutoCollapse: config?.smoothAutoCollapse ?? true,
        smoothDebugEnabled: config?.smoothDebugEnabled ?? false,
```

---

## 3. Client Config 层变更 (src/client/config.ts)

### 3.1 CustomThemeConfig 接口扩展

**位置**：第 14–63 行

在 `features?: readonly PluginFeature[]` 之后追加：

```typescript
  // ── zh feature ─────────────────────────────────────────────────────
  zhEnabled: boolean
  zhComplete: boolean
  statsFull: boolean
  thinkingAuto: boolean
  thinkMaxLines: number
  chatWidth: 'normal' | 'wide' | 'fullwidth'
  zhPrompt: boolean
  zhPromptText: string
  zhPromptTarget: 'system' | 'context'
  zhAutoArchiveDays: number
  zhAgentPrompt: string
  zhToolDesc: boolean
  // ── smooth feature ─────────────────────────────────────────────────
  smoothEnabled: boolean
  smoothPreset: 'none' | 'subtle' | 'aggressive'
  smoothThinkAutoExpand: boolean
  smoothAutoCollapse: boolean
  smoothDebugEnabled: boolean
```

---

### 3.2 DEFAULTS 扩展

**位置**：第 94–113 行

在 `customVars: {},` 之后追加：

```typescript
  // ── zh feature ─────────────────────────────────────────────────────
  zhEnabled: true,
  zhComplete: false,
  statsFull: false,
  thinkingAuto: true,
  thinkMaxLines: 5,
  chatWidth: 'normal' as const,
  zhPrompt: false,
  zhPromptText: '',
  zhPromptTarget: 'system' as const,
  zhAutoArchiveDays: 30,
  zhAgentPrompt: '',
  zhToolDesc: false,
  // ── smooth feature ─────────────────────────────────────────────────
  smoothEnabled: true,
  smoothPreset: 'none' as const,
  smoothThinkAutoExpand: false,
  smoothAutoCollapse: true,
  smoothDebugEnabled: false,
```

---

### 3.3 normalizeConfig 扩展

**位置**：第 161–193 行

在 `customVars: toVars(merged.customVars),` 之后、`})` 之前追加：

```typescript
    // ── zh feature ─────────────────────────────────────────────────────
    zhEnabled: toBoolean(merged.zhEnabled, DEFAULTS.zhEnabled),
    zhComplete: toBoolean(merged.zhComplete, DEFAULTS.zhComplete),
    statsFull: toBoolean(merged.statsFull, DEFAULTS.statsFull),
    thinkingAuto: toBoolean(merged.thinkingAuto, DEFAULTS.thinkingAuto),
    thinkMaxLines: clampNumber(merged.thinkMaxLines, 1, 50, DEFAULTS.thinkMaxLines),
    chatWidth: isOneOf(merged.chatWidth, ['normal', 'wide', 'fullwidth'], DEFAULTS.chatWidth),
    zhPrompt: toBoolean(merged.zhPrompt, DEFAULTS.zhPrompt),
    zhPromptText: cleanString(merged.zhPromptText, DEFAULTS.zhPromptText),
    zhPromptTarget: isOneOf(merged.zhPromptTarget, ['system', 'context'], DEFAULTS.zhPromptTarget),
    zhAutoArchiveDays: clampNumber(merged.zhAutoArchiveDays, 0, 365, DEFAULTS.zhAutoArchiveDays),
    zhAgentPrompt: cleanString(merged.zhAgentPrompt, DEFAULTS.zhAgentPrompt),
    zhToolDesc: toBoolean(merged.zhToolDesc, DEFAULTS.zhToolDesc),
    // ── smooth feature ─────────────────────────────────────────────────
    smoothEnabled: toBoolean(merged.smoothEnabled, DEFAULTS.smoothEnabled),
    smoothPreset: isOneOf(merged.smoothPreset, ['none', 'subtle', 'aggressive'], DEFAULTS.smoothPreset),
    smoothThinkAutoExpand: toBoolean(merged.smoothThinkAutoExpand, DEFAULTS.smoothThinkAutoExpand),
    smoothAutoCollapse: toBoolean(merged.smoothAutoCollapse, DEFAULTS.smoothAutoCollapse),
    smoothDebugEnabled: toBoolean(merged.smoothDebugEnabled, DEFAULTS.smoothDebugEnabled),
```

---

### 3.4 CONFIG_KEYS 扩展

**位置**：第 196–202 行

```diff
export const CONFIG_KEYS: readonly (keyof CustomThemeConfig)[] = [
  'preset', 'accent', 'autoAccent',
  'surfaceOpacity', 'sidebarOpacity', 'chatSurfaceOpacity', 'inputOpacity',
  'codeBlockOpacity', 'darkSurfaceOpacity',
  'fontFamily', 'codeFontFamily', 'fontScale', 'scrollbarAccent', 'cornerRadius', 'surfaceShadow',
  'focusGlow', 'darkAccent', 'customCss', 'customVars',
+ // zh feature
+ 'zhEnabled', 'zhComplete', 'statsFull', 'thinkingAuto', 'thinkMaxLines', 'chatWidth',
+ 'zhPrompt', 'zhPromptText', 'zhPromptTarget', 'zhAutoArchiveDays', 'zhAgentPrompt', 'zhToolDesc',
+ // smooth feature
+ 'smoothEnabled', 'smoothPreset', 'smoothThinkAutoExpand', 'smoothAutoCollapse', 'smoothDebugEnabled',
]
```

---

## 4. Client 注册层变更 (src/client/index.ts)

### 4.1 新增 thinkingOwner 决策函数

在文件顶部 `import` 区之后、`inject` 声明之前，添加：

```typescript
/**
 * 思考折叠/展开的最终决策 owner。
 * zh 的 thinkingAuto 与 smooth 的 smoothAutoCollapse / smoothThinkAutoExpand 互斥：
 * - 若 zh enabled：thinkingAuto 生效（thinkingAuto=true → 折叠，=false → 展开）
 * - 若 smooth enabled 且 zh disabled：smoothAutoCollapse 生效（=true → 折叠，=false → 展开）
 * - 若两者均 enabled：zh 优先（smooth 的设置被 zh 覆盖）
 * - 若两者均 disabled：默认展开（stock 行为）
 *
 * @param snapshot - 已归一化的 CustomThemeConfig
 * @returns 'collapse' | 'expand' | 'auto'（auto 由各 feature 的子逻辑二次决策）
 */
export function resolveThinkingOwner(snapshot: CustomThemeConfig): 'collapse' | 'expand' | 'auto' {
  const zhEnabled = snapshot.zhEnabled
  const smoothEnabled = snapshot.smoothEnabled

  if (zhEnabled) {
    // zh 拥有决策权：thinkingAuto=true → collapse，false → expand
    return snapshot.thinkingAuto ? 'collapse' : 'expand'
  }

  if (smoothEnabled) {
    // smooth 拥有决策权（zh 未启用时）
    if (snapshot.smoothThinkAutoExpand) return 'expand'
    if (snapshot.smoothAutoCollapse) return 'collapse'
  }

  // 均未启用或均为默认：默认展开（stock）
  return 'expand'
}
```

---

### 4.2 inject 声明扩展

**位置**：第 65 行

```diff
- export const inject = ['slots', 'locale', 'connection', 'sessions', 'workspaces', 'settingsScope', 'remote', 'remote.pluginInventory']
+ export const inject = ['slots', 'locale', 'connection', 'sessions', 'workspaces', 'settingsScope', 'remote', 'remote.pluginInventory', 'uiConversation']
```

（注：`uiConversation` 为示例，实际 slot 名需根据 dsh-client-ui-conversation 的 SlotMap 确认。）

---

### 4.3 registerFeatures 内 enabled('zh') 分支

在 `// ── 动效：settings section ...` 分支之后（第 405 行附近）追加：

```typescript
  // ── 中文优化（zh）：settings section + locale + 思考折叠 owner ─────
  if (enabled('zh')) {
    // locale 注册（与 motion 等 feature 模式一致）
    ctx.effect(
      () => ctx.locale.register(ZH_NS, { zh: zhZh, en: zhEn }),
      'ui-custom: zh dictionaries',
    )
    const zhT = ctx.locale.bind(ZH_NS)

    // 设置区段注册
    ctx.slots.inject('settings.section', () => ctx.slots.register({
      name: 'settings.section',
      id: 'zh',
      order: 35,
      label: () => zhT('nav'),
      locale: ZH_NS,
      inject: (): ZhSectionInjected => ({
        hooks: { zh: scope },
        setZhEnabled: (value) => { void scope.set('zhEnabled', value) },
        setZhComplete: (value) => { void scope.set('zhComplete', value) },
        setStatsFull: (value) => { void scope.set('statsFull', value) },
        setThinkingAuto: (value) => { void scope.set('thinkingAuto', value) },
        setThinkMaxLines: (value) => { void scope.set('thinkMaxLines', value) },
        setChatWidth: (value) => { void scope.set('chatWidth', value) },
        setZhPrompt: (value) => { void scope.set('zhPrompt', value) },
        setZhPromptText: (value) => { void scope.set('zhPromptText', value) },
        setZhPromptTarget: (value) => { void scope.set('zhPromptTarget', value) },
        setZhAutoArchiveDays: (value) => { void scope.set('zhAutoArchiveDays', value) },
        setZhAgentPrompt: (value) => { void scope.set('zhAgentPrompt', value) },
        setZhToolDesc: (value) => { void scope.set('zhToolDesc', value) },
        resolveThinkingOwner,
      }),
    }, ZhSection))

    // 思考折叠 effect：注入到 conversation.chat.thinking slot
    // 当 resolveThinkingOwner 返回 'collapse' 时，注入折叠行为
    ctx.effect(() => {
      const snapshot = scope.getSnapshot()
      if (snapshot.status !== 'ready' || snapshot.value === undefined) return
      const normalized = normalizeConfig(snapshot.value, undefined)
      const decision = resolveThinkingOwner(normalized)
      // 通知 conversation engine（通过 slot 或 ctx.effect 广播）
      document.documentElement.dataset.dsuThinkingMode = decision
    }, 'ui-custom: zh thinking mode sync')
    ctx.effect(() => scope.subscribe(() => {
      const snapshot = scope.getSnapshot()
      if (snapshot.status !== 'ready' || snapshot.value === undefined) return
      const normalized = normalizeConfig(snapshot.value, undefined)
      const decision = resolveThinkingOwner(normalized)
      document.documentElement.dataset.dsuThinkingMode = decision
    }), 'ui-custom: zh thinking mode watcher')
  }
```

---

### 4.4 registerFeatures 内 enabled('smooth') 分支

在 enabled('zh') 分支之后追加：

```typescript
  // ── 流畅增强（smooth）：settings section + locale + 思考展开 owner ──
  if (enabled('smooth')) {
    ctx.effect(
      () => ctx.locale.register(SMOOTH_NS, { zh: smoothZh, en: smoothEn }),
      'ui-custom: smooth dictionaries',
    )
    const smoothT = ctx.locale.bind(SMOOTH_NS)

    ctx.slots.inject('settings.section', () => ctx.slots.register({
      name: 'settings.section',
      id: 'smooth',
      order: 36,
      label: () => smoothT('nav'),
      locale: SMOOTH_NS,
      inject: (): SmoothSectionInjected => ({
        hooks: { smooth: scope },
        setSmoothEnabled: (value) => { void scope.set('smoothEnabled', value) },
        setSmoothPreset: (value) => { void scope.set('smoothPreset', value) },
        setSmoothThinkAutoExpand: (value) => { void scope.set('smoothThinkAutoExpand', value) },
        setSmoothAutoCollapse: (value) => { void scope.set('smoothAutoCollapse', value) },
        setSmoothDebugEnabled: (value) => { void scope.set('smoothDebugEnabled', value) },
        resolveThinkingOwner,
      }),
    }, SmoothSection))

    // smoothDebugEnabled overlay：注入调试信息浮层
    ctx.effect(() => {
      const snapshot = scope.getSnapshot()
      if (snapshot.status !== 'ready' || snapshot.value === undefined) return
      const normalized = normalizeConfig(snapshot.value, undefined)
      if (normalized.smoothDebugEnabled) {
        // 挂载调试浮层（需与 smooth-port 协同确定 slot 名）
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'ui-custom-smooth-debug',
          order: 110,
          locale: SMOOTH_NS,
          inject: (): SmoothDebugInjected => ({
            hooks: { smooth: scope },
          }),
        }, SmoothDebugOverlay))
      }
    }, 'ui-custom: smooth debug overlay mount')

    // 思考展开 effect（当 smooth 为 owner 时生效）
    ctx.effect(() => {
      const snapshot = scope.getSnapshot()
      if (snapshot.status !== 'ready' || snapshot.value === undefined) return
      const normalized = normalizeConfig(snapshot.value, undefined)
      // 只有当 zh 未启用时，smooth 才负责思考决策
      if (normalized.zhEnabled) return
      const decision = resolveThinkingOwner(normalized)
      document.documentElement.dataset.dsuThinkingMode = decision
    }, 'ui-custom: smooth thinking mode sync')
  }
```

---

## 5. 关键冲突解决：resolveThinkingOwner

### 5.1 问题背景

`zh` feature 有 `thinkingAuto` 字段（true = 自动折叠），而 `smooth` feature 有 `smoothAutoCollapse`（true = 自动折叠）和 `smoothThinkAutoExpand`（true = 强制展开）。两者同时启用时会产生冲突。

### 5.2 解决方案

参考既有 `resolveFeatures` 的设计模式，引入 `resolveThinkingOwner` 函数作为统一决策层：

| zh enabled | smooth enabled | 实际决策 |
|-----------|---------------|---------|
| ✓ | - | `thinkingAuto` → collapse/expand |
| - | ✓ | `smoothAutoCollapse` / `smoothThinkAutoExpand` → collapse/expand/auto |
| ✓ | ✓ | **zh 优先**，`smooth` 的相关字段被覆盖 |
| - | - | 默认展开（stock 行为） |

### 5.3 实现要点

- `resolveThinkingOwner` 位于 `src/client/index.ts` 顶层，纯函数，无 DOM 依赖
- 返回值类型为 `'collapse' | 'expand' | 'auto'`，注入为 `data-dsu-thinking-mode` 属性
- conversation engine 通过监听该属性决定折叠/展开行为（由 `migrate-zh` / `migrate-smooth` 在对话引擎侧实现）
- `auto` 模式允许各子场景（代码块、长回复等）按需二次决策

---

## 6. 新增文件清单（需由对应 feature-port 工程师实现）

以下文件由 `migrate-zh` 和 `migrate-smooth` 工程师在 `src/client/` 下创建，基座仅声明 import 占位：

```
src/client/zh/
  zh-locales.ts          # ZH_NS + zh/en 字典 + LocaleNamespaceMap 扩展
  ZhSection.tsx          # 中文优化设置区段组件
  ZhSection.module.css   # 区段样式
  contract.ts            # ZhSectionInjected 等注入接口

src/client/smooth/
  smooth-locales.ts       # SMOOTH_NS + zh/en 字典 + LocaleNamespaceMap 扩展
  SmoothSection.tsx       # 流畅增强设置区段组件
  SmoothSection.module.css
  SmoothDebugOverlay.tsx  # 调试浮层（smoothDebugEnabled 时注入）
  contract.ts             # SmoothSectionInjected 等注入接口
```

基座 `index.ts` 顶部的 import 如下（占位，实际路径以 feature-port 实现为准）：

```typescript
import { ZH_NS, zh as zhZh, en as zhEn } from './zh/zh-locales.ts'
import { ZhSection, type ZhSectionInjected } from './zh/ZhSection.tsx'
import { SMOOTH_NS, zh as smoothZh, en as smoothEn } from './smooth/smooth-locales.ts'
import { SmoothSection, type SmoothSectionInjected } from './smooth/SmoothSection.tsx'
import { SmoothDebugOverlay, type SmoothDebugInjected } from './smooth/SmoothDebugOverlay.tsx'
```

---

## 7. 完整 Diff 摘要

| 文件 | 变更类型 | 变更量 |
|------|---------|-------|
| `src/shared.ts` | 修改 + 新增接口 | +3 行（FEATURES）+ ~40 行（ZhSection + SmoothSection 接口）+ 1 行（extends 追加） |
| `src/index.ts` | 修改 | +~25 行（schema 字段）+ ~20 行（UiCustomConfig）+ ~20 行（apply base） |
| `src/client/config.ts` | 修改 | +~25 行（CustomThemeConfig）+ ~15 行（DEFAULTS）+ ~20 行（normalizeConfig）+ ~3 行（CONFIG_KEYS） |
| `src/client/index.ts` | 修改 + 新增函数 | +~60 行（resolveThinkingOwner）+ ~50 行（enabled('zh') 分支）+ ~50 行（enabled('smooth') 分支）+ import 占位 |

---

## 8. 兼容性注意事项

1. **向后兼容**：所有新字段均有默认值，`zhEnabled` / `smoothEnabled` 默认为 `true`，但 feature whitelist 机制确保未显式启用时不挂载 DOM
2. **settings 兼容性**：`apply().base` 保证了 host 注册的默认值与 client 归一化一致
3. **与 motion 的思考折叠区分**：motion 的 `motionEnabled` 控制入场动效，与 `thinkingAuto` 无关；思考折叠由 `resolveThinkingOwner` 统一管辖
4. **loader config 渗透**：feature whitelist 通过 settings scope 的 `features` 字段传递，不影响 `CustomThemeConfig` 的 features 字段（后者是 theme 层）
