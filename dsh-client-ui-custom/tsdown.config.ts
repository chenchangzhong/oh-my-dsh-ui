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
  const css = readFileSync(cssPath, 'utf8')
  if (!css.trim()) return
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
    sourcemap: true,
    clean: false,
    dts: false,
    onSuccess: inlineStyleCss,
    outputOptions: {
      entryFileNames: 'client.js',
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
    sourcemap: true,
    clean: false,
    dts: false,
    outputOptions: {
      entryFileNames: (chunk) => (chunk.name === 'invariant' ? 'invariant.js' : 'index.js'),
    },
  },
])