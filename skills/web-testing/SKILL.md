---
name: web-testing
description: Use when designing or writing web UI tests, including unit tests, component tests, integration tests, and end-to-end tests.
---

# Web Testing Skill

Use this skill when you need a practical test strategy for a web app. Check the project's actual test tooling first (Vitest, Jest, Playwright, Testing Library, etc.) and adapt accordingly.

## Core principles

1. Test user behavior, not implementation details.
2. Put the right assertion at the right layer: unit, component, integration, or E2E.
3. Prefer stable locators based on role, label, text, or test IDs.
4. Keep tests deterministic and isolate external dependencies.
5. Cover the critical paths first, then expand to edge cases.
6. Treat flaky tests as defects in the test design.

## Workflow

1. Identify the critical flows: sign-in, sign-up, checkout, edit/save, search, navigation, error handling.
2. Choose the minimum test layer that proves the behavior.
3. Use the project's test runner and utilities (Testing Library, Playwright, etc.).
4. Mock the network or API layer only when the real dependency makes the test too slow or unstable.
5. Run tests in CI.

## Practical rules

- Prefer `getByRole`, `getByLabelText`, and similar user-facing queries.
- Keep assertions tied to visible outcomes.
- Avoid brittle timing assumptions.
- Use `import type` for type-only imports in test files.
- Each source file should have a companion test file.
- Exceptions: type definitions (`.d.ts`), config files, barrel re-exports.

## Testing patterns by layer

### Unit / component tests
- Use the project's unit test framework (Vitest, Jest).
- For UI components, use Testing Library (React, Preact, Vue, etc.).
- Mock hooks, API calls, or stores as needed.
- Test loading, error, empty, and success states.

### End-to-end tests
- Use Playwright, Cypress, or the project's chosen E2E tool.
- Test critical user journeys end-to-end.
- Run across supported browsers.

## Verification

- Run the project's test command before committing.
- Check coverage thresholds if configured.
