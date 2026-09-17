import type { Metadata } from "next";
import { Hero } from "@/components/case/blocks/Hero";
import { HeroBanner } from "@/components/case/blocks/HeroBanner";
import { Contexto } from "@/components/case/blocks/Contexto";
import { StatsSection } from "@/components/case/blocks/StatsSection";
import { Pesquisa } from "@/components/case/blocks/Pesquisa";
import { PanoramaCompetitivo } from "@/components/case/blocks/PanoramaCompetitivo";
import { BlueprintCrop } from "@/components/case/blocks/BlueprintCrop";
import { FieldNotes } from "@/components/case/blocks/FieldNotes";
import { Jtbd } from "@/components/case/blocks/Jtbd";
import { DesignPrototipacao } from "@/components/case/blocks/DesignPrototipacao";
import { PrototipacaoTestesFigma } from "@/components/case/blocks/PrototipacaoTestesFigma";
import { OnboardingFilmstrip } from "@/components/case/blocks/OnboardingFilmstrip";
import { Testes } from "@/components/case/blocks/Testes";
import { Solucoes } from "@/components/case/blocks/Solucoes";
import { Resultado } from "@/components/case/blocks/Resultado";
import { ProximosPassos } from "@/components/case/blocks/ProximosPassos";
import { Footer } from "@/components/case/blocks/Footer";
import { GhostMarker } from "@/components/case/GhostMarker";
import { Reveal } from "@/components/case/Reveal";
import { BackLink } from "@/components/case/BackLink";
import { TableOfContents } from "@/components/case/TableOfContents";
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
// All planned blocks are now built (see
// C:\Users\Ma\.claude\plans\functional-yawning-pie.md for the full
// sequencing — not present on every machine, see docs/handoff.md).
//
// Two ghost-markers ("Síntese" before Soluções, "Design" before
// Resultado) were missing until 2026-09-16 — found via the API while
// building Resultado: both sit visible:true in the real tree even
// though their immediate Figma neighbors (Intro das Soluções, Sequência
// do Sistema) are hidden, so it's easy to assume the whole neighborhood
// is skippable. Only "Descoberta" had been added before this fix.
//
// 2026-09-16 (Matheus): the "Design" marker originally sat right before
// Resultado, with no block of its own between them — so its TOC entry
// and "Resultado" scrolled to nearly the same spot. Moved it to sit
// before DesignPrototipacao instead (the block that's actually about
// design/prototyping), and renamed all three mid-page markers to name
// the content a reader is literally looking at (matching their real
// section headings) rather than map Discover/Define/Develop — see
// TableOfContents.tsx for the matching label change.
//
// Spotlight/lift hover effects (dim/blur/lift on mouseover) were removed
// site-wide 2026-09-17 (Matheus): "uma interação calma de scroll entre
// os blocos é o suficiente" — the per-block Reveal (scroll-triggered
// fade-in) below is the only motion cue left between blocks, on both
// mobile and desktop.
export default function SquareSelfCheckoutPage() {
  return (
    <main className={styles.main}>
      <BackLink />
      <TableOfContents />
      <Reveal>
        <Hero />
      </Reveal>
      <Reveal>
        <HeroBanner />
      </Reveal>
      <Reveal>
        <Contexto />
      </Reveal>
      <Reveal>
        <StatsSection />
      </Reveal>
      <GhostMarker id="descoberta">Pesquisa</GhostMarker>
      <Reveal>
        <Pesquisa />
      </Reveal>
      <Reveal>
        <PanoramaCompetitivo />
      </Reveal>
      <Reveal>
        <BlueprintCrop />
      </Reveal>
      <Reveal>
        <FieldNotes />
      </Reveal>
      <Reveal>
        <Jtbd />
      </Reveal>
      <GhostMarker id="design">Testes</GhostMarker>
      <Reveal>
        <DesignPrototipacao />
      </Reveal>
      <Reveal>
        <PrototipacaoTestesFigma />
      </Reveal>
      <Reveal>
        <OnboardingFilmstrip />
      </Reveal>
      <Reveal>
        <Testes />
      </Reveal>
      <GhostMarker id="sintese">Soluções</GhostMarker>
      <Reveal>
        <Solucoes />
      </Reveal>
      <Reveal>
        <Resultado />
      </Reveal>
      <Reveal>
        <ProximosPassos />
      </Reveal>
      <Reveal>
        <Footer />
      </Reveal>
    </main>
  );
}
