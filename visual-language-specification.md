# Visual Language Specification — Matheus Vieira Portfolio (Calm UI System)

> Este arquivo substitui `Visual Language Specification.txt`. O `.txt` era um
> log de conversa bruto (exploração + iteração com variant.com); este `.md` é
> a versão limpa e reconciliada — o que efetivamente ficou decidido. Onde o
> log continha decisões conflitantes entre rodadas, a mais recente venceu; o
> `.txt` original permanece na pasta como histórico bruto, não como fonte de
> verdade.
>
> Ler junto com [diretrizes-portfolio.md](diretrizes-portfolio.md) — aquele
> arquivo é o "porquê" (julgamento, filosofia); este é o "o quê" (tokens,
> valores, regras de sistema).

## 0. Estado da decisão do artefato da home (leia antes do resto)

O log de exploração mostrou uma contradição real entre duas fases do
projeto: a filosofia original (foto autoral de um artefato físico — caderno,
mesa — com hotspots reais embutidos nela, inspirada em darn.fish/talhask) foi
**abandonada** numa iteração posterior em favor de algo mais simples.

**Decisão confirmada (2026-09-11): a home usa um retângulo abstrato com 3
pontos, não uma fotografia.** Não há foto pendente para tirar. Onde este
documento ou o `diretrizes-portfolio.md` mencionar "artefato fotografado"
como inspiração conceitual, trate como a origem da ideia (por que os pontos
existem, por que a navegação é espacial) — não como uma implementação
literal com imagem de fundo. `.artifact-scene` é uma composição gráfica
própria do sistema (cor `--stone` ou `--bg`, borda hairline), não um
`background-image`.

## 1. Filosofia geral do produto

Sistema Calm UI para portfólio de product designer júnior. Personalidade de
galeria: paredes neutras, luz precisa, e a convicção de que o trabalho fala
mais alto que a moldura.

**Princípios:**
1. **Restrição como sinal de premium** — todo elemento é ajustado para a
   menor intensidade viável. O posicionamento premium vem do que está
   ausente, não do que está presente.
2. **Tipografia carrega a hierarquia** — cor não é a ferramenta primária de
   hierarquia. Escala tipográfica, peso e troca de família de fonte fazem
   isso. Headlines em Fraunces (serifada variável), todo texto funcional em
   Instrument Sans.
3. **Espaço em branco é conteúdo** — negativo é material ativo, não fundo
   passivo. Seções respiram com 80–160px de padding vertical.
4. **Estrutura invisível** — grids, bordas e containers existem no limiar da
   percepção. Bordas são hairlines a 10% de opacidade.
5. **Disclosure contextual** — informação fica oculta até o usuário
   sinalizar intenção (hover, foco, clique). Nada fica persistentemente
   visível além do necessário para o contexto imediato.

**Tom emocional:** quietamente confiante (sem badges/contadores de prova
social), intelectualmente rigoroso (assimetria editorial, documentação de
processo), calorosamente minimal (cinza quente, não frio clínico), calmo
(baixa entropia visual).

**Posicionamento:** não é um site de marketing — é uma interface de
credenciamento para recrutadores e design leads. Cada escolha de pixel
responde: "isso prova que o designer sabe tomar decisões difíceis de
restrição?"

### Regras de restrição visual
- No máximo uma cor de destaque (Sage) por viewport
- Nunca fundo preto sólido (tinta quase-preta sobre off-white quente)
- Nunca gradientes, nunca sombras em elementos estáticos
- Nunca cantos arredondados maiores que 4px em containers de conteúdo
- Nunca ilustrações/gráficos decorativos além da cena do artefato da home
- Nunca animações de entrada no carregamento da página (chegada calma)

### O que nunca deve acontecer visualmente
- Nunca branco puro `#FFFFFF` ou preto puro `#000000`
- Nunca cor saturada além de Sage
- Nunca peso de fonte "bold" (máximo 600, preferencialmente 400/500)
- Nunca centralizar texto longo (só alinhamento à esquerda)
- Nunca borda mais forte que 1px a 10% de opacidade, exceto em estado
  interativo
