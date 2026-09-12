# Portfólio — Matheus Vieira

Portfólio pessoal, Next.js (App Router) + CSS puro (sem framework de utilitários),
fontes via `next/font/google` (Fraunces + Instrument Sans), preparado para View
Transitions API. Deploy alvo: Vercel.

## Estrutura

```
app/                  rotas (App Router)
  layout.tsx          fontes, metadata, <meta name="view-transition">
  globals.css         tokens de design (cor, spacing, radius) e reset
  page.tsx            rota "/" — home
  page.module.css     estilos da home
components/           componentes de UI compartilhados
docs/                 specs de planejamento (ver docs/handoff.md primeiro)
```

## Documentação do projeto

Antes de mexer no design ou no conteúdo, leia
[docs/handoff.md](docs/handoff.md) — é o ponto de entrada que explica o
resto dos documentos de spec e o estado atual das decisões.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Deploy

Vercel (recomendado — zero-config para Next.js):
[Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
