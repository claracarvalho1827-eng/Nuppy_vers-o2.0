import { c as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estabelecimento._id-Cgva4dq7.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ error, reset }) => {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-brand font-display",
				children: "Algo deu errado."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground mt-1",
				children: error.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					reset();
					router.invalidate();
				},
				className: "mt-4 nuppy-btn-primary",
				children: "Tentar de novo"
			})
		]
	}) });
};
//#endregion
export { SplitErrorComponent as errorComponent };
