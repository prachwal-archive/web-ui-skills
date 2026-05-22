# Repository Improvement Plan

## Larger Changes

### 1. Pick One Package Manager

Files:

- [package.json](../package.json)
- [package-lock.json](../package-lock.json)
- [.gitlab-ci.yml](../.gitlab-ci.yml)
- [.github/workflows/npm-publish.yml](../.github/workflows/npm-publish.yml)
- [.github/workflows/release-on-main.yml](../.github/workflows/release-on-main.yml)
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

- [.github/workflows/release-on-main.yml](../.github/workflows/release-on-main.yml)
- [.github/workflows/npm-publish.yml](../.github/workflows/npm-publish.yml)
- [.gitlab-ci.yml](../.gitlab-ci.yml)
- [package.json](../package.json)
- [package-lock.json](../package-lock.json)
- [README.md](../README.md)

Plan:

- [ ] Decide release trigger policy: manual dispatch, tags only, or conventional-commit gated releases.
- [ ] Stop automatic patch release on every push to `main`.
- [ ] Keep npm publishing tied to GitHub release or tag validation.
- [ ] Add pre-release checks before version bump: `npm ci`, `npm test`, `npm run check-md-refs`, `npm pack --dry-run`.
- [ ] Ensure package version and tag validation remains enforced.
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
- [.github/workflows/release-on-main.yml](../.github/workflows/release-on-main.yml)
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
