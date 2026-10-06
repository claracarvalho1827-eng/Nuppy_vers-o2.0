import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ChevronRight, T as PawPrint, U as Heart, et as ChevronLeft, tt as Check, u as Stethoscope, x as Ruler } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
import { t as ImageUpload } from "./ImageUpload-BP8g7wtb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pet.novo-lhwL0Q2l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	name: "",
	species: "Cachorro",
	breed: "",
	gender: "",
	birthdate: "",
	age: "",
	weight: "",
	size: "",
	color: "",
	photo_url: "",
	city: "",
	description: "",
	personality: "",
	favorite_food: "",
	favorite_toy: "",
	neutered: false,
	vaccinated: false,
	microchip: "",
	allergies: "",
	medical_notes: "",
	adopted_at: "",
	vet_name: "",
	vet_phone: ""
};
/** Definição das 4 etapas do wizard */
var STEPS = [
	{
		id: 1,
		label: "Identificação",
		icon: PawPrint
	},
	{
		id: 2,
		label: "Físico",
		icon: Ruler
	},
	{
		id: 3,
		label: "Saúde",
		icon: Stethoscope
	},
	{
		id: 4,
		label: "Personalidade",
		icon: Heart
	}
];
function NovoPet() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(1);
	const [form, setForm] = (0, import_react.useState)(empty);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	/** Validação por etapa — bloqueia o "Continuar" quando falta obrigatório */
	const canAdvance = (() => {
		if (step === 1) return form.name.trim().length > 0;
		return true;
	})();
	function next() {
		if (!canAdvance) {
			toast.error("Preencha o nome do pet");
			return;
		}
		if (step < 4) setStep((s) => s + 1);
	}
	function back() {
		if (step > 1) setStep((s) => s - 1);
	}
	async function submit() {
		if (!form.name.trim()) {
			toast.error("Nome é obrigatório");
			setStep(1);
			return;
		}
		setBusy(true);
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) throw new Error("Sessão expirada");
			const payload = {
				owner_id: user.id,
				name: form.name,
				species: form.species,
				breed: form.breed || null,
				gender: form.gender || null,
				birthdate: form.birthdate || null,
				age: form.age || null,
				weight: form.weight || null,
				size: form.size || null,
				color: form.color || null,
				photo_url: form.photo_url || null,
				city: form.city || null,
				description: form.description || null,
				personality: form.personality || null,
				favorite_food: form.favorite_food || null,
				favorite_toy: form.favorite_toy || null,
				neutered: form.neutered,
				vaccinated: form.vaccinated,
				microchip: form.microchip || null,
				allergies: form.allergies || null,
				medical_notes: form.medical_notes || null,
				adopted_at: form.adopted_at || null,
				vet_name: form.vet_name || null,
				vet_phone: form.vet_phone || null
			};
			const { data, error } = await supabase.from("pets").insert(payload).select("id").single();
			if (error) throw error;
			toast.success(`${form.name} cadastrado! 🐾`);
			navigate({
				to: "/pet/$petId",
				params: { petId: data.id }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "px-4 pt-4 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/perfil",
				className: "size-9 grid place-items-center rounded-full hover:bg-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl text-brand leading-tight",
					children: "Novo pet 🐾"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-muted-foreground",
					children: [
						"Passo ",
						step,
						" de ",
						STEPS.length,
						" · ",
						STEPS[step - 1].label
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1",
				children: STEPS.map((s, i) => {
					const done = step > s.id;
					const active = step === s.id;
					const Icon = s.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center flex-1 last:flex-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => done ? setStep(s.id) : null,
							className: `size-8 rounded-full grid place-items-center shrink-0 transition ${active ? "bg-primary text-primary-foreground shadow-soft" : done ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
							children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
						}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `flex-1 h-0.5 mx-1 rounded-full transition ${step > s.id ? "bg-primary/40" : "bg-muted"}` })]
					}, s.id);
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				step === 4 ? submit() : next();
			},
			className: "p-4 mt-3 space-y-4",
			children: [
				step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Vamos conhecer seu pet",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUpload, {
								bucket: "pet-photos",
								value: form.photo_url,
								onChange: (url) => set("photo_url", url),
								label: "Foto do pet",
								shape: "circle"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome *",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "nuppy-input pl-4",
								required: true,
								value: form.name,
								onChange: (e) => set("name", e.target.value),
								placeholder: "Como ele se chama?"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Espécie",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "nuppy-input pl-4 appearance-none",
								value: form.species,
								onChange: (e) => set("species", e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cachorro" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Gato" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Coelho" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Pássaro" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Peixe" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Hamster" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Réptil" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Outro" })
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Raça",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "nuppy-input pl-4",
								value: form.breed,
								onChange: (e) => set("breed", e.target.value),
								placeholder: "Ex: Vira-lata, Golden..."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Sexo",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "nuppy-input pl-4 appearance-none",
									value: form.gender,
									onChange: (e) => set("gender", e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Macho",
											children: "Macho ♂"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Fêmea",
											children: "Fêmea ♀"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Porte",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "nuppy-input pl-4 appearance-none",
									value: form.size,
									onChange: (e) => set("size", e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Mini" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Pequeno" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Médio" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Grande" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Gigante" })
									]
								})
							})]
						})
					]
				}),
				step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Dados físicos",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nascimento",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									className: "nuppy-input pl-4",
									value: form.birthdate,
									onChange: (e) => set("birthdate", e.target.value)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Adoção",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									className: "nuppy-input pl-4",
									value: form.adopted_at,
									onChange: (e) => set("adopted_at", e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Idade",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input pl-4",
									value: form.age,
									onChange: (e) => set("age", e.target.value),
									placeholder: "Ex: 3 anos"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Peso",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input pl-4",
									value: form.weight,
									onChange: (e) => set("weight", e.target.value),
									placeholder: "Ex: 8 kg"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Cor",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input pl-4",
									value: form.color,
									onChange: (e) => set("color", e.target.value),
									placeholder: "Caramelo, preto..."
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Cidade",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input pl-4",
									value: form.city,
									onChange: (e) => set("city", e.target.value),
									placeholder: "Sua cidade"
								})
							})]
						})
					]
				}),
				step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Saúde",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								checked: form.vaccinated,
								onChange: (v) => set("vaccinated", v),
								label: "💉 Vacinado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								checked: form.neutered,
								onChange: (v) => set("neutered", v),
								label: "✂️ Castrado"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Microchip",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "nuppy-input pl-4",
								value: form.microchip,
								onChange: (e) => set("microchip", e.target.value),
								placeholder: "Número do chip (se houver)"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Alergias",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "nuppy-textarea",
								rows: 2,
								value: form.allergies,
								onChange: (e) => set("allergies", e.target.value),
								placeholder: "Alguma alergia conhecida?"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Observações médicas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "nuppy-textarea",
								rows: 2,
								value: form.medical_notes,
								onChange: (e) => set("medical_notes", e.target.value),
								placeholder: "Medicamentos, condições, etc."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Veterinário",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input pl-4",
									value: form.vet_name,
									onChange: (e) => set("vet_name", e.target.value),
									placeholder: "Nome do(a) vet"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Telefone do vet",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input pl-4",
									value: form.vet_phone,
									onChange: (e) => set("vet_phone", e.target.value),
									placeholder: "(11) 99999-9999"
								})
							})]
						})
					]
				}),
				step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Personalidade & Bio",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Como ele(a) é?",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "nuppy-textarea",
								rows: 3,
								value: form.personality,
								onChange: (e) => set("personality", e.target.value),
								placeholder: "Brincalhão, dócil, tímido..."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Comida favorita",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input pl-4",
									value: form.favorite_food,
									onChange: (e) => set("favorite_food", e.target.value),
									placeholder: "Ração, frango..."
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Brinquedo favorito",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input pl-4",
									value: form.favorite_toy,
									onChange: (e) => set("favorite_toy", e.target.value),
									placeholder: "Bolinha, mordedor..."
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Biografia",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "nuppy-textarea",
								rows: 3,
								value: form.description,
								onChange: (e) => set("description", e.target.value),
								placeholder: "Conte um pouco a história dele(a)..."
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 pt-2",
					children: [step > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: back,
						className: "flex-1 rounded-full bg-secondary text-brand font-display py-3 inline-flex items-center justify-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Voltar"]
					}), step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: next,
						disabled: !canAdvance,
						className: "flex-[2] nuppy-btn-primary inline-flex items-center justify-center gap-1 disabled:opacity-50",
						children: ["Continuar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy,
						className: "flex-[2] nuppy-btn-primary inline-flex items-center justify-center gap-1",
						children: busy ? "Salvando..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Cadastrar pet"] })
					})]
				})
			]
		})
	] });
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nuppy-card p-4 space-y-3 animate-fade-up",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-brand text-sm uppercase tracking-wide",
			children: title
		}), children]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-display text-muted-foreground",
			children: label
		}), children]
	});
}
function Toggle({ checked, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onChange(!checked),
		className: `flex-1 rounded-full px-3 py-2 text-sm font-display border transition ${checked ? "bg-primary text-primary-foreground border-primary shadow-soft" : "bg-card text-brand border-border"}`,
		children: [checked ? "✓ " : "", label]
	});
}
//#endregion
export { NovoPet as component };
