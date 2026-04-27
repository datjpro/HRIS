# HRIS Monorepo

Monorepo khoi tao cho he thong quan ly nhan su (HRIS) theo kien truc microservices, dung `Bun` + `Turborepo`.

## Kien truc
- `apps/web`: Next.js App Router, UI + BFF server actions
- `apps/server`: Bun + Hono, business logic va RBAC
- `apps/worker`: background jobs va scheduler
- `packages/db`: Prisma schema + client
- `packages/redis`: Redis client + BullMQ queues
- `packages/shared-types`: DTOs, roles, API responses dung chung

## Git workflow
- `main`: nhanh on dinh
- `dev`: nhanh tich hop
- Nhanh cong viec tao tu `dev` theo mau `type/scope-name`
- Vi du: `feat/auth-login`, `fix/rbac-salary`, `docs/plan-template`

## AI coding workflow bat buoc
1. Tao nhanh tu `dev`.
2. Tao file task plan tai `plans/<yyyy-mm-dd>-<task-slug>.md`.
3. Chia task thanh cac phan `P1`, `P2`, `P3` voi trang thai ro rang.
4. Hoan tat phan nao thi cap nhat `DONE` va commit phan do.
5. Khong gom nhieu phan lon chua hoan tat vao mot commit mo ho.

## Cai dat
```bash
cmd /c bun install
```

## Chay tung app
```bash
cmd /c bun run dev:web
cmd /c bun run dev:server
cmd /c bun run dev:worker
```

## Build workspace
```bash
cmd /c bun run build
```

## Ghi chu Windows
- Neu PowerShell chan `bun.ps1`, dung `cmd /c bun ...`.
- Khong dung `npm` hoac `yarn` cho workspace nay.
