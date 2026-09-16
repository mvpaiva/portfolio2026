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
// All 4 images are real, already pasted into Figma by Matheus — pulled
// from the file's live asset URLs (one had a stale/expired cached URL on
// first fetch and came back blank; re-fetched via a fresh node
// screenshot, confirmed correct).
//
// "02 · High-fi" shows repeated "9999" values on purpose — a content
// stress test (worst-case digit count) to confirm the layout holds
// without breaking, not a mistake or unfinished placeholder. Clarified
// inline in the label itself per Matheus 2026-09-16 — a separate note
// line broke the shared horizontal grid across the 4 columns (each
// stage label has to stay a single line for the images below to align).
type Stage = {
  label: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  fit: "cover" | "contain";
};

const STAGES: Stage[] = [
  {
    label: "01 · Crazy 8’s",
    alt: "Foto em preto e branco de mãos esboçando telas em papel durante a dinâmica Crazy 8’s",
    src: "/case/square-self-checkout/banners/crazy8s.png",
    width: 613,
    height: 1366,
    fit: "cover",
  },
  {
    label: "02 · Papel",
    alt: "Wireframe desenhado à mão em papel quadriculado do fluxo de escaneamento",
    src: "/case/square-self-checkout/design-prototipacao/02-papel.png",
    width: 289,
    height: 623,
    fit: "contain",
  },
  {
    label: "02 · High-fi (com stress test)",
    alt: "Protótipo de alta fidelidade da tela Scan & Go, com valores no limite de dígitos pra testar o layout",
    src: "/case/square-self-checkout/design-prototipacao/02-highfi.png",
    width: 786,
    height: 1704,
    fit: "contain",
  },
  {
    label: "03 · UI Design",
    alt: "Foto de teste real: mão segurando uma garrafa de azeite pra escanear o rótulo nutricional",
    src: "/case/square-self-checkout/design-prototipacao/03-ui-design.png",
    width: 786,
    height: 1704,
    fit: "contain",
  },
];

export function DesignPrototipacao() {
  return (
    <CaseSection id="design-prototipacao" divider>
      <div className={`${styles.column} ${liftStyles.item} lift-trigger`}>
        <div className={styles.labelStack}>
          <p className={styles.label}>Design &amp; Prototipação</p>
          <p className={styles.caption}>
            Evoluímos de rascunhos em papel para protótipos de alta fidelidade
            testados em hardware real. O mid-fi não aparece como imagem
            separada aqui: essas decisões foram validadas direto no teste do
            totem, não numa tela isolada.
          </p>
        </div>

        <div className={styles.gallery}>
          {STAGES.map((stage) => (
            <div key={stage.label} className={styles.stage}>
              <p className={styles.stageLabel}>{stage.label}</p>
              <div className={`${styles.imageWrap} ${styles[stage.fit]}`}>
                <Image
                  src={stage.src}
                  alt={stage.alt}
                  width={stage.width}
                  height={stage.height}
                  sizes="(max-width: 768px) 50vw, 289px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CaseSection>
  );
}
