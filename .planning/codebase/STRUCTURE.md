# Codebase Structure

**Analysis Date:** 2026-01-27

## Directory Layout

```
frontend/
├── src/                      # All source code
│   ├── app/                  # Next.js App Router pages
│   │   ├── about/            # About page
│   │   ├── api/              # API routes
│   │   │   └── revalidate/   # Cache revalidation endpoint
│   │   ├── booking/          # Booking flow pages
│   │   ├── carrieres/        # Career pages
│   │   ├── centres/          # Centers page
│   │   ├── contact/          # Contact page
│   │   ├── engagement/       # Engagement page
│   │   ├── mentions-legales/ # Legal mentions page
│   │   ├── notre-reseau/     # Network page
│   │   ├── services/         # Services page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # Reusable components
│   │   ├── layout/           # Layout components (Header, Footer, MobileNav)
│   │   └── ui/               # UI components (Button, Card)
│   ├── config/               # Configuration files
│   │   └── routes.ts         # Route definitions
│   ├── context/              # React contexts
│   │   └── GlobalSettingsContext.tsx
│   ├── features/             # Feature-based components
│   │   ├── about/            # About page features
│   │   ├── booking/          # Booking flow features
│   │   ├── career/           # Career features
│   │   ├── contact/          # Contact features
│   │   ├── corporate-overview/  # Corporate overview features
│   │   ├── engagement/       # Engagement features
│   │   ├── home/             # Home page features
│   │   └── network/          # Network features
│   ├── hooks/                # Custom React hooks
│   │   └── useExternalNavigation.ts
│   ├── lib/                  # Utility libraries
│   │   ├── api/              # API client functions
│   │   │   ├── client.ts     # Core Strapi client
│   │   │   ├── about.ts
│   │   │   ├── booking.ts
│   │   │   ├── careers.ts
│   │   │   ├── contact.ts
│   │   │   ├── engagement.ts
│   │   │   ├── global.ts
│   │   │   ├── homepage.ts
│   │   │   ├── legal.ts
│   │   │   ├── network.ts
│   │   │   └── services.ts
│   │   └── utils.ts          # Utility functions
│   ├── services/             # Service layer
│   │   └── strapi.ts         # Legacy Strapi service
│   └── types/                # TypeScript type definitions
│       └── strapi.ts         # Strapi types
├── public/                   # Static assets
├── .env.example              # Environment variables template
├── eslint.config.mjs         # ESLint configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Directory Purposes

**src/app/**
- Purpose: Next.js App Router pages and routes
- Contains: Page components, API routes, global styles
- Key files: `layout.tsx` (root layout), `page.tsx` (home), `api/revalidate/route.ts`
- Subdirectories: Feature-based page folders

**src/components/**
- Purpose: Reusable UI and layout components
- Contains: `layout/` (Header, Footer, MobileNav), `ui/` (Button, Card)
- Key files: `layout/Header.tsx`, `layout/Footer.tsx`, `layout/MobileNav.tsx`
- Subdirectories: None (flat structure)

**src/features/**
- Purpose: Feature-specific components organized by page/feature
- Contains: Home features, booking features, career features, etc.
- Key files: `home/HeroSection.tsx`, `booking/BookingFlow.tsx`, `career/CareerPage.tsx`
- Subdirectories: Feature folders (about, booking, career, contact, home, network, etc.)

**src/lib/api/**
- Purpose: Strapi CMS API client and data fetching functions
- Contains: API client, fetch functions per content type
- Key files: `client.ts` (core client), `homepage.ts`, `booking.ts`, `centres.ts`
- Subdirectories: None (flat structure)

**src/config/**
- Purpose: Centralized configuration and constants
- Contains: Route definitions
- Key files: `routes.ts`
- Subdirectories: None

**src/types/**
- Purpose: TypeScript type definitions
- Contains: Strapi content type types
- Key files: `strapi.ts`
- Subdirectories: None

**src/context/**
- Purpose: React Context providers
- Contains: Global settings context
- Key files: `GlobalSettingsContext.tsx`
- Subdirectories: None

**src/hooks/**
- Purpose: Custom React hooks
- Contains: Reusable hooks
- Key files: `useExternalNavigation.ts`, `useGeolocation.ts`
- Subdirectories: None

**src/lib/**
- Purpose: Utility libraries not specific to API
- Contains: Helper functions
- Key files: `utils.ts` (cn function for class merging)
- Subdirectories: None

**src/services/**
- Purpose: Legacy service layer (deprecated)
- Contains: Old Strapi service (should migrate to lib/api)
- Key files: `strapi.ts` (deprecated, use lib/api/client.ts instead)
- Subdirectories: None

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx` - Root layout (HTML structure, fonts, global provider)
- `src/app/page.tsx` - Home page component

