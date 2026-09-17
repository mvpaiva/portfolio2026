import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./FieldNotes.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2173:300 "Field Notes", read verbatim via the
// Figma API (2026-09-17, re-synced after Matheus's full text refinement
// pass). Eyebrow built with LabelStack (13px Regular standard) rather
// than the node's own stale 10px-caps style.
const CHIPS = [
  { label: "Fricção no escaneamento", href: "#solucao-1" },
  { label: "Seleção de item errado", href: "#solucao-2" },
  { label: "Confusão na mecânica da pesagem", href: "#solucao-2" },
  { label: "Verificação 18+", href: "#solucao-3" },
  { label: "Ansiedade na saída", href: "#solucao-4" },
  { label: "Lista e scanner desconectados", href: "#solucao-5" },
];

export function FieldNotes() {
  return (
    <CaseSection id="field-notes" spacing="tight" spacingBottom="normal">
      <BlockGrid
        className={liftStyles.item}
        label={
          <LabelStack eyebrow="OBSERVAÇÃO DE CAMPO" question="O que a exploração revelou?" />
        }
      >
        <p className={styles.body}>
          Observação direta em 3 redes de varejo em São Paulo, 4 horas de
          campo. 1 em cada 4 usuários precisava olhar ao redor procurando um
          funcionário antes mesmo de terminar o escaneamento. A incerteza era
          o maior inimigo da autonomia.
        </p>

        <div className={styles.chips}>
          {CHIPS.map((chip) => (
            <a key={chip.label} className={styles.chip} href={chip.href}>
              {chip.label}
            </a>
          ))}
          <span className={styles.chipInactive}>Pix invisível</span>
        </div>
      </BlockGrid>
    </CaseSection>
  );
}
