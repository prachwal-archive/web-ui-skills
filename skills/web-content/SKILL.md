---
name: web-content
description: Use when building or reviewing content-heavy pages, CMS integrations, editorial workflows, empty states, error pages, and marketing pages. Covers content structure, readability, copy quality, rich text rendering, and content safety.
---

# Web Content Skill (generic)

Use this skill when a page depends on dynamic content, a CMS, editorial copy, empty states, or marketing-oriented layout. For framework-specific implementation patterns, use `react-content`, `preact-content`, or `vue-content`.

## Core goals

- Render CMS and user-generated content safely without XSS risk.
- Keep content structure semantic and readable across devices and zoom levels.
- Provide honest, helpful empty states and error pages.
- Align visible copy with SEO metadata and accessibility names.
- Treat content schema as part of the product contract, not an afterthought.

## Checklist

- [ ] HTML from CMS or rich text editor is sanitized before rendering.
- [ ] Content schema defines required and optional fields explicitly.
- [ ] Empty states explain what is absent and offer a next action.
- [ ] Error pages (404, 500) match site branding and provide navigation.
- [ ] Heading hierarchy is correct (`h1` → `h2` → `h3`) without gaps.
- [ ] Long-form content uses correct semantic elements: `<article>`, `<section>`, `<aside>`, `<figure>`, `<blockquote>`.
- [ ] Images have `alt` text defined in the CMS content model, not left optional.
- [ ] Links in body copy have descriptive text, not "click here" or "read more".
- [ ] Dates and numbers use locale-aware formatting.
- [ ] Marketing pages use real copy, not lorem ipsum placeholders, before accessibility review.
- [ ] Content changes do not require a full redeploy when a CMS is in use.

## Testing focus

- CMS content renders correctly at various content lengths (short, long, empty).
- XSS vectors in CMS content are sanitized correctly.
- Empty states appear when collections are empty, not loading skeletons stuck indefinitely.
- External links have `noopener` and open in a new tab.
- Heading hierarchy is correct after CMS edits.
- 404 and 500 pages are reachable and styled correctly.
