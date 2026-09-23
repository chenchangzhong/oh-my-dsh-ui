# 上游仓库地址与整合状态

## 项目身份

**当前项目**：`oh-my-dsh-ui`
- 本地目录：`/Users/zhong/project/dsh-plugins/oh-my-dsh-ui/`（项目根目录即为插件源码）
- GitHub：`https://github.com/chenchangzhong/oh-my-dsh-ui`

这是一个 DSH Web UI 客制化插件，通过 `features` 白名单机制整合了三个来源的功能：

| Feature | 来源 | 说明 |
|---------|------|------|
| `appearance` / `motion` / `markdown` | 原生（源自 yoli-mi） | DSH UI 增强（壁纸/动效等） |
| `zh` | 整合自 `deepseek-harness-zh_pro` | 中文界面增强 |
| `smooth` | 整合自 `dsh-smooth-stream` | 丝滑流式打字机 |

实际 `FEATURES` 见 `src/shared.ts`：

```ts
export const FEATURES = ['markdown', 'appearance', 'motion', 'zh', 'smooth'] as const
```

> 上游 yoli-mi 原版还有 `shortcuts` / `history` / `marketplace` / `pin` 四个模块，
> 本项目自建立起**未纳入**（不在 `FEATURES` 中，代码也不存在）。

---

## 四个 Remote

| Remote 名 | GitHub 地址 | 关系 |
|-----------|-------------|------|
| `oh-my-dsh-ui` | https://github.com/chenchangzhong/oh-my-dsh-ui | 本地 fork（可 push） |
| `yoli-mi` | https://github.com/yoli-mi/dsh-client-ui-custom | 主上游（appearance/motion/markdown 来源） |
| `upstream` | https://github.com/magian1127/deepseek-harness-zh_pro | `zh` Feature 上游 |
| `dsh-smooth-stream` | https://github.com/Laplace-bit/dsh-smooth-stream | `smooth` Feature 上游（**remote 地址待更正**） |

> ⚠️ `dsh-smooth-stream` remote 当前指向 `git@github.com:magian1127/dsh-smooth-stream.git`，
> 该地址已 404；仓库已迁移至 **Laplace-bit/dsh-smooth-stream**。

---

## 谱系事实（重要）

本仓库与三个上游**均无共同祖先**（`git merge-base` 全部为空）：

- 根提交 `63758d5` 把「已整合好的 oh-my-dsh-ui（含 zh/smooth）」与 `deepseek-harness-zh_pro` 快照一并纳入；
- `5df4f72`（调整结构）把 `dsh-client-ui-custom/` 提升为仓库根，并删除 `deepseek-harness-zh_pro/` 子目录（其能力已重写进 `src/client/zh/` + `src/server/`）。

因此**不存在 git merge / rebase 的合并路径**，上游更新只能逐项移植（cherry-pick 不可用，
行级 diff 也会因本地深度重写而失真），必须做**功能级**比对。

---

## 上游详情与整合状态

### magian1127/deepseek-harness-zh_pro（`zh` Feature 上游）

- **分支**：`main`，当前 **v0.9.3**（`0522430`，2026-09-10）
- **本地基线**：约 **v0.7.0**（2026-08-21）
- **本地整合位置**：`src/client/zh/`（Client 半边）+ `src/server/`（Host 半边），均为**精简重写版**而非直接拷贝
  （例：上游 `trash.ts` 282 行 → 本地 3 行，改用 `@dsh-community/trash-utils`）

**上游能力整合状态**（2026-09 一轮合并后的实际状态）：

| 上游提交 | 内容 | 状态 |
|---------|------|------|
| `ccd93b4` | sessionPersistence 句柄化契约（0.1.3+ 删除会话不再假删除） | ✅ 已整合（`readRaw → stat → list` 三级取 header + 目录扫描定位；定位失败直接中止） |
| `0522430` | DSH 0.1.5 适配 | ✅ 已整合（`command` 命名空间、trajectory/turnUsage 键、StatsPills 结构、四位空格分组） |
| `79f47ec` / `ad75b24` | 0.1.2-rc.1 / 0.1.2-alpha.2 词条与本地化对齐 | ✅ 已整合（`subagent` 术语、子代理模型选择卡、pluginInventory、程序模式、menu.download） |
| `5bf3460` | TurnUsagePanel 用量 pill 的 K/M 缩写中文化 | ✅ 已整合 |
| `b213835` / `d1fa3ec` | 安全加固（按 kind 限物理删除、恢复可重试、取消归档写链语义） | ✅ 已整合 |
| `b166ffc`+`2d3602b`+`87d5842`+`137694a` | 服务监控（侧栏面板、进程归属、命令行脱敏、负缓存修复） | ✅ 已整合（Host 783 行 + Client 789 行，裁剪了上游 CLI 部分） |
| `545dc28`+`0446d17`+`8a7c1d3`+`fc4cec2`+`7d0807f` | 会话批量操作 | ⚠️ 部分整合：官方会话列表的多选/批量删除/批量归档、菜单批量项、已删除集合与归档视图过滤均已就位；**归档视图内的行多选未移植**（本地 archive-view 为精简重写版且含自有修复） |
| `2c15b36` | 上下文注入中文化开关 + 官方特征守卫 | 不适用（本地已移除 prompt 注入，无对应开关） |
| `543657b` | Open Design 中文化注入 | 不适用（上游改的是 `model-locale.ts`，本地无该模块） |
| `src/bin/cli/*`、`hot-mount`、`hot-reload` | CLI 与热重载体系 | 不适用（本地无对应体系） |
| `assemble-patch`、`chinese-prompt` | 提示词注入管线 | 不适用（本地已移除 prompt 注入，仅保留 `zhAutoArchiveDays`） |

