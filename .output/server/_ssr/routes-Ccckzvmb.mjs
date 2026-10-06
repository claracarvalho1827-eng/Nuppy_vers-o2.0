import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ccckzvmb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IndexRedirect() {
	const [dest, setDest] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			setDest(data.user ? "/home" : "/auth");
		});
	}, []);
	if (!dest) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center nuppy-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-2xl text-brand animate-pulse",
			children: "Nuppy"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: dest,
		replace: true
	});
}
//#endregion
export { IndexRedirect as component };
