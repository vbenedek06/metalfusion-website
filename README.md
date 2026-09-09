# MetalFusion — Company Website

Marketing website for a real Budapest-based CNC precision manufacturing client (CNC milling, turning, prototyping, tooling, and batch production).

**Status:** in active development — not yet live on its final production domain (see Known limitations below).

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

- Contact form currently falls back to `mailto:` — a server-side submission is planned
- No cookie-consent banner yet — required before analytics can go live (GDPR)
- Legal notice page (impresszum) not yet built — required under Hungarian e-commerce law
- Production domain not yet finalized/confirmed live

## Local development

See `INDITAS.txt` for setup instructions (`npm install`, `npm run dev`).