**Configuration:**
- `next.config.ts` - Next.js configuration (Turbopack, images)
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - ESLint configuration
- `.env.example` - Environment variables template
- `src/config/routes.ts` - Route definitions

**Core Logic:**
- `src/lib/api/client.ts` - Core Strapi API client
- `src/lib/api/*.ts` - Content-specific API functions
- `src/types/strapi.ts` - Strapi type definitions
- `src/context/GlobalSettingsContext.tsx` - Global settings provider

**Components:**
- `src/components/layout/` - Layout components (Header, Footer, MobileNav)
- `src/components/ui/` - UI components (Button, Card)
- `src/features/` - Feature-specific components

**API Routes:**
- `src/app/api/revalidate/route.ts` - Cache revalidation endpoint

**Testing:**
- No test files present

**Documentation:**
- `README.md` - Project documentation

## Naming Conventions

**Files:**
- `page.tsx` - Next.js page components
- `layout.tsx` - Next.js layout components
- `route.ts` - Next.js API routes
- `PascalCase.tsx` - React components (e.g., `Header.tsx`, `BookingFlow.tsx`)
- `camelCase.ts` - Non-component files (e.g., `client.ts`, `routes.ts`)
- `kebab-case` - Folders (e.g., `booking-flow`, `time-slots`)

**Directories:**
- kebab-case for feature directories (e.g., `about-page`, `time-slots`)
- Plural for collections (e.g., `components`, `features`, `hooks`)

**Special Patterns:**
- `*.page.tsx` - Feature-specific page components (not currently used)
- `index.ts` - Not used (export directly from files)

## Where to Add New Code

**New Page:**
- Primary code: `src/app/[route-name]/page.tsx`
- Components: `src/features/[feature-name]/[FeaturePage].tsx`
- API functions: `src/lib/api/[content-type].ts`
- Types: `src/types/strapi.ts` (add new interface)

**New Feature:**
- Implementation: `src/features/[feature-name]/[ComponentName].tsx`
- Sub-components: `src/features/[feature-name]/sub-components/`
- Types: `src/types/strapi.ts`

**New Component/Module:**
- Implementation: `src/components/[ui|layout]/[ComponentName].tsx`
- Types: Inline or in `src/types/`

**New API Function:**
- Implementation: `src/lib/api/[content-type].ts`
- Types: `src/types/strapi.ts`

**New Route:**
- Definition: `src/config/routes.ts`
- Page: `src/app/[route]/page.tsx`

**Utilities:**
- Shared helpers: `src/lib/utils.ts` or new file in `src/lib/`
- Custom hooks: `src/hooks/[hookName].ts`

## Special Directories

**.next/**
- Purpose: Next.js build output and cache
- Source: Auto-generated by Next.js build
- Committed: No (in .gitignore)

**node_modules/**
- Purpose: npm dependencies
- Source: Installed from package.json
- Committed: No (in .gitignore)

**public/**
- Purpose: Static assets (images, fonts, favicon)
- Source: Manually added files
- Committed: Yes

---

*Structure analysis: 2026-01-27*
*Update when directory structure changes*