- Nunca preencher botões com cor sólida (só texto ou hairline-outline)
- Nunca mais de duas famílias de fonte numa mesma view
- Nunca formas geométricas decorativas, padrões ou texturas
- Nunca caixa-alta em headlines (só utilitário label-caps)
- Nunca mais de 10% de border-radius em qualquer elemento

## 2. Hierarquia visual

Três pilares: **escala tipográfica → agrupamento por espaço em branco →
modulação de opacidade.** Cor é o quarto pilar, o menos usado.

**Camada de display** (Fraunces, itálico, peso 300): 48–84px, line-height
0.9–1.1. Títulos de projeto, declarações de hero, intros de seção, pull
quotes. Nunca usada em corpo de texto, navegação, labels ou descrições.

**Camada funcional** (Instrument Sans, peso 400–500): corpo 13–15px,
line-height 1.5–1.6; labels 10px caixa-alta, tracking 0.1em, peso 500. Usada
em tudo exceto headlines de display.

**Marcador de transição** (Fraunces, itálico, 120px+, 5% opacidade):
marcadores-fantasma como "Descoberta" e "Síntese" flutuando atrás do
conteúdo — não-interativos, puramente atmosféricos.

**Hierarquia de espaço em branco:**
| Valor | Uso |
|---|---|
| 160px | Quebras entre fases temáticas principais |
| 80px | Espaçamento de subseção dentro de uma fase |
| 40px | Separação interna de bloco de conteúdo |
| 16–24px | Agrupamento de elementos relacionados |
| 4–8px | Agrupamento tipográfico apertado (label + valor) |

**Hierarquia de contraste (opacidade da tinta):**
- Conteúdo primário: Ink 100%
- Conteúdo secundário: Ink 60–70%
- Conteúdo terciário/meta: Ink 30–40%
- Conteúdo atmosférico: Ink 5–10%
- Conteúdo de destaque: Sage 100%

**Disclosure progressiva:**
1. **Superfície** — marca, headline, 3 pontos de projeto, 3 links de nav
2. **Hover/foco** — títulos e descrições de projeto emergem dos pontos;
   sublinhados de nav aparecem
3. **Clique** — case study completo sobrepõe o viewport; drawers deslizam
   das bordas; modal de contato escala
4. **Scroll** — pesquisa secundária, personas e metodologia revelados em
   leitura longform
5. Nada do nível 2+ é visível sem intenção do usuário

## 3. Sistema de espaçamento

Grid base 8px (efetivamente 16px para layout macro, 4px para alinhamento
tipográfico micro).

| Token | Valor | Uso |
|---|---|---|
| space-1 | 4px | Gaps tipográficos apertados |
| space-2 | 8px | Label-para-valor, padding interno pequeno |
| space-4 | 16px | Padding interno de componente |
| space-6 | 24px | Padding de card, gaps médios |
| space-8 | 32px | Gutters internos de seção, padding de card |
| space-12 | 48px | Gaps de coluna de grid |
| space-16 | 64px | Espaçamento interno grande |
| space-24 | 96px | Padding de seção |
| space-32 | 128px | Padding de seção principal |
| space-40 | 160px | Espaçamento de hero, quebras temáticas maiores |
| space-64 | 256px | Espaçamento entre fases de case study |

**Gutters de página:** desktop 60–80px · tablet 40px · mobile 24px.

**Largura de conteúdo (canônica — resolve divergência do log):** o brief
original de case page pedia frame 1440px / coluna fixa 966px / margens
237px; a especificação final consolidada usa **max-width 900px para leitura
de case study** e **max-width 1400px para seções padrão**. **Use 900px /
1400px como valores canônicos** — 966px foi um número de rascunho de uma
mensagem isolada, nunca reconciliado com o sistema final e não deve ser
usado.

**Cena do artefato da home:** max-width 1200px, margem mínima de 80px das
bordas do viewport.

**Regras de respiro:**
1. Nunca aproximar duas seções temáticas distintas a menos de 128px
2. Sempre manter ao menos 40px entre um header label-caps e seu conteúdo
3. Imagens precisam de ao menos 24px de separação do texto ao redor
4. Labels laterais fixas (sticky) exigem ao menos 80px de offset horizontal

