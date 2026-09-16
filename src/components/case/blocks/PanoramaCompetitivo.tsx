import Image from "next/image";
import { CaseSection } from "../CaseSection";
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
// Header logos: each source PNG is cropped to its OWN aspect ratio (not a
// shared canvas like the 11-strip below), so they're rendered at their
// real pixel size scaled to a fixed 40px display height (CSS `width:
// auto`) instead of forced into a fixed square — a square box would
// squash a wide one down to fit, undoing Matheus's calibration in Figma
// (node 2313:170). "-sm-v2" files are his second re-export round
// (2026-09-16) — Zara went from a 74x40 wide crop back to a 38x57
// portrait one; same cache-busting rename reason as the 11-strip below.
const TOTEMS = [
  { name: "Renner", photo: "renner.png", logo: "renner-sm-v2.png", w: 29, h: 40 },
  { name: "C&A", photo: "ca.png", logo: "cea-sm-v2.png", w: 40, h: 40 },
  { name: "Zara", photo: "zara.png", logo: "zara-sm-v2.png", w: 38, h: 57 },
  {
    name: "Shopping Center Norte",
    photo: "shopping-center-norte.png",
    logo: "centernorte-sm-v2.png",
    w: 40,
    h: 40,
  },
];

// Real logo crops exported by Matheus 2026-09-16 (Figma node 2544:663).
// His original calibration fit each logo into a shared 77x64 canvas
// capped at 24px target height / 64px max width — but wide wordmarks
// (Renner, Carrefour, Walmart, Pão de Açúcar) hit the width cap long
// before reaching 24px tall, so they rendered at as little as 10px while
// compact marks (C&A, McDonald's) sat at the full 24px — exactly the
// "tamanhos tão destoantes" Matheus flagged. Fixed the same way in
// Figma and here: `sharp().trim()` each source down to its real content
// bounding box (dropping the baked-in cap padding), then render every
// logo at the SAME height with natural width (no cap) — the 11 real
// aspect ratios sum to well under 1226px at a comfortable height, so
// nothing needs to be squeezed. `w`/`h` below are each file's trimmed
// pixel size (see `-trim.png` in public/) driving next/image's intrinsic
// size; CSS scales down to the shared display height, width auto. No
// caption under each logo per Matheus's call — the logo alone reads fine
// at this density, `alt` carries the name for accessibility. Order
// groups by category (moda → mercado → fast food → o shopping em si),
// matching the final Figma arrangement.
const LOCATIONS = [
  { name: "Zara", logo: "zara-trim.png", w: 57, h: 24 },
  { name: "Riachuelo", logo: "riachuelo-trim.png", w: 64, h: 22 },
  { name: "C&A", logo: "cea-trim.png", w: 47, h: 23 },
  { name: "Renner", logo: "renner-trim.png", w: 64, h: 12 },
  { name: "Honest Market", logo: "honest-trim.png", w: 60, h: 24 },
  { name: "Walmart", logo: "walmart-trim.png", w: 63, h: 14 },
  { name: "Extra", logo: "extra-trim.png", w: 50, h: 24 },
  { name: "Carrefour", logo: "carrefour-trim.png", w: 64, h: 10 },
  { name: "Pão de Açúcar", logo: "paodeacucar-trim.png", w: 64, h: 15 },
  { name: "McDonald's", logo: "mc-trim.png", w: 36, h: 24 },
  { name: "Shopping Center Norte", logo: "centernorte-trim.png", w: 38, h: 24 },
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
                  <Image
                    src={`/case/square-self-checkout/panorama-competitivo/logos/${totem.logo}`}
                    alt={`Logo ${totem.name}`}
                    width={totem.w}
                    height={totem.h}
                  />
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
              <Image
                key={location.name}
                className={styles.logoLarge}
                src={`/case/square-self-checkout/panorama-competitivo/logos/${location.logo}`}
                alt={`Logo ${location.name}`}
                width={location.w}
                height={location.h}
              />
            ))}
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
