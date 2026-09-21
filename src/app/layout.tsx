import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["300"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matheus Paiva | Product Designer Júnior",
  description:
    "Product Designer Júnior focado em UX Research, interação e produtos com IA. Portfólio de projetos em UX/UI, pesquisa e design de produtos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${instrumentSans.variable}`}
    >
      <head>
        <meta name="view-transition" content="same-origin" />
      </head>
      <body>{children}</body>
    </html>
  );
}
