/* ============================================================================
 *  PÁGINA: /perfil  —  PERFIL DO TUTOR
 * ----------------------------------------------------------------------------
 *  Estrutura em 3 blocos claros:
 *    1) HERO: avatar grande, nome, @user, bio, cidade, botão editar
 *    2) STATS: pets, posts, seguidores em cards destacados
 *    3) ABAS: [Meus Pets] · [Posts] · [Curtidos]  — troca conteúdo abaixo
 *
 *  Dica p/ mexer:
 *    • Cor do header e ícones → text-brand (definido em styles.css)
 *    • Fundo dos cards → nuppy-card / bg-card
 *    • Botão primário → nuppy-btn-primary (gradient definido em styles.css)
 * ========================================================================== */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, Suspense } from "react";
import {
  ChevronLeft,
  Settings,
  Pencil,
  MapPin,
  Grid3x3,
  Heart,
  Camera,
  Sparkles,
  Upload,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage } from "@/lib/upload";
import { MobileShell } from "@/components/MobileShell";
import { toast } from "sonner";
import peludinho from "@/assets/peludinho.png";
import passaro from "@/assets/passaro.png";
import cachorro from "@/assets/cachorro.png";
import gato from "@/assets/gato.png";
import peixe from "@/assets/peixe.png";
export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({ meta: [{ title: "Perfil — Nuppy" }] }),
  component: PerfilPage,
});

const meQuery = {
  queryKey: ["me"],
  queryFn: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("not authenticated");
    const [{ data: profile }, { data: posts }, { data: liked }] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
        supabase
          .from("posts")
          .select("id, media_url, media_type")
          .eq("author_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("likes")
          .select("post_id, posts!inner(id, media_url, media_type)")
          .eq("user_id", user.id)
          .eq("posts.media_type", "video")
          .order("created_at", { ascending: false }),
      ]);
    const likedVideos = (
      (liked ?? []) as unknown as {
        posts: { id: string; media_url: string; media_type: string | null };
      }[]
    )
      .map((l) => l.posts)
      .filter(Boolean);
    return { user, profile, posts: posts ?? [], likedVideos };
  },
};

type Tab = "posts" | "liked";

function PerfilPage() {
  return (
    <MobileShell>
      {/* HEADER — voltar / título / config */}
      <header className="px-4 pt-4 flex items-center justify-between">
        <Link
          to="/home"
          className="size-9 grid place-items-center rounded-full hover:bg-accent"
        >
          <ChevronLeft className="size-5 text-brand" />
        </Link>
        <h1 className="font-display text-xl text-brand">Perfil</h1>
        <Link
          to="/configuracoes"
          title="Configurações"
          className="size-9 grid place-items-center rounded-full hover:bg-accent"
        >
          <Settings className="size-5 text-brand" />
        </Link>
      </header>
      <Suspense
        fallback={
          <div className="p-10 text-center text-muted-foreground">
            Carregando...
          </div>
        }
      >
        <PerfilBody />
      </Suspense>
    </MobileShell>
  );
}

