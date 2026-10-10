/* ============================================================================
 *  PÁGINA: /estabelecimentos  —  LISTA DE ESTABELECIMENTOS
 * ----------------------------------------------------------------------------
 *  Lista visual dos lugares (places) com:
 *    - Busca textual  (input com lupa)
 *    - Chips de categoria (barra horizontal deslizante)
 *    - Média de estrelas por estabelecimento (nova!)
 *    - Cartões maiores com foto de capa
 *
 *  ONDE MEXER PARA:
 *    - Trocar cor dos chips ativos → classes bg-primary / text-primary-foreground
 *    - Trocar aparência dos cartões → classe .nuppy-card (definida em styles.css)
 *    - Adicionar mais campos exibidos → alterar SELECT em `query` e o JSX do map
 * ========================================================================== */
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, Search, Mic, MapPin, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/_authenticated/estabelecimentos")({
  head: () => ({ meta: [{ title: "Estabelecimentos — Nuppy" }] }),
  component: EstabPage,
});

// Tipagem dos dados carregados. `avg_rating` e `review_count` são calculados
// juntando com a tabela `place_reviews` no lado do cliente.
type Place = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  address: string | null;
  city: string | null;
  phone: string | null;
  photo_url: string | null;
  services: string[] | null;
  avg_rating: number;
  review_count: number;
};

// Query única — busca places + reviews e calcula média em memória.
const query = {
  queryKey: ["places", "list-with-ratings"],
  queryFn: async (): Promise<Place[]> => {
    const [placesRes, reviewsRes] = await Promise.all([
      supabase
        .from("places")
        .select("id,name,category,description,address,city,phone,photo_url,services")
        .order("name"),
      // A tabela place_reviews é nova — usamos `from(... as any)` para não
      // depender do types.ts regenerado.
      (supabase.from as any)("place_reviews").select("place_id,rating"),
    ]);
    if (placesRes.error) throw placesRes.error;

    const reviews = (reviewsRes.data ?? []) as Array<{ place_id: string; rating: number }>;
    const byPlace = new Map<string, { sum: number; n: number }>();
    for (const r of reviews) {
      const cur = byPlace.get(r.place_id) ?? { sum: 0, n: 0 };
      cur.sum += r.rating;
      cur.n += 1;
      byPlace.set(r.place_id, cur);
    }

    return (placesRes.data ?? []).map((p: any) => {
      const agg = byPlace.get(p.id);
      return {
        ...p,
        services: (p.services ?? []) as string[],
        avg_rating: agg ? agg.sum / agg.n : 0,
        review_count: agg?.n ?? 0,
      };
    });
  },
};

// Ícones por categoria (mantém apenas o nome da categoria).
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

// ============================================================================
// COMPONENTE
// ============================================================================
function EstabPage() {
  return (
    <MobileShell>
      {/* CABEÇALHO — voltar + título centralizado */}
      <header className="px-4 pt-5 flex items-center gap-3">
        <Link to="/home" className="size-9 grid place-items-center rounded-full hover:bg-accent">
          <ChevronLeft className="size-5 text-brand" />
        </Link>
        <h1 className="flex-1 text-center font-display text-base text-brand leading-tight uppercase tracking-wide pr-9">
          Tudo o que seu pet
          <br />
          precisa, em um só lugar!
        </h1>
      </header>

      <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Carregando...</div>}>
        <Body />
      </Suspense>
    </MobileShell>
  );
}

function Body() {
  const { data } = useSuspenseQuery(query);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("Todos");

  // Categorias dinâmicas: pega as que realmente aparecem nos dados.
  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(data.map((p) => p.category)))],
    [data],
  );

  // Filtro combinado (categoria + busca textual).
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return data.filter((p) => {
      if (cat !== "Todos" && p.category !== cat) return false;
      if (!s) return true;
      const hay = `${p.name} ${p.description ?? ""} ${p.address ?? ""} ${(p.services ?? []).join(" ")}`;
      return hay.toLowerCase().includes(s);
    });
  }, [data, q, cat]);

  return (
    <>
      {/* CAMPO DE BUSCA */}
      <div className="px-4 mt-4">
        <label className="relative block">
          <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, serviço ou cidade..."
            className="w-full rounded-full bg-card border border-border pl-11 pr-12 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 shadow-card"
          />
          {/* Botão do microfone — visual apenas */}
          <button
            type="button"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 size-9 rounded-full bg-primary grid place-items-center text-primary-foreground"
            aria-label="Busca por voz"
          >
            <Mic className="size-4" />
          </button>
        </label>
      </div>

      {/* CHIPS DE CATEGORIA */}
      <div className="flex gap-2 overflow-x-auto py-3 px-4 scrollbar-none">
        {categories.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-display border transition ${
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-transparent text-brand border-transparent hover:bg-accent"
              }`}
            >
              {c === "Todos" ? "Todos" : c}
            </button>
          );
        })}
      </div>

      {/* LISTA DE CARTÕES */}
      <div className="px-4 pb-28 space-y-3">
        {filtered.length === 0 && (
          <div className="nuppy-card p-8 text-center text-muted-foreground">
            <div className="text-5xl mb-2">🔎</div>
            Nenhum estabelecimento encontrado.
          </div>
        )}

        {filtered.map((p) => (
          <Link
            key={p.id}
            to="/estabelecimento/$id"
            params={{ id: p.id }}
            className="nuppy-card overflow-hidden block hover:shadow-float transition"
          >
            {/* Foto de capa (grande, no topo do cartão) */}
            <div className="relative h-36 bg-accent">
              {p.photo_url ? (
                <img src={p.photo_url} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-6xl">
                  {CAT_EMOJI[p.category] ?? ""}
                </div>
              )}
              {/* Selo da categoria — canto superior esquerdo */}
              <span className="absolute top-3 left-3 rounded-full bg-card/90 backdrop-blur px-3 py-1 text-[11px] font-display text-brand uppercase tracking-wide shadow-soft">
                {p.category}
              </span>
              {/* Média de estrelas — canto superior direito (só se tiver avaliações) */}
              {p.review_count > 0 && (
                <span className="absolute top-3 right-3 rounded-full bg-card/90 backdrop-blur px-2.5 py-1 text-[11px] font-display text-brand flex items-center gap-1 shadow-soft">
                  <Star className="size-3 fill-primary text-primary" />
                  {p.avg_rating.toFixed(1)}
                  <span className="text-muted-foreground">({p.review_count})</span>
                </span>
              )}
            </div>

            {/* Corpo do cartão */}
            <div className="p-4">
              <h3 className="font-display text-brand uppercase tracking-wide text-sm">{p.name}</h3>
              {p.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
              )}

              {/* Chips dos serviços oferecidos */}
              {p.services && p.services.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.services.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-display uppercase tracking-wide bg-accent text-brand rounded-full px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                  {p.services.length > 4 && (
                    <span className="text-[10px] text-muted-foreground">
                      +{p.services.length - 4}
                    </span>
                  )}
                </div>
              )}

              {p.city && (
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-2">
                  <MapPin className="size-3" /> {p.city}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
