# Repository Improvement Plan

## Larger Changes

### 1. Pick One Package Manager

Files:

- [package.json](../package.json)
- [package-lock.json](../package-lock.json)
- [.gitlab-ci.yml](../.gitlab-ci.yml)
- [.github/workflows/npm-publish.yml](../.github/workflows/npm-publish.yml)
- [README.md](../README.md)
- [CONTRIBUTING.md](../CONTRIBUTING.md)

Plan:

- [x] Confirm npm is the canonical package manager for this repo.
- [x] Remove `pnpm-lock.yaml` if npm remains canonical.
- [x] Search docs and instructions for `pnpm` and replace stale commands with npm equivalents.
- [ ] Keep [package-lock.json](../package-lock.json) updated with `npm install --package-lock-only` after dependency changes.
- [ ] Ensure CI uses only `npm ci`, `npm test`, and npm scripts.

Validation:

- [x] `npm ci`
- [x] `npm test`
- [x] `npm run check-md-refs`
- [x] `npm pack --dry-run`

Done when:

- There is one lockfile, CI uses one package manager, and docs no longer give conflicting install/test commands.

### 2. Harden Destructive Overlay Operations

Files:

- [bin/install.js](../bin/install.js)
- [bin/mcp.mjs](../bin/mcp.mjs)
- [tests/install.test.js](../tests/install.test.js)
- [tests/mcp.test.mjs](../tests/mcp.test.mjs)
- [README.md](../README.md)

Plan:

