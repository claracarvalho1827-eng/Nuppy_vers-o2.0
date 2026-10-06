import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, o as useQueryClient, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ChevronRight, F as LogOut, I as Lock, Q as CircleAlert, W as Headphones, et as ChevronLeft, k as Moon, p as Shield } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/configuracoes.index-C2UpWN4o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useDarkMode() {
	const [dark, setDark] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return false;
		return localStorage.getItem("nuppy-theme") === "dark";
	});
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		if (dark) root.classList.add("dark");
		else root.classList.remove("dark");
		localStorage.setItem("nuppy-theme", dark ? "dark" : "light");
	}, [dark]);
	return [dark, setDark];
}
function ConfigPage() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [dark, setDark] = useDarkMode();
	const [profile, setProfile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(async ({ data }) => {
			if (!data.user) return;
			const { data: p } = await supabase.from("profiles").select("username, avatar_url, display_name").eq("id", data.user.id).maybeSingle();
			setProfile(p);
		});
	}, []);
	async function signOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "px-4 pt-4 grid grid-cols-3 items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/perfil",
					className: "size-9 grid place-items-center rounded-full hover:bg-accent justify-self-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl text-brand text-center",
					children: "Perfil"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/perfil",
			className: "mx-4 mt-6 flex items-center gap-3 nuppy-card p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-12 rounded-full bg-muted overflow-hidden grid place-items-center",
					children: profile?.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.avatar_url,
						alt: "",
						className: "w-full h-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🐾" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-brand truncate",
						children: ["@", profile?.username ?? "seu_perfil"]
					}), profile?.display_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground truncate",
						children: profile.display_name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 text-primary" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "px-4 mt-6 mb-2 font-display text-brand text-lg",
			children: "Configurações"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 space-y-2 pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-5" }),
					label: "Modo Escuro",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						role: "switch",
						"aria-checked": dark,
						onClick: () => setDark(!dark),
						className: "relative w-12 h-7 rounded-full transition " + (dark ? "bg-primary" : "bg-muted"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0.5 size-6 rounded-full bg-card shadow transition-all " + (dark ? "left-[22px]" : "left-0.5") })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkRow, {
					to: "/configuracoes/privacidade",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-5" }),
					label: "Configurações de privacidade"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkRow, {
					to: "/configuracoes/contato",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "size-5" }),
					label: "Entre em contato"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkRow, {
					to: "/configuracoes/termos",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-5" }),
					label: "Termos e condições"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkRow, {
					to: "/configuracoes/privacidade-politica",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" }),
					label: "Política de privacidade"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: signOut,
					className: "w-full mt-4 nuppy-btn-ghost text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sair da conta"]
				})
			]
		})
	] });
}
function Row({ icon, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-10 rounded-full bg-muted grid place-items-center text-primary",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "flex-1 text-sm font-display text-foreground",
				children: label
			}),
			children
		]
	});
}
function LinkRow({ to, icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "flex items-center gap-3 py-3 hover:bg-accent rounded-2xl px-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-10 rounded-full bg-muted grid place-items-center text-primary",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "flex-1 text-sm font-display text-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 text-primary" })
		]
	});
}
//#endregion
export { ConfigPage as component };