function PerfilBody() {
  const { data } = useSuspenseQuery(meQuery);
  const { profile, posts, likedVideos } = data;
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState<Tab>("posts");

  return (
    <div className="px-4 pt-3 pb-8">
      {/* ================ 1) HERO ================ */}
      <section className="relative nuppy-card-float p-5 pt-6 text-center overflow-hidden">
        {/* Faixa decorativa de fundo */}
        <div
          className="absolute inset-x-0 top-0 h-24 opacity-70"
          style={{ background: "var(--gradient-warm)" }}
          aria-hidden
        />
        <div className="relative">
          <div className="mx-auto size-28 rounded-full bg-muted border-4 border-card shadow-float overflow-hidden grid place-items-center">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={peludinho}
                alt="Peludinho"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <h2 className="mt-3 font-display text-2xl text-brand leading-tight">
            {profile?.display_name ?? "Você"}
          </h2>
          <p className="text-sm text-muted-foreground">
            @{profile?.username ?? "tutor"}
          </p>

          {/* Badges: cidade e atividade */}
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {profile?.city && (
              <span className="nuppy-chip inline-flex items-center gap-1">
                <MapPin className="size-3" /> {profile.city}
              </span>
            )}
            {posts.length > 0 && (
              <span className="nuppy-chip inline-flex items-center gap-1">
                <Sparkles className="size-3" /> Ativo
              </span>
            )}
          </div>

          {/* Bio */}
          {profile?.bio ? (
            <p className="text-sm mt-3 text-foreground/80 max-w-[300px] mx-auto">
              {profile.bio}
            </p>
          ) : (
            <p className="text-xs mt-3 italic text-muted-foreground">
              Adicione uma biografia para se apresentar{" "}
            </p>
          )}

          <button
            onClick={() => setEditing(true)}
            className="mt-4 px-6 py-2 rounded-full bg-primary text-primary-foreground font-display text-sm shadow-soft inline-flex items-center gap-2 hover:brightness-105 transition"
          >
            <Pencil className="size-4" /> Editar perfil
          </button>
        </div>
      </section>

      {/* ================ 2) STATS ================ */}
      <section className="mt-4 grid grid-cols-2 gap-2">
        <StatCard
          icon={<Grid3x3 className="size-4" />}
          value={posts.length}
          label="Posts"
        />
        <StatCard
          icon={<Heart className="size-4" />}
          value={likedVideos.length}
          label="Curtidos"
        />
      </section>

      {/* ================ 3) ABAS ================ */}
      <nav className="mt-5 flex bg-muted/60 p-1 rounded-full">
        <TabBtn
          active={tab === "posts"}
          onClick={() => setTab("posts")}
          icon={<Grid3x3 className="size-4" />}
          label="Posts"
        />
        <TabBtn
          active={tab === "liked"}
          onClick={() => setTab("liked")}
          icon={<Heart className="size-4" />}
          label="Curtidos"
        />
      </nav>

      <div className="mt-4">
        {tab === "posts" && <PostsGrid posts={posts} />}
        {tab === "liked" && <LikedGrid videos={likedVideos} />}
      </div>

      {editing && (
        <EditModal profile={profile} onClose={() => setEditing(false)} />
      )}
    </div>
  );
}

