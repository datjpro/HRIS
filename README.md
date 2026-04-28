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

## Chay local DB + Redis
```bash
docker compose up -d
```

Mac dinh services:
- Postgres: `localhost:5432`
- Redis: `localhost:6379`

## Database workflow
```bash
cmd /c bun run db:generate
cmd /c bun run db:migrate
cmd /c bun run db:seed
cmd /c bun run db:deploy
```

Luong local de khoi dong backend:
```bash
docker compose up -d
cmd /c bun run db:generate
cmd /c bun run db:migrate
cmd /c bun run db:seed
cmd /c bun run dev:server
cmd /c bun run dev:worker
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

## API smoke test
```bash
cmd /c bun run test:smoke
```

Can set custom API URL via `API_BASE_URL`.

## Ghi chu Windows
- Neu PowerShell chan `bun.ps1`, dung `cmd /c bun ...`.
- Khong dung `npm` hoac `yarn` cho workspace nay.
