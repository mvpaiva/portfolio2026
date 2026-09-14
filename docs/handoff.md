# Handoff — Portfólio Matheus Paiva

Este arquivo existe para que qualquer sessão de trabalho (Claude Code ou
você mesmo) consiga retomar o projeto do zero, em qualquer computador, sem
acesso ao histórico de conversa que gerou as decisões abaixo. Leia este
arquivo primeiro.

> **Nome (confirmado em 2026-09-13):** é "Matheus Paiva". O log bruto
> `Visual Language Specification.txt` ainda tem "Vieira" espalhado — é
> histórico congelado, não vale a pena reescrever, mas nunca é a fonte
> correta pra esse dado. Todo o resto (docs `.md`, código) já usa "Paiva".

## O que é este projeto

Portfólio pessoal de Matheus Paiva, Product Designer júnior em transição
de carreira (ex-arquitetura, depois e-commerce, agora product design/UX).
Público duplo: recrutador que escaneia em segundos, e design lead que lê a
fundo. Stack alvo: **Next.js + React + CSS + View Transitions API,
deploy na Vercel** — sem WebGL, Canvas, Three.js ou bibliotecas de
animação pesadas.

**Atualização (2026-09-13): a home está funcionalmente completa e no ar
localmente.** Next.js (App Router) + CSS puro, código em `src/` (convenção
nativa do Next — `src/app/`, `src/components/`), config na raiz
(`package.json`, `tsconfig.json`, etc., como o Vercel espera pro deploy
zero-config). Docs de planejamento vivem em `docs/`.

`src/components/home-stage.tsx` implementa o padrão nav hover-reveal +
panel-toggle de `visual-language-specification.md` §11 (v2), construído a
partir do frame real do Figma (`srfFKPHCUBOrQ1rHCGXsum`, node `2:500`), com
conteúdo real (não placeholder):
- Nome/cargo: Matheus Paiva / Product Designer
- Tagline: foco em UX Research, interação e produtos com IA
- Projetos: só Square (Essavie e Fireflies removidos da home — continuam
  documentados como fictícios em `visual-language-specification.md` §14,
  só não aparecem mais na UI)
- Sobre: 2 parágrafos condensados da bio real (formação em Arquitetura →
  e-commerce → pesquisa), sem repetir o que já está na tagline
- Contato: e-mail (`mv@mvpaiva.com`), LinkedIn, X e CV reais

**Motion:** implementado o sistema de 3 categorias descrito em
`visual-language-specification.md` §16 (Primary Transition / Microinteractions
/ Reveal Effect) — o panel-toggle usa a categoria "Microinteraction" (fade
puro de opacidade, `0.3s ease-in-out`, sem `translateY`), não a curva
pesada de página cheia.

