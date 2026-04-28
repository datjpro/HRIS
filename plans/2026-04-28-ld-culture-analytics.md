# Task Plan - L&D, Culture & Analytics (Phase 6)

## Metadata
- Task: Xay dung backend L&D, Culture va Analytics
- Branch goc: `dev`
- Branch lam viec: `feat/ld-culture-analytics`
- Trang thai task: `IN PROGRESS`

## Muc tieu
- Quan ly Training Course, IDP, eNPS an danh va dashboard analytics.
- Co cron kiem tra vi pham cam ket dao tao.
- Hoan tat phase backend cuoi cho HRIS core.

## Phan viec

### P1 - Schema & Shared Types
- Status: `IN PROGRESS`
- Success criteria:
  - Prisma schema co `TrainingCourse`, `TrainingEnrollment`, `IdpPlan`, `EnpsSurvey`.
  - Shared types co DTO/response cho L&D, Culture, Analytics.
- Commit map:
  - `chore: extend schema and shared types for ld culture analytics`

### P2 - API Training / IDP / eNPS / Analytics
- Status: `TODO`
- Success criteria:
  - API CRUD training courses va enrollments.
  - API IDP management.
  - API eNPS submit an danh.
  - API analytics dashboard.
- Commit map:
  - `feat: implement ld culture and analytics apis`

### P3 - Training Commitment Cron
- Status: `TODO`
- Success criteria:
  - Scheduler kiem tra vi pham cam ket dao tao.
  - Co logging/alert queue noi bo cho violation.
- Commit map:
  - `feat: implement training commitment scheduler`

### P4 - Validation
- Status: `TODO`
- Success criteria:
  - Prisma generate thanh cong.
  - Build monorepo pass.
- Commit map:
  - `test: validate ld culture analytics flow`

## Quy uoc trang thai
- `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED`
