# 🤖 MASTER AI INSTRUCTIONS (HRIS PROJECT)

> **MỤC TIÊU:**  
> Đảm bảo mọi AI Agent (Claude, Cursor, Grok, v.v.) hoạt động nhất quán, tuân thủ nghiêm ngặt kiến trúc **Microservices/Monorepo** và nghiệp vụ của Hệ thống Quản lý Nhân sự (HRIS).  
> **BẮT BUỘC ĐỌC VÀ TUÂN THỦ TOÀN BỘ FILE NÀY TRƯỚC KHI BẮT ĐẦU BẤT KỲ TASK NÀO.**

---

## 1. TECH STACK & KIẾN TRÚC TỔNG QUAN

Hệ thống sử dụng kiến trúc **Monorepo** (Turborepo + npm workspaces) với các thành phần được phân tách rõ ràng:

- **Runtime chung:** Bun (Tuyệt đối không dùng `npm` hoặc `yarn`)
- **Ngôn ngữ:** TypeScript (Strict mode: `true`, cấm dùng `any`)
- **Web Frontend:** Next.js 14+ (App Router) – Đóng vai trò UI và BFF (Backend-For-Frontend)
- **API Server:** Bun + Hono (hoặc Elysia) – Xử lý toàn bộ Business Logic
- **Background Worker:** Bun/Node process độc lập – Xử lý tác vụ nặng, bất đồng bộ
- **Cache & Message Queue:** Redis + BullMQ
- **Database:** PostgreSQL
- **ORM:** Prisma

---

## 2. NHIỆM VỤ CỦA TỪNG THÀNH PHẦN (SYSTEM TOPOLOGY)

AI phải viết code đúng vào đúng module. Tuyệt đối không viết code vượt quyền hạn của module.

### 🌐 1. Web Frontend (`apps/web`)
- Nhiệm vụ: Render UI, quản lý state client, gọi API qua Server Actions.
- Ràng buộc: **Không được import Prisma hoặc query Database trực tiếp**. Server Actions chỉ dùng để gọi HTTP đến API Server.

### ⚙️ 2. API Server (`apps/server`)
- Nhiệm vụ: Xử lý toàn bộ Business Logic, CRUD Database, kiểm tra quyền (RBAC), trả về JSON.
- Ràng buộc: Đây là nơi **duy nhất** được phép giao tiếp với Database (qua `packages/db`).

### 🛠️ 3. Background Worker (`apps/worker`)
- Nhiệm vụ: Xử lý các tác vụ tốn thời gian (gửi email, xuất báo cáo Excel/PDF, tạo checklist onboarding, cron jobs…).
- Cơ chế: Lắng nghe job từ Redis Queue do API Server đẩy vào.

### ⚡ 4. Redis (`packages/redis`)
- Cache: Lưu session, cấu trúc tổ chức, phân quyền, Salary Band…
- Queue: Message Broker giữa API Server và Worker.

---

## 3. QUY TẮC PHÂN QUYỀN (RBAC) - CỰC KỲ QUAN TRỌNG

Kiểm tra quyền **bắt buộc thực hiện tại API Server** thông qua Middleware.

| Role       | Quyền hạn                                                                 |
|------------|---------------------------------------------------------------------------|
| **EMPLOYEE**   | Chỉ xem dữ liệu cá nhân (lương, KPI, IDP, hồ sơ của chính mình)         |
| **MANAGER**    | Xem dữ liệu cá nhân + nhân viên cấp dưới trực tiếp. **Tuyệt đối không xem lương của Manager khác.** |
| **HR**         | Xem và chỉnh sửa dữ liệu toàn bộ công ty (Tuyển dụng, Onboarding, C&B, …) |
| **ADMIN**      | Quản lý Master Data, cấu hình hệ thống, phân quyền người dùng            |

**Quy tắc bảo mật:**
- Mọi API route phải đi qua `authMiddleware` và `roleMiddleware`.
- Trả về **HTTP 403 Forbidden** nếu không đủ quyền.
- Dữ liệu nhạy cảm (như `baseSalary`) phải được filter tại API Server trước khi trả về Frontend.

---

## 4. KIẾN TRÚC THƯ MỤC (MONOREPO STRUCTURE)

