import Image from "next/image";
import { CaseSection } from "../CaseSection";
import styles from "./PanoramaCompetitivo.module.css";

// Copy source: Figma node 2248:178 "Panorama Competitivo", read verbatim
// via the Figma API (2026-09-16).
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
// (node 2313:170). "-sm-v3" files are his third re-export round
// (2026-09-16, already pre-scaled to their real 40px-tall display size —
// e.g. Renner is 20x40, not 29x40 like the first round); cache-busting
// rename, same reason as the 11-strip below.
const TOTEMS = [
  { name: "Renner", photo: "renner.png", logo: "renner-sm-v3.png", w: 20, h: 40 },
  { name: "C&A", photo: "ca.png", logo: "cea-sm-v3.png", w: 40, h: 40 },
  { name: "Zara", photo: "zara.png", logo: "zara-sm-v3.png", w: 42, h: 40 },
  {
    name: "Shopping Center Norte",
    photo: "shopping-center-norte.png",
    logo: "centernorte-sm-v3.png",
    w: 51,
    h: 40,
  },
];

// Real logo crops, final round (Matheus, 2026-09-16, Figma node
// 2550:277). Same sizing model established earlier — every logo at a
// shared height with natural (uncapped) width, since the 11 real aspect
// ratios sum to well under 1226px, so nothing needs to be squeezed —
// but these are 2x/retina exports of the actual "Logo Slot" image nodes
// straight out of Figma (crisper than the `sharp`-downscaled `-trim`
// files used before). `w`/`h` below are each file's real pixel size
// (already ~48px tall, 2x the 24px logical display height) driving
// next/image's intrinsic size; CSS scales down to the shared display
// height, width auto. No caption under each logo per Matheus's call —
// the logo alone reads fine at this density, `alt` carries the name for
// accessibility. Order groups by category (moda → mercado → fast food →
// o shopping em si), matching the final Figma arrangement.
const LOCATIONS = [
  { name: "Zara", logo: "zara-slot.png", w: 117, h: 48 },
  { name: "Riachuelo", logo: "riachuelo-slot.png", w: 142, h: 48 },
  { name: "C&A", logo: "cea-slot.png", w: 96, h: 48 },
  { name: "Renner", logo: "renner-slot.png", w: 245, h: 48 },
  { name: "Honest Market", logo: "honest-slot.png", w: 122, h: 48 },
  { name: "Walmart", logo: "walmart-slot.png", w: 206, h: 48 },
  { name: "Extra", logo: "extra-slot.png", w: 100, h: 48 },
  { name: "Carrefour", logo: "carrefour-slot.png", w: 298, h: 48 },
  { name: "Pão de Açúcar", logo: "paodeacucar-slot.png", w: 206, h: 48 },
  { name: "McDonald's", logo: "mc-slot.png", w: 73, h: 48 },
  { name: "Shopping Center Norte", logo: "centernorte-slot.png", w: 75, h: 48 },
];

export function PanoramaCompetitivo() {
  return (
    <CaseSection id="panorama-competitivo" spacing="tight">
      <div className={`${styles.block}`}>
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
