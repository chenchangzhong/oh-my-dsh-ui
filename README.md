# ui-custom

DSH Web UI 客制化插件整合项目，托管 `oh-my-dsh-ui`（DSH 客户端 UI 增强插件）源码，并承担 `deepseek-harness-zh_pro`（中文增强）与 `dsh-smooth-stream`（丝滑流式）的集成整合工作。

---

## 目录结构

```
ui-custom/
├── dsh-client-ui-custom/          # 主插件 oh-my-dsh-ui 源码
│   ├── src/
│   │   ├── client/                # 浏览器端（web platform）
│   │   │   ├── appearance/        # 外观：壁纸/毛玻璃/强调色/透明度/字体/质感
│   │   │   ├── motion/            # 动效：对话/侧边栏/新建入场动效
│   │   │   ├── shortcuts/         # 快捷键自定义
│   │   │   ├── usage/             # 用量统计面板
│   │   │   ├── history/           # 浮动历史记录条 + pin
│   │   │   ├── markdown/          # 用户消息 Markdown 渲染
│   │   │   ├── marketplace/       # 插件市场
│   │   │   ├── zh/                # 【集成中】中文界面增强（来自 zh_pro）
│   │   │   ├── smooth/            # 【集成中】丝滑流式打字机+滚动跟随（来自 smooth-stream）
│   │   │   ├── ui-enhance/        # UI 增强设置页
│   │   │   ├── index.ts           # 插件入口（Feature 注册 + 挂载）
│   │   │   ├── config.ts          # 配置 Schema + DEFAULTS + normalizeConfig
│   │   │   ├── presets.ts         # 主题预设（6 种视觉风格）
│   │   │   └── apply.ts           # 配置 → DOM（CSS 变量写入）
│   │   └── server/                # Host 端（Electron desktop）
│   ├── lib/                       # tsdown 构建产物
│   ├── tests/                     # 单元测试
│   ├── package.json               # 包名 oh-my-dsh-ui
│   ├── tsdown.config.ts           # 构建配置
│   └── README.md                  # oh-my-dsh-ui 原版说明（中英双语）
│
├── deepseek-harness-zh_pro/       # 中文增强插件源码（待整合进 dsh-client-ui-custom）
│   ├── src/
│   │   ├── bin/                   # CLI 源码（install/remove/status）
│   │   ├── lib/                   # Host 端 TypeScript 源码
│   │   └── lib/client/            # 浏览器端 TypeScript 源码
│   ├── README.md                  # 原版说明
│   └── AGENTS.md                  # 开发规范
│
└── docs/
    ├── integration-plan.md        # 整合方案 v2（zh_pro + smooth-stream → oh-my-dsh-ui）
    └── audit/                     # 各子包差异审计
        ├── dsh-client-ui-custom.diff
        ├── dsh-smooth-stream.diff
        └── deepseek-harness-zh_pro.diff
```

---

## 核心概念

### Feature 机制

`oh-my-dsh-ui` 通过 `features` 白名单选择要启用的功能模块，**默认全开**：

| Feature | 功能 | 说明 |
|---------|------|------|
| `appearance` | 外观 | 壁纸/毛玻璃/强调色/透明度/字体/质感 |
| `shortcuts` | 快捷键 | 组合键绑定与 composer 手势重映射 |
| `usage` | 用量统计 | Token 统计/趋势图/会话排行 |
| `history` | 历史记录条 | 浮动历史条 + pin 置顶 |
| `markdown` | Markdown 渲染 | 用户消息 Markdown 渲染 |
| `marketplace` | 插件市场 | GitHub dsh-plugin 主题目录 |
| `motion` | 动效 | 入场动画 + 一键预设 |
| `zh` | 中文增强 | 界面汉化/统计全显示/思考折叠/对话宽度/归档视图（**集成中**） |
| `smooth` | 丝滑流式 | 打字机揭示/弹簧滚动跟随/自动折叠/调试面板（**集成中**） |

配置示例（只启用部分功能）：

```yaml
- id: ui-custom
  name: '@ha-na-bi/dsh-client-ui-custom'
  config:
    features: [appearance, zh]     # 只安装外观 + 中文增强
    preset: 'ink-teal'
    wallpaper: '/my-wall.jpg'
```

### 双半边架构

