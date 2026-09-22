import Image from "next/image";
import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./Testes.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2173:413 "Testes", re-synced 2026-09-17 after
// Matheus's full text refinement pass. Both proof-image labels
// ("Resultado real — X") are baked into the flattened banner image, not
// separate <p> tags.
//
// "Achado principal" callout: exists in the Figma source but Matheus
// asked to cut it 2026-09-17 right after it was added — not rendered.
//
// Horizontal-scroll treatment added 2026-09-22 (Matheus) — same pattern
// as Design e Prototipação/Onboarding: this banner packs fine print (tree
// test percentages, a full similarity matrix) that goes illegible shrunk
// to a phone width. Fixed at 754px, matching its existing desktop render
// size (native 1508x648 is already a 2x export of that), so mobile reads
// exactly as sharp as desktop instead of shrinking further.
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
          5 rodadas de teste usando Maze e testes presenciais moderados e
          não-moderados: 1 protótipo em papel, 2 rodadas mid-fi no totem, 2
          rodadas hi-fi no app e no totem. Cada rodada revalidava as decisões
          da rodada anterior antes de avançar de fidelidade.
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

        <div className={styles.proofsScroll}>
          <div className={styles.proofs}>
            <Image
              src="/case/square-self-checkout/testes/provas-rodada1-tree-testing.png"
              alt="Provas reais dos testes: resultado do tree test no Maze (14 tarefas, maioria com 100% de sucesso direto) e matriz de similaridade do card sorting"
              fill
              sizes="(max-width: 900px) 754px, 754px"
            />
          </div>
        </div>
      </BlockGrid>
    </CaseSection>
  );
}
