---
name: project-tooling
description: Tooling guidance for Vite, Vitest, TypeScript, ESLint/Biome, package scripts, path aliases, and build/test tooling.
---

# Project Tooling

Use this skill when configuring or modifying project tooling: build tools, linters, test runners, package management.

## Package manager

- Use the project's declared package manager: `npm`, `pnpm`, or `yarn`.
- Run `install` after changing dependencies.
- Use `--save-exact` or `^` ranges consistently per project convention.
- Keep `package-lock.json` / `pnpm-lock.yaml` in version control.

## Linting and formatting

- Check which tool the project uses: ESLint (flat config), Biome, Prettier, or a combination.
- Linting and formatting are often combined into a single check command.
- Type-checking is typically separate (e.g., `tsc --noEmit`).
- Configure lint/format/type-check commands in `package.json` scripts for CI.

## Path aliases

- If the project uses path aliases (e.g., `@/` → `src/`), ensure they're consistent across:
  - `vite.config.ts` or bundler config (resolve alias)
  - `tsconfig.json` (compilerOptions.paths)
  - Vitest config (if separate from vite config)
  - Any ESLint import resolver

## Vitest / test config

- Test config may be inline in `vite.config.ts` or in a separate `vitest.config.ts` using `mergeConfig`.
- Common environment: `jsdom` for DOM tests, `node` for Node tests.
- Setup files run before each test file — use for global mocks (matchMedia, ResizeObserver).
- Coverage config: provider (`v8` or `istanbul`), reporter (`text`, `lcov`, `html`), thresholds.

```ts
// vitest.config.ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      thresholds: { statements: 80, branches: 70 },
    },
  },
}))
```

## Common scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "coverage": "vitest run --coverage",
    "lint": "tsc --noEmit",
    "check": "biome check --write",
    "format": "biome format --write",
    "precommit": "npm run check && npm run lint && npm test && npm run build"
  }
}
```

## Debugging tooling issues

- Vite dev server won't start → check port availability, plugin compatibility, Node version.
- Type errors that Vite ignores but `tsc` catches → run `tsc --noEmit` separately.
- Path alias not resolving → check both `vite.config.ts` and `tsconfig.json` `paths`.
- Test can't find DOM APIs → ensure `environment: 'jsdom'` is set in vitest config.
- Coverage too low → adjust `include`/`exclude` patterns, check thresholds.
