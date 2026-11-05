/* ============================================================================
 *  PÁGINA: /comunidades  —  LISTA DE GRUPOS DE BATE-PAPO
 * ----------------------------------------------------------------------------
 *  Mostra as comunidades disponíveis (cachorros, gatos, peixes, etc.) —
 *  tabela `communities`. Cada card leva para /comunidade/$slug que é o
 *  chat em tempo real.
 *
 *  Membro entra/sai via tabela `community_members`.
 * ========================================================================== */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { ChevronLeft, Plus, Users, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import { ImageUpload } from "@/components/ImageUpload";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/comunidades")({
  head: () => ({ meta: [{ title: "Comunidades — Nuppy" }] }),
  component: ComunidadesPage,
});

type Community = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  emoji: string | null;
  created_by: string;
  community_members: { user_id: string }[];
};

const communitiesQuery = {
  queryKey: ["communities"],
  queryFn: async (): Promise<Community[]> => {
    const { data, error } = await supabase
      .from("communities")
      .select("id, name, slug, description, cover_url, emoji, created_by, community_members(user_id)")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data as unknown as Community[]) ?? [];
  },
};

function ComunidadesPage() {
  const [creating, setCreating] = useState(false);
  return (
    <MobileShell>
      <header className="px-4 pt-4 flex items-center justify-between">
        <Link to="/home" className="size-9 grid place-items-center rounded-full hover:bg-accent">
          <ChevronLeft className="size-5 text-brand" />
        </Link>
        <h1 className="font-display text-xl text-brand">Comunidades</h1>
        <button onClick={() => setCreating(true)} className="size-9 grid place-items-center rounded-full bg-primary text-primary-foreground">
          <Plus className="size-5" />
        </button>
      </header>

      <p className="px-4 mt-2 text-sm text-muted-foreground">
        Bate-papos por tipo de pet. Entre em um grupo e converse com outros tutores.
      </p>

      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Carregando...</div>}>
        <List />
      </Suspense>

      {creating && <CreateModal onClose={() => setCreating(false)} />}
    </MobileShell>
  );
}

function List() {
  const { data } = useSuspenseQuery(communitiesQuery);
  const qc = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null)
  const [editing, setEditing] = useState<Community | null>(null);
                                                ); }, []);

  async function join(c: Community) {
    async function deleteCommunity(c: Community) { const confirmed = window.confirm( `Deseja realmente excluir a comunidade "${c.name}"?` ); if (!confirmed) return; const { error } = await supabase .from("communities") .delete() .eq("id", c.id); if (error) { toast.error("Não foi possível excluir a comunidade."); return; } toast.success("Comunidade excluída!"); qc.invalidateQueries({ queryKey: ["communities"] }); }
    if (!userId) return;
    await supabase.from("community_members").insert({ community_id: c.id, user_id: userId });
    qc.invalidateQueries({ queryKey: ["communities"] });
  }

  if (data.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-6xl mb-2">👥</div>
        <p className="font-display text-brand">Nenhuma comunidade ainda</p>
      </div>
    );
  }
  return (
    <div className="px-4 mt-4 space-y-2 pb-24">
      {data.map((c) => {
        const joined = !!userId && c.community_members.some((m) => m.user_id === userId);
        return (
          <div key={c.id} className="nuppy-card p-3 flex items-center gap-3">
            <div className="size-14 rounded-full bg-gradient-to-br from-primary/30 to-accent grid place-items-center text-2xl overflow-hidden shrink-0">
              {c.cover_url ? <img src={c.cover_url} alt="" className="w-full h-full object-cover" /> : (c.emoji ?? "🐾")}
            </div>
            );
            })}
            {editing && (
  <EditModal
    community={editing}
    onClose={() => setEditing(null)}
  />
)}
          </div>
          );
    }
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-brand truncate">{c.emoji} {c.name}</h3>
              {c.description && <p className="text-xs text-muted-foreground line-clamp-1">{c.description}</p>}
              <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                <Users className="size-3" /> {c.community_members.length} membros
              </p>
            </div>
            {joined ? (
              <Link
                to="/comunidade/$slug"
                params={{ slug: c.slug }}
                className="px-3 py-2 rounded-full bg-primary text-primary-foreground text-xs font-display inline-flex items-center gap-1"
              >
                <MessageCircle className="size-4" /> Abrir
              </Link>
            ) : (
              <button
                onClick={() => join(c)}
                className="px-3 py-2 rounded-full bg-accent text-brand text-xs font-display"
              >
                Entrar
              </button>
            )}
            {/* CONTROLES EXCLUSIVOS DO CRIADOR */}
{userId === c.created_by && (
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={() => setEditing(c)}
      className="size-9 rounded-full bg-accent text-brand grid place-items-center"
      title="Editar comunidade"
    >
      <Pencil className="size-4" />
    </button>

    <button
      type="button"
      onClick={() => deleteCommunity(c)}
      className="size-9 rounded-full bg-destructive/10 text-destructive grid place-items-center"
      title="Excluir comunidade"
    >
      <Trash2 className="size-4" />
    </button>
  </div>
)}
          </div>
        );
      })}
    </div>
  );
}

