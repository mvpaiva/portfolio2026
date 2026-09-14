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
  - **Field Exploration + Problemas + Jornada — pronto, agora 3 seções
    top-level separadas** (Matheus puxou pra fora do wrapper full-bleed
    único que eu tinha feito; `2030:177` não existe mais):
    1. **Banner (`2067:652`)** — foto de campo, placeholder. Sem padding
       próprio (0/0) — banner full-bleed puro segue o mesmo padrão do
       banner do Hero (`2030:323`): o espaço vem das seções vizinhas, não
       de padding interno.
    2. **Blueprint Crop (`2089:150`)** — label "RECORTE DO SERVICE
       BLUEPRINT" → **placeholder de imagem** (`2092:150`, 1290×520,
       cor stone — Matheus vai colar o print real do blueprint dele, que
       o mentor elogiou; **não consigo colar imagem programaticamente**,
       API do plugin não suporta `createImageAsync`) → 3 cards de estágio
       (Escaneamento/Verificação/Saída, reaproveitando a tira que já
       existia pro bloco antigo "Jornada do Usuário", repopulada com
       dores reais — a seção "Jornada" separada foi removida, absorvida
       aqui). Padding normalizado pro padrão 32/32/128/128.
    3. **Field Notes (`2030:181`)** — reconstruído em 2026-09-14: era uma
       pilha de texto flush-left cansativa (label + parágrafo + subhead +
       lista numerada de 7 itens). Agora segue `Label Column > Label
       Stack + Content Column`: label 2 linhas ("OBSERVAÇÃO DE CAMPO" +
       "O que a exploração revelou?"), 1 parágrafo curto fundindo a
       observação de campo com o achado-chave, e os 7 pontos de fricção
       viraram **chips** (`layoutWrap: WRAP`, borda hairline, sem
       numeral/citação) em vez de lista numerada. Padding normalizado pro
       padrão 32/32/128/128.
    **Correções de cor feitas nessa leva:** labels "Pain:"/divisória
    acima deles estavam em terracota/salmão (herdados do template antigo
    do variant.com, cor reservada só pra erro/destrutivo) — trocados pra
    ink 65% (texto) e ink 10% (hairline).
  - **Jobs To Be Done / Arquétipos (`2067:578`) — redesenhado em
    2026-09-14, JTBD em destaque.** Avaliação de necessidade do bloco
    (pedida pelo Matheus): mantido — cobre "quem" é afetado de formas
    diferentes (medo de errar vs. velocidade vs. clareza), informação que
    nem os pain points nem a jornada cobrem, e vira a justificativa de
    público pros blocos de Solução mais à frente. **Mas a hierarquia foi
    invertida:** feedback do Matheus é que JTBD é o que recrutadores/PMs
    realmente procuram (é prática de PRD, não só de design), enquanto
    "poucas pessoas se importam com persona". Trocado o grid de 3 cards
    (Nome → Perfil → Blockquote → Tags) por uma **lista única unificada**:
    eyebrow virou `JOBS TO BE DONE` (keyword literal pro ATS), cada
    entrada é a frase JTBD em destaque (20px) seguida de 1 linha pequena
    de atribuição + citação ("Xênia, 54–62 · baixa familiaridade —
    'Quero fazer compras rápido...'"). Persona deixou de ser o
    protagonista visual; JTBD é.
  - **✅ Decisão revertida (2026-09-14): Metodologia (Double Diamond)
    volta a ser bloco próprio, agora posicionado logo após a Pesquisa/
    Field Exploration (`2102:151`) — não mais depois do JTBD.** Matheus:
    seguir a ordem natural do processo de UX (mostrar o "como" antes de
    entrar nos detalhes de cada fase). Ordem final: Pesquisa + Field
    Exploration → **Metodologia** → JTBD/Arquétipos → Design e
    Prototipação → (Testes, Soluções, Resultados). A decisão
    anterior (distribuir como tags dentro de cada fase) foi trocada —
    Matheus: é esse bloco que mostra pro recrutador/designer que ele
    conhece e aplicou as técnicas de UX de verdade, então merece
    destaque próprio, não fragmentado. Extraído do frame solto `2030:415`
    (que guardava o conteúdo desde a decisão anterior) e reconstruído
    como seção padrão: label 2 linhas ("METODOLOGIA" + "Como o processo
    foi conduzido?") + grid de 4 fases (Descobrir/Definir/Desenvolver/
    Entregar, hairlines, numeral sage) já reaproveitado tal qual — já era
    escaneável, não precisou de redesign. **Adicionado:** link "→ Ver a
    pesquisa completa no Miro (6 meses de projeto)" no fim do bloco,
    apontando pro board real
    (`miro.com/app/board/uXjVHJ5Co14=`) — hyperlink real aplicado no
    texto via API do Figma (`node.hyperlink`).
  - **✅ Design e Prototipação (`2030:213`) — já existia com conteúdo
    (fictício) do variant.com, corrigido em 2026-09-14.** Label + legenda
    curta (col-span-4) + 3 placeholders de imagem lado a lado (Sketch →
    Wireframe → Prototype, col-span-8). **Decisão de manter o padrão
    "quebrado":** esse bloco é image-forward (as imagens são o conteúdo
    principal, o texto é só apoio) — mesma lógica já usada no Blueprint
    Crop. Forçar o label de 2 linhas (eyebrow+question) competiria com as
    imagens sem necessidade; mantido label simples de 1 linha,
    deliberadamente diferente do padrão dos blocos de texto. **Corrigido:**
    `layoutMode: GRID` (o modo redundante que já eliminamos em outros
    blocos) → `HORIZONTAL` real; frame preso em `maxWidth: 1280` (por
    isso o resize pro padrão 1290 não aplicava) → removido; label column
    440px, content column FILL com 32px de gutter real entre as 3
    imagens; divisória de topo adicionada (é um assunto novo depois do
    JTBD). Conteúdo (texto e imagens) ainda é placeholder — cabe revisão
    de copy depois. **Label alinhado ao bottom** da row (mesma altura da
    base das imagens) e documentado como candidato a `position: sticky`
    no código (ver visual-language-specification.md §13.2). **Tipografia
    corrigida (2026-09-14)** pro padrão do projeto, que tinha ficado nos
    valores soltos do variant.com: label virou label-caps de verdade
    (Instrument Sans Medium 10px, caps, tracking 0.12em — igual ao
    eyebrow da Metodologia) em vez de Regular 13px sentence-case; gap
    entre label e legenda ajustado de 32px (solto) pra 12px (mesmo valor
    usado no par eyebrow+question em todo o resto do case). **Correção
    (2026-09-14):** a legenda tinha ficado no tamanho errado (16px, ink
    65% — estilo de nota de apoio, não de leitura); Matheus pediu a
    tipografia de leitura padrão, igual à referência do Contexto —
    corrigida pra **24px, ink 100%**, batendo exatamente com o `Body` do
    Contexto (`2030:154`). Também removidas quebras de linha manuais
    (`\n`) que tinham sobrado do tamanho antigo e quebravam o texto de
    forma estranha no tamanho novo, e um nó de texto duplicado
    (`Eyebrow — Metodologia`, sobra de uma cópia anterior) que estava
    empilhado por cima do label real. **Revertido de novo (2026-09-14):**
    Matheus confirmou que a leitura de 24px estava errada — esse bloco é
    mesmo diferente dos outros (image-forward, mesma lógica do Blueprint
    Crop), então a legenda voltou pro estilo de nota de apoio (16px, ink
    65%). **Nota:** entre uma correção e outra, a subárvore de
    label+legenda foi resetada sozinha pro conteúdo antigo do variant.com
    (IDs novos, `\n` de volta) — mesmo padrão de instabilidade já visto
    no bloco Pesquisa; causa ainda desconhecida. **✅ Decisão final
    (2026-09-14):** Matheus pediu pra manter o mesmo padrão do
    case-page de referência (`2:546`/`2:549`), só adaptando o essencial —
    conferi os valores originais lá (`2:658` label, `2:660` legenda) e
    restaurei exatamente: label **13px Regular sentence-case** (não
    label-caps, não uppercase) + legenda **14px Regular**, os dois em
    ink 100%, gap de 32px entre eles. Isso resolve a ida-e-volta entre
    label-caps/16px/24px — o padrão certo pra esse bloco específico
    sempre foi o que já estava na referência original, só faltava
    adaptar pro grid 1290/440 (o que já tinha sido feito) em vez de trocar
    a tipografia. **Text styles nomeados aplicados (2026-09-14):**
    descoberta a biblioteca real de estilos do arquivo — existem dois
    conjuntos, `variant.com/*` (soltos, herdados do import, não usar) e
    **`Portfolio/*`** (nosso sistema de verdade: `Portfolio/Label/10
    Medium`, `Portfolio/Body/13/14/18/20/24 Regular`, `Portfolio/Body/13/
    14 Medium`, `Portfolio/Subtitle/15 Italic`, `Portfolio/Display/36/48/
    72 Regular`, `Portfolio/Display/Ghost Marker`). Aplicado
    `Portfolio/Body/13 Regular` no label e `Portfolio/Body/14 Regular` na
    legenda deste bloco (batem exatamente com os valores restaurados da
    referência) — usar `node.setTextStyleIdAsync(id)`, não só copiar os
    valores brutos, daqui pra frente sempre que um estilo `Portfolio/*`
    bater com o texto. Nota: aplicar o style não muda o conteúdo do texto
    em si — o label ainda estava com os caracteres literalmente em caixa
    alta de uma correção anterior; corrigido separadamente pra
    "Design & Prototipação" (sentence-case real, não só `textCase`).
  - **✅ Consistência interna corrigida (2026-09-14):** mesmo sendo um
    bloco deliberadamente diferente dos outros, Matheus notou
    inconsistência real — label (13px) e legenda (14px) quase do mesmo
    tamanho (1px de diferença, sem hierarquia perceptível), e o gap entre
    eles usava os mesmos 32px do gutter entre a coluna de label e a de
    imagens (confundindo "par label+legenda" com "duas colunas
    inteiras"). Corrigido: legenda subiu pra **`Portfolio/Body/18
    Regular`** (18px, cria contraste de verdade com o label de 13px) e o
    gap interno caiu pra **12px** (reserva o 32px só pro gutter real
    entre colunas). **⚠️ Instabilidade recorrente:** o label voltou a
    ficar em caixa alta sozinho outra vez durante essa correção (terceira
    vez que esse nó específico reseta o conteúdo) — corrigido de novo,
    mas a causa raiz continua desconhecida; se persistir, vale investigar
    se há algo no Figma reaplicando um estado antigo nesse nó específico.
    **Correção (2026-09-14):** Matheus esclareceu que a caixa alta do
    label foi ele mesmo que colocou de propósito — não era bug, era eu
    revertendo uma escolha dele sem querer. Restaurado pra
    "DESIGN & PROTOTIPAÇÃO" (caixa alta) e **não mexer mais nisso**.
  - **📋 Imagens reais pendentes (2026-09-14):** os 3 placeholders de
    imagem (`2030:221/223/225`, Sketch/Wireframe/Prototype) receberam
    notas indicando o que colar em cada um, já que a API do plugin não
    suporta upload de imagem: **Sketch** — não temos foto de sketch em
    papel ainda; **Wireframe** — `scan-v1.png`
    (`docs/assets/square-wireframes-raw/mobile/`, já mapeado pro bloco de
    Evolução do wireframe no §14); **Prototype** —
    `scan-fab-bottomsheet.png` (mesma pasta). Matheus precisa colar os
    arquivos reais manualmente (230×320px cada, ou a proporção real da
    imagem).
  - **✅ Testes (`2121:150`) — novo, construído em 2026-09-14, logo após
    Design e Prototipação.** Faixa curta como planejado (não um bloco
    cheio — resultado dos testes já embasa as soluções): label 2 linhas
    ("OS TESTES" + "Como validamos antes de decidir?"), 1 parágrafo
    (5 rodadas — 1 papel + 2 mid-fi + 2 hi-fi — Maze + testes
    presenciais), 3 stats compactos (5 rodadas · 57 telas hi-fi · 16
    flows, os dois últimos já confirmados em sessão anterior como
    candidatos "pra usar em outro lugar") e nota de rodapé (benchmarking
    WCAG AA). Todos os números já confirmados em §01/§14, nenhum dado
    novo inventado. **Reordenação de página feita de novo:** a
    Metodologia tinha voltado a aparecer antes da Pesquisa (mesma
    instabilidade de ordem já documentada) — corrigida junto.
  - **✅ Imagens reais do Design e Prototipação coladas por Matheus,
    ajustadas em 2026-09-14:** removida a nota "colar aqui" que tinha
    sobrado por cima da primeira imagem (Sketch — na real é uma tela de
    onboarding do app, não um sketch em papel físico); as 3 imagens
    estavam pequenas demais pra ler (230×320/305) — aumentadas pra
    **230×480** (`scaleMode: FIT`, sem distorção, só mostra mais da
    imagem).
  - **✅ Bloco "Achado principal" preenchido (2026-09-14):** Matheus
    criou o esqueleto (`2103:183`, dentro/perto de Testes) com label
    "Key Finding" + `[Key finding aqui]`; traduzi o label pro pt-BR
    ("Achado principal") e escrevi a conclusão — só síntese
    metodológica, nenhum número novo inventado: "Cada rodada validava a
    anterior antes de avançar de fidelidade — as 5 soluções finais
    vieram de decisões já testadas, não de suposições."
  - **✅ Soluções — bloco gigante já existia como placeholder
    (`2030:227`, 5 pares texto+imagem no formato `col-span-5`+
    `col-span-7`, exatamente o padrão sticky documentado em §13.2) —
    começei a popular em 2026-09-14, bloco por bloco.
    - **Solução 1 — Escaneamento contínuo (`2030:228`) pronta:** tag,
      headline, citação e corpo trocados pelo conteúdo real do §14
      (removido o parágrafo extra "O problema:" que não existe na
      estrutura real de 4 partes). Corrigido: label de dispositivo
      dizia "TOTEM — 1920×1080" (errado — Solução 1 é app/mobile, não
      totem) → "APP — 320×694" (padrão Mobile do §13.1); citação estava
      cortada (largura hug de 1 linha só, 748px, estourando a coluna de
      488px) → corrigida pra `textAutoResize: HEIGHT` com largura fixa.
      Criado placeholder de imagem 320×694 com nota de qual arquivo
      colar (`scan-v1.png` + `scan-fab-bottomsheet.png`).
    - **Soluções 2–5 ainda não populadas** — mesmo padrão, conteúdo real
      já pronto no §14 (Solução 2 Identificação de produto, 3
      Verificação de idade, 4 Recuperação no portão, 5 Lista de
      compras).
    - **✅ Auto-layout do container das 5 soluções corrigido
      (2026-09-14):** `2030:227` (a seção que envolve as 5) e `2030:228`
      (o grid da Solução 1) estavam em `layoutMode: GRID` (o modo
      redundante) e presos num `maxWidth: 1280` (mesmo bug de antes) —
      convertidos pra `HORIZONTAL` real, seção ajustada pro padrão
      1290/315, coluna de texto fixa em 488px e coluna de imagem em
      `FILL` (absorve os 10px extras, mesma lógica de sempre).
    - **✅ Link de volta pro problema original — virou chip visual
      (2026-09-14):** Matheus notou que o link em texto ("↑ Ver o
      problema na pesquisa") era mais uma linha de prosa num projeto que
      já tem texto demais. Trocado por um **chip com borda** (mesmo
      componente visual dos chips de pain points em Field Notes) —
      hyperlink de nó preservado, lê como elemento de UI clicável, não
      como frase. Documentado em §13.5. **Texto do chip corrigido
      (2026-09-14):** de "↗ Ver problema" (genérico) pra **"01 · Fricção
      no escaneamento"** (mostra qual problema é, não só que existe um
      link). **Tag antiga removida por redundância:** a Tag longa ("APP ·
      01 · Fricção no escaneamento, interrupção do carrinho") duplicava
      exatamente o que o chip já dizia — trocada por um **chip curto
      "APP"** ao lado do chip do problema, os dois na mesma linha.
      Aplicado na Solução 1; replicar nas 2–5.
    - **✅ Wireframes em tamanho real (2026-09-14):** os placeholders de
      imagem estavam em 320×694 (herdado da fase de exploração, antes de
      termos os assets reais) — Matheus perguntou por que não usar
      393×852 (resolução real do iPhone 15 Pro em que os wireframes
      foram desenhados). Mesma proporção, só maior — trocado, já que a
      coluna de imagem (706px em `FILL`) tem espaço de sobra. Corrigido
      na Solução 1; usar 393×852 em todas as próximas.
    - **✅ Design e Prototipação — reestruturado (2026-09-14, v2):** a
      pilha vertical inicial não ficou legível (sem labels de estágio, 3
      telas empilhadas viravam parede sem contexto de progressão).
      **Solução final:** texto no topo em largura total, galeria de
      imagem **abaixo** do texto (não mais ao lado) — libera 1226px de
      largura total em vez dos 754px da coluna de conteúdo, cabendo as 3
      telas em **393×852 nativo lado a lado** com gap real de 24px (quase
      sem sobra: 393×3+24×2=1227≈1226). Cada imagem ganhou um label de
      estágio acima ("01 · Onboarding", "02 · Escaneamento", "03 · Menu
      expandido") pra comunicar a progressão. Label Column virou
      full-width (era 440px fixo); Row virou `VERTICAL` (era
      `HORIZONTAL`).
    - **Tipografia avaliada, considerada correta (2026-09-14):** corpo
      18px/28px (155% de line-height) e citação 20px/28px (140%) já têm
      espaçamento generoso e hierarquia clara (13→36→20→18) — não mexida.
      O ganho real de escaneabilidade veio das duas correções acima
      (imagem maior tira peso visual do texto; chip substitui uma linha
      de prosa por UI), não de trocar tamanhos de fonte.
  - **⚠️ Regressão encontrada (2026-09-14), não mexida a pedido do
    Matheus:** o bloco **Pesquisa** (`2067:261`) voltou a ter o conteúdo
    fictício antigo do variant.com na coluna de conteúdo (parágrafo
    genérico + insights entre colchetes + citação falsa) — só o label
    (Eyebrow + Question) sobreviveu correto. Não foi uma ação desta
    sessão; causa desconhecida (possível cópia/reversão acidental no
    Figma). **Instrução do Matheus: não mexer agora, os textos serão
    resolvidos depois.**
  - **✅ Regra de divisória refinada (2026-09-14):** divisória (borda
    superior 1px, ink 10%) só entre blocos que mudam de **assunto** —
    não em toda fronteira. Blocos que continuam a mesma linha de
    pensamento não levam divisória e têm o padding que os conecta
    reduzido de 128px pra 64px de cada lado. Aplicado: Pesquisa → banner
    → Blueprint Crop → Field Notes (agrupados no frame "Pesquisa + Field
    Exploration (composite)", `2103:156`, sem divisórias internas) e
    JTBD → Metodologia (mesma lógica). Ver
    visual-language-specification.md §13.4.
  - **⚠️ Descoberta importante (2026-09-14):** o frame de topo
    `div#case-page` (`2030:122`) virou **auto-layout vertical**
    (`layoutMode: VERTICAL`) em algum momento — antes era posicionamento
    absoluto. Isso quebrou o cascade-shift manual via `.y` que eu vinha
    usando (escrever `.y` num filho direto desse frame agora é ignorado
    silenciosamente) e bagunçou a ordem visual da página (Metodologia
    aparecia antes da Pesquisa, o footer no meio). Corrigido reordenando
    com `insertChild`. **Daqui pra frente, no nível da página, reordenar
    com `insertChild`, não com `.y`** — cascade-shift via `.y` só
    funciona dentro de blocos que ainda são `layoutMode: NONE`
    internamente.
  - **Design e Prototipação e Testes prontos.** Próximo: Soluções (5
    blocos) e Resultados — ainda não construídos.
  - **📍 Handoff para outro PC (2026-09-14):** Solução 1 pronta e
    **componentizada** (`figma.createComponentFromNode`) como MAIN
    COMPONENT `2137:150` "Solution Block", já que ela será propagada pra
    Soluções 2–5. Estrutura confirmada do componente: `col-span-5` tem
    `[0]` chip/link (ink 100%, Instrument Sans Medium 13px, sublinhado —
    replica exata do padrão real `.panelText a` de
    `src/app/page.module.css`, com hyperlink de nó pro pain point de
    origem em Field Notes), `[1]` headline (`h3.fraunces`, na prática
    Instrument Sans Regular 36px), `[2]` citação (`blockquote.fraunces-
    italic`, 20px, borda sage à esquerda), `[3]` corpo (`p.instrument`,
    18px/28px). `col-span-7` tem a imagem 393×852 (`scaleMode: FIT`).
    Container das 5 soluções: `2030:227`, filho `[0]` já é o componente
    `2137:150`; `[1..4]` (`2030:247/266/286/304`) ainda são os
    placeholders fictícios originais (Assistência Remota, etc.) —
    **nenhuma instância de Solução 2 foi criada ainda** (uma tentativa
    de script falhou por assumir a estrutura interna errada do `col5` e
    o Figma reverteu a mutação sozinho, sem deixar estado parcial —
    confirmado por inspeção depois do erro). Pain points confirmados em
    Field Notes pra linkar: "Seleção de item errado" = texto `2094:160`,
    "Busca de produto solto" = texto `2094:162` (IDs dos frames-pai dos
    chips ainda não confirmados, só assumidos por padrão).
    **Próximo passo real:** `component.createInstance()` a partir de
    `2137:150`, inserir em `2030:227` no índice 1, e só então (com a
    instância já inserida) inspecionar `instance.findAll` /
    `col5.children` pra confirmar tipo/ordem real dos nós antes de
    escrever `characters`/`hyperlink` — não repetir a suposição de que
    a ordem é igual à do frame original pré-componentização. Conteúdo
    real da Solução 2 (§14): tag/link → pain points 02+03, headline
    "Categoria primeiro, código nunca", stat "40% → 0%", citação de
    Xênia (54) sobre a tabela de busca de produto, corpo sobre a tela de
    categoria + balança. Wireframe: `weigh-item.png`. Soluções 3
    (Verificação de idade/Totem), 4 (Recuperação no portão, com DOIS
    wireframes antes/depois) e 5 (Lista de compras) seguem depois, todo
    o conteúdo já em §14.
  - **Instrução permanente do Matheus (2026-09-14): não documentar cada
    micro-decisão — só registrar aqui quando algo estiver realmente
    confirmado/estável.** Entradas futuras devem ser mais enxutas que as
    acima.
  - **✅ Soluções 2–5 construídas (2026-09-14) — as 5 estão prontas.**
    Instâncias do componente `2137:150`, conteúdo real do §14, chip com
    hyperlink pro pain point de origem em cada uma. Solução 3
    (Totem, `2147:174`) e Solução 4 (dois wireframes antes/depois,
    `2147:198`) precisaram de `detachInstance()` — resize direto de
    filhos dentro da instância não colava (revertia sozinho mesmo sem
    erro); detachar resolveu. Solução 4 ganhou um segundo placeholder de
    imagem lado a lado (341×739 cada) com labels "Antes"/"Depois", só
    nessa. Placeholders de imagem (nomes indicam o arquivo real):
    Solução 2 = `weigh-item`, Solução 3 = `age-verification` (696×392,
    Totem), Solução 4 = `exit-fix-exit` + `exit-help`, Solução 5 =
    `scan-with-list`. **Pendente:** Matheus colar as imagens reais
    (API não suporta upload) e revisar visualmente as 5 no Figma.
  - **✅ Impacto/Resultado (bloco 12, `section#resultado` `2030:441`)
    construído (2026-09-14).** Parágrafo fictício antigo (números
    inventados do variant.com) trocado pelos 3 stats reais do §12
    (40%→0%, 85,1%, 5/5), reaproveitando o padrão de `Stat` já usado em
    Testes. **Bug corrigido:** números dos stats vieram clonados com
    `textAutoResize: HEIGHT` (largura presa no valor antigo, tipo "5"),
    quebrando o texto novo letra por letra — corrigido pra
    `WIDTH_AND_HEIGHT`.
  - **✅ Bloco 06 "Intro das Soluções" corrigido de novo (2026-09-14).**
    Primeira tentativa reaproveitou o card genérico do template como um
    "bloco de destaque" (eyebrow + headline 36px + subhead) — Matheus
    apontou que não precisava desse peso visual pra uma intro, e que o
    card original (`Aprofundamento` / "Processo de pesquisa completo")
    parecia ter sido pensado como link pro arquivo. **Reconstruído como
    card de link compacto:** eyebrow "AS SOLUÇÕES" (13px) + 1 linha de
    link real (18px, Instrument Sans Medium, sublinhado, ink 100%) —
    "→ Ver o arquivo completo no Figma — testes, fotos, wireframes e
    mais", `hyperlink` apontando pro arquivo de design real
    (`UOGBjtsvGNFNs8O8qUSxjk`, node `12084:23891` — arquivo de design
    completo, não só o protótipo já linkado em Metodologia/Footer).
    Instância detachada (`2157:198`) pra poder remover o subhead sem
    restrição de override de componente.
  - **⚠️ Lacuna reconhecida, deixada implícita (2026-09-14):** das 7
    dores em Field Notes, só 6 têm solução correspondente — "Pix
    invisível" (07) ficou de fora das 5 Soluções construídas. Matheus
    confirmou: tem wireframes soltos (`review-pay.png`,
    `payment-method.png`) mas nada que resolva isso diretamente ainda;
    decisão consciente de não forçar uma solução ou criar um callout
    pra isso agora.
  - **✅ Bloco fictício `2030:398` ("Evolução do Sistema", conteúdo
    desconectado do case Square, sobra de outro template) removido
    (2026-09-14)** a pedido do Matheus — não correspondia a nenhum dos
    13 blocos do spec.
  - **✅ Confirmado com Matheus (2026-09-14): balanço de device nas 5
    Soluções (1 Totem, 4 App) é fiel à fonte real** (README de
    `docs/assets/square-wireframes-raw/`, fechado em 2026-09-13) — não
    fabricar equilíbrio artificial entre os dois devices.
  - **✅ Card "Intro das Soluções" reconstruído de novo (2026-09-14),
    versão final.** Matheus trouxe de volta manualmente o card genérico
    original do template (`2160:166`, mesmo componente `Aprofundamento`
    de antes) — preferiu a estrutura de 3 níveis (label 13px + "headline"
    36px + subhead 14px) à minha versão comprimida anterior. Ajustado:
    label "AS SOLUÇÕES"; o nível de 36px virou o link real —
    "→ Ver o arquivo completo no Figma" (Instrument Sans Medium,
    sublinhado, ink 100%, `hyperlink` pro arquivo de design real
    `UOGBjtsvGNFNs8O8qUSxjk` node `12084:23891`); o nível de 14px virou
    o descritor de apoio — "Testes, fotos, wireframes e mais" (ink 65%).
  - **✅ Bloco 13 "Próximos Passos" (`2165:172`) construído (2026-09-14).**
    Clonado do bloco JTBD (mesmo padrão Label Column + lista de entries
    título+apoio) em vez de reconstruído do zero — reordenado pra ficar
    depois do Resultado (a inserção inicial errou a ordem, corrigida via
    `insertChild`). Divisória de topo herdada do clone (subject change
    real: resultados → escopo futuro); padding inferior ajustado pra 128
    (fecha a seção antes do footer). Conteúdo: os 4 itens reais do §13,
    sem numeração.
  - **✅ Metadados + links reais do case (`2167:174`) construídos
    (2026-09-14),** inseridos entre Próximos Passos e o footer de
    "Próximo Projeto" existente. Linha de metadados (13px, ink 65%):
    Papel/Data/Ferramentas/Setor do §Footer. Linha de links reais (14px,
    Medium, sublinhado, ink 100%, mesmo padrão WCAG de
    `page.module.css`): protótipo completo no Figma + board de pesquisa
    no Miro. **Não mexido:** o footer de navegação "Próximo Projeto →
    Essavie Ecommerce" que já existia (`2030:391`) — o par bidirecional
    "← Fireflies.ai · Essavie →" do spec não foi implementado porque
    esses cases são fictícios e não têm página real na home atual;
    decisão de produto (mexer nisso ou não) fica pro Matheus, não
    assumida aqui.
  - **Case page: todos os 13 blocos do spec + footer agora existem no
    Figma com conteúdo real.** Pendências que restam: colar as imagens
    reais nos placeholders (API não suporta upload) e revisão visual
    geral.
  - **✅ TOC (sumário navegável) integrado na página (2026-09-14),
    `2174:177` "TOC — Sumário".** Proposta aprovada por Matheus (sem
    "card" de fundo). Baseado numa referência do portfólio do Benji
    Taylor (só a estrutura — progressive disclosure, item ativo em
    destaque — não o visual dele, que já foi descartado nesta sessão por
    não bater com nossa linguagem de cor/hover). Reaproveita as **4 fases
    do Double Diamond já documentadas em Metodologia** como categorias,
    em vez de rótulos novos: Contexto → Descobrir → Definir →
    Desenvolver → Entregar → Soluções → Resultado (7 itens). Item ativo
    só em peso Medium + ink 100%, resto ink 50% — sem cor, mesmo padrão
    de link/ênfase do resto do case. **Posicionamento:** filho de
    `2030:122` com `layoutPositioning: ABSOLUTE` (não participa do
    auto-layout vertical da página), na margem esquerda (x:60, fora da
    coluna de conteúdo que começa em x:315), y centralizado ao lado do
    bloco Testes por enquanto (fase "Entregar" ativa no mock). **Ainda é
    só a estrutura/posição de referência** — o comportamento real
    (`position: sticky`, scroll-spy pra trocar qual item fica ativo) é
    trabalho de código, quando a case page for implementada em Next.js;
    mesmo tratamento dado ao "sticky" da coluna de texto dos blocos de
    Solução (§13.2).
  - **✅ Refinamento "minimal chrome" iniciado (2026-09-14), frame
    duplicado `2173:172` "square - refinamento".** Matheus pediu pra
    propagar os comportamentos e a linguagem ultra minimal chrome da
    home (opacidade em 2 níveis, zero chrome desnecessário,
    microinterações discretas) pro case inteiro, usando uma extração do
    benji.org como referência de padrões — **filtrada contra nosso
    próprio sistema**, não copiada: mantido nosso link sublinhado+peso
    (não cor, WCAG 1.4.1), nossa escala tipográfica maior (não H1
    minúsculo dele), e as imagens reais (não dá pra ir 100% texto como
    ele). Adotado dele: hierarquia de 2 opacidades já usada na home, e a
    ideia de "spotlight hover" em listas (ainda não aplicado, fica pra
    quando mexermos em JTBD/Próximos Passos).
    - **Piloto aprovado: "Solution Block".** Corpo de texto (`p.instrument`)
      passou de ink 100% pra **ink 65%** (mesmo piso WCAG da home) —
      headline+citação ficam no ink 100%, corpo recua como leitura
      secundária. Imagem reduzida de 393×852 nativo pra **341×739**
      (mesma proporção) e alinhada à esquerda (`counterAxisAlignItems:
      MIN`) em vez de centralizada — elimina a margem morta que sobrava
      dos dois lados. Aplicado nas 5 (todas no frame duplicado; a
      original em `2030:227` ainda não foi tocada — propagar depois que
      o resto do refinamento avançar).
    - **🐛 Bug encontrado e corrigido (2026-09-14): Solução 3 (Totem)
      tinha perdido a coluna de imagem inteira** — tanto na página
      original (`2147:174`) quanto na cópia. Sem explicação clara
      (mesmo padrão de instabilidade "conteúdo resetando sozinho" já
      documentado outras vezes nesta sessão). Reconstruída do zero em
      ambos os lugares: placeholder 696×392 (Totem), mesmo texto
      "age-verification" de antes.
    - **Avaliado JTBD e Próximos Passos, sem mudanças (2026-09-14):**
      Matheus pediu refinamento "só se houver necessidade" — os dois já
      tinham a hierarquia de opacidade correta (20px ink 100% / 13px ink
      65%) desde que foram construídos, já são listas curtas (3-4 itens)
      sem chrome. "Spotlight hover" (dimming dos outros itens no hover)
      não foi aplicado — helps pra listas longas guiarem atenção, mas
      numa lista de 3-4 itens curtos seria decoração sem reduzir esforço
      cognitivo real.
    - **Metodologia reordenada por Matheus** pra antes de Pesquisa +
      Field Exploration (no frame duplicado) — ordem cronológica: método
      antes do achado. Divisórias conferidas, continuam corretas.
  - **✅ Auditoria geral do case (2026-09-14):** revisão completa de todos
    os blocos (ordem, espaçamento, tipografia, divisórias). Achados:
    divisória de topo tinha sido perdida em Resultado e nunca existiu em
    Intro das Soluções (mesmo com `strokeTopWeight` setado, o array
    `strokes` estava vazio) — corrigido nos dois. **Inconsistência real
    de eyebrow encontrada:** Contexto e Metodologia usavam o estilo
    canônico antigo (`Portfolio/Label/10 Medium`, 10px, tracking 12%,
    `textCase: UPPER`), enquanto os 5 blocos mais recentes (JTBD, Testes,
    Resultado, Próximos Passos, Intro) usam 13px Regular com caracteres
    já digitados em maiúsculas. **Matheus decidiu: 13px Regular é o
    padrão novo** (maioria dos blocos já usa) — Contexto e Metodologia
    atualizados pra bater. Ordem das técnicas (Pesquisa → Metodologia →
    JTBD → Design e Prototipação → Testes → Soluções → Resultado →
    Próximos Passos) conferida contra o spec: **correta**, sem desvios.
    **Bug achado e não meu:** o link "Essavie Ecommerce →" no footer de
    navegação (`2030:391`) apontava pra uma URL do variant.com que hoje
    redireciona pro site raiz (Essavie nunca foi publicado como case
    real) — Matheus já ocultou o bloco.
  - **✅ Footer — Metadados (`2167:174`) reorganizado (2026-09-14).**
    Descoberta: os links pro Figma e pro Miro já existiam em outros dois
    lugares do case (Metodologia tem o link real do Miro desde antes
    desta sessão; Intro das Soluções tem o link real do Figma) — os do
    footer eram puramente redundantes, removidos. Linha de metadados
    (Papel/Data/Ferramentas/Setor), que antes era uma frase densa só com
    "·" separando tudo, virou um **grid de 4 colunas escaneável**: label
    pequeno (11px, tracking 12%, ink 50%) + valor (14px, ink 100%) por
    campo, mesma lógica de "label acima do valor" usada nos Stats.
    Ferramentas (a lista mais longa) tem largura fixa de 320px e quebra
    em 2 linhas em vez de estourar a largura da seção.
  - **✅ Resultado (`2030:441`) — analisado e mantido (2026-09-14).**
    Matheus perguntou se o bloco valia a pena manter. Conteúdo não é
    redundante o bastante pra cortar (é o único recap fechado dos 3
    números-chave do case, mesmo o primeiro ecoando o stat já citado no
    corpo da Solução 2 — normal em wrap-up de case). **Mantido, mas
    corrigido:** ainda estava com `layoutMode: GRID` (o modo redundante
    já eliminado em todo o resto do case) e no grid antigo de 1280px —
    convertido pra `HORIZONTAL` real, realinhado pro padrão 1290/x:315,
    label column corrigida de 304px (resto de matemática de grid antiga)
    pra 440px padrão, padding órfão de 320px removido da label column, e
    adicionada a divisória de topo (ink 10%) que faltava — Soluções →
    Resultado é mudança real de assunto.
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