```text
hris-monorepo/
├── apps/
│   ├── web/                  # Next.js Frontend
│   │   ├── app/              # App Router: (auth), (dashboard)/hr, /manager, /me
│   │   ├── components/       # UI Components & Feature Components
│   │   └── actions/          # Server Actions (chỉ gọi API Server)
│   ├── server/               # API Backend (Bun + Hono)
│   │   ├── controllers/      # Business Logic
│   │   ├── middlewares/      # Auth & RBAC Middleware
│   │   └── routes/           # API Routes
│   └── worker/               # Background Jobs
│       ├── jobs/             # Xử lý các job cụ thể
│       └── scheduler/        # Cron jobs
├── packages/
│   ├── db/                   # Prisma Schema & Client
│   │   └── prisma/schema.prisma
│   ├── redis/                # Redis Client & Queue Configuration
│   └── shared-types/         # TypeScript types dùng chung cho toàn bộ monorepo

5. QUY TẮC CODE (DO'S & DON'TS)
DO (BẮT BUỘC):

Đặt tất cả interface/type dùng chung (DTOs, API Responses…) vào packages/shared-types.
Offload tác vụ nặng: API Server chỉ cập nhật state trong DB → đẩy Job vào Redis Queue → trả về 202 Accepted. Worker sẽ xử lý phần còn lại.
Sử dụng Redis Cache cho dữ liệu ít thay đổi (phòng ban, phân quyền, Salary Band…).

DON'T (CẤM TUYỆT ĐỐI):

Không gọi Prisma từ apps/web.
Không gọi API bên thứ 3 chậm chạp trực tiếp trong apps/server (phải đẩy sang Worker).
Không lưu trữ logic tính lương hoặc dữ liệu nhạy cảm ở Frontend.


6. BỐI CẢNH NGHIỆP VỤ & PHÂN CHIA TÁC VỤ
Tham chiếu các file tài liệu nghiệp vụ (01 ~ 05):

Tuyển dụng (01-tuyen-dung.md): Worker đếm ngược SLA 48h, gửi email từ chối CV tự động.
Onboarding (02-onboarding.md): API Server cập nhật “Hired” → Worker tự động tạo checklist 30-60-90 và gán Buddy.
C&B + KPI (03-cb-kpi.md): Công thức lương = Base + KPI/Thưởng + Phụ cấp. Cache Salary Band bằng Redis.
Đào tạo (04-dao-tao.md): Worker chạy cronjob kiểm tra vi phạm cam kết đào tạo.
Hiệu suất & Văn hóa (05-hieu-suat-van-hoa.md): eNPS phải ẩn danh tuyệt đối (không lưu user_id).


7. QUY TRÌNH LÀM VIỆC CỦA AI (BẮT BUỘC)
Khi nhận task, AI phải thực hiện đúng 3 bước sau:

Phân tích (Think)
Đọc file nghiệp vụ liên quan. Xác định tính năng sẽ chạm vào module nào (Web, Server, Worker, Redis).
Đề xuất (Plan)
Liệt kê rõ các file/thư mục sẽ can thiệp trong monorepo và giải pháp đồng bộ/bất đồng bộ.
Thực thi (Execute)
Viết code đúng theo kiến trúc phân tán đã định nghĩa.

---

## 8. QUY ĐỊNH AI CODING WORKFLOW (BẮT BUỘC)

Mọi task có sử dụng AI để phân tích, viết code, sửa lỗi, refactor hoặc cập nhật tài liệu đều phải tuân thủ đầy đủ các quy định sau:

### 8.1. Bắt buộc tạo file kế hoạch task
- Trước khi bắt đầu code, phải tạo file kế hoạch tại thư mục `plans/` theo mẫu:
  - `plans/<yyyy-mm-dd>-<task-slug>.md`
- Không được bắt đầu sửa code khi chưa có file kế hoạch task.

### 8.2. Nội dung tối thiểu của file kế hoạch
File kế hoạch phải có đầy đủ các mục sau:
- Metadata task
- Mục tiêu
- Phạm vi (in scope / out of scope)
- Danh sách phần việc
- Trạng thái từng phần việc
- Tiêu chí hoàn thành của từng phần
- Danh sách file/thư mục dự kiến tác động
- Commit map tương ứng với từng phần

### 8.3. Quy ước chia phần việc
- Mỗi task phải được chia thành các phần rõ ràng như `P1`, `P2`, `P3`, ...
- Mỗi phần phải có mục tiêu độc lập, có thể kiểm tra và có thể commit riêng.
- Không gộp nhiều thay đổi lớn, khác mục tiêu vào cùng một phần việc.

### 8.4. Trạng thái bắt buộc
Mỗi phần việc trong file kế hoạch phải có một trong các trạng thái sau:
- `TODO`
- `IN PROGRESS`
- `DONE`
- `BLOCKED`

### 8.5. Quy định commit theo từng phần
- Khi một phần việc được chuyển sang `DONE`, bắt buộc phải tạo commit tương ứng cho phần đó.
- Mỗi phần hoàn thành phải map được với ít nhất một commit rõ ràng.
- Không được dồn nhiều phần lớn chưa hoàn tất vào một commit mơ hồ cuối task.
- Commit message phải phản ánh đúng mục tiêu phần việc đã hoàn tất.

### 8.6. Quy định branch workflow
- `main` là nhánh ổn định.
- `dev` là nhánh tích hợp chung.
- Mọi nhánh làm việc phải được tạo từ `dev`.
- Quy ước đặt tên nhánh:
  - `feat/<scope-name>`
  - `fix/<scope-name>`
  - `chore/<scope-name>`
  - `docs/<scope-name>`
  - `refactor/<scope-name>`

Ví dụ:
- `feat/auth-login`
- `fix/rbac-employee-profile`
- `chore/setup-monorepo`

### 8.7. Quy định cập nhật kế hoạch trong quá trình làm
- Trước khi làm phần mới, phải cập nhật trạng thái trong `plan.md`.
- Sau khi hoàn tất phần việc, phải đổi trạng thái sang `DONE` trước hoặc cùng lúc với commit tương ứng.
- Nếu bị chặn, phải chuyển phần đó sang `BLOCKED` và ghi rõ nguyên nhân.

### 8.8. Quy định nghiệm thu task
Một task chỉ được xem là hoàn tất khi thỏa đủ các điều kiện:
- Tất cả phần việc trong `plan.md` đã được cập nhật trạng thái chính xác.
- Mỗi phần `DONE` đã có commit tương ứng.
- Code tuân thủ đúng module boundary của monorepo HRIS.
- Có bước kiểm tra tối thiểu: build, typecheck hoặc test phù hợp với phạm vi thay đổi.
