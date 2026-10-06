import { c as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/comunidade._slug-DWLl6SqL.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "p-8 text-center",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-6xl mb-2",
			children: "🐾"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-brand",
			children: "Comunidade não encontrada"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/comunidades",
			className: "text-primary text-sm mt-2 inline-block",
			children: "Voltar"
		})
	]
}) });
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
