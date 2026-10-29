import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Phone, Globe, Copy, HeartHandshake } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import peludinho from "@/assets/peludinho.png";

export const Route = createFileRoute("/_authenticated/ong/$ongId")({
  head: () => ({ meta: [{ title: "ONG — Nuppy" }] }),
  component: OngDetailsPage,
});

type Ong = {
  id: string;
  name: string;
  description: string | null;
  photo_url: string | null;
  city: string | null;
  phone?: string | null;
  website?: string | null;
  pix?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

function OngDetailsPage() {
  const { ongId } = Route.useParams();
  const { data: ong, isLoading, error } = useQuery({
    queryKey: ["ong", ongId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ongs")
        .select("*")
        .eq("id", ongId)
        .maybeSingle();
      if (error) throw error;
      return data as Ong | null;
    },
  });

  return (
    <MobileShell>
      <header className="px-4 pt-4 flex items-center gap-3">
        <Link to="/home" className="size-9 rounded-full bg-card border border-border grid place-items-center" aria-label="Voltar">
          <ArrowLeft className="size-4 text-brand" />
        </Link>
        <h1 className="font-display text-lg text-brand">Conheça a ONG</h1>
      </header>

      {isLoading ? (
        <div className="px-4 mt-4 space-y-3">
          <div className="aspect-video rounded-2xl bg-muted animate-pulse" />
          <div className="h-6 w-2/3 rounded bg-muted animate-pulse" />
          <div className="h-20 rounded bg-muted animate-pulse" />
        </div>
      ) : error ? (
        <p className="px-4 mt-6 text-center text-sm text-muted-foreground">Não foi possível carregar os dados desta ONG. Tente novamente.</p>
      ) : !ong ? (
        <p className="px-4 mt-6 text-center text-sm text-muted-foreground">ONG não encontrada.</p>
      ) : (
        <section className="px-4 mt-4 pb-8 space-y-4">
          <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
            <img src={ong.photo_url || peludinho} alt={ong.photo_url ? ong.name : ""} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-2xl text-brand">{ong.name}</h2>
            {ong.city && <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-4" />{ong.city}</p>}
          </div>
          {ong.description && <div className="rounded-2xl bg-card border border-border p-4"><h3 className="font-display text-brand mb-1">Sobre a ONG</h3><p className="text-sm text-muted-foreground whitespace-pre-line">{ong.description}</p></div>}
          {ong.phone && <a href={`tel:${ong.phone}`} className="w-full rounded-full bg-primary text-primary-foreground font-display py-3 flex items-center justify-center gap-2"><Phone className="size-4" />Entrar em contato</a>}
          {ong.website && <a href={ong.website} target="_blank" rel="noopener noreferrer" className="w-full rounded-full border border-border bg-card text-brand font-display py-3 flex items-center justify-center gap-2"><Globe className="size-4" />Visitar site</a>}
          {ong.latitude != null && ong.longitude != null && <a href={`https://www.google.com/maps?q=${ong.latitude},${ong.longitude}`} target="_blank" rel="noopener noreferrer" className="w-full rounded-full border border-border bg-card text-brand font-display py-3 flex items-center justify-center gap-2"><MapPin className="size-4" />Ver localização</a>}
          {ong.pix && <button onClick={() => { void navigator.clipboard?.writeText(ong.pix!); }} className="w-full rounded-full border border-border bg-card text-brand font-display py-3 flex items-center justify-center gap-2"><Copy className="size-4" />Copiar chave PIX</button>}
          <div className="rounded-2xl bg-secondary p-4 flex items-start gap-3"><HeartHandshake className="size-5 text-brand shrink-0" /><p className="text-sm text-muted-foreground">Entre em contato diretamente com a ONG para confirmar as formas de ajuda, doações e informações atualizadas.</p></div>
        </section>
      )}
    </MobileShell>
  );
}