## 4. Princípios de layout

- **Full-bleed vs. contido:** fundos e elementos atmosféricos vão até a
  borda do viewport; conteúdo contido usa max-width 1400px (seções padrão)
  ou 900px (leitura de case study).
- **Alinhamento:** esquerda é o padrão universal. Grids de case study usam
  12 colunas com desequilíbrio intencional (ex.: label em col-span-3,
  conteúdo em col-span-7 a partir de col-start-5). Centralização só em
  headlines de hero declarativas, grids de métrica, e no modal de contato.
- **Responsivo:**
  - **Desktop (>1024px):** header duplo (marca à esquerda, nav à direita);
    grids assimétricos de 12 colunas; labels laterais sticky visíveis; cena
    do artefato em 16:9.
  - **Tablet (768–1024px):** drawers reduzem para ~480px; grids colapsam
    para 2 colunas; cena do artefato em 16:10. Sem tratamento especial além
    disso.
  - **Mobile (<768px):** header empilha verticalmente — **Matheus Vieira /
    Designer de Produto (itálico) / headline / nav horizontal com
    separador "·"** (headline integrada ao bloco de header, não como bloco
    isolado — ver §11); nunca menu hambúrguer; cena do artefato em 4:5 ou
    3:4; grids de 12 colunas colapsam para 1 coluna; labels laterais somem
    ou vão inline; pontos mantêm hit-area ≥44px mas sem tooltip de texto —
    usam pulso (ver §12).

## 5. Tipografia

**Fraunces** (serifada variável) — peso 300 (light) apenas; optical sizing
9..144 automático; itálico para todo uso de display (Roman raramente
usado). Papel: emocional, editorial, humano — headlines, títulos de
projeto, quotes, marcadores-fantasma. Nunca em corpo de texto, navegação,
botões ou labels.

**Instrument Sans** — pesos 400 (regular) e 500 (medium), 600 apenas se
necessário; papel: funcional, neutro, legível — todo texto de UI, corpo,
labels, navegação, métricas. **Substituiu Inter** em toda a UI funcional
(decisão confirmada no meio do processo de iteração — Fraunces permanece
inalterada).

| Uso | Fonte | Tamanho | Line-height | Peso | Estilo |
|---|---|---|---|---|---|
| Hero headline | Fraunces | 72–84px | 0.9 | 300 | Itálico |
| Section headline | Fraunces | 32–48px | 1.0–1.2 | 300 | Itálico |
| Project title | Fraunces | 24–28px | 1.2 | 300 | Itálico |
| Stat number | Fraunces | 64px | 1.0 | 300 | Roman (não-itálico) |
| Ghost marker | Fraunces | 120px | 1.0 | 300 | Normal, 5% opacidade |
| Body large | Instrument | 18–24px | 1.5 | 400 | Normal |
| Body | Instrument | 13–15px | 1.5–1.6 | 400 | Normal |
| Small | Instrument | 12px | 1.4 | 400 | Normal |
| Label/caps | Instrument | 10px | 1.0 | 500 | Uppercase, tracking 0.1em |
| Meta | Instrument | 10–11px | 1.0 | 500 | Uppercase, tracking 0.08–0.1em |

**Capitalização:** uppercase só para label-caps (10px, tracking 0.1em) —
nunca em headline ou corpo. Sentence case em todo o resto; title case não é
usado.

**Legibilidade:** linha máxima ~65 caracteres; corpo mínimo 12px (10px só
para labels); contraste Ink sobre Page-bg ~14:1.

**Regra de idioma:** todo o copy é pt-BR, incluindo suporte pleno a
diacríticos (ã á à â é ê í ó ô õ ú ç). Texto em português é normalmente mais
longo que o equivalente em inglês — nunca desenhar um layout no comprimento
do texto em inglês e assumir que o pt-BR vai caber igual.

