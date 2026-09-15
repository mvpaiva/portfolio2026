import { Stat } from "../Stat";
import styles from "./StatsSection.module.css";

// Copy source: Figma node 2173:212 "Stats Section" — a standalone block
// right after Hero, distinct from it.
export function StatsSection() {
  return (
    <div className={styles.section}>
      <div className={styles.grid}>
        <Stat number="18" label="Entrevistas Profundas" />
        <Stat number="247" label="Respostas de Survey" />
        <Stat number="05" label="Rodadas de Teste" />
        <Stat number="24" label="Pontos de Atrito" />
      </div>
    </div>
  );
}
