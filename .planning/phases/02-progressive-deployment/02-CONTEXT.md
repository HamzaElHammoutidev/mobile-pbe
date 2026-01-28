---
phase: 02-progressive-deployment
created: 2026-01-27
vision-session: discuss-phase
---

# Phase 2 Vision: Progressive Deployment

## How It Works

**Docker Compose for Local Development**
- Each page runs as its own service in docker-compose.yml
- Developers can spin up all pages locally with `docker-compose up`
- Services are independently manageable, can be added/removed without affecting others
- Follows microservices-like structure for frontend pages

**Staging Environment with Preview URLs**
- Auto-generated preview URLs per commit/branch
- Each commit automatically builds and deploys to a unique preview environment
- Pages can be reviewed in isolation before production
- No manual deployment steps needed - push code → URL appears

**Single Production Deployment**
- While local dev uses Docker Compose services, production uses a single Docker image deployment
- All pages bundled together for production
- Simpler production infrastructure, avoids distributed frontend complexity

## Essential Deliverables (Core Focus)

The primary goal is **Docker infrastructure + local dev workflow**:
1. Docker Compose setup that works for all 9 pages
2. Clear, maintainable structure for adding new pages
3. Developers can develop locally the same way as production-ish
4. Foundation that staging/preview can build on

## Out of Scope (Explicit Boundaries)

- ❌ **Strapi Integration** — Content stays hardcoded (Phase 3 work)
- ❌ **Database/Backend** — Frontend Docker only, no backend services
- ❌ **Production Optimization** — No caching, CDN, monitoring setup yet (Phase 4)
- ❌ **Multi-environment production** — Only dev and staging; production comes later

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Docker Compose services in dev only | Maintains flexibility in dev (per-service control) while keeping production simple and deployable | Simplifies ops, no microservices complexity in prod |
| Auto-generated preview URLs | Removes manual deployment friction, enables easy review workflow | Every commit gets reviewable, no asking "how do I see this?" |
| Preview per commit/branch | Enables continuous review, not blocked by PR process | Reviewers can see work in progress immediately |
| Single production image | Avoids distributed frontend ops challenges | Easier to scale, monitor, troubleshoot in production |

## Prerequisites from Phase 1

✓ All 9 pages implemented and responsive (Phase 1 complete)
✓ Next.js App Router structure in place
✓ Component architecture established
✓ Hardcoded content ready (content stays as-is)

## Phase Success Criteria

- [ ] Docker Compose file with all 9 pages as services
- [ ] Local development setup tested (can spin up all pages with one command)
- [ ] Staging infrastructure ready (auto-generates preview URLs)
- [ ] Clear documentation for adding new pages to Docker setup
- [ ] Reviewers have clear preview URLs to validate each page
- [ ] Ready for Phase 3 (Strapi integration builds on top)

---

*Vision captured: 2026-01-27*
*Next: Planning Phase 2 with `/gsd:plan-phase 2`*
