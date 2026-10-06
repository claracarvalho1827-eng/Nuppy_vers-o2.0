import { c as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/comunidade._slug-CxQQufk9.js
var import_jsx_runtime = require_jsx_runtime();
function ChatError({ error, reset }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 text-center space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-10 text-primary mx-auto" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-brand",
				children: "Não foi possível abrir o bate-papo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: error.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-display",
					children: "Tentar novamente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/comunidades",
					className: "px-4 py-2 rounded-full bg-accent text-brand text-sm font-display",
					children: "Voltar"
				})]
			})
		]
	}) });
}
//#endregion
export { ChatError as errorComponent };
