---
name: preact-content
description: Preact-specific content rendering patterns — CMS HTML sanitization, rich text rendering, empty states, and error pages.
---

# Preact Content

Use this skill for Preact content-heavy page implementation. For generic content concepts, see `web-content`.

## Preact patterns

- Sanitize CMS HTML with DOMPurify before rendering with `dangerouslySetInnerHTML`.
- Use `useEffect` to patch external links (`rel="noopener noreferrer"`, `target="_blank"`).
- Use a reusable `<RichText>` component that wraps DOMPurify sanitization.
- Implement `<EmptyState>` component with `aria-labelledby` and actionable buttons.
- Implement `<NotFoundPage>` and `<ErrorPage>` as route-level fallbacks with navigation.
- Preact's `dangerouslySetInnerHTML` is equivalent to React's — same API.

## Reference files

- [`references/safe-rendering.md`](references/safe-rendering.md) — CMS HTML sanitization.
- [`references/content-schema.md`](references/content-schema.md) — Content type schemas.
- [`references/empty-error-states.md`](references/empty-error-states.md) — Empty states and error pages.
