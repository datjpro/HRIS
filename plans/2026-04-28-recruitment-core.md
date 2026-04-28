# Task Plan - Recruitment Core (Phase 3)

## Metadata
- Task: Xay dung backend Recruitment core (Hiring Request -> Candidate -> Application -> Interview)
- Branch goc: `dev`
- Branch lam viec: `feat/recruitment-core`
- Trang thai task: `IN PROGRESS`

## Muc tieu
- So hoa quy trinh recruitment tu hiring request den offer/hired.
- API server quan ly request, candidate, application, interview.
- Worker xu ly email notification va SLA 48h cho hiring request.

## Phan viec

### P1 - Schema & Shared Types
- Status: `DONE`
- Success criteria:
  - Prisma schema co `HiringRequest`, `Candidate`, `Application`, `Interview`.
  - Shared types co DTO/response cho recruitment.
- Commit map:
  - `chore: extend schema and shared types for recruitment`

### P2 - Recruitment API
- Status: `IN PROGRESS`
- Success criteria:
  - API tao hiring request, approve/reject request.
  - API CRUD candidate/application/interview co RBAC.
  - API enqueue email jobs va tra ve response dung flow.
- Commit map:
  - `feat: implement recruitment api and queue integration`

### P3 - Worker Jobs & SLA Scheduler
- Status: `TODO`
- Success criteria:
  - Worker xu ly email interview / rejection.
  - Scheduler kiem tra SLA 48h cua hiring request pending.
- Commit map:
  - `feat: implement recruitment worker jobs and sla scheduler`

### P4 - Validation
- Status: `TODO`
- Success criteria:
  - Prisma client generate thanh cong.
  - Build monorepo pass.
- Commit map:
  - `test: validate recruitment flow`

## Quy uoc trang thai
- `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED`
