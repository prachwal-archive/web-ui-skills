---
name: preact-data-fetching
description: Preact-specific data fetching patterns — fetch with signals, SWR, TanStack Query, cache invalidation, and optimistic updates.
---

# Preact Data Fetching

Use this skill for Preact data fetching implementation. For generic data fetching concepts, see `web-data-fetching`.

## Preact patterns

- Use signals (`@preact/signals`) to store fetch state reactively — bind UI directly to signals.
- Use custom hooks to encapsulate fetch logic and return loading/error/data state.
- Use `AbortController` with `useEffect` cleanup to cancel stale requests.
- For mutations, define cache invalidation or optimistic update strategies.
- Preact's hooks API is compatible with React's — TanStack Query, SWR work the same.

## Reference files

- [`references/fetch-patterns.md`](references/fetch-patterns.md) — Core fetch utilities.
- [`references/tanstack-query.md`](references/tanstack-query.md) — TanStack Query v5 patterns.
- [`references/api-contracts.md`](references/api-contracts.md) — Typed API boundaries.
