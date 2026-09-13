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

## 13. Sistema de blocos da case page (canônico — 9 blocos, preservado da v1)

Regra geral: desenhar o sistema de blocos reutilizável, não uma página fixa
do Square — cada bloco é um componente com variantes de tamanho de conteúdo.

1. **Hero do case** — eyebrow, headline, subhead, metadados (papel, duração,
   ferramentas), resultado principal em destaque
2. **Bloco de evidência/números** — métricas de pesquisa reais
3. **Bloco de contexto** — problema mapeado como service blueprint
4. **Bloco de research** — fotos de campo reais, metodologia (double
   diamond), pain points, personas reais
5. **Bloco de benchmark/competitive** — comparação com concorrentes reais
6. **Bloco de evolução** — a mesma tela em fidelidades diferentes
7. **Bloco de solução** (repetível ×N) — nome, pain point, tag de
   dispositivo real, telas reais
8. **Bloco de impacto/next steps**
9. **Footer do case** — voltar para home, próximo case

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

## 14. Case study real — Square (fatos confirmados vs. exemplo — preservado da v1)

**Fatos reais do projeto** (não fabricar, não alterar):
- Referência publicada: `mvpaiva.com/square`
- Eyebrow: "SELF-CHECKOUT REDESIGN · SQUARE"
- Headline pt-BR: "Pulando a fila do caixa."
- Subhead: 6 meses de redesign de self-checkout para Square Register e um
  app complementar — do estacionamento até o portão de saída. Um fix de
  identificação de produto sozinho levou a taxa de erro de 40% para 0%.
- Metadados: Product Designer (solo) · Fev–Jun 2026 · Figma · Miro ·
  Treejack · Maze
- Evidência principal: **40% → 0%**
- Escala real: ~8.000 palavras, 15 seções, 18 entrevistas, 247 respostas de
  survey, personas reais, JTBD, card sorting, tree testing, 5 blocos de
  solução, next steps
- Dispositivos reais: Square App (mobile, 393×852) e Square Register
  Totem/Kiosk (1920×1080)
- A pasta `docs squareup/` (fonte primária de pesquisa) foi removida do
  repositório — qualquer número marcado "não confirmado" precisa ser checado
  com Matheus ou contra `mvpaiva.com/square` antes de virar copy final

**Números não confirmados — verificar antes de usar:** "12h de campo", "23
pontos de atrito", lista de concorrentes do benchmark (inconsistente entre
versões do log), "73% abandonavam no terceiro toque" (sinalizado como
possível invenção de IA), "+24% Revenue/Hour" / "-65%, 12s, 89%"
(prováveis placeholders de template).

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
