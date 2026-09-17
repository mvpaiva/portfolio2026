import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./Resultado.module.css";

// Copy source: Figma node 2173:471 "section#resultado", read verbatim
// via the Figma API (2026-09-16). No top stroke on the real node
// (confirmed via API) — no divider, despite Soluções → Resultado being
// a subject change; an older doc note about a divider here referred to
// the pre-refinamento structure, superseded by this live read. Label
// column is eyebrow-only (no question) — the headline sentence lives in
// the content column instead, a different split from the other
// BlockGrid blocks. Em dash in the headline (authorial copy, not a
// quote) swapped for a colon. Matheus removed the "40% → 0%" stat
// 2026-09-17 (live Figma now has just these 2).
const STATS = [
  { number: "85,1%", label: "Sucesso de navegação direta (tree test)" },
  { number: "5/5", label: "Soluções remontadas a um pain point" },
];

export function Resultado() {
  return (
    <CaseSection id="resultado">
      <BlockGrid label={<LabelStack eyebrow="ONDE CHEGOU" />}>
        <p className={styles.headline}>
          Cinco soluções, remontadas a cinco pain points específicos: validadas
          com as pessoas que realmente enfrentavam eles.
        </p>

        <div className={styles.statsRow}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </BlockGrid>
    </CaseSection>
  );
}
