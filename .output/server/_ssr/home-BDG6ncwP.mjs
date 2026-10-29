import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { t as cachorro_default } from "./cachorro-6PJjLXgj.mjs";
import { c as require_react, r as useSuspenseQuery, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Mic, R as Heart, _ as Search, k as MapPin, y as Plus } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-CCg89puG.mjs";
import { n as PET_COLUMNS } from "./adocao-DyWoLN8v.mjs";
import { t as peludinho_default } from "./peludinho-DHE_plpM.mjs";
import { t as passaro_default } from "./passaro-D27wXGhm.mjs";
import { t as gato_default } from "./gato-CmOPw7bd.mjs";
import { t as peixe_default } from "./peixe-DsWlONdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-BDG6ncwP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
		image: cachorro_default,
		bg: "from-pink-200 to-orange-100"
	},
	{
		label: "Veterinário",
		image: gato_default,
		bg: "from-amber-200 to-orange-100"
	},
	{
		label: "Pet Shop",
		image: peixe_default,
		bg: "from-sky-200 to-orange-100"
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.image,
							alt: "",
							className: "size-14 ml-auto object-contain drop-shadow-sm"
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
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: peludinho_default,
						alt: "",
						className: "size-12 object-contain"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/servicos",
					className: "mt-3 nuppy-card p-4 flex items-center justify-between hover:shadow-soft transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-brand",
						children: "Serviços pet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Consultas, adestramento, veterinária e mais"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: passaro_default,
						alt: "",
						className: "size-12 object-contain"
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: peludinho_default,
							alt: "",
							className: "size-7 object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg text-brand",
							children: "ONGs"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ongs",
						className: "text-sm font-display text-primary",
						children: "Ver todas →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-40 mt-3 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skel, {})]
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OngsList, {})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-4 mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nuppy-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: cachorro_default,
								alt: "",
								className: "size-7 object-contain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg text-brand",
								children: "Adoção de Pets"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/adocao",
							className: "text-sm font-display text-primary",
							children: "Ver tudo →"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-40 mt-3 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skel, {})]
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetsForAdoption, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/adocao/novo",
						className: "mt-3 w-full rounded-full bg-primary text-primary-foreground font-display text-sm py-2.5 flex items-center justify-center gap-1.5 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Colocar pet para adoção"]
					})
				]
			})
		})
	] });
}
function Skel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-2xl bg-muted animate-pulse" });
}
var ongsQuery = {
	queryKey: ["ongs"],
	queryFn: async () => {
		const { data, error } = await supabase.from("ongs").select("id, name, description, photo_url, city").order("created_at", { ascending: false }).limit(6);
		if (error) throw error;
		return data ?? [];
	}
};
function OngsList() {
	const { data } = useSuspenseQuery(ongsQuery);
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 rounded-2xl bg-secondary p-6 text-center text-sm text-muted-foreground",
		children: "Nenhuma ONG cadastrada ainda."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 grid grid-cols-2 gap-3",
		children: data.slice(0, 2).map((ong) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/ong/$ongId",
			params: { ongId: ong.id },
			className: "rounded-2xl bg-accent p-2 block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square rounded-xl overflow-hidden bg-muted",
				children: ong.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: ong.photo_url,
					alt: ong.name,
					className: "w-full h-full object-cover",
					loading: "lazy"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-full grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: peludinho_default,
						alt: "",
						className: "size-16 object-contain"
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 px-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-brand line-clamp-1",
						children: ong.name
					}),
					ong.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground line-clamp-2",
						children: ong.description
					}),
					ong.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground flex items-center gap-1 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), ong.city]
					})
				]
			})]
		}, ong.id))
	});
}
var adoptionQuery = {
	queryKey: ["adoption-pets-home"],
	queryFn: async () => {
		const { data, error } = await supabase.from("pets").select(PET_COLUMNS).eq("for_adoption", true).order("created_at", { ascending: false }).limit(6);
		if (error) throw error;
		return data ?? [];
	}
};
function PetsForAdoption() {
	const { data } = useSuspenseQuery(adoptionQuery);
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 rounded-2xl bg-secondary p-6 text-center text-sm text-muted-foreground",
		children: "Nenhum pet para adoção ainda. Seja o primeiro a cadastrar!"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 grid grid-cols-2 gap-3",
		children: data.slice(0, 2).map((pet) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
	});
}
//#endregion
export { HomePage as component };
