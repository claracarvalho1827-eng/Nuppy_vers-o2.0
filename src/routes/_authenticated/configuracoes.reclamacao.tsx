/* ============================================================================
 *  PÁGINA: /configuracoes/reclamacao  —  ENVIAR RECLAMAÇÃO / SUGESTÃO / DENÚNCIA
 * ----------------------------------------------------------------------------
 *  Duas abas:
 *    • Nova         → formulário (assunto + mensagem). Nome e e-mail vêm da conta.
 *    • Minhas       → histórico do usuário com status Pendente / Resolvida.
 *
 *  Grava na tabela `reclamacoes` (a mesma que o painel admin do site lê).
 *
 *  DENÚNCIA (preparado para o futuro):
 *    Um botão "Denunciar" em qualquer post/comentário/perfil só precisa abrir:
 *
 *      <Link to="/configuracoes/reclamacao" search={{ tipo: "post", id: post.id }}>
 *
 *    Tipos aceitos: post, comentario, perfil, mensagem, estabelecimento, servico.
 *    A página então mostra "Você está denunciando uma publicação", já seleciona
 *    o assunto "Denúncia de conteúdo" e grava referencia_tipo / referencia_id.
 *
 *  Limites (também valem no banco, via trigger):
 *    • até 5 reclamações pendentes por usuário
 *    • até 10 reclamações por dia
 * ========================================================================== */
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock,
  Flag,
  Loader2,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import { inputCls } from "@/lib/adocao";
import peludinho from "@/assets/peludinho.png";

/* ---------- constantes ---------- */
const MAX_CHARS = 3000; // mesmo limite do banco
const MIN_CHARS = 10;
const MAX_ABERTAS = 5; // mesmo limite do trigger

const ASSUNTOS = [
  { value: "Problema no app", hint: "Algo não funciona como deveria." },
  { value: "Denúncia de conteúdo", hint: "Publicação, comentário, perfil ou mensagem que viola as regras." },
  { value: "Estabelecimento ou ONG", hint: "Informação errada ou problema com um local do mapa." },
  { value: "Sugestão", hint: "Uma ideia para deixar o Nuppy melhor." },
  { value: "Outro", hint: "Qualquer outro assunto." },
] as const;

const DENUNCIA = "Denúncia de conteúdo";

const REFERENCIAS = {
  post: "uma publicação",
  comentario: "um comentário",
  perfil: "um perfil",
  mensagem: "uma mensagem de comunidade",
  estabelecimento: "um estabelecimento",
  servico: "um serviço",
} as const;
type RefTipo = keyof typeof REFERENCIAS;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ReclamacaoSearch = { tipo?: RefTipo; id?: string };

