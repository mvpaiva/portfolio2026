import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./Contexto.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma refinamento frame, node 2173:205 "Contexto" — read
// verbatim via the Figma API (not visual-language-specification.md §14,
// which is a stale/different source — see benji-taylor-reference.md).
// No divider/stroke on this block — checked directly, none exists.
export function Contexto() {
  return (
    <CaseSection id="contexto">
      <BlockGrid
        className={liftStyles.item}
        label={
          <LabelStack
            eyebrow="O CONTEXTO"
            question="O que o projeto precisa resolver?"
          />
        }
      >
        <p className={styles.body}>
          O briefing: transformar o Register em autoatendimento de verdade,
          lançar um app complementar que apoie a jornada inteira (não só o
          pagamento), manter o fluxo utilizável por qualquer idade ou perfil
          sem exigir assistência, e manter todo item rastreável. Este case
          acompanha a fase entre pegar o primeiro item e sair pela porta.
          Projeto solo, sem afiliação oficial com a Square.
        </p>
      </BlockGrid>
    </CaseSection>
  );
}
