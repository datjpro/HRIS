# Task Plan - Onboarding Core (Phase 4)

## Metadata
- Task: Xay dung backend onboarding core (trigger hired -> tao checklist 30-60-90 -> gan buddy)
- Branch goc: `dev`
- Branch lam viec: `feat/onboarding-core`
- Trang thai task: `IN PROGRESS`

## Muc tieu
- Khi candidate/application duoc hire, system tao onboarding plan tu dong.
- API server trigger onboarding va worker sinh checklist 30-60-90.
- Ho tro buddy assignment va theo doi task trang thai.

## Phan viec

### P1 - Schema & Shared Types
- Status: `IN PROGRESS`
- Success criteria:
  - Prisma schema co `OnboardingPlan`, `OnboardingTask`.
  - Shared types co DTO/response cho onboarding.
- Commit map:
  - `chore: extend schema and shared types for onboarding`

### P2 - Onboarding API Trigger
- Status: `TODO`
- Success criteria:
  - API hire candidate/application.
  - API trigger onboarding va xem plan/task.
  - Server enqueue onboarding generation job.
- Commit map:
  - `feat: implement onboarding api and trigger flow`

### P3 - Worker Checklist Generation
- Status: `TODO`
- Success criteria:
  - Worker tao checklist 30-60-90.
  - Auto assign buddy neu co manager/direct report phu hop.
- Commit map:
  - `feat: implement onboarding worker checklist generation`

### P4 - Validation
- Status: `TODO`
- Success criteria:
  - Prisma client generate thanh cong.
  - Build monorepo pass.
- Commit map:
  - `test: validate onboarding flow`

## Quy uoc trang thai
- `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED`
