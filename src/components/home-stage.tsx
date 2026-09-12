"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className={styles.stage}>
      <div className={styles.header}>
        <div className={styles.logoBlock}>
          <p className={styles.name}>Matheus Paiva</p>
          <p className={styles.role}>Product Designer</p>

          <div className={styles.textStage}>
            <p
              className={`${styles.tagline} ${
                active === null ? styles.visible : styles.hidden
              }`}
              aria-hidden={active !== null}
            >
              Product Designer Júnior focado em UX Research, interação e
              produtos com IA. Disponível para full-time em São{" "}Paulo.
            </p>

            <p
              className={`${styles.panelText} ${
                active === "projetos" ? styles.visible : styles.hidden
              }`}
              aria-hidden={active !== "projetos"}
            >
              <a
                href="/case/square-self-checkout"
                tabIndex={active === "projetos" ? 0 : -1}
              >
                Square
              </a>
              <span className={styles.faded}>
                . App e totem de autoatendimento para{" "}supermercados.
              </span>
            </p>

            <div
              className={`${styles.panelText} ${
                active === "sobre" ? styles.visible : styles.hidden
              }`}
              aria-hidden={active !== "sobre"}
            >
              <p>
                Sou Product Designer Júnior em transição de carreira, com
                formação em Arquitetura e{" "}Urbanismo.
              </p>
              <p>
                Passei os últimos 18 meses gerindo um e-commerce em
                produção, tomando decisões com dados e usuários reais. Hoje
                aplico essa disciplina em pesquisa, traduzindo entrevistas e
                testes em decisões de{" "}interação.
              </p>
            </div>

            <p
              className={`${styles.panelText} ${
                active === "contato" ? styles.visible : styles.hidden
              }`}
              aria-hidden={active !== "contato"}
            >
              Você pode me encontrar no{" "}
              <a
                href="https://www.linkedin.com/in/mvpaiva/"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={active === "contato" ? 0 : -1}
              >
                LinkedIn
              </a>
              , ver meu{" "}
              <a
                href="https://drive.google.com/file/d/1uvIujKmLz8Pi8DUtY6Csqd97fqrKSyDz/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={active === "contato" ? 0 : -1}
              >
                CV
              </a>
              , ou mandar um e-mail pra{" "}
              <a
                href="mailto:mv@mvpaiva.com"
                tabIndex={active === "contato" ? 0 : -1}
              >
                mv@mvpaiva.com
              </a>
              .
            </p>
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
