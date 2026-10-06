import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, r as useSuspenseQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as NuppyLogo } from "./NuppyLogo-Bx49H4Rm.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Mic, N as MapPin, U as Heart, v as Search } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-BveIzr_l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categories = [
	{
		label: "Adoção",
		emoji: "🐾",
		bg: "from-pink-200 to-orange-100"
	},
	{
		label: "Veterinário",
		emoji: "🩺",
		bg: "from-amber-200 to-orange-100"
	},
	{
		label: "Pet Shop",
		emoji: "🛍️",
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
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl",
						children: "🏪"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-4 mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nuppy-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl",
							children: "🐾"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg text-brand",
							children: "Adoção de Pets"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/social",
						className: "text-sm font-display text-primary",
						children: "Ver tudo →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-40 mt-3 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skel, {})]
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetsForAdoption, {})
				})]
			})
		})
	] });
}
function Skel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-2xl bg-muted animate-pulse" });
}
var adoptionQuery = {
	queryKey: ["adoption-pets"],
	queryFn: async () => {
		const { data, error } = await supabase.from("pets").select("id, name, age, city, photo_url").order("created_at", { ascending: false }).limit(6);
		if (error) throw error;
		return data ?? [];
	}
};
function PetsForAdoption() {
	const { data } = useSuspenseQuery(adoptionQuery);
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 rounded-2xl bg-secondary p-6 text-center text-sm text-muted-foreground",
		children: [
			"Nenhum pet cadastrado ainda.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/perfil",
				className: "text-primary font-display",
				children: "Cadastre o seu →"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 grid grid-cols-2 gap-3",
		children: data.slice(0, 2).map((pet) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/pet/$petId",
			params: { petId: pet.id },
			className: "rounded-2xl bg-accent p-2 relative block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-square rounded-xl overflow-hidden bg-muted",
					children: pet.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: pet.photo_url,
						alt: pet.name,
						className: "w-full h-full object-cover",
						loading: "lazy"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full h-full grid place-items-center text-4xl",
						children: "🐶"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5 absolute top-3 right-3 text-love fill-love" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-brand",
						children: pet.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pet.age ?? "—" }), pet.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), pet.city]
						})]
					})]
				})
			]
		}, pet.id))
	});
}
//#endregion
export { HomePage as component };
