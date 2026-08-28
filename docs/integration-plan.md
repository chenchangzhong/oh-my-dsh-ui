# 整合方案 v2 — 以 `dsh-client-ui-custom` 为宿主，通过 `features` 白名单收编 `zh_pro` + `smooth-stream`

> 宿主：`dsh-client-ui-custom@0.1.0-rc.6` · 收编对象：`deepseek-harness-zh_pro@0.7.0`、`dsh-smooth-stream@0.4.1`
> 决策：不再三包并存，**单包单 patch**（`id: ui-custom`），两插件以新 `Feature` 身份内置，通过 `features` 白名单按需挂载，存量用户平滑迁移。
> 工作区：`/Users/zhong/project/dsh-plugins/ui-custom/dsh-client-ui-custom`

---

## 1. 结论先行

| 问题 | 答案 |
|------|------|
| 以谁为宿主 | `dsh-client-ui-custom`（唯一有 `FEATURES` 白名单 + `settingsScope` + 完整 Host/Client 分层的） |
| 收编形态 | 新增两个 Feature：`zh`（汉化/增强）+ `smooth`（丝滑流式），与现有 7 个 Feature 平级，共 9 个 |
| 是否兼容存量 | 是。宿主 `features: []` 语义为“全开”（向后兼容）；存量 `dsh-zh`/`smooth-stream` 用户迁移时提示卸载旧包 |
| 最小可验证增量 | 仅改 3 个文件（`shared.ts`+`src/index.ts`+`src/client/index.ts`）即可让新 Feature 占位并通过 `features: ['zh']` 单独验证 |

---

## 2. 宿主 `FEATURES` 机制（已验证）

**定义** `src/shared.ts:16`

```ts
export const FEATURES = ['history','markdown','appearance','marketplace','shortcuts','usage','motion'] as const
export type PluginFeature = typeof FEATURES[number]
```

**判定** `src/client/config.ts:278`

```ts
export function resolveFeatures(raw): Set<PluginFeature> {
  if (!Array.isArray(raw?.features) || raw.features.length===0) return new Set([...FEATURES]) // 空=全开
  return new Set(raw.features.filter(id => (FEATURES as readonly string[]).includes(id)))
}
```

**消费** `src/client/index.ts:271` 的 `registerFeatures()` 闭包：

```ts
const features = resolveFeatures(snapshot.value)
const enabled = (f: PluginFeature) => features.has(f)
if (enabled('appearance')) { /* locale + slot */ }
```

- 白名单来源是 **settings scope 快照**（`UI_CUSTOM_SETTINGS_NS='ui-custom'`），非 `apply()` 的 `config` 参数；
- Host 端 `src/index.ts` 将 loader 的 `features` seed 进 `base`，Client 异步订阅后才 `registerFeatures()`；
- `motion` 特殊：引擎在 scope 就绪前就启动，靠闭包内 `resolveFeatures(snapshot.value ?? {})` 动态 gate。

**新增 Feature 的固定触点**（`feature-arch` 已梳理）：

```
shared.ts  FEATURES 数组 + 相应 Section 接口字段
src/index.ts  UiCustomSectionSchema 行 + apply().base seed
src/client/config.ts  CustomThemeConfig 字段 + DEFAULTS + normalizeConfig()
src/client/index.ts  registerFeatures 内：locale + slots + effect
src/client/<feature>/  目录：Section.tsx + locales + controller（可选）
```

---

## 3. 功能映射 — 9 Feature 全景

| Feature | 来源 | 一句话 | 配置去向 |
|---------|------|--------|----------|
| `appearance` | 原生 | 壁纸/毛玻璃/强调色/透明度/字体/质感 | `ThemeSection` |
| `shortcuts` | 原生 | 快捷键全自定义 + composer 重映射 | `ShortcutsSection` |
| `usage` | 原生 | 用量排行/趋势 + 浮层 | 无独立字段 |
| `history` | 原生 | 浮动历史条 + pin | `HistorySection` |
| `markdown` | 原生 | 用户消息 Markdown shadow | `renderUserMarkdown` |
| `marketplace` | 原生 | 插件市场多源聚合 | `marketplaceUrl/discover*` |
| `motion` | 原生 | 入场动效 + 3 预设 | `motionEnabled/*Style` |
| **`zh`** | `zh_pro` 收编 | 界面汉化/统计全显示/思考折叠/对话宽度/归档视图/提示词注入 | 新增 `ZhSection`（见 §4） |
| **`smooth`** | `smooth-stream` 收编 | 打字机揭示 + 弹簧滚动跟随 + 自动折叠 + 调试面板 | 新增 `SmoothSection`（见 §5） |

