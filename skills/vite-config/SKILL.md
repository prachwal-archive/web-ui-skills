---
name: vite-config
description: Use when changing Vite configuration, plugin setup, aliases, env variables and modes, dev proxying, build output, TypeScript paths, or static assets.
---

# Vite Config

Use this skill for Vite configuration work, regardless of the frontend framework (React, Vue, Preact, Svelte, etc.).

## Repo Fit

- Source root and build output (`outDir`) are defined in `vite.config.ts`.
- The appropriate framework plugin is used: `@vitejs/plugin-react`, `@vitejs/plugin-vue`, `@preact/preset-vite`, etc.
- Path aliases in `vite.config.ts` must match `tsconfig.json` `compilerOptions.paths`.

## Env Rules

- Client-exposed values must use `VITE_` prefix.
- Do not expose secrets with `VITE_` — server-only secrets stay out of frontend bundles.
- Declare env types in `src/vite-env.d.ts` or equivalent.
- Vite env values are strings unless explicitly parsed.

## Config Workflow

- Use `defineConfig` directly or a factory function for testability.
- Use absolute filesystem paths for aliases.
- Keep dev proxy paths explicit when proxying to a backend server.

## Build Guidance

- Prefer Vite defaults unless a concrete deployment need requires a custom `build.target`.
- Keep `build.emptyOutDir` intentional when `outDir` is outside the project root.
- Static assets that need no transform go in `public/`; imported assets are transformed by Vite.

## TypeScript

- Update `tsconfig.json` paths when adding or changing aliases.
- Use the project's type-check command (`tsc -b` or `vue-tsc -b`) as a separate step from the Vite build.

## Verification

- Run the project's build command after any config, alias, env, or asset path change.
- Run tests if config-related tests exist.
- For proxy changes, verify with the dev server.
