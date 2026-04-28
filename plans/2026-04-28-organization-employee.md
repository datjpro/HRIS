# Task Plan - Organization & Employee (Phase 2)

## Metadata
- Task: Xay dung co cau phong ban va ho so nhan su (Org & Employee Core)
- Branch goc: `dev`
- Branch lam viec: `feat/organization-employee-core`
- Trang thai task: `DONE`

## Muc tieu
- Quan ly Department, EmployeeProfile, Contract theo RBAC.
- Ho tro view directory cho Employee / Manager / HR / Admin.
- Cache org structure bang Redis.

## Phan viec

### P1 - Schema & Shared Types
- Status: `DONE`
- Success criteria:
  - Prisma schema co `Department`, `EmployeeProfile`, `Contract`.
  - Shared types co DTO/response cho department va employee directory.
- Commit map:
  - `chore: extend schema and shared types for org and employee`

### P2 - Department API + Cache
- Status: `DONE`
- Success criteria:
  - CRUD Department cho HR/Admin.
  - Redis cache org tree cho read APIs.
- Commit map:
  - `feat: implement department api with org cache`

### P3 - Employee Directory & Profile
- Status: `DONE`
- Success criteria:
  - Employee chi xem basic/self.
  - Manager xem team.
  - HR/Admin xem full, co baseSalary.
- Commit map:
  - `feat: implement employee directory and profile apis`

### P4 - Validation
- Status: `DONE`

## Ket qua
- Build monorepo thanh cong sau khi trien khai Department API, Employee Directory va Profile detail.
- Directory va profile da ap dung RBAC theo role va field-level visibility cho `baseSalary`.
- Success criteria:
  - Build monorepo pass.
  - API compile/type-safe.
- Commit map:
  - `test: validate organization and employee flow`

## Quy uoc trang thai
- `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED`
