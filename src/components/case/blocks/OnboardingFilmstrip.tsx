import { CaseSection } from "../CaseSection";
import { Zoomable } from "../Zoomable";
import styles from "./OnboardingFilmstrip.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2252:183 "Onboarding — Filmstrip", read
// verbatim via the Figma API (2026-09-16).
//
// 2026-09-16 (Matheus): the 6-frame horizontal filmstrip (native
// scroll-snap, one <Image> per frame) was replaced with a single
// flattened banner he exported from Figma — the 6 captions ("1. Bem-
// vindo ao Square" etc.) are baked into the image itself now. This was
// one of several autolayout galleries causing real layout bugs
// (breakage/horizontal scroll at odd viewport widths); flattening to
// one image removes that failure mode. Only the block label above
// stays as real text.
//
// Banner replaced again same day with a corrected export: the original
// had several onboarding screens still in English ("Continue with
// Apple", "Weigh item" etc.) — now fully localized to pt-BR, matching
// the rest of the checkout flow shown elsewhere in the case.
//
// Replaced once more 2026-09-17 (Matheus) — same 2452x852 canvas, new
// bytes; "-v3" is only a cache-busting rename (Next's /_next/image can
// serve stale bytes indefinitely when a same-named public/ file is
// overwritten, documented in handoff.md).
export function OnboardingFilmstrip() {
  return (
    <CaseSection id="onboarding-filmstrip" divider>
      <div className={`${styles.column} ${liftStyles.item} lift-trigger`}>
        <p className={styles.label}>Sequência de onboarding: primeiro uso completo</p>

        <div className={styles.filmstripScroll}>
          <div className={styles.filmstrip}>
            <Zoomable
              src="/case/square-self-checkout/onboarding/onboarding-sequence-r3.png"
              alt="Sequência de onboarding em 6 telas: bem-vindo ao Square, como funciona, escaneado, pesando um item, revisando e pagando, saindo da loja"
              width={2452}
              height={852}
              sizes="1226px"
            />
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
