import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, MapPin, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import { PET_COLUMNS, SPECIES, type AdoptionPet } from "@/lib/adocao";
import cachorro from "@/assets/cachorro.png";

export const Route = createFileRoute("/_authenticated/adocao/$petId")({
  head: () => ({ meta: [{ title: "Pet para adoção — Nuppy" }] }),
  component: PetAdocaoPage,
});

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-accent text-brand text-xs font-display px-3 py-1">{children}</span>
  );
}

function PetAdocaoPage() {
  const { petId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  const { data: pet, isLoading } = useQuery({
    queryKey: ["adoption-pet", petId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pets")
        .select(PET_COLUMNS)
        .eq("id", petId)
        .maybeSingle();
      if (error) throw error;
      return data as AdoptionPet | null;
    },
  });

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: async () => (await supabase.auth.getUser()).data.user,
  });

  async function markAdopted() {
    if (!confirm("Marcar como adotado? O pet sai da lista de adoção.")) return;
    setBusy(true);
    const { error } = await supabase
      .from("pets")
      .update({ for_adoption: false })
      .eq("id", petId);
    setBusy(false);
    if (error) return alert("Não foi possível atualizar. Tente de novo.");
    await queryClient.invalidateQueries({ queryKey: ["adoption-pets"] });
    await queryClient.invalidateQueries({ queryKey: ["adoption-pets-home"] });
    navigate({ to: ".." });
  }

  const header = (
    <header className="px-4 pt-4 flex items-center gap-3">
      <a href="/adocao" className="size-9 rounded-full bg-card border border-border grid place-items-center">
        <ArrowLeft className="size-4 text-brand" />
      </a>
      <h1 className="font-display text-lg text-brand">Pet para adoção</h1>
    </header>
  );

  if (isLoading) {
    return (
      <MobileShell>
        {header}
        <div className="px-4 mt-4 aspect-square rounded-2xl bg-muted animate-pulse" />
      </MobileShell>
    );
  }

  if (!pet) {
    return (
      <MobileShell>
        {header}
        <p className="px-4 mt-6 text-center text-sm text-muted-foreground">Pet não encontrado.</p>
      </MobileShell>
    );
  }

  const isOwner = !!me && me.id === pet.owner_id;
  const speciesLabel = SPECIES.find((s) => s.value === pet.species)?.label;
  const phone = (pet.contact_whatsapp ?? "").replace(/\D/g, "");
  const waNumber = phone.length <= 11 ? `55${phone}` : phone;
  const waText = encodeURIComponent(`Oi! Vi o ${pet.name} para adoção no Nuppy e gostaria de saber mais.`);

  return (
    <MobileShell>
      {header}

      <section className="px-4 mt-4 pb-8 space-y-4">
        <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
          {pet.photo_url ? (
            <img src={pet.photo_url} alt={pet.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center">
              <img src={cachorro} alt="" className="size-24 object-contain" />
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-2xl text-brand">{pet.name}</h2>
          {pet.city && (
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="size-4" />
              {pet.city}{pet.state ? `, ${pet.state}` : ""}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {speciesLabel && <Tag>{speciesLabel}</Tag>}
          {pet.gender && <Tag>{pet.gender === "femea" ? "Fêmea" : "Macho"}</Tag>}
          {pet.age && <Tag>{pet.age}</Tag>}
          {pet.size && <Tag>Porte {pet.size.toLowerCase()}</Tag>}
          {pet.color && <Tag>{pet.color}</Tag>}
          {pet.vaccinated && <Tag>Vacinado</Tag>}
          {pet.neutered && <Tag>Castrado</Tag>}
        </div>

        {pet.adoption_description && (
          <div className="nuppy-card p-4">
            <h3 className="font-display text-brand mb-1">Sobre</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{pet.adoption_description}</p>
          </div>
        )}

        {phone && (
          <a
            href={`https://wa.me/${waNumber}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-primary text-primary-foreground font-display py-3 flex items-center justify-center gap-2 shadow-soft"
          >
            <MessageCircle className="size-5" />
            Falar com o responsável
          </a>
        )}

        {isOwner && (
          <button
            onClick={markAdopted}
            disabled={busy}
            className="w-full rounded-full border border-border bg-card text-brand font-display py-3 disabled:opacity-60"
          >
            {busy ? "Atualizando..." : "Já foi adotado"}
          </button>
        )}
      </section>
    </MobileShell>
  );
}