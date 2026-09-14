# Visual Language Specification v2 — Matheus Paiva Portfolio

> **Esta é a v2, que substitui integralmente a v1.** A v1 foi construída a partir
> de um log de conversa exploratório (`Visual Language Specification.txt` da
> época, hoje sobrescrito) e havia decidido, entre outras coisas, que a home
> usaria um artefato abstrato com 3 pontos. Em 2026-09-11, um novo
> `Visual Language Specification.txt` foi gerado por reverse-engineering direto
> do HTML/CSS real do site (via variant.com) e importado para o Figma
> (`kGgmy2zYCzFzi0ZyLU9iMU`, página "home e case page"). Comparando os dois
> contra o Figma importado, ficou confirmado que **o código real divergiu da
> decisão dos 3 pontos** — a home real implementa um padrão diferente (nav
> hover-reveal + panel-toggle, ver §11). Matheus revisou as divergências entre
> os dois documentos ponto a ponto (registradas no changelog no final deste
> arquivo) e esta v2 reflete as decisões finais resultantes — **ela é a nova
> fonte de verdade**, substituindo a v1 onde os dois conflitavam.
>
> Ler junto com [diretrizes-portfolio.md](diretrizes-portfolio.md) (o "porquê")
> e [handoff.md](handoff.md) (status do projeto). O `diretrizes-portfolio.md`
> ainda contém uma nota sobre a "decisão dos 3 pontos" que ficou desatualizada
> por esta v2 — ver nota de atualização naquele arquivo.

## 0. Proveniência e o que mudou da v1 (leia antes do resto)

Esta spec combina duas fontes:
1. **Decisões humanas** tomadas em conversa ao longo do projeto (conteúdo real
   do case Square, sistema de 9 blocos da case page, regras de idioma/conteúdo,
   regras de acessibilidade) — preservadas da v1 sem alteração.
2. **Reverse-engineering do código real** do site importado (visual language,
   componentes, motion, cor) — que substituiu partes da v1 que nunca tinham
   sido implementadas de fato ou que o próprio código já havia superado.

Onde os dois documentos conflitavam, as decisões abaixo foram tomadas
explicitamente com Matheus (não assumidas por IA):

| Tema | v1 (abandonado) | v2 (vigente) |
|---|---|---|
| Home — navegação | Artefato abstrato + 3 pontos em triângulo, abrindo drawers/modal | **Nav hover-reveal + panel-toggle** (nav revela no hover; clique em Projetos/Sobre/Contato substitui a bio no mesmo espaço) — é o que o código real implementa |
| Botão primário | Nunca preenchimento sólido, só texto/hairline-outline | **Preenchimento sólido ink + texto off-white** é o botão primário oficial |
| Motion (transições maiores) | `cubic-bezier(0.2,0,0.2,1)`, 0.3–0.6s, proibido subir no reveal (só fade) | **`cubic-bezier(0.16,1,0.3,1)`, 0.8s** para overlays/painéis, com entrada `opacity + translateY` |
| Max-width de conteúdo | 900px (case study) / 1400px (seções padrão) | **1280px uniforme** (`max-w-7xl`) para tudo |
| Cor de erro/destrutivo | Não existia | **Terracota `#C4705A`**, adicionada como única exceção semântica à regra de "só sage" — reservada estritamente a erro/exclusão, nunca decorativa |
| Ícone de menu flutuante (TOC de case page) | Linhas horizontais decrescentes, nunca hambúrguer | **Mantido**: continua linhas decrescentes, nunca hambúrguer — o hambúrguer que aparece no reverse-engineering é um elemento distinto (ver §10) |
| Nav principal do site | Sempre visível como texto nativo | **Mantido**: nunca hambúrguer para a nav principal (Projetos/Sobre/Contato); em mobile a nav é sempre visível, nunca depende de hover |

**O que NÃO mudou** (preservado integralmente da v1, não coberto pelo
reverse-engineering porque é conteúdo/decisão de produto, não linguagem
visual genérica): sistema de 9 blocos da case page (§13), fatos reais do case
Square e regra de nunca fabricar métricas (§14), bio real, regra de idioma
pt-BR, acessibilidade central (touch targets, focus-visible, Esc fecha
overlays), estrutura de disclosure progressiva.

## 1. Filosofia geral do produto

Sistema Calm UI para portfólio de product designer júnior em transição de
carreira. Personalidade de galeria: paredes neutras, luz precisa, e a
convicção de que o trabalho fala mais alto que a moldura.

**Princípios:**
1. **Restrição como sinal de premium** — cada elemento que poderia ser
   adicionado (sombra, gradiente, múltiplas cores de destaque, ilustração
   decorativa) é intencionalmente omitido. A quietude força o olhar para o
   conteúdo e o refinamento tipográfico.
2. **Tipografia carrega a hierarquia** — hierarquia vem quase exclusivamente
   de escala, peso e família de fonte. Cor tem papel de apoio, não primário.
3. **Espaço em branco é estrutura** — separadores físicos (bordas, linhas) são
   usados no mínimo e em baixa opacidade; o espaço em branco carrega a carga
   estrutural. Seções respiram com 64–256px de padding vertical.
4. **Minimalismo caloroso** — off-white quente (`#F5F2F0`), quase-preto quente
   (`#1A1A1A`) e sage (`#A5B8B1`) criam um minimalismo humano e tátil. Evita a
   esterilidade do branco/preto puro.
5. **Ritmo editorial** — o conteúdo é revelado progressivamente; grandes
   momentos de hero alternam com seções densas de informação.

**Tom emocional:** calmo e confiante (sem urgência, sem CTAs agressivos),
intelectual e refinado, austero mas caloroso, "vulnerabilidade profissional"
— a voz do designer aparece pela tipografia, não por elementos de
personalidade gráfica.

**Posicionamento:** "sou um designer cuidadoso, orientado a pesquisa, com
bom gosto." A interface precisa parecer cara de produzir — não por decoração,
mas por precisão.

### Regras de restrição visual (permanentes)
- Nunca gradiente (fundo, texto ou borda)
- Nunca drop shadow em qualquer elemento estático (única exceção: modal de
  contato, ver §8)
- Nunca cantos arredondados acima de 4px em elementos estruturais (0px é o
  padrão)
- Nunca mais de uma cor de destaque (Sage) competindo por atenção — terracota
  é exceção semântica estrita para erro/destrutivo, nunca decorativa
- Nunca ilustração ou padrão geométrico decorativo
- Nunca branco puro `#FFFFFF` ou preto puro `#000000`
- Nunca peso de fonte acima de 500 em Instrument Sans (nunca 700/bold em
  lugar nenhum); Fraunces nunca acima de 300
- Nunca centralizar texto longo (corpo, narrativa de case, listas) — só
  alinhamento à esquerda; centralização é reservada a hero, CTAs de rodapé,
  estatísticas centradas e momentos decorativos pontuais
- Nunca uppercase sem tracking aumentado (mínimo 0.12em) — regra não
  negociável
- Nunca mais de duas famílias de fonte por view (Fraunces + Instrument Sans)
- Nunca fundo colorido atrás de blocos de texto (só off-white ou ink)
- Nunca ícone de hambúrguer em lugar nenhum do site (nem nav principal, nem
  TOC de case page) — testado e rejeitado por falta de reconhecimento
  universal
- Nunca animação bounce/elástica, rotação, scale-pop, parallax de scroll,
  entrada com stagger, shake de erro, flip 3D, efeito de máquina de escrever

## 2. Hierarquia visual

**Cascata tipográfica:**
1. **Label** — uppercase, 10px, tracking 0.12em, peso 500
2. **Headline grande** — Fraunces itálico, 48–84px
3. **Parágrafo de apoio** — Instrument Sans, 13–20px, 60% opacidade
4. **Metadado** — uppercase, 10px, 40% opacidade

**Hierarquia de espaço em branco:**
| Valor | Uso |
|---|---|
| 256px | Máxima separação entre fases de case study |
| 128–160px | Quebras entre fases temáticas principais |
| 96px | Padding de seção grande (alternativa dramática) |
| 64px | Padding de seção padrão — mínimo entre seções maiores |
| 32–48px | Separação interna de bloco de conteúdo, gap de grid |
| 16–24px | Agrupamento de elementos relacionados |
| 4–8px | Agrupamento tipográfico apertado (label + valor) |

**Regra:** na dúvida, dobre o espaço em branco. A interface erra para o lado
de espaço demais, nunca de menos. Uma seção raramente deveria ter menos de
64px de padding vertical.

**Hierarquia de contraste (opacidade da Ink sobre `--bg`):**
- Conteúdo primário: 100%
- Conteúdo secundário: 60–70%
- Conteúdo terciário/meta: 30–40%
- Placeholder/disabled: 30%
- Conteúdo atmosférico (ghost markers): 5–20%
- Bordas: 10% (regra universal, nunca outro valor para borda estrutural)

**Regra crítica:** não introduzir novos valores de opacidade. O sistema usa
apenas 100/70/60/50/40/30/20/10% sobre Ink. Esses são os valores canônicos.

**Emphasis (ordem de uso):**
1. Fraunces itálico grande + contraste de tamanho
2. Label uppercase com tracking generoso
3. Mudança de opacidade (100% → 60%)
4. Sage em label pequeno ou elemento decorativo
5. **Proibido:** peso bold em corpo, cor pra ênfase em texto corrido,
   underline pra ênfase, highlight de fundo

**Disclosure progressiva:**
1. **Homepage mínima** — nome, cargo, uma linha de bio, 3 links de nav
2. **Hover/interação** — nav e links de projeto revelam (underline scale,
   shift de opacidade)
3. **Panel toggle** — clique num item de nav substitui o texto da bio pelo
   conteúdo do painel (lista de projetos, sobre, contato) no mesmo espaço
   físico
4. **Overlay** — clique num projeto abre overlay full-screen com o case
   study completo
5. **Scroll** — case study revela conteúdo naturalmente por scroll, sidebars
   sticky mantêm contexto

Regra: nunca mostrar tudo de uma vez. Revelar em estágios, conforme a
intenção do usuário.

## 3. Sistema de espaçamento

Grid base 8px.

