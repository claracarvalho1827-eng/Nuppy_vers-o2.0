import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { t as cachorro_default } from "./cachorro-6PJjLXgj.mjs";
import { c as require_react, i as useQuery, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { R as Heart, k as MapPin, nt as ArrowLeft, y as Plus } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-CCg89puG.mjs";
import { a as UFS, i as SPECIES, n as PET_COLUMNS, o as inputCls } from "./adocao-DyWoLN8v.mjs";
import { s as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adocao.index-D4BEOaUN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdocaoPage() {
	const [species, setSpecies] = (0, import_react.useState)("");
	const [state, setState] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const deferredCity = (0, import_react.useDeferredValue)(city.trim());
	const { data, isLoading, error } = useQuery({
		queryKey: [
			"adoption-pets",
			species,
			state,
			deferredCity
		],
		placeholderData: keepPreviousData,
		queryFn: async () => {
			let q = supabase.from("pets").select(PET_COLUMNS).eq("for_adoption", true).order("created_at", { ascending: false });
			if (species) q = q.eq("species", species);
			if (state) q = q.eq("state", state);
			if (deferredCity) q = q.ilike("city", `%${deferredCity}%`);
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "px-4 pt-4 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/home",
					className: "size-9 rounded-full bg-card border border-border grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 text-brand" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-lg text-brand",
					children: "Adoção de Pets"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/adocao/novo",
					className: "size-9 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-soft",
					"aria-label": "Colocar pet para adoção",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-4 mt-4 space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: species,
					onChange: (e) => setSpecies(e.target.value),
					className: inputCls,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Todos os bichos"
					}), SPECIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s.value,
						children: s.label
					}, s.value))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: state,
					onChange: (e) => setState(e.target.value),
					className: inputCls,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Todos os estados"
					}), UFS.map((uf) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: uf,
						children: uf
					}, uf))]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: city,
				onChange: (e) => setCity(e.target.value),
				placeholder: "Cidade (ex.: São Paulo)",
				className: inputCls
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-4 mt-4 pb-6",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square rounded-2xl bg-muted animate-pulse" }, i))
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl bg-secondary p-6 text-center text-sm text-muted-foreground",
				children: "Não foi possível carregar os pets agora."
			}) : !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-secondary p-6 text-center text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cachorro_default,
					alt: "",
					className: "size-16 mx-auto mb-2 object-contain"
				}), "Nenhum pet encontrado com esses filtros."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: data.map((pet) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/adocao/$petId",
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
								className: "w-full h-full grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: cachorro_default,
									alt: "",
									className: "size-16 object-contain"
								})
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
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
										pet.city,
										pet.state ? `, ${pet.state}` : ""
									]
								})]
							})]
						})
					]
				}, pet.id))
			})
		})
	] });
}
//#endregion
export { AdocaoPage as component };
