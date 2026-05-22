---
name: react-forms
description: React-specific form patterns — hooks-based state, controlled/uncontrolled inputs, validation, async submit, and Testing Library tests.
---

# React Forms

Use this skill for React form implementation. For generic form concepts (a11y, validation strategy), see `web-forms`.

## React patterns

- Use controlled components (`useState` + `onChange` + `value`) for most form fields.
- Use `useRef` for uncontrolled inputs when you only need the value on submit.
- Use `useReducer` for complex multi-field forms with interdependent validation.
- For large forms, consider React Hook Form or Formik (or Ant Design `Form` if available).
- Focus the first invalid field after submit with `useRef` + `.focus()`.
- Show submit pending state: disable button, show spinner, use `aria-busy="true"`.

## Testing

- Use Testing Library React: `getByRole`, `getByLabelText`, `fireEvent` or `userEvent`.
- Test: happy path, validation failures, server errors, duplicate submit prevention.
- Use `waitFor` for async assertions.

## Reference files

- [`references/accessible-fields.md`](references/accessible-fields.md) — HTML field patterns (framework-agnostic).
- [`references/validation.md`](references/validation.md) — Validation with Zod (framework-agnostic).
