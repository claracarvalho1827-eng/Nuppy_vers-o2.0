/* ============================================================================
 *  PÁGINA: /estabelecimento/$id  —  DETALHE DE UM ESTABELECIMENTO
 * ----------------------------------------------------------------------------
 *  Página completa do lugar, com:
 *    1) CARROSSEL de fotos (foto principal + fotos extras da tabela place_photos)
 *    2) Cabeçalho com selo de categoria, nome, endereço e ⭐ média
 *    3) Chips com SERVIÇOS oferecidos (coluna places.services text[])
 *    4) Descrição
 *    5) Ações: Ligar / Como chegar / Compartilhar
 *    6) SEÇÃO DE AVALIAÇÕES (place_reviews):
 *       - Média + total
 *       - Formulário do usuário logado (criar / editar a própria)
 *       - Lista das avaliações mais recentes
 *
 *  ONDE MEXER PARA:
 *    - Cor das estrelas → classe `text-primary` / `fill-primary`
 *    - Botão laranja de "Como chegar" → classe bg-primary
 *    - Aparência dos cards internos → classe .nuppy-card
 * ========================================================================== */
import { createFileRoute, Link, useParams, useRouter } from "@tanstack/react-router";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  MapPin,
  Phone,
  Map as MapIcon,
  Share2,
  Star,
  ChevronRight,
  ChevronLeft as ChevLeftIcon,
  Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/estabelecimento/$id")({
  head: () => ({ meta: [{ title: `Estabelecimento — Nuppy` }] }),
  component: EstabDetail,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <MobileShell>
        <div className="p-8 text-center">
          <p className="text-brand font-display">Algo deu errado.</p>
          <p className="text-xs text-muted-foreground mt-1">{error.message}</p>
          <button
            onClick={() => {
              reset();
              router.invalidate();
            }}
            className="mt-4 nuppy-btn-primary"
          >
            Tentar de novo
          </button>
        </div>
      </MobileShell>
    );
  },
  notFoundComponent: () => (
    <MobileShell>
      <div className="p-8 text-center">
        <p className="font-display text-brand">Estabelecimento não encontrado.</p>
        <Link to="/estabelecimentos" className="text-primary text-sm mt-2 inline-block">
          ← Voltar à lista
        </Link>
      </div>
    </MobileShell>
  ),
});

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

// ----------------------------------------------------------------------------
// Chaves de query (facilita invalidar depois de gravar uma avaliação).
// ----------------------------------------------------------------------------
const placeKey = (id: string) => ["place", id] as const;
const reviewsKey = (id: string) => ["place-reviews", id] as const;

function placeQuery(id: string) {
  return {
    queryKey: placeKey(id),
    queryFn: async () => {
      // Busca place principal + fotos extras em paralelo.
      const [placeRes, photosRes] = await Promise.all([
        supabase
          .from("places")
          .select("id,name,category,description,address,city,phone,photo_url,lat,lng,services")
          .eq("id", id)
          .maybeSingle(),
        (supabase.from as any)("place_photos")
          .select("id,url,position")
          .eq("place_id", id)
          .order("position", { ascending: true }),
      ]);
      if (placeRes.error) throw placeRes.error;
      if (!placeRes.data) throw new Error("Estabelecimento não encontrado");
      const extras = (photosRes.data ?? []) as Array<{ id: string; url: string; position: number }>;
      return {
        ...(placeRes.data as any),
        services: ((placeRes.data as any).services ?? []) as string[],
        gallery: extras,
      };
    },
  };
}

