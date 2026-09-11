# Diretrizes do Portfólio — Clareza, Organização, Feedbacks e Audit

Isso não é uma spec técnica (tokens, arquitetura de página) — é o contexto de
julgamento por trás das decisões, que só existe nesta conversa. Serve pra qualquer
sessão de desenvolvimento (Claude Code, ou você mesmo revisando depois) não perder o
"porquê" das escolhas.

Para tokens, valores e regras de sistema, ver
[visual-language-specification.md](visual-language-specification.md). Para status do
projeto e como retomar o trabalho, ver [handoff.md](handoff.md).

> **Nota de decisão (2026-09-11):** a filosofia abaixo cita darn.fish/talhask como
> inspiração para "navegação embutida numa foto real de artefato físico". Na prática,
> essa ideia foi explorada e depois abandonada — a home usa um retângulo abstrato com
> 3 pontos, não uma fotografia (ver visual-language-specification.md §0 e §11 para o
> estado atual confirmado). Mantenha as referências abaixo como a origem conceitual do
> porquê dos pontos/navegação espacial existirem, não como descrição literal da
> implementação atual.

## Filosofia geral

Duas referências, não contraditórias:

- **benji.org** — restrição, função antes de decoração, hierarquia por espaço/peso
  tipográfico (nunca cor/borda decorativa), copy factual, nunca em tom de marketing.
  Teste prático pra qualquer elemento novo: "se ele só serve pra parecer legal, corta".
- **darn.fish (Gibson) / talhask.com** — a navegação e o conteúdo são o mesmo objeto
  físico fotografado. Elementos reais dentro de uma foto SÃO os links — sem menu
  separado, sem canvas, sem drag, sem script de hover chamativo.

Quando as duas puxam em direções diferentes (ex: abrir uma página de case de verdade
quebra o "mesmo objeto físico"), a solução nunca é abandonar a filosofia — é achar o
recurso mínimo que preserva a sensação sem inflar a interface (ex: View Transitions
fazendo a palavra clicada morfar no título do case, um "voltar pro índice" no lugar de
um back-button genérico).

## Clareza

- **Público duplo, sempre**: recrutador escaneia em segundos, designer lê a fundo.
  Qualquer decisão de esconder/condensar conteúdo precisa funcionar pros dois — não só
  pro que lê tudo.
- **Matheus é júnior em transição de carreira**: o rigor de processo (pesquisa,
  metodologia, testes) É a prova de competência, porque ainda não existe histórico de
  mercado pra provar isso de outro jeito. Isso muda o cálculo normal de "esconder
  processo atrás de clique pra não cansar o scroll" — aqui, esconder demais mina o
  próprio objetivo do case. A camada principal (sem precisar clicar em nada) precisa
  ser substantiva o bastante pra convencer sozinha.
- **Dispositivo/rótulo só se for real**: nunca criar uma distinção visual (ex: tag de
  "Operador") pra um público ou tela que não existe de fato no case. Checar a pesquisa
  original antes de rotular.
- **Ícones só quando são universalmente reconhecíveis**: um símbolo elegante mas
  obscuro (ex: "§" pra abrir índice de seções) falha silenciosamente — a maioria nunca
  descobre que ele existe. Prefira o pictograma que as pessoas já reconhecem de outros
  contextos (ex: ícone de linhas decrescentes = esboço/índice, como em apps de leitura),
  mesmo que pareça "menos único".

## Organização

- **Sistema de blocos, não páginas soltas**: qualquer estrutura de case (seções, nomes,
  ordem) precisa ser pensada como componente reutilizável, mesmo enquanto só o case do
  Square existe. Não hardcodar nada que só funcione pra esse conteúdo específico.
- **Camada principal vs. secundária**: conteúdo de pesquisa aprofundado (metodologia
  completa, personas completas, JTBD em framework, notas de campo, plano de teste)
  pertence a UMA página secundária consolidada ("processo completo"), não a vários
  pontos de expansão espalhados pelo scroll principal — mais simples de navegar e de
  construir.
- **Nunca duas imagens/diagramas seguidos sem texto entre elas** — o texto funciona
  como descanso visual; duas imagens em sequência competem por atenção.
- **Diagramas de pesquisa (jornada, metodologia) redesenhados nativamente** no sistema
  tipográfico do site, em vez de importar prints do Miro/Figma — evita que a página
  pareça uma colagem de ferramentas diferentes.
- **Marcos de seção em português**, como palavras (Descoberta, Síntese, Design), não
  numerais romanos com títulos em estilo acadêmico em inglês.
- **A home fica neutra em relação a qualquer case específico** — nunca reusar um
  artefato de um case (ex: wireframe em papel do Square) como elemento da home, porque
  outros cases vão entrar depois e a home não pode parecer "pertencer" ao primeiro
  projeto.

## Feedbacks recorrentes (lições já aprendidas nas rodadas de revisão)

- Cortar efeito que só decora (parallax por cursor, grain texture) — manter só o toque
  interativo que também é útil (hover/focus revelando metadado real antes do clique).
- Toda navegação crítica precisa existir em forma acessível e sempre visível (texto
  nativo, focável por teclado) — não pode depender só de descoberta dentro de uma foto,
  porque toque (mobile) não tem hover, e nem todo visitante vai explorar a imagem.
- Foco de teclado (`:focus-visible`) é obrigatório em qualquer elemento que funcione
  como link real, espelhando o que acontece no hover — não é polimento opcional.
- Nunca aceitar conteúdo de exemplo gerado por IA (citações, estatísticas, estrutura de
  case) como final — todo placeholder gerado numa exploração de layout precisa ser
  substituído por material real e verificado antes de ir pro ar.
- Tradução pt-BR precisa ser conferida por inteiro — termos em inglês colados em
  labels/headings (ex: "Desafio de Interaction") escapam fácil quando o conteúdo vem de
  uma ferramenta de exploração.

## Portfolio audit — checklist antes de publicar

- [ ] Alguém que escaneia por 5 segundos entende quem é Matheus e vê uma prova real de
      rigor, sem precisar clicar em nada?
- [ ] Dá pra navegar o site inteiro só com teclado, e também só com toque (sem mouse)?
- [ ] Todo número, citação e foto usados são reais e conferidos contra a fonte original
      — nenhum placeholder de exploração ficou esquecido?
- [ ] Nenhum rótulo (dispositivo, público, seção) descreve algo que não existe de fato
      no case?
- [ ] A copy está 100% em pt-BR, sem termo em inglês esquecido?
- [ ] Todas as seções de case usam o mesmo vocabulário de blocos (nomes e ordem),
      mesmo quando o conteúdo de um bloco varia?
- [ ] Cada elemento decorativo tem uma função (ajuda a entender algo) — ou pode ser
      cortado sem perda?
- [ ] A camada principal do case (sem expandir nada) já convence sozinha, sem depender
      de quem clica em "ver mais"?
