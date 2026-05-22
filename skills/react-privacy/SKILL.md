---
name: react-privacy
description: React-specific privacy patterns — consent management, cookie banners, analytics opt-in/out, and tracking controls.
---

# React Privacy

Use this skill for React privacy implementation. For generic privacy concepts, see `web-privacy`.

## React patterns

- Implement `<ConsentBanner>` as a React component with equal reject/accept prominence.
- Store consent in `localStorage` with a version key for policy change detection.
- Use `useState` + `useEffect` to gate tracking script loading based on consent.
- Use `useContext` or a store to share consent state across components.
- Strip PII from URLs with `history.replaceState` after processing magic links.

## Reference files

- [`references/consent.md`](references/consent.md) — Consent management.
- [`references/script-loading.md`](references/script-loading.md) — Conditional script loading.
- [`references/data-handling.md`](references/data-handling.md) — Safe data patterns.