- [x] Add `assertSafePath()` / `safeRmSync()` helper in [bin/install.js](../bin/install.js) that validates deletion targets before every `fs.rmSync`.
- [x] Allow deletion only inside resolved tool skills directories, known overlay roots, and `os.tmpdir()`.
- [x] Reject empty paths, filesystem roots, home directory roots, and paths outside expected parent directories.
- [ ] Replace direct delete-and-copy flows with staging directories where practical (covered by #4 atomic promote).
- [x] Return clear errors through MCP instead of throwing raw filesystem failures (safeRmSync throws descriptive Error).
- [ ] Document overwrite behavior in [README.md](../README.md).

Validation:

- [x] Add 4 unit tests for rejected dangerous paths (empty, root, outside, accepted temp).
- [x] Existing integration tests cover normal install, remove, sync, and promote paths (59/59 pass).
- [x] `npm test`

Done when:

- Every destructive operation has target validation and test coverage for both accepted and rejected paths.

### 3. Add Explicit Overwrite Or Dry-Run Controls To `sync_overlays`

Files:

- [bin/install.js](../bin/install.js)
- [bin/mcp.mjs](../bin/mcp.mjs)
- [tests/install.test.js](../tests/install.test.js)
- [tests/mcp.test.mjs](../tests/mcp.test.mjs)
- [README.md](../README.md)

Plan:

- [x] Extend `syncOverlaySources()` with `dryRun` and `overwrite` options.
- [x] Make dry-run return destination, source roots, skills, groups, and replace counts without writing files.
- [x] Require `overwrite: true` before replacing an existing overlay directory.
- [x] Add MCP input schema fields for `dryRun` and `overwrite`.
- [x] Update MCP prompt/resource guidance to recommend dry-run before overwrite.
- [ ] Update README MCP tool documentation.

Validation:

- [ ] Test dry-run does not create or delete files.
- [ ] Test existing destination fails without `overwrite: true`.
- [ ] Test existing destination succeeds with `overwrite: true`.
- [x] `npm test` (55/55)
- [x] `npm run check-md-refs`

Done when:

- `sync_overlays` cannot replace existing overlay content unless the caller explicitly opts in.

### 4. Make `promote_skill` Atomic

Files:

- [bin/install.js](../bin/install.js)
- [bin/mcp.mjs](../bin/mcp.mjs)
- [tests/install.test.js](../tests/install.test.js)
- [tests/mcp.test.mjs](../tests/mcp.test.mjs)

Plan:

- [x] Copy the project skill into a temp staging directory first.
- [x] Validate the staged copy contains `SKILL.md` before replacing the destination.
- [x] Rename the existing destination to a backup path before final rename.
- [x] Restore the backup if final rename fails (wrapped in try/catch).
- [x] Clean up temp and backup directories on success or failure.
- [x] Return structured error details without exposing excessive local path noise in MCP responses.

Validation:

- [x] Test successful promotion (existing overlay test passes).
- [x] Test missing source skill (existing validation).
- [ ] Test failed staging leaves existing destination unchanged.
- [x] `npm test` (55/55)

Done when:

- A failed promotion cannot leave the user overlay with a partially copied or missing skill.

### 5. Define MCP `allSkills=true` Overlay Behavior

Files:

- [bin/mcp.mjs](../bin/mcp.mjs)
- [bin/install.js](../bin/install.js)
- [tests/mcp.test.mjs](../tests/mcp.test.mjs)
- [tests/install.test.js](../tests/install.test.js)
- [README.md](../README.md)

Plan:

- [x] Decide the contract: `allSkills=true` removes all skill directories in the selected tool scope (matches CLI `--everything`).
- [x] Update `removeAllSkillsFromTool` to truly remove all installed skill directories (not just bundled-matching).
- [x] Update MCP input schema and prompt text to match the selected contract.
- [ ] Align CLI `remove --all --everything` semantics with MCP naming.
- [ ] Document examples for bundled-only and full-scope removal.

Validation:

- [x] Test removal with bundled skills only.
- [x] Test removal with user/project overlay skills installed (via `removeAllSkillsFromTool`).
- [ ] Test no removal happens without explicit tool scope.
- [x] `npm test`
- [x] `npm run check-md-refs`

Done when:

- The parameter name, implementation, docs, and tests describe the same deletion scope.

### 6. Replace Qdrant `recreateCollection()`

Files:

- [bin/vector.mjs](../bin/vector.mjs)
- [bin/mcp.mjs](../bin/mcp.mjs)
- [tests/mcp.test.mjs](../tests/mcp.test.mjs)
- [README.md](../README.md)
- [docker-compose.yml](../docker-compose.yml)

Plan:

- [x] Add a namespace field to Qdrant payloads: `web-ui-skills@<version>`.
- [x] Create the collection only when missing (never `recreateCollection`).
- [x] Replace `recreateCollection()` with scoped delete of this package namespace followed by upsert.
- [x] Keep existing points from other namespaces intact.
- [x] Add graceful fallback when Qdrant is reachable but indexing fails.
- [ ] Document collection naming and data ownership.

Validation:

- [x] Unit-test collection exists path with a mocked client (pre-existing).
- [x] Unit-test missing collection path with a mocked client (pre-existing).
- [x] Test indexing failure falls back to file search (pre-existing).
- [ ] Optional local check with [docker-compose.yml](../docker-compose.yml).

Done when:

- Starting MCP with `QDRANT_URL` no longer destroys unrelated vectors in an existing collection.

### 7. Rework Release Automation

Files:

- [.github/workflows/npm-publish.yml](../.github/workflows/npm-publish.yml)
- [.gitlab-ci.yml](../.gitlab-ci.yml)
- [package.json](../package.json)
- [package-lock.json](../package-lock.json)
- [README.md](../README.md)

Plan:

- [x] Decide release trigger policy: **workflow_dispatch only** (manual from GitHub UI).
- [x] Remove `release-on-main.yml` — stop automatic patch release on every push to `main`.
- [x] Keep npm publishing as `workflow_dispatch` only with tag validation.
- [x] Add pre-release checks: `npm test`, `npm run check-md-refs`, `npm pack --dry-run` before publish.
- [x] Ensure package version and tag validation remains enforced.
- [ ] Update release docs in [README.md](../README.md).

Validation:

- [ ] Run workflow syntax checks if available.
- [ ] Dry-run release logic locally where possible.
- [ ] Confirm docs describe the same release path as workflows.

Done when:

- Routine merges to `main` do not create releases unless the configured release trigger is used.

### 8. Add Packed-Tarball Smoke Tests

Files:

- [package.json](../package.json)
- [tests/pack.test.mjs](../tests/pack.test.mjs)
- [.gitlab-ci.yml](../.gitlab-ci.yml)
- [.github/workflows/npm-publish.yml](../.github/workflows/npm-publish.yml)

Plan:

- [x] Add npm script `test:pack` for packed package smoke tests.
- [x] Create [tests/pack.test.mjs](../tests/pack.test.mjs) (3 tests: pack validity, --list from tarball, MCP entry resolve).
- [x] Verify `web-ui-skills --list` works from the installed package.
- [x] Verify `web-ui-skills mcp` entry point resolves without starting a long-lived server.
- [ ] Add the smoke test to GitLab CI and npm publish workflow.

Validation:

- [x] `npm test` (58/58 including pack tests)
- [x] `npm pack --dry-run`

Done when:

- CI verifies the package works after packaging, not only from the repository checkout.

### 9. Add Skill Frontmatter Validation

Files:

- [bin/install.js](../bin/install.js)
- [scripts/check-skills.js](../scripts/check-skills.js)
- [package.json](../package.json)
- [tests/install.test.js](../tests/install.test.js)
- [skills/README.md](../skills/README.md)
- [README.md](../README.md)

Plan:

- [x] Extend `validateSkillTree()` with empty description check and `groups.json` member validation.
- [x] Add dedicated [scripts/check-skills.js](../scripts/check-skills.js) exiting non-zero on warnings.
- [x] Add `check-skills` npm script.
- [x] Require every top-level skill to have `name` and non-empty `description`.
- [x] Require `name` to match the skill directory (already existed).
- [x] Detect duplicate frontmatter names across sources (already existed).
- [x] Validate `groups.json` points only to existing skills.
- [x] Document metadata requirements in [skills/README.md](../skills/README.md).

Validation:

- [x] Add fixture-based tests for missing name, empty description, mismatch, duplicate, and missing group member (6 new tests).
- [x] `npm run check-skills`
- [x] `npm test` (61/61)

Done when:

- Bad skill metadata fails CI before publishing.

### 10. Add Scheduled Dependency Audit

Files:

- [.github/workflows/npm-publish.yml](../.github/workflows/npm-publish.yml)
- [.github/workflows/dependency-audit.yml](../.github/workflows/dependency-audit.yml)
- [.gitlab-ci.yml](../.gitlab-ci.yml)
- [package.json](../package.json)
- [README.md](../README.md)

Plan:

- [x] Add an `audit` npm script, `npm audit --audit-level moderate`.
- [x] Add a scheduled GitHub workflow ([dependency-audit.yml](../.github/workflows/dependency-audit.yml)) for weekly dependency audit.
- [ ] Keep publish workflows strict, but make scheduled audit failures visible without blocking unrelated local work.
- [x] Separate production dependency audit (`--omit dev`) from full dev dependency audit.
- [ ] Document how to triage audit findings and when to update lockfiles.
- [x] Handle registry/network failures as infrastructure failures (workflow continues on error).

Validation:

- [ ] `npm run audit` when network is available.
- [ ] Confirm scheduled job reports failures clearly.
- [ ] Confirm release/publish jobs still run deterministic install and package checks.

Done when:

- Dependency risk is checked on a schedule and release checks remain deterministic.

### 11. Add Review Volume Control For Agent Runs

Goal:

- Prevent parallel agent runs from producing unbounded, duplicated, or low-priority review output.
- Make `a11y-review` and `web-design-review` produce triageable findings instead of long flat checklists.

Files:

- [bin/mcp.mjs](../bin/mcp.mjs)
- [bin/install.js](../bin/install.js)
- [skills/a11y-review/SKILL.md](../skills/a11y-review/SKILL.md)
- [skills/a11y-review/references/review-checklist.md](../skills/a11y-review/references/review-checklist.md)
- [skills/web-design-review/SKILL.md](../skills/web-design-review/SKILL.md)
- [skills/web-design-review/references/responsive.md](../skills/web-design-review/references/responsive.md)
- [skills/web-design-review/references/token-audit.md](../skills/web-design-review/references/token-audit.md)
- [tests/mcp.test.mjs](../tests/mcp.test.mjs)
- [tests/install.test.js](../tests/install.test.js)
- [README.md](../README.md)

#### 11.1 Define Review Finding Schema

- [x] Add a documented `ReviewFinding` shape in [README.md](../README.md) as a TypeScript interface with full field list.
- [x] Require these fields for every review finding:
  - `id`
  - `title`
  - `severity`: `blocker | high | medium | low | nit`
  - `decision`: `fix_now | backlog | ignore | needs_human`
  - `confidence`: `high | medium | low`
  - `domain`: `accessibility | design | correctness | performance | content | security`
  - `evidence`
  - `file`
  - `line` or `selector` when available
  - `recommended_fix`
- [x] Document that `blocker` and `high` findings must include concrete evidence.
- [x] Document that `nit` findings must never block merge.

Acceptance:

- A reviewer can sort findings by severity, decision, confidence, and domain without reading prose first.

#### 11.2 Add Review Modes

- [x] Define three modes in both SKILL.md files:
  - `blocking-review`: only blockers, regressions, broken UX, WCAG failures, and missing critical states.
  - `quality-review`: consistency, polish, copy, responsive refinement, token/design-system drift.
  - `full-review`: both blocking and quality findings, still capped by budget.
- [x] Make `blocking-review` the default mode in both SKILL.md files.
- [x] Add guidance that agents should ask before switching to `full-review` on large diffs.
- [x] Add examples of what belongs in each mode (inline in SKILL.md).

#### 11.3 Add Review Budget

- [x] Define default budgets in both SKILL.md files:
  - `blocking-review`: max 7 findings.
  - `quality-review`: max 10 findings.
  - `full-review`: max 12 findings total.
- [x] Require agents to rank findings by severity, confidence, and user impact.
- [x] Require overflow items to go into `backlog_suggestions`, not the main finding list.
- [x] Require a summary count with `ReviewOutput.summary`.
- [x] Add explicit wording that agents must not expand the budget unless the user asks.

#### 11.4 Add Dedupe Rules

- [x] Define a deterministic dedupe key: `domain + severity + file + normalized title`.
- [x] Document that repeated instances of the same issue should be grouped into one finding.
- [x] Add a `similar_occurrences` field for grouped findings (inline in SKILL.md + example in README).
- [x] Require agents to merge duplicates across `a11y-review` and `web-design-review`.
- [x] Add examples in README.md (deduped focus indicator finding).

#### 11.5 Add Fix/Backlog Split

- [x] Require every finding to choose one decision:
  - `fix_now`: must be addressed before merge.
  - `backlog`: valid issue, not blocking current change.
  - `ignore`: acknowledged but intentionally not actionable.
  - `needs_human`: product/design/accessibility judgment required.
- [x] Define default decision mapping in both SKILL.md files.
- [x] Require `needs_human` items to include the exact decision needed.
- [x] Require `ignore` items to include a short reason.

Acceptance:

- The output tells the reviewer what to do with each item.

#### 11.6 Update `a11y-review`

- [x] Rewrite [skills/a11y-review/SKILL.md](../skills/a11y-review/SKILL.md) with explicit priorities.
- [x] Prioritize: keyboard access blockers, focus visibility failures, missing accessible names, invalid ARIA, color contrast failures, form error announcement failures.
- [x] Move broad compliance reminders into backlog guidance.
- [x] Add instruction: do not report general WCAG education as a finding.
- [x] Add instruction: report patterns, not every repeated instance.

#### 11.7 Update `web-design-review`

- [x] Rewrite [skills/web-design-review/SKILL.md](../skills/web-design-review/SKILL.md) with separated categories: broken UX, responsive failure, design-system drift, polish, subjective taste.
- [x] Add severity mapping table per category.
- [x] Add instruction: subjective taste must be `nit` or `needs_human`, never `blocker`.
- [x] Add instruction: do not block merge on visual preference without a product/design standard.

#### 11.8 Add MCP Prompt Support

- [x] Add 3 new MCP prompts in [bin/mcp.mjs](../bin/mcp.mjs): `blocking-review-plan`, `quality-review-plan`, `review-triage-plan`.
- [x] Include review budget, severity gate, and output schema in prompts.
- [x] Add tests in [tests/mcp.test.mjs](../tests/mcp.test.mjs) that prompts are registered.
- [x] Keep prompt responses concise for downstream agents.

#### 11.9 Add Validation Examples

- [x] Add `ReviewOutput` TypeScript interface to [README.md](../README.md).
- [x] Include one `blocking-review` example with findings.
- [x] Include one deduped finding example with `similar_occurrences`.
- [x] Keep examples short and schema-consistent.

#### 11.10 Add Tests And Checks

- [x] Add tests that review prompts exist in [tests/mcp.test.mjs](../tests/mcp.test.mjs).
- [x] Add tests that review skill docs contain required terms: `severity`, `decision`, `confidence`, `blocking-review`, `backlog_suggestions`, `similar_occurrences`.
- [x] Add tests to ensure both review skills mention dedupe/grouping.
- [x] `npm test` (72/72)
- [x] `npm run check-md-refs`
- [x] `npm run check-skills`

Acceptance:

- CI fails if the review-volume contract is accidentally removed from core review skills.
