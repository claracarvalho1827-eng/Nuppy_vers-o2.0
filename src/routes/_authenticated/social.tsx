/* ============================================================================
 *  PÁGINA: /social  —  FEED SOCIAL DO NUPPY
 * ----------------------------------------------------------------------------
 *  O QUE ESSA TELA FAZ
 *  -------------------
 *  É o "Instagram/TikTok" do app. Mostra um feed vertical com fotos e vídeos
 *  publicados pelos tutores. O usuário pode:
 *    • curtir (coração)        -> tabela `likes`
 *    • comentar                -> tabela `post_comments`  (modal CommentsSheet)
 *    • compartilhar            -> Web Share API + fallback de cópia
 *    • salvar (bookmark local) -> localStorage (sem backend, simples)
 *    • publicar novo post      -> upload de mídia + INSERT em `posts`
 *    • duplo-toque para curtir -> com animação de coração
 *    • mute/unmute em vídeos   -> persiste em localStorage
 *
 *  COMO O CÓDIGO É ORGANIZADO
 *  --------------------------
 *  1) Tipos e queries no topo (contratos com o banco).
 *  2) Página (SocialPage) -> só monta header + Suspense + Feed.
 *  3) Feed                -> lê dados via useSuspenseQuery e renderiza cards.
 *  4) PostCard            -> toda lógica visual e interativa de um post.
 *  5) NewPostButton       -> botão "+" no header que abre modal de criação.
 *  6) Helpers (formatTimeAgo, useDoubleTap, etc.) no fim do arquivo.
 *
 *  ONDE MEXER PRA CUSTOMIZAR
 *  -------------------------
 *  • Cores / ícones        -> dentro de PostCard.
 *  • Limite de posts       -> constante PAGE_SIZE.
 *  • Tipos de mídia/limite -> constante MAX_*_MB.
 *  • Texto dos botões      -> strings em pt-BR espalhadas (use Ctrl+F).
 * ========================================================================== */

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense,
} from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  ChevronLeft,
  Camera,
  Loader2,
  Video,
  Bookmark,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Trash2,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import { CommentsSheet } from "@/components/CommentsSheet";
import passaro from "@/assets/passaro.png";
import { uploadMedia } from "@/lib/upload";
import { toast } from "sonner";

/* ───────────────────────── Configurações globais ───────────────────────── */
// Quantos posts carregar por "página" do feed infinito.
const PAGE_SIZE = 10;
// Limites de upload (em MB). Mantenha em sincronia com policies do bucket.
const MAX_IMAGE_MB = 8;
const MAX_VIDEO_MB = 50;
// Chave do localStorage para salvar bookmarks (não está no banco — é local).
const LS_BOOKMARKS = "nuppy:bookmarks";
// Chave do localStorage para lembrar se o usuário quer vídeos com som.
const LS_MUTED = "nuppy:videoMuted";

/* ───────────────────────── Definição da rota ──────────────────────────── */
export const Route = createFileRoute("/_authenticated/social")({
  head: () => ({
    meta: [
      { title: "Feed — Nuppy" },
      { name: "description", content: "Feed social do Nuppy: fotos e vídeos da rotina pet." },
    ],
  }),
  component: SocialPage,
});

/* ───────────────────────── Tipagem dos dados ──────────────────────────── */
/**
 * Representa uma linha da tabela `posts` enriquecida com:
 *  • dados do autor (join em `profiles`)
 *  • lista de curtidas (para contar e saber se o usuário curtiu)
 *  • lista de IDs de comentários (só pra contar — economiza payload)
 */
type Post = {
  id: string;
  author_id: string;
  media_url: string;
  media_type: string | null; // "image" | "video"
  caption: string | null;
  hashtags: string[] | null;
  created_at: string;
  profiles: { username: string; avatar_url: string | null } | null;
  likes: { user_id: string }[];
  post_comments: { id: string }[];
};

