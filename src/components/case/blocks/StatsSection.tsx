import { Stat } from "../Stat";
import styles from "./StatsSection.module.css";
import spotlightStyles from "../BlockSpotlight.module.css";

// Copy source: Figma node 2173:212 "Stats Section" — a standalone block
// right after Hero, distinct from it. Meta-info block (4 numbers), so it
// keeps the heavier dim+blur spotlight — narrative blocks (Hero,
// Contexto, Pesquisa) use the lighter BlockLift instead, see
// BlockLift.module.css for why.
export function StatsSection() {
  return (
    <div className={styles.section}>
      <div className={`${styles.grid} ${spotlightStyles.item}`}>
        <Stat number="18" label="Entrevistas Profundas" />
        <Stat number="247" label="Respostas de Survey" />
        <Stat number="05" label="Rodadas de Teste" />
        <Stat number="24" label="Pontos de Atrito" />
      </div>
    </div>
  );
}
