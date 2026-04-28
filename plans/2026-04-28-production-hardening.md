# Task Plan - Production Hardening

## Metadata
- Task: Hardening production cho backend HRIS
- Branch goc: `dev`
- Branch lam viec: `chore/local-docker-infra`
- Trang thai task: `DONE`

## Muc tieu
- Chuan hoa migration + seed workflow.
- Them audit logging va rate limit cho auth/report APIs.
- Them smoke tests de kiem tra API co ban.

## Phan viec

### P1 - Migration & Seed Workflow
- Status: `DONE`
- Success criteria:
  - Co script migrate/deploy/reset/seed ro rang.
  - Co seed demo data cho local testing.
- Commit map:
  - `chore: add migration and seed workflow`

### P2 - Audit Logging & Rate Limit
- Status: `DONE`
- Success criteria:
  - Co middleware request log co request-id.
  - Co rate limiting cho auth va payroll export APIs.
- Commit map:
  - `feat: add audit logging and rate limiting`

### P3 - API Smoke Tests
- Status: `DONE`
- Success criteria:
  - Co test script smoke check health/auth/protected routes.
  - Co huong dan chay test.
- Commit map:
  - `test: add api smoke tests`

### P4 - Validation
- Status: `DONE`
- Success criteria:
  - bun install + prisma generate + build pass.
- Commit map:
  - `test: validate production hardening`

### P5 - Local Infrastructure
- Status: `DONE`
- Success criteria:
  - Co `docker-compose.yml` cho Postgres va Redis de chay local.
  - README mo ta luong khoi dong local DB/Redis va backend.
- Commit map:
  - `chore: add local docker infra for postgres and redis`

## Quy uoc trang thai
- `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED`