## 6. Cor

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F5F2F0` | Fundo global, off-white quente. Nunca branco puro. |
| `--ink` | `#1A1A1A` | Texto primário, bordas fortes. Nunca preto puro. |
| `--stone` | `#E6E2DF` | Placeholders de imagem, fundos de mockup de device. Nunca usado para texto (contraste insuficiente). |
| `--sage` | `#A5B8B1` | Única cor de destaque do sistema inteiro. |
| `--border` | `rgba(26,26,26,0.1)` | Hairline universal. |

**Sage:** usado para prefixo de label de seção, borda de pull quote, ring de
hover em pontos, estados de sucesso. Teto de uso: no máximo 10% da área do
viewport. Nunca em preenchimentos grandes, botões ou fundos (exceto overlay
a ~20% de opacidade).

**Azul real de produto (`#006AFF`):** existe apenas dentro de telas de
produto clonadas de verdade (screenshots do Square) — nunca no chrome do
site/case.

**Filosofia de cinza:** o sistema é efetivamente monocromático + um
acento. Hierarquia via opacidade da Ink, não múltiplos tons de cinza em
hex.

**Onde cor NUNCA deve ser usada:** botões primários, fundos grandes,
navegação, elementos decorativos, ênfase em corpo de texto (use peso ou
opacidade).

## 7. Corner radius

| Token | Valor | Uso |
|---|---|---|
| radius-0 | 0px | Padrão para todo container de conteúdo, cards, seções, imagens |
| radius-sm | 2px | Frames de mockup de device totem/kiosk |
| radius-md | 4px | Elementos de UI pequenos |
| radius-lg | 6px | Frames de mockup de device app/mobile |
| radius-full | 9999px | Só elementos circulares: pontos, avatares |

Nunca misturar cantos retos e arredondados dentro do mesmo grupo de
componente. Cards nunca têm cantos arredondados.

## 8. Elevação

Sem drop shadows como regra geral. Profundidade vem de: transform de
escala, blur de overlay, camadas de opacidade, deslocamento espacial
(drawers deslizando, modais escalando).

**Única exceção:** modal de contato usa `box-shadow: 0 40px 80px
rgba(0,0,0,0.1)` — grande, difusa, baixa opacidade, para sinalizar que é
uma interrupção temporária.

**Overlays:** usam a própria cor de fundo da página (`--bg`) a 92–98% de
opacidade com `backdrop-filter: blur(10px)` — nunca overlay escuro/preto.

## 9. Bordas e divisores

Linguagem única: 1px sólido a baixa opacidade.
- Hairline: `rgba(26,26,26,0.1)` — padrão universal
- Forte: `var(--ink)` sólido — cards de estatística, ênfase
- Destaque: `var(--sage)` — borda esquerda de pull quote (2px)

Linhas horizontais são preferidas a verticais. Estrutura invisível
(espaço em branco) é preferida a linhas — linhas só quando o conteúdo é
denso (tabelas, grids de persona) ou sequencial (roadmap, steps).

## 10. Iconografia

Sem biblioteca de ícones. Só: caracteres Unicode (→ ← ↑ / ✕) e SVG inline
para casos pontuais (ícone de índice de seção — ver §14). Ícones herdam o
peso tipográfico do texto ao redor; sem preenchimento, sem cor própria
(herdam a cor do texto corrente).

**Nunca usar ícone de hambúrguer** — nem para nav do site, nem para índice
de seção de uma case page (hambúrguer sugere "abrir menu do site inteiro",
não "ver o índice desta página"). O ícone de índice de seção usa linhas
horizontais de largura decrescente (padrão "outline" tipo Notion/Medium),
não o símbolo "§" (testado e rejeitado por falta de reconhecimento
universal — ver [diretrizes-portfolio.md](diretrizes-portfolio.md)).

## 11. Home — estrutura confirmada

> Ver §0 para o estado da decisão sobre o artefato ser uma foto ou não
> (resposta: não é foto — retângulo abstrato com pontos).

**Header:** duas colunas no desktop/tablet (marca+headline à esquerda, nav
à direita). No mobile, empilha verticalmente dentro do mesmo bloco: nome →
cargo (itálico) → headline → nav horizontal — a headline nunca fica
solta como bloco separado nem flutua sobre o artefato; ela mora dentro do
header em todos os breakpoints. Isso foi testado e ajustado três vezes
antes de fechar (headline abaixo do header colidia com o artefato; headline
acima do artefato como bloco próprio comia espaço do artefato).

