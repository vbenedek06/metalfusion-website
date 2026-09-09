# MetalFusion — Company Website

Marketing website for a real Budapest-based CNC precision manufacturing client (CNC milling, turning, prototyping, tooling, and batch production).

**Status:** live at [metalfusion.eu](https://metalfusion.eu) — solo-built, in active development, minor content/SEO polish ongoing.

## What this is

A real client project. I designed and built the site end-to-end for a small CNC manufacturing workshop in Budapest (operating since 2010): company/services pages (CNC milling, CNC turning, prototyping, tool making, batch production, complete mechanical assembly), a machine park page, project references, and a quote-request flow.

## My role

Solo build — frontend development, SEO structure, and iteration based on real client feedback. Everything in this repository is mine: components, routing, the SEO data layer, and the build/deploy configuration.

## Tech stack

React 18 · TypeScript · Vite · React Router v6 · Vitest

## Features

- Home, About, Services (6 individual service sub-pages), References, Machine park, Contact, Privacy policy
- Quote-request contact form
- SEO foundation: per-page meta tags, JSON-LD LocalBusiness schema, sitemap.xml, robots.txt (see SEO.md)
- Production-grade security headers (CSP, HSTS, and more — see netlify.toml)
- Dependabot enabled for dependency updates

## Known limitations (honest status)

This project is still in progress. Documented gaps I'm actively working through:

- Contact form submits via Web3Forms when an API key is configured, with a `mailto:` fallback if it's missing or errors
- Cookie-consent banner implemented (GDPR)
- Legal notice page (`/impresszum`) implemented, per Hungarian e-commerce law
- Production domain confirmed live: metalfusion.eu — `sitemap.xml` still references the old `metalfusion.hu` domain and needs updating

## Local development

See `INDITAS.txt` for setup instructions (`npm install`, `npm run dev`).
