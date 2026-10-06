import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, o as useQueryClient, r as useSuspenseQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useParams, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ChevronRight, C as Phone, M as Map$1, N as MapPin, c as Trash2, d as Star, et as ChevronLeft, h as Share2 } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estabelecimento._id-BUaqx7ps.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CAT_EMOJI = {
	ONG: "🐾",
	Banho: "🛁",
	Hotel: "🏨",
	Alimentação: "🍖",
	Veterinário: "🩺",
	"Pet Shop": "🛍️",
	Parque: "🌳",
	"Café Pet": "☕",
	Adestrador: "🦮"
};
var placeKey = (id) => ["place", id];
var reviewsKey = (id) => ["place-reviews", id];
function placeQuery(id) {
	return {
		queryKey: placeKey(id),
		queryFn: async () => {
			const [placeRes, photosRes] = await Promise.all([supabase.from("places").select("id,name,category,description,address,city,phone,photo_url,lat,lng,services").eq("id", id).maybeSingle(), supabase.from("place_photos").select("id,url,position").eq("place_id", id).order("position", { ascending: true })]);
			if (placeRes.error) throw placeRes.error;
			if (!placeRes.data) throw new Error("Estabelecimento não encontrado");
			const extras = photosRes.data ?? [];
			return {
				...placeRes.data,
				services: placeRes.data.services ?? [],
				gallery: extras
			};
		}
	};
}
function reviewsQuery(id) {
	return {
		queryKey: reviewsKey(id),
		queryFn: async () => {
			const { data: reviews, error } = await supabase.from("place_reviews").select("id,user_id,rating,comment,created_at,updated_at").eq("place_id", id).order("created_at", { ascending: false });
			if (error) throw error;
			const list = reviews ?? [];
			if (list.length === 0) return [];
			const ids = Array.from(new Set(list.map((r) => r.user_id)));
			const { data: profs } = await supabase.from("profiles").select("id,display_name,username,avatar_url").in("id", ids);
			const map = new Map((profs ?? []).map((p) => [p.id, p]));
			return list.map((r) => ({
				...r,
				author: map.get(r.user_id) ?? null
			}));
		}
	};
}
function EstabDetail() {
	const { id } = useParams({ from: "/_authenticated/estabelecimento/$id" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-10 text-center text-muted-foreground",
			children: "Carregando..."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { id })
	}) });
}
function Body({ id }) {
	const { data: p } = useSuspenseQuery(placeQuery(id));
	const photos = (0, import_react.useMemo)(() => {
		const arr = [];
		if (p.photo_url) arr.push(p.photo_url);
		for (const g of p.gallery) if (g.url) arr.push(g.url);
		return arr;
	}, [p]);
	async function share() {
		const url = window.location.href;
		if (navigator.share) try {
			await navigator.share({
				title: p.name,
				text: p.description ?? "",
				url
			});
			return;
		} catch {}
		await navigator.clipboard.writeText(url);
		toast.success("Link copiado!");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoCarousel, {
				photos,
				fallbackEmoji: CAT_EMOJI[p.category] ?? "🐾"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/estabelecimentos",
				className: "fixed top-4 left-4 z-20 size-10 grid place-items-center rounded-full bg-card/90 backdrop-blur shadow-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: share,
				className: "fixed top-4 right-4 z-20 size-10 grid place-items-center rounded-full bg-card/90 backdrop-blur shadow-soft",
				"aria-label": "Compartilhar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4 text-brand" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 -mt-6 relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nuppy-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-block rounded-full bg-accent text-brand text-[11px] font-display px-3 py-1 uppercase tracking-wide",
								children: [
									CAT_EMOJI[p.category] ?? "📍",
									" ",
									p.category
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingBadge, { placeId: id })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl text-brand mt-2 uppercase",
							children: p.name
						}),
						(p.address || p.city) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground flex items-center gap-1 mt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
								" ",
								[p.address, p.city].filter(Boolean).join(" — ")
							]
						}),
						p.services && p.services.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-display uppercase text-muted-foreground tracking-wide mb-2",
								children: "Serviços oferecidos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: p.services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-display bg-accent text-brand rounded-full px-3 py-1",
									children: s
								}, s))
							})]
						}),
						p.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-display uppercase text-muted-foreground tracking-wide mb-1",
								children: "Sobre"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-foreground/80 leading-relaxed",
								children: p.description
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 mt-5",
							children: [p.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${p.phone}`,
								className: "rounded-full bg-accent text-brand py-2.5 text-sm font-display inline-flex items-center justify-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), " Ligar"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`,
								target: "_blank",
								rel: "noreferrer",
								className: `rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-display inline-flex items-center justify-center gap-1 ${p.phone ? "" : "col-span-2"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map$1, { className: "size-4" }), " Como chegar"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6 text-center text-muted-foreground text-sm",
						children: "Carregando avaliações..."
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewsSection, { placeId: id })
				})
			})
		]
	});
}
function PhotoCarousel({ photos, fallbackEmoji }) {
	const scrollerRef = (0, import_react.useRef)(null);
	const [idx, setIdx] = (0, import_react.useState)(0);
	if (photos.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative h-64 bg-accent grid place-items-center text-7xl",
		children: fallbackEmoji
	});
	function goTo(next) {
		const el = scrollerRef.current;
		if (!el) return;
		const clamped = Math.max(0, Math.min(photos.length - 1, next));
		el.scrollTo({
			left: clamped * el.clientWidth,
			behavior: "smooth"
		});
		setIdx(clamped);
	}
	function onScroll() {
		const el = scrollerRef.current;
		if (!el) return;
		const i = Math.round(el.scrollLeft / el.clientWidth);
		if (i !== idx) setIdx(i);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-64 bg-accent overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: scrollerRef,
			onScroll,
			className: "h-full w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none",
			children: photos.map((url, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 w-full h-full snap-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: url,
					alt: `Foto ${i + 1}`,
					className: "w-full h-full object-cover"
				})
			}, i))
		}), photos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => goTo(idx - 1),
				className: "absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-card/80 backdrop-blur grid place-items-center shadow-soft",
				"aria-label": "Foto anterior",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4 text-brand" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => goTo(idx + 1),
				className: "absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-card/80 backdrop-blur grid place-items-center shadow-soft",
				"aria-label": "Próxima foto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-brand" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5",
				children: photos.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => goTo(i),
					className: `h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-1.5 bg-card/70"}`,
					"aria-label": `Ir para foto ${i + 1}`
				}, i))
			})
		] })]
	});
}
function RatingBadge({ placeId }) {
	const { data } = useSuspenseQuery(reviewsQuery(placeId));
	if (!data || data.length === 0) return null;
	const avg = data.reduce((s, r) => s + r.rating, 0) / data.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded-full bg-primary/10 text-brand text-xs font-display px-2.5 py-1 flex items-center gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-primary text-primary" }),
			avg.toFixed(1),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted-foreground",
				children: [
					"(",
					data.length,
					")"
				]
			})
		]
	});
}
function ReviewsSection({ placeId }) {
	const qc = useQueryClient();
	const { data: reviews } = useSuspenseQuery(reviewsQuery(placeId));
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
	}, []);
	const mine = reviews.find((r) => r.user_id === userId) ?? null;
	const stats = (0, import_react.useMemo)(() => {
		const n = reviews.length;
		const sum = reviews.reduce((s, r) => s + r.rating, 0);
		const avg = n ? sum / n : 0;
		const dist = [
			0,
			0,
			0,
			0,
			0
		];
		for (const r of reviews) dist[r.rating - 1]++;
		return {
			n,
			avg,
			dist
		};
	}, [reviews]);
	const [rating, setRating] = (0, import_react.useState)(mine?.rating ?? 0);
	const [comment, setComment] = (0, import_react.useState)(mine?.comment ?? "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setRating(mine?.rating ?? 0);
		setComment(mine?.comment ?? "");
	}, [
		mine?.id,
		mine?.rating,
		mine?.comment
	]);
	async function submit(e) {
		e.preventDefault();
		if (!userId) return toast.error("Faça login para avaliar");
		if (rating < 1) return toast.error("Escolha uma nota de 1 a 5 estrelas");
		setSaving(true);
		try {
			const { error } = await supabase.from("place_reviews").upsert({
				place_id: placeId,
				user_id: userId,
				rating,
				comment: comment.trim() || null
			}, { onConflict: "place_id,user_id" });
			if (error) throw error;
			toast.success(mine ? "Avaliação atualizada!" : "Obrigado pela sua avaliação!");
			qc.invalidateQueries({ queryKey: reviewsKey(placeId) });
			qc.invalidateQueries({ queryKey: ["places", "list-with-ratings"] });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao salvar");
		} finally {
			setSaving(false);
		}
	}
	async function removeMine() {
		if (!mine) return;
		if (!confirm("Remover sua avaliação?")) return;
		const { error } = await supabase.from("place_reviews").delete().eq("id", mine.id);
		if (error) return toast.error(error.message);
		toast.success("Avaliação removida");
		qc.invalidateQueries({ queryKey: reviewsKey(placeId) });
		qc.invalidateQueries({ queryKey: ["places", "list-with-ratings"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-brand text-lg uppercase tracking-wide",
				children: "Avaliações"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nuppy-card p-5 flex gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-4xl text-brand",
							children: stats.avg.toFixed(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarsRow, { value: Math.round(stats.avg) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted-foreground mt-1",
							children: [
								stats.n,
								" ",
								stats.n === 1 ? "avaliação" : "avaliações"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 space-y-1",
					children: [
						5,
						4,
						3,
						2,
						1
					].map((s) => {
						const count = stats.dist[s - 1];
						const pct = stats.n ? count / stats.n * 100 : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[11px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-3 text-muted-foreground",
									children: s
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-primary text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-primary",
										style: { width: `${pct}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-5 text-right text-muted-foreground",
									children: count
								})
							]
						}, s);
					})
				})]
			}),
			userId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "nuppy-card p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-brand text-sm",
							children: mine ? "Sua avaliação" : "Escreva sua avaliação"
						}), mine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: removeMine,
							className: "text-xs text-muted-foreground hover:text-red-500 inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" }), " Remover"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1.5",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRating(n),
							"aria-label": `${n} estrela${n > 1 ? "s" : ""}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-8 transition ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary/50"}` })
						}, n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: comment,
						onChange: (e) => setComment(e.target.value),
						placeholder: "Conte como foi sua experiência...",
						rows: 3,
						maxLength: 500,
						className: "w-full rounded-2xl border border-border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: saving,
						className: "nuppy-btn-primary disabled:opacity-60",
						children: saving ? "Salvando..." : mine ? "Atualizar avaliação" : "Enviar avaliação"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [reviews.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nuppy-card p-6 text-center text-muted-foreground text-sm",
					children: "Ainda não há avaliações. Seja o primeiro!"
				}), reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nuppy-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-9 rounded-full bg-accent grid place-items-center overflow-hidden shrink-0",
								children: r.author?.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: r.author.avatar_url,
									alt: "",
									className: "w-full h-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-brand font-display text-sm",
									children: (r.author?.display_name ?? r.author?.username ?? "?")[0]?.toUpperCase()
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-sm text-brand truncate",
									children: r.author?.display_name ?? r.author?.username ?? "Usuário"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarsRow, {
									value: r.rating,
									small: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground shrink-0",
								children: new Date(r.created_at).toLocaleDateString("pt-BR")
							})
						]
					}), r.comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-foreground/80 mt-2 leading-relaxed",
						children: r.comment
					})]
				}, r.id))]
			})
		]
	});
}
function StarsRow({ value, small = false }) {
	const size = small ? "size-3" : "size-4";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-0.5 justify-center",
		children: [
			1,
			2,
			3,
			4,
			5
		].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `${size} ${n <= value ? "fill-primary text-primary" : "text-muted-foreground/40"}` }, n))
	});
}
//#endregion
export { EstabDetail as component };
