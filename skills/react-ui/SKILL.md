---
name: react-ui
description: Guidance for building, redesigning, or reviewing React TSX pages/components, styling, state management, accessibility, and Testing Library coverage.
---

# React UI

Use this skill when building or reviewing React components, pages, layouts, or design system elements.

## Component conventions

- Use function components with hooks. Avoid class components for new code.
- Type props with `interface` or `type`. Prefer `interface` for public component APIs.
- Use `children` prop explicitly when a component renders children.
- Keep components focused: one file per component unless closely related.
- Use `React.memo` sparingly — profile first.

## State management

- Use `useState` for local component state.
- Use `useReducer` for complex state logic.
- For global state, follow the project's chosen library: Redux Toolkit, Zustand, Jotai, or Context.
- Prefer lifting state up over adding global state.
- Use `useEffect` only for synchronization with external systems.

## Styling

- Follow the project's styling approach: CSS Modules, Tailwind, SCSS, CSS-in-JS, or UI library (Ant Design, MUI, etc.).
- Keep styling consistent with the project's design system.
- Use `className` with the project's naming convention.

## Routing

- Use React Router or the project's declared routing library.
- Keep route definitions in a central file or layout.
- Lazy-load route components with `React.lazy` + `Suspense`.

## Testing

- Use Testing Library React for component tests.
- Use `renderWithProviders` or equivalent wrapper that includes providers (store, router, theme).
- Mock external dependencies (API hooks, auth) with `vi.mock` or `jest.mock`.
- Test loading, error, empty, and success states.

## Verification

- Run the project's test command after changes.
- Run the build command for broad page or routing changes.
- Check accessibility: keyboard navigation, focus management, screen reader semantics.
