# Prompt de extração — Case Square (site + chat dedicado → repo → Figma)

> **Como usar:** cole isso no chat do Claude dedicado ao case Square (o que
> já tem todo o contexto de pesquisa) e/ou use como checklist revisando
> `mvpaiva.com/square` diretamente. A resposta que sair daí volta pra cá
> (Matheus cola no chat do portfólio) pra eu atualizar
> `docs/visual-language-specification.md` §14 e depois mapear pros
> wireframes já exportados em `docs/assets/square-wireframes-raw/` e pro
> Figma (`2:546`).
>
> **Por que esse prompt existe:** o case ao vivo está "muito longo,
> cansativo e sem graça" (palavras do próprio Matheus) e o conteúdo atual
> no Figma do portfólio é filler genérico de template gerado pelo
> variant.com — não é a síntese real. Existe um esboço de estrutura melhor
> (`Case---Square-Privado`, node `13440-2`) que nasceu de uma conversa
> dedicada só sobre esse case. Este prompt existe pra puxar dessa conversa
> e do site ao vivo exatamente o que falta pra fechar a versão condensada
> — nada mais, nada menos.

---

## Contexto pra quem for responder

Este é o portfólio de Matheus Paiva (Next.js + Figma). O case Square já
está desenhado em 9 blocos genéricos no Figma, mas o texto/copy de lá é
placeholder de template — precisa ser substituído pela síntese real. Regra
de ouro do projeto, que vale pra qualquer resposta aqui: **nunca fabricar
métrica, citação, persona, concorrente ou URL** — se um dado não está
confirmado, marcar explicitamente como "não confirmado" em vez de
inventar ou aproximar.

---

## A. Estrutura da síntese condensada

O objetivo é resolver por que o case atual é "longo, cansativo, sem
graça" — não é só cortar texto, é repensar o que cada seção precisa provar.

1. Qual é a estrutura de seções do esboço `13440-2`? Lista em ordem, com
   uma frase dizendo o que cada seção prova/comunica.
2. Comparando com os 9 blocos genéricos atuais (Hero → Evidência → Contexto
   → Research → Benchmark → Evolução → Solução ×5 → Impacto → Footer):
   o que muda? O que é cortado, fundido ou reordenado?
3. Qual é o motivo específico de cada corte — "isso é redundante com X",
   "isso não prova nada pro recrutador que escaneia rápido", etc.?
4. Existe uma versão de "camada principal vs. camada secundária" definida
   (ver `diretrizes-portfolio.md` — pesquisa completa vive numa página só,
   não espalhada)? Se sim, o que fica na camada principal e o que vai pra
   secundária?

## B. Fatos e números reais (resolve a lista "não confirmados" do §14)

Pra cada item abaixo: **ou confirma o número exato com a fonte** (survey,
entrevista, teste), **ou marca como fictício/placeholder a ser removido.**
Não aproximar, não arredondar "pra ficar bonito".

1. Métrica principal: "40% → 0%" de erro — confirmar contexto exato (erro
   de quê, medido como, em qual período).
2. Escala de pesquisa: 18 entrevistas, 247 respostas de survey, 5 rodadas
   de teste de usabilidade — todos confirmados? Algum desses número é
   estimativa?
3. "12h de campo", "23 pontos de atrito" — confirmar ou descartar.
4. Lista de concorrentes do benchmark — qual é a lista real e final (o
   log antigo tinha duas listas conflitantes: "Zara, Amazon Go, Carrefour,
   Extra, Walmart" vs. "Clover, Shopify, Toshiba")?
5. "73% abandonavam no terceiro toque" — já sinalizado como possível
   invenção de IA. Existe dado real equivalente, ou descarta de vez?
6. "+24% Revenue/Hour", "-65%, 12s, 89%" — prováveis placeholders de
   template. Confirmar se algum tem base real ou descartar todos.
7. Personas reais: nomes/arquétipos, quantas são, alguma citação real
   associada a cada uma?
8. Timeline exata do projeto (já temos "Fev–Jun 2026, solo" — confirmar).
9. Ferramentas usadas (já temos Figma, Miro, Treejack, Maze — completar
   se faltar algo).

## C. Mapeamento dos wireframes reais pros blocos de Solução

Já exportei as telas finais (visíveis, sem variantes A/B descartadas) do
Figma de wireframes — índice completo em
`docs/assets/square-wireframes-raw/README.md`. São 6 telas de Totem e 18
de Mobile. Preciso saber:

1. Quais são as **5 soluções reais** do case (não as genéricas do
   variant.com, tipo "Visão Computacional Ativa")? Nome + pain point que
   cada uma resolve.
2. Pra cada uma das 5 soluções, **qual(is) tela(s) da lista abaixo
   ilustra(m) ela** — pode ser 1 tela (Totem ou Mobile) ou uma sequência
   de 2-3 (ver `visual-language-specification.md` §13.1 pra quando usar
   sequência vs. tela única vs. crop):

   **Totem:** weigh-confirm · review-pay · payment-approved · splash-entry
   · age-verification · scan-cart

   **Mobile:** scan-v1 · scan-v2 · scan-fab-bottomsheet · scan-radial-menu
   · payment-method · weigh-item · scan-with-list-full · scan-with-list ·
   cart-review · onboarding-start-immediately · onboarding-demo-scan ·
   onboarding-contextual-sheet · onboarding-progressive ·
   onboarding-quiet-login · onboarding-minimal-promise · exit-all-set ·
   exit-fix-exit · exit-help

3. Alguma tela da lista **não** deve ser usada no case (ex: é de um fluxo
   que não faz parte da narrativa final)? Marcar quais ficam de fora.
4. Alguma solução real do case **não tem** wireframe correspondente
   exportado (ou seja, preciso puxar de outro lugar)?

## D. Copy final por bloco

Pra cada seção definida em (A), o texto real em pt-BR pronto pra colar:
eyebrow, headline, subhead, corpo. Se algo ainda não está redigido,
indicar "a escrever" em vez de deixar em branco silenciosamente (pra eu
não confundir com "não existe conteúdo aqui").

## E. O que não fazer (herdado das regras do projeto)

- Nunca inventar rótulo de dispositivo/público que não existe de fato no
  case (ex.: um "Operador" já foi removido antes por não haver tela real
  voltada a funcionário).
- Nunca reaproveitar "Essavie"/"Fireflies" como se fossem reais — são
  fictícios, ficam fora do case Square.
- Se alguma citação de usuário no case atual for placeholder gerado por
  IA (tipo `"[Citação do usuário sobre X]"`), ou confirma a citação real,
  ou o bloco vira estatística/fato sem aspas — nunca inventar a fala.

## F. Formato de resposta esperado

Markdown, uma seção por letra (A–D), pronto pra eu colar direto como
atualização de `docs/visual-language-specification.md` §14 e como guia de
mapeamento pro Figma. Números e fatos confirmados ficam sem observação;
qualquer coisa não confirmada leva a tag **[NÃO CONFIRMADO]** explícita.