> 最终 `FEATURES = ['history','markdown','appearance','marketplace','shortcuts','usage','motion','zh','smooth']`

---

## 4. `zh` Feature 详细设计

### 4.1 能力边界（按数据面拆分）

| 能力 | 面 | 能否进宿主 | 落点 |
|------|----|-----------|------|
| `zhComplete` 整句/术语/正则三层翻译 | 纯浏览器 | ✅ | `client/zh/` |
| `statsFull` 统计全显示 | 纯浏览器 | ✅ | `client/zh/` |
| `thinkingAuto`/`thinkMaxLines`/`thinkMode` 思考折叠 | 纯浏览器 | ✅ | `client/zh/`（与 smooth 互斥，见 §6） |
| `chatWidth` 对话宽度 | 纯浏览器 | ✅ | `client/zh/` |
| `archiveView`/`autoArchive` | 浏览器 + `workspaces`/`sessions` API | ✅ | `client/zh/` |
| `deleteSession` 列表菜单 | 浏览器 UI 部分 | ✅ | `client/zh/` |
| `deleteSession` 路由 `/dsh-zh/api/*` + `trash.ts` | **Host** | ✅ 需宿主 Host 扩展 | `src/zh/` |
| `zhPrompt`/`zhAgentPrompt`/`zhToolDesc` 提示词注入 | **Host** `systemPrompt.assemble` + `ctx.on('agent/pre-step')` | ✅ 需宿主 Host 扩展 | `src/zh/` |

> 结论：`zh` 是**双半边 Feature**，Client 归 `src/client/zh/`，Host 归 `src/zh/`，由宿主的同一 `apply()` 分别注册；纯浏览器版可先行上线，Host 能力随后补齐，不阻塞。

### 4.2 目录结构

```
src/
├── index.ts                    # Host 入口扩展（见 §4.3）
├── shared.ts                   # FEATURES + ZhSection/SmoothSection
└── zh/                         # Host 半边（新增）
    ├── index.ts                # applyZhHost(ctx)
    ├── constants.ts            # ZH_SETTINGS_NS / 路由前缀
    ├── chinese-prompt.ts       # systemPrompt 包装
    ├── model-locale.ts
    ├── session-delete.ts
    └── trash.ts

src/client/
├── index.ts                    # registerFeatures 扩展
├── config.ts                   # CustomThemeConfig 扩展
└── zh/                         # Client 半边（新增）
    ├── index.ts                # applyZhFeature(ctx, scope) 入口
    ├── controller.ts           # 可选：ZhSettingsController
    ├── ZhSection.tsx           # 设置页分区（复用 zh_pro 的 settings-section 布局）
    ├── zh-locales.ts           # ZH_SETTINGS_NS 字典
    ├── data/
    │   ├── zh-dict.ts          # ZH / ZH_PARTIAL（原样迁移）
    │   ├── terms.ts            # TERMS
    │   ├── dom-labels.ts       # PERMISSION_NAMES 等
    │   ├── traj-patterns.ts    # TRAJ_PATTERNS
    │   └── settings-dicts.ts   # SETTINGS_ZH/EN
    └── logic/
        ├── dom-enhance.ts      # locale 重写 + MutationObserver（核心，~600 行）
        ├── settings-store.ts   # 兼容层：localStorage → scope 的桥（过渡期保留）
        ├── archive-view.ts
        ├── auto-archive.ts
        ├── session-menu.ts
        ├── prompt-store.ts
        └── format-utils.ts
```

### 4.3 Host 扩展（`src/index.ts`）

```ts
// shared.ts 新增
export interface ZhSection {
  zhComplete?: boolean
  statsFull?: boolean
  chatWidthEnabled?: boolean
  chatWidth?: number
  thinkingAuto?: boolean
  thinkMaxLines?: number
  thinkMaxLinesFrom?: 'latest' | 'earliest'
  thinkMode?: 'button' | 'scroll'
  deleteSessionEnabled?: boolean
  archiveViewEnabled?: boolean
  // Host 字段
  zhPrompt?: boolean
  zhPromptText?: string
  zhPromptTarget?: 'system' | 'user'
  zhAutoArchiveDays?: number
  zhAgentPrompt?: boolean
  zhToolDesc?: boolean
}
export interface UiCustomSection extends ThemeSection, ShortcutsSection, HistorySection, ZhSection, SmoothSection { /*...*/ }

// src/index.ts 新增 schema 行（节选）
zhComplete: z.boolean().default(true),
statsFull: z.boolean().default(true),
thinkingAuto: z.boolean().default(true),
thinkMaxLines: z.number().default(20),
zhPrompt: z.boolean().default(false),
// ...
features: z.array(z.union([...FEATURES])).default([]), // FEATURES 已含 'zh','smooth'
```

