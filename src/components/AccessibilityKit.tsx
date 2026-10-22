/* ============================================================================
 *  COMPONENTE: AccessibilityKit  —  BARRA DE ACESSIBILIDADE DO NUPPY
 * ----------------------------------------------------------------------------
 *  Montado UMA vez no __root.tsx, então aparece em TODAS as telas (login,
 *  telas logadas, 404). É o mesmo sistema do site de marketing: Libras
 *  (VLibras), leitor em voz alta e ajustes visuais.
 *
 *  O motor fica em s../../../a11y/nuppy-a11y.js e os estilos em src/a11y/a11y.css.
 *  Aqui só ligamos o motor ao React: montar no navegador, desmontar ao sair e
 *  navegar pelo router (sem recarregar a página) quando alguém usa "Ir para".
 *
 *  👉 Quer mudar os links do "Ir para"? Edite o array LINKS abaixo.
 * ========================================================================== */
import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";

const LINKS = [
  { label: "Início", to: "/home" },
  { label: "Social", to: "/social" },
  { label: "Local", to: "/local" },
  { label: "Grupos", to: "/comunidades" },
  { label: "Perfil", to: "/perfil" },
  { label: "Configurações", to: "/configuracoes" },
];

export function AccessibilityKit() {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  useEffect(() => {
    let dead = false;
    let destroy: (() => void) | undefined;
    const go = (to: string) => {
      void routerRef.current.navigate({ to: to as never });
    };

    // import dinâmico: o motor só é baixado no navegador, nunca no servidor.
    void import("../../../a11y/nuppy-a11y.js").then(({ initA11y }) => {
      if (dead) return;
      destroy = initA11y({
        reader: "auto",
        mapTitle: "Ir para",
        links: LINKS,
        go,
        shortcuts: {
          Digit3: { label: "Início", run: () => go("/home") },
          Digit4: { label: "Configurações", run: () => go("/configuracoes") },
        },
      });
    });

    return () => {
      dead = true;
      destroy?.();
    };
  }, []);

  return null;
}
