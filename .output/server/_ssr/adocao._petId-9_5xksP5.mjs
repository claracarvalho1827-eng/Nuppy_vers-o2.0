import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { t as cachorro_default } from "./cachorro-6PJjLXgj.mjs";
import { c as require_react, i as useQuery, o as useQueryClient, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { C as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./adocao._petId-k-kbKf6x.mjs";
import { D as MessageCircle, k as MapPin, nt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-CCg89puG.mjs";
import { i as SPECIES, n as PET_COLUMNS } from "./adocao-DyWoLN8v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adocao._petId-9_5xksP5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Tag({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-accent text-brand text-xs font-display px-3 py-1",
		children
	});
}
function PetAdocaoPage() {
	const { petId } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const { data: pet, isLoading } = useQuery({
		queryKey: ["adoption-pet", petId],
		queryFn: async () => {
			const { data, error } = await supabase.from("pets").select(PET_COLUMNS).eq("id", petId).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: me } = useQuery({
		queryKey: ["me"],
		queryFn: async () => (await supabase.auth.getUser()).data.user
	});
	async function markAdopted() {
		if (!confirm("Marcar como adotado? O pet sai da lista de adoção.")) return;
		setBusy(true);
		const { error } = await supabase.from("pets").update({ for_adoption: false }).eq("id", petId);
		setBusy(false);
		if (error) return alert("Não foi possível atualizar. Tente de novo.");
		await queryClient.invalidateQueries({ queryKey: ["adoption-pets"] });
		await queryClient.invalidateQueries({ queryKey: ["adoption-pets-home"] });
		navigate({ to: ".." });
	}
	const header = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "px-4 pt-4 flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/adocao",
			className: "size-9 rounded-full bg-card border border-border grid place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 text-brand" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-lg text-brand",
			children: "Pet para adoção"
		})]
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [header, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 mt-4 aspect-square rounded-2xl bg-muted animate-pulse" })] });
	if (!pet) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [header, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 mt-6 text-center text-sm text-muted-foreground",
		children: "Pet não encontrado."
	})] });
	const isOwner = !!me && me.id === pet.owner_id;
	const speciesLabel = SPECIES.find((s) => s.value === pet.species)?.label;
	const phone = (pet.contact_whatsapp ?? "").replace(/\D/g, "");
	const waNumber = phone.length <= 11 ? `55${phone}` : phone;
	const waText = encodeURIComponent(`Oi! Vi o ${pet.name} para adoção no Nuppy e gostaria de saber mais.`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [header, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4 mt-4 pb-8 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square rounded-2xl overflow-hidden bg-muted",
				children: pet.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: pet.photo_url,
					alt: pet.name,
					className: "w-full h-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-full grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cachorro_default,
						alt: "",
						className: "size-24 object-contain"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-brand",
				children: pet.name
			}), pet.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground flex items-center gap-1 mt-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
					pet.city,
					pet.state ? `, ${pet.state}` : ""
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					speciesLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: speciesLabel }),
					pet.gender && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: pet.gender === "femea" ? "Fêmea" : "Macho" }),
					pet.age && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: pet.age }),
					pet.size && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, { children: ["Porte ", pet.size.toLowerCase()] }),
					pet.color && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: pet.color }),
					pet.vaccinated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: "Vacinado" }),
					pet.neutered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: "Castrado" })
				]
			}),
			pet.adoption_description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nuppy-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-brand mb-1",
					children: "Sobre"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground whitespace-pre-line",
					children: pet.adoption_description
				})]
			}),
			phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `https://wa.me/${waNumber}?text=${waText}`,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "w-full rounded-full bg-primary text-primary-foreground font-display py-3 flex items-center justify-center gap-2 shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5" }), "Falar com o responsável"]
			}),
			isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: markAdopted,
				disabled: busy,
				className: "w-full rounded-full border border-border bg-card text-brand font-display py-3 disabled:opacity-60",
				children: busy ? "Atualizando..." : "Já foi adotado"
			})
		]
	})] });
}
//#endregion
export { PetAdocaoPage as component };