| Token | Valor | Uso |
|---|---|---|
| space-1 | 4px | Gaps tipográficos apertados, ícone-texto |
| space-2 | 8px | Label-para-valor, padding interno pequeno |
| space-3 | 12px | Padding pequeno de componente |
| space-4 | 16px | Padding interno de componente, gaps padrão |
| space-6 | 24px | Gap de nav, padding de card, gaps médios |
| space-8 | 32px | Gutters de seção, grid gaps |
| space-12 | 48px | Padding de seção moderado |
| space-16 | 64px | Padding de seção — mínimo recomendado |
| space-24 | 96px | Padding de seção grande |
| space-32 | 128px | Separação de seção principal |
| space-40 | 160px | Separação temática XL |
| space-64 | 256px | Separação máxima entre fases de case study |

**Gutters de página:** desktop 32–48px · mobile 30px.

**Largura de conteúdo (canônica — v2, substitui a divisão 900/1400 da v1):**
`max-width: 1280px` (`max-w-7xl`) uniforme para home, seções padrão e leitura
de case study. Container estreito de 420px, centrado, é usado exclusivamente
para o texto de hero da home.

**Densidade:** baixa. É um portfólio editorial, não um dashboard. Uma seção
que poderia ter 6 pontos de dado geralmente tem 3, cada um com mais espaço.

**Regras de respiro:**
1. Todo elemento tem no mínimo 8px de espaço livre em todos os lados
2. Blocos de texto nunca tocam imagens ou bordas sem 16px de padding
3. Seções principais têm no mínimo 64px de separação
4. Quando duas seções trocam de cor de fundo (off-white ↔ ink), a transição é
   full-bleed, sem gap
5. Conteúdo dentro de uma seção é centralizado no container max-width, com
   margens laterais generosas em telas grandes

## 4. Princípios de layout

**Containers canônicos:**
1. **Full-bleed** — `100vw`, sem padding — hero, imagens full-bleed, blocos
   de transição de cor
2. **Padrão** — `max-width: 1280px`, `margin: 0 auto`, `padding: 0 32px` —
   conteúdo de case study, grids, seções padrão
3. **Estreito** — `max-width: 420px`, centrado — exclusivo do texto de hero
   da home

**Alinhamento:**
- Esquerda é o padrão universal para corpo, headers de seção e listas
- Centralização reservada a: hero da home, CTAs de rodapé, estatísticas
  centradas, e momentos decorativos pontuais
- Offset assimétrico: grids de case study usam 12 colunas com label em
  `col-start-1 col-span-3` e conteúdo em `col-start-5 col-span-7` — esse
  deslocamento de 2 colunas cria tensão editorial e espaço em branco à
  esquerda
- Direita nunca é usada para texto

**Responsivo:**
- **Desktop (principal):** grid de 12 colunas completo, offsets assimétricos,
  sidebars sticky, nav revela no hover
- **Tablet:** mantém o grid mas reduz spans de coluna; gutters aumentados
- **Mobile (<768px):**
  - Nav fica **sempre visível** (nunca depende de hover) — regra crítica de
    acessibilidade: conteúdo escondido não pode depender só de hover
  - Layouts em coluna única
  - Padding de seção reduzido: 80px em vez de 128px
  - Container de hero recebe `padding: 0 30px`
  - Grid de 12 colunas colapsa para 1 coluna

## 5. Tipografia

**Fraunces** — serifada variável, itálico para todo uso de display (peso 300
exclusivamente; upright praticamente não é usado). Papel: emocional,
editorial, humano. Nunca em corpo de texto, navegação, botões ou labels.

**Instrument Sans** — pesos 400 (regular), 500 (medium) e 600 (semi-bold,
raro, só ênfase forte dentro de texto sans). Papel: funcional, neutro,
legível. Todo texto de UI, corpo, labels, navegação, métricas, botões.

Nenhuma outra família de fonte é permitida. Essa dupla — serifada quente de
display + sans-serif limpa de interface — é o DNA tipográfico fundamental.

| Nível | Fonte | Tamanho | Line-height | Peso | Estilo |
|---|---|---|---|---|---|
| Display / Hero | Fraunces | 72–84px | 1.0 | 300 | Itálico |
| H1 / Section headline | Fraunces | 48px | 1.1 | 300 | Itálico |
| H2 / Sub-headline | Fraunces | 36px | 1.2 | 300 | Itálico |
| Subtitle (cargo) | Fraunces | 15px | 1.5 | 300 | Itálico |
| Stat number | Fraunces | 48–64px | 1.0 | 300 | Roman (não-itálico) |
| Ghost marker | Fraunces | 120px+ | 1.0 | 300 | Normal, 5–20% opacidade |
| Lead / Body large | Instrument Sans | 18–20px | 1.6 | 400 | Normal |
| Body | Instrument Sans | 13px | 1.5 | 400 | Normal |
| Small / botão | Instrument Sans | 11px | 1.5 | 500 | Uppercase, tracking 0.08em |
| Label / metadado | Instrument Sans | 10px | 1.5 | 500 | Uppercase, tracking 0.12em |

**Letter spacing:**
| Contexto | Valor |
|---|---|
| Labels uppercase | 0.12em (mínimo — regra não negociável) |
| Texto de botão | 0.08em |
| Corpo/display | 0 (normal) |

**Capitalização:** sentence case em corpo/descrições/quotes; uppercase só em
labels/nav/botões/metadados/tags; title case raro (só nomes de projeto);
lowercase nunca usado deliberadamente.

**Regras de uso:**
1. Fraunces é só-display: nunca em parágrafo, botão ou label
2. Itálico é o padrão do Fraunces — a forma upright não faz parte desta
   linguagem visual
3. Instrument Sans é só-interface: nunca em headline ou quote
4. Fraunces nunca acima do peso 300
5. Peso 500 é reservado a labels e navegação

**Regra de idioma (preservada da v1):** todo o copy é pt-BR, com suporte
pleno a diacríticos (ã á à â é ê í ó ô õ ú ç). Texto em pt-BR é normalmente
mais longo que o equivalente em inglês — nunca desenhar um layout no
comprimento do texto em inglês.

**Text styles nomeados (confirmado 2026-09-14):** o arquivo Figma tem
dois conjuntos de estilos de texto na biblioteca local. **Nunca usar**
`variant.com/*` (dezenas de variações soltas, herdadas do import
genérico, sem lógica de sistema). **Sempre usar, quando o valor bater**,
o conjunto `Portfolio/*` — é o nosso sistema de verdade:
`Portfolio/Label/10 Medium` · `Portfolio/Body/12/13/14/18/20/24 Regular`
· `Portfolio/Body/13/14 Medium` · `Portfolio/Subtitle/15 Italic` ·
`Portfolio/Display/36/48/72 Regular` · `Portfolio/Display/Ghost Marker`.
Aplicar via `node.setTextStyleIdAsync(styleId)` (pegar a lista completa
com `figma.getLocalTextStylesAsync()`), não só copiar os valores brutos
de fonte/tamanho manualmente — o style nomeado é o que mantém o texto
sincronizado se a escala mudar depois. Aplicar o estilo não altera o
conteúdo do texto (case, idioma) — isso continua sendo responsabilidade
de quem edita o `characters`.

**Legibilidade:** linha máxima ~65 caracteres; corpo mínimo 13px (10px só
labels); contraste Ink 100% sobre `--bg` ~15:1; Ink 60% sobre `--bg` ~4.5:1
(aceitável para descrições acima de 13px; abaixo disso, usar opacidade
maior).

## 6. Cor

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F5F2F0` | Fundo global, off-white quente. Usado em 90%+ da interface. Nunca branco puro. |
| `--ink` | `#1A1A1A` | Texto primário, bordas fortes, fundo de seções invertidas, fundo de botão primário. Nunca preto puro. |
| `--stone` | `#E6E2DF` | Placeholders de imagem, fundos de device frame, skeleton loading. Nunca como fundo de seção inteira. Nunca para texto. |
| `--sage` | `#A5B8B1` | Único acento decorativo do sistema. Labels de categoria, borda de pull quote, tags "Live", ênfase sutil. Teto: menos de 5% da área de qualquer viewport. |
| `--terracotta` | `#C4705A` | **Única exceção semântica** à regra de acento único — reservada estritamente a erro/validação/destrutivo (confirmar exclusão, erro de formulário). Nunca decorativa, nunca em botão que não seja destrutivo. |
| `--border` | `rgba(26,26,26,0.1)` | Hairline universal — única cor/opacidade de borda estrutural do sistema. |

**Filosofia de cinza:** o sistema é efetivamente monocromático + dois
acentos semânticos (sage decorativo, terracota de erro). Hierarquia vem de
opacidade da Ink, não de múltiplos tons de cinza em hex.

**Fundo — regra:** apenas dois fundos de seção são permitidos: `--bg`
(padrão, 90%+ da interface) e `--ink` (seções invertidas — texto vira
`--bg`). `--stone` nunca é fundo de seção, só de blocos de conteúdo/imagem
dentro do canvas off-white.

**Onde cor NUNCA deve ser usada:** fundo de seção além de bg/ink, link de
texto (usar ink + underline, nunca azul), ênfase em corpo de texto (usar
peso/tamanho/itálico), borda (usar ink a 10%, nunca cor), preenchimento de
ícone (ícones são stroke-only, herdam a cor do texto).

**Azul real de produto (`#006AFF`):** existe apenas dentro de telas de
produto clonadas de verdade (screenshots do Square) — nunca no chrome do
site/case.

## 7. Corner radius

| Token | Valor | Uso |
|---|---|---|
| radius-0 | 0px | Canônico — cards, botões, inputs, imagens, tags, modais, containers de conteúdo |
| radius-sm | 2px | Skeleton blocks |
| radius-md | 4px | Reservado — não usado atualmente. Ver §13.1: os wireframes da case page **não** usam frame de hardware/device mockup, então nenhum bloco de solução usa este token hoje. |
| radius-full | 9999px | Só elementos circulares utilitários (trigger de menu flutuante) |

Nunca misturar cantos retos e arredondados dentro do mesmo grupo de
componente. Cards, inputs, tags e modais nunca têm cantos arredondados.

## 8. Elevação

