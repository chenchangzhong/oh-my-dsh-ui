import { defineConfig } from 'tsdown'
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * oh-my-dsh-ui 构建配置（自包含，替代缺失的 ../tsdown.client.ts）。
 *
 * 产出与 DSH 官方 client bundle 相同的形态（与内置 dsh-client-ui-settings 产物的注解一致）：
 *   lib/client.js   → window.__ModuleLoader__.load({ id: 'oh-my-dsh-ui', factory: (require) => { require("@deepseek-ai/...") ... } })
 *                      factory 内通过 require 解析 dsh-client 依赖，而不是 iife 的 globals 映射
 *   lib/index.js    → node 半边（ESM）
 *   lib/invariant.js→ invariant 伴生插件（ESM）
 */

/**
 * 修回被 Lightning CSS 合并掉的 `backdrop-filter`。
 *
 * Lightning CSS 把 `-webkit-backdrop-filter` 与标准 `backdrop-filter` 当作同一个属性，
 * 同一条规则里**只保留最后一条**（源码习惯写「标准在前、前缀在后」，于是产物里标准属性
 * 永远被丢掉，只剩 `-webkit-`）。在不把 `-webkit-` 当别名的引擎（Firefox、以及把两者
 * 当独立属性的 WebKit）里，这会让磨砂静默失效——实测 @tsdown/css 加 targets 也不会补回来。
 * 因此在这里把缺失的一半补上：先摘掉侥幸存活的标准声明，再在每条前缀声明后面补一条标准声明。
 * @param css - Lightning CSS 处理后的样式文本。
 * @returns 同时含前缀与标准两种写法的样式文本。
 */
function withBothBackdropFilters(css: string): string {
  // 单次扫描、两种形态都收（Lightning CSS 只保留最后一条，故留下的可能是任意一条）：
  // 每命中一条声明就重写成「前缀 + 标准」成对写法。替换结果不再参与本轮匹配，不会重复插入。
  return css.replace(
    /[ \t]*(-webkit-)?backdrop-filter:([^;]+);/g,
    (_match, _prefix: string | undefined, value: string) =>
      `-webkit-backdrop-filter:${value};\n  backdrop-filter: ${value.trim()};`,
  )
}

/**
 * 内联 CSS 的关键步骤。
 * @tsdown/css 0.22.14 只支持 css.inject 为 boolean：
 *   - false → 拆出外部 lib/style.css（运行时从不被加载，UI 无样式）
 *   - true  → 在文件首行插入 `import './style.css'`，把 window.__ModuleLoader__.load 推到第二行，
 *             触发 "loaded without registering via __ModuleLoader__.load"。
 * 原插件（@ha-na-bi/dsh-client-ui-custom）的 lib/client.js 做法是：把每条 .module.css 的 CSS 文本
 * 作为字符串常量内联进 JS，运行时 createElement("style") + textContent 注入 <head>。
 * 这里复刻该行为：构建后把 lib/style.css 整个读入，作为一个运行时 <style> 注入块插入 factory 顶部，
 * 再删除外部 lib/style.css。window.__ModuleLoader__.load 始终在文件首行。
 */
