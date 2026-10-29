/* ============================================================================
 *  PÁGINA: /comunidade/$slug  —  CHAT DE UMA COMUNIDADE
 * ----------------------------------------------------------------------------
 *  Sala de bate-papo em tempo real (estilo WhatsApp).
 *    • mensagens da tabela `community_messages` (join em `profiles`)
 *    • Realtime do Supabase escuta INSERTs e atualiza a lista
 *    • suporte a envio de texto, foto e vídeo (bucket community-media)
 *
 *  O parâmetro `$slug` da URL identifica qual comunidade abrir.
 * ========================================================================== */
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useEffect, useRef, useState } from "react";
import { ChevronLeft, Send, Users, AlertTriangle, Paperclip, Loader2, X, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import { uploadMedia } from "@/lib/upload";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/comunidade/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${params.slug} — Nuppy` }] }),
  component: ChatPage,
  errorComponent: ChatError,
  notFoundComponent: () => (
    <MobileShell>
      <div className="p-8 text-center">
        <div className="text-6xl mb-2">🐾</div>
        <p className="font-display text-brand">Comunidade não encontrada</p>
        <Link to="/comunidades" className="text-primary text-sm mt-2 inline-block">Voltar</Link>
      </div>
    </MobileShell>
  ),
});

type Message = {
  id: string;
  body: string | null;
  user_id: string;
  created_at: string;
  media_url: string | null;
  media_type: string | null;
  author?: { username: string; avatar_url: string | null; display_name: string | null } | null;
};

type CommunityInfo = {
  id: string;
  name: string;
  emoji: string | null;
  cover_url: string | null;
  description: string | null;
  community_members: { user_id: string }[];
};

const chatQuery = (slug: string) => ({
  queryKey: ["community-chat", slug],
  queryFn: async () => {
    const { data: c, error: cErr } = await supabase
      .from("communities")
      .select("id, name, emoji, cover_url, description, community_members(user_id)")
      .eq("slug", slug)
      .maybeSingle();
    if (cErr) throw cErr;
    if (!c) throw new Error("Comunidade não encontrada");
    const community = c as unknown as CommunityInfo;

    const { data: msgs, error: mErr } = await supabase
      .from("community_messages")
      .select("id, body, user_id, created_at, media_url, media_type")
      .eq("community_id", community.id)
      .order("created_at", { ascending: true })
      .limit(200);
    if (mErr) throw mErr;
    const rows = (msgs ?? []) as Message[];

    const userIds = Array.from(new Set(rows.map((m) => m.user_id)));
    const profileMap = new Map<string, { username: string; avatar_url: string | null; display_name: string | null }>();
    if (userIds.length) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, display_name")
        .in("id", userIds);
      (profiles ?? []).forEach((p: { id: string; username: string; avatar_url: string | null; display_name: string | null }) =>
        profileMap.set(p.id, { username: p.username, avatar_url: p.avatar_url, display_name: p.display_name }),
      );
    }
    const messages = rows.map((m) => ({ ...m, author: profileMap.get(m.user_id) ?? null }));
    return { community, messages };
  },
});

function ChatPage() {
  const { slug } = Route.useParams();
  return (
    <MobileShell hideNav>
      <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Abrindo bate-papo...</div>}>
        <Chat slug={slug} />
      </Suspense>
    </MobileShell>
  );
}

function ChatError({ error, reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();
  const errorMessage = error instanceof Error ? error.message : String(error);
  return (
    <MobileShell>
      <div className="p-8 text-center space-y-3">
        <AlertTriangle className="size-10 text-primary mx-auto" />
        <p className="font-display text-brand">Não foi possível abrir o bate-papo</p>
        <p className="text-xs text-muted-foreground">{errorMessage}</p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-display"
          >Tentar novamente</button>
          <Link to="/comunidades" className="px-4 py-2 rounded-full bg-accent text-brand text-sm font-display">Voltar</Link>
        </div>
      </div>
    </MobileShell>
  );
}

function Chat({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data } = useSuspenseQuery(chatQuery(slug));
  const { community, messages } = data;
  const [userId, setUserId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [pendingMedia, setPendingMedia] = useState<{ url: string; type: "image" | "video" } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [lightbox, setLightbox] = useState<{ url: string; type: "image" | "video" } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null)); }, []);
  const isMember = !!userId && community.community_members.some((m) => m.user_id === userId);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (!isMember) return;
    const ch = supabase
      .channel(`community-${community.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "community_messages", filter: `community_id=eq.${community.id}` },
        () => qc.invalidateQueries({ queryKey: ["community-chat", slug] }),
      )
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [community.id, isMember, qc, slug]);

  async function join() {
    if (!userId) return;
    const { error } = await supabase.from("community_members").insert({ community_id: community.id, user_id: userId });
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["community-chat", slug] });
    qc.invalidateQueries({ queryKey: ["communities"] });
  }

  async function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVid = file.type.startsWith("video/");
    if (file.size > (isVid ? 50 : 8) * 1024 * 1024) {
      toast.error(isVid ? "Vídeo máx 50MB" : "Imagem máx 8MB");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadMedia("community-media", file);
      setPendingMedia({ url, type: isVid ? "video" : "image" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro no upload");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if ((!text.trim() && !pendingMedia) || !userId) return;
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
      media_type: media?.type ?? null,
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

  return (
    <div className="fixed inset-0 max-w-[480px] mx-auto flex flex-col bg-background">
      <header className="px-3 py-3 flex items-center gap-3 border-b border-border bg-card shrink-0">
        <button onClick={() => navigate({ to: "/comunidades" })} className="size-9 grid place-items-center rounded-full hover:bg-accent">
          <ChevronLeft className="size-5 text-brand" />
        </button>
        <div className="size-10 rounded-full bg-gradient-to-br from-primary/30 to-accent grid place-items-center text-xl overflow-hidden">
          {community.cover_url ? <img src={community.cover_url} alt="" className="w-full h-full object-cover" /> : (community.emoji ?? "🐾")}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-brand truncate">{community.emoji} {community.name}</h1>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Users className="size-3" /> {community.community_members.length} membros
          </p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-2 nuppy-bg min-h-0">
        {messages.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-10">
            Ainda sem mensagens. Diga oi para a comunidade! 👋
          </div>
        ) : messages.map((m) => {
          const mine = m.user_id === userId;
          return (
            <div key={m.id} className={"flex " + (mine ? "justify-end" : "justify-start")}>
              <div className={"max-w-[78%] rounded-2xl px-2 py-2 shadow-soft " + (mine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card text-foreground rounded-bl-sm")}>
                {!mine && (
                  <p className="text-[11px] font-display text-brand mb-0.5 px-1">@{m.author?.username ?? "user"}</p>
                )}
                {m.media_url && (
                  <button
                    onClick={() => setLightbox({ url: m.media_url!, type: (m.media_type as "image" | "video") ?? "image" })}
                    className="block overflow-hidden rounded-xl mb-1"
                  >
                    {m.media_type === "video" ? (
                      <video src={m.media_url} className="max-h-64 w-auto" controls playsInline preload="metadata" />
                    ) : (
                      <img src={m.media_url} alt="" className="max-h-64 w-auto object-cover" loading="lazy" />
                    )}
                  </button>
                )}
                {m.body && <p className="text-sm whitespace-pre-wrap break-words px-1">{m.body}</p>}
                <p className={"text-[10px] mt-1 px-1 " + (mine ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {isMember ? (
        <form onSubmit={send} className="border-t border-border bg-card shrink-0">
          {pendingMedia && (
            <div className="p-2 border-b border-border flex items-center gap-2 bg-muted/40">
              <div className="size-14 rounded-lg overflow-hidden bg-black shrink-0 grid place-items-center">
                {pendingMedia.type === "video" ? (
                  <video src={pendingMedia.url} className="w-full h-full object-cover" />
                ) : (
                  <img src={pendingMedia.url} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <p className="text-xs text-muted-foreground flex-1">
                {pendingMedia.type === "video" ? "Vídeo" : "Imagem"} pronto para enviar
              </p>
              <button type="button" onClick={() => setPendingMedia(null)} className="size-8 grid place-items-center rounded-full hover:bg-accent">
                <X className="size-4" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2 p-3">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="size-10 grid place-items-center rounded-full bg-muted text-brand shrink-0 disabled:opacity-50"
              title="Enviar mídia"
            >
              {uploading ? <Loader2 className="size-5 animate-spin" /> : <Paperclip className="size-5" />}
            </button>
            <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={pickFile} />
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Mensagem"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm"
            />
            <button disabled={sending || (!text.trim() && !pendingMedia)} className="size-10 grid place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 shrink-0">
              <Send className="size-5" />
            </button>
          </div>
          <div className="px-3 pb-2 -mt-1 flex gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><ImageIcon className="size-3" /> Foto até 8MB</span>
            <span className="flex items-center gap-1"><VideoIcon className="size-3" /> Vídeo até 50MB</span>
          </div>
        </form>
      ) : (
        <div className="p-3 border-t border-border bg-card shrink-0">
          <button onClick={join} className="nuppy-btn-primary">Entrar na comunidade para conversar</button>
          <Link to="/comunidades" className="block text-center text-xs text-muted-foreground mt-2">Voltar</Link>
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 grid place-items-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 size-10 grid place-items-center rounded-full bg-white/10 text-white">
            <X className="size-5" />
          </button>
          {lightbox.type === "video" ? (
            <video src={lightbox.url} className="max-h-full max-w-full" controls autoPlay playsInline />
          ) : (
            <img src={lightbox.url} alt="" className="max-h-full max-w-full object-contain" />
          )}
        </div>
      )}
    </div>
  );
}
