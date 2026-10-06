/* ============================================================================
 *  PÁGINA: /auth  —  LOGIN / CADASTRO
 * ----------------------------------------------------------------------------
 *  Única tela PÚBLICA (fora de _authenticated). Aqui o usuário pode:
 *    • ENTRAR com email/senha
 *    • CRIAR CONTA com nome, username (@), cidade, email e senha
 *    • ENTRAR COM GOOGLE (via Supabase Auth / Google OAuth nativo)
 *
 *  ORGANIZAÇÃO DA UI (o que cada bloco muda visualmente):
 *    - Hero (imagem topo) — mostrado só no modo LOGIN.
 *    - Logo — sempre visível.
 *    - Card "nuppy-card" — caixa branca com todos os campos.
 *    - Botão principal .nuppy-btn-primary — cor LARANJA (--primary #E49935).
 *    - Botão Google .nuppy-btn-ghost — fundo transparente com borda.
 *    - Cor de fundo da tela vem de .nuppy-bg (creme #F2EFEA).
 *
 *  CADASTRO FUNCIONAL:
 *    - Valida email, força mínima de senha e confirmação de senha.
 *    - Envia display_name, username sugerido e city no user_metadata
 *      → o trigger `handle_new_user` no banco cria automaticamente a linha
 *        em `public.profiles` já com esses dados preenchidos.
 * ========================================================================== */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  AtSign,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NuppyLogo } from "@/components/NuppyLogo";
import { toast } from "sonner";


// ============================================================================
// ROTA — metadata e SSR desligado (páginas de auth não precisam SSR).
// ============================================================================
export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Entrar — Nuppy" },
      { name: "description", content: "Entre ou crie sua conta no Nuppy, a rede social dos pets." },
    ],
  }),
  component: AuthPage,
});

// ----------------------------------------------------------------------------
// Utilidades de validação usadas pelo cadastro.
// ----------------------------------------------------------------------------
function normalizeUsername(raw: string) {
  // Deixa em minúsculo, remove acentos e mantém apenas [a-z0-9_].
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 24);
}

function scorePassword(pwd: string) {
  // Nota 0-4 mostrada na barrinha embaixo do campo Senha.
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/\d/.test(pwd) && /[^\w\s]/.test(pwd)) score++;
  return score;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