### 4.4 Client 挂载（`src/client/index.ts`）

```ts
if (enabled('zh')) {
  ctx.effect(() => ctx.locale.register(ZH_SETTINGS_NS, { zh: zhZh, en: zhEn }), 'zh: dictionaries')
  // zh 的 DOM 增强是 effect，非 slot
  ctx.effect(() => installZhEnhance(ctx, scope), 'zh: dom-enhance')
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section', id: 'zh', order: 15, label: () => t('nav'), locale: ZH_SETTINGS_NS,
    inject: (): ZhInjected => ({ hooks: { zh: scope }, ...zhActions }),
  }, ZhSection))
  // archiveView / session-menu 为 DOM 注入，无独立 slot，挂在 zh effect 内
}
```

### 4.5 设置存储迁移

- `zh_pro` 原用 `localStorage['deepseek-harness-zh_pro:enhancements']`，宿主内**迁移到 `settingsScope`**（`ui-custom` namespace 的 `ZhSection` 字段），`settings-store.ts` 保留为**一次性迁移桥**：首次检测到旧 key 时 `scope.set()` 回写并删除旧 key。
- 避免双写：迁移后 `dom-enhance.ts` 只读 `scope`，不再读写 `localStorage`。

---

## 5. `smooth` Feature 详细设计

### 5.1 与 `zh` 的差异

- `smooth` 原为 **Host+Client 双半边**，但 Host 仅做两件事：`webServer.tapIndex` 注入 `__DSH_SMOOTH_STREAM_CONFIG__` + `settings` RPC；宿主化后 **Host 可简化**：`mode/preset` 等 composition-time 字段可直接进 `SmoothSection` 走 `settingsScope`，不再需要 `tapIndex` 全局桥（`boot-config.ts` 可删除）。
- 若需零延迟首帧，可保留 `tapIndex` 作为可选加速，不强制。

### 5.2 目录结构

```
src/
├── shared.ts                   # SmoothSection
└── smooth/                     # Host 可选（若保留 tapIndex 则在此）
    └── boot-config.ts          # 可选

src/client/
└── smooth/                     # 新增（18 文件，原样迁移后按宿主规范重命名）
    ├── index.ts                # applySmoothFeature(ctx, scope) — slot 注册 + wrap
    ├── TypewriterAssistantNodeView.tsx
    ├── TypewriterToolNodeView.tsx
    ├── useSmoothStreamContent.ts
    ├── teleprompterGlide.ts
    ├── FollowHost.tsx
    ├── auto-collapse-controller.ts  # 与 zh 互斥，见 §6
    ├── AnimatedDisclosure.tsx
    ├── useFpsGuard.ts
    ├── useProgressiveDomText.ts
    ├── SmoothStreamCard.tsx    # 可降级为 settings.section 内的行，不单独成 section
    ├── smooth-stream-card-controller.ts
    ├── DebugPanel.tsx / debugRuntime.ts
    ├── locales.ts
    └── *.module.css
```

### 5.3 配置收敛

```ts
// shared.ts
export interface SmoothSection {
  smoothEnabled?: boolean           // 原 settings.enabled
  smoothPreset?: 'realtime'|'balanced'|'silky'
  smoothThinkAutoExpand?: boolean
  smoothAutoCollapse?: boolean      // 与 zh.thinkingAuto 互斥
  smoothDebugEnabled?: boolean
  smoothDebugTuning?: StreamDebugTuning // 9 个弹簧/揭示参数，可选收敛为 JSON 字符串
}

// host schema 行
smoothEnabled: z.boolean().default(true),
smoothPreset: z.union(['realtime','balanced','silky']).default('balanced'),
smoothThinkAutoExpand: z.boolean().default(true),
smoothAutoCollapse: z.boolean().default(true),
```

### 5.4 Slot 注册

```ts
if (enabled('smooth')) {
  ctx.effect(() => ctx.locale.register(SMOOTH_NS, { zh: smoothZh, en: smoothEn }), 'smooth: dictionaries')
  // assistant-step shadow（priority -100）+ 其余 Agent 行 wrap
  ctx.effect(() => installSmoothSlots(ctx, scope), 'smooth: chat slots')
  // 设置页：复用 settings.section 或 settings.plugin.item，视信息密度而定
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section', id: 'smooth', order: 16, label: () => t('nav'), locale: SMOOTH_NS,
    inject: (): SmoothInjected => ({ hooks: { smooth: scope }, ...smoothActions }),
  }, SmoothSection))
}
```

