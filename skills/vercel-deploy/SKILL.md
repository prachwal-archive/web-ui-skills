---
name: vercel-deploy
description: Use when editing Vercel configuration, deployment behavior, SPA fallback routing, environment variable usage, or production build settings.
---

# Vercel Deploy

Read first:

- [`references/deploy-vercel.md`](references/deploy-vercel.md) — Vercel deployment configuration and SPA routing.
- [`references/tooling-vite-vitest.md`](references/tooling-vite-vitest.md) — Vite + Vitest configuration alignment with Vercel.

## Rules

- Build with the project's build command and verify production preview for routing issues.
- Keep browser-exposed variables under `VITE_` only when they are safe to expose.
- Never put secrets in client-side env variables.
- For routing issues, verify refresh behavior on nested routes after build/preview.
