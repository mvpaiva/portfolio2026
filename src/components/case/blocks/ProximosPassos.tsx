import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./ProximosPassos.module.css";
import liftStyles from "../BlockLift.module.css";
import listSpotlight from "../ListSpotlight.module.css";

// Copy source: Figma node 2173:488 "Próximos Passos", read verbatim via
// the Figma API (2026-09-16) — same structural pattern as JTBD (label
// eyebrow+question, list of entries with a 20px headline + 65%-opacity
// 13px note), so it gets the same item-level ListSpotlight treatment:
// benji-taylor-reference.md names Próximos Passos (4 entries) as one of
// the blocks this spec targets. Real divider confirmed via the API
// (Resultado → Próximos Passos is a genuine subject change). Em dash in
// entry 2's note (authorial, not a quote) split into two sentences.
const ENTRIES = [
  {
    headline: "Mapa de corredores da loja + orientação de rota",
    note: "Precisa de um mapa interno por loja.",
  },
  {
    headline: "Programa de fidelidade",
    note: "Cada rede roda seu próprio sistema. Precisa de parcerias.",
  },
  {
    headline: "Acompanhamento de orçamento mensal",
    note: "Empurra o produto pra além do autoatendimento, rumo a finanças pessoais.",
  },
  {
    headline: "Escalabilidade multi-rede",
    note: "Precisa antes de um fluxo de seleção de loja.",
  },
];

export function ProximosPassos() {
  return (
    <CaseSection id="proximos-passos" divider>
      <BlockGrid
        className={liftStyles.item}
        label={
          <LabelStack
            eyebrow="PRÓXIMOS PASSOS"
            question="O que está deliberadamente fora de escopo, por enquanto"
          />
        }
      >
        <div className={`${styles.list} ${listSpotlight.group}`}>
          {ENTRIES.map((entry) => (
            <div key={entry.headline} className={`${styles.entry} ${listSpotlight.item}`}>
              <p className={styles.headline}>{entry.headline}</p>
              <p className={styles.attribution}>{entry.note}</p>
            </div>
          ))}
        </div>
      </BlockGrid>
    </CaseSection>
  );
}