- `inject` 声明：`smooth` 仅需 `['slots']`，宿主已提供 `['slots','locale','connection','sessions','workspaces','settingsScope',...]` 全覆盖，无需新增。

---

## 6. 冲突治理 — 思考折叠单一 Owner

**现象**：`zh.thinkingAuto`（CSS `max-height` 折叠）与 `smooth.smoothAutoCollapse`（`display:none` + 摘要行）同作用于 `[data-variant="think"]`，双 owner 导致展开后瞬间折叠的抖动。

**治理（宿主内可代码级保证）**：

```ts
// shared.ts 辅助
export function resolveThinkingOwner(section: UiCustomSection): 'zh' | 'smooth' | 'none' {
  const zhOn = section.thinkingAuto ?? true
  const smoothOn = section.smoothAutoCollapse ?? true
  const smoothMounted = resolveFeatures(section).has('smooth')
  if (smoothMounted && smoothOn) return 'smooth' // smooth 优先（流式场景更需要摘要）
  if (zhOn) return 'zh'
  return 'none'
}

// client/zh/logic/dom-enhance.ts 入口
if (resolveThinkingOwner(scope.getSnapshot().value ?? {}) !== 'zh') return // 跳过折叠

// client/smooth/auto-collapse-controller.ts 入口
if (resolveThinkingOwner(scope.getSnapshot().value ?? {}) !== 'smooth') return
```

- UI 层：当 `smooth` 挂载且 `smoothAutoCollapse` 开启时，`zh` 的思考折叠开关在设置页置灰并提示“已由丝滑流式接管”。
- `smoothThinkAutoExpand` 与 `zh.thinkingAuto` 语义重叠，收敛为同一字段 `thinkingAuto` 的视图，`smooth` 不再自持副本。

---

## 7. 触点清单（按文件改动顺序）

| 顺序 | 文件 | 改动 |
|------|------|------|
| 1 | `src/shared.ts` | `FEATURES` 追加 `'zh','smooth'`；新增 `ZhSection`/`SmoothSection` 接口；`UiCustomSection extends` 追加 |
| 2 | `src/index.ts` | `UiCustomSectionSchema` 追加 zh/smooth 字段；`apply().base` seed 追加；`UiCustomConfig` 接口扩展 |
| 3 | `src/client/config.ts` | `CustomThemeConfig` 追加 zh/smooth 字段；`DEFAULTS` 追加中性默认值；`normalizeConfig()` 追加 clamp |
| 4 | `src/client/index.ts` | `registerFeatures` 内追加 `if (enabled('zh'))` / `if (enabled('smooth'))` 两分支（含 locale + effect + slot） |
| 5 | `src/client/zh/**` | 新目录，迁移 `zh_pro` 的 `data/` + `logic/`（`dom-enhance` 需将 `settingsStore` 改为 `scope` 订阅） |
| 6 | `src/zh/**` | 新目录，迁移 `zh_pro` 的 Host 半边（`chinese-prompt`/`model-locale`/`session-delete`/`trash`） |
| 7 | `src/client/smooth/**` | 新目录，迁移 `smooth-stream/src/client/*` 18 文件，`smooth-stream-settings-api.ts` 改为 `scope` 读写 |
| 8 | `src/client/zh/logic/dom-enhance.ts` + `src/client/smooth/auto-collapse-controller.ts` | 加入 `resolveThinkingOwner` 互斥 guard |
| 9 | `cordis.patch.yml` / `package.json` | 保持 `id: ui-custom` 单 patch，不新增 patch；`dsh.client.inject` 保持不变（已覆盖两新 Feature 所需） |

> 步骤 1-4 为**骨架**（约 100 行），完成后即可 `features: ['zh']` / `features: ['smooth']` 单独冒烟；5-7 为**血肉**迁移，可分 PR 增量合入。

---

## 8. 分阶段实施

### Phase 0 — 骨架占位（0.5 天）

- [ ] 改 `shared.ts`/`src/index.ts`/`src/client/config.ts`/`src/client/index.ts` 四文件，`ZhSection`/`SmoothSection` 先以空 `ZhSection.tsx`/`SmoothSection.tsx` 占位
- [ ] 验证 `features: []` 全开、`features: ['appearance']` 仅外观、`features: ['zh']` 仅汉化 三档白名单行为

### Phase 1 — `zh` Feature 迁移（1 周）

