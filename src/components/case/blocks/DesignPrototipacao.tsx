import Image from "next/image";
import { CaseSection } from "../CaseSection";
import styles from "./DesignPrototipacao.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2173:395 "Design e Prototipação", read verbatim
// via the Figma API (2026-09-16). Image-forward block (same pattern as
// Blueprint Crop) — simple 1-line label, not the Label Column + question
// pattern used by narrative blocks, on purpose (§13.2 of the visual-
// language spec).
//
// 2026-09-16 (Matheus): the 4-column autolayout gallery (one <Image> per
// stage, each with its own aspect-ratio/fit) was replaced with a single
// flattened banner he exported from Figma — the 4 stage labels ("01 ·
// Crazy 8's" etc.) are baked into the image itself now, not separate
// <p> tags. This was one of several blocks whose autolayout grid caused
// real layout bugs (breakage/horizontal scroll at odd viewport widths);
// flattening to one image removes that failure mode entirely. Only the
// labelStack (heading + caption) above stays as real text/markup.
//
// Banner replaced again same day with a corrected export: the original
// had a duplicate "02" (Papel and the high-fi stress-test screen both
// labeled 02) — now numbered 01–04 correctly. Alt text updated to match.
export function DesignPrototipacao() {
  return (
    <CaseSection id="design-prototipacao" divider>
      <div className={`${styles.column} ${liftStyles.item} lift-trigger`}>
        <div className={styles.labelStack}>
          <p className={styles.label}>DESIGN &amp; PROTOTIPAÇÃO</p>
          <p className={styles.caption}>
            Evoluímos de rascunhos em papel para protótipos de alta fidelidade
            testados em hardware real. O mid-fi não aparece como imagem
            separada aqui: essas decisões foram validadas no protótipo de
            papel e indiretamente no teste do totem.
          </p>
        </div>

        <div className={styles.gallery}>
          <Image
            src="/case/square-self-checkout/design-prototipacao/design-e-prototipacao-v2.png"
            alt="Sequência de design e prototipação: 01 Crazy 8's (esboços em papel), 02 wireframe em papel, 03 protótipo de alta fidelidade com stress test, 04 UI final testada em produto real"
            fill
            sizes="1226px"
          />
        </div>
      </div>
    </CaseSection>
  );
}
