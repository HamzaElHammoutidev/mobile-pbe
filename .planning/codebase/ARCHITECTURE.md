# Architecture

**Analysis Date:** 2026-01-27

## Pattern Overview

**Overall:** Next.js App Router with Headless CMS Architecture

**Key Characteristics:**
- Single React application with server-side rendering
- Strapi CMS as single source of truth for content
- Incremental Static Regeneration (ISR) for performance
- Feature-based organization
- Client components only when interactivity required

## Layers

**Presentation Layer:**
- Purpose: Render UI and handle user interactions
- Contains: Page components, feature components, UI components
- Location: `src/app/*/page.tsx`, `src/features/*`, `src/components/*`
- Depends on: API layer for data, React hooks for state
- Used by: End users

**API Layer:**
- Purpose: Abstract Strapi CMS communication and caching
- Contains: API client, fetch functions, type definitions
- Location: `src/lib/api/*.ts`
- Depends on: Strapi CMS backend
- Used by: Presentation layer

**Configuration Layer:**
- Purpose: Centralize app-wide configuration
- Contains: Routes, constants, settings
- Location: `src/config/*.ts`
- Depends on: None
- Used by: All layers

**State Management Layer:**
- Purpose: Manage global application state
- Contains: React contexts (GlobalSettingsProvider)
- Location: `src/context/*.tsx`
- Depends on: API layer
- Used by: Presentation layer

**Utility Layer:**
- Purpose: Shared helper functions
- Contains: Utility functions, hooks
- Location: `src/lib/*.ts`, `src/hooks/*.ts`
- Depends on: None or minimal dependencies
- Used by: Multiple layers

## Data Flow

**Page Request:**

1. User navigates to URL
2. Next.js matches route in `src/app/`
3. Server Component fetches data from Strapi via API layer (`src/lib/api/*.ts`)
4. Data fetched with Next.js caching (ISR tags, revalidation)
5. Component renders with data (SSR)
6. HTML sent to client
7. React hydrates for interactivity

**Interactive Flow (Client Component):**

1. User interacts with UI (e.g., selects date in booking flow)
2. Client component updates local state (useState)
3. Optional: Hook may fetch additional data or trigger navigation
4. Component re-renders with new state

**Cache Revalidation Flow:**

1. Content updated in Strapi CMS
2. Strapi sends webhook to `/api/revalidate`
3. Webhook validated via secret
4. Next.js revalidates cache by path/tag
5. Next request returns fresh content

**State Management:**
- Server state: Managed via Next.js caching (ISR)
- Client state: React hooks (useState, useSearchParams)
- Global state: React Context (GlobalSettingsContext)

## Key Abstractions

**Feature:**
- Purpose: Encapsulates related functionality (booking, career, contact)
- Examples: `src/features/booking/`, `src/features/career/`, `src/features/contact/`
- Pattern: Feature folder with components, page, sub-components

**API Client:**
- Purpose: Centralized Strapi communication with caching
- Examples: `src/lib/api/client.ts` (core), `src/lib/api/homepage.ts`, `src/lib/api/booking.ts`
- Pattern: Singleton-like exported functions

**Route Configuration:**
- Purpose: Centralized route definitions
- Examples: `src/config/routes.ts`
- Pattern: Constants object with string and function routes

**Type Definitions:**
- Purpose: Strong typing for Strapi responses
- Examples: `src/types/strapi.ts`
- Pattern: Interface definitions for all Strapi content types

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: All page requests
- Responsibilities: HTML structure, fonts, global settings provider, metadata

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: Navigate to `/`
- Responsibilities: Homepage rendering, global settings fetch

**API Route:**
- Location: `src/app/api/revalidate/route.ts`
- Triggers: Strapi webhook POST/GET
- Responsibilities: Cache revalidation

**Individual Pages:**
- Location: `src/app/[route]/page.tsx` (about, services, contact, etc.)
- Triggers: Navigate to respective route
- Responsibilities: Page-specific data fetching and rendering

## Error Handling

**Strategy:** Return null on API failures, console error logging

**Patterns:**
- try/catch in API client functions with null return
- 404 responses logged as warnings, return null
- Connection errors logged, return null
- No global error boundary

## Cross-Cutting Concerns

**Logging:**
- console.log, console.error, console.warn
- No structured logging
- Used in: API client (`src/lib/api/client.ts`), revalidation route

**Validation:**
- TypeScript type checking (strict mode)
- No runtime validation library
- Strapi response types defined in `src/types/strapi.ts`

**Authentication:**
- No user authentication required
- API token authentication for Strapi CMS

**Internationalization:**
- French language hardcoded (no i18n)
- `lang="fr"` in root layout

---

*Architecture analysis: 2026-01-27*
*Update when major patterns change*