function CreateModal({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: "", description: "", emoji: "🐾", cover_url: "" });
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Faça login");
      const slug = form.name.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 6);
      const { data: created, error } = await supabase.from("communities").insert({
        ...form, slug, created_by: user.id, cover_url: form.cover_url || null,
      }).select("id").single();
      if (error) throw error;
      // auto-join creator
      if (created) await supabase.from("community_members").insert({ community_id: created.id, user_id: user.id });
      toast.success("Comunidade criada!");
      qc.invalidateQueries({ queryKey: ["communities"] });
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally { setBusy(false); }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 grid place-items-end sm:place-items-center" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="w-full max-w-[480px] bg-card rounded-t-3xl sm:rounded-3xl p-6 space-y-3 max-h-[90vh] overflow-y-auto">
        <h3 className="font-display text-xl text-brand">Nova comunidade</h3>
        <div className="flex justify-center">
          <ImageUpload bucket="place-photos" shape="wide" value={form.cover_url} onChange={(url) => setForm((f) => ({ ...f, cover_url: url }))} label="Foto de capa" />
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <input className="nuppy-input pl-4 text-center text-xl" placeholder="🐾" value={form.emoji} onChange={(e) => setForm((f) => ({ ...f, emoji: e.target.value }))} />
          <input className="nuppy-input pl-4" placeholder="Nome da comunidade" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <textarea className="w-full rounded-2xl border border-border bg-card p-3 text-sm" rows={3} placeholder="Sobre o que é essa comunidade?" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        <button disabled={busy} className="nuppy-btn-primary">{busy ? "Criando..." : "Criar comunidade"}</button>
        <button type="button" onClick={onClose} className="nuppy-btn-ghost">Cancelar</button>
      </form>
    </div>
  );
}

function EditModal({
  community,
  onClose,
}: {
  community: Community;
  onClose: () => void;
}) {
  const qc = useQueryClient();

  const [form, setForm] = useState({
    name: community.name,
    description: community.description ?? "",
    emoji: community.emoji ?? "🐾",
    cover_url: community.cover_url ?? "",
  });

  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);

    try {
      const { error } = await supabase
        .from("communities")
        .update({
          name: form.name,
          description: form.description,
          emoji: form.emoji,
          cover_url: form.cover_url || null,
        })
        .eq("id", community.id);

      if (error) throw error;

      toast.success("Comunidade atualizada!");
      qc.invalidateQueries({ queryKey: ["communities"] });
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao atualizar");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 grid place-items-end sm:place-items-center"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={save}
        className="w-full max-w-[480px] bg-card rounded-t-3xl sm:rounded-3xl p-6 space-y-3 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="font-display text-xl text-brand">
          Editar comunidade
        </h3>

        <div className="flex justify-center">
          <ImageUpload
            bucket="place-photos"
            shape="wide"
            value={form.cover_url}
            onChange={(url) =>
              setForm((f) => ({ ...f, cover_url: url }))
            }
            label="Foto de capa"
          />
        </div>

        <div className="grid grid-cols-[80px_1fr] gap-3">
          <input
            className="nuppy-input pl-4 text-center text-xl"
            placeholder="🐾"
            value={form.emoji}
            onChange={(e) =>
              setForm((f) => ({ ...f, emoji: e.target.value }))
            }
          />

          <input
            className="nuppy-input pl-4"
            placeholder="Nome da comunidade"
            required
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
          />
        </div>

        <textarea
          className="w-full rounded-2xl border border-border bg-card p-3 text-sm"
          rows={3}
          placeholder="Sobre o que é essa comunidade?"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
        />

        <button disabled={busy} className="nuppy-btn-primary">
          {busy ? "Salvando..." : "Salvar alterações"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="nuppy-btn-ghost"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

