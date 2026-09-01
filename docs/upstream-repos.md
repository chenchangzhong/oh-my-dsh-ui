# 上游仓库地址

## 项目身份

**当前项目**：`oh-my-dsh-ui`（即原 `dsh-client-ui-custom`）
- 本地目录：`/Users/zhong/project/dsh-plugins/ui-custom/`（项目根目录即为插件源码）
- GitHub：`https://github.com/chenchangzhong/oh-my-dsh-ui`

这是一个 DSH Web UI 客制化插件，通过 `features` 白名单机制整合了三个来源的功能：

| Feature | 来源 | 说明 |
|---------|------|------|
| `appearance` / `usage` / `motion` / `markdown` | 原生 | DSH UI 增强（壁纸/动效/用量统计等） |
| `zh` | 整合自 `deepseek-harness-zh_pro` | 中文界面增强 |
| `smooth` | 整合自 `dsh-smooth-stream` | 丝滑流式打字机 |

---

## 四个 Remote

| Remote 名 | GitHub 地址 | 关系 |
|-----------|-------------|------|
| `oh-my-dsh-ui` | https://github.com/chenchangzhong/oh-my-dsh-ui | 本地 fork（可 push） |
| `yoli-mi` | https://github.com/yoli-mi/dsh-client-ui-custom | 主上游（oh-my-dsh-ui 的源头） |
| `upstream` | https://github.com/magian1127/deepseek-harness-zh_pro | `zh` Feature 上游 |
| `dsh-smooth-stream` | https://github.com/magian1127/dsh-smooth-stream | `smooth` Feature 上游（**无法访问**） |

---

## 上游详情

### yoli-mi/dsh-client-ui-custom（主上游）

- **地址**：https://github.com/yoli-mi/dsh-client-ui-custom
- **分支**：`main`
- **本地领先/落后**：本地 `5ed0628` = `yoli-mi/main`（无共同祖先，独立历史）
- **关键 commit**：`3f19e4d` — 修复 bundle 注册名（`@deepseek-ai` → `@ha-na-bi`）
- **备注**：242 个 commit 中绝大部分是 `motion` 动效的反复增删，属于噪声；本地已移除 motion，核心注册名问题本地已正确

### magian1127/deepseek-harness-zh_pro（zh Feature 上游）

- **地址**：https://github.com/magian1127/deepseek-harness-zh_pro
- **分支**：`main`（v0.9.0）
- **本地版本**：v0.7.0（commit `63758d5`）
- **差距**：39 个新提交
- **关键新功能**：服务监控、批量操作、归档视图增强、session.delete 路由
- **本地整合状态**：`src/client/zh/`（Client 半边）+ `src/server/`（Host 半边）已集成

### magian1127/dsh-smooth-stream（smooth Feature 上游）

- **地址**：https://github.com/Laplace-bit/dsh-smooth-stream
- **本地状态**：无法访问（remote 报错 404）
- **本地整合状态**：`src/client/smooth/` 已集成（深度定制，非实时同步）

---

## 项目结构

```
oh-my-dsh-ui/（即 ui-custom/ 项目根目录）
├── src/
│   ├── shared.ts              # FEATURES 数组 + 插件配置接口定义
│   ├── index.ts              # Host 入口：注册 cordis.patch + schema + settings
│   ├── invariant.ts          # 插件标识常量
│   ├── css-modules.d.ts      # CSS Module 类型声明
│   ├── client/               # ===== Client 半边（浏览器） =====
│   │   ├── index.ts         # registerFeatures()：按 features 白名单挂载各 Feature
│   │   ├── config.ts        # CustomThemeConfig + DEFAULTS + normalizeConfig()
│   │   ├── apply.ts         # 配置 → CSS 变量写入 <html>
│   │   ├── presets.ts       # 6 种内置视觉预设
│   │   ├── custom.css      # 主题 token 级联覆盖
│   │   ├── appearance/      # 壁纸/毛玻璃/强调色/透明度/字体/质感
│   │   ├── motion/          # 入场动效
│   │   ├── shortcuts/      # 快捷键自定义
│   │   ├── usage/           # 用量统计面板
│   │   ├── usage-overlay.ts # 用量浮层
│   │   ├── preview-bar.ts   # 预览条
│   │   ├── markdown/        # 用户消息 Markdown 渲染
│   │   ├── zh/              # ===== 整合自 zh_pro =====
│   │   │   ├── index.ts     # applyZhFeature() 入口
│   │   │   ├── shared.ts    # zh 共享类型
│   │   │   ├── store/       # zh 设置 store
│   │   │   ├── data/        # 语言词典（terms、dom-labels、settings-dicts 等）
│   │   │   ├── locales/     # 界面文案
│   │   │   └── logic/       # DOM 增强逻辑（dom-enhance、archive-view、session-menu 等）
│   │   ├── smooth/          # ===== 整合自 smooth-stream =====
│   │   │   ├── index.ts     # applySmoothFeature() 入口
│   │   │   ├── config.ts    # smooth 设置配置
│   │   │   ├── settings.ts  # 设置页组件
│   │   │   ├── locales.ts   # 界面文案
│   │   │   ├── TypewriterAssistantNodeView.tsx
│   │   │   ├── TypewriterToolNodeView.tsx
│   │   │   ├── useSmoothStreamContent.ts
│   │   │   ├── teleprompterGlide.ts
│   │   │   ├── useProgressiveDomText.ts
│   │   │   ├── auto-collapse-controller.ts
│   │   │   └── ...
│   │   ├── ui-enhance/       # UI 增强设置页
│   │   └── theme-section.ts  # 主题设置区块
│   └── server/               # ===== Host 半边（Electron 主进程） =====
│       ├── index.ts          # Host 入口
│       ├── constants.ts      # 常量定义
│       ├── types.ts          # 类型定义
│       ├── util.ts           # 工具函数
│       ├── session-delete.ts  # 会话删除路由（/dsh-zh/api/session.delete）
│       └── trash.ts          # 系统回收站封装
├── lib/                      # tsdown 构建产物
│   ├── client.js            # 浏览器半边 bundle（~400KB，CSS 已内联）
│   ├── index.js             # Host 半边入口
│   └── invariant.js        # 插件标识
├── cordis.patch.yml         # 持久 bundle 行（id: oh-my-dsh-ui）
├── package.json              # 包名 oh-my-dsh-ui
├── tsdown.config.ts         # 构建配置
├── tests/                   # 单元测试
└── docs/                    # 文档
```

---

## Feature 白名单机制

**当前 FEATURES**：`['markdown', 'appearance', 'usage', 'motion', 'zh', 'smooth']`

```ts
// src/shared.ts
export const FEATURES = ['markdown', 'appearance', 'usage', 'motion', 'zh', 'smooth'] as const
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
- id: ui-custom
  name: '@ha-na-bi/dsh-client-ui-custom'
  config:
    features: [appearance, zh]     # 只安装外观 + 中文增强
    preset: 'ink-teal'
```

---

## 构建与安装

```bash
# 打包（TypeScript → lib/）
cd /Users/zhong/project/dsh-plugins/ui-custom
./node_modules/.bin/tsdown

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

当前 `zh` Feature 的 Host 端位于 `src/server/`（session-delete 路由），`smooth` Feature 的 Host 端逻辑已简化或移除（流式完全由 Client 接管）。
