import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, r as useSuspenseQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { I as notFound, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Phone, D as Palette, H as House, K as FingerprintPattern, N as MapPin, U as Heart, b as Scale, et as ChevronLeft, f as Sparkles, it as Cake, l as Syringe, m as ShieldCheck, o as User, rt as Calendar, s as TriangleAlert, u as Stethoscope, y as Scissors } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
import { t as Route } from "./pet._petId-GXe_jxJ2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pet._petId-D4GR2QP-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function petQuery(petId) {
	return {
		queryKey: ["pet", petId],
		queryFn: async () => {
			const { data: pet, error } = await supabase.from("pets").select("*").eq("id", petId).maybeSingle();
			if (error) throw error;
			if (!pet) throw notFound();
			const { data: profile } = await supabase.from("profiles").select("username, display_name, avatar_url").eq("id", pet.owner_id).maybeSingle();
			return {
				...pet,
				profile
			};
		}
	};
}
function PetPage() {
	const { petId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-10 text-center text-muted-foreground",
			children: "Carregando..."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetBody, { petId })
	}) });
}
function ageFromBirthdate(d) {
	if (!d) return null;
	const b = new Date(d);
	const now = /* @__PURE__ */ new Date();
	const years = now.getFullYear() - b.getFullYear() - (now < new Date(now.getFullYear(), b.getMonth(), b.getDate()) ? 1 : 0);
	if (years >= 1) return `${years} ${years === 1 ? "ano" : "anos"}`;
	const months = (now.getFullYear() - b.getFullYear()) * 12 + now.getMonth() - b.getMonth();
	return `${months} ${months === 1 ? "mês" : "meses"}`;
}
function PetBody({ petId }) {
	const { data: pet } = useSuspenseQuery(petQuery(petId));
	const age = pet.age ?? ageFromBirthdate(pet.birthdate) ?? "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-80 bg-muted overflow-hidden",
				children: [pet.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: pet.photo_url,
					alt: pet.name,
					className: "w-full h-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-full grid place-items-center text-8xl bg-gradient-to-br from-secondary to-accent",
					children: "🐾"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/perfil",
				className: "absolute top-4 left-4 size-10 grid place-items-center rounded-full bg-card/90 backdrop-blur shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-4 right-4 flex flex-col gap-1.5",
				children: [pet.vaccinated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatBadge, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Syringe, { className: "size-3" }),
					label: "Vacinado"
				}), pet.neutered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatBadge, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, { className: "size-3" }),
					label: "Castrado"
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 -mt-16 relative space-y-4 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "nuppy-card-float p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl text-brand leading-tight",
								children: pet.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground mt-0.5",
								children: [
									pet.gender && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mr-1",
										children: pet.gender === "Macho" ? "♂" : "♀"
									}),
									pet.breed ?? pet.species,
									pet.size && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" · ", pet.size] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: pet.species }),
									pet.gender && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: pet.gender }),
									pet.size && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: ["Porte ", pet.size] })
								]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickInfo, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cake, { className: "size-4" }),
						label: "Idade",
						value: age
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickInfo, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-4" }),
						label: "Peso",
						value: pet.weight ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickInfo, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-4" }),
						label: "Cor",
						value: pet.color ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickInfo, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
						label: "Cidade",
						value: pet.city ?? "—"
					})
				]
			}),
			pet.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }),
				title: "Sobre",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed",
					children: pet.description
				})
			}),
			(pet.personality || pet.favorite_food || pet.favorite_toy) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }),
				title: "Personalidade & Gostos",
				children: [pet.personality && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground/80 mb-3",
					children: pet.personality
				}), (pet.favorite_food || pet.favorite_toy) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [pet.favorite_food && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavTag, {
						emoji: "🍖",
						label: "Comida",
						value: pet.favorite_food
					}), pet.favorite_toy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavTag, {
						emoji: "🧸",
						label: "Brinquedo",
						value: pet.favorite_toy
					})]
				})]
			}),
			(pet.allergies || pet.medical_notes || pet.microchip || pet.vet_name || pet.vaccinated || pet.neutered) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "size-4" }),
				title: "Saúde",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5 mb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthBadge, {
								active: !!pet.vaccinated,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Syringe, { className: "size-3" }),
								label: "Vacinado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthBadge, {
								active: !!pet.neutered,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, { className: "size-3" }),
								label: "Castrado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthBadge, {
								active: !!pet.microchip,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-3" }),
								label: "Chip"
							})
						]
					}),
					pet.allergies && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-orange-500" }),
						label: "Alergias",
						value: pet.allergies
					}),
					pet.medical_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }),
						label: "Observações",
						value: pet.medical_notes
					}),
					pet.microchip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-4 text-primary" }),
						label: "Microchip",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: pet.microchip
						})
					}),
					pet.vet_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "size-4 text-primary" }),
						label: "Veterinário",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 flex-wrap",
							children: [pet.vet_name, pet.vet_phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${pet.vet_phone}`,
								className: "inline-flex items-center gap-1 text-primary underline",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3" }),
									" ",
									pet.vet_phone
								]
							})]
						})
					})
				]
			}),
			(pet.birthdate || pet.adopted_at) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4" }),
				title: "Marcos",
				children: [pet.birthdate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthRow, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cake, { className: "size-4 text-primary" }),
					label: "Nascimento",
					value: new Date(pet.birthdate).toLocaleDateString("pt-BR")
				}), pet.adopted_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthRow, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-4 text-primary" }),
					label: "Chegada em casa",
					value: new Date(pet.adopted_at).toLocaleDateString("pt-BR")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "nuppy-card p-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-12 rounded-full bg-muted overflow-hidden grid place-items-center border-2 border-card shadow-soft",
					children: pet.profile?.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: pet.profile.avatar_url,
						alt: "",
						className: "w-full h-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5 text-muted-foreground" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-wide text-muted-foreground",
							children: "Tutor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm text-brand truncate",
							children: pet.profile?.display_name ?? pet.profile?.username
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground truncate",
							children: ["@", pet.profile?.username]
						})
					]
				})]
			})
		]
	})] });
}
function FloatBadge({ icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded-full bg-card/95 backdrop-blur px-2.5 py-1 text-[11px] font-display text-brand shadow-soft inline-flex items-center gap-1",
		children: [
			icon,
			" ",
			label
		]
	});
}
function Chip({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "nuppy-chip text-[11px]",
		children
	});
}
function QuickInfo({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nuppy-card p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-primary mb-1",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] uppercase tracking-wide text-muted-foreground",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-brand text-base leading-tight",
			children: value
		})]
	});
}
function SectionCard({ icon, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "nuppy-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "font-display text-brand text-sm uppercase tracking-wide flex items-center gap-1.5 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: icon
			}), title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children
		})]
	});
}
function HealthBadge({ active, icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `rounded-full px-2.5 py-1 text-[11px] font-display inline-flex items-center gap-1 ${active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground line-through"}`,
		children: [
			icon,
			" ",
			label
		]
	});
}
function HealthRow({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-2 text-sm py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-wide text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-foreground/90",
				children: value
			})]
		})]
	});
}
function FavTag({ emoji, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-accent/40 border border-border p-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-[10px] font-display text-muted-foreground uppercase tracking-wide",
			children: [
				emoji,
				" ",
				label
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-brand font-display",
			children: value
		})]
	});
}
//#endregion
export { PetPage as component };