/* ───────────────────────── Componente principal ───────────────────────── */
function SocialPage() {
  return (
    <MobileShell>
      {/* Header fixo no topo: voltar | título | novo post */}
      <header className="sticky top-0 z-20 bg-background/85 backdrop-blur-xl px-4 py-3 flex items-center justify-between border-b border-border">
        <Link
          to="/home"
          className="size-9 grid place-items-center rounded-full hover:bg-accent transition"
          aria-label="Voltar"
        >
          <ChevronLeft className="size-5 text-brand" />
        </Link>
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-4 text-primary" />
          <h1 className="font-display text-lg text-brand tracking-tight">Feed</h1>
        </div>
        <NewPostButton />
      </header>

      {/*
        Suspense + useSuspenseQuery = enquanto a 1ª página carrega, mostra
        skeleton. Quando os dados chegarem, renderiza o Feed real.
      */}
      <Suspense fallback={<FeedSkeleton />}>
        <Feed />
      </Suspense>
    </MobileShell>
  );
}

/* ───────────────────────── Skeleton de loading ────────────────────────── */
/** Placeholder cinza animado mostrado enquanto o feed busca dados. */
function FeedSkeleton() {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-4 space-y-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-muted" />
            <div className="space-y-1.5">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="h-2 w-16 bg-muted/60 rounded" />
            </div>
          </div>
          <div className="aspect-[4/5] bg-muted rounded-2xl" />
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── Feed (lista de posts) ──────────────────────── */
function Feed() {
  /*
   * useInfiniteQuery: TanStack Query carrega "páginas" sob demanda.
   * Cada página tem PAGE_SIZE posts. O cursor é o `created_at` do último item.
   */
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    initialPageParam: null as string | null,
    queryFn: async ({ pageParam }) => {
      // Monta o SELECT com joins (profiles, likes, post_comments)
      let q = supabase
        .from("posts")
        .select(
          "id, author_id, media_url, media_type, caption, hashtags, created_at, profiles(username, avatar_url), likes(user_id), post_comments(id)",
        )
        .order("created_at", { ascending: false })
        .limit(PAGE_SIZE);
      // Se já temos um cursor, busca apenas posts mais antigos que ele.
      if (pageParam) q = q.lt("created_at", pageParam);
      const { data, error } = await q;
      if (error) throw error;
      return (data as unknown as Post[]) ?? [];
    },
    // Se a última página veio cheia, há mais. Cursor = created_at do último.
    getNextPageParam: (last) =>
      last.length === PAGE_SIZE ? last[last.length - 1].created_at : undefined,
  });

  // Achata todas as páginas em um array linear para render.
  const posts = useMemo(
    () => data?.pages.flatMap((p) => p) ?? [],
    [data],
  );

  /*
   * Sentinela de scroll infinito: um <div/> invisível no fim da lista.
   * Quando ele entra na viewport, dispara fetchNextPage().
   */
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sentinel.current || !hasNextPage) return;
    const obs = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && fetchNextPage(),
      { rootMargin: "400px" },
    );
    obs.observe(sentinel.current);
    return () => obs.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // Estado vazio: nenhum post no banco ainda.
  if (posts.length === 0) {
    return (
      <div className="p-10 text-center">
        <img
          src={passaro}
          alt="Pássaro"
          className="mx-auto mb-4 size-24 object-contain"
        />
        <p className="font-display text-brand text-xl">O feed está esperando você</p>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          Toque no <strong>+</strong> no topo para publicar a primeira foto ou vídeo do seu pet.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}

      {/* Sentinela invisível + indicador de "carregando mais" */}
      <div ref={sentinel} className="py-6 text-center">
        {isFetchingNextPage && (
          <Loader2 className="size-5 animate-spin text-muted-foreground mx-auto" />
        )}
        {!hasNextPage && (
          <p className="text-xs text-muted-foreground">Você chegou ao fim </p>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Card de um post ────────────────────────────── */
function PostCard({ post }: { post: Post }) {
  const qc = useQueryClient();

  // ID do usuário logado (precisa pra saber se curtiu e pra excluir).
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  // Estado da UI deste card
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false); // animação de duplo-toque
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(post.id));

  // Derivados (não viram state — recalculados a cada render, é barato)
  const liked = !!userId && post.likes.some((l) => l.user_id === userId);
  const likeCount = post.likes.length;
  const commentCount = post.post_comments?.length ?? 0;
  const isVideo = post.media_type === "video";
  const isOwner = userId === post.author_id;

  /* ── Mutation: curtir / descurtir ─────────────────────────────────── */
  const toggleLike = useMutation({
    mutationFn: async () => {
      if (!userId) return;
      if (liked) {
        await supabase.from("likes").delete().eq("user_id", userId).eq("post_id", post.id);
      } else {
        await supabase.from("likes").insert({ user_id: userId, post_id: post.id });
      }
    },
    // Quando muda, invalida o feed pra recalcular contadores.
    onSuccess: () => qc.invalidateQueries({ queryKey: ["feed"] }),
  });

  /* ── Mutation: excluir o próprio post ─────────────────────────────── */
  const removePost = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("posts").delete().eq("id", post.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Post excluído");
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  /* ── Duplo-toque na mídia: curte + animação ───────────────────────── */
  const handleDoubleTap = useDoubleTap(() => {
    if (!liked) toggleLike.mutate();
    setHeartBurst(true);
    window.setTimeout(() => setHeartBurst(false), 700);
  });

  /* ── Compartilhar (Web Share API + fallback) ──────────────────────── */
  async function share() {
    const url = `${window.location.origin}/social#post-${post.id}`;
    const text = post.caption
      ? `${post.caption}\n— @${post.profiles?.username ?? "nuppy"} no Nuppy`
      : `Veja este ${isVideo ? "vídeo" : "post"} de @${post.profiles?.username ?? "nuppy"} no Nuppy 🐾`;
    try {
      if (navigator.share) await navigator.share({ title: "Nuppy", text, url });
      else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        toast.success("Link copiado!");
      }
    } catch {
      /* usuário cancelou o share — ignora silenciosamente */
    }
  }

  /* ── Salvar / dessalvar (localStorage) ────────────────────────────── */
  function toggleBookmark() {
    const next = !bookmarked;
    setBookmarked(next);
    saveBookmark(post.id, next);
    toast.success(next ? "Salvo nos favoritos" : "Removido dos favoritos");
  }

  return (
    <article id={`post-${post.id}`} className="bg-card">
      {/* ── Cabeçalho do post: avatar, @, hora, menu ─────────────────── */}
      <header className="flex items-center gap-3 px-4 py-3">
        <div className="size-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 overflow-hidden grid place-items-center ring-2 ring-primary/20">
          {post.profiles?.avatar_url ? (
            <img src={post.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg">🐾</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm text-brand truncate">
            @{post.profiles?.username ?? "user"}
          </p>
          <p className="text-[11px] text-muted-foreground">{formatTimeAgo(post.created_at)}</p>
        </div>

        {/* Menu de 3 pontinhos: só mostra "Excluir" para o dono. */}
        <div className="relative">
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="size-9 grid place-items-center rounded-full hover:bg-accent"
            aria-label="Mais opções"
          >
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </button>
          {showMenu && (
            <div
              onMouseLeave={() => setShowMenu(false)}
              className="absolute right-0 top-10 z-10 w-44 rounded-2xl border border-border bg-popover shadow-lg overflow-hidden"
            >
              <button
                onClick={() => { setShowMenu(false); share(); }}
                className="w-full px-4 py-2.5 text-sm text-left hover:bg-accent flex items-center gap-2"
              >
                <Share2 className="size-4" /> Compartilhar
              </button>
              {isOwner && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    if (confirm("Excluir este post?")) removePost.mutate();
                  }}
                  className="w-full px-4 py-2.5 text-sm text-left hover:bg-accent flex items-center gap-2 text-destructive"
                >
                  <Trash2 className="size-4" /> Excluir
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── Mídia (foto ou vídeo) ────────────────────────────────────── */}
      <div
        className="relative bg-black overflow-hidden"
        onClick={handleDoubleTap}
      >
        {isVideo ? (
          <SmartVideo src={post.media_url} />
        ) : (
          <img
            src={post.media_url}
            alt={post.caption ?? "Post"}
            className="w-full aspect-[4/5] object-cover"
            loading="lazy"
          />
        )}

        {/* Coração grande que aparece quando dá duplo-toque */}
        {heartBurst && (
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <Heart className="size-28 text-white drop-shadow-2xl fill-love animate-heart-pop" />
          </div>
        )}
      </div>

      {/* ── Barra de ações: curtir, comentar, compartilhar, salvar ───── */}
      <div className="flex items-center gap-1 px-2 py-2">
        <ActionButton onClick={() => toggleLike.mutate()} active={liked} label="Curtir">
          <Heart className={"size-6 " + (liked ? "fill-love text-love" : "")} />
        </ActionButton>
        <ActionButton onClick={() => setShowComments(true)} label="Comentar">
          <MessageCircle className="size-6" />
        </ActionButton>
        <ActionButton onClick={share} label="Compartilhar">
          <Share2 className="size-6" />
        </ActionButton>
        <div className="flex-1" />
        <ActionButton onClick={toggleBookmark} active={bookmarked} label="Salvar">
          <Bookmark className={"size-6 " + (bookmarked ? "fill-current" : "")} />
        </ActionButton>
      </div>

      {/* ── Texto: contadores, legenda, hashtags ─────────────────────── */}
      <div className="px-4 pb-4 space-y-1">
        {likeCount > 0 && (
          <p className="text-sm font-display text-brand">
            {likeCount} {likeCount === 1 ? "curtida" : "curtidas"}
          </p>
        )}
        {post.caption && (
          <p className="text-sm">
            <span className="font-display text-brand mr-1.5">
              @{post.profiles?.username ?? "user"}
            </span>
            {post.caption}
          </p>
        )}
        {post.hashtags && post.hashtags.length > 0 && (
          <p className="text-xs text-primary flex flex-wrap gap-x-2">
            {post.hashtags.map((h) => (
              <span key={h}>#{h}</span>
            ))}
          </p>
        )}
        {commentCount > 0 && (
          <button
            onClick={() => setShowComments(true)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Ver todos os {commentCount} comentários
          </button>
        )}
      </div>

      {/* Modal de comentários — só monta quando aberto (lazy) */}
      {showComments && (
        <CommentsSheet postId={post.id} onClose={() => setShowComments(false)} />
      )}
    </article>
  );
}

/* ───────────────────────── Botão de ação reusável ─────────────────────── */
function ActionButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={
        "size-11 grid place-items-center rounded-full hover:bg-accent transition active:scale-90 " +
        (active ? "text-foreground" : "text-foreground/80")
      }
    >
      {children}
    </button>
  );
}

/* ───────────────────────── Player de vídeo "esperto" ──────────────────── */
/**
 * Toca o vídeo automaticamente APENAS quando ele está visível na tela
 * (usando IntersectionObserver). Quando sai da viewport, pausa para
 * economizar bateria e dados móveis. Tem botão de mute persistido.
 */
function SmartVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(() => localStorage.getItem(LS_MUTED) !== "false");

  // Persiste preferência de mute entre posts/sessões.
  useEffect(() => {
    localStorage.setItem(LS_MUTED, muted ? "true" : "false");
  }, [muted]);

  // Autoplay quando >=60% visível.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.6) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: [0, 0.6, 1] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative">
      <video
        ref={ref}
        src={src}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="w-full aspect-[4/5] object-cover"
      />
      <button
        onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
        className="absolute bottom-3 right-3 size-9 grid place-items-center rounded-full bg-black/50 text-white backdrop-blur"
        aria-label={muted ? "Ativar som" : "Silenciar"}
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  );
}

/* ───────────────────────── Botão "+" / Modal de criação ───────────────── */
function NewPostButton() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  // Estado do formulário
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [busy, setBusy] = useState(false);

  /** Reseta tudo (usado após publicar ou cancelar). */
  function resetForm() {
    setMediaUrl(""); setMediaType("image"); setCaption(""); setTags("");
  }

  /** Faz o upload do arquivo escolhido para o bucket post-media. */
  async function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
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
      const url = await uploadMedia("post-media", file);
      setMediaUrl(url);
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
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!mediaUrl) { toast.error("Envie uma foto ou vídeo"); return; }
    setBusy(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Faça login");
      // Hashtags: aceita "parque, vidapet #cachorro" e normaliza.
      const hashtags = tags
        .split(/[\s,#]+/)
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      const { error } = await supabase.from("posts").insert({
        author_id: user.id,
        media_url: mediaUrl,
        caption,
        hashtags,
        media_type: mediaType,
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="size-9 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg transition"
        aria-label="Novo post"
      >
        <Plus className="size-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-end sm:place-items-center"
          onClick={() => setOpen(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            className="w-full max-w-[480px] bg-card rounded-t-3xl sm:rounded-3xl p-6 space-y-4 max-h-[92vh] overflow-y-auto"
          >
            <div>
              <h3 className="font-display text-xl text-brand">Novo post</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Compartilhe um momento do seu pet 🐾
              </p>
            </div>

            {/* Caixa de upload */}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full aspect-[4/5] max-h-[320px] rounded-2xl border-2 border-dashed border-border bg-muted overflow-hidden grid place-items-center relative"
            >
              {mediaUrl ? (
                mediaType === "video" ? (
                  <video src={mediaUrl} className="w-full h-full object-cover" controls playsInline />
                ) : (
                  <img src={mediaUrl} alt="" className="w-full h-full object-cover" />
                )
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <div className="flex gap-3">
                    <Camera className="size-7" />
                    <Video className="size-7" />
                  </div>
                  <span className="text-sm font-display">Enviar foto ou vídeo</span>
                  <span className="text-xs">
                    imagem até {MAX_IMAGE_MB}MB • vídeo até {MAX_VIDEO_MB}MB
                  </span>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 grid place-items-center bg-black/40 text-white">
                  <Loader2 className="size-6 animate-spin" />
                </div>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={pickFile}
            />

            {/* Legenda */}
            <textarea
              className="w-full rounded-2xl border border-border bg-card p-3 text-sm resize-none"
              rows={3}
              maxLength={500}
              placeholder="Escreva uma legenda..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <p className="text-[11px] text-muted-foreground -mt-2 text-right">
              {caption.length}/500
            </p>

            {/* Hashtags */}
            <input
              className="nuppy-input pl-4"
              placeholder="hashtags (parque, vidapet)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <button disabled={busy || uploading} className="nuppy-btn-primary">
              {busy ? "Publicando..." : "Publicar"}
            </button>
            <button
              type="button"
              onClick={() => { setOpen(false); resetForm(); }}
              className="nuppy-btn-ghost"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/* ============================================================================
 *  HELPERS — pequenas funções utilitárias usadas só neste arquivo
 * ========================================================================== */

/** "há 2 min", "há 3 h", "há 5 d" — formato pt-BR relativo. */
function formatTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "agora";
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `há ${d} d`;
  return new Date(iso).toLocaleDateString("pt-BR");
}

/** Hook que detecta duplo-toque/clique e chama o callback. */
function useDoubleTap(cb: () => void, delay = 280) {
  const last = useRef(0);
  return useCallback(() => {
    const now = Date.now();
    if (now - last.current < delay) {
      cb();
      last.current = 0;
    } else {
      last.current = now;
    }
  }, [cb, delay]);
}

/* ── Bookmarks em localStorage (não há tabela no banco para isso) ──────── */
function readBookmarks(): string[] {
  try { return JSON.parse(localStorage.getItem(LS_BOOKMARKS) ?? "[]"); }
  catch { return []; }
}
function isBookmarked(id: string): boolean {
  return readBookmarks().includes(id);
}
function saveBookmark(id: string, on: boolean) {
  const cur = new Set(readBookmarks());
  if (on) cur.add(id); else cur.delete(id);
  localStorage.setItem(LS_BOOKMARKS, JSON.stringify([...cur]));
}
