import Image from "next/image";
import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./Testes.module.css";

// Copy source: Figma node 2173:413 "Testes", re-synced 2026-09-17 after
// Matheus's full text refinement pass. Both proof-image labels
// ("Resultado real — X") are baked into the flattened banner image, not
// separate <p> tags.
//
// "Achado principal" callout (added 2026-09-17, was missing from the
// first build entirely): a bordered box sitting between the footnote
// and the proof banner — ink 4% fill, 1px ink-100% border, no radius.
const STATS = [
  { number: "5", label: "Rodadas de teste" },
  { number: "57", label: "Telas hi-fi testadas" },
  { number: "16", label: "Fluxos validados" },
];

export function Testes() {
  return (
    <CaseSection id="testes" divider>
      <BlockGrid
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

        <div className={styles.finding}>
          <p className={styles.findingLabel}>Achado principal</p>
          <p className={styles.findingText}>
            Cada rodada validava a anterior antes de avançar de fidelidade —
            as 5 soluções finais vieram de decisões já testadas, não de
            suposições.
          </p>
        </div>

        <div className={styles.proofs}>
          <Image
            src="/case/square-self-checkout/testes/provas-rodada1-tree-testing.png"
            alt="Provas reais dos testes: resultado do tree test no Maze (14 tarefas, maioria com 100% de sucesso direto) e matriz de similaridade do card sorting"
            fill
            sizes="(max-width: 768px) 100vw, 754px"
          />
        </div>
      </BlockGrid>
    </CaseSection>
  );
}
