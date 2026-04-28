# Task Plan - Implement Phase UI-1 (Foundation + App Shell)

## Metadata
- Task: Implement Phase UI-1 cho FE-UI HRIS
- Branch goc: `dev`
- Branch lam viec de xuat: `feat/ui-foundation-app-shell`
- Trang thai task: `IN PROGRESS`
- Tai lieu tham chieu:
  - `docs/UI/DESIGN.md`
  - `docs/UI/code.html`
  - `docs/fe-ui-build-roadmap.md`
  - `docs/frontend-implementation-ideas.md`

## Muc tieu
Xay dung nen tang giao dien co the tai su dung cho toan bo `apps/web`, bao gom:
- design tokens theo UI docs
- typography, spacing, elevation, color system
- app shell cho dashboard
- core reusable components ban dau
- page scaffolding de cac phase sau co the lap tuc mo rong

## Pham vi
### In scope
- Cai dat foundation UI cho `apps/web`
- Theme tokens / CSS variables / Tailwind mapping (neu dang dung Tailwind)
- Layout shell: sidebar, topbar, content container, breadcrumb/page header
- Reusable components nen tang:
  - `Button`
  - `Input`
  - `Select`
  - `Textarea`
  - `Badge`
  - `Card`
  - `Dialog`
  - `Tabs`
  - `Table` (base shell)
  - `EmptyState`
  - `Skeleton`
  - `Toast` / feedback wrapper
  - `PageHeader`
  - `SectionHeader`
  - `StatCard`
- Scaffold route-level layout cho `(dashboard)`
- Responsive baseline cho desktop/laptop/tablet

### Out of scope
- Chua implement business pages day du
- Chua noi full API business modules
- Chua lam charts nang cao
- Chua toi uu dark mode neu UI docs chua yeu cau
- Chua implement role/business workflows chi tiet ngoai navigation shell co ban

## Nguyen tac thuc hien
- Bám dung `docs/UI/DESIGN.md`: Modern Corporate, minimalism, 4px spacing, max width ~1280px.
- Dung `Inter` lam font chinh.
- FE chi la UI + BFF, khong import Prisma/DB.
- Khong dung `any`, giu TypeScript strict.
- Uu tien reusable components truoc khi lap page business.
- Moi thay doi lon phai map duoc voi mot phan viec va commit rieng.

## Files / Thu muc du kien tac dong
- `apps/web/app/**`
- `apps/web/components/**`
- `apps/web/lib/**`
- `apps/web/styles/**`
- `apps/web/tailwind.config.*` hoac file config styling tuong duong
- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/README.md` (neu can)
- `plans/2026-04-28-phase-ui-1-implementation.md`

## Phan viec chi tiet

### P1 - Theme Foundation
- Status: `DONE`
- Muc tieu:
  - Dua design tokens tu `docs/UI/DESIGN.md` vao he thong FE.
- Cong viec:
  - Khai bao color tokens
  - Khai bao typography scale
  - Khai bao spacing/radius/shadow
  - Them `Inter` va global base styles
- Success criteria:
  - UI co token nhat quan va co the tai su dung
  - Co global style dung voi design docs
- Files du kien:
  - `apps/web/app/globals.css`
  - `apps/web/tailwind.config.*` hoac config tuong duong
  - `apps/web/app/layout.tsx`
- Commit map:
  - `feat(web): add UI theme foundation tokens`

### P2 - Core UI Components
- Status: `DONE`
- Muc tieu:
  - Dung bo components nen co style thong nhat.
- Cong viec:
  - Tao `Button`, `Input`, `Select`, `Textarea`
  - Tao `Card`, `Badge`, `Dialog`, `Tabs`
  - Tao `Skeleton`, `EmptyState`, `Table` base
  - Tao helper class utils neu can
- Success criteria:
  - Components render duoc, style nhat quan, tai su dung duoc
  - Co variants co ban cho action/neutral/destructive
- Files du kien:
  - `apps/web/components/ui/**`
  - `apps/web/lib/**`
- Commit map:
  - `feat(web): add core UI component library`

### P3 - Dashboard App Shell
- Status: `DONE`
- Muc tieu:
  - Tao layout dashboard dung design docs.
- Cong viec:
  - Tao sidebar
  - Tao topbar
  - Tao content container + page header + breadcrumb scaffold
  - Ho tro responsive collapse cho sidebar o man hinh hep
- Success criteria:
  - Co shell dashboard co the dung chung cho HR/Manager/Me/Admin
  - Navigation co cau truc ro rang va de mo rong
- Files du kien:
  - `apps/web/components/layout/**`
  - `apps/web/app/(dashboard)/**`
- Commit map:
  - `feat(web): add dashboard app shell layout`

### P4 - Navigation & Placeholder Pages
- Status: `DONE`
- Muc tieu:
  - Co route placeholder de test shell va flow dieu huong.
- Cong viec:
  - Tao placeholder pages cho `/me`, `/manager`, `/hr`, `/admin`
  - Gan page header, stat cards mau, quick links mau theo design
  - Co empty/loading/demo states de review UI
- Success criteria:
  - Mo route len nhin thay shell + page blocks dung huong design
  - Co the review va chot UI foundation truoc khi vao module business
- Files du kien:
  - `apps/web/app/(dashboard)/**/page.tsx`
  - `apps/web/components/data-display/**`
- Commit map:
  - `feat(web): add dashboard placeholder pages`

### P5 - Quality Gate & Polish
- Status: `TODO`
- Muc tieu:
  - Chot baseline chat luong cho Phase UI-1.
- Cong viec:
  - Build/typecheck
  - Soat responsive co ban
  - Soat consistency spacing/color/typography
  - Cap nhat tai lieu neu can
- Success criteria:
  - `apps/web` build pass
  - UI foundation du on dinh de chuyen sang Phase UI-2
- Files du kien:
  - `apps/web/**`
  - `docs/fe-ui-build-roadmap.md`
  - `plans/2026-04-28-phase-ui-1-implementation.md`
- Commit map:
  - `chore(web): validate phase UI-1 foundation`

## Thu tu thuc hien de xuat
1. P1 - Theme Foundation
2. P2 - Core UI Components
3. P3 - Dashboard App Shell
4. P4 - Navigation & Placeholder Pages
5. P5 - Quality Gate & Polish

## Dependencies / Gia dinh
- `apps/web` da co scaffold Next.js App Router.
- Co the tiep tuc dung bo styling hien co cua project; neu chua du, uu tien mo rong toi thieu thay vi thay he thong qua lon.
- Business modules API chua can noi day du trong Phase UI-1.

## Rui ro / Luu y
- Khong nen lam business pages qua som khi shell/components chua on dinh.
- Khong hardcode logic permission vao UI component low-level.
- Neu build Next trong sandbox gap `spawn EPERM`, can test lai o moi truong local thong thuong de xac nhan UI build.

## Definition of Done
Phase UI-1 duoc xem la xong khi:
- Co theme foundation dung theo UI docs
- Co component library nen tang co the tai su dung
- Co app shell dashboard dung cho cac role workspaces
- Co placeholder pages de review UI
- `apps/web` typecheck/build hop le trong moi truong local
- Tat ca phan viec trong plan duoc cap nhat trang thai chinh xac
- Moi phan `DONE` da co commit tuong ung

## Quy uoc trang thai
- `TODO`
- `IN PROGRESS`
- `DONE`
- `BLOCKED`
