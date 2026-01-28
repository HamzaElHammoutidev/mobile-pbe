# Coding Conventions

**Analysis Date:** 2026-01-27

## Naming Patterns

**Files:**
- `PascalCase.tsx` for React components (e.g., `Header.tsx`, `BookingFlow.tsx`)
- `camelCase.ts` for non-component files (e.g., `client.ts`, `routes.ts`, `utils.ts`)
- `page.tsx` for Next.js page components
- `layout.tsx` for Next.js layout components
- `route.ts` for Next.js API routes
- `kebab-case` for directories (e.g., `booking-flow`, `time-slots`)

**Functions:**
- camelCase for all functions (e.g., `fetchAPI`, `getStrapiURL`, `handleConfirm`)
- No special prefix for async functions
- Event handlers: `handle[Action]` pattern (e.g., `handleConfirmAppointment`, `handleChangeCenter`)

**Variables:**
- camelCase for variables
- UPPER_SNAKE_CASE for constants (e.g., `ROUTES`, `NAV_ITEMS`, `PHONE_NUMBERS`)
- No underscore prefix (no private marker in TypeScript)

**Types:**
- PascalCase for interfaces, no I prefix (e.g., `StrapiResponse`, `BookingPageContent`)
- PascalCase for type aliases (e.g., `ServiceType`, `CacheDuration`)
- PascalCase for generic parameters (e.g., `T`, `U`)

## Code Style

**Formatting:**
- Tailwind CSS - Utility classes (no separate Prettier config found)
- Inline styles used sparingly for dynamic values
- Consistent component structure

**Linting:**
- ESLint with `eslint.config.mjs`
- Extends `eslint-config-next` (core-web-vitals, typescript)
- Run: `npm run lint`

**Indentation:**
- 2 space indentation (inferred from code)
- No tabs

**Quotes:**
- Single quotes for imports
- Double quotes for JSX strings

**Semicolons:**
- Required (TypeScript default)

## Import Organization

**Order:**
1. External packages (react, next, lucide-react)
2. Internal modules (@/config, @/lib, @/components)
3. Relative imports (., ..)
4. Type imports (import type {})

**Grouping:**
- Blank line between groups
- Alphabetical within each group (generally followed)

**Path Aliases:**
- `@/` maps to `src/` (configured in tsconfig.json)

## Error Handling

**Patterns:**
- try/catch with null return in API functions
- Console.error for logging, console.warn for expected failures
- No custom error classes defined
- Async functions use try/catch

**Error Types:**
- Return null on API failures (404, connection errors)
- Log error with context before returning null
- No error throwing to component layer

## Logging

**Framework:**
- console.log, console.error, console.warn (no structured logging)

**Patterns:**
- Log at API boundaries (client.ts, revalidate route)
- Prefix logs with context: `[Strapi]`, `[Revalidate]`
- No console.log in client components (only console.error/warn)

## Comments

**When to Comment:**
- Explain API function purposes with JSDoc comments
- Document complex business logic
- Comments in French (matching codebase language)

**JSDoc/TSDoc:**
- Used in API client functions
- @param, @returns tags
- Function descriptions

**TODO Comments:**
- No TODO/FIXME comments found in codebase

## Function Design

**Size:**
- Functions vary widely (some components >400 lines)
- No strict size limit observed

**Parameters:**
- Object parameters for complex configs (e.g., `StrapiQueryParams`, `FetchOptions`)
- Destructure in parameter list: `{ name, age }: Person`

**Return Values:**
- Explicit returns
- Early returns for error handling (return null on failure)
- Async functions return Promises with typed results

## Module Design

**Exports:**
- Named exports preferred
- Default exports for React components
- No barrel files (index.ts) used

**Barrel Files:**
- Not used - direct imports from files
- Consider adding for better organization

---

*Convention analysis: 2026-01-27*
*Update when patterns change*