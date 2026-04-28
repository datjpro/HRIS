# Task Plan - C&B + KPI Core (Phase 5)

## Metadata
- Task: Xay dung backend C&B + KPI (salary band, KPI, payslip/payroll, export report)
- Branch goc: `dev`
- Branch lam viec: `feat/cb-kpi-core`
- Trang thai task: `IN PROGRESS`

## Muc tieu
- Quan ly Salary Band, KPI Metric/Result, Payslip.
- API tinh payroll dua tren base salary + KPI bonus + allowance.
- Cache Salary Band bang Redis va enqueue report export sang worker.

## Phan viec

### P1 - Schema & Shared Types
- Status: `DONE`
- Success criteria:
  - Prisma schema co `SalaryBand`, `KpiMetric`, `KpiResult`, `Payslip`.
  - Shared types co DTO/response cho compensation va KPI.
- Commit map:
  - `chore: extend schema and shared types for cb and kpi`

### P2 - API Salary Band / KPI / Payroll
- Status: `IN PROGRESS`
- Success criteria:
  - CRUD Salary Band.
  - API KPI metrics/results.
  - API payroll calculation va payslip generation.
- Commit map:
  - `feat: implement cb and kpi apis`

### P3 - Cache & Worker Export
- Status: `TODO`
- Success criteria:
  - Redis cache salary band.
  - Worker xu ly export payroll report.
- Commit map:
  - `feat: implement salary band cache and payroll export worker`

### P4 - Validation
- Status: `TODO`
- Success criteria:
  - Prisma generate thanh cong.
  - Build monorepo pass.
- Commit map:
  - `test: validate cb and kpi flow`

## Quy uoc trang thai
- `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED`
