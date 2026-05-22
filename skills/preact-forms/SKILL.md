---
name: preact-forms
description: Preact-specific form patterns — signal-based state, controlled inputs, validation, async submit, and Testing Library tests.
---

# Preact Forms

Use this skill for Preact form implementation. For generic form concepts (a11y, validation strategy), see `web-forms`.

## Preact patterns

- Use signals (`@preact/signals`) for reactive form state — bind `value` and `onInput` directly from signals.
- Use `useRef` for uncontrolled inputs when you only need the value on submit.
- For large forms, consider a form library or reducer pattern.
- Focus the first invalid field after submit with `useRef` + `.focus()`.
- Show submit pending state: disable button, show spinner, use `aria-busy="true"`.
- Signal-based submit handler prevents duplicate submissions naturally.

## Testing

- Use Testing Library Preact: `getByRole`, `getByLabelText`, `fireEvent` or `userEvent`.
- Test: happy path, validation failures, server errors, duplicate submit prevention.
- Use `waitFor` for async assertions.

## Reference files

- [`references/accessible-fields.md`](references/accessible-fields.md) — HTML field patterns (framework-agnostic).
- [`references/validation.md`](references/validation.md) — Validation with Zod (framework-agnostic).
