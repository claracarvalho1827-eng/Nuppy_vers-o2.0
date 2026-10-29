import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import { GENDERS, SIZES, SPECIES, UFS, inputCls } from "@/lib/adocao";

export const Route = createFileRoute("/_authenticated/adocao/novo")({
  head: () => ({ meta: [{ title: "Colocar pet para adoção — Nuppy" }] }),
  component: NovoPetPage,
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-display text-brand mb-1 block">{label}</span>
      {children}
    </label>
  );
}

function NovoPetPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    species: "cachorro",
    gender: "",
    age: "",
    size: "",
    color: "",
    city: "",
    state: "",
    contact_whatsapp: "",
    adoption_description: "",
    neutered: false,
    vaccinated: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return setError("Escolha um arquivo de imagem.");
    if (f.size > 5 * 1024 * 1024) return setError("A foto precisa ter até 5 MB.");
    setError(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function onSubmit() {
    setError(null);
    if (!form.name.trim()) return setError("Informe o nome do pet.");
    if (!form.city.trim() || !form.state) return setError("Informe a cidade e o estado.");
    if (form.contact_whatsapp.replace(/\D/g, "").length < 10)
      return setError("Informe um WhatsApp válido, com DDD.");

    setSaving(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) throw new Error("Você precisa estar logada para cadastrar um pet.");

      // 1) foto no Storage (bucket pet-photos, pasta = id do usuário)
      let photo_url: string | null = null;
      if (file) {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("pet-photos")
          .upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        photo_url = supabase.storage.from("pet-photos").getPublicUrl(path).data.publicUrl;
      }

      // 2) linha na tabela pets
      const { data, error: insErr } = await (supabase as any)
        .from("pets")
        .insert({
          owner_id: user.id,
          for_adoption: true,
          name: form.name.trim(),
          species: form.species,
          gender: form.gender || null,
          age: form.age.trim() || null,
          size: form.size || null,
          color: form.color.trim() || null,
          city: form.city.trim(),
          state: form.state,
          contact_whatsapp: form.contact_whatsapp.replace(/\D/g, ""),
          adoption_description: form.adoption_description.trim() || null,
          neutered: form.neutered,
          vaccinated: form.vaccinated,
          photo_url,
        })
        .select("id")
        .single();
      if (insErr) throw insErr;

      await queryClient.invalidateQueries({ queryKey: ["adoption-pets"] });
      await queryClient.invalidateQueries({ queryKey: ["adoption-pets-home"] });
      navigate({ to: "/adocao/$petId", params: { petId: data.id } });
    } catch (e: any) {
      setError(e?.message ?? "Não foi possível salvar. Tente de novo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <MobileShell>
      <header className="px-4 pt-4 flex items-center gap-3">
        <Link to="/adocao" className="size-9 rounded-full bg-card border border-border grid place-items-center">
          <ArrowLeft className="size-4 text-brand" />
        </Link>
        <h1 className="font-display text-lg text-brand">Colocar pet para adoção</h1>
      </header>

      <section className="px-4 mt-4 pb-8 space-y-3">
        {/* FOTO */}
        <label className="block aspect-square rounded-2xl bg-muted overflow-hidden cursor-pointer relative">
          {preview ? (
            <img src={preview} alt="Prévia" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center text-muted-foreground text-sm">
              <div className="flex flex-col items-center gap-2">
                <Camera className="size-8" />
                Toque para escolher uma foto
              </div>
            </div>
          )}
          <input type="file" accept="image/*" onChange={onPickPhoto} className="hidden" />
        </label>

        <Field label="Nome do pet *">
          <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Bicho *">
            <select value={form.species} onChange={(e) => set("species", e.target.value)} className={inputCls}>
              {SPECIES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Sexo">
            <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className={inputCls}>
              <option value="">Não informar</option>
              {GENDERS.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Idade">
            <input
              value={form.age}
              onChange={(e) => set("age", e.target.value)}
              placeholder="Ex.: 2 anos"
              className={inputCls}
            />
          </Field>
          <Field label="Porte">
            <select value={form.size} onChange={(e) => set("size", e.target.value)} className={inputCls}>
              <option value="">Não informar</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Cor">
          <input value={form.color} onChange={(e) => set("color", e.target.value)} className={inputCls} />
        </Field>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <Field label="Cidade *">
              <input value={form.city} onChange={(e) => set("city", e.target.value)} className={inputCls} />
            </Field>
          </div>
          <Field label="Estado *">
            <select value={form.state} onChange={(e) => set("state", e.target.value)} className={inputCls}>
              <option value="">UF</option>
              {UFS.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="WhatsApp para contato *">
          <input
            value={form.contact_whatsapp}
            onChange={(e) => set("contact_whatsapp", e.target.value)}
            inputMode="tel"
            placeholder="(11) 91234-5678"
            className={inputCls}
          />
        </Field>

        <Field label="Conte mais sobre o pet">
          <textarea
            value={form.adoption_description}
            onChange={(e) => set("adoption_description", e.target.value)}
            rows={4}
            placeholder="Personalidade, rotina, por que está para adoção..."
            className={inputCls}
          />
        </Field>

        <div className="flex gap-6 text-sm text-brand">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.vaccinated} onChange={(e) => set("vaccinated", e.target.checked)} />
            Vacinado
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.neutered} onChange={(e) => set("neutered", e.target.checked)} />
            Castrado
          </label>
        </div>

        <p className="text-xs text-muted-foreground">
          O WhatsApp e a cidade aparecem para todos os usuários do app.
        </p>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          onClick={onSubmit}
          disabled={saving}
          className="w-full rounded-full bg-primary text-primary-foreground font-display py-3 shadow-soft disabled:opacity-60"
        >
          {saving ? "Salvando..." : "Publicar para adoção"}
        </button>
      </section>
    </MobileShell>
  );
}