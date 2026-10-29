import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search, Mic, Heart, MapPin, Plus } from "lucide-react";
import { Suspense } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NuppyLogo } from "@/components/NuppyLogo";
import { MobileShell } from "@/components/MobileShell";
import { PET_COLUMNS, type AdoptionPet } from "@/lib/adocao";
import peludinho from "@/assets/peludinho.png";
import passaro from "@/assets/passaro.png";
import cachorro from "@/assets/cachorro.png";
import gato from "@/assets/gato.png";
import peixe from "@/assets/peixe.png";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({ meta: [{ title: "Início — Nuppy" }] }),
  component: HomePage,
});

const categories = [
  { label: "Adoção", image: cachorro, bg: "from-pink-200 to-orange-100" },
  { label: "Veterinário", image: gato, bg: "from-amber-200 to-orange-100" },
  { label: "Pet Shop", image: peixe, bg: "from-sky-200 to-orange-100" },
] as const;

function HomePage() {
  return (
    <MobileShell>
      {/* CABEÇALHO */}
      <header className="relative pt-4 pb-2 px-4">
        <div className="flex justify-center">
          <NuppyLogo className="h-32 drop-shadow-sm" />
        </div>
        <div className="-mt-6 flex justify-center">
          <span className="rounded-full bg-primary text-primary-foreground text-xs font-display px-4 py-1.5 shadow-soft">
            Onde todo animal encontra cuidado.
          </span>
        </div>
      </header>

      {/* BUSCA */}
      <div className="px-4 mt-4">
        <label className="relative block">
          <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Buscar..."
            className="w-full rounded-full bg-card border border-border pl-11 pr-12 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button className="absolute right-1.5 top-1/2 -translate-y-1/2 size-9 rounded-full bg-primary grid place-items-center text-primary-foreground">
            <Mic className="size-4" />
          </button>
        </label>
      </div>

      {/* DESTAQUE */}
      <section className="px-4 mt-6">
        <h2 className="font-display text-lg text-brand mb-2">Destaque</h2>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((c) => (
            <Link
              key={c.label}
              to="/estabelecimentos"
              className={`rounded-2xl bg-gradient-to-br ${c.bg} aspect-square flex flex-col items-end p-2 shadow-card hover:scale-[1.02] transition`}
            >
              <img src={c.image} alt="" className="size-14 ml-auto object-contain drop-shadow-sm" />
              <span className="mt-auto font-display text-sm text-brand">{c.label}</span>
            </Link>
          ))}
        </div>

        <Link
          to="/estabelecimentos"
          className="mt-3 nuppy-card p-4 flex items-center justify-between hover:shadow-soft transition"
        >
          <div>
            <p className="font-display text-brand">Estabelecimentos pet</p>
            <p className="text-xs text-muted-foreground">ONGs, banho, hotéis, alimentação e mais</p>
          </div>
          <img src={peludinho} alt="" className="size-12 object-contain" />
        </Link>

        <Link
          to="/servicos"
          className="mt-3 nuppy-card p-4 flex items-center justify-between hover:shadow-soft transition"
        >
          <div>
            <p className="font-display text-brand">Serviços pet</p>
            <p className="text-xs text-muted-foreground">Consultas, adestramento, veterinária e mais</p>
          </div>
          <img src={passaro} alt="" className="size-12 object-contain" />
        </Link>
      </section>

      {/* ONGs */}
      <section className="px-4 mt-6">
        <div className="nuppy-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={peludinho} alt="" className="size-7 object-contain" />
              <h2 className="font-display text-lg text-brand">ONGs</h2>
            </div>
            <Link to="/ongs" className="text-sm font-display text-primary">Ver todas →</Link>
          </div>
          <Suspense fallback={<div className="h-40 mt-3 grid grid-cols-2 gap-3"><Skel /><Skel /></div>}>
            <OngsList />
          </Suspense>
        </div>
      </section>

      {/* ADOÇÃO DE PETS */}
      <section className="px-4 mt-6">
        <div className="nuppy-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={cachorro} alt="" className="size-7 object-contain" />
              <h2 className="font-display text-lg text-brand">Adoção de Pets</h2>
            </div>
            <Link to="/adocao" className="text-sm font-display text-primary">Ver tudo →</Link>
          </div>

          <Suspense fallback={<div className="h-40 mt-3 grid grid-cols-2 gap-3"><Skel /><Skel /></div>}>
            <PetsForAdoption />
          </Suspense>

          <Link
            to="/adocao/novo"
            className="mt-3 w-full rounded-full bg-primary text-primary-foreground font-display text-sm py-2.5 flex items-center justify-center gap-1.5 shadow-soft"
          >
            <Plus className="size-4" />
            Colocar pet para adoção
          </Link>
        </div>
      </section>
    </MobileShell>
  );
}

function Skel() {
  return <div className="rounded-2xl bg-muted animate-pulse" />;
}

/* ---------------------------- ONGs ---------------------------- */
const ongsQuery = {
  queryKey: ["ongs"],
  queryFn: async () => {
    const { data, error } = await (supabase as any)
      .from("ongs")
      .select("id, name, description, photo_url, city")
      .order("created_at", { ascending: false })
      .limit(6);
    if (error) throw error;
    return (data ?? []) as {
      id: string;
      name: string;
      description: string | null;
      photo_url: string | null;
      city: string | null;
    }[];
  },
};

function OngsList() {
  const { data } = useSuspenseQuery(ongsQuery);

  if (data.length === 0) {
    return (
      <div className="mt-3 rounded-2xl bg-secondary p-6 text-center text-sm text-muted-foreground">
        Nenhuma ONG cadastrada ainda.
      </div>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      {data.slice(0, 2).map((ong) => (
        <Link
          key={ong.id}
          to="/ong/$ongId"
          params={{ ongId: ong.id }}
          className="rounded-2xl bg-accent p-2 block"
        >
          <div className="aspect-square rounded-xl overflow-hidden bg-muted">
            {ong.photo_url ? (
              <img src={ong.photo_url} alt={ong.name} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className="w-full h-full grid place-items-center">
                <img src={peludinho} alt="" className="size-16 object-contain" />
              </div>
            )}
          </div>
          <div className="mt-2 px-1">
            <p className="font-display text-brand line-clamp-1">{ong.name}</p>
            {ong.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">{ong.description}</p>
            )}
            {ong.city && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="size-3" />
                {ong.city}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ------------------------ PETS PARA ADOÇÃO ------------------------ */
const adoptionQuery = {
  queryKey: ["adoption-pets-home"],
  queryFn: async () => {
    const { data, error } = await (supabase as any)
      .from("pets")
      .select(PET_COLUMNS)
      .eq("for_adoption", true)
      .order("created_at", { ascending: false })
      .limit(6);
    if (error) throw error;
    return (data ?? []) as AdoptionPet[];
  },
};

function PetsForAdoption() {
  const { data } = useSuspenseQuery(adoptionQuery);

  if (data.length === 0) {
    return (
      <div className="mt-3 rounded-2xl bg-secondary p-6 text-center text-sm text-muted-foreground">
        Nenhum pet para adoção ainda. Seja o primeiro a cadastrar!
      </div>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      {data.slice(0, 2).map((pet) => (
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
                  {pet.city}
                  {pet.state ? `, ${pet.state}` : ""}
                </span>
              )}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}