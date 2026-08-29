# 单一插件整合与安装指南 —— dsh-client-ui-custom (zh + smooth)

> 状态：**源码整合已完成**，构建与 profile 安装需在真机执行（沙箱无法写 `~/.dsh` 与 npm 私有依赖）。
> 仓库：`/Users/zhong/project/dsh-plugins/ui-custom/dsh-client-ui-custom`

---

## 1. 整合形态（已完成）

以 `dsh-client-ui-custom` 为**唯一基座插件**，`zh`（汉化/增强）与 `smooth`（丝滑流式）作为两个新 feature 注入 `FEATURES` 白名单机制，单插件单 patch 发布。

```
FEATURES = ['markdown', 'appearance', 'usage', 'motion', 'zh', 'smooth']
```

| 部件 | 落点 | 内容 |
|------|------|------|
| 基座扩展 | `src/shared.ts` | FEATURES 追加 zh/smooth；新增 `ZhSection`/`SmoothSection` 接口；`UiCustomSection extends ThemeSection, ZhSection, SmoothSection` |
| host 半边 | `src/index.ts` | `UiCustomSectionSchema` 追加 zh 16 字段 + smooth 5 字段（默认值取自源插件真实默认）；`UiCustomConfig`/`apply().base` 同步 seed |
| 挂载 | `src/client/index.ts` | `registerFeatures` 内 `enabled('zh')` → `applyZh(ctx)`；`enabled('smooth')` → `apply(ctx)`（别名导入 `applySmooth`） |
| zh feature | `src/client/zh/`（18 文件） | data 5 词典 + store 2（settings/prompt，绑 ui-custom 命名空间）+ logic 9（dom-enhance/auto-archive/archive-view/session-menu/settings-section/register-section/apply/format-utils）+ locales + shared + index |
| smooth feature | `src/client/smooth/`（20 文件） | TypewriterAssistantNodeView/FollowHost/AnimatedDisclosure/TypewriterToolNodeView 渲染器 + useSmoothStreamContent/teleprompterGlide/useFpsGuard/useProgressiveDomText 引擎 + SmoothStreamCard/DebugPanel + settings/config/locales 适配层（auto-collapse-controller 已移除） |

### 命名空间统一（关键决策）
- zh/smooth 的**运行时配置**全部读宿主 `ui-custom` 命名空间（`ctx.settingsScope.bind({ namespace: 'ui-custom' })`），不创建分叉命名空间——单一插件语义。
- zh 的 **locale 字典**保留独立 NS（`dsh-zh-settings`）与宿主各 feature 平级（UI 文案 NS 与配置 NS 是不同维度，可共存）。

### 思考展开互斥（resolveThinkingOwner）
`zh.thinkingAuto` 与 `smooth.smoothThinkAutoExpand` 由统一决策；zh 启用时优先，smooth 仅在 zh 关闭时接管（基座 `client/index.ts` 顶层纯函数）。注：`smoothAutoCollapse` 功能已移除。

---

## 2. 真机构建步骤（在你的终端执行）

沙箱限制说明：`pnpm` 需写 workspace 外临时目录、`@deepseek-ai/dsh-*` 私有依赖仅存在于 DSH Desktop 内置环境、`dsh` CLI 操作 `~/.dsh` profile 被拒。以下步骤必须在**你的真实终端**（DSH Desktop 宿主环境）执行。

### 2.1 前置修复：tsdown 构建配置自包含

`tsdown.config.ts` 引用 `../tsdown.client.ts`（原 monorepo 共享工具，副本中缺失）。构建前需把它改为内联 `clientBundle` 等价配置，或从 DSH 源码恢复该文件。最小修复（若你无法取得原始共享文件）：

```ts
// tsdown.config.ts（自包含替代）
import type { Options } from 'tsdown'
export default {
  entry: ['src/index.ts', 'src/invariant.ts'],
  format: 'esm',
  platform: 'neutral',
  dts: { resolve: true },
  external: [/^@deepseek-ai\//],
} satisfies Options
```
> 若你保留了 DSH 完整 monorepo（含 `tsdown.client.ts` 与 `vendor/cordis` 等），恢复原引用即可，无需此替代。

### 2.2 依赖安装

```bash
cd /Users/zhong/project/dsh-plugins/ui-custom/dsh-client-ui-custom
# 若你的 DSH 环境配置了私有 registry 或 workspace 协议，pnpm 才能解析 @deepseek-ai/dsh-*
# 建议在 DSH 源码 monorepo 内构建，或配置 registry 指向 DSH 私有源
pnpm install
```

### 2.3 构建

```bash
pnpm bundle          # 产出 lib/client.js + lib/index.js + lib/invariant.js
```

### 2.4 安装到 DSH web profile

```bash
# 方式 A（推荐）：直接同步构建产物到 profile 中已安装的插槽
rsync -a lib/ ~/.dsh/profiles/web/node_modules/@ha-na-bi/dsh-client-ui-custom/lib/

# 方式 B：通过 dsh CLI（若你环境可用）
dsh plugin --profile web add /Users/zhong/project/dsh-plugins/ui-custom/dsh-client-ui-custom
```

---

## 3. 验证清单

```bash
# 1) 单插件注册：dsh plugin --profile web list 应只含 ui-custom 一项
dsh plugin --profile web list

# 2) 打开 DSH Web：
#    - 中文界面：思考块自动折叠（zh.thinkingAuto → max-height clamp）不应与流式冲突
#    - 长回复：打字机揭示 + 弹簧滚动跟随（smooth）在思考框内/框外同时丝滑
#    - 设置 → 外观/动效/中文优化/流式：四组设置页并存
#    - 思考展开：关掉 zh 的 thinkingAuto 后 smooth 的 smoothThinkAutoExpand 接管，无闪烁

# 3) 白名单验证：
#    features: []        → 全部 6 feature
#    features: [zh]      → 仅汉化
#    features: [smooth]  → 仅流式
```

---

## 4. 现有改动摘要

```bash
git -C /Users/zhong/project/dsh-plugins/ui-custom/dsh-client-ui-custom status --short
# 新增： src/client/zh/**（18 文件）+ src/client/smooth/**（20 文件）
# 修改： src/shared.ts / src/index.ts / src/client/index.ts
# 其他： 此前各轮修复（appearance 精简、motion、smooth 折叠、zh isSmoothStreamBlock）
```

## 5. 回退

```bash
# 还原 profile（由 DSH 重新安装旧版）
dsh plugin --profile web remove @ha-na-bi/dsh-client-ui-custom
# 或从 git 还原源码
cd /Users/zhong/project/dsh-plugins/ui-custom/dsh-client-ui-custom && git checkout -- src/
```