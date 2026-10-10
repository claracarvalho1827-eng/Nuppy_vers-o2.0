/* ============================================================================
 *  PÁGINA: /local  —  MAPA DE ESTABELECIMENTOS PET FRIENDLY
 * ----------------------------------------------------------------------------
 *  Integra com Google Maps. Lê estabelecimentos da tabela `places`.
 *  Funcionalidades:
 *    • geolocalização do usuário (ponto azul)
 *    • marcadores customizados por categoria
 *    • alternar Mapa <-> Lista (com distância calculada via Haversine)
 *    • filtros por categoria e busca por nome
 *    • clique no marcador abre InfoWindow com "Como chegar"
 *
 *  ⚠️ Para adicionar novos lugares: só admins (via banco). Veja a migration
 *  que cria a função `has_role` e a policy de INSERT.
 * ========================================================================== */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, MapPin, Phone, X, List, Map as MapIcon, Locate, Search, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/_authenticated/local")({
  head: () => ({ meta: [{ title: "Mapa Pet Friendly — Nuppy" }] }),
  component: LocalPage,
});

type Place = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  address: string | null;
  city: string | null;
  lat: number;
  lng: number;
  phone: string | null;
  photo_url: string | null;
};

const placesQuery = {
  queryKey: ["places"],
  queryFn: async (): Promise<Place[]> => {
    const { data, error } = await supabase
      .from("places")
      .select("id,name,category,description,address,city,lat,lng,phone,photo_url")
      .order("name");
    if (error) throw error;
    return data ?? [];
  },
};
const CAT_EMOJI: Record<string, string> = {
  ONG: "",
  Banho: "",
  Hotel: "",
  Alimentação: "",
  Veterinário: "",
  "Pet Shop": "",
  Parque: "",
  "Café Pet": "",
  Adestrador: "",
};

declare global {
  interface Window {
    google?: any;
    __nuppyInitMap?: () => void;
  }
}