> `dom-labels.ts` / `traj-patterns.ts` 的**精简**（上游在 0.1.5 适配中删除了约 80 条已失效的 DOM 改写表）
> 本地按保守策略**保留**了：这些条目在 0.1.5 下不命中也无害，删掉则要承担判断失误就丢失中文的风险。
> 若实测发现某块界面中文未生效，按上游 `0522430` 精简该表即可。

### yoli-mi/dsh-client-ui-custom（主上游）

- **分支**：`main`，最后提交 `3f19e4d`（2026-08-24），**早于本仓库建立时间（08-28）**
- 因此该上游**没有待合并的新提交**
- 该上游 242 个提交中绝大部分是 `motion` 动效的反复增删（`revert: remove the animation feature entirely` 重复上百次），属噪声
- 唯一可能相关的修复 `3f19e4d`（bundle 注册名 `@deepseek-ai` → `@ha-na-bi`）**对本地不适用**：
  本地 `lib/client.js` 的 bundle id 为 `oh-my-dsh-ui`，与 `cordis.patch.yml` 的 `name: 'oh-my-dsh-ui'` 一致
- 本地未纳入的模块：`shortcuts/` + `settings/`（快捷键）、`history/`（浮動历史条）、`marketplace/`（插件市场）、`pin/`（固定轮次），
  以及 `actions.ts` / `composer.ts` / `custom.module.css` / `locales.ts`

### Laplace-bit/dsh-smooth-stream（`smooth` Feature 上游）

- **地址**：https://github.com/Laplace-bit/dsh-smooth-stream （原 `magian1127/dsh-smooth-stream` 已迁移）
- **当前版本**：**v0.6.1**（`fa828cb`，2026-09-11）
- **本地整合状态**：`src/client/smooth/` 为**深度定制分支**，非实时同步

关键差异：上游用 loopback RPC 通道 `/smooth-stream` 读写设置，
本地已改为 `ctx.settingsScope`（`ui-custom` 命名空间），见 `smooth-settings-adapter.ts`。
因此上游 `666e498`（DSH 0.1.5-rc.1 下 RPC 通道挂载失败的修复）**对本地不适用**。

**可借鉴的上游改动**（需按语义移植，不可直接 cherry-pick）：

| 上游提交 | 内容 |
|---------|------|
| `9696ec0` | 消除完成跳变与回弹漂移（fast handoff + scroll-delta 校正） |
| `8a9e4e0` | 完成时遵循 Host turn-process fold，折叠 inline reasoning |
| `139eb1b` | 自适应对数透明度淡出（CSS Custom Highlight，仅 paint 层） |
| `d412aef` | 三态动效偏好（auto / force-smooth / force-reduced） |

---

## 从上游移植 client 侧代码的注意事项

上游的 client 半边是**拼接进同一个作用域**的（`src/scripts/build-client.mts`），
跨文件引用靠隐式全局，且运行在「一个插件一个 bundle」的假设下。本地是真正的
ES 模块 + 整合插件，2026-09 那轮移植连续踩到几类坑，都不是语法错误、构建与
控制台都不报错，只在运行时表现为"功能不出现"。前四条是技术陷阱，第五条是流程：

1. **隐式全局缺 import。** 上游代码里常见 `typeof settingsStore !== 'undefined'`
   这类防御写法（因为在那套拼接作用域里它确实是全局）。搬到 ES 模块后该标识符
   未声明，`typeof` 返回 `'undefined'` → 整段逻辑被静默跳过。
   实例：`service-monitor.ts` 的 `settingsStore` 被引用 14 次、文件内无定义且无
   任何 import，导致 `on` 恒为 `false`，服务监控面板永不挂载。
   **检查方法**：搬完一个文件后，grep 该文件的 `typeof [A-Za-z_]+ !== 'undefined'`，
   逐个确认对应标识符要么是浏览器全局（`document` / `window` / `MutationObserver`…），
   要么已在本地 import。

