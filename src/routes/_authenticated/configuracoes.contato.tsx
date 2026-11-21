import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Mail, Instagram, MessageSquareWarning } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/_authenticated/configuracoes/contato")({
  head: () => ({ meta: [{ title: "Contato — Nuppy" }] }),
  component: () => (
    <MobileShell>
      <header className="px-4 pt-4 grid grid-cols-[40px_1fr_40px] items-center mb-4">
        <Link to="/configuracoes" aria-label="Voltar" className="size-9 grid place-items-center rounded-full hover:bg-accent">
          <ChevronLeft className="size-5 text-brand" />
        </Link>
        <h1 className="font-display text-lg text-brand text-center">Entre em contato</h1>
        <span />
      </header>

      <div className="px-4 space-y-3">
        {/* Destaque: formulário dentro do app (chega no painel da equipe) */}
        <a href="/configuracoes/reclamacao" className="nuppy-card-float p-4 flex items-center gap-3">
          <div className="size-11 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-soft">
            <MessageSquareWarning className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-brand">Enviar reclamação ou sugestão</p>
            <p className="text-xs text-muted-foreground">Fale com a equipe e acompanhe o andamento.</p>
          </div>
          <ChevronRight className="size-5 text-primary shrink-0" />
        </a>

        <h2 className="font-display text-sm text-brand pt-2 px-1">Outros canais</h2>

        <a href="mailto:nuppy.contato@gmail.com" className="nuppy-card p-4 flex items-center gap-3">
          <Mail className="size-5 text-primary" />
          <div>
            <p className="font-display text-brand">E-mail</p>
            <p className="text-xs text-muted-foreground">nuppy.contato@gmail.com</p>
          </div>
        </a>
        <a href="https://instagram.com/nuppy.app" target="_blank" rel="noreferrer" className="nuppy-card p-4 flex items-center gap-3">
          <Instagram className="size-5 text-primary" />
          <div>
            <p className="font-display text-brand">Instagram</p>
            <p className="text-xs text-muted-foreground">@nuppy.app</p>
          </div>
        </a>
      </div>
    </MobileShell>
  ),
});