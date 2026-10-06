import { c as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Instagram, P as Mail, et as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/configuracoes.contato-C-OE6mfI.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
	className: "px-4 pt-4 grid grid-cols-[40px_1fr_40px] items-center mb-4",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/configuracoes",
			className: "size-9 grid place-items-center rounded-full hover:bg-accent",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-lg text-brand text-center",
			children: "Entre em contato"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
	]
}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "px-4 space-y-3",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "mailto:contato@nuppy.app",
		className: "nuppy-card p-4 flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-brand",
			children: "E-mail"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: "contato@nuppy.app"
		})] })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "https://instagram.com/nuppy.app",
		target: "_blank",
		rel: "noreferrer",
		className: "nuppy-card p-4 flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-brand",
			children: "Instagram"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: "@nuppy.app"
		})] })]
	})]
})] });
//#endregion
export { SplitComponent as component };
