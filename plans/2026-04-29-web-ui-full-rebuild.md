# Task Plan - Rebuild Full Web UI theo docs/UI

## Metadata
- Task: Lam lai toan bo giao dien Web de test theo `docs/UI/code.html`
- Branch goc: `dev`
- Branch lam viec: `feat/ui-foundation-app-shell`
- Trang thai task: `DONE`

## Muc tieu
- Xoa triet de mindset placeholder tren route dashboard va route con.
- Rebuild giao dien theo ngon ngu visual cua `docs/UI/code.html` gan nhu nguyen xi.
- Dong bo shell, topbar, cards, bang du lieu, quick links cho toan bo route `/me`, `/manager`, `/hr`, `/admin`.

## Pham vi
### In scope
- `apps/web/app/layout.tsx`
- `apps/web/components/layout/dashboard-shell.tsx`
- `apps/web/components/dashboard-home.tsx`
- `apps/web/components/dashboard-detail-page.tsx`
- `apps/web/app/(dashboard)/**/page.tsx`
- `apps/web/app/globals.css`

### Out of scope
- Khong noi API business that.
- Khong thay doi stack styling ngoai CSS token hien co.

## Phan viec

### P1 - Tao plan va khoa workflow
- Status: `DONE`
- Success criteria:
  - Co file plan moi theo ngay hien tai va chia P1..P5 ro rang.
- Commit map:
  - `docs(web): add full ui rebuild task plan`

### P2 - Rebuild shell va dashboard goc
- Status: `DONE`
- Success criteria:
  - `/me`, `/manager`, `/hr`, `/admin` dung shell + dashboard pattern sat `docs/UI/code.html`.
- Commit map:
  - `feat(web): align dashboard shell and home to ui docs`

### P3 - Rebuild toan bo route con business
- Status: `DONE`
- Success criteria:
  - Khong con page nao render `ModulePlaceholder`.
  - Tat ca route con dung layout card/table/quick links cung nguyen tac visual voi dashboard.
- Commit map:
  - `feat(web): rebuild dashboard subpages with real ui patterns`

### P4 - Polish style va responsive baseline
- Status: `DONE`
- Success criteria:
  - Spacing, typography, border, state hover/focus dong bo.
  - Mobile baseline khong vo layout.
- Commit map:
  - `chore(web): polish ui docs fidelity and responsive baseline`

### P5 - Validate va dong task
- Status: `DONE`
- Success criteria:
  - `bun run --cwd apps/web typecheck` pass.
  - Plan cap nhat `DONE` va map commit day du.
- Commit map:
  - `chore(web): validate full web ui rebuild`

## Quy uoc trang thai
- `TODO`
- `IN PROGRESS`
- `DONE`
- `BLOCKED`

## Ket qua validation
- `bun run --cwd apps/web typecheck`: pass
- `bun run --cwd apps/web lint`: pass

## Commit map cap nhat
- `e00e19e` - `docs(web): add full ui rebuild task plan` (P1)
- `427267b` - `feat(web): rebuild dashboard subpages with ui docs patterns` (P2, P3, P4)
- `chore(web): validate full web ui rebuild` (P5)
