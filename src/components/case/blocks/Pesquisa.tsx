import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./Pesquisa.module.css";

// Copy source: docs/visual-language-specification.md §14, block 03 ·
// Research (comprimido) — 7 real pain points, verbatim quotes from
// interviews/tests/survey/field notes. Never fabricated.
const PAIN_POINTS = [
  {
    title:
      "Fricção no escaneamento — parar pra checar o carrinho quebrava o escaneamento",
    quote:
      "Cada olhada pra longe da câmera pra confirmar um item significava perder o fluxo e ter que se reencontrar.",
  },
  {
    title:
      "Seleção de item errado — escolher o item certo vinha antes de precificá-lo",
    quote:
      "Sem uma etapa de categoria antes, 40% dos participantes do teste escanearam o item errado por completo.",
  },
  {
    title: "Busca de produto solto — o momento mais odiado do fluxo inteiro",
    quote:
      "Busca manual de código pra produtos soltos — as pessoas desistiam no meio do escaneamento e pediam ajuda.",
    cta: { href: "#solucao-1", label: "Ver soluções: escaneie sem parar" },
  },
  {
    title: "Verificação 18+ — pedir documento parecia um espetáculo público",
    quote:
      "Verificação de idade assistida por funcionário, feita à vista de toda a fila atrás de você.",
  },
  {
    title:
      "Ansiedade no portão de saída — um link escondido separava o cliente da porta",
    quote:
      "O teste em papel revelou pessoas que disseram que precisariam de um funcionário só pra sair.",
  },
  {
    title:
      "Desconexão entre lista e scanner — a lista de compras e o scanner não se falavam",
    quote:
      "Manuela, 33, ainda faz compra com papel porque o app não ajuda ela enquanto está no corredor.",
  },
  {
    title: "Lacuna de pagamento — o Pix era invisível em todo autoatendimento",
    quote:
      "100% dos respondentes do survey disseram que é assim que preferem pagar. Nenhum totem testado aceitava.",
  },
];

export function Pesquisa() {
  return (
    <CaseSection divider id="pesquisa">
      <BlockGrid
        label={
          <LabelStack
            eyebrow="A PESQUISA"
            question="18 conversas, 3 redes de varejo, um tema que não parava de se repetir"
          />
        }
      >
        <p className={styles.subhead}>
          As pessoas não confiam que a máquina vai cobrir elas.
        </p>

        <div className={styles.notes}>
          <p>
            Observação de campo — 12 horas em 3 redes de varejo em São
            Paulo, mapeando o serviço do estacionamento ao portão de saída.
          </p>
          <p>
            Fluxos de usuário, card sorting, tree testing, Crazy 8s — os
            métodos por trás dos wireframes.
          </p>
        </div>

        <a
          className={styles.link}
          href="https://miro.com/app/board/uXjVHJ5Co14="
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver a pesquisa completa
        </a>

        <ol className={styles.painPoints}>
          {PAIN_POINTS.map((point, index) => (
            <li key={point.title} className={styles.painPoint}>
              <span className={styles.painPointNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className={styles.painPointTitle}>{point.title}</p>
                <p className={styles.quote}>&quot;{point.quote}&quot;</p>
                {point.cta ? (
                  <a className={`${styles.link} ${styles.cta}`} href={point.cta.href}>
                    {point.cta.label}
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </BlockGrid>
    </CaseSection>
  );
}
