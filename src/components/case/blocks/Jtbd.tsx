import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./Jtbd.module.css";

// Copy source: Figma node 2173:379 "Jobs To Be Done (Arquétipos)", read
// verbatim via the Figma API (2026-09-16) — eyebrow already on the
// current 13px-Regular standard, no correction needed this time.
// Attribution lines keep their em dash before the quote: unlike Field
// Notes' paragraph, this one introduces a verbatim transcribed quote
// from a named persona, the same exemption already applied to Pesquisa.
// Section padding is asymmetric (128 top / 64 bottom) with a real top
// divider — confirmed via the API: genuine subject change from Field
// Notes (Metodologia sits between them in the full spec but is hidden
// in this Figma file, so JTBD directly follows Field Notes here), and
// it closes tight into whatever comes next.
const ENTRIES = [
  {
    headline:
      "Quando estou no autoatendimento, quero confirmação clara a cada passo, pra não errar na frente de todo mundo.",
    attribution:
      'Xênia, 54–62 · baixa familiaridade com tecnologia — "Quero fazer compras rápido, mas tenho medo de errar."',
  },
  {
    headline: "Quando estou com pressa, quero pagar e sair sem nenhuma etapa extra no caminho.",
    attribution:
      'João, 18–25 · alta familiaridade com tecnologia — "Sem fila, sem papo. Só pagar e ir embora."',
  },
  {
    headline: "Quando uso um sistema novo, quero saber o que está acontecendo antes de confiar nele.",
    attribution:
      'Manuela, 28–38 · familiaridade moderada com tecnologia — "Quero saber o que está acontecendo em cada etapa."',
  },
];

export function Jtbd() {
  return (
    <CaseSection id="jtbd" divider spacing="normal" spacingBottom="tight">
      <BlockGrid
        label={<LabelStack eyebrow="JOBS TO BE DONE" question="O que cada perfil estava tentando resolver?" />}
      >
        <div className={`${styles.list}`}>
          {ENTRIES.map((entry) => (
            <div key={entry.headline} className={`${styles.entry}`}>
              <p className={styles.headline}>{entry.headline}</p>
              <p className={styles.attribution}>{entry.attribution}</p>
            </div>
          ))}
        </div>
      </BlockGrid>
    </CaseSection>
  );
}
