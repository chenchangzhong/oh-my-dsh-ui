import { settingsNamespace } from "@deepseek-ai/dsh-settings";
import z from "@deepseek-ai/schemastery";
import { dirname } from "node:path";
import { rm } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { restoreItem, trashItem } from "@dsh-community/trash-utils";
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
	"usage",
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
//#region src/server/session-delete.ts
const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;
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
async function unarchiveSession(deps, sessionId) {
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
	const next = archived.filter((id) => String(id) !== sessionId);
	const changed = next.length !== archived.length;
	const nextState = {
		...state,
		archivedSessionIds: next
	};
	if (changed) try {
		await global.set(nextState);
	} catch (error) {
		warn(`取消归档会话 ${sessionId} 失败: ${error instanceof Error ? error.message : String(error)}`);
		return {
			ok: false,
			changed: false
		};
	}
	try {
		const registryAny = deps.workspaceRegistry;
		if (registryAny !== void 0 && registryAny !== null && typeof registryAny === "object") registryAny.state = nextState;
	} catch {}
	return {
		ok: true,
		changed
	};
}
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
	if (header === void 0 && typeof persistence.list === "function") try {
		const match = (await persistence.list()).find((candidate) => String(candidate.id) === sessionId);
		if (match !== void 0) header = match;
	} catch {
		header = void 0;
	}
	if (header === void 0) return null;
	let dir = null;
	if (typeof persistence.locate === "function") try {
		const location = persistence.locate(header);
		if (location !== void 0 && location !== null && typeof location.path === "string" && location.path !== "") {
			const parent = dirname(location.path);
			if (parent !== "" && parent !== ".") dir = parent;
		}
	} catch {
		dir = null;
	}
	return {
		header,
		dir
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
	const cwd = target === null ? "" : target.header.cwd ?? "";
	const title = options.title !== void 0 && options.title !== "" ? options.title : sessionId;
	let trashLocation = "";
	let dirRemoved = false;
	if (target !== null && target.dir !== null) try {
		if (options.trash) trashLocation = (await trashItem(target.dir)).location;
		else {
			await rm(target.dir, {
				recursive: true,
				force: true
			});
			trashLocation = target.dir;
		}
		dirRemoved = true;
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
	if (dirRemoved && options.trash && target !== null && target.dir !== null) sessionTrash.remember({
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
	return {
		ok: true,
		trashed: dirRemoved && options.trash,
		...target !== null && target.dir === null ? { hint: "该会话日志无法定位，已从列表移除（后端不支持回收）。" } : {}
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
	if (registry !== void 0) try {
		const workspaces = registry.list();
		for (const workspace of workspaces) if (workspace.path === entry.cwd) {
			if (!workspace.sessionIds.includes(entry.sessionId)) await workspace.attachSession(entry.sessionId);
			break;
		}
	} catch (error) {
		warn(`恢复会话 ${entry.sessionId} 后重新挂载工作区失败: ${error instanceof Error ? error.message : String(error)}`);
	}
	await unarchiveSession(deps, entry.sessionId);
	sessionTrash.forget(entry.sessionId);
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
			const pathname = new URL(req.url ?? "/", "http://dsh.internal").pathname;
			try {
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
						value: result
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
/** The full ui-custom section schema (schemastery defaults = the plugin's neutral defaults). */
const UiCustomSectionSchema = z.object({
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
	cornerRadius: z.string().default("inherit"),
	surfaceShadow: z.string().default("inherit"),
	focusGlow: z.string().default("inherit"),
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
	statsFull: z.boolean().default(true),
	chatWidthEnabled: z.boolean().default(true),
	chatWidth: z.number().default(90),
	thinkingAuto: z.boolean().default(true),
	thinkMaxLines: z.number().default(20),
	thinkMaxLinesFrom: z.union(["latest", "earliest"]).default("latest"),
	thinkMode: z.union(["button", "scroll"]).default("button"),
	deleteSessionEnabled: z.boolean().default(true),
	archiveViewEnabled: z.boolean().default(true),
	zhAutoArchiveDays: z.number().default(7),
	smoothEnabled: z.boolean().default(true),
	smoothPreset: z.union([
		"realtime",
		"balanced",
		"silky"
	]).default("balanced"),
	smoothThinkAutoExpand: z.boolean().default(true),
	smoothDebugEnabled: z.boolean().default(false),
	features: z.array(z.union([...FEATURES])).default([])
});
/**
* Host plugin body: expose the ui-custom settings namespace to the web
* client when the settings service is composed. The namespace's composition
* base carries the loader config (flat theme fields), so a cleared field
* reverts to the loader default and the settings pages layer on top of it.
* @param ctx - Host context that may acquire the settings service.
* @param config - the plugin's loader-layer config.
*/
function apply(ctx, config) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.settings.register(settingsNamespace(UI_CUSTOM_SETTINGS_NS), UiCustomSectionSchema, { base: {
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
			cornerRadius: config?.cornerRadius ?? "inherit",
			surfaceShadow: config?.surfaceShadow ?? "inherit",
			focusGlow: config?.focusGlow ?? "inherit",
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
			statsFull: config?.statsFull ?? true,
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
		} });
	});
	ctx.inject(["webServer"], () => {
		installAll(ctx);
	});
}
//#endregion
export { apply };
