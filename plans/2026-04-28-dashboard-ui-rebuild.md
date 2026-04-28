# Task Plan - Dashboard UI Rebuild From docs/UI

## Metadata
- Task: Lam lai dashboard UI bam sat `docs/UI/code.html` va `docs/UI/screen.png`
- Branch goc: `dev`
- Branch lam viec: `feat/ui-foundation-app-shell`
- Trang thai task: `DONE`

## Muc tieu
- Xoa tu duy placeholder chung chung o dashboard goc.
- Rebuild dashboard UI dua tren `docs/UI/code.html` gan nhu nguyen xi.
- Dong bo shell, topbar, content grid, table widget, quick links va visual style theo mockup.

## Pham vi
### In scope
- `apps/web/app/layout.tsx`
- `apps/web/components/layout/dashboard-shell.tsx`
- `apps/web/components/dashboard-home.tsx`
- `apps/web/app/(dashboard)/{me,manager,hr,admin}/page.tsx`
- `apps/web/app/globals.css`

### Out of scope
- Chua noi business API that.
- Chua lam dark/light mode switching.
- Chua doi moi cac route con business detail ngoai dashboard goc.

## Phan viec

### P1 - Phan tich va map code.html
- Status: `DONE`
- Success criteria:
  - Xac dinh ro sidebar, topbar, KPI cards, onboarding table, quick links, promo card.
- Commit map:
  - `docs: initialize dashboard ui rebuild plan`

### P2 - Rebuild dashboard shell
- Status: `DONE`
- Success criteria:
  - Sidebar toi, topbar, search, actions, avatar, content canvas bam sat mockup.
- Commit map:
  - `feat(web): rebuild dashboard shell from UI docs`
  - `feat(web): align dashboard UI closer to code template`

### P3 - Rebuild dashboard content pattern
- Status: `DONE`
- Success criteria:
  - Main dashboard pages su dung dashboard composition moi thay vi placeholder cu.
  - KPI, Recent Onboarding, Quick Links va promo card bam sat `docs/UI/code.html`.
- Commit map:
  - `feat(web): rebuild dashboard shell from UI docs`
  - `feat(web): align dashboard UI closer to code template`

### P4 - Validate & finalize
- Status: `DONE`
- Success criteria:
  - `apps/web` typecheck pass.
  - Plan duoc cap nhat lai trang thai thuc te sau correction pass.
- Commit map:
  - `feat(web): align dashboard UI closer to code template`

## Quy uoc trang thai
- `TODO`
- `IN PROGRESS`
- `DONE`
- `BLOCKED`
