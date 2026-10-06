import { c as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as MapPin, T as PawPrint, U as Heart, a as Users, o as User } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MobileShell-Bd3RfVpU.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/home",
		label: "Início",
		icon: PawPrint,
		color: "text-primary"
	},
	{
		to: "/social",
		label: "Social",
		icon: Heart,
		color: "text-love"
	},
	{
		to: "/local",
		label: "Local",
		icon: MapPin,
		color: "text-brand-soft"
	},
	{
		to: "/comunidades",
		label: "Grupos",
		icon: Users,
		color: "text-primary"
	},
	{
		to: "/perfil",
		label: "Perfil",
		icon: User,
		color: "text-brand"
	}
];
function BottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 pb-[max(0.5rem,env(safe-area-inset-bottom))] px-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-between gap-1 rounded-3xl bg-card/95 backdrop-blur border border-border shadow-[0_-6px_24px_-12px_rgba(180,120,40,0.35)] p-2",
			children: items.map(({ to, label, icon: Icon, color }) => {
				const active = pathname.startsWith(to);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					className: "flex-1 flex flex-col items-center gap-0.5 py-2 rounded-2xl transition " + (active ? "bg-primary/15" : "hover:bg-accent/50"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: (active ? color : "text-muted-foreground") + " size-5",
						strokeWidth: 2.2
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-display " + (active ? "text-brand" : "text-muted-foreground"),
						children: label
					})]
				}, to);
			})
		})
	});
}
function MobileShell({ children, hideNav = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen w-full flex justify-center nuppy-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-[480px] min-h-screen bg-background/60 backdrop-blur-[1px] pb-28",
			children: [children, !hideNav && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})]
		})
	});
}
//#endregion
export { MobileShell as t };
