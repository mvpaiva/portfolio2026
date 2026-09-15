import styles from "./Hero.module.css";

// Copy source: Figma refinamento frame, node 2173:174 "Hero" — read
// verbatim via the Figma API. (docs/visual-language-specification.md §14
// was NOT used here — it turned out to be sourced from a different,
// stale node and its copy doesn't match this frame.)
export function Hero() {
  return (
    <header className={styles.section}>
      <p className={styles.eyebrow}>Estudo de caso</p>
      <h1 className={styles.headline}>Pulando a fila do caixa.</h1>
      <p className={styles.subhead}>
        Um redesign de 6 meses do autoatendimento do Square Register e de um
        app complementar, do estacionamento até o portão de saída.
      </p>

      <div className={styles.metaGrid}>
        <div>
          <p className={styles.metaLabel}>Papel</p>
          <p className={styles.metaValue}>Product Designer (solo)</p>
        </div>
        <div>
          <p className={styles.metaLabel}>Duração</p>
          <p className={styles.metaValue}>Fev–Jul 2026</p>
        </div>
        <div>
          <p className={styles.metaLabel}>Ferramentas</p>
          <p className={styles.metaValue}>
            Figma · Miro · Google Forms · Optimal Workshop · Treejack · Maze
          </p>
        </div>
        <div>
          <p className={styles.metaLabel}>Setor</p>
          <p className={styles.metaValue}>Autoatendimento</p>
        </div>
      </div>

      <div className={styles.links}>
        <a
          className={styles.link}
          href="https://www.figma.com/design/UOGBjtsvGNFNs8O8qUSxjk/SquareUp---Matheus-Paiva?node-id=12084-23891"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver no Figma
        </a>
        <span className={styles.separator}>·</span>
        <a
          className={styles.link}
          href="https://miro.com/app/board/uXjVHJ5Co14="
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver a pesquisa completa no Miro
        </a>
      </div>
    </header>
  );
}