function LocalPage() {
  return (
    <MobileShell hideNav>
      <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Carregando mapa...</div>}>
        <MapBody />
      </Suspense>
    </MobileShell>
  );
}

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function MapBody() {
  const { data: places } = useSuspenseQuery(placesQuery);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const infoRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<Place | null>(null);
  const [activeCat, setActiveCat] = useState<string>("Todos");
  const [search, setSearch] = useState("");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [view, setView] = useState<"map" | "list">("map");

  const categories = useMemo(() => ["Todos", ...Array.from(new Set(places.map((p) => p.category)))], [places]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = places.filter((p) => {
      if (activeCat !== "Todos" && p.category !== activeCat) return false;
      if (q && !(`${p.name} ${p.address ?? ""} ${p.city ?? ""}`.toLowerCase().includes(q))) return false;
      return true;
    });
    if (userPos) {
      return [...list].sort(
        (a, b) => haversineKm(userPos, a) - haversineKm(userPos, b),
      );
    }
    return list;
  }, [places, activeCat, search, userPos]);

  // Load Google Maps script
  useEffect(() => {
    if (window.google?.maps) { setReady(true); return; }
    if (document.querySelector("script[data-nuppy-gmaps]")) {
      window.__nuppyInitMap = () => setReady(true);
      return;
    }
    const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
    window.__nuppyInitMap = () => setReady(true);
    const s = document.createElement("script");
    s.dataset.nuppyGmaps = "1";
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__nuppyInitMap&channel=${channel}`;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  // Init map
  useEffect(() => {
    if (!ready || !mapRef.current || mapInstance.current) return;
    const center = { lat: -23.5505, lng: -46.6333 };
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 12,
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
      gestureHandling: "greedy",
      styles: [
        { featureType: "poi.business", stylers: [{ visibility: "off" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
      ],
    });
    infoRef.current = new window.google.maps.InfoWindow();
    locateMe(false);
  }, [ready]);

  function locateMe(recenter = true) {
    if (!navigator.geolocation || !mapInstance.current) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(c);
        if (recenter) {
          mapInstance.current?.panTo(c);
          mapInstance.current?.setZoom(14);
        }
        if (userMarkerRef.current) userMarkerRef.current.setPosition(c);
        else {
          userMarkerRef.current = new window.google.maps.Marker({
            position: c,
            map: mapInstance.current,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: "#3b82f6",
              fillOpacity: 1,
              strokeColor: "#fff",
              strokeWeight: 3,
            },
            title: "Você está aqui",
            zIndex: 999,
          });
        }
      },
      () => {},
      { timeout: 6000, enableHighAccuracy: true },
    );
  }

  // Render markers
  useEffect(() => {
    if (!ready || !mapInstance.current) return;
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = filtered.map((p) => {
      const marker = new window.google.maps.Marker({
        position: { lat: p.lat, lng: p.lng },
        map: mapInstance.current!,
        title: p.name,
        label: { text: CAT_EMOJI[p.category] ?? "", fontSize: "22px" },
        animation: window.google.maps.Animation.DROP,
      });
      marker.addListener("click", () => {
        setSelected(p);
        mapInstance.current?.panTo({ lat: p.lat, lng: p.lng });
      });
      return marker;
    });
  }, [ready, filtered]);

  function openItem(p: Place) {
    setSelected(p);
    setView("map");
    if (mapInstance.current) {
      mapInstance.current.panTo({ lat: p.lat, lng: p.lng });
      mapInstance.current.setZoom(15);
    }
  }

  return (
    <div className="fixed inset-0 max-w-[480px] mx-auto bg-background flex flex-col">
      {/* Header */}
      <header className="px-3 pt-3 pb-2 flex items-center gap-2 bg-card/90 backdrop-blur border-b border-border z-20">
        <Link to="/home" className="size-9 grid place-items-center rounded-full hover:bg-accent shrink-0">
          <ChevronLeft className="size-5 text-brand" />
        </Link>
        <label className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar locais pet friendly..."
            className="w-full rounded-full bg-muted border border-border pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <div className="flex rounded-full bg-muted p-0.5 shrink-0">
          <button
            onClick={() => setView("map")}
            className={`size-8 grid place-items-center rounded-full transition ${view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            title="Mapa"
          >
            <MapIcon className="size-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`size-8 grid place-items-center rounded-full transition ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            title="Lista"
          >
            <List className="size-4" />
          </button>
        </div>
      </header>

      {/* Category chips */}
      <div className="px-3 py-2 bg-card/90 backdrop-blur border-b border-border z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {categories.map((c) => {
            const active = c === activeCat;
            return (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-display border transition ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background text-brand border-border hover:bg-accent"
                }`}
              >
                {c === "Todos" ? `Todos (${places.length})` : c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="relative flex-1 min-h-0">
        {/* Map always mounted to keep instance alive */}
        <div
          ref={mapRef}
          className={`absolute inset-0 bg-muted ${view === "map" ? "block" : "invisible"}`}
        />
        {!ready && view === "map" && (
          <div className="absolute inset-0 grid place-items-center text-muted-foreground pointer-events-none bg-muted">
            <div className="font-display animate-pulse">Carregando Google Maps...</div>
          </div>
        )}

        {view === "list" && (
          <div className="absolute inset-0 overflow-y-auto bg-background">
            {filtered.length === 0 ? (
              <div className="p-10 text-center text-muted-foreground">Nenhum local encontrado.</div>
            ) : (
              <ul className="divide-y divide-border">
                {filtered.map((p) => {
                  const dist = userPos ? haversineKm(userPos, p) : null;
                  return (
                    <li key={p.id}>
                      <button
                        onClick={() => openItem(p)}
                        className="w-full text-left p-3 flex gap-3 hover:bg-accent/40 active:bg-accent transition"
                      >
                        {p.photo_url ? (
                          <img src={p.photo_url} alt={p.name} className="size-16 rounded-xl object-cover shrink-0" />
                        ) : (
                          <div className="size-16 rounded-xl bg-accent grid place-items-center text-3xl shrink-0">
                            {CAT_EMOJI[p.category] ?? ""}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-wide text-primary font-display">{p.category}</p>
                          <h3 className="font-display text-brand truncate">{p.name}</h3>
                          <p className="text-xs text-muted-foreground truncate">{p.address ?? p.city ?? ""}</p>
                          {dist !== null && (
                            <p className="text-[11px] text-primary font-display mt-0.5 flex items-center gap-1">
                              <Navigation className="size-3" /> {dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* Locate button */}
        {view === "map" && (
          <button
            onClick={() => locateMe(true)}
            className="absolute bottom-6 right-4 size-12 rounded-full bg-card shadow-lg grid place-items-center border border-border z-10"
            title="Minha localização"
          >
            <Locate className="size-5 text-primary" />
          </button>
        )}

        {/* Counter pill */}
        {view === "map" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-card/95 backdrop-blur shadow-soft border border-border px-3 py-1 text-xs font-display text-brand z-10">
            {filtered.length} {filtered.length === 1 ? "local" : "locais"}
          </div>
        )}

        {selected && (
          <PlaceDetail
            place={selected}
            userPos={userPos}
            onClose={() => { setSelected(null); infoRef.current?.close(); }}
          />
        )}
      </div>
    </div>
  );
}

function PlaceDetail({ place, userPos, onClose }: { place: Place; userPos: { lat: number; lng: number } | null; onClose: () => void }) {
  const dist = userPos ? haversineKm(userPos, place) : null;
  return (
    <div className="absolute inset-x-3 bottom-4 z-20 nuppy-card p-4 shadow-2xl animate-in slide-in-from-bottom-4">
      <button onClick={onClose} className="absolute top-2 right-2 size-8 grid place-items-center rounded-full hover:bg-accent">
        <X className="size-4" />
      </button>
      <div className="flex gap-3">
        {place.photo_url ? (
          <img src={place.photo_url} alt={place.name} className="size-20 rounded-xl object-cover" />
        ) : (
          <div className="size-20 rounded-xl bg-accent grid place-items-center text-3xl">{CAT_EMOJI[place.category] ?? ""}</div>
        )}
        <div className="flex-1 min-w-0 pr-6">
          <p className="text-[11px] text-primary font-display uppercase tracking-wide">{place.category}</p>
          <h3 className="font-display text-brand truncate">{place.name}</h3>
          {place.address && <p className="text-xs text-muted-foreground truncate flex items-center gap-1"><MapPin className="size-3" /> {place.address}</p>}
          {dist !== null && (
            <p className="text-[11px] text-primary font-display mt-0.5">
              {dist < 1 ? `${Math.round(dist * 1000)} m de você` : `${dist.toFixed(1)} km de você`}
            </p>
          )}
        </div>
      </div>
      {place.description && <p className="text-sm text-foreground/80 mt-2 line-clamp-3">{place.description}</p>}
      <div className="mt-3 flex gap-2">
        <Link
          to="/estabelecimento/$id"
          params={{ id: place.id }}
          className="flex-1 text-center rounded-full bg-accent text-brand py-2 text-sm font-display"
        >
          Detalhes
        </Link>
        {place.phone && (
          <a href={`tel:${place.phone}`} className="size-10 grid place-items-center rounded-full bg-accent text-brand">
            <Phone className="size-4" />
          </a>
        )}
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
          target="_blank" rel="noreferrer"
          className="flex-1 text-center rounded-full bg-primary text-primary-foreground py-2 text-sm font-display inline-flex items-center justify-center gap-1"
        >
          <Navigation className="size-4" /> Rotas
        </a>
      </div>
    </div>
  );
}
