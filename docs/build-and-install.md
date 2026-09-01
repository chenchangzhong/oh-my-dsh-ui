# oh-my-dsh-ui 打包安装速查

> 本仓库：`/Users/zhong/project/dsh-plugins/ui-custom`
> 作用：每次改完 smooth / zh / appearance 等源码后，按本流程打包并生效，不用再问。

---

## 1. 打包（一条命令）

```bash
cd /Users/zhong/project/dsh-plugins/ui-custom
./node_modules/.bin/tsdown
```

- 产物：`lib/client.js`（浏览器半边，~434 kB，CSS 已内联）+ `lib/index.js` + `lib/invariant.js`（Host 半边）
- 用 `./node_modules/.bin/tsdown` **不走** `pnpm bundle`（绕过 pnpm install 校验）
- 成功标志：日志尾部出现 `[tsdown] inlined lib/style.css into lib/client.js and removed external file`

## 2. 安装（无需拷贝，软链已存在）

```bash
# 验证软链（已配置好，正常情况下无需操作）
ls -la ~/.dsh/profiles/web/node_modules/oh-my-dsh-ui
# 期望输出：oh-my-dsh-ui -> /Users/zhong/project/dsh-plugins/ui-custom

# DSH 通过 package.json exports 的 "./client" 加载 lib/client.js，打包后实时生效
```

- 安装方式是**软链**而非拷贝：`~/.dsh/profiles/web/node_modules/oh-my-dsh-ui` 指向源码目录
- 不需要 `rsync`、不需要 `dsh plugin add`
- 注意：`deepseek-harness-zh_pro` 未软链到 profile，oh-my-dsh-ui 独立承载删除/zh/smooth，不需要双插件

## 3. 验证产物（可选）

```bash
node -e "
const fs = require('fs');
const buf = fs.readFileSync('/Users/zhong/.dsh/profiles/web/node_modules/oh-my-dsh-ui/lib/client.js', 'utf8');
console.log('DiffViewer-module_block:', buf.includes('DiffViewer-module_block'));
console.log('data-smooth-excluded:', buf.includes('data-smooth-excluded'));
"
```

## 4. 生效（必须重启 + 硬刷新）

1. **完全退出** DSH Desktop（不是关窗口，是退出应用）
2. 重新打开
3. 浏览器 **`Cmd+Shift+R`** 硬刷新

> 普通修改没有 HMR（除非同时跑 `pnpm run dev:web`），必须重启 + 硬刷新。

---

## 5. smooth 文字渐显排除策略（2026-08 确认）

| 目标 | 是否排除 | 原因 |
|------|---------|------|
| `.DiffViewer-module_block`（DiffViewer） | ✅ 排除 | 区域**高度固定**不随代码增高，逐字渐显看着割裂 |
| `[data-smooth-excluded]`（通用开关） | ✅ 排除 | 任何元素加此属性即跳过渐显 |
| markdown 代码块（`code`） | ❌ 不排除 | 高度随代码增高，不割裂，保持逐字渐显 |

- 实现位置：`src/client/smooth/useProgressiveDomText.ts` 的 `SKIP_TEXT_SELECTOR`
- 滚动跟随侧：`src/client/smooth/teleprompterGlide.ts` 的 `SHIFT_EXCLUDED_CLASSES = ['DiffViewer-module_block']`
- 曾尝试让代码围栏整段揭示（`immediateRanges`/`computeCodeFenceRanges`），用户否决后已全部回滚，`useSmoothStreamContent.ts` 无该逻辑

## 6. 快速排查清单

| 现象 | 可能原因 | 处理 |
|------|---------|------|
| 改了源码没效果 | 没重启 / 没硬刷新 | 按第 4 节重启 + `Cmd+Shift+R` |
| 改了源码没效果（已重启） | 没跑 tsdown / 构建失败 | 跑第 1 节命令，看 `inlined` 日志 |
| 构建报错 | pnpm 依赖缺失 | 用 `./node_modules/.bin/tsdown` 而非 `pnpm bundle` |
| 加载的是旧版 | 软链丢失 | 检查第 2 节软链是否存在 |
| 验证产物 | 需要 grep 关键串 | 用第 3 节 node 脚本 |
