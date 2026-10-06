import { c as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { et as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/configuracoes.privacidade-BfB8pwnW.js
var import_jsx_runtime = require_jsx_runtime();
function Header({ title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "px-4 pt-4 grid grid-cols-[40px_1fr_40px] items-center mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/configuracoes",
				className: "size-9 grid place-items-center rounded-full hover:bg-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-lg text-brand text-center",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { title: "Configurações de privacidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "px-4 space-y-3 text-sm text-foreground/80",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Controle quem pode ver seu perfil, seus pets e suas publicações." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "list-disc pl-5 space-y-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Perfil público para todos os tutores" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Apenas membros podem ver as conversas das comunidades" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Seus posts são visíveis no feed social" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground pt-4",
			children: "Mais opções de privacidade em breve."
		})
	]
})] });
//#endregion
export { SplitComponent as component };
