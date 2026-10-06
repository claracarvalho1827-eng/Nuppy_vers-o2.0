import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, r as useSuspenseQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Mic, N as MapPin, d as Star, et as ChevronLeft, v as Search } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estabelecimentos-BR1vVBKF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var query = {
	queryKey: ["places", "list-with-ratings"],
	queryFn: async () => {
		const [placesRes, reviewsRes] = await Promise.all([supabase.from("places").select("id,name,category,description,address,city,phone,photo_url,services").order("name"), supabase.from("place_reviews").select("place_id,rating")]);
		if (placesRes.error) throw placesRes.error;
		const reviews = reviewsRes.data ?? [];
		const byPlace = /* @__PURE__ */ new Map();
		for (const r of reviews) {
			const cur = byPlace.get(r.place_id) ?? {
				sum: 0,
				n: 0
			};
			cur.sum += r.rating;
			cur.n += 1;
			byPlace.set(r.place_id, cur);
		}
		return (placesRes.data ?? []).map((p) => {
			const agg = byPlace.get(p.id);
			return {
				...p,
				services: p.services ?? [],
				avg_rating: agg ? agg.sum / agg.n : 0,
				review_count: agg?.n ?? 0
			};
		});
	}
};
var CAT_EMOJI = {
	ONG: "🐾",
	Banho: "🛁",
	Hotel: "🏨",
	Alimentação: "🍖",
	Veterinário: "🩺",
	"Pet Shop": "🛍️",
	Parque: "🌳",
	"Café Pet": "☕",
	Adestrador: "🦮"
};
function EstabPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "px-4 pt-5 flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/home",
			className: "size-9 grid place-items-center rounded-full hover:bg-accent",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex-1 text-center font-display text-base text-brand leading-tight uppercase tracking-wide pr-9",
			children: [
				"Tudo o que seu pet",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"precisa, em um só lugar!"
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-10 text-center text-muted-foreground",
			children: "Carregando..."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	})] });
}
function Body() {
	const { data } = useSuspenseQuery(query);
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("Todos");
	const categories = (0, import_react.useMemo)(() => ["Todos", ...Array.from(new Set(data.map((p) => p.category)))], [data]);
	const filtered = (0, import_react.useMemo)(() => {
		const s = q.trim().toLowerCase();
		return data.filter((p) => {
			if (cat !== "Todos" && p.category !== cat) return false;
			if (!s) return true;
			return `${p.name} ${p.description ?? ""} ${p.address ?? ""} ${(p.services ?? []).join(" ")}`.toLowerCase().includes(s);
		});
	}, [
		data,
		q,
		cat
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Buscar por nome, serviço ou cidade...",
						className: "w-full rounded-full bg-card border border-border pl-11 pr-12 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 shadow-card"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute right-1.5 top-1/2 -translate-y-1/2 size-9 rounded-full bg-primary grid place-items-center text-primary-foreground",
						"aria-label": "Busca por voz",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto py-3 px-4 scrollbar-none",
			children: categories.map((c) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCat(c),
					className: `shrink-0 rounded-full px-4 py-2 text-sm font-display border transition ${c === cat ? "bg-primary text-primary-foreground border-primary shadow-soft" : "bg-transparent text-brand border-transparent hover:bg-accent"}`,
					children: c === "Todos" ? "Todos" : `${CAT_EMOJI[c] ?? "📍"} ${c}`
				}, c);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pb-28 space-y-3",
			children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nuppy-card p-8 text-center text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-5xl mb-2",
					children: "🔎"
				}), "Nenhum estabelecimento encontrado."]
			}), filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/estabelecimento/$id",
				params: { id: p.id },
				className: "nuppy-card overflow-hidden block hover:shadow-float transition",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-36 bg-accent",
					children: [
						p.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.photo_url,
							alt: p.name,
							className: "w-full h-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full h-full grid place-items-center text-6xl",
							children: CAT_EMOJI[p.category] ?? "🐾"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute top-3 left-3 rounded-full bg-card/90 backdrop-blur px-3 py-1 text-[11px] font-display text-brand uppercase tracking-wide shadow-soft",
							children: [
								CAT_EMOJI[p.category] ?? "📍",
								" ",
								p.category
							]
						}),
						p.review_count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute top-3 right-3 rounded-full bg-card/90 backdrop-blur px-2.5 py-1 text-[11px] font-display text-brand flex items-center gap-1 shadow-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-primary text-primary" }),
								p.avg_rating.toFixed(1),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										"(",
										p.review_count,
										")"
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-brand uppercase tracking-wide text-sm",
							children: p.name
						}),
						p.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground line-clamp-2 mt-1",
							children: p.description
						}),
						p.services && p.services.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1 mt-2",
							children: [p.services.slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-display uppercase tracking-wide bg-accent text-brand rounded-full px-2 py-0.5",
								children: s
							}, s)), p.services.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] text-muted-foreground",
								children: ["+", p.services.length - 4]
							})]
						}),
						p.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted-foreground flex items-center gap-1 mt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
								" ",
								p.city
							]
						})
					]
				})]
			}, p.id))]
		})
	] });
}
//#endregion
export { EstabPage as component };