Sem drop shadow como regra geral. Profundidade vem de: contraste de cor
(off-white/stone/ink), escala, camadas via z-index, blur de backdrop.

**Única exceção:** modal de confirmação de contato usa
`box-shadow: 0 40px 80px rgba(0,0,0,0.1)` — grande, difusa, baixa opacidade,
sinalizando interrupção temporária.

**Overlays:** `background: rgba(245,242,240,0.98)` (`--bg` quase opaco) +
`backdrop-filter: blur(4px)` — nunca overlay escuro/preto.

**Camadas (z-index):**
| Camada | z-index | Conteúdo |
|---|---|---|
| Base | 0 | Fundo de página |
| Conteúdo | 10 | Texto, imagens, seções padrão |
| Elevada | 50–60 | Nav fixa, trigger flutuante de TOC |
| Overlay | 100 | Overlay de case study, painéis full-screen |
| Controles | 110 | Botão "Voltar", controles de overlay |

## 9. Bordas e divisores

Linguagem única: 1px sólido a baixa opacidade.
- Hairline: `rgba(26,26,26,0.1)` — padrão universal (cards, inputs, tags,
  seções, hover de nav)
- Hover de card: hairline sobe para 30% de opacidade
- Destaque: `var(--sage)` — borda esquerda de pull quote (2px)
- Seções invertidas (fundo ink): `rgba(255,255,255,0.1)` no lugar do
  hairline padrão

**Ordem de preferência pra separar conteúdo:**
1. Espaço em branco (128px antes de recorrer a uma linha)
2. Borda hairline (`border-t/border-y` a 10%)
3. Ghost marker (texto decorativo grande, baixa opacidade, sem linha)

Linhas horizontais são preferidas a verticais (exceção: borda esquerda de
quote, 2px sage). Estrutura invisível (espaço em branco, alinhamento de
grid) é preferida a linhas visíveis.

## 10. Iconografia

Sistema de ícone SVG inline, desenhado à mão — sem biblioteca (Heroicons,
FontAwesome etc).
- Estilo: outline (stroke only, sem fill)
- Stroke width: 1.5px, `linecap: round`, `linejoin: round`
- Tamanho canônico: 20×20px; ícones decorativos maiores em feedback: 24×24px
- Cor: herda a cor do texto corrente (Ink padrão; off-white em seção
  invertida)

**Regra permanente: nunca ícone de hambúrguer**, em nenhum dos dois usos
possíveis do site:
1. **Nav principal do site** — sempre texto nativo visível
   (Projetos/Sobre/Contato), nunca escondida atrás de ícone
2. **TOC de case page** — o trigger flutuante inferior-esquerdo (círculo,
   `bg-page-bg/80`, `backdrop-blur-md`, borda hairline) usa o ícone de
   **linhas horizontais de largura decrescente** (padrão "outline" tipo
   Notion/Medium), nunca hambúrguer nem "§" — testado e rejeitado por falta
   de reconhecimento universal. Hover/tap revela um menu vertical com os
   títulos das seções da case page (gap 16px, min-width 200px, hover no item
   muda a cor para sage).

Ícones sentam à esquerda do texto com gap de 8–12px. Em botões, o ícone vem
antes do label.

## 11. Home — estrutura confirmada (v2)

> Substitui integralmente o modelo de "artefato + 3 pontos" da v1 (ver
> changelog no topo do arquivo).

**Estrutura:** nome + cargo (Fraunces itálico) + uma linha de bio + nav de 3
links (Projetos/Sobre/Contato), tudo dentro de um container estreito
(max-width 420px, centrado).

**Nav:** invisível por padrão no desktop (`opacity: 0`), revela no hover do
header (opacity + translateY(10px)→0, 0.4s ease). **Em mobile a nav é sempre
visível** — nunca depende de hover, porque toque não tem estado de hover.
Rótulos: "Projetos", "Sobre", "Contato".

**Panel toggle:** clicar em um item de nav substitui o texto da bio pelo
conteúdo do painel correspondente, no mesmo espaço físico (posição
`absolute`, `top:0, left:0, width:100%`, fade 0.5s ease, `pointer-events`
alternando). Apenas um painel visível por vez.
- **Projetos:** lista tipográfica dos cases (número, nome em Fraunces
  itálico, ano, uma linha de resultado factual, tags de tecnologia
  uppercase) — sem cards, sem thumbnails
- **Sobre:** bio completa
- **Contato:** e-mail, LinkedIn, CV, linha de disponibilidade

**Clique em projeto:** abre overlay full-screen com o case study completo
(ver §12 para a transição).

**Cursor:** `crosshair` como cursor padrão em toda a página (sinaliza que a
interface é um objeto de design, não um documento web padrão);
`pointer` em todo elemento interativo (links, botões, project links).

## 12. Transição home ↔ case

