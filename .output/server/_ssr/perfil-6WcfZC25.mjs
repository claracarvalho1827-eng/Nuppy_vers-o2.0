import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, o as useQueryClient, r as useSuspenseQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as Grid3x3, N as MapPin, S as Plus, T as PawPrint, U as Heart, et as ChevronLeft, f as Sparkles, g as Settings, nt as Camera, w as Pencil } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-6WcfZC25.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var meQuery = {
	queryKey: ["me"],
	queryFn: async () => {
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) throw new Error("not authenticated");
		const [{ data: profile }, { data: pets }, { data: posts }, { data: liked }] = await Promise.all([
			supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
			supabase.from("pets").select("*").eq("owner_id", user.id).order("created_at", { ascending: false }),
			supabase.from("posts").select("id, media_url, media_type").eq("author_id", user.id).order("created_at", { ascending: false }),
			supabase.from("likes").select("post_id, posts!inner(id, media_url, media_type)").eq("user_id", user.id).eq("posts.media_type", "video").order("created_at", { ascending: false })
		]);
		const likedVideos = (liked ?? []).map((l) => l.posts).filter(Boolean);
		return {
			user,
			profile,
			pets: pets ?? [],
			posts: posts ?? [],
			likedVideos
		};
	}
};
function PerfilPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "px-4 pt-4 flex items-center justify-between",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/home",
				className: "size-9 grid place-items-center rounded-full hover:bg-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl text-brand",
				children: "Perfil"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/configuracoes",
				title: "Configurações",
				className: "size-9 grid place-items-center rounded-full hover:bg-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5 text-brand" })
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-10 text-center text-muted-foreground",
			children: "Carregando..."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfilBody, {})
	})] });
}
function PerfilBody() {
	const { data } = useSuspenseQuery(meQuery);
	const { profile, pets, posts, likedVideos } = data;
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("pets");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pt-3 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative nuppy-card-float p-5 pt-6 text-center overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 top-0 h-24 opacity-70",
					style: { background: "var(--gradient-warm)" },
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto size-28 rounded-full bg-muted border-4 border-card shadow-float overflow-hidden grid place-items-center",
							children: profile?.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: profile.avatar_url,
								alt: "",
								className: "w-full h-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-5xl",
								children: "🐾"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl text-brand leading-tight",
							children: profile?.display_name ?? "Você"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["@", profile?.username ?? "tutor"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap justify-center gap-1.5",
							children: [
								profile?.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "nuppy-chip inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
										" ",
										profile.city
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "nuppy-chip inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, { className: "size-3" }),
										" ",
										pets.length,
										" ",
										pets.length === 1 ? "pet" : "pets"
									]
								}),
								posts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "nuppy-chip inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Ativo"]
								})
							]
						}),
						profile?.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm mt-3 text-foreground/80 max-w-[300px] mx-auto",
							children: profile.bio
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs mt-3 italic text-muted-foreground",
							children: "Adicione uma biografia para se apresentar 💬"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setEditing(true),
							className: "mt-4 px-6 py-2 rounded-full bg-primary text-primary-foreground font-display text-sm shadow-soft inline-flex items-center gap-2 hover:brightness-105 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " Editar perfil"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, { className: "size-4" }),
						value: pets.length,
						label: "Pets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: "size-4" }),
						value: posts.length,
						label: "Posts"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }),
						value: likedVideos.length,
						label: "Curtidos"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-5 flex bg-muted/60 p-1 rounded-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
						active: tab === "pets",
						onClick: () => setTab("pets"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, { className: "size-4" }),
						label: "Pets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
						active: tab === "posts",
						onClick: () => setTab("posts"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: "size-4" }),
						label: "Posts"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
						active: tab === "liked",
						onClick: () => setTab("liked"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }),
						label: "Curtidos"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					tab === "pets" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetsGrid, { pets }),
					tab === "posts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostsGrid, { posts }),
					tab === "liked" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LikedGrid, { videos: likedVideos })
				]
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditModal, {
				profile,
				onClose: () => setEditing(false)
			})
		]
	});
}
function StatCard({ icon, value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nuppy-card p-3 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-1 size-8 rounded-full bg-primary/15 text-primary grid place-items-center",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl text-brand leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground mt-0.5",
				children: label
			})
		]
	});
}
function TabBtn({ active, onClick, icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: `flex-1 py-2 rounded-full text-sm font-display transition inline-flex items-center justify-center gap-1.5 ${active ? "bg-card text-brand shadow-soft" : "text-muted-foreground hover:text-brand"}`,
		children: [
			icon,
			" ",
			label
		]
	});
}
function PetsGrid({ pets }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-end mb-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/pet/novo",
			className: "text-sm font-display text-primary inline-flex items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Adicionar pet"]
		})
	}), pets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: "🐶",
		text: "Você ainda não cadastrou nenhum pet",
		cta: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/pet/novo",
			className: "nuppy-btn-primary inline-block px-6 py-2 mt-3",
			children: "Cadastrar"
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3",
		children: pets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/pet/$petId",
			params: { petId: p.id },
			className: "nuppy-card overflow-hidden group",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square bg-muted relative",
				children: p.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.photo_url,
					alt: p.name,
					className: "w-full h-full object-cover group-hover:scale-105 transition",
					loading: "lazy"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-full grid place-items-center text-4xl",
					children: "🐾"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-brand text-sm leading-none",
					children: p.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground mt-0.5 truncate",
					children: p.breed ?? p.species ?? "Pet"
				})]
			})]
		}, p.id))
	})] });
}
function PostsGrid({ posts }) {
	if (posts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: "📸",
		text: "Nenhum post ainda"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-1",
		children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aspect-square bg-muted overflow-hidden rounded-md relative",
			children: p.media_type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: p.media_url,
				className: "w-full h-full object-cover",
				muted: true,
				playsInline: true,
				preload: "metadata"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-1 right-1 text-white text-[10px] bg-black/60 rounded px-1",
				children: "▶"
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p.media_url,
				alt: "",
				className: "w-full h-full object-cover",
				loading: "lazy"
			})
		}, p.id))
	});
}
function LikedGrid({ videos }) {
	if (videos.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: "❤️",
		text: "Você ainda não curtiu nenhum vídeo"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-1",
		children: videos.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "aspect-square bg-black overflow-hidden rounded-md relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: v.media_url,
				className: "w-full h-full object-cover",
				muted: true,
				playsInline: true,
				preload: "metadata"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-1 right-1 text-white text-[10px] bg-black/60 rounded px-1",
				children: "▶"
			})]
		}, v.id))
	});
}
function EmptyState({ icon, text, cta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-secondary/60 border border-border p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-4xl mb-2",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: text
			}),
			cta
		]
	});
}
function EditModal({ profile, onClose }) {
	const qc = useQueryClient();
	const [name, setName] = (0, import_react.useState)(profile?.display_name ?? "");
	const [bio, setBio] = (0, import_react.useState)(profile?.bio ?? "");
	const [city, setCity] = (0, import_react.useState)(profile?.city ?? "");
	const [avatar, setAvatar] = (0, import_react.useState)(profile?.avatar_url ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function save(e) {
		e.preventDefault();
		setBusy(true);
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return;
		const { error } = await supabase.from("profiles").update({
			display_name: name,
			bio,
			city,
			avatar_url: avatar || null
		}).eq("id", user.id);
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Perfil atualizado!");
		qc.invalidateQueries({ queryKey: ["me"] });
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-black/50 grid place-items-end sm:place-items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onClick: (e) => e.stopPropagation(),
			onSubmit: save,
			className: "w-full max-w-[480px] bg-card rounded-t-3xl sm:rounded-3xl p-6 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl text-brand",
						children: "Editar perfil"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nuppy-input pl-4",
					placeholder: "Nome",
					value: name,
					onChange: (e) => setName(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "w-full rounded-2xl border border-border bg-card p-3 text-sm",
					rows: 2,
					placeholder: "Biografia",
					value: bio,
					onChange: (e) => setBio(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nuppy-input pl-4",
					placeholder: "Cidade",
					value: city,
					onChange: (e) => setCity(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nuppy-input pl-4",
					placeholder: "URL da foto de perfil",
					value: avatar,
					onChange: (e) => setAvatar(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					className: "nuppy-btn-primary",
					children: busy ? "Salvando..." : "Salvar alterações"
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
export { PerfilPage as component };
