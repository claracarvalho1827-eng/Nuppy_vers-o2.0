import { createFileRoute, Link } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import { ArrowLeft, Heart, MapPin, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import { PET_COLUMNS, SPECIES, UFS, inputCls, type AdoptionPet } from "@/lib/adocao";
import cachorro from "@/assets/cachorro.png";

export const Route = createFileRoute("/_authenticated/adocao/")({
  head: () => ({ meta: [{ title: "Adoção de pets — Nuppy" }] }),
  component: AdocaoPage,
});

function AdocaoPage() {
  const [species, setSpecies] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const deferredCity = useDeferredValue(city.trim());

  const { data, isLoading, error } = useQuery({
    queryKey: ["adoption-pets", species, state, deferredCity],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      let q = supabase
        .from("pets")
        .select(PET_COLUMNS)
        .eq("for_adoption", true)
        .order("created_at", { ascending: false });
      if (species) q = q.eq("species", species);
      if (state) q = q.eq("state", state);
      if (deferredCity) q = q.ilike("city", `%${deferredCity}%`);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as AdoptionPet[];
    },
  });

  return (
    <MobileShell>
      <header className="px-4 pt-4 flex items-center justify-between">
        <Link to="/home" className="size-9 rounded-full bg-card border border-border grid place-items-center">
          <ArrowLeft className="size-4 text-brand" />
        </Link>
        <h1 className="font-display text-lg text-brand">Adoção de Pets</h1>
        <Link
          to="/adocao/novo"
          className="size-9 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-soft"
          aria-label="Colocar pet para adoção"
        >
          <Plus className="size-4" />
        </Link>
      </header>

      {/* FILTROS */}
      <section className="px-4 mt-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <select value={species} onChange={(e) => setSpecies(e.target.value)} className={inputCls}>
            <option value="">Todos os bichos</option>
            {SPECIES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <select value={state} onChange={(e) => setState(e.target.value)} className={inputCls}>
            <option value="">Todos os estados</option>
            {UFS.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Cidade (ex.: São Paulo)"
          className={inputCls}
        />
      </section>

      {/* RESULTADOS */}
      <section className="px-4 mt-4 pb-6">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <p className="rounded-2xl bg-secondary p-6 text-center text-sm text-muted-foreground">
            Não foi possível carregar os pets agora.
          </p>
        ) : !data || data.length === 0 ? (
          <div className="rounded-2xl bg-secondary p-6 text-center text-sm text-muted-foreground">
            <img src={cachorro} alt="" className="size-16 mx-auto mb-2 object-contain" />
            Nenhum pet encontrado com esses filtros.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {data.map((pet) => (
              <Link
                key={pet.id}
                to="/adocao/$petId"
                params={{ petId: pet.id }}
                className="rounded-2xl bg-accent p-2 relative block"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                  {pet.photo_url ? (
                    <img src={pet.photo_url} alt={pet.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full grid place-items-center">
                      <img src={cachorro} alt="" className="size-16 object-contain" />
                    </div>
                  )}
                </div>
                <Heart className="size-5 absolute top-3 right-3 text-love fill-love" />
                <div className="mt-2 px-1">
                  <p className="font-display text-brand">{pet.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-between">
                    <span>{pet.age ?? "—"}</span>
                    {pet.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {pet.city}{pet.state ? `, ${pet.state}` : ""}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </MobileShell>
  );
}