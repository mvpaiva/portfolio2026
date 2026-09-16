import Image from "next/image";
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
//
// Real field photos added 2026-09-16: of the 4 raw exports Matheus
// provided (banners/field-exploration1-4.png), only 3 matched the
// original highlighted set by visible signage (C&A on the counter,
// Zara from the bag, "Grande Center Norte" on the parking kiosk) — the
// 4th (field-exploration1.png) turned out to be Renner, not Riachuelo;
// there's no Riachuelo photo in this batch. Per Matheus: swap Riachuelo
// for Renner in the highlighted 4 rather than leave a placeholder.
// Renner stays in the 11-location list below too (kept — it's a real
// location from the actual research, not a duplicate to prune).
const TOTEMS = [
  { name: "Renner", photo: "renner.png" },
  { name: "C&A", photo: "ca.png" },
  { name: "Zara", photo: "zara.png" },
  { name: "Shopping Center Norte", photo: "shopping-center-norte.png" },
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
              <div className={styles.totemPhoto}>
                <Image
                  src={`/case/square-self-checkout/panorama-competitivo/${totem.photo}`}
                  alt={`Totem de autoatendimento observado na loja ${totem.name}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 289px"
                />
              </div>
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
