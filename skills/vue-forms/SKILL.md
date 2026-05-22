---
name: vue-forms
description: Vue 3-specific form patterns — v-model, reactive state, validation, async submit, and Vue Test Utils tests.
---

# Vue Forms

Use this skill for Vue 3 form implementation. For generic form concepts (a11y, validation strategy), see `web-forms`.

## Vue patterns

- Use `v-model` for two-way binding on form inputs.
- Use `reactive()` or `ref()` for form state in Composition API.
- Use `watch` for cross-field validation.
- Use template refs (`ref` on `<input>`) + `.focus()` for focus management after submit.
- Show submit pending state: disable button, show spinner, use `:aria-busy="true"`.
- For large forms, consider VeeValidate or vuelidate.

## Testing

- Use Vue Test Utils + `@testing-library/vue`: `getByRole`, `getByLabelText`.
- Use `await wrapper.find('form').trigger('submit')` for submit flows.
- Test: happy path, validation failures, server errors, duplicate submit prevention.

## Reference files

- [`references/accessible-fields.md`](references/accessible-fields.md) — HTML field patterns (framework-agnostic).
- [`references/validation.md`](references/validation.md) — Validation with Zod (framework-agnostic).
