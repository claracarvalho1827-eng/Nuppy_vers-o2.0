import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_jsx_runtime, r as useSuspenseQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Phone, L as Locate, M as Map, N as MapPin, O as Navigation, et as ChevronLeft, t as X, v as Search, z as List } from "../_libs/lucide-react.mjs";
import { t as MobileShell } from "./MobileShell-Bd3RfVpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/local-PDvMEJHm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var placesQuery = {
	queryKey: ["places"],
	queryFn: async () => {
		const { data, error } = await supabase.from("places").select("id,name,category,description,address,city,lat,lng,phone,photo_url").order("name");
		if (error) throw error;
		return data ?? [];
	}
};
var CAT_EMOJI = {
	"ONG": "🐾",
	"Banho": "🛁",
	"Hotel": "🏨",
	"Alimentação": "🍖",
	"Veterinário": "🩺",
	"Pet Shop": "🛍️",
	"Parque": "🌳",
	"Café Pet": "☕",
	"Adestrador": "🦮"
};
function LocalPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileShell, {
		hideNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 text-center text-muted-foreground",
				children: "Carregando mapa..."
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapBody, {})
		})
	});
}
function haversineKm(a, b) {
	const R = 6371;
	const dLat = (b.lat - a.lat) * Math.PI / 180;
	const dLng = (b.lng - a.lng) * Math.PI / 180;
	const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
	return 2 * R * Math.asin(Math.sqrt(s));
}
function MapBody() {
	const { data: places } = useSuspenseQuery(placesQuery);
	const mapRef = (0, import_react.useRef)(null);
	const mapInstance = (0, import_react.useRef)(null);
	const markersRef = (0, import_react.useRef)([]);
	const userMarkerRef = (0, import_react.useRef)(null);
	const infoRef = (0, import_react.useRef)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [activeCat, setActiveCat] = (0, import_react.useState)("Todos");
	const [search, setSearch] = (0, import_react.useState)("");
	const [userPos, setUserPos] = (0, import_react.useState)(null);
	const [view, setView] = (0, import_react.useState)("map");
	const categories = (0, import_react.useMemo)(() => ["Todos", ...Array.from(new Set(places.map((p) => p.category)))], [places]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		const list = places.filter((p) => {
			if (activeCat !== "Todos" && p.category !== activeCat) return false;
			if (q && !`${p.name} ${p.address ?? ""} ${p.city ?? ""}`.toLowerCase().includes(q)) return false;
			return true;
		});
		if (userPos) return [...list].sort((a, b) => haversineKm(userPos, a) - haversineKm(userPos, b));
		return list;
	}, [
		places,
		activeCat,
		search,
		userPos
	]);
	(0, import_react.useEffect)(() => {
		if (window.google?.maps) {
			setReady(true);
			return;
		}
		if (document.querySelector("script[data-nuppy-gmaps]")) {
			window.__nuppyInitMap = () => setReady(true);
			return;
		}
		const key = void 0;
		const channel = void 0;
		window.__nuppyInitMap = () => setReady(true);
		const s = document.createElement("script");
		s.dataset.nuppyGmaps = "1";
		s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__nuppyInitMap&channel=${channel}`;
		s.async = true;
		document.head.appendChild(s);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready || !mapRef.current || mapInstance.current) return;
		mapInstance.current = new window.google.maps.Map(mapRef.current, {
			center: {
				lat: -23.5505,
				lng: -46.6333
			},
			zoom: 12,
			disableDefaultUI: true,
			zoomControl: true,
			clickableIcons: false,
			gestureHandling: "greedy",
			styles: [{
				featureType: "poi.business",
				stylers: [{ visibility: "off" }]
			}, {
				featureType: "transit",
				stylers: [{ visibility: "off" }]
			}]
		});
		infoRef.current = new window.google.maps.InfoWindow();
		locateMe(false);
	}, [ready]);
	function locateMe(recenter = true) {
		if (!navigator.geolocation || !mapInstance.current) return;
		navigator.geolocation.getCurrentPosition((pos) => {
			const c = {
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			};
			setUserPos(c);
			if (recenter) {
				mapInstance.current?.panTo(c);
				mapInstance.current?.setZoom(14);
			}
			if (userMarkerRef.current) userMarkerRef.current.setPosition(c);
			else userMarkerRef.current = new window.google.maps.Marker({
				position: c,
				map: mapInstance.current,
				icon: {
					path: window.google.maps.SymbolPath.CIRCLE,
					scale: 9,
					fillColor: "#3b82f6",
					fillOpacity: 1,
					strokeColor: "#fff",
					strokeWeight: 3
				},
				title: "Você está aqui",
				zIndex: 999
			});
		}, () => {}, {
			timeout: 6e3,
			enableHighAccuracy: true
		});
	}
	(0, import_react.useEffect)(() => {
		if (!ready || !mapInstance.current) return;
		markersRef.current.forEach((m) => m.setMap(null));
		markersRef.current = filtered.map((p) => {
			const marker = new window.google.maps.Marker({
				position: {
					lat: p.lat,
					lng: p.lng
				},
				map: mapInstance.current,
				title: p.name,
				label: {
					text: CAT_EMOJI[p.category] ?? "🐾",
					fontSize: "22px"
				},
				animation: window.google.maps.Animation.DROP
			});
			marker.addListener("click", () => {
				setSelected(p);
				mapInstance.current?.panTo({
					lat: p.lat,
					lng: p.lng
				});
			});
			return marker;
		});
	}, [ready, filtered]);
	function openItem(p) {
		setSelected(p);
		setView("map");
		if (mapInstance.current) {
			mapInstance.current.panTo({
				lat: p.lat,
				lng: p.lng
			});
			mapInstance.current.setZoom(15);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 max-w-[480px] mx-auto bg-background flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "px-3 pt-3 pb-2 flex items-center gap-2 bg-card/90 backdrop-blur border-b border-border z-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/home",
						className: "size-9 grid place-items-center rounded-full hover:bg-accent shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 text-brand" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Buscar locais pet friendly...",
							className: "w-full rounded-full bg-muted border border-border pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex rounded-full bg-muted p-0.5 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setView("map"),
							className: `size-8 grid place-items-center rounded-full transition ${view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`,
							title: "Mapa",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setView("list"),
							className: `size-8 grid place-items-center rounded-full transition ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`,
							title: "Lista",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 py-2 bg-card/90 backdrop-blur border-b border-border z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto scrollbar-none",
					children: categories.map((c) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveCat(c),
							className: `shrink-0 rounded-full px-3 py-1.5 text-xs font-display border transition ${c === activeCat ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-background text-brand border-border hover:bg-accent"}`,
							children: c === "Todos" ? `🐾 Todos (${places.length})` : `${CAT_EMOJI[c] ?? "📍"} ${c}`
						}, c);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 min-h-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: mapRef,
						className: `absolute inset-0 bg-muted ${view === "map" ? "block" : "invisible"}`
					}),
					!ready && view === "map" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center text-muted-foreground pointer-events-none bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display animate-pulse",
							children: "Carregando Google Maps..."
						})
					}),
					view === "list" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 overflow-y-auto bg-background",
						children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-10 text-center text-muted-foreground",
							children: "Nenhum local encontrado."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border",
							children: filtered.map((p) => {
								const dist = userPos ? haversineKm(userPos, p) : null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => openItem(p),
									className: "w-full text-left p-3 flex gap-3 hover:bg-accent/40 active:bg-accent transition",
									children: [p.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.photo_url,
										alt: p.name,
										className: "size-16 rounded-xl object-cover shrink-0"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "size-16 rounded-xl bg-accent grid place-items-center text-3xl shrink-0",
										children: CAT_EMOJI[p.category] ?? "🐾"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] uppercase tracking-wide text-primary font-display",
												children: p.category
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-brand truncate",
												children: p.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground truncate",
												children: p.address ?? p.city ?? ""
											}),
											dist !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-primary font-display mt-0.5 flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "size-3" }),
													" ",
													dist < 1 ? `${Math.round(dist * 1e3)} m` : `${dist.toFixed(1)} km`
												]
											})
										]
									})]
								}) }, p.id);
							})
						})
					}),
					view === "map" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => locateMe(true),
						className: "absolute bottom-6 right-4 size-12 rounded-full bg-card shadow-lg grid place-items-center border border-border z-10",
						title: "Minha localização",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locate, { className: "size-5 text-primary" })
					}),
					view === "map" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-card/95 backdrop-blur shadow-soft border border-border px-3 py-1 text-xs font-display text-brand z-10",
						children: [
							filtered.length,
							" ",
							filtered.length === 1 ? "local" : "locais"
						]
					}),
					selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceDetail, {
						place: selected,
						userPos,
						onClose: () => {
							setSelected(null);
							infoRef.current?.close();
						}
					})
				]
			})
		]
	});
}
function PlaceDetail({ place, userPos, onClose }) {
	const dist = userPos ? haversineKm(userPos, place) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-x-3 bottom-4 z-20 nuppy-card p-4 shadow-2xl animate-in slide-in-from-bottom-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "absolute top-2 right-2 size-8 grid place-items-center rounded-full hover:bg-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [place.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: place.photo_url,
					alt: place.name,
					className: "size-20 rounded-xl object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-20 rounded-xl bg-accent grid place-items-center text-3xl",
					children: CAT_EMOJI[place.category] ?? "🐾"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0 pr-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-primary font-display uppercase tracking-wide",
							children: place.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-brand truncate",
							children: place.name
						}),
						place.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground truncate flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
								" ",
								place.address
							]
						}),
						dist !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-primary font-display mt-0.5",
							children: dist < 1 ? `${Math.round(dist * 1e3)} m de você` : `${dist.toFixed(1)} km de você`
						})
					]
				})]
			}),
			place.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-foreground/80 mt-2 line-clamp-3",
				children: place.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/estabelecimento/$id",
						params: { id: place.id },
						className: "flex-1 text-center rounded-full bg-accent text-brand py-2 text-sm font-display",
						children: "Detalhes"
					}),
					place.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `tel:${place.phone}`,
						className: "size-10 grid place-items-center rounded-full bg-accent text-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`,
						target: "_blank",
						rel: "noreferrer",
						className: "flex-1 text-center rounded-full bg-primary text-primary-foreground py-2 text-sm font-display inline-flex items-center justify-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "size-4" }), " Rotas"]
					})
				]
			})
		]
	});
}
//#endregion
export { LocalPage as component };
