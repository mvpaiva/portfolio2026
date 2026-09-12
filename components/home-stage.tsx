"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";

type PanelKey = "projetos" | "sobre" | "contato";

const NAV_ITEMS: { key: PanelKey; label: string }[] = [
  { key: "projetos", label: "Projetos" },
  { key: "sobre", label: "Sobre" },
  { key: "contato", label: "Contato" },
];

export function HomeStage() {
  const [active, setActive] = useState<PanelKey | null>(null);

  function toggle(key: PanelKey) {
    setActive((current) => (current === key ? null : key));
  }

  return (
    <main className={styles.stage}>
      <div className={styles.header}>
        <div className={styles.logoBlock}>
          <p className={styles.name}>Matheus Vieira</p>
          <p className={styles.role}>Designer de Produto</p>

          <div className={styles.textStage}>
            {active === null && (
              <p key="tagline" className={styles.tagline}>
                Product designer júnior em interação e IA. Procurando vaga
                full-time em São Paulo.
              </p>
            )}

            {active === "projetos" && (
              <p key="projetos" className={styles.panelText}>
                <a href="/case/square-self-checkout">Square Self-Checkout</a>
                <span className={styles.faded}>
                  {" "}
                  — Interação, redução de 40% em erros.{" "}
                </span>
                <a href="/case/essavie">Essavie</a>
                <span className={styles.faded}>
                  {" "}
                  — E-commerce, checkout circular.{" "}
                </span>
                <a href="/case/fireflies-system">Fireflies System</a>
                <span className={styles.faded}> — IA, síntese de reuniões.</span>
              </p>
            )}

            {active === "sobre" && (
              <p key="sobre" className={styles.panelText}>
                18 meses em e-commerce. Converto dados em experiências
                fluidas. Explorando design de IA e interação. Baseado em São
                Paulo.
              </p>
            )}

            {active === "contato" && (
              <p key="contato" className={styles.panelText}>
                <a href="mailto:hello@matheus.com">hello@matheus.com</a>
                {" · "}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                {" · "}
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                  CV
                </a>
              </p>
            )}
          </div>
        </div>

        <nav className={styles.navRevealZone} aria-label="Navegação principal">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  className={styles.navItem}
                  aria-pressed={active === item.key}
                  onClick={() => toggle(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
