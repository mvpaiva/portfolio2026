import { Stat } from "../Stat";
import styles from "./StatsSection.module.css";
import spotlightStyles from "../BlockSpotlight.module.css";

// Copy source: Figma node 2173:212 "Stats Section". Pontos de Atrito
// corrected 24 -> 23 (Matheus, 2026-09-17 text refinement pass).
export function StatsSection() {
  return (
    <div className={styles.section}>
      <div className={`${styles.grid} ${spotlightStyles.item} spotlight-trigger`}>
        <Stat countUp number="18" label="Entrevistas Profundas" />
        <Stat countUp number="247" label="Respostas de Survey" />
        <Stat countUp number="05" label="Rodadas de Teste" />
        <Stat countUp number="23" label="Pontos de Atrito" />
      </div>
    </div>
  );
}