- **Entrada do overlay:** `opacity: 0` + `translateY(20px)` + fundo home
  recebe `filter: blur(10px)` + `opacity: 0` + `scale(0.98)` →
  `opacity: 1` + `translateY(0)`, duração **0.8s**, easing
  **`cubic-bezier(0.16, 1, 0.3, 1)`** (desaceleração suave, "porta de galeria
  abrindo" — nunca instantâneo, nunca elástico).
- **Saída:** reversa da entrada; Esc dispara o fechamento.
- **Botão de voltar:** "← Voltar", Fraunces itálico 14px, fixo/sticky no
  topo da case page durante todo o scroll (`position: fixed; z-index: 110`);
  conteúdo recebe `padding-top` suficiente para não colidir.

## 13. Sistema de blocos da case page (canônico — 13 blocos, v3 — 2026-09-13)

> **Substitui a lista de 9 blocos genéricos da v1/v2.** Aquela lista era
> especulativa (escrita antes da síntese real existir). A estrutura abaixo
> veio direto da página real do case Square (node `13440-2`,
> `Case---Square-Privado`), que já tem copy final escrito — não é mais
> hipotética. Numeração renumerada sequencialmente (01→13); a fonte
> original pulava do bloco 01 pro 03 sem nunca ter tido um bloco "02" —
> confirmado com Matheus que é só falha de numeração, não um bloco
> removido de propósito.

Regra geral continua valendo: desenhar como sistema de blocos reutilizável
— cada bloco é um componente que outros cases (além do Square) também
podem usar, com variantes de tamanho de conteúdo.

| # | Bloco | O que prova/comunica |
|---|---|---|
| 01 | **Hero** | Eyebrow + headline + subhead + stat row (40%→0%, 18/247/5) + metadados — tudo já na dobra 1 |
| 02 | **Contexto** | O briefing e o escopo do projeto |
| 03 | **Research (comprimido)** | Campo, survey, entrevistas, personas, 7 pain points numerados — link externo pra pesquisa completa no Miro |
| 04 | **Panorama competitivo** | Benchmark contra Zara/Amazon Go/Carrefour/Extra/Walmart |
| 05 | **Evolução do wireframe** | Papel → hi-fi → final, usando a tela de Scan como fio condutor |
| 06 | **Intro das soluções** | Ponte pro bloco de soluções |
| 07–11 | **Solução 1–5** | Um bloco por solução — título próprio, tag numerada, quote real, wireframe real (ver §14) |
| 12 | **Impacto** | 3 métricas reais de resultado |
| 13 | **Próximos passos** | O que fica deliberadamente fora de escopo por enquanto |
| — | **Footer** | Metadados completos, links reais (protótipo Figma, board Miro), navegação pro próximo case |

**Fundido/removido em relação à lista antiga de 9 blocos:**
- "Evidência/números" (bloco solto) → virou a stat row dentro do próprio
  Hero, não é mais um bloco separado.
- "Solução ×5" (1 bloco genérico repetido) → virou 6 blocos reais: 1 intro
  + 5 blocos individuais, cada um com nome, pain point numerado e quote
  próprios — não é mais um componente repetido com conteúdo trocado.
- "Next steps" deixou de ser um sub-item do bloco de impacto e virou bloco
  próprio (13).

**Camada principal vs. secundária (confirmado):** o bloco de Research
(03) tem um link "→ Ver a pesquisa completa" que aponta pra um board
**externo no Miro** (`https://miro.com/app/board/uXjVHJ5Co14=/`) — não é
um accordion/expansor dentro da própria página. A pesquisa completa nunca
carrega no case page; ela mora inteira fora, e o link sai do site. Isso
é o mecanismo real da regra "página principal enxuta, pesquisa completa
em um só lugar" de `diretrizes-portfolio.md`.

**Índice de seção (Quick Nav):** existe um componente de navegação rápida
com âncoras pros 13 blocos + as 5 soluções individuais (14 âncoras no
total). Ver §10 pro ícone (nunca hambúrguer).

**Modelo híbrido imagem/texto:** imagem grande faz o trabalho visual; texto
sempre HTML real por cima ou ao lado — nunca embutido no pixel da imagem.

**Tag de dispositivo (app vs. totem):** identificação é só por proporção
real da imagem + label tipográfico — nunca por frame de hardware, ícone de
device, chrome de browser ou mockup 3D. Ver §13.1 para as regras completas
de composição (substituem os números antigos de "container max-width
280px"/"cantos 4px" abaixo, que assumiam um frame de device que não existe
mais nesta decisão).
- Nunca inventar um rótulo de público/dispositivo que não existe de fato no
  case

### 13.1 Composição de wireframes nos blocos de solução (2026-09-13)

Regras derivadas de uma exploração de composição dedicada (ver
`docs/Visual Diagnosis.txt` para o raciocínio completo) — o problema real:
a coluna de conteúdo é fixa em ~696px, mas Totem (16:9) e Mobile (9:19,5)
têm proporções radicalmente diferentes, e forçar os dois na mesma caixa
distorce ou infla artificialmente um dos dois.

**Princípios (valem pra qualquer bloco de solução, não só Square):**
1. **Proporção nativa é lei** — nunca distorcer, nunca "stretchar" pra
   preencher o container.
2. **Espaço negativo é intencional, não decorado** — se a imagem do mobile
   sobra espaço na coluna, esse espaço fica vazio (`--color-bg`), nunca
   preenchido com elemento decorativo só pra "não parecer quebrado".
3. **O label tipográfico é o frame** — sem ícone de device, sem moldura de
   hardware, sem chrome de browser, sem mockup 3D/perspectiva. A imagem é
   documentação (evidência de design), não render promocional.
4. **Superfície plana, não card flutuante** — sem sombra, nunca (nem
   "sutil"). O resto do sistema já rejeita elevação; wireframe não é
   exceção.
5. **Uma gramática por família de device** — todo wireframe de Totem usa o
   mesmo tratamento; todo wireframe de Mobile usa o mesmo tratamento.
   Consistência entre os 5 blocos de solução é mais importante que otimizar
   cada um individualmente.
6. **Alinhamento flush-left** dentro de `col-start-5 col-span-7` — nunca
   centralizado dentro da própria coluna de conteúdo.

**Totem (1920×1080):**
- Padrão: uma tela só, largura 696px, altura 392px (16:9 exato,
  `696 × 9/16`), sem borda, sem sombra.
- Exceção — transição de estado (ex.: erro → resolução): par de 2 estados,
  cada um 320px, gap 32px (total 672px, cabe nos 696px). Usar no máximo uma
  vez por case study — se todo bloco tiver 2 estados, deixa de ser exceção
  e vira ruído.
- Alternativa — crop editorial: só quando a narrativa é sobre uma
  micro-interação específica (ex.: painel de pesagem, overlay de
  reconhecimento). O crop preserva 16:9, largura 696px, e a borda do crop
  alinha com uma região real da UI (painel, botão) — nunca um corte
  arbitrário no meio de um elemento.

**Mobile (393×852):**
- Padrão: uma tela só, largura 320px, altura ~694px (`320 × 852/393`,
  proporção 9:19,5 exata) — **não** a largura proporcional real (228px);
  320px é "ampliado mas honesto": grande o suficiente pra ler a interface,
  sem violar a proporção. Alinhado flush-left; os ~376px restantes da
  coluna ficam vazios (`--color-bg`), sem preenchimento.
- Exceção — sequência/fluxo (onboarding, verificação): par de 2 estados,
  cada um 280px, gap 32px (total 592px). Usar quando a narrativa é sobre
  transição/tempo, não como padrão default.
- Crop: raro, só se uma interação específica for o ponto inteiro da
  solução. Preserva 9:19,5, largura 320px — nunca cropar pra uma proporção
  não-nativa (ex.: nunca virar quadrado).

**Bloco de evolução (Legado vs. Proposta):** substitui os dois placeholders
idênticos de 256×384px que existiam antes (proporção arbitrária, não
representa nenhum device real).
- Alinhamento por **linha de base óptica**, não por caixa idêntica: os dois
  lados compartilham a borda inferior, não a superior nem dimensões iguais.
- Lado esquerdo (Legado, ex. Totem manual): 480px largura × 270px altura
  (16:9).
- Lado direito (Proposta, ex. visão computacional/mobile): 240px largura ×
  510px altura (9:19,5).
- Gap entre os dois: 64px.
- Labels ("Legado (2022)" / "Proposta (2023)") acima de cada visualização,
  alinhados à esquerda de cada uma — nunca centralizados.
- Sem canvas/fundo compartilhado, sem linha separadora, sem seta ou "VS"
  conectando os dois — a justaposição já comunica sozinha.
- Os dois lados **não precisam ter a mesma dimensão** — o objetivo é
  equilíbrio óptico (massa visual), não igualdade geométrica. Nunca
  distorcer a proporção de nenhum dos dois pra forçar simetria.

**Borda:** nenhuma por padrão. Só adicionar hairline (`rgba(26,26,26,0.1)`,
1px) se o wireframe tiver fundo claro/bordas ambíguas contra `--color-bg`
— a maioria dos wireframes já tem contraste interno suficiente e não
precisa.

**Sombra:** nunca, em nenhuma circunstância, nem "sutil". Wireframe é
documentação, não card de produto flutuante.

**Label do device — correção de acessibilidade:** o rascunho de exploração
sugeriu ink a 40% de opacidade pro texto do label ("TOTEM — 1920 × 1080").
**Não usar 40%** — essa sessão já mediu esse valor pra texto secundário da
home e ele falha WCAG AA (~2.46:1, mínimo é 4.5:1). Usar **65%** (piso já
validado, ~5.1:1) ou a Label style já definida em §5 a 100% — nunca menos
de 65% pra texto que precisa ser lido.

**Marcos de seção (ghost markers):** "Descoberta", "Síntese", "Design" —
Fraunces, 120px+, 5–20% opacidade, não-interativos, puramente atmosféricos,
orientação de scroll sem interferir.

**Regra de fonte pro case inteiro (confirmado 2026-09-13, varredura
completa de `2:546`):** dentro do case Square, **Fraunces só existe nos 3
ghost-markers acima** — nenhum headline, label, subhead, stat number ou
quote do case usa Fraunces ou itálico. Tudo o mais (117 ocorrências
conferidas) é **Instrument Sans Regular** (peso Medium só em 6 casos,
todos nomes de persona tipo "O Pragmático"). Isso contraria a tabela de
escala tipográfica geral do §5 (que descreve o sistema aspiracional da
home) — dentro do case, hierarquia é feita **só por tamanho**, nunca por
família ou itálico. Qualquer bloco novo do case que usar Fraunces fora
dos ghost-markers está errado; conferir contra `2:546` antes de assumir.

### 13.2 Comportamento sticky da coluna de texto (bloco de solução)

Confirmado em 2026-09-13: a coluna de texto (`col-span-5` — label, headline,
problema, citação, descrição da solução) de cada bloco de Solução acompanha
a(s) imagem(s) ao lado (`col-span-7`, wireframe) durante o scroll — fica
"grudada" (`position: sticky`) enquanto o bloco ainda está passando pela
viewport, e solta assim que o próximo bloco de Solução começa. Não é sticky
pra sempre — o escopo é por bloco.

**Implementação (CSS):**
- O bloco de Solução inteiro (`col-span-5` + `col-span-7` juntos) é o
  container de referência: `position: relative`, altura = altura do
  conteúdo mais alto entre texto e imagem (geralmente a imagem, se for
  Mobile 694px, ou o texto, se for mais longo que isso).
- A coluna de texto (`col-span-5`) recebe `position: sticky; top: 96px`
  (mesmo valor de `--space-24`, consistente com o espaçamento de seção) —
  ela gruda a 96px do topo da viewport enquanto o container pai (o bloco)
  ainda está visível, e sai de cena naturalmente quando o container pai
  termina (comportamento nativo de `position: sticky`, não precisa de JS
  pra "desgrudar" — o limite é o próprio container).
- Isso vale pra cada um dos 5 blocos de Solução do Square individualmente
  — nunca um sticky global que atravessa blocos diferentes.

**Extensão confirmada pro bloco Design e Prototipação (2026-09-14):**
mesmo comportamento, mesma implementação — a `Label Column` (label +
legenda, `2030:215`) do bloco Design e Prototipação (`2030:213`) fica
`position: sticky; top: 96px` enquanto acompanha a `Content Column` de
imagens (Sketch → Wireframe → Prototype) ao lado. Faz sentido
especialmente aqui porque as imagens desse bloco tendem a ser mais
altas que o texto (sequência de telas, não uma imagem só) — sem sticky,
o texto "sobra" no topo enquanto a imagem ainda rola. Mesmo escopo por
bloco da regra acima, não sticky global. **No Figma isso não é
visualmente simulável** (Figma não roda scroll) — a `Label Column` foi
alinhada ao bottom da row (`counterAxisAlignItems: MAX`) como
aproximação estática; o sticky de verdade só existe na implementação em
código.

### 13.3 Grid: guia visual vs. motor de posicionamento (2026-09-13)

Existem dois mecanismos de grid diferentes no Figma, e a confusão entre
eles gerou uma redundância real que já foi corrigida:

1. **Guia visual (`layoutGrids`, "Portfolio/Grid/Desktop 12-col")** — o
   overlay de 12 colunas aplicado no frame de topo (`square-case`). É só
   uma referência visual (liga/desliga), não posiciona nada sozinho.
2. **Motor estrutural (`layoutMode: "GRID"`)** — um recurso do Figma que
   posiciona filhos de verdade, como CSS Grid. O import do variant.com
   aplicou isso em cada seção individualmente, cada uma com suas próprias
   faixas de coluna — redundante com o guia visual e desnecessariamente
   complexo comparado ao resto da página, que usa posição absoluta simples.

**Regra daqui pra frente:** seções de conteúdo usam `layoutMode: "NONE"`
com posição absoluta (`x`/`y` fixos), não um motor de grid estrutural
próprio — mesmo padrão do resto da página.

**Correção de matemática (2026-09-13, mesma sessão):** os números de
`x`/`width` usados inicialmente pro offset assimétrico (`x:32, width:304`
pro label; `x:437.33, width:709.33` pro conteúdo) estavam **errados** —
vinham de dividir os 1216px úteis em 12 fatias iguais (1216÷12=101.33),
ignorando o gutter real de 32px definido no style
`Portfolio/Grid/Desktop 12-col` (`gutterSize: 32`, `offset: 32`,
`count: 12`). Isso fazia texto invadir o que deveria ser o gap entre
colunas. Matemática real do grid (frame de 1280px, offset 32, 12 colunas
de 72px + 11 gutters de 32px = 864 + 352 = 1216px):

| Coluna (0-indexed) | x inicial | x final |
|---|---|---|
| 0 | 32 | 104 |
| 1 | 136 | 208 |
| 2 | 240 | 312 |
| 3 | 344 | 416 |
| 4 | 448 | 520 |
| 5 | 552 | 624 |
| 6 | 656 | 728 |
| 7 | 760 | 832 |
| 8 | 864 | 936 |
| 9 | 968 | 1040 |
| 10 | 1072 | 1144 |
| 11 | 1176 | 1248 |

**Correção final (2026-09-13) — supera toda derivação acima:** label =
`x:32, width:440`; gap label→conteúdo = **32px** (`--gutter-desktop`
padrão); conteúdo começa em `x:504` (32 + 440 + 32). Chegamos aqui em
duas etapas na mesma sessão — vale registrar o raciocínio:

1. Primeiro round: label 282px + gap custom de 190px (também dava
   conteúdo em x:504) — funcionava visualmente, mas o 190px era um valor
   inventado, sem uso em nenhum outro lugar do design system.
2. Correção: **mesmo x:504 de conteúdo é alcançável com label 440px +
   gap de 32px** (32+440+32=504 — idêntico a 32+282+190=504, zero
   diferença visual). Escolhido por reusar o token real
   `--gutter-desktop` em vez de um gap mágico de uso único — a label
   passa a ser um "col-span" real como o resto da página, e o gap volta
   a ser gap de verdade.

**Preservar 440 (label) e 32 (gap) daqui pra frente** — não os 282/190
nem os 280/136 de tentativas anteriores. A tabela de colunas de 12×72px
acima é só o raciocínio histórico original, mantida por registro.

**Frame da seção é 1290px, não 1280px (correção de Matheus,
2026-09-13):** decisão explícita — o frame de cada seção
(`section.max-w-7xl`) mede `width:1290, x:315` no Figma, não os 1280/320
usados no restante da página antiga (`2:546`). Isso faz o início de
outros elementos da página baterem no mesmo pixel do grid. Como o offset
esquerdo (32 de padding + 440 do label + 32 de gap = 504 pro início do
conteúdo) fica fixo, os 10px extras do frame são absorvidos inteiramente
pela **largura da coluna de conteúdo** (que vira `FILL` num auto-layout
horizontal, não um valor fixo) — nunca redistribuídos pra esquerda.
Resultado: label sempre 440px fixo; conteúdo sempre começa em x:504 e
cresce pra preencher o que sobra do frame (754px numa seção de 1290px).
Hero, Contexto e Research (bloco 03, intro) já convertidos pra esse
padrão via auto-layout (`layoutMode: HORIZONTAL` ou `VERTICAL` conforme o
bloco, padding real em vez de `x`/`y` manuais).

**Responsividade (fill/fixed/hug) — regra de sanidade:** toda coluna de
label com `layoutMode: NONE` ou `layoutSizingVertical: FIXED` é sinal de
bug latente — o motivo dos dois bugs de `paddingBottom` órfão (Contexto e
Research, ambos herdados do import genérico do variant.com) foi
exatamente isso: altura fixa nunca recalculada. Toda label-column deve
ser `layoutMode: VERTICAL` com `layoutSizingVertical: HUG` (nunca FIXED
com resize manual); toda coluna de conteúdo deve ser
`layoutSizingHorizontal: FILL` + `layoutSizingVertical: HUG`. `FIXED` só
é aceitável quando é uma restrição de design deliberada (ex.: subhead do
Hero em `width:1000` fixo, por limite de comprimento de linha) — nunca
como atalho pra evitar configurar auto-layout corretamente.

**Gap entre colunas de linhas de dados (stats, metadados):** sempre
`--gutter-desktop` (32px), nunca um valor arbitrário — a linha de
metadados do Hero e a stats row devem usar o mesmo gap, não dois valores
diferentes pro mesmo tipo de elemento. Ambas já corrigidas pra usar
colunas de 280px (não 320px) com 32px de gutter real, batendo com a
tabela acima.

### 13.4 Divisória de topo entre blocos (confirmado 2026-09-14)

Conferido no case-page de referência (`2:549`): quase toda seção de
conteúdo (`section.max-w-7xl`) tem uma **borda superior de 1px**
marcando onde a linha de pensamento anterior termina antes da próxima
começar. A referência usa uma variável de cor cinza avulsa
(`color/grey/91`, fora da nossa paleta documentada) — **não reaproveitar
essa cor**; usar o hairline padrão do projeto: **ink a 10% de opacidade,
1px, só no topo** (`strokeTopWeight: 1`, demais lados 0,
`strokeAlign: INSIDE`).

**Onde aplicar:** só na fronteira entre dois **assuntos diferentes** —
não em toda fronteira de bloco. Hero (primeiro bloco) e banners
full-bleed de imagem pura nunca levam (confirmado pela própria
referência, que deixa esses sem cor de stroke real).

**Correção importante (2026-09-14):** blocos que continuam a **mesma
linha de pensamento** não levam divisória entre si, e devem ter o
padding vertical que os conecta **reduzido de 128px pra 64px** de cada
lado (mesma lógica de "grupo visual" já usada no composto Field
Exploration). Exemplos já aplicados:
- **Pesquisa → banner → Blueprint Crop → Field Notes** (todos dentro do
  frame "Pesquisa + Field Exploration (composite)"): mesmo assunto —
  sem divisórias entre eles, padding interno em 64px.
- **JTBD → Metodologia**: mesmo assunto (o "como" do processo) — sem
  divisória entre os dois, `paddingBottom` do JTBD e `paddingTop` da
  Metodologia em 64px.

Divisória (com padding 128px normal de cada lado) fica reservada pra
transições reais de assunto: Hero→Contexto, Contexto→Pesquisa, e
(quando construídos) Metodologia→Design e Prototipação, etc. **Antes de
adicionar uma divisória num bloco novo, perguntar: esse bloco muda de
assunto em relação ao anterior, ou continua a mesma ideia?** Só no
primeiro caso ela entra.

**⚠️ Cuidado com o frame da página:** em algum momento o frame de topo
`div#case-page` (`2030:122`) passou de posicionamento absoluto
(`layoutMode: NONE`) para **auto-layout vertical**. Isso muda a lógica
de posicionamento inteira — a ordem visual passa a vir da **ordem das
layers** (`insertChild`), não mais de `x`/`y` manuais (escrever `.y`
num filho direto desse frame agora é ignorado silenciosamente). Cascade-
shift manual via `.y` só funciona dentro de blocos que ainda são
`layoutMode: NONE` internamente — no nível da página, usar `insertChild`
pra reordenar.

### 13.5 Link de volta pro problema original (bloco de Solução, 2026-09-14, v2)

Cada bloco de Solução referencia um pain point real mapeado na pesquisa.
Em vez de repetir isso em texto corrido, ele vira **dois chips lado a
lado** no topo da coluna de texto (`col-span-5`), antes do Headline —
fecha o loop "aqui está o problema" → "aqui está a solução" de forma
visual, não textual.

**Padrão final (v2 — corrige a v1, que usava uma Tag longa em texto
solto E um link separado em texto, duplicando a mesma informação):**
- **Chip 1 — dispositivo:** "APP" ou "TOTEM", borda hairline (ink 15%),
  13px Instrument Sans Regular, sem cor.
- **Chip 2 — problema:** número + nome curto do pain point (ex.: "01 ·
  Fricção no escaneamento"), mesmo estilo visual do Chip 1 e dos chips
  de pain points em Field Notes (reconhecimento visual direto) — com
  **hyperlink de nó** (`node.hyperlink = { type: 'NODE', value:
  chipNodeId }`) apontando pro chip exato em Field Notes. No modo de
  apresentação do Figma isso já pula direto pro problema; **no código,
  vira um anchor link real** (`<a href="#pain-point-fricção-no-
  escaneamento">`), então cada chip em Field Notes precisa de um `id`
  correspondente no HTML final.

**Não incluir** a versão antiga de Tag ("APP · 01 · nome completo do
pain point, detalhe extra") como texto solto — ela duplicava o mesmo
dado que o chip já mostra.

**Tipografia do link (2026-09-14):** os comportamentos de interação da
home são a direção de experiência pro portfólio inteiro — links seguem
o mesmo padrão já implementado lá (`page.module.css`, `.panelText a`):
diferenciados por **sublinhado + peso**, nunca só por cor/opacidade
(WCAG 1.4.1). Ink 100%, Instrument Sans Medium, sublinhado — 30% ink em
repouso, 100% ink no hover (Figma mostra o estado estático em ink
100%). Não usar cor isolada (sage) como único sinalizador de link.

**Já aplicado:** Solução 1 → chips "APP" + "01 · Fricção no
escaneamento". **Replicar nas Soluções 2–5**, linkando pro(s) chip(s)
certo(s) de cada uma (ver mapeamento completo de pain points → soluções
em §14).

## 14. Case study real — Square (copy final, v3 — 2026-09-13)

> **Substitui integralmente a v1/v2 desta seção.** O copy abaixo veio
> verbatim da página real do case (node `13440-2`), extraído via prompt
> dedicado (`docs/square-case-extraction-prompt.md`) contra o chat que
> tem todo o contexto de pesquisa, e traduzido pra pt-BR nesta sessão.
> Todo número aqui é confirmado — a lista antiga de "não confirmados" foi
> resolvida (ver tabela abaixo). Fontes reais adicionais: protótipo
> completo no Figma
> (`UOGBjtsvGNFNs8O8qUSxjk/SquareUp---Matheus-Paiva`, node `12084:23891`)
> e board de pesquisa no Miro (`miro.com/app/board/uXjVHJ5Co14=`).

### Números que estavam marcados "não confirmado" — resolvidos

| Número | Status final |
|---|---|
| Rodadas de teste | **5**: 1 papel (app) + 2 mid-fi (totem) + 2 hi-fi (1 app + 1 totem) |
| Timeline | **6 meses, Fev–Jul 2026** (não "Fev–Jun" nem "Fev–Abr", que apareciam em versões antigas) |
| "12h de campo", "23 pontos de atrito" | Confirmados — 12h em 3 redes (Carrefour, Extra, Walmart) |
| Lista de concorrentes | **Zara, Amazon Go, Carrefour, Extra, Walmart** (5 nomes). "Clover, Shopify, Toshiba" não existe em nenhuma fonte real — descartado |
| "73% abandonavam no terceiro toque" | **Não existe em nenhuma fonte real — descartado.** (O único "73%" real é sobre hábito de lista de compras, contexto totalmente diferente) |
| "+24% Revenue/Hour", "-65%, 12s, 89%" | **Não existem em nenhuma fonte real — descartados.** Os números reais de Impacto são outros (ver bloco 12 abaixo) |
| Onboarding (6 variantes) e Payment Method | **Fora do escopo do case, de propósito** — as 5 soluções reais não incluem esses fluxos |

### 01 · Hero

- Eyebrow: `SELF-CHECKOUT REDESIGN · SQUARE`
- Headline: **"Pulando a fila do caixa."**
- Subhead: "Um redesign de 6 meses do autoatendimento do Square Register
  e de um app complementar — do estacionamento até o portão de saída. Só
  o fix de identificação de produtos levou a taxa de erro de 40% para 0%."
- Stats (4 — ver nota abaixo pra origem de cada um): **18 entrevistas** ·
  **247 respostas de survey** · **5 rodadas de teste de usabilidade** ·
  **24 pontos de atrito**
- Metadados: PAPEL — Product Designer (solo) · DURAÇÃO — Fev–Jul 2026 ·
  FERRAMENTAS — Figma · Miro · Treejack · Maze · SETOR — Autoatendimento

**Nota sobre o 4º stat (2026-09-13):** o 4º slot passou por duas versões.
Primeiro foi "40% → 0%", removido por ser redundante — o subhead já
menciona esse número (ele continua vivo lá, e reaparece como stat no
bloco 08 e no 12). No lugar, entrou **"24 pontos de atrito"** — arredondado
dos 23 confirmados no service blueprint (regra do Matheus: evitar número
quebrado tipo "23", arredondar pro múltiplo de 8 mais próximo; o valor
bruto real é 23, "24" é apresentação, não uma remedição). Descartadas
como opção: "57 telas hi-fi" e "16 flows" — o próprio Matheus sinalizou
que esses números provavelmente mudaram depois do redesign de UI e não
tem como confirmar o valor atual sem checar a fonte, então não usar até
serem revalidados. **Não usar NPS nem SEQ em nenhum bloco do case** —
Matheus pediu explicitamente pra evitar essas duas métricas, mesmo estando
confirmadas em outras partes da pesquisa (não aparecem no case page
real de qualquer forma).

### 02 · Contexto (v6 — final, 2026-09-13)

**Histórico da decisão sobre o label narrativo:** primeiro round testou um
label de 2 linhas (frase de abertura + nome da seção em itálico) pra trazer
storytelling pro fast-scan da esquerda — revertido por criar ruído visual
frente à referência (`2:579`: 1 label + 1 parágrafo). Segundo round
simplificou pra 1 label único + headline-hook ("Pagar nunca foi o
problema.") + corpo. **Decisão final (round 3):** headline-hook removido —
o padrão de 2 labels (categoria + pergunta) faz o trabalho do fast-scan
melhor que um headline poético, porque nomeia literalmente o que a seção
resolve em vez de exigir inferência. Esse padrão foi validado contra outra
seção real do case ao vivo que já usa exatamente essa estrutura
("Contexto de negócio e objetivos" / "O que o projeto precisa
resolver?"). Reservamos o headline-hook só pros blocos de Solução, onde o
gancho narrativo pontual faz mais sentido — mantém variação de ritmo
editorial em vez de repetir o mesmo tratamento em todo bloco.

- Label 1 (categoria): `O CONTEXTO` (label-caps padrão, Instrument Sans
  Medium 10px caps tracking 0.12em)
- Label 2 (pergunta): *"O que o projeto precisa resolver?"* (**Instrument
  Sans Regular, 32px**, line-height 120%, 12px abaixo do label 1) —
  corrigido de Fraunces Light Italic pra Instrument Sans (2026-09-13):
  conferido contra o case-page de referência (`2:546`) inteiro — Fraunces
  não aparece em headline nenhum lá, só nos 3 ghost-markers decorativos
  ("Descoberta", "Síntese", "Design"); todo o resto (117 ocorrências) é
  Instrument Sans, hierarquia feita só por tamanho, nunca família/itálico.
  Precisa ser maior que o corpo (24px), não menor, senão vira legenda
  subordinada em vez de âncora de fast-scan. Escala final do bloco: 10px
  (label-caps) → 32px (pergunta/fast-scan) → 24px (corpo/leitura
  aprofundada) — todas em Instrument Sans.
- Corpo (sem headline separado): "O briefing: transformar o Register em
  autoatendimento de verdade, lançar um app complementar que apoie a
  jornada inteira (não só o pagamento), manter o fluxo utilizável por
  qualquer idade ou perfil sem exigir assistência, e manter todo item
  rastreável. Este case acompanha a fase entre pegar o primeiro item e
  sair pela porta. Projeto solo, sem afiliação oficial com a Square."

### 03 · Research (comprimido)

- Eyebrow: `A PESQUISA`
- Headline: "18 conversas, 3 redes de varejo, um tema que não parava de
  se repetir"
- Subhead: "As pessoas não confiam que a máquina vai cobrir elas."
- Nota de campo: "Observação de campo — 12 horas em 3 redes de varejo em
  São Paulo, mapeando o serviço do estacionamento ao portão de saída."
- Nota de métodos: "Fluxos de usuário, card sorting, tree testing, Crazy
  8s — os métodos por trás dos wireframes."
- Link: **"→ Ver a pesquisa completa"** — externo, abre o board no Miro
  (não é accordion interno; ver §13)

**7 pain points reais (numerados):**

| # | Título | Quote/observação real |
|---|---|---|
| 01 | Fricção no escaneamento — parar pra checar o carrinho quebrava o escaneamento | "Cada olhada pra longe da câmera pra confirmar um item significava perder o fluxo e ter que se reencontrar." |
| 02 | Seleção de item errado — escolher o item certo vinha antes de precificá-lo | "Sem uma etapa de categoria antes, 40% dos participantes do teste escanearam o item errado por completo." |
| 03 | Busca de produto solto — o momento mais odiado do fluxo inteiro | "Busca manual de código pra produtos soltos — as pessoas desistiam no meio do escaneamento e pediam ajuda." |
| 04 | Verificação 18+ — pedir documento parecia um espetáculo público | "Verificação de idade assistida por funcionário, feita à vista de toda a fila atrás de você." |
| 05 | Ansiedade no portão de saída — um link escondido separava o cliente da porta | "O teste em papel revelou pessoas que disseram que precisariam de um funcionário só pra sair." |
| 06 | Desconexão entre lista e scanner — a lista de compras e o scanner não se falavam | "Manuela, 33, ainda faz compra com papel porque o app não ajuda ela enquanto está no corredor." |
| 07 | Lacuna de pagamento — o Pix era invisível em todo autoatendimento | "100% dos respondentes do survey disseram que é assim que preferem pagar. Nenhum totem testado aceitava." |

**3 personas reais:**

| Persona | Perfil | Quote | Tags |
|---|---|---|---|
| Xênia | 54–62 · baixa familiaridade com tecnologia | "Quero fazer compras rápido, mas tenho medo de errar." | Texto pequeno · Etapas demais · Medo de travar |
| João | 18–25 · alta familiaridade com tecnologia | "Sem fila, sem papo. Só pagar e ir embora." | Velocidade · Sempre usa Pix · Zero fricção |
| Manuela | 28–38 · familiaridade moderada com tecnologia | "Quero saber o que está acontecendo em cada etapa." | Clareza · Privacidade · Sem julgamento |

**Metodologia (Double Diamond) — bloco de keywords pra SEO/ATS:**

Requisito real de produto, não só estético: recrutadores usam ATS que
buscam por nome de método (card sorting, JTBD, tree testing etc.), então
esse bloco precisa ser **texto real, selecionável, nunca dentro de
imagem** — o mesmo motivo pelo qual todo o resto do case já segue a regra
"texto HTML por cima da imagem, nunca embutido no pixel" (§13).

A versão ao vivo (`mvpaiva.com/square`) usa losangos com cor de destaque
pra representar o Double Diamond — **isso não é o padrão aqui**: losango
decorativo colorido contraria duas regras já existentes ("nunca formas
geométricas decorativas", "no máximo uma cor de destaque por viewport").
Uma segunda referência (gerada pelo variant.com) tentou resolver isso com
headers em Fraunces itálico + parágrafo descritivo por fase + nomes de
método como link azul + marcador quadrado preenchido/vazado — melhor
tipograficamente, mas ainda usa cor fora da paleta (azul) e adiciona 4
frases de descrição que vão contra o objetivo de ser **mais breve** que a
página ao vivo, não mais longo. A ideia de destacar o nome da fase com
tamanho maior foi aproveitada; o resto (azul, quadrados, parágrafo,
itálico) foi descartado.

**Correção de fonte (2026-09-13):** a versão inicial deste documento
recomendava Fraunces Light Italic pro nome da fase. Errado — conferido
contra o case-page de referência inteiro (`2:546`, 117 ocorrências de
texto), Fraunces não aparece em nenhum headline/label do case, só nos 3
ghost-markers decorativos. **Padrão canônico corrigido: nome da fase em
Instrument Sans Regular + lista em 2 linhas** (empilha em coluna única no
mobile, sem descrição por fase):
- Header de cada fase = uma linha só: numeral (`01 —`, `Portfolio/Body/Label`
  10px caps tracking 0.12em, cor **sage** — único uso de cor no bloco
  inteiro) + nome da fase em **Instrument Sans Regular, ~24px** (mesma
  família usada em todo o resto do case — hierarquia por tamanho, não por
  família ou itálico)
- Métodos de cada fase = lista sem bullet, uma técnica por linha, `Body`
  padrão (13px), ink 100% — é a parte keyword-densa, tem que ficar em
  contraste total, nunca em opacidade reduzida
- Divisor entre header e lista = hairline horizontal 1px a 10%; divisor
  entre as 4 colunas = hairline vertical 1px a 10% — nunca seta, nunca
  losango, nunca quadrado, nunca ícone de convergência/divergência literal
- **Sem parágrafo descritivo por fase** — o nome em destaque já é a pista
  visual suficiente; qualquer explicação extra vai contra o objetivo de
  brevidade
- Progressão comunicada por sequência esquerda→direita + hairline, não
  por forma geométrica

**Conteúdo real (4 fases, `mvpaiva.com/square`):**

| DESCOBRIR | DEFINIR | DESENVOLVER | ENTREGAR |
|---|---|---|---|
| Estudo de campo | Personas | Crazy 8s | 5 rodadas de teste |
| Survey | JTBD | Wireframes low-fidelity | Protótipos mid-fi ×3 |
| Entrevistas | MoSCoW | Protótipo em papel | Protótipos hi-fi ×4 |
| Service blueprint | Avaliação de heurísticas | Wireframes high-fidelity | Maze + testes presenciais |
| Desk research | Card sorting / Tree testing | | |

**Atenção pra não confundir dois números parecidos:** "5 rodadas de
teste" (ENTREGAR) é a contagem de **sessões de teste realizadas** — 1
papel + 2 mid-fi + 2 hi-fi, já confirmado em §01. "Protótipos mid-fi ×3" e
"hi-fi ×4" são a contagem de **iterações de protótipo produzidas**, uma
métrica diferente (quantas versões foram desenhadas, não quantas vezes
foram testadas). Os dois números convivem sem contradição — só não
confundir "rodada de teste" com "iteração de protótipo" ao escrever copy.

Nota de rodapé do bloco (texto pequeno, ink 65%, keyword extra sem
disputar hierarquia visual): "Outras técnicas aplicadas mas não
apresentadas em detalhe: tree testing adicional, análise de jobs
stories, benchmarking de acessibilidade WCAG AA e análise comparativa de
interfaces existentes."

### 04 · Panorama competitivo

- Eyebrow: `PANORAMA COMPETITIVO`
- Headline: "Como o bom já se parece, em outro lugar"
- Subhead: "5 players diretos e adjacentes, comparados nos momentos que
  realmente quebravam nos testes."
- Logos: Zara · Amazon Go · Carrefour · Extra · Walmart

| # | Critério | Quem já resolve |
|---|---|---|
| 01 | Identificação de item | Zara, Amazon Go — totalmente automático, sem escaneamento item a item |
| 02 | Recomendações | Zara, Amazon Go — contextuais ao corredor onde você está |
| 03 | Orientação na loja | Amazon Go — busca dentro da loja guia até a prateleira |
| 04 | Verificação de idade | Ninguém, ainda — todo totem observado ainda direciona pra um funcionário visível |

### 05 · Evolução do wireframe

- Eyebrow: `COMO EVOLUIU`
- Headline: "Papel primeiro, tela por último"
- Subhead: "De um mock em papel até a tela final — como a interação
  central de escaneamento evoluiu de verdade."
- **Papel · Teste 1** — "Impresso no tamanho do iPhone 15 Pro, testado com
  pensamento em voz alta antes de um único pixel ser desenhado."
- **Hi-fi · depois do teste no totem** — "Mid-fi digital foi pulado —
  testado direto no totem físico, e então saltou direto pra alta
  fidelidade."
- **Final · entregue** — "Passagem real de câmera, carrinho sempre visível
  numa bottom sheet escurecida — itens confirmados animam sem parar o
  escaneamento."
- Wireframe usado: `scan-v1` (mesma tela nos 3 estágios da evolução)

### 06 · Intro das soluções

- Eyebrow: `AS SOLUÇÕES`
- Headline: "Cinco soluções, mapeadas pro que realmente quebrava"
- Subhead: "App e totem, trabalhando juntos — cada uma remonta a um pain
  point específico acima."

### 07 · Solução 1 — Escaneamento contínuo

- Tag: APP · 01 · fricção no escaneamento, interrupção do carrinho
- Headline: "Escaneie sem parar"
- Quote: "Quero escanear tudo com o celular e ir embora. Sem fila, sem
  conversa." — Survey
- Corpo: "A câmera fica ativa enquanto o carrinho fica numa bottom sheet
  abaixo dela. Um item escaneado confirma com uma animação rápida de mola
  que nunca interrompe o fluxo — a câmera continua visível (só
  escurecida) pra deixar claro que você ainda está escaneando."
- Wireframes: `scan-v1` (tela única) + `scan-fab-bottomsheet` (imagem
  full-bleed)

### 08 · Solução 2 — Identificação de produto

- Tag: APP · 02 · 03 · seleção de item errado, busca de produto solto
- Headline: "Categoria primeiro, código nunca"
- Stat: **40% → 0%** (erros de item errado, com vs. sem essa tela)
- Corpo: "Uma tela de categoria agora vem antes da grade de produtos.
  Escolha uma categoria, depois identifique o item por uma foto de alta
  qualidade — a balança captura o peso e o preço calcula
  automaticamente. Sem essa tela, 40% dos participantes do teste
  escolheram o item errado. Com ela: zero."
- Quote: "A tabela de busca de produto é péssima. Nunca sei o código
  certo. Desisto no meio do caminho." — Xênia, 54
- Wireframe: `weigh-item` (sequência completa: header → busca → grade de
  produtos → painel de peso/confirmação)

### 09 · Solução 3 — Verificação de idade

- Tag: APP · TOTEM · 04 · constrangimento na verificação 18+
- Headline: "Prove sua idade sem plateia"
- Quote: "No Extra, um funcionário confere o documento do cliente na
  frente de todo mundo." — Observação de campo
- Corpo: "Quando o sistema sinaliza um item com restrição de idade, ele
  oferece três caminhos: confirmar com um CPF já cadastrado, verificar
  pelo app, ou pedir ajuda — nenhum caminho exige se destacar. Se o CPF
  já está cadastrado, a verificação é automática."
- Callout — o que mudou no meio do projeto: "O participante P5 se recusou
  a digitar o CPF — até ler que ele não seria compartilhado. O aviso de
  privacidade agora aparece antes do campo, não depois."
- Wireframe: `age-verification` (totem, modal overlay)

### 10 · Solução 4 — Recuperação no portão de saída

- Tag: APP · 05 · ansiedade no portão de saída
- Headline: "Um portão travado não é um beco sem saída"
- Quote: "Se fosse uma loja de verdade, eu teria chamado um funcionário.
  Eu teria ficado preso ali." — Teste em papel
- Antes/Depois: link de texto escondido → tela dedicada de recuperação
- Corpo: "O caminho antigo de recuperação era um linkzinho de texto
  escondido no fim da tela de saída — fácil de perder sob estresse. O
  novo é uma tela dedicada: duas opções de largura total, impossíveis de
  não ver, que deixam o cliente se autodeclarar e liberar a saída sem
  esperar por um funcionário."
- Wireframes: `exit-fix-exit` (antes) + `exit-help` (depois)

### 11 · Solução 5 — Lista de compras

- Tag: APP · 06 · desconexão entre lista e escaneamento
- Headline: "A lista te acompanha enquanto você compra"
- Quote: "O app não me ajuda de verdade enquanto eu compro. Ainda uso
  papel." — Manuela, 33
- Corpo: "Um hub de lista dedicado deixa a pessoa montar a lista antes de
  sair de casa. Durante o escaneamento, duas abas ficam visíveis —
  Escaneados e Na Lista — e uma barra de progresso mostra o quanto falta.
  Os itens se marcam sozinhos conforme são escaneados."
- Wireframe: `scan-with-list`

### 12 · Impacto

- Eyebrow: `ONDE CHEGOU`
- Headline: "Cinco soluções, remontadas a cinco pain points específicos —
  validadas com as pessoas que realmente enfrentavam eles."
- Stats: **40% → 0%** (erros de identificação de produto) · **85,1%**
  (sucesso de navegação direta, tree test final) · **5/5** (soluções
  remontadas a um pain point específico)

### 13 · Próximos passos

- Eyebrow: `PRÓXIMOS PASSOS`
- Headline: "O que está deliberadamente fora de escopo, por enquanto"
- Mapa de corredores da loja + orientação de rota — precisa de um mapa
  interno por loja
- Programa de fidelidade — cada rede roda seu próprio sistema; precisa de
  parcerias
- Acompanhamento de orçamento mensal — empurra o produto pra além do
  autoatendimento, rumo a finanças pessoais
- Escalabilidade multi-rede — precisa antes de um fluxo de seleção de loja

### Footer do case

- PAPEL — Product Designer · DATA — Fevereiro 2026 – Julho 2026 ·
  FERRAMENTAS — Figma · Miro · Google Forms · Optimal Workshop · Treejack
  · Maze · SETOR — Autoatendimento
- Links reais: ↗ Protótipo completo no Figma
  (`UOGBjtsvGNFNs8O8qUSxjk`, node `12084:23891`) · ↗ Board de pesquisa no
  Miro (`miro.com/app/board/uXjVHJ5Co14=`)
- Navegação: ← Fireflies.ai · Essavie → (navegação entre cases do
  portfólio — não é conteúdo do case Square, ver nota abaixo)

### Wireframes: usados vs. fora do escopo

Dos 24 exportados em `docs/assets/square-wireframes-raw/`, só **7 são
usados** no case real:

- **Usados:** `scan-v1` (Solução 1 + Evolução), `scan-fab-bottomsheet`
  (Solução 1), `weigh-item` (Solução 2), `age-verification` (Solução 3),
  `exit-fix-exit` + `exit-help` (Solução 4), `scan-with-list` (Solução 5)
- **Fora do escopo, de propósito** (confirmado com Matheus — onboarding e
  pagamento não fazem parte da narrativa condensada): `scan-v2`,
  `scan-radial-menu`, `payment-method`, `cart-review`,
  `scan-with-list-full`, as 6 variantes de `onboarding-*`, e do Totem:
  `weigh-confirm`, `review-pay`, `payment-approved`, `splash-entry`,
  `scan-cart`

**Regra permanente:** nunca fabricar métricas, clientes, entrevistas,
citações, participantes, resultados, prêmios, depoimentos, links
profissionais ou URLs.

**Bio real (Sobre):**
> "Sou Product Designer Júnior em transição de carreira, com experiência
> prática em UX Research, design de interação e otimização de interfaces
> digitais. Antes do product design, operei um e-commerce por 18 meses:
> rodei testes A/B com verba real, analisei funis no GA4 e Hotjar, e
> redesenhei o checkout de ponta a ponta... Tenho formação em design de
> sistemas complexos... Hoje busco minha primeira experiência formal em
> produto digital... Disponível para posições júnior, remoto ou presencial
> em São Paulo. CV ↗ FORA DO DESIGN Toco violino, desenho, escrevo e treino.
> Também participei de competições internacionais de design com quatro
> menções honrosas."

**Cases "Essavie" e "Fireflies.ai":** explicitamente fictícios — teste de
estresse do sistema de blocos, não conteúdo a publicar.

## 15. Componentes — regras de construção

**Botões** (v2 — supera a proibição de preenchimento da v1):
- Anatomia: inline-flex, conteúdo centralizado, gap 8px ícone-texto
- Padding: 12px vertical, 24px horizontal · fonte 11px uppercase, peso 500,
  tracking 0.08em · borda 1px sólida · radius 0px
- **Primário:** fundo ink sólido, texto off-white, borda ink
- **Secundário:** fundo transparente, texto ink, borda ink a 10%
- **Ghost:** transparente, sem borda, underline no hover via `::after` +
  `scaleX`
- **Destrutivo:** fundo terracota (`#C4705A`), texto off-white — raro,
  reservado a confirmação de exclusão
- Hierarquia: Primário > Secundário > Ghost — nunca mais de duas opções
  lado a lado
- Hover: transição de cor/borda 0.3s ease · Disabled: 30% opacidade,
  `cursor: not-allowed`

**Inputs:**
- Label acima (nunca floating label): 10px uppercase, peso 500, tracking
  0.1em, 8px margin-bottom
- Campo: 100% largura, fundo transparente, borda 1px ink a 10%, padding
  12px/16px, fonte 13px, radius 0px
- Focus: borda vira ink 100% sólido · Erro: borda e mensagem em terracota

**Cards:**
- Borda 1px ink a 10%, radius 0px, padding interno 24px, sem sombra, sem
  fundo colorido (transparente, herda `--bg`)
- Hover: borda sobe pra 30% de opacidade — nunca lift, nunca scale
- Área de imagem usa `--stone` como placeholder

**Tags/badges:**
- Padding 4px/10px, fonte 10px uppercase peso 500 tracking 0.08em, borda 1px
  ink a 10%, radius 0px
- Variantes: default (transparente) · Live (fundo sage, texto off-white) ·
  Prototype (fundo stone, texto ink)

**Tabelas:** sem borda externa, separador de linha 1px a 10%, header
uppercase 10px peso 500, sem zebra striping, sem bordas verticais, hover de
linha vira fundo stone.

**Listas:** sem bullet padrão do navegador; prefixo tipográfico ("/" em
sage, ou número em estilo label); gap de 24px entre itens.

**Modais/overlays:**
- Fundo `rgba(245,242,240,0.98)` + `backdrop-filter: blur(4px)`, nunca
  overlay escuro
- Radius 0px, sem sombra (exceto modal de contato, ver §8)
- Entrada: `opacity+translateY(20px) → opacity 1+translateY(0)`, 0.8s,
  `cubic-bezier(0.16,1,0.3,1)`
- Fecham com Esc, clique fora, ou trigger de fechamento explícito

**Feedback (inline, nunca toast):**
- Sucesso: borda esquerda 2px sage + ícone de check + título + descrição
  60% opacidade
- Erro: borda esquerda 2px terracota + ícone X
- Container: borda 1px ink a 10%, padding 20px/24px, flex row com ícone
- Nunca toast/snackbar flutuante — feedback sempre inline no fluxo de
  conteúdo

**Menu flutuante (TOC de case page):** ver §10 — círculo com blur, ícone de
linhas decrescentes (nunca hambúrguer), revela lista vertical de seções.

## 16. Interações e motion (v2 — supera a v1)

Três categorias de motion, com pesos diferentes — usar a categoria errada
(ex: curva de "Primary Transition" numa troca de texto pequena) é o que faz
uma microinteração parecer pesada demais, mesmo sem nenhum erro técnico.

**1. Primary Transition** — `0.8s cubic-bezier(0.16, 1, 0.3, 1)`. Curva de
desaceleração suave (início rápido, fim lento) — "porta de galeria pesada
abrindo devagar". Reservada **só** para revelações de página cheia e
overlays (entrada/saída do case study, transformação de página). Nunca usar
essa curva/duração em algo que acontece dentro da mesma view.

**2. Microinteractions** — `0.3s ease-in-out`. Hovers, sublinhados, trocas
rápidas de estado dentro da mesma view. **Inclui o panel-toggle da home**
(troca de conteúdo entre Projetos/Sobre/Contato/tagline): fade puro de
opacidade, `0.3s ease-in-out`, **sem transform** — é uma troca de estado
local, não uma revelação de página, então usa a curva leve, não a pesada.

**3. Reveal Effect** — `opacity: 0` + `translateY(10–20px)` → `opacity: 1`
+ `translateY(0)`. Elementos "sobem" levemente ao aparecer, criando sensação
de profundidade. Aplica-se a **entradas** de elemento (nav reveal no hover
do header, entrada de overlay/modal) — nunca a uma troca de conteúdo no
mesmo lugar (panel-toggle), que deve ler como o texto "surgindo do fundo"
(fade puro), não subindo.

**Durações:**
| Duração | Categoria | Uso |
|---|---|---|
| 0.3s | Microinteraction | underline de hover, shift de opacidade, borda de card, panel-toggle da home |
| 0.4s | Reveal Effect | reveal de nav (hover do header) |
| 0.8s | Primary Transition | entrada/saída de overlay, transformação de página |

**Hover de link de texto:** opacidade 100%→60–70%, ou sublinhado via
`transform: scaleX(0→1)`, 0.3s ease.

**Lista de projetos:** item em hover fica 100%, irmãos caem para 40%
(group-hover).

**O que nunca deve acontecer:**
- Física bounce/elástica, overshoot
- Transições abaixo de 0.3s (nada "estala")
- Rotação (sem ícone girando, sem loader girando)
- Scale-pop em hover (botões não crescem)
- Cor animada / gradiente animado / hue-shift
- Parallax guiado por scroll
- Entrada com stagger (cascata de elementos com delay)
- Shake/wobble de erro
- Flip 3D / page curl
- Efeito de máquina de escrever (texto letra por letra)

## 17. Acessibilidade

- Todo hotspot/link é focável por teclado com label acessível
- `:focus-visible` obrigatório em todo elemento que funciona como link:
  `outline: 1px solid var(--ink); outline-offset: 2px` — o código-fonte usa
  `outline: none` globalmente por padrão; isso precisa ser corrigido na
  implementação real (pendência técnica, ver `handoff.md`)
- Touch target mínimo 44×44px em todo elemento interativo
- Esc fecha overlays e painéis
- `prefers-reduced-motion` é requisito do brief original — nunca confirmado
  como implementado; tratar como pendência até verificar no código
- Contraste mínimo AA: Ink 100% sobre `--bg` (~15:1), Ink 60% sobre `--bg`
  (~4.5:1, aceitável só acima de 13px)
- Nav principal (Projetos/Sobre/Contato) sempre existe em forma acessível e
  visível como texto nativo — nunca depende só de hover, porque toque não
  tem hover
- Sem horizontal scroll em nenhum breakpoint

## 18. Dos and Don'ts (resumo rápido)

**Fazer:** Fraunces itálico peso 300 em todo display · Instrument Sans
400/500 em todo funcional · uppercase só com tracking ≥0.12em (labels) ou
0.08em (botões) · `#F5F2F0` de fundo padrão, `#1A1A1A` de fundo invertido ·
sage como único acento decorativo, terracota como única exceção semântica de
erro · borda hairline 1px a 10% · radius 0px em conteúdo editorial, 4px só em
frame de device · espaço em branco generoso (mínimo 64px entre seções,
128px+ preferencial) · grid assimétrico de 12 colunas em case study ·
alinhamento à esquerda por padrão · `cubic-bezier(0.16,1,0.3,1)` + 0.8s em
transições maiores, 0.3s em micro-interações · reveals com fade+translateY
sutil (10–20px) · botão primário preenchido ink, secundário outline, ghost
texto puro · cursor crosshair por padrão, pointer em interativo.

**Não fazer:** branco/preto puro · mais de 2 famílias de fonte por view ·
peso ≥700 · caixa-alta sem tracking aumentado · centralizar texto longo ·
fundo colorido em card/seção além de bg/ink · drop shadow (exceto modal de
contato) · gradiente · radius >4px em conteúdo · ilustração decorativa ·
cor além de sage/terracota (terracota só em erro) · animação
bounce/elástica/rotativa · zebra striping · hambúrguer em qualquer lugar do
site · mais de 5% de sage no viewport · parallax de scroll · movimento
ambiente flutuante · entrada com stagger · overlay escuro · frame de device
realista com sombra (usar borda física, não sombra) · toast/snackbar
flutuante.

---

## Changelog (v1 → v2, 2026-09-11)

Decisões tomadas explicitamente com Matheus durante a reconciliação entre a
v1 (decisões de conversa) e o novo `Visual Language Specification.txt`
(reverse-engineering do código real, importado no Figma
`kGgmy2zYCzFzi0ZyLU9iMU`):

1. **Home:** o padrão de "artefato + 3 pontos" foi abandonado. O código real
   implementa nav hover-reveal + panel-toggle — este é o padrão oficial
   agora (§11). `handoff.md` e `diretrizes-portfolio.md` ainda citam a
   decisão dos pontos como "confirmada" — está desatualizada, ver nota no
   topo de cada um.
2. **Botões:** botão primário passa a ter preenchimento sólido ink (§15) —
   supera a regra "nunca preencher" da v1.
3. **Motion:** easing e durações passam a seguir o código real
   (`cubic-bezier(0.16,1,0.3,1)`, 0.8s, reveals com translateY) — supera a
   proibição de "subir no reveal" da v1 (§16).
4. **Max-width:** unificado em 1280px — abandona a divisão 900/1400 da v1
   (§3, §4).
5. **Cor de erro:** terracota `#C4705A` adicionada como exceção semântica
   estrita (§6) — não existia na v1.
6. **Ícone de hambúrguer:** a rejeição da v1/`diretrizes-portfolio.md` foi
   **mantida** para a nav principal do site. O trigger de hambúrguer citado
   no reverse-engineering é, na verdade, um elemento diferente — o TOC
   flutuante de case page — que continua usando o ícone de linhas
   decrescentes, nunca hambúrguer (§10).
7. **Preservado sem alteração:** sistema de 9 blocos da case page, fatos
   reais do case Square, regra de nunca fabricar conteúdo, bio real, regra
   de idioma pt-BR, estrutura de acessibilidade central.
