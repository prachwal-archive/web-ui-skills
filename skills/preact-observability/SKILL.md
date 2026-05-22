---
name: preact-observability
description: Preact-specific observability — Error Boundaries, analytics events, Web Vitals reporting, and error capture patterns.
---

# Preact Observability

Use this skill for Preact observability implementation. For generic observability concepts, see `web-observability`.

## Preact patterns

- Use a class component `ErrorBoundary` with `componentDidCatch` for runtime error capture.
- Wrap the app root in the boundary, with per-route fallbacks for degraded UX.
- Use `useEffect` or signals to fire analytics events on state/route changes.
- Use `window.onerror` and `window.onunhandledrejection` for global error capture.
- Report Web Vitals via the `web-vitals` library in `useEffect`.
- Use `navigator.sendBeacon()` for telemetry to avoid blocking page unload.

## Reference files

- [`references/error-reporting.md`](references/error-reporting.md) — Error capture patterns.
- [`references/analytics.md`](references/analytics.md) — Typed analytics events.
- [`references/vitals.md`](references/vitals.md) — Web Vitals collection.
