## ⚠️ Logos de loja calibrados — Totens no dia a dia (2026-09-16)

Os logos das 11 marcas na "Tira de logos" (`2313:181`) e das 4 colunas em
destaque (`2313:170`) tinham peso visual bem inconsistente mesmo com
containers do mesmo tamanho (40×40 nas colunas, 64×64 na tira) — os
arquivos de origem têm resoluções e padding internos bem diferentes
(ex: C&A nativo 3279×2759 não-quadrado, Riachuelo 554×554, Zara
399×399). Calibrado por comparação visual (não há como medir a caixa
real do conteúdo não-transparente via API do plugin), trocando
`scaleMode` pra `CROP` com `imageTransform` de zoom manual nos 3 piores
casos:
- **C&A** (destaque `2306:170` + tira `2308:179`, mesmo hash): zoom 1.7x
  — estava com muito respiro interno, ficava minúsculo perto dos outros.
- **Pão de Açúcar** (`2309:1207`): zoom 0.82x (reduz) — estava maior que
  o resto.
- **Shopping Center Norte, tira** (`2309:1226`): zoom 1.15x — estava
  pequeno. (A versão em destaque, `2306:178`, usa uma imagem diferente,
  já ok.)

**Não é uma solução definitiva** — calibrado a olho contra os outros
logos como referência, não uma medição precisa. Se novos logos forem
adicionados no futuro, comparar visualmente contra esse conjunto antes
de aceitar o resultado do `scaleMode: FIT` padrão.

## ⚠️ Navegação persistente vs. conteúdo full-bleed — Voltar + TOC (2026-09-16)

"Voltar" (fixo, topo-esquerda) e o TOC (fixo, agora à direita) ficam
sempre visíveis, sobrepondo qualquer conteúdo que role por baixo —
banners, fotos. Segunda opinião pedida ao variant.com pra calibrar isso
(texto completo arquivado abaixo, consultar de novo em blocos futuros
com imagem full-bleed de verdade — Design e Prototipação, Onboarding
Filmstrip, banners de solução).

**Decisões aplicadas:**
- **TOC movido pra direita** — Voltar e TOC não competem mais pela mesma
  coluna/canto (ponto 3 do texto arquivado).
- **Scrim no topo do banner do Hero** (`HeroBanner.module.css`,
  `.wrap::before`): gradiente de 120px, `rgba(245,242,240,0.85)` →
  transparente — protege a "dead zone" onde Voltar fica (ponto 1/2).
  Direção clara (não escura) porque nosso texto de navegação é ink
  escuro, não branco — o scrim tradicional (escurecer pra texto branco)
  não se aplica aqui.
- **Revertida a "caixa" com borda+blur** que eu tinha aplicado em Voltar
  e TOC antes dessa segunda opinião — não era uma das recomendações
  reais do variant.com (invenção minha). Os dois voltaram a ser texto
  puro, confiando no scrim + no reposicionamento pra legibilidade, não
  numa caixa de fundo.
- **TOC adaptativo (2026-09-16, ponto 3 — "indicador minimalista...
  expandido apenas no hover"):** como o conteúdo é fluido (não tem
  margem fixa), a lista completa do TOC sobrepõe texto corrido em
  qualquer largura de viewport abaixo de ~1600px — confirmado por
  medição, não é caso isolado (a distância entre a borda direita do TOC
  e a borda do conteúdo é praticamente constante nesse regime). Em vez
  de esconder o TOC abaixo de um breakpoint fixo (perderia a lista em
  faixa grande de larguras) ou colapsar sempre (perde legibilidade em
  telas largas), `TableOfContents.tsx` faz **detecção de colisão real**:
  a cada scroll/resize, verifica se algum elemento de conteúdo real
  (parágrafo, imagem, link — nunca wrappers de layout tipo `Reveal`/
  `BlockLift`, que têm largura total mesmo com conteúdo visível mais
  estreito, mesmo bug já corrigido uma vez no hover do spotlight) invade
  a "danger zone" à esquerda do TOC, na faixa vertical onde ele está.
  Se sim, colapsa pra ticks estreitos (`max-width:16px`, texto cortado);
  expande de volta no hover/focus (permite "espiar" mesmo em conflito,
  como o variant.com sugeriu). Transição calma (`0.5s
  cubic-bezier(0.2,0,0.2,1)`, mesmo ritmo do spotlight/lift). Volta ao
  estado normal (lista completa) assim que o conflito termina — testado
  em 1920px (sem colisão, expandido) e 1150px (colide com o subhead do
  Hero, colapsa corretamente).
**Terceira opinião (2026-09-16) — 3 pontos fechados:**
1. **Voltar NÃO ganhou detecção de colisão** (variant.com foi explícito:
   "não faz sentido colapsar um botão pequeno e textual" — proteção
   correta é arquitetural, não reativa). Em vez disso, `BackLink.module.css`
   ganhou um fundo "fantasma" sempre ativo: `background:
   rgba(245,242,240,0.8)` + `backdrop-filter: blur(4px)` — barato,
   nunca pisca, cobre o caso raro de algo passar atrás fora do banner do
   Hero (que já tem o scrim dedicado).
2. **TOC mobile**: não virou drawer/bottom-sheet (pesado demais pro
   ritmo da página) — virou um **pill fixo "ÍNDICE"** no canto inferior
   direito (48px de altura, texto 11px uppercase), que expande uma
   lista vertical simples acima dele ao tocar (fade + translateY, sem
   animação de slide/backdrop-scrim). Abaixo de 640px.
3. **Área de toque + safe-area no Voltar**: `::before` invisível de
   48×48px centralizado sobre o texto (hit area real, sem mudar o
   visual pequeno) + `env(safe-area-inset-top)`/`env(safe-area-inset-left)`
   somados à posição fixa, pra não ficar atrás do notch/cantos
   arredondados.
4. **`mix-blend-mode: difference` continua não aplicado** — over-
   engineering sem seção escura de verdade ainda. Quando existir uma
   (o sistema já prevê `CaseSection background="ink"`), a recomendação
   é uma classe `.nav-light` disparada por `IntersectionObserver` ao
   entrar na seção escura, não blend-mode.

**Bug pego por Matheus depois de implementado:** a detecção de colisão
do TOC reavaliava a cada frame de scroll (`requestAnimationFrame`), então
um vão pequeno entre dois blocos — ou só scroll rápido — podia fazer o
TOC colapsar/expandir várias vezes em sequência, brusco. Corrigido:
`TableOfContents.tsx` agora faz **debounce de 150ms** — limpa o timeout
a cada evento de scroll/resize e só reavalia a colisão depois que o
movimento "assenta". Estado fica parado durante o scroll ativo, só
atualiza quando ele para (mesma ideia do "reative só no `scrollend`" do
texto original arquivado abaixo).

<details>
<summary>Texto completo da segunda opinião (variant.com, 2026-09-16)</summary>

> O conflito entre navegação persistente e conteúdo full-bleed é
> clássico. O procedimento correto depende da hierarquia de leitura que
> você quer estabelecer, mas segue uma lógica de camadas e momentos de
> atenção:
>
> 1. **Defina uma "zona segura" no topo.** Nunca posicione conteúdo
>    crítico (títulos, rostos em fotos, CTAs) na área onde o botão
>    "voltar" e o TOC ficam — geralmente os primeiros 80–120px no topo
>    esquerdo, tratados como dead zone pra conteúdo.
> 2. **Use um gradiente ou scrim sutil**, não um fundo sólido opaco: um
>    gradiente vertical de 15–20% de opacidade (do topo pra transparente)
>    cria contraste suficiente sem cortar a fotografia.
> 3. **TOC sempre visível ≠ TOC sempre no mesmo lugar.** Um TOC fixo no
>    topo esquerdo compete com o "voltar". Soluções: mover pra direita/
>    sidebar vertical (fora do F-pattern), virar indicador de scroll
>    minimalista com ticks (expande no hover), ou agrupar os dois num
>    único dropdown de índice.
> 4. **Alterne o modo de exibição por seção**: sobre banners escuros,
>    ícone/texto branco com sombra sutil; sobre texto claro, preto/cinza
>    escuro. `mix-blend-mode: difference` como solução universal (funciona
>    claro e escuro), mas testar bem — pode ficar psicodélico em cores
>    médias.
> 5. **TOC em páginas com margens curtas (mobile):** nunca lista
>    horizontal/sidebar aberta — vira drawer/bottom sheet acionado por
>    ícone, ou floating pill que expande. Botão voltar fixo é aceitável,
>    mas hit area mínima 48×48px, afastado das bordas reais
>    (`safe-area-inset`).
> 6. **Regra de ouro — não lute com o conteúdo.** Se TOC sempre visível +
>    botão voltar + banners full-bleed + margens curtas coexistem, algo
>    na arquitetura está errado — sacrificar um dos três: TOC vira botão
>    de ativação (não sempre visível), banner perde o full-bleed e ganha
>    margem de respiro no topo, ou botão voltar vira gesto/é removido.

