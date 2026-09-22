import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import { Zoomable } from "../Zoomable";
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
// to a phone width.
//
// Split into two separate images same day (Matheus: "dividi o banner...
// separando as duas técnicas para melhor scroll") — was one flattened
// 1508x648 banner with both proofs side by side; each proof (730x648) now
// scrolls into view as its own unit instead of a single wide banner where
// the second proof only appeared mid-scroll. Each panel renders at 365px
// (native/2), matching the previous banner's 2x-export scale.
const PROOFS = [
  {
    src: "/case/square-self-checkout/testes/tree-testing-r1.png",
    alt: "Resultado real do tree test no Maze: 14 tarefas, maioria com 100% de sucesso direto",
    width: 730,
    height: 648,
  },
  {
    src: "/case/square-self-checkout/testes/card-sorting-r1.png",
    alt: "Resultado real do card sorting: matriz de similaridade completa",
    width: 730,
    height: 648,
  },
];

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
          {PROOFS.map((proof) => (
            <div key={proof.src} className={styles.proof}>
              <Zoomable
                src={proof.src}
                alt={proof.alt}
                width={proof.width}
                height={proof.height}
                sizes="365px"
              />
            </div>
          ))}
        </div>
      </BlockGrid>
    </CaseSection>
  );
}
