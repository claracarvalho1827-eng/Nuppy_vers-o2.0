import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, o as useQueryClient, r as useSuspenseQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Plus, a as Users, et as ChevronLeft, j as MessageCircle } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
import { t as ImageUpload } from "./ImageUpload-BP8g7wtb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/comunidades-DVT4WzO-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var communitiesQuery = {
	queryKey: ["communities"],
	queryFn: async () => {
		const { data, error } = await supabase.from("communities").select("id, name, slug, description, cover_url, emoji, created_by, community_members(user_id)").order("created_at", { ascending: true });
		if (error) throw error;
		return data ?? [];
	}
};
function ComunidadesPage() {
	const [creating, setCreating] = (0, import_react.useState)(false);
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
					children: "Comunidades"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCreating(true),
					className: "size-9 grid place-items-center rounded-full bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 mt-2 text-sm text-muted-foreground",
			children: "Bate-papos por tipo de pet. Entre em um grupo e converse com outros tutores."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8 text-center text-muted-foreground",
				children: "Carregando..."
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List$1, {})
		}),
		creating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateModal, { onClose: () => setCreating(false) })
	] });
}
function List$1() {
	const { data } = useSuspenseQuery(communitiesQuery);
	const qc = useQueryClient();
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
	}, []);
	async function join(c) {
		if (!userId) return;
		await supabase.from("community_members").insert({
			community_id: c.id,
			user_id: userId
		});
		qc.invalidateQueries({ queryKey: ["communities"] });
	}
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-6xl mb-2",
			children: "👥"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-brand",
			children: "Nenhuma comunidade ainda"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 mt-4 space-y-2 pb-24",
		children: data.map((c) => {
			const joined = !!userId && c.community_members.some((m) => m.user_id === userId);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nuppy-card p-3 flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-14 rounded-full bg-gradient-to-br from-primary/30 to-accent grid place-items-center text-2xl overflow-hidden shrink-0",
						children: c.cover_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.cover_url,
							alt: "",
							className: "w-full h-full object-cover"
						}) : c.emoji ?? "🐾"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-brand truncate",
								children: [
									c.emoji,
									" ",
									c.name
								]
							}),
							c.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground line-clamp-1",
								children: c.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3" }),
									" ",
									c.community_members.length,
									" membros"
								]
							})
						]
					}),
					joined ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/comunidade/$slug",
						params: { slug: c.slug },
						className: "px-3 py-2 rounded-full bg-primary text-primary-foreground text-xs font-display inline-flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " Abrir"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => join(c),
						className: "px-3 py-2 rounded-full bg-accent text-brand text-xs font-display",
						children: "Entrar"
					})
				]
			}, c.id);
		})
	});
}
function CreateModal({ onClose }) {
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		description: "",
		emoji: "🐾",
		cover_url: ""
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function save(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) throw new Error("Faça login");
			const slug = form.name.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 6);
			const { data: created, error } = await supabase.from("communities").insert({
				...form,
				slug,
				created_by: user.id,
				cover_url: form.cover_url || null
			}).select("id").single();
			if (error) throw error;
			if (created) await supabase.from("community_members").insert({
				community_id: created.id,
				user_id: user.id
			});
			toast.success("Comunidade criada!");
			qc.invalidateQueries({ queryKey: ["communities"] });
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
					children: "Nova comunidade"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUpload, {
						bucket: "place-photos",
						shape: "wide",
						value: form.cover_url,
						onChange: (url) => setForm((f) => ({
							...f,
							cover_url: url
						})),
						label: "Foto de capa"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[80px_1fr] gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nuppy-input pl-4 text-center text-xl",
						placeholder: "🐾",
						value: form.emoji,
						onChange: (e) => setForm((f) => ({
							...f,
							emoji: e.target.value
						}))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nuppy-input pl-4",
						placeholder: "Nome da comunidade",
						required: true,
						value: form.name,
						onChange: (e) => setForm((f) => ({
							...f,
							name: e.target.value
						}))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "w-full rounded-2xl border border-border bg-card p-3 text-sm",
					rows: 3,
					placeholder: "Sobre o que é essa comunidade?",
					value: form.description,
					onChange: (e) => setForm((f) => ({
						...f,
						description: e.target.value
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					className: "nuppy-btn-primary",
					children: busy ? "Criando..." : "Criar comunidade"
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
export { ComunidadesPage as component };
