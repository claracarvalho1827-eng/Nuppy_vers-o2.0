# Acessibilidade do Nuppy no app

Copie a pasta `src/` deste zip por cima da `src/` do projeto (substitui 3 arquivos e cria 5).

Novos:      src/a11y/{nuppy-a11y.js, nuppy-a11y.d.ts, a11y.css, early.ts} e src/components/AccessibilityKit.tsx
Alterados:  src/routes/__root.tsx, src/routes/auth.tsx, src/components/MobileShell.tsx
            (veja alteracoes-em-arquivos-existentes.patch)

Não precisa instalar nenhuma dependência.
Para mudar os links do painel "Ir para": edite LINKS em src/components/AccessibilityKit.tsx.