/* ------------ subcomponentes ------------ */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="nuppy-card p-3 text-center">
      <div className="mx-auto mb-1 size-8 rounded-full bg-primary/15 text-primary grid place-items-center">
        {icon}
      </div>
      <p className="font-display text-xl text-brand leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 rounded-full text-sm font-display transition inline-flex items-center justify-center gap-1.5 ${
        active
          ? "bg-card text-brand shadow-soft"
          : "text-muted-foreground hover:text-brand"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function PostsGrid({
  posts,
}: {
  posts: Array<{ id: string; media_url: string; media_type: string | null }>;
}) {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon={
          <img src={passaro} alt="Pássaro" className="size-16 object-contain" />
        }
        text="Nenhum post ainda"
      />
    );
  }
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((p) => (
        <div
          key={p.id}
          className="aspect-square bg-muted overflow-hidden rounded-md flex items-center justify-center"
        >
          {p.media_type === "video" ? (
            <>
              <video
                src={p.media_url}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute bottom-1 right-1 text-white text-[10px] bg-black/60 rounded px-1">
                ▶
              </div>
            </>
          ) : (
            <img
              src={p.media_url}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function LikedGrid({
  videos,
}: {
  videos: Array<{ id: string; media_url: string }>;
}) {
  if (videos.length === 0) {
    return (
      <EmptyState
        icon={
          <img src={cachorro} alt="cachorro" className="size-16 object-contain" />
        }
        text="Você ainda não curtiu nenhum vídeo"
      />
    );
  }
  return (
    <div className="grid grid-cols-3 gap-1">
      {videos.map((v) => (
        <div
          key={v.id}
          className="aspect-square bg-black overflow-hidden rounded-md flex items-center justify-center"
        >
          <video
            src={v.media_url}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute bottom-1 right-1 text-white text-[10px] bg-black/60 rounded px-1">
            ▶
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  icon,
  text,
  cta,
}: {
  icon: React.ReactNode;
  text: string;
  cta?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-secondary/60 border border-border p-8 text-center">
      <div className="mb-2">{icon}</div>
      <p className="text-sm text-muted-foreground">{text}</p>
      {cta}
    </div>
  );
}

/* ------------ modal editar ------------ */

/* Mascotes do app que o usuário pode escolher como foto de perfil. */
const MASCOTS = [
  { id: "peludinho", label: "Peludinho", src: peludinho },
  { id: "passaro", label: "Pássaro", src: passaro },
  { id: "cachorro", label: "Cachorro", src: cachorro },
  { id: "gato", label: "Gato", src: gato },
  { id: "peixe", label: "Peixe", src: peixe },
];
type Mascot = (typeof MASCOTS)[number];

/* Tamanho máximo da foto enviada do dispositivo. */
const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

function EditModal({
  profile,
  onClose,
}: {
  profile: {
    display_name: string | null;
    bio: string | null;
    city: string | null;
    avatar_url: string | null;
  } | null;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [name, setName] = useState(profile?.display_name ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [city, setCity] = useState(profile?.city ?? "");
  const [avatar, setAvatar] = useState(profile?.avatar_url ?? "");
  const [busy, setBusy] = useState(false);
  // Foto escolhida: arquivo do dispositivo OU mascote (um anula o outro)
  const [file, setFile] = useState<File | null>(null);
  const [mascot, setMascot] = useState<Mascot | null>(null);
  // Imagem mostrada na prévia do modal
  const [preview, setPreview] = useState(profile?.avatar_url ?? "");
  const fileInput = useRef<HTMLInputElement>(null);

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = ""; // permite escolher o mesmo arquivo de novo
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

  function pickMascot(m: Mascot) {
    setMascot(m);
    setFile(null);
    setAvatar("");
    setPreview(m.src);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Se escolheu arquivo ou mascote, sobe para o storage e guarda a URL.
    // (A URL do mascote importado muda a cada build, por isso ele também é
    // enviado ao storage — assim a URL salva no banco nunca quebra.)
    let avatarUrl: string | null = avatar || null;
    try {
      if (file) {
        avatarUrl = await uploadImage("pet-photos", file);
      } else if (mascot) {
        const blob = await (await fetch(mascot.src)).blob();
        avatarUrl = await uploadImage(
          "pet-photos",
          new File([blob], `${mascot.id}.png`, { type: blob.type || "image/png" }),
        );
      }
    } catch (err) {
      setBusy(false);
      toast.error(
        err instanceof Error ? err.message : "Não foi possível enviar a imagem",
      );
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: name,
        bio,
        city,
        avatar_url: avatarUrl,
      })
      .eq("id", user.id);
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Perfil atualizado!");
    qc.invalidateQueries({ queryKey: ["me"] });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 grid place-items-end sm:place-items-center"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={save}
        className="w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-card rounded-t-3xl sm:rounded-3xl p-6 space-y-3"
      >
        <div className="flex items-center gap-2">
          <Camera className="size-5 text-primary" />
          <h3 className="font-display text-xl text-brand">Editar perfil</h3>
        </div>

        {/* FOTO DE PERFIL — prévia + enviar do dispositivo */}
        <div className="flex items-center gap-3">
          <div className="size-16 shrink-0 rounded-full bg-muted border-2 border-card shadow-soft overflow-hidden">
            <img
              src={preview || peludinho}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="px-4 py-2 rounded-full border border-border text-sm font-display text-brand inline-flex items-center gap-2 hover:bg-accent transition"
            >
              <Upload className="size-4" /> Escolher do dispositivo
            </button>
            <p className="text-[11px] text-muted-foreground mt-1">
              JPG, PNG ou WebP · até 5 MB
            </p>
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={pickFile}
          />
        </div>

        {/* FOTO DE PERFIL — escolher um mascote do Nuppy */}
        <div>
          <p className="text-xs text-muted-foreground mb-1.5">
            Ou escolha um mascote
          </p>
          <div className="flex items-center justify-between gap-2">
            {MASCOTS.map((m) => (
              <button
                key={m.id}
                type="button"
                title={m.label}
                aria-label={m.label}
                aria-pressed={mascot?.id === m.id}
                onClick={() => pickMascot(m)}
                className={`size-12 shrink-0 rounded-full overflow-hidden bg-muted border-2 transition ${
                  mascot?.id === m.id
                    ? "border-primary ring-2 ring-primary/40"
                    : "border-transparent hover:border-border"
                }`}
              >
                <img
                  src={m.src}
                  alt={m.label}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <input
          className="nuppy-input pl-4"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="w-full rounded-2xl border border-border bg-card p-3 text-sm"
          rows={2}
          placeholder="Biografia"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          className="nuppy-input pl-4"
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="nuppy-input pl-4"
          placeholder="URL da foto de perfil"
          value={avatar}
          onChange={(e) => {
            setAvatar(e.target.value);
            setFile(null);
            setMascot(null);
            setPreview(e.target.value);
          }}
        />
        <button disabled={busy} className="nuppy-btn-primary">
          {busy ? "Salvando..." : "Salvar alterações"}
        </button>
        <button type="button" onClick={onClose} className="nuppy-btn-ghost">
          Cancelar
        </button>
      </form>
    </div>
  );
}