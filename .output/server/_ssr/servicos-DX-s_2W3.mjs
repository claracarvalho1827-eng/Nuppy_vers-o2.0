import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, o as useQueryClient, r as useSuspenseQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Instagram, N as MapPin, S as Plus, et as ChevronLeft, j as MessageCircle } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
import { t as ImageUpload } from "./ImageUpload-BP8g7wtb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/servicos-DX-s_2W3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATS = [
	"Banho & Tosa",
	"Passeador",
	"Adestrador",
	"Pet Sitter",
	"Veterinário",
	"Transporte",
	"Outro"
];
var servicesQuery = {
	queryKey: ["services"],
	queryFn: async () => {
		const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data ?? [];
	}
};
function ServicosPage() {
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [filter, setFilter] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "px-4 pt-4 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/home",
					className: "size-9 grid place-items-center rounded-full hover:bg-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl text-brand",
					children: "Serviços Pet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCreating(true),
					className: "size-9 grid place-items-center rounded-full bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 mt-3 flex gap-2 overflow-x-auto pb-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(null),
				className: "shrink-0 px-3 py-1.5 rounded-full text-xs font-display " + (!filter ? "bg-primary text-primary-foreground" : "bg-card border border-border text-brand"),
				children: "Todos"
			}), CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(c),
				className: "shrink-0 px-3 py-1.5 rounded-full text-xs font-display " + (filter === c ? "bg-primary text-primary-foreground" : "bg-card border border-border text-brand"),
				children: c
			}, c))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8 text-center text-muted-foreground",
				children: "Carregando..."
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List$1, { filter })
		}),
		creating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateModal, { onClose: () => setCreating(false) })
	] });
}
function List$1({ filter }) {
	const { data } = useSuspenseQuery(servicesQuery);
	const list = filter ? data.filter((s) => s.category === filter) : data;
	if (list.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-6xl mb-2",
				children: "🛎️"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-brand",
				children: "Nenhum serviço por aqui"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "Divulgue seu serviço pet e ajude tutores!"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 mt-4 space-y-3",
		children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "nuppy-card overflow-hidden flex",
			children: [s.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: s.photo_url,
				alt: s.title,
				className: "w-28 h-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-28 bg-gradient-to-br from-primary/20 to-accent grid place-items-center text-4xl",
				children: "🐾"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 p-3 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-primary font-display",
						children: s.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-brand truncate",
						children: s.title
					}),
					s.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground line-clamp-2",
						children: s.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] text-muted-foreground mt-1 flex flex-wrap gap-2",
						children: [s.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), s.city]
						}), s.price_range && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["💰 ", s.price_range] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex gap-2",
						children: [s.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `https://wa.me/${s.whatsapp.replace(/\D/g, "")}`,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-center gap-1 rounded-full bg-green-500 text-white px-3 py-1 text-xs font-display",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3" }), " WhatsApp"]
						}), s.instagram && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://instagram.com/${s.instagram.replace(/^@/, "")}`,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-center gap-1 rounded-full bg-pink-500 text-white px-3 py-1 text-xs font-display",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-3" })
						})]
					})
				]
			})]
		}, s.id))
	});
}
function CreateModal({ onClose }) {
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		category: "Banho & Tosa",
		description: "",
		price_range: "",
		city: "",
		whatsapp: "",
		instagram: "",
		photo_url: ""
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const upd = (k) => (e) => setForm((f) => ({
		...f,
		[k]: e.target.value
	}));
	async function save(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) throw new Error("Faça login");
			const { error } = await supabase.from("services").insert({
				...form,
				provider_id: user.id,
				photo_url: form.photo_url || null
			});
			if (error) throw error;
			toast.success("Serviço divulgado!");
			qc.invalidateQueries({ queryKey: ["services"] });
			onClose();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-black/50 grid place-items-end sm:place-items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onClick: (e) => e.stopPropagation(),
			onSubmit: save,
			className: "w-full max-w-[480px] bg-card rounded-t-3xl sm:rounded-3xl p-6 space-y-3 max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl text-brand",
					children: "Divulgar serviço"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUpload, {
						bucket: "service-photos",
						value: form.photo_url,
						onChange: (url) => setForm((f) => ({
							...f,
							photo_url: url
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nuppy-input pl-4",
					placeholder: "Título (ex: Banho e Tosa Patudos)",
					required: true,
					value: form.title,
					onChange: upd("title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "nuppy-input pl-4",
					value: form.category,
					onChange: upd("category"),
					children: CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "w-full rounded-2xl border border-border bg-card p-3 text-sm",
					rows: 3,
					placeholder: "Descrição do serviço",
					value: form.description,
					onChange: upd("description")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nuppy-input pl-4",
						placeholder: "Cidade",
						value: form.city,
						onChange: upd("city")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nuppy-input pl-4",
						placeholder: "Faixa de preço",
						value: form.price_range,
						onChange: upd("price_range")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nuppy-input pl-4",
					placeholder: "WhatsApp (com DDD)",
					value: form.whatsapp,
					onChange: upd("whatsapp")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nuppy-input pl-4",
					placeholder: "Instagram (@usuario)",
					value: form.instagram,
					onChange: upd("instagram")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					className: "nuppy-btn-primary",
					children: busy ? "Publicando..." : "Publicar serviço"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "nuppy-btn-ghost",
					children: "Cancelar"
				})
			]
		})
	});
}
//#endregion
export { ServicosPage as component };