2. **槽位不渲染 = 写了等于没写。** 上游把 smooth 的设置卡注册在
   `settings.plugin.item`，而当前 DSH 的「插件」页**不会**渲染插件的该项注册
   （该槽位存在，26 处引用，但语义不是给插件自己塞条目的）。结果就是 smooth
   一直"功能生效、没有设置界面"。
   **动手前先确认**：承载新 UI 的槽位在当前 DSH 里确实会渲染——最快的办法是看
   同一个 slot 上是否已经有本地代码成功渲染过（例如 `settings.section` 上的
   ui-enhance 页）。

3. **`settingsScope` 必须绑定 namespace。** 未绑定的 `ctx.settingsScope` 既读不到
   本插件的 section（`getSnapshot().value` 不是它，字段恒为 `undefined` → 回落
   默认值，于是开关"改不动"），也**没有 `subscribe`**。
   实例：`SmoothStreamCardController` 全程用未绑定的 scope，而同一份绑定写法在
   `smooth/index.ts` 里早已存在并注入给了渲染器。
   **正确写法**：`ctx.settingsScope.bind({ namespace: UI_CUSTOM_SETTINGS_NS })`
   （见 `src/client/zh/logic/apply.ts`）。注意给订阅加 `typeof scope.subscribe === 'function'`
   之类的守卫时，失败路径要么报错要么可观测——静默 return 会把这类 bug 藏起来。

4. **同一元素上补 `ref` 会覆盖原有的。** 上游那处元素原本没有 ref，所以它写了
   `ref={fadeRootRef}`；本地同一个 div 已经有 `ref={bodyRef}`，照抄过来就成了两个
   `ref` 属性——JSX 编译成 `createElement('div', { ref: bodyRef, …, ref: fadeRootRef })`，
   同名字面量后者覆盖前者，于是 `bodyRef.current` 恒为 `null`，挂在该元素上的既有功能
   静默失效（实例：思考块的滚动跟随，首行就是 `if (body === null) return`）。
   **规则**：往既有 JSX 接新 hook 前，先看这个元素已经绑了什么；能复用就复用——
   本次两个 ref 本就指向同一元素，上游另设一个只是因为它那边没有。

5. **注释里的范围描述就是规格，别照着代码结构抄。**（流程层，与上面四条不同）
   上游实现一个功能时，常在函数头注释里写清完整语义——适用哪个视图、哪些行、
   什么条件——而代码本身可能分成几段、散落在别处调用。只读到其中一段就动手，
   会做出"看起来对、范围却少了一半"的实现。
   实例：归档视图「工作区行全选」的注释明确写着两条范围——"归档视图开着且属于
   该工作区时只取归档行；**否则**只取正常列表的官方会话行"——而实现只覆盖了
   第一条，于是没打开归档视图时点它毫无反应。
   **规则**：搬一个函数前，先把它的注释当规格逐条列出来，再对照实现确认每条都
   落地；注释里的"或 / 否则 / 当…时 / 两种情况"往往正是边界条件所在。

> 前四条的共同点是技术层的：**"构建通过 / 代码存在"不等于"功能可用"**。移植后
> 至少要做一次运行时确认（DOM 里是否出现、开关是否真的生效、**被改动元素上的
> 既有功能是否还在**），而不是只看产物里有没有那段字符串。
>
> 第五条是流程层的，也是这一轮最不该发生的：**先把规格读全，再动手写**。当时
> 上游注释就摆在眼前，只读半句就照着代码结构实现了。

---

## 项目结构

