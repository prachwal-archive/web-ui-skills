---
name: vue-content
description: Vue 3-specific content rendering patterns — CMS HTML sanitization, rich text rendering, empty states, and error pages.
---

# Vue Content

Use this skill for Vue 3 content-heavy page implementation. For generic content concepts, see `web-content`.

## Vue patterns

- Sanitize CMS HTML with DOMPurify before rendering with `v-html`.
- Use `onMounted` or a watcher to patch external links (`rel="noopener noreferrer"`, `target="_blank"`).
- Use a reusable `<RichText>` component with `v-html` + DOMPurify.
- Implement `<EmptyState>` component with `aria-labelledby` and actionable buttons.
- Implement `<NotFoundPage>` and `<ErrorPage>` as route-level fallbacks with navigation.
- Use `<component :is="...">` for dynamic content blocks from CMS.

## Reference files

- [`references/safe-rendering.md`](references/safe-rendering.md) — CMS HTML sanitization.
- [`references/content-schema.md`](references/content-schema.md) — Content type schemas.
- [`references/empty-error-states.md`](references/empty-error-states.md) — Empty states and error pages.
