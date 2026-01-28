# PBE Mobile Frontend

## What This Is

A mobile version of parebriseexpress.ma built from pre-designed pages. The frontend is progressively deployable with all designed pages working responsively on mobile, eventually connected to Strapi CMS for dynamic content management.

## Core Value

Get all designed pages working and deployed progressively on mobile, then connect to Strapi for content management.

## Requirements

### Validated

- ✓ Next.js 16 frontend with React 19 - existing
- ✓ Tailwind CSS 4 styling system - existing
- ✓ Leaflet maps integration - existing
- ✓ Strapi CMS backend connectivity - existing (configured but not yet used for dynamic content)
- ✓ TypeScript 5.x codebase - existing
- ✓ ESLint + code quality tooling - existing

### Active

- [ ] All designed pages converted to React components
- [ ] All pages responsive and working on mobile
- [ ] Each page deployable individually
- [ ] Progressive review workflow for deployed pages
- [ ] All pages deployed and accessible
- [ ] Strapi integration for dynamic content (text, navigation, media)
- [ ] Content migration from hardcoded to Strapi

### Out of Scope

- **Strapi integration in Phase 1** — Phase 2 work, pages are hardcoded first
- **SEO optimization** — Meta tags, schema markup, performance SEO deferred
- **User interactions (forms, bookings)** — Display pages only, no backend logic yet
- **Mobile-specific animations** — Keep simple and functional, no advanced interactions
- **Desktop version** — Mobile first, desktop comes later

## Context

This is a brownfield project building on an existing Next.js frontend with:
- Modern toolchain (Next.js 16, React 19, TypeScript 5, Tailwind CSS 4)
- Strapi CMS backend already configured
- Existing map integration and routing patterns
- Design assets already created for mobile pages

The progressive deployment approach means:
1. Build all designed pages with hardcoded content
2. Deploy each page individually for review
3. Once all pages are live and verified, integrate Strapi for dynamic content
4. Migrate content from hardcoded to CMS

## Constraints

- **Design**: All pages pre-designed - must implement to specifications
- **Mobile-first**: All pages must work responsively on mobile devices
- **Hosting**: Deploy to existing infrastructure (Vercel compatible)
- **Strapi ready**: Phase 1 pages structure must support Strapi integration in Phase 2

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Progressive per-page deployment | Allows review of each page before moving to next | — Pending |
| Hardcode content in Phase 1, dynamize in Phase 2 | Separate concerns: first get structure right, then add CMS | — Pending |
| Mobile-first approach | Target mobile as primary, keep interactions simple | — Pending |
| Phase 1 excludes complex interactions | Keep scope focused on getting pages live | — Pending |

---

*Last updated: 2026-01-27 after initialization*