- [ ] 迁移 `client/zh/data/*` + `client/zh/logic/dom-enhance.ts`（首个可验证：中文界面翻译生效）
- [ ] 迁移 `archive-view`/`auto-archive`/`session-menu`（纯浏览器部分）
- [ ] 设置页 `ZhSection.tsx` 复用 `zh_pro` 的 12 项开关布局，数据源切到 `scope`
- [ ] Host 半边 `src/zh/` 迁移并通过 `applyZhHost` 在 `src/index.ts` 的 `ctx.inject(['settings'])` 内注册；`localStorage` 一次性迁移桥上线

### Phase 2 — `smooth` Feature 迁移（1 周）

- [ ] 迁移 `client/smooth/*` 18 文件，`TypewriterAssistantNodeView` 的 `assistant-step` shadow 验证通过
- [ ] `wrapFollowNodeView` 的 `SKIP_WRAP` 与宿主已有 `user/steering` shadow 共存验证（`markdown` Feature 的 `UserMarkdownNodeView` priority -1 互不覆盖）
- [ ] 思考折叠互斥 guard 上线，设置页联动置灰
- [ ] 调试面板 `DebugPanel` 复用宿主 `shell.overlay` slot（`order: 110`）

### Phase 3 — 打磨与迁移指引（3 天）

- [ ] 存量用户迁移文档：`dsh plugin remove deepseek-harness-zh_pro` / `dsh-smooth-stream` → `features: ['zh','smooth']` 等价配置对照表
- [ ] 预设 `presets/balanced.yaml` 示例：`zhComplete:true, thinkingAuto:false(让位smooth), smoothPreset:balanced`
- [ ] 三 Feature 并存冒烟：中文翻译 + 丝滑滚动 + 壁纸/毛玻璃同时生效录屏

---

## 9. 配置对照（存量 → 宿主）

| 存量键 | 宿主键 | 说明 |
|--------|--------|------|
| `localStorage['deepseek-harness-zh_pro:enhancements'].zhComplete` | `ui-custom.zhComplete` | 自动迁移 |
| `statsFull` | `ui-custom.statsFull` | 同上 |
| `thinkingAuto`/`thinkMaxLines` | `ui-custom.thinkingAuto`/`thinkMaxLines` | 与 smooth 互斥时 smooth 优先 |
| `chatWidth` | `ui-custom.chatWidth` | — |
| `settings.yaml dsh-zh.zhPrompt` | `ui-custom.zhPrompt` | Host 字段重命名，旧值可脚本迁移 |
| `smooth-stream.enabled` | `ui-custom.smoothEnabled` | — |
| `smooth-stream.preset` | `ui-custom.smoothPreset` | `boot-config` 全局桥可移除 |
| `smooth-stream.thinkAutoExpand` | 复用 `thinkingAuto` | 不再双持 |
| `smooth-stream.autoCollapse` | `ui-custom.smoothAutoCollapse` | 与 `thinkingAuto` 互斥 |

---

## 10. 风险与回滚

| 风险 | 缓解 |
|------|------|
| `zh_pro` 的经典脚本工厂 `lib/client.js` 与宿主 tsdown 产物形态不同 | 仅迁移 TS 源码，不复用构建产物；`scripts/build-client.mjs` 不引入宿主 |
| `smooth` 的 1124 行 `teleprompterGlide.ts` 直接操作 `translate3d` 可能与 `motion` 的入场 `transform` 叠加 | 已验证：smooth 作用于容器层，motion 作用于单行，叠加安全；`prefers-reduced-motion` 时 smooth 的 `useFpsGuard` 已共享信号 |
| Host 的 `session-delete` 路由需 `webServer` 权限 | 宿主 `src/index.ts` 已在 `ctx.inject(['settings'])` 内，追加 `ctx.inject(['webServer'])` 即可，不影响现有 Client `inject` |
| 用户同时装旧包与新宿主导致双实例 | 宿主 `applyZhHost` 启动时检测 `window.__DSH_ZH_ACTIVE__` 全局标记，若旧包已挂载则宿主 `zh` 自动降级并提示卸载旧包 |

---

## 11. 验证清单

```bash
# 骨架验证
pnpm --filter dsh-client-ui-custom typecheck
pnpm --filter dsh-client-ui-custom build

# 白名单三档
# features: []          → 9 Feature 全开
# features: ['zh']      → 仅汉化生效，其余不挂载
# features: ['smooth']  → 仅流式生效

# 浏览器验证
# - 中文界面 zhComplete 开/关 切换翻译
# - 长回复打字机揭示 + 弹簧滚动 + FPS
# - 外观壁纸/毛玻璃与滚动/翻译共存
# - 思考块：smooth 开时 zh 折叠开关置灰，反之可切
```

> 后续任一 Feature 升级，仅回归其 `enabled()` 分支与 `resolveThinkingOwner` 互斥即可，隔离度高。
