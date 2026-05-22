---
name: vue-seo-metadata
description: Vue 3-specific SEO patterns — route metadata, <head> management, Open Graph, JSON-LD structured data, sitemaps, and robots.
---

# Vue SEO Metadata

Use this skill for Vue 3 SEO implementation. For generic SEO concepts, see `web-seo-metadata`.

## Vue patterns

- Use `@unhead/vue` (or `vueuse/head`) for per-route `<head>` management.
- Use route meta fields to define per-route title, description, OG tags.
- Ensure SSR renders metadata in the initial HTML for crawler compatibility.
- Use a route guard (`beforeEach`) to update head metadata on navigation.
- Define route metadata next to route definitions to avoid shipping new routes without tags.

## Reference files

- [`references/head-template.md`](references/head-template.md) — `<head>` template.
- [`references/structured-data.md`](references/structured-data.md) — JSON-LD schemas.
- [`references/sitemap.md`](references/sitemap.md) — Sitemap and robots.
