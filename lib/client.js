window.__ModuleLoader__.load({
	id: "oh-my-dsh-ui",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		;(function(){if(typeof document!=="undefined"&&document.head){if(document.head.querySelector('style[data-plugin-css="oh-my-dsh-ui/bundle.css"]')===null){var __s=document.createElement("style");__s.dataset.plugin="oh-my-dsh-ui";__s.dataset.pluginCss="oh-my-dsh-ui/bundle.css";__s.textContent=".zaoYUq_hint {\n  z-index: 70;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: color-mix(in srgb, var(--dsw-alias-bg-overlay) 92%, transparent);\n  box-shadow: var(--dsw-shadow-lv3);\n  color: var(--dsw-alias-label-secondary);\n  pointer-events: none;\n  border-radius: 999px;\n  padding: 6px 14px;\n  font-size: 12px;\n  line-height: 18px;\n  position: fixed;\n  bottom: 20px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n._8RB1Sa_section {\n  flex-direction: column;\n  gap: 14px;\n  display: flex;\n}\n\n._8RB1Sa_toolbar {\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  display: flex;\n}\n\n._8RB1Sa_model {\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base) 70%, transparent);\n  height: 26px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  border-radius: 7px;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  padding: 0 10px;\n  font-size: 12px;\n  display: inline-flex;\n}\n\n._8RB1Sa_model:hover {\n  color: var(--dsw-alias-label-primary);\n}\n\n._8RB1Sa_chevron {\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n}\n\n._8RB1Sa_heading {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 24px;\n}\n\n._8RB1Sa_intro {\n  color: var(--dsw-alias-label-secondary);\n  margin: 0;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n._8RB1Sa_tabs {\n  background: color-mix(in srgb, var(--dsw-alias-bg-base) 70%, transparent);\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 10px;\n  gap: 6px;\n  width: fit-content;\n  padding: 3px;\n  display: inline-flex;\n}\n\n._8RB1Sa_tab {\n  height: 26px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  background: none;\n  border: none;\n  border-radius: 7px;\n  padding: 0 12px;\n  font-size: 12px;\n  line-height: 26px;\n}\n\n._8RB1Sa_tabActive {\n  background: var(--dsw-alias-brand-primary);\n  color: var(--dsw-alias-label-primary-foreground);\n}\n\n._8RB1Sa_kpis {\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 10px;\n  display: grid;\n}\n\n._8RB1Sa_kpi {\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base) 78%, transparent);\n  border-radius: 12px;\n  flex-direction: column;\n  gap: 4px;\n  padding: 12px 14px;\n  display: flex;\n}\n\n._8RB1Sa_kpiLabel {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n._8RB1Sa_kpiValue {\n  color: var(--dsw-alias-label-primary);\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 24px;\n}\n\n._8RB1Sa_kpiSub {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  line-height: 16px;\n}\n\n._8RB1Sa_breakdown {\n  flex-direction: column;\n  gap: 8px;\n  display: flex;\n}\n\n._8RB1Sa_breakdownLabel {\n  color: var(--dsw-alias-label-primary);\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 20px;\n}\n\n._8RB1Sa_bars {\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base) 78%, transparent);\n  border-radius: 12px;\n  align-items: flex-end;\n  gap: 6px;\n  height: 90px;\n  padding: 10px;\n  display: flex;\n}\n\n._8RB1Sa_barWrap {\n  flex-direction: column;\n  flex: 1 1 0;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 4px;\n  min-width: 0;\n  height: 100%;\n  display: flex;\n}\n\n._8RB1Sa_bar {\n  background: linear-gradient(180deg, var(--dsw-alias-brand-primary), color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, white));\n  opacity: .9;\n  border-radius: 4px 4px 2px 2px;\n  width: 70%;\n  min-height: 2px;\n}\n\n._8RB1Sa_barLabel {\n  color: var(--dsw-alias-label-tertiary);\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  font-size: 10px;\n  line-height: 12px;\n  overflow: hidden;\n}\n\n._8RB1Sa_top {\n  flex-direction: column;\n  gap: 6px;\n  display: flex;\n}\n\n._8RB1Sa_topRow {\n  border: 1px solid var(--dsw-alias-border-l1);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base) 70%, transparent);\n  border-radius: 10px;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 12px;\n  font-size: 13px;\n  line-height: 20px;\n  display: flex;\n}\n\n._8RB1Sa_topRank {\n  text-align: center;\n  width: 20px;\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n  font-size: 12px;\n}\n\n._8RB1Sa_topTitle {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n  color: var(--dsw-alias-label-primary);\n  flex: auto;\n  overflow: hidden;\n}\n\n._8RB1Sa_topTokens {\n  color: var(--dsw-alias-label-primary);\n  flex: none;\n  font-weight: 600;\n}\n\n._8RB1Sa_empty {\n  color: var(--dsw-alias-label-tertiary);\n  padding: 16px 0;\n  font-size: 13px;\n  line-height: 20px;\n}\n.nKwYda_backdrop {\n  z-index: 60;\n  background: var(--dsw-alias-bg-mask-1);\n  place-items: center;\n  padding: 32px;\n  display: grid;\n  position: fixed;\n  inset: 0;\n}\n\n.nKwYda_panel {\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-alias-bg-layer-2);\n  width: min(680px, 100%);\n  max-height: calc(100vh - 64px);\n  box-shadow: var(--dsw-shadow-lv3);\n  border-radius: 16px;\n  flex-direction: column;\n  display: flex;\n  overflow: hidden;\n}\n\n.nKwYda_header {\n  border-bottom: 1px solid var(--dsw-alias-border-l2);\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 18px;\n  display: flex;\n}\n\n.nKwYda_title {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 600;\n  line-height: 22px;\n}\n\n.nKwYda_close {\n  width: 28px;\n  height: 28px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  background: none;\n  border: none;\n  border-radius: 7px;\n  flex: none;\n  font-size: 16px;\n  line-height: 28px;\n}\n\n.nKwYda_close:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.nKwYda_body {\n  padding: 16px 18px 18px;\n  overflow-y: auto;\n}\n.l-RxFq_userRow {\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 6px;\n  display: flex;\n}\n\n.l-RxFq_userStack {\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n  min-width: 0;\n  max-width: min(525px, 82%);\n  display: flex;\n}\n\n.l-RxFq_bubble {\n  background: var(--dsw-specific-bubble-user, var(--dsw-specific-bubble));\n  max-width: 100%;\n  color: var(--dsw-alias-label-primary);\n  border-radius: 22px;\n  padding: 10px 16px;\n  font-size: 16px;\n  line-height: 24px;\n  box-shadow: 0 2px 10px #0f11150f;\n}\n\n.l-RxFq_refChip {\n  color: var(--dsw-alias-label-primary);\n  white-space: nowrap;\n  vertical-align: baseline;\n  background: #6187d838;\n  border-radius: 6px;\n  margin: 0 2px;\n  padding: 0 8px;\n  font-size: .85em;\n  line-height: 1.6;\n  display: inline-block;\n}\n\n.l-RxFq_actions {\n  align-items: center;\n  gap: 10px;\n  height: 28px;\n  display: flex;\n}\n\n.l-RxFq_timeStart {\n  color: var(--dsw-alias-label-tertiary);\n  white-space: nowrap;\n  padding-right: 12px;\n  font-size: 14px;\n  line-height: 24px;\n}\n\n@media (hover: hover) {\n  [data-time-hover-root] .l-RxFq_timeStart {\n    opacity: 0;\n    transition: opacity 80ms;\n  }\n\n  [data-time-hover-root]:hover .l-RxFq_timeStart, [data-time-hover-root]:focus-within .l-RxFq_timeStart {\n    opacity: 1;\n  }\n}\n\n.l-RxFq_action {\n  width: 28px;\n  height: 28px;\n  color: var(--dsw-alias-label-tertiary);\n  cursor: pointer;\n  background: none;\n  border: none;\n  border-radius: 28px;\n  justify-content: center;\n  align-items: center;\n  padding: 6px;\n  display: inline-flex;\n}\n\n.l-RxFq_action:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n.dsu-motion-fade-up {\n  animation: .28s cubic-bezier(.33, 1, .68, 1) both dsu-motion-rise;\n  animation-delay: var(--dsu-motion-delay, 0s);\n}\n\n.dsu-motion-fade {\n  animation: .24s cubic-bezier(.33, 1, .68, 1) both dsu-motion-fade-in;\n  animation-delay: var(--dsu-motion-delay, 0s);\n}\n\n.dsu-motion-rise-scale {\n  animation: .3s cubic-bezier(.33, 1, .68, 1) both dsu-motion-rise-scale;\n  animation-delay: var(--dsu-motion-delay, 0s);\n}\n\n.dsu-motion-slide-in {\n  animation: .28s cubic-bezier(.33, 1, .68, 1) both dsu-motion-slide-in;\n  animation-delay: var(--dsu-motion-delay, 0s);\n}\n\n.dsu-motion-blur-in {\n  animation: .3s cubic-bezier(.33, 1, .68, 1) both dsu-motion-blur-in;\n  animation-delay: var(--dsu-motion-delay, 0s);\n}\n\n.dsu-motion-scale-in {\n  animation: .28s cubic-bezier(.33, 1, .68, 1) both dsu-motion-scale-in;\n  animation-delay: var(--dsu-motion-delay, 0s);\n}\n\n.dsu-motion-slide-left {\n  animation: .28s cubic-bezier(.33, 1, .68, 1) both dsu-motion-slide-left;\n  animation-delay: var(--dsu-motion-delay, 0s);\n}\n\n.dsu-motion-expand {\n  animation: .28s cubic-bezier(.33, 1, .68, 1) both dsu-motion-expand;\n  animation-delay: var(--dsu-motion-delay, 0s);\n  transform-origin: top;\n}\n\n.dsu-motion-slide-down {\n  animation: .28s cubic-bezier(.33, 1, .68, 1) both dsu-motion-slide-down;\n  animation-delay: var(--dsu-motion-delay, 0s);\n}\n\n.dsu-motion-panel {\n  animation: .3s cubic-bezier(.33, 1, .68, 1) both dsu-motion-panel;\n}\n\n.dsu-motion-reveal {\n  animation: .42s cubic-bezier(.33, 1, .68, 1) both dsu-motion-reveal;\n}\n\n@keyframes dsu-motion-reveal {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n.dsu-motion-bloom {\n  animation: .42s cubic-bezier(.33, 1, .68, 1) both dsu-motion-bloom;\n}\n\n@keyframes dsu-motion-bloom {\n  from {\n    opacity: 0;\n    transform: scale(.99);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n.dsu-motion-zoom {\n  animation: .4s cubic-bezier(.33, 1, .68, 1) both dsu-motion-zoom;\n}\n\n@keyframes dsu-motion-zoom {\n  from {\n    opacity: 0;\n    transform: scale(.97);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n@keyframes dsu-motion-panel {\n  from {\n    opacity: .4;\n    transform: translateY(6px);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n.dsu-motion-select {\n  animation: .32s cubic-bezier(.33, 1, .68, 1) both dsu-motion-select;\n}\n\n@keyframes dsu-motion-select {\n  0% {\n    box-shadow: inset 0 0 #0000, inset 3px 0 #0000;\n  }\n\n  100% {\n    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--dsu-accent, #4176e6) 45%, transparent),\n      inset 3px 0 0 0 color-mix(in srgb, var(--dsu-accent, #4176e6) 90%, transparent);\n  }\n}\n\n@keyframes dsu-motion-rise {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n@keyframes dsu-motion-fade-in {\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes dsu-motion-rise-scale {\n  from {\n    opacity: 0;\n    transform: translateY(8px) scale(.98);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n@keyframes dsu-motion-slide-in {\n  from {\n    opacity: 0;\n    transform: translateX(12px);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n@keyframes dsu-motion-slide-left {\n  from {\n    opacity: 0;\n    transform: translateX(-12px);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n@keyframes dsu-motion-blur-in {\n  from {\n    opacity: 0;\n    filter: blur(6px);\n    transform: translateY(4px);\n  }\n\n  to {\n    opacity: 1;\n    filter: blur();\n    transform: none;\n  }\n}\n\n@keyframes dsu-motion-scale-in {\n  from {\n    opacity: 0;\n    transform: scale(.97);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n@keyframes dsu-motion-expand {\n  from {\n    opacity: 0;\n    transform: scaleY(.8);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n@keyframes dsu-motion-slide-down {\n  from {\n    opacity: 0;\n    transform: translateY(-12px);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsu-motion-fade-up, .dsu-motion-fade, .dsu-motion-rise-scale, .dsu-motion-slide-in, .dsu-motion-blur-in, .dsu-motion-scale-in, .dsu-motion-slide-left, .dsu-motion-expand, .dsu-motion-slide-down, .dsu-motion-reveal, .dsu-motion-bloom, .dsu-motion-zoom {\n    animation-name: dsu-motion-fade-in;\n    animation-duration: .1s;\n    animation-delay: 0s;\n  }\n\n  .dsu-motion-select, .dsu-motion-panel {\n    animation: none;\n  }\n}\n\nhtml[data-dsu-anim] [role=\"dialog\"] {\n  animation: dsu-dialog var(--dsu-anim-duration, .2s) var(--dsu-anim-ease, cubic-bezier(.2, 0, 0, 1)) both;\n}\n\nhtml[data-dsu-anim] [role=\"presentation\"] {\n  animation: .15s ease-out both dsu-node;\n}\n\nhtml[data-dsu-anim] [data-dsu-motion=\"fade-up\"], html[data-dsu-anim] .dsu-anim-reveal {\n  animation: dsu-fade-up var(--dsu-anim-duration, .2s) var(--dsu-anim-ease, cubic-bezier(.2, 0, 0, 1)) both;\n}\n\n@keyframes dsu-fade-up {\n  from {\n    opacity: 0;\n    transform: translateY(var(--dsu-anim-rise, 6px));\n  }\n}\n\n@keyframes dsu-dialog {\n  from {\n    opacity: 0;\n    transform: translateY(10px) scale(.99);\n  }\n}\n\nhtml[data-dsu-anim] .dsu-dialog-out {\n  animation: .16s ease-in both dsu-dialog-out;\n}\n\nhtml[data-dsu-anim] .dsu-dialog-out * {\n  animation: none !important;\n}\n\n@keyframes dsu-dialog-out {\n  to {\n    opacity: 0;\n  }\n}\n\n@keyframes dsu-node {\n  from {\n    opacity: 0;\n  }\n}\n\nhtml[data-dsu-anim][data-dsu-preset=\"focus\"] [data-dsu-motion=\"fade-up\"], html[data-dsu-anim][data-dsu-preset=\"focus\"] .dsu-anim-reveal, html[data-dsu-anim][data-dsu-preset=\"focus\"] [role=\"dialog\"], html[data-dsu-anim][data-dsu-preset=\"focus\"] [role=\"presentation\"] {\n  animation-name: dsu-node;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  html[data-dsu-anim] [data-dsu-motion], html[data-dsu-anim] [role=\"dialog\"], html[data-dsu-anim] [role=\"presentation\"] {\n    animation-duration: .1s !important;\n  }\n\n  html[data-dsu-anim] [data-dsu-motion=\"fade-up\"], html[data-dsu-anim] .dsu-anim-reveal, html[data-dsu-anim] [role=\"dialog\"], html[data-dsu-anim] [role=\"presentation\"] {\n    animation-name: dsu-node;\n  }\n}\n.NBCYja_root {\n  min-width: 0;\n  color: var(--dsw-alias-label-primary);\n  flex-direction: column;\n  font-size: 16px;\n  line-height: 28px;\n  display: flex;\n}\n\n.NBCYja_body {\n  flex-direction: column;\n  gap: 16px;\n  min-width: 0;\n  display: flex;\n}\n\n.NBCYja_think {\n  flex-direction: column;\n  display: flex;\n}\n\n.NBCYja_thinkRow {\n  position: relative;\n  overflow: hidden;\n}\n\n.NBCYja_think[data-state=\"running\"] .NBCYja_thinkRow:after {\n  content: \"\";\n  inset-block: 0;\n  background: linear-gradient(90deg,\n    transparent 0%,\n    color-mix(in srgb, var(--dsw-alias-bg-base) 60%, transparent) 55%,\n    transparent 100%);\n  pointer-events: none;\n  width: 300px;\n  animation: 2.6s ease-out infinite NBCYja_dsh-smooth-stream-think-sweep;\n  position: absolute;\n  left: 0;\n}\n\n@keyframes NBCYja_dsh-smooth-stream-think-sweep {\n  0% {\n    left: -300px;\n  }\n\n  90%, 100% {\n    left: 100%;\n  }\n}\n\n.NBCYja_thinkLeading {\n  flex-shrink: 0;\n}\n\n.NBCYja_thinkChevron {\n  color: var(--dsw-alias-label-secondary);\n}\n\n.NBCYja_thinkTitle {\n  font-weight: 400;\n}\n\n.NBCYja_thinkSeparator {\n  background: var(--dsw-alias-label-caption);\n  border-radius: 1px;\n  flex: none;\n  width: 2px;\n  height: 2px;\n  margin: 0 8px;\n}\n\n.NBCYja_thinkSummary {\n  min-width: 0;\n  color: var(--dsw-alias-label-tertiary);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  flex: auto;\n  font-size: 14px;\n  line-height: 24px;\n  overflow: hidden;\n}\n\n.NBCYja_thinkSummary[data-follow-end] {\n  text-overflow: clip;\n}\n\n.NBCYja_thinkBody {\n  color: var(--dsw-alias-label-tertiary);\n  white-space: pre-wrap;\n  word-break: break-word;\n  padding: 4px 0 4px 22px;\n  font-size: 14px;\n  line-height: 24px;\n}\n\n.NBCYja_disclosureRoot {\n  flex-direction: column;\n  width: 100%;\n  min-width: 0;\n  display: flex;\n}\n\n.NBCYja_disclosureRow {\n  cursor: pointer;\n  align-items: center;\n  min-width: 0;\n  height: 24px;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n}\n\n.NBCYja_disclosureLeading {\n  width: 16px;\n  height: 16px;\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  margin-right: 6px;\n  display: inline-flex;\n  position: relative;\n}\n\n.NBCYja_disclosureIconIdle {\n  opacity: 1;\n  transition: opacity .1s;\n  display: inline-flex;\n}\n\n.NBCYja_disclosureChevronHover {\n  opacity: 0;\n  margin: auto;\n  transition: opacity .1s;\n  position: absolute;\n  inset: 0;\n}\n\n.NBCYja_disclosureRow:hover .NBCYja_disclosureIconIdle {\n  opacity: 0;\n}\n\n.NBCYja_disclosureRow:hover .NBCYja_disclosureChevronHover {\n  opacity: 1;\n}\n\n.NBCYja_disclosureTitle {\n  color: var(--dsw-alias-label-secondary);\n  flex: none;\n  font-size: 14px;\n  line-height: 24px;\n}\n\n.NBCYja_disclosureContent {\n  visibility: visible;\n  transition: grid-template-rows var(--ds-transition-duration, .2s) var(--ds-ease-in-out, cubic-bezier(.4, 0, .2, 1)),\n    visibility 0s;\n  grid-template-rows: 1fr;\n  display: grid;\n}\n\n.NBCYja_disclosureContent[data-collapsed] {\n  visibility: hidden;\n  transition: grid-template-rows var(--ds-transition-duration, .2s) var(--ds-ease-in-out, cubic-bezier(.4, 0, .2, 1)),\n    visibility 0s var(--ds-transition-duration, .2s);\n  grid-template-rows: 0fr;\n}\n\n.NBCYja_disclosureContent > * {\n  min-height: 0;\n  overflow: hidden;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .NBCYja_think[data-state=\"running\"] .NBCYja_thinkRow:after {\n    animation: none;\n  }\n\n  .NBCYja_disclosureContent, .NBCYja_disclosureContent[data-collapsed] {\n    transition: none;\n  }\n}\n\n.NBCYja_stopped {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-tertiary);\n  border-radius: 6px;\n  align-self: flex-start;\n  padding: 0 6px;\n  font-size: 11px;\n  line-height: 18px;\n}\n\n.NBCYja_visuallyHidden {\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  white-space: nowrap;\n  border: 0;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  position: absolute;\n  overflow: hidden;\n}\n\n.NBCYja_follow {\n  contain: layout style;\n  min-width: 0;\n}\n\n@supports (text-box-trim: trim-both) {\n  .NBCYja_root :is(p, h1, h2, h3, h4, h5, h6, li, blockquote) {\n    text-box-trim: trim-both;\n    text-box-edge: text;\n  }\n}\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-0), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-0) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 0.0%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-1), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-1) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 3.22581%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-2), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-2) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 6.45161%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-3), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-3) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 9.67742%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-4), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-4) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 12.9032%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-5), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-5) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 16.129%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-6), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-6) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 19.3548%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-7), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-7) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 22.5807%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-8), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-8) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 25.8065%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-9), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-9) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 29.0323%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-10), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-10) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 32.2581%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-11), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-11) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 35.4839%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-12), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-12) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 38.7097%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-13), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-13) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 41.9355%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-14), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-14) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 45.1613%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-15), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-15) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 48.3871%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-16), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-16) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 51.6129%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-17), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-17) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 54.8387%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-18), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-18) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 58.0645%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-19), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-19) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 61.2903%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-20), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-20) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 64.5161%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-21), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-21) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 67.7419%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-22), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-22) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 70.9677%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-23), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-23) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 74.1936%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-24), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-24) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 77.4194%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-25), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-25) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 80.6452%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-26), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-26) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 83.871%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-27), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-27) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 87.0968%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-28), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-28) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 90.3226%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-29), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-29) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 93.5484%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-30), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-30) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 96.7742%, transparent);\n}\n\n.U4dpkG_scope::highlight(U4dpkG_dsh-smooth-stream-log-fade-31), .U4dpkG_scope ::highlight(U4dpkG_dsh-smooth-stream-log-fade-31) {\n  color: color-mix(in srgb, var(--dsh-smooth-stream-fade-color, currentColor) 100.0%, transparent);\n}\n.G0w6yq_card {\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-alias-bg-layer-3);\n  border-radius: 12px;\n  flex-direction: column;\n  list-style: none;\n  transition: border-color .16s, background .16s;\n  display: flex;\n}\n\n.G0w6yq_card:hover {\n  border-color: var(--dsw-alias-label-dimmed);\n}\n\n.G0w6yq_cardOpen {\n  border-color: var(--dsw-alias-label-dimmed);\n  background: var(--dsw-alias-bg-layer-2);\n}\n\n.G0w6yq_header {\n  appearance: none;\n  cursor: pointer;\n  text-align: left;\n  width: 100%;\n  font: inherit;\n  color: inherit;\n  background: none;\n  border: 0;\n  border-radius: 12px;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  display: flex;\n}\n\n.G0w6yq_header:focus-visible {\n  outline: 2px solid var(--dsw-alias-brand-primary);\n  outline-offset: -2px;\n}\n\n.G0w6yq_headText {\n  flex-direction: column;\n  flex: 1;\n  gap: 4px;\n  min-width: 0;\n  display: flex;\n}\n\n.G0w6yq_name {\n  color: var(--dsw-alias-label-primary);\n  font-size: 15px;\n  font-weight: 600;\n  line-height: 1.4;\n}\n\n.G0w6yq_description {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 13px;\n  line-height: 1.5;\n}\n\n.G0w6yq_version {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 16rem;\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n  font-size: 12px;\n  line-height: 1.5;\n  overflow: hidden;\n}\n\n.G0w6yq_pending {\n  background: var(--dsw-alias-bg-module-platform);\n  color: var(--dsw-alias-label-secondary);\n  white-space: nowrap;\n  border-radius: 999px;\n  flex: none;\n  padding: 1px 8px;\n  font-size: 11px;\n  font-weight: 500;\n  line-height: 17px;\n}\n\n.G0w6yq_chevron {\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n  transition: transform .16s;\n}\n\n.G0w6yq_chevronOpen {\n  transform: rotate(180deg);\n}\n\n.G0w6yq_body {\n  border-top: 1px solid var(--dsw-alias-border-l2);\n  flex-direction: column;\n  margin: 0 16px;\n  padding-bottom: 8px;\n  display: flex;\n}\n\n.G0w6yq_readOnly {\n  color: var(--dsw-alias-label-tertiary);\n  margin: 12px 0 0;\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.G0w6yq_field {\n  flex-direction: column;\n  gap: 6px;\n  padding: 12px 0;\n  display: flex;\n}\n\n.G0w6yq_field + .G0w6yq_field {\n  border-top: 1px solid var(--dsw-alias-border-l2);\n}\n\n.G0w6yq_fieldDisabled {\n  opacity: .5;\n}\n\n.G0w6yq_fieldHead {\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  display: flex;\n}\n\n.G0w6yq_label {\n  min-width: 0;\n  color: var(--dsw-alias-label-primary);\n  flex: 1;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1.5;\n}\n\n.G0w6yq_toggle {\n  width: 16px;\n  height: 16px;\n  accent-color: var(--dsw-alias-brand-primary);\n  cursor: pointer;\n}\n\n.G0w6yq_toggle:disabled {\n  cursor: default;\n}\n\n.G0w6yq_toggle:focus-visible {\n  outline: 2px solid var(--dsw-alias-brand-primary);\n  outline-offset: 2px;\n}\n\n.G0w6yq_hint {\n  color: var(--dsw-alias-label-tertiary);\n  margin: 0;\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.G0w6yq_failure {\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n  display: flex;\n}\n\n.G0w6yq_updateRow {\n  border-top: 1px solid var(--dsw-alias-border-l2);\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n  display: flex;\n}\n\n.G0w6yq_updateCopy {\n  flex-direction: column;\n  gap: 4px;\n  min-width: 0;\n  display: flex;\n}\n\n.G0w6yq_footer {\n  border-top: 1px solid var(--dsw-alias-border-l2);\n  justify-content: flex-end;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 0 4px;\n  display: flex;\n}\n\n.G0w6yq_failed {\n  min-width: 0;\n  color: var(--dsw-alias-label-error);\n  flex: 1;\n  margin: 0;\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.G0w6yq_save, .G0w6yq_discard, .G0w6yq_update {\n  appearance: none;\n  font: inherit;\n  cursor: pointer;\n  border: 1px solid #0000;\n  border-radius: 8px;\n  padding: 5px 14px;\n  font-size: 13px;\n  line-height: 1.5;\n}\n\n.G0w6yq_save {\n  background: var(--dsw-alias-label-primary);\n  color: var(--dsw-alias-bg-layer-3);\n}\n\n.G0w6yq_discard {\n  border-color: var(--dsw-alias-border-l2);\n  color: var(--dsw-alias-label-secondary);\n  background: none;\n}\n\n.G0w6yq_discard:hover:not(:disabled), .G0w6yq_update:hover:not(:disabled) {\n  border-color: var(--dsw-alias-label-dimmed);\n  color: var(--dsw-alias-label-primary);\n}\n\n.G0w6yq_update {\n  border-color: var(--dsw-alias-border-l2);\n  color: var(--dsw-alias-label-secondary);\n  background: none;\n  flex: none;\n  align-items: center;\n  gap: 6px;\n  display: inline-flex;\n}\n\n.G0w6yq_discard:disabled, .G0w6yq_save:disabled, .G0w6yq_update:disabled {\n  opacity: .4;\n  cursor: default;\n}\n\n.G0w6yq_discard:focus-visible, .G0w6yq_save:focus-visible, .G0w6yq_update:focus-visible {\n  outline: 2px solid var(--dsw-alias-brand-primary);\n  outline-offset: 1px;\n}\n.XT2y7a_trigger, .XT2y7a_iconButton {\n  appearance: none;\n  width: 32px;\n  height: 32px;\n  color: var(--dsw-alias-label-tertiary);\n  cursor: pointer;\n  background: none;\n  border: 1px solid #0000;\n  border-radius: 6px;\n  justify-content: center;\n  align-items: center;\n  padding: 0;\n  display: inline-flex;\n}\n\n.XT2y7a_trigger:hover, .XT2y7a_iconButton:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n\n.XT2y7a_iconButton:disabled {\n  opacity: .45;\n  cursor: not-allowed;\n}\n\n.XT2y7a_triggerActive {\n  border-color: var(--dsw-alias-border-l2);\n  background: var(--dsw-alias-bg-layer-2);\n  color: var(--dsw-alias-state-business-primary);\n}\n\n.XT2y7a_trigger:focus-visible, .XT2y7a_iconButton:focus-visible, .XT2y7a_secondaryButton:focus-visible, .XT2y7a_primaryButton:focus-visible, .XT2y7a_number:focus-visible, .XT2y7a_range:focus-visible {\n  outline: 2px solid var(--dsw-alias-brand-primary);\n  outline-offset: 1px;\n}\n\n.XT2y7a_panel {\n  z-index: 30;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-alias-bg-layer-3);\n  width: min(328px, 100vw - 32px);\n  min-height: 280px;\n  box-shadow: 0 12px 32px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);\n  color: var(--dsw-alias-label-primary);\n  border-radius: 8px;\n  flex-direction: column;\n  display: flex;\n  position: fixed;\n  top: 88px;\n  bottom: 16px;\n  right: 16px;\n  overflow: hidden;\n}\n\n.XT2y7a_panelHeader {\n  border-bottom: 1px solid var(--dsw-alias-border-l2);\n  flex: none;\n  align-items: center;\n  gap: 8px;\n  min-height: 48px;\n  padding: 0 8px 0 14px;\n  display: flex;\n}\n\n.XT2y7a_statusDot {\n  background: var(--dsw-alias-label-caption);\n  border-radius: 50%;\n  flex: none;\n  width: 7px;\n  height: 7px;\n}\n\n.XT2y7a_statusLive {\n  background: var(--dsw-alias-state-success-primary);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-success-primary) 15%, transparent);\n}\n\n.XT2y7a_title {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  flex: 1;\n  min-width: 0;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 20px;\n  overflow: hidden;\n}\n\n.XT2y7a_state, .XT2y7a_unsaved {\n  color: var(--dsw-alias-label-tertiary);\n  white-space: nowrap;\n  flex: none;\n  font-size: 10px;\n  line-height: 16px;\n}\n\n.XT2y7a_unsaved {\n  color: var(--dsw-alias-state-warn-primary);\n}\n\n.XT2y7a_scrollArea {\n  overscroll-behavior: contain;\n  min-height: 0;\n  overflow-y: auto;\n}\n\n.XT2y7a_section {\n  padding: 14px;\n}\n\n.XT2y7a_guide {\n  border-bottom: 1px solid var(--dsw-alias-border-l2);\n  color: var(--dsw-alias-label-tertiary);\n  margin: 0;\n  padding: 12px 14px;\n  font-size: 11px;\n  line-height: 1.55;\n}\n\n.XT2y7a_section + .XT2y7a_section {\n  border-top: 1px solid var(--dsw-alias-border-l2);\n}\n\n.XT2y7a_section h2 {\n  color: var(--dsw-alias-label-secondary);\n  margin: 0 0 10px;\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 18px;\n}\n\n.XT2y7a_metrics {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0 16px;\n  margin: 0;\n  display: grid;\n}\n\n.XT2y7a_metric {\n  border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 65%, transparent);\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 8px;\n  min-width: 0;\n  padding: 5px 0;\n  display: flex;\n}\n\n.XT2y7a_metric dt {\n  min-width: 0;\n  color: var(--dsw-alias-label-tertiary);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 11px;\n  line-height: 16px;\n  overflow: hidden;\n}\n\n.XT2y7a_metric dd {\n  min-width: 0;\n  color: var(--dsw-alias-label-primary);\n  font-variant-numeric: tabular-nums;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin: 0;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  font-size: 11px;\n  line-height: 16px;\n  overflow: hidden;\n}\n\n.XT2y7a_metric dd[data-tone=\"good\"] {\n  color: var(--dsw-alias-state-success-primary);\n}\n\n.XT2y7a_metric dd[data-tone=\"warn\"] {\n  color: var(--dsw-alias-state-warn-primary);\n}\n\n.XT2y7a_control {\n  flex-direction: column;\n  gap: 5px;\n  padding: 6px 0;\n  display: flex;\n}\n\n.XT2y7a_controlHead {\n  color: var(--dsw-alias-label-secondary);\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  font-size: 11px;\n  line-height: 18px;\n  display: flex;\n}\n\n.XT2y7a_controlLabel {\n  align-items: center;\n  gap: 4px;\n  min-width: 0;\n  display: inline-flex;\n}\n\n.XT2y7a_infoButton {\n  appearance: none;\n  width: 20px;\n  height: 20px;\n  color: var(--dsw-alias-label-tertiary);\n  cursor: help;\n  background: none;\n  border: 0;\n  border-radius: 50%;\n  justify-content: center;\n  align-items: center;\n  padding: 0;\n  display: inline-flex;\n}\n\n.XT2y7a_infoButton:hover {\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.XT2y7a_infoButton:focus-visible {\n  outline: 2px solid var(--dsw-alias-brand-primary);\n  outline-offset: 1px;\n}\n\n.XT2y7a_numberWrap {\n  flex: none;\n  align-items: center;\n  gap: 4px;\n  display: inline-flex;\n}\n\n.XT2y7a_number {\n  box-sizing: border-box;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-alias-bg-layer-2);\n  width: 68px;\n  height: 26px;\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  font-variant-numeric: tabular-nums;\n  text-align: right;\n  border-radius: 5px;\n  padding: 2px 6px;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n}\n\n.XT2y7a_unit {\n  width: 30px;\n  color: var(--dsw-alias-label-tertiary);\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  font-size: 10px;\n}\n\n.XT2y7a_range {\n  width: 100%;\n  height: 18px;\n  accent-color: var(--dsw-alias-state-business-primary);\n  cursor: pointer;\n  margin: 0;\n}\n\n.XT2y7a_range:disabled, .XT2y7a_number:disabled {\n  opacity: .5;\n  cursor: default;\n}\n\n.XT2y7a_footer {\n  border-top: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-alias-bg-layer-2);\n  flex: none;\n  align-items: center;\n  gap: 6px;\n  min-height: 50px;\n  padding: 8px 10px;\n  display: flex;\n}\n\n.XT2y7a_footerSpacer {\n  flex: 1;\n}\n\n.XT2y7a_secondaryButton, .XT2y7a_primaryButton {\n  appearance: none;\n  border: 1px solid var(--dsw-alias-border-l2);\n  min-height: 30px;\n  color: var(--dsw-alias-label-secondary);\n  font: inherit;\n  cursor: pointer;\n  background: none;\n  border-radius: 6px;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  padding: 4px 9px;\n  font-size: 11px;\n  line-height: 18px;\n  display: inline-flex;\n}\n\n.XT2y7a_primaryButton {\n  background: var(--dsw-alias-label-primary);\n  color: var(--dsw-alias-bg-layer-3);\n  border-color: #0000;\n}\n\n.XT2y7a_secondaryButton:hover:not(:disabled) {\n  color: var(--dsw-alias-label-primary);\n  border-color: var(--dsw-alias-label-dimmed);\n}\n\n.XT2y7a_secondaryButton:disabled, .XT2y7a_primaryButton:disabled {\n  opacity: .4;\n  cursor: default;\n}\n\n.XT2y7a_visuallyHidden {\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  white-space: nowrap;\n  border: 0;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  position: absolute;\n  overflow: hidden;\n}\n\n@media (width <= 900px) {\n  .XT2y7a_trigger, .XT2y7a_iconButton {\n    width: 44px;\n    height: 44px;\n  }\n\n  .XT2y7a_panel {\n    top: auto;\n    right: 12px;\n    bottom: max(12px, env(safe-area-inset-bottom));\n    width: auto;\n    max-height: min(70dvh, 640px);\n    left: 12px;\n  }\n\n  .XT2y7a_secondaryButton, .XT2y7a_primaryButton {\n    min-height: 44px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .XT2y7a_statusLive {\n    box-shadow: none;\n  }\n}\n._12yzIa_mock {\n  --pv-base: var(--dsw-static-neutral-bluish-00);\n  border: 1px solid var(--dsw-alias-border-l2);\n  background-color: color-mix(in srgb, var(--pv-base) 60%, transparent);\n  background-position: center;\n  background-size: cover;\n  border-radius: 12px;\n  height: 128px;\n  position: relative;\n  overflow: hidden;\n}\n\nbody[data-ds-dark-theme] ._12yzIa_mock {\n  --pv-base: var(--dsw-static-neutral-bluish-950);\n}\n\n._12yzIa_scrim {\n  background: rgb(15 17 21 / var(--pv-scrim, 22%));\n  display: none;\n  position: absolute;\n  inset: 0;\n}\n\nbody[data-ds-dark-theme] ._12yzIa_scrim {\n  display: block;\n}\n\n._12yzIa_window {\n  line-height: 1.4;\n  font-family: var(--dsw-font-family, system-ui, sans-serif);\n  display: flex;\n  position: absolute;\n  inset: 0;\n}\n\n._12yzIa_sidebar {\n  border-right: 1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 60%, transparent);\n  flex-direction: column;\n  flex: none;\n  gap: 5px;\n  width: 22%;\n  padding: 8px 7px;\n  display: flex;\n}\n\n._12yzIa_navDot {\n  border-radius: 50%;\n  width: 10px;\n  height: 10px;\n  margin-bottom: 2px;\n}\n\n._12yzIa_line {\n  background: color-mix(in srgb, var(--dsw-alias-label-tertiary) 55%, transparent);\n  border-radius: 2px;\n  height: 3px;\n}\n\n._12yzIa_navActive {\n  opacity: .85;\n  border-radius: 3px;\n  height: 10px;\n}\n\n._12yzIa_main {\n  flex-direction: column;\n  flex: auto;\n  gap: 6px;\n  min-width: 0;\n  padding: 8px;\n  display: flex;\n}\n\n._12yzIa_topbar {\n  justify-content: space-between;\n  align-items: center;\n  gap: 6px;\n  display: flex;\n}\n\n._12yzIa_title {\n  color: var(--dsw-alias-label-primary);\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  font-weight: 600;\n  overflow: hidden;\n}\n\n._12yzIa_badge {\n  border-radius: 999px;\n  flex: none;\n  padding: 1px 6px;\n  font-size: .8em;\n  font-weight: 600;\n}\n\n._12yzIa_chat {\n  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 55%, transparent);\n  border-radius: 8px;\n  flex-direction: column;\n  flex: auto;\n  gap: 5px;\n  min-height: 0;\n  padding: 6px;\n  display: flex;\n}\n\n._12yzIa_bubbleLeft {\n  background: color-mix(in srgb, var(--dsw-alias-label-tertiary) 32%, transparent);\n  border-radius: 4px;\n  width: 78%;\n  height: 7px;\n}\n\n._12yzIa_bubbleRight {\n  opacity: .85;\n  border: 1px solid;\n  border-radius: 4px;\n  align-self: flex-end;\n  width: 55%;\n  height: 7px;\n}\n\n._12yzIa_inputRow {\n  align-items: center;\n  gap: 6px;\n  display: flex;\n}\n\n._12yzIa_inputField {\n  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 60%, transparent);\n  border-radius: 5px;\n  flex: auto;\n  height: 14px;\n}\n\n._12yzIa_send {\n  border-radius: 50%;\n  flex: none;\n  width: 14px;\n  height: 14px;\n}\n.C2tyhq_section {\n  flex-direction: column;\n  gap: 14px;\n  display: flex;\n}\n\n.C2tyhq_heading {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 24px;\n}\n\n.C2tyhq_intro {\n  color: var(--dsw-alias-label-secondary);\n  margin: 0;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.C2tyhq_card {\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base) 78%, transparent);\n  border-radius: 12px;\n  flex-direction: column;\n  gap: 12px;\n  padding: 14px;\n  display: flex;\n}\n\n.C2tyhq_row {\n  grid-template-columns: 150px 1fr;\n  align-items: center;\n  gap: 10px;\n  display: grid;\n}\n\n.C2tyhq_groupHeader {\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  display: flex;\n}\n\n.C2tyhq_groupReset {\n  border: 1px solid var(--dsw-alias-border-l2);\n  height: 24px;\n  color: var(--dsw-alias-label-secondary);\n  white-space: nowrap;\n  cursor: pointer;\n  background: none;\n  border-radius: 6px;\n  flex: none;\n  padding: 0 10px;\n  font-size: 11px;\n  line-height: 22px;\n  transition: border-color .12s, color .12s;\n}\n\n.C2tyhq_groupReset:hover:not(:disabled) {\n  border-color: var(--dsw-alias-brand-primary);\n  color: var(--dsw-alias-brand-primary);\n}\n\n.C2tyhq_groupReset:disabled {\n  cursor: default;\n  opacity: .5;\n}\n\n.C2tyhq_inspire {\n  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 45%, transparent);\n  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);\n  height: 24px;\n  color: var(--dsw-alias-brand-primary);\n  white-space: nowrap;\n  cursor: pointer;\n  border-radius: 999px;\n  flex: none;\n  padding: 0 12px;\n  font-size: 11px;\n  line-height: 22px;\n  transition: background .12s;\n}\n\n.C2tyhq_inspire:hover:not(:disabled) {\n  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);\n}\n\n.C2tyhq_inspire:disabled {\n  cursor: default;\n  opacity: .5;\n}\n\n.C2tyhq_label {\n  color: var(--dsw-alias-label-primary);\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.C2tyhq_hint {\n  color: var(--dsw-alias-label-tertiary);\n  grid-column: 2;\n  margin: -4px 0 0;\n  font-size: 11px;\n  line-height: 16px;\n}\n\n.C2tyhq_slider {\n  align-items: center;\n  gap: 10px;\n  display: flex;\n}\n\n.C2tyhq_text {\n  box-sizing: border-box;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-specific-input-major);\n  height: 30px;\n  color: var(--dsw-alias-label-primary);\n  font-size: 13px;\n  line-height: 30px;\n  font-family: var(--dsw-font-family, system-ui, sans-serif);\n  border-radius: 6px;\n  padding: 0 10px;\n}\n\n.C2tyhq_select {\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-specific-input-major);\n  height: 30px;\n  color: var(--dsw-alias-label-primary);\n  border-radius: 6px;\n  padding: 0 8px;\n  font-size: 13px;\n}\n\n.C2tyhq_color {\n  box-sizing: border-box;\n  border: 1px solid var(--dsw-alias-border-l2);\n  cursor: pointer;\n  background: none;\n  border-radius: 6px;\n  width: 40px;\n  height: 30px;\n  padding: 0;\n}\n\n.C2tyhq_color::-webkit-color-swatch-wrapper {\n  padding: 0;\n}\n\n.C2tyhq_color::-webkit-color-swatch {\n  border: none;\n}\n\n.C2tyhq_range {\n  -webkit-appearance: none;\n  appearance: none;\n  cursor: pointer;\n  background: none;\n  flex: auto;\n  min-width: 0;\n  height: 16px;\n}\n\n.C2tyhq_range::-webkit-slider-runnable-track {\n  background: linear-gradient(to right,\n    var(--dsw-alias-brand-primary) var(--fill, 0%),\n    var(--dsw-static-neutral-bluish-300) var(--fill, 0%));\n  border-radius: 999px;\n  height: 4px;\n  box-shadow: inset 0 0 0 1px #0f11150d;\n}\n\n.C2tyhq_range::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  background: var(--dsw-alias-brand-primary);\n  border: 2px solid #fff;\n  border-radius: 50%;\n  width: 14px;\n  height: 14px;\n  margin-top: -5px;\n  transition: transform .12s, box-shadow .12s;\n  box-shadow: 0 1px 3px #00000047;\n}\n\n.C2tyhq_range:hover::-webkit-slider-thumb, .C2tyhq_range:focus-visible::-webkit-slider-thumb {\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent), 0 1px 4px #0000004d;\n  transform: scale(1.18);\n}\n\n.C2tyhq_range::-moz-range-track {\n  background: var(--dsw-static-neutral-bluish-300);\n  border-radius: 999px;\n  height: 4px;\n}\n\n.C2tyhq_range::-moz-range-progress {\n  background: var(--dsw-alias-brand-primary);\n  border-radius: 999px;\n  height: 4px;\n}\n\n.C2tyhq_range::-moz-range-thumb {\n  background: var(--dsw-alias-brand-primary);\n  border: 2px solid #fff;\n  border-radius: 50%;\n  width: 12px;\n  height: 12px;\n  box-shadow: 0 1px 3px #00000047;\n}\n\nbody[data-ds-dark-theme] .C2tyhq_range::-webkit-slider-runnable-track {\n  background: linear-gradient(to right,\n    var(--dsw-alias-brand-primary) var(--fill, 0%),\n    #ffffff3d var(--fill, 0%));\n  box-shadow: none;\n}\n\nbody[data-ds-dark-theme] .C2tyhq_range::-moz-range-track {\n  background: #ffffff3d;\n}\n\nbody[data-ds-dark-theme] .C2tyhq_range::-webkit-slider-thumb, body[data-ds-dark-theme] .C2tyhq_range::-moz-range-thumb {\n  box-shadow: 0 0 6px color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent), 0 1px 3px #0006;\n  border-color: #ffffffe6;\n}\n\n.C2tyhq_rangeValue {\n  text-align: right;\n  width: 44px;\n  color: var(--dsw-alias-label-secondary);\n  flex: none;\n  font-size: 12px;\n}\n\n.C2tyhq_check {\n  align-items: center;\n  gap: 8px;\n  display: flex;\n}\n\n.C2tyhq_checkbox {\n  accent-color: var(--dsw-alias-brand-primary);\n}\n\n.C2tyhq_footer {\n  justify-content: flex-end;\n  align-items: center;\n  gap: 12px;\n  display: flex;\n}\n\n.C2tyhq_dirty {\n  color: var(--dsw-alias-state-warn-primary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.C2tyhq_save {\n  background: var(--dsw-alias-button-primary-fill);\n  height: 30px;\n  color: var(--dsw-alias-label-primary-foreground);\n  white-space: nowrap;\n  cursor: pointer;\n  border: none;\n  border-radius: 6px;\n  flex: none;\n  padding: 0 14px;\n  font-size: 13px;\n  line-height: 30px;\n}\n\n.C2tyhq_save:hover:not(:disabled) {\n  background: var(--dsw-alias-button-primary-hover);\n}\n\n.C2tyhq_save:disabled {\n  cursor: default;\n  opacity: .5;\n}\n\n.C2tyhq_reset {\n  height: 28px;\n  color: var(--dsw-alias-label-secondary);\n  white-space: nowrap;\n  cursor: pointer;\n  background: none;\n  border: none;\n  border-radius: 6px;\n  flex: none;\n  padding: 0 10px;\n  font-size: 12px;\n  line-height: 28px;\n}\n\n.C2tyhq_reset:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.C2tyhq_reset:disabled {\n  cursor: default;\n  opacity: .5;\n}\n\n.C2tyhq_cardTitle {\n  color: var(--dsw-alias-label-primary);\n  margin: 0 0 2px;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 22px;\n}\n\n.C2tyhq_presetGrid {\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: 10px;\n  margin-top: 10px;\n  display: grid;\n}\n\n.C2tyhq_presetCard {\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base) 55%, transparent);\n  cursor: pointer;\n  text-align: left;\n  border-radius: 10px;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 4px;\n  padding: 0;\n  transition: transform .12s, border-color .12s, box-shadow .12s;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n}\n\n.C2tyhq_presetCard:hover:not(:disabled) {\n  border-color: var(--dsw-alias-border-l3, var(--dsw-alias-border-l2));\n  transform: translateY(-2px);\n  box-shadow: 0 6px 18px #0000002e;\n}\n\n.C2tyhq_presetCardActive, .C2tyhq_presetCardActive:hover:not(:disabled) {\n  border-color: var(--dsw-alias-brand-primary);\n  box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary), 0 6px 18px color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent);\n  transform: none;\n}\n\n.C2tyhq_presetBadge {\n  background: var(--dsw-alias-brand-primary);\n  color: var(--dsw-alias-label-primary-foreground);\n  pointer-events: none;\n  z-index: 1;\n  border-radius: 999px;\n  padding: 1px 8px;\n  font-size: 10px;\n  font-weight: 600;\n  line-height: 16px;\n  position: absolute;\n  top: 6px;\n  left: 6px;\n}\n\n.C2tyhq_presetCard:disabled {\n  cursor: default;\n  opacity: .6;\n}\n\n.C2tyhq_presetPreview {\n  flex: none;\n  height: 52px;\n  display: block;\n}\n\n.C2tyhq_presetName {\n  color: var(--dsw-alias-label-primary);\n  padding: 0 10px;\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 18px;\n}\n\n.C2tyhq_presetDesc {\n  color: var(--dsw-alias-label-tertiary);\n  padding: 0 10px 8px;\n  font-size: 11px;\n  line-height: 16px;\n}\n\n.C2tyhq_presetSaveRow {\n  align-items: center;\n  gap: 8px;\n  margin-top: 12px;\n  display: flex;\n}\n\n.C2tyhq_presetNameInput {\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-specific-input-major);\n  min-width: 0;\n  height: 28px;\n  color: var(--dsw-alias-label-primary);\n  border-radius: 6px;\n  flex: auto;\n  padding: 0 10px;\n  font-size: 12px;\n  line-height: 28px;\n}\n\n.C2tyhq_presetSave {\n  background: var(--dsw-alias-button-primary-fill);\n  height: 28px;\n  color: var(--dsw-alias-label-primary-foreground);\n  white-space: nowrap;\n  cursor: pointer;\n  border: none;\n  border-radius: 6px;\n  flex: none;\n  padding: 0 12px;\n  font-size: 12px;\n  line-height: 28px;\n}\n\n.C2tyhq_presetSave:hover:not(:disabled) {\n  background: var(--dsw-alias-button-primary-hover);\n}\n\n.C2tyhq_presetSave:disabled {\n  cursor: default;\n  opacity: .5;\n}\n\n.C2tyhq_presetRemove {\n  background: color-mix(in srgb, var(--dsw-alias-bg-overlay) 85%, transparent);\n  width: 20px;\n  height: 20px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  opacity: 0;\n  border: none;\n  border-radius: 50%;\n  padding: 0;\n  font-size: 11px;\n  line-height: 20px;\n  transition: opacity .12s;\n  position: absolute;\n  top: 6px;\n  right: 6px;\n}\n\n.C2tyhq_presetCard:hover .C2tyhq_presetRemove, .C2tyhq_presetCard:focus-within .C2tyhq_presetRemove {\n  opacity: 1;\n}\n\n.C2tyhq_presetRemove:hover {\n  color: var(--dsw-alias-label-primary);\n}\n\n.C2tyhq_swatches {\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  display: flex;\n}\n\n.C2tyhq_swatch {\n  border: 1px solid var(--dsw-alias-border-l2);\n  cursor: pointer;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  padding: 0;\n  transition: transform .12s, box-shadow .12s;\n}\n\n.C2tyhq_swatch:hover:not(:disabled) {\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 35%, transparent);\n  transform: scale(1.15);\n}\n\n.C2tyhq_swatch:disabled {\n  cursor: default;\n  opacity: .6;\n}\n\n.C2tyhq_previewing {\n  color: var(--dsw-alias-state-success-primary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.C2tyhq_preview {\n  border: 1px solid var(--dsw-alias-border-l2);\n  height: 30px;\n  color: var(--dsw-alias-label-secondary);\n  white-space: nowrap;\n  cursor: pointer;\n  background: none;\n  border-radius: 6px;\n  flex: none;\n  padding: 0 14px;\n  font-size: 13px;\n  line-height: 28px;\n}\n\n.C2tyhq_preview:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.C2tyhq_preview:disabled {\n  cursor: default;\n  opacity: .5;\n}\n\n.C2tyhq_cancel {\n  border: 1px solid var(--dsw-alias-state-warn-primary);\n  height: 30px;\n  color: var(--dsw-alias-state-warn-primary);\n  white-space: nowrap;\n  cursor: pointer;\n  background: none;\n  border-radius: 6px;\n  flex: none;\n  padding: 0 14px;\n  font-size: 13px;\n  line-height: 28px;\n}\n\n.C2tyhq_cancel:hover:not(:disabled) {\n  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 10%, transparent);\n}\n\n.C2tyhq_cancel:disabled {\n  cursor: default;\n  opacity: .5;\n}\n.QenXkq_section {\n  flex-direction: column;\n  gap: 8px;\n  display: flex;\n}\n\n.QenXkq_heading {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 24px;\n}\n\n.QenXkq_intro {\n  color: var(--dsw-alias-label-secondary);\n  margin: 0;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.QenXkq_row {\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 0;\n  display: flex;\n}\n\n.QenXkq_rowDivider {\n  border-top: 1px solid var(--dsw-alias-border-l2);\n}\n\n.QenXkq_rowDisabled {\n  opacity: .5;\n}\n\n.QenXkq_rowText {\n  min-width: 0;\n}\n\n.QenXkq_title {\n  color: var(--dsw-alias-label-primary);\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.QenXkq_desc {\n  color: var(--dsw-alias-label-tertiary);\n  margin-top: 2px;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.QenXkq_switch {\n  flex: none;\n  align-items: center;\n  display: inline-flex;\n}\n\n.QenXkq_checkbox {\n  width: 16px;\n  height: 16px;\n  accent-color: var(--dsw-alias-brand-primary);\n  cursor: pointer;\n}\n\n.QenXkq_selector {\n  background: var(--dsw-alias-bg-module-platform);\n  height: 36px;\n  font: inherit;\n  color: var(--dsw-alias-label-primary);\n  cursor: pointer;\n  border: none;\n  border-radius: 18px;\n  align-items: center;\n  gap: 12px;\n  padding: 0 14px;\n  font-size: 14px;\n  line-height: 22px;\n  display: inline-flex;\n}\n\n.QenXkq_selector:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.QenXkq_selector:disabled {\n  cursor: default;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.QenXkq_chevron {\n  flex: none;\n}\n\n.QenXkq_presets {\n  flex: none;\n  gap: 6px;\n  display: inline-flex;\n}\n\n.QenXkq_preset {\n  border: 1px solid var(--dsw-alias-border-l2);\n  height: 32px;\n  font: inherit;\n  color: var(--dsw-alias-label-primary);\n  cursor: pointer;\n  background: none;\n  border-radius: 16px;\n  padding: 0 14px;\n  font-size: 13px;\n  line-height: 20px;\n  transition: background-color .16s, border-color .16s, color .16s;\n}\n\n.QenXkq_preset:hover {\n  border-color: var(--dsw-alias-brand-primary);\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.QenXkq_presetActive {\n  border-color: var(--dsw-alias-brand-primary);\n  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent);\n  color: var(--dsw-alias-label-primary);\n}\n.pWneeq_section {\n  flex-direction: column;\n  gap: 0;\n  display: flex;\n}\n\n.pWneeq_tabBar {\n  border-bottom: 1px solid var(--dsw-alias-border-l2);\n  align-items: flex-end;\n  gap: 22px;\n  margin-top: 2px;\n  display: flex;\n}\n\n.pWneeq_tab {\n  color: var(--dsw-alias-label-tertiary);\n  font: inherit;\n  cursor: pointer;\n  background: none;\n  border: 0;\n  outline: none;\n  padding: 7px 1px 9px;\n  font-size: 13px;\n  line-height: 20px;\n  transition: color .12s;\n  position: relative;\n}\n\n.pWneeq_tab:hover, .pWneeq_tab[data-active=\"true\"] {\n  color: var(--dsw-alias-label-primary);\n}\n\n.pWneeq_tab[data-active=\"true\"]:after, .pWneeq_tab:focus-visible:after {\n  content: \"\";\n  background: var(--dsw-alias-label-primary);\n  border-radius: 2px 2px 0 0;\n  height: 2px;\n  position: absolute;\n  bottom: -1px;\n  left: 0;\n  right: 0;\n}\n\n.pWneeq_tab:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-business-primary);\n  outline-offset: 2px;\n  color: var(--dsw-alias-label-primary);\n  border-radius: 2px;\n}\n\n.pWneeq_panels {\n  padding-top: 16px;\n  position: relative;\n}\n\n.pWneeq_panelHidden {\n  display: none;\n}\nhtml[data-dsu-active=\"1\"] body {\n  zoom: var(--dsu-font-scale, 1);\n  --dsw-font-family: var(--dsu-font);\n  --ds-font-family-code: var(--dsu-code-font);\n  --dsw-static-deepseek-50: color-mix(in srgb, var(--dsu-accent, #4176e6) 15%, white);\n  --dsw-static-deepseek-100: color-mix(in srgb, var(--dsu-accent, #4176e6) 30%, white);\n  --dsw-static-deepseek-200: color-mix(in srgb, var(--dsu-accent, #4176e6) 45%, white);\n  --dsw-static-deepseek-300: color-mix(in srgb, var(--dsu-accent, #4176e6) 62%, white);\n  --dsw-static-deepseek-400: color-mix(in srgb, var(--dsu-accent, #4176e6) 78%, white);\n  --dsw-static-deepseek-450: color-mix(in srgb, var(--dsu-accent, #4176e6) 92%, white);\n  --dsw-static-deepseek-500: var(--dsu-accent, #4176e6);\n  --dsw-static-deepseek-600: color-mix(in srgb, var(--dsu-accent, #4176e6) 85%, black);\n  --dsw-static-deepseek-700-delete: color-mix(in srgb, var(--dsu-accent, #4176e6) 75%, black);\n  --dsw-static-deepseek-800: color-mix(in srgb, var(--dsu-accent, #4176e6) 60%, black);\n  --dsw-static-deepseek-900: color-mix(in srgb, var(--dsu-accent, #4176e6) 45%, black);\n  --dsw-alias-brand-primary: var(--dsw-static-deepseek-500);\n  --dsw-alias-brand-primary-new-colorprimary-new-color: var(--dsw-static-deepseek-450);\n  --dsw-alias-brand-text: var(--dsw-static-deepseek-600);\n  --dsw-alias-button-primary-fill: var(--dsw-alias-brand-primary);\n  --dsw-alias-button-primary-hover: var(--dsw-static-deepseek-600);\n  --dsw-alias-interactive-bg-active: color-mix(in srgb, var(--dsu-accent, #4176e6) 16%, transparent);\n  --dsw-alias-interactive-bg-hover-accent: color-mix(in srgb, var(--dsu-accent, #4176e6) 14%, transparent);\n  --dsw-alias-bg-base: color-mix(in srgb, var(--dsw-static-neutral-bluish-00) var(--dsu-surface-alpha, 50%), transparent);\n  --dsw-specific-sidebar-fill: color-mix(in srgb, var(--dsw-static-neutral-bluish-50) var(--dsu-sidebar-alpha, 50%), transparent);\n  --dsw-chat-surface: color-mix(in srgb, var(--dsw-static-neutral-bluish-00) var(--dsu-chat-alpha, 80%), transparent);\n  --dsw-specific-input-major: color-mix(in srgb, var(--dsw-static-neutral-bluish-00) var(--dsu-input-alpha, 82%), transparent);\n  --dsw-alias-markdown-code-block: color-mix(in srgb, var(--dsw-static-deepseek-50) var(--dsu-code-alpha, 45%), transparent);\n  --dsw-alias-markdown-code-block-banner: color-mix(in srgb, var(--dsw-static-deepseek-100) calc(var(--dsu-code-alpha, 45%) + 10%), transparent);\n  --dsw-alias-markdown-inline-code: color-mix(in srgb, var(--dsw-static-deepseek-100) calc(var(--dsu-code-alpha, 45%) + 15%), transparent);\n  --dsw-alias-scrollbar-bg-l1: color-mix(in srgb, var(--dsu-accent, #4176e6) calc(var(--dsu-scrollbar, 0) * 30%), transparent);\n  --dsw-alias-scrollbar-bg-l2: color-mix(in srgb, var(--dsu-accent, #4176e6) calc(var(--dsu-scrollbar, 0) * 30%), transparent);\n  --dsw-alias-scrollbar-hover-l1: color-mix(in srgb, var(--dsu-accent, #4176e6) calc(var(--dsu-scrollbar, 0) * 55%), transparent);\n  --dsw-alias-scrollbar-hover-l2: color-mix(in srgb, var(--dsu-accent, #4176e6) calc(var(--dsu-scrollbar, 0) * 55%), transparent);\n  font-family: var(--dsw-font-family) !important;\n}\n\nhtml[data-dsu-active=\"1\"] body[data-ds-dark-theme] {\n  --dsw-alias-brand-primary: var(--dsu-dark-accent, var(--dsw-static-deepseek-400));\n  --dsw-alias-button-primary-fill: var(--dsu-dark-accent, var(--dsw-static-deepseek-400));\n  --dsw-alias-button-primary-hover: var(--dsu-dark-accent, var(--dsw-static-deepseek-400));\n  --dsw-alias-brand-text: var(--dsw-static-deepseek-300);\n  --dsw-alias-bg-base: color-mix(in srgb, var(--dsw-static-neutral-bluish-950) var(--dsu-dark-alpha, var(--dsu-surface-alpha, 50%)), transparent);\n  --dsw-specific-sidebar-fill: color-mix(in srgb, var(--dsw-static-neutral-bluish-950) var(--dsu-sidebar-alpha, var(--dsu-dark-alpha, 50%)), transparent);\n  --dsw-chat-surface: color-mix(in srgb, var(--dsw-static-neutral-bluish-950) var(--dsu-chat-alpha, var(--dsu-dark-alpha, 50%)), transparent);\n  --dsw-specific-input-major: color-mix(in srgb, var(--dsw-static-neutral-bluish-850) var(--dsu-input-alpha, var(--dsu-dark-alpha, 50%)), transparent);\n  --dsw-alias-markdown-code-block: color-mix(in srgb, var(--dsw-static-neutral-bluish-900) var(--dsu-code-alpha, var(--dsu-dark-alpha, 50%)), transparent);\n  --dsw-alias-markdown-code-block-banner: color-mix(in srgb, var(--dsw-static-neutral-bluish-850) calc(var(--dsu-code-alpha, var(--dsu-dark-alpha, 50%)) + 10%), transparent);\n  --dsw-alias-markdown-inline-code: color-mix(in srgb, var(--dsw-static-deepseek-900) calc(var(--dsu-code-alpha, var(--dsu-dark-alpha, 50%)) + 15%), transparent);\n}\n\nhtml[data-dsu-active=\"1\"] #root {\n  -webkit-backdrop-filter: blur(var(--dsu-blur, 0px)) saturate(var(--dsu-saturate, 1.25));\n  box-shadow: inset 0 0 40px rgb(15 17 21 / calc(var(--dsu-vignette, 0) * .1));\n}\n\nhtml[data-dsu-active=\"1\"] [data-chat-anchor-key], html[data-dsu-active=\"1\"] input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]):not([type=\"color\"]), html[data-dsu-active=\"1\"] textarea, html[data-dsu-active=\"1\"] [role=\"dialog\"], html[data-dsu-active=\"1\"] [role=\"menu\"] {\n  border-radius: var(--dsu-radius);\n}\n\nhtml[data-dsu-active=\"1\"] [role=\"dialog\"], html[data-dsu-active=\"1\"] [role=\"menu\"] {\n  box-shadow: var(--dsu-shadow);\n}\n";document.head.appendChild(__s);}}})();
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let react = require("react");
react = __toESM(react, 1);
let react_jsx_runtime = require("react/jsx-runtime");
let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
let _deepseek_ai_dsh_client_ui_attachment = require("@deepseek-ai/dsh-client-ui-attachment");
_deepseek_ai_dsh_client_ui_attachment = __toESM(_deepseek_ai_dsh_client_ui_attachment, 1);
let react_dom = require("react-dom");
//#region src/client/zh/shared.ts
/**
* Shared constants for the zh (Chinese enhancement) feature.
* Namespace identifiers and TypeScript types for settings schema.
*/
/** Settings namespace for UI enhancement preferences (local to browser). */
const ZH_SETTINGS_NS = "dsh-zh-settings";
/** Archive locale namespace. */
const ZH_ARCHIVE_NS = "dsh-zh-archive";
/** Default values for the UI settings store (before scope resolves). */
const ZH_SETTINGS_DEFAULTS = {
	zhComplete: true,
	statsFull: true,
	chatWidthEnabled: true,
	chatWidth: 90,
	thinkingAuto: true,
	thinkMaxLines: 20,
	thinkMaxLinesFrom: "latest",
	thinkMode: "button",
	deleteSessionEnabled: true,
	archiveViewEnabled: true,
	renderUserMarkdown: false,
	batchOpsEnabled: true,
	serviceMonitorEnabled: false,
	serviceMonitorIntervalSec: 10,
	serviceMonitorTargets: [],
	serviceMonitorSettingsOpen: false
};
//#endregion
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
/**
* The three curated motion presets, in display order. Personality:
* fluid — a lively cascade (rise-scale rows, sliding sidebar, everything on);
* elegant — a quiet high-end feel (soft blur, plain sidebar fade, bloom);
* minimal — barely-there fades with the selection box and settings motion off.
*/
const MOTION_PRESETS = [
	{
		id: "fluid",
		config: {
			motionEnabled: true,
			motionStyle: "rise-scale",
			sidebarMotionEnabled: true,
			sidebarMotionStyle: "slide-left",
			selectionMotionEnabled: true,
			newChatMotionEnabled: true,
			newChatMotionStyle: "reveal",
			settingsMotionEnabled: true
		}
	},
	{
		id: "elegant",
		config: {
			motionEnabled: true,
			motionStyle: "blur-in",
			sidebarMotionEnabled: true,
			sidebarMotionStyle: "fade",
			selectionMotionEnabled: true,
			newChatMotionEnabled: true,
			newChatMotionStyle: "bloom",
			settingsMotionEnabled: true
		}
	},
	{
		id: "minimal",
		config: {
			motionEnabled: true,
			motionStyle: "fade",
			sidebarMotionEnabled: true,
			sidebarMotionStyle: "fade",
			selectionMotionEnabled: false,
			newChatMotionEnabled: true,
			newChatMotionStyle: "fade",
			settingsMotionEnabled: false
		}
	}
];
/** Guard for a MotionPresetId value. */
const isMotionPresetId = (value) => typeof value === "string" && MOTION_PRESETS.some((preset) => preset.id === value);
//#endregion
//#region src/client/config.ts
/** Valid corner-radius values (in UI order). */
const CORNER_RADIUS_LEVELS = [
	"inherit",
	"sm",
	"md",
	"lg",
	"xl"
];
/** Valid surface-shadow values (in UI order). */
const SURFACE_SHADOW_LEVELS = [
	"inherit",
	"none",
	"soft",
	"medium",
	"strong"
];
const isOneOf = (value, options, fallback) => typeof value === "string" && options.includes(value) ? value : fallback;
const isCornerRadius = (value) => typeof value === "string" && CORNER_RADIUS_LEVELS.includes(value);
const isSurfaceShadow = (value) => typeof value === "string" && SURFACE_SHADOW_LEVELS.includes(value);
/**
* Shipped defaults: deliberately neutral — stock blue accent,
* opaque surfaces. Out of the box the plugin changes nothing; users compose
* their own look with a preset and/or explicit fields in their profile row.
*/
const DEFAULTS = {
	preset: "",
	accent: "#4176e6",
	autoAccent: false,
	surfaceOpacity: 100,
	sidebarOpacity: 100,
	chatSurfaceOpacity: 100,
	inputOpacity: 100,
	codeBlockOpacity: 100,
	fontFamily: "",
	codeFontFamily: "",
	fontScale: 1,
	scrollbarAccent: false,
	cornerRadius: "inherit",
	surfaceShadow: "inherit",
	darkAccent: "",
	customCss: "",
	customVars: {}
};
/** Clamp a number into [lo, hi], falling back when absent/non-finite. */
const clampNumber = (value, lo, hi, fallback) => {
	return Math.min(hi, Math.max(lo, typeof value === "number" && Number.isFinite(value) ? value : fallback));
};
/** Trim a string, returning the fallback when empty/non-string. */
const cleanString = (value, fallback) => typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
const toBoolean = (value, fallback) => typeof value === "boolean" ? value : fallback;
const toPercent = (value, fallback) => clampNumber(value, 0, 100, fallback);
const toVars = (value) => {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return {};
	const out = {};
	for (const [key, raw] of Object.entries(value)) if (typeof raw === "string" || typeof raw === "number") out[key] = String(raw);
	return out;
};
/**
* Resolve the enabled feature set from the loader config. The `features`
* field is a whitelist: absent or empty means every feature mounts (backward
* compatible); present means only the listed features register. Unknown ids
* are dropped. Pure: no DOM access, fully unit-testable.
* @param raw - the profile-level plugin config.
* @returns the set of features to mount.
*/
function resolveFeatures(raw) {
	const list = raw?.features;
	if (!Array.isArray(list) || list.length === 0) return /* @__PURE__ */ new Set([...FEATURES]);
	return new Set(list.filter((id) => FEATURES.includes(id)));
}
/**
* Merge DEFAULTS ← preset ← explicit config, then coerce/clamp every field.
* Pure: no DOM access, fully unit-testable.
* @param raw - profile-level plugin config (may be partial / malformed).
* @param preset - resolved preset partial (undefined when no preset matched).
* @returns a normalized config ready for the applier.
*/
function normalizeConfig(raw, preset) {
	const merged = {
		...DEFAULTS,
		...preset,
		...raw
	};
	const surfaceOpacity = toPercent(merged.surfaceOpacity, DEFAULTS.surfaceOpacity);
	const darkSurfaceOpacity = merged.darkSurfaceOpacity === void 0 ? surfaceOpacity : toPercent(merged.darkSurfaceOpacity, surfaceOpacity);
	return {
		preset: cleanString(merged.preset, DEFAULTS.preset),
		accent: cleanString(merged.accent, DEFAULTS.accent),
		autoAccent: toBoolean(merged.autoAccent, DEFAULTS.autoAccent),
		surfaceOpacity,
		sidebarOpacity: toPercent(merged.sidebarOpacity, DEFAULTS.sidebarOpacity),
		chatSurfaceOpacity: toPercent(merged.chatSurfaceOpacity, DEFAULTS.chatSurfaceOpacity),
		inputOpacity: toPercent(merged.inputOpacity, DEFAULTS.inputOpacity),
		codeBlockOpacity: toPercent(merged.codeBlockOpacity, DEFAULTS.codeBlockOpacity),
		darkSurfaceOpacity,
		fontFamily: typeof merged.fontFamily === "string" ? merged.fontFamily.trim() : "",
		codeFontFamily: typeof merged.codeFontFamily === "string" ? merged.codeFontFamily.trim() : "",
		fontScale: Math.round(clampNumber(merged.fontScale, .9, 1.1, DEFAULTS.fontScale) * 20) / 20,
		scrollbarAccent: toBoolean(merged.scrollbarAccent, DEFAULTS.scrollbarAccent),
		cornerRadius: isOneOf(merged.cornerRadius, CORNER_RADIUS_LEVELS, DEFAULTS.cornerRadius),
		surfaceShadow: isOneOf(merged.surfaceShadow, SURFACE_SHADOW_LEVELS, DEFAULTS.surfaceShadow),
		darkAccent: cleanString(merged.darkAccent, DEFAULTS.darkAccent),
		customCss: typeof merged.customCss === "string" ? merged.customCss : "",
		customVars: toVars(merged.customVars)
	};
}
/** All supported knob names (drives docs and future settings UI). */
const CONFIG_KEYS = [
	"preset",
	"accent",
	"autoAccent",
	"surfaceOpacity",
	"sidebarOpacity",
	"chatSurfaceOpacity",
	"inputOpacity",
	"codeBlockOpacity",
	"darkSurfaceOpacity",
	"fontFamily",
	"codeFontFamily",
	"fontScale",
	"scrollbarAccent",
	"cornerRadius",
	"surfaceShadow",
	"darkAccent",
	"customCss",
	"customVars"
];
//#endregion
//#region src/client/apply.ts
const CUSTOM_STYLE_ID = "dsh-ui-custom-css";
/** Corner radius px per level ('inherit' is handled by the caller). */
const CORNER_RADIUS_PX = {
	sm: 6,
	md: 10,
	lg: 14,
	xl: 18
};
/** Box-shadow string per surface-shadow level ('inherit' is handled by the caller). */
const SURFACE_SHADOW_CSS = {
	none: "none",
	soft: "0 8px 24px rgb(0 0 0 / 0.10)",
	medium: "0 14px 36px rgb(0 0 0 / 0.16)",
	strong: "0 24px 56px rgb(0 0 0 / 0.26)"
};
/**
* True when the normalized config overrides nothing — the exact stock look.
* The applier drops the theme gate then, so an unconfigured profile is
* byte-for-byte identical to the stock UI (the "zero changes out of the box"
* contract). Every knob the user turns makes the config non-neutral and
* activates the theme. Derived from DEFAULTS so a default-value change can
* never silently flip the gate; darkSurfaceOpacity derives from surfaceOpacity,
* so 100 is the neutral.
*/
const isNeutralConfig = (config) => config.accent === DEFAULTS.accent && config.autoAccent === DEFAULTS.autoAccent && config.surfaceOpacity === DEFAULTS.surfaceOpacity && config.sidebarOpacity === DEFAULTS.sidebarOpacity && config.chatSurfaceOpacity === DEFAULTS.chatSurfaceOpacity && config.inputOpacity === DEFAULTS.inputOpacity && config.codeBlockOpacity === DEFAULTS.codeBlockOpacity && config.darkSurfaceOpacity === 100 && config.fontFamily === DEFAULTS.fontFamily && config.codeFontFamily === DEFAULTS.codeFontFamily && config.fontScale === DEFAULTS.fontScale && config.scrollbarAccent === DEFAULTS.scrollbarAccent && config.cornerRadius === DEFAULTS.cornerRadius && config.surfaceShadow === DEFAULTS.surfaceShadow && config.darkAccent === DEFAULTS.darkAccent && config.customCss === DEFAULTS.customCss && Object.keys(config.customVars).length === 0;
/**
* Apply the normalized config to the document.
* @param config - normalized config from normalizeConfig().
*/
function applyConfig(config) {
	const root = document.documentElement;
	if (isNeutralConfig(config)) {
		root.removeAttribute("data-dsu-active");
		document.getElementById(CUSTOM_STYLE_ID)?.remove();
		return;
	}
	root.setAttribute("data-dsu-active", "1");
	const set = (name, value) => root.style.setProperty(name, value);
	set("--dsu-accent", cleanString(config.accent, "#4176e6"));
	set("--dsu-surface-alpha", `${clampNumber(config.surfaceOpacity, 0, 100, 50)}%`);
	set("--dsu-sidebar-alpha", `${clampNumber(config.sidebarOpacity, 0, 100, 50)}%`);
	set("--dsu-chat-alpha", `${clampNumber(config.chatSurfaceOpacity, 0, 100, 80)}%`);
	set("--dsu-input-alpha", `${clampNumber(config.inputOpacity, 0, 100, 82)}%`);
	set("--dsu-code-alpha", `${clampNumber(config.codeBlockOpacity, 0, 100, 45)}%`);
	set("--dsu-dark-alpha", `${clampNumber(config.darkSurfaceOpacity, 0, 100, config.surfaceOpacity)}%`);
	const font = cleanString(config.fontFamily, "");
	if (font !== "") set("--dsu-font", font);
	else root.style.removeProperty("--dsu-font");
	const codeFont = cleanString(config.codeFontFamily, "");
	if (codeFont !== "") set("--dsu-code-font", codeFont);
	else root.style.removeProperty("--dsu-code-font");
	if (config.fontScale !== 1) set("--dsu-font-scale", `${clampNumber(config.fontScale, .9, 1.1, 1)}`);
	else root.style.removeProperty("--dsu-font-scale");
	set("--dsu-scrollbar", config.scrollbarAccent ? "1" : "0");
	if (config.cornerRadius !== "inherit") set("--dsu-radius", `${CORNER_RADIUS_PX[config.cornerRadius] ?? 10}px`);
	else root.style.removeProperty("--dsu-radius");
	if (config.surfaceShadow !== "inherit") set("--dsu-shadow", SURFACE_SHADOW_CSS[config.surfaceShadow] ?? "none");
	else root.style.removeProperty("--dsu-shadow");
	const darkAccent = cleanString(config.darkAccent, "");
	if (darkAccent !== "") set("--dsu-dark-accent", darkAccent);
	else root.style.removeProperty("--dsu-dark-accent");
	for (const [key, value] of Object.entries(config.customVars)) if (value === "") root.style.removeProperty(key);
	else root.style.setProperty(key, value);
	let style = document.getElementById(CUSTOM_STYLE_ID);
	if (config.customCss !== "") {
		if (style === null) {
			style = document.createElement("style");
			style.id = CUSTOM_STYLE_ID;
			style.dataset.plugin = "oh-my-dsh-ui";
			document.head.appendChild(style);
		}
		style.textContent = config.customCss;
	} else style?.remove();
}
/** All shipped presets, in display order. */
const PRESETS = [
	{
		id: "ink-teal",
		name: "黛青",
		description: "青玉色主题，静谧沉稳。",
		config: {
			accent: "#1e8f7e",
			autoAccent: false,
			surfaceOpacity: 40,
			sidebarOpacity: 40,
			chatSurfaceOpacity: 64,
			inputOpacity: 70,
			codeBlockOpacity: 50,
			darkSurfaceOpacity: 40,
			fontFamily: "",
			scrollbarAccent: true,
			cornerRadius: "lg",
			surfaceShadow: "soft",
			darkAccent: ""
		}
	},
	{
		id: "ink-blue",
		name: "黛蓝",
		description: "黛蓝主题，深邃克制的蓝。",
		config: {
			accent: "#3f63d8",
			autoAccent: false,
			surfaceOpacity: 38,
			sidebarOpacity: 38,
			chatSurfaceOpacity: 62,
			inputOpacity: 68,
			codeBlockOpacity: 48,
			darkSurfaceOpacity: 38,
			fontFamily: "",
			scrollbarAccent: true,
			cornerRadius: "md",
			surfaceShadow: "soft",
			darkAccent: ""
		}
	},
	{
		id: "dusty-rose",
		name: "藕荷",
		description: "藕荷色主题，温润柔和的粉。",
		config: {
			accent: "#c2788f",
			autoAccent: false,
			surfaceOpacity: 42,
			sidebarOpacity: 42,
			chatSurfaceOpacity: 66,
			inputOpacity: 70,
			codeBlockOpacity: 52,
			darkSurfaceOpacity: 42,
			fontFamily: "",
			scrollbarAccent: true,
			cornerRadius: "md",
			surfaceShadow: "soft",
			darkAccent: ""
		}
	},
	{
		id: "apricot-gold",
		name: "杏金",
		description: "杏金色主题，温雅低调的金。",
		config: {
			accent: "#c0863c",
			autoAccent: false,
			surfaceOpacity: 42,
			sidebarOpacity: 42,
			chatSurfaceOpacity: 66,
			inputOpacity: 72,
			codeBlockOpacity: 52,
			darkSurfaceOpacity: 42,
			fontFamily: "",
			scrollbarAccent: true,
			cornerRadius: "md",
			surfaceShadow: "soft",
			darkAccent: ""
		}
	},
	{
		id: "mist-gray",
		name: "雾灰",
		description: "雾灰色主题，清冷安静的灰蓝。",
		config: {
			accent: "#64728e",
			autoAccent: false,
			surfaceOpacity: 30,
			sidebarOpacity: 30,
			chatSurfaceOpacity: 52,
			inputOpacity: 60,
			codeBlockOpacity: 40,
			darkSurfaceOpacity: 30,
			fontFamily: "",
			scrollbarAccent: false,
			cornerRadius: "md",
			surfaceShadow: "medium",
			darkAccent: ""
		}
	},
	{
		id: "ink-violet",
		name: "墨紫",
		description: "墨紫色主题，沉静神秘。",
		config: {
			accent: "#8268c4",
			autoAccent: false,
			surfaceOpacity: 28,
			sidebarOpacity: 28,
			chatSurfaceOpacity: 50,
			inputOpacity: 60,
			codeBlockOpacity: 40,
			darkSurfaceOpacity: 28,
			fontFamily: "",
			scrollbarAccent: true,
			cornerRadius: "lg",
			surfaceShadow: "medium",
			darkAccent: "#8268c4"
		}
	}
];
/** Id → preset lookup. */
const PRESET_MAP = new Map(PRESETS.map((preset) => [preset.id, preset]));
/**
* Resolve a preset id to its partial config.
* @param id - preset id ('' or unknown ids resolve to undefined).
* @returns the preset's partial config, or undefined.
*/
function resolvePreset(id) {
	if (id === void 0 || id === "") return void 0;
	return PRESET_MAP.get(id)?.config;
}
//#endregion
//#region src/client/usage-overlay.ts
const state$1 = {
	visible: false,
	listeners: /* @__PURE__ */ new Set()
};
const notify$1 = () => {
	for (const listener of [...state$1.listeners]) listener();
};
/** HostObservable<boolean> face the overlay entry binds. */
const usageOverlay = {
	/** @returns whether the usage panel is currently shown. */
	getSnapshot: () => state$1.visible,
	/** Subscribe to visibility changes. */
	subscribe: (listener) => {
		state$1.listeners.add(listener);
		return () => state$1.listeners.delete(listener);
	},
	/** Toggle the panel (shortcut action). */
	toggle: () => {
		state$1.visible = !state$1.visible;
		notify$1();
	},
	/** Hide the panel (close button / Esc). */
	close: () => {
		if (!state$1.visible) return;
		state$1.visible = false;
		notify$1();
	}
};
//#endregion
//#region src/client/usage/usage-locales.ts
/** Locale dictionaries for the app-usage surface (settings section + overlay). */
/** Dictionary namespace owned by the usage surface. */
const USAGE_NS = "usage";
/** Simplified Chinese copy. */
const zh$5 = {
	nav: "用量",
	title: "用量",
	intro: "按时间窗口查看所用模型的 Token 用量、缓存命中与使用时长，也可切换查看具体某个模型的用量。数据来自各会话的用量投影（token-meter / session-stats）。",
	close: "关闭",
	empty: "该时间范围内暂无用量数据。",
	"model.all": "全部模型",
	"range.year": "近一年",
	"range.month": "近一月",
	"range.week": "近一周",
	"range.days3": "近三天",
	"kpi.total": "总 Token",
	"kpi.input": "输入 Token",
	"kpi.output": "输出 Token",
	"kpi.cache": "缓存命中",
	"kpi.cacheRate": "缓存命中率",
	"kpi.time": "使用时长",
	"kpi.sessions": "会话数",
	"kpi.steps": "执行步数",
	breakdown: "用量趋势",
	topSessions: "会话用量排行",
	topEmpty: "暂无会话用量。"
};
/** English copy. */
const en$5 = {
	nav: "Usage",
	title: "Usage",
	intro: "Token usage, cache hits, and model time across your sessions, filtered by time window or by a specific model. Data comes from each session's usage projections (token-meter / session-stats).",
	close: "Close",
	empty: "No usage data in this range yet.",
	"model.all": "All models",
	"range.year": "Last year",
	"range.month": "Last month",
	"range.week": "Last week",
	"range.days3": "Last 3 days",
	"kpi.total": "Total tokens",
	"kpi.input": "Input tokens",
	"kpi.output": "Output tokens",
	"kpi.cache": "Cache hits",
	"kpi.cacheRate": "Cache hit rate",
	"kpi.time": "Model time",
	"kpi.sessions": "Sessions",
	"kpi.steps": "Steps",
	breakdown: "Usage trend",
	topSessions: "Top sessions",
	topEmpty: "No session usage yet."
};
//#endregion
//#region src/client/appearance/appearance-locales.ts
/** Locale dictionaries for the appearance settings section (主题定制 + 外观偏好). */
/** Dictionary namespace owned by the appearance surface. */
const APPEARANCE_NS = "appearance";
/** Simplified Chinese copy. */
const zh$4 = {
	nav: "外观",
	title: "外观",
	intro: "主题偏好与美术定制：强调色、表面不透明度与字体设置。改动保存后即时生效。",
	save: "保存",
	saving: "保存中…",
	reset: "恢复默认",
	dirty: "有未保存的修改",
	unavailable: "外观设置当前不可用",
	unavailableHint: "连接处于内存模式或该命名空间未对浏览器暴露。",
	accent: "强调色",
	autoAccent: "自动取色",
	surfaceOpacity: "主表面不透明度",
	sidebarOpacity: "侧栏不透明度",
	chatSurfaceOpacity: "聊天列不透明度",
	inputOpacity: "输入框不透明度",
	codeBlockOpacity: "代码块不透明度",
	darkSurfaceOpacity: "暗色表面不透明度",
	fontFamily: "字体",
	codeFontFamily: "代码字体",
	fontScale: "字号缩放",
	fontScaleHint: "整体界面 0.9–1.1 倍缩放。",
	scrollbarAccent: "主题色滚动条",
	preview: "预览",
	previewing: "预览中——满意后点「保存」，不满意点「取消预览」",
	cancelPreview: "取消预览",
	refineTitle: "质感",
	cornerRadius: "圆角",
	"radius.inherit": "跟随默认",
	"radius.sm": "小 (6px)",
	"radius.md": "中 (10px)",
	"radius.lg": "大 (14px)",
	"radius.xl": "超大 (18px)",
	surfaceShadow: "表面阴影",
	"shadow.inherit": "跟随默认",
	"shadow.none": "无阴影",
	"shadow.soft": "轻盈",
	"shadow.medium": "适中",
	"shadow.strong": "深邃",
	darkAccent: "暗色强调色",
	darkAccentHint: "留空 = 暗色模式跟随主强调色；设置后仅暗色模式使用该颜色。",
	darkAccentPlaceholder: "留空 = 跟随主强调色",
	accentPalette: "和谐色板",
	accentPaletteHint: "从当前强调色派生的一组邻近/互补/三角色，点击即可选用。",
	presetTitle: "一键预设",
	presetHint: "点击预设将方案载入下方设置项，点「预览」查看效果，点「保存」持久化，或点「取消预览」还原。",
	myPresetName: "给这个外观起个名字，存为我的预设",
	saveMyPreset: "另存为我的预设",
	removeMyPreset: "删除该预设",
	activePreset: "当前",
	previewTitle: "实时预览",
	previewHint: "迷你界面随下方参数实时变化；点「随机灵感」可生成一套和谐配色。",
	randomInspiration: "随机灵感",
	groupColor: "色彩",
	groupSurface: "表面",
	groupTypography: "排版",
	groupReset: "恢复本组默认",
	fontPreset: "字体搭配",
	fontPresetHint: "一键套用「界面字体 + 代码字体」组合；字体栈内已含中文字体建议，未安装的字体自动回退。",
	fontCustom: "自定义",
	previewingBar: "按 F2 退出预览"
};
/** English copy. */
const en$4 = {
	nav: "Appearance",
	title: "Appearance",
	intro: "Theme preference and art customization: accent color, surface opacity and typography settings. Changes apply immediately on save.",
	save: "Save",
	saving: "Saving…",
	reset: "Reset to defaults",
	dirty: "Unsaved changes",
	unavailable: "Appearance settings are unavailable",
	unavailableHint: "The connection is in memory mode, or the namespace is not exposed to the browser.",
	accent: "Accent color",
	autoAccent: "Auto accent",
	surfaceOpacity: "Main surface opacity",
	sidebarOpacity: "Sidebar opacity",
	chatSurfaceOpacity: "Chat column opacity",
	inputOpacity: "Input opacity",
	codeBlockOpacity: "Code block opacity",
	darkSurfaceOpacity: "Dark surface opacity",
	fontFamily: "Font family",
	codeFontFamily: "Code font",
	fontScale: "Font scale",
	fontScaleHint: "Scales the whole UI from 0.9× to 1.1×.",
	scrollbarAccent: "Accent scrollbar",
	preview: "Preview",
	previewing: "Previewing — click Save to keep, or Cancel preview to revert",
	cancelPreview: "Cancel preview",
	refineTitle: "Refinement (optional — nothing changes by default)",
	cornerRadius: "Corner radius",
	"radius.inherit": "Follow default",
	"radius.sm": "Small (6px)",
	"radius.md": "Medium (10px)",
	"radius.lg": "Large (14px)",
	"radius.xl": "Extra large (18px)",
	surfaceShadow: "Surface shadow",
	"shadow.inherit": "Follow default",
	"shadow.none": "None",
	"shadow.soft": "Soft",
	"shadow.medium": "Medium",
	"shadow.strong": "Strong",
	darkAccent: "Dark-mode accent",
	darkAccentHint: "Empty inherits the main accent in dark mode; set to override it there only.",
	darkAccentPlaceholder: "Empty = follow main accent",
	accentPalette: "Harmony palette",
	accentPaletteHint: "Neighboring / complementary / triadic shades derived from the accent — click to pick.",
	presetTitle: "One-click presets",
	presetHint: "Clicking a preset loads its scheme into the form below; press Preview to see it, Save to persist, or Cancel preview to revert.",
	myPresetName: "Name this look and save it as my preset",
	saveMyPreset: "Save as my preset",
	removeMyPreset: "Remove this preset",
	activePreset: "Current",
	previewTitle: "Live preview",
	previewHint: "A mini UI that follows every parameter below in real time; hit Random inspiration for a harmonious palette.",
	randomInspiration: "Random inspiration",
	groupColor: "Color",
	groupSurface: "Surfaces",
	groupTypography: "Typography",
	groupReset: "Reset group",
	fontPreset: "Font pairing",
	fontPresetHint: "Apply a ui + code font pairing in one click; CJK stacks are built in, missing faces fall back automatically.",
	fontCustom: "Custom",
	previewingBar: "Press F2 to exit preview"
};
//#endregion
//#region src/client/snapshot-store.ts
function createSnapshotStore(initialState) {
	let state = initialState;
	const listeners = /* @__PURE__ */ new Set();
	return {
		getSnapshot: () => state,
		subscribe: (listener) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		update: (updater) => {
			const next = Object.assign({}, state);
			updater(next);
			state = next;
			listeners.forEach((l) => l());
		},
		set: (newState) => {
			state = newState;
			listeners.forEach((l) => l());
		}
	};
}
//#endregion
//#region src/client/font-presets.ts
/** The stock look: no override, the theme's own stacks win. */
const DEFAULT_PRESET = {
	id: "default",
	name: "默认",
	description: "跟随系统与主题默认字体，不做替换。",
	uiFont: "",
	codeFont: ""
};
/** All shipped font pairings, in display order. */
const FONT_PRESETS = [
	DEFAULT_PRESET,
	{
		id: "harmony",
		name: "鸿蒙",
		description: "HarmonyOS Sans 界面 + 鸿蒙等宽代码，清爽克制。",
		uiFont: "'HarmonyOS Sans SC', 'HarmonyOS Sans', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif",
		codeFont: "'HarmonyOS Sans Mono', 'JetBrains Mono', 'Cascadia Code', Consolas, 'PingFang SC', monospace"
	},
	{
		id: "misans",
		name: "米思",
		description: "MiSans 界面 + JetBrains Mono 代码，现代利落。",
		uiFont: "'MiSans', 'HarmonyOS Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
		codeFont: "'JetBrains Mono', 'Cascadia Code', Consolas, 'MiSans', monospace"
	},
	{
		id: "lxgw",
		name: "文楷",
		description: "霞鹜文楷界面（楷体装饰风）+ 文楷等宽代码，温润书卷气。",
		uiFont: "'LXGW WenKai', '霞鹜文楷', 'Kaiti SC', 'STKaiti', 'KaiTi', serif",
		codeFont: "'LXGW WenKai Mono', 'LXGW WenKai', 'JetBrains Mono', Consolas, monospace"
	},
	{
		id: "source-han",
		name: "思源",
		description: "思源黑体（Noto Sans SC）界面 + Fira Code 代码，稳重清晰。",
		uiFont: "'Source Han Sans SC', 'Noto Sans SC', 'HarmonyOS Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
		codeFont: "'Fira Code', 'JetBrains Mono', 'Cascadia Code', Consolas, 'Noto Sans SC', monospace"
	}
];
/** Id → font-preset lookup. */
const FONT_PRESET_MAP = new Map(FONT_PRESETS.map((preset) => [preset.id, preset]));
/**
* Resolve a font pairing to its theme fields.
* @param id - preset id ('' / unknown / 'default' resolve to the neutral pair).
* @returns the partial config fields for `fontFamily` / `codeFontFamily`.
*/
function resolveFontPreset(id) {
	const preset = (id === void 0 || id === "" ? void 0 : FONT_PRESET_MAP.get(id)) ?? DEFAULT_PRESET;
	return {
		fontFamily: preset.uiFont,
		codeFontFamily: preset.codeFont
	};
}
//#endregion
//#region src/client/color.ts
const rgbToHsl = (r, g, b) => {
	const rf = r / 255;
	const gf = g / 255;
	const bf = b / 255;
	const max = Math.max(rf, gf, bf);
	const min = Math.min(rf, gf, bf);
	const l = (max + min) / 2;
	if (max === min) return {
		h: 0,
		s: 0,
		l
	};
	const d = max - min;
	const s = l > .5 ? d / (2 - max - min) : d / (max + min);
	let h = 0;
	if (max === rf) h = ((gf - bf) / d + (gf < bf ? 6 : 0)) / 6;
	else if (max === gf) h = ((bf - rf) / d + 2) / 6;
	else h = ((rf - gf) / d + 4) / 6;
	return {
		h,
		s,
		l
	};
};
/** Format an RGB triple as '#rrggbb'. */
const rgbToHex = (r, g, b) => {
	const hex = (n) => Math.round(n).toString(16).padStart(2, "0");
	return `#${hex(r)}${hex(g)}${hex(b)}`;
};
/** Parse a '#rrggbb' (or '#rgb') hex color into an RGB triple. */
const hexToRgb = (hex) => {
	const match = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex.trim());
	if (match === null) return null;
	const group = match[1] ?? "";
	const text = group.length === 3 ? group.split("").map((c) => c + c).join("") : group;
	const value = Number.parseInt(text, 16);
	return {
		r: value >> 16 & 255,
		g: value >> 8 & 255,
		b: value & 255
	};
};
/** Format an HSL triple as '#rrggbb'. */
const hslToHex = (h, s, l) => {
	const f = (n) => {
		const k = (n + h * 12) % 12;
		return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
	};
	return rgbToHex(f(0) * 255, f(8) * 255, f(4) * 255);
};
/**
* Derive a harmonious accent palette from one hex color (Material-You style):
* the base, two analogous neighbors, the complementary, two triadic partners,
* and one darkened tint — seven swatches the appearance page offers as
* one-click accent alternatives. Pure and DOM-free.
* @param hex - a '#rrggbb' accent color.
* @returns '#rrggbb' swatches (the base first); an invalid hex yields [].
*/
function harmonySwatches(hex) {
	const rgb = hexToRgb(hex);
	if (rgb === null) return [];
	const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
	if (s === 0) return [rgbToHex(rgb.r, rgb.g, rgb.b)];
	const hue = h * 360;
	const wrap = (deg) => (deg % 360 + 360) % 360;
	const at = (deg, sat, light) => hslToHex(wrap(deg) / 360, sat, light);
	return [
		rgbToHex(rgb.r, rgb.g, rgb.b),
		at(hue + 30, s, l),
		at(hue - 30, s, l),
		at(hue + 180, s, l),
		at(hue + 120, s, l),
		at(hue - 120, s, l),
		at(hue, Math.min(1, s * 1.1), Math.max(.12, l * .62))
	];
}
/** A curated set of muted hues (degrees) for the "随机灵感" button — warm to
* cool, all low-key enough to read as 高级 rather than neon. */
const INSPIRATION_HUES = [
	0,
	10,
	20,
	32,
	46,
	62,
	82,
	104,
	124,
	148,
	172,
	196,
	220,
	244,
	264,
	286,
	306,
	328
];
const pick = (rng, options) => options[Math.min(options.length - 1, Math.floor(rng() * options.length))] ?? options[0] ?? void 0;
const between = (rng, lo, hi) => lo + rng() * (hi - lo);
/**
* Generate one harmonious "random inspiration" theme from the color palette
* algorithm: a muted accent sampled from a curated hue pool and a coherent
* surface opacity recipe. Pure and DOM-free; the RNG is injectable so the
* output is deterministic in tests.
* @param rng - random source (default Math.random).
* @returns a partial theme config (fonts untouched).
*/
function randomInspirationConfig(rng = Math.random) {
	const hue = pick(rng, INSPIRATION_HUES) + between(rng, -6, 6);
	const sat = between(rng, .3, .46);
	const light = between(rng, .52, .64);
	const dark = rng() < .35;
	const accent = hslToHex(hue / 360, sat, light);
	const surface = Math.round(between(rng, 30, 46));
	const radius = pick(rng, ["md", "lg"]);
	const shadow = pick(rng, ["soft", "medium"]);
	return {
		accent,
		autoAccent: false,
		surfaceOpacity: surface,
		sidebarOpacity: surface,
		chatSurfaceOpacity: Math.min(100, surface + 22),
		inputOpacity: Math.min(100, surface + 28),
		codeBlockOpacity: Math.min(100, surface + 12),
		darkSurfaceOpacity: surface,
		fontFamily: "",
		codeFontFamily: "",
		fontScale: 1,
		scrollbarAccent: rng() < .7,
		cornerRadius: radius,
		surfaceShadow: shadow,
		darkAccent: dark ? accent : ""
	};
}
//#endregion
//#region src/client/preview-bar.ts
/**
* Preview-mode visibility store: a tiny module-level HostObservable so the
* floating preview bar (shell.overlay) can appear when the appearance draft is
* previewed on the document. The bar is shown by the appearance controller on
* preview / preset-apply and hidden when the preview is saved, cancelled, or
* invalidated — independent from the controller's `previewing` flag, because
* "back to settings" keeps the draft staged while the bar itself disappears.
*/
const state = {
	visible: false,
	listeners: /* @__PURE__ */ new Set()
};
const notify = () => {
	for (const listener of [...state.listeners]) listener();
};
/** HostObservable<boolean> face the preview bar entry binds. */
const previewBar = {
	/** @returns whether the preview bar is currently shown. */
	getSnapshot: () => state.visible,
	/** Subscribe to visibility changes. */
	subscribe: (listener) => {
		state.listeners.add(listener);
		return () => state.listeners.delete(listener);
	},
	/** Show the bar (entering preview mode). */
	show: () => {
		state.visible = true;
		notify();
	},
	/** Hide the bar (saved / cancelled / back to settings). */
	hide: () => {
		if (!state.visible) return;
		state.visible = false;
		notify();
	}
};
//#endregion
//#region src/client/theme-section.ts
/**
* Mapping from the runtime theme section (settings scope) onto a normalized
* CustomThemeConfig. Pure and testable: the section carries the settings
* document's resolved values (user overrides layered over the loader base);
* fields absent while loading/unavailable fall back to the loader config.
*/
/**
* Merge a theme section over the normalized loader config.
* @param normalized - the loader-layer normalized config (fallback).
* @param section - the settings scope's resolved theme section.
* @returns the effective config the applier should render.
*/
function configFromThemeSection(normalized, section) {
	if (section === void 0) return normalized;
	const { darkSurfaceOpacity, ...rest } = normalized;
	const stringField = (value, fallback) => value !== void 0 ? value : fallback;
	return {
		...rest,
		darkSurfaceOpacity: section.darkSurfaceOpacity ?? section.surfaceOpacity ?? darkSurfaceOpacity ?? 100,
		accent: stringField(section.accent, normalized.accent),
		autoAccent: section.autoAccent ?? normalized.autoAccent,
		surfaceOpacity: section.surfaceOpacity ?? normalized.surfaceOpacity,
		sidebarOpacity: section.sidebarOpacity ?? normalized.sidebarOpacity,
		chatSurfaceOpacity: section.chatSurfaceOpacity ?? normalized.chatSurfaceOpacity,
		inputOpacity: section.inputOpacity ?? normalized.inputOpacity,
		codeBlockOpacity: section.codeBlockOpacity ?? normalized.codeBlockOpacity,
		fontFamily: stringField(section.fontFamily, normalized.fontFamily),
		codeFontFamily: stringField(section.codeFontFamily, normalized.codeFontFamily),
		fontScale: section.fontScale ?? normalized.fontScale,
		scrollbarAccent: section.scrollbarAccent ?? normalized.scrollbarAccent,
		cornerRadius: isCornerRadius(section.cornerRadius) ? section.cornerRadius : normalized.cornerRadius,
		surfaceShadow: isSurfaceShadow(section.surfaceShadow) ? section.surfaceShadow : normalized.surfaceShadow,
		darkAccent: stringField(section.darkAccent, normalized.darkAccent)
	};
}
//#endregion
//#region src/client/appearance/controller.ts
/**
* Appearance settings controller: a staged draft over the theme fields of the
* ui-custom settings scope, projected into a snapshot store the section
* renders. Values = the scope's resolved theme (user overrides over the
* loader base); save writes changed fields, reset-all unsets them (reverting
* to the loader defaults). Preview renders the draft to the document WITHOUT
* touching the scope — the user decides after seeing the effect; cancel
* re-applies the saved values.
*/
const THEME_FIELDS = [
	"accent",
	"autoAccent",
	"surfaceOpacity",
	"sidebarOpacity",
	"chatSurfaceOpacity",
	"inputOpacity",
	"codeBlockOpacity",
	"darkSurfaceOpacity",
	"fontFamily",
	"codeFontFamily",
	"fontScale",
	"scrollbarAccent",
	"cornerRadius",
	"surfaceShadow",
	"darkAccent"
];
/** Field list per group — drives the group reset. */
const GROUP_FIELDS = {
	color: [
		"accent",
		"autoAccent",
		"darkAccent"
	],
	surface: [
		"surfaceOpacity",
		"sidebarOpacity",
		"chatSurfaceOpacity",
		"inputOpacity",
		"codeBlockOpacity",
		"darkSurfaceOpacity"
	],
	typography: [
		"fontFamily",
		"codeFontFamily",
		"fontScale"
	],
	refine: [
		"cornerRadius",
		"surfaceShadow",
		"scrollbarAccent"
	]
};
/** Neutral (stock-look) value per group field — what 恢复本组默认 writes. */
const GROUP_NEUTRALS = {
	color: {
		accent: DEFAULTS.accent,
		autoAccent: DEFAULTS.autoAccent,
		darkAccent: DEFAULTS.darkAccent
	},
	surface: {
		surfaceOpacity: DEFAULTS.surfaceOpacity,
		sidebarOpacity: DEFAULTS.sidebarOpacity,
		chatSurfaceOpacity: DEFAULTS.chatSurfaceOpacity,
		inputOpacity: DEFAULTS.inputOpacity,
		codeBlockOpacity: DEFAULTS.codeBlockOpacity,
		darkSurfaceOpacity: 100
	},
	typography: {
		fontFamily: DEFAULTS.fontFamily,
		codeFontFamily: DEFAULTS.codeFontFamily,
		fontScale: DEFAULTS.fontScale
	},
	refine: {
		cornerRadius: DEFAULTS.cornerRadius,
		surfaceShadow: DEFAULTS.surfaceShadow,
		scrollbarAccent: DEFAULTS.scrollbarAccent
	}
};
/** Serialize a user preset record for the settings document. */
const serializeMyPreset = (name, config) => JSON.stringify({
	name,
	config
});
/** Map a theme section to a partial config, dropping undefined fields. */
function themeSectionToPartial(section) {
	const out = {};
	for (const field of THEME_FIELDS) {
		const value = section[field];
		if (value !== void 0) out[field] = value;
	}
	return out;
}
/** Parse the settings document's myPresets dict into records (lenient). */
function parseMyPresets(raw) {
	if (typeof raw !== "object" || raw === null) return [];
	const out = [];
	for (const [id, value] of Object.entries(raw)) {
		if (typeof value !== "string") continue;
		try {
			const parsed = JSON.parse(value);
			const name = typeof parsed.name === "string" && parsed.name !== "" ? parsed.name : id;
			if (typeof parsed.config !== "object" || parsed.config === null) continue;
			out.push({
				id,
				name,
				config: parsed.config
			});
		} catch {}
	}
	return out;
}
const themeOf = (config) => ({
	accent: config.accent,
	autoAccent: config.autoAccent,
	surfaceOpacity: config.surfaceOpacity,
	sidebarOpacity: config.sidebarOpacity,
	chatSurfaceOpacity: config.chatSurfaceOpacity,
	inputOpacity: config.inputOpacity,
	codeBlockOpacity: config.codeBlockOpacity,
	darkSurfaceOpacity: config.darkSurfaceOpacity,
	fontFamily: config.fontFamily,
	codeFontFamily: config.codeFontFamily,
	fontScale: config.fontScale,
	scrollbarAccent: config.scrollbarAccent,
	cornerRadius: config.cornerRadius,
	surfaceShadow: config.surfaceShadow,
	darkAccent: config.darkAccent
});
/** Bridges the ui-custom settings scope onto the appearance form. */
var AppearanceSettingsController = class {
	scope;
	defaults;
	onPreview;
	store;
	values;
	draft;
	/** Whether the user staged a field edit; the draft follows the scope until then. */
	touched = false;
	saving = false;
	previewing = false;
	/**
	* @param scope - the bound settings scope for the ui-custom namespace.
	* @param defaults - the normalized loader config (fallback for absent fields).
	* @param onPreview - applies a merged config to the document (preview/cancel).
	*/
	constructor(scope, defaults, onPreview) {
		this.scope = scope;
		this.defaults = defaults;
		this.onPreview = onPreview;
		this.values = themeOf(configFromThemeSection(defaults, scope.getSnapshot().value));
		this.draft = { ...this.values };
		this.store = createSnapshotStore({
			status: "loading",
			writable: false,
			values: this.values,
			draft: this.draft,
			dirty: false,
			saving: false,
			previewing: false,
			myPresets: [],
			activePreset: null
		});
		this.sync();
	}
	sync() {
		const snapshot = this.scope.getSnapshot();
		const config = configFromThemeSection(this.defaults, snapshot.value);
		this.values = themeOf(config);
		if (!this.touched) this.draft = { ...this.values };
		this.previewing = false;
		previewBar.hide();
		const myPresets = parseMyPresets(snapshot.value?.myPresets);
		this.store.update((state) => {
			state.status = snapshot.status;
			state.writable = snapshot.writable;
			state.values = this.values;
			state.draft = this.draft;
			state.dirty = this.dirty();
			state.saving = this.saving;
			state.previewing = this.previewing;
			state.myPresets = myPresets;
			state.activePreset = this.recomputeActivePreset(myPresets);
		});
	}
	dirty() {
		return THEME_FIELDS.some((field) => this.draft[field] !== this.values[field]);
	}
	publish() {
		this.store.update((state) => {
			state.values = this.values;
			state.draft = this.draft;
			state.dirty = this.dirty();
			state.saving = this.saving;
			state.previewing = this.previewing;
			state.activePreset = this.recomputeActivePreset(state.myPresets);
		});
	}
	/**
	* The preset (shipped or user) whose full config the staged theme matches —
	* its card is framed in the gallery so the active theme is visible at a
	* glance. The draft is the source of truth: it mirrors the saved theme until
	* the user stages an edit, and once a preset is clicked (staged) or previewed
	* it reflects exactly the theme the user is working with / looking at.
	*/
	recomputeActivePreset(myPresets) {
		for (const preset of PRESETS) if (this.matchesPreset(preset.config)) return {
			kind: "shipped",
			id: preset.id
		};
		for (const preset of myPresets) if (this.matchesPreset(preset.config)) return {
			kind: "my",
			id: preset.id
		};
		return null;
	}
	/** True when every theme field of the staged draft equals the preset's. */
	matchesPreset(config) {
		const presetSection = themeOf(normalizeConfig(void 0, config));
		return THEME_FIELDS.every((field) => presetSection[field] === this.draft[field]);
	}
	/** Render a theme section to the document via the injected applier. */
	applyTheme(section) {
		this.onPreview(configFromThemeSection(this.defaults, section));
	}
	/** Stage one field edit (re-applies the live preview when already previewing). */
	setField(field, value) {
		this.touched = true;
		this.draft = {
			...this.draft,
			[field]: value
		};
		if (this.previewing) this.applyTheme(this.draft);
		this.publish();
	}
	/** Render the staged draft to the document WITHOUT saving (the scope is untouched). */
	preview() {
		if (!this.dirty()) return;
		this.previewing = true;
		previewBar.show();
		this.applyTheme(this.draft);
		this.publish();
	}
	/**
	* Load a preset config into the draft — staging only, no preview.
	* The user enters the preview through the shared 预览 button, exactly like any
	* manual edit — one unified preview path.
	* @param config - the preset's partial config.
	*/
	loadPresetConfig(config) {
		const presetTheme = themeOf(configFromThemeSection(this.defaults, config));
		this.touched = true;
		this.draft = presetTheme;
		this.previewing = false;
		this.publish();
	}
	/** Load a shipped preset into the draft (staging only — the 预览 button previews). */
	applyPreset(id) {
		const preset = PRESET_MAP.get(id)?.config;
		if (preset === void 0) return;
		this.loadPresetConfig(preset);
	}
	/** Save the current draft as a user preset (name shown in the gallery). */
	async saveMyPreset(name) {
		const clean = name.trim();
		if (clean === "") return;
		const config = themeSectionToPartial(this.draft);
		const record = serializeMyPreset(clean, config);
		const current = this.scope.getSnapshot().value?.myPresets ?? {};
		const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
		await this.scope.set("myPresets", {
			...current,
			[id]: record
		});
		this.sync();
	}
	/** Remove one user preset. */
	async removeMyPreset(id) {
		const current = this.scope.getSnapshot().value?.myPresets ?? {};
		if (!(id in current)) return;
		const next = { ...current };
		delete next[id];
		if (Object.keys(next).length === 0) await this.scope.unset("myPresets");
		else await this.scope.set("myPresets", next);
		this.sync();
	}
	/** Load a user preset into the draft (staging only — the 预览 button previews). */
	applyMyPreset(id) {
		const preset = this.store.getSnapshot().myPresets.find((entry) => entry.id === id);
		if (preset === void 0) return;
		this.loadPresetConfig(preset.config);
	}
	/** Load a font pairing (ui + code stacks) into the draft. */
	applyFontPreset(id) {
		const fields = resolveFontPreset(id);
		this.touched = true;
		this.draft = {
			...this.draft,
			fontFamily: fields.fontFamily,
			codeFontFamily: fields.codeFontFamily
		};
		if (this.previewing) this.applyTheme(this.draft);
		this.publish();
	}
	/** Generate a harmonious random theme from the palette algorithm (staged). */
	randomInspiration() {
		this.loadPresetConfig(randomInspirationConfig());
	}
	/** Reset one parameter group to the neutral (stock) defaults. */
	resetGroup(group) {
		const neutral = GROUP_NEUTRALS[group];
		let next = this.draft;
		for (const field of GROUP_FIELDS[group]) next = {
			...next,
			[field]: neutral[field]
		};
		this.touched = true;
		this.draft = next;
		if (this.previewing) this.applyTheme(this.draft);
		this.publish();
	}
	/** Revert the document to the saved theme (leaves the staged draft for further edits). */
	cancelPreview() {
		if (!this.previewing) return;
		this.previewing = false;
		previewBar.hide();
		this.applyTheme(this.values);
		this.publish();
	}
	/** Restore every field to the loader defaults (unsets the user overrides). */
	async resetAll() {
		if (this.saving) return;
		this.saving = true;
		this.publish();
		try {
			for (const field of THEME_FIELDS) await this.scope.unset(field);
		} finally {
			this.saving = false;
			this.touched = false;
			this.sync();
		}
	}
	/** Write every changed field through the scope (live re-apply on publish). */
	async save() {
		if (!this.dirty() || this.saving) return;
		this.saving = true;
		this.publish();
		try {
			for (const field of THEME_FIELDS) {
				const next = this.draft[field];
				if (next === this.values[field]) continue;
				await this.scope.set(field, next);
			}
		} finally {
			this.saving = false;
			this.touched = false;
			this.sync();
		}
	}
	/** Wire the controller: subscribe the scope and expose the form actions. */
	mount() {
		return {
			dispose: this.scope.subscribe(() => this.sync()),
			actions: {
				setField: (field, value) => this.setField(field, value),
				applyFontPreset: (id) => this.applyFontPreset(id),
				randomInspiration: () => this.randomInspiration(),
				resetGroup: (group) => this.resetGroup(group),
				preview: () => this.preview(),
				applyPreset: (id) => this.applyPreset(id),
				saveMyPreset: (name) => {
					this.saveMyPreset(name);
				},
				removeMyPreset: (id) => {
					this.removeMyPreset(id);
				},
				applyMyPreset: (id) => this.applyMyPreset(id),
				cancelPreview: () => this.cancelPreview(),
				save: () => {
					this.save();
				},
				resetAll: () => {
					this.resetAll();
				}
			}
		};
	}
};
//#endregion
//#region src/client/appearance/PreviewBar.module.css
var PreviewBar_module_default = { "hint": "zaoYUq_hint" };
//#endregion
//#region src/client/appearance/PreviewBar.tsx
/**
* Floating preview hint (shell.overlay): while the appearance draft is
* previewed on the document the screen stays clean — just a small "press F2 to
* exit preview" pill. F2 exits preview mode and reopens the settings page,
* where the user continues tweaking and finally decides to apply (save) or
* cancel. (Escape is deliberately NOT used: the settings dialog closes on a
* document-level Escape, so the reopen would be closed by the same keypress.)
*/
/** The exit key shown in the hint and listened for. */
const EXIT_KEY = "F2";
/**
* Render the clean preview hint (null while not previewing).
* @param props - composed slot props + injected exit action.
* @returns the hint element tree, or null.
*/
function PreviewBar({ t, usePreviewVisible, onExit }) {
	const visible = usePreviewVisible((value) => value);
	const translator = t;
	(0, react.useEffect)(() => {
		if (!visible) return;
		const onKey = (event) => {
			if (event.key === EXIT_KEY) {
				event.preventDefault();
				onExit();
			}
		};
		window.addEventListener("keydown", onKey, true);
		return () => window.removeEventListener("keydown", onKey, true);
	}, [visible, onExit]);
	if (!visible) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: PreviewBar_module_default.hint,
		role: "status",
		children: translator("previewingBar")
	});
}
//#endregion
//#region src/client/usage.ts
/** All ranges, in display order. */
const USAGE_RANGES = [
	"year",
	"month",
	"week",
	"days3"
];
const DAY_MS$1 = 864e5;
/** Window start (ms epoch); sessions updated at/after it count. */
function rangeStartMs(range, now) {
	switch (range) {
		case "year": return now - 365 * DAY_MS$1;
		case "month": return now - 30 * DAY_MS$1;
		case "week": return now - 7 * DAY_MS$1;
		case "days3": return now - 3 * DAY_MS$1;
	}
}
/** Zero aggregate. */
const EMPTY_USAGE = {
	sessions: 0,
	turns: 0,
	steps: 0,
	inputTokens: 0,
	outputTokens: 0,
	cacheReadTokens: 0,
	cacheWriteTokens: 0,
	llmMs: 0,
	toolMs: 0
};
const num = (value) => typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
/**
* Decode one session row's projection values into a {@link SessionUsageRow}.
* @param updatedAt - the session's activity timestamp.
* @param projectionValues - the row's projectionValues map (may be undefined).
* @returns the leniently decoded row.
*/
function decodeUsageRow(updatedAt, projectionValues) {
	const usage = projectionValues?.["tokenUsage"];
	const stats = projectionValues?.["sessionStats"];
	const decodeBuckets = (value) => value === null || typeof value !== "object" ? null : {
		uncachedInputTokens: num(value.uncachedInputTokens),
		outputTokens: num(value.outputTokens),
		cacheReadTokens: num(value.cacheReadTokens),
		cacheWriteTokens: num(value.cacheWriteTokens)
	};
	const byModelRaw = usage !== null && typeof usage === "object" ? usage.byModel : void 0;
	let byModel = null;
	if (byModelRaw !== null && typeof byModelRaw === "object" && !Array.isArray(byModelRaw)) {
		byModel = {};
		for (const [modelKey, buckets] of Object.entries(byModelRaw)) {
			const decoded = decodeBuckets(buckets);
			if (decoded !== null) byModel[modelKey] = decoded;
		}
		if (Object.keys(byModel).length === 0) byModel = null;
	}
	return {
		updatedAt,
		usage: decodeBuckets(usage),
		byModel,
		stats: stats === null || typeof stats !== "object" ? null : {
			turns: num(stats.turns),
			steps: num(stats.steps),
			llmMs: num(stats.llmMs),
			toolMs: num(stats.toolMs)
		}
	};
}
/** Total provider tokens in one usage bucket (all four disjoint buckets). */
function usageTokens(usage) {
	return usage.uncachedInputTokens + usage.cacheReadTokens + usage.cacheWriteTokens + usage.outputTokens;
}
/**
* The row's usage slice for a model filter: the per-model buckets when a
* model key is selected, otherwise the row totals. Null when the slice is
* unavailable.
* @param row - a decoded session row.
* @param modelKey - selected model (`${provider}:${model}`) or null for all models.
* @returns the usage slice, or null.
*/
function usageOfRow(row, modelKey) {
	if (modelKey === null) return row.usage;
	return row.byModel?.[modelKey] ?? null;
}
/**
* The model keys (in first-seen order) any session reported usage for —
* the model-selector options.
* @param rows - decoded session rows.
* @returns `provider:model` keys, deduplicated in first-seen order.
*/
function usageModelKeys(rows) {
	const keys = [];
	const seen = /* @__PURE__ */ new Set();
	for (const row of rows) {
		if (row.byModel === null) continue;
		for (const modelKey of Object.keys(row.byModel)) if (!seen.has(modelKey)) {
			seen.add(modelKey);
			keys.push(modelKey);
		}
	}
	return keys;
}
/**
* Aggregate session rows whose activity falls inside the range window.
* @param rows - decoded session rows.
* @param range - the time window.
* @param now - reference "now" (ms epoch).
* @param modelKey - optional model filter (`${provider}:${model}`); null aggregates all models.
* @returns summed figures.
*/
function aggregateUsage(rows, range, now, modelKey = null) {
	const cutoff = rangeStartMs(range, now);
	const total = { ...EMPTY_USAGE };
	for (const row of rows) {
		if (row.updatedAt < cutoff) continue;
		const usage = usageOfRow(row, modelKey);
		if (modelKey !== null && usage === null) continue;
		total.sessions += 1;
		if (row.stats !== null) {
			total.turns += row.stats.turns;
			total.steps += row.stats.steps;
			total.llmMs += row.stats.llmMs;
			total.toolMs += row.stats.toolMs;
		}
		if (usage !== null) {
			total.inputTokens += usage.uncachedInputTokens;
			total.outputTokens += usage.outputTokens;
			total.cacheReadTokens += usage.cacheReadTokens;
			total.cacheWriteTokens += usage.cacheWriteTokens;
		}
	}
	return total;
}
/**
* Bucket token totals for a range's bar chart. Adaptive granularity: 12
* monthly buckets for the year, 4 weekly for the month, daily for week/days3.
* @param rows - decoded session rows.
* @param range - the time window.
* @param now - reference "now".
* @param modelKey - optional model filter; null aggregates all models.
* @returns buckets from oldest to newest.
*/
function usageByBucket(rows, range, now, modelKey = null) {
	const cutoff = rangeStartMs(range, now);
	const spec = range === "year" ? {
		count: 12,
		width: 30 * DAY_MS$1
	} : range === "month" ? {
		count: 4,
		width: 7 * DAY_MS$1
	} : {
		count: range === "week" ? 7 : 3,
		width: DAY_MS$1
	};
	const buckets = new Array(spec.count).fill(0).map((_, index) => ({
		start: now - (spec.count - 1 - index) * spec.width,
		tokens: 0
	}));
	for (const row of rows) {
		if (row.updatedAt < cutoff) continue;
		const usage = usageOfRow(row, modelKey);
		if (usage === null) continue;
		const age = now - row.updatedAt;
		const index = spec.count - 1 - Math.min(spec.count - 1, Math.floor(age / spec.width));
		buckets[index].tokens += usageTokens(usage);
	}
	return buckets;
}
/** Format a token count compactly (1.2k / 3.4M). */
function formatTokens(count) {
	if (count >= 1e6) return `${(count / 1e6).toFixed(2)}M`;
	if (count >= 1e3) return `${(count / 1e3).toFixed(1)}k`;
	return String(count);
}
/** Format a duration compactly (45s / 12m 30s / 3h 12m). */
function formatDuration(ms) {
	const seconds = Math.round(ms / 1e3);
	if (seconds < 60) return `${seconds}s`;
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
	return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
//#endregion
//#region src/client/usage/UsagePanel.module.css
var UsagePanel_module_default = {
	"bar": "_8RB1Sa_bar",
	"barLabel": "_8RB1Sa_barLabel",
	"bars": "_8RB1Sa_bars",
	"barWrap": "_8RB1Sa_barWrap",
	"breakdown": "_8RB1Sa_breakdown",
	"breakdownLabel": "_8RB1Sa_breakdownLabel",
	"chevron": "_8RB1Sa_chevron",
	"empty": "_8RB1Sa_empty",
	"heading": "_8RB1Sa_heading",
	"intro": "_8RB1Sa_intro",
	"kpi": "_8RB1Sa_kpi",
	"kpiLabel": "_8RB1Sa_kpiLabel",
	"kpis": "_8RB1Sa_kpis",
	"kpiSub": "_8RB1Sa_kpiSub",
	"kpiValue": "_8RB1Sa_kpiValue",
	"model": "_8RB1Sa_model",
	"section": "_8RB1Sa_section",
	"tab": "_8RB1Sa_tab",
	"tabActive": "_8RB1Sa_tabActive",
	"tabs": "_8RB1Sa_tabs",
	"toolbar": "_8RB1Sa_toolbar",
	"top": "_8RB1Sa_top",
	"topRank": "_8RB1Sa_topRank",
	"topRow": "_8RB1Sa_topRow",
	"topTitle": "_8RB1Sa_topTitle",
	"topTokens": "_8RB1Sa_topTokens"
};
//#endregion
//#region src/client/usage/UsagePanel.tsx
/** App-usage panel: model filter, time-range tabs, KPI cards, a bar trend, and top sessions. */
const DAY_MS = 864e5;
function bucketLabel(start, range) {
	const date = new Date(start);
	if (range === "year") return date.toLocaleDateString(void 0, { month: "short" });
	if (range === "month") return date.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	});
	return date.toLocaleDateString(void 0, { weekday: "short" });
}
/** Display label for a `provider:model` key. */
const modelLabel = (modelKey) => modelKey.replace(":", " / ");
/**
* Render the usage panel content.
* @param props - sessions hook + translator.
* @returns the panel element tree.
*/
function UsagePanel({ useSessions, t }) {
	const list = useSessions((value) => value);
	const [range, setRange] = (0, react.useState)("week");
	const [modelKey, setModelKey] = (0, react.useState)(null);
	const [modelOpen, setModelOpen] = (0, react.useState)(false);
	const now = Date.now();
	const rows = Object.values(list.byId).map((summary) => decodeUsageRow(summary.updatedAt, summary.projectionValues));
	const modelKeys = usageModelKeys(rows);
	const activeModel = modelKey !== null && modelKeys.includes(modelKey) ? modelKey : null;
	const total = aggregateUsage(rows, range, now, activeModel);
	const buckets = usageByBucket(rows, range, now, activeModel);
	const maxTokens = Math.max(1, ...buckets.map((bucket) => bucket.tokens));
	const hitTokens = total.cacheReadTokens + total.inputTokens;
	const hitRate = hitTokens === 0 ? 0 : total.cacheReadTokens / hitTokens;
	const top = Object.values(list.byId).map((summary) => {
		const usage = usageOfRow(decodeUsageRow(summary.updatedAt, summary.projectionValues), activeModel);
		return {
			title: summary.displayTitle,
			updatedAt: summary.updatedAt,
			tokens: usage === null ? 0 : usageTokens(usage),
			missing: activeModel !== null && usage === null
		};
	}).filter((entry) => !entry.missing && entry.updatedAt >= now - (range === "year" ? 365 : range === "month" ? 30 : range === "week" ? 7 : 3) * DAY_MS).sort((a, b) => b.tokens - a.tokens).slice(0, 5);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: UsagePanel_module_default.section,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: UsagePanel_module_default.toolbar,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: UsagePanel_module_default.tabs,
				role: "tablist",
				"aria-label": "usage range",
				children: USAGE_RANGES.map((id) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": id === range,
					className: id === range ? `${UsagePanel_module_default.tab} ${UsagePanel_module_default.tabActive}` : UsagePanel_module_default.tab,
					onClick: () => setRange(id),
					children: t(`range.${id}`)
				}, id))
			}), modelKeys.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
				open: modelOpen,
				onClose: () => {
					setModelOpen(false);
				},
				items: [{
					id: "",
					label: t("model.all")
				}, ...modelKeys.map((key) => ({
					id: key,
					label: modelLabel(key)
				}))],
				selectedId: activeModel ?? "",
				onSelect: (id) => {
					setModelOpen(false);
					setModelKey(id === "" ? null : id);
				},
				align: "end",
				portal: true,
				anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: UsagePanel_module_default.model,
					"aria-haspopup": "menu",
					"aria-expanded": modelOpen,
					onClick: () => {
						setModelOpen((value) => !value);
					},
					children: [activeModel === null ? t("model.all") : modelLabel(activeModel), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: UsagePanel_module_default.chevron })]
				})
			})]
		}), total.sessions === 0 && total.inputTokens === 0 && total.outputTokens === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
			className: UsagePanel_module_default.empty,
			children: t("empty")
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: UsagePanel_module_default.kpis,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePanel_module_default.kpi,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: UsagePanel_module_default.kpiLabel,
							children: t("kpi.total")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: UsagePanel_module_default.kpiValue,
							children: formatTokens(total.inputTokens + total.outputTokens + total.cacheReadTokens + total.cacheWriteTokens)
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePanel_module_default.kpi,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: UsagePanel_module_default.kpiLabel,
								children: t("kpi.input")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: UsagePanel_module_default.kpiValue,
								children: formatTokens(total.inputTokens)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: UsagePanel_module_default.kpiSub,
								children: [formatTokens(total.cacheWriteTokens), " write"]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePanel_module_default.kpi,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: UsagePanel_module_default.kpiLabel,
							children: t("kpi.output")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: UsagePanel_module_default.kpiValue,
							children: formatTokens(total.outputTokens)
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePanel_module_default.kpi,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: UsagePanel_module_default.kpiLabel,
								children: t("kpi.cache")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: UsagePanel_module_default.kpiValue,
								children: formatTokens(total.cacheReadTokens)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: UsagePanel_module_default.kpiSub,
								children: [
									t("kpi.cacheRate"),
									" ",
									(hitRate * 100).toFixed(1),
									"%"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePanel_module_default.kpi,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: UsagePanel_module_default.kpiLabel,
								children: t("kpi.time")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: UsagePanel_module_default.kpiValue,
								children: formatDuration(total.llmMs)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: UsagePanel_module_default.kpiSub,
								children: [formatDuration(total.toolMs), " tool"]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePanel_module_default.kpi,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: UsagePanel_module_default.kpiLabel,
								children: t("kpi.sessions")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: UsagePanel_module_default.kpiValue,
								children: total.sessions
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: UsagePanel_module_default.kpiSub,
								children: [
									t("kpi.steps"),
									" ",
									total.steps
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: UsagePanel_module_default.breakdown,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: UsagePanel_module_default.breakdownLabel,
					children: t("breakdown")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: UsagePanel_module_default.bars,
					children: buckets.map((bucket) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UsagePanel_module_default.barWrap,
						title: `${formatTokens(bucket.tokens)}`,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: UsagePanel_module_default.bar,
							style: { height: `${Math.max(2, Math.round(bucket.tokens / maxTokens * 100))}%` }
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: UsagePanel_module_default.barLabel,
							children: bucketLabel(bucket.start, range)
						})]
					}, bucket.start))
				})]
			}),
			top.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: UsagePanel_module_default.top,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: UsagePanel_module_default.breakdownLabel,
					children: t("topSessions")
				}), top.map((entry, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: UsagePanel_module_default.topRow,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: UsagePanel_module_default.topRank,
							children: index + 1
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: UsagePanel_module_default.topTitle,
							children: entry.title
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: UsagePanel_module_default.topTokens,
							children: formatTokens(entry.tokens)
						})
					]
				}, entry.title + entry.updatedAt))]
			})
		] })]
	});
}
//#endregion
//#region src/client/usage/UsageOverlay.module.css
var UsageOverlay_module_default = {
	"backdrop": "nKwYda_backdrop",
	"body": "nKwYda_body",
	"close": "nKwYda_close",
	"header": "nKwYda_header",
	"panel": "nKwYda_panel",
	"title": "nKwYda_title"
};
//#endregion
//#region src/client/usage/UsageOverlay.tsx
/** The shell.overlay entry: the usage panel popped by the shortcut (Mod+Alt+U). */
/**
* Render the usage overlay (null while hidden; Esc / backdrop / close hides it).
* @param props - composed slot props + injected hooks.
* @returns the overlay element tree, or null.
*/
function UsageOverlay({ t, useSessions, useUsageVisible }) {
	const visible = useUsageVisible((value) => value);
	(0, react.useEffect)(() => {
		const onHotkey = (event) => {
			if (event.repeat || event.isComposing) return;
			if (!event.altKey || !(event.metaKey || event.ctrlKey)) return;
			if (event.code !== "KeyU" && event.key.toLowerCase() !== "u") return;
			event.preventDefault();
			usageOverlay.toggle();
		};
		window.addEventListener("keydown", onHotkey);
		return () => window.removeEventListener("keydown", onHotkey);
	}, []);
	(0, react.useEffect)(() => {
		if (!visible) return;
		const onKeyDown = (event) => {
			if (event.key === "Escape") usageOverlay.close();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [visible]);
	if (!visible) return null;
	const translator = t;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: UsageOverlay_module_default.backdrop,
		role: "presentation",
		onClick: () => usageOverlay.close(),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: UsageOverlay_module_default.panel,
			role: "dialog",
			"aria-label": translator("title"),
			onClick: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
				className: UsageOverlay_module_default.header,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
					className: UsageOverlay_module_default.title,
					children: translator("title")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: UsageOverlay_module_default.close,
					"aria-label": translator("close"),
					onClick: () => usageOverlay.close(),
					children: "×"
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: UsageOverlay_module_default.body,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UsagePanel, {
					useSessions,
					t: translator
				})
			})]
		})
	});
}
//#endregion
//#region src/client/markdown/markdown-locales.ts
/** Copy for the Markdown-rendering toggle in General settings. */
/** Dictionary namespace owned by the user-markdown surface. */
const MARKDOWN_NS = "markdown";
/** Simplified Chinese copy. */
const zh$3 = {
	renderTitle: "Markdown 渲染",
	renderDesc: "你发送的消息以 Markdown 格式渲染（标题、列表、代码块等）；关闭后按纯文本显示。"
};
/** English copy. */
const en$3 = {
	renderTitle: "Markdown rendering",
	renderDesc: "Render the messages you send as Markdown (headings, lists, code blocks); off = plain text."
};
//#endregion
//#region src/client/markdown/MarkdownRender.module.css
var MarkdownRender_module_default = {
	"action": "l-RxFq_action",
	"actions": "l-RxFq_actions",
	"bubble": "l-RxFq_bubble",
	"refChip": "l-RxFq_refChip",
	"timeStart": "l-RxFq_timeStart",
	"userRow": "l-RxFq_userRow",
	"userStack": "l-RxFq_userStack"
};
//#endregion
//#region src/client/markdown/UserMarkdownNodeView.tsx
/**
* Keyed chat renderer shadowing `conversation.chat.node` for `user` and
* `steering` cells (priority -1 beats ui-conversation's default renderer).
* Reads the ui-custom settings scope's `renderUserMarkdown`: on, the bubble
* text renders through MarkdownText; off, it falls back to the plain-text
* bubble with /name @name reference chips — visually identical to stock.
*
* Self-contained on purpose: the platform purity gate forbids importing
* another plugin's internals, so the bubble geometry, image gallery wiring,
* reference chips and the copy/clock actions row are replicated here from
* ui-conversation's MessageItem (only platform atoms are imported).
*/
/** Split a user node's content into text / images / remaining blocks. */
function contentParts(content) {
	const texts = [];
	const images = [];
	const rest = [];
	for (const block of content) {
		const b = block;
		if (b.type === "text" && typeof b.text === "string") texts.push(b.text);
		else if (b.type === "image" && b.attachment !== void 0) images.push({ attachment: b.attachment });
		else rest.push(block);
	}
	return {
		text: texts.join(""),
		images,
		rest
	};
}
/** Image-gallery labels from the `conversation` namespace (see ui-conversation). */
function imageLabels$1(t) {
	return {
		image: t("image.label"),
		open: t("image.openOriginal"),
		openNamed: (label) => t("image.openOriginalLabel", { label }),
		loading: t("image.loading"),
		loadFailed: t("image.loadFailed"),
		lightbox: {
			dialog: t("image.preview"),
			close: t("image.closePreview")
		}
	};
}
/**
* Markdown chrome labels for the host MarkdownText. The host renderer reads
* `labels.code.copyLabel` / `labels.code.copiedLabel` / `labels.footnotes`
* without optional chaining (primitives v0.1.2 renderCode), so a missing or
* malformed `labels` throws on any fenced code block — the keys below resolve
* through the shared common namespace.
*/
function markdownLabels(t) {
	return {
		code: {
			copyLabel: t("copy"),
			copiedLabel: t("copied")
		},
		footnotes: t("markdown.footnotes")
	};
}
const pad2 = (n) => String(n).padStart(2, "0");
/** Same-day clock `HH:MM`, otherwise `M/D HH:MM` / `Y/M/D HH:MM`. */
function formatClock(time, t, now = Date.now()) {
	const d = new Date(time);
	const n = new Date(now);
	const clock = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
	if (d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate()) return clock;
	const params = {
		y: d.getFullYear(),
		m: d.getMonth() + 1,
		d: d.getDate()
	};
	return `${d.getFullYear() === n.getFullYear() ? t("clock.md", params) : t("clock.ymd", params)} ${clock}`;
}
/** Plain-text projection with /name @name reference chips (stock look). */
function projectUserText(text) {
	const re = /(^|\s)([/@][\w-]+)(?=\s|$)/g;
	const parts = [];
	let cursor = 0;
	let m;
	while ((m = re.exec(text)) !== null) {
		const tokenStart = m.index + (m[1]?.length ?? 0);
		const label = m[2] ?? "";
		if (tokenStart > cursor) parts.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.MessageText, { text: text.slice(cursor, tokenStart) }, cursor));
		parts.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: MarkdownRender_module_default.refChip,
			"data-ref-chip": label.startsWith("@") ? "subagent" : "skill",
			children: label
		}, tokenStart));
		cursor = tokenStart + label.length;
	}
	if (parts.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.MessageText, { text });
	if (cursor < text.length) parts.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.MessageText, { text: text.slice(cursor) }, cursor));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: parts });
}
/** Copy + clock actions row (user bubble chrome). */
function UserBubbleActions({ text, time, t }) {
	const [copied, setCopied] = (0, react.useState)(false);
	const onCopy = () => {
		(0, _deepseek_ai_dsh_client_ui_primitives.writeClipboard)(text).then((ok) => {
			if (!ok) return;
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1e3);
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: MarkdownRender_module_default.actions,
		children: [time !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: MarkdownRender_module_default.timeStart,
			children: formatClock(time, t)
		}) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
			label: copied ? t("copied") : t("copy"),
			side: "bottom",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: MarkdownRender_module_default.action,
				"aria-label": copied ? t("copied") : t("copy"),
				onClick: onCopy,
				children: copied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCopyOutline16, {})
			})
		})]
	});
}
/** Right-aligned bubble shared by user and steering rows. */
function UserStyleBubble({ content, imageLoader, renderMarkdown, t, actions }) {
	const { text, images, rest } = contentParts(content);
	const truncated = (total) => t("json.truncated", { total });
	const showBubble = text !== "" || rest.length > 0;
	const hasGallery = typeof _deepseek_ai_dsh_client_ui_attachment.ImageGallery !== "undefined" && _deepseek_ai_dsh_client_ui_attachment.ImageGallery !== null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: MarkdownRender_module_default.userRow,
		"data-time-hover-root": true,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: MarkdownRender_module_default.userStack,
			children: [hasGallery ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_attachment.ImageGallery, {
				images,
				load: imageLoader,
				align: "end",
				labels: imageLabels$1(t)
			}) : images.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: MarkdownRender_module_default.bubble,
				style: {
					opacity: .6,
					fontSize: 12
				},
				children: [
					t("image.label"),
					": ",
					images.length
				]
			}) : null, showBubble && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: MarkdownRender_module_default.bubble,
				children: [renderMarkdown ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.MarkdownText, {
					text,
					labels: markdownLabels(t)
				}) : projectUserText(text), rest.map((block, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.JsonBlock, {
					label: t("message.extraBlock"),
					payload: block,
					truncatedLabel: truncated
				}, i))]
			})]
		}), actions?.(text)]
	});
}
var MarkdownRowErrorBoundary = class extends react.Component {
	state = { error: null };
	static getDerivedStateFromError(error) {
		return { error };
	}
	componentDidCatch(error, info) {
		const stack = info?.componentStack ?? "";
		console.error("[oh-my] UserMarkdownNodeView render failed:", {
			message: error?.message ?? String(error),
			name: error?.name,
			stack: error?.stack,
			componentStack: stack,
			hasMarkdownText: typeof _deepseek_ai_dsh_client_ui_primitives.MarkdownText !== "undefined",
			hasMessageText: typeof _deepseek_ai_dsh_client_ui_primitives.MessageText !== "undefined",
			hasImageGallery: typeof _deepseek_ai_dsh_client_ui_attachment.ImageGallery !== "undefined",
			hasJsonBlock: typeof _deepseek_ai_dsh_client_ui_primitives.JsonBlock !== "undefined",
			hasTooltip: typeof _deepseek_ai_dsh_client_ui_primitives.Tooltip !== "undefined"
		}, info);
	}
	render() {
		if (this.state.error !== null) return null;
		return this.props.children;
	}
};
const UserMarkdownNodeViewInner = (0, react.memo)(function UserMarkdownNodeViewInner({ node, loadImage, t, useMdRender }) {
	const renderMarkdown = useMdRender((value) => value)?.value?.renderUserMarkdown ?? false;
	const data = node?.data ?? {};
	const content = Array.isArray(data.content) ? data.content : [];
	const time = typeof data.time === "number" ? data.time : void 0;
	const safeLoadImage = typeof loadImage === "function" ? loadImage : void 0;
	const safeT = typeof t === "function" ? t : ((k) => k);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UserStyleBubble, {
		content,
		imageLoader: safeLoadImage,
		renderMarkdown,
		t: safeT,
		actions: (text) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UserBubbleActions, {
			text,
			time,
			t: safeT
		})
	});
});
/** User and admitted-steering keyed Chat renderer (shadow, priority -1). */
const UserMarkdownNodeView = (0, react.memo)(function UserMarkdownNodeView(props) {
	if (typeof props.useMdRender !== "function") {
		const { node, loadImage, t } = props;
		const data = node?.data ?? {};
		const content = Array.isArray(data.content) ? data.content : [];
		const time = typeof data.time === "number" ? data.time : void 0;
		const safeLoadImage = typeof loadImage === "function" ? loadImage : void 0;
		const safeT = typeof t === "function" ? t : ((k) => k);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkdownRowErrorBoundary, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UserStyleBubble, {
			content,
			imageLoader: safeLoadImage,
			renderMarkdown: false,
			t: safeT,
			actions: (text) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UserBubbleActions, {
				text,
				time,
				t: safeT
			})
		}) });
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkdownRowErrorBoundary, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UserMarkdownNodeViewInner, { ...props }) });
});
//#endregion
//#region src/client/motion/motion-locales.ts
/** Copy for the 动效 (Motion) settings section. */
/** Dictionary namespace owned by the motion surface. */
const MOTION_NS = "motion";
/** Simplified Chinese copy. */
const zh$2 = {
	nav: "动效",
	title: "动效",
	intro: "对话内容的入场动效。",
	presetTitle: "预设方案",
	presetDesc: "一键应用整套动效组合，无需逐项调试；应用后仍可自由微调。",
	presetFluid: "流畅",
	presetFluidDesc: "层叠上浮与滑动，明快活泼。",
	presetElegant: "优雅",
	presetElegantDesc: "柔和模糊与绽放，安静高级。",
	presetMinimal: "极简",
	presetMinimalDesc: "仅保留轻微淡入，近乎无感。",
	toggleTitle: "对话入场动效",
	toggleDesc: "载入或切换对话时，消息以动效出现，而不是瞬间跳出；关闭后恢复原生表现。",
	styleTitle: "动效样式",
	styleDesc: "选择对话内容出现的方式（关闭入场动效时不可用）。",
	styleFadeUp: "淡入上浮",
	styleFade: "轻柔淡入",
	styleRiseScale: "上浮放大",
	styleSlideIn: "右侧滑入",
	styleBlurIn: "模糊显影",
	styleScaleIn: "轻盈缩放",
	sidebarToggleTitle: "侧边栏动效",
	sidebarToggleDesc: "打开 Web 时侧边栏树逐项出现，展开工作区时对话框浮现。",
	sidebarStyleTitle: "侧边栏动效样式",
	sidebarStyleDesc: "侧边栏会话树的出现方式，与对话动效独立选择。",
	styleSlideLeft: "左侧滑入",
	styleExpand: "纵向展开",
	styleSlideDown: "自上而下",
	selectionToggleTitle: "选中框动效",
	selectionToggleDesc: "切换对话时，当前会话行描出常驻的选中框。",
	newChatToggleTitle: "新建对话动效",
	newChatToggleDesc: "新建对话时，欢迎界面和输入区淡入出现。",
	newChatStyleTitle: "新建对话动效样式",
	newChatStyleDesc: "新建对话时欢迎界面的出现方式。",
	styleReveal: "轻柔显影",
	styleBloom: "柔和绽放",
	styleZoom: "柔和缩放",
	settingsToggleTitle: "设置界面动效",
	settingsToggleDesc: "打开设置时面板从左下角向中间扩张，切换左侧标签时高亮与页面内容淡入；关闭后立即出现。"
};
/** English copy. */
const en$2 = {
	nav: "Motion",
	title: "Motion",
	intro: "Entrance motion for conversation content.",
	presetTitle: "Presets",
	presetDesc: "Apply a complete motion combo in one click — no per-option tuning; every value stays editable afterwards.",
	presetFluid: "Fluid",
	presetFluidDesc: "Cascading rise and slide — bright and lively.",
	presetElegant: "Elegant",
	presetElegantDesc: "Soft blur and bloom — quiet and refined.",
	presetMinimal: "Minimal",
	presetMinimalDesc: "Barely-there fades only — almost imperceptible.",
	toggleTitle: "Conversation entrance motion",
	toggleDesc: "Messages arrive with a motion effect when a conversation loads or switches, instead of popping in at once; off = stock behavior.",
	styleTitle: "Motion style",
	styleDesc: "How conversation content arrives (unavailable while entrance motion is off).",
	styleFadeUp: "Fade up",
	styleFade: "Gentle fade",
	styleRiseScale: "Rise & scale",
	styleSlideIn: "Slide in",
	styleBlurIn: "Blur in",
	styleScaleIn: "Gentle scale",
	sidebarToggleTitle: "Sidebar motion",
	sidebarToggleDesc: "The sidebar tree cascades in on web load; workspace rows fade in when their group expands.",
	sidebarStyleTitle: "Sidebar motion style",
	sidebarStyleDesc: "How the sidebar session tree arrives — independent of the transcript style.",
	styleSlideLeft: "Slide in from left",
	styleExpand: "Expand",
	styleSlideDown: "Drop in",
	selectionToggleTitle: "Selection box",
	selectionToggleDesc: "Trace a persistent selection box on the active conversation row when switching.",
	newChatToggleTitle: "New conversation motion",
	newChatToggleDesc: "A brand-new conversation's welcome dialog and composer fade in.",
	newChatStyleTitle: "New conversation style",
	newChatStyleDesc: "How the welcome dialog of a brand-new conversation arrives.",
	styleReveal: "Soft reveal",
	styleBloom: "Gentle bloom",
	styleZoom: "Soft zoom",
	settingsToggleTitle: "Settings motion",
	settingsToggleDesc: "The settings dialog expands from the lower-left, nav highlight and page content fade in on switch; off = instant appearance."
};
//#endregion
//#region src/client/motion/motion.ts
/**
* Conversation entrance-motion engine (feature: motion).
*
* Watches two host surfaces:
* - The transcript chat rows — the host renders one `[data-chat-anchor-key]`
*   wrapper per message (user / assistant / tool, all kinds) inside a
*   `[data-chat-flow]` column that stays mounted across conversation
*   switches.
* - The sidebar session tree — `[role="treeitem"]` rows (workspace groups and
*   sessions) inside `[role="tree"]` containers.
*
* Both get the entrance animation class (see motion.css):
* - Batch classification: a "load" batch (the container was empty before, or
*   rows were removed in the same batch = first render / conversation
*   switch) gets a per-row stagger so the surface cascades in instead of
*   popping; an "incremental" batch (streaming turns, older-history paging,
*   search results, group expand) gets no delay and, for the tree, no
*   entrance at all — only wholesale loads animate the sidebar.
* - The session-switch signal (notifySessionSwitch) force-replays the
*   transcript rows AND the currently selected tree item, so every
*   open/switch animates — not just the first.
*
* The observer starts before the settings scope resolves, buffering batches
* until the feature state lands, so even a slow settings load still captures
* the very first conversation render.
*/
/** Chat-row selector: the host renders one anchored row per message. */
const ANCHOR = "[data-chat-anchor-key]";
/** Sidebar tree items: session/workspace rows inside a `role="tree"`. */
const TREE_ITEM = "[role=\"tree\"] [role=\"treeitem\"]";
/** Every tracked item on a container (rows + tree items, one kind per container). */
const ITEM_SELECTOR = `${ANCHOR}, ${TREE_ITEM}`;
/**
* Selection-box animation class: applied to a sidebar tree item the moment it
* becomes the active conversation, briefly tracing the selection box around
* it (see motion.css) before the host's static highlight takes over.
*/
const SELECT_ANIMATION_CLASS = "dsu-motion-select";
/**
* Panel-loading class: applied to the transcript column when a conversation
* loads or switches — the whole column fades in with a gentle drop while its
* rows stagger in (see motion.css).
*/
const PANEL_ANIMATION_CLASS = "dsu-motion-panel";
/**
* Entrance classes applied to marked rows. Literal (global) classes on
* purpose: the engine runs identically in the browser and in jsdom tests,
* independent of CSS-module processing (the keyframes live in
* motion.css). ROW_IN_CLASS is the "already animated" marker used for
* reuse detection and cleanup; the style class drives the animation.
*/
const ROW_IN_CLASS = "dsu-motion-row-in";
/**
* Every style class the engine may apply (for reuse reset + cleanup). The
* style sets share the `fade` id, so the union is deduplicated.
*/
const STYLE_CLASSES = [.../* @__PURE__ */ new Set([
	...MOTION_STYLES,
	...SIDEBAR_MOTION_STYLES,
	...NEW_CHAT_MOTION_STYLES
])].map((style) => styleClass(style));
/** Pure: the CSS class that carries one style's entrance animation. */
function styleClass(style) {
	return `dsu-motion-${style}`;
}
/** Longest buffered batch queue while the feature is disabled. */
const MAX_PENDING_BATCHES = 8;
/**
* Buffered batches older than this (ms) are dropped at flush: their rows have
* been on screen long enough that replaying the entrance would read as a
* pop-in, not an arrival. Covers slow settings resolution and re-enables.
*/
const FRESHNESS_WINDOW_MS = 400;
/** Delay before the session-switch replay scans the transcript (host commit). */
const SWITCH_REPLAY_MS = 60;
/** Retry interval while the transcript rows have not mounted yet. */
const SWITCH_RETRY_MS = 80;
/** Max replay retries before giving up on an empty transcript. */
const MAX_SWITCH_RETRIES = 12;
/** Pure: the entrance delay for the i-th row of a load batch (0-based). */
function staggerDelay(index) {
	return Math.min((Number.isFinite(index) && index > 0 ? Math.floor(index) : 0) * 40, 320);
}
/** Pure: whether an added node is a top-level chat row (not nested in one). */
function isChatRow(node) {
	return node instanceof HTMLElement && node.matches(ANCHOR) && node.parentElement?.closest(ANCHOR) === null;
}
/**
* Pure: whether an added node is a sidebar tree item. Nested items are
* allowed: session rows live INSIDE their workspace group row (the host
* nests them), so a top-level-only check would silently drop them.
*/
function isTreeItem(node) {
	return node instanceof HTMLElement && node.matches(TREE_ITEM);
}
/** Whether any motion toggle is on (the engine stays inert only when all are off). */
function anyMotionEnabled(state) {
	return state.transcript || state.sidebar || state.selection || state.newChat;
}
/**
* Install the entrance-motion engine. Starts observing immediately (batches
* buffer while disabled) and returns the engine handle: teardown plus the
* session-switch replay signal (see {@link MotionEngine}).
* @param options - feature-state access (scope-driven).
*/
function installConversationEntrance(options) {
	let state = options.getState();
	let pending = [];
	const marked = /* @__PURE__ */ new Set();
	const lastCount = /* @__PURE__ */ new Map();
	let notifyCount = 0;
	let switchTimer = 0;
	let switchAttempts = 0;
	let bootTimer = 0;
	let bootAttempts = 0;
	let disposed = false;
	let bootScanned = false;
	const clearMarked = () => {
		for (const row of marked) {
			row.classList.remove(ROW_IN_CLASS, SELECT_ANIMATION_CLASS, ...STYLE_CLASSES);
			row.style.removeProperty("--dsu-motion-delay");
		}
		marked.clear();
		for (const row of document.querySelectorAll(`.${SELECT_ANIMATION_CLASS}`)) row.classList.remove(SELECT_ANIMATION_CLASS);
	};
	function applyBatch(rows, load) {
		const ordered = [...rows].sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
		const styleCls = styleClass(ordered[0] !== void 0 && isTreeItem(ordered[0]) ? state.sidebarStyle : state.style);
		for (let i = 0; i < ordered.length; i++) {
			const row = ordered[i];
			row.style.setProperty("--dsu-motion-delay", load ? `${staggerDelay(i)}ms` : "0ms");
			if (row.classList.contains("dsu-motion-row-in")) {
				row.classList.remove(ROW_IN_CLASS, ...STYLE_CLASSES);
				row.offsetWidth;
			}
			row.classList.add(ROW_IN_CLASS, styleCls);
			marked.add(row);
		}
	}
	function syncEnabled() {
		const next = options.getState();
		if (!anyMotionEnabled(next)) {
			pending = [];
			clearMarked();
		} else if (!next.selection && state.selection) for (const row of document.querySelectorAll(`.${SELECT_ANIMATION_CLASS}`)) row.classList.remove(SELECT_ANIMATION_CLASS);
		state = next;
		if (anyMotionEnabled(state)) {
			flush();
			scanTreeBoot();
		}
	}
	/**
	* One-shot boot scan for the sidebar tree: the tree can mount before the
	* engine installs (page-restored session), so its items would never reach
	* the observer. Marks whatever the observer missed with the load stagger,
	* and traces the persistent selection box on the restored active item.
	* Retries briefly until the tree has mounted.
	*/
	function scanTreeBoot() {
		if (disposed || !anyMotionEnabled(state)) return;
		const items = [...document.querySelectorAll(TREE_ITEM)].filter(isTreeItem);
		if (items.length === 0 && bootAttempts < MAX_SWITCH_RETRIES) {
			bootAttempts += 1;
			bootTimer = window.setTimeout(scanTreeBoot, SWITCH_RETRY_MS);
			return;
		}
		if (bootScanned) return;
		bootScanned = true;
		const fresh = items.filter((item) => !item.classList.contains(ROW_IN_CLASS));
		if (fresh.length > 0 && state.sidebar) applyBatch(fresh, true);
		const selected = items.find((item) => item.getAttribute("aria-selected") === "true");
		if (selected !== void 0) playSelectAnimation(selected);
	}
	function flush() {
		if (pending.length === 0) return;
		const now = performance.now();
		const fresh = pending.filter((batch) => now - batch.time <= FRESHNESS_WINDOW_MS);
		for (const batch of fresh) {
			if (batch.rows[0] !== void 0 && isTreeItem(batch.rows[0]) ? !state.sidebar : !state.transcript) continue;
			applyBatch(batch.rows, batch.load);
			for (const row of batch.rows) if (isTreeItem(row) && row.getAttribute("aria-selected") === "true") playSelectAnimation(row);
		}
		pending = [];
	}
	/**
	* Selection-box entrance: the tree item that just became the active
	* conversation fades a selection box in and keeps it (the class stays until
	* the item loses selection). Replays on every visit (the class is
	* force-restarted), independent of row reuse.
	*/
	function playSelectAnimation(row) {
		if (disposed || !state.selection) return;
		row.classList.remove(SELECT_ANIMATION_CLASS);
		row.offsetWidth;
		row.classList.add(SELECT_ANIMATION_CLASS);
	}
	const observer = new MutationObserver((mutations) => {
		const byParent = /* @__PURE__ */ new Map();
		const removedByParent = /* @__PURE__ */ new Set();
		const touched = [];
		const seen = /* @__PURE__ */ new Set();
		for (const mutation of mutations) {
			if (mutation.type === "attributes") {
				if (mutation.attributeName === "aria-selected") {
					const target = mutation.target;
					if (target instanceof HTMLElement && target.matches(TREE_ITEM)) {
						if (target.getAttribute("aria-selected") === "true") playSelectAnimation(target);
						else target.classList.remove(SELECT_ANIMATION_CLASS);
					}
				}
				continue;
			}
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) {
				if (!(node instanceof HTMLElement)) continue;
				const rows = [];
				if (node.matches(ANCHOR) || node.matches(TREE_ITEM)) rows.push(node);
				else for (const inner of node.querySelectorAll(ITEM_SELECTOR)) rows.push(inner);
				for (const row of rows) {
					if (seen.has(row)) continue;
					seen.add(row);
					const parent = row.parentElement;
					if (parent === null) continue;
					const list = byParent.get(parent);
					if (list === void 0) byParent.set(parent, [row]);
					else list.push(row);
					touched.push(parent);
				}
			}
			for (const node of mutation.removedNodes) {
				if (!(node instanceof HTMLElement)) continue;
				if (!(node.matches(ANCHOR) || node.querySelector(ANCHOR) !== null || node.matches(TREE_ITEM) || node.querySelector(TREE_ITEM) !== null)) continue;
				const parent = node.matches(ANCHOR) || node.matches(TREE_ITEM) ? mutation.target : node;
				if (!(parent instanceof Element)) continue;
				removedByParent.add(parent);
				touched.push(parent);
			}
		}
		const batches = [];
		for (const [parent, rows] of byParent) {
			const wasEmpty = (lastCount.get(parent) ?? 0) === 0;
			batches.push({
				rows,
				load: removedByParent.has(parent) || wasEmpty,
				time: performance.now()
			});
		}
		for (const parent of touched) lastCount.set(parent, parent.querySelectorAll(ITEM_SELECTOR).length);
		if (state.transcript || state.sidebar) for (const batch of batches) {
			if (batch.rows[0] !== void 0 && isTreeItem(batch.rows[0])) {
				if (!state.sidebar) continue;
				applyBatch(batch.rows, batch.load);
				for (const row of batch.rows) if (row.getAttribute("aria-selected") === "true") playSelectAnimation(row);
				continue;
			}
			if (state.transcript) applyBatch(batch.rows, batch.load);
		}
		else {
			pending.push(...batches.filter((batch) => {
				if (batch.load) return true;
				return batch.rows[0] !== void 0 && !isTreeItem(batch.rows[0]);
			}));
			if (pending.length > MAX_PENDING_BATCHES) pending.splice(0, pending.length - MAX_PENDING_BATCHES);
		}
	});
	observer.observe(document.body ?? document.documentElement, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ["aria-selected"]
	});
	const unsubscribe = options.subscribe(syncEnabled);
	syncEnabled();
	/**
	* Force-replay the entrance on the transcript rows (load batch:
	* document-order stagger). Retries briefly while the host is still
	* committing the new transcript, so a slow switch still animates.
	*/
	function tryReplay() {
		if (disposed || !anyMotionEnabled(state)) return;
		const rows = [...document.querySelectorAll(ANCHOR)].filter(isChatRow);
		const flow = document.querySelector("[data-chat-flow]");
		if (rows.length === 0 && flow === null && switchAttempts < MAX_SWITCH_RETRIES) {
			switchAttempts += 1;
			switchTimer = window.setTimeout(tryReplay, SWITCH_RETRY_MS);
			return;
		}
		if (rows.length > 0 && state.transcript) applyBatch(rows, true);
		if (flow !== null && state.transcript) panelEntrance(flow);
	}
	function panelEntrance(el) {
		classEntrance(el, PANEL_ANIMATION_CLASS);
	}
	/** Restart one animation class on an element (drop, reflow, re-add). */
	function classEntrance(el, cls) {
		el.classList.remove(cls);
		el.offsetWidth;
		el.classList.add(cls);
	}
	/**
	* Schedule the blank-session (new conversation) entrance: apply the style
	* class the moment the host renders the welcome dialog into the composer
	* seat. One-shot per signal; a same-frame fallback covers the case where
	* the content was already rendered before the signal arrived.
	*/
	function scheduleComposerEntrance(style) {
		const composer = document.querySelector("[data-composer-seat]");
		if (composer === null) return;
		let applied = false;
		const apply = () => {
			if (disposed || applied) return;
			const current = document.querySelector("[data-composer-seat]");
			if (current === null) return;
			applied = true;
			classEntrance(current, styleClass(style));
		};
		const observer = new MutationObserver(() => {
			observer.disconnect();
			const latest = options.getState();
			if (!latest.blank || !latest.newChat) return;
			apply();
		});
		observer.observe(composer, {
			childList: true,
			subtree: true
		});
		requestAnimationFrame(() => {
			observer.disconnect();
			const latest = options.getState();
			if (latest.blank && latest.newChat) apply();
		});
	}
	return {
		dispose: () => {
			disposed = true;
			observer.disconnect();
			unsubscribe();
			window.clearTimeout(switchTimer);
			window.clearTimeout(bootTimer);
			pending = [];
			clearMarked();
		},
		notifySessionSwitch: () => {
			if (disposed) return;
			notifyCount += 1;
			const latest = options.getState();
			if (latest.newChat) scheduleComposerEntrance(latest.newChatStyle);
			window.clearTimeout(switchTimer);
			switchAttempts = 0;
			switchTimer = window.setTimeout(tryReplay, SWITCH_REPLAY_MS);
		}
	};
}
/**
* Settings-shell motion trigger (feature: settings-motion).
*
* Restores the original plugin's "animation" feature behavior
* (animation.module.css + the reveal observer): the dialog itself and the
* backdrop animate via pure CSS on mount (html[data-dsu-anim] [role="dialog"]
* / [role="presentation"]), so they play on every open and disappear
* instantly on close. The host settings shell re-renders its content column
* in place (the container stays mounted, only its children are swapped), so
* a plain CSS entrance would play once and never again — this trigger
* watches the shell's content column ([role="dialog"] > :nth-child(2) >
* :nth-child(2), i.e. the column next to the nav rail's inner content) and
* re-applies the .dsu-anim-reveal class on every page switch.
*
* The whole engine is inert unless the gate is on: the caller only needs to
* subscribe via options (the same scope the conversation engine uses), and
* the trigger itself checks the html[data-dsu-anim] gate on the document root.
*/
function installSettingsMotion(options) {
	const CONTENT_SEL = "[role=\"dialog\"] > :nth-child(2) > :nth-child(2)";
	const gateOn = () => typeof document !== "undefined" && document.documentElement.hasAttribute("data-dsu-anim");
	/** True for the host settings dialog (nav rail + active aria-current). */
	const isSettingsDialog = (el) => el.matches("[role=\"dialog\"]") && el.querySelector("nav [aria-current]") !== null;
	/**
	* Close animation: the host unmounts the settings dialog synchronously (the
	* whole overlay — mask + panel — is removed from the DOM), so a plain CSS
	* exit can never run. When the overlay is removed, clone it (its fixed
	* positioning keeps it in place) and play the dsu-dialog-out fade on the
	* clone before removing it.
	*/
	const playDialogOut = (removed) => {
		if (!gateOn()) return;
		const ghost = removed.cloneNode(true);
		ghost.classList.remove("dsu-anim-reveal");
		ghost.setAttribute("data-dsu-ghost", "");
		ghost.style.pointerEvents = "none";
		ghost.style.zIndex = "2147483000";
		ghost.classList.add("dsu-dialog-out");
		document.body.appendChild(ghost);
		window.setTimeout(() => ghost.remove(), 220);
	};
	let contentRevealAttached = false;
	let contentObserver;
	let dialogObserver;
	let detached = false;
	const revealSettingsContent = () => {
		if (!gateOn()) return;
		const content = document.querySelector(CONTENT_SEL);
		if (!(content instanceof HTMLElement)) return;
		content.classList.remove("dsu-anim-reveal");
		content.offsetWidth;
		content.classList.add("dsu-anim-reveal");
	};
	const install = () => {
		if (detached) return;
		if (dialogObserver !== void 0) return;
		if (typeof document === "undefined" || document.body === null) return;
		contentObserver = new MutationObserver(() => {
			revealSettingsContent();
		});
		dialogObserver = new MutationObserver((records) => {
			for (const record of records) {
				if (record.type !== "childList") continue;
				for (const node of record.removedNodes) {
					if (!(node instanceof HTMLElement)) continue;
					if (node.hasAttribute("data-dsu-ghost")) continue;
					if (isSettingsDialog(node)) playDialogOut(node);
					else {
						const inner = node.querySelector("[role=\"dialog\"]");
						if (inner !== null && isSettingsDialog(inner)) playDialogOut(node);
					}
				}
			}
			const content = document.querySelector(CONTENT_SEL);
			if (content === null) {
				contentRevealAttached = false;
				return;
			}
			if (!contentRevealAttached) {
				contentRevealAttached = true;
				if (contentObserver !== void 0) contentObserver.observe(content, { childList: true });
				revealSettingsContent();
			}
		});
		dialogObserver.observe(document.body, {
			childList: true,
			subtree: true
		});
	};
	const dispose = () => {
		if (contentObserver !== void 0) {
			contentObserver.disconnect();
			contentObserver = void 0;
		}
		if (dialogObserver !== void 0) {
			dialogObserver.disconnect();
			dialogObserver = void 0;
		}
		contentRevealAttached = false;
	};
	const run = () => {
		if (!gateOn()) {
			dispose();
			install();
		}
	};
	install();
	const unsubscribe = options.subscribe(run);
	return () => {
		detached = true;
		dispose();
		unsubscribe();
	};
}
//#endregion
//#region src/client/zh/data/settings-dicts.ts
const SETTINGS_ZH = {
	nav: "增强设置",
	sectionIntro: "配置界面增强与布局。",
	zhComplete: "中文补全",
	zhCompleteDesc: "修正中文界面残留的英文，统一术语与数量/时长格式",
	statsFull: "统计全显示",
	statsFullDesc: "聊天统计行保持单行完整显示，不省略号截断（自适应字号）",
	thinkingAuto: "自动展开最新思考",
	thinkingAutoDesc: "思考输出流式出现时自动展开最新一条，新的思考出现时收起上一条",
	thinkMaxLines: "默认展开行数",
	thinkMaxLinesDesc: "思考展开后默认只显示 N 行，超出部分折叠（减少超长思考引起的卡顿）；0 表示不限制",
	thinkMaxLinesUnit: "行",
	thinkMaxLinesFrom: "折叠显示方向",
	thinkMaxLinesFromDesc: "选择默认显示思考的开头还是结尾",
	thinkMaxLinesFromLatest: "最新 N 行",
	thinkMaxLinesFromEarliest: "最早 N 行",
	thinkExpandMore: "再展开 {n} 行（还有 {m} 行）",
	thinkExpandRest: "展开全部（还有 {n} 行）",
	thinkMode: "展开模式",
	thinkModeDesc: "按钮模式：折叠后点「再展开」按钮逐批展开；滚动模式：折叠正文自带滚动条，用鼠标滚轮上下查看",
	thinkModeButton: "按钮模式",
	thinkModeScroll: "滚动模式",
	chatWidth: "对话宽度",
	chatWidthDesc: "开启后，大屏（≥1200px）下按比例设置聊天列宽，两侧留白均分",
	chatWidthPercent: "比例",
	autoArchive: "自动归档旧会话",
	autoArchiveDesc: "新建会话界面打开时，自动把超过指定天数未活动的会话归档（仅从列表隐藏，日志保留）；设为 0 可关闭此功能",
	autoArchiveUnit: "天",
	autoArchiveNotified: "有 {n} 个会话已归档",
	archiveView: "查看已归档",
	archiveViewDesc: "工作区行新增「归档」按钮：点击后该分组正常会话隐藏，归档会话行直接出现在官方列表该分组内（随列表整体滚动、按最近活动时间降序、默认 5 个、每批再展开 5 个），行尾三点菜单含重命名 / 分叉 / 取消归档 / 删除，点击归档行即恢复并打开",
	otherFeatures: "其他功能",
	deleteSession: "会话删除按钮",
	deleteSessionDesc: "会话列表三点菜单显示「删除会话」项（日志移入系统回收站，不保留恢复位）",
	renderUserMarkdown: "用户消息 Markdown 渲染",
	renderUserMarkdownDesc: "你发送的消息以 Markdown 格式渲染（标题、列表、代码块等）；关闭后按纯文本显示。",
	batchOps: "会话多选",
	batchOpsDesc: "悬停空闲会话行首的空图标位出现复选框，可多选后通过任意会话三点菜单「批量删除 / 批量归档」（运行中、待交互与完成未读的行不可选）",
	smoothSection: "丝滑流式",
	smoothEnabled: "启用丝滑流式渲染",
	smoothEnabledDesc: "由本特性渲染并跟随流式回复；关闭后使用内置渲染。",
	smoothLogFade: "字符淡入",
	smoothLogFadeDesc: "新出现的字符由透明渐入到正常色（纯绘制层，不改 DOM、不影响选择与复制）。",
	smoothMotionPreference: "动效偏好",
	smoothMotionPreferenceDesc: "系统「减弱动态效果」的遵循方式。某些环境会强制打开且无法关闭，此时可选「强制平滑」覆盖。",
	smoothMotionAuto: "跟随系统",
	smoothMotionForceSmooth: "强制平滑",
	smoothMotionForceReduced: "强制原始文本",
	serviceMonitor: "服务监控",
	serviceMonitorCardDesc: "监控对话中启动的本地服务与自定义监控项",
	serviceMonitorDesc: "左侧会话列表与设置之间显示对话中启动的本地服务（绿色圆点 + 地址，悬停查询监听进程，点击定位进程目录）",
	serviceMonitorInterval: "刷新间隔",
	serviceMonitorIntervalDesc: "监控面板轮询主机快照的间隔；范围 2–300 秒",
	serviceMonitorIntervalUnit: "秒",
	serviceTargetsLabel: "自定义监控项",
	serviceTargetsDesc: "名字和地址都是文本框，可随时修改（回车或失焦保存，地址无效标红不保存）；条目常驻监控面板：在线绿点、离线灰点，悬停查询监听进程，点击定位进程目录",
	serviceTargetNamePlaceholder: "名字（可空）",
	serviceTargetAddrPlaceholder: "127.0.0.1:81",
	serviceTargetAdd: "添加",
	serviceTargetRemove: "删除",
	serviceTargetInvalid: "地址无效或非本机回环地址；支持 127.0.0.1:81 / localhost:3000 / [::1]:8080"
};
const SETTINGS_EN = {
	nav: "Enhancements",
	sectionIntro: "Configure UI enhancements and layout.",
	zhComplete: "Chinese completion",
	zhCompleteDesc: "Fix leftover English in the Chinese UI and normalize terms/formats",
	statsFull: "Full stats line",
	statsFullDesc: "Keep the chat stats line on one row, fully visible (auto font fit)",
	thinkingAuto: "Auto-expand latest thinking",
	thinkingAutoDesc: "While thinking streams in, expand the newest output and collapse the previous one (Chinese UI only)",
	thinkMaxLines: "Default expanded lines",
	thinkMaxLinesDesc: "Show only N lines of an expanded thinking block; the rest collapses (reduces UI lag on very long thinking); 0 disables the limit",
	thinkMaxLinesUnit: "lines",
	thinkMaxLinesFrom: "Collapse direction",
	thinkMaxLinesFromDesc: "Show the beginning or the end of the thinking by default",
	thinkMaxLinesFromLatest: "Latest N lines",
	thinkMaxLinesFromEarliest: "Earliest N lines",
	thinkExpandMore: "Expand {n} more lines ({m} left)",
	thinkExpandRest: "Expand all ({n} more lines)",
	thinkMode: "Expand mode",
	thinkModeDesc: "Button mode: click \"expand\" to reveal more lines; scroll mode: the folded body gets its own scrollbar, use the mouse wheel to browse",
	thinkModeButton: "Button mode",
	thinkModeScroll: "Scroll mode",
	chatWidth: "Chat width",
	chatWidthDesc: "When enabled, set the chat column width by percent on large screens (≥1200px); side margins split evenly",
	chatWidthPercent: "Percent",
	autoArchive: "Auto-archive old sessions",
	autoArchiveDesc: "When the New Session view opens, archive sessions inactive for more than the set days (hide from lists only; logs stay). Set 0 to disable this feature",
	autoArchiveUnit: "days",
	autoArchiveNotified: "{n} session(s) archived",
	archiveView: "Archived session view",
	archiveViewDesc: "Add an \"Archive\" button to each workspace row: clicking it hides the group's normal sessions and shows archived session rows inside the official list (scrolls with the list, sorted by most recent activity, 5 by default, 5 more per expand); the row menu has Rename / Fork / Unarchive / Delete, and clicking an archived row restores and opens it",
	otherFeatures: "Other features",
	deleteSession: "Session delete button",
	deleteSessionDesc: "Show \"Delete session\" in the session row menu (log moves to system recycle bin; no restore position)",
	renderUserMarkdown: "Markdown rendering",
	renderUserMarkdownDesc: "Render the messages you send as Markdown (headings, lists, code blocks); off = plain text.",
	batchOps: "Session multi-select",
	batchOpsDesc: "Hover the empty leading icon slot of an idle session row to check it; with sessions selected, any row menu offers \"Delete selected / Archive selected\" (running, pending-interaction and unread-completion rows are not selectable)",
	smoothSection: "Smooth streaming",
	smoothEnabled: "Enable smooth streaming",
	smoothEnabledDesc: "Let this feature render and follow streaming replies. Turn off to use the built-in renderer.",
	smoothLogFade: "Character fade-in",
	smoothLogFadeDesc: "Newly revealed characters fade from transparent to their normal color (paint-only; DOM, selection and copy are untouched).",
	smoothMotionPreference: "Motion preference",
	smoothMotionPreferenceDesc: "How the system \"reduce motion\" preference is honoured. Some environments force it on with no way to turn it off; choose Force smooth to override.",
	smoothMotionAuto: "Follow system",
	smoothMotionForceSmooth: "Force smooth",
	smoothMotionForceReduced: "Force raw text",
	serviceMonitor: "Service monitor",
	serviceMonitorCardDesc: "Watch locally started services and custom entries",
	serviceMonitorDesc: "Show locally started services between the session list and Settings in the sidebar (green dot + address; hover resolves the listening process, click reveals the process folder)",
	serviceMonitorInterval: "Refresh interval",
	serviceMonitorIntervalDesc: "How often the sidebar panel polls the host snapshot; 2-300 seconds",
	serviceMonitorIntervalUnit: "s",
	serviceTargetsLabel: "Custom watch entries",
	serviceTargetsDesc: "Name and address are editable text boxes, change them anytime (Enter or blur saves; invalid addresses are outlined red and not saved); entries stay in the panel permanently: green dot when online, gray dot when offline, hover resolves the listening process, click reveals the process folder",
	serviceTargetNamePlaceholder: "Name (optional)",
	serviceTargetAddrPlaceholder: "127.0.0.1:81",
	serviceTargetAdd: "Add",
	serviceTargetRemove: "Remove",
	serviceTargetInvalid: "Invalid or non-loopback address; use 127.0.0.1:81 / localhost:3000 / [::1]:8080"
};
//#endregion
//#region src/client/zh/store/settings-store.ts
/** Sentinel value when the scope is not yet available. */
const SCOPE_PENDING = Object.freeze({
	zhComplete: ZH_SETTINGS_DEFAULTS.zhComplete,
	statsFull: ZH_SETTINGS_DEFAULTS.statsFull,
	chatWidthEnabled: ZH_SETTINGS_DEFAULTS.chatWidthEnabled,
	chatWidth: ZH_SETTINGS_DEFAULTS.chatWidth,
	thinkingAuto: ZH_SETTINGS_DEFAULTS.thinkingAuto,
	thinkMaxLines: ZH_SETTINGS_DEFAULTS.thinkMaxLines,
	thinkMaxLinesFrom: ZH_SETTINGS_DEFAULTS.thinkMaxLinesFrom,
	thinkMode: ZH_SETTINGS_DEFAULTS.thinkMode,
	deleteSessionEnabled: ZH_SETTINGS_DEFAULTS.deleteSessionEnabled,
	archiveViewEnabled: ZH_SETTINGS_DEFAULTS.archiveViewEnabled,
	renderUserMarkdown: ZH_SETTINGS_DEFAULTS.renderUserMarkdown,
	batchOpsEnabled: ZH_SETTINGS_DEFAULTS.batchOpsEnabled,
	serviceMonitorEnabled: ZH_SETTINGS_DEFAULTS.serviceMonitorEnabled,
	serviceMonitorIntervalSec: ZH_SETTINGS_DEFAULTS.serviceMonitorIntervalSec,
	serviceMonitorTargets: ZH_SETTINGS_DEFAULTS.serviceMonitorTargets,
	serviceMonitorSettingsOpen: ZH_SETTINGS_DEFAULTS.serviceMonitorSettingsOpen
});
/** Clamp a numeric setting within [min, max]. */
function clamp$1(n, min, max) {
	return Math.max(min, Math.min(max, Math.round(n)));
}
/**
* Normalize user-defined monitored targets: keep only structurally valid
* `{ name, host, port }` items (guards against hand-edited scope data).
*/
function normalizeServiceTargets(value) {
	if (!Array.isArray(value)) return [];
	const result = [];
	for (let i = 0; i < value.length && result.length < 100; i += 1) {
		const item = value[i];
		if (item === null || typeof item !== "object") continue;
		const name = typeof item.name === "string" ? item.name.slice(0, 60) : "";
		const host = typeof item.host === "string" ? item.host.trim().slice(0, 100) : "";
		const port = typeof item.port === "number" ? Math.round(item.port) : 0;
		if (host === "" || port < 1 || port > 65535) continue;
		result.push({
			name,
			host,
			port
		});
	}
	return result;
}
/**
* Normalize a snapshot from the scope into the exact shape we use.
* The scope's getSnapshot() returns a `{ status, value, user }` wrapper
* (the same shape the host reads as snapshot.value), so the section fields
* live under `.value`; a wrapper whose status is not 'ready' yields defaults.
*/
function normalize(raw) {
	const wrapped = typeof raw === "object" && raw !== null ? raw : void 0;
	const snap = wrapped !== void 0 && wrapped.status === "ready" && wrapped.value !== null && typeof wrapped.value === "object" ? wrapped.value : {};
	return {
		zhComplete: snap.zhComplete !== false,
		statsFull: snap.statsFull !== false,
		chatWidthEnabled: snap.chatWidthEnabled !== false,
		chatWidth: clamp$1(snap.chatWidth ?? ZH_SETTINGS_DEFAULTS.chatWidth, 50, 100),
		thinkingAuto: snap.thinkingAuto !== false,
		thinkMaxLines: clamp$1(snap.thinkMaxLines ?? ZH_SETTINGS_DEFAULTS.thinkMaxLines, 0, 200),
		thinkMaxLinesFrom: snap.thinkMaxLinesFrom === "earliest" ? "earliest" : ZH_SETTINGS_DEFAULTS.thinkMaxLinesFrom,
		thinkMode: snap.thinkMode === "scroll" ? "scroll" : ZH_SETTINGS_DEFAULTS.thinkMode,
		deleteSessionEnabled: snap.deleteSessionEnabled !== false,
		archiveViewEnabled: snap.archiveViewEnabled !== false,
		renderUserMarkdown: snap.renderUserMarkdown === true,
		batchOpsEnabled: snap.batchOpsEnabled !== false,
		serviceMonitorEnabled: snap.serviceMonitorEnabled === true,
		serviceMonitorIntervalSec: typeof snap.serviceMonitorIntervalSec === "number" ? clamp$1(snap.serviceMonitorIntervalSec, 2, 300) : ZH_SETTINGS_DEFAULTS.serviceMonitorIntervalSec,
		serviceMonitorTargets: normalizeServiceTargets(snap.serviceMonitorTargets),
		serviceMonitorSettingsOpen: snap.serviceMonitorSettingsOpen === true
	};
}
/** The shared settings store for the zh feature. */
var SettingsStore = class {
	_scope = null;
	_snapshot = SCOPE_PENDING;
	_listeners = [];
	/** Bind to a settingsScope (called once from apply). */
	bind(scope) {
		if (this._scope === scope) return;
		if (this._scope) {
			this._scope = null;
			this._snapshot = SCOPE_PENDING;
		}
		this._scope = scope;
		const tryRead = () => {
			if (this._scope === null) return;
			try {
				const raw = this._scope.getSnapshot();
				if (raw !== null && raw !== void 0) this._snapshot = normalize(raw);
			} catch {}
		};
		tryRead();
		if (this._scope && typeof this._scope.subscribe === "function") this._scope.subscribe(() => {
			tryRead();
			this._notify();
		});
	}
	getSnapshot() {
		return this._snapshot;
	}
	subscribe(listener) {
		this._listeners.push(listener);
		return () => {
			const i = this._listeners.indexOf(listener);
			if (i !== -1) this._listeners.splice(i, 1);
		};
	}
	set(field, value) {
		if (this._scope === null) return;
		let normalized = value;
		if (field === "chatWidth") normalized = clamp$1(Number(value), 50, 100);
		else if (field === "thinkMaxLines") normalized = clamp$1(Number(value), 0, 200);
		else if (field === "serviceMonitorIntervalSec") normalized = clamp$1(Number(value), 2, 300);
		else if (field === "serviceMonitorTargets") normalized = normalizeServiceTargets(value);
		else if (field === "zhComplete" || field === "statsFull" || field === "thinkingAuto" || field === "deleteSessionEnabled" || field === "archiveViewEnabled" || field === "chatWidthEnabled" || field === "renderUserMarkdown" || field === "batchOpsEnabled" || field === "serviceMonitorEnabled" || field === "serviceMonitorSettingsOpen") normalized = Boolean(value);
		else if (field === "thinkMaxLinesFrom") normalized = value === "earliest" ? "earliest" : "latest";
		else if (field === "thinkMode") normalized = value === "scroll" ? "scroll" : "button";
		const next = Object.assign({}, this._snapshot);
		next[field] = normalized;
		this._snapshot = next;
		this._notify();
		this._scope.set(field, normalized);
	}
	_notify() {
		for (const listener of this._listeners.slice()) listener();
	}
};
const settingsStore = new SettingsStore();
//#endregion
//#region src/client/zh/logic/service-monitor.ts
const SERVICE_MONITOR_CSS = [
	"[data-dsh-zh-service-monitor]{flex:none;display:flex;flex-direction:column;",
	"margin:0 var(--dsh-sidebar-inline-padding,12px) 6px;padding:8px 0 2px;",
	"border-top:1px solid var(--dsw-alias-border-l2,rgba(127,127,127,0.28));",
	"font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,inherit)}",
	"[data-dsh-zh-service-monitor][data-hidden=\"true\"]{display:none}",
	"[data-dsh-zh-service-monitor][data-rail=\"true\"]{display:none!important}",
	"[data-dsh-zh-sm-head]{display:flex;align-items:center;gap:6px;padding:2px 6px 6px;",
	"color:var(--dsw-alias-label-tertiary,#666);font-weight:600;user-select:none}",
	"[data-dsh-zh-sm-count]{margin-left:auto;flex:none;min-width:18px;text-align:center;",
	"padding:0 5px;border-radius:9px;font-weight:500;font-variant-numeric:tabular-nums;",
	"background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,0.14))}",
	"[data-dsh-zh-sm-list]{display:flex;flex-direction:column;max-height:190px;overflow-y:auto;overscroll-behavior:contain}",
	"[data-dsh-zh-sm-item]{display:flex;align-items:center;gap:8px;padding:5px 6px;margin:0;",
	"border:0;border-radius:8px;background:transparent;cursor:pointer;font:inherit;",
	"font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary,inherit);text-align:left}",
	"[data-dsh-zh-sm-item]:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,0.12))}",
	"[data-dsh-zh-sm-item]:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#4D6BFE);outline-offset:-2px}",
	"[data-dsh-zh-sm-item][data-online=\"false\"]{cursor:default}",
	"[data-dsh-zh-sm-item][data-online=\"false\"]:hover{background:transparent}",
	"[data-dsh-zh-sm-item][data-online=\"false\"]:focus-visible{outline:none}",
	"[data-dsh-zh-sm-item][data-owner=\"false\"]{cursor:default}",
	"[data-dsh-zh-sm-dot]{flex:none;width:7px;height:7px;border-radius:50%;",
	"background:var(--dsw-alias-state-success-primary,#22c55e);",
	"box-shadow:0 0 0 3px rgba(34,197,94,0.16);animation:dsh-zh-sm-pulse 2.4s ease-in-out infinite}",
	"[data-dsh-zh-sm-item][data-online=\"false\"] [data-dsh-zh-sm-dot]{background:var(--dsw-alias-border-l2,rgba(127,127,127,0.45));animation:none;box-shadow:none}",
	"[data-dsh-zh-sm-body]{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px}",
	"[data-dsh-zh-sm-name]{font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;",
	"color:var(--dsw-alias-label-primary,inherit)}",
	"[data-dsh-zh-sm-addr]{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;",
	"font-variant-numeric:tabular-nums}",
	"[data-dsh-zh-sm-time]{margin-left:auto;flex:none;color:var(--dsw-alias-label-tertiary,#666);font-size:11px}",
	"[data-dsh-zh-sm-tooltip]{position:fixed;z-index:2147483000;display:none;max-width:460px;padding:7px 10px;",
	"border-radius:8px;background:rgba(26,27,32,0.96);color:#f2f3f5;font-size:12px;line-height:19px;",
	"white-space:pre-line;text-align:left;pointer-events:none;box-shadow:0 6px 20px rgba(0,0,0,0.28);",
	"font-family:inherit;word-break:break-all}",
	"@keyframes dsh-zh-sm-pulse{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,0.16)}50%{box-shadow:0 0 0 5px rgba(34,197,94,0.05)}}",
	"@media (prefers-reduced-motion: reduce){[data-dsh-zh-sm-dot]{animation:none}}"
].join("");
const SERVICE_MONITOR_COPY = {
	zh: {
		title: "服务监控",
		autoTitle: "{addr} · 监听 {time}",
		ownerLine: "{name}（PID {pid}）",
		ownerCmd: "命令行：{cmd}",
		ownerHttpSys: "经 http.sys 内核队列定位",
		ownerMissing: "未定位到监听进程",
		ownerResolving: "正在查询监听进程…",
		hoverHint: "悬停查询监听进程",
		openHint: "点击打开进程所在目录",
		itemAria: "服务 {addr}",
		targetHead: "{name}（{addr}）",
		targetOfflineTitle: "{name}（{addr}）离线",
		targetAria: "服务 {name} {addr}",
		offline: "离线",
		timeNow: "刚刚",
		timeMinutes: "{n} 分钟",
		timeHours: "{n} 小时",
		timeDays: "{n} 天"
	},
	en: {
		title: "Service monitor",
		autoTitle: "{addr} · listening {time}",
		ownerLine: "{name} (PID {pid})",
		ownerCmd: "Command line: {cmd}",
		ownerHttpSys: "resolved via http.sys kernel queue",
		ownerMissing: "owning process not resolved",
		ownerResolving: "resolving listening process…",
		hoverHint: "hover to resolve the listening process",
		openHint: "click to reveal the process folder",
		itemAria: "Service {addr}",
		targetHead: "{name} ({addr})",
		targetOfflineTitle: "{name} ({addr}) offline",
		targetAria: "Service {name} {addr}",
		offline: "offline",
		timeNow: "now",
		timeMinutes: "{n}min",
		timeHours: "{n}h",
		timeDays: "{n}d"
	}
};
const SERVICE_POLL_DEFAULT_SEC = 10;
const SERVICE_RAIL_WIDTH_PX = 120;
const SERVICE_MAX_ITEMS = 50;
const SERVICE_INTERVAL_MIN_SEC = 2;
const SERVICE_INTERVAL_MAX_SEC = 300;
function parseServiceAddress(text) {
	if (typeof text !== "string") return null;
	const trimmed = text.trim();
	if (trimmed === "" || trimmed.length > 120) return null;
	let host = "";
	let portText = "";
	if (trimmed.startsWith("[")) {
		const close = trimmed.indexOf("]");
		if (close === -1 || close === 1) return null;
		host = trimmed.slice(0, close + 1);
		const rest = trimmed.slice(close + 1);
		if (!rest.startsWith(":") || rest.length === 1) return null;
		portText = rest.slice(1);
	} else {
		const colon = trimmed.lastIndexOf(":");
		if (colon === -1 || colon === 0 || colon === trimmed.length - 1) return null;
		host = trimmed.slice(0, colon);
		portText = trimmed.slice(colon + 1);
		if ((host.match(/:/g) || []).length > 0) return null;
	}
	if (!/^\d{1,5}$/.test(portText)) return null;
	const port = Number.parseInt(portText, 10);
	if (port < 1 || port > 65535) return null;
	if (/[\s/\\]/.test(host)) return null;
	return {
		host,
		port
	};
}
function isLoopbackServiceHost(host) {
	const normalized = String(host).toLowerCase();
	if (normalized === "localhost" || normalized === "::1" || normalized === "[::1]") return true;
	const octets = normalized.split(".");
	if (octets.length !== 4 || octets[0] !== "127") return false;
	return octets.every(function(octet) {
		return /^\d{1,3}$/.test(octet) && Number.parseInt(octet, 10) <= 255;
	});
}
function serviceElapsedText(copy, since, now) {
	const seconds = Math.max(0, Math.floor((now - since) / 1e3));
	if (seconds < 60) return copy.timeNow;
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return copy.timeMinutes.replace("{n}", String(minutes));
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return copy.timeHours.replace("{n}", String(hours));
	return copy.timeDays.replace("{n}", String(Math.floor(hours / 24)));
}
function orderedPanelEntries(items, targets) {
	const onlineTargets = [];
	const offlineTargets = [];
	for (let i = 0; i < targets.length; i += 1) {
		const target = targets[i];
		if (target === null || typeof target !== "object") continue;
		if (target.online === true) onlineTargets.push(target);
		else offlineTargets.push(target);
	}
	const ordered = [];
	for (let i = 0; i < items.length; i += 1) ordered.push({
		isTarget: false,
		entry: items[i]
	});
	for (let i = 0; i < onlineTargets.length; i += 1) ordered.push({
		isTarget: true,
		entry: onlineTargets[i]
	});
	for (let i = 0; i < offlineTargets.length; i += 1) ordered.push({
		isTarget: true,
		entry: offlineTargets[i]
	});
	return ordered;
}
function ownerTipText(copy, headText, state, owner) {
	if (state === "owner") return describeServiceOwner(copy, headText, owner).title;
	if (state === "resolving") return headText + "\n" + copy.ownerResolving;
	if (state === "none") return headText + "\n" + copy.ownerMissing;
	return headText + "\n" + copy.hoverHint;
}
function describeServiceOwner(copy, headText, owner) {
	const lines = [headText];
	if (owner === null || typeof owner !== "object") {
		lines.push(copy.ownerMissing);
		return {
			title: lines.join("\n"),
			canOpen: false
		};
	}
	const name = typeof owner.name === "string" ? owner.name : "";
	const path = typeof owner.path === "string" ? owner.path : "";
	const cmdline = typeof owner.cmdline === "string" ? owner.cmdline : "";
	const pid = typeof owner.pid === "number" && Number.isFinite(owner.pid) ? String(owner.pid) : "?";
	if (name !== "") lines.push(copy.ownerLine.replace("{name}", name).replace("{pid}", pid));
	if (path !== "") lines.push(path);
	if (cmdline !== "") lines.push(copy.ownerCmd.replace("{cmd}", cmdline));
	if (owner.via === "http.sys") lines.push(copy.ownerHttpSys);
	const canOpen = path !== "";
	lines.push(canOpen ? copy.openHint : copy.ownerMissing);
	return {
		title: lines.join("\n"),
		canOpen
	};
}
function openServiceOwnerDirectory(address, port) {
	try {
		fetch("/dsh-zh/api/service-monitor/open", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				address,
				port
			})
		}).catch(function() {});
	} catch {}
}
function installServiceMonitor(ctx) {
	let activeDispose = null;
	const stopServiceMonitor = function() {
		if (activeDispose === null) return;
		const dispose = activeDispose;
		activeDispose = null;
		try {
			dispose();
		} catch {}
	};
	const syncEnabled = function() {
		if (typeof settingsStore !== "undefined" && settingsStore !== null && settingsStore.getSnapshot().serviceMonitorEnabled === true) {
			if (activeDispose === null) activeDispose = runServiceMonitor(ctx);
		} else stopServiceMonitor();
	};
	ctx.effect(function() {
		syncEnabled();
		const unsub = typeof settingsStore !== "undefined" && settingsStore !== null && typeof settingsStore.subscribe === "function" ? settingsStore.subscribe(syncEnabled) : null;
		return function() {
			if (unsub !== null && typeof unsub === "function") unsub();
			stopServiceMonitor();
		};
	}, "dsh-zh: 服务监控开关");
}
function runServiceMonitor(ctx) {
	if (typeof document === "undefined" || typeof MutationObserver === "undefined") return function() {};
	if (typeof document.body === "undefined" || document.body === null) return function() {};
	if (typeof document.querySelector !== "function") return function() {};
	const localeService = ctx.get("locale");
	const activeIsZh = function() {
		try {
			return localeService !== void 0 && localeService !== null && typeof localeService.getLocale === "function" && localeService.getLocale().active === "zh";
		} catch {
			return false;
		}
	};
	const resolveCopy = function() {
		return SERVICE_MONITOR_COPY[activeIsZh() ? "zh" : "en"];
	};
	let lastValue = null;
	const localeUnsubscribe = localeService !== void 0 && localeService !== null && typeof localeService.subscribe === "function" ? localeService.subscribe(function() {
		render(lastValue);
	}) : null;
	let styleEl = null;
	const ensureStyles = function() {
		if (typeof document.head === "undefined" || document.head === null) return;
		try {
			if (styleEl !== null && document.head.contains(styleEl)) return;
			styleEl = document.createElement("style");
			styleEl.setAttribute("data-plugin", "deepseek-harness-zh_pro");
			styleEl.setAttribute("data-plugin-css", "dsh-zh/service-monitor.css");
			styleEl.textContent = SERVICE_MONITOR_CSS;
			document.head.appendChild(styleEl);
		} catch {}
	};
	const findFootArea = function() {
		try {
			const seat = document.querySelector("[data-slot=\"sidebar.settings\"]");
			if (seat === null || seat.parentElement === null) return null;
			const footArea = seat.parentElement.parentElement;
			if (footArea === null || footArea.parentNode === null) return null;
			return footArea;
		} catch {
			return null;
		}
	};
	let panel = null;
	let listEl = null;
	let countEl = null;
	let titleEl = null;
	let railObserver = null;
	const buildPanel = function() {
		panel = document.createElement("div");
		panel.setAttribute("data-dsh-zh-service-monitor", "");
		panel.setAttribute("data-hidden", "true");
		const head = document.createElement("div");
		head.setAttribute("data-dsh-zh-sm-head", "");
		titleEl = document.createElement("span");
		head.appendChild(titleEl);
		countEl = document.createElement("span");
		countEl.setAttribute("data-dsh-zh-sm-count", "");
		head.appendChild(countEl);
		listEl = document.createElement("div");
		listEl.setAttribute("data-dsh-zh-sm-list", "");
		panel.appendChild(head);
		panel.appendChild(listEl);
		listEl.addEventListener("scroll", function() {
			hideTip();
		}, { passive: true });
	};
	const rowByKey = /* @__PURE__ */ new Map();
	const rowClickHandlers = /* @__PURE__ */ new Map();
	const rowMeta = /* @__PURE__ */ new Map();
	const ownerStates = /* @__PURE__ */ new Map();
	let tipEl = null;
	let tipForKey = null;
	const makeRow = function(key) {
		const row = document.createElement("button");
		row.type = "button";
		row.setAttribute("data-dsh-zh-sm-item", "");
		const dot = document.createElement("span");
		dot.setAttribute("data-dsh-zh-sm-dot", "");
		const body = document.createElement("span");
		body.setAttribute("data-dsh-zh-sm-body", "");
		const nameEl = document.createElement("span");
		nameEl.setAttribute("data-dsh-zh-sm-name", "");
		body.appendChild(nameEl);
		const addrEl = document.createElement("span");
		addrEl.setAttribute("data-dsh-zh-sm-addr", "");
		body.appendChild(addrEl);
		const time = document.createElement("span");
		time.setAttribute("data-dsh-zh-sm-time", "");
		row.appendChild(dot);
		row.appendChild(body);
		row.appendChild(time);
		row.addEventListener("mouseenter", function() {
			const meta = rowMeta.get(key);
			if (meta === void 0 || meta.online !== true) return;
			showTip(row, key);
			requestOwner(key);
		}, false);
		row.addEventListener("mouseleave", function() {
			hideTip();
		}, false);
		row.addEventListener("focus", function() {
			const meta = rowMeta.get(key);
			if (meta === void 0 || meta.online !== true) return;
			showTip(row, key);
			requestOwner(key);
		}, false);
		row.addEventListener("blur", function() {
			hideTip();
		}, false);
		row.addEventListener("click", function(event) {
			event.preventDefault();
			const handler = rowClickHandlers.get(key);
			if (typeof handler === "function") handler();
		}, false);
		return row;
	};
	const ensureTip = function() {
		if (tipEl !== null && tipEl.parentNode !== null) return;
		tipEl = document.createElement("div");
		tipEl.setAttribute("data-dsh-zh-sm-tooltip", "");
		(document.body || document.documentElement).appendChild(tipEl);
	};
	const hideTip = function() {
		if (tipEl !== null) {
			tipEl.style.display = "none";
			tipEl.textContent = "";
		}
		tipForKey = null;
	};
	const showTip = function(row, key) {
		if (tipEl === null) return;
		const meta = rowMeta.get(key);
		if (meta === void 0) return;
		const state = ownerStates.get(key);
		const stateKind = state === void 0 ? "idle" : state.state;
		const owner = state !== void 0 && state.state === "owner" ? state.owner : null;
		tipEl.textContent = ownerTipText(resolveCopy(), meta.online === true ? meta.headText : meta.offlineText, stateKind, owner);
		tipEl.style.display = "block";
		tipForKey = key;
		const rect = row.getBoundingClientRect();
		const tipRect = tipEl.getBoundingClientRect();
		let x = rect.left;
		let y = rect.bottom + 6;
		if (x + tipRect.width > window.innerWidth - 8) x = Math.max(8, window.innerWidth - tipRect.width - 8);
		if (y + tipRect.height > window.innerHeight - 8) y = Math.max(8, rect.top - tipRect.height - 6);
		tipEl.style.left = Math.round(x) + "px";
		tipEl.style.top = Math.round(y) + "px";
	};
	const applyOwnerToRow = function(key) {
		const row = rowByKey.get(key);
		if (row === void 0) return;
		const state = ownerStates.get(key);
		const clickable = state !== void 0 && state.state === "owner" && state.owner !== null && typeof state.owner.path === "string" && state.owner.path !== "";
		row.setAttribute("data-owner", clickable ? "true" : "false");
		row.tabIndex = clickable ? 0 : -1;
		rowClickHandlers.set(key, clickable ? function() {
			const meta = rowMeta.get(key);
			if (meta !== void 0) openServiceOwnerDirectory(meta.queryAddress, meta.port);
		} : null);
	};
	const requestOwner = function(key) {
		const meta = rowMeta.get(key);
		if (meta === void 0 || meta.online !== true) return;
		const existing = ownerStates.get(key);
		if (existing !== void 0 && existing.state !== "idle") return;
		ownerStates.set(key, {
			state: "resolving",
			owner: null
		});
		if (tipForKey === key) showTip(rowByKey.get(key), key);
		let pending = null;
		try {
			pending = fetch("/dsh-zh/api/service-monitor/resolve", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					address: meta.queryAddress,
					port: meta.port
				})
			});
		} catch {
			ownerStates.set(key, {
				state: "none",
				owner: null
			});
			applyOwnerToRow(key);
			return;
		}
		pending.then(function(response) {
			if (!response.ok) return null;
			return response.json();
		}).then(function(parsed) {
			const owner = parsed !== null && typeof parsed === "object" && parsed.ok === true && parsed.value !== null && typeof parsed.value === "object" ? parsed.value.owner === null ? null : parsed.value.owner : null;
			ownerStates.set(key, {
				state: owner !== null ? "owner" : "none",
				owner
			});
			applyOwnerToRow(key);
			if (tipForKey === key) showTip(rowByKey.get(key), key);
		}).catch(function() {
			ownerStates.set(key, {
				state: "none",
				owner: null
			});
			applyOwnerToRow(key);
			if (tipForKey === key) showTip(rowByKey.get(key), key);
		});
	};
	const syncRows = function(desired) {
		const keep = /* @__PURE__ */ new Set();
		for (const spec of desired) keep.add(spec.key);
		for (const entry of Array.from(rowByKey)) {
			const key = entry[0];
			const row = entry[1];
			if (keep.has(key) && row.parentNode === listEl) continue;
			if (row.parentNode !== null) row.parentNode.removeChild(row);
			rowByKey.delete(key);
			rowClickHandlers.delete(key);
			rowMeta.delete(key);
			ownerStates.delete(key);
			if (tipForKey === key) hideTip();
		}
		for (let i = 0; i < desired.length; i += 1) {
			const spec = desired[i];
			let row = rowByKey.get(spec.key);
			if (row === void 0) {
				row = makeRow(spec.key);
				rowByKey.set(spec.key, row);
			}
			if (spec.isTarget) row.setAttribute("data-target", "true");
			else row.removeAttribute("data-target");
			row.setAttribute("data-addr", spec.addr);
			row.setAttribute("data-online", spec.online ? "true" : "false");
			row.setAttribute("data-owner", spec.clickable ? "true" : "false");
			row.setAttribute("aria-label", spec.aria);
			row.tabIndex = spec.clickable ? 0 : -1;
			const nameEl = row.querySelector("[data-dsh-zh-sm-name]");
			const addrEl = row.querySelector("[data-dsh-zh-sm-addr]");
			const time = row.querySelector("[data-dsh-zh-sm-time]");
			if (nameEl !== null) {
				nameEl.textContent = spec.isTarget ? spec.lineText : "";
				nameEl.style.display = spec.isTarget ? "" : "none";
			}
			if (addrEl !== null) {
				addrEl.textContent = spec.isTarget ? "" : spec.addr;
				addrEl.style.display = spec.isTarget ? "none" : "";
			}
			if (time !== null) time.textContent = spec.timeText;
			rowMeta.set(spec.key, {
				addr: spec.addr,
				queryAddress: spec.queryAddress,
				port: spec.port,
				online: spec.online,
				headText: spec.headText,
				offlineText: spec.offlineText
			});
			rowClickHandlers.set(spec.key, spec.clickable ? spec.onClick : null);
			if (listEl.childNodes[i] !== row) listEl.appendChild(row);
		}
	};
	const render = function(value) {
		if (panel === null || listEl === null || titleEl === null || countEl === null) return;
		const copy = resolveCopy();
		const items = value !== null && typeof value === "object" && Array.isArray(value.items) ? value.items.slice(0, SERVICE_MAX_ITEMS) : [];
		const targets = value !== null && typeof value === "object" && Array.isArray(value.targets) ? value.targets.slice(0, 100) : [];
		titleEl.textContent = copy.title;
		if (items.length === 0 && targets.length === 0) {
			panel.setAttribute("data-hidden", "true");
			if (listEl.firstChild !== null) listEl.textContent = "";
			rowByKey.clear();
			rowClickHandlers.clear();
			rowMeta.clear();
			ownerStates.clear();
			hideTip();
			return;
		}
		panel.setAttribute("data-hidden", "false");
		countEl.textContent = String(items.length + targets.length);
		const now = Date.now();
		const desired = [];
		const ordered = orderedPanelEntries(items, targets);
		for (let i = 0; i < ordered.length; i += 1) {
			const kind = ordered[i];
			if (kind.isTarget) {
				const target = kind.entry;
				const name = typeof target.name === "string" ? target.name : "";
				const host = typeof target.host === "string" ? target.host : "";
				const port = typeof target.port === "number" ? Math.round(target.port) : 0;
				if (host === "" || port < 1 || port > 65535) continue;
				const online = target.online === true;
				const addrText = host + ":" + port;
				const displayName = name === "" ? addrText : name;
				const key = "t:" + addrText;
				const aria = copy.targetAria.replace("{name}", displayName).replace("{addr}", addrText);
				if (online) {
					const headText = copy.targetHead.replace("{name}", displayName).replace("{addr}", addrText);
					const state = ownerStates.get(key);
					const clickable = state !== void 0 && state.state === "owner" && state.owner !== null && typeof state.owner.path === "string" && state.owner.path !== "";
					desired.push({
						key,
						isTarget: true,
						online: true,
						clickable,
						addr: addrText,
						queryAddress: host,
						port,
						headText,
						offlineText: "",
						aria,
						timeText: copy.timeNow,
						lineText: displayName,
						onClick: clickable ? function() {
							openServiceOwnerDirectory(host, port);
						} : null
					});
				} else {
					ownerStates.delete(key);
					desired.push({
						key,
						isTarget: true,
						online: false,
						clickable: false,
						addr: addrText,
						queryAddress: host,
						port,
						headText: "",
						offlineText: copy.targetOfflineTitle.replace("{name}", displayName).replace("{addr}", addrText),
						aria,
						timeText: copy.offline,
						lineText: displayName,
						onClick: null
					});
				}
			} else {
				const item = kind.entry;
				const address = typeof item.address === "string" ? item.address : "";
				const port = typeof item.port === "number" ? Math.round(item.port) : 0;
				const since = typeof item.since === "number" ? item.since : now;
				if (address === "" || port < 1 || port > 65535) continue;
				const addrText = address + ":" + port;
				const key = "a:" + addrText;
				const timeText = serviceElapsedText(copy, since, now);
				const state = ownerStates.get(key);
				const clickable = state !== void 0 && state.state === "owner" && state.owner !== null && typeof state.owner.path === "string" && state.owner.path !== "";
				desired.push({
					key,
					isTarget: false,
					online: true,
					clickable,
					addr: addrText,
					queryAddress: address,
					port,
					headText: copy.autoTitle.replace("{addr}", addrText).replace("{time}", timeText),
					offlineText: "",
					aria: copy.itemAria.replace("{addr}", addrText),
					timeText,
					lineText: "",
					onClick: clickable ? function() {
						openServiceOwnerDirectory(address, port);
					} : null
				});
			}
		}
		const keep = /* @__PURE__ */ new Set();
		for (const spec of desired) keep.add(spec.key);
		for (const key of Array.from(ownerStates.keys())) if (!keep.has(key)) ownerStates.delete(key);
		syncRows(desired);
	};
	const watchRail = function() {
		if (railObserver !== null) return;
		if (typeof ResizeObserver !== "function" || panel === null || panel.parentNode === null) return;
		railObserver = new ResizeObserver(function(entries) {
			if (panel === null || entries.length === 0) return;
			const width = entries[entries.length - 1].contentRect.width;
			if (width > 0 && width < SERVICE_RAIL_WIDTH_PX) panel.setAttribute("data-rail", "true");
			else panel.setAttribute("data-rail", "false");
		});
		railObserver.observe(panel.parentNode);
	};
	const ensureMounted = function() {
		try {
			if (panel === null) return;
			if (panel.parentNode !== null) return;
			const footArea = findFootArea();
			if (footArea !== null) {
				footArea.parentNode.insertBefore(panel, footArea);
				watchRail();
			}
		} catch {}
	};
	const keepAlive = new MutationObserver(function() {
		if (panel !== null && panel.isConnected === true) return;
		ensureMounted();
	});
	keepAlive.observe(document.documentElement, {
		childList: true,
		subtree: true
	});
	let pollTimer = null;
	let polling = false;
	let disposed = false;
	let requestController = null;
	const readIntervalSec = function() {
		const sec = typeof settingsStore !== "undefined" && settingsStore !== null ? settingsStore.getSnapshot().serviceMonitorIntervalSec : void 0;
		if (typeof sec !== "number" || !Number.isFinite(sec)) return SERVICE_POLL_DEFAULT_SEC;
		return Math.max(SERVICE_INTERVAL_MIN_SEC, Math.min(SERVICE_INTERVAL_MAX_SEC, Math.round(sec)));
	};
	const scheduleTick = function() {
		if (disposed || pollTimer !== null) return;
		pollTimer = setTimeout(function() {
			pollTimer = null;
			if (disposed) return;
			tick();
		}, readIntervalSec() * 1e3);
	};
	const tick = function() {
		if (disposed) return;
		if (polling) {
			scheduleTick();
			return;
		}
		if (typeof document.hidden === "boolean" && document.hidden) {
			scheduleTick();
			return;
		}
		polling = true;
		const finish = function() {
			if (disposed) return;
			polling = false;
			requestController = null;
			scheduleTick();
		};
		let pending = null;
		try {
			const controller = new AbortController();
			requestController = controller;
			const targets = (typeof settingsStore !== "undefined" && settingsStore !== null && Array.isArray(settingsStore.getSnapshot().serviceMonitorTargets) ? settingsStore.getSnapshot().serviceMonitorTargets : []).map(function(item) {
				return {
					name: item.name,
					host: item.host,
					port: item.port
				};
			});
			pending = fetch("/dsh-zh/api/service-monitor", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					targets,
					intervalSec: readIntervalSec()
				}),
				signal: controller.signal
			});
		} catch {
			finish();
			return;
		}
		pending.then(function(response) {
			if (disposed) return;
			if (!response.ok) throw new Error("HTTP " + response.status);
			return response.json();
		}).then(function(parsed) {
			if (disposed) return;
			if (parsed !== null && typeof parsed === "object" && parsed.ok === true && parsed.value !== null && typeof parsed.value === "object") {
				lastValue = parsed.value;
				render(lastValue);
			}
			finish();
		}).catch(function() {
			if (disposed) return;
			finish();
		});
	};
	ensureStyles();
	ensureTip();
	buildPanel();
	ensureMounted();
	tick();
	return function() {
		disposed = true;
		if (pollTimer !== null) {
			clearTimeout(pollTimer);
			pollTimer = null;
		}
		if (requestController !== null) {
			requestController.abort();
			requestController = null;
		}
		if (keepAlive !== null) keepAlive.disconnect();
		if (railObserver !== null) {
			railObserver.disconnect();
			railObserver = null;
		}
		if (localeUnsubscribe !== null && typeof localeUnsubscribe === "function") localeUnsubscribe();
		hideTip();
		if (tipEl !== null && tipEl.parentNode !== null) tipEl.parentNode.removeChild(tipEl);
		tipEl = null;
		if (panel !== null && panel.parentNode !== null) panel.parentNode.removeChild(panel);
		panel = null;
		listEl = null;
		countEl = null;
		titleEl = null;
		if (styleEl !== null && styleEl.parentNode !== null) styleEl.parentNode.removeChild(styleEl);
		styleEl = null;
		rowByKey.clear();
		rowClickHandlers.clear();
		rowMeta.clear();
		ownerStates.clear();
		lastValue = null;
	};
}
//#endregion
//#region src/client/smooth/settings.ts
/** Default motion preference. */
const DEFAULT_MOTION_PREFERENCE = "auto";
/** Parse an unknown value into a MotionPreference (anything invalid → default). */
function toMotionPreference(value) {
	return value === "force-smooth" || value === "force-reduced" ? value : DEFAULT_MOTION_PREFERENCE;
}
let liveMotionPreference = DEFAULT_MOTION_PREFERENCE;
const motionPreferenceListeners = /* @__PURE__ */ new Set();
/** Read the live motion preference (see {@link subscribeMotionPreference}). */
function getMotionPreference() {
	return liveMotionPreference;
}
/** Publish the preference read from the settings scope to live renderers. */
function publishMotionPreference(value) {
	const next = toMotionPreference(value);
	if (next === liveMotionPreference) return;
	liveMotionPreference = next;
	for (const listener of [...motionPreferenceListeners]) listener();
}
/** Subscribe to motion-preference changes (useSyncExternalStore contract). */
function subscribeMotionPreference(listener) {
	motionPreferenceListeners.add(listener);
	return () => {
		motionPreferenceListeners.delete(listener);
	};
}
let liveLogFade = true;
const logFadeListeners = /* @__PURE__ */ new Set();
/** Read the live logarithmic-fade switch. */
function getLogFade() {
	return liveLogFade;
}
/** Publish the fade switch read from the settings scope to live renderers. */
function publishLogFade(value) {
	const next = value !== false;
	if (next === liveLogFade) return;
	liveLogFade = next;
	for (const listener of [...logFadeListeners]) listener();
}
/** Subscribe to fade-switch changes (useSyncExternalStore contract). */
function subscribeLogFade(listener) {
	logFadeListeners.add(listener);
	return () => {
		logFadeListeners.delete(listener);
	};
}
/** Defaults preserve the production engine exactly. */
const DEFAULT_STREAM_DEBUG_TUNING = {
	revealScale: 1,
	queuePressure: .85,
	maxRevealCps: 600,
	springStiffness: 130,
	springDamping: 24,
	springMass: 1,
	runwayPx: 48,
	reserveResponseMs: 180,
	backpressureMinScale: .55
};
/** Defaults shared by the client-side fallback and the settings scope. */
const DEFAULT_STREAM_SETTINGS = {
	enabled: true,
	thinkAutoExpand: true,
	debugEnabled: false,
	motionPreference: DEFAULT_MOTION_PREFERENCE,
	logarithmicFade: true,
	debugTuning: DEFAULT_STREAM_DEBUG_TUNING
};
//#endregion
//#region src/client/zh/logic/settings-section.tsx
/**
* Settings section React component for the zh feature.
*
* Prompt injection (zhPrompt / zhAgentPrompt / zhToolDesc) has been removed;
* zhAutoArchiveDays remains as the only prompt-scope field.
*/
const s = {
	section: {
		display: "flex",
		flexDirection: "column",
		gap: "12px",
		maxWidth: "720px",
		color: "var(--dsw-alias-label-primary, inherit)"
	},
	title: {
		margin: 0,
		fontSize: 18,
		lineHeight: "28px",
		fontWeight: 600,
		color: "var(--dsw-alias-label-primary, inherit)"
	},
	intro: {
		margin: 0,
		fontSize: 14,
		lineHeight: "22px",
		color: "var(--dsw-alias-label-tertiary, #666)"
	},
	rows: {
		listStyle: "none",
		margin: "8px 0 0",
		padding: 0,
		display: "flex",
		flexDirection: "column"
	},
	row: {
		display: "flex",
		alignItems: "center",
		flexWrap: "wrap",
		gap: "10px",
		padding: "14px 0",
		borderBottom: "1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.28))"
	},
	rowText: {
		flex: "1 1 180px",
		minWidth: 0,
		display: "flex",
		flexDirection: "column",
		gap: "2px"
	},
	rowTitle: {
		fontSize: 14,
		lineHeight: "22px",
		fontWeight: 500,
		color: "var(--dsw-alias-label-primary, inherit)"
	},
	desc: {
		fontSize: 12,
		lineHeight: "18px",
		color: "var(--dsw-alias-label-tertiary, #666)"
	},
	rowActions: {
		display: "inline-flex",
		alignItems: "center",
		gap: "6px",
		marginLeft: "auto"
	},
	switchBtn: {
		display: "inline-flex",
		flex: "none",
		alignItems: "center",
		justifyContent: "center",
		width: 32,
		height: 20,
		padding: 0,
		border: 0,
		borderRadius: 0,
		background: "transparent",
		cursor: "pointer"
	},
	inputNum: {
		width: 72,
		padding: "4px 8px",
		borderRadius: 8,
		border: "1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.35))",
		background: "var(--dsw-specific-input-minor, transparent)",
		color: "var(--dsw-alias-label-primary, inherit)",
		fontSize: 14,
		lineHeight: "20px",
		textAlign: "center"
	},
	select: {
		flex: "none",
		padding: "4px 8px",
		borderRadius: 8,
		border: "1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.35))",
		background: "var(--dsw-specific-input-minor, transparent)",
		color: "var(--dsw-alias-label-primary, inherit)",
		fontSize: 13,
		lineHeight: "20px"
	},
	groupHeader: {
		fontSize: 14,
		lineHeight: "22px",
		fontWeight: 600,
		color: "var(--dsw-alias-label-primary, inherit)"
	},
	group: {
		display: "flex",
		flexDirection: "column"
	}
};
function switchTrack(on) {
	return {
		position: "relative",
		display: "inline-block",
		flex: "none",
		width: 28,
		height: 16,
		borderRadius: 8,
		background: on ? "var(--dsw-alias-state-business-primary, #4D6BFE)" : "var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.45))",
		transition: "background-color 120ms"
	};
}
function switchKnob(on) {
	return {
		position: "absolute",
		top: 2,
		left: 2,
		width: 12,
		height: 12,
		borderRadius: "50%",
		background: "var(--dsw-alias-bg-layer-1, #ffffff)",
		transition: "transform 120ms",
		transform: on ? "translateX(12px)" : "translateX(0px)"
	};
}
function getPromptField(snap, key, fallback) {
	if (snap === void 0) return fallback;
	const v = snap[key];
	return v === void 0 || v === null ? fallback : v;
}
/**
* Unwrap a settingsScope snapshot: getSnapshot() returns a
* `{ status, value, user }` wrapper (the host reads snapshot.value too),
* never the raw section. Return undefined until the scope is ready and its
* value is an object — matching the source's "scope not ready = controls
* disabled" behavior.
*/
function scopeValue(snap) {
	if (snap === null || snap === void 0) return void 0;
	const s = snap;
	if (s.status !== "ready" || s.value === null || typeof s.value !== "object") return void 0;
	return s.value;
}
function ZhSettingsSectionComponent(props) {
	const { t, settings, promptSettings } = props;
	const [uiSnap, setUiSnap] = react.default.useState(() => {
		try {
			return scopeValue(settings.getSnapshot());
		} catch {
			return;
		}
	});
	const [promptSnap, setPromptSnap] = react.default.useState(() => {
		try {
			return scopeValue(promptSettings.getSnapshot());
		} catch {
			return;
		}
	});
	react.default.useEffect(() => {
		const unsubUi = settings.subscribe(() => {
			try {
				setUiSnap(scopeValue(settings.getSnapshot()));
			} catch {}
		});
		const unsubPrompt = promptSettings.subscribe(() => {
			try {
				setPromptSnap(scopeValue(promptSettings.getSnapshot()));
			} catch {}
		});
		return () => {
			unsubUi();
			unsubPrompt();
		};
	}, [settings, promptSettings]);
	const [svcDraft, setSvcDraft] = react.default.useState({
		name: "",
		addr: ""
	});
	const [svcError, setSvcError] = react.default.useState(false);
	const [svcEditDrafts, setSvcEditDrafts] = react.default.useState({});
	const [svcEditErrorIndex, setSvcEditErrorIndex] = react.default.useState(null);
	const row = (key, title, desc, control, noDivider = false) => react.default.createElement("div", {
		key,
		style: Object.assign({}, s.row, noDivider ? { borderBottom: "none" } : {})
	}, react.default.createElement("div", { style: s.rowText }, react.default.createElement("div", { style: s.rowTitle }, title), react.default.createElement("div", { style: s.desc }, desc)), react.default.createElement("div", { style: s.rowActions }, control));
	const group = (key, ...items) => react.default.createElement("div", {
		key,
		style: s.group
	}, ...items);
	const toggle = (on, onChange, disabled = false, label = "") => {
		const disabledStyle = disabled ? {
			opacity: .45,
			cursor: "not-allowed"
		} : {};
		return react.default.createElement("button", {
			type: "button",
			"aria-label": label,
			"aria-pressed": on,
			disabled: disabled === true,
			onClick: onChange,
			style: Object.assign({}, s.switchBtn, disabledStyle)
		}, react.default.createElement("span", { style: switchTrack(on) }, react.default.createElement("span", { style: switchKnob(on) })));
	};
	const numInput = (value, min, max, step, onChange, label, unit) => react.default.createElement("div", { style: {
		display: "flex",
		alignItems: "center",
		gap: "8px"
	} }, react.default.createElement("input", {
		type: "number",
		min,
		max,
		step,
		value,
		style: s.inputNum,
		"aria-label": label,
		onChange: (e) => {
			const n = parseInt(e.target.value, 10);
			if (!isNaN(n)) onChange(Math.max(min, Math.min(max, Math.round(n))));
		}
	}), unit ? react.default.createElement("span", { style: s.desc }, unit) : null);
	const selectInput = (value, options, onChange, label) => react.default.createElement("select", {
		value,
		"aria-label": label,
		style: s.select,
		onChange: (e) => onChange(e.target.value)
	}, options.map(([k, v]) => react.default.createElement("option", {
		key: k,
		value: k
	}, v)));
	const ui = uiSnap ?? {
		zhComplete: true,
		statsFull: true,
		thinkingAuto: true,
		thinkMaxLines: 20,
		thinkMaxLinesFrom: "latest",
		thinkMode: "button",
		deleteSessionEnabled: true,
		archiveViewEnabled: true,
		renderUserMarkdown: false,
		batchOpsEnabled: true,
		serviceMonitorEnabled: false,
		serviceMonitorIntervalSec: 10,
		serviceMonitorTargets: [],
		serviceMonitorSettingsOpen: false
	};
	const smoothScope = uiSnap;
	const smoothEnabled = smoothScope?.smoothEnabled !== false;
	const smoothMotionPreference = smoothScope?.smoothMotionPreference ?? "auto";
	const smoothLogFade = smoothScope?.smoothLogFadeEnabled !== false;
	const svcTargets = ui.serviceMonitorTargets ?? [];
	const setSvcTargets = (next) => {
		settings.set("serviceMonitorTargets", next);
	};
	const addServiceTarget = () => {
		const parsed = parseServiceAddress(svcDraft.addr);
		if (parsed === null || !isLoopbackServiceHost(parsed.host)) {
			setSvcError(true);
			return;
		}
		setSvcError(false);
		setSvcTargets(svcTargets.concat([{
			name: svcDraft.name.trim().slice(0, 60),
			host: parsed.host,
			port: parsed.port
		}]));
		setSvcDraft({
			name: "",
			addr: ""
		});
	};
	const removeServiceTarget = (index) => {
		const next = svcTargets.slice();
		next.splice(index, 1);
		setSvcTargets(next);
		const drafts = Object.assign({}, svcEditDrafts);
		delete drafts[String(index)];
		setSvcEditDrafts(drafts);
		if (svcEditErrorIndex === index) setSvcEditErrorIndex(null);
	};
	const commitServiceTarget = (index) => {
		const draft = svcEditDrafts[String(index)];
		if (draft === void 0) return;
		const stored = svcTargets[index];
		if (stored === null || stored === void 0) return;
		const draftName = typeof draft.name === "string" ? draft.name : stored.name;
		const parsed = parseServiceAddress(typeof draft.addr === "string" ? draft.addr : stored.host + ":" + String(stored.port));
		if (parsed === null) {
			setSvcEditErrorIndex(index);
			return;
		}
		if ((parsed.host !== stored.host || parsed.port !== stored.port) && !isLoopbackServiceHost(parsed.host)) {
			setSvcEditErrorIndex(index);
			return;
		}
		const next = svcTargets.slice();
		next.splice(index, 1, {
			name: draftName.trim().slice(0, 60),
			host: parsed.host,
			port: parsed.port
		});
		setSvcTargets(next);
		const drafts = Object.assign({}, svcEditDrafts);
		delete drafts[String(index)];
		setSvcEditDrafts(drafts);
		setSvcEditErrorIndex(null);
	};
	const svcCardStyle = (open) => ({
		border: "1px solid var(--dsw-alias-border-l2, rgba(127,127,127,0.28))",
		borderRadius: 12,
		background: open ? "var(--dsw-alias-bg-layer-2, rgba(127,127,127,0.06))" : "var(--dsw-alias-bg-layer-3, transparent)",
		borderColor: open ? "var(--dsw-alias-label-dimmed, rgba(127,127,127,0.45))" : void 0,
		transition: "border-color .16s, background .16s"
	});
	const svcCardHeadStyle = {
		width: "100%",
		appearance: "none",
		border: 0,
		background: "none",
		font: "inherit",
		color: "inherit",
		textAlign: "left",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		gap: 12,
		padding: "14px 16px",
		borderRadius: 12
	};
	const svcCardHeadTextStyle = {
		flex: "1 1 auto",
		minWidth: 0,
		display: "flex",
		flexDirection: "column",
		gap: 4
	};
	const svcCardNameStyle = {
		fontSize: 15,
		fontWeight: 600,
		lineHeight: "1.4",
		color: "var(--dsw-alias-label-primary, inherit)"
	};
	const svcCardDescStyle = {
		fontSize: 13,
		lineHeight: 1.5,
		color: "var(--dsw-alias-label-tertiary, #666)"
	};
	const svcCardBadgeStyle = {
		flex: "none",
		borderRadius: 999,
		padding: "1px 8px",
		fontSize: 11,
		lineHeight: "17px",
		fontWeight: 500,
		whiteSpace: "nowrap",
		background: "var(--dsw-alias-bg-module-platform, rgba(127,127,127,0.12))",
		color: "var(--dsw-alias-label-secondary, inherit)"
	};
	const svcChevronStyle = (open) => ({
		flex: "none",
		display: "inline-flex",
		alignItems: "center",
		color: "var(--dsw-alias-label-tertiary, #666)",
		transition: "transform .16s",
		transform: open ? "rotate(180deg)" : "rotate(0deg)"
	});
	const svcCardBodyStyle = {
		borderTop: "1px solid var(--dsw-alias-border-l2, rgba(127,127,127,0.28))",
		margin: "0 16px",
		padding: "4px 0 12px"
	};
	const svcTextNameStyle = {
		flex: "0 1 120px",
		minWidth: 0,
		boxSizing: "border-box",
		border: "1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.35))",
		background: "var(--dsw-specific-input-minor, transparent)",
		color: "var(--dsw-alias-label-primary, inherit)",
		fontSize: 13,
		lineHeight: "20px"
	};
	const svcTextAddrStyle = Object.assign({}, svcTextNameStyle, { flex: "0 1 220px" });
	const svcGhostButtonStyle = {
		flex: "none",
		padding: "4px 12px",
		borderRadius: 8,
		border: "1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.35))",
		background: "transparent",
		color: "var(--dsw-alias-label-secondary, inherit)",
		cursor: "pointer",
		font: "inherit",
		fontSize: 13,
		lineHeight: "20px"
	};
	const svcAddButtonStyle = {
		flex: "none",
		padding: "4px 14px",
		borderRadius: 8,
		border: 0,
		background: "var(--dsw-alias-state-business-primary, #4D6BFE)",
		color: "var(--dsw-alias-label-primary-inverted, #fff)",
		cursor: "pointer",
		font: "inherit",
		fontSize: 13,
		lineHeight: "20px"
	};
	const svcErrorStyle = {
		fontSize: 12,
		lineHeight: "18px",
		color: "var(--dsw-alias-state-error-primary, #d93026)"
	};
	const serviceMonitorCard = () => {
		const open = ui.serviceMonitorSettingsOpen === true;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			style: svcCardStyle(open),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-expanded": open,
				"aria-label": t("serviceMonitor"),
				onClick: () => settings.set("serviceMonitorSettingsOpen", !open),
				style: svcCardHeadStyle,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						style: svcCardHeadTextStyle,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: svcCardNameStyle,
							children: t("serviceMonitor")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: svcCardDescStyle,
							children: t("serviceMonitorCardDesc")
						})]
					}),
					svcTargets.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: svcCardBadgeStyle,
						children: String(svcTargets.length)
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: svcChevronStyle(open),
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
							width: 14,
							height: 14,
							viewBox: "0 0 14 14",
							fill: "none",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
								d: "M3.5 5.5L7 9L10.5 5.5",
								stroke: "currentColor",
								strokeWidth: 1.5,
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					})
				]
			}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: svcCardBodyStyle,
				children: [
					row("serviceMonitor", t("serviceMonitor"), t("serviceMonitorDesc"), toggle(ui.serviceMonitorEnabled, () => settings.set("serviceMonitorEnabled", !ui.serviceMonitorEnabled), false, t("serviceMonitor")), true),
					row("serviceMonitorInterval", t("serviceMonitorInterval"), t("serviceMonitorIntervalDesc"), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: "8px"
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							type: "number",
							min: 2,
							max: 300,
							step: 1,
							value: ui.serviceMonitorIntervalSec,
							style: s.inputNum,
							"aria-label": t("serviceMonitorInterval"),
							onChange: (e) => {
								const n = parseInt(e.target.value, 10);
								if (!isNaN(n)) settings.set("serviceMonitorIntervalSec", Math.max(2, Math.min(300, Math.round(n))));
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: s.desc,
							children: t("serviceMonitorIntervalUnit")
						})]
					})),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							alignItems: "stretch",
							gap: "8px"
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								style: Object.assign({}, s.rowText, { flex: "0 0 auto" }),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									style: s.rowTitle,
									children: t("serviceTargetsLabel")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									style: s.desc,
									children: t("serviceTargetsDesc")
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "8px",
									flexWrap: "wrap"
								},
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "text",
										value: svcDraft.name,
										placeholder: t("serviceTargetNamePlaceholder"),
										"aria-label": t("serviceTargetNamePlaceholder"),
										style: svcTextNameStyle,
										onChange: (e) => {
											setSvcError(false);
											setSvcDraft({
												name: e.target.value,
												addr: svcDraft.addr
											});
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "text",
										value: svcDraft.addr,
										placeholder: t("serviceTargetAddrPlaceholder"),
										"aria-label": t("serviceTargetAddrPlaceholder"),
										style: svcTextAddrStyle,
										onChange: (e) => {
											setSvcError(false);
											setSvcDraft({
												name: svcDraft.name,
												addr: e.target.value
											});
										},
										onKeyDown: (e) => {
											if (e.key === "Enter") addServiceTarget();
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => addServiceTarget(),
										style: svcAddButtonStyle,
										children: t("serviceTargetAdd")
									})
								]
							}),
							svcError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: svcErrorStyle,
								children: t("serviceTargetInvalid")
							}) : null,
							svcTargets.map((item, index) => {
								const draft = svcEditDrafts[String(index)];
								const nameValue = draft !== void 0 && typeof draft.name === "string" ? draft.name : item.name;
								const addrValue = draft !== void 0 && typeof draft.addr === "string" ? draft.addr : item.host + ":" + String(item.port);
								const invalid = svcEditErrorIndex === index;
								const setDraftField = (field) => (e) => {
									const nextDraft = Object.assign({}, {
										name: nameValue,
										addr: addrValue
									}, { [field]: e.target.value });
									const drafts = Object.assign({}, svcEditDrafts);
									drafts[String(index)] = nextDraft;
									setSvcEditDrafts(drafts);
									if (svcEditErrorIndex === index) setSvcEditErrorIndex(null);
								};
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: "8px"
									},
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "text",
											value: nameValue,
											placeholder: t("serviceTargetNamePlaceholder"),
											"aria-label": t("serviceTargetNamePlaceholder"),
											style: svcTextNameStyle,
											onChange: setDraftField("name"),
											onKeyDown: (e) => {
												if (e.key === "Enter") commitServiceTarget(index);
											},
											onBlur: () => commitServiceTarget(index)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "text",
											value: addrValue,
											placeholder: t("serviceTargetAddrPlaceholder"),
											"aria-label": t("serviceTargetAddrPlaceholder"),
											style: invalid ? Object.assign({}, svcTextAddrStyle, { borderColor: "var(--dsw-alias-state-error-primary, #d93026)" }) : svcTextAddrStyle,
											onChange: setDraftField("addr"),
											onKeyDown: (e) => {
												if (e.key === "Enter") commitServiceTarget(index);
											},
											onBlur: () => commitServiceTarget(index)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": t("serviceTargetRemove"),
											onClick: () => removeServiceTarget(index),
											style: svcGhostButtonStyle,
											children: t("serviceTargetRemove")
										})
									]
								}, "svc-target-" + String(index));
							}),
							svcEditErrorIndex !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: svcErrorStyle,
								children: t("serviceTargetInvalid")
							}) : null
						]
					}, "serviceTargets")
				]
			}) : null]
		}, "serviceMonitorCard");
	};
	return react.default.createElement("div", { style: s.section }, react.default.createElement("p", { style: s.intro }, t("sectionIntro")), react.default.createElement("div", { style: s.rows }, row("zhComplete", t("zhComplete"), t("zhCompleteDesc"), toggle(ui.zhComplete, () => settings.set("zhComplete", !ui.zhComplete))), row("statsFull", t("statsFull"), t("statsFullDesc"), toggle(ui.statsFull, () => settings.set("statsFull", !ui.statsFull))), group("thinkingGroup", row("thinkingAuto", t("thinkingAuto"), t("thinkingAutoDesc"), toggle(ui.thinkingAuto, () => settings.set("thinkingAuto", !ui.thinkingAuto)), true), row("thinkMaxLines", t("thinkMaxLines"), t("thinkMaxLinesDesc"), react.default.createElement("div", { style: {
		display: "flex",
		alignItems: "center",
		gap: "8px"
	} }, numInput(ui.thinkMaxLines, 0, 200, 1, (n) => settings.set("thinkMaxLines", n), t("thinkMaxLines"), t("thinkMaxLinesUnit")), selectInput(ui.thinkMaxLinesFrom, [["latest", t("thinkMaxLinesFromLatest")], ["earliest", t("thinkMaxLinesFromEarliest")]], (v) => settings.set("thinkMaxLinesFrom", v), t("thinkMaxLinesFrom"))), true), row("thinkMode", t("thinkMode"), t("thinkModeDesc"), selectInput(ui.thinkMode, [["button", t("thinkModeButton")], ["scroll", t("thinkModeScroll")]], (v) => settings.set("thinkMode", v), t("thinkMode")))), group("archiveGroup", row("autoArchive", t("autoArchive"), t("autoArchiveDesc"), react.default.createElement("div", { style: {
		display: "flex",
		alignItems: "center",
		gap: "8px"
	} }, numInput(getPromptField(promptSnap, "zhAutoArchiveDays", 7), 0, 365, 1, (n) => {
		promptSettings.set("zhAutoArchiveDays", n);
	}, t("autoArchive"), t("autoArchiveUnit"))), true), row("archiveView", t("archiveView"), t("archiveViewDesc"), toggle(ui.archiveViewEnabled, () => settings.set("archiveViewEnabled", !ui.archiveViewEnabled)))), react.default.createElement("div", {
		key: "otherFeatures",
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "10px",
			marginTop: "4px"
		}
	}, react.default.createElement("div", { style: s.groupHeader }, t("otherFeatures")), row("deleteSession", t("deleteSession"), t("deleteSessionDesc"), toggle(ui.deleteSessionEnabled, () => settings.set("deleteSessionEnabled", !ui.deleteSessionEnabled))), row("batchOps", t("batchOps"), t("batchOpsDesc"), toggle(ui.batchOpsEnabled, () => settings.set("batchOpsEnabled", !ui.batchOpsEnabled))), row("renderUserMarkdown", t("renderUserMarkdown"), t("renderUserMarkdownDesc"), toggle(ui.renderUserMarkdown, () => settings.set("renderUserMarkdown", !ui.renderUserMarkdown)), true)), react.default.createElement("div", {
		key: "smoothFeatures",
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "10px",
			marginTop: "4px"
		}
	}, react.default.createElement("div", { style: s.groupHeader }, t("smoothSection")), row("smoothEnabled", t("smoothEnabled"), t("smoothEnabledDesc"), toggle(smoothEnabled, () => settings.set("smoothEnabled", !smoothEnabled))), row("smoothLogFade", t("smoothLogFade"), t("smoothLogFadeDesc"), toggle(smoothLogFade, () => {
		settings.set("smoothLogFadeEnabled", !smoothLogFade);
		publishLogFade(!smoothLogFade);
	})), row("smoothMotionPreference", t("smoothMotionPreference"), t("smoothMotionPreferenceDesc"), selectInput(smoothMotionPreference, [
		["auto", t("smoothMotionAuto")],
		["force-smooth", t("smoothMotionForceSmooth")],
		["force-reduced", t("smoothMotionForceReduced")]
	], (v) => {
		settings.set("smoothMotionPreference", v);
		publishMotionPreference(v);
	}, t("smoothMotionPreference")), true)), serviceMonitorCard()));
}
//#endregion
//#region src/client/zh/logic/register-section.ts
function registerSettingsSection(zhCtx) {
	const { ctx } = zhCtx;
	const disposeEffects = [];
	const localeReg = ctx.locale.register(ZH_SETTINGS_NS, {
		zh: SETTINGS_ZH,
		en: SETTINGS_EN
	});
	disposeEffects.push(() => {
		try {
			localeReg();
		} catch {}
	});
	const t = ctx.locale.bind(ZH_SETTINGS_NS);
	const slotDispose = ctx.slots.inject("settings.section", () => ctx.slots.register({
		name: "settings.section",
		id: "zh-enhance",
		order: 50,
		label: () => t("nav"),
		locale: ZH_SETTINGS_NS,
		inject: () => ({
			settings: zhCtx.settingsScope,
			promptSettings: zhCtx.promptScope
		})
	}, ZhSettingsSectionComponent));
	disposeEffects.push(slotDispose);
	return function() {
		for (const d of disposeEffects) try {
			d();
		} catch {}
	};
}
//#endregion
//#region src/client/zh/logic/auto-archive.ts
const ZH_AUTO_ARCHIVE_DAYS_DEFAULT = 7;
function installAutoArchive(zhCtx) {
	const { ctx, promptScope } = zhCtx;
	let autoArchiveState = {
		days: ZH_AUTO_ARCHIVE_DAYS_DEFAULT,
		ready: false
	};
	let archiving = false;
	let toastTimer = null;
	let toastEl = null;
	let toastStyleEl = null;
	const readArchiveDays = () => {
		try {
			const snap = promptScope.getSnapshot();
			if (snap && typeof snap === "object" && snap.status === "ready" && snap.value !== null && typeof snap.value === "object" && snap.value !== void 0) {
				autoArchiveState.ready = true;
				const n = snap.value.zhAutoArchiveDays;
				autoArchiveState.days = typeof n === "number" ? n : ZH_AUTO_ARCHIVE_DAYS_DEFAULT;
			} else autoArchiveState.ready = false;
		} catch {
			autoArchiveState.ready = false;
		}
	};
	const ensureToastStyle = () => {
		if (toastStyleEl && document.head?.contains(toastStyleEl)) return;
		toastStyleEl = document.createElement("style");
		toastStyleEl.setAttribute("data-dsh-zh", "toast");
		toastStyleEl.textContent = [
			".dsh-zh-toast{position:fixed;top:120px;left:50%;z-index:1100;pointer-events:none;",
			"display:flex;align-items:center;gap:10px;max-width:min(560px,calc(100vw - 48px));",
			"padding:12px 16px;border-radius:14px;",
			"background:var(--dsw-alias-button-contrast-fill);",
			"color:var(--dsw-alias-label-primary-inverted);font-size:14px;line-height:22px;",
			"box-shadow:var(--dsw-shadow-lv3);transform:translateX(-50%);",
			"animation:dsh-zh-toast-in 160ms ease-out,dsh-zh-toast-fade 1000ms ease 3000ms forwards}",
			"@keyframes dsh-zh-toast-in{from{opacity:0;transform:translate(-50%,-6px)}to{opacity:1;transform:translate(-50%,0)}}",
			"@keyframes dsh-zh-toast-fade{to{opacity:0}}"
		].join("");
		document.head?.appendChild(toastStyleEl);
	};
	const showArchiveToast = (count) => {
		try {
			if (typeof document === "undefined" || document.body === null) return;
			const locale = ctx.locale;
			const text = (locale && typeof locale.getLocale === "function" && locale.getLocale().active === "zh" ? { autoArchiveNotified: "有 {n} 个会话已归档" } : { autoArchiveNotified: "{n} session(s) archived" }).autoArchiveNotified.replace("{n}", String(count));
			if (toastTimer !== null) {
				clearTimeout(toastTimer);
				toastTimer = null;
			}
			if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl);
			ensureToastStyle();
			toastEl = document.createElement("div");
			toastEl.className = "dsh-zh-toast";
			toastEl.setAttribute("role", "alert");
			toastEl.textContent = text;
			document.body.appendChild(toastEl);
			toastTimer = setTimeout(() => {
				toastTimer = null;
				if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl);
				toastEl = null;
			}, 4e3);
		} catch {}
	};
	const runArchivePass = () => {
		if (autoArchiveState.ready !== true || archiving) return;
		if (autoArchiveState.days <= 0) return;
		let sessionsSnap = null;
		let workspacesSnap = null;
		try {
			sessionsSnap = ctx.sessions.list.getSnapshot();
		} catch {}
		try {
			workspacesSnap = ctx.workspaces.list.getSnapshot();
		} catch {}
		if (!sessionsSnap || !workspacesSnap) return;
		const current = sessionsSnap.current;
		if (!current) return;
		const currentSummary = sessionsSnap.byId[current];
		if (!currentSummary || currentSummary.blank !== true) return;
		const cwd = currentSummary.cwd;
		let workspaceSessionIds = null;
		if (typeof cwd === "string" && Array.isArray(workspacesSnap.items)) {
			for (const ws of workspacesSnap.items) if (ws.path === cwd && Array.isArray(ws.sessionIds)) {
				workspaceSessionIds = ws.sessionIds;
				break;
			}
		}
		if (!workspaceSessionIds) return;
		const cutoff = Date.now() - autoArchiveState.days * 864e5;
		const candidates = [];
		const archived = workspacesSnap.archivedSessionIds ?? [];
		for (const id of workspaceSessionIds) {
			const summary = sessionsSnap.byId[id];
			if (!summary) continue;
			if (summary.running === true || summary.blank === true) continue;
			if (typeof summary.updatedAt !== "number" || summary.updatedAt > cutoff) continue;
			if (archived.includes(id)) continue;
			candidates.push(id);
		}
		if (candidates.length === 0) return;
		archiving = true;
		Promise.all(candidates.map(async (id) => {
			try {
				await ctx.workspaces.archiveSession(id);
				return true;
			} catch {
				return false;
			}
		})).then((results) => {
			archiving = false;
			const count = results.filter(Boolean).length;
			if (count > 0) showArchiveToast(count);
		}, () => {
			archiving = false;
		});
	};
	readArchiveDays();
	const unsubScope = (() => {
		try {
			if (typeof promptScope.subscribe !== "function") return null;
			return promptScope.subscribe(() => {
				readArchiveDays();
				runArchivePass();
			});
		} catch {
			return null;
		}
	})();
	const unsubSessions = (() => {
		try {
			if (typeof ctx.sessions.list.subscribe !== "function") return null;
			return ctx.sessions.list.subscribe(runArchivePass);
		} catch {
			return null;
		}
	})();
	const unsubWorkspaces = (() => {
		try {
			if (typeof ctx.workspaces.list.subscribe !== "function") return null;
			return ctx.workspaces.list.subscribe(runArchivePass);
		} catch {
			return null;
		}
	})();
	runArchivePass();
	return function() {
		if (unsubScope) unsubScope();
		if (unsubSessions) unsubSessions();
		if (unsubWorkspaces) unsubWorkspaces();
		if (toastTimer !== null) {
			clearTimeout(toastTimer);
			toastTimer = null;
		}
		if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl);
		if (toastStyleEl?.parentNode) toastStyleEl.parentNode.removeChild(toastStyleEl);
	};
}
//#endregion
//#region src/client/zh/data/zh-dict.ts
const ZH = {
	chat: { "message.retry.status": "{label}（{retry}/{maximum}） · {seconds}秒" },
	command: {
		"description.compact": "压缩较早的对话历史",
		"description.export": "将会话日志下载为 ZIP 压缩包",
		"description.feedback": "记录对本会话的反馈",
		"description.goal": "设置或查看长期任务的目标",
		"description.permission": "切换权限预设（沙箱模式 + 审批策略）"
	},
	model: { retry: "重试" },
	trajectory: { "source.goalRound": "目标 · 第 {round} 轮" },
	cordis: {
		"panel.trigger": "Cordis 插件",
		"panel.runningCount": "{count} 个运行中"
	},
	"settings.agentPreset": {
		presetPtcName: "程序模式",
		presetPtcDescription: "具备标准模式的全部能力，并通过程序模式开发包呈现工具，让模型用一个 TypeScript 程序组合多步操作。"
	},
	"*": {
		retry: "重试",
		submit: "提交",
		submitting: "正在提交",
		save: "保存",
		cancel: "取消",
		close: "关闭",
		copy: "复制",
		copied: "复制成功",
		delete: "删除",
		edit: "编辑",
		open: "打开",
		search: "搜索",
		settings: "设置",
		none: "无",
		unknown: "未知",
		done: "已完成",
		failed: "失败",
		running: "运行中",
		stopped: "已停止",
		completed: "已完成",
		pending: "待处理",
		idle: "空闲",
		error: "错误",
		ok: "确定",
		back: "返回",
		next: "下一步",
		previous: "上一步",
		more: "更多",
		expand: "展开",
		collapse: "收起",
		truncated: "已截断",
		loading: "加载中",
		"load.failed": "加载失败",
		empty: "空",
		warning: "警告",
		success: "成功",
		confirm: "确认",
		apply: "应用",
		reset: "重置",
		remove: "移除",
		add: "添加",
		rename: "重命名",
		refresh: "刷新",
		reload: "重新加载",
		view: "查看",
		preview: "预览",
		details: "详情",
		status: "状态",
		options: "选项",
		general: "通用设置",
		language: "语言",
		appearance: "外观"
	}
};
const ZH_PARTIAL = {
	chat: {
		"stats.llm": ["llm"],
		"stats.ttftAverage": ["token"],
		"stats.tokensPerSecond": ["tokPerSec"],
		"stats.tokens": ["tok"],
		"message.compaction.completed": ["token"],
		"message.unknownSurface": ["surface"],
		"message.maxTokens": ["token"],
		"message.ttft": ["token"],
		"message.tokensPerSecond": ["tokPerSec"],
		"message.turnUsage.count": ["tok"],
		"message.turnTime.ttft": ["token"],
		"message.turnProcess.subagents.one": ["subagent"],
		"message.turnProcess.subagents.other": ["subagent"],
		"stats.dialog.usageTitle": [["Token", "词元"]],
		"stats.dialog.ttft": ["token"]
	},
	conversation: {
		"access.confirm.title": ["fullAccess"],
		"access.confirm.description": ["fullAccess", "agent"],
		"access.confirm.enable": ["fullAccess"]
	},
	trajectory: {
		"toolbar.duration": ["trajDuration"],
		"toolbar.useActualDuration": ["trajUseActualDuration"],
		"toolbar.useEqualWidth": ["trajUseEqualWidth"],
		"toolbar.turns": ["trajTurns"],
		"toolbar.expandTurns": ["trajExpandTurns"],
		"toolbar.collapseTurns": ["trajCollapseTurns"],
		"toolbar.calls": ["trajCalls"],
		"toolbar.expandCalls": ["trajExpandCalls"],
		"toolbar.collapseCalls": ["trajCollapseCalls"],
		"unit.tokens": ["tok"],
		"unit.tokensPerSecond": ["tokPerSec"],
		"usage.tokens": [["Token", "词元"]],
		"tab.schema": [["Schema", "模式"]],
		"record.schemaUnavailable": [["Schema", "模式"]],
		"timing.firstTokenUnavailable": ["token"],
		"timing.outputTokensUnavailable": ["token"],
		"timing.ttft": ["token"],
		"timeline.ttftDecoding": ["token"]
	},
	"settings.models": {
		intro: ["api"],
		deleteDescriptionWithCredential: ["api"],
		credentialConfigured: ["api"],
		credentialMissing: ["api"],
		keyInput: ["api"],
		keyPlaceholder: ["api"],
		keyPlaceholderNative: ["api"],
		keyBlank: ["api"],
		keyBlankNew: ["api"],
		keyIllegalCharacters: ["api"],
		baseUrl: ["api"],
		modelId: ["modelId"],
		modelNamePlaceholder: ["modelId"],
		maxTokens: ["token"],
		modelsEmpty: ["modelId"],
		modelIdRequired: ["modelId"],
		modelIdDuplicate: ["modelId"],
		modelDuplicate: ["modelId"],
		modelMaxTokens: ["token"],
		fetchNeedsBaseUrl: ["api"],
		customRoute: ["providerId"],
		customRouteTaken: ["modelId"],
		customApi: ["api"],
		customNeedsBaseUrl: ["api"],
		onboardingTitle: ["apiKey"],
		keyRequired: ["api"]
	},
	"settings.plugins": {
		bashDescription: ["agent"],
		agentLoopTitle: ["agentLabel"],
		agentLoopDescription: ["agentLabel"],
		webSearchApiKey: ["apiKey"],
		subagentModelSelectionTitle: ["subagent"],
		subagentModelSelectionDescription: ["subagent", "agentLabel"],
		subagentModelSelectionToggle: ["subagent", "agentLabel"],
		subagentModelSelectionChoose: ["subagent", "agentLabel"],
		subagentModelSelectionAllowed: ["agentLabel"],
		subagentModelSelectionOff: ["subagent", "agentLabel"]
	},
	"settings.agentPreset": {
		title: ["agentLabel"],
		error: ["agentLabel"],
		seatHint: ["agentLabel"],
		headerHint: ["agentLabel"],
		nav: ["agentLabel"],
		sectionIntro: ["agentLabel"],
		presetStandardDescription: [
			"agentLabel",
			"shell",
			"skills"
		],
		presetCodeName: ["ptc"],
		presetCodeDescription: ["codeModeSdk"],
		presetMinimalDescription: ["agentLabel"],
		presetCordisDescription: ["agentLabel", "preset"]
	},
	"settings.permission": {
		"confirm.title": ["fullAccess"],
		"confirm.description": ["fullAccess"],
		"confirm.enable": ["fullAccess"]
	},
	"permission.access": {
		"confirm.title": ["fullAccess"],
		"confirm.description": ["fullAccess", "agent"],
		"confirm.enable": ["fullAccess"]
	},
	plan: {
		"chip.on.aria": ["planMode"],
		"chip.on.title": ["planMode"],
		"chip.off.aria": ["planMode"],
		"chip.off.title": ["planMode"]
	},
	skill: {
		"row.running": ["skill"],
		"row.failed": ["skill"],
		"row.stopped": ["skill"]
	},
	model: { "effort.providerDefault": ["defaultLabel"] },
	"settings.pluginInventory": {
		cordis: ["cordisStatus"],
		switcherLabel: ["agentLabel"],
		presetProvidedDetail: ["agentLabel"]
	},
	"session-log-download": {
		"dialog.preparingTitle": ["session"],
		"dialog.preparingDescription": ["session"],
		"dialog.successTitle": ["session"],
		"dialog.successDescription": ["session"],
		"dialog.errorTitle": ["session"],
		"dialog.commandFailed": ["session"],
		"menu.download": ["session"]
	}
};
//#endregion
//#region src/client/zh/data/dom-labels.ts
const PERMISSION_NAMES = {
	"Workspace Write": "工作区写入",
	"Read Only": "只读",
	"Full access": "完全访问",
	"Custom": "自定义"
};
const PERMISSION_DESCRIPTIONS = {
	"Write inside the workspace and permitted temporary directories; wider retries require approval.": "仅可写入工作区与允许的临时目录；更宽的权限需单独批准。",
	"Full file access without approval prompts.": "完全文件访问，无需批准提示。",
	"Current sandbox and approval settings do not match a preset.": "当前沙箱与审批设置不匹配任何预设。"
};
const COMMAND_DESCRIPTIONS = {
	"Compact older conversation history": "压缩较早的对话历史",
	"set or view the goal for a long-running task": "设置或查看长期任务的目标",
	"record feedback about this session": "记录对本会话的反馈",
	"Enter or leave plan mode": "进入或退出计划模式",
	"Switch the permission preset (sandbox mode + approval policy)": "切换权限预设（沙箱模式 + 审批策略）",
	"Download this Session log as a ZIP archive": "将会话日志下载为 ZIP 压缩包"
};
const CHAT_LABELS = {
	"Think": "思考",
	"Thinking": "思考中",
	"Deep diving...": "深度思考中…",
	"Edit": "编辑",
	"Write": "写入",
	"Read": "读取",
	"Search": "搜索",
	"Bash": "命令行",
	"Code": "代码",
	"Tool call": "工具调用",
	"tool-call": "工具调用",
	"Inspect": "检查",
	"Run Cordis Plugin": "运行 Cordis 插件",
	"Stop Cordis Plugin": "停止 Cordis 插件",
	"Remove Cordis Plugin": "移除 Cordis 插件",
	"Input": "输入",
	"Output": "输出",
	"Time": "时间",
	"SYSTEM": "系统",
	"USER": "用户",
	"CONTEXT": "上下文",
	"COMPACTED": "压缩",
	"ASSISTANT": "助手",
	"TOOL": "工具",
	"SUBTOOL": "子工具",
	"Message": "消息",
	"Between turns": "轮次之间",
	"System Prompt": "系统提示",
	"Tools": "工具",
	"Diff": "差异",
	"Summary": "摘要",
	"Preview": "预览",
	"Raw": "原始",
	"Raw Output": "原始输出",
	"Source": "来源",
	"Payload": "负载",
	"Result": "结果",
	"Schema": "模式",
	"Timing": "计时",
	"Usage": "用量",
	"Options": "选项",
	"Status": "状态",
	"Purpose": "用途",
	"Provider": "提供方",
	"Model": "模型",
	"Tool calls": "工具调用次数",
	"Subtool calls": "子工具调用次数",
	"Error": "错误",
	"Retry": "重试",
	"Retry delay": "重试延迟",
	"Hierarchy": "层级",
	"Duration": "时长",
	"Tokens": "词元",
	"Reasoning": "推理",
	"Content": "内容",
	"Cached": "已缓存",
	"Cache created": "新建缓存",
	"Other": "其他",
	"This request": "本次请求",
	"Session cumulative": "会话累计",
	"Started": "开始时间",
	"Total duration": "总时长",
	"TTFT": "首词元时间",
	"Generation": "生成",
	"Throughput": "吞吐率",
	"Timing source": "计时来源",
	"Session timestamps": "会话时间戳",
	"Session timestamps (running)": "会话时间戳（运行中）",
	"Compaction": "压缩",
	"Compacted": "已压缩",
	"Assistant Message": "助手消息",
	"Tool Call": "工具调用",
	"User": "用户",
	"Unknown": "未知",
	"Failed": "失败",
	"Pending": "待处理",
	"Completed": "已完成",
	"Not available": "不可用",
	"Not recorded": "未记录",
	"Step start unavailable": "步骤开始时间不可用",
	"First token unavailable": "首词元时间不可用",
	"Usage unavailable": "用量不可用",
	"Output tokens unavailable": "输出词元不可用",
	"Duration too short": "时长过短",
	"Usage not reported": "未报告用量",
	"Options not recorded": "未记录选项",
	"Source not recorded": "未记录来源",
	"Schema unavailable": "模式不可用",
	"No payload captured": "未捕获负载",
	"No result captured": "未捕获结果",
	"No tools in this request": "此请求无工具",
	"No system prompt in this request": "此请求无系统提示",
	"Tool call only": "仅工具调用",
	"(tool call only)": "（仅工具调用）",
	"No content": "无内容",
	"No output": "无输出",
	"No timing data": "暂无计时数据",
	"Loading trajectory…": "正在加载轨迹…",
	"Loading earlier history…": "正在加载更早的历史…",
	"Load earlier history": "加载更早的历史",
	"Click to load earlier history": "点击加载更早的历史",
	"Session log": "会话日志",
	"Event details": "事件详情",
	"Resize event details": "调整事件详情大小",
	"Drag to resize. Double-click to reset.": "拖动调整大小，双击重置。",
	"Close details": "关闭详情",
	"Open image": "打开图片",
	"Open tool call summary": "打开工具调用摘要",
	"Show local time": "显示本地时间",
	"Show Unix timestamp": "显示 Unix 时间戳",
	"Trajectory timeline": "轨迹时间线",
	"Request options JSON": "请求选项 JSON",
	"Message source JSON": "消息来源 JSON",
	"Initial System Prompt": "初始系统提示",
	"System Prompt Updated": "系统提示已更新",
	"Tools Updated": "工具已更新",
	"System Prompt and Tools Updated": "系统提示与工具已更新",
	"Compacting context…": "正在压缩上下文…",
	"Compaction failed": "压缩失败",
	"Context compacted": "上下文已压缩"
};
//#endregion
//#region src/client/zh/data/traj-patterns.ts
const TRAJ_PATTERNS = [
	[
		/^Turn (\d+)$/,
		"第$1轮",
		/^第(\d+)轮$/,
		"Turn $1"
	],
	[
		/^Step (\d+)$/,
		"步骤$1",
		/^步骤(\d+)$/,
		"Step $1"
	],
	[
		/^Request #(\d+|—)$/,
		"请求 #$1",
		/^请求 #(\d+|—)$/,
		"Request #$1"
	],
	[
		/^Compaction (\d+)$/,
		"压缩 $1",
		/^压缩 (\d+)$/,
		"Compaction $1"
	],
	[
		/^(\d+(?:\.\d+)?) tok\/s$/,
		"$1词元/秒",
		/^(\d+(?:\.\d+)?)词元\/秒$/,
		"$1 tok/s"
	],
	[
		/^(\d+(?:\.\d+)?) tok$/,
		"$1词元",
		/^(\d+(?:\.\d+)?)词元$/,
		"$1 tok"
	],
	[
		/^([\d,]+) ms$/,
		"$1毫秒",
		/^([\d,]+)毫秒$/,
		"$1 ms"
	],
	[
		/^(\d+(?:\.\d+)?) s$/,
		"$1秒",
		/^(\d+(?:\.\d+)?)秒$/,
		"$1 s"
	],
	[
		/^Total ([\d,]+) ms$/,
		"总时长 $1 毫秒",
		/^总时长 ([\d,]+) 毫秒$/,
		"Total $1 ms"
	],
	[
		/^Total (\d+(?:\.\d+)?) s$/,
		"总时长 $1 秒",
		/^总时长 (\d+(?:\.\d+)?) 秒$/,
		"Total $1 s"
	],
	[
		/^Started (.+)$/,
		"开始于 $1",
		/^开始于 (.+)$/,
		"Started $1"
	],
	[
		/^TTFT ([\d,]+) ms$/,
		"首词元时间 $1 毫秒",
		/^首词元时间 ([\d,]+) 毫秒$/,
		"TTFT $1 ms"
	],
	[
		/^TTFT (\d+(?:\.\d+)?) s$/,
		"首词元时间 $1 秒",
		/^首词元时间 (\d+(?:\.\d+)?) 秒$/,
		"TTFT $1 s"
	],
	[
		/^Decoding ([\d,]+) ms$/,
		"解码 $1 毫秒",
		/^解码 ([\d,]+) 毫秒$/,
		"Decoding $1 ms"
	],
	[
		/^Decoding (\d+(?:\.\d+)?) s$/,
		"解码 $1 秒",
		/^解码 (\d+(?:\.\d+)?) 秒$/,
		"Decoding $1 s"
	],
	[
		/^(\d+(?:\.\d+)?) s (.+)$/,
		"$1秒 $2",
		/^(\d+(?:\.\d+)?)秒 (.+)$/,
		"$1 s $2"
	],
	[
		/^([\d,]+) ms (.+)$/,
		"$1毫秒 $2",
		/^([\d,]+)毫秒 (.+)$/,
		"$1 ms $2"
	],
	[
		/^(\d+) step(s?)$/,
		function(m, n) {
			return n + "步";
		},
		/^(\d+)步$/,
		function(m, n) {
			return enStepCount(Number(n));
		}
	],
	[
		/^(\d+) step(s?) · (\d+) tool call(s?)$/,
		function(m, ns, _a, nc) {
			return ns + "步 · " + nc + "次工具调用";
		},
		/^(\d+)步 · (\d+)次工具调用$/,
		function(m, ns, nc) {
			return enStepCount(Number(ns)) + " · " + enToolCallCount(Number(nc));
		}
	],
	[
		/^(\d+) tool call(s?)$/,
		function(m, n) {
			return n + "次工具调用";
		},
		/^(\d+)次工具调用$/,
		function(m, n) {
			return enToolCallCount(Number(n));
		}
	],
	[
		/^(\d+) tool call(s?) · (.+)$/,
		function(m, n, _s, rest) {
			return n + "次工具调用 · " + rest;
		},
		/^(\d+)次工具调用 · (.+)$/,
		function(m, n, rest) {
			return enToolCallCount(Number(n)) + " · " + rest;
		}
	],
	[
		/^Block #(\d+) (.+)$/,
		"块#$1 $2",
		/^块#(\d+) (.+)$/,
		"Block #$1 $2"
	],
	[
		/^Open Block #(\d+) tool call summary$/,
		"打开块#$1的工具调用摘要",
		/^打开块#(\d+)的工具调用摘要$/,
		"Open Block #$1 tool call summary"
	],
	[
		/^Goal · Round (\d+)$/,
		"目标 · 第$1轮",
		/^目标 · 第(\d+)轮$/,
		"Goal · Round $1"
	],
	[
		/^Plugin · (.+)$/,
		"插件 · $1",
		/^插件 · (.+)$/,
		"Plugin · $1"
	],
	[
		/^Scheduled (\d+) of (\d+)$/,
		"已安排 $1/$2",
		/^已安排 (\d+)\/(\d+)$/,
		"Scheduled $1 of $2"
	],
	[
		/^(.+) parameters JSON$/,
		"$1 参数 JSON",
		/^(.+) 参数 JSON$/,
		"$1 parameters JSON"
	],
	[
		/^Payload JSON$/,
		"负载 JSON",
		/^负载 JSON$/,
		"Payload JSON"
	],
	[
		/^Result JSON$/,
		"结果 JSON",
		/^结果 JSON$/,
		"Result JSON"
	]
];
/** 反向（中文 -> 英文）正则表：英文界面还原用。 */
const TRAJ_REVERSE = TRAJ_PATTERNS.map((pair) => [pair[2], pair[3]]);
//#endregion
//#region src/client/zh/data/terms.ts
const TERMS = {
	llm: [["LLM", "大模型"]],
	token: [[" tokens", " 词元"], [" token", " 词元"]],
	tok: [["tok", "词元"]],
	tokPerSec: [["tok/s", "词元/秒"]],
	api: [["API", "接口"]],
	apiKey: [
		["API Key", "接口密钥"],
		["API key", "接口密钥"],
		["API", "接口"],
		["Key", "密钥"],
		["key", "密钥"]
	],
	fullAccess: [["Full access", "完全访问"]],
	agent: [[" agent", "代理"], ["，agent", "，代理"]],
	agentLabel: [["Agent", "代理"]],
	subagent: [["subagent", "子代理"], ["Subagent", "子代理"]],
	modelId: [["模型 ID", "模型标识"], [" ID", "标识"]],
	providerId: [["Provider ID", "提供方标识"], [" ID", "标识"]],
	surface: [["surface", "界面"]],
	skill: [["skill", "技能"]],
	shell: [["Shell", "终端"]],
	skills: [["Skills", "技能"]],
	preset: [["preset", "预设"]],
	bash: [["bash", "命令行"]],
	strReplaceEditor: [["str_replace_editor", "字符串替换编辑器"]],
	codeModeSdk: [["Code Mode SDK", "代码模式开发套件"]],
	ptc: [["PTC", "程序"]],
	planMode: [["plan mode", "计划模式"]],
	defaultLabel: [["Default", "默认"]],
	cordisStatus: [["Cordis 状态", "框架状态"]],
	trajDuration: [["Duration", "时长"]],
	trajUseActualDuration: [["Use actual duration", "使用实际时长"]],
	trajUseEqualWidth: [["Use equal-width operations", "使用等宽操作"]],
	trajTurns: [["Turns", "轮次"]],
	trajExpandTurns: [["Expand turns", "展开轮次"]],
	trajCollapseTurns: [["Collapse turns", "收起轮次"]],
	trajCalls: [["Calls", "调用"]],
	trajExpandCalls: [["Expand calls", "展开调用"]],
	trajCollapseCalls: [["Collapse calls", "收起调用"]],
	session: [["Session", "会话"]]
};
//#endregion
//#region src/client/zh/logic/format-utils.ts
/** 依次尝试正则表，命中则返回替换结果，否则返回 null。 */
function applyPatterns(value, patterns) {
	for (let i = 0; i < patterns.length; i++) {
		const re = patterns[i][0];
		re.lastIndex = 0;
		if (re.test(value)) return value.replace(re, patterns[i][1]);
	}
	return null;
}
/**
* 改写一段文本（DOM 文本节点或 title/aria-label 属性值）：
* 1) 整段精确匹配（exact 表）；
* 2) 整段正则匹配（patterns 表，处理含「 · 」/数字的复合文本）；
* 3) 按行、行内按「 · 」拆段，逐段做精确/正则匹配后重组。
* 整段不匹配时原样返回，绝不做片段替换，避免误伤正文内容。
*/
function rewriteText(value, exact, patterns) {
	const text = String(value);
	const hit = exact[text];
	if (hit !== void 0) return hit;
	const whole = applyPatterns(text, patterns);
	if (whole !== null) return whole;
	const lines = text.split("\n");
	let changed = false;
	const out = lines.map((line) => {
		return line.split(" · ").map((part) => {
			const direct = exact[part];
			if (direct !== void 0) {
				changed = true;
				return direct;
			}
			const matched = applyPatterns(part, patterns);
			if (matched !== null) {
				changed = true;
				return matched;
			}
			return part;
		}).join(" · ");
	});
	return changed ? out.join("\n") : text;
}
/** 把术语名/字面对列表解析成 [原文片段, 译文片段] 有序对。 */
function resolvePairs(entries) {
	const pairs = [];
	for (let i = 0; i < entries.length; i++) {
		const e = entries[i];
		if (typeof e === "string") {
			const term = TERMS[e];
			if (term !== void 0) for (let j = 0; j < term.length; j++) pairs.push(term[j]);
		} else pairs.push(e);
	}
	return pairs;
}
/** 对原值按序应用片段替换，并压掉替换后相邻中文之间的残留空格。 */
function applyPairs(value, pairs) {
	let out = String(value);
	for (let i = 0; i < pairs.length; i++) out = out.split(pairs[i][0]).join(pairs[i][1]);
	let prev;
	do {
		prev = out;
		out = out.replace(/([\u4e00-\u9fff])\s+([\u4e00-\u9fff])/g, "$1$2");
	} while (out !== prev);
	return out;
}
/**
* 把秒数格式化为中文时长：X天X小时X分X秒（零值部分省略，秒始终保留）。
*/
function formatZhSeconds(raw) {
	let s = Math.floor(Number(raw));
	if (!isFinite(s) || s < 0) s = 0;
	const days = Math.floor(s / 86400);
	const hours = Math.floor(s % 86400 / 3600);
	const minutes = Math.floor(s % 3600 / 60);
	const seconds = s % 60;
	let out = "";
	if (days > 0) out += days + "天";
	if (hours > 0) out += hours + "小时";
	if (minutes > 0) out += minutes + "分";
	if (seconds > 0 || out === "") out += seconds + "秒";
	return out;
}
/** 将模板字符串中的 {key} 占位符替换为实际参数值。 */
function interpolateZh(template, params) {
	if (!params) return template;
	let result = template;
	for (const [key, value] of Object.entries(params)) result = result.split("{" + key + "}").join(String(value));
	return result;
}
/** 把英文单位时长（如 "48m48s"、"2.4s"、"1h2m3s"）转成中文（48分48秒、2.4秒）。 */
function formatEnDurationToZh(raw) {
	const s = String(raw);
	const re = /(\d+(?:\.\d+)?)(h|m|s)/g;
	const parts = [];
	let m;
	let last = 0;
	while ((m = re.exec(s)) !== null) {
		parts.push(m[1] + (m[2] === "h" ? "小时" : m[2] === "m" ? "分" : "秒"));
		last = re.lastIndex;
	}
	if (parts.length === 0 || last !== s.length) return s;
	return parts.join("");
}
/** 把 K/M 缩写单位转成中文，按数值分级：不足 1 亿用万（12.2K -> 1.22万、46.7M -> 4670万），达到 1 亿才用亿（123.4M -> 1.234亿）。 */
function formatCompactNumberToZh(raw) {
	const m = /^(\d+(?:\.\d+)?)([KM])$/.exec(String(raw));
	if (m === null) return String(raw);
	const value = parseFloat(m[1]) * (m[2] === "K" ? 1e3 : 1e6);
	if (value >= 1e8) return trimNumber(value / 1e8) + "亿";
	return trimNumber(value / 1e4) + "万";
}
/** 数字最多保留 3 位小数并去掉尾零（1.234 -> 1.234、1.2 -> 1.2、2 -> 2）。 */
function trimNumber(x) {
	let s = String(Math.round(x * 1e3) / 1e3);
	if (s.indexOf(".") !== -1) s = s.replace(/0+$/, "").replace(/\.$/, "");
	return s;
}
/**
* 把带千分位逗号的精确整数转成四位分级、空格分隔
* （64,272,077 -> 6427 2077、482,447 -> 48 2447、2,400,000 -> 240 0000、
* 123,456,789 -> 1 2345 6789）。按万级分组、不换算万/亿单位、保持精确；
* 非千分位格式原样返回。
*/
function formatExactNumberToZh(raw) {
	const s = String(raw);
	if (!/^\d{1,3}(,\d{3})+$/.test(s)) return s;
	const digits = s.replace(/,/g, "");
	const groups = [];
	for (let end = digits.length; end > 0; end -= 4) groups.unshift(digits.slice(Math.max(0, end - 4), end));
	return groups.join(" ");
}
/** 参数需要转换的键（ns -> key -> 参数名 -> 转换函数）。 */
const PARAM_TRANSFORMS = {
	chat: {
		"stats.llm": { duration: formatEnDurationToZh },
		"stats.toolCall": { duration: formatEnDurationToZh },
		"stats.ttftAverage": { duration: formatEnDurationToZh },
		"stats.tokens": {
			input: formatCompactNumberToZh,
			output: formatCompactNumberToZh
		},
		"message.turnUsage.count": { count: function(raw) {
			const compact = formatCompactNumberToZh(raw);
			if (compact !== String(raw)) return compact;
			return formatExactNumberToZh(raw);
		} }
	},
	conversation: { "input.accessMode": { name: function(raw) {
		const v = PERMISSION_NAMES[String(raw)];
		return v !== void 0 ? v : String(raw);
	} } }
};
//#endregion
//#region src/client/zh/logic/dom-enhance.ts
const FORWARD = Object.assign({}, PERMISSION_NAMES, PERMISSION_DESCRIPTIONS, COMMAND_DESCRIPTIONS, CHAT_LABELS);
const REVERSE = {};
for (const k of Object.keys(FORWARD)) if (REVERSE[FORWARD[k]] === void 0) REVERSE[FORWARD[k]] = k;
const STATS_FULL_KEY = "data-dsh-zh-stats-full";
const PROMPT_PROVIDER_KEY = "data-dsh-zh-hide-prompt-provider";
const PROMPT_PROVIDER_NAME = "提示词注入（deepseek-harness-zh_pro）";
const THINK_LINES_ATTR = "data-dsh-zh-think";
const THINK_CTRL_ATTR = "data-dsh-zh-think-control";
const THINK_LIVE_ATTR = "data-dsh-zh-think-live";
const STATS_FULL_STYLES = [
	["white-space", "nowrap"],
	["overflow", "hidden"],
	["text-overflow", "clip"],
	["max-width", "none"],
	["width", "100%"],
	["height", "auto"],
	["min-height", "0"]
];
const STATS_BASE_FONT = 12;
const STATS_MIN_FONT = 9;
const STATS_PILL_STYLES = [
	["white-space", "nowrap"],
	["overflow", "hidden"],
	["text-overflow", "clip"],
	["max-width", "none"]
];
const STATS_COUNTS_ZH = /^\s*\d+\s*轮(?:\s*·\s*|\s+)\d+\s*步\s*$/;
const STATS_COUNTS_EN = /^\s*\d+\s*turns?(?:\s*·\s*|\s+)\d+\s*steps?\s*$/;
function isStatsCounts(text) {
	return STATS_COUNTS_ZH.test(text) || STATS_COUNTS_EN.test(text);
}
function activeIsZh(ctx) {
	try {
		const locale = ctx.locale;
		if (locale && typeof locale.getLocale === "function") return locale.getLocale().active === "zh";
	} catch {}
	return false;
}
function zhEnhanceOn(ctx) {
	return activeIsZh(ctx) && settingsStore.getSnapshot().zhComplete === true;
}
function fitStatsRow(row) {
	if (typeof window === "undefined" || row.clientWidth <= 0) return;
	row.style.fontSize = "12px";
	row.style.removeProperty("overflow-x");
	let size = STATS_BASE_FONT;
	for (let i = 0; i < 4; i += 1) {
		if (row.scrollWidth <= row.clientWidth) break;
		size = Math.max(STATS_MIN_FONT, Math.round(size * (row.clientWidth / row.scrollWidth) * 10) / 10);
		row.style.fontSize = size + "px";
		if (size <= STATS_MIN_FONT) break;
	}
	if (row.scrollWidth > row.clientWidth) row.style.setProperty("overflow-x", "auto", "important");
}
const CHAT_WIDTH_MIN_SCREEN = 1200;
function chatWidthRoot() {
	if (typeof document === "undefined" || document.body === null) return null;
	return document.body.querySelector("[data-conversation-scroll]")?.parentElement ?? null;
}
function applyChatWidth() {
	const root = chatWidthRoot();
	if (root === null) return;
	const snap = settingsStore.getSnapshot();
	const large = typeof window !== "undefined" && window.innerWidth >= CHAT_WIDTH_MIN_SCREEN;
	if (snap.chatWidthEnabled && large && snap.chatWidth > 0) {
		const baseWidth = root.querySelector("[data-conversation-scroll]")?.clientWidth ?? root.clientWidth ?? 0;
		if (baseWidth > 0) root.style.setProperty("--dsh-chat-content-width", baseWidth * snap.chatWidth / 100 + "px", "important");
		else root.style.removeProperty("--dsh-chat-content-width");
	} else root.style.removeProperty("--dsh-chat-content-width");
}
function thinkRoots() {
	return document.body?.querySelectorAll("[data-variant=\"think\"]") ?? new NodeList();
}
function isThinkOpen(root) {
	let child = root.firstElementChild;
	while (child !== null) {
		if (child.hasAttribute?.("data-open")) return true;
		child = child.nextElementSibling;
	}
	return false;
}
function latestRunningThink() {
	const roots = thinkRoots();
	for (const r of Array.from(roots)) if (r.getAttribute?.("data-state") === "running") return r;
	return null;
}
function toggleThink(root) {
	const row = root.querySelector("[data-disclosure-row]");
	if (row?.click) row.click();
}
function thinkMaxNow() {
	return settingsStore.getSnapshot().thinkMaxLines;
}
function thinkMaxFromNow() {
	return settingsStore.getSnapshot().thinkMaxLinesFrom === "earliest" ? "earliest" : "latest";
}
function thinkModeNow() {
	return settingsStore.getSnapshot().thinkMode === "scroll" ? "scroll" : "button";
}
function thinkBodyDiv(root) {
	const open = root.querySelector("[data-variant=\"think\"] [data-open]");
	const child = open?.firstElementChild;
	if (!child) return null;
	let c = child;
	while (c) {
		if (c !== open && !c.hasAttribute?.("data-disclosure-row") && !c.hasAttribute?.(THINK_CTRL_ATTR) && !c.hasAttribute?.(THINK_LIVE_ATTR)) return c;
		c = c.nextElementSibling;
	}
	return null;
}
function isThinkRunning(root) {
	return root.getAttribute?.("data-state") === "running";
}
function countThinkLines(text) {
	return String(text).split("\n").length;
}
function thinkLineHeight(body) {
	try {
		const cs = window.getComputedStyle(body);
		const n = parseFloat(cs.lineHeight);
		if (Number.isFinite(n) && n > 0) return n;
		const fs = parseFloat(cs.fontSize);
		if (Number.isFinite(fs) && fs > 0) return fs * 1.2;
	} catch {}
	return 24;
}
function installChineseEnhance(zhCtx) {
	const { ctx } = zhCtx;
	let observer;
	let autoThinkTarget = null;
	let statsResizeTimer;
	let localeUnsubscribe;
	let settingsUnsubscribe;
	const originalTranslate = ctx.locale.translate?.bind(ctx.locale);
	const translateWasOwn = Object.prototype.hasOwnProperty.call(ctx.locale, "translate");
	if (ctx.locale.translate) ctx.locale.translate = function(ns, key, params) {
		if (!zhEnhanceOn(ctx)) return originalTranslate?.call(this, ns, key, params) ?? "";
		if (ns === "dsh-zh-settings" || ns === "dsh-zh-archive") return originalTranslate?.call(this, ns, key, params) ?? "";
		if (ns === "chat" && key === "message.retry.status" && params) {
			const label = String(params.label ?? "");
			const retry = String(params.retry ?? "");
			const maximum = String(params.maximum ?? "");
			return label + "（" + retry + "/" + maximum + "） · " + formatZhSeconds(params.seconds);
		}
		let nextParams = params;
		const table = PARAM_TRANSFORMS[ns];
		if (table?.[key] !== void 0 && params) {
			nextParams = {};
			for (const k of Object.keys(params)) {
				const fn = table[key][k];
				nextParams[k] = fn !== void 0 ? fn(params[k]) : params[k];
			}
		}
		const zhTable = ZH[ns];
		if (zhTable?.[key] !== void 0) return interpolateZh(zhTable[key], nextParams);
		const partial = ZH_PARTIAL[ns];
		if (partial?.[key] !== void 0) {
			const template = originalTranslate?.call(this, ns, key) ?? "";
			if (typeof template === "string") return interpolateZh(applyPairs(template, resolvePairs(partial[key])), nextParams);
		}
		const star = ZH["*"]?.[key];
		if (star !== void 0) return interpolateZh(star, nextParams);
		return originalTranslate?.call(this, ns, key, params) ?? "";
	};
	const fixStatsFull = (textNode) => {
		if (settingsStore.getSnapshot().statsFull !== true) return;
		if (!isStatsCounts(textNode.data)) return;
		const group = textNode.parentElement;
		if (group?.nodeType !== 1) return;
		if (group.tagName === "SPAN" && (group.getAttribute("class") ?? "").indexOf("label") !== -1 && group.parentElement?.nodeType === 1 && (group.parentElement.tagName === "BUTTON" || group.parentElement.tagName === "SPAN")) {
			const pill = group.parentElement;
			if (pill.getAttribute(STATS_FULL_KEY) === null) {
				for (const [k, v] of STATS_PILL_STYLES) pill.style.setProperty(k, v, "important");
				pill.setAttribute(STATS_FULL_KEY, "");
			}
			fitStatsRow(pill);
			return;
		}
		if (group.tagName !== "SPAN") return;
		const row = group.parentElement;
		if (row?.nodeType !== 1 || row.tagName !== "DIV") return;
		if (row.firstElementChild !== group) return;
		if (row.getAttribute(STATS_FULL_KEY) === null) {
			for (const [k, v] of STATS_FULL_STYLES) row.style.setProperty(k, v, "important");
			row.setAttribute(STATS_FULL_KEY, "");
		}
		fitStatsRow(row);
	};
	const hidePromptProviderText = (textNode) => {
		if (!activeIsZh(ctx)) return;
		if (textNode.data !== PROMPT_PROVIDER_NAME) return;
		let el = textNode.parentElement;
		for (let depth = 0; el !== null && depth < 6; depth += 1) {
			if (el.tagName === "LI") {
				if (el.getAttribute(PROMPT_PROVIDER_KEY) === null) el.setAttribute(PROMPT_PROVIDER_KEY, "");
				el.style.setProperty("display", "none", "important");
				return;
			}
			if (el.tagName === "OPTION") {
				if (el.getAttribute(PROMPT_PROVIDER_KEY) === null) el.setAttribute(PROMPT_PROVIDER_KEY, "");
				el.hidden = true;
				return;
			}
			el = el.parentElement;
		}
	};
	const rewrite = (root, exact, patterns) => {
		if (root.nodeType === Node.TEXT_NODE) {
			const tn = root;
			const to = rewriteText(tn.data, exact, patterns);
			if (to !== tn.data) tn.data = to;
			fixStatsFull(tn);
			if (activeIsZh(ctx)) hidePromptProviderText(tn);
			return;
		}
		if (root.nodeType !== Node.ELEMENT_NODE) return;
		const el = root;
		if (el.hasAttribute?.(THINK_LINES_ATTR) || el.hasAttribute?.(THINK_CTRL_ATTR) || el.hasAttribute?.(THINK_LIVE_ATTR)) return;
		if (el.hasAttribute?.("title") || el.hasAttribute?.("aria-label")) for (const attr of ["title", "aria-label"]) {
			const val = el.getAttribute(attr);
			if (val === null) continue;
			const to = rewriteText(val, exact, patterns);
			if (to !== val) el.setAttribute(attr, to);
		}
		let child = el.firstChild;
		while (child !== null) {
			rewrite(child, exact, patterns);
			child = child.nextSibling;
		}
	};
	const runThinkAuto = () => {
		if (!settingsStore.getSnapshot().thinkingAuto) {
			if (autoThinkTarget && document.contains(autoThinkTarget) && isThinkOpen(autoThinkTarget)) toggleThink(autoThinkTarget);
			autoThinkTarget = null;
			return;
		}
		const target = latestRunningThink();
		if (target === null) {
			const roots = thinkRoots();
			const last = roots.length > 0 ? roots[roots.length - 1] : null;
			const isDoneThink = (el) => el.getAttribute?.("data-state") !== "running";
			for (const r of Array.from(roots)) {
				if (!isDoneThink(r)) continue;
				const body = thinkBodyDiv(r);
				if (!body) continue;
				if (isSmoothStreamBlock(r)) continue;
				if (body.hasAttribute?.(THINK_LINES_ATTR) && body.textContent !== null) {
					const txt = body.textContent?.trim() ?? "";
					const max = thinkMaxNow();
					if (txt === "" || max <= 0) {
						if (body.style) {
							body.style.maxHeight = "";
							body.style.overflow = "";
							body.style.overflowY = "";
							body.style.scrollTop = 0;
						}
						body.__dshZhThink = void 0;
						if (typeof body.removeAttribute === "function") body.removeAttribute(THINK_LINES_ATTR);
					}
				}
			}
			if (last === null) return;
			if (autoThinkTarget !== null && !document.contains(autoThinkTarget)) autoThinkTarget = last;
			if (autoThinkTarget === last && !isThinkOpen(last)) toggleThink(last);
			return;
		}
		if (target === autoThinkTarget) return;
		if (autoThinkTarget && document.contains(autoThinkTarget) && isThinkOpen(autoThinkTarget)) toggleThink(autoThinkTarget);
		autoThinkTarget = target;
		if (!isThinkOpen(target)) toggleThink(target);
	};
	const statsResizeListener = () => {
		if (statsResizeTimer !== void 0) clearTimeout(statsResizeTimer);
		statsResizeTimer = setTimeout(() => {
			statsResizeTimer = void 0;
			if (document.body === null) return;
			const rows = document.body.querySelectorAll("[" + STATS_FULL_KEY + "]");
			for (const row of rows) fitStatsRow(row);
			applyChatWidth();
		}, 100);
	};
	if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("resize", statsResizeListener);
	const runPass = (roots) => {
		if (document.body === null) return;
		const snap = settingsStore.getSnapshot();
		const zh = activeIsZh(ctx);
		runThinkAuto();
		if (snap.statsFull !== true) {
			const fixed = document.body.querySelectorAll("[" + STATS_FULL_KEY + "]");
			for (const el of fixed) {
				for (const [k, v] of STATS_FULL_STYLES) el.style.removeProperty(k);
				el.style.removeProperty("overflow-x");
				el.style.removeProperty("font-size");
				el.removeAttribute(STATS_FULL_KEY);
			}
		}
		if (!zh) {
			const hidden = document.body.querySelectorAll("[data-dsh-zh-hide-prompt-provider]");
			for (const el of Array.from(hidden)) {
				if (el.tagName === "OPTION") el.hidden = false;
				else el.style.removeProperty("display");
				el.removeAttribute(PROMPT_PROVIDER_KEY);
			}
		}
		const targets = roots ?? [document.body];
		const exact = zh && snap.zhComplete ? FORWARD : REVERSE;
		const patterns = zh && snap.zhComplete ? TRAJ_PATTERNS : TRAJ_REVERSE;
		for (const target of targets) rewrite(target, exact, patterns);
		if (snap.thinkMaxLines > 0) {
			const rts = thinkRoots();
			for (const rt of Array.from(rts)) applyThinkLinesToBody(rt, thinkBodyDiv(rt), snap.thinkMaxLines);
		} else {
			const rts = thinkRoots();
			for (const rt of Array.from(rts)) applyThinkLinesToBody(rt, thinkBodyDiv(rt), 0);
		}
		applyChatWidth();
	};
	const mutationRoots = (records) => {
		if (!records) return void 0;
		const roots = [];
		const addRoot = (node) => {
			if (!node || node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.TEXT_NODE) return;
			for (let i = roots.length - 1; i >= 0; i--) {
				const cur = roots[i];
				if (cur === node) return;
				if (cur.contains?.(node)) return;
				if (node.contains?.(cur)) {
					roots.splice(i, 1);
					break;
				}
			}
			roots.push(node);
		};
		for (const rec of records) if (rec.type === "childList") for (const n of rec.addedNodes) addRoot(n);
		else addRoot(rec.target);
		return roots;
	};
	const observerOptions = {
		childList: true,
		subtree: true,
		characterData: true,
		attributes: true,
		attributeFilter: ["title", "aria-label"]
	};
	const runObservedPass = (roots) => {
		if (observer) observer.disconnect();
		try {
			runPass(roots);
		} finally {
			if (observer) observer.observe(document.documentElement, observerOptions);
		}
	};
	settingsUnsubscribe = settingsStore.subscribe(() => {
		if (document.body === null) return;
		runObservedPass();
	});
	if (typeof ctx.locale.subscribe === "function") localeUnsubscribe = ctx.locale.subscribe(() => {
		if (document.body === null) return;
		runObservedPass();
	});
	observer = new MutationObserver((records) => {
		runObservedPass(mutationRoots(records));
	});
	const resetDomEffects = () => {
		if (autoThinkTarget && document.contains(autoThinkTarget) && isThinkOpen(autoThinkTarget)) toggleThink(autoThinkTarget);
		autoThinkTarget = null;
		if (document.body) {
			const roots = thinkRoots();
			for (const rt of Array.from(roots)) applyThinkLinesToBody(rt, thinkBodyDiv(rt), 0);
			const fixed = document.body.querySelectorAll("[" + STATS_FULL_KEY + "]");
			for (const el of fixed) {
				for (const [k] of STATS_FULL_STYLES) el.style.removeProperty(k);
				el.style.removeProperty("overflow-x");
				el.style.removeProperty("font-size");
				el.removeAttribute(STATS_FULL_KEY);
			}
		}
	};
	const start = () => {
		runObservedPass();
	};
	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
	else start();
	return function() {
		if (observer) observer.disconnect();
		if (statsResizeTimer !== void 0) clearTimeout(statsResizeTimer);
		if (typeof window !== "undefined" && window.removeEventListener) window.removeEventListener("resize", statsResizeListener);
		if (settingsUnsubscribe) settingsUnsubscribe();
		if (localeUnsubscribe) localeUnsubscribe();
		resetDomEffects();
		if (ctx.locale && translateWasOwn) ctx.locale.translate = originalTranslate;
		else if (ctx.locale) delete ctx.locale.translate;
	};
}
/**
* smooth-stream 接管思考块时（其 AnimatedDisclosure 折叠体带
* data-disclosure-content 特征），zh 跳过 max-height 压缩，由 smooth 的
* grid 折叠动画负责，避免双重折叠在同一块叠加（源插件同款检测）。
*/
function isSmoothStreamBlock(root) {
	if (root === null || typeof root.querySelector !== "function") return false;
	return root.querySelector("[data-disclosure-content]") !== null;
}
function applyThinkLinesToBody(root, body, max) {
	if (root !== null && typeof root.querySelectorAll === "function") {
		const nodes = root.querySelectorAll("[data-dsh-zh-think-control], [data-dsh-zh-think-live]");
		for (const node of Array.from(nodes)) if (!(node.hasAttribute?.(THINK_CTRL_ATTR) && body !== null && body.parentNode === node.parentNode && (node.nextSibling === body || node.previousSibling === body)) && node.parentNode) try {
			node.parentNode.removeChild(node);
		} catch {}
	}
	if (body === null) return;
	if (isSmoothStreamBlock(root)) return;
	const from = thinkMaxFromNow();
	const running = isThinkRunning(root);
	if (max <= 0 || !body.textContent?.trim()) {
		if (body.style) {
			body.style.maxHeight = "";
			body.style.overflow = "";
			body.style.overflowY = "";
			body.style.scrollTop = 0;
		}
		body.__dshZhThink = void 0;
		return;
	}
	if (thinkModeNow() === "scroll") {
		const lh = thinkLineHeight(body);
		if (countThinkLines(body.textContent) <= max) {
			if (body.style) {
				body.style.maxHeight = "";
				body.style.overflow = "";
			}
			return;
		}
		if (body.style) {
			body.style.maxHeight = Math.round(lh * max) + "px";
			body.style.overflow = "hidden";
			body.style.overflowY = "auto";
			if (from === "latest" && running) body.scrollTop = Math.max(0, body.scrollHeight - body.clientHeight);
			else if (from === "earliest") body.scrollTop = 0;
		}
		body.__dshZhThink = {
			shown: max,
			from
		};
		return;
	}
	const lh = thinkLineHeight(body);
	if (body.style) {
		body.style.maxHeight = Math.round(lh * max) + "px";
		body.style.overflow = "hidden";
		body.style.overflowY = "";
		body.style.scrollTop = from === "latest" ? Math.max(0, body.scrollHeight - body.clientHeight) : 0;
	}
	body.__dshZhThink = {
		shown: max,
		from
	};
}
//#endregion
//#region src/client/zh/logic/session-batch.ts
/**
* Row-id resolver injected by `apply`. The local build is a real ES module, so
* this cannot resolve across files the way upstream's concatenated client scope
* did — and injecting it avoids a module cycle with session-menu.ts (which also
* reads this module's selection state).
*/
let readSessionIdFromRow$1 = () => null;
const batchSelection = /* @__PURE__ */ new Map();
/** 当前多选的会话 id 数组（菜单文案与批量执行用）。 */
function batchSelectionIds() {
	return Array.from(batchSelection.keys());
}
function batchSelectionSize() {
	return batchSelection.size;
}
function toggleBatchSelection(id, checked) {
	if (checked === true) batchSelection.set(id, true);
	else batchSelection.delete(id);
}
function clearBatchSelection() {
	if (batchSelection.size === 0) return;
	batchSelection.clear();
	syncBatchChecks();
}
/** 把勾选态同步回 DOM 上的复选框（状态被 prune/清空后调用）。 */
function syncBatchChecks() {
	try {
		const boxes = document.querySelectorAll("input[data-dsh-zh-batch-check]");
		for (let i = 0; i < boxes.length; i += 1) {
			const box = boxes[i];
			const row = batchSessionRowOf(box);
			const id = row !== null ? readSessionIdFromRow$1(row) : null;
			box.checked = id !== null && batchSelection.has(id);
		}
	} catch {}
}
/** 从复选框向上找会话行。 */
function batchSessionRowOf(box) {
	try {
		return typeof box.closest === "function" ? box.closest("div[class*=\"sessionRow\"][role=\"treeitem\"]") : null;
	} catch {
		return null;
	}
}
const BATCH_CHECK_MARK = "data-dsh-zh-batch-check";
const BATCH_ROW_SELECTOR = "div[class*=\"sessionRow\"][role=\"treeitem\"]";
/** 扫描会话行，按规则注入/移除复选框。root 为 null 时扫描整个 body。 */
function runBatchPass(ctx, root) {
	if (typeof document === "undefined" || document.body === null) return;
	if (settingsStore.getSnapshot().batchOpsEnabled !== true) return;
	const scanRoot = root === null || root === void 0 || root === document.body || root === document.documentElement || typeof root.querySelectorAll !== "function" ? document.body : root;
	let listSnapshot = null;
	try {
		const sessionsService = ctx.get("sessions");
		if (sessionsService !== void 0 && sessionsService !== null && sessionsService.list !== void 0 && sessionsService.list !== null && typeof sessionsService.list.getSnapshot === "function") listSnapshot = sessionsService.list.getSnapshot();
	} catch {}
	if (listSnapshot !== null && typeof listSnapshot === "object" && batchSelection.size > 0) {
		const byId = typeof listSnapshot.byId === "object" && listSnapshot.byId !== null ? listSnapshot.byId : {};
		for (const id of batchSelectionIds()) {
			const summary = byId[id];
			if (summary === void 0 || summary === null || summary.running === true || summary.blank === true) batchSelection.delete(id);
		}
	}
	if (typeof scanRoot.matches === "function" && scanRoot.matches(BATCH_ROW_SELECTOR)) applyBatchToRow(ctx, scanRoot, listSnapshot);
	const rows = scanRoot.querySelectorAll(BATCH_ROW_SELECTOR);
	for (let i = 0; i < rows.length; i += 1) applyBatchToRow(ctx, rows[i], listSnapshot);
}
function applyBatchToRow(ctx, row, listSnapshot) {
	let slot = null;
	const first = row.children !== void 0 && row.children.length > 0 ? row.children[0] : null;
	if (first !== null && first.nodeType === 1 && first.tagName === "SPAN" && typeof first.getAttribute === "function" && (first.getAttribute("class") || "").indexOf("slot") !== -1) slot = first;
	else try {
		slot = row.querySelector("span[class*=\"slot\"]");
	} catch {
		slot = null;
	}
	const existing = (() => {
		try {
			return row.querySelector("input[" + BATCH_CHECK_MARK + "]");
		} catch {
			return null;
		}
	})();
	if (slot === null) {
		removeBatchCheck(existing);
		return;
	}
	let hasIcon = false;
	try {
		hasIcon = slot.querySelector("[data-state]") !== null;
	} catch {
		hasIcon = false;
	}
	if (hasIcon) {
		dropBatchCheck(existing);
		return;
	}
	const id = resolveBatchRowId(ctx, row, listSnapshot);
	const summary = id !== null && listSnapshot !== null && listSnapshot.byId !== null && typeof listSnapshot.byId === "object" ? listSnapshot.byId[id] : void 0;
	if (summary !== void 0 && summary !== null && (summary.running === true || summary.blank === true)) {
		dropBatchCheck(existing);
		return;
	}
	if (id === null) {
		removeBatchCheck(existing);
		return;
	}
	if (existing !== null) {
		existing.checked = batchSelection.has(id);
		return;
	}
	injectBatchCheck(ctx, slot, row, id);
}
/** 解析会话 id：fiber 链优先，标题唯一匹配兜底。 */
function resolveBatchRowId(ctx, row, listSnapshot) {
	let id = readSessionIdFromRow$1(row);
	if (id !== null) return id;
	try {
		const titleSpan = row.querySelector("span[class*=\"title\"]");
		const title = titleSpan !== null && titleSpan.textContent !== null ? titleSpan.textContent.trim() : "";
		if (title !== "") id = matchSessionIdByTitle(title, listSnapshot);
	} catch {}
	return id;
}
function injectBatchCheck(ctx, slot, row, id) {
	const input = document.createElement("input");
	input.type = "checkbox";
	input.setAttribute(BATCH_CHECK_MARK, "");
	input.checked = batchSelection.has(id);
	try {
		const titleSpan = row.querySelector("span[class*=\"title\"]");
		const title = titleSpan !== null && titleSpan.textContent !== null ? titleSpan.textContent.trim() : "";
		const zh = (function() {
			try {
				const locale = ctx.get("locale");
				return locale !== void 0 && locale !== null && typeof locale.getLocale === "function" && locale.getLocale().active === "zh";
			} catch {
				return true;
			}
		})();
		input.setAttribute("aria-label", (zh ? "选择会话" : "Select session") + (title !== "" ? " " + title : ""));
	} catch {}
	const stop = function(event) {
		if (typeof event.stopPropagation === "function") event.stopPropagation();
	};
	input.addEventListener("pointerdown", stop, false);
	input.addEventListener("mousedown", stop, false);
	input.addEventListener("click", stop, false);
	input.addEventListener("change", function() {
		toggleBatchSelection(id, input.checked === true);
	}, false);
	ensureBatchStyle();
	slot.appendChild(input);
}
/**
* Build a multi-select checkbox bound to an explicit session id.
*
* Official session rows resolve their id through the React fiber chain, but
* archive rows are plugin-created DOM with no fiber — so archive-view.ts passes
* the id it already knows. Callers append the result to their own leading slot
* (give that slot a class containing "slot" so the hover-to-reveal rule applies).
* @param id - the session id this checkbox toggles.
* @param label - accessible label for the checkbox.
* @returns the bound checkbox element.
*/
function createBatchCheck(id, label) {
	const input = document.createElement("input");
	input.type = "checkbox";
	input.setAttribute(BATCH_CHECK_MARK, "");
	input.checked = batchSelection.has(id);
	if (typeof label === "string" && label !== "") input.setAttribute("aria-label", label);
	const stop = function(event) {
		if (typeof event.stopPropagation === "function") event.stopPropagation();
	};
	input.addEventListener("pointerdown", stop, false);
	input.addEventListener("mousedown", stop, false);
	input.addEventListener("click", stop, false);
	input.addEventListener("change", function() {
		toggleBatchSelection(id, input.checked === true);
	}, false);
	ensureBatchStyle();
	return input;
}
function removeBatchCheck(existing) {
	try {
		if (existing !== null && existing !== void 0 && existing.parentNode !== null) existing.parentNode.removeChild(existing);
	} catch {}
}
/** 有图标/id 失效时的摘除：连带把该会话从多选里去掉（不允许批量操作的行不保留选择）。 */
function dropBatchCheck(existing) {
	if (existing !== null && existing !== void 0) {
		const row = batchSessionRowOf(existing);
		const id = row !== null ? readSessionIdFromRow$1(row) : null;
		if (id !== null) batchSelection.delete(id);
	}
	removeBatchCheck(existing);
}
let batchStyleEl = null;
function ensureBatchStyle() {
	try {
		if (batchStyleEl !== null && document.head.contains(batchStyleEl)) return;
		if (typeof document.createElement !== "function") return;
		batchStyleEl = document.createElement("style");
		batchStyleEl.setAttribute("data-dsh-zh", "batch-ops");
		batchStyleEl.textContent = [
			"input[" + BATCH_CHECK_MARK + "]{opacity:0;flex:none;width:13px;height:13px;margin:0;",
			"cursor:pointer;accent-color:var(--dsw-alias-brand-strong, #4b7bff)}",
			"span[class*=\"slot\"]:hover > input[" + BATCH_CHECK_MARK + "],",
			"input[" + BATCH_CHECK_MARK + "]:focus-visible,",
			"input[" + BATCH_CHECK_MARK + "]:checked{opacity:1}"
		].join("");
		document.head.appendChild(batchStyleEl);
	} catch {}
}
function removeBatchStyle() {
	try {
		if (batchStyleEl !== null && batchStyleEl.parentNode !== null) batchStyleEl.parentNode.removeChild(batchStyleEl);
	} catch {}
	batchStyleEl = null;
}
/** 移除页面上所有批量复选框（开关关闭 / 卸载时）。 */
function removeAllBatchChecks() {
	try {
		const boxes = document.querySelectorAll("input[" + BATCH_CHECK_MARK + "]");
		for (let i = 0; i < boxes.length; i += 1) removeBatchCheck(boxes[i]);
	} catch {}
}
function installSessionBatch(ctx, resolveRowId) {
	readSessionIdFromRow$1 = resolveRowId;
	ctx.effect(function() {
		if (typeof document === "undefined" || typeof MutationObserver === "undefined") return;
		if (typeof document.body === "undefined" || document.body === null) return;
		if (settingsStore.getSnapshot().batchOpsEnabled !== true) return;
		const runPass = function(root) {
			runBatchPass(ctx, root);
		};
		let observer = null;
		observer = new MutationObserver(function(records) {
			if (!Array.isArray(records)) {
				runPass(document.body);
				return;
			}
			for (const record of records) {
				const added = record.addedNodes;
				if (added !== null && added !== void 0 && added.length > 0) for (let i = 0; i < added.length; i += 1) {
					const raw = added[i];
					if (raw === null || raw === void 0 || raw.nodeType !== 1) continue;
					runPass(raw);
				}
				const target = record.target;
				if (target !== null && target !== void 0 && target.nodeType === 1) {
					const el = target;
					const row = typeof el.closest === "function" ? el.closest(BATCH_ROW_SELECTOR) : null;
					if (row !== null) runPass(row);
				}
			}
		});
		observer.observe(document.documentElement, {
			childList: true,
			subtree: true
		});
		runPass(document.body);
		let sessionsUnsub = null;
		try {
			const sessionsService = ctx.get("sessions");
			if (sessionsService !== void 0 && sessionsService !== null && sessionsService.list !== void 0 && sessionsService.list !== null && typeof sessionsService.list.subscribe === "function") sessionsUnsub = sessionsService.list.subscribe(function() {
				runPass(document.body);
			});
		} catch {}
		let settingsUnsub = settingsStore.subscribe(function() {
			if (settingsStore.getSnapshot().batchOpsEnabled === true) runPass(document.body);
			else {
				clearBatchSelection();
				removeAllBatchChecks();
			}
		});
		return function() {
			if (observer !== null) observer.disconnect();
			observer = null;
			if (typeof settingsUnsub === "function") settingsUnsub();
			settingsUnsub = null;
			if (typeof sessionsUnsub === "function") sessionsUnsub();
			sessionsUnsub = null;
			clearBatchSelection();
			removeAllBatchChecks();
			removeBatchStyle();
		};
	}, "dsh-zh: 会话多选");
}
//#endregion
//#region src/client/zh/logic/session-menu.ts
const DELETE_LABELS = {
	zh: "删除会话",
	en: "Delete session"
};
const DELETE_HINTS = {
	zh: "删除会话（日志移入系统回收站，不保留恢复位）",
	en: "Delete session (log moves to the system recycle bin; no restore position)"
};
const CONFIRM_TEXTS = {
	zh: {
		title: "删除会话",
		desc: "将把该会话的日志目录移入系统回收站，并从工作区账本移除（不保留恢复位）。删除后可从系统回收站手工还原目录，但不会自动恢复为会话。若删除的是当前查看的会话，将自动跳转到新会话页面。确定继续吗？",
		ok: "删除",
		cancel: "取消",
		deleted: "会话已删除（日志已移入系统回收站）",
		failed: "删除失败：{message}",
		deleting: "正在删除会话…"
	},
	en: {
		title: "Delete session",
		desc: "The session log directory will move to the system recycle bin and the workspace ledger slot will be removed (no restore position). Continue?",
		ok: "Delete",
		cancel: "Cancel",
		deleted: "Session deleted (log moved to the system recycle bin)",
		failed: "Delete failed: {message}",
		deleting: "Deleting session…"
	}
};
const SESSION_MENU_MARKS = ["归档会话", "Archive session"];
const INJECTED_MARK = "data-dsh-zh-delete-session";
const BATCH_ITEM_MARK = "data-dsh-zh-batch-item";
const BATCH_TEXTS = {
	zh: {
		deleteLabel: "批量删除会话（{n}）",
		archiveLabel: "批量归档会话（{n}）",
		deleteTitle: "批量删除会话",
		deleteDesc: "将把选中的 {n} 个会话删除：日志移入系统回收站、并从工作区账本移除（不保留恢复位）；运行中的会话会被跳过。确定继续吗？",
		archiveTitle: "批量归档会话",
		archiveDesc: "将把选中的 {n} 个会话加入归档（从列表隐藏，日志原地保留，可随时在归档视图中恢复）。确定继续吗？",
		deleting: "正在批量删除 {n} 个会话…",
		deleted: "已删除 {n} 个会话（日志已移入系统回收站）",
		archiving: "正在批量归档 {n} 个会话…",
		archived: "已归档 {n} 个会话",
		partial: "完成 {ok} 个，失败 {failed} 个：{message}",
		archiveUnavailable: "批量归档不可用（工作区服务未就绪）"
	},
	en: {
		deleteLabel: "Delete {n} sessions",
		archiveLabel: "Archive {n} sessions",
		deleteTitle: "Delete selected sessions",
		deleteDesc: "The {n} selected sessions will be deleted: logs move to the system recycle bin and workspace ledger slots are removed (no restore position); running sessions are skipped. Continue?",
		archiveTitle: "Archive selected sessions",
		archiveDesc: "The {n} selected sessions will be archived (hidden from the list, logs kept in place; restore anytime from the archive view). Continue?",
		deleting: "Deleting {n} selected sessions…",
		deleted: "Deleted {n} sessions (logs moved to the system recycle bin)",
		archiving: "Archiving {n} selected sessions…",
		archived: "Archived {n} sessions",
		partial: "{ok} done, {failed} failed: {message}",
		archiveUnavailable: "Bulk archive unavailable (workspace service not ready)"
	}
};
const deletedSessionIds = /* @__PURE__ */ new Set();
/** Replace the cache with the host's authoritative id list. */
function applyDeletedSessionIds(ids) {
	if (!Array.isArray(ids)) return;
	deletedSessionIds.clear();
	for (const id of ids) deletedSessionIds.add(String(id));
}
/** Pull the deleted-session set from the host. */
function fetchDeletedSessionIds() {
	return fetch("/dsh-zh/api/session.deleted", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: "{}"
	}).then((response) => response.json().catch(() => null)).then((parsed) => {
		const typed = parsed;
		if (typed?.ok === true && typed.value !== void 0) applyDeletedSessionIds(typed.value.ids);
	}).catch(() => {});
}
/** Cache the set carried by a delete response. */
function syncDeletedSessionIdsFromValue(value) {
	const ids = value?.deletedIds;
	if (ids !== void 0) applyDeletedSessionIds(ids);
}
/** Whether a session id is known to be deleted (archive-view row filter). */
function isSessionDeleted(id) {
	return deletedSessionIds.has(id);
}
let toastTimer = null;
let toastEl = null;
let toastStyleEl = null;
function ensureToastStyle() {
	if (toastStyleEl && document.head?.contains(toastStyleEl)) return;
	toastStyleEl = document.createElement("style");
	toastStyleEl.setAttribute("data-dsh-zh", "toast");
	toastStyleEl.textContent = [
		".dsh-zh-toast{position:fixed;top:120px;left:50%;z-index:1100;pointer-events:none;",
		"display:flex;align-items:center;gap:10px;max-width:min(560px,calc(100vw - 48px));",
		"padding:12px 16px;border-radius:14px;",
		"background:var(--dsw-alias-button-contrast-fill);",
		"color:var(--dsw-alias-label-primary-inverted);font-size:14px;line-height:22px;",
		"box-shadow:var(--dsw-shadow-lv3);transform:translateX(-50%);",
		"animation:dsh-zh-toast-in 160ms ease-out,dsh-zh-toast-fade 1000ms ease 3000ms forwards}",
		"@keyframes dsh-zh-toast-in{from{opacity:0;transform:translate(-50%,-6px)}to{opacity:1;transform:translate(-50%,0)}}",
		"@keyframes dsh-zh-toast-fade{to{opacity:0}}"
	].join("");
	document.head?.appendChild(toastStyleEl);
}
function showToast(text, duration) {
	try {
		if (toastTimer !== null) {
			clearTimeout(toastTimer);
			toastTimer = null;
		}
		if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl);
		ensureToastStyle();
		toastEl = document.createElement("div");
		toastEl.className = "dsh-zh-toast";
		toastEl.setAttribute("role", "status");
		toastEl.textContent = text;
		document.body.appendChild(toastEl);
		toastTimer = setTimeout(() => {
			toastTimer = null;
			if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl);
			toastEl = null;
		}, duration);
	} catch {}
}
/** Resolve a session row's id (fiber chain, then unique title fallback).
*  Exported so session-batch.ts can resolve ids without a module cycle. */
function readSessionIdFromRow(row) {
	try {
		const fiberKeys = Object.keys(row).filter((k) => k.startsWith("__reactFiber$"));
		for (const key of fiberKeys) {
			let fiber = row[key];
			let depth = 0;
			while (fiber && depth < 40) {
				const mp = fiber.memoizedProps;
				if (mp && typeof mp === "object" && mp.node && typeof mp.node === "object" && typeof mp.node.id === "string") return mp.node?.id;
				fiber = fiber.return;
				depth++;
			}
		}
	} catch {}
	try {
		const propsKeys = Object.keys(row).filter((k) => k.startsWith("__reactProps$"));
		for (const key of propsKeys) {
			const props = row[key];
			if (props?.node?.id) return props.node.id;
		}
	} catch {}
	return null;
}
function sessionRowOf(el) {
	while (el && el !== document.body) {
		if (el.getAttribute?.("role") === "treeitem") return el;
		el = el.parentElement;
	}
	return null;
}
function titleOf(row) {
	try {
		const span = row.querySelector("span[class*=\"title\"]");
		if (span?.textContent) return span.textContent.trim();
	} catch {}
	return row.textContent?.trim().slice(0, 80) ?? "";
}
function performDelete(sessionId, title, ctx) {
	let currentSessionId = null;
	try {
		const snap = ctx.sessions.list.getSnapshot();
		if (snap?.current) currentSessionId = snap.current;
	} catch {}
	(async () => {
		try {
			const response = await fetch("/dsh-zh/api/session.delete", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					sessionId,
					title,
					currentSessionId
				})
			});
			if (!response.ok) {
				showToast("删除失败：HTTP " + response.status, 5e3);
				return;
			}
			const parsed = await response.json().catch(() => null);
			if (!parsed?.ok) {
				showToast("删除失败：" + (parsed?.error?.message ?? "未知错误"), 5e3);
				return;
			}
			syncDeletedSessionIdsFromValue(parsed.value);
			showToast("会话已删除（日志已移入系统回收站）", 4e3);
			if (currentSessionId === sessionId) try {
				ctx.sessions.clear?.();
			} catch {}
			try {
				ctx.workspaces.refresh?.();
			} catch {}
			try {
				ctx.sessions.refresh?.();
			} catch {}
		} catch (error) {
			showToast("删除失败：网络错误", 5e3);
		}
	})();
}
/** Delete one session through the host route; never throws (the bulk caller aggregates). */
async function batchDeleteOne(ctx, sessionId, title, currentSessionId) {
	try {
		const response = await fetch("/dsh-zh/api/session.delete", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				sessionId,
				title,
				currentSessionId
			})
		});
		const parsed = await response.json().catch(() => null);
		if (!parsed?.ok) return {
			id: sessionId,
			ok: false,
			message: parsed?.error?.message ?? "HTTP " + response.status
		};
		syncDeletedSessionIdsFromValue(parsed.value);
		return {
			id: sessionId,
			ok: true,
			message: ""
		};
	} catch (error) {
		return {
			id: sessionId,
			ok: false,
			message: error instanceof Error ? error.message : String(error)
		};
	}
}
/** Refresh the session and workspace lists so affected rows update immediately. */
function refreshSessionLists(ctx) {
	try {
		ctx.workspaces.refresh?.();
	} catch {}
	try {
		ctx.sessions.refresh?.();
	} catch {}
}
/** Bulk delete: strictly serial (each request waits for the previous to settle). */
async function performBatchDelete(ctx, ids, copy) {
	const n = ids.length;
	if (n === 0) return;
	let currentSessionId = null;
	let listSnapshot = null;
	try {
		const snap = ctx.sessions.list.getSnapshot();
		if (snap?.current) currentSessionId = snap.current;
		listSnapshot = snap ?? null;
	} catch {}
	showToast(copy.deleting.replace("{n}", String(n)), 2500);
	const results = [];
	for (const id of ids) {
		const summary = listSnapshot?.byId?.[id];
		const title = typeof summary?.displayTitle === "string" ? summary.displayTitle : "";
		results.push(await batchDeleteOne(ctx, id, title, currentSessionId));
	}
	const okResults = results.filter((r) => r.ok);
	const failures = results.filter((r) => !r.ok);
	if (failures.length === 0) showToast(copy.deleted.replace("{n}", String(okResults.length)), 4e3);
	else showToast(copy.partial.replace("{ok}", String(okResults.length)).replace("{failed}", String(failures.length)).replace("{message}", failures[0].message), 6e3);
	if (currentSessionId !== null && okResults.some((r) => r.id === currentSessionId)) try {
		ctx.sessions.clear?.();
	} catch {}
	refreshSessionLists(ctx);
	clearBatchSelection();
}
/** Bulk archive: official workspaces.archiveSession; running/blank rows are skipped. */
async function performBatchArchive(ctx, ids, copy) {
	const n = ids.length;
	if (n === 0) return;
	const workspaces = ctx.workspaces;
	if (workspaces === void 0 || typeof workspaces.archiveSession !== "function") {
		showToast(copy.archiveUnavailable, 5e3);
		return;
	}
	let listSnapshot = null;
	try {
		listSnapshot = ctx.sessions.list.getSnapshot();
	} catch {}
	showToast(copy.archiving.replace("{n}", String(n)), 2500);
	let archived = 0;
	let failed = 0;
	let firstFailure = "";
	for (const id of ids) {
		const summary = listSnapshot?.byId?.[id];
		if (summary === void 0 || summary === null || summary.running === true || summary.blank === true) {
			failed += 1;
			if (firstFailure === "") firstFailure = "skipped";
			continue;
		}
		try {
			await workspaces.archiveSession(id);
			archived += 1;
		} catch (error) {
			failed += 1;
			if (firstFailure === "") firstFailure = error instanceof Error ? error.message : String(error);
		}
	}
	if (failed === 0) showToast(copy.archived.replace("{n}", String(archived)), 4e3);
	else showToast(copy.partial.replace("{ok}", String(archived)).replace("{failed}", String(failed)).replace("{message}", firstFailure), 6e3);
	refreshSessionLists(ctx);
	clearBatchSelection();
}
function installSessionMenu(zhCtx) {
	const { ctx } = zhCtx;
	if (typeof document === "undefined" || typeof MutationObserver === "undefined") return () => {};
	let observer;
	let lastEllipsisRow = null;
	let confirmEl = null;
	const currentCopy = {
		zh: false,
		deleteLabel: "",
		deleteHint: "",
		title: "",
		desc: "",
		ok: "",
		cancel: "",
		deleted: "",
		failed: "",
		deleting: ""
	};
	const resolveCopy = () => {
		const isZh = () => {
			try {
				const locale = ctx.locale;
				return !!(locale && typeof locale.getLocale === "function" && locale.getLocale().active === "zh");
			} catch {
				return false;
			}
		};
		const lang = isZh() ? "zh" : "en";
		const c = CONFIRM_TEXTS[lang];
		return {
			zh: lang === "zh",
			deleteLabel: DELETE_LABELS[lang],
			deleteHint: DELETE_HINTS[lang],
			title: c.title,
			desc: c.desc,
			ok: c.ok,
			cancel: c.cancel,
			deleted: c.deleted,
			failed: c.failed,
			deleting: c.deleting
		};
	};
	const removeConfirm = () => {
		if (confirmEl?.parentNode) confirmEl.parentNode.removeChild(confirmEl);
		confirmEl = null;
	};
	const showConfirm = (title, desc, onOk) => {
		removeConfirm();
		const overlay = document.createElement("div");
		overlay.style.cssText = "position:fixed;inset:0;z-index:1200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.35)";
		const card = document.createElement("div");
		card.style.cssText = "width:min(440px,calc(100vw - 48px));border-radius:16px;padding:20px;background:var(--dsw-alias-bg-layer-2, var(--dsw-alias-bg-layer-1, #fff));color:var(--dsw-alias-label-primary,#1f2329);box-shadow:var(--dsw-shadow-lv3,0 8px 24px rgba(0,0,0,0.18))";
		const titleEl = document.createElement("div");
		titleEl.textContent = title;
		titleEl.style.cssText = "font-size:16px;line-height:24px;font-weight:600;margin-bottom:10px";
		const descEl = document.createElement("div");
		descEl.textContent = desc;
		descEl.style.cssText = "font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,#666);margin-bottom:18px";
		const actions = document.createElement("div");
		actions.style.cssText = "display:flex;justify-content:flex-end;gap:10px";
		const cancel = document.createElement("button");
		cancel.type = "button";
		cancel.textContent = currentCopy.cancel || "取消";
		cancel.style.cssText = "padding:6px 16px;border-radius:10px;border:1px solid rgba(127,127,127,0.35);background:transparent;cursor:pointer;font:inherit;font-size:14px";
		const ok = document.createElement("button");
		ok.type = "button";
		ok.textContent = currentCopy.ok || "删除";
		ok.style.cssText = "padding:6px 16px;border-radius:10px;border:none;background:var(--dsw-alias-danger-strong, #d93026);color:#fff;cursor:pointer;font:inherit;font-size:14px";
		cancel.addEventListener("click", removeConfirm, false);
		ok.addEventListener("click", () => {
			removeConfirm();
			onOk();
		}, false);
		actions.appendChild(cancel);
		actions.appendChild(ok);
		card.appendChild(titleEl);
		card.appendChild(descEl);
		card.appendChild(actions);
		overlay.appendChild(card);
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) removeConfirm();
		}, false);
		document.body.appendChild(overlay);
		confirmEl = overlay;
	};
	const injectIntoMenu = (menu) => {
		if (settingsStore.getSnapshot().deleteSessionEnabled !== true) return;
		if (menu.getAttribute(INJECTED_MARK) !== null) return;
		try {
			const orphans = document.querySelectorAll("button[" + INJECTED_MARK + "], [" + BATCH_ITEM_MARK + "]");
			for (const o of Array.from(orphans)) {
				const target = o.getAttribute(BATCH_ITEM_MARK) !== null ? o.parentElement ?? o : o;
				if (target.parentNode && !menu.contains(target)) target.parentNode.removeChild(target);
			}
		} catch {}
		let anchor = null;
		const items = menu.querySelectorAll("[role=\"menuitem\"]");
		for (const item of Array.from(items)) {
			const text = item.textContent?.trim() ?? "";
			if (SESSION_MENU_MARKS.includes(text)) {
				anchor = item;
				break;
			}
		}
		if (!anchor) return;
		const row = lastEllipsisRow;
		if (!row) return;
		let sessionId = readSessionIdFromRow(row);
		if (!sessionId) return;
		const copy = resolveCopy();
		const wrap = anchor.parentElement;
		if (!wrap) return;
		const clone = wrap.cloneNode(true);
		const btn = clone.querySelector("[role=\"menuitem\"]");
		if (!btn) return;
		btn.setAttribute(INJECTED_MARK, "");
		const iconSpan = btn.querySelector("span:first-child");
		if (iconSpan) {
			iconSpan.textContent = "🗑";
			iconSpan.style.fontSize = "14px";
		}
		const labelSpan = btn.querySelector("span:last-child");
		if (labelSpan) {
			labelSpan.textContent = copy.deleteLabel;
			labelSpan.title = copy.deleteHint;
		}
		btn.style.color = "var(--dsw-alias-danger-strong, #d93026)";
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			try {
				document.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
			} catch {}
			showConfirm(copy.title, copy.desc, () => performDelete(sessionId, titleOf(row), ctx));
		}, false);
		if (wrap.nextSibling) wrap.parentNode?.insertBefore(clone, wrap.nextSibling);
		else wrap.parentNode?.appendChild(clone);
		if (settingsStore.getSnapshot().batchOpsEnabled === true && batchSelectionSize() > 0) {
			const ids = batchSelectionIds();
			const count = String(ids.length);
			const batchCopy = copy.zh ? BATCH_TEXTS.zh : BATCH_TEXTS.en;
			const makeItem = (icon, label, danger, onClick) => {
				const item = wrap.cloneNode(true);
				const b = item.querySelector("[role=\"menuitem\"]");
				if (!b) return;
				b.setAttribute(BATCH_ITEM_MARK, "");
				const iconSpan = b.querySelector("span:first-child");
				if (iconSpan) {
					iconSpan.textContent = icon;
					iconSpan.style.fontSize = "14px";
				}
				const labelSpan = b.querySelector("span:last-child");
				if (labelSpan) labelSpan.textContent = label;
				if (danger) b.style.color = "var(--dsw-alias-danger-strong, #d93026)";
				b.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					try {
						document.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
					} catch {}
					onClick();
				}, false);
				const injected = wrap.parentNode?.querySelectorAll("[" + BATCH_ITEM_MARK + "]");
				const tail = injected !== void 0 && injected.length > 0 ? injected[injected.length - 1].parentElement ?? wrap : wrap;
				if (tail.nextSibling) tail.parentNode?.insertBefore(item, tail.nextSibling);
				else tail.parentNode?.appendChild(item);
			};
			if (settingsStore.getSnapshot().deleteSessionEnabled === true) makeItem("🗑", batchCopy.deleteLabel.replace("{n}", count), true, () => {
				showConfirm(batchCopy.deleteTitle, batchCopy.deleteDesc.replace("{n}", count), () => {
					performBatchDelete(ctx, ids.slice(), batchCopy);
				});
			});
			makeItem("📦", batchCopy.archiveLabel.replace("{n}", count), false, () => {
				showConfirm(batchCopy.archiveTitle, batchCopy.archiveDesc.replace("{n}", count), () => {
					performBatchArchive(ctx, ids.slice(), batchCopy);
				});
			});
		}
		menu.setAttribute(INJECTED_MARK, "");
	};
	const onPointerDown = (e) => {
		const target = e.target;
		if (!target?.closest) return;
		const btn = target.closest("button");
		if (!btn) return;
		const label = btn.getAttribute("aria-label") ?? "";
		if (label.includes("会话") && label.includes("的操作") || label.includes("Session actions")) lastEllipsisRow = sessionRowOf(btn);
	};
	document.addEventListener("pointerdown", onPointerDown, true);
	const runPass = (root) => {
		const menus = root === document ? document.body.querySelectorAll("div[role=\"menu\"]") : root.querySelectorAll?.("div[role=\"menu\"]") ?? new NodeList();
		for (const menu of Array.from(menus)) injectIntoMenu(menu);
	};
	observer = new MutationObserver((records) => {
		if (!Array.isArray(records)) {
			runPass(document);
			return;
		}
		for (const rec of records) {
			const added = rec.addedNodes;
			if (!added?.length) continue;
			for (const n of Array.from(added)) {
				if (n.nodeType !== Node.ELEMENT_NODE) continue;
				const el = n;
				if (el.getAttribute?.("role") === "menu") {
					injectIntoMenu(el);
					continue;
				}
				if (typeof el.querySelectorAll === "function") runPass(el);
			}
		}
	});
	observer.observe(document.documentElement, {
		childList: true,
		subtree: true
	});
	runPass(document);
	return function() {
		if (observer) {
			observer.disconnect();
			observer = void 0;
		}
		document.removeEventListener("pointerdown", onPointerDown, true);
		if (toastTimer !== null) {
			clearTimeout(toastTimer);
			toastTimer = null;
		}
		if (toastEl?.parentNode) toastEl.parentNode.removeChild(toastEl);
		if (toastStyleEl?.parentNode) toastStyleEl.parentNode.removeChild(toastStyleEl);
		removeConfirm();
	};
}
//#endregion
//#region src/client/zh/locales/zh-locales.ts
/** Archive view locale copy (zh + en). */
const ARCHIVE_COPY_ZH = {
	buttonLabel: "查看已归档会话",
	buttonTitle: "查看该工作区已归档的会话",
	"group.ungrouped": "未分组",
	empty: "暂无归档会话",
	expand: "再展开 {n} 个归档",
	collapse: "收起",
	"actions.aria": "会话\"{name}\"的操作",
	"select.aria": "选择会话\"{name}\"",
	"ws.selectall": "全选",
	"ws.selectallTitle": "勾选该工作区当前所有可勾选的会话；已全选时点击取消勾选",
	"menu.rename": "重命名",
	"menu.fork": "分叉会话",
	"menu.unarchive": "取消归档",
	"menu.delete": "删除会话",
	"rename.title": "重命名会话",
	"rename.ok": "保存",
	"rename.cancel": "取消",
	"rename.failed": "重命名失败：{message}",
	"delete.title": "删除会话",
	"delete.desc": "将把该会话的日志目录移入系统回收站，并从工作区账本移除（不保留恢复位）。删除后可从系统回收站手工还原目录，但不会自动恢复为会话。若删除的是当前查看的会话，将自动跳转到新会话页面。确定继续吗？",
	"delete.ok": "删除",
	"delete.cancel": "取消",
	"delete.deleting": "正在删除会话…",
	"delete.done": "会话已删除（日志已移入系统回收站）",
	"delete.failed": "删除失败：{message}",
	"time.now": "刚刚",
	"time.minutes": "{n}分钟",
	"time.hours": "{n}小时",
	"time.days": "{n}天",
	"time.months": "{n}个月",
	"time.years": "{n}年"
};
const ARCHIVE_COPY_EN = {
	buttonLabel: "Archived sessions",
	buttonTitle: "View archived sessions of this workspace",
	"group.ungrouped": "Ungrouped",
	empty: "No archived sessions",
	expand: "Show {n} more archived sessions",
	collapse: "Show less",
	"actions.aria": "Session actions for {name}",
	"select.aria": "Select session {name}",
	"ws.selectall": "Select all",
	"ws.selectallTitle": "Check every selectable session in this workspace; click again to clear",
	"menu.rename": "Rename",
	"menu.fork": "Fork session",
	"menu.unarchive": "Unarchive",
	"menu.delete": "Delete session",
	"rename.title": "Rename session",
	"rename.ok": "Save",
	"rename.cancel": "Cancel",
	"rename.failed": "Rename failed: {message}",
	"delete.title": "Delete session",
	"delete.desc": "The session log directory will move to the system recycle bin and the workspace ledger slot will be removed (no restore position). You can manually restore the directory from the recycle bin, but it will not automatically become a session again. If you delete the currently viewed session, the UI will jump to a new session. Continue?",
	"delete.ok": "Delete",
	"delete.cancel": "Cancel",
	"delete.deleting": "Deleting session…",
	"delete.done": "Session deleted (log moved to the system recycle bin)",
	"delete.failed": "Delete failed: {message}",
	"time.now": "now",
	"time.minutes": "{n}min",
	"time.hours": "{n}h",
	"time.days": "{n}d",
	"time.months": "{n}mo",
	"time.years": "{n}y"
};
const archiveLocales = { [ZH_ARCHIVE_NS]: {
	zh: ARCHIVE_COPY_ZH,
	en: ARCHIVE_COPY_EN
} };
//#endregion
//#region src/client/zh/logic/archive-view.ts
const ARCHIVE_VIEW_CSS = [
	"[data-dsh-zh-archive-section]{display:flex;flex-direction:column;box-sizing:border-box}",
	"[data-dsh-zh-archive-section]>*+*{margin-top:2px}",
	"[data-dsh-zh-archive-row]{display:flex;align-items:center;gap:0;height:32px;box-sizing:border-box;",
	"border-radius:8px;padding:0 8px;cursor:pointer;user-select:none;",
	"color:var(--dsw-alias-label-primary)}",
	"[data-dsh-zh-archive-row]:hover{background:var(--dsw-alias-interactive-bg-hover)}",
	"[data-dsh-zh-archive-row][data-dsh-zh-archive-selected=\"true\"]{background:var(--dsw-alias-interactive-bg-hover)}",
	"[data-dsh-zh-archive-slot]{flex:none;width:16px;height:20px;display:inline-flex;",
	"align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary)}",
	"[data-dsh-zh-archive-title]{flex:1;min-width:0;margin:0 6px 0 4px;overflow:hidden;",
	"text-overflow:ellipsis;white-space:nowrap;font-size:14px;line-height:20px}",
	"[data-dsh-zh-archive-time]{flex:none;font-size:12px;line-height:20px;",
	"color:var(--dsw-alias-label-tertiary)}",
	"[data-dsh-zh-archive-empty]{padding:16px 12px;font-size:13px;line-height:20px;",
	"color:var(--dsw-alias-label-tertiary)}",
	"[data-dsh-zh-archive-more]{cursor:pointer;text-align:left;width:100%;height:28px;box-sizing:border-box;",
	"color:var(--dsw-alias-label-tertiary);background:transparent;border:none;border-radius:8px;",
	"padding:0 12px 0 28px;font-size:12px;line-height:20px;margin-top:0}",
	"[data-dsh-zh-archive-more]:hover{color:var(--dsw-alias-label-secondary);background:transparent}",
	"[data-dsh-zh-archive-actions]{flex:none;display:none;align-items:center;}",
	"[data-dsh-zh-archive-row]:hover [data-dsh-zh-archive-actions],",
	"[data-dsh-zh-archive-row][data-dsh-zh-archive-menu-open] [data-dsh-zh-archive-actions]{display:inline-flex;}",
	"[data-dsh-zh-archive-row]:hover [data-dsh-zh-archive-time],",
	"[data-dsh-zh-archive-row][data-dsh-zh-archive-menu-open] [data-dsh-zh-archive-time]{display:none;}",
	"[data-dsh-zh-archive-row][data-dsh-zh-archive-menu-open]{background:var(--dsw-alias-interactive-bg-hover);}",
	"button[data-dsh-zh-archive-actions-button]{flex:none;display:inline-flex;align-items:center;",
	"justify-content:center;width:16px;height:16px;border:none;border-radius:4px;padding:0;",
	"background:transparent;cursor:pointer;color:var(--dsw-alias-label-tertiary);}",
	"button[data-dsh-zh-archive-actions-button]:hover{color:var(--dsw-alias-label-primary);}",
	"[data-dsh-zh-archive-menu]{position:fixed;z-index:1100;box-sizing:border-box;min-width:218px;",
	"padding:4px;display:flex;flex-direction:column;",
	"border:1px solid var(--dsw-alias-border-inverted);border-radius:12px;",
	"background:var(--dsw-specific-menu);box-shadow:var(--dsw-shadow-lv3);}",
	"button[data-dsh-zh-archive-menu-item]{display:flex;align-items:center;gap:8px;width:100%;",
	"min-height:40px;padding:8px 10px;border:none;border-radius:10px;background:transparent;",
	"cursor:pointer;font-size:14px;line-height:22px;color:var(--dsw-alias-label-primary);text-align:left;}",
	"button[data-dsh-zh-archive-menu-item]:hover{background:var(--dsw-alias-interactive-bg-hover);}",
	"[data-dsh-zh-archive-menu-icon]{display:inline-flex;flex:none;width:16px;height:16px;",
	"align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);}",
	"[data-dsh-zh-archive-menu-label]{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
	"button[data-dsh-zh-archive-menu-item][data-dsh-zh-archive-menu-danger=\"true\"]{color:var(--dsw-alias-state-error-primary);}",
	"button[data-dsh-zh-archive-menu-item][data-dsh-zh-archive-menu-danger=\"true\"] [data-dsh-zh-archive-menu-icon]{color:var(--dsw-alias-state-error-primary);}",
	"button[data-dsh-zh-archive-menu-item][data-dsh-zh-archive-menu-danger=\"true\"]:hover{background:var(--dsw-alias-interactive-bg-hover-danger);}",
	"[data-dsh-zh-archive-dialog-mask]{position:fixed;inset:0;z-index:1200;display:flex;",
	"align-items:center;justify-content:center;background:rgba(0,0,0,0.35);}",
	"[data-dsh-zh-archive-dialog]{width:min(440px,calc(100vw - 48px));border-radius:16px;padding:20px;",
	"background:var(--dsw-alias-bg-layer-2, var(--dsw-alias-bg-layer-1, #fff));color:var(--dsw-alias-label-primary, #1f2329);",
	"box-shadow:var(--dsw-shadow-lv3, 0 8px 24px rgba(0,0,0,0.18));}",
	"[data-dsh-zh-archive-dialog-title]{font-size:16px;line-height:24px;font-weight:600;margin-bottom:10px;}",
	"[data-dsh-zh-archive-dialog-desc]{font-size:13px;line-height:20px;",
	"color:var(--dsw-alias-label-tertiary,#666);margin-bottom:18px;}",
	"input[data-dsh-zh-archive-rename-input]{width:100%;box-sizing:border-box;height:36px;",
	"padding:0 12px;margin-bottom:18px;border-radius:10px;font:inherit;font-size:14px;",
	"border:1px solid var(--dsw-alias-border-l2,#c9cdd4);outline:none;",
	"background:var(--dsw-alias-bg-layer-2, var(--dsw-alias-bg-layer-1, #fff));color:var(--dsw-alias-label-primary,#1f2329);}",
	"[data-dsh-zh-archive-dialog-actions]{display:flex;justify-content:flex-end;gap:10px;}",
	".dsh-zh-archive-toast{position:fixed;top:120px;left:50%;z-index:1300;pointer-events:none;",
	"display:flex;align-items:center;gap:10px;max-width:min(560px,calc(100vw - 48px));",
	"padding:12px 16px;border-radius:14px;background:var(--dsw-alias-button-contrast-fill);",
	"color:var(--dsw-alias-label-primary-inverted);font-size:14px;line-height:22px;",
	"box-shadow:var(--dsw-shadow-lv3);transform:translateX(-50%);}"
].join("");
const ARCHIVE_BTN_CSS = [
	"button[data-dsh-zh-ws-archive]{flex:none;display:inline-flex;align-items:center;justify-content:center;",
	"width:16px;height:16px;border:none;border-radius:4px;padding:0;background:transparent;",
	"cursor:pointer;color:var(--dsw-alias-label-tertiary)}",
	"button[data-dsh-zh-ws-archive]:hover{color:var(--dsw-alias-label-primary)}",
	"button[data-dsh-zh-ws-archive][data-dsh-zh-archive-active=\"true\"]{color:var(--dsw-alias-state-business-primary)}",
	"button[data-dsh-zh-ws-archive][data-dsh-zh-archive-active=\"true\"]:hover{color:var(--dsw-alias-state-business-primary)}",
	"[data-dsh-zh-ws-row-standalone] button[data-dsh-zh-ws-archive]{margin-left:auto;margin-right:8px;display:none}",
	"[data-dsh-zh-ws-row-standalone]:hover button[data-dsh-zh-ws-archive]{display:inline-flex}",
	"button[data-dsh-zh-ws-selectall]{flex:none;display:inline-flex;align-items:center;justify-content:center;",
	"width:16px;height:16px;border:none;border-radius:4px;padding:0;background:transparent;",
	"cursor:pointer;color:var(--dsw-alias-label-tertiary)}",
	"button[data-dsh-zh-ws-selectall]:hover{color:var(--dsw-alias-label-primary)}",
	"button[data-dsh-zh-ws-selectall][data-dsh-zh-selectall-active=\"true\"]{color:var(--dsw-alias-state-business-primary)}",
	"button[data-dsh-zh-ws-selectall][data-dsh-zh-selectall-active=\"true\"]:hover{color:var(--dsw-alias-state-business-primary)}",
	"[data-dsh-zh-ws-row-standalone] button[data-dsh-zh-ws-selectall]{margin-left:auto;margin-right:2px;display:none}",
	"[data-dsh-zh-ws-row-standalone]:hover button[data-dsh-zh-ws-selectall]{display:inline-flex}"
].join("");
const ARCHIVE_ICONS = {
	"archive": {
		"viewBox": "0 0 20 20",
		"paths": [{
			"d": "M15.8659 2.05975C17.2603 2.05995 18.3913 3.19096 18.3914 4.58527V5.4874C18.3914 6.02747 18.2192 6.52672 17.9303 6.93735C17.9336 6.96524 17.9388 6.99318 17.9388 7.02195V12.8884C17.9388 13.6345 17.9395 14.2379 17.8996 14.7254C17.8642 15.1593 17.7936 15.5499 17.6373 15.9141L17.5654 16.0685C17.278 16.6328 16.8405 17.1046 16.3038 17.434L16.0679 17.5661C15.66 17.7739 15.2196 17.8598 14.7237 17.9003C14.2362 17.9401 13.6327 17.9405 12.8867 17.9405H7.11122C6.36511 17.9405 5.76171 17.9401 5.27418 17.9003C4.84051 17.8649 4.44949 17.7952 4.08545 17.6391L3.93104 17.5661C3.36673 17.2785 2.89392 16.8414 2.56465 16.3044L2.43245 16.0685C2.22473 15.6608 2.13878 15.2211 2.09825 14.7254C2.05841 14.2379 2.05912 13.6345 2.05912 12.8884V7.02195C2.05912 6.99284 2.06422 6.96449 2.06758 6.93629C1.77931 6.52592 1.60858 6.02687 1.60858 5.4874V4.58527C1.60876 3.19084 2.73962 2.05975 4.1341 2.05975H15.8659ZM16.4984 7.92936C16.296 7.98169 16.0847 8.01288 15.8659 8.01291H4.1341C3.91478 8.01291 3.70246 7.98194 3.49955 7.92936V12.8884C3.49955 13.6582 3.50053 14.1927 3.53445 14.608C3.56769 15.0146 3.62923 15.244 3.71635 15.415L3.7925 15.5514C3.98339 15.8627 4.25749 16.1165 4.58464 16.2833L4.72529 16.3435C4.88095 16.3993 5.08638 16.4402 5.39158 16.4651C5.80685 16.4991 6.34138 16.5001 7.11122 16.5001H12.8867C13.6564 16.5001 14.1911 16.499 14.6063 16.4651C15.0128 16.432 15.2423 16.3703 15.4133 16.2833L15.5508 16.2061C15.8618 16.0152 16.116 15.7419 16.2827 15.415L16.3429 15.2732C16.3985 15.1177 16.4396 14.9128 16.4645 14.608C16.4985 14.1927 16.4984 13.6583 16.4984 12.8884V7.92936ZM4.1341 3.50019C3.53511 3.50019 3.0492 3.98631 3.04902 4.58527V5.4874C3.04902 6.08649 3.535 6.57248 4.1341 6.57248H15.8659C16.4648 6.57228 16.951 6.08638 16.951 5.4874V4.58527C16.9509 3.98644 16.4647 3.50038 15.8659 3.50019H4.1341Z",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}, { "d": "M12.7962 12.5661V11.0832H7.20548V12.5661L12.7962 12.5661Z" }]
	},
	"ellipsis": {
		"viewBox": "0 0 16 16",
		"paths": [
			{ "d": "M4.55146 8.00001C4.55146 8.63513 4.03659 9.15001 3.40146 9.15001C2.76634 9.15001 2.25146 8.63513 2.25146 8.00001C2.25146 7.36488 2.76634 6.85001 3.40146 6.85001C4.03659 6.85001 4.55146 7.36488 4.55146 8.00001Z" },
			{ "d": "M9.1476 8.00001C9.1476 8.63513 8.63273 9.15001 7.9976 9.15001C7.36248 9.15001 6.8476 8.63513 6.8476 8.00001C6.8476 7.36488 7.36248 6.85001 7.9976 6.85001C8.63273 6.85001 9.1476 7.36488 9.1476 8.00001Z" },
			{ "d": "M13.7486 8.00001C13.7486 8.63513 13.2338 9.15001 12.5986 9.15001C11.9635 9.15001 11.4486 8.63513 11.4486 8.00001C11.4486 7.36488 11.9635 6.85001 12.5986 6.85001C13.2338 6.85001 13.7486 7.36488 13.7486 8.00001Z" }
		]
	},
	"edit": {
		"viewBox": "0 0 16 16",
		"paths": [{ "d": "M9.94076 1.34942C10.7047 0.90231 11.6503 0.902415 12.4143 1.34942C12.7061 1.52015 12.9688 1.79118 13.3104 2.13284C13.6521 2.47448 13.9231 2.73721 14.0939 3.02894C14.5408 3.79294 14.5409 4.73856 14.0939 5.50251C13.9231 5.79415 13.652 6.05704 13.3104 6.39861L6.65932 13.0497C6.28068 13.4284 6.00695 13.7108 5.66543 13.9097C5.32391 14.1085 4.94315 14.2074 4.42705 14.3498L3.24394 14.6761C2.77527 14.8054 2.34538 14.9262 2.00131 14.9684C1.65196 15.0112 1.17964 15.0013 0.810764 14.6325C0.441921 14.2637 0.432107 13.7913 0.47486 13.442C0.517035 13.0979 0.6379 12.668 0.767181 12.1993L1.09352 11.0162C1.23588 10.5001 1.33481 10.1193 1.5336 9.77784C1.7325 9.43632 2.0149 9.1626 2.39355 8.78395L9.04466 2.13284C9.38625 1.79126 9.64911 1.52016 9.94076 1.34942ZM15.5427 14.8398H7.55223L8.96707 13.425H15.5427V14.8398ZM3.39382 9.78422C2.965 10.213 2.84244 10.3436 2.75709 10.49C2.67183 10.6366 2.61862 10.8079 2.45733 11.3925L2.13099 12.5756C2.00183 13.0439 1.92194 13.3419 1.88863 13.5536C2.10041 13.5204 2.39872 13.4416 2.86764 13.3123L4.05075 12.9859C4.63544 12.8246 4.80669 12.7715 4.95323 12.6862C5.09968 12.6008 5.23022 12.4783 5.65905 12.0494L10.721 6.98644L8.45577 4.72121L3.39382 9.78422ZM11.7 2.57079C11.3774 2.38198 10.9777 2.38198 10.6551 2.57079C10.5602 2.62647 10.4487 2.72931 10.0449 3.13311L9.45604 3.72094L11.7213 5.98617L12.3102 5.39833C12.7139 4.99457 12.8168 4.88307 12.8725 4.78818C13.0613 4.46561 13.0612 4.06585 12.8725 3.74326C12.8169 3.64827 12.7146 3.53752 12.3102 3.13311C11.9057 2.72863 11.795 2.6264 11.7 2.57079Z" }]
	},
	"branch": {
		"viewBox": "0 0 16 16",
		"paths": [{
			"d": "M13.0762 1.37207C14.0846 1.37228 14.9021 2.19077 14.9023 3.19922C14.9022 4.20772 14.0847 5.02518 13.0762 5.02539C12.2967 5.02539 11.6325 4.53691 11.3701 3.84961H4.35547C4.79397 4.26458 5.15861 4.7644 5.41699 5.33496L7.10645 9.06738C7.88526 10.7875 9.55104 11.9228 11.4189 12.0371C11.7085 11.4109 12.3411 10.9756 13.0762 10.9756C14.0843 10.9759 14.9023 11.7936 14.9023 12.8018C14.9023 13.81 14.0843 14.6277 13.0762 14.6279C12.2534 14.6279 11.5574 14.0832 11.3291 13.335C8.9868 13.1879 6.89981 11.7612 5.92285 9.60352L4.23242 5.87109C3.67503 4.64033 2.44878 3.84961 1.09766 3.84961V2.54883C1.10665 2.54883 1.11601 2.54975 1.125 2.5498L11.3701 2.54883C11.6326 1.86151 12.2969 1.37207 13.0762 1.37207ZM13.0762 12.2764C12.7858 12.2764 12.5508 12.5114 12.5508 12.8018C12.5508 13.0921 12.7858 13.3281 13.0762 13.3281C13.3664 13.3279 13.6025 13.092 13.6025 12.8018C13.6025 12.5115 13.3664 12.2766 13.0762 12.2764ZM13.0762 2.67285C12.7855 2.67285 12.55 2.90861 12.5498 3.19922C12.5499 3.48987 12.7855 3.72559 13.0762 3.72559C13.3667 3.72538 13.6024 3.48975 13.6025 3.19922C13.6023 2.90874 13.3666 2.67306 13.0762 2.67285Z",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}]
	}
};
function makeIcon(name, size = 16) {
	const icon = ARCHIVE_ICONS[name];
	if (!icon) return null;
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", String(size));
	svg.setAttribute("height", String(size));
	svg.setAttribute("viewBox", icon.viewBox);
	svg.setAttribute("fill", "none");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	for (const p of icon.paths) {
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", p.d);
		path.setAttribute("fill", "currentColor");
		if (p.fillRule) path.setAttribute("fill-rule", p.fillRule);
		if (p.clipRule) path.setAttribute("clip-rule", p.clipRule);
		svg.appendChild(path);
	}
	return svg;
}
const UNGROUPED_KEY = "__dsh-zh-ungrouped__";
const HIDDEN_ROW_MARK = "data-dsh-zh-archive-hides-row";
const COLLAPSED_LIMIT = 5;
const EXPAND_STEP = 5;
const ARCHIVE_WS_NEW_SESSION = ["在“", "New session in "];
const ARCHIVE_BTN_MARK = "data-dsh-zh-ws-archive";
const ARCHIVE_ROW_MARK = "data-dsh-zh-ws-archive-row";
const SELECT_ALL_MARK = "data-dsh-zh-ws-selectall";
const SELECT_ALL_ACTIVE = "data-dsh-zh-selectall-active";
const BATCH_CHECK_ATTR = "data-dsh-zh-batch-check";
function installArchiveView(zhCtx) {
	const { ctx } = zhCtx;
	fetchDeletedSessionIds();
	let activeDispose = null;
	const startArchiveView = () => {
		if (activeDispose !== null) return;
		try {
			activeDispose = runArchiveView(ctx);
		} catch {}
	};
	const stopArchiveView = () => {
		if (activeDispose === null) return;
		const dispose = activeDispose;
		activeDispose = null;
		try {
			dispose();
		} catch {}
	};
	const syncEnabled = () => {
		if (settingsStore.getSnapshot().archiveViewEnabled === true) startArchiveView();
		else stopArchiveView();
	};
	const unsub = settingsStore.subscribe(syncEnabled);
	syncEnabled();
	return function() {
		unsub();
		stopArchiveView();
	};
}
function runArchiveView(ctx) {
	if (typeof document === "undefined" || typeof MutationObserver === "undefined") return () => {};
	if (document.body === null) return () => {};
	const localeService = ctx.locale;
	let archiveT = (key) => key;
	let localeDispose = null;
	try {
		localeDispose = localeService.register(ZH_ARCHIVE_NS, archiveLocales[ZH_ARCHIVE_NS]);
	} catch {}
	archiveT = localeService.bind(ZH_ARCHIVE_NS);
	let styleObserver = null;
	const putStyle = (tag, text) => {
		if (!document.head) return;
		try {
			if (document.head.querySelector(`style[data-plugin-css="${tag}"]`) === null) {
				const el = document.createElement("style");
				el.setAttribute("data-plugin", "zh-feature");
				el.setAttribute("data-plugin-css", tag);
				el.textContent = Array.isArray(text) ? text.join("") : text;
				document.head.appendChild(el);
			}
		} catch {}
	};
	const ensureStyles = () => {
		if (!document.head) return;
		putStyle("dsh-zh/archive-view.css", ARCHIVE_VIEW_CSS);
		putStyle("dsh-zh/archive-button.css", ARCHIVE_BTN_CSS);
		if (styleObserver) styleObserver.disconnect();
		styleObserver = new MutationObserver((records) => {
			let external = false;
			for (const record of records) {
				const added = record.addedNodes;
				if (!added || added.length === 0) continue;
				for (const node of Array.from(added)) {
					if (node.nodeType !== 1) continue;
					const tag = node.getAttribute?.("data-plugin-css");
					if (tag === "dsh-zh/archive-view.css" || tag === "dsh-zh/archive-button.css") continue;
					external = true;
					break;
				}
				if (external) break;
			}
			if (external) ensureStyles();
		});
		styleObserver.observe(document.head, { childList: true });
	};
	ensureStyles();
	const memberSetOf = (items, workspaceId) => {
		const memberOf = /* @__PURE__ */ new Set();
		if (Array.isArray(items)) for (const item of items) {
			if (!item || typeof item !== "object" || !Array.isArray(item.sessionIds)) continue;
			if (workspaceId === UNGROUPED_KEY) for (const id of item.sessionIds) memberOf.add(String(id));
			else if (String(item.workspaceId) === String(workspaceId)) {
				for (const id of item.sessionIds) memberOf.add(String(id));
				break;
			}
		}
		return memberOf;
	};
	const rowOf = (id, byId) => {
		const summary = byId[String(id)];
		if (summary === void 0 || summary === null || typeof summary !== "object") return null;
		if (summary.origin === "subagent" || summary.blank === true) return null;
		return {
			id: String(id),
			title: summary.displayTitle ? String(summary.displayTitle) : String(id),
			updatedAt: typeof summary.updatedAt === "number" ? summary.updatedAt : 0
		};
	};
	const archivedRowsOf = (archivedIds, items, byId, workspaceId) => {
		const memberOf = memberSetOf(items, workspaceId);
		const rows = [];
		const archiveList = Array.isArray(archivedIds) ? archivedIds : [];
		for (const raw of archiveList) {
			const key = String(raw);
			if (workspaceId === UNGROUPED_KEY) {
				if (memberOf.has(key)) continue;
			} else if (!memberOf.has(key)) continue;
			const row = rowOf(key, byId);
			if (row === null) continue;
			rows.push(row);
		}
		rows.sort((a, b) => b.updatedAt - a.updatedAt);
		return rows;
	};
	const mergedRowsOf = (archivedIds, items, byId, workspaceId, orderedIds) => {
		const memberOf = memberSetOf(items, workspaceId);
		const rows = [];
		const seen = /* @__PURE__ */ new Set();
		if (Array.isArray(orderedIds)) for (const id of orderedIds) {
			const key = String(id);
			if (seen.has(key)) continue;
			const row = rowOf(key, byId);
			if (row === null) continue;
			if (workspaceId === UNGROUPED_KEY) {
				if (memberOf.has(key)) continue;
			} else if (!memberOf.has(key)) continue;
			rows.push(row);
			seen.add(key);
		}
		for (const row of archivedRowsOf(archivedIds, items, byId, workspaceId)) {
			if (seen.has(row.id)) continue;
			rows.push(row);
			seen.add(row.id);
		}
		return rows;
	};
	const archiveRelativeTime = (updatedAt, now) => {
		const MIN = 6e4, HOUR = 36e5, DAY = 864e5;
		const diff = Math.max(0, now - updatedAt);
		if (diff < MIN) return ["time.now", 0];
		if (diff < HOUR) return ["time.minutes", Math.floor(diff / MIN)];
		if (diff < DAY) return ["time.hours", Math.floor(diff / HOUR)];
		if (diff < 30 * DAY) return ["time.days", Math.floor(diff / DAY)];
		if (diff < 365 * DAY) return ["time.months", Math.floor(diff / (30 * DAY))];
		return ["time.years", Math.floor(diff / (365 * DAY))];
	};
	const readSnapshots = () => {
		let sessions = null;
		let workspaces = null;
		try {
			sessions = ctx.sessions.list.getSnapshot();
		} catch {}
		try {
			workspaces = ctx.workspaces.list.getSnapshot();
		} catch {}
		return {
			sessions,
			workspaces
		};
	};
	let activeTarget = null;
	let expandedCount = COLLAPSED_LIMIT;
	let orderedIds = null;
	let sectionEl = null;
	let sectionRaf = null;
	let timeRefreshTimer = null;
	let sectionRenderKey = null;
	const clearArchiveTimers = () => {
		if (timeRefreshTimer !== null) {
			clearInterval(timeRefreshTimer);
			timeRefreshTimer = null;
		}
		if (sectionRaf !== null) {
			cancelAnimationFrame(sectionRaf);
			sectionRaf = null;
		}
	};
	const enterArchive = (workspaceId, label) => {
		activeTarget = {
			workspaceId: String(workspaceId),
			label
		};
		expandedCount = COLLAPSED_LIMIT;
		const snap = readSnapshots();
		orderedIds = archivedRowsOf((Array.isArray(snap.workspaces?.archivedSessionIds) ? snap.workspaces.archivedSessionIds : []).filter((id) => !isSessionDeleted(String(id))), snap.workspaces?.items, snap.sessions?.byId ?? {}, String(workspaceId)).map((row) => row.id);
		if (timeRefreshTimer === null) timeRefreshTimer = setInterval(() => {
			if (activeTarget === null) return;
			sectionRenderKey = null;
			renderSectionContent();
		}, 6e4);
		syncArchivedSection();
	};
	const leaveArchive = () => {
		if (activeTarget === null) return;
		clearArchiveTimers();
		activeTarget = null;
		expandedCount = COLLAPSED_LIMIT;
		orderedIds = null;
		removeSection();
		syncButtonActiveMarks();
	};
	const toggleArchive = (workspaceId, label) => {
		if (activeTarget !== null && String(activeTarget.workspaceId) === String(workspaceId)) leaveArchive();
		else enterArchive(workspaceId, label);
	};
	const unarchiveThen = (sessionId) => {
		const openSession = () => {
			try {
				const sessions = ctx.sessions;
				if (typeof sessions.open === "function") sessions.open(sessionId);
			} catch {}
		};
		fetch("/dsh-zh/api/session.unarchive", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ sessionId })
		}).then((response) => response.json().catch(() => null)).then((parsed) => {
			const refreshPromises = [];
			try {
				const workspaces = ctx.workspaces;
				if (typeof workspaces.refresh === "function") refreshPromises.push(workspaces.refresh());
			} catch {}
			try {
				const sessions = ctx.sessions;
				if (typeof sessions.refresh === "function") refreshPromises.push(sessions.refresh());
			} catch {}
			if (parsed === null || parsed.ok !== true) {
				openSession();
				return;
			}
			Promise.all(refreshPromises).then(openSession, openSession);
		}).catch(openSession);
	};
	const openArchived = (sessionId) => {
		unarchiveThen(sessionId);
	};
	let menuEl = null;
	let menuRowId = null;
	let dialogEl = null;
	let toastEl = null;
	let toastTimer = null;
	const showToast = (text, duration) => {
		try {
			if (toastTimer !== null) {
				clearTimeout(toastTimer);
				toastTimer = null;
			}
			if (toastEl !== null && toastEl.parentNode !== null) toastEl.parentNode.removeChild(toastEl);
			toastEl = document.createElement("div");
			toastEl.setAttribute("class", "dsh-zh-archive-toast");
			toastEl.setAttribute("role", "status");
			toastEl.textContent = text;
			document.body.appendChild(toastEl);
			toastTimer = setTimeout(() => {
				toastTimer = null;
				if (toastEl !== null && toastEl.parentNode !== null) toastEl.parentNode.removeChild(toastEl);
				toastEl = null;
			}, duration);
		} catch {}
	};
	const closeDialog = () => {
		if (dialogEl !== null && dialogEl.parentNode !== null) dialogEl.parentNode.removeChild(dialogEl);
		dialogEl = null;
	};
	const showDialog = (build) => {
		closeDialog();
		const overlay = document.createElement("div");
		overlay.setAttribute("data-dsh-zh-archive-dialog-mask", "");
		const card = document.createElement("div");
		card.setAttribute("data-dsh-zh-archive-dialog", "");
		build(card, () => {
			closeDialog();
		});
		overlay.appendChild(card);
		overlay.addEventListener("click", (event) => {
			if (event.target === overlay) closeDialog();
		}, false);
		document.body.appendChild(overlay);
		dialogEl = overlay;
	};
	const closeMenu = () => {
		if (menuEl !== null && menuEl.parentNode !== null) menuEl.parentNode.removeChild(menuEl);
		menuEl = null;
		menuRowId = null;
		try {
			const open = document.body.querySelectorAll("[data-dsh-zh-archive-menu-open]");
			for (let i = 0; i < open.length; i += 1) open[i].removeAttribute("data-dsh-zh-archive-menu-open");
		} catch {}
	};
	const dropRow = (sessionId) => {
		if (Array.isArray(orderedIds)) orderedIds = orderedIds.filter((id) => id !== sessionId);
		sectionRenderKey = null;
		renderSectionContent();
	};
	const openRenameDialog = (row) => {
		showDialog((card, close) => {
			const titleEl = document.createElement("div");
			titleEl.setAttribute("data-dsh-zh-archive-dialog-title", "");
			titleEl.textContent = archiveT("rename.title");
			const input = document.createElement("input");
			input.type = "text";
			input.setAttribute("data-dsh-zh-archive-rename-input", "");
			input.value = row.title;
			const actions = document.createElement("div");
			actions.setAttribute("data-dsh-zh-archive-dialog-actions", "");
			const cancel = document.createElement("button");
			cancel.type = "button";
			cancel.textContent = archiveT("rename.cancel");
			cancel.style.cssText = "padding:6px 16px;border-radius:10px;border:1px solid rgba(127,127,127,0.35);background:transparent;cursor:pointer;font:inherit;font-size:14px";
			const ok = document.createElement("button");
			ok.type = "button";
			ok.textContent = archiveT("rename.ok");
			ok.style.cssText = "padding:6px 16px;border-radius:10px;border:none;background:var(--dsw-alias-state-business-primary,#4f6ef7);color:#fff;cursor:pointer;font:inherit;font-size:14px";
			const submit = () => {
				const title = input.value.trim();
				if (title === "") return;
				try {
					const sessions = ctx.sessions;
					const binding = typeof sessions.binding === "function" ? sessions.binding(row.id) : void 0;
					const session = binding !== void 0 && binding !== null ? binding.session : void 0;
					if (session === void 0 || session === null || typeof session.rename !== "function") {
						close();
						return;
					}
					const onRenameFailed = (error) => {
						const message = error !== null && typeof error === "object" && "message" in error ? String(error.message) : String(error);
						showToast(archiveT("rename.failed", { message }), 5e3);
					};
					const renameResult = session.rename(title);
					if (renameResult !== null && typeof renameResult === "object" && typeof renameResult.then === "function") renameResult.then((result) => {
						if (result !== null && typeof result === "object" && result.ok === true) {
							close();
							sectionRenderKey = null;
						} else {
							const message = result !== null && typeof result === "object" && result.error !== void 0 && result.error !== null && result.error.message !== void 0 ? result.error.message : "rpc";
							showToast(archiveT("rename.failed", { message: String(message) }), 5e3);
						}
					}, onRenameFailed);
					else close();
				} catch {
					close();
				}
			};
			cancel.addEventListener("click", close, false);
			ok.addEventListener("click", submit, false);
			input.addEventListener("keydown", (event) => {
				if (event.key === "Enter") submit();
			}, false);
			actions.appendChild(cancel);
			actions.appendChild(ok);
			card.appendChild(titleEl);
			card.appendChild(input);
			card.appendChild(actions);
		});
	};
	const forkArchived = (sessionId) => {
		try {
			const sessions = ctx.sessions;
			if (sessions.fork === void 0 || typeof sessions.fork !== "function") return;
			sessions.fork({
				sessionId,
				increaseTitle: true
			}).then((childId) => {
				if (typeof sessions.open === "function") sessions.open(childId);
			}, () => {});
		} catch {}
	};
	const unarchiveOnly = (sessionId) => {
		dropRow(sessionId);
		fetch("/dsh-zh/api/session.unarchive", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ sessionId })
		}).then((response) => response.json().catch(() => null)).then(() => {
			try {
				const workspaces = ctx.workspaces;
				if (typeof workspaces.refresh === "function") workspaces.refresh();
			} catch {}
			try {
				const sessions = ctx.sessions;
				if (typeof sessions.refresh === "function") sessions.refresh();
			} catch {}
		}).catch(() => {});
	};
	const confirmDelete = (row) => {
		showDialog((card, close) => {
			const titleEl = document.createElement("div");
			titleEl.setAttribute("data-dsh-zh-archive-dialog-title", "");
			titleEl.textContent = archiveT("delete.title");
			const descEl = document.createElement("div");
			descEl.setAttribute("data-dsh-zh-archive-dialog-desc", "");
			descEl.textContent = archiveT("delete.desc");
			const actions = document.createElement("div");
			actions.setAttribute("data-dsh-zh-archive-dialog-actions", "");
			const cancel = document.createElement("button");
			cancel.type = "button";
			cancel.textContent = archiveT("delete.cancel");
			cancel.style.cssText = "padding:6px 16px;border-radius:10px;border:1px solid rgba(127,127,127,0.35);background:transparent;cursor:pointer;font:inherit;font-size:14px";
			const ok = document.createElement("button");
			ok.type = "button";
			ok.textContent = archiveT("delete.ok");
			ok.style.cssText = "padding:6px 16px;border-radius:10px;border:none;background:#d93026;color:#fff;cursor:pointer;font:inherit;font-size:14px";
			cancel.addEventListener("click", close, false);
			ok.addEventListener("click", () => {
				close();
				performDelete(row);
			}, false);
			actions.appendChild(cancel);
			actions.appendChild(ok);
			card.appendChild(titleEl);
			card.appendChild(descEl);
			card.appendChild(actions);
		});
	};
	const performDelete = (row) => {
		showToast(archiveT("delete.deleting"), 2500);
		let currentSessionId = null;
		try {
			const snapshot = ctx.sessions.list.getSnapshot();
			if (snapshot !== null && typeof snapshot === "object" && typeof snapshot.current === "string") currentSessionId = snapshot.current;
		} catch {}
		return fetch("/dsh-zh/api/session.delete", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				sessionId: row.id,
				title: row.title,
				currentSessionId
			})
		}).then((response) => response.json().catch(() => null)).then((parsed) => {
			if (parsed === null || parsed.ok !== true) {
				const message = parsed !== null && parsed.error !== void 0 && parsed.error !== null ? parsed.error.message : "HTTP";
				showToast(archiveT("delete.failed", { message: String(message) }), 5e3);
				return false;
			}
			showToast(archiveT("delete.done"), 4e3);
			dropRow(row.id);
			if (currentSessionId !== null && currentSessionId === row.id) try {
				const sessions = ctx.sessions;
				if (typeof sessions.clear === "function") sessions.clear();
			} catch {}
			try {
				const workspaces = ctx.workspaces;
				if (typeof workspaces.refresh === "function") workspaces.refresh();
			} catch {}
			try {
				const sessions = ctx.sessions;
				if (typeof sessions.refresh === "function") sessions.refresh();
			} catch {}
			return true;
		}).catch((error) => {
			showToast(archiveT("delete.failed", { message: error instanceof Error ? error.message : String(error) }), 5e3);
			return false;
		});
	};
	const openMenu = (anchorBtn, row, rowEl) => {
		closeMenu();
		menuEl = document.createElement("div");
		menuEl.setAttribute("role", "menu");
		menuEl.setAttribute("data-dsh-zh-archive-menu", "");
		const appendItem = (labelKey, iconName, danger, onClick, params) => {
			const item = document.createElement("button");
			item.type = "button";
			item.setAttribute("role", "menuitem");
			item.setAttribute("data-dsh-zh-archive-menu-item", "");
			if (danger) item.setAttribute("data-dsh-zh-archive-menu-danger", "true");
			const icon = document.createElement("span");
			icon.setAttribute("data-dsh-zh-archive-menu-icon", "");
			if (iconName !== null) {
				const svg = makeIcon(iconName, 16);
				if (svg !== null) icon.appendChild(svg);
			} else {
				icon.textContent = "🗑";
				icon.style.fontSize = "14px";
			}
			const labelEl = document.createElement("span");
			labelEl.setAttribute("data-dsh-zh-archive-menu-label", "");
			labelEl.textContent = archiveT(labelKey, params);
			item.appendChild(icon);
			item.appendChild(labelEl);
			item.addEventListener("click", (event) => {
				event.preventDefault();
				event.stopPropagation();
				closeMenu();
				onClick();
			}, false);
			menuEl.appendChild(item);
		};
		appendItem("menu.rename", "edit", false, () => {
			openRenameDialog(row);
		});
		appendItem("menu.fork", "branch", false, () => {
			forkArchived(row.id);
		});
		appendItem("menu.unarchive", "archive", false, () => {
			unarchiveOnly(row.id);
		});
		try {
			if (settingsStore.getSnapshot().deleteSessionEnabled === true) appendItem("menu.delete", null, true, () => {
				confirmDelete(row);
			});
		} catch {}
		document.body.appendChild(menuEl);
		try {
			const rect = anchorBtn.getBoundingClientRect();
			const width = menuEl.offsetWidth;
			const height = menuEl.offsetHeight;
			let left = rect.right - width;
			if (left < 8) left = 8;
			let top = rect.bottom + 4;
			if (typeof window !== "undefined" && typeof window.innerHeight === "number" && top + height > window.innerHeight - 12) top = Math.max(12, rect.top - height - 4);
			menuEl.style.left = `${left}px`;
			menuEl.style.top = `${top}px`;
		} catch {}
		menuRowId = row.id;
		rowEl.setAttribute("data-dsh-zh-archive-menu-open", "");
	};
	const removeSection = () => {
		if (sectionRaf !== null) {
			cancelAnimationFrame(sectionRaf);
			sectionRaf = null;
		}
		if (sectionEl !== null && sectionEl.parentNode !== null) sectionEl.parentNode.removeChild(sectionEl);
		sectionEl = null;
		sectionRenderKey = null;
		closeMenu();
		closeDialog();
		restoreHiddenSessions();
	};
	const isWorkspaceRowHost = (child) => {
		if (isWorkspaceRow(child)) return true;
		try {
			const inner = child.querySelectorAll("div[role=\"treeitem\"][aria-expanded]");
			for (let i = 0; i < inner.length; i += 1) if (isWorkspaceRow(inner[i])) return true;
		} catch {}
		return false;
	};
	const hideWorkspaceSessions = (host) => {
		try {
			const children = host.children;
			for (let i = 0; i < children.length; i += 1) {
				const child = children[i];
				if (child === sectionEl) continue;
				if (child.getAttribute(HIDDEN_ROW_MARK) !== null) continue;
				if (isWorkspaceRowHost(child)) continue;
				child.setAttribute(HIDDEN_ROW_MARK, "");
				child.style.display = "none";
			}
		} catch {}
	};
	const restoreHiddenSessions = () => {
		try {
			const hidden = document.body.querySelectorAll(`[${HIDDEN_ROW_MARK}]`);
			for (let i = 0; i < hidden.length; i += 1) {
				const el = hidden[i];
				el.removeAttribute(HIDDEN_ROW_MARK);
				el.style.display = "";
			}
		} catch {}
	};
	const findListContainer = () => {
		try {
			return document.body.querySelector("div[data-slot=\"sidebar.workspaces\"] [role=\"tree\"]");
		} catch {}
		return null;
	};
	const groupHostOf = (row) => {
		try {
			const treeEl = findListContainer();
			if (treeEl === null) return null;
			let el = row.parentElement;
			while (el !== null && el !== document.body) {
				if (el.parentElement === treeEl) return el;
				el = el.parentElement;
			}
		} catch {}
		return null;
	};
	const targetRowOf = (workspaceId) => {
		const rows = findWorkspaceRows(document.body);
		for (const row of rows) {
			const info = workspaceInfoOfRow(row);
			if (info !== null && String(info.workspaceId) === String(workspaceId)) return row;
		}
		return null;
	};
	const renderSectionContent = () => {
		if (sectionEl === null || activeTarget === null) return;
		const snap = readSnapshots();
		const archivedIds = (Array.isArray(snap.workspaces?.archivedSessionIds) ? snap.workspaces.archivedSessionIds : []).filter((id) => !isSessionDeleted(String(id)));
		const items = snap.workspaces?.items;
		const byId = snap.sessions?.byId ?? {};
		const rows = mergedRowsOf(archivedIds, items, byId, activeTarget.workspaceId, orderedIds);
		const currentId = snap.sessions?.current;
		const now = Date.now();
		const shown = rows.slice(0, expandedCount);
		const key = `${expandedCount}|${String(currentId)}|` + rows.map((r) => `${r.id}:${r.title}:${r.updatedAt}`).join(",");
		if (key === sectionRenderKey) return;
		closeMenu();
		sectionRenderKey = key;
		while (sectionEl.firstChild !== null) sectionEl.removeChild(sectionEl.firstChild);
		if (rows.length === 0) {
			const emptyEl = document.createElement("div");
			emptyEl.setAttribute("data-dsh-zh-archive-empty", "");
			emptyEl.textContent = archiveT("empty");
			sectionEl.appendChild(emptyEl);
			return;
		}
		for (const row of shown) {
			const rowEl = document.createElement("div");
			rowEl.setAttribute("role", "treeitem");
			rowEl.setAttribute("data-dsh-zh-archive-row", "");
			rowEl.setAttribute("data-dsh-zh-archive-id", row.id);
			rowEl.setAttribute("data-dsh-zh-archive-selected", row.id === currentId ? "true" : "false");
			rowEl.setAttribute("aria-selected", row.id === currentId ? "true" : "false");
			const slotEl = document.createElement("span");
			slotEl.setAttribute("data-dsh-zh-archive-slot", "");
			if (settingsStore.getSnapshot().batchOpsEnabled === true) {
				slotEl.setAttribute("class", "dsh-zh-archive-slot");
				slotEl.appendChild(createBatchCheck(row.id, archiveT("select.aria", { name: row.title })));
			}
			rowEl.appendChild(slotEl);
			const titleEl = document.createElement("span");
			titleEl.setAttribute("data-dsh-zh-archive-title", "");
			titleEl.textContent = row.title;
			rowEl.appendChild(titleEl);
			if (row.updatedAt > 0) {
				const timeKey = archiveRelativeTime(row.updatedAt, now);
				const timeEl = document.createElement("span");
				timeEl.setAttribute("data-dsh-zh-archive-time", "");
				timeEl.textContent = archiveT(timeKey[0], { n: timeKey[1] });
				rowEl.appendChild(timeEl);
			}
			const actionsEl = document.createElement("span");
			actionsEl.setAttribute("data-dsh-zh-archive-actions", "");
			const actionsBtn = document.createElement("button");
			actionsBtn.type = "button";
			actionsBtn.setAttribute("data-dsh-zh-archive-actions-button", "");
			actionsBtn.setAttribute("aria-label", archiveT("actions.aria", { name: row.title }));
			const ellipsisIcon = makeIcon("ellipsis", 16);
			if (ellipsisIcon !== null) actionsBtn.appendChild(ellipsisIcon);
			actionsBtn.addEventListener("click", (event) => {
				event.preventDefault();
				event.stopPropagation();
				if (menuRowId === row.id) closeMenu();
				else openMenu(actionsBtn, row, rowEl);
			}, false);
			actionsEl.appendChild(actionsBtn);
			rowEl.appendChild(actionsEl);
			rowEl.addEventListener("click", () => {
				openArchived(row.id);
			}, false);
			sectionEl.appendChild(rowEl);
		}
		const hasMore = rows.length > expandedCount;
		const canCollapse = expandedCount > COLLAPSED_LIMIT;
		if (rows.length > COLLAPSED_LIMIT && (hasMore || canCollapse)) {
			const moreBtn = document.createElement("button");
			moreBtn.type = "button";
			moreBtn.setAttribute("data-dsh-zh-archive-more", "");
			moreBtn.setAttribute("aria-expanded", hasMore ? "false" : "true");
			moreBtn.textContent = hasMore ? archiveT("expand", { n: Math.min(EXPAND_STEP, rows.length - expandedCount) }) : archiveT("collapse");
			moreBtn.addEventListener("click", () => {
				if (rows.length > expandedCount) expandedCount += EXPAND_STEP;
				else expandedCount = COLLAPSED_LIMIT;
				renderSectionContent();
			}, false);
			sectionEl.appendChild(moreBtn);
		}
	};
	const syncArchivedSection = () => {
		if (activeTarget === null) {
			removeSection();
			syncButtonActiveMarks();
			return;
		}
		const row = targetRowOf(activeTarget.workspaceId);
		if (row === null) {
			removeSection();
			syncButtonActiveMarks();
			return;
		}
		const host = groupHostOf(row);
		if (host === null) {
			removeSection();
			syncButtonActiveMarks();
			return;
		}
		if (sectionEl === null) {
			sectionEl = document.createElement("div");
			sectionEl.setAttribute("data-dsh-zh-archive-section", "");
		}
		if (sectionEl.parentNode !== host) host.appendChild(sectionEl);
		hideWorkspaceSessions(host);
		try {
			sectionEl.style.display = row.getAttribute("aria-expanded") === "false" ? "none" : "";
		} catch {}
		renderSectionContent();
		syncButtonActiveMarks();
	};
	const scheduleSectionSync = () => {
		if (sectionRaf !== null) return;
		sectionRaf = requestAnimationFrame(() => {
			sectionRaf = null;
			syncArchivedSection();
		});
	};
	const readGroupFromRow = (row) => {
		try {
			const fiberKeys = Object.keys(row).filter((key) => key.startsWith("__reactFiber$"));
			for (const key of fiberKeys) {
				let fiber = row[key];
				let depth = 0;
				while (fiber !== null && fiber !== void 0 && depth < 40) {
					const memoizedProps = fiber.memoizedProps;
					if (memoizedProps !== null && memoizedProps !== void 0 && typeof memoizedProps === "object") {
						const group = memoizedProps.group;
						if (group !== null && typeof group === "object") {
							const g = group;
							return {
								workspaceId: typeof g.workspaceId === "string" ? g.workspaceId : void 0,
								label: typeof g.label === "string" ? g.label : ""
							};
						}
					}
					fiber = fiber.return;
					depth += 1;
				}
			}
		} catch {}
		return null;
	};
	const isWorkspaceRow = (row) => {
		if (row === null || row === void 0 || row.nodeType !== 1 || typeof row.querySelector !== "function") return false;
		if (row.getAttribute("role") !== "treeitem") return false;
		if (row.getAttribute("aria-expanded") === null) return false;
		for (const mark of ARCHIVE_WS_NEW_SESSION) try {
			if (row.querySelector(`button[aria-label^="${mark}"]`) !== null) return true;
		} catch {}
		const group = readGroupFromRow(row);
		return group !== null && group.workspaceId === void 0;
	};
	const findWorkspaceRows = (root) => {
		const rows = [];
		if (root === void 0 || root === null || typeof root.querySelectorAll !== "function") return rows;
		const all = root.querySelectorAll("div[role=\"treeitem\"][aria-expanded]");
		for (let i = 0; i < all.length; i += 1) if (isWorkspaceRow(all[i])) rows.push(all[i]);
		return rows;
	};
	const rowTitleOf = (row) => {
		try {
			const titleSpan = row.querySelector("span[class*=\"title\"]");
			if (titleSpan !== null && titleSpan.textContent !== "") return (titleSpan.textContent ?? "").trim();
		} catch {}
		return "";
	};
	const workspaceInfoOfRow = (row) => {
		const group = readGroupFromRow(row);
		if (group !== null) {
			if (typeof group.workspaceId === "string") return {
				workspaceId: group.workspaceId,
				label: group.label !== "" ? group.label : rowTitleOf(row)
			};
			if (group.workspaceId === void 0) {
				const title = rowTitleOf(row);
				return {
					workspaceId: UNGROUPED_KEY,
					label: title !== "" ? title : archiveT("group.ungrouped")
				};
			}
		}
		const title = rowTitleOf(row);
		if (title === "") return null;
		try {
			const snap = ctx.workspaces.list.getSnapshot();
			if (snap !== null && Array.isArray(snap.items)) {
				let matched = null;
				for (const item of snap.items) if (item !== null && typeof item === "object" && item.title === title) {
					if (matched !== null) return null;
					matched = item;
				}
				if (matched !== null && typeof matched.workspaceId === "string") return {
					workspaceId: String(matched.workspaceId),
					label: title
				};
			}
		} catch {}
		return {
			workspaceId: UNGROUPED_KEY,
			label: title
		};
	};
	const syncButtonActiveMarks = () => {
		try {
			const buttons = document.body.querySelectorAll(`button[${ARCHIVE_BTN_MARK}]`);
			for (let i = 0; i < buttons.length; i += 1) {
				const button = buttons[i];
				let active = false;
				if (activeTarget !== null) {
					let el = button;
					while (el !== null && el !== document.body) {
						if (isWorkspaceRow(el)) {
							const info = workspaceInfoOfRow(el);
							if (info !== null && String(info.workspaceId) === String(activeTarget.workspaceId)) active = true;
							break;
						}
						el = el.parentElement;
					}
				}
				button.setAttribute("data-dsh-zh-archive-active", active ? "true" : "false");
			}
		} catch {}
	};
	/** 当前归档视图展示着的归档行 id（以 DOM 为准；视图外的行不参与全选）。 */
	const visibleArchivedIds = () => {
		const ids = [];
		try {
			if (sectionEl === null) return ids;
			const rows = sectionEl.querySelectorAll("[data-dsh-zh-archive-id]");
			for (let i = 0; i < rows.length; i += 1) {
				const id = rows[i].getAttribute("data-dsh-zh-archive-id");
				if (id !== null && id !== "") ids.push(id);
			}
		} catch {}
		return ids;
	};
	/** 把选择状态同步回归档行上的复选框。 */
	const syncArchivedChecks = () => {
		try {
			if (sectionEl === null) return;
			const boxes = sectionEl.querySelectorAll(`input[${BATCH_CHECK_ATTR}]`);
			for (let i = 0; i < boxes.length; i += 1) {
				const box = boxes[i];
				const rowEl = typeof box.closest === "function" ? box.closest("[data-dsh-zh-archive-id]") : null;
				const id = rowEl !== null ? rowEl.getAttribute("data-dsh-zh-archive-id") : null;
				if (id !== null && id !== "") box.checked = batchSelection.has(id);
			}
		} catch {}
	};
	/** 刷新所有「全选」按钮的高亮：当前视图可勾选会话全选中时点亮。 */
	const syncSelectAllMarks = () => {
		try {
			const ids = visibleArchivedIds();
			const allOn = ids.length > 0 && ids.every((id) => batchSelection.has(id));
			const buttons = document.body.querySelectorAll(`button[${SELECT_ALL_MARK}]`);
			for (let i = 0; i < buttons.length; i += 1) buttons[i].setAttribute(SELECT_ALL_ACTIVE, allOn ? "true" : "false");
		} catch {}
	};
	/** 全选/取消：当前视图可勾选会话若已全部选中则全部取消，否则全部选中。 */
	const toggleSelectAllInView = () => {
		const ids = visibleArchivedIds();
		if (ids.length === 0) return;
		const allOn = ids.every((id) => batchSelection.has(id));
		for (const id of ids) toggleBatchSelection(id, !allOn);
		syncArchivedChecks();
		syncSelectAllMarks();
	};
	/** 四宫格图标（全部选中）。 */
	const makeSelectAllIcon = () => {
		try {
			const ns = "http://www.w3.org/2000/svg";
			const svg = document.createElementNS(ns, "svg");
			svg.setAttribute("width", "16");
			svg.setAttribute("height", "16");
			svg.setAttribute("viewBox", "0 0 16 16");
			svg.setAttribute("fill", "currentColor");
			for (const cell of [
				[2.5, 2.5],
				[9, 2.5],
				[2.5, 9],
				[9, 9]
			]) {
				const rect = document.createElementNS(ns, "rect");
				rect.setAttribute("x", String(cell[0]));
				rect.setAttribute("y", String(cell[1]));
				rect.setAttribute("width", "4.5");
				rect.setAttribute("height", "4.5");
				rect.setAttribute("rx", "1.2");
				svg.appendChild(rect);
			}
			return svg;
		} catch {
			return null;
		}
	};
	const removeInjectedButtons = (row) => {
		try {
			const existing = row.querySelectorAll(`button[${ARCHIVE_BTN_MARK}], button[${SELECT_ALL_MARK}]`);
			for (let i = 0; i < existing.length; i += 1) {
				const button = existing[i];
				if (button.parentNode !== null) button.parentNode.removeChild(button);
			}
		} catch {}
		try {
			row.removeAttribute(ARCHIVE_ROW_MARK);
			row.removeAttribute("data-dsh-zh-ws-row-standalone");
		} catch {}
	};
	const injectButton = (row) => {
		if (row.getAttribute(ARCHIVE_ROW_MARK) !== null) return;
		if (workspaceInfoOfRow(row) === null) return;
		removeInjectedButtons(row);
		let template = null;
		for (const mark of ARCHIVE_WS_NEW_SESSION) {
			try {
				template = row.querySelector(`button[aria-label^="${mark}"]`);
			} catch {
				template = null;
			}
			if (template !== null) break;
		}
		let button;
		if (template !== null) {
			button = template.cloneNode(true);
			while (button.firstChild !== null) button.removeChild(button.firstChild);
			button.removeAttribute("aria-label");
		} else {
			button = document.createElement("button");
			button.type = "button";
		}
		button.setAttribute("aria-label", archiveT("buttonLabel"));
		button.title = archiveT("buttonTitle");
		button.setAttribute(ARCHIVE_BTN_MARK, "");
		const svg = makeIcon("archive", 16);
		if (svg !== null) button.appendChild(svg);
		button.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation();
			const rowInfo = workspaceInfoOfRow(row);
			if (rowInfo !== null) toggleArchive(rowInfo.workspaceId, rowInfo.label);
		}, false);
		if (template !== null && template.parentElement !== null) {
			const actionsHost = template.parentElement;
			const firstAction = actionsHost.firstElementChild;
			if (firstAction !== null && firstAction !== button) actionsHost.insertBefore(button, firstAction);
			else actionsHost.appendChild(button);
		} else {
			row.appendChild(button);
			row.setAttribute("data-dsh-zh-ws-row-standalone", "");
		}
		const selectAll = document.createElement("button");
		selectAll.type = "button";
		selectAll.setAttribute("aria-label", archiveT("ws.selectall"));
		selectAll.title = archiveT("ws.selectallTitle");
		selectAll.setAttribute(SELECT_ALL_MARK, "");
		selectAll.setAttribute(SELECT_ALL_ACTIVE, "false");
		const selectAllIcon = makeSelectAllIcon();
		if (selectAllIcon !== null) selectAll.appendChild(selectAllIcon);
		selectAll.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation();
			toggleSelectAllInView();
		}, false);
		if (button.parentNode !== null) button.parentNode.insertBefore(selectAll, button);
		else row.appendChild(selectAll);
		row.setAttribute(ARCHIVE_ROW_MARK, "");
	};
	const runButtonPass = () => {
		if (document.body === null) return;
		const rows = findWorkspaceRows(document.body);
		for (const row of rows) injectButton(row);
		syncButtonActiveMarks();
		syncSelectAllMarks();
		if (activeTarget !== null) scheduleSectionSync();
	};
	const ownsButtonNode = (node) => {
		if (node === null || node === void 0 || node.nodeType !== 1) return false;
		if (typeof node.getAttribute !== "function") return false;
		return node.getAttribute(ARCHIVE_BTN_MARK) !== null;
	};
	const ownsOwnNode = (node) => {
		if (node === null || node === void 0 || node.nodeType !== 1) return false;
		if (typeof node.getAttribute !== "function") return false;
		if (node.getAttribute("data-dsh-zh-archive-section") !== null || node.getAttribute("data-dsh-zh-archive-row") !== null || node.getAttribute("data-dsh-zh-archive-more") !== null || node.getAttribute("data-dsh-zh-archive-empty") !== null || node.getAttribute("data-dsh-zh-archive-menu") !== null || node.getAttribute("data-dsh-zh-archive-dialog-mask") !== null || node.getAttribute("class") === "dsh-zh-archive-toast") return true;
		let ancestor = node.parentElement;
		while (ancestor !== null && ancestor !== document.body && ancestor !== void 0) {
			if (typeof ancestor.getAttribute === "function" && (ancestor.getAttribute("data-dsh-zh-archive-section") !== null || ancestor.getAttribute("data-dsh-zh-archive-menu") !== null || ancestor.getAttribute("data-dsh-zh-archive-dialog-mask") !== null)) return true;
			ancestor = ancestor.parentElement;
		}
		return false;
	};
	let buttonObserver = new MutationObserver((records) => {
		if (buttonObserver === null) return;
		let external = false;
		for (const record of records) {
			const added = record.addedNodes;
			if (added !== null && added !== void 0 && added.length > 0) {
				for (let i = 0; i < added.length; i += 1) if (!ownsButtonNode(added[i]) && !ownsOwnNode(added[i])) {
					external = true;
					break;
				}
				if (external) break;
				continue;
			}
			if (record.target !== null && record.target !== void 0 && !ownsButtonNode(record.target) && !ownsOwnNode(record.target)) {
				external = true;
				break;
			}
		}
		if (external) runButtonPass();
		else if (activeTarget !== null) scheduleSectionSync();
	});
	buttonObserver.observe(document.documentElement, {
		childList: true,
		subtree: true
	});
	runButtonPass();
	const dataUnsubs = [];
	try {
		if (typeof ctx.sessions.list.subscribe === "function") dataUnsubs.push(ctx.sessions.list.subscribe(() => {
			if (activeTarget !== null) scheduleSectionSync();
		}));
	} catch {}
	try {
		if (typeof ctx.workspaces.list.subscribe === "function") dataUnsubs.push(ctx.workspaces.list.subscribe(() => {
			if (activeTarget !== null) scheduleSectionSync();
		}));
	} catch {}
	dataUnsubs.push(settingsStore.subscribe(() => {
		try {
			runButtonPass();
		} catch (error) {
			console.warn("[dsh-zh] 归档按钮注入失败：" + (error instanceof Error ? error.message : String(error)));
		}
		if (activeTarget !== null) {
			sectionRenderKey = null;
			syncArchivedSection();
		}
	}));
	const localeUnsubscribe = typeof localeService.subscribe === "function" ? localeService.subscribe(() => {
		try {
			const buttons = document.body.querySelectorAll(`button[${ARCHIVE_BTN_MARK}]`);
			for (let i = 0; i < buttons.length; i += 1) {
				const btn = buttons[i];
				btn.setAttribute("aria-label", archiveT("buttonLabel"));
				btn.title = archiveT("buttonTitle");
			}
		} catch {}
		if (activeTarget !== null) {
			sectionRenderKey = null;
			syncArchivedSection();
		}
	}) : null;
	const onDocumentPointerDown = (event) => {
		const target = event.target;
		if (target === null || target === void 0) return;
		if (typeof target.closest === "function") {
			if (menuEl !== null && target.closest("[data-dsh-zh-archive-menu]") === null) closeMenu();
		}
		if (activeTarget === null) return;
		if (typeof target.closest !== "function") return;
		if ((target.closest(`button[aria-label^="${ARCHIVE_WS_NEW_SESSION[0]}"]`) ?? target.closest(`button[aria-label^="${ARCHIVE_WS_NEW_SESSION[1]}"]`)) !== null) leaveArchive();
	};
	document.addEventListener("pointerdown", onDocumentPointerDown, true);
	const onDocumentKeyDown = (event) => {
		if (event.key !== "Escape") return;
		if (menuEl !== null) {
			closeMenu();
			return;
		}
		if (dialogEl !== null) {
			closeDialog();
			return;
		}
		if (activeTarget !== null) leaveArchive();
	};
	document.addEventListener("keydown", onDocumentKeyDown, true);
	const onBatchCheckChange = (event) => {
		const target = event.target;
		if (target === null || typeof target.getAttribute !== "function") return;
		if (target.getAttribute(BATCH_CHECK_ATTR) !== null) syncSelectAllMarks();
	};
	document.addEventListener("change", onBatchCheckChange, true);
	return function() {
		if (localeDispose !== null) {
			try {
				localeDispose();
			} catch {}
			localeDispose = null;
		}
		activeTarget = null;
		expandedCount = COLLAPSED_LIMIT;
		orderedIds = null;
		if (buttonObserver !== null) {
			buttonObserver.disconnect();
			buttonObserver = null;
		}
		if (styleObserver !== null) {
			styleObserver.disconnect();
			styleObserver = null;
		}
		for (const un of dataUnsubs) try {
			un();
		} catch {}
		if (localeUnsubscribe !== null) localeUnsubscribe();
		document.removeEventListener("pointerdown", onDocumentPointerDown, true);
		document.removeEventListener("keydown", onDocumentKeyDown, true);
		document.removeEventListener("change", onBatchCheckChange, true);
		clearArchiveTimers();
		removeSection();
		if (toastTimer !== null) {
			clearTimeout(toastTimer);
			toastTimer = null;
		}
		if (toastEl !== null && toastEl.parentNode !== null) toastEl.parentNode.removeChild(toastEl);
		toastEl = null;
		try {
			const buttons = document.body.querySelectorAll(`button[${ARCHIVE_BTN_MARK}]`);
			for (let i = 0; i < buttons.length; i += 1) {
				const button = buttons[i];
				if (button.parentNode !== null) button.parentNode.removeChild(button);
			}
		} catch {}
		try {
			const wsRows = findWorkspaceRows(document.body);
			for (const row of wsRows) removeInjectedButtons(row);
		} catch {}
		try {
			const standaloneRows = document.body.querySelectorAll("[data-dsh-zh-ws-row-standalone]");
			for (let i = 0; i < standaloneRows.length; i += 1) standaloneRows[i].removeAttribute("data-dsh-zh-ws-row-standalone");
		} catch {}
		try {
			if (document.head) {
				const styles = [...Array.from(document.head.querySelectorAll("style[data-plugin-css=\"dsh-zh/archive-view.css\"]")), ...Array.from(document.head.querySelectorAll("style[data-plugin-css=\"dsh-zh/archive-button.css\"]"))];
				for (const style of styles) if (style.parentNode !== null) style.parentNode.removeChild(style);
			}
		} catch {}
	};
}
//#endregion
//#region src/client/zh/logic/apply.ts
function applyZh(ctx, opts) {
	const settingsScope = ctx.settingsScope.bind({ namespace: UI_CUSTOM_SETTINGS_NS });
	const zhCtx = {
		ctx,
		settingsScope,
		promptScope: ctx.settingsScope.bind({ namespace: UI_CUSTOM_SETTINGS_NS })
	};
	settingsStore.bind(settingsScope);
	const disposeEffects = [];
	const localeReg = ctx.locale.register(ZH_SETTINGS_NS, {
		zh: SETTINGS_ZH,
		en: SETTINGS_EN
	});
	disposeEffects.push(() => {
		try {
			localeReg();
		} catch {}
	});
	if (!opts?.skipSection) {
		const disposeSection = registerSettingsSection(zhCtx);
		disposeEffects.push(disposeSection);
	}
	const disposeRegister = () => {
		for (const d of disposeEffects) try {
			d();
		} catch {}
	};
	const disposeAutoArchive = installAutoArchive(zhCtx);
	const disposeChineseEnhance = installChineseEnhance(zhCtx);
	const disposeSessionMenu = installSessionMenu(zhCtx);
	const disposeSessionBatch = installSessionBatch(ctx, readSessionIdFromRow);
	const disposeArchiveView = installArchiveView(zhCtx);
	const disposeServiceMonitor = installServiceMonitor(ctx);
	return function() {
		disposeRegister();
		disposeAutoArchive();
		disposeChineseEnhance();
		disposeSessionMenu();
		disposeSessionBatch();
		disposeArchiveView();
		disposeServiceMonitor();
	};
}
//#endregion
//#region src/client/smooth/TypewriterAssistantNodeView.module.css
var TypewriterAssistantNodeView_module_default = {
	"body": "NBCYja_body",
	"disclosureChevronHover": "NBCYja_disclosureChevronHover",
	"disclosureContent": "NBCYja_disclosureContent",
	"disclosureIconIdle": "NBCYja_disclosureIconIdle",
	"disclosureLeading": "NBCYja_disclosureLeading",
	"disclosureRoot": "NBCYja_disclosureRoot",
	"disclosureRow": "NBCYja_disclosureRow",
	"disclosureTitle": "NBCYja_disclosureTitle",
	"dsh-smooth-stream-think-sweep": "NBCYja_dsh-smooth-stream-think-sweep",
	"follow": "NBCYja_follow",
	"root": "NBCYja_root",
	"stopped": "NBCYja_stopped",
	"think": "NBCYja_think",
	"thinkBody": "NBCYja_thinkBody",
	"thinkChevron": "NBCYja_thinkChevron",
	"thinkLeading": "NBCYja_thinkLeading",
	"thinkRow": "NBCYja_thinkRow",
	"thinkSeparator": "NBCYja_thinkSeparator",
	"thinkSummary": "NBCYja_thinkSummary",
	"thinkTitle": "NBCYja_thinkTitle",
	"visuallyHidden": "NBCYja_visuallyHidden"
};
//#endregion
//#region src/client/smooth/AnimatedDisclosure.tsx
/** Class-name join for optional overlay classes over the chrome defaults. */
function cx(...parts) {
	return parts.filter((part) => part !== void 0 && part !== "").join(" ");
}
/**
* Render one disclosure header whose expanded body is height-animated.
* @param props - Visual content, controlled open state, and the toggle
* callback fired by row click and Enter/Space.
* @returns the animated disclosure row.
*/
function AnimatedDisclosure({ icon, title, open, onToggle, collapsedContent, children, rowClassName, leadingClassName, titleClassName, chevronClassName, omitDisclosureContentAttr }) {
	const toggleFromKeyboard = (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		onToggle();
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: TypewriterAssistantNodeView_module_default.disclosureRoot,
		"data-open": open || void 0,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: cx(TypewriterAssistantNodeView_module_default.disclosureRow, rowClassName),
			"data-disclosure-row": true,
			"data-expandable": "",
			role: "button",
			tabIndex: 0,
			"aria-expanded": open,
			onClick: onToggle,
			onKeyDown: toggleFromKeyboard,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: cx(TypewriterAssistantNodeView_module_default.disclosureLeading, leadingClassName),
					children: open ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: chevronClassName }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: TypewriterAssistantNodeView_module_default.disclosureIconIdle,
						children: icon
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: cx(chevronClassName, TypewriterAssistantNodeView_module_default.disclosureChevronHover) })] })
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: cx(TypewriterAssistantNodeView_module_default.disclosureTitle, titleClassName),
					children: title
				}),
				!open && collapsedContent
			]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: TypewriterAssistantNodeView_module_default.disclosureContent,
			...omitDisclosureContentAttr ? {} : { "data-disclosure-content": "" },
			"data-collapsed": open ? void 0 : "",
			children
		})]
	});
}
//#endregion
//#region src/client/smooth/debugRuntime.ts
/**
* Shared browser-side diagnostics state.
*
* The settings card owns persistence. This module is the live bridge used by
* the renderer and the chat-side panel: renderer loops publish measurements,
* while panel edits are staged through the settings-card controller.
*/
const EMPTY_METRICS = {
	fps: null,
	frameMs: null,
	fpsDegraded: false,
	streamActive: false,
	streamBacklog: 0,
	streamSpeedCps: 0,
	streamTargetChars: 0,
	streamDisplayedChars: 0,
	followActive: false,
	followLagPx: 0,
	followVelocityPxPerSec: 0,
	followReservePx: 0,
	followCapacityPx: 0,
	followRevealScale: 1,
	followFollowing: false,
	followConstrained: false,
	scrollTop: null,
	scrollHeight: null,
	clientHeight: null,
	lastUpdatedMs: null
};
const INITIAL_STATE = {
	available: false,
	enabled: false,
	writable: false,
	dirty: false,
	status: "loading",
	tuning: { ...DEFAULT_STREAM_DEBUG_TUNING },
	metrics: EMPTY_METRICS
};
const store = createSnapshotStore(INITIAL_STATE);
const streamMetrics = /* @__PURE__ */ new Map();
const followMetrics = /* @__PURE__ */ new Map();
let actions;
let lastMetricPublish = 0;
function resetMetrics() {
	streamMetrics.clear();
	followMetrics.clear();
	lastMetricPublish = 0;
}
function resetRuntime() {
	actions = void 0;
	resetMetrics();
	store.set({
		...INITIAL_STATE,
		metrics: EMPTY_METRICS
	});
}
function now() {
	return typeof performance === "undefined" ? Date.now() : performance.now();
}
function sameTuning(left, right) {
	return left.revealScale === right.revealScale && left.queuePressure === right.queuePressure && left.maxRevealCps === right.maxRevealCps && left.springStiffness === right.springStiffness && left.springDamping === right.springDamping && left.springMass === right.springMass && left.runwayPx === right.runwayPx && left.reserveResponseMs === right.reserveResponseMs && left.backpressureMinScale === right.backpressureMinScale;
}
function currentMetrics(timestamp) {
	let stream;
	for (const candidate of streamMetrics.values()) if (stream === void 0 || candidate.updatedAt > stream.updatedAt) stream = candidate;
	let follow;
	for (const candidate of followMetrics.values()) if (follow === void 0 || candidate.updatedAt > follow.updatedAt) follow = candidate;
	return {
		fps: store.getSnapshot().metrics.fps,
		frameMs: store.getSnapshot().metrics.frameMs,
		fpsDegraded: store.getSnapshot().metrics.fpsDegraded,
		streamActive: stream?.active ?? false,
		streamBacklog: stream?.backlog ?? 0,
		streamSpeedCps: stream?.speedCps ?? 0,
		streamTargetChars: stream?.targetChars ?? 0,
		streamDisplayedChars: stream?.displayedChars ?? 0,
		followActive: follow?.active ?? false,
		followLagPx: follow?.lagPx ?? 0,
		followVelocityPxPerSec: follow?.velocityPxPerSec ?? 0,
		followReservePx: follow?.reservePx ?? 0,
		followCapacityPx: follow?.capacityPx ?? 0,
		followRevealScale: follow?.revealScale ?? 1,
		followFollowing: follow?.following ?? false,
		followConstrained: follow?.constrained ?? false,
		scrollTop: follow?.scrollTop ?? null,
		scrollHeight: follow?.scrollHeight ?? null,
		clientHeight: follow?.clientHeight ?? null,
		lastUpdatedMs: timestamp
	};
}
function publishMetrics(force = false) {
	const timestamp = now();
	if (!force && timestamp - lastMetricPublish < 80) return;
	lastMetricPublish = timestamp;
	store.set({
		...store.getSnapshot(),
		metrics: currentMetrics(timestamp)
	});
}
const debugRuntime = {
	store,
	getSnapshot() {
		return store.getSnapshot();
	},
	subscribe(listener) {
		return store.subscribe(listener);
	},
	/** Whether hot-path instrumentation should do any work. */
	isEnabled() {
		return store.getSnapshot().enabled;
	},
	tuning() {
		return store.getSnapshot().tuning;
	},
	/** Production values remain untouched until the user explicitly enables diagnostics. */
	activeTuning() {
		return store.getSnapshot().enabled ? store.getSnapshot().tuning : DEFAULT_STREAM_DEBUG_TUNING;
	},
	bindSettings(nextActions) {
		actions = nextActions;
		return () => {
			if (actions !== nextActions) return;
			resetRuntime();
		};
	},
	syncSettings(input) {
		const current = store.getSnapshot();
		const available = input.available ?? true;
		const enabled = available && input.enabled;
		const availabilityChanged = current.available !== available;
		const enabledChanged = current.enabled !== enabled;
		if (availabilityChanged || enabledChanged) resetMetrics();
		const tuning = input.tuning === void 0 ? current.tuning : {
			...DEFAULT_STREAM_DEBUG_TUNING,
			...input.tuning
		};
		if (current.available === available && current.enabled === enabled && current.writable === input.writable && current.dirty === input.dirty && current.status === input.status && sameTuning(current.tuning, tuning)) return;
		store.set({
			...current,
			available,
			enabled,
			writable: input.writable,
			dirty: input.dirty,
			status: input.status,
			tuning,
			metrics: availabilityChanged || enabledChanged || !enabled ? EMPTY_METRICS : current.metrics
		});
	},
	edit(patch) {
		const current = store.getSnapshot();
		const enabled = patch.debugEnabled ?? current.enabled;
		const enabledChanged = current.enabled !== enabled;
		if (enabledChanged) resetMetrics();
		const tuning = patch.debugTuning === void 0 ? current.tuning : {
			...current.tuning,
			...patch.debugTuning
		};
		store.set({
			...current,
			enabled,
			dirty: true,
			tuning,
			metrics: enabledChanged || !enabled ? EMPTY_METRICS : current.metrics
		});
		actions?.edit({
			...patch.debugEnabled === void 0 ? {} : { debugEnabled: patch.debugEnabled },
			...patch.debugTuning === void 0 ? {} : { debugTuning: tuning }
		});
	},
	save() {
		actions?.save();
	},
	discard() {
		actions?.discard();
	},
	reset() {
		this.edit({ debugTuning: { ...DEFAULT_STREAM_DEBUG_TUNING } });
	},
	reportStream(id, metric) {
		if (!this.isEnabled()) return;
		if (metric === null) streamMetrics.delete(id);
		else streamMetrics.set(id, {
			...metric,
			updatedAt: now()
		});
		publishMetrics(metric === null);
	},
	reportFollow(port, metric) {
		if (!this.isEnabled()) return;
		if (metric === null) followMetrics.delete(port);
		else followMetrics.set(port, {
			...metric,
			updatedAt: now()
		});
		publishMetrics(metric === null);
	},
	reportFps(fps, frameMs, degraded) {
		if (!this.isEnabled()) return;
		const current = store.getSnapshot();
		store.set({
			...current,
			metrics: {
				...current.metrics,
				fps,
				frameMs,
				fpsDegraded: degraded,
				lastUpdatedMs: now()
			}
		});
	},
	clearFps() {
		if (!this.isEnabled()) return;
		const current = store.getSnapshot();
		store.set({
			...current,
			metrics: {
				...current.metrics,
				fps: null,
				frameMs: null,
				fpsDegraded: false,
				lastUpdatedMs: now()
			}
		});
	},
	panelFace() {
		return {
			hooks: { debugRuntime: store },
			edit: (patch) => {
				this.edit(patch);
			},
			save: () => {
				this.save();
			},
			discard: () => {
				this.discard();
			},
			reset: () => {
				this.reset();
			}
		};
	},
	resetRuntime() {
		resetRuntime();
	}
};
//#endregion
//#region src/client/smooth/useSmoothStreamContent.ts
/**
* Stream-smoothing reveal hook.
*
* Buffers the model's chunked text and reveals it at a cadence that tracks
* the observed arrival rate, so a long reply never dumps whole paragraphs at
* once and a fast stream never stutters. Port of lobe-ui's smoother: EMA
* arrival cps + chunk size, backlog pressure, commit-interval widening with
* tail length, and a flush-speed settle drain once the input idles. The
* reveal decision is the pure {@link computeRevealStep} for unit tests.
*
* `shouldHoldBack` is the performance guard's veto: while it returns true the
* loop keeps measuring but skips the DOM commit, so an offscreen reply never
* competes with visible frames when the frame rate is degraded.
*/
const PRESET_CONFIG = {
	balanced: {
		activeInputWindowMs: 220,
		defaultCps: 80,
		emaAlpha: .35,
		flushCps: 180,
		largeAppendChars: 120,
		maxActiveCps: 360,
		maxCps: 240,
		maxFlushCps: 480,
		minCps: 24,
		settleAfterMs: 280,
		settleDrainMaxMs: 420,
		settleDrainMinMs: 120,
		targetBufferMs: 40
	},
	realtime: {
		activeInputWindowMs: 140,
		defaultCps: 120,
		emaAlpha: .45,
		flushCps: 240,
		largeAppendChars: 180,
		maxActiveCps: 480,
		maxCps: 320,
		maxFlushCps: 640,
		minCps: 32,
		settleAfterMs: 200,
		settleDrainMaxMs: 280,
		settleDrainMinMs: 100,
		targetBufferMs: 24
	},
	silky: {
		activeInputWindowMs: 280,
		defaultCps: 64,
		emaAlpha: .28,
		flushCps: 140,
		largeAppendChars: 100,
		maxActiveCps: 280,
		maxCps: 180,
		maxFlushCps: 400,
		minCps: 20,
		settleAfterMs: 360,
		settleDrainMaxMs: 520,
		settleDrainMinMs: 160,
		targetBufferMs: 56
	}
};
const QUEUE_ACCEL_EXPONENT = 1.25;
const CATCHUP_SECONDS = .15;
const clamp = (value, min, max) => {
	return Math.min(max, Math.max(min, value));
};
/** Float-debt queue integration from `ultimate_stream_physics_scroller.html`. */
function computeAdaptiveQueueStep(backlog, dtMs, debt, revealScale = 1, tuning = DEFAULT_STREAM_DEBUG_TUNING) {
	if (backlog <= 0 || dtMs <= 0) return {
		revealChars: 0,
		debt: 0,
		speedCps: 0
	};
	const speedCps = Math.min(tuning.maxRevealCps, 90 + Math.pow(backlog, QUEUE_ACCEL_EXPONENT) * tuning.queuePressure);
	const effectiveScale = clamp(revealScale * tuning.revealScale, .05, 2);
	const accumulated = Math.max(0, debt) + speedCps * effectiveScale * (dtMs / 1e3);
	const revealChars = Math.min(backlog, Math.floor(accumulated));
	return {
		revealChars,
		debt: revealChars >= backlog ? 0 : accumulated - revealChars,
		speedCps
	};
}
/** Counts user-perceived characters (code points), not UTF-16 units. */
const countChars = (text) => {
	let count = 0;
	for (const char of text) count += 1;
	return count;
};
/** Pure settle-drain decision shared by the frame loop and its tests. */
function computeSettleDrain(config, input) {
	if (input.inputActive || !input.settling) return 0;
	const overflowCps = Math.max(0, input.backlog - 300) * 1e3 / 2;
	const drainTargetMs = clamp(input.backlog * 8, config.settleDrainMinMs, config.settleDrainMaxMs);
	const settleCps = input.backlog * 1e3 / drainTargetMs;
	return clamp(Math.max(settleCps, overflowCps), config.flushCps, config.maxFlushCps);
}
/** Fixed velocity that closes a producer-complete queue within its deadline. */
function computeCompletionDrain(config, backlog) {
	if (backlog <= 0) return 0;
	const drainTargetMs = clamp(backlog * 8, config.settleDrainMinMs, config.settleDrainMaxMs);
	const deadlineCps = backlog * 1e3 / drainTargetMs;
	return Math.max(deadlineCps, computeSettleDrain(config, {
		backlog,
		inputActive: false,
		settling: true
	}));
}
/**
* Drain rate multiplier once the input ends: leftover backlog reveals at
* this multiple of the steady rate, so the end never drags.
*/
const SETTLE_DRAIN_MULTIPLIER = 1.8;
/** Pure per-frame reveal decision shared by the loop and its tests. */
function computeRevealStep(config, input, dtSeconds) {
	const trackedCps = Math.max(input.emaCps, input.arrivalCpsEma);
	const baseCps = clamp(trackedCps, config.minCps, config.maxFlushCps);
	const targetLagChars = input.inputActive ? Math.max(2, Math.round(baseCps * config.targetBufferMs / 1e3)) : 0;
	let currentCps;
	if (input.steadyCps !== void 0) currentCps = input.inputActive || input.settling ? clamp(input.steadyCps * (input.inputActive ? 1 : SETTLE_DRAIN_MULTIPLIER), config.minCps, config.maxFlushCps) : 0;
	else if (input.inputActive) {
		const overflow = Math.max(0, input.backlog - 32);
		const catchup = overflow > 0 ? overflow / CATCHUP_SECONDS : 0;
		currentCps = clamp(baseCps * 1.08 + catchup, config.minCps, config.maxFlushCps);
	} else if (input.settling) currentCps = computeSettleDrain(config, input);
	else {
		const idleFlushCps = Math.max(config.flushCps, baseCps * 1.8, input.arrivalCpsEma * .8);
		currentCps = clamp(idleFlushCps, config.flushCps, config.maxFlushCps);
	}
	const minRevealChars = input.inputActive ? 1 : 2;
	return {
		revealChars: Math.max(minRevealChars, Math.round(currentCps * dtSeconds)),
		targetLagChars
	};
}
/**
* Smooth a chunked content stream into a reveal-paced display string.
*
* @param content - The full accumulated input so far.
* @param options - Preset, guard, and steady-rate wiring.
* @returns The displayed content, revealed at the smoothed cadence.
*/
function useSmoothStreamContent(content, { enabled = true, inputComplete = false, preset = "balanced", shouldHoldBack, steadyCps, defaultCps, speedCpsRef, revealScaleRef } = {}) {
	const config = PRESET_CONFIG[preset];
	const seedCps = defaultCps ?? config.defaultCps;
	const initialContent = enabled ? "" : content;
	const [displayedContent, setDisplayedContent] = (0, react.useState)(initialContent);
	const displayedContentRef = (0, react.useRef)(initialContent);
	const displayedCountRef = (0, react.useRef)(countChars(initialContent));
	const targetContentRef = (0, react.useRef)(initialContent);
	const targetCharsRef = (0, react.useRef)([...initialContent]);
	const targetCountRef = (0, react.useRef)(countChars(initialContent));
	const emaCpsRef = (0, react.useRef)(seedCps);
	const lastInputTsRef = (0, react.useRef)(0);
	const lastInputCountRef = (0, react.useRef)(countChars(initialContent));
	const chunkSizeEmaRef = (0, react.useRef)(1);
	const arrivalCpsEmaRef = (0, react.useRef)(seedCps);
	const rafRef = (0, react.useRef)(null);
	const lastFrameTsRef = (0, react.useRef)(null);
	const queueDebtRef = (0, react.useRef)(0);
	const settleCpsRef = (0, react.useRef)(null);
	const holdBackRef = (0, react.useRef)(shouldHoldBack);
	const speedOutRef = (0, react.useRef)(speedCpsRef);
	speedOutRef.current = speedCpsRef;
	const revealScaleOutRef = (0, react.useRef)(revealScaleRef);
	revealScaleOutRef.current = revealScaleRef;
	const inputCompleteRef = (0, react.useRef)(inputComplete);
	inputCompleteRef.current = inputComplete;
	const streamIdRef = (0, react.useRef)(`stream-${Math.random().toString(36).slice(2)}`);
	(0, react.useEffect)(() => {
		holdBackRef.current = shouldHoldBack;
	}, [shouldHoldBack]);
	const stopFrameLoop = (0, react.useCallback)(() => {
		if (rafRef.current !== null) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}
		lastFrameTsRef.current = null;
	}, []);
	const syncImmediate = (0, react.useCallback)((nextContent) => {
		stopFrameLoop();
		const chars = [...nextContent];
		const now = performance.now();
		targetContentRef.current = nextContent;
		targetCharsRef.current = chars;
		targetCountRef.current = chars.length;
		displayedContentRef.current = nextContent;
		displayedCountRef.current = chars.length;
		queueDebtRef.current = 0;
		settleCpsRef.current = null;
		const speedOut = speedOutRef.current;
		if (speedOut !== void 0) speedOut.current = seedCps;
		setDisplayedContent(nextContent);
		emaCpsRef.current = seedCps;
		chunkSizeEmaRef.current = 1;
		arrivalCpsEmaRef.current = seedCps;
		lastInputTsRef.current = now;
		lastInputCountRef.current = chars.length;
	}, [seedCps, stopFrameLoop]);
	const startFrameLoop = (0, react.useCallback)(() => {
		if (rafRef.current !== null) return;
		const tick = (now) => {
			const targetCount = targetCountRef.current;
			const displayedCount = displayedCountRef.current;
			const backlog = targetCount - displayedCount;
			if (backlog <= 0) {
				queueDebtRef.current = 0;
				settleCpsRef.current = null;
				const speedOut = speedOutRef.current;
				if (speedOut !== void 0) speedOut.current = seedCps;
				debugRuntime.reportStream(streamIdRef.current, null);
				stopFrameLoop();
				return;
			}
			if (lastFrameTsRef.current === null) {
				lastFrameTsRef.current = now;
				rafRef.current = requestAnimationFrame(tick);
				return;
			}
			const frameIntervalMs = Math.max(0, now - lastFrameTsRef.current);
			const dtSeconds = Math.max(.001, Math.min(frameIntervalMs / 1e3, .12));
			lastFrameTsRef.current = now;
			const idleMs = now - lastInputTsRef.current;
			const producerComplete = inputCompleteRef.current;
			const debugTuning = debugRuntime.activeTuning();
			const inputActive = !producerComplete && idleMs <= config.activeInputWindowMs;
			const settling = producerComplete || !inputActive && idleMs >= config.settleAfterMs;
			if (!producerComplete) settleCpsRef.current = null;
			let revealChars;
			let revealSpeedCps;
			let nextQueueDebt = 0;
			if (producerComplete) {
				const settleCps = settleCpsRef.current ?? computeCompletionDrain(config, backlog);
				settleCpsRef.current = settleCps;
				const accumulated = Math.max(0, queueDebtRef.current) + settleCps * dtSeconds;
				revealChars = Math.min(backlog, Math.floor(accumulated));
				revealSpeedCps = settleCps;
				nextQueueDebt = revealChars >= backlog ? 0 : accumulated - revealChars;
			} else if (steadyCps !== void 0) {
				const step = computeRevealStep(config, {
					backlog,
					chunkSizeEma: chunkSizeEmaRef.current,
					arrivalCpsEma: arrivalCpsEmaRef.current,
					emaCps: emaCpsRef.current,
					inputActive,
					settling,
					steadyCps
				}, dtSeconds);
				revealChars = Math.min(Math.round(step.revealChars * debugTuning.revealScale), backlog);
				revealSpeedCps = frameIntervalMs > 0 ? revealChars * 1e3 / frameIntervalMs : 0;
			} else {
				const step = computeAdaptiveQueueStep(backlog, frameIntervalMs, queueDebtRef.current, revealScaleOutRef.current?.current ?? 1, debugTuning);
				revealChars = step.revealChars;
				revealSpeedCps = step.speedCps;
				nextQueueDebt = step.debt;
			}
			debugRuntime.reportStream(streamIdRef.current, {
				backlog,
				speedCps: revealSpeedCps,
				targetChars: targetCount,
				displayedChars: displayedCount,
				active: !producerComplete
			});
			if (holdBackRef.current?.() === true) {
				rafRef.current = requestAnimationFrame(tick);
				return;
			}
			queueDebtRef.current = nextQueueDebt;
			const speedOut = speedOutRef.current;
			if (speedOut !== void 0) speedOut.current = revealSpeedCps;
			if (revealChars <= 0) {
				rafRef.current = requestAnimationFrame(tick);
				return;
			}
			const nextCount = displayedCount + revealChars;
			const segment = targetCharsRef.current.slice(displayedCount, nextCount).join("");
			if (segment) {
				const nextDisplayed = displayedContentRef.current + segment;
				displayedContentRef.current = nextDisplayed;
				displayedCountRef.current = nextCount;
				setDisplayedContent(nextDisplayed);
			} else {
				displayedContentRef.current = targetContentRef.current;
				displayedCountRef.current = targetCount;
				setDisplayedContent(targetContentRef.current);
			}
			rafRef.current = requestAnimationFrame(tick);
		};
		rafRef.current = requestAnimationFrame(tick);
	}, [
		config,
		stopFrameLoop,
		steadyCps
	]);
	(0, react.useEffect)(() => {
		if (!enabled) {
			syncImmediate(content);
			return;
		}
		const prevTargetContent = targetContentRef.current;
		if (content === prevTargetContent) return;
		const now = performance.now();
		if (!content.startsWith(prevTargetContent)) {
			syncImmediate(content);
			return;
		}
		const appendedChars = [...content.slice(prevTargetContent.length)];
		const appendedCount = appendedChars.length;
		targetContentRef.current = content;
		targetCharsRef.current.push(...appendedChars);
		targetCountRef.current += appendedCount;
		settleCpsRef.current = null;
		const hadSample = lastInputTsRef.current > 0;
		const deltaChars = targetCountRef.current - lastInputCountRef.current;
		const deltaMs = Math.max(1, now - lastInputTsRef.current);
		if (hadSample && deltaChars > 0) {
			const instantCps = deltaChars * 1e3 / deltaMs;
			const normalizedInstantCps = clamp(instantCps, config.minCps, config.maxFlushCps * 3);
			const chunkEmaAlpha = .45;
			chunkSizeEmaRef.current = chunkSizeEmaRef.current * .55 + appendedCount * chunkEmaAlpha;
			arrivalCpsEmaRef.current = arrivalCpsEmaRef.current * .55 + normalizedInstantCps * chunkEmaAlpha;
			emaCpsRef.current = emaCpsRef.current * (1 - config.emaAlpha) + normalizedInstantCps * config.emaAlpha;
		}
		lastInputTsRef.current = now;
		lastInputCountRef.current = targetCountRef.current;
		startFrameLoop();
	}, [
		content,
		enabled,
		config,
		startFrameLoop,
		syncImmediate
	]);
	(0, react.useLayoutEffect)(() => {
		if (!enabled || !inputComplete || displayedContentRef.current === content) return;
		startFrameLoop();
	}, [
		content,
		enabled,
		inputComplete,
		startFrameLoop
	]);
	(0, react.useEffect)(() => {
		return () => {
			stopFrameLoop();
			debugRuntime.reportStream(streamIdRef.current, null);
		};
	}, [stopFrameLoop]);
	return displayedContent;
}
//#endregion
//#region src/client/smooth/useFpsGuard.ts
/**
* Performance guard for the streaming reveal.
*
* Feeds an EMA-smoothed frame-rate monitor from a rAF loop while streaming
* and tracks whether the reply is on-screen. The returned `shouldHoldBack`
* predicate is true only while the frame rate is below the threshold AND the
* reply is offscreen — exactly the spec's "skip offscreen DOM updates when
* FPS < 30" rule. The smoother consumes the predicate as its commit veto.
*/
const FPS_THRESHOLD = 30;
const FPS_ALPHA = .12;
const RECOVER_FRAMES = 6;
const MAX_FRAME_MS = 100;
function useFpsGuard(active) {
	const fpsRef = (0, react.useRef)({
		emaMs: 0,
		lastMs: 0,
		healthyRun: 0,
		degraded: false
	});
	const visibleRef = (0, react.useRef)(true);
	const elementRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => {
		if (!active) return;
		let rafId = 0;
		let lastDebugReport = 0;
		const frame = (now) => {
			rafId = requestAnimationFrame(frame);
			const fps = fpsRef.current;
			if (fps.lastMs === 0) {
				fps.lastMs = now;
				return;
			}
			const delta = Math.min(MAX_FRAME_MS, Math.max(1, now - fps.lastMs));
			fps.lastMs = now;
			fps.emaMs = fps.emaMs === 0 ? delta : fps.emaMs + FPS_ALPHA * (delta - fps.emaMs);
			const currentFps = 1e3 / fps.emaMs;
			if (currentFps < FPS_THRESHOLD) {
				fps.healthyRun = 0;
				fps.degraded = true;
			} else if (fps.degraded) {
				fps.healthyRun += 1;
				if (fps.healthyRun >= RECOVER_FRAMES) fps.degraded = false;
			}
			if (now - lastDebugReport >= 100) {
				debugRuntime.reportFps(currentFps, fps.emaMs, fps.degraded);
				lastDebugReport = now;
			}
		};
		rafId = requestAnimationFrame(frame);
		return () => {
			cancelAnimationFrame(rafId);
			fpsRef.current = {
				emaMs: 0,
				lastMs: 0,
				healthyRun: 0,
				degraded: false
			};
			debugRuntime.clearFps();
		};
	}, [active]);
	const ref = (0, react.useCallback)((element) => {
		elementRef.current = element;
	}, []);
	(0, react.useEffect)(() => {
		const element = elementRef.current;
		if (element === null || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) visibleRef.current = entry.isIntersecting;
		}, { rootMargin: "120px 0px" });
		observer.observe(element);
		return () => observer.disconnect();
	});
	return {
		ref,
		shouldHoldBack: (0, react.useCallback)(() => {
			return active && fpsRef.current.degraded && !visibleRef.current;
		}, [active])
	};
}
//#endregion
//#region src/client/smooth/teleprompterGlide.ts
/**
* Conversation-port follow while an assistant reply streams.
*
* A sub-stepped spring physics engine drives a float `animatedH`, rather
* than restarting native smooth-scroll animations as every glyph lands.
* Remaining lag rides a small compositor transform while the real scrollport
* stays at its floor. The transform is bounded by the measured paint gap
* before conversation chrome. This follower:
*
* - marks programmatic writes via `data-follow-owned` for compatible hosts;
* - sets `overflow-anchor: none` so CSS scroll-anchoring does not snap;
* - restores `animatedH` in a ResizeObserver (before paint) so a layout
*   pass cannot flash a snapped frame;
* - expresses safe lag as a compositor transform on message rows;
* - opens a speed-adaptive layout runway before fast output wraps, preserving
*   the reference spring constants at every reveal speed;
* - catches up any lag that cannot fit before turn status / composer chrome,
*   so fixed chrome never has to counter-shift and the host stays at-bottom;
* - never clips or overlays streamed text.
*
* A real reader gesture receives the effective visual position before the
* transform clears. Lifecycle completion instead settles at the floor.
*
* Directional wheel/touch intent unpins immediately; pointer/key input falls
* back to an upward scroll delta from the engine's own written position. A
* reader release re-acquires only after returning to the real floor.
*/
/**
* Programmatic follow marker retained for hosts that recognize external
* scroll ownership. Current Harness also sees the write land at the floor.
*/
const FOLLOW_OWNED_ATTR = "data-follow-owned";
/** Sub-pixel settle threshold; clearing below this cannot produce a visible rebound. */
const FOLLOW_SETTLE_EPSILON_PX = .25;
/** Safe-lag occupancy band over which reveal pressure is progressively reduced. */
const FOLLOW_BACKPRESSURE_START_RATIO = .25;
const GESTURE_EVENTS = [
	"wheel",
	"touchstart",
	"touchmove",
	"touchend",
	"touchcancel",
	"pointerdown",
	"keydown"
];
/** Visible runway needed for the current reveal pressure. */
function computeFollowReserve(speedCps, runwayPx = 48) {
	const available = Math.max(0, runwayPx);
	if (available <= 0) return 0;
	if (speedCps <= 90) return 0;
	const normalized = Math.min(1, Math.max(0, (speedCps - 90) / 510));
	const minimum = Math.min(available, 16);
	return minimum + normalized * (available - minimum);
}
/**
* Reveal-rate multiplier needed to retain one-wrap headroom for the spring.
* Throttling starts only after a quarter of the safe transform is occupied;
* a constrained paint lands at the minimum immediately so the next reveal
* commit cannot keep feeding an already-full visual buffer.
*/
function computeFollowRevealScale(lagPx, capacityPx, constrained = false, tuning = DEFAULT_STREAM_DEBUG_TUNING) {
	if (constrained) return tuning.backpressureMinScale;
	if (!Number.isFinite(capacityPx)) return 1;
	if (capacityPx <= 0) return lagPx > 0 ? tuning.backpressureMinScale : 1;
	const ratio = Math.min(1, Math.max(0, lagPx / capacityPx));
	if (ratio >= .75) return tuning.backpressureMinScale;
	const progress = Math.min(1, Math.max(0, (ratio - FOLLOW_BACKPRESSURE_START_RATIO) / .5));
	const eased = progress * progress * (3 - 2 * progress);
	return 1 - (1 - tuning.backpressureMinScale) * eased;
}
/**
* Semi-implicit spring integration with four substeps per <=32ms slice.
* @param dtMs - Frame delta in ms.
* @param input - Current visible lag and carried physics velocity.
* @returns The position advance, its fraction, and next velocity.
*/
function computeFollowStep(dtMs, input, tuning = DEFAULT_STREAM_DEBUG_TUNING) {
	if (input.lag <= .1 || dtMs <= 0) return {
		advancePx: 0,
		lerpStep: 0,
		velocityPxPerSec: 0
	};
	let lag = input.lag;
	let velocity = Math.max(0, input.velocityPxPerSec ?? 0);
	const elapsedMs = Math.min(32, dtMs);
	const slices = Math.max(1, Math.ceil(elapsedMs / 32));
	const subDt = elapsedMs / 1e3 / slices / 4;
	for (let slice = 0; slice < slices; slice += 1) for (let substep = 0; substep < 4; substep += 1) {
		const acceleration = (tuning.springStiffness * lag - tuning.springDamping * velocity) / tuning.springMass;
		velocity = Math.max(0, velocity + acceleration * subDt);
		const advance = velocity * subDt;
		if (advance >= lag) return {
			advancePx: input.lag,
			lerpStep: 1,
			velocityPxPerSec: 0
		};
		lag -= advance;
	}
	const advancePx = input.lag - lag;
	return {
		advancePx,
		lerpStep: advancePx / input.lag,
		velocityPxPerSec: velocity
	};
}
/** Element whose resize signals flow growth for the before-paint restore. */
function resizeProxyOf(port) {
	return port.querySelector("[data-chat-transcript]") ?? port.querySelector("[data-chat-flow]");
}
/**
* Outermost message surfaces; nested tool rows ride their parent.
*
* Another plugin may insert its own element as a flow sibling of the Chat rows
* (meow-memory's fold bar is one; so is this plugin's own fold summary row).
* Such a row carries no `data-chat-anchor-key`, so selecting only anchored
* rows would shift the conversation while leaving the foreign row at its
* natural offset, letting the shifted rows paint over it. Every direct flow
* child therefore rides the same transform, keeping the visual order of the
* column intact.
*/
/** Elements that should not receive the smooth scroll transform. */
const SHIFT_EXCLUDED_CLASSES = ["DiffViewer-module_block"];
function hasShiftExcludedDescendant(element) {
	return SHIFT_EXCLUDED_CLASSES.some((cls) => element.querySelector(`[class*="${cls}"]`) !== null);
}
function shiftSurfacesOf(port) {
	if (hasShiftExcludedDescendant(port)) return [];
	const transcript = port.querySelector("[data-chat-transcript]");
	if (transcript !== null) return [transcript];
	const anchored = [...port.querySelectorAll("[data-chat-anchor-key]")].filter((row) => row.parentElement?.closest("[data-chat-anchor-key]") === null);
	const flow = port.querySelector("[data-chat-flow]");
	if (flow === null) return anchored;
	const status = turnStatusOf(port);
	const anchoredSet = new Set(anchored);
	return [...flow.children].filter((child) => child instanceof HTMLElement && child !== status && (anchoredSet.has(child) || child.querySelector("[data-chat-anchor-key]") === null));
}
function currentShiftOf(element) {
	return Number(/translate3d\(0(?:px)?,\s*(-?[\d.]+)px,\s*0(?:px)?\)/.exec(element.style.transform)?.[1] ?? 0);
}
function setShift(element, px) {
	if (Math.abs(px) > .01) {
		if (Math.abs(currentShiftOf(element) - px) <= .01 && element.style.willChange === "transform" && element.style.clipPath === "") return;
		element.style.transform = `translate3d(0, ${px}px, 0)`;
		element.style.willChange = "transform";
	} else {
		if (element.style.transform === "" && element.style.willChange === "" && element.style.clipPath === "") return;
		element.style.transform = "";
		element.style.willChange = "";
	}
	element.style.clipPath = "";
}
function turnStatusOf(port) {
	return port.querySelector("[data-chat-turn-status]");
}
/**
* The element the predictive runway currently anchors on. In the host the
* turn-status bar is not rendered by dsh-client-ui-custom, so the runway
* anchors on the composer seat instead (see {@link ensureRunway}). Both need
* the same transform cleanup the message surfaces get, or a residual transform
* lingers on the anchor after the follow releases.
*/
function runwayAnchorOf(port) {
	const status = turnStatusOf(port);
	if (status !== null) return status;
	return port.querySelector("[data-composer-seat]");
}
/** Height committed by one newly mounted Chat row, including its flex gap. */
function entranceExtentOf(root) {
	const row = root.closest("[data-chat-flow-key]") ?? root;
	const rect = row.getBoundingClientRect();
	const height = Math.max(0, rect.height, rect.bottom - rect.top, row.offsetHeight);
	let previous = row.previousElementSibling;
	while (previous instanceof HTMLElement) {
		const previousRect = previous.getBoundingClientRect();
		if (previousRect.height > 0 || previousRect.bottom > previousRect.top) return Math.max(height, rect.bottom - previousRect.bottom);
		previous = previous.previousElementSibling;
	}
	return height;
}
/**
* The plugin can be reinjected without replacing the conversation DOM. Keep
* runway ownership in the page realm so a fresh bundle adopts the existing
* margin instead of treating it as host layout and adding another 48px.
*/
const FOLLOW_RUNWAYS_SYMBOL = Symbol.for("dsh-smooth-stream.follow-runways");
const followRunwayRegistry = globalThis;
const followRunways = followRunwayRegistry[FOLLOW_RUNWAYS_SYMBOL] ?? /* @__PURE__ */ new WeakMap();
followRunwayRegistry[FOLLOW_RUNWAYS_SYMBOL] = followRunways;
const followPaintLimits = /* @__PURE__ */ new WeakMap();
function invalidatePaintLimit(port) {
	followPaintLimits.delete(port);
}
/** Logical position and velocity survive a React owner handoff and finish. */
const followMotionStates = /* @__PURE__ */ new WeakMap();
function restoreRunway(port) {
	const runway = followRunways.get(port);
	if (runway === void 0) return;
	runway.element.style[runway.property] = runway.original;
	followRunways.delete(port);
	invalidatePaintLimit(port);
}
function isLegacyRunway(value) {
	if (value === "") return false;
	const terms = [...value.matchAll(/([\d.]+)px/g)];
	if (terms.length === 0 || value.replaceAll(/calc|px|[\d.+()\s]/g, "") !== "") return false;
	return terms.every(([, raw]) => {
		const px = Number(raw);
		return Number.isFinite(px) && px >= 48 && Math.abs(px % 48) <= Number.EPSILON;
	});
}
/** Remove unowned runway residue written by v0.3.3 and earlier bundles. */
function migrateLegacyRunway(port, surfaces, status, composer) {
	if (followRunways.has(port)) return;
	let migrated = false;
	if (status !== null && isLegacyRunway(status.style.marginTop)) {
		status.style.marginTop = "";
		migrated = true;
	}
	const last = surfaces.at(-1);
	if (status === null && composer !== null && last !== void 0 && isLegacyRunway(last.style.marginBottom)) {
		last.style.marginBottom = "";
		migrated = true;
	}
	if (migrated) invalidatePaintLimit(port);
}
function ensureRunway(port, surfaces, runwayPx = 48) {
	const status = turnStatusOf(port);
	const composer = port.querySelector("[data-composer-seat]");
	migrateLegacyRunway(port, surfaces, status, composer);
	if (status === null) {
		restoreRunway(port);
		return;
	}
	const naturalHeight = Math.max(0, port.scrollHeight - runwayOffsetOf(port));
	if (runwayPx <= 0 || port.clientHeight <= 0 || naturalHeight <= port.clientHeight) {
		restoreRunway(port);
		return;
	}
	const target = status === null || composer !== null ? {
		element: status ?? composer ?? void 0,
		property: "marginTop"
	} : {
		element: surfaces.at(-1),
		property: "marginBottom"
	};
	if (target.element === void 0) {
		restoreRunway(port);
		return;
	}
	const element = target.element;
	const current = followRunways.get(port);
	if (current?.element === element && current.property === target.property && current.requestedPx === runwayPx) return;
	restoreRunway(port);
	const beforeHeight = port.scrollHeight;
	const original = element.style[target.property];
	element.style[target.property] = original === "" ? `${runwayPx}px` : `calc(${original} + ${runwayPx}px)`;
	const offset = Math.max(0, port.scrollHeight - beforeHeight);
	followRunways.set(port, {
		element,
		offset,
		property: target.property,
		original,
		requestedPx: runwayPx
	});
	invalidatePaintLimit(port);
}
function runwayOffsetOf(port) {
	return followRunways.get(port)?.offset ?? 0;
}
/** Available paint room below the last message before fixed conversation chrome. */
function safeShiftLimit(port, surfaces) {
	const last = surfaces.at(-1);
	if (last === void 0) return 0;
	const status = turnStatusOf(port);
	const composer = port.querySelector("[data-composer-seat]");
	const cached = followPaintLimits.get(port);
	if (cached !== void 0 && performance.now() - cached.measuredAtMs <= 250 && cached.clientHeight === port.clientHeight && cached.surface === last && cached.status === status && cached.composer === composer) return cached.limit;
	const ceiling = [status, composer].filter((element) => element !== null).map((element) => ({
		element,
		rect: element.getBoundingClientRect()
	})).filter(({ rect }) => Number.isFinite(rect.top) && Number.isFinite(rect.bottom) && rect.bottom > rect.top).sort((first, second) => first.rect.top - second.rect.top)[0];
	if (ceiling === void 0) return status === null && composer === null ? Number.POSITIVE_INFINITY : runwayOffsetOf(port);
	const ceilingTop = ceiling.rect.top - currentShiftOf(ceiling.element);
	const naturalBottom = last.getBoundingClientRect().bottom - currentShiftOf(last);
	const limit = Math.max(0, ceilingTop - naturalBottom - 1);
	followPaintLimits.set(port, {
		clientHeight: port.clientHeight,
		limit,
		measuredAtMs: performance.now(),
		composer,
		status,
		surface: last
	});
	return limit;
}
function setFollowScrollTop(port, nextTop) {
	if (Math.abs(port.scrollTop - nextTop) > .01) port.scrollTop = nextTop;
	followScrollLedgers.set(port, port.scrollTop);
	const ownedTop = String(port.scrollTop);
	if (port.getAttribute(FOLLOW_OWNED_ATTR) !== ownedTop) port.setAttribute(FOLLOW_OWNED_ATTR, ownedTop);
}
/**
* Last scrollTop this engine wrote or accepted, per port. Reader intent is a
* real upward delta from this ledger; a key press or touch while pinned
* (typing in the composer) must not release the pin, because a released pin
* can never re-acquire while content streams away from the reader position.
*/
const followScrollLedgers = /* @__PURE__ */ new WeakMap();
const followActivityAt = /* @__PURE__ */ new WeakMap();
/** Whether this port was owned recently enough to identify a closing tail row. */
function hasRecentConversationFollow(port, windowMs = 250) {
	const last = followActivityAt.get(port);
	return last !== void 0 && performance.now() - last <= windowMs;
}
function readerScrolledUp(port) {
	return port.scrollTop < (followScrollLedgers.get(port) ?? 0) - 8;
}
/**
* Paint a bounded visual lag and return the effective logical extent.
*
* This is the final geometry invariant, not merely an animation preference:
* any lag beyond the real gap to status/composer chrome is caught up in the
* same frame. Carrying that excess in `scrollTop` would move the transcript
* toward fixed chrome and also make the host expose jump-to-bottom.
*/
function applyVisual(port, animatedH, reservePx, velocityPxPerSec = 0, runwayPx = 48) {
	const surfaces = shiftSurfacesOf(port);
	ensureRunway(port, surfaces, runwayPx);
	const hasTurnStatus = turnStatusOf(port) !== null;
	const contentHeight = Math.max(0, port.scrollHeight);
	const runwayOffset = hasTurnStatus ? runwayOffsetOf(port) : 0;
	const targetHeight = Math.max(0, contentHeight - runwayOffset);
	const floor = Math.max(0, contentHeight - port.clientHeight);
	const extent = Math.min(targetHeight, Math.max(0, animatedH));
	if (port.style.overflowAnchor !== "none") port.style.overflowAnchor = "none";
	if (port.style.scrollBehavior !== "auto") port.style.scrollBehavior = "auto";
	if (floor <= 0) {
		setFollowScrollTop(port, 0);
		followMotionStates.set(port, {
			capacityPx: Number.POSITIVE_INFINITY,
			constrained: false,
			extent: targetHeight,
			lagPx: 0,
			reservePx: 0,
			velocityPxPerSec: 0
		});
		for (const surface of surfaces) setShift(surface, 0);
		const anchor = runwayAnchorOf(port);
		if (anchor !== null) setShift(anchor, 0);
		return targetHeight;
	}
	setFollowScrollTop(port, floor);
	const limit = floor > 0 ? safeShiftLimit(port, surfaces) : 0;
	const visibleReserve = Math.min(runwayOffset, Math.max(0, reservePx));
	const baselineShift = hasTurnStatus ? runwayOffset - visibleReserve : 0;
	const requestedLag = Math.max(0, targetHeight - extent);
	const shift = hasTurnStatus ? Math.min(baselineShift + requestedLag, Math.max(0, limit)) : 0;
	const effectiveLag = Math.max(0, shift - baselineShift);
	const capacityPx = Math.max(0, limit - baselineShift);
	const effectiveExtent = targetHeight - effectiveLag;
	followMotionStates.set(port, {
		capacityPx,
		constrained: requestedLag > effectiveLag + FOLLOW_SETTLE_EPSILON_PX,
		extent: effectiveExtent,
		lagPx: effectiveLag,
		reservePx: visibleReserve,
		velocityPxPerSec
	});
	for (const surface of surfaces) setShift(surface, shift);
	const anchor = runwayAnchorOf(port);
	if (anchor !== null) setShift(anchor, 0);
	return effectiveExtent;
}
function clearMotion(port) {
	port.removeAttribute(FOLLOW_OWNED_ATTR);
	port.style.overflowAnchor = "";
	port.style.scrollBehavior = "";
	for (const surface of shiftSurfacesOf(port)) setShift(surface, 0);
	const anchor = runwayAnchorOf(port);
	if (anchor !== null) setShift(anchor, 0);
}
function clearVisual(port) {
	clearMotion(port);
	restoreRunway(port);
	followMotionStates.delete(port);
	invalidatePaintLimit(port);
}
/** Keep an already-promoted surface at zero until one stable final paint lands. */
function holdCompositorAtRest(element) {
	element.style.transform = "translate3d(0, 0px, 0)";
	element.style.willChange = "transform";
	element.style.clipPath = "";
}
/** Remove equal offsets, land on the floor, then retire the compositor quietly. */
function finishAtNaturalFloor(port) {
	const surfaces = shiftSurfacesOf(port);
	const anchor = runwayAnchorOf(port);
	const promoted = [...surfaces, ...anchor === null ? [] : [anchor]].filter((element) => element.style.transform !== "" || element.style.willChange === "transform");
	const promotedSet = new Set(promoted);
	restoreRunway(port);
	settleAtFloor(port);
	port.removeAttribute(FOLLOW_OWNED_ATTR);
	port.style.overflowAnchor = "";
	port.style.scrollBehavior = "";
	for (const surface of surfaces) if (promotedSet.has(surface)) holdCompositorAtRest(surface);
	else setShift(surface, 0);
	if (anchor !== null) {
		if (promotedSet.has(anchor)) holdCompositorAtRest(anchor);
		else setShift(anchor, 0);
	}
	followMotionStates.delete(port);
	if (promoted.length === 0) return;
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			if (port.hasAttribute(FOLLOW_OWNED_ATTR)) return;
			for (const element of promoted) if (Math.abs(currentShiftOf(element)) <= .01) setShift(element, 0);
		});
	});
}
function settleAtFloor(port) {
	setFollowScrollTop(port, Math.max(0, port.scrollHeight - port.clientHeight));
}
/** Only the newest active follower may write one port's shared visual state. */
const followLeaders = /* @__PURE__ */ new WeakMap();
let followGeneration = 0;
/**
* Own the conversation scrollport's bottom-follow while `active` is true.
*
* @param rootRef - An element inside the conversation scrollport.
* @param active - True while the reply is still revealing.
* @param speedCpsRef - Live reveal-rate EMA from the smoother.
* @param revealScaleRef - Optional backpressure control for text reveal.
* @param predictive - Whether to reserve paint room ahead of growth.
* @param entrance - Whether the first committed row height should glide in.
* @param onEntranceSettled - Releases a one-shot entrance owner after catch-up.
* @param predictiveRef - Optional live visibility gate for predictive runway.
* @param entranceExtentRef - Optional measured growth delta for a generic row.
*/
function useConversationFollow(rootRef, active, speedCpsRef, revealScaleRef, predictive = true, entrance = false, onEntranceSettled, predictiveRef, entranceExtentRef) {
	const activeRef = (0, react.useRef)(active);
	const entranceRef = (0, react.useRef)(entrance);
	const onEntranceSettledRef = (0, react.useRef)(onEntranceSettled);
	entranceRef.current = entrance;
	onEntranceSettledRef.current = onEntranceSettled;
	(0, react.useEffect)(() => {
		activeRef.current = active;
	}, [active]);
	(0, react.useLayoutEffect)(() => {
		if (!active) return;
		const owner = {};
		const generation = ++followGeneration;
		let rafId = 0;
		let last = performance.now();
		let following = true;
		let primed = false;
		let animatedH = 0;
		let reservePx = 0;
		let velocityPxPerSec = 0;
		let interacting = false;
		let readerGestureIntent = false;
		let readerReleased = false;
		let touchStartY = null;
		let interactTimer = null;
		let port = null;
		let resize = null;
		let holding = null;
		let entrancePending = entranceRef.current;
		const finishEntrance = () => {
			if (!entrancePending) return;
			entrancePending = false;
			onEntranceSettledRef.current?.();
		};
		const updateRevealScale = (next, elapsedMs, urgent = false) => {
			if (revealScaleRef === void 0) return;
			const tuning = debugRuntime.activeTuning();
			const state = followMotionStates.get(next);
			const target = state === void 0 ? 1 : computeFollowRevealScale(state.lagPx, state.capacityPx, state.constrained, tuning);
			const current = Math.min(1, Math.max(tuning.backpressureMinScale, revealScaleRef.current));
			if (target < current || urgent) {
				revealScaleRef.current = Math.min(current, target);
				return;
			}
			const releaseStep = 1 - Math.exp(-Math.max(0, elapsedMs) / 240);
			revealScaleRef.current = current + (target - current) * releaseStep;
		};
		const releaseRevealScale = () => {
			if (revealScaleRef !== void 0) revealScaleRef.current = 1;
		};
		const reportFollow = (next, isActive) => {
			const state = followMotionStates.get(next);
			debugRuntime.reportFollow(next, {
				lagPx: state?.lagPx ?? Math.max(0, next.scrollHeight - next.clientHeight - next.scrollTop),
				velocityPxPerSec: state?.velocityPxPerSec ?? 0,
				reservePx: state?.reservePx ?? 0,
				capacityPx: state?.capacityPx ?? 0,
				revealScale: revealScaleRef?.current ?? 1,
				following,
				constrained: state?.constrained ?? false,
				scrollTop: next.scrollTop,
				scrollHeight: next.scrollHeight,
				clientHeight: next.clientHeight,
				active: isActive
			});
		};
		const isLeader = (next) => followLeaders.get(next)?.owner === owner;
		const hold = (next) => {
			followActivityAt.set(next, performance.now());
			if (holding === next && isLeader(next)) return;
			holding = next;
			const leader = followLeaders.get(next);
			if (leader === void 0 || generation > leader.generation) followLeaders.set(next, {
				generation,
				owner
			});
		};
		const drop = (next) => {
			if (holding === next) holding = null;
			if (isLeader(next)) {
				clearMotion(next);
				followMotionStates.delete(next);
				releaseRevealScale();
				debugRuntime.reportFollow(next, null);
			}
		};
		const handBackVisual = (next) => {
			const shift = currentShiftOf(shiftSurfacesOf(next).at(-1) ?? next);
			const visualTop = Math.max(0, next.scrollTop - Math.max(0, shift));
			clearMotion(next);
			restoreRunway(next);
			const floor = Math.max(0, next.scrollHeight - next.clientHeight);
			next.scrollTop = Math.min(visualTop, Math.max(0, floor - 26));
			followScrollLedgers.set(next, next.scrollTop);
		};
		const markGesture = (event) => {
			interacting = true;
			if (event.type === "wheel") {
				const deltaY = event.deltaY;
				if (Number.isFinite(deltaY) && deltaY < 0) readerGestureIntent = true;
			} else if (event.type === "touchstart") touchStartY = event.touches[0]?.clientY ?? null;
			else if (event.type === "touchmove") {
				const touch = event.touches[0];
				if (touch !== void 0) {
					if (touchStartY === null) touchStartY = touch.clientY;
					if (touch.clientY - touchStartY > 1) readerGestureIntent = true;
				}
			} else if (event.type === "touchend" || event.type === "touchcancel") touchStartY = null;
			if (interactTimer !== null) clearTimeout(interactTimer);
			interactTimer = setTimeout(() => {
				interacting = false;
				readerGestureIntent = false;
				interactTimer = null;
			}, 800);
		};
		const restoreBeforePaint = () => {
			if (!following || port === null || !isLeader(port)) return;
			invalidatePaintLimit(port);
			const tuning = debugRuntime.activeTuning();
			animatedH = applyVisual(port, animatedH, reservePx, velocityPxPerSec, tuning.runwayPx);
			updateRevealScale(port, 0, true);
			reportFollow(port, activeRef.current);
		};
		const bindPort = (next) => {
			if (port === next) return;
			if (port !== null) {
				for (const name of GESTURE_EVENTS) port.removeEventListener(name, markGesture);
				resize?.disconnect();
			}
			port = next;
			invalidatePaintLimit(port);
			for (const name of GESTURE_EVENTS) port.addEventListener(name, markGesture, { passive: true });
			if (typeof ResizeObserver !== "undefined") {
				resize = new ResizeObserver(restoreBeforePaint);
				resize.observe(port);
				const proxy = resizeProxyOf(port);
				if (proxy !== null) resize.observe(proxy);
			}
		};
		const frame = (now) => {
			rafId = requestAnimationFrame(frame);
			const elapsedMs = Math.max(.001, now - last);
			const dt = Math.min(32, elapsedMs);
			const tuning = debugRuntime.activeTuning();
			last = now;
			const root = rootRef.current;
			if (root === null) return;
			const nextPort = root.closest("[data-conversation-scroll]");
			if (nextPort === null) return;
			bindPort(nextPort);
			if (nextPort.clientHeight <= 0) return;
			const reportedLag = Math.max(0, nextPort.scrollHeight - nextPort.clientHeight) - nextPort.scrollTop;
			const extent = Math.min(nextPort.scrollHeight, Math.max(0, nextPort.scrollHeight - reportedLag));
			if (!primed) {
				const inherited = nextPort.hasAttribute(FOLLOW_OWNED_ATTR) ? followMotionStates.get(nextPort) : void 0;
				if (inherited === void 0) {
					const entranceExtent = entrancePending ? entranceExtentRef?.current ?? entranceExtentOf(root) : 0;
					animatedH = Math.max(0, nextPort.scrollHeight - entranceExtent);
					reservePx = 0;
					velocityPxPerSec = 0;
					following = Math.max(0, reportedLag - entranceExtent) <= 25;
				} else {
					animatedH = Math.min(nextPort.scrollHeight, inherited.extent);
					reservePx = inherited.reservePx;
					velocityPxPerSec = inherited.velocityPxPerSec;
					following = true;
				}
				if (following) {
					hold(nextPort);
					if (isLeader(nextPort)) {
						animatedH = applyVisual(nextPort, animatedH, reservePx, velocityPxPerSec, tuning.runwayPx);
						updateRevealScale(nextPort, elapsedMs);
						reportFollow(nextPort, activeRef.current);
						const runwayOffset = runwayOffsetOf(nextPort);
						if (Math.max(0, nextPort.scrollHeight - animatedH - runwayOffset) <= .25) finishEntrance();
					} else finishEntrance();
				} else finishEntrance();
				primed = true;
				return;
			}
			if (!following && (!interacting || readerReleased && !readerGestureIntent && reportedLag <= 1) && reportedLag <= (readerReleased ? 1 : 25)) {
				following = true;
				readerReleased = false;
				animatedH = extent;
				reservePx = 0;
				velocityPxPerSec = 0;
				followScrollLedgers.set(nextPort, nextPort.scrollTop);
				hold(nextPort);
			} else if (following && interacting && (readerGestureIntent || readerScrolledUp(nextPort))) {
				following = false;
				readerGestureIntent = false;
				readerReleased = true;
				handBackVisual(nextPort);
				animatedH = nextPort.scrollHeight;
				reservePx = 0;
				velocityPxPerSec = 0;
				drop(nextPort);
				finishEntrance();
			}
			if (!activeRef.current || !following) {
				followScrollLedgers.set(nextPort, nextPort.scrollTop);
				reportFollow(nextPort, activeRef.current);
				return;
			}
			hold(nextPort);
			if (!isLeader(nextPort)) {
				finishEntrance();
				return;
			}
			const runwayOffset = runwayOffsetOf(nextPort);
			const contentHeight = nextPort.scrollHeight;
			const lag = Math.max(0, contentHeight - animatedH - runwayOffset);
			const predictGrowth = predictiveRef?.current ?? predictive;
			const reserveTarget = !predictGrowth ? 0 : computeFollowReserve(speedCpsRef.current, tuning.runwayPx);
			const reserveStep = 1 - Math.exp(-elapsedMs / tuning.reserveResponseMs);
			reservePx += (reserveTarget - reservePx) * reserveStep;
			const step = computeFollowStep(dt, {
				lag,
				speedEma: speedCpsRef.current,
				velocityPxPerSec
			}, tuning);
			if (lag <= .1) {
				animatedH = contentHeight - runwayOffset;
				velocityPxPerSec = 0;
			} else {
				const minimumLag = predictGrowth ? 0 : Math.max(0, reservePx);
				animatedH = Math.min(contentHeight - runwayOffset - minimumLag, animatedH + step.advancePx);
				velocityPxPerSec = step.velocityPxPerSec;
			}
			animatedH = applyVisual(nextPort, animatedH, reservePx, velocityPxPerSec, tuning.runwayPx);
			updateRevealScale(nextPort, elapsedMs);
			reportFollow(nextPort, true);
			if (Math.max(0, nextPort.scrollHeight - animatedH - runwayOffsetOf(nextPort)) <= .25) finishEntrance();
		};
		frame(performance.now());
		return () => {
			cancelAnimationFrame(rafId);
			if (interactTimer !== null) clearTimeout(interactTimer);
			resize?.disconnect();
			if (port !== null) for (const name of GESTURE_EVENTS) port.removeEventListener(name, markGesture);
			const host = rootRef.current?.closest("[data-conversation-scroll]") ?? port;
			if (host === null) return;
			holding = null;
			if (!isLeader(host)) return;
			const preserveReader = interacting && (readerGestureIntent || readerScrolledUp(host));
			if (!following || !primed) {
				clearVisual(host);
				followLeaders.delete(host);
				releaseRevealScale();
				debugRuntime.reportFollow(host, null);
				return;
			}
			if (preserveReader) {
				handBackVisual(host);
				clearVisual(host);
				followLeaders.delete(host);
				releaseRevealScale();
				debugRuntime.reportFollow(host, null);
				return;
			}
			const completionTuning = debugRuntime.activeTuning();
			ensureRunway(host, shiftSurfacesOf(host), completionTuning.runwayPx);
			const completionRunway = runwayOffsetOf(host);
			const completionMinimumLag = Math.max(0, reservePx);
			animatedH = Math.min(animatedH, host.scrollHeight - completionRunway - completionMinimumLag);
			settleAtFloor(host);
			animatedH = applyVisual(host, animatedH, reservePx, velocityPxPerSec, completionTuning.runwayPx);
			reportFollow(host, false);
			const runwayOffset = runwayOffsetOf(host);
			if (Math.max(0, host.scrollHeight - animatedH - runwayOffset) <= .25 && reservePx <= .25) {
				finishAtNaturalFloor(host);
				followLeaders.delete(host);
				releaseRevealScale();
				debugRuntime.reportFollow(host, null);
				return;
			}
			for (const name of GESTURE_EVENTS) host.addEventListener(name, markGesture, { passive: true });
			const stopSettleListeners = () => {
				for (const name of GESTURE_EVENTS) host.removeEventListener(name, markGesture);
				if (interactTimer !== null) {
					clearTimeout(interactTimer);
					interactTimer = null;
				}
			};
			let settleLast = performance.now();
			const settleFrame = (now) => {
				if (!isLeader(host)) {
					stopSettleListeners();
					return;
				}
				if (interacting && (readerGestureIntent || readerScrolledUp(host))) {
					readerGestureIntent = false;
					handBackVisual(host);
					clearVisual(host);
					followLeaders.delete(host);
					releaseRevealScale();
					debugRuntime.reportFollow(host, null);
					stopSettleListeners();
					return;
				}
				const dt = Math.min(32, Math.max(0, now - settleLast));
				const tuning = debugRuntime.activeTuning();
				settleLast = now;
				const runwayOffset = runwayOffsetOf(host);
				const lag = Math.max(0, host.scrollHeight - animatedH - runwayOffset);
				const reserveStep = 1 - Math.exp(-dt / tuning.reserveResponseMs);
				reservePx += (0 - reservePx) * reserveStep;
				if (lag <= .25 && reservePx <= .25) {
					animatedH = host.scrollHeight - runwayOffset;
					reservePx = 0;
					velocityPxPerSec = 0;
					finishAtNaturalFloor(host);
					followLeaders.delete(host);
					releaseRevealScale();
					debugRuntime.reportFollow(host, null);
					stopSettleListeners();
					return;
				}
				const step = computeFollowStep(dt, {
					lag,
					speedEma: speedCpsRef.current,
					velocityPxPerSec
				}, tuning);
				const minimumLag = Math.max(0, reservePx);
				animatedH = Math.min(host.scrollHeight - runwayOffset - minimumLag, animatedH + step.advancePx);
				velocityPxPerSec = step.velocityPxPerSec;
				settleAtFloor(host);
				animatedH = applyVisual(host, animatedH, reservePx, velocityPxPerSec, tuning.runwayPx);
				reportFollow(host, false);
				requestAnimationFrame(settleFrame);
			};
			requestAnimationFrame(settleFrame);
		};
	}, [
		active,
		rootRef,
		speedCpsRef,
		revealScaleRef,
		predictive,
		predictiveRef
	]);
}
//#endregion
//#region src/client/smooth/FollowHost.tsx
/**
* Document-flow host that owns conversation-port follow while `active`.
* Shared by assistant blocks and every other Agent Chat row. `onGrowth` lets
* generic wrapped renderers re-arm one glide when their DOM grows without
* requiring a business-kind-specific lifecycle predicate.
*/
function FollowHost({ active, entrance = false, onEntranceSettled, onGrowth, entranceExtentRef, speedCpsRef, revealScaleRef, predictive = true, predictiveRef, hostRef, children }) {
	const localRootRef = (0, react.useRef)(null);
	const rootRef = hostRef ?? localRootRef;
	useConversationFollow(rootRef, active || entrance, speedCpsRef, revealScaleRef, predictive, entrance, onEntranceSettled, predictiveRef, entranceExtentRef);
	(0, react.useEffect)(() => {
		if (onGrowth === void 0 || typeof ResizeObserver === "undefined") return;
		const root = rootRef.current;
		if (root === null) return;
		let previousHeight = null;
		const observer = new ResizeObserver((entries) => {
			const nextHeight = entries[0]?.contentRect.height ?? root.getBoundingClientRect().height;
			if (!Number.isFinite(nextHeight)) return;
			if (previousHeight !== null && nextHeight > previousHeight + .5) onGrowth(nextHeight - previousHeight);
			previousHeight = nextHeight;
		});
		observer.observe(root);
		return () => {
			observer.disconnect();
		};
	}, [onGrowth]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref: rootRef,
		className: TypewriterAssistantNodeView_module_default.follow,
		children
	});
}
//#endregion
//#region src/client/smooth/config.ts
/** Defaults shared by the Host schema and the client-side fallback. */
const DEFAULT_STREAM_CONFIG = {
	mode: "typewriter",
	preset: "balanced",
	revealCharsPerSec: 80,
	scrollSpeedPxPerSec: 48,
	maxScrollSpeedPxPerSec: 1e3
};
//#endregion
//#region src/client/smooth/LogarithmicFade.module.css
var LogarithmicFade_module_default = {
	"dsh-smooth-stream-log-fade-0": "U4dpkG_dsh-smooth-stream-log-fade-0",
	"dsh-smooth-stream-log-fade-1": "U4dpkG_dsh-smooth-stream-log-fade-1",
	"dsh-smooth-stream-log-fade-10": "U4dpkG_dsh-smooth-stream-log-fade-10",
	"dsh-smooth-stream-log-fade-11": "U4dpkG_dsh-smooth-stream-log-fade-11",
	"dsh-smooth-stream-log-fade-12": "U4dpkG_dsh-smooth-stream-log-fade-12",
	"dsh-smooth-stream-log-fade-13": "U4dpkG_dsh-smooth-stream-log-fade-13",
	"dsh-smooth-stream-log-fade-14": "U4dpkG_dsh-smooth-stream-log-fade-14",
	"dsh-smooth-stream-log-fade-15": "U4dpkG_dsh-smooth-stream-log-fade-15",
	"dsh-smooth-stream-log-fade-16": "U4dpkG_dsh-smooth-stream-log-fade-16",
	"dsh-smooth-stream-log-fade-17": "U4dpkG_dsh-smooth-stream-log-fade-17",
	"dsh-smooth-stream-log-fade-18": "U4dpkG_dsh-smooth-stream-log-fade-18",
	"dsh-smooth-stream-log-fade-19": "U4dpkG_dsh-smooth-stream-log-fade-19",
	"dsh-smooth-stream-log-fade-2": "U4dpkG_dsh-smooth-stream-log-fade-2",
	"dsh-smooth-stream-log-fade-20": "U4dpkG_dsh-smooth-stream-log-fade-20",
	"dsh-smooth-stream-log-fade-21": "U4dpkG_dsh-smooth-stream-log-fade-21",
	"dsh-smooth-stream-log-fade-22": "U4dpkG_dsh-smooth-stream-log-fade-22",
	"dsh-smooth-stream-log-fade-23": "U4dpkG_dsh-smooth-stream-log-fade-23",
	"dsh-smooth-stream-log-fade-24": "U4dpkG_dsh-smooth-stream-log-fade-24",
	"dsh-smooth-stream-log-fade-25": "U4dpkG_dsh-smooth-stream-log-fade-25",
	"dsh-smooth-stream-log-fade-26": "U4dpkG_dsh-smooth-stream-log-fade-26",
	"dsh-smooth-stream-log-fade-27": "U4dpkG_dsh-smooth-stream-log-fade-27",
	"dsh-smooth-stream-log-fade-28": "U4dpkG_dsh-smooth-stream-log-fade-28",
	"dsh-smooth-stream-log-fade-29": "U4dpkG_dsh-smooth-stream-log-fade-29",
	"dsh-smooth-stream-log-fade-3": "U4dpkG_dsh-smooth-stream-log-fade-3",
	"dsh-smooth-stream-log-fade-30": "U4dpkG_dsh-smooth-stream-log-fade-30",
	"dsh-smooth-stream-log-fade-31": "U4dpkG_dsh-smooth-stream-log-fade-31",
	"dsh-smooth-stream-log-fade-4": "U4dpkG_dsh-smooth-stream-log-fade-4",
	"dsh-smooth-stream-log-fade-5": "U4dpkG_dsh-smooth-stream-log-fade-5",
	"dsh-smooth-stream-log-fade-6": "U4dpkG_dsh-smooth-stream-log-fade-6",
	"dsh-smooth-stream-log-fade-7": "U4dpkG_dsh-smooth-stream-log-fade-7",
	"dsh-smooth-stream-log-fade-8": "U4dpkG_dsh-smooth-stream-log-fade-8",
	"dsh-smooth-stream-log-fade-9": "U4dpkG_dsh-smooth-stream-log-fade-9",
	"scope": "U4dpkG_scope"
};
const FADE_STEPS = 32;
const PREFIX = "dsh-smooth-stream-log-fade-";
const COLOR_PROPERTY = "--dsh-smooth-stream-fade-color";
const highlightName = (index) => LogarithmicFade_module_default[`${PREFIX}${index}`] ?? `${PREFIX}${index}`;
const EXCLUDED = "pre,code,math,.katex,.katex-display,mjx-container,svg,script,style,textarea,input,button,select,[role=\"button\"],[contenteditable],[hidden],[aria-hidden=\"true\"],[aria-live]";
function logarithmicOpacity(progress) {
	return 0 + 1 * (1 - Math.log1p(5 * (1 - (Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 1))) / Math.log(6));
}
function fadeTailSize(speedCps) {
	return Math.min(160, Math.max(24, Math.ceil((Number.isFinite(speedCps) ? Math.max(0, speedCps) : 0) * 240 / 1e3)));
}
const schedulers = /* @__PURE__ */ new WeakMap();
const segmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
function schedule(scheduler) {
	if (scheduler.frame !== 0 || scheduler.pending.size === 0) return;
	scheduler.frame = scheduler.window.requestAnimationFrame((now) => {
		scheduler.frame = 0;
		for (const client of scheduler.pending) if (!client.paint(now)) scheduler.pending.delete(client);
		schedule(scheduler);
	});
}
function schedulerFor(root) {
	const doc = root.ownerDocument;
	const win = doc.defaultView;
	if (win === null) return null;
	const realm = win;
	if (typeof realm.Highlight !== "function" || !realm.CSS?.highlights || !realm.CSS.supports("color", "color-mix(in srgb, currentColor 15%, transparent)")) return null;
	let scheduler = schedulers.get(doc);
	if (scheduler === void 0) {
		const highlights = Array.from({ length: FADE_STEPS }, () => new realm.Highlight());
		for (const [index, highlight] of highlights.entries()) realm.CSS.highlights.set(highlightName(index), highlight);
		scheduler = {
			highlights,
			clients: /* @__PURE__ */ new Set(),
			pending: /* @__PURE__ */ new Set(),
			frame: 0,
			registry: realm.CSS.highlights,
			window: win
		};
		schedulers.set(doc, scheduler);
	}
	return scheduler;
}
/** Owns ranges only: React retains ownership of every element and Text node. */
var LogarithmicFadeController = class LogarithmicFadeController {
	root;
	scheduler;
	previous = "";
	characters = [];
	colors = /* @__PURE__ */ new Map();
	enabled = false;
	active = false;
	speedCps = 100;
	pausedAt = null;
	disposed = false;
	observer;
	constructor(root, scheduler) {
		this.root = root;
		this.scheduler = scheduler;
		scheduler.clients.add(this);
		const win = root.ownerDocument.defaultView;
		this.observer = new win.MutationObserver(() => {
			this.reconcile();
		});
		this.observer.observe(root, {
			subtree: true,
			childList: true,
			characterData: true
		});
	}
	static create(root) {
		const scheduler = schedulerFor(root);
		return scheduler === null ? null : new LogarithmicFadeController(root, scheduler);
	}
	update(enabled, active, speedCps = 100, paused = false) {
		const now = this.scheduler.window.performance.now();
		if (paused && this.pausedAt === null) this.pausedAt = now;
		if (!paused && this.pausedAt !== null) {
			const pauseDuration = now - this.pausedAt;
			for (const character of this.characters) character.born += pauseDuration;
			this.pausedAt = null;
		}
		this.enabled = enabled;
		this.active = active;
		this.speedCps = speedCps;
		this.reconcile();
	}
	clearRanges() {
		for (const character of this.characters) this.scheduler.highlights[character.bucket]?.delete(character.range);
		this.characters = [];
		this.restoreColors();
	}
	restoreColors() {
		for (const [element, original] of this.colors) if (original.value === "") element.style.removeProperty(COLOR_PROPERTY);
		else element.style.setProperty(COLOR_PROPERTY, original.value, original.priority);
		this.colors.clear();
	}
	preserveColor(element) {
		if (this.colors.has(element)) return;
		const color = this.scheduler.window.getComputedStyle(element).color;
		this.colors.set(element, {
			value: element.style.getPropertyValue(COLOR_PROPERTY),
			priority: element.style.getPropertyPriority(COLOR_PROPERTY)
		});
		element.style.setProperty(COLOR_PROPERTY, color);
	}
	reconcile() {
		if (this.disposed) return;
		const text = this.root.textContent ?? "";
		const previous = this.previous;
		this.previous = text;
		const old = this.characters;
		this.clearRanges();
		if (!this.enabled) {
			this.root.classList.remove(LogarithmicFade_module_default.scope);
			this.scheduler.pending.delete(this);
			this.stopIfIdle();
			return;
		}
		this.root.classList.add(LogarithmicFade_module_default.scope);
		const now = this.pausedAt ?? this.scheduler.window.performance.now();
		let prefix = 0;
		while (prefix < previous.length && prefix < text.length && previous[prefix] === text[prefix]) prefix += 1;
		const appended = text.startsWith(previous);
		const nodes = [];
		const walker = this.root.ownerDocument.createTreeWalker(this.root, NodeFilter.SHOW_TEXT);
		let offset = 0;
		for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) {
			const end = offset + (node.textContent?.length ?? 0);
			nodes.push({
				node,
				start: offset,
				end,
				eligible: node.parentElement?.closest(EXCLUDED) === null
			});
			offset = end;
		}
		const segments = segmenter.segment(text);
		const tailSize = fadeTailSize(this.speedCps);
		const oldestLiveStart = old.reduce((start, character) => now - character.born < 240 && character.end <= prefix ? Math.min(start, character.start) : start, Infinity);
		let end = text.length;
		for (let count = 0; count < 160 && end > 0 && (count < tailSize || end > oldestLiveStart); count += 1) {
			const segment = segments.containing(end - 1);
			if (segment === void 0) break;
			const start = segment.index;
			const parts = nodes.filter((node) => node.end > start && node.start < end);
			const born = old.find((character) => character.start === start && character.end === end && end <= prefix)?.born ?? (this.active && appended && start >= previous.length ? now : null);
			if (born !== null && now - born < 240 && segment.segment.trim() !== "" && parts.length > 0 && parts.every((part) => part.eligible)) {
				const first = parts[0];
				const last = parts[parts.length - 1];
				const range = this.root.ownerDocument.createRange();
				range.setStart(first.node, start - first.start);
				range.setEnd(last.node, end - last.start);
				for (const part of parts) this.preserveColor(part.node.parentElement);
				this.characters.push({
					start,
					end,
					born,
					range,
					bucket: -1
				});
			}
			end = start;
		}
		if (this.paint(now)) {
			if (this.pausedAt === null) {
				this.scheduler.pending.add(this);
				schedule(this.scheduler);
			} else {
				this.scheduler.pending.delete(this);
				this.stopIfIdle();
			}
		} else {
			this.scheduler.pending.delete(this);
			this.stopIfIdle();
		}
	}
	paint(now) {
		this.characters = this.characters.filter((character) => {
			const progress = (now - character.born) / 240;
			if (progress >= 1 || !this.root.isConnected || !this.root.contains(character.range.startContainer)) {
				this.scheduler.highlights[character.bucket]?.delete(character.range);
				return false;
			}
			const bucket = Math.min(31, Math.round((logarithmicOpacity(progress) - 0) / 1 * 31));
			if (bucket !== character.bucket) {
				this.scheduler.highlights[character.bucket]?.delete(character.range);
				this.scheduler.highlights[bucket].add(character.range);
				character.bucket = bucket;
			}
			return true;
		});
		if (this.characters.length === 0) this.restoreColors();
		return this.characters.length > 0;
	}
	stopIfIdle() {
		if (this.scheduler.pending.size !== 0) return;
		this.scheduler.window.cancelAnimationFrame(this.scheduler.frame);
		this.scheduler.frame = 0;
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.observer.disconnect();
		this.clearRanges();
		this.root.classList.remove(LogarithmicFade_module_default.scope);
		this.scheduler.pending.delete(this);
		this.scheduler.clients.delete(this);
		this.stopIfIdle();
		if (this.scheduler.clients.size === 0) {
			for (const [index, highlight] of this.scheduler.highlights.entries()) {
				const name = highlightName(index);
				if (this.scheduler.registry.get(name) === highlight) this.scheduler.registry.delete(name);
			}
			schedulers.delete(this.root.ownerDocument);
		}
	}
};
/** active admits new characters; enabled=false also cancels completion linger. */
function useLogarithmicFade(rootRef, enabled, active, speedCpsRef, paused = false) {
	const controller = (0, react.useRef)(null);
	const committed = (0, react.useRef)(false);
	(0, react.useLayoutEffect)(() => {
		return () => {
			controller.current?.dispose();
			controller.current = null;
		};
	}, [rootRef]);
	(0, react.useLayoutEffect)(() => {
		const root = rootRef.current;
		if (controller.current === null && root !== null && enabled && active) {
			controller.current = LogarithmicFadeController.create(root);
			if (committed.current) controller.current?.update(false, false);
		}
		controller.current?.update(enabled, active, speedCpsRef?.current, paused);
		committed.current = true;
	});
}
//#endregion
//#region src/client/smooth/TypewriterAssistantNodeView.tsx
/**
* Whether smoothing must fall back to raw text rendering.
*
* The OS preference is the default input, but the user setting overrides it in
* either direction (see MotionPreference): tooling that forces reduce-motion
* used to silence smoothing with no way back, and `force-reduced` lets a user
* opt out even when the OS preference is off.
*/
function useReducedMotion() {
	const systemReduced = (0, react.useSyncExternalStore)((onChange) => {
		if (typeof window === "undefined" || window.matchMedia === void 0) return () => {};
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true, () => false);
	const preference = (0, react.useSyncExternalStore)(subscribeMotionPreference, getMotionPreference, () => DEFAULT_MOTION_PREFERENCE);
	if (preference === "force-reduced") return true;
	if (preference === "force-smooth") return false;
	return systemReduced;
}
/**
* Subscribe to `zh`'s per-line think height (`thinkMaxLines` / `thinkMaxLinesFrom`)
* stored in the shared `ui-custom` settings scope. Returns `{ max, from }` so the
* smooth-rendered think block can mirror the host's fixed-height internal-scroll
* behaviour. Defaults to 20 lines from the latest when the scope is unavailable.
*/
function useThinkMaxLines(scope) {
	const [max, from] = (0, react.useSyncExternalStore)((onChange) => {
		const s = scope;
		return s?.subscribe ? s.subscribe(onChange) : () => {};
	}, () => {
		const raw = scope?.getSnapshot?.();
		const snap = (raw !== void 0 && "value" in raw ? raw.value : raw) ?? {};
		const rawMax = snap.thinkMaxLines;
		return `${typeof rawMax === "number" && rawMax > 0 ? rawMax : 20}|${snap.thinkMaxLinesFrom === "earliest" ? "earliest" : "latest"}`;
	}, () => "20|latest").split("|");
	return {
		max: Number(max) || 20,
		from: from === "earliest" ? "earliest" : "latest"
	};
}
/** Line height in px of an element, falling back to 24. */
function getLineHeight(el) {
	try {
		const cs = getComputedStyle(el);
		const n = parseFloat(cs.lineHeight);
		if (Number.isFinite(n) && n > 0) return n;
		const fs = parseFloat(cs.fontSize);
		if (Number.isFinite(fs) && fs > 0) return fs * 1.2;
	} catch {}
	return 24;
}
/** Conservative fallback before the streaming Markdown tail has geometry. */
const PREDICTIVE_WRAP_FALLBACK_CHARS = 32;
const STREAM_ANNOUNCEMENT_INTERVAL_MS = 800;
const STREAM_ANNOUNCEMENT_MAX_CHARS = 320;
function approximateInlineWidth(text, emPx) {
	let width = 0;
	for (const char of text) if (/\s/u.test(char)) width += emPx * .33;
	else if (/^[\x00-\x7f]$/u.test(char)) width += emPx * .56;
	else width += emPx;
	return width;
}
function measurePendingTextGeometry(root, visibleText) {
	if (typeof document.createTreeWalker !== "function" || typeof NodeFilter === "undefined") return {
		root,
		visibleText,
		fontSize: 14,
		wrapThresholdWidth: null
	};
	const rootRect = root.getBoundingClientRect();
	const rootWidth = Math.max(0, rootRect.width, rootRect.right - rootRect.left, root.clientWidth);
	if (rootWidth <= 0) return {
		root,
		visibleText,
		fontSize: 14,
		wrapThresholdWidth: null
	};
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
	let tail = null;
	for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) if ((node.textContent ?? "").length > 0) tail = node;
	const parent = tail?.parentElement ?? root;
	const fontSize = Number.parseFloat(getComputedStyle(parent).fontSize) || 14;
	if (tail === null || typeof document.createRange !== "function") return {
		root,
		visibleText,
		fontSize,
		wrapThresholdWidth: rootWidth
	};
	try {
		const length = tail.textContent?.length ?? 0;
		if (length <= 0) return {
			root,
			visibleText,
			fontSize,
			wrapThresholdWidth: rootWidth
		};
		const range = document.createRange();
		range.setStart(tail, Math.max(0, length - 1));
		range.setEnd(tail, length);
		const tailRect = range.getBoundingClientRect();
		const contentRight = rootRect.right;
		if (!Number.isFinite(tailRect.right) || tailRect.right <= rootRect.left || contentRight <= rootRect.left) return {
			root,
			visibleText,
			fontSize,
			wrapThresholdWidth: rootWidth
		};
		return {
			root,
			visibleText,
			fontSize,
			wrapThresholdWidth: Math.max(0, contentRight - tailRect.right) + fontSize * .35
		};
	} catch {
		return {
			root,
			visibleText,
			fontSize,
			wrapThresholdWidth: rootWidth
		};
	}
}
/** Whether buffered source can reach a new visual line before it drains. */
function pendingTextCanGrow(root, visibleText, pending, geometryRef) {
	if (pending === "") return false;
	if (/[\r\n]/u.test(pending)) return true;
	const pendingChars = [...pending];
	if (root === null) return pendingChars.length >= PREDICTIVE_WRAP_FALLBACK_CHARS;
	let geometry = geometryRef.current;
	if (geometry?.root !== root || geometry.visibleText !== visibleText) {
		geometry = measurePendingTextGeometry(root, visibleText);
		geometryRef.current = geometry;
	}
	if (geometry.wrapThresholdWidth === null) return pendingChars.length >= PREDICTIVE_WRAP_FALLBACK_CHARS;
	return approximateInlineWidth(pending, geometry.fontSize) >= geometry.wrapThresholdWidth;
}
function announcementChunkEnd(source, start) {
	const hardEnd = Math.min(source.length, start + STREAM_ANNOUNCEMENT_MAX_CHARS);
	if (hardEnd === source.length) return hardEnd;
	const softStart = start + Math.floor(STREAM_ANNOUNCEMENT_MAX_CHARS * .6);
	for (let index = hardEnd - 1; index >= softStart; index -= 1) if (/[\s.,;:!?]/u.test(source[index] ?? "")) return index + 1;
	return hardEnd;
}
/** A commit-driven live region isolated from the visible Markdown subtree. */
const StreamAnnouncement = (0, react.memo)(function StreamAnnouncement({ text, active }) {
	const [announcement, setAnnouncement] = (0, react.useState)({
		text: "",
		revision: 0,
		present: active
	});
	const sourceRef = (0, react.useRef)(text);
	const activeRef = (0, react.useRef)(active);
	const announcedOffsetRef = (0, react.useRef)(active ? 0 : text.length);
	const drainSourceRef = (0, react.useRef)(null);
	const timerRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => {
		const clearTimer = () => {
			if (timerRef.current === null) return;
			clearTimeout(timerRef.current);
			timerRef.current = null;
		};
		const publishNext = (source) => {
			const start = Math.min(announcedOffsetRef.current, source.length);
			const end = announcementChunkEnd(source, start);
			if (end <= start) return false;
			announcedOffsetRef.current = end;
			setAnnouncement((previous) => ({
				text: source.slice(start, end),
				revision: previous.revision + 1,
				present: true
			}));
			return end < source.length;
		};
		const hideAfterLinger = () => {
			timerRef.current = setTimeout(() => {
				timerRef.current = null;
				if (activeRef.current) return;
				drainSourceRef.current = null;
				setAnnouncement((previous) => ({
					...previous,
					present: false
				}));
			}, STREAM_ANNOUNCEMENT_INTERVAL_MS);
		};
		const drainNext = () => {
			const source = drainSourceRef.current;
			if (source === null) return;
			if (!publishNext(source)) {
				hideAfterLinger();
				return;
			}
			timerRef.current = setTimeout(() => {
				timerRef.current = null;
				if (activeRef.current) return;
				drainNext();
			}, STREAM_ANNOUNCEMENT_INTERVAL_MS);
		};
		const scheduleLive = () => {
			if (timerRef.current !== null || announcedOffsetRef.current >= sourceRef.current.length) return;
			timerRef.current = setTimeout(() => {
				timerRef.current = null;
				if (!activeRef.current) return;
				const source = sourceRef.current;
				if (publishNext(source)) scheduleLive();
			}, STREAM_ANNOUNCEMENT_INTERVAL_MS);
		};
		const wasActive = activeRef.current;
		const previousSource = sourceRef.current;
		if (!(!active && !wasActive && drainSourceRef.current !== null) && (!text.startsWith(previousSource) || announcedOffsetRef.current > text.length)) announcedOffsetRef.current = 0;
		sourceRef.current = text;
		activeRef.current = active;
		if (active) {
			if (!wasActive) {
				clearTimer();
				drainSourceRef.current = null;
				setAnnouncement((previous) => ({
					text: "",
					revision: previous.revision + 1,
					present: true
				}));
			}
			scheduleLive();
			return;
		}
		if (!wasActive) {
			if (drainSourceRef.current === null) announcedOffsetRef.current = text.length;
			return;
		}
		clearTimer();
		drainSourceRef.current = text;
		drainNext();
	}, [active, text]);
	(0, react.useEffect)(() => () => {
		if (timerRef.current !== null) clearTimeout(timerRef.current);
		timerRef.current = null;
	}, []);
	if (!active && !announcement.present) return null;
	const activating = active && !activeRef.current;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: TypewriterAssistantNodeView_module_default.visuallyHidden,
		"aria-live": "polite",
		"aria-atomic": "true",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: activating ? "" : announcement.text }, announcement.revision)
	});
});
/**
* Smooth streaming text arm. While the reply runs, the accumulated source is
* revealed through the smoother at a rate that tracks the model's arrival
* and rendered by the Harness `MarkdownText`
* streaming arm (incremental parse, frozen non-tail blocks), so there is no
* raw-text tail and no text-to-markdown swap: the tree stays markdown
* throughout. The last text block owns conversation-port follow so wraps
* glide instead of snapping. Once the stream closes and the reveal queue
* drains, the settled full parse (KaTeX math, fence highlighting, file
* mentions) swaps in exactly once.
*/
function AnimatedMarkdownText({ text, labels, fileMentions, streaming, ownFollow, followSpeedCpsRef, followRevealScaleRef, onPredictiveChange, preset, shouldHoldBack }) {
	const reduced = useReducedMotion();
	const [typing, setTyping] = (0, react.useState)(streaming);
	const localSpeedCpsRef = (0, react.useRef)(35);
	const followRootRef = (0, react.useRef)(null);
	const predictionSourceRef = (0, react.useRef)(null);
	const predictionStateRef = (0, react.useRef)(false);
	const predictionGeometryRef = (0, react.useRef)(null);
	const speedCpsRef = followSpeedCpsRef ?? localSpeedCpsRef;
	const displayed = useSmoothStreamContent(text, {
		enabled: typing && !reduced,
		inputComplete: !streaming,
		preset,
		shouldHoldBack,
		speedCpsRef,
		revealScaleRef: followRevealScaleRef
	});
	const shown = reduced ? text ?? "" : displayed ?? "";
	const live = typing && !reduced;
	useLogarithmicFade(followRootRef, (0, react.useSyncExternalStore)(subscribeLogFade, getLogFade, () => true) && !reduced, live, speedCpsRef);
	(0, react.useEffect)(() => {
		const root = followRootRef.current;
		if (root === null || typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(() => {
			if (predictionGeometryRef.current?.root === root) predictionGeometryRef.current = null;
		});
		observer.observe(root);
		return () => {
			observer.disconnect();
		};
	}, []);
	(0, react.useLayoutEffect)(() => {
		if (onPredictiveChange === void 0) return;
		const pending = text.slice(shown.length);
		const sourceChanged = predictionSourceRef.current !== text;
		const next = !live || !streaming || pending === "" ? false : sourceChanged ? pendingTextCanGrow(followRootRef.current, shown, pending, predictionGeometryRef) : predictionStateRef.current;
		predictionSourceRef.current = text;
		predictionStateRef.current = next;
		onPredictiveChange(next);
	}, [
		live,
		onPredictiveChange,
		shown,
		streaming,
		text
	]);
	(0, react.useEffect)(() => {
		if (typing && !streaming && shown.length === text.length) setTyping(false);
	}, [
		shown,
		streaming,
		text,
		typing
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FollowHost, {
		active: live && ownFollow,
		speedCpsRef,
		revealScaleRef: followRevealScaleRef,
		predictive: streaming,
		hostRef: followRootRef,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.MarkdownText, {
			text: (live ? shown : text) ?? "",
			streaming: live,
			labels: labels ?? {
				code: {
					copyLabel: "Copy",
					copiedLabel: "Copied"
				},
				footnotes: "Footnotes"
			},
			fileMentions: live ? void 0 : fileMentions
		})
	});
}
function imageLabels(t) {
	return {
		image: t("image.label"),
		open: t("image.openOriginal"),
		openNamed: (label) => t("image.openOriginalLabel", { label }),
		loading: t("image.loading"),
		loadFailed: t("image.loadFailed"),
		lightbox: {
			dialog: t("image.preview"),
			close: t("image.closePreview")
		}
	};
}
function firstLine(text) {
	const newline = text.indexOf("\n");
	return newline === -1 ? text : text.slice(0, newline);
}
function latestLine(text) {
	const visible = text.trimEnd();
	const newline = visible.lastIndexOf("\n");
	return newline === -1 ? visible : visible.slice(newline + 1);
}
/**
* Built-in Think disclosure with a smoothed `text` feed. Chevron and row
* click stay on the disclosure chrome, which the plugin's AnimatedDisclosure
* renders with a height-animated body (the harness primitive would mount and
* unmount it, which cannot glide). The row opens only while this block is
* the streaming tail and closes as soon as thinking ends — a later block,
* or the assistant node settling — not when the rest of the reply is
* still streaming.
*/
function AnimatedReasoning({ text, running, preset, thinkAutoExpand, shouldHoldBack, followSpeedCpsRef, followRevealScaleRef, t, settingsScope }) {
	const reduced = useReducedMotion();
	const [expanded, setExpanded] = (0, react.useState)(running && thinkAutoExpand);
	const summaryRef = (0, react.useRef)(null);
	const bodyRef = (0, react.useRef)(null);
	const localFadeSpeedRef = (0, react.useRef)(35);
	const fadeSpeedRef = followSpeedCpsRef ?? localFadeSpeedRef;
	const displayed = useSmoothStreamContent(text, {
		enabled: running && !reduced,
		preset,
		shouldHoldBack,
		speedCpsRef: fadeSpeedRef,
		revealScaleRef: followRevealScaleRef
	});
	useLogarithmicFade(bodyRef, (0, react.useSyncExternalStore)(subscribeLogFade, getLogFade, () => true) && !reduced && expanded, running, fadeSpeedRef);
	const shown = running && !reduced ? displayed : text;
	const summary = running ? latestLine(shown) : firstLine(text);
	const thinkMaxLines = useThinkMaxLines(settingsScope);
	const lineHeight = bodyRef.current ? getLineHeight(bodyRef.current) : 24;
	(0, react.useLayoutEffect)(() => {
		if (thinkAutoExpand) setExpanded(running);
	}, [running, thinkAutoExpand]);
	(0, react.useLayoutEffect)(() => {
		const body = bodyRef.current;
		if (body === null || !running) return;
		body.scrollTop = thinkMaxLines.from === "earliest" ? 0 : body.scrollHeight;
	}, [
		shown,
		running,
		thinkMaxLines.from
	]);
	(0, react.useEffect)(() => {
		const element = summaryRef.current;
		if (element === null) return;
		element.scrollLeft = running ? element.scrollWidth - element.clientWidth : 0;
	}, [running, summary]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: TypewriterAssistantNodeView_module_default.follow,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: TypewriterAssistantNodeView_module_default.think,
			"data-variant": "think",
			"data-state": running ? "running" : "ok",
			children: [running && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: TypewriterAssistantNodeView_module_default.visuallyHidden,
				children: t("row.running")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AnimatedDisclosure, {
				rowClassName: TypewriterAssistantNodeView_module_default.thinkRow,
				leadingClassName: TypewriterAssistantNodeView_module_default.thinkLeading,
				titleClassName: TypewriterAssistantNodeView_module_default.thinkTitle,
				chevronClassName: TypewriterAssistantNodeView_module_default.thinkChevron,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconThinkOutline14, { size: 14 }),
				title: "Think",
				open: expanded,
				onToggle: () => {
					setExpanded((value) => !value);
				},
				collapsedContent: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: TypewriterAssistantNodeView_module_default.thinkSeparator,
					"aria-hidden": true
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					ref: summaryRef,
					className: TypewriterAssistantNodeView_module_default.thinkSummary,
					"data-follow-end": running || void 0,
					children: summary
				})] }),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					ref: bodyRef,
					className: TypewriterAssistantNodeView_module_default.thinkBody,
					style: {
						maxHeight: `${Math.round(lineHeight * thinkMaxLines.max)}px`,
						overflowY: "auto",
						overflowX: "hidden"
					},
					children: shown
				})
			})]
		})
	});
}
/**
* Assistant node renderer for the typewriter overlay. Text observed while
* streaming is revealed by the smoother through the Harness Markdown
* renderer at a rate that tracks arrival. Reasoning blocks keep the
* built-in Think disclosure and only receive a smoothed text feed; the
* outer node owns conversation-port follow while streaming; the final text
* block keeps ownership while its settled reveal queue drains. The FPS guard
* holds offscreen reveals when the frame rate is degraded. Settled text
* renders with the full Markdown pipeline.
*/
const TypewriterAssistantNodeView = (0, react.memo)(function TypewriterAssistantNodeView({ mode: _mode = DEFAULT_STREAM_CONFIG.mode, preset = DEFAULT_STREAM_CONFIG.preset, revealCharsPerSec: _revealCharsPerSec = DEFAULT_STREAM_CONFIG.revealCharsPerSec, scrollSpeedPxPerSec: _scrollSpeedPxPerSec = DEFAULT_STREAM_CONFIG.scrollSpeedPxPerSec, maxScrollSpeedPxPerSec: _maxScrollSpeedPxPerSec = DEFAULT_STREAM_CONFIG.maxScrollSpeedPxPerSec, thinkAutoExpand = DEFAULT_STREAM_SETTINGS.thinkAutoExpand, settingsScope, node, useTurnData, openFile, loadImage, fileMentions, t }) {
	const data = node.data;
	const streaming = data.status === "running";
	const reduced = useReducedMotion();
	const { ref: guardRef, shouldHoldBack } = useFpsGuard(streaming);
	const rootSpeedRef = (0, react.useRef)(35);
	const rootRevealScaleRef = (0, react.useRef)(1);
	const reasoningTailIndex = streaming && data.blocks[data.blocks.length - 1]?.kind === "reasoning" ? data.blocks.length - 1 : -1;
	const reasoningOwnsSpeed = reasoningTailIndex !== -1;
	const rootPredictiveRef = (0, react.useRef)(false);
	const previousReasoningTailRef = (0, react.useRef)(-1);
	if (reasoningTailIndex !== previousReasoningTailRef.current) {
		rootPredictiveRef.current = false;
		if (!reasoningOwnsSpeed) rootSpeedRef.current = 35;
		previousReasoningTailRef.current = reasoningTailIndex;
	}
	const updateTextPrediction = (0, react.useMemo)(() => (predictive) => {
		rootPredictiveRef.current = predictive;
	}, []);
	const turn = node.location.kind === "turn" || node.location.kind === "step" ? node.location.turn : void 0;
	const tail = useTurnData("turn-tail");
	const owner = (0, react.useMemo)(() => {
		if (turn?.status !== "closed" || data.finalNode === void 0) return void 0;
		if (tail?.closing?.finalNode.seq !== data.finalNode.seq) return void 0;
		return {
			turn,
			seq: data.finalNode.seq,
			openFile
		};
	}, [
		data.finalNode,
		openFile,
		tail,
		turn
	]);
	const mentions = (0, react.useMemo)(() => owner === void 0 ? void 0 : fileMentions(owner), [fileMentions, owner]);
	const markdownLabels = (0, react.useMemo)(() => ({
		code: {
			copyLabel: t("copy"),
			copiedLabel: t("copied")
		},
		footnotes: t("markdown.footnotes")
	}), [t]);
	const imageLoader = loadImage ?? (async () => {
		throw new Error(t("image.serviceUnavailable"));
	});
	if (!(streaming || data.status === "interrupted" || data.blocks.some((block) => block.kind !== "tool-call"))) return null;
	const announcementText = data.blocks.filter((block) => block.kind === "text").map((block) => block.text).join("\n");
	const rendered = [];
	const last = data.blocks.length - 1;
	let lastFollow = -1;
	for (let index = 0; index < data.blocks.length; index += 1) {
		const kind = data.blocks[index]?.kind;
		if (kind === "text" || kind === "reasoning") lastFollow = index;
	}
	for (let index = 0; index < data.blocks.length; index += 1) {
		const block = data.blocks[index];
		if (block === void 0) continue;
		if ((block.kind === "text" || block.kind === "reasoning") && (block.text === void 0 || typeof block.text !== "string")) continue;
		switch (block.kind) {
			case "text":
				rendered.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AnimatedMarkdownText, {
					text: String(block.text),
					labels: markdownLabels,
					fileMentions: mentions,
					streaming,
					ownFollow: !streaming && index === lastFollow,
					followSpeedCpsRef: index === lastFollow ? rootSpeedRef : void 0,
					followRevealScaleRef: index === lastFollow ? rootRevealScaleRef : void 0,
					onPredictiveChange: index === lastFollow ? updateTextPrediction : void 0,
					preset,
					shouldHoldBack
				}, index));
				break;
			case "reasoning":
				rendered.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AnimatedReasoning, {
					text: String(block.text),
					running: streaming && index === last,
					preset,
					thinkAutoExpand,
					shouldHoldBack,
					followSpeedCpsRef: reasoningOwnsSpeed && index === last ? rootSpeedRef : void 0,
					followRevealScaleRef: reasoningOwnsSpeed && index === last ? rootRevealScaleRef : void 0,
					t,
					settingsScope
				}, index));
				break;
			case "image": {
				const start = index;
				const group = [block];
				while (index + 1 < data.blocks.length) {
					const next = data.blocks[index + 1];
					if (next === void 0 || next.kind !== "image") break;
					group.push(next);
					index += 1;
				}
				{
					const Gallery = _deepseek_ai_dsh_client_ui_attachment.ImageGallery;
					if (Gallery !== void 0) rendered.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Gallery, {
						images: group,
						load: imageLoader,
						align: "start",
						labels: imageLabels(t)
					}, start));
				}
				break;
			}
			case "tool-call": break;
			case "other": rendered.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.JsonBlock, {
				label: t("message.unknownBlock"),
				payload: block.block,
				truncatedLabel: (total) => t("json.truncated", { total })
			}, index));
		}
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: guardRef,
		className: TypewriterAssistantNodeView_module_default.root,
		"data-streaming": streaming || void 0,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StreamAnnouncement, {
			text: announcementText,
			active: streaming && !reduced
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FollowHost, {
			active: streaming && !reduced,
			speedCpsRef: rootSpeedRef,
			revealScaleRef: rootRevealScaleRef,
			predictiveRef: rootPredictiveRef,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: TypewriterAssistantNodeView_module_default.body,
				children: [rendered, data.status === "interrupted" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: TypewriterAssistantNodeView_module_default.stopped,
					children: t("message.stopped")
				})]
			})
		})]
	});
});
//#endregion
//#region src/client/smooth/useProgressiveDomText.ts
/**
* Progressive text reveal for opaque Agent renderers.
*
* Slot renderers own arbitrary React trees, so the generic integration cannot
* clone or classify their business components. This hook leaves that tree and
* all of its event handlers in place, and only paces visible Text node data
* while the row belongs to the live Agent turn. No clip, mask, overlay, or
* duplicate accessibility tree is introduced.
*/
/** Last presented text per root, retained across follow lifecycle flips. */
const ledgerByRoot = /* @__PURE__ */ new WeakMap();
/** Selectors for nodes whose text content should never be paced by the reveal engine. */
const SKIP_TEXT_SELECTOR = [
	"[aria-hidden=\"true\"]",
	"[aria-live]",
	"[contenteditable=\"true\"]",
	"[data-smooth-excluded]",
	".DiffViewer-module_block",
	"script",
	"style",
	"textarea"
].join(",");
function revealable(node, root) {
	if (node.data.trim() === "") return false;
	const parent = node.parentElement;
	return parent !== null && root.contains(parent) && parent.closest(SKIP_TEXT_SELECTOR) === null;
}
function commonPrefix(left, right) {
	const limit = Math.min(left.length, right.length);
	let index = 0;
	while (index < limit && left[index] === right[index]) index += 1;
	return index;
}
/**
* Pace text inside a renderer whose React component is intentionally opaque.
* Initial content is revealed only for a genuinely new row; later mutations
* stay paced until `enabled` becomes false, at which point the full renderer
* content is restored synchronously before paint.
*/
function useProgressiveDomText(rootRef, enabled, revealInitial, speedCpsRef, onSettled) {
	(0, react.useLayoutEffect)(() => {
		const root = rootRef.current;
		if (root === null || typeof document === "undefined") return;
		let records = ledgerByRoot.get(root);
		if (!enabled && records === void 0) return;
		if (records === void 0) {
			records = /* @__PURE__ */ new Map();
			ledgerByRoot.set(root, records);
		}
		const forEachText = (from, callback) => {
			if (from.nodeType === Node.TEXT_NODE) {
				callback(from);
				return;
			}
			const walker = document.createTreeWalker(from, NodeFilter.SHOW_TEXT);
			let current = walker.nextNode();
			while (current !== null) {
				callback(current);
				current = walker.nextNode();
			}
		};
		const settle = (text) => {
			if (!revealable(text, root)) return;
			const chars = [...text.data];
			records.set(text, {
				chars,
				full: text.data,
				shown: chars.length
			});
		};
		const snapshotVisible = () => {
			const current = /* @__PURE__ */ new Set();
			forEachText(root, (text) => {
				if (!revealable(text, root)) return;
				current.add(text);
				settle(text);
			});
			for (const text of records.keys()) if (!current.has(text)) records.delete(text);
		};
		if (!enabled) {
			snapshotVisible();
			const observer = typeof MutationObserver === "undefined" ? null : new MutationObserver(snapshotVisible);
			observer?.observe(root, {
				childList: true,
				characterData: true,
				subtree: true
			});
			return () => {
				observer?.disconnect();
			};
		}
		const pending = /* @__PURE__ */ new Set();
		const internalWrites = /* @__PURE__ */ new WeakMap();
		let rafId = 0;
		let lastFrame = null;
		let debt = 0;
		let stopped = false;
		let announcedSettled = false;
		const streamId = `dom-${Math.random().toString(36).slice(2)}`;
		const announceSettled = () => {
			lastFrame = null;
			debt = 0;
			speedCpsRef.current = 35;
			debugRuntime.reportStream(streamId, null);
			if (announcedSettled) return;
			announcedSettled = true;
			onSettled?.();
		};
		const write = (node, value) => {
			if (node.data === value) return;
			internalWrites.set(node, value);
			node.data = value;
		};
		const enqueue = (node, full, preserve) => {
			if (!revealable(node, root)) return;
			const chars = [...full];
			const preserved = preserve === void 0 ? 0 : Math.min(preserve.shown, commonPrefix(preserve.chars, chars));
			const record = {
				chars,
				full,
				shown: preserved
			};
			records.set(node, record);
			if (preserved < chars.length) {
				pending.add(node);
				announcedSettled = false;
			} else pending.delete(node);
			write(node, chars.slice(0, preserved).join(""));
		};
		const visit = (from, reveal) => {
			forEachText(from, (text) => {
				if (!revealable(text, root)) return;
				if (reveal) {
					enqueue(text, text.data, records.get(text));
					return;
				}
				settle(text);
			});
		};
		const forget = (from) => {
			forEachText(from, (text) => {
				if (root.contains(text)) return;
				records.delete(text);
				pending.delete(text);
			});
		};
		const scheduleFrame = () => {
			if (stopped || pending.size === 0 || rafId !== 0) return;
			rafId = requestAnimationFrame(frame);
		};
		const frame = (now) => {
			rafId = 0;
			if (stopped) return;
			if (pending.size === 0) {
				announceSettled();
				return;
			}
			announcedSettled = false;
			if (lastFrame === null) {
				lastFrame = now;
				scheduleFrame();
				return;
			}
			const elapsed = Math.max(0, now - lastFrame);
			lastFrame = now;
			let backlog = 0;
			for (const node of pending) {
				const record = records.get(node);
				if (record !== void 0) backlog += record.chars.length - record.shown;
			}
			const step = computeAdaptiveQueueStep(backlog, elapsed, debt, 1, debugRuntime.activeTuning());
			debt = step.debt;
			speedCpsRef.current = step.speedCps;
			let remaining = step.revealChars;
			for (const node of [...pending]) {
				if (remaining <= 0) break;
				const record = records.get(node);
				if (record === void 0 || !node.isConnected) {
					pending.delete(node);
					records.delete(node);
					continue;
				}
				const amount = Math.min(remaining, record.chars.length - record.shown);
				const shown = record.shown + amount;
				const next = {
					...record,
					shown
				};
				records.set(node, next);
				write(node, next.chars.slice(0, shown).join(""));
				remaining -= amount;
				if (shown >= next.chars.length) pending.delete(node);
			}
			let targetChars = 0;
			let displayedChars = 0;
			let nextBacklog = 0;
			for (const [node, record] of records) {
				if (!node.isConnected) {
					records.delete(node);
					pending.delete(node);
					continue;
				}
				targetChars += record.chars.length;
				displayedChars += record.shown;
				if (pending.has(node)) nextBacklog += record.chars.length - record.shown;
			}
			debugRuntime.reportStream(streamId, {
				backlog: nextBacklog,
				speedCps: step.speedCps,
				targetChars,
				displayedChars,
				active: pending.size > 0
			});
			if (pending.size === 0) announceSettled();
			else scheduleFrame();
		};
		visit(root, revealInitial);
		const observer = typeof MutationObserver === "undefined" ? null : new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === "characterData") {
					const node = mutation.target;
					if (internalWrites.get(node) === node.data) {
						internalWrites.delete(node);
						continue;
					}
					enqueue(node, node.data, records.get(node));
					continue;
				}
				for (const removed of mutation.removedNodes) forget(removed);
				for (const added of mutation.addedNodes) visit(added, true);
			}
			if (pending.size === 0) announceSettled();
			else scheduleFrame();
		});
		observer?.observe(root, {
			childList: true,
			characterData: true,
			subtree: true
		});
		if (pending.size === 0) announceSettled();
		else scheduleFrame();
		return () => {
			stopped = true;
			cancelAnimationFrame(rafId);
			observer?.disconnect();
			for (const [node, record] of records) {
				const controlled = record.chars.slice(0, record.shown).join("");
				if (node.isConnected && node.data === controlled) write(node, record.full);
			}
			pending.clear();
			speedCpsRef.current = 35;
			debugRuntime.reportStream(streamId, null);
		};
	}, [
		enabled,
		onSettled,
		revealInitial,
		rootRef,
		speedCpsRef
	]);
}
//#endregion
//#region src/client/smooth/TypewriterToolNodeView.tsx
var FollowRowErrorBoundary = class extends react.Component {
	state = { error: null };
	static getDerivedStateFromError(error) {
		return { error };
	}
	componentDidCatch(error, info) {
		console.error("[smooth] follow-wrapped row render failed:", error, info);
	}
	render() {
		if (this.state.error !== null) return null;
		return this.props.children;
	}
};
function openAgentLocation(node) {
	if (node === null || typeof node !== "object" || !("location" in node)) return false;
	const location = node.location;
	if (location === null || typeof location !== "object" || !("kind" in location)) return false;
	const kind = location.kind;
	if (!("turn" in location)) return false;
	const turn = location.turn;
	if (turn === null || typeof turn !== "object" || !("status" in turn)) return false;
	if (kind === "turn") return turn.status === "open";
	if (kind !== "step" || !("step" in location)) return false;
	const step = location.step;
	return step !== null && typeof step === "object" && "status" in step && step.status === "open";
}
/**
* True while a Chat node has an explicitly unfinished lifecycle: an
* assistant/workflow `status: 'running'` payload, a Tool root that has not
* settled (`kind` absent), or a model-retry whose current attempt is still
* `scheduled`. Open-but-otherwise-unknown rows are covered by
* `isFollowableChatNode` below.
* @param node - The Chat node's view `node` prop.
* @returns whether this row should own conversation follow.
*/
function isGrowingChatNode(node) {
	if (node === null || typeof node !== "object" || !("data" in node)) return false;
	const data = node.data;
	if (data === null || typeof data !== "object") return false;
	if ("status" in data && data.status === "running") return true;
	if ("kind" in data && data.kind === "command" && "outcome" in data && data.outcome === null) return true;
	if ("command" in data) {
		const command = data.command;
		if (command !== null && typeof command === "object" && "outcome" in command && command.outcome === null) return true;
	}
	if ("root" in data) {
		const root = data.root;
		if (root !== null && typeof root === "object" && !("kind" in root)) return true;
	}
	if ("current" in data) {
		const current = data.current;
		if (current !== null && typeof current === "object" && "retryState" in current && current.retryState === "scheduled") return true;
	}
	return false;
}
/**
* True for any Agent-owned Chat row in the currently open turn/step. This is
* the extensibility boundary: a newly registered Context, Command, Tool, or
* workflow renderer is followed without adding another kind-specific branch.
*/
function isFollowableChatNode(node) {
	return isGrowingChatNode(node) || openAgentLocation(node);
}
/**
* True when a newly mounted Agent-owned row belongs to the current open
* Turn/Step, or is itself an unresolved growing lifecycle.
* @param node - The Chat node's view `node` prop.
* @returns whether its initial height should enter through conversation follow.
*/
function shouldAnimateChatNodeEntrance(node) {
	return isFollowableChatNode(node);
}
/** Runtime-only fallback for unknown or terminal rows at the active flow tip. */
function liveAgentTailMode(root) {
	const port = root.closest("[data-conversation-scroll]");
	if (port === null) return null;
	const row = root.closest("[data-chat-flow-key]");
	if (row !== null) {
		let sibling = row.nextElementSibling;
		while (sibling !== null) {
			if (sibling instanceof HTMLElement && sibling.hasAttribute("data-chat-flow-key")) return null;
			sibling = sibling.nextElementSibling;
		}
	}
	const flow = root.closest("[data-chat-flow]");
	if (flow !== null && [...flow.children].some((child) => child instanceof HTMLElement && child.getAttribute("role") === "status" && !child.hasAttribute("data-chat-flow-key"))) return "turn";
	return hasRecentConversationFollow(port) ? "handoff" : null;
}
/**
* Wrap a prior Agent Chat renderer so its entrance and later growth share
* conversation follow. Presentation stays with the wrapped component; kit
* seats (`renderSlot`, locale, inject) pass through unchanged.
* @param Inner - The already-registered row component.
* @returns A follow-hosted row.
*/
function wrapFollowNodeView(Inner) {
	if (Inner === void 0 || Inner === null) {
		console.error("[smooth] wrapFollowNodeView: Inner is", Inner, "- skipping wrap to avoid #130");
		return Inner;
	}
	return function TypewriterFollowNodeView(props) {
		const speedCpsRef = (0, react.useRef)(35);
		const hostRef = (0, react.useRef)(null);
		const growing = isGrowingChatNode(props.node);
		const structurallyFollowable = isFollowableChatNode(props.node);
		const structuralRef = (0, react.useRef)(structurallyFollowable);
		const [runtimeFollowable, setRuntimeFollowable] = (0, react.useState)(false);
		const runtimePersistentRef = (0, react.useRef)(false);
		const runtimeHandledRef = (0, react.useRef)(false);
		const followable = structurallyFollowable || runtimeFollowable;
		const revealInitialRef = (0, react.useRef)(true);
		const [entering, setEntering] = (0, react.useState)(() => shouldAnimateChatNodeEntrance(props.node));
		const [growthPulse, setGrowthPulse] = (0, react.useState)(false);
		const followableRef = (0, react.useRef)(false);
		const growingRef = (0, react.useRef)(growing);
		const entranceActiveRef = (0, react.useRef)(entering || growthPulse);
		const growthExtentRef = (0, react.useRef)(null);
		const mountedRef = (0, react.useRef)(true);
		const pulseTimerRef = (0, react.useRef)(null);
		structuralRef.current = structurallyFollowable;
		followableRef.current = followable;
		growingRef.current = growing;
		entranceActiveRef.current = entering || growthPulse;
		const finishRuntimeReveal = (0, react.useCallback)(() => {
			if (structuralRef.current || runtimePersistentRef.current) return;
			runtimeHandledRef.current = true;
			setRuntimeFollowable(false);
		}, []);
		useProgressiveDomText(hostRef, followable, revealInitialRef.current, speedCpsRef, runtimeFollowable ? finishRuntimeReveal : void 0);
		(0, react.useLayoutEffect)(() => {
			if (structurallyFollowable) return;
			const root = hostRef.current;
			if (root === null) return;
			const mode = liveAgentTailMode(root);
			if (runtimeFollowable) {
				if (runtimePersistentRef.current && mode !== "turn") {
					runtimePersistentRef.current = false;
					runtimeHandledRef.current = true;
					setRuntimeFollowable(false);
				}
				return;
			}
			if (runtimeHandledRef.current || mode === null) return;
			runtimePersistentRef.current = mode === "turn";
			setRuntimeFollowable(true);
			setEntering(true);
		}, [runtimeFollowable, structurallyFollowable]);
		const finishEntrance = (0, react.useCallback)(() => {
			growthExtentRef.current = null;
			if (pulseTimerRef.current !== null) {
				clearTimeout(pulseTimerRef.current);
				pulseTimerRef.current = null;
			}
			setEntering(false);
			setGrowthPulse(false);
		}, []);
		const onGrowth = (0, react.useCallback)((deltaPx) => {
			if (!mountedRef.current || !followableRef.current || growingRef.current || entranceActiveRef.current) return;
			growthExtentRef.current = deltaPx;
			setGrowthPulse(true);
			if (pulseTimerRef.current !== null) clearTimeout(pulseTimerRef.current);
			pulseTimerRef.current = setTimeout(() => {
				pulseTimerRef.current = null;
				setGrowthPulse(false);
			}, 1200);
		}, []);
		(0, react.useEffect)(() => {
			mountedRef.current = true;
			return () => {
				mountedRef.current = false;
				if (pulseTimerRef.current !== null) clearTimeout(pulseTimerRef.current);
			};
		}, []);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FollowRowErrorBoundary, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FollowHost, {
			active: growing,
			entrance: entering || growthPulse,
			onEntranceSettled: finishEntrance,
			onGrowth: followable ? onGrowth : void 0,
			entranceExtentRef: growthExtentRef,
			speedCpsRef,
			predictive: false,
			hostRef,
			children: (0, react.createElement)(Inner, props)
		}) });
	};
}
//#endregion
//#region src/client/smooth/SmoothStreamCard.module.css
var SmoothStreamCard_module_default = {
	"body": "G0w6yq_body",
	"card": "G0w6yq_card",
	"cardOpen": "G0w6yq_cardOpen",
	"chevron": "G0w6yq_chevron",
	"chevronOpen": "G0w6yq_chevronOpen",
	"description": "G0w6yq_description",
	"discard": "G0w6yq_discard",
	"failed": "G0w6yq_failed",
	"failure": "G0w6yq_failure",
	"field": "G0w6yq_field",
	"fieldDisabled": "G0w6yq_fieldDisabled",
	"fieldHead": "G0w6yq_fieldHead",
	"footer": "G0w6yq_footer",
	"header": "G0w6yq_header",
	"headText": "G0w6yq_headText",
	"hint": "G0w6yq_hint",
	"label": "G0w6yq_label",
	"name": "G0w6yq_name",
	"pending": "G0w6yq_pending",
	"readOnly": "G0w6yq_readOnly",
	"save": "G0w6yq_save",
	"toggle": "G0w6yq_toggle",
	"update": "G0w6yq_update",
	"updateCopy": "G0w6yq_updateCopy",
	"updateRow": "G0w6yq_updateRow",
	"version": "G0w6yq_version"
};
//#endregion
//#region src/client/smooth/SmoothStreamCard.tsx
/**
* The smooth-stream plugin configuration card, rendered inside the Web
* Settings "plugin configuration" page. Preferences are staged until the user
* saves — the same shape as the Host-shipped cards, hand-drawn because the
* Host cards' chrome is not exported for reuse.
*/
/** Render the smooth-stream card independently of the core settings namespace allowlist. */
function SmoothStreamCard(props) {
	const { t } = props;
	const [open, setOpen] = (0, react.useState)(false);
	const state = props.useSmoothStreamCard((snapshot) => snapshot);
	const blocked = !state.dirty || state.saving || state.status !== "ready";
	const versionLabel = state.version === void 0 ? null : t(state.installation === "development" ? "developmentVersion" : "version").replace("{version}", state.version);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
		className: open ? `${SmoothStreamCard_module_default.card} ${SmoothStreamCard_module_default.cardOpen}` : SmoothStreamCard_module_default.card,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			type: "button",
			className: SmoothStreamCard_module_default.header,
			"aria-expanded": open,
			onClick: () => {
				setOpen(!open);
			},
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: SmoothStreamCard_module_default.headText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: SmoothStreamCard_module_default.name,
						children: t("title")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: SmoothStreamCard_module_default.description,
						children: t("description")
					})]
				}),
				versionLabel === null ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: SmoothStreamCard_module_default.version,
					children: versionLabel
				}),
				state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: SmoothStreamCard_module_default.pending,
					children: t("unsaved")
				}) : null,
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: open ? `${SmoothStreamCard_module_default.chevron} ${SmoothStreamCard_module_default.chevronOpen}` : SmoothStreamCard_module_default.chevron })
			]
		}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: SmoothStreamCard_module_default.body,
			children: [
				state.status === "loading" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: SmoothStreamCard_module_default.readOnly,
					role: "status",
					children: t("loading")
				}) : null,
				state.status === "unavailable" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: SmoothStreamCard_module_default.failure,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: SmoothStreamCard_module_default.readOnly,
						role: "status",
						children: t("unavailable")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: SmoothStreamCard_module_default.discard,
						onClick: props.reload,
						children: t("retry")
					})]
				}) : null,
				state.status === "ready" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					!state.writable ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: SmoothStreamCard_module_default.readOnly,
						role: "status",
						children: t("readOnly")
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
						className: SmoothStreamCard_module_default.field,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: SmoothStreamCard_module_default.fieldHead,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: SmoothStreamCard_module_default.label,
								children: t("enabled")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: SmoothStreamCard_module_default.toggle,
								checked: state.enabled,
								disabled: !state.writable || state.saving,
								onChange: (event) => {
									props.edit({ enabled: event.target.checked });
								}
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: SmoothStreamCard_module_default.hint,
							children: t("enabledHint")
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
						className: state.enabled ? SmoothStreamCard_module_default.field : `${SmoothStreamCard_module_default.field} ${SmoothStreamCard_module_default.fieldDisabled}`,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: SmoothStreamCard_module_default.fieldHead,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: SmoothStreamCard_module_default.label,
								children: t("thinkAutoExpand")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: SmoothStreamCard_module_default.toggle,
								checked: state.thinkAutoExpand,
								disabled: !state.writable || state.saving || !state.enabled,
								onChange: (event) => {
									props.edit({ thinkAutoExpand: event.target.checked });
								}
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: SmoothStreamCard_module_default.hint,
							children: t("thinkAutoExpandHint")
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
						className: state.enabled ? SmoothStreamCard_module_default.field : `${SmoothStreamCard_module_default.field} ${SmoothStreamCard_module_default.fieldDisabled}`,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: SmoothStreamCard_module_default.fieldHead,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: SmoothStreamCard_module_default.label,
								children: t("motionPreference")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								value: state.motionPreference,
								disabled: !state.writable || state.saving || !state.enabled,
								onChange: (event) => {
									props.edit({ motionPreference: event.target.value });
								},
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "auto",
										children: t("motionAuto")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "force-smooth",
										children: t("motionForceSmooth")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "force-reduced",
										children: t("motionForceReduced")
									})
								]
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: SmoothStreamCard_module_default.hint,
							children: t("motionPreferenceHint")
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
						className: state.debugAvailable ? SmoothStreamCard_module_default.field : `${SmoothStreamCard_module_default.field} ${SmoothStreamCard_module_default.fieldDisabled}`,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: SmoothStreamCard_module_default.fieldHead,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: SmoothStreamCard_module_default.label,
								children: t("debugEnabled")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: SmoothStreamCard_module_default.toggle,
								checked: state.debugEnabled,
								disabled: !state.debugAvailable || !state.writable || state.saving,
								onChange: (event) => {
									props.edit({ debugEnabled: event.target.checked });
								}
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: SmoothStreamCard_module_default.hint,
							children: state.debugAvailable ? t("debugEnabledHint") : t("debugUnavailable")
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: SmoothStreamCard_module_default.updateRow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: SmoothStreamCard_module_default.updateCopy,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: SmoothStreamCard_module_default.label,
								children: t("updates")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: SmoothStreamCard_module_default.hint,
								children: state.restartRequired ? t("restartRequired") : state.installation === "npm" ? t("updateHint") : state.installation === "development" ? t("developmentBuild") : t("updateUnavailable")
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: SmoothStreamCard_module_default.update,
							disabled: !state.canUpgrade || state.upgrading || state.restartRequired,
							title: state.canUpgrade ? void 0 : t("updateUnavailable"),
							onClick: props.upgrade,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline14, {})
							}), t(state.upgrading ? "updating" : "update")]
						})]
					}),
					state.upgradeFailed ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: SmoothStreamCard_module_default.failed,
						role: "status",
						children: t("updateFailed")
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: SmoothStreamCard_module_default.footer,
						children: [
							state.failed ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: SmoothStreamCard_module_default.failed,
								role: "status",
								children: t("saveFailed")
							}) : null,
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: SmoothStreamCard_module_default.discard,
								disabled: !state.dirty || state.saving,
								onClick: props.discard,
								children: t("discard")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: SmoothStreamCard_module_default.save,
								disabled: blocked,
								onClick: props.save,
								children: t(state.saving ? "saving" : "save")
							})
						]
					})
				] }) : null
			]
		}) : null]
	});
}
//#endregion
//#region src/client/smooth/SmoothStreamCardController.ts
/** Bridge the host settingsScope onto a staged settings form. */
var SmoothStreamCardController = class {
	ctx;
	store = createSnapshotStore(this.projection());
	loadedBase;
	loadedDebug;
	stagedBase;
	stagedDebug;
	saving = false;
	failed = false;
	upgrading = false;
	upgradeFailed = false;
	restartRequired = false;
	loadStatus = "loading";
	scopeUnsubscribe;
	constructor(ctx) {
		this.ctx = ctx;
	}
	/**
	* The settings scope for this plugin, bound to its namespace.
	*
	* The unbound `ctx.settingsScope` does not expose this section (its
	* `getSnapshot().value` is not this plugin's section) and carries no
	* `subscribe`, so every read silently fell back to the defaults and external
	* writes were invisible — which made the enable toggle a no-op.
	*/
	scope() {
		const root = this.ctx.settingsScope;
		if (root !== null && root !== void 0 && typeof root.bind === "function") return root.bind({ namespace: UI_CUSTOM_SETTINGS_NS });
		return root;
	}
	start() {
		this.load();
		try {
			const scope = this.scope();
			if (scope !== null && scope !== void 0 && typeof scope.subscribe === "function") this.scopeUnsubscribe = scope.subscribe(() => {
				this.syncFromScope();
			});
		} catch {}
	}
	stop() {
		if (this.scopeUnsubscribe !== void 0) {
			try {
				this.scopeUnsubscribe();
			} catch {}
			this.scopeUnsubscribe = void 0;
		}
		this.loadStatus = "loading";
		this.publish();
	}
	/**
	* Refresh the cached values from the scope WITHOUT resetting the load status.
	*
	* `load()` first flips to 'loading', which would briefly make
	* `takeoverEnabled()` false and tear the takeover down and straight back up;
	* an external write only needs the values refreshed.
	*/
	syncFromScope() {
		try {
			const value = this.scope().getSnapshot().value;
			if (value === void 0 || value === null || typeof value !== "object") return;
			const obj = value;
			this.loadedBase = {
				enabled: typeof obj.smoothEnabled === "boolean" ? obj.smoothEnabled : DEFAULT_STREAM_SETTINGS.enabled,
				thinkAutoExpand: typeof obj.smoothThinkAutoExpand === "boolean" ? obj.smoothThinkAutoExpand : DEFAULT_STREAM_SETTINGS.thinkAutoExpand,
				motionPreference: toMotionPreference(obj.smoothMotionPreference),
				logarithmicFade: obj.smoothLogFadeEnabled !== false
			};
			if (obj.smoothDebugEnabled !== void 0 || obj.smoothDebugTuning !== void 0) this.loadedDebug = {
				debugEnabled: typeof obj.smoothDebugEnabled === "boolean" ? obj.smoothDebugEnabled : DEFAULT_STREAM_SETTINGS.debugEnabled,
				debugTuning: this.parseDebugTuning(obj.smoothDebugTuning)
			};
			this.loadStatus = "ready";
			this.publish();
		} catch {}
	}
	getSnapshot() {
		return this.store.getSnapshot();
	}
	subscribe(listener) {
		return this.store.subscribe(listener);
	}
	inject() {
		return {
			hooks: { smoothStreamCard: this.store },
			edit: (patch) => {
				if (this.saving) return;
				if (patch.enabled !== void 0 || patch.thinkAutoExpand !== void 0 || patch.motionPreference !== void 0 || patch.logarithmicFade !== void 0) this.stagedBase = {
					...this.baseValues(),
					...patch.enabled === void 0 ? {} : { enabled: patch.enabled },
					...patch.thinkAutoExpand === void 0 ? {} : { thinkAutoExpand: patch.thinkAutoExpand },
					...patch.motionPreference === void 0 ? {} : { motionPreference: patch.motionPreference },
					...patch.logarithmicFade === void 0 ? {} : { logarithmicFade: patch.logarithmicFade }
				};
				if (patch.debugEnabled !== void 0 || patch.debugTuning !== void 0) this.stagedDebug = {
					...this.debugValues(),
					...patch.debugEnabled === void 0 ? {} : { debugEnabled: patch.debugEnabled },
					...patch.debugTuning === void 0 ? {} : { debugTuning: {
						...this.debugValues().debugTuning,
						...patch.debugTuning
					} }
				};
				this.failed = false;
				this.publish();
			},
			save: () => {
				this.save();
			},
			discard: () => {
				if (this.stagedBase === void 0 && this.stagedDebug === void 0 && !this.failed) return;
				this.stagedBase = void 0;
				this.stagedDebug = void 0;
				this.failed = false;
				this.publish();
			},
			reload: () => {
				this.load();
			},
			upgrade: () => {
				this.upgrade();
			}
		};
	}
	projection() {
		return {
			status: this.loadStatus,
			writable: true,
			dirty: this.stagedBase !== void 0 || this.stagedDebug !== void 0,
			saving: this.saving,
			failed: this.failed,
			...this.baseValues(),
			...this.debugValues(),
			debugAvailable: true,
			version: void 0,
			installation: "unmanaged",
			canUpgrade: false,
			upgrading: this.upgrading,
			upgradeFailed: this.upgradeFailed,
			restartRequired: this.restartRequired
		};
	}
	baseValues() {
		return this.stagedBase ?? this.loadedBase ?? {
			enabled: DEFAULT_STREAM_SETTINGS.enabled,
			thinkAutoExpand: DEFAULT_STREAM_SETTINGS.thinkAutoExpand,
			motionPreference: DEFAULT_STREAM_SETTINGS.motionPreference,
			logarithmicFade: DEFAULT_STREAM_SETTINGS.logarithmicFade
		};
	}
	debugValues() {
		return this.stagedDebug ?? this.loadedDebug ?? {
			debugEnabled: DEFAULT_STREAM_SETTINGS.debugEnabled,
			debugTuning: DEFAULT_STREAM_DEBUG_TUNING
		};
	}
	values() {
		return {
			...this.baseValues(),
			...this.debugValues()
		};
	}
	load() {
		this.loadStatus = "loading";
		this.loadedBase = void 0;
		this.loadedDebug = void 0;
		this.publish();
		try {
			const scope = this.scope();
			if (scope) {
				const snapshot = scope.getSnapshot();
				if (snapshot.value !== void 0 && typeof snapshot.value === "object") {
					const obj = snapshot.value;
					this.loadedBase = {
						enabled: typeof obj.smoothEnabled === "boolean" ? obj.smoothEnabled : DEFAULT_STREAM_SETTINGS.enabled,
						thinkAutoExpand: typeof obj.smoothThinkAutoExpand === "boolean" ? obj.smoothThinkAutoExpand : DEFAULT_STREAM_SETTINGS.thinkAutoExpand,
						motionPreference: toMotionPreference(obj.smoothMotionPreference)
					};
					if (obj.smoothDebugEnabled !== void 0 || obj.smoothDebugTuning !== void 0) this.loadedDebug = {
						debugEnabled: typeof obj.smoothDebugEnabled === "boolean" ? obj.smoothDebugEnabled : DEFAULT_STREAM_SETTINGS.debugEnabled,
						debugTuning: this.parseDebugTuning(obj.smoothDebugTuning)
					};
					this.loadStatus = "ready";
					this.publish();
					return;
				}
			}
		} catch {}
		this.loadStatus = "unavailable";
		this.publish();
	}
	parseDebugTuning(raw) {
		if (raw === null || raw === void 0 || typeof raw !== "object") return { ...DEFAULT_STREAM_DEBUG_TUNING };
		const t = raw;
		return {
			revealScale: typeof t.revealScale === "number" ? t.revealScale : DEFAULT_STREAM_DEBUG_TUNING.revealScale,
			queuePressure: typeof t.queuePressure === "number" ? t.queuePressure : DEFAULT_STREAM_DEBUG_TUNING.queuePressure,
			maxRevealCps: typeof t.maxRevealCps === "number" ? t.maxRevealCps : DEFAULT_STREAM_DEBUG_TUNING.maxRevealCps,
			springStiffness: typeof t.springStiffness === "number" ? t.springStiffness : DEFAULT_STREAM_DEBUG_TUNING.springStiffness,
			springDamping: typeof t.springDamping === "number" ? t.springDamping : DEFAULT_STREAM_DEBUG_TUNING.springDamping,
			springMass: typeof t.springMass === "number" ? t.springMass : DEFAULT_STREAM_DEBUG_TUNING.springMass,
			runwayPx: typeof t.runwayPx === "number" ? t.runwayPx : DEFAULT_STREAM_DEBUG_TUNING.runwayPx,
			reserveResponseMs: typeof t.reserveResponseMs === "number" ? t.reserveResponseMs : DEFAULT_STREAM_DEBUG_TUNING.reserveResponseMs,
			backpressureMinScale: typeof t.backpressureMinScale === "number" ? t.backpressureMinScale : DEFAULT_STREAM_DEBUG_TUNING.backpressureMinScale
		};
	}
	save() {
		if (this.stagedBase === void 0 && this.stagedDebug === void 0 || this.saving) return;
		this.saving = true;
		this.failed = false;
		this.publish();
		try {
			const scope = this.scope();
			if (scope) {
				if (this.stagedBase !== void 0) {
					if (this.stagedBase.enabled !== void 0) scope.set("smoothEnabled", this.stagedBase.enabled);
					if (this.stagedBase.thinkAutoExpand !== void 0) scope.set("smoothThinkAutoExpand", this.stagedBase.thinkAutoExpand);
					if (this.stagedBase.motionPreference !== void 0) scope.set("smoothMotionPreference", this.stagedBase.motionPreference);
					if (this.stagedBase.logarithmicFade !== void 0) scope.set("smoothLogFadeEnabled", this.stagedBase.logarithmicFade);
				}
				if (this.stagedDebug !== void 0) {
					if (this.stagedDebug.debugEnabled !== void 0) scope.set("smoothDebugEnabled", this.stagedDebug.debugEnabled);
					if (this.stagedDebug.debugTuning !== void 0) scope.set("smoothDebugTuning", this.stagedDebug.debugTuning);
				}
				this.loadedBase = { ...this.baseValues() };
				this.loadedDebug = { ...this.debugValues() };
				this.stagedBase = void 0;
				this.stagedDebug = void 0;
			}
		} catch {
			this.failed = true;
		}
		this.saving = false;
		this.publish();
	}
	upgrade() {
		this.upgrading = true;
		this.upgradeFailed = false;
		this.restartRequired = false;
		this.publish();
		this.upgradeFailed = true;
		this.upgrading = false;
		this.publish();
	}
	publish() {
		this.store.set(this.projection());
	}
};
//#endregion
//#region src/client/smooth/DebugPanel.module.css
var DebugPanel_module_default = {
	"control": "XT2y7a_control",
	"controlHead": "XT2y7a_controlHead",
	"controlLabel": "XT2y7a_controlLabel",
	"footer": "XT2y7a_footer",
	"footerSpacer": "XT2y7a_footerSpacer",
	"guide": "XT2y7a_guide",
	"iconButton": "XT2y7a_iconButton",
	"infoButton": "XT2y7a_infoButton",
	"metric": "XT2y7a_metric",
	"metrics": "XT2y7a_metrics",
	"number": "XT2y7a_number",
	"numberWrap": "XT2y7a_numberWrap",
	"panel": "XT2y7a_panel",
	"panelHeader": "XT2y7a_panelHeader",
	"primaryButton": "XT2y7a_primaryButton",
	"range": "XT2y7a_range",
	"scrollArea": "XT2y7a_scrollArea",
	"secondaryButton": "XT2y7a_secondaryButton",
	"section": "XT2y7a_section",
	"state": "XT2y7a_state",
	"statusDot": "XT2y7a_statusDot",
	"statusLive": "XT2y7a_statusLive",
	"title": "XT2y7a_title",
	"trigger": "XT2y7a_trigger",
	"triggerActive": "XT2y7a_triggerActive",
	"unit": "XT2y7a_unit",
	"unsaved": "XT2y7a_unsaved",
	"visuallyHidden": "XT2y7a_visuallyHidden"
};
//#endregion
//#region src/client/smooth/DebugPanel.tsx
const REVEAL_CONTROLS = [
	{
		key: "revealScale",
		label: "debugRevealMultiplier",
		tip: "debugTipRevealMultiplier",
		min: .25,
		max: 2,
		step: .05,
		unit: "x"
	},
	{
		key: "queuePressure",
		label: "debugQueuePressure",
		tip: "debugTipQueuePressure",
		min: 0,
		max: 2,
		step: .05,
		unit: "x"
	},
	{
		key: "maxRevealCps",
		label: "debugMaxReveal",
		tip: "debugTipMaxReveal",
		min: 120,
		max: 1e3,
		step: 10,
		unit: "cps"
	}
];
const FOLLOW_CONTROLS = [
	{
		key: "springStiffness",
		label: "debugSpringStiffness",
		tip: "debugTipSpringStiffness",
		min: 40,
		max: 320,
		step: 5,
		unit: ""
	},
	{
		key: "springDamping",
		label: "debugSpringDamping",
		tip: "debugTipSpringDamping",
		min: 8,
		max: 80,
		step: 1,
		unit: ""
	},
	{
		key: "springMass",
		label: "debugSpringMass",
		tip: "debugTipSpringMass",
		min: .5,
		max: 3,
		step: .05,
		unit: ""
	},
	{
		key: "runwayPx",
		label: "debugRunway",
		tip: "debugTipRunway",
		min: 0,
		max: 120,
		step: 2,
		unit: "px"
	},
	{
		key: "reserveResponseMs",
		label: "debugReserveResponse",
		tip: "debugTipReserveResponse",
		min: 60,
		max: 600,
		step: 10,
		unit: "ms"
	},
	{
		key: "backpressureMinScale",
		label: "debugBackpressureMin",
		tip: "debugTipBackpressureMin",
		min: .25,
		max: 1,
		step: .05,
		unit: "x"
	}
];
function fixed(value, digits = 1) {
	return value === null || !Number.isFinite(value) ? "-" : value.toFixed(digits);
}
function Metric({ label, value, tone }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: DebugPanel_module_default.metric,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: label }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", {
			"data-tone": tone,
			children: value
		})]
	});
}
function TuningField({ control, state, edit, label, t }) {
	const value = state.tuning[control.key];
	const labelId = `smooth-stream-debug-${control.key}`;
	const update = (next) => {
		if (!Number.isFinite(next)) return;
		const clamped = Math.min(control.max, Math.max(control.min, next));
		edit({ debugTuning: {
			...state.tuning,
			[control.key]: clamped
		} });
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: DebugPanel_module_default.control,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
			className: DebugPanel_module_default.controlHead,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: DebugPanel_module_default.controlLabel,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					id: labelId,
					children: label
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
					label: t(control.tip),
					side: "right",
					maxWidth: 300,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						className: DebugPanel_module_default.infoButton,
						type: "button",
						"aria-label": label,
						title: t(control.tip),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconQuestionOutline14, {})
					})
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: DebugPanel_module_default.numberWrap,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					className: DebugPanel_module_default.number,
					type: "number",
					"aria-labelledby": labelId,
					min: control.min,
					max: control.max,
					step: control.step,
					value,
					disabled: !state.writable,
					onChange: (event) => {
						update(event.currentTarget.valueAsNumber);
					}
				}), control.unit === "" ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: DebugPanel_module_default.unit,
					children: control.unit
				})]
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
			className: DebugPanel_module_default.range,
			type: "range",
			"aria-labelledby": labelId,
			min: control.min,
			max: control.max,
			step: control.step,
			value,
			disabled: !state.writable,
			onChange: (event) => {
				update(event.currentTarget.valueAsNumber);
			}
		})]
	});
}
function DebugPanel(props) {
	const { t } = props;
	const state = props.useDebugRuntime((snapshot) => snapshot);
	const [open, setOpen] = (0, react.useState)(true);
	const [copied, setCopied] = (0, react.useState)(false);
	(0, react.useEffect)(() => {
		if (!copied) return;
		const timer = setTimeout(() => {
			setCopied(false);
		}, 1400);
		return () => {
			clearTimeout(timer);
		};
	}, [copied]);
	(0, react.useEffect)(() => {
		if (state.enabled) setOpen(true);
	}, [state.enabled]);
	if (!state.available || !state.enabled || !open) return null;
	const metrics = state.metrics;
	const live = metrics.streamActive || metrics.followActive;
	const progress = metrics.streamTargetChars <= 0 ? "-" : `${String(metrics.streamDisplayedChars)} / ${String(metrics.streamTargetChars)}`;
	const copyDiagnostics = async () => {
		if (await (0, _deepseek_ai_dsh_client_ui_primitives.writeClipboard)(JSON.stringify({
			tuning: state.tuning,
			metrics: state.metrics
		}, null, 2))) setCopied(true);
	};
	const panel = !state.enabled || !open ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
		className: DebugPanel_module_default.panel,
		role: "complementary",
		"aria-label": t("debugPanelTitle"),
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
				className: DebugPanel_module_default.panelHeader,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: live ? `${DebugPanel_module_default.statusDot} ${DebugPanel_module_default.statusLive}` : DebugPanel_module_default.statusDot,
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: DebugPanel_module_default.title,
						children: t("debugPanelTitle")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: DebugPanel_module_default.state,
						children: t(live ? "debugLive" : "debugIdle")
					}),
					state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: DebugPanel_module_default.unsaved,
						children: t("debugUnsaved")
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						className: DebugPanel_module_default.iconButton,
						type: "button",
						title: t("debugCopy"),
						"aria-label": t("debugCopy"),
						onClick: () => {
							copyDiagnostics();
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCopyOutline16, {})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						className: DebugPanel_module_default.iconButton,
						type: "button",
						title: t("debugPanelClose"),
						"aria-label": t("debugPanelClose"),
						disabled: !state.writable,
						onClick: () => {
							setOpen(false);
							props.edit({ debugEnabled: false });
							props.save();
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseOutline16, {})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: DebugPanel_module_default.visuallyHidden,
						"aria-live": "polite",
						children: copied ? t("debugCopied") : ""
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: DebugPanel_module_default.scrollArea,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: DebugPanel_module_default.guide,
						children: t("debugGuide")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: DebugPanel_module_default.section,
						"aria-labelledby": "smooth-stream-live-heading",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
							id: "smooth-stream-live-heading",
							children: t("debugSectionLive")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("dl", {
							className: DebugPanel_module_default.metrics,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugFps"),
									value: fixed(metrics.fps, 0),
									tone: (metrics.fps ?? 60) < 45 ? "warn" : "good"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugFrameTime"),
									value: `${fixed(metrics.frameMs)} ms`
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugBacklog"),
									value: String(metrics.streamBacklog),
									tone: metrics.streamBacklog > 32 ? "warn" : void 0
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugRevealSpeed"),
									value: `${fixed(metrics.streamSpeedCps, 0)} cps`
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugProgress"),
									value: progress
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugFollowState"),
									value: t(metrics.followFollowing ? "debugFollowing" : "debugReleased")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugLag"),
									value: `${fixed(metrics.followLagPx)} px`,
									tone: metrics.followConstrained ? "warn" : void 0
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugVelocity"),
									value: `${fixed(metrics.followVelocityPxPerSec, 0)} px/s`
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugReserve"),
									value: `${fixed(metrics.followReservePx)} px`
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugCapacity"),
									value: `${fixed(metrics.followCapacityPx)} px`
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Metric, {
									label: t("debugAppliedScale"),
									value: `${fixed(metrics.followRevealScale, 2)}x`
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: DebugPanel_module_default.section,
						"aria-labelledby": "smooth-stream-reveal-heading",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
							id: "smooth-stream-reveal-heading",
							children: t("debugSectionReveal")
						}), REVEAL_CONTROLS.map((control) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TuningField, {
							control,
							state,
							edit: props.edit,
							label: t(control.label),
							t
						}, control.key))]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: DebugPanel_module_default.section,
						"aria-labelledby": "smooth-stream-follow-heading",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
							id: "smooth-stream-follow-heading",
							children: t("debugSectionFollow")
						}), FOLLOW_CONTROLS.map((control) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TuningField, {
							control,
							state,
							edit: props.edit,
							label: t(control.label),
							t
						}, control.key))]
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("footer", {
				className: DebugPanel_module_default.footer,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						className: DebugPanel_module_default.secondaryButton,
						type: "button",
						disabled: !state.writable,
						onClick: props.reset,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline16, {}), t("debugReset")]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: DebugPanel_module_default.footerSpacer }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						className: DebugPanel_module_default.secondaryButton,
						type: "button",
						disabled: !state.writable || !state.dirty,
						onClick: props.discard,
						children: t("debugDiscard")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						className: DebugPanel_module_default.primaryButton,
						type: "button",
						disabled: !state.writable || !state.dirty,
						onClick: props.save,
						children: t("debugSave")
					})
				]
			})
		]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
		type: "button",
		className: state.enabled && open ? `${DebugPanel_module_default.trigger} ${DebugPanel_module_default.triggerActive}` : DebugPanel_module_default.trigger,
		"aria-expanded": state.enabled && open,
		"aria-label": t("debugPanelToggle"),
		title: t("debugPanelToggle"),
		onClick: () => {
			setOpen((current) => !current);
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCodeOutline16, {})
	}), typeof document === "undefined" || panel === null ? null : (0, react_dom.createPortal)(panel, document.body)] });
}
//#endregion
//#region src/client/smooth/locales.ts
/** Locale bundles for the smooth feature settings card. */
/** Dictionary namespace owned by this feature's settings card. */
const NS = "settings.smoothStream";
/** English copy. */
const en$1 = {
	title: "Smooth stream",
	description: "How replies are revealed while they stream.",
	enabled: "Enable smooth streaming",
	enabledHint: "Let this feature render and follow streaming replies. Turn off to use the built-in renderer.",
	thinkAutoExpand: "Auto-expand thinking",
	thinkAutoExpandHint: "Open the thinking block while it streams. Turn off to keep it collapsed.",
	motionPreference: "Motion preference",
	motionPreferenceHint: "How the system \"reduce motion\" preference is honoured. Some environments force it on with no way to turn it off; choose Force smooth to override.",
	motionAuto: "Follow system",
	motionForceSmooth: "Force smooth",
	motionForceReduced: "Force raw text",
	debugEnabled: "Show render diagnostics",
	debugEnabledHint: "Show live streaming and scroll metrics on the right side of the chat.",
	debugUnavailable: "Live diagnostics require a newer version.",
	debugPanelTitle: "Render diagnostics",
	debugPanelToggle: "Toggle render diagnostics",
	debugPanelClose: "Hide diagnostics panel",
	debugGuide: "Tune one value at a time while a reply streams. Keep FPS stable and backlog near zero.",
	debugLive: "Streaming",
	debugIdle: "Idle",
	debugUnsaved: "Unsaved tuning",
	debugSave: "Save tuning",
	debugDiscard: "Discard changes",
	debugReset: "Reset tuning",
	debugCopy: "Copy diagnostics",
	debugCopied: "Copied",
	debugSectionLive: "Live renderer",
	debugSectionReveal: "Reveal tuning",
	debugSectionFollow: "Scroll tuning",
	debugFps: "FPS",
	debugFrameTime: "Frame",
	debugBacklog: "Backlog",
	debugRevealSpeed: "Reveal",
	debugProgress: "Progress",
	debugFollowState: "Follow",
	debugFollowing: "Pinned",
	debugReleased: "Released",
	debugLag: "Visual lag",
	debugVelocity: "Velocity",
	debugReserve: "Reserve",
	debugCapacity: "Capacity",
	debugAppliedScale: "Applied scale",
	debugRevealMultiplier: "Reveal multiplier",
	debugQueuePressure: "Queue pressure",
	debugMaxReveal: "Maximum reveal",
	debugSpringStiffness: "Spring stiffness",
	debugSpringDamping: "Spring damping",
	debugSpringMass: "Spring mass",
	debugRunway: "Predictive runway",
	debugReserveResponse: "Runway response",
	debugBackpressureMin: "Minimum backpressure",
	debugTipRevealMultiplier: "Overall reveal speed multiplier. Higher reveals text faster.",
	debugTipQueuePressure: "Backlog acceleration strength. Higher catches up more aggressively.",
	debugTipMaxReveal: "Hard cap for reveal speed in characters per second.",
	debugTipSpringStiffness: "Scroll spring strength. Higher closes lag faster but can feel sharp.",
	debugTipSpringDamping: "Scroll energy damping. Higher suppresses overshoot and jitter.",
	debugTipSpringMass: "Scroll inertia. Higher makes movement slower and heavier.",
	debugTipRunway: "Predictive blank space reserved while content grows.",
	debugTipReserveResponse: "How quickly the reserved runway opens or closes.",
	debugTipBackpressureMin: "Slowest reveal multiplier under scroll pressure.",
	readOnly: "This deployment stores settings read-only.",
	loading: "Loading smooth stream settings…",
	unavailable: "Settings are unavailable in this connection.",
	retry: "Retry",
	version: "Version {version}",
	developmentVersion: "Development version {version}",
	updates: "Updates",
	updateHint: "Install the newest version, then restart.",
	developmentBuild: "Linked source; updates are managed in the checkout.",
	updateUnavailable: "Updates are available only for an npm installation.",
	update: "Update",
	updating: "Updating…",
	restartRequired: "Updated. Restart to load the new version.",
	updateFailed: "The update failed; your current version is unchanged.",
	save: "Save",
	saving: "Saving…",
	discard: "Discard",
	unsaved: "Unsaved",
	saveFailed: "The deployment did not accept these values."
};
/** Simplified Chinese copy. */
const zh$1 = {
	title: "丝滑流式",
	description: "回复在流式输出时如何逐字展现。",
	enabled: "启用丝滑流式渲染",
	enabledHint: "由本特性渲染并跟随流式回复；关闭后使用内置渲染。",
	thinkAutoExpand: "自动展开思考",
	thinkAutoExpandHint: "思考块在流式时自动展开；关闭后保持折叠，可手动展开。",
	motionPreference: "动效偏好",
	motionPreferenceHint: "系统「减弱动态效果」的遵循方式。某些环境会强制打开且无法关闭，此时可选「强制平滑」覆盖。",
	motionAuto: "跟随系统",
	motionForceSmooth: "强制平滑",
	motionForceReduced: "强制原始文本",
	debugEnabled: "显示渲染调试面板",
	debugEnabledHint: "在聊天右侧显示流式渲染和滚动的实时参数。",
	debugUnavailable: "当前版本不支持实时调试。",
	debugPanelTitle: "渲染诊断",
	debugPanelToggle: "显示或隐藏渲染诊断",
	debugPanelClose: "收起诊断面板",
	debugGuide: "流式输出时一次只调一个参数，观察帧率、积压和视觉滞后。",
	debugLive: "正在流式输出",
	debugIdle: "空闲",
	debugUnsaved: "参数尚未保存",
	debugSave: "保存参数",
	debugDiscard: "放弃修改",
	debugReset: "恢复默认参数",
	debugCopy: "复制诊断数据",
	debugCopied: "已复制",
	debugSectionLive: "实时渲染",
	debugSectionReveal: "流式参数",
	debugSectionFollow: "滚动参数",
	debugFps: "帧率",
	debugFrameTime: "帧耗时",
	debugBacklog: "积压字符",
	debugRevealSpeed: "揭示速度",
	debugProgress: "渲染进度",
	debugFollowState: "跟随状态",
	debugFollowing: "跟随底部",
	debugReleased: "用户已释放",
	debugLag: "视觉滞后",
	debugVelocity: "滚动速度",
	debugReserve: "预留空间",
	debugCapacity: "安全容量",
	debugAppliedScale: "实际倍率",
	debugRevealMultiplier: "揭示倍率",
	debugQueuePressure: "队列压力",
	debugMaxReveal: "最大揭示速度",
	debugSpringStiffness: "弹簧刚度",
	debugSpringDamping: "弹簧阻尼",
	debugSpringMass: "弹簧质量",
	debugRunway: "预测预留空间",
	debugReserveResponse: "预留响应时间",
	debugBackpressureMin: "最小背压倍率",
	debugTipRevealMultiplier: "整体文字揭示速度倍率。调大能更快清空积压。",
	debugTipQueuePressure: "积压对加速的影响强度。调大能更积极追赶。",
	debugTipMaxReveal: "每秒揭示字符数上限。",
	debugTipSpringStiffness: "滚动弹簧刚度。调大更快收拢视觉滞后。",
	debugTipSpringDamping: "滚动能量阻尼。调大能抑制过冲和抖动。",
	debugTipSpringMass: "滚动惯性。调大移动更慢更沉。",
	debugTipRunway: "内容增长时预留的预测空白。",
	debugTipReserveResponse: "预留空间打开或关闭的响应时间。",
	debugTipBackpressureMin: "滚动压力下允许的最低揭示倍率。",
	readOnly: "本部署的设置为只读。",
	loading: "正在加载丝滑流式设置…",
	unavailable: "当前连接无法访问设置。",
	retry: "重试",
	version: "版本 {version}",
	developmentVersion: "开发版本 {version}",
	updates: "更新",
	updateHint: "安装最新版本后重启。",
	developmentBuild: "当前为本地链接版本，请在源码目录管理更新。",
	updateUnavailable: "只有 npm 安装时才能更新。",
	update: "更新",
	updating: "更新中…",
	restartRequired: "已更新；重启后加载新版本。",
	updateFailed: "更新失败，当前版本未改变。",
	save: "保存",
	saving: "保存中…",
	discard: "放弃修改",
	unsaved: "未保存",
	saveFailed: "本部署没有接受这些值。"
};
//#endregion
//#region src/client/smooth/index.ts
/**
* dsh-client-ui-custom smooth feature — browser half entry point.
*
* Ports dsh-smooth-stream's丝滑流式渲染能力 into the dsh-client-ui-custom host.
*
* Architecture notes:
* - Settings: uses `ctx.settingsScope` (ui-custom namespace) instead of the
*   original loopback RPC channel `/smooth-stream`. The smooth fields are
*   stored under the ui-custom settings namespace.
* - Boot config: reads from local `DEFAULT_STREAM_CONFIG` instead of the
*   `__DSH_SMOOTH_STREAM_CONFIG__` global (no host boot bridge in this port).
* - Diagnostics: local settings store with localStorage persistence, mirrored
*   to the settings scope for the settings card.

*
* Source: /tmp/dsh-smooth-stream/src/client/index.ts apply() pattern.
* Host pattern: /Users/zhong/project/dsh-plugins/ui-custom/dsh-client-ui-custom/src/client/index.ts registerFeatures().
*/
/**
* Surfaces the real cause of a render crash inside the assistant-step takeover.
* React's minified #130 ("Element type is invalid") hides which component is
* undefined; this boundary logs it so the failure is diagnosable instead of a
* silent slot crash.
*/
var TakeoverErrorBoundary = class extends react.Component {
	state = { error: null };
	static getDerivedStateFromError(error) {
		return { error };
	}
	componentDidCatch(error) {
		console.error("[smooth] assistant-step takeover render failed:", error);
	}
	render() {
		if (this.state.error !== null) return null;
		return this.props.children;
	}
};
const STREAM_MODES = ["typewriter", "teleprompter"];
const STREAM_PRESETS = [
	"realtime",
	"balanced",
	"silky"
];
/**
* The assistant renderer owns its own character queue and conversation
* follower, so wrapping it again would create two scroll owners.
*/
const SKIP_WRAP = /* @__PURE__ */ new Set([
	"assistant-step",
	"user",
	"steering",
	"command-input"
]);
function isWrappableComponent(value) {
	return typeof value === "function" || value !== null && typeof value === "object" && "$$typeof" in value;
}
/**
* Wrap every Agent-owned keyed Chat row except the assistant renderer in
* place. Identical to the source `wrapAgentChatRows`.
*/
function wrapAgentChatRows(ctx) {
	const restores = [];
	const wrapped = /* @__PURE__ */ new WeakSet();
	const wrapAll = () => {
		for (const entry of ctx.slots.entries("conversation.chat.node")) {
			const key = entry.options.key;
			if (key === void 0 || SKIP_WRAP.has(key)) continue;
			const current = entry.component;
			if (!isWrappableComponent(current) || wrapped.has(current)) continue;
			const inner = current;
			const next = wrapFollowNodeView(inner);
			wrapped.add(next);
			entry.component = next;
			restores.push(() => {
				if (entry.component === next) entry.component = inner;
			});
		}
	};
	wrapAll();
	const off = ctx.on("slots/changed", (key) => {
		if (key === "conversation.chat.node") wrapAll();
	});
	return () => {
		off();
		for (const restore of restores) restore();
	};
}
/**
* A live settings cell shared by the renderer lifecycle and React views.
* Mirrors the source SettingsCell but reads from the host settingsScope
* rather than the plugin RPC.
*/
var SettingsCell = class {
	listeners = /* @__PURE__ */ new Set();
	card;
	value = DEFAULT_STREAM_SETTINGS;
	pending = false;
	attach(card) {
		this.card = card;
		this.refresh();
		const unsubscribe = card.subscribe(() => {
			this.refresh();
		});
		return () => {
			unsubscribe();
			if (this.card !== card) return;
			this.card = void 0;
			this.refresh();
		};
	}
	read() {
		const snapshot = this.card?.getSnapshot();
		if (snapshot === void 0 || snapshot.status !== "ready") return this.value;
		const next = this.card?.values() ?? this.value;
		publishMotionPreference(next.motionPreference);
		publishLogFade(next.logarithmicFade);
		return next;
	}
	refresh() {
		const next = this.read();
		const pending = this.card?.getSnapshot().status === "loading";
		if (pending === this.pending && next.enabled === this.value.enabled && next.thinkAutoExpand === this.value.thinkAutoExpand && next.debugEnabled === this.value.debugEnabled && next.motionPreference === this.value.motionPreference && next.logarithmicFade === this.value.logarithmicFade && next.debugTuning === this.value.debugTuning) return;
		this.pending = pending;
		this.value = next;
		for (const listener of this.listeners) listener();
	}
	takeoverEnabled() {
		return !this.pending && this.value.enabled;
	}
	getSnapshot = () => this.value;
	subscribe = (listener) => {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	};
};
/**
* Resolve configuration with validation. Falls back to defaults when
* no composed config is available (client-only composition).
*/
function resolveStreamConfig() {
	return DEFAULT_STREAM_CONFIG;
}
/**
* Register the smooth feature with the dsh-client-ui-custom host.
*
* Adapts the source `apply()` to the host's `registerFeatures` pattern:
* - Uses `ctx.effect` instead of `ctx.inject` for lifecycle effects
* - Uses `ctx.settingsScope` instead of the plugin loopback RPC
* - Registers settings card and debug panel via `ctx.slots.inject`
* - Registers the typewriter renderer in `conversation.chat.node` slot
*
* @param ctx - Browser context carrying the shared slot registry.
* @param config - Optional profile-level plugin config (partial over the preset).
*   `takeover` (default true) controls whether smooth replaces the host's
*   `assistant-step` renderer. When `false`, smooth leaves the assistant node to
*   the host (and `zh`'s think-block DOM controller), so the think block keeps
*   its fixed-height scroll/fold owned by `zh` instead of smooth's disclosure.
*/
function apply$1(ctx, config) {
	const streamConfig = resolveStreamConfig();
	const settings = new SettingsCell();
	const takeover = config?.takeover ?? true;
	if (!STREAM_MODES.includes(streamConfig.mode) || !STREAM_PRESETS.includes(streamConfig.preset)) {}
	ctx.effect(() => {
		if (!(ctx.locale !== void 0)) return () => {};
		ctx.locale.register(NS, {
			zh: zh$1,
			en: en$1
		});
		const card = new SmoothStreamCardController(ctx);
		const detachSettings = settings.attach(card);
		const syncDebug = () => {
			const snapshot = card.getSnapshot();
			debugRuntime.syncSettings({
				available: snapshot.debugAvailable,
				enabled: snapshot.debugEnabled,
				writable: snapshot.writable && !snapshot.saving,
				dirty: snapshot.dirty,
				status: snapshot.status,
				tuning: snapshot.debugTuning
			});
		};
		const detachBinding = debugRuntime.bindSettings({
			edit: (patch) => {
				card.inject().edit(patch);
			},
			save: () => {
				card.inject().save();
			},
			discard: () => {
				card.inject().discard();
			}
		});
		const detachDebug = card.subscribe(syncDebug);
		syncDebug();
		card.start();
		ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
			name: "settings.plugin.item",
			id: "smooth-stream",
			key: NS,
			order: 30,
			locale: NS,
			inject: () => card.inject()
		}, SmoothStreamCard));
		ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
			name: "conversation.session.header.utilities",
			id: "smooth-stream-debug",
			order: 40,
			locale: NS,
			inject: () => debugRuntime.panelFace()
		}, DebugPanel));
		return () => {
			card.stop();
			detachDebug();
			detachSettings();
			detachBinding();
		};
	}, "smooth: settings card + debug panel registration");
	const configured = function StreamConfiguredView(props) {
		const preferences = (0, react.useSyncExternalStore)(settings.subscribe, settings.getSnapshot, settings.getSnapshot);
		return (0, react.createElement)(TakeoverErrorBoundary, null, (0, react.createElement)(TypewriterAssistantNodeView, {
			...props,
			mode: streamConfig.mode,
			preset: streamConfig.preset,
			revealCharsPerSec: streamConfig.revealCharsPerSec,
			scrollSpeedPxPerSec: streamConfig.scrollSpeedPxPerSec,
			maxScrollSpeedPxPerSec: streamConfig.maxScrollSpeedPxPerSec,
			thinkAutoExpand: preferences.thinkAutoExpand,
			settingsScope: ctx.settingsScope.bind({ namespace: UI_CUSTOM_SETTINGS_NS })
		}));
	};
	ctx.effect(() => {
		let releaseTakeover;
		const syncTakeover = () => {
			if (!takeover) {
				releaseTakeover?.();
				releaseTakeover = void 0;
				return;
			}
			if (!settings.takeoverEnabled()) {
				releaseTakeover?.();
				releaseTakeover = void 0;
				return;
			}
			if (releaseTakeover !== void 0) return;
			const unwrap = wrapAgentChatRows(ctx);
			const unshadow = ctx.slots.register({
				name: "conversation.chat.node",
				key: "assistant-step",
				priority: -100,
				locale: "conversation",
				registrant: "smooth"
			}, configured);
			releaseTakeover = () => {
				unwrap();
				unshadow();
			};
		};
		const unsubscribe = settings.subscribe(syncTakeover);
		syncTakeover();
		return () => {
			unsubscribe();
			releaseTakeover?.();
		};
	}, "smooth: typewriter renderer takeover");
	ctx.get("connection");
}
//#endregion
//#region src/client/appearance/AppearancePreview.module.css
var AppearancePreview_module_default = {
	"badge": "_12yzIa_badge",
	"bubbleLeft": "_12yzIa_bubbleLeft",
	"bubbleRight": "_12yzIa_bubbleRight",
	"chat": "_12yzIa_chat",
	"inputField": "_12yzIa_inputField",
	"inputRow": "_12yzIa_inputRow",
	"line": "_12yzIa_line",
	"main": "_12yzIa_main",
	"mock": "_12yzIa_mock",
	"navActive": "_12yzIa_navActive",
	"navDot": "_12yzIa_navDot",
	"scrim": "_12yzIa_scrim",
	"send": "_12yzIa_send",
	"sidebar": "_12yzIa_sidebar",
	"title": "_12yzIa_title",
	"topbar": "_12yzIa_topbar",
	"window": "_12yzIa_window"
};
//#endregion
//#region src/client/appearance/AppearancePreview.tsx
const cleanString$1 = (value, fallback) => typeof value === "string" && value !== "" ? value : fallback;
const toNumber = (value, fallback) => typeof value === "number" ? value : fallback;
/** Mini interface mock reflecting the staged draft. */
function AppearancePreview({ draft }) {
	const accent = cleanString$1(draft.accent, "#4176e6");
	const fontFamily = cleanString$1(draft.fontFamily, "");
	const codeFont = cleanString$1(draft.codeFontFamily, "");
	const scale = toNumber(draft.fontScale, 1);
	const px = (n) => `${Math.round(n * scale)}px`;
	const alpha = (value, fallback) => {
		const n = toNumber(value, fallback);
		return `color-mix(in srgb, var(--pv-base) ${Math.max(4, Math.min(100, n))}%, transparent)`;
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: AppearancePreview_module_default.mock,
		style: {
			["--pv-accent"]: accent,
			["--pv-surface"]: alpha(draft.surfaceOpacity, 100),
			["--pv-chat"]: alpha(draft.chatSurfaceOpacity, 100),
			["--pv-input"]: alpha(draft.inputOpacity, 100),
			["--pv-sidebar"]: alpha(draft.sidebarOpacity, 100),
			fontFamily: fontFamily !== "" ? fontFamily : void 0
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: AppearancePreview_module_default.window,
			style: { fontSize: px(10) },
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: AppearancePreview_module_default.sidebar,
				style: { background: "var(--pv-sidebar)" },
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearancePreview_module_default.navDot,
						style: { background: accent }
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: AppearancePreview_module_default.line }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearancePreview_module_default.line,
						style: { width: "70%" }
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearancePreview_module_default.navActive,
						style: { background: accent }
					})
				]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: AppearancePreview_module_default.main,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearancePreview_module_default.topbar,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AppearancePreview_module_default.title,
							style: { fontFamily: codeFont !== "" ? codeFont : void 0 },
							children: "ui-custom"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AppearancePreview_module_default.badge,
							style: {
								background: accent,
								color: "#fff"
							},
							children: "预览"
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearancePreview_module_default.chat,
						style: { background: "var(--pv-chat)" },
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: AppearancePreview_module_default.bubbleLeft }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: AppearancePreview_module_default.bubbleRight,
								style: { borderColor: accent }
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: AppearancePreview_module_default.bubbleLeft,
								style: { width: "62%" }
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearancePreview_module_default.inputRow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AppearancePreview_module_default.inputField,
							style: { background: "var(--pv-input)" }
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AppearancePreview_module_default.send,
							style: { background: accent }
						})]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/client/appearance/AppearanceSection.module.css
var AppearanceSection_module_default = {
	"cancel": "C2tyhq_cancel",
	"card": "C2tyhq_card",
	"cardTitle": "C2tyhq_cardTitle",
	"check": "C2tyhq_check",
	"checkbox": "C2tyhq_checkbox",
	"color": "C2tyhq_color",
	"dirty": "C2tyhq_dirty",
	"footer": "C2tyhq_footer",
	"groupHeader": "C2tyhq_groupHeader",
	"groupReset": "C2tyhq_groupReset",
	"heading": "C2tyhq_heading",
	"hint": "C2tyhq_hint",
	"inspire": "C2tyhq_inspire",
	"intro": "C2tyhq_intro",
	"label": "C2tyhq_label",
	"presetBadge": "C2tyhq_presetBadge",
	"presetCard": "C2tyhq_presetCard",
	"presetCardActive": "C2tyhq_presetCardActive",
	"presetDesc": "C2tyhq_presetDesc",
	"presetGrid": "C2tyhq_presetGrid",
	"presetName": "C2tyhq_presetName",
	"presetNameInput": "C2tyhq_presetNameInput",
	"presetPreview": "C2tyhq_presetPreview",
	"presetRemove": "C2tyhq_presetRemove",
	"presetSave": "C2tyhq_presetSave",
	"presetSaveRow": "C2tyhq_presetSaveRow",
	"preview": "C2tyhq_preview",
	"previewing": "C2tyhq_previewing",
	"range": "C2tyhq_range",
	"rangeValue": "C2tyhq_rangeValue",
	"reset": "C2tyhq_reset",
	"row": "C2tyhq_row",
	"save": "C2tyhq_save",
	"section": "C2tyhq_section",
	"select": "C2tyhq_select",
	"slider": "C2tyhq_slider",
	"swatch": "C2tyhq_swatch",
	"swatches": "C2tyhq_swatches",
	"text": "C2tyhq_text"
};
//#endregion
//#region src/client/appearance/AppearanceSection.tsx
/** The 外观 settings section: theme preference (merged) + art customization form. */
const SLIDERS = [
	{
		field: "surfaceOpacity",
		label: "surfaceOpacity"
	},
	{
		field: "sidebarOpacity",
		label: "sidebarOpacity"
	},
	{
		field: "chatSurfaceOpacity",
		label: "chatSurfaceOpacity"
	},
	{
		field: "inputOpacity",
		label: "inputOpacity"
	},
	{
		field: "codeBlockOpacity",
		label: "codeBlockOpacity"
	},
	{
		field: "darkSurfaceOpacity",
		label: "darkSurfaceOpacity"
	}
];
const CORNER_RADIUS_OPTIONS = [
	{
		id: "inherit",
		label: "radius.inherit"
	},
	{
		id: "sm",
		label: "radius.sm"
	},
	{
		id: "md",
		label: "radius.md"
	},
	{
		id: "lg",
		label: "radius.lg"
	},
	{
		id: "xl",
		label: "radius.xl"
	}
];
const SHADOW_OPTIONS = [
	{
		id: "inherit",
		label: "shadow.inherit"
	},
	{
		id: "none",
		label: "shadow.none"
	},
	{
		id: "soft",
		label: "shadow.soft"
	},
	{
		id: "medium",
		label: "shadow.medium"
	},
	{
		id: "strong",
		label: "shadow.strong"
	}
];
/** Mini color preview for a preset (accent-graded wash). */
const presetPreviewBackground = (config) => {
	const accent = typeof config.accent === "string" && config.accent !== "" ? config.accent : "#4176e6";
	return `linear-gradient(135deg, ${accent}, ${accent}55)`;
};
/** One parameter-group card with a "恢复本组默认" action. */
function GroupCard({ title, resetLabel, group, writable, onReset, children }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: AppearanceSection_module_default.card,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: AppearanceSection_module_default.groupHeader,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
				className: AppearanceSection_module_default.cardTitle,
				children: title
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: AppearanceSection_module_default.groupReset,
				disabled: !writable,
				onClick: () => onReset(group),
				children: resetLabel
			})]
		}), children]
	});
}
/**
* Render the appearance section content.
* @param props - composed slot props + injected controller face.
* @returns the section element tree.
*/
function AppearanceSection({ t, useAppearance, setField, applyFontPreset, randomInspiration, resetGroup, preview, applyPreset, saveMyPreset, removeMyPreset, applyMyPreset, cancelPreview, save, resetAll, close }) {
	const state = useAppearance((value) => value);
	const translator = t;
	const draft = state.draft;
	const [presetName, setPresetName] = (0, react.useState)("");
	const num = (field, fallback) => typeof draft[field] === "number" ? draft[field] : fallback;
	const str = (field, fallback) => typeof draft[field] === "string" ? draft[field] : fallback;
	const bool = (field, fallback) => typeof draft[field] === "boolean" ? draft[field] : fallback;
	const accent = str("accent", "#4176e6");
	const swatches = (0, react.useMemo)(() => harmonySwatches(accent), [accent]);
	const handlePreset = (id) => {
		applyPreset(id);
	};
	const handleMyPreset = (id) => {
		applyMyPreset(id);
	};
	const handleSaveMyPreset = () => {
		saveMyPreset(presetName);
		setPresetName("");
	};
	const handlePreview = () => {
		preview();
		close();
	};
	const fontPresetId = FONT_PRESETS.find((preset) => preset.uiFont === str("fontFamily", "") && preset.codeFont === str("codeFontFamily", ""))?.id ?? "__custom__";
	if (state.status === "unavailable") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: AppearanceSection_module_default.section,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
			className: AppearanceSection_module_default.intro,
			children: translator("unavailable")
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
			className: AppearanceSection_module_default.hint,
			children: translator("unavailableHint")
		})]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: AppearanceSection_module_default.section,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: AppearanceSection_module_default.intro,
				children: translator("intro")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: AppearanceSection_module_default.card,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.groupHeader,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							className: AppearanceSection_module_default.cardTitle,
							children: translator("previewTitle")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: AppearanceSection_module_default.inspire,
							disabled: !state.writable,
							onClick: randomInspiration,
							children: translator("randomInspiration")
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AppearancePreview, { draft }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: AppearanceSection_module_default.hint,
						children: translator("previewHint")
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: AppearanceSection_module_default.card,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
						className: AppearanceSection_module_default.cardTitle,
						children: translator("presetTitle")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: AppearanceSection_module_default.hint,
						children: translator("presetHint")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: AppearanceSection_module_default.presetGrid,
						children: PRESETS.map((preset) => {
							const active = state.activePreset?.kind === "shipped" && state.activePreset.id === preset.id;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `${AppearanceSection_module_default.presetCard}${active ? ` ${AppearanceSection_module_default.presetCardActive}` : ""}`,
								disabled: !state.writable,
								onClick: () => handlePreset(preset.id),
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: AppearanceSection_module_default.presetPreview,
										style: { background: presetPreviewBackground(preset.config) }
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: AppearanceSection_module_default.presetName,
										children: preset.name
									}),
									active ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: AppearanceSection_module_default.presetBadge,
										children: translator("activePreset")
									}) : null,
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: AppearanceSection_module_default.presetDesc,
										children: preset.description
									})
								]
							}, preset.id);
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.presetSaveRow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							className: AppearanceSection_module_default.presetNameInput,
							type: "text",
							value: presetName,
							placeholder: translator("myPresetName"),
							disabled: !state.writable,
							onChange: (event) => setPresetName(event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Enter") handleSaveMyPreset();
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: AppearanceSection_module_default.presetSave,
							disabled: !state.writable || presetName.trim() === "",
							onClick: handleSaveMyPreset,
							children: translator("saveMyPreset")
						})]
					}),
					state.myPresets.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: AppearanceSection_module_default.presetGrid,
						children: state.myPresets.map((preset) => {
							const active = state.activePreset?.kind === "my" && state.activePreset.id === preset.id;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: `${AppearanceSection_module_default.presetCard}${active ? ` ${AppearanceSection_module_default.presetCardActive}` : ""}`,
								role: "button",
								tabIndex: 0,
								onClick: () => handleMyPreset(preset.id),
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: AppearanceSection_module_default.presetPreview,
										style: { background: presetPreviewBackground(preset.config) }
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: AppearanceSection_module_default.presetName,
										children: preset.name
									}),
									active ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: AppearanceSection_module_default.presetBadge,
										children: translator("activePreset")
									}) : null,
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: AppearanceSection_module_default.presetRemove,
										"aria-label": translator("removeMyPreset"),
										onClick: (event) => {
											event.stopPropagation();
											removeMyPreset(preset.id);
										},
										children: "✕"
									})
								]
							}, preset.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(GroupCard, {
				title: translator("groupColor"),
				resetLabel: translator("groupReset"),
				group: "color",
				writable: state.writable,
				onReset: resetGroup,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: AppearanceSection_module_default.label,
							htmlFor: "appearance-accent",
							children: translator("accent")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: AppearanceSection_module_default.slider,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								id: "appearance-accent",
								className: AppearanceSection_module_default.color,
								type: "color",
								value: accent,
								disabled: !state.writable,
								onChange: (event) => setField("accent", event.target.value)
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: AppearanceSection_module_default.text,
								type: "text",
								value: accent,
								disabled: !state.writable,
								onChange: (event) => setField("accent", event.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
								className: AppearanceSection_module_default.label,
								children: translator("accentPalette")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: AppearanceSection_module_default.swatches,
								children: swatches.map((color) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: AppearanceSection_module_default.swatch,
									style: { background: color },
									title: color,
									"aria-label": color,
									disabled: !state.writable,
									onClick: () => setField("accent", color)
								}, color))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: AppearanceSection_module_default.hint,
								children: translator("accentPaletteHint")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: AppearanceSection_module_default.label,
							htmlFor: "appearance-autoAccent",
							children: translator("autoAccent")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AppearanceSection_module_default.check,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								id: "appearance-autoAccent",
								className: AppearanceSection_module_default.checkbox,
								type: "checkbox",
								checked: bool("autoAccent", false),
								disabled: !state.writable,
								onChange: (event) => setField("autoAccent", event.target.checked)
							})
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
								className: AppearanceSection_module_default.label,
								htmlFor: "appearance-darkAccent",
								children: translator("darkAccent")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: AppearanceSection_module_default.slider,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									id: "appearance-darkAccent",
									className: AppearanceSection_module_default.color,
									type: "color",
									value: str("darkAccent", "") || "#4176e6",
									disabled: !state.writable,
									onChange: (event) => setField("darkAccent", event.target.value)
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: AppearanceSection_module_default.text,
									type: "text",
									value: str("darkAccent", ""),
									placeholder: translator("darkAccentPlaceholder"),
									disabled: !state.writable,
									onChange: (event) => setField("darkAccent", event.target.value)
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: AppearanceSection_module_default.hint,
								children: translator("darkAccentHint")
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(GroupCard, {
				title: translator("groupSurface"),
				resetLabel: translator("groupReset"),
				group: "surface",
				writable: state.writable,
				onReset: resetGroup,
				children: SLIDERS.map((slider) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AppearanceSection_module_default.row,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
						className: AppearanceSection_module_default.label,
						htmlFor: `appearance-${slider.field}`,
						children: translator(slider.label)
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: AppearanceSection_module_default.slider,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							id: `appearance-${slider.field}`,
							className: AppearanceSection_module_default.range,
							type: "range",
							min: 0,
							max: 100,
							value: num(slider.field, 100),
							style: { ["--fill"]: `${num(slider.field, 100)}%` },
							disabled: !state.writable,
							onChange: (event) => setField(slider.field, Number(event.target.value))
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: AppearanceSection_module_default.rangeValue,
							children: [num(slider.field, 100), "%"]
						})]
					})]
				}, slider.field))
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(GroupCard, {
				title: translator("groupTypography"),
				resetLabel: translator("groupReset"),
				group: "typography",
				writable: state.writable,
				onReset: resetGroup,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
								className: AppearanceSection_module_default.label,
								htmlFor: "appearance-fontPreset",
								children: translator("fontPreset")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								id: "appearance-fontPreset",
								className: AppearanceSection_module_default.select,
								value: fontPresetId,
								disabled: !state.writable,
								onChange: (event) => {
									if (event.target.value !== "__custom__") applyFontPreset(event.target.value);
								},
								children: [FONT_PRESETS.map((preset) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: preset.id,
									children: preset.name
								}, preset.id)), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: "__custom__",
									children: translator("fontCustom")
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: AppearanceSection_module_default.hint,
								children: translator("fontPresetHint")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: AppearanceSection_module_default.label,
							htmlFor: "appearance-font",
							children: translator("fontFamily")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							id: "appearance-font",
							className: AppearanceSection_module_default.text,
							type: "text",
							value: str("fontFamily", ""),
							disabled: !state.writable,
							onChange: (event) => setField("fontFamily", event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: AppearanceSection_module_default.label,
							htmlFor: "appearance-codeFont",
							children: translator("codeFontFamily")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							id: "appearance-codeFont",
							className: AppearanceSection_module_default.text,
							type: "text",
							value: str("codeFontFamily", ""),
							disabled: !state.writable,
							onChange: (event) => setField("codeFontFamily", event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
								className: AppearanceSection_module_default.label,
								htmlFor: "appearance-fontScale",
								children: translator("fontScale")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: AppearanceSection_module_default.slider,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									id: "appearance-fontScale",
									className: AppearanceSection_module_default.range,
									type: "range",
									min: .9,
									max: 1.1,
									step: .05,
									value: num("fontScale", 1),
									style: { ["--fill"]: `${(num("fontScale", 1) - .9) / .2 * 100}%` },
									disabled: !state.writable,
									onChange: (event) => setField("fontScale", Number(event.target.value))
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: AppearanceSection_module_default.rangeValue,
									children: ["×", num("fontScale", 1).toFixed(2)]
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: AppearanceSection_module_default.hint,
								children: translator("fontScaleHint")
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(GroupCard, {
				title: translator("refineTitle"),
				resetLabel: translator("groupReset"),
				group: "refine",
				writable: state.writable,
				onReset: resetGroup,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: AppearanceSection_module_default.label,
							htmlFor: "appearance-cornerRadius",
							children: translator("cornerRadius")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
							id: "appearance-cornerRadius",
							className: AppearanceSection_module_default.select,
							value: str("cornerRadius", "inherit"),
							disabled: !state.writable,
							onChange: (event) => setField("cornerRadius", event.target.value),
							children: CORNER_RADIUS_OPTIONS.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: option.id,
								children: translator(option.label)
							}, option.id))
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: AppearanceSection_module_default.label,
							htmlFor: "appearance-surfaceShadow",
							children: translator("surfaceShadow")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
							id: "appearance-surfaceShadow",
							className: AppearanceSection_module_default.select,
							value: str("surfaceShadow", "inherit"),
							disabled: !state.writable,
							onChange: (event) => setField("surfaceShadow", event.target.value),
							children: SHADOW_OPTIONS.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: option.id,
								children: translator(option.label)
							}, option.id))
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceSection_module_default.row,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: AppearanceSection_module_default.label,
							htmlFor: "appearance-scrollbarAccent",
							children: translator("scrollbarAccent")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AppearanceSection_module_default.check,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								id: "appearance-scrollbarAccent",
								className: AppearanceSection_module_default.checkbox,
								type: "checkbox",
								checked: bool("scrollbarAccent", false),
								disabled: !state.writable,
								onChange: (event) => setField("scrollbarAccent", event.target.checked)
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: AppearanceSection_module_default.footer,
				children: [
					state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceSection_module_default.dirty,
						children: translator("dirty")
					}) : null,
					state.previewing ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceSection_module_default.previewing,
						children: translator("previewing")
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: AppearanceSection_module_default.reset,
						disabled: !state.writable || state.saving,
						onClick: resetAll,
						children: translator("reset")
					}),
					state.previewing ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: AppearanceSection_module_default.cancel,
						disabled: !state.writable || state.saving,
						onClick: cancelPreview,
						children: translator("cancelPreview")
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: AppearanceSection_module_default.preview,
						disabled: !state.dirty || !state.writable || state.saving,
						onClick: handlePreview,
						children: translator("preview")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: AppearanceSection_module_default.save,
						disabled: !state.dirty || !state.writable || state.saving,
						onClick: save,
						children: state.saving ? translator("saving") : translator("save")
					})
				]
			})
		]
	});
}
//#endregion
//#region src/client/usage/UsageSection.tsx
/**
* Render the usage section content.
* @param props - composed slot props + injected sessions hook.
* @returns the section element tree.
*/
function UsageSection({ t, useSessions }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UsagePanel, {
		useSessions,
		t
	});
}
//#endregion
//#region src/client/motion/MotionSection.module.css
var MotionSection_module_default = {
	"checkbox": "QenXkq_checkbox",
	"chevron": "QenXkq_chevron",
	"desc": "QenXkq_desc",
	"heading": "QenXkq_heading",
	"intro": "QenXkq_intro",
	"preset": "QenXkq_preset",
	"presetActive": "QenXkq_presetActive",
	"presets": "QenXkq_presets",
	"row": "QenXkq_row",
	"rowDisabled": "QenXkq_rowDisabled",
	"rowDivider": "QenXkq_rowDivider",
	"rowText": "QenXkq_rowText",
	"section": "QenXkq_section",
	"selector": "QenXkq_selector",
	"switch": "QenXkq_switch",
	"title": "QenXkq_title"
};
//#endregion
//#region src/client/motion/MotionSection.tsx
/**
* The "动效" settings section: the conversation entrance-motion toggle plus
* the entrance-style selector. Reads/writes the ui-custom settings scope's
* `motionEnabled` / `motionStyle`; the motion engine (motion.ts) gates on
* these.
*/
/** The selectable transcript styles, in display order (the default is the first). */
const STYLE_OPTIONS = [
	{
		id: "fade-up",
		label: "styleFadeUp"
	},
	{
		id: "fade",
		label: "styleFade"
	},
	{
		id: "rise-scale",
		label: "styleRiseScale"
	},
	{
		id: "slide-in",
		label: "styleSlideIn"
	},
	{
		id: "blur-in",
		label: "styleBlurIn"
	},
	{
		id: "scale-in",
		label: "styleScaleIn"
	}
];
/** The selectable sidebar styles, in display order (the default is the first). */
const SIDEBAR_OPTIONS = [
	{
		id: "slide-left",
		label: "styleSlideLeft"
	},
	{
		id: "fade",
		label: "styleFade"
	},
	{
		id: "expand",
		label: "styleExpand"
	},
	{
		id: "slide-down",
		label: "styleSlideDown"
	}
];
/** The selectable new-conversation styles (large-surface, gentle set). */
const NEW_CHAT_OPTIONS = [
	{
		id: "reveal",
		label: "styleReveal"
	},
	{
		id: "fade",
		label: "styleFade"
	},
	{
		id: "bloom",
		label: "styleBloom"
	},
	{
		id: "zoom",
		label: "styleZoom"
	}
];
/** Preset label + description locale keys, keyed by preset id (see MOTION_PRESETS). */
const PRESET_META = {
	fluid: {
		label: "presetFluid",
		desc: "presetFluidDesc"
	},
	elegant: {
		label: "presetElegant",
		desc: "presetElegantDesc"
	},
	minimal: {
		label: "presetMinimal",
		desc: "presetMinimalDesc"
	}
};
/** Whether a config bundle matches the section's current motion values. */
function matchesPreset(section, config) {
	return (section?.motionEnabled ?? true) === config.motionEnabled && (section?.motionStyle ?? "fade-up") === config.motionStyle && (section?.sidebarMotionEnabled ?? true) === config.sidebarMotionEnabled && (section?.sidebarMotionStyle ?? "slide-left") === config.sidebarMotionStyle && (section?.selectionMotionEnabled ?? true) === config.selectionMotionEnabled && (section?.newChatMotionEnabled ?? true) === config.newChatMotionEnabled && (section?.newChatMotionStyle ?? "reveal") === config.newChatMotionStyle && (section?.settingsMotionEnabled ?? true) === config.settingsMotionEnabled;
}
/**
* Render the motion settings section content.
* @param props - composed Settings slot props.
*/
function MotionSection({ useMotion, setMotionEnabled, setMotionStyle, setSidebarMotionEnabled, setSidebarMotionStyle, setSelectionMotionEnabled, setNewChatMotionEnabled, setNewChatMotionStyle, setSettingsMotionEnabled, applyMotionPreset, t }) {
	const scope = useMotion((value) => value);
	const enabled = scope?.value?.motionEnabled ?? true;
	const sidebarEnabled = scope?.value?.sidebarMotionEnabled ?? true;
	const selectionEnabled = scope?.value?.selectionMotionEnabled ?? true;
	const newChatEnabled = scope?.value?.newChatMotionEnabled ?? true;
	const settingsEnabled = scope?.value?.settingsMotionEnabled ?? true;
	const newChatStyle = isNewChatMotionStyle(scope?.value?.newChatMotionStyle) ? scope.value.newChatMotionStyle : DEFAULT_NEW_CHAT_MOTION_STYLE;
	const style = isMotionStyle(scope?.value?.motionStyle) ? scope.value.motionStyle : DEFAULT_MOTION_STYLE;
	const sidebarStyle = isSidebarMotionStyle(scope?.value?.sidebarMotionStyle) ? scope.value.sidebarMotionStyle : DEFAULT_SIDEBAR_MOTION_STYLE;
	const [open, setOpen] = (0, react.useState)(false);
	const [sidebarOpen, setSidebarOpen] = (0, react.useState)(false);
	const [newChatOpen, setNewChatOpen] = (0, react.useState)(false);
	const translator = t;
	const selectedLabel = (STYLE_OPTIONS.find((option) => option.id === style) ?? STYLE_OPTIONS[0]).label;
	const sidebarSelectedLabel = (SIDEBAR_OPTIONS.find((option) => option.id === sidebarStyle) ?? SIDEBAR_OPTIONS[0]).label;
	const newChatSelectedLabel = (NEW_CHAT_OPTIONS.find((option) => option.id === newChatStyle) ?? NEW_CHAT_OPTIONS[0]).label;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: MotionSection_module_default.section,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: MotionSection_module_default.intro,
				children: translator("intro")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${MotionSection_module_default.row} ${MotionSection_module_default.rowDivider}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: MotionSection_module_default.rowText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.title,
						children: translator("presetTitle")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.desc,
						children: translator("presetDesc")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: MotionSection_module_default.presets,
					role: "group",
					"aria-label": translator("presetTitle"),
					children: MOTION_PRESETS.map((preset) => {
						const meta = PRESET_META[preset.id];
						if (meta === void 0) return null;
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: `${MotionSection_module_default.preset} ${matchesPreset(scope?.value, preset.config) ? MotionSection_module_default.presetActive : ""}`,
							"aria-pressed": matchesPreset(scope?.value, preset.config),
							title: translator(meta.desc),
							onClick: () => applyMotionPreset(preset.id),
							children: translator(meta.label)
						}, preset.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${MotionSection_module_default.row} ${MotionSection_module_default.rowDivider} ${enabled ? "" : MotionSection_module_default.rowDisabled}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: MotionSection_module_default.rowText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.title,
						children: translator("toggleTitle")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.desc,
						children: translator("toggleDesc")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
					className: MotionSection_module_default.switch,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: MotionSection_module_default.checkbox,
						"aria-label": translator("toggleTitle"),
						checked: enabled,
						onChange: (event) => setMotionEnabled(event.target.checked)
					})
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${MotionSection_module_default.row} ${enabled ? "" : MotionSection_module_default.rowDisabled}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: MotionSection_module_default.rowText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.title,
						children: translator("styleTitle")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.desc,
						children: translator("styleDesc")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
					open,
					onClose: () => {
						setOpen(false);
					},
					items: STYLE_OPTIONS.map((option) => ({
						id: option.id,
						label: translator(option.label)
					})),
					selectedId: style,
					onSelect: (id) => {
						setOpen(false);
						if (isMotionStyle(id)) setMotionStyle(id);
					},
					align: "end",
					portal: true,
					anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: MotionSection_module_default.selector,
						disabled: !enabled,
						"aria-haspopup": "menu",
						"aria-expanded": open,
						onClick: () => {
							setOpen((value) => !value);
						},
						children: [translator(selectedLabel), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: MotionSection_module_default.chevron })]
					})
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${MotionSection_module_default.row} ${MotionSection_module_default.rowDivider}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: MotionSection_module_default.rowText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.title,
						children: translator("sidebarToggleTitle")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.desc,
						children: translator("sidebarToggleDesc")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
					className: MotionSection_module_default.switch,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: MotionSection_module_default.checkbox,
						"aria-label": translator("sidebarToggleTitle"),
						checked: sidebarEnabled,
						onChange: (event) => setSidebarMotionEnabled(event.target.checked)
					})
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${MotionSection_module_default.row} ${sidebarEnabled ? "" : MotionSection_module_default.rowDisabled}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: MotionSection_module_default.rowText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.title,
						children: translator("sidebarStyleTitle")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.desc,
						children: translator("sidebarStyleDesc")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
					open: sidebarOpen,
					onClose: () => {
						setSidebarOpen(false);
					},
					items: SIDEBAR_OPTIONS.map((option) => ({
						id: option.id,
						label: translator(option.label)
					})),
					selectedId: sidebarStyle,
					onSelect: (id) => {
						setSidebarOpen(false);
						if (isSidebarMotionStyle(id)) setSidebarMotionStyle(id);
					},
					align: "end",
					portal: true,
					anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: MotionSection_module_default.selector,
						disabled: !sidebarEnabled,
						"aria-haspopup": "menu",
						"aria-expanded": sidebarOpen,
						onClick: () => {
							setSidebarOpen((value) => !value);
						},
						children: [translator(sidebarSelectedLabel), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: MotionSection_module_default.chevron })]
					})
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${MotionSection_module_default.row} ${MotionSection_module_default.rowDivider}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: MotionSection_module_default.rowText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.title,
						children: translator("selectionToggleTitle")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.desc,
						children: translator("selectionToggleDesc")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
					className: MotionSection_module_default.switch,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: MotionSection_module_default.checkbox,
						"aria-label": translator("selectionToggleTitle"),
						checked: selectionEnabled,
						onChange: (event) => setSelectionMotionEnabled(event.target.checked)
					})
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${MotionSection_module_default.row} ${MotionSection_module_default.rowDivider}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: MotionSection_module_default.rowText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.title,
						children: translator("newChatToggleTitle")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.desc,
						children: translator("newChatToggleDesc")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
					className: MotionSection_module_default.switch,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: MotionSection_module_default.checkbox,
						"aria-label": translator("newChatToggleTitle"),
						checked: newChatEnabled,
						onChange: (event) => setNewChatMotionEnabled(event.target.checked)
					})
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${MotionSection_module_default.row} ${newChatEnabled ? "" : MotionSection_module_default.rowDisabled}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: MotionSection_module_default.rowText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.title,
						children: translator("newChatStyleTitle")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.desc,
						children: translator("newChatStyleDesc")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
					open: newChatOpen,
					onClose: () => {
						setNewChatOpen(false);
					},
					items: NEW_CHAT_OPTIONS.map((option) => ({
						id: option.id,
						label: translator(option.label)
					})),
					selectedId: newChatStyle,
					onSelect: (id) => {
						setNewChatOpen(false);
						if (isNewChatMotionStyle(id)) setNewChatMotionStyle(id);
					},
					align: "end",
					portal: true,
					anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: MotionSection_module_default.selector,
						disabled: !newChatEnabled,
						"aria-haspopup": "menu",
						"aria-expanded": newChatOpen,
						onClick: () => {
							setNewChatOpen((value) => !value);
						},
						children: [translator(newChatSelectedLabel), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: MotionSection_module_default.chevron })]
					})
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${MotionSection_module_default.row} ${MotionSection_module_default.rowDivider}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: MotionSection_module_default.rowText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.title,
						children: translator("settingsToggleTitle")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: MotionSection_module_default.desc,
						children: translator("settingsToggleDesc")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
					className: MotionSection_module_default.switch,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: MotionSection_module_default.checkbox,
						"aria-label": translator("settingsToggleTitle"),
						checked: settingsEnabled,
						onChange: (event) => setSettingsMotionEnabled(event.target.checked)
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/client/ui-enhance/UiEnhanceSection.module.css
var UiEnhanceSection_module_default = {
	"panelHidden": "pWneeq_panelHidden",
	"panels": "pWneeq_panels",
	"section": "pWneeq_section",
	"tab": "pWneeq_tab",
	"tabBar": "pWneeq_tabBar"
};
//#endregion
//#region src/client/ui-enhance/UiEnhanceSection.tsx
/**
* Unified "UI增强" settings section: tabbed container that embeds the four
* sub-sections (appearance / usage / motion / zh) under a single left-nav entry.
*
* Tab order: 外观 → 用量 → 动效 → 增强
* Default tab: 外观 (appearance)
*
* IMPORTANT (DSH host contract for `settings.section`):
*   The inject may carry a `hooks` map. The host wraps every value under
*   `hooks` and delivers it to the component as a TOP-LEVEL prop named
*   `use<Key>` for hook/snapshot sources (e.g. `hooks.appearance` → prop
*   `useAppearance`, `hooks.sessions` → `useSessions`, `hooks.motion` →
*   `useMotion`), and passes ScopeFace values (`settings` / `promptSettings`)
*   through as top-level props of the same name. The host does NOT forward a
*   `hooks` object itself — so this component must read `useAppearance` /
*   `useSessions` / `useMotion` / `settings` / `promptSettings` as top-level
*   props, exactly like each sub-section expects them.
*/
/**
* Unified UI增强 settings section.
* Renders a tab bar and delegates to the original section components.
*/
function UiEnhanceSection(props) {
	const { t: uiEnhanceT, enabledTabs, useAppearance, useSessions, useMotion, settings, promptSettings, setField, applyFontPreset, randomInspiration, resetGroup, preview, applyPreset, saveMyPreset, removeMyPreset, applyMyPreset, cancelPreview, save, resetAll, setMotionEnabled, setMotionStyle, setSidebarMotionEnabled, setSidebarMotionStyle, setSelectionMotionEnabled, setNewChatMotionEnabled, setNewChatMotionStyle, setSettingsMotionEnabled, applyMotionPreset, zhT, appearanceT, usageT, motionT, close } = props;
	const tabs = enabledTabs.length > 0 ? enabledTabs : ["appearance"];
	const [activeTab, setActiveTab] = (0, react.useState)(() => tabs.includes("appearance") ? "appearance" : tabs[0]);
	const tabLabels = (0, react.useMemo)(() => ({
		appearance: uiEnhanceT("tabAppearance") || "外观",
		usage: uiEnhanceT("tabUsage") || "用量",
		motion: uiEnhanceT("tabMotion") || "动效",
		zh: uiEnhanceT("tabZh") || "增强"
	}), [uiEnhanceT]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: UiEnhanceSection_module_default.section,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: UiEnhanceSection_module_default.tabBar,
			role: "tablist",
			"aria-label": "UI增强",
			children: tabs.map((tab) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": activeTab === tab,
				"aria-controls": `ui-enhance-tab-${tab}`,
				"data-active": activeTab === tab,
				className: UiEnhanceSection_module_default.tab,
				onClick: () => setActiveTab(tab),
				children: tabLabels[tab]
			}, tab))
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: UiEnhanceSection_module_default.panels,
			children: [
				tabs.includes("appearance") && useAppearance != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					id: `ui-enhance-tab-appearance`,
					role: "tabpanel",
					"aria-labelledby": `ui-enhance-tab-btn-appearance`,
					className: `${UiEnhanceSection_module_default.panel} ${activeTab !== "appearance" ? UiEnhanceSection_module_default.panelHidden : ""}`,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AppearanceSection, {
						t: appearanceT,
						useAppearance,
						setField,
						applyFontPreset,
						randomInspiration,
						resetGroup,
						preview,
						applyPreset,
						saveMyPreset,
						removeMyPreset,
						applyMyPreset,
						cancelPreview,
						save,
						resetAll,
						close
					})
				}),
				tabs.includes("usage") && useSessions != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					id: `ui-enhance-tab-usage`,
					role: "tabpanel",
					"aria-labelledby": `ui-enhance-tab-btn-usage`,
					className: `${UiEnhanceSection_module_default.panel} ${activeTab !== "usage" ? UiEnhanceSection_module_default.panelHidden : ""}`,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UsageSection, {
						t: usageT,
						useSessions
					})
				}),
				tabs.includes("motion") && useMotion != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					id: `ui-enhance-tab-motion`,
					role: "tabpanel",
					"aria-labelledby": `ui-enhance-tab-btn-motion`,
					className: `${UiEnhanceSection_module_default.panel} ${activeTab !== "motion" ? UiEnhanceSection_module_default.panelHidden : ""}`,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MotionSection, {
						t: motionT,
						useMotion,
						setMotionEnabled,
						setMotionStyle,
						setSidebarMotionEnabled,
						setSidebarMotionStyle,
						setSelectionMotionEnabled,
						setNewChatMotionEnabled,
						setNewChatMotionStyle,
						setSettingsMotionEnabled,
						applyMotionPreset
					})
				}),
				tabs.includes("zh") && settings != null && promptSettings != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					id: `ui-enhance-tab-zh`,
					role: "tabpanel",
					"aria-labelledby": `ui-enhance-tab-btn-zh`,
					className: `${UiEnhanceSection_module_default.panel} ${activeTab !== "zh" ? UiEnhanceSection_module_default.panelHidden : ""}`,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ZhSettingsSectionComponent, {
						t: zhT,
						settings,
						promptSettings
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/client/ui-enhance/ui-enhance-locales.ts
/** Locale dictionaries for the unified UI增强 settings section (tab bar + nav label). */
/** Dictionary namespace owned by the unified section. */
const UI_ENHANCE_NS = "ui-enhance";
/** Simplified Chinese copy. */
const zh = {
	nav: "UI增强",
	tabAppearance: "外观",
	tabUsage: "用量",
	tabMotion: "动效",
	tabZh: "增强"
};
/** English copy. */
const en = {
	nav: "UI Enhancements",
	tabAppearance: "Appearance",
	tabUsage: "Usage",
	tabMotion: "Motion",
	tabZh: "Enhancements"
};
//#endregion
//#region src/client/index.ts
/** Required services: theme (none extra), settings UI (slots/locale/settingsScope/sessions). */
const inject = [
	"slots",
	"locale",
	"connection",
	"sessions",
	"workspaces",
	"settingsScope",
	"remote",
	"remote.pluginInventory"
];
/**
* Client plugin body: mount each enabled feature (appearance /
* usage / markdown). The loader config's `features` whitelist
* decides which features register; absent = everything.
* @param ctx - client root context.
* @param config - profile-level plugin config (partial over the preset).
*/
function apply(ctx, config) {
	const scope = ctx.settingsScope.bind({ namespace: UI_CUSTOM_SETTINGS_NS });
	const normalized = normalizeConfig(config, resolvePreset(typeof config?.preset === "string" ? config.preset : ""));
	let appearanceCtrl;
	let appearanceActionsRef;
	let zhSettingsScope;
	let zhPromptScope;
	ctx.effect(() => {
		const syncColorScheme = () => {
			const dark = document.body.hasAttribute("data-ds-dark-theme");
			document.documentElement.style.colorScheme = dark ? "dark" : "light";
		};
		syncColorScheme();
		const observer = new MutationObserver(syncColorScheme);
		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["data-ds-dark-theme"]
		});
		return () => {
			observer.disconnect();
		};
	}, "ui-custom: color-scheme follows the active theme");
	const sharedMotionSource = {
		getState: () => {
			const snapshot = scope.getSnapshot();
			const sessionList = ctx.sessions.list.getSnapshot();
			const blank = sessionList.current !== void 0 && sessionList.byId[sessionList.current]?.blank === true;
			const motionOn = resolveFeatures(snapshot.value ?? {}).has("motion");
			if (snapshot.status === "ready" && snapshot.value !== void 0) {
				const value = snapshot.value;
				return {
					transcript: motionOn && (value.motionEnabled ?? true),
					sidebar: motionOn && (value.sidebarMotionEnabled ?? true),
					selection: motionOn && (value.selectionMotionEnabled ?? true),
					newChat: motionOn && (value.newChatMotionEnabled ?? true),
					style: isMotionStyle(value.motionStyle) ? value.motionStyle : DEFAULT_MOTION_STYLE,
					sidebarStyle: isSidebarMotionStyle(value.sidebarMotionStyle) ? value.sidebarMotionStyle : DEFAULT_SIDEBAR_MOTION_STYLE,
					newChatStyle: isNewChatMotionStyle(value.newChatMotionStyle) ? value.newChatMotionStyle : DEFAULT_NEW_CHAT_MOTION_STYLE,
					blank
				};
			}
			const fallback = snapshot.status === "unavailable";
			return {
				transcript: fallback,
				sidebar: fallback,
				selection: fallback,
				newChat: fallback,
				style: DEFAULT_MOTION_STYLE,
				sidebarStyle: DEFAULT_SIDEBAR_MOTION_STYLE,
				newChatStyle: DEFAULT_NEW_CHAT_MOTION_STYLE,
				blank
			};
		},
		subscribe: (listener) => {
			const unsubscribeScope = scope.subscribe(listener);
			const unsubscribeSessions = ctx.sessions.list.subscribe(listener);
			return () => {
				unsubscribeScope();
				unsubscribeSessions();
			};
		}
	};
	const motionEngine = installConversationEntrance(sharedMotionSource);
	ctx.effect(() => motionEngine.dispose, "ui-custom: motion engine teardown");
	const settingsMotion = installSettingsMotion(sharedMotionSource);
	ctx.effect(() => settingsMotion, "ui-custom: settings-motion engine teardown");
	const syncSettingsMotion = () => {
		const snapshot = scope.getSnapshot();
		const on = snapshot.status === "ready" && snapshot.value !== void 0 ? resolveFeatures(snapshot.value).has("motion") && (snapshot.value.settingsMotionEnabled ?? true) : true;
		const root = document.documentElement;
		if (on) {
			root.setAttribute("data-dsu-anim", "");
			root.style.setProperty("--dsu-anim-duration", "200ms");
			root.style.setProperty("--dsu-anim-ease", "cubic-bezier(0.2, 0, 0, 1)");
			root.style.setProperty("--dsu-anim-rise", "6px");
		} else {
			root.removeAttribute("data-dsu-anim");
			root.style.removeProperty("--dsu-anim-duration");
			root.style.removeProperty("--dsu-anim-ease");
			root.style.removeProperty("--dsu-anim-rise");
		}
	};
	syncSettingsMotion();
	ctx.effect(() => scope.subscribe(syncSettingsMotion), "ui-custom: settings-motion gate sync");
	let lastSessionId;
	const syncSession = () => {
		const current = ctx.sessions.list.getSnapshot().current;
		if (current === lastSessionId) return;
		lastSessionId = current;
		if (current !== void 0) motionEngine.notifySessionSwitch();
	};
	syncSession();
	const unsubscribeSessions = ctx.sessions.list.subscribe(syncSession);
	ctx.effect(() => unsubscribeSessions, "ui-custom: session switch signal");
	ctx.effect(() => ctx.locale.register(UI_ENHANCE_NS, {
		zh,
		en
	}), "ui-custom: ui-enhance dictionaries");
	let featuresRegistered = false;
	const registerFeatures = () => {
		if (featuresRegistered) return;
		const snapshot = scope.getSnapshot();
		if (snapshot.status !== "ready" || snapshot.value === void 0) return;
		featuresRegistered = true;
		const features = resolveFeatures(snapshot.value);
		const enabled = (feature) => features.has(feature);
		const uiEnhanceT = ctx.locale.bind(UI_ENHANCE_NS);
		if (enabled("usage")) ctx.effect(() => ctx.locale.register(USAGE_NS, {
			zh: zh$5,
			en: en$5
		}), "ui-custom: usage dictionaries");
		if (enabled("appearance")) ctx.effect(() => ctx.locale.register(APPEARANCE_NS, {
			zh: zh$4,
			en: en$4
		}), "ui-custom: appearance dictionaries");
		if (enabled("markdown")) ctx.effect(() => ctx.locale.register(MARKDOWN_NS, {
			zh: zh$3,
			en: en$3
		}), "ui-custom: markdown dictionaries");
		if (enabled("motion")) ctx.effect(() => ctx.locale.register(MOTION_NS, {
			zh: zh$2,
			en: en$2
		}), "ui-custom: motion dictionaries");
		if (enabled("appearance")) {
			applyConfig(normalized);
			const applyTheme = () => {
				const snap = scope.getSnapshot();
				const user = snap.user;
				const explicitDark = typeof user === "object" && user !== null && "darkSurfaceOpacity" in user;
				let effective;
				if (snap.value === void 0) effective = void 0;
				else if (explicitDark) effective = snap.value;
				else {
					const { darkSurfaceOpacity: _inherited, ...rest } = snap.value;
					effective = {
						...rest,
						darkSurfaceOpacity: void 0
					};
				}
				applyConfig(configFromThemeSection(normalized, effective));
			};
			applyTheme();
			ctx.effect(() => scope.subscribe(applyTheme), "ui-custom: theme settings sync");
			appearanceCtrl = new AppearanceSettingsController(scope, normalized, (config) => applyConfig(config));
			const { dispose: disposeAppearance, actions: appearanceActions } = appearanceCtrl.mount();
			appearanceActionsRef = appearanceActions;
			ctx.effect(() => () => disposeAppearance(), "ui-custom: appearance settings scope");
			const reopenSettings = () => {
				const triggers = document.querySelectorAll("[aria-haspopup=\"dialog\"]");
				for (const trigger of triggers) {
					const label = trigger.textContent ?? "";
					if (label.includes("设置") || label.includes("Settings") || label.includes("設定")) {
						trigger.click();
						break;
					}
				}
				window.setTimeout(() => {
					const rows = document.querySelectorAll("button");
					for (const row of rows) {
						const text = (row.textContent ?? "").trim();
						if (text === "外观" || text === "Appearance" || text === "外觀") {
							row.click();
							return;
						}
					}
				}, 60);
			};
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "ui-custom-preview",
				order: 90,
				locale: APPEARANCE_NS,
				inject: () => ({
					hooks: { previewVisible: previewBar },
					onExit: () => {
						previewBar.hide();
						reopenSettings();
					}
				})
			}, PreviewBar));
		}
		if (enabled("usage")) ctx.slots.inject("shell.overlay", () => ctx.slots.register({
			name: "shell.overlay",
			id: "ui-custom-usage",
			order: 100,
			locale: USAGE_NS,
			inject: () => ({ hooks: {
				sessions: ctx.sessions.list,
				usageVisible: usageOverlay
			} })
		}, UsageOverlay));
		if (enabled("markdown")) {
			ctx.slots.inject("conversation.chat.node", () => ctx.slots.register({
				name: "conversation.chat.node",
				key: "user",
				priority: -2,
				locale: "conversation",
				inject: () => ({ hooks: { mdRender: scope } })
			}, UserMarkdownNodeView));
			ctx.slots.inject("conversation.chat.node", () => ctx.slots.register({
				name: "conversation.chat.node",
				key: "steering",
				priority: -2,
				locale: "conversation",
				inject: () => ({ hooks: { mdRender: scope } })
			}, UserMarkdownNodeView));
		}
		if (enabled("zh")) {
			zhSettingsScope = ctx.settingsScope.bind({ namespace: UI_CUSTOM_SETTINGS_NS });
			zhPromptScope = ctx.settingsScope.bind({ namespace: UI_CUSTOM_SETTINGS_NS });
		}
		const zhT = enabled("zh") ? ctx.locale.bind(ZH_SETTINGS_NS) : (_k) => "";
		const appearanceT = ctx.locale.bind(APPEARANCE_NS);
		const usageT = ctx.locale.bind(USAGE_NS);
		const motionT = ctx.locale.bind(MOTION_NS);
		const enabledTabs = (() => {
			const tabs = [];
			if (enabled("appearance")) tabs.push("appearance");
			if (enabled("motion")) tabs.push("motion");
			if (enabled("zh")) tabs.push("zh");
			if (enabled("usage")) tabs.push("usage");
			return tabs.length > 0 ? tabs : ["appearance"];
		})();
		ctx.slots.inject("settings.section", () => ctx.slots.register({
			name: "settings.section",
			id: "ui-enhance",
			order: 10,
			label: () => uiEnhanceT("nav"),
			locale: UI_ENHANCE_NS,
			active: enabledTabs.length >= 0,
			inject: () => ({
				enabledTabs,
				hooks: {
					appearance: appearanceCtrl?.store ?? null,
					sessions: ctx.sessions.list,
					motion: scope
				},
				settings: zhSettingsScope ?? null,
				promptSettings: zhPromptScope ?? null,
				setField: appearanceActionsRef?.setField ?? (() => {}),
				applyFontPreset: appearanceActionsRef?.applyFontPreset ?? (() => {}),
				randomInspiration: appearanceActionsRef?.randomInspiration ?? (() => {}),
				resetGroup: appearanceActionsRef?.resetGroup ?? (() => {}),
				preview: appearanceActionsRef?.preview ?? (() => {}),
				applyPreset: appearanceActionsRef?.applyPreset ?? (() => {}),
				saveMyPreset: appearanceActionsRef?.saveMyPreset ?? (() => {}),
				removeMyPreset: appearanceActionsRef?.removeMyPreset ?? (() => {}),
				applyMyPreset: appearanceActionsRef?.applyMyPreset ?? (() => {}),
				cancelPreview: appearanceActionsRef?.cancelPreview ?? (() => {}),
				save: appearanceActionsRef?.save ?? (() => {}),
				resetAll: appearanceActionsRef?.resetAll ?? (() => {}),
				setMotionEnabled: (v) => {
					scope.set("motionEnabled", v);
				},
				setMotionStyle: (s) => {
					scope.set("motionStyle", s);
				},
				setSidebarMotionEnabled: (v) => {
					scope.set("sidebarMotionEnabled", v);
				},
				setSidebarMotionStyle: (s) => {
					scope.set("sidebarMotionStyle", s);
				},
				setSelectionMotionEnabled: (v) => {
					scope.set("selectionMotionEnabled", v);
				},
				setNewChatMotionEnabled: (v) => {
					scope.set("newChatMotionEnabled", v);
				},
				setNewChatMotionStyle: (s) => {
					scope.set("newChatMotionStyle", s);
				},
				setSettingsMotionEnabled: (v) => {
					scope.set("settingsMotionEnabled", v);
				},
				applyMotionPreset: (presetId) => {
					if (!isMotionPresetId(presetId)) return;
					const config = MOTION_PRESETS.find((p) => p.id === presetId)?.config;
					if (config === void 0) return;
					scope.set("motionEnabled", config.motionEnabled);
					scope.set("motionStyle", config.motionStyle);
					scope.set("sidebarMotionEnabled", config.sidebarMotionEnabled);
					scope.set("sidebarMotionStyle", config.sidebarMotionStyle);
					scope.set("selectionMotionEnabled", config.selectionMotionEnabled);
					scope.set("newChatMotionEnabled", config.newChatMotionEnabled);
					scope.set("newChatMotionStyle", config.newChatMotionStyle);
					scope.set("settingsMotionEnabled", config.settingsMotionEnabled);
				},
				zhT,
				appearanceT,
				usageT,
				motionT
			})
		}, UiEnhanceSection));
		if (enabled("zh")) ctx.effect(() => applyZh(ctx, { skipSection: true }), "ui-custom: zh feature");
		if (enabled("smooth")) ctx.effect(() => apply$1(ctx, { takeover: true }), "ui-custom: smooth feature");
	};
	registerFeatures();
	if (!featuresRegistered) {
		const disposeRegistration = scope.subscribe(() => {
			registerFeatures();
		});
		ctx.effect(() => disposeRegistration, "ui-custom: feature registration waiter");
	}
	ctx.get("connection");
}
//#endregion
exports.CONFIG_KEYS = CONFIG_KEYS;
exports.DEFAULTS = DEFAULTS;
exports.FEATURES = FEATURES;
exports.PRESETS = PRESETS;
exports.PRESET_MAP = PRESET_MAP;
exports.UI_ENHANCE_NS = UI_ENHANCE_NS;
exports.apply = apply;
exports.clampNumber = clampNumber;
exports.cleanString = cleanString;
exports.inject = inject;
exports.normalizeConfig = normalizeConfig;
exports.resolveFeatures = resolveFeatures;
exports.resolvePreset = resolvePreset;

		return module.exports;
	}
});