export const Route = createFileRoute("/_authenticated/configuracoes/reclamacao" as never)({
  head: () => ({ meta: [{ title: "Enviar reclamação — Nuppy" }] }),
  // ?tipo=post&id=<uuid>  → modo denúncia. Valores inválidos são ignorados.
  validateSearch: (s: Record<string, unknown>): ReclamacaoSearch => {
    const tipo =
      typeof s.tipo === "string" && Object.prototype.hasOwnProperty.call(REFERENCIAS, s.tipo)
        ? (s.tipo as RefTipo)
        : undefined;
    const id = typeof s.id === "string" && UUID.test(s.id) ? s.id : undefined;
    return tipo && id ? { tipo, id } : {};
  },
  component: ReclamacaoPage,/* ============================================================================
 *  PÁGINA: /configuracoes/reclamacao  —  ENVIAR RECLAMAÇÃO / SUGESTÃO / DENÚNCIA
 * ----------------------------------------------------------------------------
 *  Duas abas:
 *    • Nova         → formulário (assunto + mensagem). Nome e e-mail vêm da conta.
 *    • Minhas       → histórico do usuário com status Pendente / Resolvida.
 *
 *  Grava na tabela `reclamacoes` (a mesma que o painel admin do site lê).
 *
 *  DENÚNCIA (preparado para o futuro):
 *    Um botão "Denunciar" em qualquer post/comentário/perfil só precisa abrir:
 *
 *      <Link to="/configuracoes/reclamacao" search={{ tipo: "post", id: post.id }}>
 *
 *    Tipos aceitos: post, comentario, perfil, mensagem, estabelecimento, servico.
 *    A página então mostra "Você está denunciando uma publicação", já seleciona
 *    o assunto "Denúncia de conteúdo" e grava referencia_tipo / referencia_id.
 *
 *  Limites (também valem no banco, via trigger):
 *    • até 5 reclamações pendentes por usuário
 *    • até 10 reclamações por dia
 * ========================================================================== */
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock,
  Flag,
  Loader2,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/MobileShell";
import { inputCls } from "@/lib/adocao";
import peludinho from "@/assets/peludinho.png";

/* ---------- constantes ---------- */
const MAX_CHARS = 3000; // mesmo limite do banco
const MIN_CHARS = 10;
const MAX_ABERTAS = 5; // mesmo limite do trigger

const ASSUNTOS = [
  { value: "Problema no app", hint: "Algo não funciona como deveria." },
  { value: "Denúncia de conteúdo", hint: "Publicação, comentário, perfil ou mensagem que viola as regras." },
  { value: "Estabelecimento ou ONG", hint: "Informação errada ou problema com um local do mapa." },
  { value: "Sugestão", hint: "Uma ideia para deixar o Nuppy melhor." },
  { value: "Outro", hint: "Qualquer outro assunto." },
] as const;

const DENUNCIA = "Denúncia de conteúdo";

const REFERENCIAS = {
  post: "uma publicação",
  comentario: "um comentário",
  perfil: "um perfil",
  mensagem: "uma mensagem de comunidade",
  estabelecimento: "um estabelecimento",
  servico: "um serviço",
} as const;
type RefTipo = keyof typeof REFERENCIAS;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ReclamacaoSearch = { tipo?: RefTipo; id?: string };

export const Route = createFileRoute("/_authenticated/configuracoes/reclamacao")({
  head: () => ({ meta: [{ title: "Enviar reclamação — Nuppy" }] }),
  // ?tipo=post&id=<uuid>  → modo denúncia. Valores inválidos são ignorados.
  validateSearch: (s: Record<string, unknown>): ReclamacaoSearch => {
    const tipo =
      typeof s.tipo === "string" && Object.prototype.hasOwnProperty.call(REFERENCIAS, s.tipo)
        ? (s.tipo as RefTipo)
        : undefined;
    const id = typeof s.id === "string" && UUID.test(s.id) ? s.id : undefined;
    return tipo && id ? { tipo, id } : {};
  },
  component: ReclamacaoPage,
});

/* ---------- tipos e helpers ---------- */
type Reclamacao = {
  id: string;
  assunto: string | null;
  mensagem: string;
  status: "aberta" | "resolvida";
  created_at: string;
  resolvida_em: string | null;
  referencia_tipo: string | null;
};

const fmtData = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
    : "";

function mensagemDeErro(err: unknown): string {
  const txt = err instanceof Error ? err.message : typeof err === "object" && err && "message" in err ? String((err as { message: unknown }).message) : "";
  if (txt.includes("limite_reclamacoes_abertas"))
    return `Você já tem ${MAX_ABERTAS} reclamações pendentes. Aguarde a equipe resolver alguma para enviar outra.`;
  if (txt.includes("limite_reclamacoes_diario"))
    return "Você atingiu o limite de envios de hoje. Tente novamente amanhã.";
  const code = typeof err === "object" && err && "code" in err ? String((err as { code: unknown }).code) : "";
  return "Não foi possível enviar agora. Confira sua conexão e tente de novo." + (code ? ` (código ${code})` : "");
}

/* ---------- página ---------- */
function ReclamacaoPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { tipo, id: refId } = Route.useSearch() as ReclamacaoSearch;
  const ref = tipo && refId ? { tipo, id: refId } : null;

  const [aba, setAba] = useState<"nova" | "minhas">("nova");
  const [assunto, setAssunto] = useState<string>(ref ? DENUNCIA : ASSUNTOS[0].value);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  /* Quem está enviando: nome e e-mail vêm da conta (ninguém digita de novo). */
  const { data: me, isError: meErro } = useQuery({
    queryKey: ["reclamacao-me"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Sessão expirada");
      const { data: p } = await supabase
        .from("profiles")
        .select("display_name, username")
        .eq("id", user.id)
        .maybeSingle();
      return { id: user.id, email: user.email ?? null, nome: p?.display_name || p?.username || null };
    },
    staleTime: 5 * 60 * 1000,
  });

  /* Histórico. O filtro por user_id é necessário porque administradores
     enxergam as reclamações de todo mundo pela policy de admin. */
  const historico = useQuery({
    queryKey: ["minhas-reclamacoes", me?.id],
    enabled: !!me,
    queryFn: async (): Promise<Reclamacao[]> => {
      const { data, error } = await supabase
        .from("reclamacoes")
        .select("id, assunto, mensagem, status, created_at, resolvida_em, referencia_tipo")
        .eq("user_id", me!.id)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) {
        console.error("[reclamacao] erro ao carregar histórico:", error);
        throw error;
      }
      return (data ?? []) as Reclamacao[];
    },
  });

  const lista = historico.data ?? [];
  const pendentes = lista.filter((r) => r.status === "aberta").length;
  const limiteAtingido = pendentes >= MAX_ABERTAS;

  const enviar = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("reclamacoes").insert({
        assunto,
        mensagem: mensagem.trim(),
        nome: me?.nome ?? null,
        email: me?.email ?? null,
        referencia_tipo: ref?.tipo ?? null,
        referencia_id: ref?.id ?? null,
      });
      if (error) throw error;
    },
    onSuccess: async () => {
      setMensagem("");
      setErro(null);
      await queryClient.invalidateQueries({ queryKey: ["minhas-reclamacoes"] });
      if (ref) {
        toast.success("Denúncia enviada");
        voltarDaDenuncia();
        return;
      }
      toast.success("Reclamação enviada");
      setAba("minhas");
    },
    onError: (err) => {
      console.error("[reclamacao] erro ao enviar:", err);
      setErro(mensagemDeErro(err));
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (enviar.isPending || limiteAtingido) return;
    if (mensagem.trim().length < MIN_CHARS) {
      setErro(`Conte um pouco mais: escreva pelo menos ${MIN_CHARS} caracteres.`);
      return;
    }
    setErro(null);
    enviar.mutate();
  }

  /* Na denúncia, "voltar" leva de volta ao post/comentário (feed), não ao Contato. */
  function voltarDaDenuncia() {
    if (window.history.length > 1) router.history.back();
    else navigate({ to: "/social" });
  }

  const hintAssunto = ASSUNTOS.find((a) => a.value === assunto)?.hint;

  return (
    <MobileShell>
      <header className="px-4 pt-4 grid grid-cols-[40px_1fr_40px] items-center mb-4">
        {ref ? (
          <button
            type="button"
            onClick={voltarDaDenuncia}
            aria-label="Voltar"
            className="size-9 grid place-items-center rounded-full hover:bg-accent"
          >
            <ChevronLeft className="size-5 text-brand" />
          </button>
        ) : (
          <Link
            to="/configuracoes/contato"
            aria-label="Voltar"
            className="size-9 grid place-items-center rounded-full hover:bg-accent"
          >
            <ChevronLeft className="size-5 text-brand" />
          </Link>
        )}
        <h1 className="font-display text-lg text-brand text-center">{ref ? "Denunciar" : "Enviar reclamação"}</h1>
        <span />
      </header>

      {/* ABAS */}
      <div className="px-4">
        <div role="tablist" aria-label="Reclamações" className="nuppy-card p-1 grid grid-cols-2 gap-1">
          <button
            role="tab"
            id="tab-nova"
            aria-selected={aba === "nova"}
            aria-controls="painel-nova"
            onClick={() => setAba("nova")}
            className={
              "rounded-full py-2 text-sm font-display transition " +
              (aba === "nova" ? "bg-primary text-primary-foreground shadow-soft" : "text-brand hover:bg-accent")
            }
          >
            Nova
          </button>
          <button
            role="tab"
            id="tab-minhas"
            aria-selected={aba === "minhas"}
            aria-controls="painel-minhas"
            onClick={() => setAba("minhas")}
            className={
              "rounded-full py-2 text-sm font-display transition flex items-center justify-center gap-2 " +
              (aba === "minhas" ? "bg-primary text-primary-foreground shadow-soft" : "text-brand hover:bg-accent")
            }
          >
            Minhas
            {pendentes > 0 && (
              <span
                aria-label={`${pendentes} pendente${pendentes > 1 ? "s" : ""}`}
                className={
                  "min-w-5 h-5 px-1.5 rounded-full text-[11px] grid place-items-center " +
                  (aba === "minhas" ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground")
                }
              >
                {pendentes}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- NOVA */}
      {aba === "nova" && (
        <form
          id="painel-nova"
          role="tabpanel"
          aria-labelledby="tab-nova"
          onSubmit={onSubmit}
          noValidate
          className="px-4 mt-4 pb-8 space-y-4"
        >
          {/* Modo denúncia */}
          {ref && (
            <div className="nuppy-card-float p-3 flex items-start gap-3">
              <div className="size-9 shrink-0 rounded-full bg-destructive/15 text-destructive grid place-items-center">
                <Flag className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-brand text-sm">Você está denunciando {REFERENCIAS[ref.tipo as RefTipo]}</p>
                <p className="text-xs text-muted-foreground">
                  Já identificamos o conteúdo. Conte o que aconteceu para a equipe analisar.
                </p>
              </div>
              <button
                type="button"
                aria-label="Remover denúncia"
                onClick={() => navigate({ to: ".", search: {}, replace: true })}
                className="size-8 shrink-0 grid place-items-center rounded-full hover:bg-accent"
              >
                <X className="size-4 text-brand" />
              </button>
            </div>
          )}

          {/* Assunto */}
          <fieldset>
            <legend className="text-xs font-display text-brand mb-2">Sobre o que você quer falar?</legend>
            <div role="radiogroup" className="flex flex-wrap gap-2">
              {ASSUNTOS.map((a) => {
                const ativo = assunto === a.value;
                return (
                  <button
                    key={a.value}
                    type="button"
                    role="radio"
                    aria-checked={ativo}
                    onClick={() => setAssunto(a.value)}
                    className={
                      "rounded-full px-4 min-h-10 text-sm font-display border transition " +
                      (ativo
                        ? "bg-primary text-primary-foreground border-primary shadow-soft"
                        : "bg-card text-brand border-border hover:bg-accent")
                    }
                  >
                    {a.value}
                  </button>
                );
              })}
            </div>
            {hintAssunto && <p className="mt-2 text-xs text-muted-foreground">{hintAssunto}</p>}
          </fieldset>

          {/* Mensagem */}
          <div>
            <label htmlFor="rec-msg" className="text-xs font-display text-brand mb-1 block">
              Sua mensagem *
            </label>
            <textarea
              id="rec-msg"
              value={mensagem}
              onChange={(e) => {
                setMensagem(e.target.value);
                if (erro) setErro(null);
              }}
              maxLength={MAX_CHARS}
              rows={7}
              aria-invalid={!!erro}
              aria-describedby="rec-ajuda"
              placeholder="Conte o que aconteceu, onde e quando. Quanto mais detalhes, mais rápido conseguimos ajudar."
              className={inputCls + " resize-none"}
            />
            <div id="rec-ajuda" className="mt-1 flex items-start justify-between gap-3 text-[11px] text-muted-foreground">
              <span>Mínimo de {MIN_CHARS} caracteres.</span>
              <span className={mensagem.length > MAX_CHARS - 200 ? "text-destructive" : ""}>
                {mensagem.length}/{MAX_CHARS}
              </span>
            </div>
          </div>

          {/* Quem envia */}
          <div className="nuppy-card p-3 flex items-center gap-3">
            <img src={peludinho} alt="" className="size-9 object-contain shrink-0" />
            <div className="min-w-0 text-xs">
              <p className="text-muted-foreground">Enviando como</p>
              {me ? (
                <p className="font-display text-brand truncate">
                  {me.nome ?? "Sua conta"}
                  {me.email ? <span className="text-muted-foreground font-sans"> · {me.email}</span> : null}
                </p>
              ) : (
                <div className="h-4 w-40 rounded bg-muted animate-pulse mt-1" />
              )}
            </div>
          </div>

          {/* Privacidade */}
          <div className="rounded-2xl bg-muted/60 border border-border/60 p-3 flex gap-3">
            <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Só a equipe do Nuppy lê sua mensagem, e usamos seu nome e e-mail apenas para tratar este caso. Não
              envie senhas, dados de cartão ou documentos.{" "}
              <Link to="/configuracoes/privacidade-politica" className="text-primary font-display underline underline-offset-2">
                Política de privacidade
              </Link>
            </p>
          </div>

          {/* Limite de pendentes */}
          {limiteAtingido && (
            <div role="status" className="nuppy-card p-3 flex gap-3">
              <Clock className="size-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-foreground leading-relaxed">
                Você tem {pendentes} reclamações pendentes, que é o máximo por vez. Assim que a equipe resolver uma
                delas, você poderá enviar outra.{" "}
                <button type="button" onClick={() => setAba("minhas")} className="text-primary font-display underline underline-offset-2">
                  Ver minhas reclamações
                </button>
              </p>
            </div>
          )}

          {erro && (
            <p role="alert" className="text-sm text-destructive">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={enviar.isPending || limiteAtingido}
            className="nuppy-btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
          >
            {enviar.isPending ? (
              <>
                <Loader2 className="size-5 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                <Send className="size-5" /> {ref ? "Enviar denúncia" : "Enviar reclamação"}
              </>
            )}
          </button>
        </form>
      )}

      {/* -------------------------------------------------------------- MINHAS */}
      {aba === "minhas" && (
        <section
          id="painel-minhas"
          role="tabpanel"
          aria-labelledby="tab-minhas"
          className="px-4 mt-4 pb-8"
        >
          {historico.isPending && !meErro ? (
            <div className="space-y-3" aria-busy="true" aria-label="Carregando">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : historico.isError || meErro ? (
            <div className="nuppy-card p-4 text-center space-y-3">
              <p className="text-sm text-foreground">Não foi possível carregar suas reclamações.</p>
              <button onClick={() => (meErro ? window.location.reload() : historico.refetch())} className="nuppy-btn-ghost">
                Tentar de novo
              </button>
            </div>
          ) : lista.length === 0 ? (
            <div className="nuppy-card p-6 text-center">
              <img src={peludinho} alt="" className="size-16 object-contain mx-auto" />
              <p className="font-display text-brand mt-3">Nenhuma reclamação por aqui</p>
              <p className="text-xs text-muted-foreground mt-1">
                Quando você enviar uma, ela aparece aqui com o andamento.
              </p>
              <button onClick={() => setAba("nova")} className="nuppy-btn-ghost mt-4">
                Enviar reclamação
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                {pendentes > 0
                  ? `${pendentes} pendente${pendentes > 1 ? "s" : ""} · ${lista.length - pendentes} resolvida${lista.length - pendentes === 1 ? "" : "s"}`
                  : `${lista.length} resolvida${lista.length === 1 ? "" : "s"}`}
              </p>
              <ul className="space-y-3">
                {lista.map((r) => (
                  <ItemHistorico key={r.id} r={r} />
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </MobileShell>
  );
}

/* ---------- item do histórico ---------- */
function ItemHistorico({ r }: { r: Reclamacao }) {
  const [aberto, setAberto] = useState(false);
  const resolvida = r.status === "resolvida";
  const longa = r.mensagem.length > 140 || r.mensagem.includes("\n");

  return (
    <li className="nuppy-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-brand text-sm flex items-center gap-1.5">
            {r.referencia_tipo && <Flag className="size-3.5 text-destructive shrink-0" aria-label="Denúncia" />}
            <span className="truncate">{r.assunto || "Sem assunto"}</span>
          </p>
          <p className="text-[11px] text-muted-foreground">Enviada em {fmtData(r.created_at)}</p>
        </div>
        <span
          className={
            "shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-display border " +
            (resolvida
              ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-800"
              : "bg-accent text-accent-foreground border-border/60")
          }
        >
          {resolvida ? <CheckCircle2 className="size-3" /> : <Clock className="size-3" />}
          {resolvida ? "Resolvida" : "Pendente"}
        </span>
      </div>

      <p className={"mt-2 text-sm text-foreground whitespace-pre-line break-words " + (aberto ? "" : "line-clamp-3")}>
        {r.mensagem}
      </p>

      {longa && (
        <button
          type="button"
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
          className="mt-1 text-xs font-display text-primary flex items-center gap-1"
        >
          {aberto ? "Ver menos" : "Ver tudo"}
          <ChevronDown className={"size-3.5 transition-transform " + (aberto ? "rotate-180" : "")} />
        </button>
      )}

      {resolvida && r.resolvida_em && (
        <p className="mt-2 text-[11px] text-muted-foreground">Resolvida em {fmtData(r.resolvida_em)}</p>
      )}
    </li>
  );
}
});

/* ---------- tipos e helpers ---------- */
type Reclamacao = {
  id: string;
  assunto: string | null;
  mensagem: string;
  status: "aberta" | "resolvida";
  created_at: string;
  resolvida_em: string | null;
  referencia_tipo: string | null;
};

const fmtData = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
    : "";

function mensagemDeErro(err: unknown): string {
  const txt = err instanceof Error ? err.message : typeof err === "object" && err && "message" in err ? String((err as { message: unknown }).message) : "";
  if (txt.includes("limite_reclamacoes_abertas"))
    return `Você já tem ${MAX_ABERTAS} reclamações pendentes. Aguarde a equipe resolver alguma para enviar outra.`;
  if (txt.includes("limite_reclamacoes_diario"))
    return "Você atingiu o limite de envios de hoje. Tente novamente amanhã.";
  const code = typeof err === "object" && err && "code" in err ? String((err as { code: unknown }).code) : "";
  return "Não foi possível enviar agora. Confira sua conexão e tente de novo." + (code ? ` (código ${code})` : "");
}

/* ---------- página ---------- */
function ReclamacaoPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { tipo, id: refId } = Route.useSearch() as ReclamacaoSearch;
  const ref = tipo && refId ? { tipo, id: refId } : null;

  const [aba, setAba] = useState<"nova" | "minhas">("nova");
  const [assunto, setAssunto] = useState<string>(ref ? DENUNCIA : ASSUNTOS[0].value);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  /* Quem está enviando: nome e e-mail vêm da conta (ninguém digita de novo). */
  const { data: me, isError: meErro } = useQuery({
    queryKey: ["reclamacao-me"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Sessão expirada");
      const { data: p } = await supabase
        .from("profiles")
        .select("display_name, username")
        .eq("id", user.id)
        .maybeSingle();
      return { id: user.id, email: user.email ?? null, nome: p?.display_name || p?.username || null };
    },
    staleTime: 5 * 60 * 1000,
  });

  /* Histórico. O filtro por user_id é necessário porque administradores
     enxergam as reclamações de todo mundo pela policy de admin. */
  const historico = useQuery({
    queryKey: ["minhas-reclamacoes", me?.id],
    enabled: !!me,
    queryFn: async (): Promise<Reclamacao[]> => {
      const { data, error } = await supabase
        .from("reclamacoes")
        .select("id, assunto, mensagem, status, created_at, resolvida_em, referencia_tipo")
        .eq("user_id", me!.id)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) {
        console.error("[reclamacao] erro ao carregar histórico:", error);
        throw error;
      }
      return (data ?? []) as Reclamacao[];
    },
  });

  const lista = historico.data ?? [];
  const pendentes = lista.filter((r) => r.status === "aberta").length;
  const limiteAtingido = pendentes >= MAX_ABERTAS;

  const enviar = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("reclamacoes").insert({
        assunto,
        mensagem: mensagem.trim(),
        nome: me?.nome ?? null,
        email: me?.email ?? null,
        referencia_tipo: ref?.tipo ?? null,
        referencia_id: ref?.id ?? null,
      });
      if (error) throw error;
    },
    onSuccess: async () => {
      setMensagem("");
      setErro(null);
      await queryClient.invalidateQueries({ queryKey: ["minhas-reclamacoes"] });
      if (ref) {
        toast.success("Denúncia enviada");
        voltarDaDenuncia();
        return;
      }
      toast.success("Reclamação enviada");
      setAba("minhas");
    },
    onError: (err) => {
      console.error("[reclamacao] erro ao enviar:", err);
      setErro(mensagemDeErro(err));
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (enviar.isPending || limiteAtingido) return;
    if (mensagem.trim().length < MIN_CHARS) {
      setErro(`Conte um pouco mais: escreva pelo menos ${MIN_CHARS} caracteres.`);
      return;
    }
    setErro(null);
    enviar.mutate();
  }

  /* Na denúncia, "voltar" leva de volta ao post/comentário (feed), não ao Contato. */
  function voltarDaDenuncia() {
    if (window.history.length > 1) router.history.back();
    else navigate({ to: "/social" });
  }

  const hintAssunto = ASSUNTOS.find((a) => a.value === assunto)?.hint;

  return (
    <MobileShell>
      <header className="px-4 pt-4 grid grid-cols-[40px_1fr_40px] items-center mb-4">
        {ref ? (
          <button
            type="button"
            onClick={voltarDaDenuncia}
            aria-label="Voltar"
            className="size-9 grid place-items-center rounded-full hover:bg-accent"
          >
            <ChevronLeft className="size-5 text-brand" />
          </button>
        ) : (
          <Link
            to="/configuracoes/contato"
            aria-label="Voltar"
            className="size-9 grid place-items-center rounded-full hover:bg-accent"
          >
            <ChevronLeft className="size-5 text-brand" />
          </Link>
        )}
        <h1 className="font-display text-lg text-brand text-center">{ref ? "Denunciar" : "Enviar reclamação"}</h1>
        <span />
      </header>

      {/* ABAS */}
      <div className="px-4">
        <div role="tablist" aria-label="Reclamações" className="nuppy-card p-1 grid grid-cols-2 gap-1">
          <button
            role="tab"
            id="tab-nova"
            aria-selected={aba === "nova"}
            aria-controls="painel-nova"
            onClick={() => setAba("nova")}
            className={
              "rounded-full py-2 text-sm font-display transition " +
              (aba === "nova" ? "bg-primary text-primary-foreground shadow-soft" : "text-brand hover:bg-accent")
            }
          >
            Nova
          </button>
          <button
            role="tab"
            id="tab-minhas"
            aria-selected={aba === "minhas"}
            aria-controls="painel-minhas"
            onClick={() => setAba("minhas")}
            className={
              "rounded-full py-2 text-sm font-display transition flex items-center justify-center gap-2 " +
              (aba === "minhas" ? "bg-primary text-primary-foreground shadow-soft" : "text-brand hover:bg-accent")
            }
          >
            Minhas
            {pendentes > 0 && (
              <span
                aria-label={`${pendentes} pendente${pendentes > 1 ? "s" : ""}`}
                className={
                  "min-w-5 h-5 px-1.5 rounded-full text-[11px] grid place-items-center " +
                  (aba === "minhas" ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground")
                }
              >
                {pendentes}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- NOVA */}
      {aba === "nova" && (
        <form
          id="painel-nova"
          role="tabpanel"
          aria-labelledby="tab-nova"
          onSubmit={onSubmit}
          noValidate
          className="px-4 mt-4 pb-8 space-y-4"
        >
          {/* Modo denúncia */}
          {ref && (
            <div className="nuppy-card-float p-3 flex items-start gap-3">
              <div className="size-9 shrink-0 rounded-full bg-destructive/15 text-destructive grid place-items-center">
                <Flag className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-brand text-sm">Você está denunciando {REFERENCIAS[ref.tipo as RefTipo]}</p>
                <p className="text-xs text-muted-foreground">
                  Já identificamos o conteúdo. Conte o que aconteceu para a equipe analisar.
                </p>
              </div>
              <button
                type="button"
                aria-label="Remover denúncia"
                onClick={() => navigate({ to: ".", search: {}, replace: true })}
                className="size-8 shrink-0 grid place-items-center rounded-full hover:bg-accent"
              >
                <X className="size-4 text-brand" />
              </button>
            </div>
          )}

          {/* Assunto */}
          <fieldset>
            <legend className="text-xs font-display text-brand mb-2">Sobre o que você quer falar?</legend>
            <div role="radiogroup" className="flex flex-wrap gap-2">
              {ASSUNTOS.map((a) => {
                const ativo = assunto === a.value;
                return (
                  <button
                    key={a.value}
                    type="button"
                    role="radio"
                    aria-checked={ativo}
                    onClick={() => setAssunto(a.value)}
                    className={
                      "rounded-full px-4 min-h-10 text-sm font-display border transition " +
                      (ativo
                        ? "bg-primary text-primary-foreground border-primary shadow-soft"
                        : "bg-card text-brand border-border hover:bg-accent")
                    }
                  >
                    {a.value}
                  </button>
                );
              })}
            </div>
            {hintAssunto && <p className="mt-2 text-xs text-muted-foreground">{hintAssunto}</p>}
          </fieldset>

          {/* Mensagem */}
          <div>
            <label htmlFor="rec-msg" className="text-xs font-display text-brand mb-1 block">
              Sua mensagem *
            </label>
            <textarea
              id="rec-msg"
              value={mensagem}
              onChange={(e) => {
                setMensagem(e.target.value);
                if (erro) setErro(null);
              }}
              maxLength={MAX_CHARS}
              rows={7}
              aria-invalid={!!erro}
              aria-describedby="rec-ajuda"
              placeholder="Conte o que aconteceu, onde e quando. Quanto mais detalhes, mais rápido conseguimos ajudar."
              className={inputCls + " resize-none"}
            />
            <div id="rec-ajuda" className="mt-1 flex items-start justify-between gap-3 text-[11px] text-muted-foreground">
              <span>Mínimo de {MIN_CHARS} caracteres.</span>
              <span className={mensagem.length > MAX_CHARS - 200 ? "text-destructive" : ""}>
                {mensagem.length}/{MAX_CHARS}
              </span>
            </div>
          </div>

          {/* Quem envia */}
          <div className="nuppy-card p-3 flex items-center gap-3">
            <img src={peludinho} alt="" className="size-9 object-contain shrink-0" />
            <div className="min-w-0 text-xs">
              <p className="text-muted-foreground">Enviando como</p>
              {me ? (
                <p className="font-display text-brand truncate">
                  {me.nome ?? "Sua conta"}
                  {me.email ? <span className="text-muted-foreground font-sans"> · {me.email}</span> : null}
                </p>
              ) : (
                <div className="h-4 w-40 rounded bg-muted animate-pulse mt-1" />
              )}
            </div>
          </div>

          {/* Privacidade */}
          <div className="rounded-2xl bg-muted/60 border border-border/60 p-3 flex gap-3">
            <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Só a equipe do Nuppy lê sua mensagem, e usamos seu nome e e-mail apenas para tratar este caso. Não
              envie senhas, dados de cartão ou documentos.{" "}
              <Link to="/configuracoes/privacidade-politica" className="text-primary font-display underline underline-offset-2">
                Política de privacidade
              </Link>
            </p>
          </div>

          {/* Limite de pendentes */}
          {limiteAtingido && (
            <div role="status" className="nuppy-card p-3 flex gap-3">
              <Clock className="size-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-foreground leading-relaxed">
                Você tem {pendentes} reclamações pendentes, que é o máximo por vez. Assim que a equipe resolver uma
                delas, você poderá enviar outra.{" "}
                <button type="button" onClick={() => setAba("minhas")} className="text-primary font-display underline underline-offset-2">
                  Ver minhas reclamações
                </button>
              </p>
            </div>
          )}

          {erro && (
            <p role="alert" className="text-sm text-destructive">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={enviar.isPending || limiteAtingido}
            className="nuppy-btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
          >
            {enviar.isPending ? (
              <>
                <Loader2 className="size-5 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                <Send className="size-5" /> {ref ? "Enviar denúncia" : "Enviar reclamação"}
              </>
            )}
          </button>
        </form>
      )}

      {/* -------------------------------------------------------------- MINHAS */}
      {aba === "minhas" && (
        <section
          id="painel-minhas"
          role="tabpanel"
          aria-labelledby="tab-minhas"
          className="px-4 mt-4 pb-8"
        >
          {historico.isPending && !meErro ? (
            <div className="space-y-3" aria-busy="true" aria-label="Carregando">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : historico.isError || meErro ? (
            <div className="nuppy-card p-4 text-center space-y-3">
              <p className="text-sm text-foreground">Não foi possível carregar suas reclamações.</p>
              <button onClick={() => (meErro ? window.location.reload() : historico.refetch())} className="nuppy-btn-ghost">
                Tentar de novo
              </button>
            </div>
          ) : lista.length === 0 ? (
            <div className="nuppy-card p-6 text-center">
              <img src={peludinho} alt="" className="size-16 object-contain mx-auto" />
              <p className="font-display text-brand mt-3">Nenhuma reclamação por aqui</p>
              <p className="text-xs text-muted-foreground mt-1">
                Quando você enviar uma, ela aparece aqui com o andamento.
              </p>
              <button onClick={() => setAba("nova")} className="nuppy-btn-ghost mt-4">
                Enviar reclamação
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                {pendentes > 0
                  ? `${pendentes} pendente${pendentes > 1 ? "s" : ""} · ${lista.length - pendentes} resolvida${lista.length - pendentes === 1 ? "" : "s"}`
                  : `${lista.length} resolvida${lista.length === 1 ? "" : "s"}`}
              </p>
              <ul className="space-y-3">
                {lista.map((r) => (
                  <ItemHistorico key={r.id} r={r} />
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </MobileShell>
  );
}

/* ---------- item do histórico ---------- */
function ItemHistorico({ r }: { r: Reclamacao }) {
  const [aberto, setAberto] = useState(false);
  const resolvida = r.status === "resolvida";
  const longa = r.mensagem.length > 140 || r.mensagem.includes("\n");

  return (
    <li className="nuppy-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-brand text-sm flex items-center gap-1.5">
            {r.referencia_tipo && <Flag className="size-3.5 text-destructive shrink-0" aria-label="Denúncia" />}
            <span className="truncate">{r.assunto || "Sem assunto"}</span>
          </p>
          <p className="text-[11px] text-muted-foreground">Enviada em {fmtData(r.created_at)}</p>
        </div>
        <span
          className={
            "shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-display border " +
            (resolvida
              ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-800"
              : "bg-accent text-accent-foreground border-border/60")
          }
        >
          {resolvida ? <CheckCircle2 className="size-3" /> : <Clock className="size-3" />}
          {resolvida ? "Resolvida" : "Pendente"}
        </span>
      </div>

      <p className={"mt-2 text-sm text-foreground whitespace-pre-line break-words " + (aberto ? "" : "line-clamp-3")}>
        {r.mensagem}
      </p>

      {longa && (
        <button
          type="button"
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
          className="mt-1 text-xs font-display text-primary flex items-center gap-1"
        >
          {aberto ? "Ver menos" : "Ver tudo"}
          <ChevronDown className={"size-3.5 transition-transform " + (aberto ? "rotate-180" : "")} />
        </button>
      )}

      {resolvida && r.resolvida_em && (
        <p className="mt-2 text-[11px] text-muted-foreground">Resolvida em {fmtData(r.resolvida_em)}</p>
      )}
    </li>
  );
}