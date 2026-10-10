import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_react, o as useQueryClient, r as useSuspenseQuery, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as Grid3x3, P as MapPin, T as Pencil, W as Heart, _ as Settings, p as Sparkles, rt as Camera, s as Upload, tt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
import { t as uploadImage } from "./upload-CsuYq30c.mjs";
import { n as peixe_default, t as cachorro_default } from "./peixe-Cl172ryh.mjs";
import { t as gato_default } from "./gato-CmOPw7bd.mjs";
import { t as passaro_default } from "./passaro-D27wXGhm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/peludinho-DHE_plpM.js
var peludinho_default = "/assets/peludinho-DgznguLx.png";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-D5eoT74F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var meQuery = {
	queryKey: ["me"],
	queryFn: async () => {
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) throw new Error("not authenticated");
		const [{ data: profile }, { data: posts }, { data: liked }] = await Promise.all([
			supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
			supabase.from("posts").select("id, media_url, media_type").eq("author_id", user.id).order("created_at", { ascending: false }),
			supabase.from("likes").select("post_id, posts!inner(id, media_url, media_type)").eq("user_id", user.id).eq("posts.media_type", "video").order("created_at", { ascending: false })
		]);
		const likedVideos = (liked ?? []).map((l) => l.posts).filter(Boolean);
		return {
			user,
			profile,
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
	const { profile, posts, likedVideos } = data;
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("posts");
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
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: peludinho_default,
								alt: "Peludinho",
								className: "w-full h-full object-cover"
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
							children: [profile?.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "nuppy-chip inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
									" ",
									profile.city
								]
							}), posts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "nuppy-chip inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Ativo"]
							})]
						}),
						profile?.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm mt-3 text-foreground/80 max-w-[300px] mx-auto",
							children: profile.bio
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs mt-3 italic text-muted-foreground",
							children: ["Adicione uma biografia para se apresentar", " "]
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
				className: "mt-4 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: "size-4" }),
					value: posts.length,
					label: "Posts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }),
					value: likedVideos.length,
					label: "Curtidos"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-5 flex bg-muted/60 p-1 rounded-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "posts",
					onClick: () => setTab("posts"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: "size-4" }),
					label: "Posts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "liked",
					onClick: () => setTab("liked"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }),
					label: "Curtidos"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [tab === "posts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostsGrid, { posts }), tab === "liked" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LikedGrid, { videos: likedVideos })]
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
function PostsGrid({ posts }) {
	if (posts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: passaro_default,
			alt: "Pássaro",
			className: "size-16 object-contain"
		}),
		text: "Nenhum post ainda"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-1",
		children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aspect-square bg-muted overflow-hidden rounded-md flex items-center justify-center",
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
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: cachorro_default,
			alt: "cachorro",
			className: "size-16 object-contain"
		}),
		text: "Você ainda não curtiu nenhum vídeo"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-1",
		children: videos.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "aspect-square bg-black overflow-hidden rounded-md flex items-center justify-center",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2",
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
var MASCOTS = [
	{
		id: "peludinho",
		label: "Peludinho",
		src: peludinho_default
	},
	{
		id: "passaro",
		label: "Pássaro",
		src: passaro_default
	},
	{
		id: "cachorro",
		label: "Cachorro",
		src: cachorro_default
	},
	{
		id: "gato",
		label: "Gato",
		src: gato_default
	},
	{
		id: "peixe",
		label: "Peixe",
		src: peixe_default
	}
];
var MAX_AVATAR_BYTES = 5 * 1024 * 1024;
function EditModal({ profile, onClose }) {
	const qc = useQueryClient();
	const [name, setName] = (0, import_react.useState)(profile?.display_name ?? "");
	const [bio, setBio] = (0, import_react.useState)(profile?.bio ?? "");
	const [city, setCity] = (0, import_react.useState)(profile?.city ?? "");
	const [avatar, setAvatar] = (0, import_react.useState)(profile?.avatar_url ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [file, setFile] = (0, import_react.useState)(null);
	const [mascot, setMascot] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)(profile?.avatar_url ?? "");
	const fileInput = (0, import_react.useRef)(null);
	function pickFile(e) {
		const f = e.target.files?.[0];
		e.target.value = "";
		if (!f) return;
		if (!f.type.startsWith("image/")) {
			toast.error("Escolha um arquivo de imagem");
			return;
		}
		if (f.size > MAX_AVATAR_BYTES) {
			toast.error("A imagem deve ter no máximo 5 MB");
			return;
		}
		setFile(f);
		setMascot(null);
		setAvatar("");
		setPreview(URL.createObjectURL(f));
	}
	function pickMascot(m) {
		setMascot(m);
		setFile(null);
		setAvatar("");
		setPreview(m.src);
	}
	async function save(e) {
		e.preventDefault();
		setBusy(true);
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return;
		let avatarUrl = avatar || null;
		try {
			if (file) avatarUrl = await uploadImage("pet-photos", file);
			else if (mascot) {
				const blob = await (await fetch(mascot.src)).blob();
				avatarUrl = await uploadImage("pet-photos", new File([blob], `${mascot.id}.png`, { type: blob.type || "image/png" }));
			}
		} catch (err) {
			setBusy(false);
			toast.error(err instanceof Error ? err.message : "Não foi possível enviar a imagem");
			return;
		}
		const { error } = await supabase.from("profiles").update({
			display_name: name,
			bio,
			city,
			avatar_url: avatarUrl
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
			className: "w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-card rounded-t-3xl sm:rounded-3xl p-6 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl text-brand",
						children: "Editar perfil"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-16 shrink-0 rounded-full bg-muted border-2 border-card shadow-soft overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: preview || "/assets/peludinho-DgznguLx.png",
								alt: "",
								className: "w-full h-full object-cover"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileInput.current?.click(),
								className: "px-4 py-2 rounded-full border border-border text-sm font-display text-brand inline-flex items-center gap-2 hover:bg-accent transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), " Escolher do dispositivo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "JPG, PNG ou WebP · até 5 MB"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInput,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: pickFile
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mb-1.5",
					children: "Ou escolha um mascote"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between gap-2",
					children: MASCOTS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: m.label,
						"aria-label": m.label,
						"aria-pressed": mascot?.id === m.id,
						onClick: () => pickMascot(m),
						className: `size-12 shrink-0 rounded-full overflow-hidden bg-muted border-2 transition ${mascot?.id === m.id ? "border-primary ring-2 ring-primary/40" : "border-transparent hover:border-border"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: m.src,
							alt: m.label,
							className: "w-full h-full object-cover"
						})
					}, m.id))
				})] }),
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
					onChange: (e) => {
						setAvatar(e.target.value);
						setFile(null);
						setMascot(null);
						setPreview(e.target.value);
					}
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
