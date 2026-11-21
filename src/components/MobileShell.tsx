/* ============================================================================
 *  COMPONENTE: MobileShell  —  ESQUELETO MOBILE
 * ----------------------------------------------------------------------------
 *  Envelope de layout usado por todas as telas autenticadas. Garante
 *  largura máxima de celular, padding inferior pra não cobrir conteúdo
 *  com a BottomNav, e o fundo padrão do app.
 *
 *  ⚠️ NÃO coloque backdrop-blur, filter, transform ou will-change neste
 *  contêiner: eles fazem todo elemento `fixed` lá dentro (janela de
 *  comentários, modais, BottomNav) se posicionar em relação à PÁGINA em vez
 *  da TELA, e eles passam a ficar no fim do feed.
 * ========================================================================== */
import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function MobileShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="min-h-screen w-full flex justify-center nuppy-bg">
      <div className="relative w-full max-w-[480px] min-h-screen bg-background/60 pb-28">
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}