function AuthPage() {
  const navigate = useNavigate();

  // MODO da tela — alterna entre "login" e "signup".
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Campos comuns
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  // Campos exclusivos do cadastro
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Sugere username a partir do nome digitado (usuário pode sobrescrever).
  useEffect(() => {
    if (mode !== "signup") return;
    if (!name) return;
    // Só sugere se o campo username ainda não foi editado manualmente.
    setUsername((prev) => (prev === "" ? normalizeUsername(name) : prev));
  }, [name, mode]);

  // Se já está logado, manda direto para /home.
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/home", replace: true });
    });
  }, [navigate]);

  // Barrinha de força da senha
  const pwdScore = useMemo(() => scorePassword(password), [password]);
  const pwdLabels = ["Muito fraca", "Fraca", "Ok", "Boa", "Forte"];

  // ------------------------------------------------------------------
  // SUBMIT do formulário — decide entre login e cadastro.
  // ------------------------------------------------------------------
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === "signup") {
      // Validações do cadastro
      if (name.trim().length < 2) return toast.error("Digite seu nome");
      if (username.length < 3) return toast.error("Escolha um usuário com pelo menos 3 caracteres");
      if (pwdScore < 2) return toast.error("Crie uma senha mais forte");
      if (password !== confirmPwd) return toast.error("As senhas não coincidem");
      if (!acceptTerms) return toast.error("Aceite os termos para continuar");
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              display_name: name.trim(),
              full_name: name.trim(),
              username, // usado pelo trigger handle_new_user
              city: city.trim() || null,
            },
          },
        });
        if (error) throw error;

        // Depois do signup, o trigger cria a linha em profiles.
        // Se a sessão existe (email confirmado desligado), grava a cidade.
        const { data: session } = await supabase.auth.getUser();
        if (session.user && city.trim()) {
          await supabase.from("profiles").update({ city: city.trim() }).eq("id", session.user.id);
        }

        toast.success("Conta criada! Bem-vindo(a) ao Nuppy 🐾");
        navigate({ to: "/home", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Boas-vindas de volta!");
        navigate({ to: "/home", replace: true });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao autenticar";
      // Traduz erros comuns do Supabase.
      const friendly = msg.includes("Invalid login")
        ? "Email ou senha incorretos"
        : msg.includes("already registered") || msg.includes("already been registered")
        ? "Este email já está cadastrado — faça login"
        : msg.includes("Password should be")
        ? "Senha muito curta (mínimo 6 caracteres)"
        : msg;
      toast.error(friendly);
    } finally {
      setLoading(false);
    }
  }

  // ------------------------------------------------------------------
  // LOGIN COM GOOGLE — Supabase Auth nativo (Google OAuth).
  // O Supabase redireciona para o Google e, ao voltar, o próprio
  // supabase-js detecta a sessão na URL automaticamente (detectSessionInUrl).
  // O onAuthStateChange em __root.tsx cuida do resto (invalida rotas/queries).
  // ------------------------------------------------------------------
  async function handleGoogle() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });
    if (error) {
      toast.error("Não foi possível entrar com Google");
      setLoading(false);
      return;
    }
    // Sucesso: o navegador já está sendo redirecionado para o Google.
    // Não há "navigate" aqui — quando o usuário voltar, o Supabase já
    // terá processado a sessão e o _authenticated/route.tsx deixa passar.
  }

  // ------------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen w-full flex justify-center nuppy-bg">
      {/* Container central com largura máxima estilo mobile */}
      <div className="relative w-full max-w-[480px] min-h-screen px-6 pt-6 pb-10 flex flex-col">
        {/* HERO — só no login (visual mais convidativo) */}
       

        {/* CARD principal — tudo dentro dessa "caixa branca" */}
        <div className="mt-10 nuppy-card p-6">
          <h1 className="text-center font-display text-2xl text-brand">
            {mode === "login" ? "Bem-vindo! " : "Crie sua conta"}
          </h1>
          <p className="text-center text-sm text-muted-foreground mt-1">
            {mode === "login"
              ? "Faça login para continuar cuidando do seu melhor amigo"
              : "Junte-se à comunidade pet do Nuppy"}
          </p>

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            {mode === "signup" && (
              <>
                {/* Nome */}
                <Field icon={<UserIcon className="size-4" />}>
                  <input
                    className="nuppy-input"
                    placeholder="Seu nome"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>

                {/* Username (@) — normaliza automaticamente */}
                <Field icon={<AtSign className="size-4" />}>
                  <input
                    className="nuppy-input"
                    placeholder="usuario"
                    required
                    minLength={3}
                    value={username}
                    onChange={(e) => setUsername(normalizeUsername(e.target.value))}
                  />
                </Field>

                {/* Cidade (opcional) */}
                <Field icon={<MapPin className="size-4" />}>
                  <input
                    className="nuppy-input"
                    placeholder="Cidade (opcional)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Field>
              </>
            )}

            {/* Email */}
            <Field icon={<Mail className="size-4" />}>
              <input
                className="nuppy-input"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            {/* Senha */}
            <Field icon={<Lock className="size-4" />}>
              <input
                className="nuppy-input pr-11"
                type={showPwd ? "text" : "password"}
                placeholder="Senha"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </Field>

            {/* Medidor de força da senha (só no cadastro) */}
            {mode === "signup" && password && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden flex">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 mr-0.5 last:mr-0 transition-all ${
                        i < pwdScore
                          ? pwdScore < 2
                            ? "bg-red-400"
                            : pwdScore < 3
                            ? "bg-amber-400"
                            : "bg-emerald-500"
                          : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground w-14 text-right">
                  {pwdLabels[pwdScore]}
                </span>
              </div>
            )}

            {/* Confirmar senha (só no cadastro) */}
            {mode === "signup" && (
              <Field icon={<Lock className="size-4" />}>
                <input
                  className="nuppy-input pr-11"
                  type={showPwd ? "text" : "password"}
                  placeholder="Confirmar senha"
                  required
                  minLength={6}
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
                {confirmPwd && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {confirmPwd === password ? (
                      <CheckCircle2 className="size-4 text-emerald-500" />
                    ) : (
                      <XCircle className="size-4 text-red-400" />
                    )}
                  </span>
                )}
              </Field>
            )}

            {/* Aceite dos termos (só no cadastro) */}
            {mode === "signup" && (
              <label className="flex items-start gap-2 text-xs text-muted-foreground pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 accent-primary"
                />
                <span>
                  Concordo com os <span className="text-primary underline">Termos de uso</span> e a{" "}
                  <span className="text-primary underline">Política de privacidade</span>.
                </span>
              </label>
            )}

            {/* Botão principal — LARANJA */}
            <button
              type="submit"
              disabled={loading}
              className="nuppy-btn-primary disabled:opacity-60"
            >
              {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          {/* Divisor "ou" */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">Ou continue com</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Botão Google — fundo transparente */}
          <button onClick={handleGoogle} disabled={loading} className="nuppy-btn-ghost">
            <GoogleIcon /> Continuar com Google
          </button>

          {/* Alternar modo */}
          <p className="text-center text-sm mt-5">
            {mode === "login" ? (
              <>
                Ainda não tem conta?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-display text-primary"
                  type="button"
                >
                  Criar conta
                </button>
              </>
            ) : (
              <>
                Já tem conta?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="font-display text-primary"
                  type="button"
                >
                  Entrar
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Componente "Field" — wrapper de input com ícone à esquerda.
// ----------------------------------------------------------------------------
function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">{icon}</span>
      {children}
    </div>
  );
}

// Ícone SVG do Google (para o botão)
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.46-1.7 4.28-5.5 4.28-3.31 0-6.01-2.74-6.01-6.12S8.69 6.14 12 6.14c1.88 0 3.14.8 3.86 1.48l2.63-2.54C16.84 3.55 14.62 2.6 12 2.6 6.83 2.6 2.66 6.77 2.66 11.94S6.83 21.28 12 21.28c6.92 0 9.5-4.86 9.5-7.36 0-.5-.06-.88-.13-1.26L12 12.62v-2.42z"
      />
    </svg>
  );
}