function inlineStyleCss() {
  const cssPath = resolve('lib/style.css')
  const outPath = resolve('lib/client.js')
  if (!existsSync(cssPath) || !existsSync(outPath)) return
  const raw = readFileSync(cssPath, 'utf8')
  if (!raw.trim()) return
  const css = withBothBackdropFilters(raw)
  // 源码里只要有声明，产物就必须是「前缀/标准」数量相等且都非零——否则说明补丁失效了
  // （例如源码顺序反过来时，旧版补丁会把属性删光，而简单比对计数查不出来）。
  const declared = (raw.match(/backdrop-filter:/g) ?? []).length
  const prefixed = (css.match(/-webkit-backdrop-filter:/g) ?? []).length
  const standard = (css.match(/(?<!-webkit-)backdrop-filter:/g) ?? []).length
  if (declared > 0 && (prefixed !== standard || prefixed === 0)) {
    console.warn(`[tsdown] backdrop-filter 修复异常: 源码 ${declared} 条 / 产物 前缀 ${prefixed} 标准 ${standard}`)
  }
  let code = readFileSync(outPath, 'utf8')
  // 注入点：banner 末尾 `Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });` 之后。
  const marker = 'Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });'
  const idx = code.indexOf(marker)
  if (idx === -1) {
    console.warn('[tsdown] inlineStyleCss: marker not found, skip CSS inlining')
    return
  }
  const inject = `\n\t\t;(function(){if(typeof document!=="undefined"&&document.head){if(document.head.querySelector('style[data-plugin-css="oh-my-dsh-ui/bundle.css"]')===null){var __s=document.createElement("style");__s.dataset.plugin="oh-my-dsh-ui";__s.dataset.pluginCss="oh-my-dsh-ui/bundle.css";__s.textContent=${JSON.stringify(css)};document.head.appendChild(__s);}}})();`
  const insertAt = idx + marker.length
  code = code.slice(0, insertAt) + inject + code.slice(insertAt)
  writeFileSync(outPath, code)
  unlinkSync(cssPath)
  console.log('[tsdown] inlined lib/style.css into lib/client.js and removed external file')
}
const NEVER_BUNDLE = [
  /^@deepseek-ai\//,
  /^react(\/|$)/,
  /^react-dom(\/|$)/,
]

const CLIENT_BANNER = `window.__ModuleLoader__.load({
	id: "oh-my-dsh-ui",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });`

const CLIENT_FOOTER = `		return module.exports;
	}
});`

export default defineConfig([
  {
    // client bundle: browser half（外观/动效/中文优化/丝滑流式）
    // DSH 客户端约定：window.__ModuleLoader__.load({ id, factory: (require) => { require("@deepseek-ai/...") ... } })
    // 与内置 dsh-client-ui-settings/lib/client.js 完全一致——factory 内用 require 取依赖，cjs 产物。
    //
    // 关键（曾导致 "loaded without registering via __ModuleLoader__.load"）：CSS 必须内联进 JS，
    // 由运行时创建 <style> 标签注入（与原插件一致，见 lib/client.js 中的 createElement("style")+textContent）。
    // 绝不能开启 css.inject / injectStyle：那会让 tsdown 在文件顶部插入 `import './style.css'` 并把样式拆成
    // 外部 lib/style.css，从而把 window.__ModuleLoader__.load(...) 推到第二行，破坏 DSH 的 loader 注册。
    entry: ['src/client/index.ts'],
    format: ['cjs'],
    platform: 'browser',
    outDir: 'lib',
    outFile: 'client',
    // 默认 css.inject=false → 样式打包进 JS 并在运行时注入；injected 的 <style> 标签位于 factory 内部，
    // 不影响文件首行的 window.__ModuleLoader__.load 注册。
    css: { inject: false },
    deps: { neverBundle: NEVER_BUNDLE },
    banner: { js: CLIENT_BANNER },
    footer: { js: CLIENT_FOOTER },
    treeshake: true,
    sourcemap: false,
    clean: false,
    dts: true,
    onSuccess: inlineStyleCss,
    outputOptions: {
      // 声明固定叫 client.d.ts：entry 名是 index（src/client/index.ts），套用
      // `${chunk.name}.ts` 会与 node 半边的 lib/index.d.ts 撞名并互相覆盖。
      entryFileNames: (chunk) => (chunk.name.endsWith('.d') ? 'client.d.ts' : 'client.js'),
    },
  },
  {
    // node half: host 注册（lib/index.js）+ invariant（lib/invariant.js）
    entry: ['src/index.ts', 'src/invariant.ts'],
    format: ['esm'],
    platform: 'node',
    outDir: 'lib',
    deps: { neverBundle: NEVER_BUNDLE },
    treeshake: true,
    sourcemap: false,
    clean: false,
    dts: true,
    outputOptions: {
      // 声明 chunk 的 name 以 `.d` 结尾（tsdown 内部约定）：必须让它保留 `.d.ts`，
      // 否则会被下面的 JS 命名规则套用、产出 lib/index.ts 这类垃圾文件。
      entryFileNames: (chunk) => chunk.name.endsWith('.d')
        ? `${chunk.name}.ts`
        : (chunk.name === 'invariant' ? 'invariant.js' : 'index.js'),
    },
  },
])