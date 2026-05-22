---
name: react-data-fetching
description: React-specific data fetching patterns — RTK Query, TanStack Query, SWR, fetch with hooks, cache invalidation, and optimistic updates.
---

# React Data Fetching

Use this skill for React data fetching implementation. For generic data fetching concepts, see `web-data-fetching`.

## React patterns

- Use the project's chosen data fetching library: RTK Query, TanStack Query, SWR, or plain fetch with hooks.
- Use custom hooks to encapsulate fetch logic and return loading/error/data state.
- Use `AbortController` with `useEffect` cleanup to cancel stale requests.
- For mutations, define cache invalidation or optimistic update strategies.
- Separate transport errors from domain errors in UI state.

## Reference files

- [`references/fetch-patterns.md`](references/fetch-patterns.md) — Core fetch utilities.
- [`references/tanstack-query.md`](references/tanstack-query.md) — TanStack Query v5 patterns.
- [`references/api-contracts.md`](references/api-contracts.md) — Typed API boundaries.