</details>

## ⚠️ Spotlight de bloco (nível de página) — decisão fechada e recalibrada (2026-09-16)

Além do spotlight de item-de-lista já documentado abaixo (JTBD/Próximos
Passos/Stats Section/Field Notes/Footer Metadados — dimming de **itens
dentro de um mesmo bloco**), existe um segundo efeito, mais amplo, que
tinha ficado combinado em conversa mas nunca escrito aqui: **spotlight em
nível de bloco/seção da página inteira**. Hover num bloco de conteúdo dá
foco visual a ele, apagando os outros. Confirmado com Matheus 2026-09-16
— os dois efeitos coexistem, escopos diferentes (item-dentro-do-bloco vs.
bloco-dentro-da-página).

**Primeira versão (revertida horas depois):** dim+blur igual ao spotlight
de item (`opacity:0.15`, `blur(4px)`, `0.6s`) aplicado em TODOS os blocos,
incluindo texto corrido (Hero, Contexto, Pesquisa). Dois bugs/problemas
apareceram:
1. O gatilho era `.spotlightGroup:hover`, que dispara em qualquer lugar
   dentro de `<main>` — inclusive nas margens/gaps entre blocos e no
   padding de 32px dentro de cada bloco. Sem nenhum `.item` de fato em
   hover, todos escureciam ao mesmo tempo (sensação de "pisca" constante
   rolando a página).
2. Mesmo corrigindo o gatilho (`:has(.item:hover)`), o efeito em si
   estava errado pra texto corrido — Matheus trouxe uma segunda opinião do
   variant.com (texto completo arquivado abaixo) confirmando isso.

**Versão atual (corrigida):**
- **Blocos narrativos/texto corrido** (Hero, banner do Hero, Contexto,
  Pesquisa) usam `BlockLift` (`src/components/case/BlockLift.module.css`):
  `opacity:0.6` nos vizinhos, `translateY(-2px)` no hover, **sem blur**,
  `0.35s ease` — mais rápido e leve que o spotlight de item.
- **Stats Section** (meta-informação, 4 números) mantém o `BlockSpotlight`
  original (`opacity:0.15`, `blur(4px)`, `0.6s`) — bate com a categoria
  que a segunda opinião do variant.com recomenda pra esse tratamento mais
  forte (grupos pequenos e isolados, não texto corrido).
- **Área de gatilho corrigida pros 1226px exatos**: a classe (lift ou
  spotlight) vai no elemento INTERNO de cada bloco que já é exatamente o
  content box (1226px), nunca no frame externo com padding de 32px —
  então passar o mouse no padding lateral de um bloco não ativa mais o
  efeito nele. Verificado com `getBoundingClientRect` no browser.
- `<main>` carrega a classe global literal `spotlightGroup` (fora do CSS
  Module) pra `BlockLift.module.css`/`BlockSpotlight.module.css`
  conseguirem referenciar o hover do grupo através da fronteira de
  módulo. Ambos desativados sob `prefers-reduced-motion`.

**Três correções feitas depois, mesma sessão, todas reportadas por
Matheus testando ao vivo:**

1. **Cross-type blindness (commit `439b5bc`):** hover num bloco
   `BlockSpotlight` (Stats) não escurecia blocos `BlockLift` (Hero/
   Contexto/Pesquisa), e vice-versa — cada CSS Module só observava sua
   própria classe local via `:has()`, então os dois efeitos nunca se
   notavam. Corrigido com um marcador global compartilhado (depois
   substituído pelo esquema de dois marcadores da correção 3, abaixo).
2. **Phantom hover zone em BlockGrid (commit `d47cafc`):** Contexto e
   Pesquisa (os únicos blocos que usam `BlockGrid`) tinham o marcador de
   hover no `.grid` externo — mas como CSS Grid dimensiona a linha pela
   coluna mais alta, o espaço vazio sobrando na coluna mais curta (o
   label) contava como "dentro do elemento hoverável" mesmo sem
   conteúdo visível ali, disparando o efeito ao passar o mouse em área
   morta. Corrigido movendo o marcador pras duas colunas internas do
   `BlockGrid` (cada uma já do tamanho exato do seu conteúdo) em vez do
   grid externo — ver `BlockGrid.tsx`.
