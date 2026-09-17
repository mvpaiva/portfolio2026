import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./Pesquisa.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma refinamento frame, node 2173:237 "Pesquisa" —
// re-synced 2026-09-17 after Matheus's full text refinement pass
// (third observation swapped from the Pix stat to the weighing-scale
// pain point, matching Field Notes' updated chip list; quote rewritten
// without a named attribution — kept verbatim, em dash included, since
// it's transcribed research language, not copy we authored).
const OBSERVATIONS = [
  "Cada olhada para longe da câmera para confirmar um item fazia a pessoa perder o fluxo e se reencontrar.",
  "A verificação de idade assistida por funcionário acontecia à vista de toda a fila atrás do cliente.",
  "Usuários travavam na balança por não saber como pesar, confiar no peso ou validar o preço.",
];

export function Pesquisa() {
  return (
    <CaseSection id="pesquisa">
      <BlockGrid
        className={liftStyles.item}
        label={
          <LabelStack
            eyebrow="A PESQUISA"
            question="18 conversas, 3 redes de varejo e um tema que não parava de se repetir"
          />
        }
      >
        <p className={styles.body}>
          Investigamos o comportamento de compra em horários de pico para
          entender por que usuários experientes ainda cometiam erros
          básicos durante o checkout em lojas e supermercados. A pesquisa
          revelou que a carga cognitiva não vinha da interface em si, mas
          da ansiedade da fila.
        </p>

        <ul className={styles.list}>
          {OBSERVATIONS.map((item) => (
            <li key={item} className={styles.listItem}>
              <span className={styles.bullet}>/</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className={styles.quote}>
          &quot;Na busca manual de códigos de produtos soltos, clientes
          desistiam, pediam ajuda e, em alguns casos, abandonavam o
          produto.&quot;
        </p>

        <a className={styles.link} href="#solucao-1">
          Ver soluções: escaneie sem parar
        </a>
      </BlockGrid>
    </CaseSection>
  );
}
