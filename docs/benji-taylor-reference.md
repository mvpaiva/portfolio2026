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

## Pendente

- Aplicar o reposicionamento do "Voltar" (proposto, ver acima).
- Avaliar os blocos restantes (Design e Prototipação já revisado e correto;
  faltam Contexto — já correto — e uma passada final na Intro das Soluções
  e Resultado, ambos já auditados e corretos na rodada anterior).
- Depois de aprovado tudo no frame duplicado, propagar as mudanças pra
  página original (`2030:122`).
- Microinterações reais (seta no hover, transições) são trabalho de código
  — Figma só representa o estado de repouso.
