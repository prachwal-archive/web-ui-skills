---
name: project-tooling
description: Tooling guidance for Vite, Vitest, TypeScript, ESLint/Biome, package scripts, path aliases, and build/test tooling.
---

# Project Tooling

Use this skill when configuring or modifying project tooling: build tools, linters, test runners, package management.

## Package manager

- Use the project's declared package manager: `npm`, `pnpm`, or `yarn`.
- Run `install` after changing dependencies.

## Linting and formatting

- Check which tool the project uses: ESLint (flat config), Biome, Prettier, or a combination.
- Linting and formatting are often combined into a single check command.
- Type-checking is typically separate (e.g., `tsc --noEmit`).

## Path aliases

- If the project uses path aliases (e.g., `@/` → `src/`), ensure they're consistent across:
  - `vite.config.ts` or `webpack.config.js` (resolve alias)
  - `tsconfig.json` (compilerOptions.paths)
  - Any other bundler/test config

## Vitest / test config

- Test config may be inline in `vite.config.ts` or in a separate `vitest.config.ts`.
- Common environment: `jsdom` for DOM tests, `node` for Node tests.
- Mock external dependencies as needed for deterministic tests.

## Common commands

| Task | Typical command |
|---|---|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Test (run once) | `npm test` |
| Test (watch) | `npm run test:watch` |
| Lint/format check | `npm run check` or `npm run lint` |
| Type check | `npm run typecheck` or `npm run lint` |
