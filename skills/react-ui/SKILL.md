---
name: react-ui
description: Guidance for building, redesigning, or reviewing React TSX pages/components, hooks, state management, styling, routing, accessibility, and Testing Library coverage.
---

# React UI

Use this skill when building or reviewing React components, pages, layouts, or design system elements.

## Component conventions

- Use function components with hooks. Avoid class components for new code.
- Type props with `interface` or `type`. Prefer `interface` for public component APIs.
- Use `React.PropsWithChildren` or explicit `children: React.ReactNode` prop.
- Keep components focused: one file per component unless closely related.
- Use `React.memo` sparingly — profile first.
- Use `React.forwardRef` when a component needs to expose a DOM ref to the parent.
- Use `React.useId` for generating accessible unique IDs (avoid random keys).
- Prefer composition over prop flags when a component starts growing into multiple modes.
- Keep presentational components pure; move data fetching and state orchestration up a level.
- Derive values in render when they are cheap and deterministic; do not store derived state.

## Hooks patterns

```tsx
// Custom hook for encapsulating logic
function useHeroData() {
  const { data, isLoading, isError } = useGetHeroDataQuery()
  return { hero: data, loading: isLoading, error: isError }
}

// State with useReducer for complex transitions
type FormState = { name: string; email: string; errors: Record<string, string> }
type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }

function formReducer(state: FormState, action: FormAction): FormState { … }
```

## Common component patterns

- Container/page component: fetch data, map it into props, and handle loading/error branches.
- Presentational component: accept data via props and render with no side effects.
- Form component: own local state, validation, and submit wiring.
- Layout component: compose header/sidebar/footer and keep route content via `children` or `Outlet`.

## State management

- Use `useState` for local component state.
- Use `useReducer` for complex state logic (multi-field forms, wizards).
- For global state, follow the project's chosen library: Redux Toolkit, Zustand, Jotai, Context, or the app's existing store pattern.
- Prefer lifting state up over adding global state.
- Use `useEffect` only for synchronization with external systems — not for derived state.
- Use `useMemo` / `useCallback` only when profiling shows a bottleneck.

## Side effects

- `useEffect` dependencies should be explicit — avoid `[]` unless the effect truly runs once.
- Clean up subscriptions, event listeners, and AbortController in the effect return.
- Use `useLayoutEffect` only when you need synchronous DOM measurement before paint.
- Keep effects focused: one concern per `useEffect`, not a single massive effect.

## Styling

- Follow the project's styling approach: CSS Modules, Tailwind, SCSS, CSS-in-JS, or UI library (Ant Design, MUI, etc.).
- Keep styling consistent with the project's design system.
- Use `className` with the project's naming convention.
- Prefer semantic layout primitives (`main`, `section`, `header`, `nav`, `aside`, `footer`) before absolute positioning.
- For CSS-in-JS, prefer runtime-free solutions (vanilla-extract, Panda CSS) over runtime ones.

## Routing

- Use React Router or the project's declared routing library.
- Keep route definitions in a central file or layout.
- Lazy-load route components with `React.lazy` + `<Suspense>`.
- Use route loaders / actions (React Router v6.4+) for data loading at the route level.

## Testing

- Use Testing Library React for component tests.
- Use `renderWithProviders` or equivalent wrapper that includes providers (store, router, theme).
- Mock external dependencies (API hooks, auth) with `vi.mock` or `jest.mock`.
- Test loading, error, empty, and success states.
- Prefer `screen.getByRole` and `screen.getByLabelText` over test IDs.
- Use `userEvent` over `fireEvent` for more realistic interaction simulation.
- Assert visible outcomes, not implementation details or internal state.
- For complex UI branches, test the smallest component that owns the branch.

## Accessibility

- Use `useRef` + `.focus()` for programmatic focus management after state changes.
- Prefer `<></>` fragments over wrapper `<div>` to avoid polluting landmark structure.
- Declare `aria-live` regions in the root layout, not in leaf components.
- Use `aria-*` props directly on native elements — React supports them natively.
- For modals: trap focus, restore focus on close.

## Verification

- Run the project's test command after changes.
- Run the build command for broad page or routing changes.
- Check accessibility: keyboard navigation, focus management, screen reader semantics.
