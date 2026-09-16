import { CaseSection } from "../CaseSection";
import styles from "./Footer.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2173:507 "Footer — Metadados", read verbatim
// via the Figma API (2026-09-16). Real top stroke + asymmetric
// padding (top:64/bottom:128) confirmed via the API — a tight rejoin
// with Próximos Passos above, full breathing room after (last block on
// the page). Label opacity is 50% (rgba(26,26,26,0.5)), not the usual
// 65% accessibility floor used elsewhere — a distinct, dimmer token
// reserved for this block, confirmed directly on the node's fill.
//
// The "Figma · Miro" text in ARQUIVOS is styled UNDERLINE in Figma but
// carries no actual hyperlink (getStyledTextSegments confirms
// hyperlink: null) — old handoff notes claiming real links here were
// stale. Rendered as real links anyway, reusing the same destinations
// already established in Hero.tsx for "Ver no Figma"/"Ver a pesquisa
// completa no Miro": the labels unambiguously mean those two files,
// and every other visited link in this case points somewhere real.
//
// benji-taylor-reference.md names "Footer — Metadados (5 campos)" as
// an item-level ListSpotlight target, but Matheus reviewed it live and
// found the blur+dim between 5 plain label/value pairs unnecessary —
// removed. Only the page-level lift (outer grid, `lift-trigger`) stays.
export function Footer() {
  return (
    <CaseSection id="footer" spacing="tight" spacingBottom="normal" divider>
      <div className={`${styles.grid} ${liftStyles.item} lift-trigger`}>
        <div className={styles.column}>
          <p className={styles.label}>PAPEL</p>
          <p className={styles.value}>Product Designer</p>
        </div>
        <div className={styles.column}>
          <p className={styles.label}>DATA</p>
          <p className={styles.value}>Fev 2026 – Jul 2026</p>
        </div>
        <div className={`${styles.column} ${styles.ferramentas}`}>
          <p className={styles.label}>FERRAMENTAS</p>
          <p className={styles.value}>
            Figma · Miro · Google Forms · Optimal Workshop · Proven by Users · Maze
          </p>
        </div>
        <div className={styles.column}>
          <p className={styles.label}>SETOR</p>
          <p className={styles.value}>Autoatendimento</p>
        </div>
        <div className={styles.column}>
          <p className={styles.label}>ARQUIVOS</p>
          <p className={styles.value}>
            <a
              className={styles.fileLink}
              href="https://www.figma.com/design/UOGBjtsvGNFNs8O8qUSxjk/SquareUp---Matheus-Paiva?node-id=12084-23891"
              target="_blank"
              rel="noopener noreferrer"
            >
              Figma
            </a>
            {" · "}
            <a
              className={styles.fileLink}
              href="https://miro.com/app/board/uXjVHJ5Co14="
              target="_blank"
              rel="noopener noreferrer"
            >
              Miro
            </a>
          </p>
        </div>
      </div>
    </CaseSection>
  );
}
