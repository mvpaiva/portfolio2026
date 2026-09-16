import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./FieldNotes.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2173:300 "Field Notes", read verbatim via the
// Figma API (2026-09-16), with two corrections:
// 1. The eyebrow node ("Eyebrow — Observação de Campo") is still on the
//    OLD canonical style (10px Medium caps) — confirmed via the API,
//    not the 13px Regular standard Matheus locked in on 2026-09-14 for
//    every other block (Contexto/Metodologia were already migrated;
//    this one apparently wasn't). Built with LabelStack, which already
//    enforces the current 13px standard, rather than copying the stale
//    Figma value.
// 2. The paragraph has an em dash in authorial narration (not a
//    verbatim research quote), which the project's copy rule treats as
//    an AI-slop pattern — swapped for parentheses.
const CHIPS = [
  { label: "Fricção no escaneamento", href: "#solucao-1" },
  { label: "Seleção de item errado", href: "#solucao-2" },
  { label: "Busca de produto solto", href: "#solucao-2" },
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
          Observação direta em loja flagship (SP), 4 horas de campo, 3 redes de
          varejo. 1 em cada 4 usuários precisava olhar ao redor procurando um
          funcionário antes mesmo de terminar o escaneamento. A incerteza é o
          maior inimigo da autonomia.
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