**Acessibilidade:** passei por uma auditoria de contraste real nesta
sessão — texto secundário a 40% de opacidade (o valor "gostoso
visualmente" do Figma original) mede ~2.46:1 de contraste, bem abaixo do
mínimo WCAG AA (4.5:1). **65% de opacidade é o piso** que ainda passa com
margem real (~5.1:1); 60% já falha (~4.4:1). Links são diferenciados do
texto normal por sublinhado + peso, não só por cor/opacidade (exigência
real da WCAG 1.4.1, não só preferência). Guarde esse número (65%) — é fácil
alguém tentar "deixar mais clarinho" de novo sem saber que já foi testado e
é o limite.

A case page ainda não foi implementada em código.

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
5. **`Visual Diagnosis.txt`** — exploração dedicada de composição de
   wireframes (Totem/Mobile/Evolução) dentro dos blocos de solução da case
   page. As conclusões já foram incorporadas em
   visual-language-specification.md §13.1 (com uma correção de
   acessibilidade); ler o `.txt` original só se precisar do raciocínio
   completo por trás dos números.
6. **[square-case-extraction-prompt.md](square-case-extraction-prompt.md)**
   — prompt pronto pra rodar contra o chat dedicado ao case Square e/ou o
   site ao vivo (`mvpaiva.com/square`), pra puxar a síntese real (estrutura,
   números confirmados, mapeamento dos 24 wireframes exportados pros 5
   blocos de Solução). Use isso **antes** de escrever qualquer copy final
   pro case ou de tocar nos placeholders do Figma — ver pendência logo
   abaixo em "Estado atual".

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

## Estado atual (atualizado 2026-09-13)

- **Home implementada e funcional** (ver seção acima) — nav hover-reveal +
  panel-toggle, conteúdo real, motion e acessibilidade já auditados nesta
  sessão. Isso substitui o antigo "artefato + 3 pontos" (v1), que já tinha
  sido revertido antes de qualquer código existir.
- **Sistema de blocos da case page:** fechado em 13 blocos reais (ver
  visual-language-specification.md §13/§14) — **ainda não implementado em
  código**, só especificado.
- **Rebuild da case page real no Figma (em andamento, 2026-09-14):**
  construção bloco por bloco na cópia de produção
  (`srfFKPHCUBOrQ1rHCGXsum`, node `2030:121` "square-case para
  producao"), nunca no original `2:546`. Decisões estruturais fechadas
  nessa leva, todas em visual-language-specification.md §13.3: frame de
  seção é 1290px (não 1280px); coluna de label é 440px + gap padrão de
  32px (`--gutter-desktop`); e **dentro do case inteiro, Fraunces só
  existe nos 3 ghost-markers** — todo o resto (headlines, labels, stats)
  é Instrument Sans, hierarquia só por tamanho. Padrão de bloco: `Label
  Column > Label Stack (Eyebrow + Question) + Content Column`.
  - **Blocos 01 (Hero) e 02 (Contexto) prontos.**
  - **✅ Decisão de arquitetura de conteúdo (2026-09-14):** o antigo
    bloco 03 único (Research: intro + 7 pain points + 3 personas +
    metodologia Double Diamond, tudo junto) foi **decomposto** — feedback
    do Matheus foi que ler personas+problemas+pesquisa+metodologia
    empilhados é "coisa demais pra ler". Nova ordem, cada um como bloco
    próprio, seguindo a ordem do Double Diamond: Pesquisa → Field
    Exploration + Problemas + Jornada (fundidos num só) → Arquétipos →
    Design e Prototipação (papel→high-fi) → Testes → Soluções →
    Resultados.
  - **Pesquisa (`2067:261`) — travado, não mexer.** Label de 2 linhas
    (eyebrow "A PESQUISA" + headline como "question"), subhead, notas,
    link. Decisão do Matheus: fica assim por enquanto.
  - **Field Exploration + Problemas + Jornada (`2030:177`) — pronto,
    fundido num só composto full-bleed:** banner de fotos de campo
    (placeholder) → **recorte do service blueprint** (3 estágios reais —
    Escaneamento/Verificação/Saída — reaproveitando a tira de 3 colunas
    que já existia pro bloco antigo "Jornada do Usuário", só repopulada
    com dores reais em vez das fictícias do variant.com; a seção
    "Jornada" separada foi removida, absorvida aqui) → div de texto
    (observação de campo real + achados condensados de 1 linha cada,
    numeral sage + título, sem citação — bem mais visual/escaneável que
    a versão anterior com quote em cada item). **Correções feitas:** os
    labels "Pain:" estavam em terracota (texto) e a linha divisória
    acima deles em salmão — ambos herdados do template antigo do
    variant.com, cor reservada só pra erro/destrutivo no design system —
    trocados pra ink 65% (texto) e ink 10% (hairline).
  - **⚠️ Pendente do Matheus:** print real do service blueprint (elogiado
    pelo mentor dele) — criei um placeholder de imagem
    (`2092:150`, "Image Placeholder — Service Blueprint Crop", 1290px de
    largura × 520px, cor stone) logo acima dos 3 cards de estágio, dentro
    de `2089:150` "Blueprint Crop". Os 3 cards continuam como legenda de
    apoio abaixo da imagem (decisão do Matheus: cards viram suporte da
    imagem, não são substituídos). **Não consigo colar a imagem
    programaticamente** — a API do plugin não suporta `createImageAsync`
    — Matheus precisa colar o recorte real ali manualmente (arrastar/
    colar no Figma), largura 1290px, altura livre.
  - **Arquétipos (`2067:578`) — travado por enquanto, não mexer.** 3
    personas, JTBD dobrado como 1 frase antes da citação de cada
    persona, sem seção própria.
  - **Metodologia (Double Diamond) não vira mais bloco-parede próprio** —
    decisão explícita de distribuir as keywords de método como tags
    discretas dentro de cada bloco de fase correspondente, preservando a
    densidade de keyword pro ATS sem concentrar tudo num grid isolado.
    **Ainda não aplicado** — o conteúdo de fases/métodos que eu já tinha
    montado ficou preservado fora da página (`2030:415`, frame solto,
    fora do fluxo) só como fonte de texto até essa distribuição acontecer.
  - Próximo: Design e Prototipação (papel→high-fi) e Testes, os dois
    ainda não construídos — há um espaço reservado vazio na página pra
    eles (entre `2030:361` e `2030:213`).
- **Composição de wireframes nos blocos de solução (2026-09-13):** regras
  concretas fechadas em visual-language-specification.md §13.1 — Totem
  696×392px sem borda/sombra; Mobile 320×694px ("ampliado mas honesto",
  não a largura proporcional real de 228px), espaço negativo à direita
  fica vazio de propósito; bloco de Evolução usa alinhamento por linha de
  base óptica (480×270 vs. 240×510, gap 64px), não mais os dois
  placeholders idênticos de 256×384px. Fonte: `docs/Visual Diagnosis.txt`
  (exploração dedicada, trazida por Matheus). **Correção feita nessa
  adoção:** a fonte sugeria label do device a 40% de opacidade — isso falha
  WCAG AA (~2.46:1); a spec já foi ajustada pra 65% mínimo. **Referência
  visual:** cada conceito canônico
  (Totem single/two-state/crop, Mobile single/pair/crop, Evolução) está
  montado como placeholder no Figma, página "exploracao de banners"
  (`srfFKPHCUBOrQ1rHCGXsum`, node `2020:121`) — usar como guia de proporção
  antes de entrar com os wireframes reais do Square.
- **✅ RESOLVIDO (2026-09-13): conteúdo final do case Square fechado.** A
  pendência antiga (bloco de 9 partes em `2:546` era filler genérico do
  variant.com, não a síntese real) foi resolvida rodando
  `docs/square-case-extraction-prompt.md` contra o chat dedicado ao case —
  ele tinha a página real já escrita (node `13440-2`), não um esboço vago.
  Resultado: estrutura de **13 blocos** (não mais 9) com copy final em
  pt-BR, todos os números antigos "não confirmados" resolvidos, e
  mapeamento de qual dos 24 wireframes exportados vai em qual solução —
  tudo em `visual-language-specification.md` §13 e §14 (v3). **Isso ainda
  não foi aplicado no Figma** (`2:546` continua com o filler antigo) —
  próximo passo é levar esse conteúdo pros placeholders reais.
  - Decisões fechadas nessa sessão: 5 rodadas de teste (1 papel + 2 mid-fi
    + 2 hi-fi); timeline real 6 meses, Fev–Jul 2026; onboarding/payment
    method ficam fora do escopo do case de propósito; bloco "02" nunca
    existiu, era só erro de numeração.
  - Links reais novos: protótipo completo no Figma
    (`UOGBjtsvGNFNs8O8qUSxjk/SquareUp---Matheus-Paiva`, node `12084:23891`)
    e board de pesquisa completa no Miro
    (`miro.com/app/board/uXjVHJ5Co14=`) — o link "ver pesquisa completa"
    do case aponta pra esse Miro, não é um accordion interno.
  - Bloco de metodologia (Double Diamond) documentado como "escada
    tipográfica" de 4 colunas com hairline — substitui os losangos
    coloridos do site ao vivo, mantendo o conteúdo keyword-denso pra
    ATS/SEO (ver §14, dentro do bloco 03).
- **Sticky da coluna de texto (2026-09-13):** cada bloco de Solução tem sua
  coluna de texto (`col-span-5`) grudada (`position: sticky; top: 96px`)
  ao lado da imagem enquanto aquele bloco específico está na viewport —
  solta quando o próximo bloco começa. Escopo por bloco, nunca sticky
  global. Ver visual-language-specification.md §13.2.
- **Wireframes reais do Square exportados (2026-09-13):** 24 telas finais
  (6 Totem + 18 Mobile, as únicas visíveis entre as variantes A/B de cada
  seção do arquivo `Case---Square-Privado`) exportadas como PNG em
  `docs/assets/square-wireframes-raw/` — substituem os wireframes antigos
  da seção `13597-2037` como fonte de imagem. Ainda **não mapeadas** pra
  nenhum dos 5 blocos de Solução (índice completo no README daquela
  pasta) — depende da síntese real do case (ver bullet acima).
- **Case study Square:** conteúdo real existe e está mapeado, mas a pasta
  `docs squareup/` (fonte primária dos dados de pesquisa) foi removida do
  repo — os números listados como "não corroborados" em
  visual-language-specification.md §14 precisam ser confirmados
  diretamente com Matheus antes de publicar.
- **Cases "Essavie" e "Fireflies.ai":** fictícios. Removidos da listagem de
  Projetos na home (só Square aparece lá agora); continuam documentados
  como material de teste de estresse do sistema de blocos, não publicar
  como reais.
- **Mistério resolvido:** um link "Curadoria" que aparecia perto de
  "Essavie" numa versão antiga do Figma intrigou uma sessão anterior — não
  é um 4º projeto, é a segunda palavra do nome completo do projeto
  ("Essavie Curadoria"), confirmado no card de exemplo do ui kit de
  referência do Figma.
- **Pendências técnicas em aberto:**
  - `prefers-reduced-motion` — requisito, ainda não implementado/testado.
  - Arquitetura real de rotas Next.js (`/` e `/case/[slug]`) com View
    Transitions API nativa — só existe a meta tag preparatória
    (`<meta name="view-transition" content="same-origin">`), a transição
    real é trabalho de build quando a case page existir.
  - **Fonte de display na case page ainda em aberto:** o Figma real
    (`srfFKPHCUBOrQ1rHCGXsum`, node `2:546`) usa Instrument Sans (não
    Fraunces) em praticamente todos os headlines/números grandes do case
    Square, contrariando a suposição antiga de que headlines usam Fraunces
    itálico. Confirmado com Matheus que isso é intencional pro que já
    existe no Figma — mas não decidido ainda se a *case page a construir*
    deve seguir esse padrão real (Instrument Sans em headlines) ou usar
    Fraunces como o resto da spec sugere. Perguntar antes de começar a
    case page.

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
2. A home já está pronta (`src/components/home-stage.tsx`) — não reconstruir
   do zero. Rode `npm run dev` e confira o estado atual antes de assumir
   que algo está faltando.
3. Se for construir a case page: comece pelo sistema de 9 blocos como
   componentes genéricos antes de preencher com conteúdo do Square — o
   objetivo é o sistema reutilizável, não uma página fixa. **Antes de
   escolher a fonte dos headlines**, ver a pendência sobre Instrument Sans
   vs. Fraunces acima — não assumir Fraunces sem perguntar.
4. Qualquer número, citação ou fato do case Square: confirme com Matheus
   (a fonte local `docs squareup/` não existe mais neste repo) antes de
   considerar final.
5. Rode o checklist de audit em diretrizes-portfolio.md antes de publicar
   qualquer coisa.
6. Se for mexer em opacidade/contraste de texto: 65% de ink sobre `--bg` é
   o piso mínimo testado que passa WCAG AA (~5.1:1) — não reduzir sem
   recalcular o contraste.
