# Codebase Concerns

**Analysis Date:** 2026-01-27

## Tech Debt

**Duplicate Strapi service implementations:**
- Issue: Two different Strapi client implementations exist
- Files: `src/services/strapi.ts` (old), `src/lib/api/client.ts` (new)
- Why: New API client created without removing old implementation
- Impact: Confusion about which to use, potential maintenance burden
- Fix approach: Deprecate `src/services/strapi.ts`, migrate any remaining usage to `src/lib/api/client.ts`

**Legacy service directory:**
- Issue: `src/services/` directory exists but `src/lib/api/` is the new pattern
- Files: `src/services/strapi.ts`
- Why: Architecture evolution without cleanup
- Impact: Inconsistent codebase organization
- Fix approach: Remove `src/services/` directory, consolidate all API functions in `src/lib/api/`

## Known Bugs

**No known bugs identified** - No TODO/FIXME comments found in codebase

## Security Considerations

**Console logging in production:**
- Risk: Sensitive data could be logged in production
- Files: `src/lib/api/client.ts`, `src/app/api/revalidate/route.ts`, `src/context/GlobalSettingsContext.tsx`, `src/hooks/useExternalNavigation.ts`, `src/lib/api/careers.ts`, `src/lib/api/contact.ts`, `src/features/contact/ContactPage.tsx`
- Current mitigation: None
- Recommendations: Remove or conditional compile console.log statements, use proper logging library

**No input validation on forms:**
- Risk: Form submissions may not be validated properly
- Files: Contact form in `src/features/contact/ContactPage.tsx`, job application form
- Current mitigation: Browser HTML5 validation only
- Recommendations: Add Zod or similar validation library, validate on server-side

**Webhook secret validation:**
- Risk: Webhook endpoint only validates header, no signature verification
- File: `src/app/api/revalidate/route.ts`
- Current mitigation: Simple secret header comparison
- Recommendations: Consider using signature-based webhook verification for Strapi

## Performance Bottlenecks

**Large component files:**
- Problem: Some components are very large (>400 lines), may affect maintainability
- File: `src/features/booking/BookingFlow.tsx` (~415 lines)
- Measurement: 415 lines
- Cause: Complex booking UI with multiple steps
- Improvement path: Extract sub-components (ServiceSelector, Calendar, TimeSlots, ConfirmationFooter)

**No loading states for API calls:**
- Problem: Pages may show empty states while fetching from Strapi
- Files: Multiple page components
- Measurement: Subjective UX issue
- Cause: No loading skeleton or spinner patterns
- Improvement path: Add loading states using Suspense boundaries or loading components

## Fragile Areas

**GlobalSettingsContext assumptions:**
- File: `src/context/GlobalSettingsContext.tsx`
- Why fragile: Context assumes global settings always available from API
- Common failures: If global settings API fails, app may not handle gracefully
- Safe modification: Add fallback values in provider
- Test coverage: No integration tests

**Strapi API client error handling:**
- File: `src/lib/api/client.ts`
- Why fragile: Returns null on all errors, calling code may not handle null properly
- Common failures: Components may crash if null not handled
- Safe modification: Add proper error types, document null return behavior
- Test coverage: No tests

## Scaling Limits

**Next.js ISR caching:**
- Current capacity: Dependent on hosting platform (Vercel, etc.)
- Limit: Not defined in code
- Symptoms at limit: Not defined
- Scaling path: Not defined

## Dependencies at Risk

**No outdated dependencies identified** - Dependencies are relatively recent (React 19.2.3, Next.js 16.1.0)

## Missing Critical Features

**No tests:**
- Problem: Zero test coverage across entire codebase
- Current workaround: Manual testing only
- Blocks: Confidence in refactoring, regression prevention
- Implementation complexity: High (need to add test framework, write many tests)

**No error boundaries:**
- Problem: No React Error Boundary components
- Current workaround: Browser's default error display
- Blocks: Graceful error handling, user-friendly error pages
- Implementation complexity: Low (add Error Boundary components)

**No monitoring/analytics:**
- Problem: No error tracking, performance monitoring, or user analytics
- Current workaround: Console logs only
- Blocks: Production issue visibility, performance optimization
- Implementation complexity: Medium (integrate Sentry, Vercel Analytics, etc.)

## Test Coverage Gaps

**Entire codebase untested:**
- What's not tested: All components, API functions, hooks
- Risk: Refactoring may break functionality, no regression prevention
- Priority: High
- Difficulty to test: Medium-High (need to add test framework first)

---

*Concerns audit: 2026-01-27*
*Update as issues are fixed or new ones discovered*