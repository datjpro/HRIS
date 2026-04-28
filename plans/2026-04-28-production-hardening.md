# Task Plan - Production Hardening

## Metadata
- Task: Hardening production cho backend HRIS
- Branch goc: `dev`
- Branch lam viec: `chore/production-hardening`
- Trang thai task: `IN PROGRESS`

## Muc tieu
- Chuan hoa migration + seed workflow.
- Them audit logging va rate limit cho auth/report APIs.
- Them smoke tests de kiem tra API co ban.

## Phan viec

### P1 - Migration & Seed Workflow
- Status: `IN PROGRESS`
- Success criteria:
  - Co script migrate/deploy/reset/seed ro rang.
  - Co seed demo data cho local testing.
- Commit map:
  - `chore: add migration and seed workflow`

### P2 - Audit Logging & Rate Limit
- Status: `TODO`
- Success criteria:
  - Co middleware request log co request-id.
  - Co rate limiting cho auth va payroll export APIs.
- Commit map:
  - `feat: add audit logging and rate limiting`

### P3 - API Smoke Tests
- Status: `TODO`
- Success criteria:
  - Co test script smoke check health/auth/protected routes.
  - Co huong dan chay test.
- Commit map:
  - `test: add api smoke tests`

### P4 - Validation
- Status: `TODO`
- Success criteria:
  - bun install + prisma generate + build pass.
- Commit map:
  - `test: validate production hardening`

## Quy uoc trang thai
- `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED`