function reviewsQuery(id: string) {
  return {
    queryKey: reviewsKey(id),
    queryFn: async () => {
      // Busca avaliações do lugar + perfis dos autores.
      const { data: reviews, error } = await (supabase.from as any)("place_reviews")
        .select("id,user_id,rating,comment,created_at,updated_at")
        .eq("place_id", id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      const list = (reviews ?? []) as Array<{
        id: string;
        user_id: string;
        rating: number;
        comment: string | null;
        created_at: string;
        updated_at: string;
      }>;
      if (list.length === 0) return [];
      const ids = Array.from(new Set(list.map((r) => r.user_id)));
      const { data: profs } = await supabase
        .from("profiles")
        .select("id,display_name,username,avatar_url")
        .in("id", ids);
      const map = new Map((profs ?? []).map((p) => [p.id, p]));
      return list.map((r) => ({ ...r, author: map.get(r.user_id) ?? null }));
    },
  };
}

// ============================================================================
// COMPONENTE
// ============================================================================
function EstabDetail() {
  const { id } = useParams({ from: "/_authenticated/estabelecimento/$id" });
  return (
    <MobileShell>
      <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Carregando...</div>}>
        <Body id={id} />
      </Suspense>
    </MobileShell>
  );
}

function Body({ id }: { id: string }) {
  const { data: p } = useSuspenseQuery(placeQuery(id));

  // Junta a foto principal com as fotos extras em um único array para o carrossel.
  const photos = useMemo(() => {
    const arr: string[] = [];
    if (p.photo_url) arr.push(p.photo_url);
    for (const g of p.gallery) if (g.url) arr.push(g.url);
    return arr;
  }, [p]);

  // Botão de compartilhar (usa Web Share API quando disponível).
  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: p.name, text: p.description ?? "", url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copiado!");
  }

  return (
    <div className="pb-28">
      {/* 1) CARROSSEL DE FOTOS */}
      <PhotoCarousel photos={photos} fallbackEmoji={CAT_EMOJI[p.category] ?? ""} />

      {/* Botões flutuantes por cima do carrossel */}
      <Link
        to="/estabelecimentos"
        className="fixed top-4 left-4 z-20 size-10 grid place-items-center rounded-full bg-card/90 backdrop-blur shadow-soft"
      >
        <ChevronLeft className="size-5 text-brand" />
      </Link>
      <button
        onClick={share}
        className="fixed top-4 right-4 z-20 size-10 grid place-items-center rounded-full bg-card/90 backdrop-blur shadow-soft"
        aria-label="Compartilhar"
      >
        <Share2 className="size-4 text-brand" />
      </button>

      {/* 2) CARD PRINCIPAL — sobe um pouco por cima do carrossel (-mt-6) */}
      <div className="px-4 -mt-6 relative z-10">
        <div className="nuppy-card p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-block rounded-full bg-accent text-brand text-[11px] font-display px-3 py-1 uppercase tracking-wide">
              {p.category}
            </span>
            <RatingBadge placeId={id} />
          </div>

          <h1 className="font-display text-2xl text-brand mt-2 uppercase">{p.name}</h1>

          {(p.address || p.city) && (
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="size-4" /> {[p.address, p.city].filter(Boolean).join(" — ")}
            </p>
          )}

          {/* 3) SERVIÇOS OFERECIDOS */}
          {p.services && p.services.length > 0 && (
            <div className="mt-4">
              <p className="text-[11px] font-display uppercase text-muted-foreground tracking-wide mb-2">
                Serviços oferecidos
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(p.services as string[]).map((s: string) => (
                  <span
                    key={s}
                    className="text-xs font-display bg-accent text-brand rounded-full px-3 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 4) DESCRIÇÃO */}
          {p.description && (
            <div className="mt-4">
              <p className="text-[11px] font-display uppercase text-muted-foreground tracking-wide mb-1">
                Sobre
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">{p.description}</p>
            </div>
          )}

          {/* 5) AÇÕES */}
          <div className="grid grid-cols-2 gap-2 mt-5">
            {p.phone && (
              <a
                href={`tel:${p.phone}`}
                className="rounded-full bg-accent text-brand py-2.5 text-sm font-display inline-flex items-center justify-center gap-1"
              >
                <Phone className="size-4" /> Ligar
              </a>
            )}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
              target="_blank"
              rel="noreferrer"
              className={`rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-display inline-flex items-center justify-center gap-1 ${
                p.phone ? "" : "col-span-2"
              }`}
            >
              <MapIcon className="size-4" /> Como chegar
            </a>
          </div>
        </div>
      </div>

      {/* 6) SEÇÃO DE AVALIAÇÕES */}
      <div className="px-4 mt-6">
        <Suspense
          fallback={<div className="p-6 text-center text-muted-foreground text-sm">Carregando avaliações...</div>}
        >
          <ReviewsSection placeId={id} />
        </Suspense>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// CARROSSEL DE FOTOS — deslize horizontal com snap + setas + bolinhas.
// ----------------------------------------------------------------------------
function PhotoCarousel({ photos, fallbackEmoji }: { photos: string[]; fallbackEmoji: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  // Sem fotos: mostra o emoji da categoria.
  if (photos.length === 0) {
    return (
      <div className="relative h-64 bg-accent grid place-items-center text-7xl">{fallbackEmoji}</div>
    );
  }

  // Rola até o slide desejado.
  function goTo(next: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(photos.length - 1, next));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    setIdx(clamped);
  }

  // Atualiza o índice enquanto o usuário arrasta.
  function onScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== idx) setIdx(i);
  }

  return (
    <div className="relative h-64 bg-accent overflow-hidden">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="h-full w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
      >
        {photos.map((url, i) => (
          <div key={i} className="shrink-0 w-full h-full snap-center">
            <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Setas de navegação (só aparecem se tiver mais de uma foto) */}
      {photos.length > 1 && (
        <>
          <button
            onClick={() => goTo(idx - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-card/80 backdrop-blur grid place-items-center shadow-soft"
            aria-label="Foto anterior"
          >
            <ChevLeftIcon className="size-4 text-brand" />
          </button>
          <button
            onClick={() => goTo(idx + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-card/80 backdrop-blur grid place-items-center shadow-soft"
            aria-label="Próxima foto"
          >
            <ChevronRight className="size-4 text-brand" />
          </button>

          {/* Bolinhas indicadoras */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-6 bg-primary" : "w-1.5 bg-card/70"
                }`}
                aria-label={`Ir para foto ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// BADGE de média de estrelas (canto do card principal).
// ----------------------------------------------------------------------------
function RatingBadge({ placeId }: { placeId: string }) {
  const { data } = useSuspenseQuery(reviewsQuery(placeId));
  if (!data || data.length === 0) return null;
  const avg = data.reduce((s, r) => s + r.rating, 0) / data.length;
  return (
    <span className="rounded-full bg-primary/10 text-brand text-xs font-display px-2.5 py-1 flex items-center gap-1">
      <Star className="size-3.5 fill-primary text-primary" />
      {avg.toFixed(1)}
      <span className="text-muted-foreground">({data.length})</span>
    </span>
  );
}

// ----------------------------------------------------------------------------
// SEÇÃO DE AVALIAÇÕES — média, formulário e lista.
// ----------------------------------------------------------------------------
function ReviewsSection({ placeId }: { placeId: string }) {
  const qc = useQueryClient();
  const { data: reviews } = useSuspenseQuery(reviewsQuery(placeId));

  // Usuário atual (para descobrir se ele já avaliou este lugar).
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  const mine = reviews.find((r) => r.user_id === userId) ?? null;

  // Estatísticas: média e distribuição por estrelas (para as barrinhas).
  const stats = useMemo(() => {
    const n = reviews.length;
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    const avg = n ? sum / n : 0;
    const dist = [0, 0, 0, 0, 0]; // índice 0 => 1 estrela
    for (const r of reviews) dist[r.rating - 1]++;
    return { n, avg, dist };
  }, [reviews]);

  // Estado do formulário (rating + comment).
  const [rating, setRating] = useState<number>(mine?.rating ?? 0);
  const [comment, setComment] = useState<string>(mine?.comment ?? "");
  const [saving, setSaving] = useState(false);

  // Se `mine` mudar (após save), sincroniza o formulário.
  useEffect(() => {
    setRating(mine?.rating ?? 0);
    setComment(mine?.comment ?? "");
  }, [mine?.id, mine?.rating, mine?.comment]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return toast.error("Faça login para avaliar");
    if (rating < 1) return toast.error("Escolha uma nota de 1 a 5 estrelas");
    setSaving(true);
    try {
      // upsert pela chave (place_id, user_id) — cria ou atualiza a avaliação.
      const { error } = await (supabase.from as any)("place_reviews").upsert(
        {
          place_id: placeId,
          user_id: userId,
          rating,
          comment: comment.trim() || null,
        },
        { onConflict: "place_id,user_id" },
      );
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
    const { error } = await (supabase.from as any)("place_reviews").delete().eq("id", mine.id);
    if (error) return toast.error(error.message);
    toast.success("Avaliação removida");
    qc.invalidateQueries({ queryKey: reviewsKey(placeId) });
    qc.invalidateQueries({ queryKey: ["places", "list-with-ratings"] });
  }

  return (
    <section className="space-y-4">
      <h2 className="font-display text-brand text-lg uppercase tracking-wide">Avaliações</h2>

      {/* RESUMO — nota média + barrinhas de distribuição */}
      <div className="nuppy-card p-5 flex gap-5">
        <div className="text-center shrink-0">
          <div className="font-display text-4xl text-brand">{stats.avg.toFixed(1)}</div>
          <StarsRow value={Math.round(stats.avg)} />
          <p className="text-[11px] text-muted-foreground mt-1">
            {stats.n} {stats.n === 1 ? "avaliação" : "avaliações"}
          </p>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((s) => {
            const count = stats.dist[s - 1];
            const pct = stats.n ? (count / stats.n) * 100 : 0;
            return (
              <div key={s} className="flex items-center gap-2 text-[11px]">
                <span className="w-3 text-muted-foreground">{s}</span>
                <Star className="size-3 fill-primary text-primary" />
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-5 text-right text-muted-foreground">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FORMULÁRIO — só se estiver logado */}
      {userId && (
        <form onSubmit={submit} className="nuppy-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-display text-brand text-sm">
              {mine ? "Sua avaliação" : "Escreva sua avaliação"}
            </p>
            {mine && (
              <button
                type="button"
                onClick={removeMine}
                className="text-xs text-muted-foreground hover:text-red-500 inline-flex items-center gap-1"
              >
                <Trash2 className="size-3" /> Remover
              </button>
            )}
          </div>

          {/* Seletor de estrelas */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
              >
                <Star
                  className={`size-8 transition ${
                    n <= rating
                      ? "fill-primary text-primary"
                      : "text-muted-foreground hover:text-primary/50"
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte como foi sua experiência..."
            rows={3}
            maxLength={500}
            className="w-full rounded-2xl border border-border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />

          <button disabled={saving} className="nuppy-btn-primary disabled:opacity-60">
            {saving ? "Salvando..." : mine ? "Atualizar avaliação" : "Enviar avaliação"}
          </button>
        </form>
      )}

      {/* LISTA de avaliações (esconde a minha se estou editando ela acima) */}
      <div className="space-y-3">
        {reviews.length === 0 && (
          <div className="nuppy-card p-6 text-center text-muted-foreground text-sm">
            Ainda não há avaliações. Seja o primeiro!
          </div>
        )}
        {reviews.map((r) => (
          <div key={r.id} className="nuppy-card p-4">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-accent grid place-items-center overflow-hidden shrink-0">
                {r.author?.avatar_url ? (
                  <img src={r.author.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-brand font-display text-sm">
                    {(r.author?.display_name ?? r.author?.username ?? "?")[0]?.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm text-brand truncate">
                  {r.author?.display_name ?? r.author?.username ?? "Usuário"}
                </p>
                <StarsRow value={r.rating} small />
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0">
                {new Date(r.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
            {r.comment && (
              <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{r.comment}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Linha compacta de estrelas (usada no resumo e em cada avaliação).
function StarsRow({ value, small = false }: { value: number; small?: boolean }) {
  const size = small ? "size-3" : "size-4";
  return (
    <div className="flex items-center gap-0.5 justify-center">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${size} ${n <= value ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}
