import { Stat } from "../Stat";
import styles from "./StatsSection.module.css";

// Copy source: Figma node 2173:212 "Stats Section". Pontos de Atrito
// corrected 24 -> 23 (Matheus, 2026-09-17 text refinement pass).
export function StatsSection() {
  return (
    <div className={styles.section}>
      <div className={styles.grid}>
        <Stat number="18" label="Entrevistas Profundas" />
        <Stat number="247" label="Respostas de Survey" />
        <Stat number="05" label="Rodadas de Teste" />
        <Stat number="23" label="Pontos de Atrito" />
      </div>
    </div>
  );
}
