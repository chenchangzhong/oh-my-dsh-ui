# Dsh-Client-UI-Custom

<div align="center">

[![Awesome DSH Plugin](https://beancookie.github.io/awesome-dsh-plugin/badge.svg)](https://beancookie.github.io/awesome-dsh-plugin)

[**中文**](#中文) · [**English**](#english)

</div>

---

## 中文

### 简介

oh-my-dsh-ui 是一个纯前端的 DSH Web UI 客制化插件：提供外观定制、入场动效、
用户消息 Markdown 渲染，并整合了**中文界面增强**（`zh`）与
**丝滑流式打字机**（`smooth`）两个第三方能力。

- **新增设置页** —— 「外观」「动效」；
- **修改通用设置页** —— 新增用户消息 Markdown 渲染开关；
- **中文界面增强（zh）** —— 中文化词典与界面增强、思考折叠、归档视图、会话删除（回收站）等；
- **丝滑流式（smooth）** —— 逐字揭示的流式输出与行高平滑跟随。

`features` 缺省或为空时全部功能启用，可按需用白名单裁剪，全程零 shell 改动。

### 宣传视频

[▶ 点击观看插件宣传视频（B 站）](https://www.bilibili.com/video/BV1fwbX6XEp7)

### 功能选择（按需安装）

插件由五个**相互独立**的功能模块组成：`appearance`（外观）、
`markdown`（用户消息 Markdown 渲染）、`motion`（动效）、`zh`（中文界面增强）、
`smooth`（丝滑流式）。可在插件配置里用 `features` 白名单选择要安装的功能：

```yaml
- id: oh-my-dsh-ui
  name: 'oh-my-dsh-ui'
  config:
    features: [appearance, zh]   # 只安装「外观」+「中文增强」
```

`features` 缺省或为空时，五个功能全部启用。

---

### 设置改动一览

| 位置 | 类型 | 内容 |
| --- | --- | --- |
| 设置 → UI增强 → 外观 | 标签页 | 主题定制，包括壁纸、玻璃、强调色、表面不透明度、字体与质感 |
| 设置 → UI增强 → 动效 | 标签页 | 对话/侧边栏/新建对话入场动效与选中框动效，含三套一键预设 |
| 设置 → UI增强 → 增强 | 标签页 | 中文界面增强（zh）、丝滑流式（smooth）与服务监控的设置 |
| 设置 → 通用 | 修改原有页 | 新增用户消息 Markdown 渲染开关 |

---

### 外观（设置 → 外观）

外观设置提供给用户极大的自定义空间，用户可根据自己需求选择背景、玻璃档位、强调色（可自动从
背景取色）、各表面不透明度、色调渐变、暗色遮罩、字体与字号、主题色滚动条
与内嵌晕影，并可把 ui-theme 的**主题偏好**（浅色 / 深色 / 跟随系统）合并进本
栏。改动通过 `ui-custom` settings 命名空间保存并**即时生效**（主题实时重渲染，
无需重启）。

**预览**—— 主题定制支持小窗预览。

<img src="https://cdn.jsdelivr.net/gh/yoli-mi/dsh-client-ui-custom@main/assets/preview-mini.png" width="720" alt="小窗预览">

也支持全屏预览，按 F2 即可退出。

<img src="https://cdn.jsdelivr.net/gh/yoli-mi/dsh-client-ui-custom@main/assets/preview-fullscreen.png" width="900" alt="全屏预览">


**预设（Preset）** —— 插件内置了六种预设，每个预设都有独立的风格（预设可独立生效，你自己的 `wallpaper` 仍会叠加在它之下）：

| id | 名称 | 风格 |
| --- | --- | --- |
| `ink-teal` | Ink Teal 黛青 | 青玉色渐变，静谧沉稳 |
| `ink-blue` | Ink Blue 黛蓝 | 黛蓝渐变，深邃克制的蓝 |
| `dusty-rose` | Dusty Rose 藕荷 | 藕荷色渐变，温润柔和的粉 |
| `apricot-gold` | Apricot Gold 杏金 | 杏金色渐变，温雅低调的金 |
| `mist-gray` | Mist Gray 雾灰 | 雾灰色渐变，清冷安静的灰蓝 |
| `ink-violet` | Ink Violet 墨紫 | 墨紫色渐变，沉静神秘 |

更多美术选择后续会扩展进这份列表 —— 见 `src/client/presets.ts`。

**玻璃档位** —— `glass` 是透明度的开关；显式设置 `wallpaperBlur`
时总是优先于档位的默认半径：

| 档位 | 模糊 | 饱和度 | 气质 |
| --- | --- | --- | --- |
| `off` | 0px | 1.0 | 不透明，无玻璃 |
| `light` | 6px | 1.15 | 轻微玻璃 |
| `frosted` | 14px | 1.25 | 强毛玻璃（默认） |
| `mica` | 22px | 1.1 | 柔和静态质感，保留壁纸色相 |

**主题配置项** —— 所有字段均可选；显式配置永远优先于预设：

| 键 | 类型 | 默认值 | 含义 |
| --- | --- | --- | --- |
| `preset` | string | `''` | 预设 id（见上表）；`''` = 不使用预设 |
| `wallpaper` | string | `''` | 壁纸 URL/路径（Web 可访问）；空字符串 = 插件保持关闭 |
| `wallpaperBlur` | number 0–60 | 玻璃档位默认 | `#root` 模糊半径（px）；显式值优先于玻璃档位 |
| `glass` | enum | `frosted` | `off` / `light` / `frosted` / `mica`（见玻璃档位表） |
| `accent` | string | `#4176e6` | 强调色，整套 deepseek 色阶由它派生 |
| `autoAccent` | boolean | `false` | 从壁纸自动派生强调色（成功后覆盖 `accent`） |
| `surfaceOpacity` | number 0–100 | `100` | 主表面不透明度（聊天/细节列） |
| `sidebarOpacity` | number 0–100 | `100` | 侧栏不透明度 |
| `inputOpacity` | number 0–100 | `100` | 输入框不透明度 |
| `codeBlockOpacity` | number 0–100 | `100` | 代码块/行内代码不透明度 |
| `darkSurfaceOpacity` | number 0–100 | `surfaceOpacity` | 暗色模式表面不透明度（独立档位） |
| `gradient` | string | `''` | 亮色模式下叠加在壁纸上的渐变；空 = 无 |
| `darkScrim` | number 0–100 | `0` | 暗色模式下壁纸上的遮罩强度 |
| `fontFamily` | string | `''` | 字体栈覆盖；空 = 主题默认 |
| `scrollbarAccent` | boolean | `false` | 滚动条使用强调色 |
| `vignette` | boolean | `false` | 应用根节点的柔和内嵌晕影 |
| `customCss` | string | `''` | 原样追加的自定义 CSS（逃生舱） |
| `customVars` | object | `{}` | 额外写到 `<html>` 上的 CSS 自定义属性（逃生舱） |

完整示例：

```yaml
config:
  preset: 'ink-teal'
  wallpaper: 'https://example.com/wall.jpg'
  glass: 'mica'              # 或 wallpaperBlur: 8 自定义半径
  autoAccent: true           # 强调色由壁纸自动派生
  customCss: |
    .some-hashed-class { border-radius: 16px; }
  customVars:
    '--my-accent-soft': 'rgb(255 127 178 / 0.3)'
```

---

### 动效（设置 → 动效）

新增的设置页，为 Web 客户端的各个界面提供 Apple 风格的入场动效。每一类动效都有
**独立的开关与样式选择**，互不牵连；也可一键应用整套预设。开关与样式存于
`ui-custom` settings 命名空间，修改实时生效。

**对话入场动效** —— 载入或切换对话时，消息逐行错峰出现，而不是瞬间跳出；每次
切换都会重放动画。6 种样式：淡入上浮 / 轻柔淡入 / 上浮放大 / 右侧滑入 / 模糊显影 / 轻盈缩放。

**侧边栏动效** —— 打开 Web 时侧边栏会话树逐项层叠出现，展开工作区时行项浮现，
当前会话行描出**常驻的选中框**。4 种样式：左侧滑入 / 轻柔淡入 / 纵向展开 / 自上而下。

**新建对话动效** —— 新建对话时，欢迎界面与输入区柔和入场。4 种大表面样式：
轻柔显影 / 轻柔淡入 / 柔和绽放 / 柔和缩放。

**设置界面动效** —— 打开设置时面板从左下角向中间扩张、关闭反向收缩；切换左侧
标签时高亮与页面内容淡入。可单独关闭，关闭后设置面板立即出现/消失。

**一键预设** —— 流畅 / 优雅 / 极简三套方案，把整套开关与样式一次应用到位，无需
逐项调试；应用后仍可自由微调。

所有动效都尊重系统「减弱动态效果」（`prefers-reduced-motion`），开启时自动降级为
短暂淡入；侧边栏选中框在关闭时完全移除。

---

### 中文界面增强（zh）

整合自 `deepseek-harness-zh_pro` 的中文化能力，设置页提供以下开关：

- **界面中文化** —— 通过词典（terms / zh-dict）与 DOM 标签改写覆盖官方未翻译的界面文案；
- **思考折叠** —— 默认展开最近若干行，支持「按钮 / 滚动」两种展开模式，可选择展开最新或最早一条；
- **统计行** —— 会话统计以整行宽度展示；
- **对话宽度** —— 可调聊天列宽度（默认 90%）；
- **归档视图** —— 在官方会话列表流中注入「已归档」视图，支持取消归档；
- **会话删除** —— 将会话日志目录移入系统回收站，并可从回收站恢复；
- **自动归档** —— 新建会话界面打开时，将闲置超过 N 天的会话加入官方归档列表（默认 7 天，`0` = 关闭）。

> DSH 0.1.5 起大量界面已由官方词典化，本模块的词典基线对应更早版本，
> 部分 DOM 层改写会失效或冗余。

---

### 丝滑流式（smooth）

整合自 `dsh-smooth-stream` 的流式打字机：助手输出按帧逐字揭示，并让增长中的
对话行平滑跟随，而不是按 chunk 突然跳出。

设置项（启用开关、动效偏好）在「**设置 → UI增强 → 增强**」标签页里，见上方
「设置改动一览」。上游的调试面板（揭示速率、队列压力、弹簧刚度/阻尼等）
在本插件中仍随「诊断面板」开关提供。

与上游不同，本插件的设置通过宿主 `settingsScope`（`ui-custom` 命名空间）读写，
不使用上游的 loopback RPC 通道；注意该 scope **必须绑定 namespace** 才能读到
本插件的 section。

---

### 通用设置项的改动

**用户消息 Markdown 渲染** —— 默认关闭；开启后你自己的消息按 Markdown
渲染（标题、列表、代码块、`@子代理` / `@技能` 引用等），关闭时与原生
纯文本外观一致。

---

### 安装

1. 确保构建会包含该包（`pnpm run build:lib:client`）。
2. 在 Web profile 的补丁层加入浏览器 roster 行 ——
   `~/.dsh/profiles/web/cordis.patch.yml`（或你 profile 中对应的 `dsh.client` roster）：

```yaml
- id: oh-my-dsh-ui
  name: 'oh-my-dsh-ui'
  config:
    preset: 'ink-teal'        # 选择预设；下面任意字段会覆盖它
    wallpaper: '/my-wall.jpg'
    wallpaperBlur: 14
```

3. 重启 `dsh web`。

自行构建时需注意：设置页要能加载，`ui-custom` 命名空间必须在 Web 客户端的
设置暴露白名单里（`packages/host/apiproxy/src/api-proxy.ts` 的
`WEB_SETTINGS_NAMESPACES`）——本检出已加入。

---

### 工作原理

- 浏览器半区先解析 `preset`（presets.ts），按 `DEFAULTS ← 预设 ← 配置`
  合并并对每个字段做钳制（config.ts），再把 `--dsu-*` 自定义属性写到
  `<html>`（apply.ts）。runner 会把 roster 行的 `config` 作为
  `apply(ctx, config)` 的第二个参数传入。
- 样式表（custom.css）消费这些变量，用比主题表更高优先级的选择器
  在 `body` / `body[data-ds-dark-theme]` 上重新声明主题 token，插件总是
  赢得级联，且不修改任何插件或 shell 源码。
- 毛玻璃给 `#root` 加 `backdrop-filter`，半透明表面透过它显示壁纸。
- 框架结构：

```
oh-my-dsh-ui/
├── src/
│   ├── shared.ts         # FEATURES + 插件配置接口
│   ├── index.ts          # 主机入口：schema / settings 注册
│   ├── client/           # 浏览器半边
│   │   ├── index.ts     # registerFeatures()：按 features 白名单挂载
│   │   ├── config.ts    # CustomThemeConfig、DEFAULTS、normalizeConfig（类型收窄+钳制）
│   │   ├── presets.ts   # ThemePreset 注册表
│   │   ├── apply.ts     # config → DOM：--dsu-* 变量、customCss、customVars
│   │   ├── custom.css   # 消费 --dsu-* 变量的 token 覆盖
│   │   └── …            # 功能子目录（appearance/ markdown/ motion/ ui-enhance/ zh/ smooth/）
│   └── server/           # 主机半边（session-delete / trash 路由）
├── lib/                  # tsdown 构建产物
├── cordis.patch.yml      # 持久 bundle 行（id: oh-my-dsh-ui）
├── tests/               # 配置管线单元测试
└── README.md            # 本文档（中文 / English 双语）
```

### 注意事项

- profile 的 `cordis.patch.yml` 改动需要重启 `dsh web` 才生效。
- 壁纸必须能被浏览器访问（例如放在 Web 服务静态根目录下，或外部 URL）。
- 插件自带的设置页（外观、动效等）修改**实时生效**、无需重启；
  通过内置「插件配置」页直接编辑 loader 层配置暂不支持（待 `ui-settings-plugins` 的 schema）。

---

## English

### Overview

Dsh-client-ui-custom is a pure front-end customization plugin for the DSH web
UI: appearance theming, entrance motion and user-message
Markdown rendering — plus two integrated third-party capabilities: **Chinese
UI enhancement** (`zh`) and **smooth streaming** (`smooth`).

- **New settings pages** — Appearance, App Usage and Motion;
- **Adds to General settings** — a user-message Markdown rendering toggle;
- **Chinese UI enhancement (zh)** — dictionaries and DOM-level localization, thinking fold, archive view, session delete (trash), auto-archive;
- **Smooth streaming (smooth)** — per-frame typewriter reveal with glide follow.

When `features` is absent or empty every feature is enabled; trim it with the
whitelist as needed. Zero shell modifications.

### Feature selection (install on demand)

The plugin is composed of five **independent** feature modules: `appearance`,
`markdown` (user-message Markdown rendering),
`motion` (entrance animations), `zh` (Chinese UI enhancement) and `smooth`
(smooth streaming). Use the `features` whitelist in the plugin config to
choose which to install:

```yaml
- id: oh-my-dsh-ui
  name: 'oh-my-dsh-ui'
  config:
    features: [appearance, zh]   # install only appearance + Chinese enhancement
```

When `features` is absent or empty, all five features are enabled.

---

### Settings at a glance

| Where | Kind | What |
| --- | --- | --- |
| Settings → UI enhancement → Appearance | tab | custom theming: wallpaper, glass, accent, surface opacity, fonts & texture |
| Settings → UI enhancement → Motion | tab | entrance motion for conversation / sidebar / new conversation, selection box, three one-click presets |
| Settings → UI enhancement → Enhancements | tab | Chinese UI enhancement (zh), smooth streaming and the service monitor |
| Settings → General | added row | user-message Markdown toggle |

---

### Appearance (Settings → Appearance)

Appearance offers a large customization space: you can choose the wallpaper,
glass level, accent color (optionally auto-derived from the wallpaper),
per-surface opacities, tone gradient, dark scrim, fonts & scale, accent
scrollbar and an inset vignette, and merge the ui-theme **theme preference**
(light / dark / system) into this section. Changes save through the
`ui-custom` settings namespace and **apply immediately** (the theme re-renders
live, no restart).

**Preview** — the theme supports a mini-window preview.

<img src="https://cdn.jsdelivr.net/gh/yoli-mi/dsh-client-ui-custom@main/assets/preview-mini.png" width="720" alt="Mini preview">

Fullscreen preview is also supported — press F2 to exit.

<img src="https://cdn.jsdelivr.net/gh/yoli-mi/dsh-client-ui-custom@main/assets/preview-fullscreen.png" width="900" alt="Fullscreen preview">

**Presets** — the plugin ships six built-in presets, each with its own distinct
style (a preset works standalone, and your own `wallpaper` still layers under
it):

| id | name | look |
| --- | --- | --- |
| `ink-teal` | Ink Teal 黛青 | jade-green gradient, quiet and steady |
| `ink-blue` | Ink Blue 黛蓝 | deep blue gradient, restrained and profound |
| `dusty-rose` | Dusty Rose 藕荷 | dusty-rose gradient, warm and gentle pink |
| `apricot-gold` | Apricot Gold 杏金 | elegant, understated warm gold |
| `mist-gray` | Mist Gray 雾灰 | cool, quiet gray-blue mist |
| `ink-violet` | Ink Violet 墨紫 | deep violet, serene and mysterious |

More art choices will extend this list — see `src/client/presets.ts`.

**Glass levels** — `glass` is the translucency switch; an explicit
`wallpaperBlur` always overrides the level's default radius:

| Level | Blur | Saturation | Vibe |
| --- | --- | --- | --- |
| `off` | 0px | 1.0 | opaque, no glass |
| `light` | 6px | 1.15 | subtle glass |
| `frosted` | 14px | 1.25 | strong frosted glass (default) |
| `mica` | 22px | 1.1 | soft static texture, keeps the wallpaper's hues |

**Theme config keys** — every field is optional; explicit values always win
over the preset:

| Key | Type | Default | Meaning |
| --- | --- | --- | --- |
| `preset` | string | `''` | Preset id (see the table above); `''` = no preset |
| `wallpaper` | string | `''` | Wallpaper URL/path (web-reachable); empty string keeps the plugin off |
| `wallpaperBlur` | number 0–60 | glass default | Blur radius (px) on `#root`; an explicit value overrides the glass level |
| `glass` | enum | `frosted` | `off` / `light` / `frosted` / `mica` (see the glass-level table) |
| `accent` | string | `#4176e6` | Accent color; the whole deepseek ramp is derived from it |
| `autoAccent` | boolean | `false` | Derive the accent from the wallpaper automatically (overrides `accent` on success) |
| `surfaceOpacity` | number 0–100 | `100` | Main surface opacity (chat/details columns) |
| `sidebarOpacity` | number 0–100 | `100` | Sidebar opacity |
| `inputOpacity` | number 0–100 | `100` | Composer input opacity |
| `codeBlockOpacity` | number 0–100 | `100` | Code block / inline code opacity |
| `darkSurfaceOpacity` | number 0–100 | `surfaceOpacity` | Dark-mode surface opacity (independent knob) |
| `gradient` | string | `''` | Light-theme gradient layered over the wallpaper; empty = none |
| `darkScrim` | number 0–100 | `0` | Dark-theme scrim strength over the wallpaper |
| `fontFamily` | string | `''` | Font stack override; empty = theme default |
| `scrollbarAccent` | boolean | `false` | Tint the scrollbar with the accent color |
| `vignette` | boolean | `false` | Soft inset vignette on the app root |
| `customCss` | string | `''` | Raw custom CSS appended verbatim (escape hatch) |
| `customVars` | object | `{}` | Extra CSS custom properties written onto `<html>` (escape hatch) |

Full example:

```yaml
config:
  preset: 'ink-teal'
  wallpaper: 'https://example.com/wall.jpg'
  glass: 'mica'              # or wallpaperBlur: 8 for a custom radius
  autoAccent: true           # accent derived from the wallpaper
  customCss: |
    .some-hashed-class { border-radius: 16px; }
  customVars:
    '--my-accent-soft': 'rgb(255 127 178 / 0.3)'
```

---

### Motion (Settings → Motion)

A new settings page that brings Apple-style entrance motion to the web client's
surfaces. Every kind of motion has its **own toggle and style picker** — they do
not depend on each other — and the whole combination can be applied at once
through one-click presets. Toggles and styles live in the `ui-custom` settings
namespace and take effect immediately.

**Conversation entrance motion** — messages cascade in row by row when a
conversation loads or switches, instead of popping in at once; the animation
replays on every visit. Six styles: fade-up / gentle fade / rise & scale /
slide-in / blur-in / gentle scale.

**Sidebar motion** — the session tree cascades in on web load, workspace rows
fade in when their group expands, and the active conversation row traces a
**persistent selection box**. Four styles: slide-in from left / gentle fade /
expand / drop-in.

**New-conversation motion** — a brand-new conversation's welcome dialog and
composer arrive softly. Four large-surface styles: soft reveal / gentle fade /
gentle bloom / soft zoom.

**Settings-shell motion** — the settings dialog expands from the lower-left and
contracts on close; nav highlight and page content fade in on switch. Can be
turned off on its own, in which case the panel appears and disappears instantly.

**One-click presets** — Fluid / Elegant / Minimal apply the entire combination
of toggles and styles at once, no per-option tuning needed; everything stays
editable afterwards.

All motion respects the system "reduce motion" preference
(`prefers-reduced-motion`), degrading to a short cross-fade when enabled; the
sidebar selection box is fully removed while off.

---

### Chinese UI enhancement (zh)

Integrated from `deepseek-harness-zh_pro`. The settings page exposes:

- **UI localization** — dictionaries (terms / zh-dict) plus DOM label rewriting for text the official locale leaves in English;
- **Thinking fold** — expand the most recent N lines by default, with "button" / "scroll" expand modes and a latest/earliest choice;
- **Stats row** — render session stats across the full row width;
- **Chat width** — adjustable chat-column width (default 90%);
- **Archive view** — inject an "archived" view into the official conversation list, with unarchive support;
- **Session delete** — move a session's log directory into the OS trash, restorable from the trash list;
- **Auto-archive** — when the new-session UI opens, sessions idle for more than N days join the official archive list (default 7 days, `0` = off).

> Since DSH 0.1.5 much of the UI is localized upstream; this module's
> dictionaries target an earlier baseline, so some DOM-level rewrites are now
> inert or redundant.

---

### Smooth streaming (smooth)

Integrated from `dsh-smooth-stream`: assistant output is revealed character by
character per frame, and growing chat rows glide instead of jumping per chunk.

Its settings (enable switch, motion preference) live under **Settings → UI
enhancement → Enhancements**; see "Settings at a glance" above. Upstream's
diagnostics panel (reveal rate, queue pressure, spring stiffness/damping, …) is
still available behind the diagnostics switch.

Unlike upstream, settings here are read and written through the host
`settingsScope` (`ui-custom` namespace) rather than upstream's loopback RPC
channel — and that scope **must be bound to the namespace**, otherwise this
plugin's section is not visible on it.

---

### General settings additions

**User-message Markdown rendering** — off by default; when enabled your own
messages render as Markdown (headings, lists, code blocks, `@subagent` /
`@skill` references, …); when off, they look the same as stock plain text.

---

### Install

1. Make sure the package is included in your build (`pnpm run build:lib:client`).
2. Add a browser-roster row to your web profile's patch layer —
   `~/.dsh/profiles/web/cordis.patch.yml` (or the corresponding `dsh.client`
   roster in your profile):

```yaml
- id: oh-my-dsh-ui
  name: 'oh-my-dsh-ui'
  config:
    preset: 'ink-teal'        # pick a preset; any field below overrides it
    wallpaper: '/my-wall.jpg'
    wallpaperBlur: 14
```

3. Restart `dsh web`.

Self-builders: for the settings pages to load, the `ui-custom` namespace must
be in the web client's settings exposure allowlist
(`WEB_SETTINGS_NAMESPACES` in `packages/host/apiproxy/src/api-proxy.ts`) — it
is already in this checkout.

---

### How it works

- The browser half first resolves `preset` (presets.ts), merges
  `DEFAULTS ← preset ← config` and clamps every field (config.ts), then writes
  the `--dsu-*` custom properties onto `<html>` (apply.ts). The runner passes
  the roster row's `config` to `apply(ctx, config)` as the second argument.
- The stylesheet (custom.css) consumes these variables and re-declares
  the theme tokens on `body` / `body[data-ds-dark-theme]` with selectors that
  out-specify the theme sheets, so the plugin always wins the cascade — no
  plugin or shell source is modified.
- Frosted glass adds `backdrop-filter` to `#root`, and translucent surfaces
  show the wallpaper through it.
- Framework layout:

```
oh-my-dsh-ui/
├── src/
│   ├── shared.ts          # FEATURES + plugin config interfaces
│   ├── index.ts           # host entry: schema / settings registration
│   ├── client/            # browser half
│   │   ├── index.ts       # registerFeatures(): mount per features whitelist
│   │   ├── config.ts      # CustomThemeConfig, DEFAULTS, normalizeConfig (type narrowing + clamping)
│   │   ├── presets.ts     # ThemePreset registry
│   │   ├── apply.ts       # config → DOM: --dsu-* vars, customCss, customVars
│   │   ├── custom.css     # token overrides consuming the --dsu-* vars
│   │   └── …              # feature subdirectories (appearance/ markdown/ motion/ ui-enhance/ zh/ smooth/)
│   └── server/            # host half (session-delete / trash routes)
├── lib/                   # tsdown build output
├── cordis.patch.yml       # persistent bundle row (id: oh-my-dsh-ui)
├── tests/                 # config pipeline unit tests
└── README.md              # this file (中文 / English bilingual)
```

### Notes

- Changes to a profile's `cordis.patch.yml` only take effect after a
  `dsh web` restart.
- The wallpaper must be reachable by the browser (e.g. placed under the web
  server's static root, or an external URL).
- The plugin's own settings pages (Appearance, App Usage, Motion, …) apply
  changes immediately without a restart; editing the loader-layer config
  directly through the built-in Plugin Configuration page is not supported yet
  (pending the `ui-settings-plugins` schema).
