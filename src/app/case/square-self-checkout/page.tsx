import type { Metadata } from "next";
import { Hero } from "@/components/case/blocks/Hero";
import { HeroBanner } from "@/components/case/blocks/HeroBanner";
import { Contexto } from "@/components/case/blocks/Contexto";
import { StatsSection } from "@/components/case/blocks/StatsSection";
import { Pesquisa } from "@/components/case/blocks/Pesquisa";
import { GhostMarker } from "@/components/case/GhostMarker";
import { Reveal } from "@/components/case/Reveal";
import { BackLink } from "@/components/case/BackLink";
import { BlockSpotlight } from "@/components/case/BlockSpotlight";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Square Self-Checkout — Matheus Paiva",
  description:
    "Redesign de 6 meses do autoatendimento do Square Register e de um app complementar, do estacionamento até o portão de saída.",
};

// Deliberately not rendered — hidden in the source Figma (live read,
// refinamento frame 2173:172, 2026-09-15):
// - Metodologia (Double Diamond)               node visible:false
// - Intro das Soluções                         node visible:false, empty instance
// - Sequência do Sistema (Escaneamento ao Pagamento)  node visible:false
// - footer.py-40                               node visible:false
//
// Still pending, built as this session's budget allows (see
// C:\Users\Ma\.claude\plans\functional-yawning-pie.md for the full
// sequencing): Panorama Competitivo/Totens no dia a dia, Blueprint Crop,
// Field Notes, JTBD, Design e Prototipação, Prototipação & Testes (Figma),
// Onboarding Filmstrip, Testes, Solução 1–5, Resultado, Próximos Passos,
// Footer, TableOfContents.
export default function SquareSelfCheckoutPage() {
  return (
    <main className={`${styles.main} spotlightGroup`}>
      <BackLink />
      <BlockSpotlight>
        <Reveal>
          <Hero />
        </Reveal>
      </BlockSpotlight>
      <BlockSpotlight>
        <Reveal>
          <HeroBanner />
        </Reveal>
      </BlockSpotlight>
      <BlockSpotlight>
        <Reveal>
          <Contexto />
        </Reveal>
      </BlockSpotlight>
      <BlockSpotlight>
        <Reveal>
          <StatsSection />
        </Reveal>
      </BlockSpotlight>
      <BlockSpotlight>
        <GhostMarker>Descoberta</GhostMarker>
      </BlockSpotlight>
      <BlockSpotlight>
        <Reveal>
          <Pesquisa />
        </Reveal>
      </BlockSpotlight>
    </main>
  );
}
