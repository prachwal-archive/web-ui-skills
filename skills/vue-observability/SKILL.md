---
name: vue-observability
description: Vue 3-specific observability — error handling, analytics events, Web Vitals reporting, and error capture patterns.
---

# Vue Observability

Use this skill for Vue 3 observability implementation. For generic observability concepts, see `web-observability`.

## Vue patterns

- Use `onErrorCaptured` in Composition API or `errorCaptured` in Options API for component error capture.
- Use `app.config.errorHandler` for global error capture.
- Use `watch` or watchers to fire analytics events on reactive state changes.
- Use `window.onerror` and `window.onunhandledrejection` for global JS error capture.
- Report Web Vitals via the `web-vitals` library in `onMounted`.
- Use `navigator.sendBeacon()` for telemetry to avoid blocking page unload.

## Reference files

- [`references/error-reporting.md`](references/error-reporting.md) — Error capture patterns.
- [`references/analytics.md`](references/analytics.md) — Typed analytics events.
- [`references/vitals.md`](references/vitals.md) — Web Vitals collection.
