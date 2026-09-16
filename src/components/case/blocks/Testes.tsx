import Image from "next/image";
import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./Testes.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2173:413 "Testes", read verbatim via the
// Figma API (2026-09-16). Both em dashes in the body paragraph
// (authorial copy, not a quote) restructured with parentheses; same fix
// applied to both proof-image labels ("Resultado real — X" → "Resultado
// real: X"). Both proof images are real Maze exports (tree testing +
// card sorting), downloaded from Figma's live asset URLs.
const STATS = [
  { number: "5", label: "Rodadas de teste" },
  { number: "57", label: "Telas hi-fi testadas" },
  { number: "16", label: "Fluxos validados" },
];

export function Testes() {
  return (
    <CaseSection id="testes" divider>
      <BlockGrid
        className={liftStyles.item}
        label={<LabelStack eyebrow="OS TESTES" question="Como validamos antes de decidir?" />}
      >
        <p className={styles.body}>
          5 rodadas de teste (1 protótipo em papel, 2 rodadas mid-fi no totem,
          2 rodadas hi-fi no app e no totem), usando Maze e testes
          presenciais. Cada rodada revalidava as decisões da rodada anterior
          antes de avançar de fidelidade.
        </p>

        <div className={styles.statsRow}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <p className={styles.footnote}>
          Benchmarking de acessibilidade WCAG AA em todas as rodadas hi-fi.
        </p>

        <div className={styles.proofs}>
          <div className={styles.proof}>
            <p className={styles.proofLabel}>Resultado real: Tree Testing</p>
            <div className={`${styles.proofImage} ${styles.proofImagePadded}`}>
              <div className={styles.proofImageInner}>
                <Image
                  src="/case/square-self-checkout/testes/tree-testing.png"
                  alt="Resultado do tree test no Maze: 14 tarefas, a maioria com 100% de sucesso direto"
                  fill
                  sizes="(max-width: 768px) 100vw, 589px"
                />
              </div>
            </div>
          </div>

          <div className={styles.proof}>
            <p className={styles.proofLabel}>Resultado real: Card Sorting</p>
            <div className={`${styles.proofImage} ${styles.proofImageContain}`}>
              <div className={styles.proofImageInner}>
                <Image
                  src="/case/square-self-checkout/testes/card-sorting.png"
                  alt="Matriz de similaridade do card sorting no Maze, mostrando os agrupamentos de categorias que os usuários fizeram"
                  fill
                  sizes="(max-width: 768px) 100vw, 589px"
                />
              </div>
            </div>
          </div>
        </div>
      </BlockGrid>
    </CaseSection>
  );
}
