import Image from "next/image";
import { Stat } from "../Stat";
import styles from "./Hero.module.css";

// Copy source: docs/visual-language-specification.md §14, block 01 · Hero
// (confirmed final, v3, 2026-09-13) — no fabricated numbers.
export function Hero() {
  return (
    <header className={styles.section}>
      <p className={styles.eyebrow}>SELF-CHECKOUT REDESIGN · SQUARE</p>
      <h1 className={styles.headline}>Pulando a fila do caixa.</h1>
      <p className={styles.subhead}>
        Um redesign de 6 meses do autoatendimento do Square Register e de um
        app complementar — do estacionamento até o portão de saída. Só o fix
        de identificação de produtos levou a taxa de erro de 40% para 0%.
      </p>

      <div className={styles.stats}>
        <Stat number="18" label="Entrevistas" />
        <Stat number="247" label="Respostas de survey" />
        <Stat number="5" label="Rodadas de teste" />
        <Stat number="24" label="Pontos de atrito" />
      </div>

      <div className={styles.metadata}>
        <span>PAPEL — Product Designer (solo)</span>
        <span>DURAÇÃO — Fev–Jul 2026</span>
        <span>FERRAMENTAS — Figma · Miro · Treejack · Maze</span>
        <span>SETOR — Autoatendimento</span>
      </div>

      <Image
        src="/case/square-self-checkout/banners/hero.png"
        alt="Composição do redesign do autoatendimento Square: totem e app lado a lado"
        width={1489}
        height={746}
        priority
        className={styles.banner}
        sizes="100vw"
      />
    </header>
  );
}
