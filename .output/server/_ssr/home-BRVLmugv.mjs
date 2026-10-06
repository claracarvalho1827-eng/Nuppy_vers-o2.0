import { s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Mic, v as Search } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-BRVLmugv.js
var import_jsx_runtime = require_jsx_runtime();
var nuppy_logo_default = "/assets/nuppy-logo-HPQ2dgMx.png";
function NuppyLogo({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: nuppy_logo_default,
		alt: "Nuppy",
		className: "select-none pointer-events-none " + className,
		draggable: false
	});
}
var categories = [
	{
		label: "Adoção",
		emoji: "",
		bg: "from-pink-200 to-orange-100"
	},
	{
		label: "Veterinário",
		emoji: "",
		bg: "from-amber-200 to-orange-100"
	},
	{
		label: "Pet Shop",
		emoji: "",
		bg: "from-sky-200 to-amber-100"
	}
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "relative pt-4 pb-2 px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NuppyLogo, { className: "h-32 drop-shadow-sm" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mt-6 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-primary text-primary-foreground text-xs font-display px-4 py-1.5 shadow-soft",
					children: "Onde todo animal encontra cuidado."
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Buscar...",
						className: "w-full rounded-full bg-card border border-border pl-11 pr-12 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "absolute right-1.5 top-1/2 -translate-y-1/2 size-9 rounded-full bg-primary grid place-items-center text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-4 mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg text-brand mb-2",
					children: "Destaque"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-3",
					children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/estabelecimentos",
						className: `rounded-2xl bg-gradient-to-br ${c.bg} aspect-square flex flex-col items-end p-2 shadow-card hover:scale-[1.02] transition`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-3xl ml-auto",
							children: c.emoji
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-auto font-display text-sm text-brand",
							children: c.label
						})]
					}, c.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/estabelecimentos",
					className: "mt-3 nuppy-card p-4 flex items-center justify-between hover:shadow-soft transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-brand",
						children: "Estabelecimentos pet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "ONGs, banho, hotéis, alimentação e mais"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-2xl" })]
				})
			]
		})
	] });
}
//#endregion
export { HomePage as component };
