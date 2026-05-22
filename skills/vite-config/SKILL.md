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
- Keep the config small and declarative; if a helper grows, extract it into a local function.
- Prefer defaults unless the repo has a concrete reason to override them.

## Common config patterns

```ts
// Basic React setup
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

### Path aliases

- Configure aliases in `resolve.alias` in vite config.
- Mirror the same aliases in `tsconfig.json` under `compilerOptions.paths`.
- Use absolute filesystem paths with `resolve()` or `path.resolve()`.

### Multiple plugins

```ts
plugins: [
  react(),
  svgr(),          // SVG as React components
  checker({ typescript: true }),  // type-check in dev
]
```

### Dev server and preview

- Use `server.proxy` for local backend/API calls.
- Use `preview.port` only if the deployment preview workflow needs it.
- Keep `base` aligned with the deployed subpath if the app is not served from `/`.

## Env Rules

- Client-exposed values must use `VITE_` prefix.
- Do not expose secrets with `VITE_` — server-only secrets stay out of frontend bundles.
- Declare env types in `src/vite-env.d.ts` or equivalent.
- Vite env values are strings unless explicitly parsed.
- Access via `import.meta.env.VITE_API_URL`.

```ts
// src/vite-env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}
```

## Config Workflow

- Use `defineConfig` directly or a factory function for testability.
- Use `mergeConfig` (from `vitest/config`) when extending vite config for test settings.
- Keep dev proxy paths explicit when proxying to a backend server.

```ts
server: {
  proxy: {
    '/api': { target: 'http://localhost:3001', changeOrigin: true },
  },
}
```

## Build Guidance

- Prefer Vite defaults unless a concrete deployment need requires a custom `build.target`.
- Keep `build.emptyOutDir` intentional when `outDir` is outside the project root.
- Static assets that need no transform go in `public/`; imported assets are transformed by Vite.
- Code-split with `build.rollupOptions.output.manualChunks` for large dependencies.
- Treat `build.sourcemap` as a deployment decision, not a default.
- Prefer explicit chunk names when debugging bundle growth.

## TypeScript

- Update `tsconfig.json` paths when adding or changing aliases.
- Use the project's type-check command (`tsc -b` or `vue-tsc -b`) as a separate step from the Vite build.
- Enable `vite.checker` plugin or run type-check in CI, not during dev.
- If the Vite config references `import.meta.env`, keep typings in sync.
- If the project uses tests, ensure Vitest config imports the same alias setup as Vite.

## Verification

- Run the project's build command after any config, alias, env, or asset path change.
- Run tests if config-related tests exist.
- For proxy changes, verify with the dev server.
- Check that `npm run dev` starts without errors after config changes.
