---
name: react-seo-metadata
description: React-specific SEO patterns — route metadata, <head> management, Open Graph, JSON-LD structured data, sitemaps, and robots.
---

# React SEO Metadata

Use this skill for React SEO implementation. For generic SEO concepts, see `web-seo-metadata`.

## React patterns

- Use `react-helmet-async` or a custom `<HeadProvider>` for per-route `<head>` metadata.
- Update `<title>` and meta tags on route change in layout or route wrapper.
- Ensure SSR/SSG renders metadata in the initial HTML for crawler compatibility.
- Use a `useMeta()` hook to declaratively set title, description, OG tags per route.
- Define route metadata next to route definitions to avoid shipping new routes without tags.

## Reference files

- [`references/head-template.md`](references/head-template.md) — `<head>` template.
- [`references/structured-data.md`](references/structured-data.md) — JSON-LD schemas.
- [`references/sitemap.md`](references/sitemap.md) — Sitemap and robots.
