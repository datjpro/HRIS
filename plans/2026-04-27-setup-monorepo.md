# Task Plan - Setup monorepo HRIS

## Metadata
- Task: Setup monorepo HRIS + bo sung noi quy AI Coding
- Branch goc: `dev`
- Branch lam viec: `chore/setup-monorepo`
- Trang thai task: `IN PROGRESS`

## Muc tieu
- Dung scaffold monorepo `Bun` + `Turborepo` theo kien truc HRIS.
- Bo sung quy dinh AI coding bat buoc co `plan.md`, commit theo tung phan.
- Khoi tao `apps/web`, `apps/server`, `apps/worker`, `packages/db`, `packages/redis`, `packages/shared-types`.

## Pham vi
- Co scaffold va tai lieu huong dan run/build.
- Co RBAC/middleware mau o server.
- Chua implement nghiep vu HR chi tiet.

## Phan viec

### P1 - Git workflow + task planning
- Status: `DONE`
- Success criteria:
  - Tao `dev` branch.
  - Tao branch `chore/setup-monorepo` tu `dev`.
  - Tao file `plan.md` cho task hien tai.
- Files du kien tac dong:
  - `plans/2026-04-27-setup-monorepo.md`
- Commit map:
  - `chore: initialize task plan and branch workflow`

### P2 - AI coding rules + root documentation
- Status: `DONE`
- Success criteria:
  - `AGENTS.md` bo sung quy dinh `plan.md` va commit theo phase.
  - `README.md` mo ta cau truc va cach run workspace.
- Files du kien tac dong:
  - `AGENTS.md`
  - `README.md`
- Commit map:
  - `docs: add AI coding rules and root setup guide`

### P3 - Root monorepo + shared packages
- Status: `DONE`
- Success criteria:
  - Co `package.json`, `turbo.json`, `bunfig.toml`, `tsconfig.base.json`, `.editorconfig`, `.env.example`.
  - Co `packages/shared-types`, `packages/db`, `packages/redis` build duoc.
- Files du kien tac dong:
  - `package.json`
  - `turbo.json`
  - `tsconfig.base.json`
  - `packages/shared-types/*`
  - `packages/db/*`
  - `packages/redis/*`
- Commit map:
  - `chore: scaffold root workspace and shared packages`

### P4 - App scaffolds
- Status: `IN PROGRESS`
- Success criteria:
  - Web co App Router scaffold va server actions chi goi API.
  - Server co Hono app, middleware auth/role va route mau.
  - Worker co queue consumer va scheduler scaffold.
- Files du kien tac dong:
  - `apps/web/*`
  - `apps/server/*`
  - `apps/worker/*`
- Commit map:
  - `feat: scaffold web server and worker apps`

### P5 - Validation
- Status: `TODO`
- Success criteria:
  - `cmd /c bun install` thanh cong.
  - `cmd /c bun run build` thanh cong.
  - Co the start scaffold apps o muc co ban.
- Files du kien tac dong:
  - `bun.lock`
  - Cac file config neu can chinh sua sau validation
- Commit map:
  - `chore: validate workspace build`

## Quy uoc trang thai
- `TODO`: Chua bat dau
- `IN PROGRESS`: Dang thuc hien
- `DONE`: Hoan tat va da san sang commit
- `BLOCKED`: Bi chan, can ghi ro ly do
