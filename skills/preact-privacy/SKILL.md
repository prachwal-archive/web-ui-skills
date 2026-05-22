---
name: preact-privacy
description: Preact-specific privacy patterns — consent management, cookie banners, analytics opt-in/out, and tracking controls.
---

# Preact Privacy

Use this skill for Preact privacy implementation. For generic privacy concepts, see `web-privacy`.

## Preact patterns

- Implement `<ConsentBanner>` as a Preact component with equal reject/accept prominence.
- Store consent in `localStorage` with a version key for policy change detection.
- Use signals (`@preact/signals`) for reactive consent state across components.
- Use `useEffect` to gate tracking script loading based on consent.
- Strip PII from URLs with `history.replaceState` after processing magic links.

## Reference files

- [`references/consent.md`](references/consent.md) — Consent management.
- [`references/script-loading.md`](references/script-loading.md) — Conditional script loading.
- [`references/data-handling.md`](references/data-handling.md) — Safe data patterns.
