---
name: web-privacy
description: Use when implementing or reviewing consent management, cookie banners, analytics opt-in/out, tracking controls, data minimization, privacy-safe telemetry, and compliance-aware frontend patterns.
---

# Web Privacy Skill (generic)

Use this skill when a web app collects, stores, or transmits user data. For framework-specific implementation patterns, use `react-privacy`, `preact-privacy`, or `vue-privacy`.

## Core goals

- Collect only data the product actually needs for a documented purpose.
- Obtain and respect consent before loading tracking or analytics scripts.
- Give users meaningful controls and honor their choices immediately.
- Keep privacy decisions close to the implementation that acts on them.

## Checklist

- [ ] Analytics and tracking scripts are not loaded before consent is given.
- [ ] Consent is stored persistently (cookie or `localStorage`) and re-checked on each page load.
- [ ] A consent banner or preference center is shown to new visitors before tracking fires.
- [ ] Users can withdraw consent and tracking stops immediately without a full page reload.
- [ ] Functional cookies (session, auth) are treated separately from analytics/tracking cookies.
- [ ] Cookie banner does not use dark patterns: reject must be as easy as accept.
- [ ] `localStorage` and `sessionStorage` do not contain tokens, PII, or sensitive query params.
- [ ] URL query params with PII (e.g. email in magic link tokens) are stripped after use.
- [ ] Source maps uploaded to observability systems are access-controlled.
- [ ] Forms do not send sensitive data in GET parameters.
- [ ] Privacy policy URL is linked from the consent banner and any form that collects personal data.

## Testing focus

- Tracking scripts do not fire before consent is given.
- Revoking consent stops tracking immediately without requiring a reload.
- Reject/decline path is functional and equal to accept.
- PII is not present in URLs, logs, or `localStorage` after the relevant flow.
- Cookie banner does not block keyboard or screen reader access.
- Consent is re-checked correctly on return visits.
