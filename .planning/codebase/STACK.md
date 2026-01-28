# Technology Stack

**Analysis Date:** 2026-01-27

## Languages

**Primary:**
- TypeScript 5.x - All application code (`src/**/*.ts`, `src/**/*.tsx`)

**Secondary:**
- JavaScript - Build scripts, config files (`next.config.ts`, `eslint.config.mjs`)

## Runtime

**Environment:**
- Node.js 20.x - Specified in `package.json` devDependencies (`@types/node`: "^20")
- Browser: Modern browsers (React client-side rendering)

**Package Manager:**
- npm - Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.1.0 - Full-stack React framework with App Router
- React 19.2.3 - UI library

**Styling:**
- Tailwind CSS 4 - Utility-first CSS framework
- PostCSS - CSS processing

**Maps:**
- Leaflet 1.9.4 - Interactive maps
- react-leaflet 5.0.0 - React bindings for Leaflet

**Utilities:**
- lucide-react 0.563.0 - Icon library
- clsx 2.1.1 - Conditional class names
- tailwind-merge 3.4.0 - Tailwind class merging
- qs 6.14.0 - Query string parsing

## Key Dependencies

**Critical:**
- next 16.1.0 - Core framework (SSR, routing, API routes)
- react 19.2.3 - UI rendering
- leaflet/react-leaflet - Map functionality for centre locations
- qs - Query string formatting for Strapi API requests

**Infrastructure:**
- next/image - Optimized image handling
- next/cache - Revalidation and caching
- fetch API - Native browser/node fetch for Strapi API calls

## Configuration

**Environment:**
- `.env.local` files for environment variables
- Required: `NEXT_PUBLIC_STRAPI_URL`, `STRAPI_API_TOKEN`, `STRAPI_WEBHOOK_SECRET`, `REVALIDATION_SECRET`

**Build:**
- `next.config.ts` - Next.js configuration (images remote patterns, Turbopack)
- `tsconfig.json` - TypeScript compiler options (strict mode, path aliases)
- `postcss.config.mjs` - PostCSS configuration
- `eslint.config.mjs` - ESLint configuration

## Platform Requirements

**Development:**
- Node.js 20.x or higher
- macOS/Linux/Windows (any platform with Node.js)
- Modern web browser for development

**Production:**
- Any Next.js-compatible hosting (Vercel, Netlify, Node.js server, Docker)
- Requires Strapi CMS backend instance running

---

*Stack analysis: 2026-01-27*
*Update after major dependency changes*