---
name: preact-seo-metadata
description: Preact-specific SEO patterns — route metadata, <head> management, Open Graph, JSON-LD structured data, sitemaps, and robots.
---

# Preact SEO Metadata

Use this skill for Preact SEO implementation. For generic SEO concepts, see `web-seo-metadata`.

## Preact patterns

- Use a custom `setMetadata()` utility that directly updates `<title>` and `<meta>` tags in the DOM.
- Update metadata on route change in the route handler or layout.
- Ensure SSR/SSG renders metadata in the initial HTML for crawler compatibility.
- For client-side updates, use a signal-based pattern to re-render `<title>` and meta elements.
- Define route metadata next to route definitions to avoid shipping new routes without tags.

## Reference files

- [`references/head-template.md`](references/head-template.md) — `<head>` template.
- [`references/structured-data.md`](references/structured-data.md) — JSON-LD schemas.
- [`references/sitemap.md`](references/sitemap.md) — Sitemap and robots.
