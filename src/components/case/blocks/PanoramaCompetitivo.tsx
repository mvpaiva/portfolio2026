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
// have squashed the wide ones (Zara 74x40) down to fit, undoing exactly
// the balance Matheus calibrated in Figma (node 2313:170, 2026-09-16).
const TOTEMS = [
  { name: "Renner", photo: "renner.png", logo: "renner-sm.png", w: 29, h: 40 },
  { name: "C&A", photo: "ca.png", logo: "cea-sm.png", w: 40, h: 40 },
  { name: "Zara", photo: "zara.png", logo: "zara-sm.png", w: 74, h: 40 },
  {
    name: "Shopping Center Norte",
    photo: "shopping-center-norte.png",
    logo: "centernorte-sm.png",
    w: 40,
    h: 40,
  },
];

// Real logo crops exported by Matheus 2026-09-16 (Figma node 2544:663,
// already zoom-calibrated per benji-taylor-reference.md) — replaces the
// Placeholder stand-ins. Order groups by category (moda → mercado → fast
// food → o shopping em si), matching the final Figma arrangement; no
// caption under each logo per Matheus's call — the logo alone reads fine
// at this density, `alt` carries the name for accessibility. Unlike the
// header logos above, these 11 all share the same 77x64 export canvas
// with each mark already scaled/positioned inside it per Matheus's
// calibration ("altura-alvo de 24px, teto de largura de 64px") — so a
// single shared box + `object-fit: contain` reproduces that balance
// exactly, since every logo is scaled down by the identical factor.
// Filenames below use a "-v2" suffix on every logo Matheus re-exported
// with different pixel content this round (zara, riachuelo, cea, renner,
// walmart, extra, carrefour, paodeacucar, centernorte) — Next's
// `/_next/image` optimizer can keep serving old bytes indefinitely when a
// same-named file in `public/` is overwritten, confirmed in this exact
// file already (see handoff.md); renaming is the only reliable fix.
// honest.png/mc.png didn't need it — they're new filenames this round
// (were honestmarket.png/mcdonalds.png before).
const LOCATIONS = [
  { name: "Zara", logo: "zara-v2.png" },
  { name: "Riachuelo", logo: "riachuelo-v2.png" },
  { name: "C&A", logo: "cea-v2.png" },
  { name: "Renner", logo: "renner-v2.png" },
  { name: "Honest Market", logo: "honest.png" },
  { name: "Walmart", logo: "walmart-v2.png" },
  { name: "Extra", logo: "extra-v2.png" },
  { name: "Carrefour", logo: "carrefour-v2.png" },
  { name: "Pão de Açúcar", logo: "paodeacucar-v2.png" },
  { name: "McDonald's", logo: "mc.png" },
  { name: "Shopping Center Norte", logo: "centernorte-v2.png" },
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
              <div key={location.name} className={styles.logoItem}>
                <div className={styles.logoLarge}>
                  <Image
                    src={`/case/square-self-checkout/panorama-competitivo/logos/${location.logo}`}
                    alt={`Logo ${location.name}`}
                    fill
                    sizes="64px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