3. **Tratamento amarrado ao tipo de quem reage, não ao que foi hoverado
   (commit `ae47879`):** Matheus percebeu que passar o mouse no
   Contexto/Pesquisa deixava o Stats com blur pesado — "forte demais"
   — enquanto o mesmo hover no Hero/Banner parecia certo. Numericamente
   os dois casos já batiam com o valor documentado (`blur(4px)`,
   `opacity:0.15`); a causa real é que Stats fica logo ao lado de
   Contexto/Pesquisa (visível na tela junto) mas longe do Hero/Banner
   (normalmente fora da viewport quando eles são hoverados) — o mesmo
   número lia como "mais forte" só por estar visível de perto. **Modelo
   corrigido:** o tratamento aplicado aos outros blocos depende de
   **qual bloco está em hover**, não do tipo de quem está reagindo.
   Marcador único `spotlight-item` virou dois: `lift-trigger` (Hero,
   HeroBanner, Contexto, Pesquisa) e `spotlight-trigger` (Stats).
   Hover num `lift-trigger` agora escurece TUDO levemente (`opacity:
   0.6`, sem blur), Stats incluído; hover num `spotlight-trigger`
   (Stats) borra TUDO pesado (`opacity: 0.15` + `blur(4px)`), os blocos
   de texto corrido incluídos — simétrico nas duas direções.
   **Descoberta (GhostMarker) fica de fora dos dois lados de propósito**
   (confirmado com Matheus): não tem `lift-trigger` nem
   `spotlight-trigger`, então não reage a hover de outros blocos nem
   dispara o próprio. Racional: o texto já é `opacity: 0.08` (marca
   d'água decorativa, não conteúdo de leitura) — blur/dim nele seria
   imperceptível, e é um divisor de seção passivo, não um bloco
   competindo por atenção.

### Segunda opinião arquivada (variant.com, 2026-09-16) — guardar pra usos futuros/especiais

Pedida por Matheus especificamente pra recalibrar o efeito numa case page
longa (o spotlight original foi validado só em contextos minimalistas
tipo benji.org). Vale reconsultar sempre que for aplicar spotlight em
blocos novos (galerias, grids de card, Design e Prototipação, Onboarding
Filmstrip etc.) — a lógica de "grupo pequeno e isolado = ok, texto
corrido/narrativa principal = não" continua valendo pra decisões futuras:

> O spotlight funcionou na variação minimalista porque havia poucos
> elementos, espaçamento enorme e zero imagens. Quando você joga isso numa
> case page longa — cheia de fotos, blocos de texto, módulos variados — o
> efeito vira ruído.
>
> 1. **Nunca aplique na página inteira.** Use em grupos pequenos e
>    isolados (galeria de 3–4 imagens, lista de 5 resultados, índice
>    lateral) — grupo pequeno = dimming parece intencional; grupo longo =
>    parece bug visual.
> 2. **Tire o blur em conteúdo denso.** Blur cansa rápido em texto —
>    mantenha só opacidade reduzida (`0.4`–`0.5`, nunca `0.15`). Blur
>    reservado pra galerias de imagem, nunca texto corrido.
> 3. **Trigger por área, não por pixel** em listas longas — hover
>    instável; prefira focus zone generosa ou cards bem separados.
> 4. **Separe "escaneável" de "narrativo".** Grids de imagem/cards de
>    projeto: spotlight funciona. Corpo de texto, parágrafos, legendas:
>    não usar — foco vem de hierarquia tipográfica, não interação. Usar
>    em meta-informação (índice, navegação, galeria), nunca no
>    storytelling principal.
> 5. **Delay/transição mais suave em página longa:** `0.3s–0.4s ease` em
>    vez de `0.6s` (evita "piscar" rolando a página). Ou desligar durante
>    scroll, reativar só no `scrollend` (não implementado ainda).
> 6. **Alternativa mais quieta pra cases longos — "lift sutil"** (é o que
>    adotamos pros blocos narrativos):
>    ```css
>    .case-card { transition: transform 0.3s ease, opacity 0.3s ease; }
>    .case-card:hover { transform: translateY(-2px); opacity: 1; }
>    .case-group:hover .case-card:not(:hover) { opacity: 0.6; }
>    ```
>    Destaca por elevação, não por apagamento.
> 7. **Princípio geral:** numa página já 100% carregada de informação,
>    apagar tudo ao redor cria uma luta pela atenção. O papel do efeito é
>    "spotlight editorial": iluminar o que o usuário quer inspecionar, sem
>    apagar o contexto.

## ⚠️ Aviso de fonte de conteúdo (2026-09-15)

`visual-language-specification.md` §14 ("Case study real — Square, copy
final v3") **NÃO é a fonte de verdade pro código da case page.** O próprio
§14 diz vir do node `13440-2`, que é diferente do frame de refinamento
(`2173:172`/`2173:173`) onde o trabalho real desta sessão inteira
aconteceu. Testei isso na prática: construí Hero/Contexto/Pesquisa em
código a partir do §14 e o conteúdo não batia com o frame `2173:172` real
(headline batia por coincidência, mas eyebrow, subhead, stats, e toda a
estrutura de Pesquisa eram diferentes — §14 tinha 7 pain points numerados
que não existem no frame real; o frame real tem parágrafo + 3 observações
+ citação + CTA). **Pra qualquer implementação de código, sempre ler o
texto direto dos nós do Figma (`2173:172`), nunca do §14.**

# Referência: benji.org — extração e análise (2026-09-14)

Este arquivo existe pra retomar o "pente-fino" de refinamento visual do case
Square sem depender do histórico de conversa. Contém a extração completa que
Matheus trouxe do portfólio do Benji Taylor (benji.org) e a análise de quais
padrões valem adotar no nosso sistema vs. quais conflitam com decisões já
tomadas. **Ler antes de continuar qualquer refinamento "minimal chrome" nos
blocos do case.**

## Onde isso se encaixa

Matheus pediu pra propagar os comportamentos de interação e a linguagem
ultra minimal chrome da home (que já é a direção visual/experiência de todo
o portfólio) pros blocos do case page. Essa extração do Benji foi trazida
como referência de padrões — **não pra copiar, mas pra comparar contra o
nosso sistema já estabelecido** e adotar só o que reforça, sem quebrar
decisões já confirmadas nesta sessão (ex.: link sublinhado+peso em vez de
cor, WCAG 1.4.1).

O trabalho de refinamento está acontecendo num **frame duplicado** do case
page no Figma (`srfFKPHCUBOrQ1rHCGXsum`, node `2173:172` "square -
refinamento") — a página original (`2030:122`) não foi tocada pelo
refinamento ainda; a ideia é aprovar mudanças no duplicado antes de propagar
pra original.

## Extração completa (benji.org)

### 1. Direção Visual & Filosofia de Experiência

O site opera sob uma filosofia de "editorial radical" — o conteúdo é o
design. É um portfólio pessoal que rejeita totalmente decoração, imagens
heroicas, navegação tradicional, cards, sidebars ou qualquer "chrome" de
interface. A experiência é construída como uma carta pessoal bem
tipografada: um fluxo contínuo, monocolumnar, onde a hierarquia é
estabelecida apenas por texto, espaçamento e opacidade.

A sensação transmitida é de autoridade calmada: nada compete pela atenção,
não há urgência visual, e o ritmo é lento e constante.

### 2. UI Chrome — Quase Inexistente

O "chrome" (elementos estruturais de interface) é reduzido ao mínimo
absoluto:

- Zero navegação: sem menu, hambúrguer, logo mark, barra superior ou
  controles de busca.
- Zero containers visuais: sem cards, bordas ao redor de conteúdo, painéis
  de fundo, botões de CTA ("Learn More"), ou widgets de redes sociais.
- Únicos elementos estruturais: uma linha divisória fina de 1px (#ededed,
  3.125rem de largura) acima do footer; e um gradiente fixo no topo da
  viewport que suaviza a entrada do conteúdo durante o scroll.

Isso força a atenção total para as palavras — uma abordagem content-first,
chrome-last.

### 3. Calm UI — Qualidades de Serenidade

A calma visual é construída por:

- Whitespace generoso: 5rem de padding superior no desktop, 2rem no mobile.
  Não há blocos comprimidos.
- Gradiente fixo no topo: uma máscara de 8rem de altura (#fff → transparente)
  cria uma "zona de buffer" etérea que impede que o conteúdo colida
  visualmente com a barra do navegador durante o scroll.
- Paleta restrita: apenas duas opacidades de texto (preto puro #111 e cinza
  mudo rgba(0,0,0,.4)).
- Sem texturas, sombras ou grids visuais: o fundo é um off-white quente
  (#fdfdfc), mais suave que branco puro.
- Ritmo visual lento: parágrafos separados por espaçamento natural, sem
  margens pesadas ou blocos isolados.

### 4. Microinterações & Comportamentos de Interação

Apesar da aparência estática, o site possui interações sutis e refinadas:

- Links: transição de 0.2s na classe `basic-link`.
- **Spotlight hover** na lista de posts: ao pairar sobre um item da lista de
  escritos, todos os outros itens diminuem para `opacity: 0.3`, enquanto o
  item hover permanece em opacidade total — um padrão de "holofote" que guia
  a atenção sem adicionar elementos visuais.
- Seta em posts: no hover, uma pequena seta desloca-se `translateX(0.25rem)`
  e rotaciona `45deg`.
- Footer link: fade suave para `opacity: 0.5` em `0.15s ease`.
- Scroll suave: `scroll-behavior: smooth` no elemento HTML.
- Ícone de "sleep" no footer: animação CSS pura — orelhas balançam
  suavemente ±3deg em loop de 4s, e letras "Z" flutuam para cima com
  fade-out (`zFloat1/2/3` keyframes).
- Seleção de texto: estilo customizado com fundo #ededed e texto #111.

### 5. Cores & Tipografia

Paleta:

| Uso | Valor |
|---|---|
| Fundo | #fdfdfc (off-white quente) |
| Texto primário | #111 (preto suave, não puro) |
| Texto secundário | rgba(0,0,0,.4) |
| Links | #3e9fff (azul saturado, único ponto de cor viva) |
| Destaque/acento | #f09637 (laranja — definido mas não usado nesta página) |
| Erro | #ff0052 |
| Bordas/divisórias | #f2f2f2, #ededed |
| Seleção | #ededed bg / #111 texto |

Tipografia:

- Fonte primária: Inter (variable 100–900), com subsetting agressivo por
  unicode-range.
- Fonte secundária: Newsreader (itálico, 200–800) — carregada mas não
  utilizada na homepage.
- Fonte código: SF Mono / Consolas.
- Sizes deliberadamente modestos: H1 em 0.9375rem (~15px), peso 600,
  letter-spacing -0.00813rem. O título principal é propositalmente pequeno,
  rejeitando a tendência de hero oversized. Body em 16px, peso 400,
  `max-width: 70ch`.
- Text rendering: `optimizeLegibility` + `-webkit-font-smoothing:
  antialiased`.

Tom emocional: a paleta é clínica mas quente. O off-white evita
esterilidade; o preto suave evita harshness. O azul dos links é o único
elemento saturado, funcionando como guia preciso de interação.

### 6. Peso Gráfico & Hierarquias

Peso extremamente leve (featherweight). Não há fotografias, ilustrações,
ícones (exceto o micro SVG no footer) ou formas decorativas no conteúdo
principal. O peso visual vem exclusivamente de:

- Densidade dos parágrafos de texto
- Linhas horizontais tênues (1px solid #f2f2f2) entre itens de lista
- O gradiente sutil no topo

A hierarquia é plana e linear, fluindo top-down sem sidebars, callouts ou
seções destacadas: Identidade → Narrativa/bio → Trajetória → Projetos →
Contato → Escritos (lista reverse-cronológica agrupada por ano: 2026 → 2025
→ 2024) → Contexto (footer com localização em tempo real + ícone sleep).

### 7. Representações Visuais & Pontos Focais

- Zero imagens no conteúdo principal: o site é puramente tipográfico.
- Único elemento gráfico: um micro SVG animado no footer (rosto dormindo
  com orelhas balançando e "Z" flutuantes).
- Foco tipográfico: o nome "Benji Taylor" é o primeiro ponto focal (H1
  ligeiramente mais bold).
- Foco dinâmico na lista: o "spotlight hover" cria foco guiado.
- Links como foco estático: por serem os únicos elementos saturados, atraem
  o olhar naturalmente numa página monocromática.

### 8. Efeitos & Transições

- Máscara gradiente fixa: não é uma animação, mas um efeito visual
  persistente de 8rem no topo.
- Scroll suave nativo.
- Transições de opacidade: 0.2s em links; 0.15s no footer.
- Rotação de seta: `transform: translateX(0.25rem) rotate(45deg)` no hover
  de posts.
- Dimming de grupo: hover no `<ul>` de posts aplica opacidade reduzida aos
  filhos não-hover.
- Animações CSS no footer: rotação de orelhas 4s ease-in-out infinite;
  partículas "Z" flutuantes com fade.
- Tokens de timing definidos: `--duration-snappy: 220ms`,
  `--duration-swift: 800ms`, `--duration-smooth: 300ms`, com curvas
  cubic-bezier customizadas.

### 9. Blocos Escaneáveis, Storytelling & Clareza

O site cria blocos engajantes e escaneáveis através de retenção radical,
não adição:

- Chunking list-oriented: a seção "Writing" é dividida por ano, cada post
  como uma linha flex (título à esquerda, data à direita). Os anos atuam
  como âncoras escaneáveis.
- Zero metadados desnecessários: só título + data, sem excerpts, tags,
  tempo de leitura, thumbnails.
- Storytelling linear contínuo: bio e blog fluem como narrativa
  autobiográfica única.
- Linguagem direta e declarativa, sem jargão/buzzwords.
- Links como CTAs invisíveis: cada entidade mencionada é um hyperlink
  direto — não há botões genéricos de "Saiba Mais".
- Razão informação/decoração ≈ 100%.

**Veredicto do Benji:** masterclass de restrição radical — minimalismo
extremo (sem navegação, imagens, cards, botões) pra criar presença pessoal
calma, autoritária e profundamente legível. "Anti-design editorial."

## Nossa análise: o que reforça vs. o que conflita

### Reforça o que já temos (aplicar)

- Hierarquia por 2 opacidades (ink 100% / ink 65%) — já é exatamente o que
  fizemos na auditoria de contraste da home.
- Fundo off-white quente, zero textura/sombra — já é `--color-bg: #f5f2f0`.
- Chrome mínimo (sem cards, bordas, botões CTA) — já é a direção que vimos
  seguindo (chip virou texto puro, Tag redundante removida, footer sem
  card).
- Agrupamento por "chunking" com âncoras curtas — já usamos em JTBD,
  Próximos Passos, Field Notes (chips).
- Microinteração de link com transição suave — já existe na home
  (`.panelText a`, 0.3s, sublinhado).

### Novo, vale adotar

- **"Spotlight hover"** em listas (dimming dos outros itens no hover) — não
  temos isso ainda. Avaliado em 2026-09-14 pra JTBD e Próximos Passos:
  **não aplicado** porque essas listas já são curtas (3-4 itens) e
  escaneáveis sem o efeito — adicionar seria decoração sem reduzir esforço
  cognitivo real. Reavaliar se algum bloco futuro tiver uma lista genuinamente
  longa.
  - **Versão evoluída (2026-09-14, sessão 2), pronta mas sem aplicação
    ainda:** Matheus trouxe uma referência externa ("Radical Restraint
    Wireframe", mobile) com blur de verdade (não só opacidade) nos itens não
    focados. Padrão fechado, adaptado pra funcionar em touch (hover não
    existe antes do tap em mobile):
    - **Desktop:** hover no item → blur breve e calmo nos demais.
    - **Mobile:** tap no item ativa o mesmo estado de foco (substitui hover,
      que não existe em touch); tap em outro item troca o foco; tap fora ou
      no mesmo item de novo desfaz o blur.
    - Trabalho de código (real hover/tap state + `filter: blur()`), Figma só
      representa o estado de repouso.
    - **Decisão revertida (mesma sessão, minutos depois):** Matheus trouxe
      screenshot do site de origem (variant.com/shared/...) mostrando o
      efeito em blocos tão curtos quanto os nossos (01 Global Navigation, 02
      Data Stream, 03 System Preferences — 1-2 linhas de descrição cada) e
      funcionando bem mesmo assim. O valor não é "lista longa demais pra
      escanear" (esse motivo de rejeição original estava errado) — é a
      qualidade calma/deliberada da própria transição (blur com um delay
      perceptível até o estado final, não instantâneo). Bate com o pedido
      recorrente do Matheus por "mais vida sem virar decoração" (ver
      discussões sobre tipografia grande e placeholders de imagem).

    - **Escopo final fechado:** não é 1 grupo global de spotlight pra página
      inteira (hover num item da Solução 01 blurrando o Footer não faz
      sentido) — é **cada bloco de lista virando seu próprio grupo
      independente**, replicando `.totem-group` por bloco: JTBD (3
      entradas), Próximos Passos (4), Stats Section (4 números), Field Notes
      (6 links + 1 mudo), Footer — Metadados (5 campos). Cada um isolado —
      hover num item de um grupo nunca afeta outro grupo.
    - **100% aditivo, não substitui nada:** o sticky da coluna de texto nos
      blocos de Solução (§13.2) continua exatamente como está. A animação de
      "aparecer e subir" ao rolar a página (fade + translateY na entrada de
      cada bloco, como em mvpaiva.com/square) também continua — spotlight é
      só mais uma camada, não troca gatilho nem remove nenhuma interação
      existente.
    - **Spec técnica exata (preservar valores ao implementar em código):**
      ```css
      .spotlight-group:hover .spotlight-item:not(:hover) {
        opacity: 0.15;
        filter: blur(4px);
      }
      /* token global de transição — 600ms, deliberadamente lento/contemplativo,
         nunca "snappy" — mesmo valor usado em qualquer mudança de estado
         desses itens */
      --transition: 0.6s cubic-bezier(0.2, 0, 0.2, 1);
      ```
      Link hover (`translateX(4px)`) é aditivo ao sublinhado que já usamos —
      não conflita com WCAG 1.4.1, só acrescenta um "empurrão" de 4px.

      **Regra fechada pra ONDE aplicar o deslocamento** ("nunca descolar o
      link da vizinhança de texto" — produz 2 resultados diferentes
      dependendo do contexto, não é inconsistência):
      - **Link solto** (Field Notes — "Fricção no escaneamento" etc.;
        captions "0X · Problema original" acima de cada Solução; Miro — "Ver
        a pesquisa completa no Miro") → desloca o **texto inteiro** 4px.
        Seguro porque não tem vizinho de frase corrida pra descolar — são
        itens numa lista com gap ou uma linha própria, não palavras dentro
        de uma sentença.
      - **Link dentro de frase corrida** (bio da Home — "Square",
        "LinkedIn", "X", "CV" no meio de uma sentença) → só o sublinhado
        escurece no hover, **sem deslocamento nenhum**. Deslocar a palavra
        aqui descolaria ela visualmente da frase ao redor (efeito de glitch,
        não de polish).
      - **Removida a seta líder** ("→ Ver a pesquisa completa no Miro" →
        "Ver a pesquisa completa no Miro") — Matheus identificou que era
        geração de IA, não uma decisão real. Isso também elimina a
        necessidade da categoria "seta desloca sozinha" (padrão do Benji) —
        sem seta, não tem o que isolar; o link inteiro desloca.
    - Ainda não implementado — depende de código (hover real), mas escopo,
      grupos-alvo e não-substituição estão fechados.
  - **Linhas diagonais CSS como placeholder** — variação do `ink4%+noise` já
    usado nos placeholders de imagem, trazida na mesma referência. Vale como
    alternativa pra spots sem nenhuma referência de conteúdo ainda definida,
    não como substituição do padrão atual.
  - **Scroll indicator fixo de 1px — REVERTIDO (2026-09-16), não
    construir.** Tinha sido aprovado originalmente (spec técnica abaixo,
    preservada como referência histórica caso o contexto mude), mas ao
    tentar implementar de verdade, com TOC + Voltar já ocupando a borda
    direita/topo-esquerda, virou um **terceiro elemento flutuante**
    competindo pelo mesmo espaço — contra o próprio princípio de "reduzir
    chrome" que guiou o resto do trabalho de navegação nessa sessão
    (ver seção de Voltar/TOC acima). Decisão: em vez de um elemento
    separado, o **TOC passa a destacar a seção ativa** (opacidade cheia
    no item cuja seção cruza o centro vertical do viewport, via
    `IntersectionObserver` com `rootMargin: "-50% 0px -50% 0px"`) — cobre
    boa parte do "onde estou"/"quanto falta" sem adicionar mais chrome.
    Implementado em `TableOfContents.tsx`.

    <details>
    <summary>Spec técnica original (histórico, não implementada)</summary>

    Candidato forte pro case (16.000+px de altura, TOC mostra seção mas não
    "quanto falta"). Mesma lógica da hairline de 1px do Benji (chrome mínimo
    genuíno).
    ```js
    const scrolled = (winScroll / height) * 80; // 80 = altura da trilha em px
    thumb.style.top = scrolled + 'px';
    ```
    ```css
    .scroller-thumb { transition: top 0.1s linear; } /* rápido, não os 600ms do spotlight */
    ```
    Linha de 1px flutuando verticalmente à direita da tela, sem barra de
    scroll nativa visível — "leitor de progresso quase subliminar".
    </details>

  - **Cursor crosshair — já confirmado, não é novidade.** A referência usa
    `cursor: crosshair` global, que já é decisão nossa desde a spec original
    da Home (§11: "cursor: crosshair como cursor padrão em toda a página...
    pointer em todo elemento interativo"). Bate certinho, sem mudança
    necessária.
- **Pequeno deslocamento da seta (`→`) no hover dos links** — complementa o
  sublinhado que já usamos. Ainda não aplicado (depende de implementação em
  código, já que Figma não anima).

### Conflita (não aplicar, já decidido diferente)

- **Links em azul saturado como único acento de cor** — rejeitado nesta
  sessão; usamos sublinhado+peso, não cor (WCAG 1.4.1), e isso não muda.
- **H1 minúsculo (15px)** — a home e o case já têm uma escala tipográfica
  maior e mais editorial de propósito; não é a mesma filosofia de "carta
  pessoal" do Benji.
- **Zero imagens** — o case é sobre mostrar wireframes reais; não dá pra ir
  100% texto. O que dá pra reduzir é o chrome AO REDOR das imagens (bordas,
  labels desnecessários), não as imagens em si.

## O que já foi aplicado (2026-09-14)

Tudo no frame duplicado `2173:172`, página original ainda intocada:

- **Piloto "Solution Block" aprovado:** corpo de texto (`p.instrument`) de
  ink 100% pra **ink 65%**; imagem reduzida de 393×852 nativo pra
  **341×739** e alinhada à esquerda (`counterAxisAlignItems: MIN`) em vez de
  centralizada. Aplicado nas 5 Soluções.
- **Bug achado e corrigido:** Solução 3 (Totem) tinha perdido a coluna de
  imagem inteira — reconstruída em ambas as páginas (original e duplicado).
- **JTBD e Próximos Passos avaliados, sem mudança** — já tinham a hierarquia
  correta, já eram listas curtas sem chrome.
- **Metodologia corrigida:** os 20 itens de técnica estavam todos em ink
  100% (zero hierarquia); baixados pra ink 65%, mantendo os 4 headers de
  fase e numerais em 100%.
- **Blueprint Crop (dentro de Field Exploration) corrigido:** as 3 linhas de
  descrição de 12px também baixadas pra ink 65%, pra bater com a linha
  "Dor real:" ao lado.
- **Conteúdo fictício da sub-seção "A Pesquisa" resolvido:** os 3
  `[Insight: ...]` entre colchetes e a citação fictícia eram um padrão
  visual intencional (colchetes = forma de destacar achados, confirmado por
  Matheus), só o CONTEÚDO dentro é que era fictício (texto de exemplo do
  variant.com). Substituído por conteúdo real já confirmado no spec §01,
  sem duplicar quotes já usadas em Soluções: os 3 insights vêm dos pain
  points 01/04/07 (fricção no escaneamento, verificação de idade, Pix
  invisível), a citação grande vem do pain point 03 (busca de produto
  solto). Formato de colchetes mantido.
  - Bug corrigido junto: o texto da citação grande tinha
    `textAutoResize: WIDTH_AND_HEIGHT` (hug numa linha só, estourando a
    largura do container) — trocado pra `HEIGHT` com largura fixa, mesmo
    bug recorrente já documentado em outros blocos.
- **Análise do botão "Voltar" (`2173:534`):** não deve entrar na lista do
  TOC — são ações de natureza diferente (sair da página vs. navegar dentro
  dela); misturar os dois no mesmo componente arrisca clique errado. O
  Benji consegue misturar porque a lista dele é toda do mesmo tipo (ir pra
  outro lugar). Recomendado: realinhar "Voltar" com a mesma coluna x do TOC
  (x:60, margem esquerda) mas fixo no topo da página (não acompanha
  scroll), agrupando visualmente sem misturar função.

## Verificação empírica no benji.org real (2026-09-14, sessão 2)

Matheus pediu pra decidir a questão do TOC/Voltar a partir do site real, não só
da extração acima. Naveguei até `benji.org/drawesome` (sub-página de writing,
estrutura de coluna esquerda + conteúdo — mais parecida com uma case page que a
home). Achado: "← Index" e a lista de seções ficam na mesma coluna, empilhados
com gap, mas são dois elementos DOM separados (nunca um item dentro da lista) —
confirma a recomendação da seção anterior. A coluna inteira é sticky desde o
início do scroll, sempre visível, sem círculo flutuante/blur/hover-reveal. Isso
**invalida qualquer suposição de trigger flutuante circular** — não existe no
site real. Item ativo da lista fica ink 100%/bold (scrollspy); "Index" nunca
muda de peso. "Index" usa texto simples, não itálico serifado.

**Importante, corrigido depois:** o padrão de trigger flutuante circular com
blur não é invenção nossa — **vem do case-page original do variant.com**
(`srfFKPHCUBOrQ1rHCGXsum`, node `2:546`) e Matheus estava testando se o TOC
estático seria mais interessante agora que estamos refinando. Ou seja: **essa
decisão (TOC estático vs. trigger flutuante) continua em aberto**, não
resolvida — não editar `visual-language-specification.md` sobre isso sem
confirmar com Matheus primeiro (já errei isso uma vez nesta sessão e revertri).

O botão "Voltar" (`2173:534`) já estava posicionado corretamente (x:60, fixo no
topo, label-caps) — não precisou de mudança no Figma.

## Limpeza sistemática de cores (2026-09-14, sessão 2)

Padrão recorrente encontrado: vários blocos ainda usavam tokens de cor
herdados do `variant.com` (`color/orange/89`, `color/red/60`, `color/red/20`,
`color/grey/91`) que não fazem parte do sistema atual (monocromático: ink +
sage como único acento + terracota só pra erro/exclusão, nunca decorativo).
Corrigidos, todos para `ink 10%` (hairlines/dividers) ou `ink 65%`/`ink 100%`
(texto), nunca cor:

- Hero (`2173:180` Meta Grid) — hairline removida (separava conteúdo do mesmo
  tema, chrome desnecessário — decisão diferente da limpeza de cor, foi remoção).
- Stats Section (`2173:212`) — stroke `grey/91` → `ink 10%`.
- Metodologia (`2173:378`) — link "Ver a pesquisa completa no Miro" sem
  underline (quebrava WCAG 1.4.1) → underline adicionado.
- Testes (`2173:432`, "Achado principal") — fundo `orange/89 30%` + borda
  `grey/91` → neutro `ink 4%`/`ink 10%`. Bloco depois ficou hidden (redundante
  com o parágrafo acima, decisão de Matheus).
- Intro das Soluções (`2173:439`) — fundo sólido `orange/89` cobrindo o bloco
  inteiro → removido; bloco depois ficou hidden (CTA grande virou discreto,
  ver seção seguinte).
- Jornada do Usuário (`2227:640`, bloco duplicado com conteúdo
  Escaneamento/Verificação/Saída) — labels "Dor:" em `color/red/60` → `ink
  65%`; hairline acima delas em `color/red/20` → `ink 10%`. Bg dos 3 cards
  (`bg-page-bg`) mantido intocado a pedido de Matheus (mesma cor do fundo,
  proposital).

## Autolayout e timeline do Blueprint Stages (2026-09-14, sessão 2)

`2173:271` "Blueprint Stages" (dentro do Blueprint Crop) tinha `FILL` +
padding assimétrico nas 3 colunas (resquício de "Divider — Vertical" que
Matheus já tinha apagado) — corrigido pra `FIXED` 260px iguais + gap 32px
(mesmo valor do grid de 4 colunas da Metodologia). **Nunca recriar as
divisórias verticais** — foram removidas de propósito.

O "Divider — Horizontal" (linha no topo, y:22 dentro do bloco) é uma
**timeline que passa por trás dos números** "01/02/03" (z-order: divider é o
primeiro filho, fica atrás) — não é bug, é o design pretendido. Já tentei
"corrigir" isso uma vez (adicionando padding-top pra separar) e estava errado
— revertido. Se precisar mexer no espaçamento do divider de novo, **só ajustar
a posição Y dele**, nunca adicionar padding que empurre o conteúdo pra longe —
ele deve continuar cruzando visualmente por trás dos numerais.

## Convenção de placeholder de imagem (2026-09-14, sessão 2)

Matheus decidiu **não seguir o "zero chrome" do Benji ao pé da letra** pros
placeholders de imagem — quer algo com mais "vida" sem virar decoração
colorida. Convenção fechada:

```
fill: ink 4% (rgb 0.961/0.949/0.941, mesma família de cor do resto do sistema)
effect: NOISE (Plugin API), noiseType MONOTONE, noiseSize 1, density 0.5,
        color ink a=0.06 (0.08 pra fotos de contexto, ligeiramente mais forte)
```

Sem cor nova, sem borda, sem sombra — só textura monocromática. Aplicado em
todos os placeholders novos criados nesta sessão (ver lista abaixo). Receita
de código funcional (Plugin API `figma.createFrame()` + `effects`), útil pra
não redescobrir o formato exato do objeto `NoiseEffect` (é sensível — testado
por tentativa e erro, ver histórico se precisar).

## Novos blocos criados (2026-09-14, sessão 2)

A estrutura original já tinha todos os 9 placeholders planejados preenchidos
com material real — as lacunas reais eram duas seções que nunca tiveram
espaço reservado, mais três blocos de enriquecimento (material genuíno que
já existia mas não estava sendo usado — 24 wireframes exportados, só 7 usados
nas Soluções):

1. **Testes** (`2173:413`) — 100% texto antes, zero prova visual numa seção
   que existe pra provar rigor. Adicionadas 2 fotos lado a lado (não
   empilhadas — testado empilhado primeiro, ficava com a Label Column vazia
   por ~800px): "Foto — Rodada 1 (protótipo em papel)" e "Resultado real —
   Tree Testing (Treejack)".
2. **Panorama Competitivo** (`2248:178`) — bloco novo, inserido entre
   Pesquisa e Foto de Campo (dentro do fluxo do `div#case-page`, que é
   auto-layout vertical — inserir com `insertChild` no índice certo, nunca
   mexer manualmente em y). 3 colunas: Carrefour / Extra / Walmart.
**Panorama Competitivo → "Totens no dia a dia" (2026-09-14, sessão 2, reescopo):**
o placeholder inicial (Carrefour/Extra/Walmart) foi um chute meu baseado só
no texto da Pesquisa ("18 conversas, 3 redes de varejo") + a citação real
"No Extra, um funcionário confere..." (Solução 03). Matheus esclareceu que
as fotos reais de campo que ele tem são de **totens fora do segmento de
varejo alimentar**: Cinemark, McDonald's, Cacau Show, Estacionamento, Honest
Market, Renner, Riachuelo, Zara — cross-segmento (cinema, fast-food,
doceria, estacionamento, moda), não 3 concorrentes diretos. Bloco
reconstruído: de 3 colunas pra **grid 4×2** (8 lugares), eyebrow trocado pra
"Totens no dia a dia — observação de campo" (não mais "Panorama Competitivo
— 3 redes visitadas", que não corresponde ao conteúdo real). **A citação "No
Extra..." na Solução 03 e o "3 redes de varejo" na Pesquisa continuam
válidos** — são de uma pesquisa diferente (a que gerou os pain points
citados no texto), não têm relação com essas fotos de totem.

**Reduzido pra layout final (mesma sessão, minutos depois):** Matheus só
quer 4 fotos aparecendo em destaque (não as 8), mas confirmou que visitou
todos os 10 locais da lista de logos (Honest Market, Walmart, Extra,
Carrefour, C&A, Riachuelo, Zara, Renner, Amazon Go, McDonald's). Estrutura
final, em duas partes:
1. **4 fotos em destaque** — grid de 4 colunas, cada uma com badge de logo
   (40×40, `ink 4%` + noise) + label ao lado, foto retrato abaixo (proporção
   ~0.562:1, batendo com as fotos reais de campo dele, 253×450). Labels
   ficaram genéricos ("Local 1-4") de propósito — Matheus vai posicionar
   fotos e logos reais depois, não tentei adivinhar qual foto é de qual
   marca (tinha 6 fotos reais mas só identifiquei McDonald's com certeza).
2. **Tira "10 locais visitados"** — abaixo das 4 fotos, os 10 logos reais em
   swatches pequenos (64×64, mesmo tratamento visual), cada um já com o nome
   certo da marca. Mostra o alcance completo da pesquisa sem precisar de 10
   fotos — só as 4 mais fortes viram destaque.

3. **Onboarding — Filmstrip** (`2252:183`) — 5 telas em sequência (Bem-vindo →
   Primeiro uso → Escaneamento → Pesagem+Pagamento → QR final), inserido logo
   após Design e Prototipação.

   **Atualização (2026-09-15):** cresceu pra 6 telas (Matheus adicionou "6.
   Saindo da loja", `2318:1843`). O container (`2318:1852`, frame manual sem
   auto-layout) sofreu o bug de corrupção de auto-layout ao tentar arrumar —
   reconstruído do zero como `2333:170` via `createAutoLayout` +
   `appendChild` (ver técnica documentada abaixo em "bug recorrente de
   auto-layout"). Resultado: 6 colunas de 195px, gap 24px, x = 0/219/438/657/
   876/1095, sem overlap.

   No mesmo pedido, tentei trocar `scaleMode` das 6 image placeholders de
   `FIT` pra `FILL` achando que resolvia o desalinhamento label↔imagem —
   **Matheus corrigiu: tem que ser `FIT`, pra não cortar as bordas dos
   wireframes**. Revertido pra `FIT` em todas as 6. Trade-off aceito: como o
   container (184px largura) é mais largo que a proporção de tela de celular,
   sobra pillarbox nas laterais da imagem em FIT, e a legenda fica alinhada
   à borda esquerda do container (não à borda visível da imagem) — não é bug,
   é o preço de não cortar conteúdo. Se algum dia quiser as duas coisas
   (sem corte E legenda alinhada à imagem), a solução é colunas de largura
   variável por proporção de cada imagem, não grid uniforme.
4. **Crazy 8's** — Matheus trocou a grade de 6 sketches que eu fiz por 1
   único placeholder (vai fazer bloco de fotos da técnica separadamente).
   Layers renomeadas pra bater: "01 · Crazy 8's" / "02 · Mid-fi" / "03 ·
   High-fi" (o texto visível já tinha sido trocado por Matheus, só as layers
   estavam desatualizadas). Depois disso, **adicionada uma 4ª etapa "04 · UI
   Design"** no fim da galeria (`2173:403`) — as 4 colunas foram encolhidas de
   393px pra 288.5px cada (mesmo gap 24px) pra caber tudo nos 1226px de
   largura sem estourar. Esse 4º placeholder é onde entra o UI Design final
   (Square v2), separado das 3 primeiras etapas do processo real.
4a-i. **Regra confirmada (2026-09-15):** noise effect (ink4%+MONOTONE) é só
   pra placeholders vazios, sem imagem. Fotos reais já coladas **não** levam
   o noise por cima.

4a-ii. **Bug do círculo de censura, arquivo privado** (`2WJo488vVIQUVjSsgspVcb`
   não — esse foi no `srfFKPHCUBOrQ1rHCGXsum`, área solta em x≈-11381,
   y≈6840, fora do fluxo do case): ao rebuildar o clip-frame de recorte
   (técnica de "Foto — recortada (censura)"), o `insertChild` no parent
   errado acabou juntando o frame novo dentro de um GROUP vizinho não
   relacionado ("Group 1" com "image 75", outra foto da mesma área solta).
   Sintoma: círculo de censura sumiu (ficou cortado fora da área visível) e
   o frame encolheu de 787×1052 pra 613×966. Corrigido: extraído o clip
   frame de volta pro nível da page, redimensionado pra bater exatamente
   com o tamanho atual da foto (755×1009), reposicionado em -11381,6840.
   **Lição:** depois de mover um node com `insertChild` numa área com muitos
   grupos soltos de mesmo nome genérico ("Group 1", "image N"), sempre
   conferir com `get_screenshot` no node isolado antes de considerar
   resolvido — os IDs continuam válidos mas a árvore pode ter mudado de
   forma inesperada.

4a-iii. **Bg color padronizado na galeria Design e Prototipação** (`2326:170`):
   o estágio "02 · Papel" (`2318:1886`) tinha uma cor sólida vermelha legada
   (variant.com, rgb ~0.81/0.19/0.19) atrás do fill de imagem — os outros 3
   estágios (Crazy 8's, High-fi, UI Design) só têm o fill de imagem, sem cor
   de fundo. Removida a cor sólida solta pra ficar consistente.

4a. **Crazy 8's — foto escolhida** (2026-09-15): Matheus colocou 3 opções de
   composição lado a lado (`2318:1918` "Section 1", frames `2318:1915/1916/
   1917`, cada uma empilhando 2 fotos: mão desenhando em papel em branco +
   mão desenhando o sketch real). Comparei as 3 — a única diferença real é o
   crop. Escolhida a **Frame 4** (`2318:1917`, imageHash
   `d6ac2eda8fbd1c8139c53553056e53f7b5cbfb60`): mão+lápis+papel bem
   enquadrados no topo, e é a única onde o sketch (grids, anotações) fica
   totalmente legível embaixo — as outras duas cortam a mão ou o conteúdo do
   rascunho. Aplicada no placeholder do estágio Crazy 8's (`2272:172`),
   mantendo FIT + filtro preto-e-branco (`saturation: -1`) já usado ali.
   Frame renomeado de "Image Placeholder — UI Design (v2)" (nome antigo,
   desatualizado) pra "Image Placeholder — Crazy 8's".

5a-i. **Banner de wireframes v1 — REFEITO (2026-09-15):** a colagem de 7
   cards (App/Totem por estágio, ver 5a abaixo) foi excluída — Matheus notou
   que banners full-bleed de referência (ex: "image 74" no moodboard,
   billysweeney-style) mostram **um protótipo conectado só**, com as setas
   de fluxo do Figma visíveis, não uma grade de telas cortadas. Print manual
   feito por Matheus direto do arquivo privado (`2WJo488vVIQUVjSsgspVcb`,
   páginas "Protótipo App" `12036:13289` e "Protótipo Totem" `12036:11345`,
   excluindo o cluster de biblioteca de componentes) e colados como
   `proto-app`/`proto-totem` (1920×799 cada). Reconstruído como **2 banners
   full-bleed separados** (`2362:884` App, `2362:885` Totem), inseridos logo
   depois de "Design e Prototipação" e antes de "Onboarding — Filmstrip" —
   mostra a arquitetura completa do protótipo testável antes de entrar no
   detalhe (filmstrip) e nos testes. Lição: pra prints "um protótipo só" tipo
   referência, **sempre pedir export/print manual do Figma nativo** (as
   setas de conexão de prototype são um overlay do editor, não aparecem em
   export via API/MCP) em vez de tentar montar a partir de fills isolados.

5a. **Banner de wireframes v1 (OBSOLETO — ver 5a-i)** (`2345:190`, era `2173:263` "div.w-full") —
   estava vazio (rect sem fill), sobrando entre "Totens no dia a dia" e
   "Blueprint Crop". Decisão (2026-09-15): Matheus tem os processos nativos
   Figma do case privado (`2WJo488vVIQUVjSsgspVcb`) — low/mid/hi-fi +
   protótipo, separados por dispositivo (App e Totem). Como esse conteúdo é
   material de síntese/processo (não pesquisa de campo), **movido pra depois
   de "Jobs To Be Done"**, virando a ponte de transição pra "Design e
   Prototipação". Reconstruído como colagem em 2 trilhos paralelos (App:
   Low-fi Teste 01 → Hi-fi Teste 02 → Protótipo; Totem: Mid-fi Teste 01 →
   Mid-fi Teste 02 → Hi-fi Teste 03 → Protótipo), full-bleed 1920px, cada
   card com label (Instrument Sans 12px, ink 65%) + placeholder ink4%+noise
   no padrão do site. DS Square v2 e wireframes v2 (polidos) **não** entram
   aqui — ficam reservados pro estágio "UI Design" da galeria Design e
   Prototipação (`2272:170`), que já existe como template. Falta: Matheus
   colar os prints reais dos 7 slots.

5. **Sequência do Sistema** (`2253:174`, renomeado de "Mais Telas do
   Sistema") — reconstruído duas vezes: primeiro como grid uniforme 6×3 (18
   slots), depois **reconstruído de novo** como sequência de 3 estágios de
   fluxo (Chegada e Escaneamento / Pesagem e Verificação / Pagamento e Saída),
   cada um com 1 foto de contexto de uso maior (totem na loja, scan com
   celular, fila de saída) + 5 wireframes menores — inspirado nas colagens do
   moodboard (billysweeney.com, image 9/12/32, Group 1), não mais grid solto.

**`div#case-page` é auto-layout vertical com itemSpacing 0** — sempre que um
bloco cresce/encolhe, tudo abaixo recalcula sozinho automaticamente. Nunca
fazer shift manual de y em blocos irmãos (já tentei uma vez sem necessidade).

## Moodboard organizado (`2247:679`, página separada "moodboard - temas")

Cópia duplicada do moodboard original (`2243:409`), organizada em 8 Sections
nomeadas por seção do case: Hero, Blueprint Crop, Testes, Benchmark, Galeria
de Wireframes, Blocos de Solução, Fotografia/Retrato, UI Diversos (não
alinhado). As ~73 imagens restantes foram TODAS distribuídas (por pedido
explícito de Matheus: "independente se está alinhado ou não") usando
heurística de posição X — não é curadoria perfeita, é ponto de partida. Só 2
clusters foram verificados visualmente como genuinamente alinhados ao nosso
sistema (P1 — scooter elétrico; Momentous — suplemento): fundo off-white,
fotografia de produto sem filtro de cor, tipografia preta sem serifa.

## Achado importante: v2 UI vs. wireframes reais do processo (2026-09-14, sessão 2)

Matheus esclareceu que o redesign visual "Square v2" (as telas fotografadas —
garrafa de vinho, "Welcome to Square", "$142.80" etc., já usadas em todos os
Blocos de Solução, Design e Prototipação e Filmstrip) **veio DEPOIS do projeto
concluído** — é um refinamento visual posterior, não as telas reais testadas
com usuário. As telas reais do processo (paper → mid-fi → high-fi) estão no
arquivo `2WJo488vVIQUVjSsgspVcb` (Case---Square-Privado), nodes `12036:13289`
(mid-fi) e `12036:11345` (high-fi) — essas SIM geraram os dados citados no
texto do case ("40% escolheram errado... com ela: zero", "participante P5
recusou o CPF...").

**Isso explica o inglês nas telas** que eu tinha flagado várias vezes sem
saber a causa — são do v2, não do processo original.

**Decisão de Matheus (não seguida a recomendação inicial de separar/mover
v2 pro fim):** manter v2 em destaque (vai usar até no Hero banner), mas
emparelhar com as telas reais do processo em formato **Antes/Depois**,
inspirado em `leahkim.design/case/table-redesign` (toggle — rejeitado, exige
JS/interatividade que o resto do case não tem) e `emnuel.xyz/ivella-*`
(carrossel — rejeitado, só faz sentido com múltiplos pares, temos 1 por
Solução). Padrão fechado: **estático, lado a lado**, sem chrome de card
(mesmo `ink 4%` + noise dos outros placeholders), com uma seta "→" (ink 40%,
Instrument Sans 20px) centralizada entre os dois, sem radius (mantém quina
reta do sistema — diferente do card `rounded-xl` do Emanuel).

Aplicado nas 5 Soluções:
- Soluções 01, 02, 05: tinham só 1 imagem (v2) → viraram Antes(wireframe
  real, placeholder)/Seta/Depois(v2, imagem existente).
- Solução 04: já tinha 2 imagens (Antes/Depois do fluxo de recuperação, ambas
  v2) — só ganhou a seta entre elas, sem wireframe real adicional (evita
  virar comparação de 3 vias).
- **Soluções 02 e 03 (Totem) são diferentes das outras — corrigido em rodada
  posterior.** Solução 02 ("Categoria primeiro, código nunca" / produce ID)
  também é fluxo de Totem, não app — convertida pro mesmo padrão vertical
  depois que Matheus apontou que o device estava errado (estava como
  app/retrato) e colou as wireframes reais.

**Mix final de device nas 5 Soluções: 2 Totem (02, 03) / 3 App (01, 04, 05).**
Isso resolveu, de graça, o problema que motivou a criação do bloco "Sequência
do Sistema"/"Mais Telas do Sistema" (§ mais abaixo) — o diagnóstico real
nunca foi "falta volume de imagem", era "totem quase não aparece". Com a
alternância já corrigida nas próprias Soluções, **o bloco de colagem
(`2253:174`) foi escondido (`visible: false`, não deletado)** — mantê-lo
custaria ~1300px de decoração pra resolver um problema que já não existe.
Reavaliar 04 e 05 pra confirmar se são mesmo App (não verificado ainda). App/mobile é retrato, cabe bem em 2 colunas lado a lado. Totem
  é paisagem (696×392) — colocar lado a lado espreme a imagem numa caixa
  quase quadrada de 321px de largura, distorcendo a proporção real. Corrigido
  pra **pilha vertical**: Antes em cima (largura cheia, 706px, altura
  proporcional 696:392 ≈ 398px), seta "↓" (não "→") centralizada, Depois
  embaixo (mesma largura cheia). **Regra geral: conteúdo retrato → lado a
  lado; conteúdo paisagem/Totem → empilhado com seta pra baixo.** Se aparecer
  mais algum bloco de Totem nas Soluções, aplicar o mesmo padrão vertical de
  cara, não o lado a lado.

**Os textos das telas v2 ficam em inglês por enquanto** (instrução explícita
de Matheus — não traduzir).

## Onde ficam os links secundários (Figma/Miro) — decisão fechada (2026-09-14, sessão 2)

Matheus tinha colado o link do Miro duplicado (2x, texto idêntico) dentro do
Contexto (`2173:210`), além dele já existir na Metodologia e no Footer —
Metadados (campo "ARQUIVOS"). Removidos os 2 do Contexto. **Regra fechada:**
- **Metodologia** — mantém o link do Miro sozinho, contextual (aparece logo
  depois de explicar o processo, é ganho ali).
- **Footer — Metadados** (campo "ARQUIVOS: Figma · Miro") — é o lugar certo
  pra links "vistos com calma", mesma lógica do footer do Benji (contexto
  ambiente pra quem já está investido, não navegação).
- **Contexto** (topo da página) — nunca leva link de referência. Nesse ponto
  da leitura ninguém sabe o que tem no Miro/Figma ainda pra querer ver — é
  cedo demais, quebra a narrativa de abertura.

## Pendente (Figma, herdado de sessões anteriores — não confundir com o
pendente do BUILD EM CÓDIGO, que vive em handoff.md)

- Decisão TOC estático vs. trigger flutuante circular continua em aberto (ver
  seção "Verificação empírica" acima) — não resolver sozinho. **Nota:** o
  TOC real (scroll-spy, colapsar/expandir) já foi implementado em código
  (`src/components/case/TableOfContents.tsx`) com uma versão própria,
  independente dessa pendência específica do Figma estático.
- Telas reais do processo (`12036:11345`) ainda não foram coladas nos
  placeholders "Antes — Wireframe mid-fi" das 5 Soluções — Matheus precisa
  identificar qual tela de `12036:11345` bate com qual Solução antes de colar.
- Depois de aprovado tudo no frame duplicado (`2173:172`), propagar as
  mudanças pra página original (`2030:122`) — ainda não foi feito.
- **Em dash não revisado:** label "Totens no dia a dia — observação de
  campo" (node `2248:179`) tem um travessão — flagado pra Matheus em
  2026-09-16 (regra padrão do projeto é evitar travessão em copy autoral),
  ainda sem resposta. Perguntar de novo antes de escrever esse bloco em
  código.

**Para o estado atual do build em código (Next.js) — o que já está pronto,
o que falta, qual bloco vem a seguir — ver `handoff.md`, seção "Case page:
build em código", não este arquivo.** Este arquivo continua sendo o log de
decisões de design/Figma; o handoff é a fonte de estado de implementação.
