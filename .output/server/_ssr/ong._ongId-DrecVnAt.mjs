import { t as supabase } from "./client-CrwDbVDs.mjs";
import { i as useQuery, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as Globe, K as Copy, b as Phone, k as MapPin, nt as ArrowLeft, z as HeartHandshake } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-CCg89puG.mjs";
import { t as Route } from "./ong._ongId-DGMaUbtc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ong._ongId-DrecVnAt.js
var import_jsx_runtime = require_jsx_runtime();
function OngDetailsPage() {
	const { ongId } = Route.useParams();
	const { data: ong, isLoading, error } = useQuery({
		queryKey: ["ong", ongId],
		queryFn: async () => {
			const { data, error } = await supabase.from("ongs").select("*").eq("id", ongId).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "px-4 pt-4 flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/home",
			className: "size-9 rounded-full bg-card border border-border grid place-items-center",
			"aria-label": "Voltar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 text-brand" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-lg text-brand",
			children: "Conheça a ONG"
		})]
	}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 mt-4 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-video rounded-2xl bg-muted animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-2/3 rounded bg-muted animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 rounded bg-muted animate-pulse" })
		]
	}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 mt-6 text-center text-sm text-muted-foreground",
		children: "Não foi possível carregar os dados desta ONG. Tente novamente."
	}) : !ong ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 mt-6 text-center text-sm text-muted-foreground",
		children: "ONG não encontrada."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4 mt-4 pb-8 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-video rounded-2xl overflow-hidden bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: ong.photo_url || "/assets/peludinho-DgznguLx.png",
					alt: ong.photo_url ? ong.name : "",
					className: "w-full h-full object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-brand",
				children: ong.name
			}), ong.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 flex items-center gap-1 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), ong.city]
			})] }),
			ong.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-card border border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-brand mb-1",
					children: "Sobre a ONG"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground whitespace-pre-line",
					children: ong.description
				})]
			}),
			ong.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `tel:${ong.phone}`,
				className: "w-full rounded-full bg-primary text-primary-foreground font-display py-3 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), "Entrar em contato"]
			}),
			ong.website && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: ong.website,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "w-full rounded-full border border-border bg-card text-brand font-display py-3 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }), "Visitar site"]
			}),
			ong.latitude != null && ong.longitude != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `https://www.google.com/maps?q=${ong.latitude},${ong.longitude}`,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "w-full rounded-full border border-border bg-card text-brand font-display py-3 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), "Ver localização"]
			}),
			ong.pix && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					navigator.clipboard?.writeText(ong.pix);
				},
				className: "w-full rounded-full border border-border bg-card text-brand font-display py-3 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Copiar chave PIX"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-secondary p-4 flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-5 text-brand shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Entre em contato diretamente com a ONG para confirmar as formas de ajuda, doações e informações atualizadas."
				})]
			})
		]
	})] });
}
//#endregion
export { OngDetailsPage as component };
