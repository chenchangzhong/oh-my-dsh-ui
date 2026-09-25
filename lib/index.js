import z from "@deepseek-ai/schemastery";
import { basename, dirname, join } from "node:path";
import { homedir, platform } from "node:os";
import { access, cp, mkdir, readFile, readdir, readlink, rename, rm, stat, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { connect } from "node:net";
import { promisify } from "node:util";
//#region src/shared.ts
/**
* Settings-namespace contract shared by the Host registration (node half)
* and the browser scope (client half). Node-safe: no DOM, no React.
*/
/** Settings namespace owned by ui-custom (runtime-editable section). */
const UI_CUSTOM_SETTINGS_NS = "ui-custom";
/**
* Individually selectable plugin features. The loader config's `features`
* field is a whitelist: absent or empty = every feature mounts (backward
* compatible); present = only the listed features register. Each feature
* owns its settings rows / pages, so an unlisted feature is simply absent
* from the Settings surface and the DOM.
*/
const FEATURES = [
	"markdown",
	"appearance",
	"motion",
	"zh",
	"smooth"
];
/** One selectable conversation entrance-motion style. */
const MOTION_STYLES = [
	"fade-up",
	"fade",
	"rise-scale",
	"slide-in",
	"blur-in",
	"scale-in"
];
/** Default entrance style when the user-settings document has no override. */
const DEFAULT_MOTION_STYLE = "fade-up";
/** Guard for a MotionStyle value (unknown ids fall back to the default). */
const isMotionStyle = (value) => typeof value === "string" && MOTION_STYLES.includes(value);
/**
* Selectable sidebar entrance-motion styles. The sidebar is a horizontal
* rail, so its motion is horizontal (slide from the screen edge) or a plain
* cross-fade — deliberately distinct from the transcript's vertical styles.
* The tree rows also suit a drop-in (slide-down) or a vertical unfold
* (expand), both of which read as rows settling into the list.
*/
const SIDEBAR_MOTION_STYLES = [
	"slide-left",
	"fade",
	"expand",
	"slide-down"
];
/**
* Selectable new-conversation entrance styles. The welcome dialog is a LARGE
* surface, so its motion is deliberately gentler than the transcript's:
* slower (420ms), barely-there travel (4px) and no pronounced scaling or
* sideways slides — a large block moving visibly reads as mechanical.
* `zoom` keeps the same discipline: a whisper-quiet scale with no travel.
*/
const NEW_CHAT_MOTION_STYLES = [
	"reveal",
	"fade",
	"bloom",
	"zoom"
];
/** Default new-conversation style when the user-settings document has no override. */
const DEFAULT_NEW_CHAT_MOTION_STYLE = "reveal";
/** Guard for a NewChatMotionStyle value (unknown ids fall back to the default). */
const isNewChatMotionStyle = (value) => typeof value === "string" && NEW_CHAT_MOTION_STYLES.includes(value);
/** Default sidebar style when the user-settings document has no override. */
const DEFAULT_SIDEBAR_MOTION_STYLE = "slide-left";
/** Guard for a SidebarMotionStyle value (unknown ids fall back to the default). */
const isSidebarMotionStyle = (value) => typeof value === "string" && SIDEBAR_MOTION_STYLES.includes(value);
//#endregion
//#region src/server/util.ts
/** Package name used in log prefixes. */
const PKG = "oh-my-dsh-ui";
function log(message) {
	console.log(`[${PKG}] ${message}`);
}
function warn(message) {
	console.warn(`[${PKG}] ${message}`);
}
//#endregion
//#region src/server/trash.ts
function psSingleQuote(value) {
	return `'${value.replaceAll("'", "''")}'`;
}
function runPowerShellTrash(path) {
	const command = `Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory(${psSingleQuote(path)}, 'OnlyErrorDialogs', 'SendToRecycleBin')`;
	return new Promise((resolve, reject) => {
		const child = execFile("powershell.exe", [
			"-NoProfile",
			"-NonInteractive",
			"-ExecutionPolicy",
			"Bypass",
			"-Command",
			command
		], {
			windowsHide: true,
			maxBuffer: 4194304
		}, (error, stdout, stderr) => {
			if (error) {
				const detail = String(stderr || stdout || error.message).trim();
				reject(/* @__PURE__ */ new Error(`PowerShell 回收站失败: ${detail || error.message}`));
				return;
			}
			resolve();
		});
		child.on("spawn", () => {
			child.stdout?.resume();
			child.stderr?.resume();
		});
	});
}
async function trashWin32(path) {
	await runPowerShellTrash(path);
	return path;
}
async function restoreWin32(originalPath) {
	const quotedParent = psSingleQuote(dirname(originalPath));
	const quotedName = psSingleQuote(basename(originalPath));
	const script = [
		`$Target = ${psSingleQuote(originalPath)}`,
		`$Parent = ${quotedParent}`,
		`$Name = ${quotedName}`,
		"$shell = New-Object -ComObject Shell.Application",
		"$bin = $shell.Namespace(0xA)",
		"foreach ($item in $bin.Items()) {",
		"  $from = $item.ExtendedProperty('System.Recycle.DeletedFrom')",
		"  if ($from -ne $Parent) { continue }",
		"  if ($item.Name -ne $Name) { continue }",
		"  $physical = $item.Path",
		"  if ($physical) {",
		"    if (Test-Path -LiteralPath $Target) { Remove-Item -LiteralPath $Target -Recurse -Force }",
		"    if (-not (Test-Path -LiteralPath $Parent)) { New-Item -ItemType Directory -Path $Parent -Force | Out-Null }",
		"    Move-Item -LiteralPath $physical -Destination $Parent -Force",
		"    $moved = Join-Path $Parent $Name",
		"    $landed = Join-Path $Parent (Split-Path -Leaf $physical)",
		"    if ($landed -ne $moved -and (Test-Path -LiteralPath $landed)) { Move-Item -LiteralPath $landed -Destination $moved -Force }",
		"    Write-Output \"RESTORED:$Target\"",
		"    exit 0",
		"  }",
		"}",
		"Write-Output \"NOT-FOUND:$Target\"",
		"exit 1"
	].join("\n");
	await new Promise((resolve, reject) => {
		const child = execFile("powershell.exe", [
			"-NoProfile",
			"-NonInteractive",
			"-ExecutionPolicy",
			"Bypass",
			"-Command",
			script
		], {
			windowsHide: true,
			maxBuffer: 4194304
		}, (error, stdout, stderr) => {
			if (error) {
				const detail = String(stdout || stderr || error.message).trim();
				reject(/* @__PURE__ */ new Error(`Windows 回收站恢复失败: ${detail || error.message}`));
				return;
			}
			resolve();
		});
		child.on("spawn", () => {
			child.stdout?.resume();
			child.stderr?.resume();
		});
	});
}
const TRASH_DIR_DARWIN = join(homedir(), ".Trash");
async function trashDarwin(path) {
	const name = basename(path);
	let target = join(TRASH_DIR_DARWIN, name);
	if (await exists(target)) target = join(TRASH_DIR_DARWIN, `${name}-${Date.now()}`);
	await rename(path, target);
	return target;
}
async function restoreDarwin(location, originalPath) {
	await mkdir(dirname(originalPath), { recursive: true });
	if (await exists(location)) {
		await rename(location, originalPath);
		return;
	}
	await mkdir(originalPath, { recursive: true });
}
function xdgTrashDir() {
	const dataHome = process.env.XDG_DATA_HOME;
	return dataHome !== void 0 && dataHome !== "" ? join(dataHome, "Trash") : join(homedir(), ".local", "share", "Trash");
}
async function exists(path) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}
async function trashXdg(path) {
	const trash = xdgTrashDir();
	const filesDir = join(trash, "files");
	const infoDir = join(trash, "info");
	await mkdir(filesDir, { recursive: true });
	await mkdir(infoDir, { recursive: true });
	const name = basename(path);
	let targetName = name;
	let suffix = 1;
	while (await exists(join(filesDir, targetName)) || await exists(join(infoDir, `${targetName}.trashinfo`))) {
		suffix += 1;
		targetName = `${name}.${suffix}`;
	}
	try {
		await rename(path, join(filesDir, targetName));
	} catch (error) {
		if (error?.code !== "EXDEV") throw error;
		await cp(path, join(filesDir, targetName), { recursive: true });
		await rm(path, {
			recursive: true,
			force: true
		});
	}
	const deletedAt = (/* @__PURE__ */ new Date()).toISOString().replace(/\.\d{3}Z$/, "Z");
	const info = `[Trash Info]\nPath=${escapeTrashPath(path)}\nDeletionDate=${deletedAt}\n`;
	await writeFile(join(infoDir, `${targetName}.trashinfo`), info, "utf8");
	return join(filesDir, targetName);
}
function escapeTrashPath(path) {
	return path.split("/").map((segment) => encodeURIComponent(segment)).join("/");
}
function unescapeTrashPath(escaped) {
	return escaped.split("/").map((segment) => decodeURIComponent(segment)).join("/");
}
async function restoreXdg(location, originalPath) {
	let resolved = null;
	const infoDir = join(xdgTrashDir(), "info");
	try {
		const entries = await readdir(infoDir);
		for (const entry of entries) {
			if (!entry.endsWith(".trashinfo")) continue;
			const content = await readFile(join(infoDir, entry), "utf8");
			const match = /^Path=(.+)$/m.exec(content);
			if (match === null) continue;
			if (unescapeTrashPath(match[1]) === originalPath) {
				resolved = join(xdgTrashDir(), "files", entry.slice(0, -10));
				await rm(join(infoDir, entry), { force: true });
				break;
			}
		}
	} catch {
		resolved = null;
	}
	const source = resolved ?? location;
	await mkdir(dirname(originalPath), { recursive: true });
	if (await exists(source)) {
		await rename(source, originalPath);
		return;
	}
	await mkdir(originalPath, { recursive: true });
}
/**
* 把目录移入系统回收站。
* @param path - 绝对目录路径。
* @returns { ok: true; location: string } 成功；失败抛出 Error。
*/
async function trashItem(path) {
	const current = platform();
	return {
		ok: true,
		location: current === "win32" ? await trashWin32(path) : current === "darwin" ? await trashDarwin(path) : await trashXdg(path)
	};
}
/**
* 把目录从回收站恢复回原路径。
* @param location - trashItem 返回的位置（win32 传原路径）。
* @param originalPath - 恢复目标原路径。
*/
async function restoreItem(location, originalPath) {
	const current = platform();
	if (current === "win32") await restoreWin32(originalPath);
	else if (current === "darwin") await restoreDarwin(location, originalPath);
	else await restoreXdg(location, originalPath);
}
//#endregion
//#region src/server/service-monitor.ts
const execFileAsync = promisify(execFile);
/** 单次扫描命令超时（毫秒）。 */
const SCAN_TIMEOUT_MS = 8e3;
/** 面板单页最多显示的条目数（客户端截断，这里只产出数据）。 */
const MAX_ENDPOINTS = 50;
function endpointKey(address, port) {
	return `${address}|${port}`;
}
/** 命令行最长保留字符数（超长截断，避免提示内容过大）。 */
const OWNER_CMDLINE_MAX = 400;
/** 单次解析命令超时（毫秒）。 */
const OWNER_RESOLVE_TIMEOUT_MS = 12e3;
/** 解析失败（命令异常）后的负缓存时长：期间同端点悬停不再重试。 */
const OWNER_FAILED_RETRY_MS = 3e4;
function truncateField(value, max) {
	const text = value.replace(/[\r\n\0]+/g, " ").trim();
	return text.length > max ? text.slice(0, max - 1) + "…" : text;
}
/** 进程命令行脱敏：保留参数结构，但不让凭据进入归属快照。 */
function sanitizeCmdline(raw) {
	let text = raw.trim();
	const secret = "(?:[A-Za-z0-9_-]{12,}(?:\\.[A-Za-z0-9_-]+){2}|[A-Za-z0-9_-]{12,})";
	text = text.replace(new RegExp(`(^|\\s)(--?[A-Za-z0-9][A-Za-z0-9_-]*|[A-Za-z][A-Za-z0-9_-]*)=(${secret})(?=$|\\s)`, "g"), "$1$2=***");
	text = text.replace(new RegExp(`(^|\\s)(--?[A-Za-z0-9][A-Za-z0-9_-]*|[A-Za-z][A-Za-z0-9_-]*)\\s+(${secret})(?=$|\\s)`, "g"), "$1$2 ***");
	text = text.replace(/(Bearer)\s+[^\s]+/gi, "$1 ***");
	text = text.replace(/(?<![A-Za-z0-9_-])[A-Za-z0-9][A-Za-z0-9_-]{19,}(?![A-Za-z0-9_-])/g, "***");
	return text;
}
/** 可归属的目标主机：仅 localhost / IPv4 字面量 / 含冒号（IPv6）。域名不匹配本机监听。 */
function isAttributableHost(host) {
	const text = String(host).trim().toLowerCase();
	if (text === "" || text.length > 64) return false;
	if (text === "localhost") return true;
	if (text.includes(":")) return true;
	return /^\d{1,3}(\.\d{1,3}){3}$/.test(text);
}
/** 自定义/请求目标与监听端点是否命中同一端口（先经 isAttributableHost 把关）。 */
function targetMatchesListen(targetHost, targetPort, listenAddress, listenPort) {
	if (!isAttributableHost(targetHost)) return false;
	if (targetPort !== listenPort) return false;
	let target = String(targetHost).trim().toLowerCase();
	if (target.startsWith("[")) {
		const close = target.indexOf("]");
		target = close === -1 ? target.slice(1) : target.slice(1, close);
	}
	if (target === "localhost") target = "127.0.0.1";
	let listen = String(listenAddress).trim().toLowerCase();
	if (listen === "*") listen = "0.0.0.0";
	if (listen.startsWith("[")) {
		const close = listen.indexOf("]");
		listen = close === -1 ? listen.slice(1) : listen.slice(1, close);
	}
	if (listen === "0.0.0.0") return !target.includes(":");
	if (listen === "::") return target.includes(":");
	return target === listen;
}
/**
* 解析 netsh http 输出中指定端口的请求队列归属。
*
* `view=requestq verbose=yes` 的每个队列块内，Processes（`ID: <pid>, image:
* <路径>`）与 Registered URLs（`HTTP://host:port...`）同块出现；输出存在
* 嵌套标签，不能按「Request queue name:」切块，改为对每个命中端口的 URL
* 行取**上方最近**的 `ID:` 行（同一队列块内 Processes 在 URL groups 之前）；
* `Services:` 只在该 ID 行与 URL 行之间取，避免跨队列块误取相邻服务的标注。
*/
function parseHttpSysQueueOwner(text, port) {
	if (typeof text !== "string" || !Number.isInteger(port) || port < 1 || port > 65535) return null;
	const lines = text.split(/\r?\n/);
	let best = null;
	for (let i = 0; i < lines.length; i += 1) {
		const line = (lines[i] ?? "").trim();
		if (!/^HTTP:\/\//i.test(line)) continue;
		if (!httpSysUrlHasPort(line, port)) continue;
		let idIndex = -1;
		let pid = 0;
		let image = "";
		for (let j = i - 1; j >= 0 && i - j <= 80; j -= 1) {
			const idMatch = (lines[j] ?? "").match(/^\s*ID:\s*(\d+)\s*,\s*image:\s*(.+?)\s*$/);
			if (idMatch !== null) {
				idIndex = j;
				pid = Number.parseInt(idMatch[1] ?? "", 10);
				image = idMatch[2] ?? "";
				break;
			}
		}
		if (idIndex === -1) continue;
		let services = "";
		for (let j = idIndex; j < i; j += 1) {
			const serviceMatch = (lines[j] ?? "").match(/^\s*Services:\s*(.+?)\s*$/);
			if (serviceMatch !== null) {
				services = serviceMatch[1] ?? "";
				break;
			}
		}
		const distance = i - idIndex;
		if (best === null || distance < best.distance) best = {
			pid,
			image,
			services,
			distance
		};
	}
	if (best === null) return null;
	return {
		pid: best.pid,
		image: best.image,
		services: best.services
	};
}
/** netsh 注册 URL（`HTTP://127.0.0.1:19443:127.0.0.1/`、`HTTP://+:81/...`）是否包含端口。 */
function httpSysUrlHasPort(url, port) {
	for (const match of url.matchAll(/:(\d+)(?=:|\/)/g)) if (Number.parseInt(match[1] ?? "", 10) === port) return true;
	return false;
}
/** 单次连接探活超时（毫秒）。 */
const PROBE_TIMEOUT_MS = 1200;
/** 单次请求最多接受的自定义监控项数。 */
const PROBE_MAX_TARGETS = 100;
function isLoopbackLiteral(host) {
	const normalized = host.toLowerCase();
	if (normalized === "localhost" || normalized === "::1" || normalized === "[::1]") return true;
	const octets = normalized.split(".");
	if (octets.length !== 4 || octets[0] !== "127") return false;
	return octets.every((octet) => /^\d{1,3}$/.test(octet) && Number.parseInt(octet, 10) <= 255);
}
function normalizeProbeTarget(item) {
	if (item === null || typeof item !== "object") return null;
	const record = item;
	const name = typeof record.name === "string" ? record.name.slice(0, 60) : "";
	const host = typeof record.host === "string" ? record.host.trim().slice(0, 100) : "";
	const port = typeof record.port === "number" && Number.isFinite(record.port) ? Math.round(record.port) : 0;
	if (host === "" || port < 1 || port > 65535) return null;
	if (/[\s/\\]/.test(host)) return null;
	return {
		name,
		host,
		port
	};
}
function probeOne(target) {
	return new Promise(function(resolve) {
		let socket;
		try {
			socket = connect({
				host: target.host,
				port: target.port
			});
		} catch {
			resolve({
				...target,
				online: false
			});
			return;
		}
		let settled = false;
		const finish = function(online) {
			if (settled) return;
			settled = true;
			socket.destroy();
			resolve({
				...target,
				online
			});
		};
		socket.setTimeout(PROBE_TIMEOUT_MS, function() {
			finish(false);
		});
		socket.once("connect", function() {
			finish(true);
		});
		socket.once("error", function() {
			finish(false);
		});
	});
}
/**
* 对请求携带的自定义监控项逐个处理：仅环回字面量发起 TCP 连接探活
* （避免探活 API 被用作内网/公网扫描器）；格式合法但非环回的项不拒绝
* 整个请求，直接按离线返回——单项不可探活不影响其余条目与快照。
* 结果保持输入顺序（原位回填），调用方与回归断言不依赖探活完成顺序。
*/
async function probeTargets(raw) {
	if (!Array.isArray(raw)) return [];
	const slots = [];
	const liveIndexes = [];
	const liveTargets = [];
	let accepted = 0;
	for (let i = 0; i < raw.length && accepted < PROBE_MAX_TARGETS; i += 1) {
		const target = normalizeProbeTarget(raw[i]);
		if (target === null) {
			slots.push(null);
			continue;
		}
		accepted += 1;
		if (isLoopbackLiteral(target.host)) {
			slots.push(null);
			liveIndexes.push(slots.length - 1);
			liveTargets.push(target);
		} else slots.push({
			...target,
			online: false
		});
	}
	const probed = await Promise.all(liveTargets.map(function(target) {
		return probeOne(target);
	}));
	for (let i = 0; i < probed.length; i += 1) slots[liveIndexes[i]] = probed[i];
	return slots.filter(function(slot) {
		return slot !== null;
	});
}
/**
* 把 netstat/ss 的文本输出解析为去重后的监听端点（不含 since）。
*
* 兼容三种形态（行内字段以空白切分）：
*   - win32 `netstat -ano -p tcp`：`TCP  local  foreign  LISTENING  pid`
*   - darwin `netstat -anv -p tcp`：`tcp4  rq  sq  local  foreign  LISTEN pid …`
*     （地址为点分尾部端口，如 `127.0.0.1.81`、`[::1].81`）
*   - linux `ss -tlnp`（首列 LISTEN，行尾 `users:(("name",pid=…,fd=…)` 可选）
*     与 `netstat -tln`（首列 tcp，无 PID）
*
* LISTEN 状态列向前退两列即本地地址列（三种 netstat 布局一致）；PID 取
* 状态列后一列（netstat 家族）或行内 `pid=`（ss）。
*/
function parseListeningEndpoints(platform, text) {
	const isDarwin = platform === "darwin";
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	const lines = text.split(/\r?\n/);
	for (const line of lines) {
		const tokens = line.trim().split(/\s+/);
		if (tokens.length < 4) continue;
		let local = "";
		let pid = null;
		if (tokens[0] === "LISTEN") {
			local = tokens[3];
			const pidMatch = line.match(/pid=(\d+)/);
			if (pidMatch !== null) pid = Number.parseInt(pidMatch[1] ?? "", 10);
		} else if (/^tcp/i.test(tokens[0])) {
			let stateIndex = -1;
			for (let i = 3; i < tokens.length; i += 1) if (/^LISTEN/i.test(tokens[i])) {
				stateIndex = i;
				break;
			}
			if (stateIndex < 3) continue;
			local = tokens[stateIndex - 2];
			const pidText = tokens[stateIndex + 1];
			if (pidText !== void 0 && /^\d+$/.test(pidText)) {
				const parsed = Number.parseInt(pidText, 10);
				if (Number.isInteger(parsed) && parsed > 0) pid = parsed;
			}
		} else continue;
		const endpoint = parseLocalAddress(local, isDarwin);
		if (endpoint === null) continue;
		const key = endpointKey(endpoint.address, endpoint.port);
		if (seen.has(key)) continue;
		seen.add(key);
		result.push({
			address: endpoint.address,
			port: endpoint.port,
			pid
		});
	}
	return result;
}
/**
* 解析单个本地地址字段为规范端点。
* - 冒号分隔（win/linux）：`127.0.0.1:81`、`[::1]:81`、`0.0.0.0:135`、`*:5353`
* - 点分分隔（darwin）：`127.0.0.1.81`、`[::1].81`、`*.81`
* 通配 `*` 规范化为 `0.0.0.0`；端口 0 与非法端口丢弃。
*/
function parseLocalAddress(local, dotPort) {
	if (local === "" || local === null) return null;
	let host = "";
	let portText = "";
	if (dotPort) {
		const dot = local.lastIndexOf(".");
		if (dot <= 0 || dot === local.length - 1) return null;
		host = local.slice(0, dot);
		portText = local.slice(dot + 1);
	} else {
		const colon = local.lastIndexOf(":");
		if (colon <= 0 || colon === local.length - 1) return null;
		host = local.slice(0, colon);
		portText = local.slice(colon + 1);
	}
	if (!/^\d{1,5}$/.test(portText)) return null;
	const port = Number.parseInt(portText, 10);
	if (!Number.isInteger(port) || port < 1 || port > 65535) return null;
	let address = host;
	if (address === "*" || address === "") address = "0.0.0.0";
	if (address.includes(":") && !address.startsWith("[")) address = `[${address}]`;
	return {
		address,
		port
	};
}
/**
* 由基线、上次条目与本次扫描键集合计算新的受监控条目。
*
* 规则：基线中的端口永不显示；本次仍在监听的旧条目保留原 since；
* 本次新出现（不在基线、不在上次条目）的端点以 now 作为 since；
* 上次有、本次没有的端点（已停止监听）被移除。
*/
function computeMonitoredEndpoints(baselineKeys, previousItems, currentKeys, now) {
	const previousByKey = /* @__PURE__ */ new Map();
	for (const item of previousItems) previousByKey.set(endpointKey(item.address, item.port), item);
	const next = [];
	for (const key of currentKeys) {
		if (baselineKeys.has(key)) continue;
		const previous = previousByKey.get(key);
		if (previous !== void 0) {
			next.push(previous);
			continue;
		}
		const separator = key.lastIndexOf("|");
		if (separator <= 0 || separator === key.length - 1) continue;
		const address = key.slice(0, separator);
		const port = Number.parseInt(key.slice(separator + 1), 10);
		if (!Number.isInteger(port) || port < 1 || port > 65535) continue;
		next.push({
			address,
			port,
			since: now
		});
	}
	next.sort((a, b) => b.since - a.since || a.port - b.port);
	return next.slice(0, MAX_ENDPOINTS);
}
/**
* 目录打开命令（纯函数）：在文件管理器中定位进程文件。
* win32 用 explorer /select（成功也返回码 1，调用方允许该码）；
* darwin 用 `open -R`；linux 用 xdg-open 打开所在目录。
*/
function revealCommandFor(platform, exePath) {
	if (platform === "win32") return {
		file: "explorer.exe",
		args: ["/select," + exePath]
	};
	if (platform === "darwin") return {
		file: "open",
		args: ["-R", exePath]
	};
	return {
		file: "xdg-open",
		args: [dirname(exePath)]
	};
}
function scanCommandsFor(platform) {
	if (platform === "win32") return [{
		file: "netstat",
		args: [
			"-ano",
			"-p",
			"tcp"
		],
		darwinDotPort: false
	}];
	if (platform === "darwin") return [{
		file: "netstat",
		args: [
			"-anv",
			"-p",
			"tcp"
		],
		darwinDotPort: true
	}];
	return [{
		file: "ss",
		args: ["-tlnp"],
		darwinDotPort: false
	}, {
		file: "netstat",
		args: ["-tln"],
		darwinDotPort: false
	}];
}
async function runScan(platform) {
	let lastError = null;
	for (const command of scanCommandsFor(platform)) try {
		const { stdout } = await execFileAsync(command.file, command.args, {
			windowsHide: true,
			timeout: SCAN_TIMEOUT_MS,
			maxBuffer: 4194304
		});
		return parseListeningEndpoints(command.darwinDotPort ? "darwin" : platform, stdout);
	} catch (error) {
		lastError = error;
	}
	throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
/** 当前监控状态快照（供 /dsh-zh/api 路由序列化，路由层负责 ok 包装）。 */
function getServiceMonitorSnapshot() {
	return {
		generatedAt: monitorState.generatedAt,
		items: monitorState.items.slice()
	};
}
/** 在最近一次扫描里找与目标命中的监听端点：先精确匹配，再通配监听兜底。 */
function matchListenEndpoint(address, port) {
	if (!isAttributableHost(address)) return null;
	for (const wildcard of [false, true]) for (const endpoint of monitorState.lastRaw) {
		if (wildcard !== (endpoint.address === "0.0.0.0" || endpoint.address === "[::]")) continue;
		if (!targetMatchesListen(address, port, endpoint.address, endpoint.port)) continue;
		return endpoint;
	}
	return null;
}
/** 归属缓存：键 = 监听端点键；服务停止监听后由扫描清运。 */
const ownerCache = /* @__PURE__ */ new Map();
/** 进行中的解析请求（同端点并发悬停去重）。 */
const pendingResolves = /* @__PURE__ */ new Map();
/** 解析命令失败后的负缓存（时间戳）：期间同端点不重复 spawn 命令；解析成功即删，其余由 sweepOwnerCache 清运。 */
const failedUntil = /* @__PURE__ */ new Map();
/** PowerShell 解析串行链：避免快速悬停多个条目时并发 spawn。 */
let pidDumpChain = Promise.resolve();
function cachedOwnerFor(address, port) {
	const listen = matchListenEndpoint(address, port);
	if (listen === null) return null;
	return ownerCache.get(endpointKey(listen.address, listen.port)) ?? null;
}
/** 端点缓存键（address|port）是否仍被最近一次扫描覆盖；键格式非法视为已失效。 */
function cacheKeyStillListens(key, listenEndpoints) {
	const separator = key.lastIndexOf("|");
	if (separator <= 0) return false;
	const address = key.slice(0, separator);
	const port = Number.parseInt(key.slice(separator + 1), 10);
	if (!Number.isInteger(port) || port < 1 || port > 65535) return false;
	return listenEndpoints.some(function(endpoint) {
		return targetMatchesListen(address, port, endpoint.address, endpoint.port);
	});
}
/**
* 负缓存清运判定（纯函数）：限频窗口已过（now ≥ until，与读取侧
* `Date.now() < failedAt` 同边界）或端点已不再监听（含键格式非法）的
* 条目应删除；窗口内的存活条目保留。
*/
function staleNegativeCacheKeys(failedEntries, listenEndpoints, now) {
	const stale = [];
	for (const [key, until] of failedEntries) if (now >= until || !cacheKeyStillListens(key, listenEndpoints)) stale.push(key);
	return stale;
}
/** 服务停止监听后清掉对应缓存（重现后下次悬停重新查询）；负缓存一并清运。 */
function sweepOwnerCache() {
	for (const key of [...ownerCache.keys()]) if (!cacheKeyStillListens(key, monitorState.lastRaw)) ownerCache.delete(key);
	for (const key of staleNegativeCacheKeys(failedUntil, monitorState.lastRaw, Date.now())) failedUntil.delete(key);
}
/** win32：一次 PowerShell 全进程枚举解析单个 PID（串行执行，避免并发 spawn）。 */
function resolveWin32Process(pid) {
	const task = function() {
		return (async function() {
			const script = "[Console]::OutputEncoding=[System.Text.Encoding]::UTF8; Get-CimInstance Win32_Process -Filter \"ProcessId = " + pid + "\" | Select-Object ProcessId,Name,ExecutablePath,CommandLine | ConvertTo-Json -Compress -Depth 3";
			try {
				const { stdout } = await execFileAsync("powershell.exe", [
					"-NoProfile",
					"-NonInteractive",
					"-ExecutionPolicy",
					"Bypass",
					"-Command",
					script
				], {
					windowsHide: true,
					timeout: OWNER_RESOLVE_TIMEOUT_MS,
					maxBuffer: 4194304
				});
				const parsed = JSON.parse(stdout);
				const row = Array.isArray(parsed) ? parsed[0] : parsed;
				if (row === null || typeof row !== "object") return null;
				const record = row;
				return {
					pid,
					name: truncateField(typeof record.Name === "string" ? record.Name : "", 120),
					path: truncateField(typeof record.ExecutablePath === "string" ? record.ExecutablePath : "", 500),
					cmdline: truncateField(sanitizeCmdline(typeof record.CommandLine === "string" ? record.CommandLine : ""), OWNER_CMDLINE_MAX),
					via: "process"
				};
			} catch {
				throw new Error("win32 process query failed");
			}
		})();
	};
	const run = pidDumpChain.then(task, task);
	pidDumpChain = run.catch(function() {});
	return run;
}
/** posix：darwin 用 `ps`，linux 读 /proc 解析单个 PID 的名称/路径/命令行。 */
async function resolvePosixProcess(platform, pid) {
	if (platform === "linux") {
		let path = "";
		let cmdline = "";
		try {
			path = (await readlink(`/proc/${pid}/exe`)).trim();
		} catch {}
		try {
			cmdline = (await readFile(`/proc/${pid}/cmdline`, "utf8")).split("\0").filter(Boolean).join(" ");
		} catch {}
		if (path === "" && cmdline === "") return null;
		return {
			pid,
			name: truncateField(path !== "" ? basename(path) : cmdline.split(" ")[0]?.split("/").pop() ?? "", 120),
			path: truncateField(path, 500),
			cmdline: truncateField(sanitizeCmdline(cmdline), OWNER_CMDLINE_MAX),
			via: "process"
		};
	}
	const { stdout: commOut } = await execFileAsync("ps", [
		"-p",
		String(pid),
		"-o",
		"comm="
	], {
		windowsHide: true,
		timeout: 4e3,
		maxBuffer: 65536
	});
	const path = commOut.trim();
	if (path === "") return null;
	let cmdline = "";
	try {
		const { stdout } = await execFileAsync("ps", [
			"-p",
			String(pid),
			"-o",
			"command="
		], {
			windowsHide: true,
			timeout: 4e3,
			maxBuffer: 65536
		});
		cmdline = stdout.trim();
	} catch {}
	return {
		pid,
		name: truncateField(basename(path), 120),
		path: truncateField(path, 500),
		cmdline: truncateField(sanitizeCmdline(cmdline), OWNER_CMDLINE_MAX),
		via: "process"
	};
}
/** win32：netsh 反查 http.sys 队列归属（PID 4 的内核端点）。 */
async function resolveHttpSysOwner(port) {
	const { stdout } = await execFileAsync("netsh", [
		"http",
		"show",
		"servicestate",
		"view=requestq",
		"verbose=yes"
	], {
		windowsHide: true,
		timeout: OWNER_RESOLVE_TIMEOUT_MS,
		maxBuffer: 8388608
	});
	const owner = parseHttpSysQueueOwner(stdout, port);
	if (owner === null) return {
		pid: 4,
		name: "System",
		path: "",
		cmdline: "",
		via: "http.sys"
	};
	const imageUsable = owner.image !== "" && owner.image !== "<?>";
	const name = imageUsable ? basename(owner.image) : owner.services !== "" ? owner.services : "System";
	return {
		pid: owner.pid,
		name: truncateField(name, 120),
		path: imageUsable ? truncateField(owner.image, 500) : "",
		cmdline: truncateField(owner.services, OWNER_CMDLINE_MAX),
		via: "http.sys"
	};
}
/**
* 按需解析一个端点的进程归属（悬停触发）：命中缓存立即返回；未命中
* 则解析一次并缓存。命令异常不缓存结果，改记 30 秒负缓存限频（解析
* 成功即删，其余由扫描清运）；命令成功但查无此进程不缓存（下次悬停
* 重查）。目标不是本机监听（远程地址/域名）时返回 null 且不缓存。
*/
async function resolveServiceOwner(platform, rawAddress, rawPort) {
	const address = typeof rawAddress === "string" ? rawAddress.trim() : "";
	const port = typeof rawPort === "number" && Number.isFinite(rawPort) ? Math.round(rawPort) : 0;
	if (address === "" || address.length > 64 || /\s/.test(address) || port < 1 || port > 65535) return null;
	const listen = matchListenEndpoint(address, port);
	if (listen === null) return null;
	const cacheKey = endpointKey(listen.address, listen.port);
	const cached = ownerCache.get(cacheKey);
	if (cached !== void 0) return cached;
	const inflight = pendingResolves.get(cacheKey);
	if (inflight !== void 0) return inflight;
	const failedAt = failedUntil.get(cacheKey);
	if (failedAt !== void 0 && Date.now() < failedAt) return null;
	const promise = (async function() {
		try {
			let owner = null;
			if (platform === "win32" && listen.pid === 4) owner = await resolveHttpSysOwner(listen.port);
			else if (listen.pid === 4) owner = {
				pid: 4,
				name: "System",
				path: "",
				cmdline: "",
				via: "process"
			};
			else if (listen.pid !== null) owner = platform === "win32" ? await resolveWin32Process(listen.pid) : await resolvePosixProcess(platform, listen.pid);
			if (owner !== null) {
				ownerCache.set(cacheKey, owner);
				failedUntil.delete(cacheKey);
			}
			return owner;
		} catch (error) {
			failedUntil.set(cacheKey, Date.now() + OWNER_FAILED_RETRY_MS);
			warn(`「服务监控」进程归属解析失败（${cacheKey}）: ${error instanceof Error ? error.message : String(error)}`);
			return null;
		} finally {
			pendingResolves.delete(cacheKey);
		}
	})();
	pendingResolves.set(cacheKey, promise);
	return promise;
}
/**
* 在文件管理器中定位监听进程所在目录：读取该端点**已缓存**的归属
* （悬停查询过才有），含可执行文件路径时执行平台 reveal 命令。
* 路径永远来自主机进程枚举，不接受请求传入路径。
*/
async function openServiceOwnerDirectory(platform, rawAddress, rawPort) {
	const address = typeof rawAddress === "string" ? rawAddress.trim() : "";
	const port = typeof rawPort === "number" && Number.isFinite(rawPort) ? Math.round(rawPort) : 0;
	if (address === "" || address.length > 64 || /\s/.test(address) || port < 1 || port > 65535) return null;
	const owner = cachedOwnerFor(address, port);
	const exePath = owner !== null && typeof owner.path === "string" ? owner.path : "";
	if (exePath === "" || exePath.length > 500 || /[\r\n\0]/.test(exePath)) return null;
	const command = revealCommandFor(platform, exePath);
	await spawnRevealProcess(command.file, command.args);
	return { path: exePath };
}
/** reveal 命令的非零退出码失败；explorer.exe 的退出码 1 是已知成功语义。 */
function spawnRevealProcess(file, args) {
	return new Promise(function(resolve, reject) {
		let settled = false;
		const fail = (error) => {
			if (settled) return;
			settled = true;
			reject(error);
		};
		const child = execFile(file, args, {
			windowsHide: true,
			timeout: 8e3
		});
		child.on("error", function(error) {
			fail(error);
		});
		child.on("exit", function(code) {
			if (settled) return;
			if (code === 0 || file.toLowerCase() === "explorer.exe" && code === 1) {
				settled = true;
				resolve();
			} else fail(/* @__PURE__ */ new Error(`打开服务目录失败（退出码 ${String(code)}）`));
		});
		child.stdout?.resume();
		child.stderr?.resume();
	});
}
const monitorState = {
	baseline: /* @__PURE__ */ new Set(),
	items: [],
	lastRaw: [],
	generatedAt: 0,
	scanFailed: false
};
/** 共享的进行中扫描（并发拉取去重：同一次拉取风暴只 spawn 一个 netstat）。 */
let scanInFlight = null;
/**
* 新鲜度判定（纯函数）：缓存是否仍在请求者认可的周期内。
* 从未扫描过（generatedAt = 0）一律判定需要扫描；maxAgeMs 非法视为 0
* （即每次都要求最新）。
*/
function scanIsFresh(generatedAt, now, maxAgeMs) {
	if (!Number.isFinite(generatedAt) || generatedAt <= 0) return false;
	const maxAge = Number.isFinite(maxAgeMs) && maxAgeMs > 0 ? maxAgeMs : 0;
	if (maxAge === 0) return false;
	const age = now - generatedAt;
	return Number.isFinite(age) && age <= maxAge;
}
/**
* 拉取驱动的扫描：网页请求快照时调用。距上次扫描**超过**请求携带的
* 刷新间隔（maxAgeMs = serviceMonitorIntervalSec × 1000）才重新扫描，
* 否则直接复用缓存结果——数据陈旧度不超过网页设置的一个周期。
* 首次扫描建立基线，此后每次扫描与「上一次结果」做增量 diff；并发调用
* 共享同一次进行中的扫描。扫描失败保留上次快照并只告警一次。
*/
function ensureFreshScan(platform, maxAgeMs) {
	if (scanInFlight !== null) return scanInFlight;
	if (scanIsFresh(monitorState.generatedAt, Date.now(), maxAgeMs)) return Promise.resolve();
	scanInFlight = (async function() {
		try {
			const endpoints = await runScan(platform);
			monitorState.lastRaw = endpoints;
			const currentKeys = /* @__PURE__ */ new Set();
			for (const endpoint of endpoints) currentKeys.add(endpointKey(endpoint.address, endpoint.port));
			const now = Date.now();
			if (monitorState.baseline.size === 0 && monitorState.items.length === 0 && monitorState.generatedAt === 0) monitorState.baseline = currentKeys;
			monitorState.items = computeMonitoredEndpoints(monitorState.baseline, monitorState.items, currentKeys, now);
			monitorState.generatedAt = now;
			sweepOwnerCache();
			if (monitorState.scanFailed) {
				monitorState.scanFailed = false;
				log("「服务监控」扫描已恢复");
			}
		} catch (error) {
			if (!monitorState.scanFailed) {
				monitorState.scanFailed = true;
				warn(`「服务监控」端口扫描失败（保留上次快照）: ${error instanceof Error ? error.message : String(error)}`);
			}
		} finally {
			scanInFlight = null;
		}
	})();
	return scanInFlight;
}
//#endregion
//#region src/server/session-delete.ts
const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;
/** Backend kinds confirmed to be a recyclable JSONL log directory. */
const CONFIRMED_JSONL_KINDS = /* @__PURE__ */ new Set(["jsonl", "jsonl-zstd"]);
function isValidSessionId(id) {
	return SESSION_ID_PATTERN.test(id);
}
function createSessionTrash() {
	const items = /* @__PURE__ */ new Map();
	return {
		remember(entry) {
			const token = randomUUID();
			const full = {
				...entry,
				token
			};
			items.set(entry.sessionId, full);
			return full;
		},
		forget(sessionId) {
			return items.delete(sessionId);
		},
		list() {
			return [...items.values()].sort((a, b) => b.trashedAt - a.trashedAt);
		},
		get(sessionId) {
			return items.get(sessionId);
		}
	};
}
const sessionTrash = createSessionTrash();
function isLoopbackHostname(hostname) {
	if (hostname === "localhost" || hostname === "[::1]" || hostname === "127.0.0.1") return true;
	return false;
}
function isTrustedApiRequest(req) {
	const host = req.headers["host"];
	if (typeof host !== "string") return false;
	let hostname;
	try {
		hostname = new URL(`http://${host}`).hostname;
	} catch {
		return false;
	}
	if (!isLoopbackHostname(hostname)) return false;
	const secFetchSite = req.headers["sec-fetch-site"];
	if (Array.isArray(secFetchSite)) return false;
	if (secFetchSite === "cross-site") return false;
	const origin = req.headers["origin"];
	if (origin === void 0) return true;
	if (Array.isArray(origin)) return false;
	try {
		return new URL(origin).host === host;
	} catch {
		return false;
	}
}
const IDLE_CONVERGE_TIMEOUT_MS = 3e3;
/**
* Deleted-session ids (process memory): deleteSession records every successful
* delete, restoreSession removes it. The archive view fetches this set to filter
* sessions that were deleted but still have an in-memory agent — upstream exposes
* no API to unload a live agent, so the delete flow hides such sessions through
* the official archive set, and without this reverse filter they would come back
* in the archive view (measured 2026-09 regression).
*/
const deletedSessionIds = /* @__PURE__ */ new Set();
/** Ids that count as deleted: the explicit set ∪ the trash inventory. */
function collectDeletedSessionIds() {
	const ids = new Set(deletedSessionIds);
	for (const item of sessionTrash.list()) ids.add(item.sessionId);
	return [...ids];
}
/**
* Self-heal after a hot reload (which drops this module's memory): any archived
* id whose log directory no longer exists was deleted, so record it again. Keeps
* the archive view honest across reloads.
*/
async function pruneDeletedSessionIds(deps) {
	let archived = [];
	try {
		archived = (deps.storageDomain?.get?.("workspace"))?.global?.get?.()?.archivedSessionIds ?? [];
	} catch {
		return;
	}
	for (const raw of archived) {
		const sessionId = String(raw);
		if (deletedSessionIds.has(sessionId)) continue;
		if (sessionTrash.get(sessionId) !== void 0) continue;
		if (await locateSessionDirById(sessionId) === null) deletedSessionIds.add(sessionId);
	}
}
let unarchiveWarningIssued = false;
/**
* 把会话从工作区归档集合移除（取消归档）。
* workspaceRegistry 当前只公开 archiveSession，没有 unarchive / 事务写 API；
* 因而只通过 storageDomain 做归档集合持久化，不写 registry 私有 state，避免
* 绕过 registry 的串行器（等上游公开 API 后再恢复内存缓存同步）。
*
* 写入无事务保障，但 global.set 排队在域的单一 FIFO 写链上：set resolve 时
* 所有先前写入均已完成，随后的同步 get 读到的是链上权威真值。因此写后重读
* 一次，目标 id 仍在则基于真值重放一次过滤；无法覆盖的仅剩「排队更晚的官方
* archiveSession 落地并覆盖本写」——那属于归档请求后到、归档生效，语义本应如此。
*/
async function unarchiveSession(deps, sessionId) {
	if (!unarchiveWarningIssued) {
		unarchiveWarningIssued = true;
		warn("workspaceRegistry 当前没有公开 unarchive 或事务写 API，仅执行归档集合持久化；等待上游公开 API");
	}
	const storage = deps.storageDomain;
	if (storage === void 0 || typeof storage.get !== "function") return {
		ok: false,
		changed: false
	};
	let domain;
	try {
		domain = storage.get("workspace");
	} catch {
		return {
			ok: false,
			changed: false
		};
	}
	if (domain === void 0 || domain.global === void 0) return {
		ok: false,
		changed: false
	};
	const global = domain.global;
	let state;
	try {
		state = typeof global.get === "function" ? global.get() : void 0;
	} catch {
		return {
			ok: false,
			changed: false
		};
	}
	if (state === void 0 || state === null) return {
		ok: false,
		changed: false
	};
	const archived = state.archivedSessionIds ?? [];
	const removeFrom = (ids) => {
		const next = ids.filter((id) => String(id) !== sessionId);
		return next.length !== ids.length ? next : null;
	};
	const first = removeFrom(archived);
	if (first === null) return {
		ok: true,
		changed: false
	};
	try {
		await global.set({ archivedSessionIds: first });
		const reread = global.get()?.archivedSessionIds;
		if (reread !== void 0 && reread.some((id) => String(id) === sessionId)) {
			const retry = removeFrom(reread);
			if (retry !== null) await global.set({ archivedSessionIds: retry });
		}
	} catch (error) {
		warn(`取消归档会话 ${sessionId} 失败: ${error instanceof Error ? error.message : String(error)}`);
		return {
			ok: false,
			changed: false
		};
	}
	return {
		ok: true,
		changed: true
	};
}
/**
* DSH session store root: `DSH_HOME/sessions` (default `~/.dsh/sessions`),
* matching the `dshHomePath('sessions')` deployment convention.  Since
* 0.1.3-alpha.1 the public service face no longer exposes physical paths, so
* recycling relies on scanning this root.
*/
function sessionRootDir() {
	const home = process.env.DSH_HOME !== void 0 && process.env.DSH_HOME !== "" ? process.env.DSH_HOME : join(homedir(), ".dsh");
	return join(home, "sessions");
}
/**
* Locate a session's physical log directory by scanning
* `<root>/<project dir>/<session id>/`.  Session ids are safe characters
* (`[A-Za-z0-9_-]`, so the encoded directory name equals the id) while project
* directory names use a DSH-private encoding — hence enumerate the project
* directories and match the id segment exactly, which stays immune to changes
* in that layout algorithm.  Returns null when no such directory exists.
*/
async function locateSessionDirById(sessionId) {
	const root = sessionRootDir();
	let projects = [];
	try {
		projects = (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
	} catch {
		return null;
	}
	for (const project of projects) {
		const candidate = join(root, project, sessionId);
		try {
			if ((await stat(candidate)).isDirectory()) return candidate;
		} catch {}
	}
	return null;
}
/**
* Resolve a session's physical log directory (absolute path) and display info.
* Returns null when the session cannot be located at all (backend exposes no
* location and/or the log never landed on disk).
*
* Contract evolution: 0.1.2-rc.1 exposes `readRaw`/`locate` (locate yields the
* physical path); 0.1.3-alpha.1 onwards is handle-based (create/open/stat/list)
* and no longer exposes a path, so the directory is recovered by
* {@link locateSessionDirById}.
*/
async function resolveSessionTarget(deps, sessionId) {
	const persistence = deps.sessionPersistence;
	if (persistence === void 0) return null;
	let header;
	if (typeof persistence.readRaw === "function") try {
		const artifact = await persistence.readRaw(sessionId);
		if (artifact !== void 0 && artifact !== null && artifact.meta !== void 0) header = artifact.meta;
	} catch {
		header = void 0;
	}
	if (header === void 0 && typeof persistence.stat === "function") try {
		const snapshot = await persistence.stat(sessionId);
		if (snapshot !== void 0 && snapshot !== null && snapshot.header !== void 0) header = snapshot.header;
	} catch {
		header = void 0;
	}
	if (header === void 0 && typeof persistence.list === "function") try {
		const match = (await persistence.list()).find((candidate) => {
			const candidateId = candidate.id ?? candidate.header?.id;
			return String(candidateId) === sessionId;
		});
		if (match !== void 0) header = match.header ?? match;
	} catch {
		header = void 0;
	}
	if (header === void 0) return null;
	let dir = null;
	let kind = null;
	if (typeof persistence.locate === "function") try {
		const location = persistence.locate(header);
		if (location !== void 0 && location !== null && typeof location.kind === "string") {
			kind = location.kind;
			if (CONFIRMED_JSONL_KINDS.has(location.kind) && typeof location.path === "string" && location.path !== "") {
				const parent = dirname(location.path);
				if (parent !== "" && parent !== ".") dir = parent;
			}
		}
	} catch {
		dir = null;
	}
	if (dir === null && kind === null) {
		dir = await locateSessionDirById(sessionId);
		if (dir !== null) kind = "jsonl";
	}
	return {
		header,
		dir,
		kind
	};
}
async function deleteSession(deps, sessionId, options) {
	const agent = deps.agents?.get(sessionId);
	if (agent !== void 0 && agent !== null && agent.status === "running") return {
		ok: false,
		code: "session-busy",
		message: "该会话正在运行，请先停止或等待其结束。"
	};
	if (agent !== void 0 && agent !== null) try {
		if (typeof agent.cancel === "function") agent.cancel({
			kind: "hook",
			reason: "oh-my-dsh-ui 删除会话（移入回收站）"
		});
		if (typeof agent.whenIdle === "function") await Promise.race([agent.whenIdle(), new Promise((resolve) => setTimeout(resolve, IDLE_CONVERGE_TIMEOUT_MS))]);
	} catch {}
	const target = await resolveSessionTarget(deps, sessionId);
	if (target === null) {
		warn(`删除会话 ${sessionId} 中止：无法定位会话日志目录`);
		return {
			ok: false,
			code: "locate-failed",
			message: "无法定位会话日志目录，已中止删除（未改动任何数据）。"
		};
	}
	const cwd = target.header.cwd ?? "";
	const title = options.title !== void 0 && options.title !== "" ? options.title : sessionId;
	if (target.dir === null || target.kind === null || !CONFIRMED_JSONL_KINDS.has(target.kind)) {
		warn(`删除会话 ${sessionId} 中止：后端类型不支持移入回收站（kind=${String(target.kind)}）`);
		return {
			ok: false,
			code: "unsupported-backend",
			message: "该会话的日志后端不支持移入系统回收站，已中止删除（未改动任何数据）。"
		};
	}
	let trashLocation = "";
	try {
		if (options.trash) trashLocation = (await trashItem(target.dir)).location;
		else {
			await rm(target.dir, {
				recursive: true,
				force: true
			});
			trashLocation = target.dir;
		}
	} catch (error) {
		return {
			ok: false,
			code: "trash-failed",
			message: `移入回收站失败：${error instanceof Error ? error.message : String(error)}`
		};
	}
	const registry = deps.workspaceRegistry;
	if (registry !== void 0) try {
		const workspaces = registry.list();
		for (const workspace of workspaces) if (workspace.sessionIds.includes(sessionId)) await workspace.detachSession(sessionId);
	} catch (error) {
		warn(`移除会话 ${sessionId} 的工作区账本槽位失败: ${error instanceof Error ? error.message : String(error)}`);
	}
	if (options.trash) sessionTrash.remember({
		sessionId,
		title,
		cwd,
		originalPath: target.dir,
		trashLocation,
		trashedAt: Date.now()
	});
	if (deps.sessions?.get(sessionId) !== void 0 && registry !== void 0 && typeof registry.archiveSession === "function") try {
		await registry.archiveSession(sessionId);
	} catch (error) {
		warn(`归档已删除的驻留会话 ${sessionId} 失败: ${error instanceof Error ? error.message : String(error)}`);
	}
	deletedSessionIds.add(sessionId);
	return {
		ok: true,
		trashed: options.trash
	};
}
async function restoreSession(deps, entry) {
	try {
		await restoreItem(entry.trashLocation, entry.originalPath);
	} catch (error) {
		return {
			ok: false,
			code: "restore-failed",
			message: `恢复失败：${error instanceof Error ? error.message : String(error)}`
		};
	}
	const registry = deps.workspaceRegistry;
	let reattachFailed = registry === void 0;
	if (registry !== void 0) try {
		const workspace = registry.list().find((candidate) => candidate.path === entry.cwd);
		if (workspace === void 0) reattachFailed = true;
		else if (!workspace.sessionIds.includes(entry.sessionId)) await workspace.attachSession(entry.sessionId);
	} catch (error) {
		reattachFailed = true;
		warn(`恢复会话 ${entry.sessionId} 后重新挂载工作区失败: ${error instanceof Error ? error.message : String(error)}`);
	}
	const unarchive = reattachFailed ? {
		ok: false,
		changed: false
	} : await unarchiveSession(deps, entry.sessionId);
	if (reattachFailed || !unarchive.ok) return {
		ok: false,
		code: "reattach-failed",
		message: "目录已恢复到原位置，但重新挂载工作区/取消归档未完成；请重试恢复或在列表刷新后检查"
	};
	sessionTrash.forget(entry.sessionId);
	deletedSessionIds.delete(entry.sessionId);
	return { ok: true };
}
async function readJsonBody(req) {
	const chunks = [];
	let total = 0;
	for await (const chunk of req) {
		const buffer = typeof chunk === "string" ? Buffer.from(chunk) : Buffer.from(chunk);
		total += buffer.length;
		if (total > 1 << 20) throw new Error("request body too large");
		chunks.push(buffer);
	}
	const text = Buffer.concat(chunks).toString("utf8");
	if (text.trim() === "") return {};
	try {
		return JSON.parse(text);
	} catch {
		throw new Error("request body is not valid JSON");
	}
}
function writeJson(res, status, body) {
	res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
	res.end(JSON.stringify(body));
}
/** Panel refresh interval (seconds → ms, capped at 300s). 0 = always rescan. */
function parseScanMaxAgeMs(raw) {
	const seconds = typeof raw === "number" && Number.isFinite(raw) ? Math.round(raw) : Number.parseInt(String(raw ?? ""), 10);
	if (!Number.isFinite(seconds) || seconds <= 0) return 0;
	return Math.min(300, seconds) * 1e3;
}
/**
* Service-monitor snapshot route: fetching checks the scan cache (a rescan runs
* only once the panel's refresh interval has elapsed); a POST body additionally
* carries the user-defined targets, which are probed in parallel with the scan.
* @returns whether the route handled the request.
*/
async function handleServiceMonitorRoutes(req, res, pathname, payload, url) {
	if (pathname !== "/dsh-zh/api/service-monitor") return false;
	const maxAgeMs = req.method === "GET" ? parseScanMaxAgeMs(url.searchParams.get("intervalSec")) : parseScanMaxAgeMs(payload.intervalSec);
	const [, probeResults] = await Promise.all([ensureFreshScan(process.platform, maxAgeMs), req.method === "GET" ? Promise.resolve([]) : probeTargets(payload.targets)]);
	writeJson(res, 200, {
		ok: true,
		value: Object.assign(getServiceMonitorSnapshot(), { targets: probeResults })
	});
	return true;
}
/**
* Install /dsh-zh/api routes: session delete / trash list / restore.
* Route prefix kept as /dsh-zh/api/* for client compatibility with
* deepseek-harness-zh_pro and other compatible callers.
*/
function installSessionDeleteRoute(ctx, deps) {
	const install = function() {
		const webServer = ctx.get("webServer");
		if (webServer === void 0 || webServer === null || typeof webServer?.register !== "function") {
			warn("Session delete route registration failed: webServer service unavailable");
			return false;
		}
		const ws = webServer;
		const handler = async (req, res) => {
			if (!isTrustedApiRequest(req)) {
				writeJson(res, 403, {
					ok: false,
					error: {
						code: "forbidden",
						message: "forbidden"
					}
				});
				return;
			}
			const url = new URL(req.url ?? "/", "http://dsh.internal");
			const pathname = url.pathname;
			if (req.method === "GET") {
				if (await handleServiceMonitorRoutes(req, res, pathname, {}, url)) return;
				writeJson(res, 404, {
					ok: false,
					error: {
						code: "not-found",
						message: "unknown method"
					}
				});
				return;
			}
			if (req.method !== "POST") {
				writeJson(res, 405, {
					ok: false,
					error: {
						code: "method-error",
						message: "method not allowed"
					}
				});
				return;
			}
			let payload;
			try {
				const body = await readJsonBody(req);
				if (body === null || typeof body !== "object" || Array.isArray(body)) {
					writeJson(res, 400, {
						ok: false,
						error: {
							code: "bad-request",
							message: "payload must be a JSON object"
						}
					});
					return;
				}
				payload = body;
			} catch (error) {
				writeJson(res, 400, {
					ok: false,
					error: {
						code: "bad-request",
						message: error instanceof Error ? error.message : String(error)
					}
				});
				return;
			}
			try {
				if (await handleServiceMonitorRoutes(req, res, pathname, payload, url)) return;
				if (pathname === "/dsh-zh/api/service-monitor/resolve") {
					try {
						writeJson(res, 200, {
							ok: true,
							value: { owner: await resolveServiceOwner(process.platform, payload.address, payload.port) }
						});
					} catch {
						writeJson(res, 200, {
							ok: true,
							value: { owner: null }
						});
					}
					return;
				}
				if (pathname === "/dsh-zh/api/service-monitor/open") {
					try {
						const opened = await openServiceOwnerDirectory(process.platform, payload.address, payload.port);
						if (opened === null) {
							writeJson(res, 404, {
								ok: false,
								error: {
									code: "owner-unavailable",
									message: "未定位到监听进程目录"
								}
							});
							return;
						}
						writeJson(res, 200, {
							ok: true,
							value: opened
						});
					} catch (error) {
						warn(`打开服务目录失败: ${error instanceof Error ? error.message : String(error)}`);
						writeJson(res, 500, {
							ok: false,
							error: {
								code: "open-failed",
								message: "打开服务目录失败，请稍后重试。"
							}
						});
					}
					return;
				}
				if (pathname === "/dsh-zh/api/session.deleted") {
					await pruneDeletedSessionIds(deps());
					writeJson(res, 200, {
						ok: true,
						value: { ids: collectDeletedSessionIds() }
					});
					return;
				}
				if (pathname === "/dsh-zh/api/session.unarchive") {
					const sessionId = typeof payload.sessionId === "string" ? payload.sessionId : "";
					if (!isValidSessionId(sessionId)) {
						writeJson(res, 400, {
							ok: false,
							error: {
								code: "bad-request",
								message: "invalid sessionId"
							}
						});
						return;
					}
					const result = await unarchiveSession(deps(), sessionId);
					if (!result.ok) {
						writeJson(res, 400, {
							ok: false,
							error: {
								code: "unarchive-failed",
								message: "unarchive failed"
							}
						});
						return;
					}
					writeJson(res, 200, {
						ok: true,
						value: {
							unarchived: true,
							changed: result.changed
						}
					});
					return;
				}
				if (pathname === "/dsh-zh/api/session.delete") {
					const sessionId = typeof payload.sessionId === "string" ? payload.sessionId : "";
					if (!isValidSessionId(sessionId)) {
						writeJson(res, 400, {
							ok: false,
							error: {
								code: "bad-request",
								message: "invalid sessionId"
							}
						});
						return;
					}
					const title = typeof payload.title === "string" ? payload.title.slice(0, 256) : "";
					const currentSessionId = typeof payload.currentSessionId === "string" ? payload.currentSessionId : "";
					const result = await deleteSession(deps(), sessionId, {
						trash: true,
						title,
						...currentSessionId === "" ? {} : { currentSessionId }
					});
					if (!result.ok) {
						writeJson(res, 400, {
							ok: false,
							error: {
								code: result.code,
								message: result.message
							}
						});
						return;
					}
					writeJson(res, 200, {
						ok: true,
						value: {
							...result,
							deletedIds: collectDeletedSessionIds()
						}
					});
					return;
				}
				if (pathname === "/dsh-zh/api/trash.list") {
					writeJson(res, 200, {
						ok: true,
						value: { items: sessionTrash.list() }
					});
					return;
				}
				if (pathname === "/dsh-zh/api/trash.restore") {
					const sessionId = typeof payload.sessionId === "string" ? payload.sessionId : "";
					const token = typeof payload.token === "string" ? payload.token : "";
					if (!isValidSessionId(sessionId) || token === "") {
						writeJson(res, 400, {
							ok: false,
							error: {
								code: "bad-request",
								message: "invalid sessionId or token"
							}
						});
						return;
					}
					const entry = sessionTrash.get(sessionId);
					if (entry === void 0 || entry.token !== token) {
						writeJson(res, 404, {
							ok: false,
							error: {
								code: "not-found",
								message: "trash entry not found"
							}
						});
						return;
					}
					const result = await restoreSession(deps(), entry);
					if (!result.ok) {
						writeJson(res, 400, {
							ok: false,
							error: {
								code: result.code,
								message: result.message
							}
						});
						return;
					}
					writeJson(res, 200, {
						ok: true,
						value: { restored: true }
					});
					return;
				}
				writeJson(res, 404, {
					ok: false,
					error: {
						code: "not-found",
						message: "unknown method"
					}
				});
			} catch (error) {
				writeJson(res, 500, {
					ok: false,
					error: {
						code: "internal",
						message: error instanceof Error ? error.message : String(error)
					}
				});
			}
		};
		const disposer = ws.register({
			kind: "prefix",
			path: "/dsh-zh/api",
			handler
		});
		ctx.effect(() => disposer, "oh-my-dsh-ui: /dsh-zh/api routes");
		log("「删除会话（回收站）」路由已就绪");
		return true;
	};
	if (!install()) {
		const retryService = function(name) {
			if (name === "webServer") {
				if (install() && typeof ctx.off === "function") ctx.off("internal/service", retryService);
			}
		};
		ctx.on("internal/service", retryService);
		ctx.effect(function() {
			return function() {
				if (typeof ctx.off === "function") ctx.off("internal/service", retryService);
			};
		}, "oh-my-dsh-ui: session delete route retry");
	}
}
//#endregion
//#region src/server/index.ts
function resolveSessionDeleteDeps(ctx) {
	const sessions = ctx.get("sessions");
	const agents = ctx.get("agents");
	const persistence = ctx.get("sessionPersistence");
	const registry = ctx.get("workspaceRegistry");
	const storage = ctx.get("storageDomain");
	return {
		sessions: sessions === void 0 || sessions === null ? void 0 : sessions,
		agents: agents === void 0 || agents === null ? void 0 : agents,
		sessionPersistence: persistence === void 0 || persistence === null ? void 0 : persistence,
		workspaceRegistry: registry === void 0 || registry === null ? void 0 : registry,
		storageDomain: storage === void 0 || storage === null ? void 0 : storage
	};
}
/**
* Install remaining Node-side capabilities:
*   - Session delete/restore HTTP routes (webServer, /dsh-zh/api/*)
*/
function installAll(ctx) {
	installSessionDeleteRoute(ctx, () => resolveSessionDeleteDeps(ctx));
	log("Node-side 功能已就绪");
}
//#endregion
//#region src/index.ts
/** The ui-custom section's field map (schemastery defaults = the plugin's neutral defaults). */
const SECTION_FIELDS = {
	accent: z.string().default("#4176e6"),
	autoAccent: z.boolean().default(false),
	surfaceOpacity: z.number().default(100),
	sidebarOpacity: z.number().default(100),
	chatSurfaceOpacity: z.number().default(100),
	inputOpacity: z.number().default(100),
	codeBlockOpacity: z.number().default(100),
	darkSurfaceOpacity: z.number().default(100),
	fontFamily: z.string().default(""),
	codeFontFamily: z.string().default(""),
	fontScale: z.number().default(1),
	scrollbarAccent: z.boolean().default(false),
	darkAccent: z.string().default(""),
	myPresets: z.dict(z.string()).default({}),
	renderUserMarkdown: z.boolean().default(false),
	motionEnabled: z.boolean().default(true),
	motionStyle: z.union([...MOTION_STYLES]).default(DEFAULT_MOTION_STYLE),
	sidebarMotionStyle: z.union([...SIDEBAR_MOTION_STYLES]).default(DEFAULT_SIDEBAR_MOTION_STYLE),
	sidebarMotionEnabled: z.boolean().default(true),
	selectionMotionEnabled: z.boolean().default(true),
	newChatMotionEnabled: z.boolean().default(true),
	newChatMotionStyle: z.union([...NEW_CHAT_MOTION_STYLES]).default(DEFAULT_NEW_CHAT_MOTION_STYLE),
	settingsMotionEnabled: z.boolean().default(true),
	zhComplete: z.boolean().default(true),
	chatWidthEnabled: z.boolean().default(true),
	chatWidth: z.number().default(90),
	thinkingAuto: z.boolean().default(true),
	thinkMaxLines: z.number().default(20),
	thinkMaxLinesFrom: z.union(["latest", "earliest"]).default("latest"),
	thinkMode: z.union(["button", "scroll"]).default("button"),
	deleteSessionEnabled: z.boolean().default(true),
	archiveViewEnabled: z.boolean().default(true),
	batchOpsEnabled: z.boolean().default(true),
	zhAutoArchiveDays: z.number().default(7),
	serviceMonitorEnabled: z.boolean().default(false),
	serviceMonitorIntervalSec: z.number().default(10),
	serviceMonitorTargets: z.array(z.object({
		name: z.string().default(""),
		host: z.string(),
		port: z.number()
	})).default([]),
	serviceMonitorSettingsOpen: z.boolean().default(false),
	smoothEnabled: z.boolean().default(true),
	smoothPreset: z.union([
		"realtime",
		"balanced",
		"silky"
	]).default("balanced"),
	smoothThinkAutoExpand: z.boolean().default(true),
	smoothDebugEnabled: z.boolean().default(false),
	smoothMotionPreference: z.union([
		"auto",
		"force-smooth",
		"force-reduced"
	]).default("auto"),
	smoothLogFadeEnabled: z.boolean().default(true),
	features: z.array(z.union([...FEATURES])).default([])
};
/**
* Mark one field as a live preference (volatile).
*
* 0.1.7's schemastery exposes `volatile()`; the copy this plugin resolves at
* runtime does not have it yet (the harness hands a profile plugin its own
* 0.1.5-era schemastery), and calling a missing method would abort the whole
* module import — the entry then reads as `failed to import`. Every 0.1.7
* consumer of the mark reads `schema.meta.volatile`, which `volatile()` itself
* only sets through `extra('volatile', true)`, so the fallback writes the same
* mark directly.
* @param field - the field's schema node.
* @returns the field, marked volatile.
*/
function liveField(field) {
	if (typeof field.volatile === "function") return field.volatile();
	if (field.meta !== void 0) field.meta.volatile = true;
	return field;
}
/**
* The profile entry's declarative settings schema.
*
* 0.1.7 projects an entry's `Config` into the shared settings form the
* browser reaches through `ctx.configForms.get('ui-custom')`, and only a
* volatile field is writable there (a non-volatile change reloads the plugin
* instead of committing into it). Every field below is a live user preference,
* so the whole section is volatile.
*/
const Config = z.object(Object.fromEntries(Object.entries(SECTION_FIELDS).map(([key, field]) => [key, liveField(field)])));
/**
* ≤0.1.6 registration schema: the same fields, without the 0.1.7 volatility
* contract (`settings.register(namespace, schema, { base })`).
*/
const LegacySectionSchema = z.object(SECTION_FIELDS);
/**
* Host plugin body: expose the plugin's settings section to the web client
* through whichever settings surface the running harness provides.
*
* 0.1.7 (official per-plugin mode, see `@deepseek-ai/dsh-settings` README):
* the entry's own `Config` IS the settings schema — the browser reads it via
* `ctx.configForms.get(entryId)` — and a plugin that ships its own editor
* registers `configure({ auto: false }, ctx.fiber)` inside the optional
* `ctx.inject(['settings'], …)` child. Business plugins read their own Config
* references directly; no shared helper and no runtime namespace registration.
*
* ≤0.1.6: the settings provider still owns runtime namespaces
* (`settings.register(namespace, schema, { base })`).
*
* The namespace helper is deliberately not imported: newer `dsh-settings`
* builds no longer export it, and a missing named export is an import-time
* failure — the entry would read as `failed to import` and never activate.
* @param ctx - Host context that may acquire the settings service.
* @param config - the plugin's loader-layer config.
*/
function apply(ctx, config) {
	ctx.inject(["settings"], (settingsCtx) => {
		const settings = settingsCtx.settings;
		if (typeof settings?.configure === "function") settingsCtx.effect(() => settings.configure?.({ auto: false }, ctx.fiber));
		if (typeof settings?.register === "function") settings.register(UI_CUSTOM_SETTINGS_NS, LegacySectionSchema, { base: legacyBase(config) });
	});
	ctx.inject(["webServer"], () => {
		installAll(ctx);
	});
}
/**
* Composition base for the ≤0.1.6 namespace: the loader config's flat fields,
* so a cleared field reverts to the loader default there. 0.1.7 resolves that
* layer from the entry's own config instead.
* @param config - the plugin's loader-layer config.
* @returns the namespace's composition base.
*/
function legacyBase(config) {
	return {
		accent: config?.accent ?? "#4176e6",
		autoAccent: config?.autoAccent ?? false,
		surfaceOpacity: config?.surfaceOpacity ?? 100,
		sidebarOpacity: config?.sidebarOpacity ?? 100,
		chatSurfaceOpacity: config?.chatSurfaceOpacity ?? 100,
		inputOpacity: config?.inputOpacity ?? 100,
		codeBlockOpacity: config?.codeBlockOpacity ?? 100,
		darkSurfaceOpacity: config?.darkSurfaceOpacity ?? 100,
		fontFamily: config?.fontFamily ?? "",
		codeFontFamily: config?.codeFontFamily ?? "",
		fontScale: config?.fontScale ?? 1,
		scrollbarAccent: config?.scrollbarAccent ?? false,
		darkAccent: config?.darkAccent ?? "",
		myPresets: config?.myPresets ?? {},
		renderUserMarkdown: config?.renderUserMarkdown ?? false,
		motionEnabled: config?.motionEnabled ?? true,
		motionStyle: isMotionStyle(config?.motionStyle) ? config.motionStyle : DEFAULT_MOTION_STYLE,
		sidebarMotionStyle: isSidebarMotionStyle(config?.sidebarMotionStyle) ? config.sidebarMotionStyle : DEFAULT_SIDEBAR_MOTION_STYLE,
		sidebarMotionEnabled: config?.sidebarMotionEnabled ?? true,
		selectionMotionEnabled: config?.selectionMotionEnabled ?? true,
		newChatMotionEnabled: config?.newChatMotionEnabled ?? true,
		newChatMotionStyle: isNewChatMotionStyle(config?.newChatMotionStyle) ? config.newChatMotionStyle : DEFAULT_NEW_CHAT_MOTION_STYLE,
		settingsMotionEnabled: config?.settingsMotionEnabled ?? true,
		zhComplete: config?.zhComplete ?? true,
		chatWidthEnabled: config?.chatWidthEnabled ?? true,
		chatWidth: typeof config?.chatWidth === "number" ? Math.max(50, Math.min(100, config.chatWidth)) : 90,
		thinkingAuto: config?.thinkingAuto ?? true,
		thinkMaxLines: typeof config?.thinkMaxLines === "number" ? Math.max(0, Math.min(200, config.thinkMaxLines)) : 20,
		thinkMaxLinesFrom: config?.thinkMaxLinesFrom === "earliest" ? "earliest" : "latest",
		thinkMode: config?.thinkMode === "scroll" ? "scroll" : "button",
		deleteSessionEnabled: config?.deleteSessionEnabled ?? true,
		archiveViewEnabled: config?.archiveViewEnabled ?? true,
		zhAutoArchiveDays: typeof config?.zhAutoArchiveDays === "number" ? config.zhAutoArchiveDays : 7,
		smoothEnabled: config?.smoothEnabled ?? true,
		smoothPreset: config?.smoothPreset === "realtime" || config?.smoothPreset === "silky" ? config.smoothPreset : "balanced",
		smoothThinkAutoExpand: config?.smoothThinkAutoExpand ?? true,
		smoothDebugEnabled: config?.smoothDebugEnabled ?? false,
		features: config?.features ? [...config.features] : []
	};
}
//#endregion
export { Config, apply };
