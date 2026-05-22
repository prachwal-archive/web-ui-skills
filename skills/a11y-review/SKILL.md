---
name: a11y-review
description: Use when reviewing web interfaces for accessibility, including WCAG 2.2 mapping, ARIA misuse, keyboard access, focus management, responsive/mobile behavior, and QA findings.
---

# A11y Review Skill

Use this skill for accessibility reviews, QA passes, and compliance-oriented UI checks.

## Review mode

Pick one mode before starting. `blocking-review` is the default.

### blocking-review (default)

Scope: blockers, regressions, broken UX, WCAG failures, missing critical states.
Max findings: 7.
Prioritize:
- keyboard access blockers
- focus visibility failures
- missing accessible names on interactive elements
- invalid ARIA that breaks assistive technology
- color contrast failures for required content
- form error announcement failures

### quality-review

Scope: consistency, polish, responsive refinement, design-system drift.
Max findings: 10.
Use when the user asks for a broader pass. Do not switch to `full-review` on large diffs without asking.

### full-review

Scope: both blocking and quality findings.
Max findings: 12.
Total cap includes every finding. Overflow goes into `backlog_suggestions`, not the main finding list.

## Finding schema

Every finding must include:
- `id` — unique within this review
- `title` — concise description
- `severity`: `blocker | high | medium | low | nit`
- `decision`: `fix_now | backlog | ignore | needs_human`
- `confidence`: `high | medium | low`
- `domain` — `accessibility` for this skill
- `evidence` — concrete observation, not general WCAG education
- `file` — source file path
- `line` or `selector` when available
- `recommended_fix` — actionable suggestion

Default decision mapping:
- `blocker` → `fix_now`
- `high` → `fix_now`
- `medium` → `fix_now` or `needs_human`
- `low` → `backlog`
- `nit` → `ignore` or `backlog`

`blocker` and `high` findings must include concrete evidence. `nit` findings must never block merge.

## Deduplication

Group repeated instances of the same issue into one finding with a `similar_occurrences` array.

Dedupe key: `domain` + `severity` + `file` + `normalized title`.

Example: five buttons missing focus indicators → one finding with `similar_occurrences: [{ file, selector, count }]`.

Merge duplicates across this skill and `web-design-review` when both report the same UI defect.

## Budget

Rank findings by severity, confidence, and user impact. Cut at the mode's max findings. Move overflow to `backlog_suggestions`. Do not expand the budget unless the user explicitly asks.

Include a summary count at the top:
- `blockers`
- `fix_now`
- `backlog`
- `needs_human`
- `ignored_or_nits`

## What to flag

- missing or misleading labels
- non-semantic interactive elements
- inaccessible keyboard flows
- hidden focus or focus traps
- poor reflow or mobile behavior
- misuse of ARIA where native HTML would work
- insufficient contrast, touch size, or motion handling

Do not report general WCAG education as a finding. Report patterns, not every repeated instance.

## Reporting style

- `blocker`: clear WCAG violation that blocks task completion
- `high`: significant barrier but can be worked around
- `medium`: valid issue, lower user impact
- `low`: best-practice gap
- `nit`: enhancement beyond baseline

## Review focus

1. Check semantic HTML first.
2. Verify WCAG 2.2 impacts and map findings to specific success criteria.
3. Review keyboard access, focus visibility, and focus order.
4. Review responsive behavior at mobile widths and zoom/reflow states.
5. Review ARIA only after native semantics have been assessed.
6. Distinguish failures from best-practice issues and enhancements.

## Workflow

1. Identify the page or component role.
2. Review structure and semantics.
3. Review keyboard and focus behavior.
4. Review names, descriptions, and announcements.
5. Review responsive and mobile behavior.
6. Review ARIA usage for correctness and necessity.
7. Review motion, contrast, and text scaling.
8. Summarize findings by severity and standard.

## References

- [references/wcag-22.md](references/wcag-22.md)
- [references/aria-apg.md](references/aria-apg.md)
- [references/responsive-mobile-first.md](references/responsive-mobile-first.md)
- [references/review-checklist.md](references/review-checklist.md)
