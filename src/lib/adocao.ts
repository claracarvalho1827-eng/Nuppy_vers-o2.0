export const UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
] as const;

export const SPECIES = [
  { value: "cachorro", label: "Cachorro" },
  { value: "gato", label: "Gato" },
  { value: "outro", label: "Outro" },
] as const;

export const GENDERS = [
  { value: "macho", label: "Macho" },
  { value: "femea", label: "Fêmea" },
] as const;

export const SIZES = ["Pequeno", "Médio", "Grande"] as const;

export const inputCls =
  "w-full rounded-xl bg-card border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30";

export const PET_COLUMNS =
  "id, owner_id, name, species, age, gender, size, color, city, state, photo_url, neutered, vaccinated, adoption_description, contact_whatsapp, created_at";

export type AdoptionPet = {
  id: string;
  owner_id: string;
  name: string;
  species: string | null;
  age: string | null;
  gender: string | null;
  size: string | null;
  color: string | null;
  city: string | null;
  state: string | null;
  photo_url: string | null;
  neutered: boolean | null;
  vaccinated: boolean | null;
  adoption_description: string | null;
  contact_whatsapp: string | null;
  created_at: string;
};