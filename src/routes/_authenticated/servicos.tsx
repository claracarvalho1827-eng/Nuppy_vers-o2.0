/* ============================================================================
 *  PÁGINA: /servicos  —  DIVULGAÇÃO DE SERVIÇOS PET
 * ----------------------------------------------------------------------------
 *  Espaço onde tutores/prestadores podem divulgar serviços (passeio,
 *  banho, adestramento, pet sitter). Lê e grava na tabela `services`.
 * ========================================================================== */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { ChevronLeft, Plus, MessageCircle, Instagram, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import { ImageUpload } from "@/components/ImageUpload";
import { toast } from "sonner";
import gato from "@/assets/gato.png";
import peixe from "@/assets/peixe.png";

export const Route = createFileRoute("/_authenticated/servicos")({
  head: () => ({ meta: [{ title: "Serviços Pet — Nuppy" }] }),
  component: ServicosPage,
});

type Service = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  price_range: string | null;
  city: string | null;
  whatsapp: string | null;
  instagram: string | null;
  photo_url: string | null;
};

const CATS = ["Banho & Tosa", "Passeador", "Adestrador", "Pet Sitter", "Veterinário", "Transporte", "Outro"];

const servicesQuery = {
  queryKey: ["services"],
  queryFn: async (): Promise<Service[]> => {
    const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
};

function ServicosPage() {
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  return (
    <MobileShell>
      <header className="px-4 pt-4 flex items-center justify-between">
        <Link to="/home" className="size-9 grid place-items-center rounded-full hover:bg-accent">
          <ChevronLeft className="size-5 text-brand" />
        </Link>
        <h1 className="font-display text-xl text-brand">Serviços Pet</h1>
        <button onClick={() => setCreating(true)} className="size-9 grid place-items-center rounded-full bg-primary text-primary-foreground">
          <Plus className="size-5" />
        </button>
      </header>

      <div className="px-4 mt-3 flex gap-2 overflow-x-auto pb-1">
        <button onClick={() => setFilter(null)} className={"shrink-0 px-3 py-1.5 rounded-full text-xs font-display " + (!filter ? "bg-primary text-primary-foreground" : "bg-card border border-border text-brand")}>Todos</button>
        {CATS.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={"shrink-0 px-3 py-1.5 rounded-full text-xs font-display " + (filter === c ? "bg-primary text-primary-foreground" : "bg-card border border-border text-brand")}>{c}</button>
        ))}
      </div>

      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Carregando...</div>}>
        <List filter={filter} />
      </Suspense>

      {creating && <CreateModal onClose={() => setCreating(false)} />}
    </MobileShell>
  );
}

function List({ filter }: { filter: string | null }) {
  const { data } = useSuspenseQuery(servicesQuery);
  const list = filter ? data.filter((s) => s.category === filter) : data;
  if (list.length === 0) {
    return (
      <div className="p-8 text-center">
        <img src={gato} alt="Gato" className="w-20 h-20 mx-auto mb-2 object-contain" />
        <p className="font-display text-brand">Nenhum serviço por aqui</p>
        <p className="text-sm text-muted-foreground mt-1">Divulgue seu serviço pet e ajude tutores!</p>
      </div>
    );
  }
  return (
    <div className="px-4 mt-4 space-y-3">
      {list.map((s) => (
        <div key={s.id} className="nuppy-card overflow-hidden flex">
          {s.photo_url ? (
            <img src={s.photo_url} alt={s.title} className="w-28 h-full object-cover" />
          ) : (
            <div className="w-28 bg-gradient-to-br from-primary/20 to-accent grid place-items-center text-4xl">🐾</div>
          )}
          <div className="flex-1 p-3 min-w-0">
            <p className="text-[11px] text-primary font-display">{s.category}</p>
            <h3 className="font-display text-brand truncate">{s.title}</h3>
            {s.description && <p className="text-xs text-muted-foreground line-clamp-2">{s.description}</p>}
            <div className="text-[11px] text-muted-foreground mt-1 flex flex-wrap gap-2">
              {s.city && <span className="flex items-center gap-0.5"><MapPin className="size-3" />{s.city}</span>}
              {s.price_range && <span>💰 {s.price_range}</span>}
            </div>
            <div className="mt-2 flex gap-2">
              {s.whatsapp && (
                <a href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full bg-green-500 text-white px-3 py-1 text-xs font-display">
                  <MessageCircle className="size-3" /> WhatsApp
                </a>
              )}
              {s.instagram && (
                <a href={`https://instagram.com/${s.instagram.replace(/^@/, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full bg-pink-500 text-white px-3 py-1 text-xs font-display">
                  <Instagram className="size-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CreateModal({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    title: "", category: "Banho & Tosa", description: "", price_range: "", city: "", whatsapp: "", instagram: "", photo_url: "",
  });
  const [busy, setBusy] = useState(false);
  const upd = <K extends keyof typeof form>(k: K) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Faça login");
      const { error } = await supabase.from("services").insert({
        ...form, provider_id: user.id, photo_url: form.photo_url || null,
      });
      if (error) throw error;
      toast.success("Serviço divulgado!");
      qc.invalidateQueries({ queryKey: ["services"] });
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally { setBusy(false); }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 grid place-items-end sm:place-items-center" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="w-full max-w-[480px] bg-card rounded-t-3xl sm:rounded-3xl p-6 space-y-3 max-h-[90vh] overflow-y-auto">
        <h3 className="font-display text-xl text-brand">Divulgar serviço</h3>
        <div className="flex justify-center">
          <ImageUpload bucket="service-photos" value={form.photo_url} onChange={(url) => setForm((f) => ({ ...f, photo_url: url }))} />
        </div>
        <input className="nuppy-input pl-4" placeholder="Título (ex: Banho e Tosa Patudos)" required value={form.title} onChange={upd("title")} />
        <select className="nuppy-input pl-4" value={form.category} onChange={upd("category")}>
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <textarea className="w-full rounded-2xl border border-border bg-card p-3 text-sm" rows={3} placeholder="Descrição do serviço" value={form.description} onChange={upd("description")} />
        <div className="grid grid-cols-2 gap-3">
          <input className="nuppy-input pl-4" placeholder="Cidade" value={form.city} onChange={upd("city")} />
          <input className="nuppy-input pl-4" placeholder="Faixa de preço" value={form.price_range} onChange={upd("price_range")} />
        </div>
        <input className="nuppy-input pl-4" placeholder="WhatsApp (com DDD)" value={form.whatsapp} onChange={upd("whatsapp")} />
        <input className="nuppy-input pl-4" placeholder="Instagram (@usuario)" value={form.instagram} onChange={upd("instagram")} />
        <button disabled={busy} className="nuppy-btn-primary">{busy ? "Publicando..." : "Publicar serviço"}</button>
        <button type="button" onClick={onClose} className="nuppy-btn-ghost">Cancelar</button>
      </form>
    </div>
  );
}
