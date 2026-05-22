---
name: react-a11y
description: Use when designing, implementing, testing, or reviewing accessibility in React apps — semantic HTML, ARIA, keyboard flow, focus management, forms, contrast, motion, responsive behavior, or WCAG 2.2 concerns.
---

# React Accessibility

Use this skill for accessibility work in React frontend applications.

## Baseline

- Treat WCAG 2.2 AA as the practical target unless the user specifies another level.
- Start with semantic HTML before ARIA.
- Use ARIA to add missing semantics, not to override native elements that already work.
- Preserve visible focus indicators and logical keyboard order.
- Check both light and dark themes when color changes are involved.

## Semantic Structure

- Each page should have one meaningful `<h1>`.
- Use landmarks intentionally: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`.
- Give icon-only buttons an accessible name with `aria-label` or visible text.
- Use real `<button>` for actions and `<a>` for navigation.
- Associate form controls with `<label>`.
- Use `<fieldset>` and `<legend>` for grouped controls.

## Keyboard And Focus

- All interactive controls must be reachable and operable by keyboard.
- Focus order should match visual and reading order.
- Do not remove outlines unless replacing them with an equally visible focus style.
- Manage focus after route changes, dialogs, drawers, and destructive confirmations.
- Escape should close dismissible overlays.
- Avoid keyboard traps; if focus is trapped in a modal, restore focus on close.

## ARIA Rules

- Prefer native controls over custom widgets.
- Do not add `role="button"` to non-button elements unless keyboard handling and focus are fully implemented.
- Keep `aria-expanded`, `aria-controls`, `aria-current`, `aria-invalid`, `aria-describedby` synchronized with visible state.
- Do not hide focusable content with `aria-hidden="true"`.
- Use live regions sparingly for async status changes.

## React-Specific Patterns

- Use `useRef` + `.focus()` for programmatic focus management after state changes.
- Prefer `<></>` fragments over wrapper `<div>` to avoid polluting landmark structure.
- Declare `aria-live` regions in the root layout, not in leaf components that mount/unmount.
- Use `React.lazy` + `Suspense` — ensure fallback content is accessible.
- For modals: trap focus with a library or manual implementation, restore focus on close.
- Use `ErrorBoundary` (class component with `componentDidCatch`) for runtime error handling.
- Pass `aria-*` props directly to native elements — React supports them natively.

## Review Checklist

- Can the main workflow be completed with keyboard only?
- Is the current page and active navigation understandable to a screen reader?
- Are form errors announced and tied to fields?
- Are loading, empty, error, and success states perceivable?
- Does focus remain visible and predictable after interaction?
- Do both light and dark themes preserve contrast?
- Does the layout work at mobile width and with zoomed text?

## Verification

- Use unit tests for conditional labels, ARIA state, and accessibility behavior.
- Use browser verification for focus order, tab stops, theme contrast, and responsive layout.
- Integrate axe-core in CI or test pipeline for automated checks.
