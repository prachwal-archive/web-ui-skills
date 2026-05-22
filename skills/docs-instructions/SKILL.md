---
name: docs-instructions
description: Use when maintaining repository Markdown, Copilot instructions, Codex AGENTS.md, repo skills, prompts, or LLM evaluation tasks.
---

# Docs and Instructions

Read first:

- [`references/docs-markdown.md`](references/docs-markdown.md) — Markdown conventions and formatting rules.
- [`references/docs-tsdoc.md`](references/docs-tsdoc.md) — TSDoc/JSDoc conventions.
- `AGENTS.md` or equivalent repo instructions file.

## Organization rules

- Keep always-loaded instructions short and durable.
- Put heavyweight examples, skeletons, and eval tasks in prompt files.
- Put task routers in skill directories.
- Do not duplicate content across instruction files, prompts, and skills; cross-reference instead.
- Verify Markdown with the project's lint command.
