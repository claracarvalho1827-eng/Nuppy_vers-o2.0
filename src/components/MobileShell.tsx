/* ============================================================================
 *  COMPONENTE: MobileShell  —  ESQUELETO MOBILE
 * ----------------------------------------------------------------------------
 *  Envelope de layout usado por todas as telas autenticadas. Garante
 *  largura máxima de celular, padding inferior pra não cobrir conteúdo
 *  com a BottomNav, e o fundo padrão do app.
 * ========================================================================== */
import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function MobileShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="min-h-screen w-full flex justify-center nuppy-bg">
      <div className="relative w-full max-w-[480px] min-h-screen bg-background/60 backdrop-blur-[1px] pb-28">
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
