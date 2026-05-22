---
name: vue-data-fetching
description: Vue 3-specific data fetching patterns — reactive fetch, TanStack Query, Pinia, cache invalidation, and optimistic updates.
---

# Vue Data Fetching

Use this skill for Vue 3 data fetching implementation. For generic data fetching concepts, see `web-data-fetching`.

## Vue patterns

- Use `ref()` / `reactive()` for fetch state, `onMounted` + `watch` to trigger fetches.
- Use TanStack Query (vue-query) or Pinia ORM for server cache management.
- Use `AbortController` + `onBeforeUnmount` or `watch` cleanup to cancel stale requests.
- Use Pinia stores for global cache when not using a dedicated query library.
- Separate transport errors from domain errors in UI state.

## Reference files

- [`references/fetch-patterns.md`](references/fetch-patterns.md) — Core fetch utilities.
- [`references/tanstack-query.md`](references/tanstack-query.md) — TanStack Query v5 patterns.
- [`references/api-contracts.md`](references/api-contracts.md) — Typed API boundaries.