**Nav:** rótulos são **"Projetos", "Sobre", "Contato"** — não "Index /
Context / Contact" nem "Índice / Contexto" (testado e trocado: recrutadores
escaneando rápido não reconheciam os rótulos poéticos).

**3 pontos (hotspots), disposição em triângulo:**
- Ponto esquerdo → **Projetos**: abre drawer da direita listando os cases
  (lista tipográfica — número, nome em Fraunces itálico, ano, uma linha de
  resultado factual, tags de tecnologia em caixa-alta; sem cards, sem
  thumbnails, para preservar o minimalismo).
- Ponto central → **Sobre**: abre drawer da esquerda (~520px desktop, 100%
  mobile), com scroll, bio completa.
- Ponto direita → **Contato**: modal compacto (~360px desktop, 90%
  mobile), sem scroll — e-mail, LinkedIn, CV, linha de disponibilidade.

Todos os overlays: fundo `--bg` translúcido (85–98%) + blur, nunca overlay
escuro; fecham com clique fora ou Esc.

**Comportamento do ponto:** dot visível de 8px dentro de uma hit-area
circular invisível de 44px (nunca aumentar o dot visível para resolver
problema de toque — só a hit-area). Hover escala o dot para ~1.6–1.8×, um
ring sage de 1px expande e dissolve, tooltip (título + 1 linha) desliza via
translateX + opacidade. `:focus-visible` espelha o hover para navegação por
teclado. **Mobile não mostra tooltip de texto** — em vez disso, os pontos
têm um pulso suave (escala/opacidade "respirando" a cada ~2.5–3s) como
affordance de descoberta.

