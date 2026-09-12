# Handoff — Portfólio Matheus Vieira

Este arquivo existe para que qualquer sessão de trabalho (Claude Code ou
você mesmo) consiga retomar o projeto do zero, em qualquer computador, sem
acesso ao histórico de conversa que gerou as decisões abaixo. Leia este
arquivo primeiro.

## O que é este projeto

Portfólio pessoal de Matheus Vieira, Product Designer júnior em transição
de carreira (ex-arquitetura, depois e-commerce, agora product design/UX).
Público duplo: recrutador que escaneia em segundos, e design lead que lê a
fundo. Stack alvo: **Next.js + React + CSS + View Transitions API,
deploy na Vercel** — sem WebGL, Canvas, Three.js ou bibliotecas de
animação pesadas.

**Atualização (2026-09-12): o código do site foi iniciado.** Next.js (App
Router) + CSS puro, scaffolded na raiz do repo (`app/`, `components/`) — os
documentos de planejamento foram movidos para `docs/` (este arquivo incluso)
para não ficarem misturados com o código. A home (`app/page.tsx` +
`components/home-stage.tsx`) já implementa o padrão nav hover-reveal +
panel-toggle descrito em `visual-language-specification.md` §11 (v2),
construída a partir do frame real do Figma
(`srfFKPHCUBOrQ1rHCGXsum`, node `2:500`). A case page ainda não foi
implementada em código.

## Ordem de leitura dos documentos

1. **[diretrizes-portfolio.md](diretrizes-portfolio.md)** — o "porquê".
   Filosofia, contexto de julgamento, checklist de audit antes de publicar.
   Leia primeiro para entender a lógica por trás das regras.
2. **[visual-language-specification.md](visual-language-specification.md)**
   — o "o quê". Tokens, valores exatos (cor, tipografia, espaçamento,
   motion), estrutura confirmada da home e da case page, o que é fato real
   do case Square vs. placeholder/exemplo a verificar.
3. **`Visual Language Specification.txt`** — histórico bruto (log de
   conversa) que originou o `.md` acima. Mantido só como registro; em caso
   de conflito, o `.md` é a fonte de verdade, não o `.txt`.
4. **`links variant - portfolio.txt`** — links do variant.com com os
   protótipos visuais gerados durante a exploração (base, navegação,
   microinterações, DS principal e secundário, case page padrão). Útil para
   ver visualmente o que os documentos descrevem em texto.

> A pasta `docs squareup/` (PRD + research real do case Square) existiu
> neste diretório e foi removida pelo próprio Matheus em 2026-09-11 — o
> conteúdo real do case (números, citações, pain points) não tem mais uma
> fonte local neste repo. Antes de finalizar qualquer copy do case Square,
> confirme os fatos direto com Matheus ou contra `mvpaiva.com/square`, em
> vez de assumir os números citados em visual-language-specification.md §14
> (vários já estavam marcados lá como "não confirmados").

## Regra de ouro do conteúdo

**Nunca fabricar** métricas, citações, personas, resultados, nomes de
concorrentes ou URLs. Sem `docs squareup/` neste repo, qualquer número do
case Square precisa ser confirmado com Matheus antes de virar copy final —
ver a lista de itens "verificar antes de usar" em
`visual-language-specification.md` §14.

## Estado atual (2026-09-11)

- **Decisão de artefato da home: REVERTIDA nesta mesma data.** A ideia de um
  retângulo abstrato com 3 pontos foi abandonada — comparando a spec com o
  Figma importado (`kGgmy2zYCzFzi0ZyLU9iMU`), ficou confirmado que o código
  real da home implementa nav hover-reveal + panel-toggle (clique em
  Projetos/Sobre/Contato substitui a bio no mesmo espaço). Este é o padrão
  oficial agora — ver visual-language-specification.md §0 e §11 (v2).
- **Sistema de blocos da case page:** fechado em 9 blocos (ver
  visual-language-specification.md §13).
- **Case study Square:** conteúdo real existe e está mapeado, mas a pasta
  `docs squareup/` (fonte primária dos dados de pesquisa) foi removida do
  repo — os números listados como "não corroborados" em
  visual-language-specification.md §14 precisam ser confirmados
  diretamente com Matheus antes de publicar.
- **Cases "Essavie" e "Fireflies.ai":** fictícios, usados só para testar se
  o sistema de blocos aguenta menos conteúdo. Não publicar como projetos
  reais.
- **Pendências técnicas em aberto** (nunca resolvidas no processo de
  exploração, precisam de decisão/implementação real):
  - `prefers-reduced-motion` — requisito, nunca implementado/testado.
  - Arquitetura real de rotas Next.js (`/` e `/case/[slug]`) com View
    Transitions API nativa — só existe a meta tag preparatória
    (`<meta name="view-transition" content="same-origin">`), a transição
    real é trabalho de build.
  - Legibilidade de Fraunces itálico em tamanhos grandes (64px+) com
    acentuação em português (ã, ç, õ) — nunca confirmada visualmente.

## O que foi limpo nesta sessão (2026-09-11)

O diretório usou como base a estrutura de outro projeto (Square Register
v2 — um app de kiosk/mobile, não o portfólio). Itens específicos daquele
produto foram removidos por não terem uso na construção do site do
portfólio:
- `.claude/skills/squareup-design-system/` (tokens e telas do app kiosk)
- `.claude/commands/build-screen.md` e `audit-a11y.md` (construíam telas
  daquele app)

**Mantidos** por serem genéricos e úteis para qualquer projeto de UI,
incluindo o portfólio:
- `.claude/skills/emil-design-eng/`, `improve-animations/`,
  `interface-design/`, `review-animations/` (e os espelhos em
  `.agents/skills/`)

`docs squareup/` (PRD + research do case Square) foi removida do repo pelo
próprio Matheus depois desta limpeza — ver nota na seção "Ordem de leitura
dos documentos" acima.

## Como retomar o trabalho numa sessão nova

1. Leia este arquivo, depois os dois `.md` de spec.
2. Se for construir a home: comece pelo artefato (retângulo + 3 pontos),
   depois o header responsivo, depois os 3 overlays (drawer Projetos,
   drawer Sobre, modal Contato). Não implemente a transição real de rota
   até o esqueleto visual estar validado.
3. Se for construir a case page: comece pelo sistema de 9 blocos como
   componentes genéricos antes de preencher com conteúdo do Square — o
   objetivo é o sistema reutilizável, não uma página fixa.
4. Qualquer número, citação ou fato do case Square: confirme com Matheus
   (a fonte local `docs squareup/` não existe mais neste repo) antes de
   considerar final.
5. Rode o checklist de audit em diretrizes-portfolio.md antes de publicar
   qualquer coisa.
