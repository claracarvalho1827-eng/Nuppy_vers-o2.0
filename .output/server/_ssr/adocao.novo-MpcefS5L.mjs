import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_react, o as useQueryClient, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { C as useNavigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Camera, nt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-CCg89puG.mjs";
import { a as UFS, i as SPECIES, o as inputCls, r as SIZES, t as GENDERS } from "./adocao-DyWoLN8v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adocao.novo-MpcefS5L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-display text-brand mb-1 block",
			children: label
		}), children]
	});
}
function NovoPetPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		species: "cachorro",
		gender: "",
		age: "",
		size: "",
		color: "",
		city: "",
		state: "",
		contact_whatsapp: "",
		adoption_description: "",
		neutered: false,
		vaccinated: false
	});
	const [file, setFile] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	function onPickPhoto(e) {
		const f = e.target.files?.[0];
		if (!f) return;
		if (!f.type.startsWith("image/")) return setError("Escolha um arquivo de imagem.");
		if (f.size > 5 * 1024 * 1024) return setError("A foto precisa ter até 5 MB.");
		setError(null);
		setFile(f);
		setPreview(URL.createObjectURL(f));
	}
	async function onSubmit() {
		setError(null);
		if (!form.name.trim()) return setError("Informe o nome do pet.");
		if (!form.city.trim() || !form.state) return setError("Informe a cidade e o estado.");
		if (form.contact_whatsapp.replace(/\D/g, "").length < 10) return setError("Informe um WhatsApp válido, com DDD.");
		setSaving(true);
		try {
			const { data: auth } = await supabase.auth.getUser();
			const user = auth.user;
			if (!user) throw new Error("Você precisa estar logada para cadastrar um pet.");
			let photo_url = null;
			if (file) {
				const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
				const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
				const { error: upErr } = await supabase.storage.from("pet-photos").upload(path, file, { contentType: file.type });
				if (upErr) throw upErr;
				photo_url = supabase.storage.from("pet-photos").getPublicUrl(path).data.publicUrl;
			}
			const { data, error: insErr } = await supabase.from("pets").insert({
				owner_id: user.id,
				for_adoption: true,
				name: form.name.trim(),
				species: form.species,
				gender: form.gender || null,
				age: form.age.trim() || null,
				size: form.size || null,
				color: form.color.trim() || null,
				city: form.city.trim(),
				state: form.state,
				contact_whatsapp: form.contact_whatsapp.replace(/\D/g, ""),
				adoption_description: form.adoption_description.trim() || null,
				neutered: form.neutered,
				vaccinated: form.vaccinated,
				photo_url
			}).select("id").single();
			if (insErr) throw insErr;
			await queryClient.invalidateQueries({ queryKey: ["adoption-pets"] });
			await queryClient.invalidateQueries({ queryKey: ["adoption-pets-home"] });
			navigate({
				to: "/adocao/$petId",
				params: { petId: data.id }
			});
		} catch (e) {
			setError(e?.message ?? "Não foi possível salvar. Tente de novo.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "px-4 pt-4 flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/adocao",
			className: "size-9 rounded-full bg-card border border-border grid place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 text-brand" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-lg text-brand",
			children: "Colocar pet para adoção"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4 mt-4 pb-8 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block aspect-square rounded-2xl bg-muted overflow-hidden cursor-pointer relative",
				children: [preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: preview,
					alt: "Prévia",
					className: "w-full h-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-full grid place-items-center text-muted-foreground text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-8" }), "Toque para escolher uma foto"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/*",
					onChange: onPickPhoto,
					className: "hidden"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nome do pet *",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.name,
					onChange: (e) => set("name", e.target.value),
					className: inputCls
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Bicho *",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.species,
						onChange: (e) => set("species", e.target.value),
						className: inputCls,
						children: SPECIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.value,
							children: s.label
						}, s.value))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Sexo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.gender,
						onChange: (e) => set("gender", e.target.value),
						className: inputCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Não informar"
						}), GENDERS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: g.value,
							children: g.label
						}, g.value))]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Idade",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.age,
						onChange: (e) => set("age", e.target.value),
						placeholder: "Ex.: 2 anos",
						className: inputCls
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Porte",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.size,
						onChange: (e) => set("size", e.target.value),
						className: inputCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Não informar"
						}), SIZES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s
						}, s))]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Cor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.color,
					onChange: (e) => set("color", e.target.value),
					className: inputCls
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Cidade *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.city,
							onChange: (e) => set("city", e.target.value),
							className: inputCls
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Estado *",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.state,
						onChange: (e) => set("state", e.target.value),
						className: inputCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "UF"
						}), UFS.map((uf) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: uf,
							children: uf
						}, uf))]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "WhatsApp para contato *",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.contact_whatsapp,
					onChange: (e) => set("contact_whatsapp", e.target.value),
					inputMode: "tel",
					placeholder: "(11) 91234-5678",
					className: inputCls
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Conte mais sobre o pet",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: form.adoption_description,
					onChange: (e) => set("adoption_description", e.target.value),
					rows: 4,
					placeholder: "Personalidade, rotina, por que está para adoção...",
					className: inputCls
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-6 text-sm text-brand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: form.vaccinated,
						onChange: (e) => set("vaccinated", e.target.checked)
					}), "Vacinado"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: form.neutered,
						onChange: (e) => set("neutered", e.target.checked)
					}), "Castrado"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "O WhatsApp e a cidade aparecem para todos os usuários do app."
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onSubmit,
				disabled: saving,
				className: "w-full rounded-full bg-primary text-primary-foreground font-display py-3 shadow-soft disabled:opacity-60",
				children: saving ? "Salvando..." : "Publicar para adoção"
			})
		]
	})] });
}
//#endregion
export { NovoPetPage as component };
