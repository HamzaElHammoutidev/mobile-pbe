# External Integrations

**Analysis Date:** 2026-01-27

## APIs & External Services

**Strapi CMS:**
- Headless CMS for content management - Used for all dynamic content (pages, careers, services, etc.)
  - SDK/Client: Custom fetch API client (`src/lib/api/client.ts`)
  - Auth: Bearer token in `STRAPI_API_TOKEN` env var
  - Endpoints: `/api/homepage`, `/api/about-page`, `/api/centres`, `/api/jobs`, etc.

**Image Optimization:**
- Next.js Image component - For optimized images from Strapi
  - Config: Remote patterns for `parebriseexpress.ma` in `next.config.ts`

## Data Storage

**Databases:**
- None (No direct database access - all data via Strapi CMS)

**File Storage:**
- Strapi Media Library - Stores images, documents, videos
  - Access: Via Strapi API URLs
  - Upload: `uploadMedia()` function in `src/lib/api/client.ts`

**Caching:**
- Next.js Cache - Built-in ISR (Incremental Static Regeneration)
  - Configuration: Cache tags and revalidation in `src/lib/api/client.ts`
  - Revalidation: `/api/revalidate` route (`src/app/api/revalidate/route.ts`)

## Authentication & Identity

**Auth Provider:**
- None (No user authentication - public website)

**API Authentication:**
- Bearer token for Strapi API - Stored in `STRAPI_API_TOKEN` env var
- Webhook secret validation - `STRAPI_WEBHOOK_SECRET` for Strapi webhooks

## Monitoring & Observability

**Error Tracking:**
- None (No Sentry or similar)

**Analytics:**
- None

**Logs:**
- Console logging only - `console.log`, `console.error` used throughout codebase

## CI/CD & Deployment

**Hosting:**
- Not specified - Any Next.js compatible platform
- Environment vars: Need to configure in hosting platform

**CI Pipeline:**
- None defined in this codebase

## Environment Configuration

**Development:**
- Required env vars: `NEXT_PUBLIC_STRAPI_URL`, `STRAPI_API_TOKEN`, `STRAPI_WEBHOOK_SECRET`, `REVALIDATION_SECRET`
- Secrets location: `.env.local` (gitignored)
- Mock/stub services: Strapi dev server running locally

**Staging:**
- Environment-specific differences: Uses staging Strapi instance
- Data: Separate Strapi staging project

**Production:**
- Secrets management: Host platform environment variables
- Failover/redundancy: Configured at hosting level

## Webhooks & Callbacks

**Incoming:**
- Strapi Webhooks - `/api/revalidate` route
  - Verification: `x-strapi-webhook-secret` header validation
  - Events: All content type changes (create, update, delete)
  - Models: `homepage`, `about-page`, `centres`, `jobs`, etc.
  - Purpose: Trigger Next.js cache revalidation

**Outgoing:**
- None

## Maps & Location Services

**Leaflet Maps:**
- OpenStreetMap tiles - Free map tiles for centre locations
- Integration: `react-leaflet` components
- Used in: Centre pages, booking flow

---

*Integration audit: 2026-01-27*
*Update when adding/removing external services*