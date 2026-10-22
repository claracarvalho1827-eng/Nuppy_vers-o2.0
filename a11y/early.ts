/* Roda ANTES da tela aparecer (inline no <head>): aplica contraste e tamanho de
 * texto salvos, para quem usa alto contraste não ver um "flash" do tema padrão.
 * O resto das configurações é aplicado por nuppy-a11y.js assim que o app carrega. */
export const EARLY_A11Y_SCRIPT = `(function(){try{
var h=document.documentElement,raw=localStorage.getItem("nuppy-a11y-v2"),s=raw?JSON.parse(raw):null;
if(!s){if(matchMedia("(prefers-contrast: more)").matches)h.classList.add("hc");return}
if(s.theme==="hc"||s.theme==="hcl")h.classList.add(s.theme);
if(s.fs&&s.fs!==100)h.style.setProperty("--a-fs",String(s.fs));
var F={gray:"grayscale(1)",inv:"invert(1) hue-rotate(180deg)",low:"saturate(.45)",high:"saturate(1.8)"};
if(F[s.filter]){h.style.setProperty("--a-filter",F[s.filter]);h.dataset.filter=s.filter}
}catch(e){}})();`;