DSH 插件每个功能模块都分为 **Host 端**（Electron 主进程）和 **Client 端**（Web 浏览器）：

```
Feature 模块
├── src/           → Host 端（Electron desktop）
│   └── index.ts   # applyXxxHost(ctx) 注册 Host 能力（settings RPC / webServer 路由 / systemPrompt 包装等）
└── src/client/    → Client 端（Web）
    └── index.ts   # applyXxxFeature(ctx, scope) 通过 ctx.effect() / ctx.slots.inject() 挂载
```

### 思考折叠冲突治理

`zh` 的 `thinkingAuto`（CSS max-height 折叠）与 `smooth` 的 `smoothAutoCollapse`（display:none + 摘要行）**互斥**，由 `resolveThinkingOwner()` 保证同一时刻只有一个模块负责思考折叠。

---

## 构建与开发

> 📦 **打包安装速查**：改完代码后直接看 [`docs/build-and-install.md`](docs/build-and-install.md)（打包 → 软链 → 重启生效，一条命令搞定）。

### 主插件（dsh-client-ui-custom）

```bash
cd dsh-client-ui-custom

# 安装依赖
pnpm install

# 构建（TypeScript → lib/）
pnpm run bundle

# 监听模式
pnpm run watch

# 类型检查
pnpm exec tsc --noEmit
```

### 整合状态

| 模块 | 状态 | 备注 |
|------|------|------|
| `appearance` | ✅ 完成 | 7 个预设 + 玻璃档位 |
| `shortcuts` | ✅ 完成 | 模型切换/思考强度循环 |
| `usage` | ✅ 完成 | 四窗口聚合 + 趋势图 |
| `history` | ✅ 完成 | 浮动条 + pin |
| `markdown` | ✅ 完成 | shadow DOM 渲染 |
| `marketplace` | ✅ 完成 | GitHub API 聚合 |
| `motion` | ✅ 完成 | 6 种对话入场 + 4 种侧边栏 |
| `zh` | 🔄 集成中 | Host 半边 + Client 半边迁移，详见 `docs/integration-plan.md` |
| `smooth` | 🔄 集成中 | 18 文件迁移，设置页接入 |

---

## 关键文件索引

| 文件 | 职责 |
|------|------|
| `dsh-client-ui-custom/src/shared.ts` | `FEATURES` 数组定义 + `UiCustomSection` 接口 |
| `dsh-client-ui-custom/src/index.ts` | Host 入口：Schema 定义 + `apply()` |
| `dsh-client-ui-custom/src/client/config.ts` | `CustomThemeConfig` + `DEFAULTS` + `normalizeConfig()` |
| `dsh-client-ui-custom/src/client/index.ts` | Client 入口：`registerFeatures()` 按白名单挂载各 Feature |
| `dsh-client-ui-custom/src/client/presets.ts` | 6 种内置视觉预设 |
| `dsh-client-ui-custom/src/client/apply.ts` | 配置 → CSS 变量写入 `<html>` |
| `dsh-client-ui-custom/src/client/custom.module.css` | 主题 token 级联覆盖 |
| `dsh-client-ui-custom/cordis.patch.yml` | 持久 patch 行，id `ui-custom` |
| `docs/integration-plan.md` | zh + smooth 整合方案完整设计文档 |
| `docs/audit/dsh-client-ui-custom.diff` | 与上游官方包的差异审计 |

---

## 相关文档

- **oh-my-dsh-ui 原版说明**：`dsh-client-ui-custom/README.md`（中英双语）
- **中文增强插件**：`deepseek-harness-zh_pro/README.md`
- **整合方案**：`docs/integration-plan.md`
- **DSH 平台构建规范**：参见 `dsh-client-ui-custom/docs/`（如有）

---

## 注意事项

1. **profile 配置**：`cordis.patch.yml` 的改动需要重启 `dsh web` 才生效
2. **壁纸可访问性**：壁纸 URL 必须能被浏览器访问（本地静态资源或外部 URL）
3. **settings 命名空间**：`ui-custom` 命名空间需在 Web 客户端的设置暴露白名单中（本项目 checkout 已包含）
4. **互斥保障**：`resolveThinkingOwner()` 保证思考折叠单一 Owner，避免双模块同时作用导致抖动
