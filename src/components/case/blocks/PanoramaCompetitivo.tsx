import { CaseSection } from "../CaseSection";
import { Placeholder } from "../Placeholder";
import styles from "./PanoramaCompetitivo.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2248:178 "Panorama Competitivo", read verbatim
// via the Figma API (2026-09-16). Corrected 2026-09-16 (Matheus): this
// is a lift-trigger block (light opacity+translateY, no blur), not
// spotlight-trigger — the initial call miscategorized it as meta-info
// like Stats, same misjudgment already made once for Stats itself.
// Label swapped from the Figma's em dash ("Totens no dia a dia —
// observação de campo") to a colon — flagged to Matheus 2026-09-16 as
// pending, resolved here per his answer to drop the travessão.
const TOTEMS = [
  { name: "Riachuelo" },
  { name: "C&A" },
  { name: "Zara" },
  { name: "Shopping Center Norte" },
];

// Order and manual zoom calibration on 3 outlier logos (C&A, Pão de
// Açúcar, Shopping Center Norte) documented in benji-taylor-reference.md
// — not yet ported here since these are still Placeholder stand-ins, not
// the real logo images.
const LOCATIONS = [
  "Honest Market",
  "Walmart",
  "Extra",
  "Carrefour",
  "C&A",
  "Riachuelo",
  "Zara",
  "Renner",
  "McDonald's",
  "Pão de Açúcar",
  "Shopping Center Norte",
];

export function PanoramaCompetitivo() {
  return (
    <CaseSection id="panorama-competitivo" spacing="tight">
      <div className={`${styles.block} ${liftStyles.item} lift-trigger`}>
        <p className={styles.label}>Totens no dia a dia: observação de campo</p>

        <div className={styles.photoGrid}>
          {TOTEMS.map((totem) => (
            <div key={totem.name} className={styles.photoColumn}>
              <div className={styles.photoHeader}>
                <div className={styles.logoSmall}>
                  <Placeholder ratio="1/1" label={`Logo ${totem.name}`} />
                </div>
                <span className={styles.caption}>{totem.name}</span>
              </div>
              <Placeholder ratio="289/513" label={`Totem — ${totem.name}`} />
            </div>
          ))}
        </div>

        <div className={styles.locations}>
          <p className={styles.label}>11 locais visitados</p>
          <div className={styles.logoStrip}>
            {LOCATIONS.map((location) => (
              <div key={location} className={styles.logoItem}>
                <div className={styles.logoLarge}>
                  <Placeholder ratio="1/1" label={`Logo ${location}`} />
                </div>
                <span className={styles.logoCaption}>{location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
