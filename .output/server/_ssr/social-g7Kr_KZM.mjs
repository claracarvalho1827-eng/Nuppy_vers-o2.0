import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, i as useQuery, n as useMutation, o as useQueryClient, s as require_react, t as useInfiniteQuery } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { R as LoaderCircle, S as Plus, U as Heart, Y as Ellipsis, _ as Send, at as Bookmark, c as Trash2, et as ChevronLeft, f as Sparkles, h as Share2, i as Video, j as MessageCircle, n as VolumeX, nt as Camera, r as Volume2, t as X } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
import { n as uploadMedia } from "./upload-CsuYq30c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/social-g7Kr_KZM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommentsSheet({ postId, onClose }) {
	const qc = useQueryClient();
	const [userId, setUserId] = (0, import_react.useState)(null);
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
	}, []);
	const { data: comments = [] } = useQuery({
		queryKey: ["comments", postId],
		queryFn: async () => {
			const { data, error } = await supabase.from("post_comments").select("id, body, user_id, created_at").eq("post_id", postId).order("created_at", { ascending: true });
			if (error) throw error;
			const rows = data ?? [];
			const ids = Array.from(new Set(rows.map((r) => r.user_id)));
			if (!ids.length) return rows;
			const { data: profs } = await supabase.from("profiles").select("id, username, avatar_url").in("id", ids);
			const map = /* @__PURE__ */ new Map();
			(profs ?? []).forEach((p) => map.set(p.id, {
				username: p.username,
				avatar_url: p.avatar_url
			}));
			return rows.map((r) => ({
				...r,
				author: map.get(r.user_id) ?? null
			}));
		}
	});
	async function send(e) {
		e.preventDefault();
		if (!text.trim() || !userId) return;
		setBusy(true);
		const body = text.trim();
		setText("");
		const { error } = await supabase.from("post_comments").insert({
			post_id: postId,
			user_id: userId,
			body
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			setText(body);
			return;
		}
		qc.invalidateQueries({ queryKey: ["comments", postId] });
		qc.invalidateQueries({ queryKey: ["feed"] });
	}
	async function remove(id) {
		const { error } = await supabase.from("post_comments").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
			return;
		}
		qc.invalidateQueries({ queryKey: ["comments", postId] });
		qc.invalidateQueries({ queryKey: ["feed"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-black/60 flex flex-col justify-end",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "bg-card rounded-t-3xl max-h-[80vh] flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-3 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-brand",
						children: "Comentários"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "size-8 grid place-items-center rounded-full hover:bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4 text-brand" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-4 py-3 space-y-3",
					children: comments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-muted-foreground py-8",
						children: "Seja o primeiro a comentar 💬"
					}) : comments.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-8 rounded-full bg-muted overflow-hidden shrink-0 grid place-items-center",
								children: c.author?.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.author.avatar_url,
									alt: "",
									className: "w-full h-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: "🐾"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-display text-brand",
									children: ["@", c.author?.username ?? "user"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm break-words",
									children: c.body
								})]
							}),
							c.user_id === userId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => remove(c.id),
								className: "text-muted-foreground hover:text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: send,
					className: "flex items-center gap-2 p-3 border-t border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: text,
						onChange: (e) => setText(e.target.value),
						placeholder: "Adicione um comentário...",
						className: "flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy || !text.trim(),
						className: "size-10 grid place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-5" })
					})]
				})
			]
		})
	});
}
var PAGE_SIZE = 10;
var MAX_IMAGE_MB = 8;
var MAX_VIDEO_MB = 50;
var LS_BOOKMARKS = "nuppy:bookmarks";
var LS_MUTED = "nuppy:videoMuted";
function SocialPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MobileShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-20 bg-background/85 backdrop-blur-xl px-4 py-3 flex items-center justify-between border-b border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/home",
				className: "size-9 grid place-items-center rounded-full hover:bg-accent transition",
				"aria-label": "Voltar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-lg text-brand tracking-tight",
					children: "Feed"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewPostButton, {})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedSkeleton, {}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feed, {})
	})] });
}
/** Placeholder cinza animado mostrado enquanto o feed busca dados. */
function FeedSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "divide-y divide-border",
		children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-3 animate-pulse",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-10 rounded-full bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-24 bg-muted rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-16 bg-muted/60 rounded" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[4/5] bg-muted rounded-2xl" })]
		}, i))
	});
}
function Feed() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ["feed"],
		initialPageParam: null,
		queryFn: async ({ pageParam }) => {
			let q = supabase.from("posts").select("id, author_id, media_url, media_type, caption, hashtags, created_at, profiles(username, avatar_url), likes(user_id), post_comments(id)").order("created_at", { ascending: false }).limit(PAGE_SIZE);
			if (pageParam) q = q.lt("created_at", pageParam);
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		},
		getNextPageParam: (last) => last.length === PAGE_SIZE ? last[last.length - 1].created_at : void 0
	});
	const posts = (0, import_react.useMemo)(() => data?.pages.flatMap((p) => p) ?? [], [data]);
	const sentinel = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!sentinel.current || !hasNextPage) return;
		const obs = new IntersectionObserver((entries) => entries[0].isIntersecting && fetchNextPage(), { rootMargin: "400px" });
		obs.observe(sentinel.current);
		return () => obs.disconnect();
	}, [hasNextPage, fetchNextPage]);
	if (posts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-7xl mb-4",
				children: "📸"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-brand text-xl",
				children: "O feed está esperando você"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground mt-2 max-w-xs mx-auto",
				children: [
					"Toque no ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "+" }),
					" no topo para publicar a primeira foto ou vídeo do seu pet."
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "divide-y divide-border",
		children: [posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post: p }, p.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: sentinel,
			className: "py-6 text-center",
			children: [isFetchingNextPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-muted-foreground mx-auto" }), !hasNextPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Você chegou ao fim 🐾"
			})]
		})]
	});
}
function PostCard({ post }) {
	const qc = useQueryClient();
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
	}, []);
	const [showComments, setShowComments] = (0, import_react.useState)(false);
	const [showMenu, setShowMenu] = (0, import_react.useState)(false);
	const [heartBurst, setHeartBurst] = (0, import_react.useState)(false);
	const [bookmarked, setBookmarked] = (0, import_react.useState)(() => isBookmarked(post.id));
	const liked = !!userId && post.likes.some((l) => l.user_id === userId);
	const likeCount = post.likes.length;
	const commentCount = post.post_comments?.length ?? 0;
	const isVideo = post.media_type === "video";
	const isOwner = userId === post.author_id;
	const toggleLike = useMutation({
		mutationFn: async () => {
			if (!userId) return;
			if (liked) await supabase.from("likes").delete().eq("user_id", userId).eq("post_id", post.id);
			else await supabase.from("likes").insert({
				user_id: userId,
				post_id: post.id
			});
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["feed"] })
	});
	const removePost = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("posts").delete().eq("id", post.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Post excluído");
			qc.invalidateQueries({ queryKey: ["feed"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const handleDoubleTap = useDoubleTap(() => {
		if (!liked) toggleLike.mutate();
		setHeartBurst(true);
		window.setTimeout(() => setHeartBurst(false), 700);
	});
	async function share() {
		const url = `${window.location.origin}/social#post-${post.id}`;
		const text = post.caption ? `${post.caption}\n— @${post.profiles?.username ?? "nuppy"} no Nuppy` : `Veja este ${isVideo ? "vídeo" : "post"} de @${post.profiles?.username ?? "nuppy"} no Nuppy 🐾`;
		try {
			if (navigator.share) await navigator.share({
				title: "Nuppy",
				text,
				url
			});
			else {
				await navigator.clipboard.writeText(`${text}\n${url}`);
				toast.success("Link copiado!");
			}
		} catch {}
	}
	function toggleBookmark() {
		const next = !bookmarked;
		setBookmarked(next);
		saveBookmark(post.id, next);
		toast.success(next ? "Salvo nos favoritos" : "Removido dos favoritos");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: `post-${post.id}`,
		className: "bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 overflow-hidden grid place-items-center ring-2 ring-primary/20",
						children: post.profiles?.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: post.profiles.avatar_url,
							alt: "",
							className: "w-full h-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg",
							children: "🐾"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-sm text-brand truncate",
							children: ["@", post.profiles?.username ?? "user"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: formatTimeAgo(post.created_at)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowMenu((v) => !v),
							className: "size-9 grid place-items-center rounded-full hover:bg-accent",
							"aria-label": "Mais opções",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-5 text-muted-foreground" })
						}), showMenu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onMouseLeave: () => setShowMenu(false),
							className: "absolute right-0 top-10 z-10 w-44 rounded-2xl border border-border bg-popover shadow-lg overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setShowMenu(false);
									share();
								},
								className: "w-full px-4 py-2.5 text-sm text-left hover:bg-accent flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), " Compartilhar"]
							}), isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setShowMenu(false);
									if (confirm("Excluir este post?")) removePost.mutate();
								},
								className: "w-full px-4 py-2.5 text-sm text-left hover:bg-accent flex items-center gap-2 text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Excluir"]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative bg-black overflow-hidden",
				onClick: handleDoubleTap,
				children: [isVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartVideo, { src: post.media_url }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: post.media_url,
					alt: post.caption ?? "Post",
					className: "w-full aspect-[4/5] object-cover",
					loading: "lazy"
				}), heartBurst && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 grid place-items-center pointer-events-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-28 text-white drop-shadow-2xl fill-love animate-heart-pop" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 px-2 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
						onClick: () => toggleLike.mutate(),
						active: liked,
						label: "Curtir",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-6 " + (liked ? "fill-love text-love" : "") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
						onClick: () => setShowComments(true),
						label: "Comentar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
						onClick: share,
						label: "Compartilhar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
						onClick: toggleBookmark,
						active: bookmarked,
						label: "Salvar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-6 " + (bookmarked ? "fill-current" : "") })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pb-4 space-y-1",
				children: [
					likeCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-display text-brand",
						children: [
							likeCount,
							" ",
							likeCount === 1 ? "curtida" : "curtidas"
						]
					}),
					post.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-brand mr-1.5",
							children: ["@", post.profiles?.username ?? "user"]
						}), post.caption]
					}),
					post.hashtags && post.hashtags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-primary flex flex-wrap gap-x-2",
						children: post.hashtags.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["#", h] }, h))
					}),
					commentCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowComments(true),
						className: "text-xs text-muted-foreground hover:text-foreground",
						children: [
							"Ver todos os ",
							commentCount,
							" comentários"
						]
					})
				]
			}),
			showComments && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentsSheet, {
				postId: post.id,
				onClose: () => setShowComments(false)
			})
		]
	});
}
function ActionButton({ onClick, active, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		"aria-label": label,
		className: "size-11 grid place-items-center rounded-full hover:bg-accent transition active:scale-90 " + (active ? "text-foreground" : "text-foreground/80"),
		children
	});
}
/**
* Toca o vídeo automaticamente APENAS quando ele está visível na tela
* (usando IntersectionObserver). Quando sai da viewport, pausa para
* economizar bateria e dados móveis. Tem botão de mute persistido.
*/
function SmartVideo({ src }) {
	const ref = (0, import_react.useRef)(null);
	const [muted, setMuted] = (0, import_react.useState)(() => localStorage.getItem(LS_MUTED) !== "false");
	(0, import_react.useEffect)(() => {
		localStorage.setItem(LS_MUTED, muted ? "true" : "false");
	}, [muted]);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(([entry]) => {
			if (entry.intersectionRatio > .6) el.play().catch(() => {});
			else el.pause();
		}, { threshold: [
			0,
			.6,
			1
		] });
		obs.observe(el);
		return () => obs.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref,
			src,
			muted,
			loop: true,
			playsInline: true,
			preload: "metadata",
			className: "w-full aspect-[4/5] object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: (e) => {
				e.stopPropagation();
				setMuted((m) => !m);
			},
			className: "absolute bottom-3 right-3 size-9 grid place-items-center rounded-full bg-black/50 text-white backdrop-blur",
			"aria-label": muted ? "Ativar som" : "Silenciar",
			children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
		})]
	});
}
function NewPostButton() {
	const qc = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [mediaUrl, setMediaUrl] = (0, import_react.useState)("");
	const [mediaType, setMediaType] = (0, import_react.useState)("image");
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [caption, setCaption] = (0, import_react.useState)("");
	const [tags, setTags] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	/** Reseta tudo (usado após publicar ou cancelar). */
	function resetForm() {
		setMediaUrl("");
		setMediaType("image");
		setCaption("");
		setTags("");
	}
	/** Faz o upload do arquivo escolhido para o bucket post-media. */
	async function pickFile(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		const isVid = file.type.startsWith("video/");
		const limit = isVid ? MAX_VIDEO_MB : MAX_IMAGE_MB;
		if (file.size > limit * 1024 * 1024) {
			toast.error(`${isVid ? "Vídeo" : "Imagem"} máx ${limit}MB`);
			return;
		}
		setUploading(true);
		try {
			setMediaUrl(await uploadMedia("post-media", file));
			setMediaType(isVid ? "video" : "image");
			toast.success(isVid ? "Vídeo enviado!" : "Foto enviada!");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro no upload");
		} finally {
			setUploading(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	}
	/** Cria o post no banco. */
	async function submit(e) {
		e.preventDefault();
		if (!mediaUrl) {
			toast.error("Envie uma foto ou vídeo");
			return;
		}
		setBusy(true);
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) throw new Error("Faça login");
			const hashtags = tags.split(/[\s,#]+/).map((t) => t.trim().toLowerCase()).filter(Boolean);
			const { error } = await supabase.from("posts").insert({
				author_id: user.id,
				media_url: mediaUrl,
				caption,
				hashtags,
				media_type: mediaType
			});
			if (error) throw error;
			toast.success("Post publicado!");
			setOpen(false);
			resetForm();
			qc.invalidateQueries({ queryKey: ["feed"] });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => setOpen(true),
		className: "size-9 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg transition",
		"aria-label": "Novo post",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-end sm:place-items-center",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onClick: (e) => e.stopPropagation(),
			onSubmit: submit,
			className: "w-full max-w-[480px] bg-card rounded-t-3xl sm:rounded-3xl p-6 space-y-4 max-h-[92vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl text-brand",
					children: "Novo post"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Compartilhe um momento do seu pet 🐾"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => fileRef.current?.click(),
					className: "w-full aspect-[4/5] max-h-[320px] rounded-2xl border-2 border-dashed border-border bg-muted overflow-hidden grid place-items-center relative",
					children: [mediaUrl ? mediaType === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: mediaUrl,
						className: "w-full h-full object-cover",
						controls: true,
						playsInline: true
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mediaUrl,
						alt: "",
						className: "w-full h-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-2 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-7" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-display",
								children: "Enviar foto ou vídeo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs",
								children: [
									"imagem até ",
									MAX_IMAGE_MB,
									"MB • vídeo até ",
									MAX_VIDEO_MB,
									"MB"
								]
							})
						]
					}), uploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center bg-black/40 text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "image/*,video/*",
					className: "hidden",
					onChange: pickFile
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "w-full rounded-2xl border border-border bg-card p-3 text-sm resize-none",
					rows: 3,
					maxLength: 500,
					placeholder: "Escreva uma legenda...",
					value: caption,
					onChange: (e) => setCaption(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-muted-foreground -mt-2 text-right",
					children: [caption.length, "/500"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nuppy-input pl-4",
					placeholder: "hashtags (parque, vidapet)",
					value: tags,
					onChange: (e) => setTags(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy || uploading,
					className: "nuppy-btn-primary",
					children: busy ? "Publicando..." : "Publicar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setOpen(false);
						resetForm();
					},
					className: "nuppy-btn-ghost",
					children: "Cancelar"
				})
			]
		})
	})] });
}
/** "há 2 min", "há 3 h", "há 5 d" — formato pt-BR relativo. */
function formatTimeAgo(iso) {
	const diff = Date.now() - new Date(iso).getTime();
	const m = Math.floor(diff / 6e4);
	if (m < 1) return "agora";
	if (m < 60) return `há ${m} min`;
	const h = Math.floor(m / 60);
	if (h < 24) return `há ${h} h`;
	const d = Math.floor(h / 24);
	if (d < 7) return `há ${d} d`;
	return new Date(iso).toLocaleDateString("pt-BR");
}
/** Hook que detecta duplo-toque/clique e chama o callback. */
function useDoubleTap(cb, delay = 280) {
	const last = (0, import_react.useRef)(0);
	return (0, import_react.useCallback)(() => {
		const now = Date.now();
		if (now - last.current < delay) {
			cb();
			last.current = 0;
		} else last.current = now;
	}, [cb, delay]);
}
function readBookmarks() {
	try {
		return JSON.parse(localStorage.getItem(LS_BOOKMARKS) ?? "[]");
	} catch {
		return [];
	}
}
function isBookmarked(id) {
	return readBookmarks().includes(id);
}
function saveBookmark(id, on) {
	const cur = new Set(readBookmarks());
	if (on) cur.add(id);
	else cur.delete(id);
	localStorage.setItem(LS_BOOKMARKS, JSON.stringify([...cur]));
}
//#endregion
export { SocialPage as component };
