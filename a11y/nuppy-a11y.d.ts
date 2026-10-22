export interface A11yLink {
  label: string;
  to: string;
}
export interface A11yShortcut {
  label: string;
  run: () => void;
}
export interface A11yOptions {
  /** Onde fica o conteúdo principal (alvo do "Pular para o conteúdo"). */
  contentSelector?: string;
  /** Links do menu principal (alvo do atalho Alt+Shift+2). */
  navSelector?: string;
  /** Seções usadas no "Navegar na página" quando `links` não é informado. */
  sectionSelector?: string;
  /** "blocks": só h1-h3, p, li... (site de marketing). "auto": qualquer bloco de texto (app). */
  reader?: "blocks" | "auto";
  mapTitle?: string;
  /** Lista "Ir para" do painel de ajustes. */
  links?: A11yLink[] | null;
  /** Navegação sem recarregar a página (router do app). */
  go?: ((to: string) => void) | null;
  /** Atalhos Alt+Shift+3 e Alt+Shift+4. */
  shortcuts?: { Digit3?: A11yShortcut; Digit4?: A11yShortcut } | null;
  /** Endereços do VLibras. `null` desliga o tradutor. */
  libras?: { script: string; widget: string } | null;
}
/** Monta a barra de acessibilidade. Devolve a função que desmonta tudo. */
export function initA11y(options?: A11yOptions): () => void;
