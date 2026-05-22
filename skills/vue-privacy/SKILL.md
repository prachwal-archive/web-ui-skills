---
name: vue-privacy
description: Vue 3-specific privacy patterns — consent management, cookie banners, analytics opt-in/out, and tracking controls.
---

# Vue Privacy

Use this skill for Vue 3 privacy implementation. For generic privacy concepts, see `web-privacy`.

## Vue patterns

- Implement `<ConsentBanner>` as a Vue component with equal reject/accept prominence.
- Store consent in `localStorage` with a version key for policy change detection.
- Use `reactive()` or Pinia store for global consent state.
- Use `watch` or `onMounted` to gate tracking script loading based on consent.
- Strip PII from URLs with `history.replaceState` after processing magic links.

## Reference files

- [`references/consent.md`](references/consent.md) — Consent management.
- [`references/script-loading.md`](references/script-loading.md) — Conditional script loading.
- [`references/data-handling.md`](references/data-handling.md) — Safe data patterns.