**Rejeitado explicitamente:** preview de imagem/vídeo em hover na lista de
projetos (quebra o contrato de "artefato sempre visível, transição só por
clique deliberado").

**Linha de posicionamento (copy real, home):** "Product designer júnior em
interação e IA. Procurando vaga full-time em São Paulo." — cor `#6b6b6b`
sólido, 11px (ajustada de uma opacidade inicial de 0.45 sobre Ink por ser
"perigosamente no limite" de contraste).

## 12. Transição home ↔ case (confirmada)

- **Home recua:** `scale(0.96)` + `blur(2px)`.
- **Case entra:** fade-in central, `scale(0.98 → 1)`, opacidade `0 → 1`.
- Sensação-alvo: "mergulhar no projeto", não "sair do site e carregar outra
  página".
- **Botão de voltar:** literalmente **"← Voltar"** (não "← Matheus Vieira",
  não breadcrumb genérico) — Fraunces itálico 14px, **fixo/sticky no topo
  da case page durante todo o scroll** (não só no final da página — isso foi
  um bug corrigido explicitamente: o link de voltar só aparecer no fim do
  scroll longo foi considerado insuficiente). `position: fixed; z-index:
  1100`; conteúdo recebe `padding-top: 12rem` para não colidir.
- **View Transitions API:** preparada via `<meta name="view-transition"
  content="same-origin">` no `<head>`; a arquitetura real de duas rotas
  (`/` e `/case/[slug]`) com transição nativa é trabalho de implementação
  em Next.js — não foi simulada em protótipo estático e continua como
  tarefa de build em aberto.

## 13. Sistema de blocos da case page (canônico — 9 blocos)

Uma iteração anterior implementou só 5 blocos parcialmente; a lista abaixo é
a versão corrigida e reconfirmada. **Regra geral: desenhar o sistema de
blocos reutilizável, não uma página fixa do Square** — cada bloco é um
componente com variantes de tamanho de conteúdo (precisa aguentar um case
futuro com metade do conteúdo do Square).

1. **Hero do case** — eyebrow, headline, subhead, metadados (papel,
   duração, ferramentas), resultado principal em destaque.
2. **Bloco de evidência/números** — métricas de pesquisa reais (ver §15
   para o que é real vs. exemplo).
3. **Bloco de contexto** — problema mapeado como service blueprint
   (estacionamento → corredor → checkout → saída).
4. **Bloco de research** — fotos de campo reais, metodologia (double
   diamond), lista numerada de pain points, personas reais.
5. **Bloco de benchmark/competitive** — comparação com concorrentes reais
   por critério.
6. **Bloco de evolução** — a mesma tela em fidelidades diferentes (papel →
   hi-fi → final).
7. **Bloco de solução** (repetível ×N) — nome, pain point que resolve, tag
   de dispositivo real (app/totem), telas reais.
8. **Bloco de impacto/next steps.**
9. **Footer do case** — voltar para home, próximo case.

**Modelo híbrido imagem/texto:** imagem grande faz o trabalho visual
(wireframes, telas, diagramas, fotos reais); texto sempre HTML real por
cima ou ao lado — nunca embutido no pixel da imagem (motivo: texto em
imagem não é selecionável, não é lido por leitor de tela, não é indexado, e
em mobile vira pinch-zoom).

**Tag de dispositivo (app vs. totem), puramente tipográfica, sem ícone
skeuomórfico:**
- App: container max-width 280px, cantos 6px, caption acima em sage 10px
  caps: **"MOBILE — 393 × 852"**.
- Totem: container full-width, cantos 2px, escala 16:9 implícita, caption:
  **"TOTEM — 1920 × 1080"**.
- Split: app 30% / totem 70% com hairline divisor, ou caption combinada
  "APP • TOTEM" se um único mockup cobre ambos.
- **Nunca inventar um rótulo de público/dispositivo que não existe de
  fato no case** — um rótulo "Operador" foi removido explicitamente por não
  haver tela real voltada ao funcionário no projeto Square (a verificação
  de idade é uma opção iniciada pelo próprio cliente, não uma interface de
  operador).

**Camada secundária (pesquisa completa):** metodologia completa, dados de
survey, notas de campo, personas completas com foto, framework JTBD,
iterações de sketch, plano de teste completo, roadmap — tudo isso vive em
**uma única página secundária consolidada**, não em 7 pontos de expansão
espalhados. Acesso via um único link: **"Ver o processo de pesquisa
completo"**, com retorno via "← Voltar para [nome do case]".

**Marcos de seção (ghost markers):** palavras em português no tom do site —
**"Descoberta", "Síntese", "Design"** — não numerais romanos com títulos
acadêmicos em inglês ("I. O Desafio").

**Índice de seção (affordance):** ícone SVG de linhas horizontais de
largura decrescente, fixo no canto inferior esquerdo; hover/tap revela os
títulos das seções. Ver §10 para o porquê de não ser "§" nem hambúrguer.

## 14. Case study real — Square (fatos confirmados vs. exemplo)

**Fatos reais do projeto** (não fabricar, não alterar):
- Referência publicada: `mvpaiva.com/square`
- Eyebrow: **"SELF-CHECKOUT REDESIGN · SQUARE"**
- Headline: **"Skip the checkout line."** / pt-BR: "Pulando a fila do
  caixa."
- Subhead: "A 6-month self-checkout redesign for Square Register and a
  companion app — from the parking lot to the exit gate. One produce-ID fix
  alone took the error rate from 40% to 0%."
- Metadados: Product Designer (solo) · Fev–Jun 2026 · Figma · Miro ·
  Treejack · Maze
- Evidência principal: **40% → 0%**
- Escala real do conteúdo: ~8.000 palavras, 15 seções, 18 entrevistas, 247
  respostas de survey, personas reais, JTBD, card sorting, tree testing, 5
  blocos de solução, next steps.
- Dispositivos reais: Square App (mobile, 393×852) e Square Register
  Totem/Kiosk (1920×1080).
- A pasta `docs squareup/` (PRD.md + research/01 a 04), que continha os
  dados reais de pesquisa, foi removida deste repositório (2026-09-11).
  Qualquer número abaixo marcado como "não confirmado" precisa ser checado
  diretamente com Matheus ou contra `mvpaiva.com/square` antes de virar
  copy final — não há mais fonte local para conferir.

**Números/exemplos que apareceram durante a exploração mas NÃO são
confirmados como reais — verificar contra `docs squareup/` antes de usar
como copy final:**
- "12h de campo", "23 pontos de atrito" — não corroborados em outro lugar.
- Lista de concorrentes do benchmark: apareceu como "Zara, Amazon Go,
  Carrefour, Extra, Walmart" numa mensagem e como "Clover, Shopify,
  Toshiba" em outra — inconsistente, nenhuma confirmada como final.
- "73% abandonavam o fluxo no terceiro toque" — **explicitamente sinalizado
  no próprio log como possível invenção da ferramenta de IA**, precisa ser
  confirmado contra dados reais de survey/entrevista antes de virar copy.
- "+24% Revenue/Hour", "-65%, 12s, 89%" — apareceram só em mockups de
  exploração, prováveis placeholders de preenchimento de template.

**Regra permanente:** nunca fabricar métricas, clientes, entrevistas,
citações, participantes, resultados, prêmios, depoimentos, links
profissionais ou URLs. Quando faltar conteúdo real, desenhar o sistema para
acomodar a ausência (tipografia + espaço em branco), não manufaturar
riqueza visual.

**Bio real (Sobre), copy confirmado:**
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

### Sobre os cases "Essavie" e "Fireflies.ai"
Durante a exploração, dois cases fictícios (Essavie — e-commerce; e
Fireflies.ai — produtividade/IA) foram usados para testar se o sistema de
blocos aguenta 3 projetos com quantidades de conteúdo diferentes. **São
explicitamente fictícios**, com copy em tom real mas números inventados
(ex.: "+32%", "4.2h → 12min"). Só devem virar cases publicados de verdade
se e quando Matheus tiver projetos reais para preencher esses slots — até
lá, servem apenas como teste de estresse do sistema de blocos, não como
conteúdo a publicar.

## 15. Interações e motion

**Easing canônico:** `cubic-bezier(0.2, 0, 0.2, 1)` — usado em drawers,
modais, overlays, transição de case. Cria desaceleração suave, nunca
"estala" ou tem bounce.

**Durações:** micro-interações (hover, sublinhado, pulso do dot) 0.3s;
transições de componente (drawer, modal, tooltip) 0.4–0.6s; transição de
página (overlay de case) 0.6s; motion atmosférico (ghost markers, scroll
reveal) 0.6–1.0s.

**Hover de link de texto:** opacidade 100%→50%, ou sublinhado via
`transform: scaleX(0→1)`.

**Lista de projetos:** item em hover fica 100%, irmãos caem para 40%
(group-hover).

**Explicitamente proibido** (regra do brief original, mantida):
- WebGL, Canvas, Three.js, motores de física, cursor customizado, drag,
  parallax, efeitos pesados de GPU, flip 3D, transições cinematográficas
  elaboradas.
- Easing bounce/elástico/spring, zooms dramáticos, efeitos que seguem o
  cursor, movimento ambiente constante, entradas com stagger, slide-up em
  scroll reveal (conteúdo aparece com fade no lugar, não sobe).
- TOC lateral pesado / barra de progresso onipresente / coreografia de
  "award site".

**Nota sobre parallax:** uma versão explorou um parallax sutil de 8px no
artefato seguindo o mouse — tecnicamente em tensão com a proibição acima.
Não foi reconciliado no log. **Tratar a proibição de parallax como a regra
vigente**; se uma micro-interação futura flertar com isso, aplicar o teste
do diretrizes-portfolio.md: "se só existe para parecer legal, corta".

## 16. Acessibilidade

- Todo hotspot é um link real, focável por teclado, com label acessível —
  nunca depende só de descoberta dentro de uma imagem.
- `:focus-visible` obrigatório em todo elemento que funciona como link,
  espelhando o hover: `outline: 1px solid var(--sage); outline-offset:
  4px`, aplicado só para navegação por teclado (não para clique de mouse).
- Touch target mínimo 44×44px em todo elemento interativo — dots mantêm
  8px visíveis com hit-area invisível de 44px ao redor.
- Esc fecha drawers, modais e overlays.
- `prefers-reduced-motion` é um requisito do brief original — **nunca
  confirmado como implementado/testado no log**; tratar como pendente até
  verificar no código.
- Contraste mínimo AA em todo texto legível; a tagline factual e o
  timestamp do rodapé foram corrigidos no meio do processo por estarem
  "perigosamente no limite" de contraste (ver §11).
- Navegação crítica (Projetos/Sobre/Contato) sempre existe em forma
  acessível e visível como texto nativo — nunca depende só de descoberta
  dentro do artefato, porque toque não tem hover e nem todo visitante
  explora a composição.

## 17. Componentes — regras universais

- Todo componente senta em container de 0px de radius, exceto família
  "device" (mockups, 2–6px) ou "UI" circular (dots, 9999px).
- Bordas hairline (1px, 10% opacidade) exceto stat cards/ênfase (1px sólido
  Ink).
- Padding interno generoso: mínimo 24px, tipicamente 32–40px.
- Sem preenchimento sólido exceto Stone (placeholders de device) ou Ink
  (raras seções dramáticas de inversão).

**Botões:** só texto (link simples com sublinhado animado, ou "texto +
seta" como "← Voltar" / "Voltar ao início"). Sem preenchimento sólido, sem
sombra, sem all-caps em botões de frase longa (label-caps só para labels
curtos).

**Cards:** nunca arredondados, nunca com sombra, nunca com fundo colorido
(Stone ou transparente). Stat card é o único com borda forte (1px sólido
Ink).

**Tabelas:** sem zebra striping, sem bordas verticais, header em
label-caps a 40% de opacidade.

**Listas:** sem bullets padrão do navegador; lista de projetos usa
separador hairline entre itens; lista de insight usa prefixo "/" em sage.

**Drawers/modais:** fundo `--bg` translúcido com blur — nunca overlay
escuro; nunca cantos arredondados; conteúdo com padding-top suficiente para
não colidir com o header fixo.

> **Nota sobre "view switcher"/tabs:** uma versão anterior do sistema
> documentou um componente de pill/tabs (fundo Ink, texto invertido) para
> alternar entre variações de uma tela dentro do case. Isso **contradiz** a
> regra explícita, confirmada no log, de que a case page é standalone, sem
> tabs ou páginas embutidas. Provavelmente um resquício de uma comparação
> lado-a-lado entre variantes A/B que nunca virou produto. **Não implementar
> este componente** a menos que uma necessidade real e específica apareça —
> nesse caso, decidir conscientemente, não por herança do log.

## 18. Dos and Don'ts (resumo rápido)

**Fazer:** Fraunces itálico em todo display · Instrument Sans em todo
funcional · label-caps para labels/nav/meta · `#F5F2F0` de fundo, nunca
branco puro · `#1A1A1A` de texto, nunca preto puro · opacidade da Ink para
hierarquia · Sage como único acento, com moderação · bordas hairline 1px a
10% · 0px radius em conteúdo editorial · espaço em branco generoso (mínimo
80px entre seções) · grids assimétricos de 12 colunas em case study ·
alinhamento à esquerda por padrão · `cubic-bezier(0.2, 0, 0.2, 1)` em
transições principais · scale/opacidade para hover, não cor · touch targets
de 44px mínimo.

**Não fazer:** branco/preto puro · mais de 2 famílias de fonte por view ·
peso bold (700+) · caixa-alta em headline/corpo · centralizar texto longo ·
fundo colorido em card/seção · drop shadow em card/botão/container ·
gradiente · radius > 4px em conteúdo · ilustração/ícone decorativo · cor
saturada além de sage · animação bounce/elástica · skeleton screens · zebra
striping · bullet/numeração padrão do navegador · hambúrguer · mais de 10%
de sage no viewport · parallax ou animação guiada por scroll · movimento
ambiente flutuante · entrada com stagger · overlay escuro em modal · frame
de device realista (bezel de iPhone/MacBook) · badge de prova social.

---

*Histórico bruto da exploração que gerou este documento:
`Visual Language Specification.txt` (mantido na raiz do projeto como
registro, não como fonte de verdade — em caso de conflito, este `.md`
vence).*
