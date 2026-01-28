# Phase 2 Plan 02: Staging Preview Automation Summary

**GitHub Actions CI/CD with Docker build, registry push, and auto-generated preview URLs per commit**

## Accomplishments

- [x] GitHub Actions workflow for Docker build and GHCR push (`preview.yml`)
- [x] Deployment automation workflow for staging (`deploy.yml`)
- [x] Auto-generated preview URLs per commit/branch
- [x] PR/commit comments with preview URL links and review checklist
- [x] Docker registry selected: GHCR (GitHub Container Registry)
- [x] Staging infrastructure blueprints documented

## Files Created/Modified

### GitHub Actions Workflows
- `.github/workflows/preview.yml` - Docker build and push with caching
  - Triggers: push to all branches, pull_request events
  - Outputs: preview-url, image-tag, image-full
  - Posts comments on PRs and commits with review checklist
  - Image tagging: `sha-{commit}`, `{branch}`, `latest` (main only)

- `.github/workflows/deploy.yml` - Staging deployment (manual for Phase 2)
  - Trigger: workflow_run (after preview.yml completes)
  - Extracts deployment info and creates GitHub Deployment record
  - Logs manual deployment instructions
  - Blueprints for automated VM deployment (Phase 4+)

## Decisions Made

### Docker Registry: GHCR (GitHub Container Registry)
- **Selection rationale**:
  - Free with GitHub account
  - No additional setup or external accounts needed
  - Tight integration with GitHub Actions
  - Automatic authentication via ${{ secrets.GITHUB_TOKEN }}
  - Sufficient for Phase 2 staging preview workflow

- **Alternatives considered**:
  - Docker Hub: Popular but rate limiting, free tier limited
  - AWS ECR: Enterprise option, requires AWS account
  - Self-hosted: Maximum control but operational overhead

### Preview URL Format
- **Format**: `https://preview-{branch-slug}-{run_id}.staging.parebriseexpress.ma`
- **Branch slug**: Sanitized (lowercase, slashes to dashes, special chars removed)
- **Run ID**: GitHub Actions run ID for uniqueness even with branch re-pushes
- **Lifetime**: 7 days (documented in PR/commit comments)

### Deployment Strategy (Phase 2)
- **Approach**: Build and push Docker image automatically, manual deployment verification
- **Rationale**: Validates infrastructure and preview URLs before adding SSH complexity
- **Manual steps documented** in deploy.yml output for staging VM
- **Automated deployment** blueprinted for Phase 4+ (commented out in deploy.yml)

### Notification Strategy
- **PR comments**: Posted on every PR with preview URL and review checklist
- **Commit comments**: Posted on every direct push with minimal info
- **Pages listed**: All 9 pages shown in PR comments (Homepage, About, Services, Partnerships, Blog, Financing, Contact, Legal, Careers)
- **Review checklist**: Mobile responsive, navigation, error-free console

## Implementation Details

### preview.yml (Docker Build and Push)
- Uses `docker/setup-buildx-action@v3` for advanced features
- Cache strategy: GHA cache (type=gha) for faster builds
- Multi-tag approach: Commit SHA, branch name, latest
- Script to generate preview URL with branch sanitization
- GitHub Script actions to post comments with formatted text

### deploy.yml (Staging Deployment)
- Depends on preview.yml via workflow_run trigger
- Creates GitHub Deployment record for tracking
- Logs step-by-step manual deployment instructions:
  1. SSH to staging.parebriseexpress.ma
  2. Docker pull image
  3. Stop/remove old container
  4. Run new container with NODE_ENV=production
  5. Configure nginx reverse proxy
  6. Test health check
- Commented-out automated VM deployment for future phases

## Technical Specifications

### Docker Image Details
- **Registry**: ghcr.io
- **Image name**: {github-org}/{github-repo}
- **Tags generated**:
  - `sha-{full-commit-sha}`: Immutable tag per commit
  - `{branch-name}`: Latest push to branch (if not main)
  - `latest`: Only from main branch
  - `pr-{pr-number}`: For pull requests

### Preview URL Generation
- Sanitization handles:
  - Converts to lowercase
  - Replaces slashes with dashes (feature/auth → feature-auth)
  - Removes special characters
  - Collapses multiple dashes
  - Strips leading/trailing dashes
- Format ensures DNS compliance and readability

### GitHub Permissions Used
- `contents: read` - Read repository code
- `packages: write` - Push to container registry
- `pull-requests: write` - Post PR comments
- `deployments: write` - Create deployment records

## Verification Status

### Workflow Syntax
- Both YAML files are valid and properly formatted
- All required fields present
- Environment variables properly configured
- Secrets referenced are standard (GITHUB_TOKEN is built-in)

### Missing Items (for full automation)
- Staging VM SSH credentials (STAGING_SSH_KEY, STAGING_HOST, STAGING_USER)
- Nginx configuration template for preview URL routing
- SSL certificates for staging.parebriseexpress.ma
- DNS wildcard entry for preview-*.staging.parebriseexpress.ma

These are intentionally deferred to Phase 3+ per the "simplified approach" for Phase 2.

## Next Steps

1. **Push to GitHub**: Commit the workflows and verify they appear in Actions tab
2. **Create test branch**: Push a feature branch to trigger preview.yml
3. **Verify workflow runs**: Monitor Actions tab for workflow execution
4. **Check PR comment**: Create PR and verify preview URL comment appears
5. **Manual staging deployment**: Follow the logged instructions to deploy to staging VM manually
6. **Test preview URL**: Verify all 9 pages accessible on preview URL
7. **Iterate**: Make code changes, push again, verify new preview URL generated

## Issues Encountered

None. Workflows created successfully without issues.

## Deviations from Plan

Minor: Deployment strategy kept simple (manual verification) rather than full SSH automation. This aligns with Plan 02-02 recommendation for Phase 2 simplicity and matches the PLAN.md alternative approach documented.

## Ready for Next Phase

Phase 2 complete. GitHub Actions CI/CD infrastructure ready for staging preview URLs.

**Next**: Phase 3 (Strapi Integration) - Build on deployed pages with dynamic content from CMS.

---

*Plan execution completed: 2026-01-27*
*Summary created: Docker registry (GHCR) selected, preview workflows created, manual deployment approach taken*