```
oh-my-dsh-ui/
├── src/
│   ├── shared.ts              # FEATURES 数组 + 插件配置接口定义
│   ├── index.ts               # Host 入口：注册 cordis.patch + schema + settings
│   ├── invariant.ts           # 插件标识常量
│   ├── css-modules.d.ts       # CSS Module 类型声明
│   ├── client/                # ===== Client 半边（浏览器） =====
│   │   ├── index.ts           # registerFeatures()：按 features 白名单挂载各 Feature
│   │   ├── config.ts          # CustomThemeConfig + DEFAULTS + normalizeConfig()
│   │   ├── apply.ts           # 配置 → CSS 变量写入 <html>
│   │   ├── presets.ts         # 内置视觉预设
│   │   ├── color.ts           # 颜色工具
│   │   ├── custom.css         # 主题 token 级联覆盖
│   │   ├── snapshot-store.ts  # 轻量快照 store
│   │   ├── theme-section.ts   # 主题设置区块
│   │   ├── preview-bar.ts
│   │   ├── appearance/        # 壁纸/毛玻璃/强调色/透明度/字体/质感
│   │   ├── motion/            # 入场动效
│   │   ├── markdown/          # 用户消息 Markdown 渲染
│   │   ├── ui-enhance/        # UI 增强设置页
│   │   ├── zh/                # ===== 整合自 zh_pro =====
│   │   │   ├── index.ts       # applyZh() 入口
│   │   │   ├── shared.ts      # zh 共享类型与设置默认值
│   │   │   ├── store/         # 设置 store（prompt-store / settings-store）
│   │   │   ├── data/          # 词典（terms、zh-dict、dom-labels、settings-dicts、traj-patterns）
│   │   │   ├── locales/       # 界面文案
│   │   │   └── logic/         # DOM 增强（apply、dom-enhance、archive-view、auto-archive、
│   │   │                      #   session-menu、settings-section、format-utils、register-section）
│   │   └── smooth/            # ===== 整合自 smooth-stream =====
│   │       ├── index.ts       # apply() 入口
│   │       ├── config.ts / settings.ts / locales.ts
│   │       ├── TypewriterAssistantNodeView.tsx / TypewriterToolNodeView.tsx
│   │       ├── useSmoothStreamContent.ts / useProgressiveDomText.ts
│   │       ├── teleprompterGlide.ts / useFpsGuard.ts
│   │       ├── AnimatedDisclosure.tsx / FollowHost.tsx
│   │       ├── SmoothStreamCard.tsx / SmoothStreamCardController.ts
│   │       ├── smooth-settings-adapter.ts（settingsScope 适配层）
│   │       ├── DebugPanel.tsx / debugRuntime.ts
│   │       └── locales.ts
│   └── server/                # ===== Host 半边（Electron 主进程） =====
│       ├── index.ts           # Host 入口 installAll()
│       ├── constants.ts       # 常量定义
│       ├── types.ts           # 类型定义
│       ├── util.ts            # 工具函数
│       ├── session-delete.ts  # 会话删除路由（/dsh-zh/api/session.delete）
│       └── trash.ts           # 回收站封装（@dsh-community/trash-utils）
├── lib/                       # tsdown 构建产物
│   ├── client.js              # 浏览器半边 bundle（bundle id = oh-my-dsh-ui）
│   ├── index.js               # Host 半边入口
│   ├── invariant.js           # 插件标识
│   └── types/                 # 类型声明
├── cordis.patch.yml           # 持久 bundle 行（id: oh-my-dsh-ui）
├── package.json               # 包名 oh-my-dsh-ui
├── tsdown.config.ts           # 构建配置
├── tests/                     # 单元测试（appearance / color / motion / theme-section）
└── docs/                      # 文档
```

---

## Feature 白名单机制

```ts
// src/shared.ts
export const FEATURES = ['markdown', 'appearance', 'motion', 'zh', 'smooth'] as const
export type PluginFeature = typeof FEATURES[number]

// src/client/config.ts
export function resolveFeatures(raw): Set<PluginFeature> {
  if (!Array.isArray(raw?.features) || raw.features.length === 0)
    return new Set([...FEATURES]) // 空 = 全开
  return new Set(raw.features.filter(id => FEATURES.includes(id)))
}
```

配置示例：

```yaml
- id: oh-my-dsh-ui
  name: 'oh-my-dsh-ui'
  config:
    features: [appearance, zh]     # 只安装外观 + 中文增强
    preset: 'ink-teal'
```

---

## 构建与安装

```bash
cd /Users/zhong/project/dsh-plugins/oh-my-dsh-ui

# 打包（TypeScript → lib/）
./node_modules/.bin/tsdown

# 单元测试
./node_modules/.bin/vitest run

# 软链安装（已配置好，无需操作）
# ~/.dsh/profiles/web/node_modules/oh-my-dsh-ui → 本地目录

# 生效
# 1. 完全退出 DSH Desktop
# 2. 重新打开
# 3. 浏览器 Cmd+Shift+R 硬刷新
```

> ⚠️ 普通修改没有 HMR，必须重启 + 硬刷新。

---

## Host 与 Client 半边

DSH 插件每个 Feature 都分两侧运行：

| 半边 | 运行环境 | 职责 |
|------|---------|------|
| **Host** | Electron 主进程 | 注册 settings schema、webServer 路由、`systemPrompt` 包装等 |
| **Client** | 浏览器 | DOM 增强、locale 补丁、设置页 UI、流式打字机等 |

当前 `zh` Feature 的 Host 端位于 `src/server/`（session-delete / trash 路由），
`smooth` Feature 的 Host 端逻辑已简化或移除（流式完全由 Client 接管）。

---

## 目标运行环境

- **DSH Desktop**：2.0.7
- **dsh CLI**：0.1.5-rc.1

> `zh` Feature 的词典与 DOM 改写表基线来自 zh_pro v0.7.0（对应更早的 DSH 版本）。
> DSH 0.1.5 起大量界面已由官方词典化，旧 DOM 层改写会失效或冗余 —— 移植上游 `0522430` 时需一并处理。
