import Image from "next/image";
import { CaseSection } from "../CaseSection";
import styles from "./PanoramaCompetitivo.module.css";
import liftStyles from "../BlockLift.module.css";

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
//
// Photos re-exported optimized 2026-09-22 (Matheus, `banners/otimizados/
// field-exploration1-4.png`, same content/dimensions, much smaller file
// size) — "-r2" suffix on the same filenames.
const TOTEMS = [
  { name: "Renner", photo: "renner-r2.png", logo: "renner-sm-v3.png", w: 20, h: 40 },
  { name: "C&A", photo: "ca-r2.png", logo: "cea-sm-v3.png", w: 40, h: 40 },
  { name: "Zara", photo: "zara-r2.png", logo: "zara-sm-v3.png", w: 42, h: 40 },
  {
    name: "Shopping Center Norte",
    photo: "shopping-center-norte-r2.png",
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
// Final logo set (Matheus, 2026-09-21, Figma 2593:105): Honest Market and
// McDonald's were swapped for Cinemark and Smartbreak. Each file is a 2x
// export whose height already encodes its optical size, so display size
// is file size / 2 scaled by 0.8 on desktop (Figma option 2: whole row
// fits the 1226 grid, chosen over the overflowing option 1 to keep the page
// calm and grid-aligned) and 0.7 in the mobile marquee. Order = the Figma row.
const LOCATIONS = [
  { name: "Zara", logo: "zara-r3.png", w: 108, h: 44 },
  { name: "Riachuelo", logo: "riachuelo-r3.png", w: 212, h: 42 },
  { name: "Renner", logo: "renner-r3.png", w: 265, h: 52 },
  { name: "C&A", logo: "cea-r3.png", w: 96, h: 48 },
  { name: "Smartbreak", logo: "smartbreak-r3.png", w: 334, h: 58 },
  { name: "Carrefour", logo: "carrefour-r3.png", w: 350, h: 57 },
  { name: "Walmart", logo: "walmart-r3.png", w: 258, h: 60 },
  { name: "Extra", logo: "extra-r3.png", w: 132, h: 64 },
  { name: "Pão de Açúcar", logo: "paodeacucar-r3.png", w: 274, h: 64 },
  { name: "Cinemark", logo: "cinemark-r3.png", w: 266, h: 48 },
  { name: "Shopping Center Norte", logo: "centernorte-r3.png", w: 134, h: 48 },
];

// Mobile marquee rows: 6 + 5, opposite directions.
const ROW_TOP = LOCATIONS.slice(0, 6);
const ROW_BOTTOM = LOCATIONS.slice(6);

function logoSrc(file: string) {
  return `/case/square-self-checkout/panorama-competitivo/logos/${file}`;
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: typeof LOCATIONS;
  reverse?: boolean;
}) {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={`${styles.marqueeTrack} ${reverse ? styles.reverse : ""}`}>
        {[0, 1].map((copy) =>
          items.map((l) => (
            <Image
              key={`${copy}-${l.name}`}
              className={styles.marqueeLogo}
              src={logoSrc(l.logo)}
              alt=""
              width={l.w}
              height={l.h}
              style={{ width: (l.w / 2) * 0.7, height: "auto" }}
            />
          )),
        )}
      </div>
    </div>
  );
}

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
                src={logoSrc(location.logo)}
                alt={`Logo ${location.name}`}
                width={location.w}
                height={location.h}
                style={{ width: (location.w / 2) * 0.8, height: "auto" }}
              />
            ))}
          </div>
          <div className={styles.logoStacks}>
            {[ROW_TOP, ROW_BOTTOM].map((row, i) => (
              <div key={i} className={styles.logoStack}>
                {row.map((location) => (
                  <Image
                    key={location.name}
                    className={styles.logoLarge}
                    src={logoSrc(location.logo)}
                    alt={`Logo ${location.name}`}
                    width={location.w}
                    height={location.h}
                    style={{ width: (location.w / 2) * 0.8, height: "auto" }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className={styles.marquees}>
            <MarqueeRow items={ROW_TOP} />
            <MarqueeRow items={ROW_BOTTOM} reverse />
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
