import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, o as useQueryClient, r as useSuspenseQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Paperclip, R as LoaderCircle, V as Image, _ as Send, a as Users, et as ChevronLeft, i as Video, t as X } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./comunidade._slug-DgMLG7-D.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
import { n as uploadMedia } from "./upload-CsuYq30c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/comunidade._slug-B55AS7Sf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var chatQuery = (slug) => ({
	queryKey: ["community-chat", slug],
	queryFn: async () => {
		const { data: c, error: cErr } = await supabase.from("communities").select("id, name, emoji, cover_url, description, community_members(user_id)").eq("slug", slug).maybeSingle();
		if (cErr) throw cErr;
		if (!c) throw new Error("Comunidade não encontrada");
		const community = c;
		const { data: msgs, error: mErr } = await supabase.from("community_messages").select("id, body, user_id, created_at, media_url, media_type").eq("community_id", community.id).order("created_at", { ascending: true }).limit(200);
		if (mErr) throw mErr;
		const rows = msgs ?? [];
		const userIds = Array.from(new Set(rows.map((m) => m.user_id)));
		const profileMap = /* @__PURE__ */ new Map();
		if (userIds.length) {
			const { data: profiles } = await supabase.from("profiles").select("id, username, avatar_url, display_name").in("id", userIds);
			(profiles ?? []).forEach((p) => profileMap.set(p.id, {
				username: p.username,
				avatar_url: p.avatar_url,
				display_name: p.display_name
			}));
		}
		return {
			community,
			messages: rows.map((m) => ({
				...m,
				author: profileMap.get(m.user_id) ?? null
			}))
		};
	}
});
function ChatPage() {
	const { slug } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileShell, {
		hideNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 text-center text-muted-foreground",
				children: "Abrindo bate-papo..."
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chat, { slug })
		})
	});
}
function Chat({ slug }) {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { data } = useSuspenseQuery(chatQuery(slug));
	const { community, messages } = data;
	const [userId, setUserId] = (0, import_react.useState)(null);
	const [text, setText] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [pendingMedia, setPendingMedia] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	const scrollRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
	}, []);
	const isMember = !!userId && community.community_members.some((m) => m.user_id === userId);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages.length]);
	(0, import_react.useEffect)(() => {
		if (!isMember) return;
		const ch = supabase.channel(`community-${community.id}`).on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "community_messages",
			filter: `community_id=eq.${community.id}`
		}, () => qc.invalidateQueries({ queryKey: ["community-chat", slug] })).subscribe();
		return () => {
			supabase.removeChannel(ch);
		};
	}, [
		community.id,
		isMember,
		qc,
		slug
	]);
	async function join() {
		if (!userId) return;
		const { error } = await supabase.from("community_members").insert({
			community_id: community.id,
			user_id: userId
		});
		if (error) {
			toast.error(error.message);
			return;
		}
		qc.invalidateQueries({ queryKey: ["community-chat", slug] });
		qc.invalidateQueries({ queryKey: ["communities"] });
	}
	async function pickFile(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		const isVid = file.type.startsWith("video/");
		if (file.size > (isVid ? 50 : 8) * 1024 * 1024) {
			toast.error(isVid ? "Vídeo máx 50MB" : "Imagem máx 8MB");
			return;
		}
		setUploading(true);
		try {
			setPendingMedia({
				url: await uploadMedia("community-media", file),
				type: isVid ? "video" : "image"
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro no upload");
		} finally {
			setUploading(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	}
	async function send(e) {
		e.preventDefault();
		if (!text.trim() && !pendingMedia || !userId) return;
		setSending(true);
		const body = text.trim();
		const media = pendingMedia;
		setText("");
		setPendingMedia(null);
		const { error } = await supabase.from("community_messages").insert({
			community_id: community.id,
			user_id: userId,
			body: body || null,
			media_url: media?.url ?? null,
			media_type: media?.type ?? null
		});
		setSending(false);
		if (error) {
			toast.error(error.message);
			setText(body);
			setPendingMedia(media);
			return;
		}
		qc.invalidateQueries({ queryKey: ["community-chat", slug] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 max-w-[480px] mx-auto flex flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "px-3 py-3 flex items-center gap-3 border-b border-border bg-card shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => navigate({ to: "/comunidades" }),
						className: "size-9 grid place-items-center rounded-full hover:bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-10 rounded-full bg-gradient-to-br from-primary/30 to-accent grid place-items-center text-xl overflow-hidden",
						children: community.cover_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: community.cover_url,
							alt: "",
							className: "w-full h-full object-cover"
						}) : community.emoji ?? "🐾"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-brand truncate",
							children: [
								community.emoji,
								" ",
								community.name
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted-foreground flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3" }),
								" ",
								community.community_members.length,
								" membros"
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollRef,
				className: "flex-1 overflow-y-auto px-3 py-4 space-y-2 nuppy-bg min-h-0",
				children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center text-sm text-muted-foreground py-10",
					children: "Ainda sem mensagens. Diga oi para a comunidade! 👋"
				}) : messages.map((m) => {
					const mine = m.user_id === userId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex " + (mine ? "justify-end" : "justify-start"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[78%] rounded-2xl px-2 py-2 shadow-soft " + (mine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card text-foreground rounded-bl-sm"),
							children: [
								!mine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] font-display text-brand mb-0.5 px-1",
									children: ["@", m.author?.username ?? "user"]
								}),
								m.media_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setLightbox({
										url: m.media_url,
										type: m.media_type ?? "image"
									}),
									className: "block overflow-hidden rounded-xl mb-1",
									children: m.media_type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
										src: m.media_url,
										className: "max-h-64 w-auto",
										controls: true,
										playsInline: true,
										preload: "metadata"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: m.media_url,
										alt: "",
										className: "max-h-64 w-auto object-cover",
										loading: "lazy"
									})
								}),
								m.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm whitespace-pre-wrap break-words px-1",
									children: m.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] mt-1 px-1 " + (mine ? "text-primary-foreground/70" : "text-muted-foreground"),
									children: new Date(m.created_at).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit"
									})
								})
							]
						})
					}, m.id);
				})
			}),
			isMember ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: send,
				className: "border-t border-border bg-card shrink-0",
				children: [
					pendingMedia && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2 border-b border-border flex items-center gap-2 bg-muted/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-14 rounded-lg overflow-hidden bg-black shrink-0 grid place-items-center",
								children: pendingMedia.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
									src: pendingMedia.url,
									className: "w-full h-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: pendingMedia.url,
									alt: "",
									className: "w-full h-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground flex-1",
								children: [pendingMedia.type === "video" ? "Vídeo" : "Imagem", " pronto para enviar"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPendingMedia(null),
								className: "size-8 grid place-items-center rounded-full hover:bg-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: uploading,
								onClick: () => fileRef.current?.click(),
								className: "size-10 grid place-items-center rounded-full bg-muted text-brand shrink-0 disabled:opacity-50",
								title: "Enviar mídia",
								children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/*,video/*",
								className: "hidden",
								onChange: pickFile
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: text,
								onChange: (e) => setText(e.target.value),
								placeholder: "Mensagem",
								className: "flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: sending || !text.trim() && !pendingMedia,
								className: "size-10 grid place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 pb-2 -mt-1 flex gap-3 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-3" }), " Foto até 8MB"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-3" }), " Vídeo até 50MB"]
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3 border-t border-border bg-card shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: join,
					className: "nuppy-btn-primary",
					children: "Entrar na comunidade para conversar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/comunidades",
					className: "block text-center text-xs text-muted-foreground mt-2",
					children: "Voltar"
				})]
			}),
			lightbox && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 bg-black/90 grid place-items-center p-4",
				onClick: () => setLightbox(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setLightbox(null),
					className: "absolute top-4 right-4 size-10 grid place-items-center rounded-full bg-white/10 text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				}), lightbox.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: lightbox.url,
					className: "max-h-full max-w-full",
					controls: true,
					autoPlay: true,
					playsInline: true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: lightbox.url,
					alt: "",
					className: "max-h-full max-w-full object-contain"
				})]
			})
		]
	});
}
//#endregion
export { ChatPage as component };
