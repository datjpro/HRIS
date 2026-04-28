# HRIS Frontend Implementation Ideas

## 1) Mục tiêu tài liệu
- Dùng tài liệu này để lên ý tưởng và chia task xây dựng FE dựa trên backend hiện có.
- Tập trung vào các màn nghiệp vụ có thể làm ngay (business core đã có API).

## 2) Nguyên tắc kiến trúc FE
- FE (`apps/web`) đóng vai trò UI + BFF.
- Không kết nối DB trực tiếp, không import Prisma.
- Mọi request dữ liệu đi qua HTTP API server (`/api/v1/...`).
- Phân quyền hiển thị dựa trên role nhận được từ token + dữ liệu API.

## 3) Vai trò và khu vực màn hình
### EMPLOYEE
- Dashboard cá nhân
- Hồ sơ cá nhân (`/me`)
- Payslip của tôi
- KPI của tôi
- IDP của tôi
- Onboarding task (nếu có)

### MANAGER
- Dashboard manager
- Danh sách team
- Xem thông tin nhân viên cấp dưới
- Theo dõi recruitment/interview liên quan

### HR
- Dashboard HR
- Quản lý Departments
- Employee Directory + Profile
- Recruitment workspace (request/candidate/application/interview)
- Onboarding workspace
- C&B + KPI workspace
- Learning + IDP + eNPS + Analytics workspace

### ADMIN
- Dashboard admin
- Danh sách users
- (Phase sau) phân quyền nâng cao / cấu hình hệ thống

## 4) Thông tin kỹ thuật cần thống nhất trước khi code FE
- Auth strategy: lưu access token + refresh token, có cơ chế refresh khi 401.
- Error handling: thống nhất hiển thị lỗi từ `ApiError` (`code`, `message`).
- Response contract: parse theo `ApiSuccess<T>` / `ApiError`.
- Table/list strategy: paging/filter/sort (hiện tại nhiều endpoint đang list cơ bản).
- Form strategy: validation client + server error mapping.

## 5) Map endpoint backend -> màn hình FE
### Auth
- `POST /api/v1/auth/login` -> trang `signin`
- `POST /api/v1/auth/refresh` -> tự động refresh session
- `POST /api/v1/auth/register` -> có thể dùng cho flow tạo account ban đầu

### Profile / Employee / Department
- `GET /api/v1/me` -> trang hồ sơ cá nhân
- `GET /api/v1/employees/directory` -> employee directory/team list
- `GET /api/v1/employees/:userId` -> profile detail
- `GET /api/v1/departments` -> danh sách phòng ban
- `GET /api/v1/departments/tree` -> sơ đồ tổ chức
- `POST /api/v1/departments` -> tạo phòng ban
- `PUT /api/v1/departments/:departmentId` -> sửa phòng ban
- `DELETE /api/v1/departments/:departmentId` -> xóa phòng ban

### Recruitment
- `GET /api/v1/recruitment/requests`
- `POST /api/v1/recruitment/requests`
- `POST /api/v1/recruitment/requests/:requestId/approval`
- `GET /api/v1/recruitment/candidates`
- `POST /api/v1/recruitment/candidates`
- `POST /api/v1/recruitment/applications`
- `GET /api/v1/recruitment/applications`
- `POST /api/v1/recruitment/interviews`
- `GET /api/v1/recruitment/interviews`
- `PATCH /api/v1/recruitment/interviews/:interviewId/result`
- `POST /api/v1/recruitment/applications/:applicationId/reject`

### Onboarding
- `POST /api/v1/onboarding/trigger`
- `GET /api/v1/onboarding/plans`
- `GET /api/v1/onboarding/plans/:planId`

### C&B + KPI
- `GET /api/v1/compensation/salary-bands`
- `POST /api/v1/compensation/salary-bands`
- `PUT /api/v1/compensation/salary-bands/:salaryBandId`
- `POST /api/v1/compensation/payroll/generate`
- `GET /api/v1/compensation/payslips`
- `POST /api/v1/compensation/payroll/export`
- `GET /api/v1/kpi/metrics`
- `POST /api/v1/kpi/metrics`
- `GET /api/v1/kpi/results`
- `POST /api/v1/kpi/results`

### Learning / IDP / Culture / Analytics
- `GET /api/v1/learning/courses`
- `POST /api/v1/learning/courses`
- `POST /api/v1/learning/enrollments`
- `GET /api/v1/idp/plans`
- `POST /api/v1/idp/plans`
- `POST /api/v1/culture/enps`
- `GET /api/v1/analytics/dashboard`

### Admin
- `GET /api/v1/admin/users`

## 6) Đề xuất cấu trúc FE (Next.js App Router)
### Route groups
- `(auth)`
  - `/signin`
- `(dashboard)`
  - `/me`
  - `/manager`
  - `/hr`
  - `/admin`

### Feature folders
- `features/auth`
- `features/me`
- `features/employee`
- `features/department`
- `features/recruitment`
- `features/onboarding`
- `features/compensation`
- `features/kpi`
- `features/learning`
- `features/idp`
- `features/culture`
- `features/analytics`
- `features/admin`

### Shared UI / infra
- `components/layout` (AppShell, Sidebar, Topbar)
- `components/table` (DataTable, filters)
- `components/form` (FormField, FormDialog)
- `lib/http` (API client, auth header, refresh flow)
- `lib/guards` (PermissionGuard)

## 7) User flow ưu tiên (MVP trước)
### MVP-1: Auth + Self-service
- Signin + refresh token
- Trang `/me`
- Payslip của tôi

### MVP-2: HR Core Org
- Departments CRUD
- Employee directory + employee detail

### MVP-3: Recruitment + Onboarding
- Hiring requests, approvals, candidates, applications, interviews
- Onboarding trigger + plan/detail

### MVP-4: C&B + KPI
- Salary bands
- KPI metrics/results
- Payroll generate/payslip/export request

### MVP-5: L&D + Culture + Analytics
- Learning courses/enrollments
- IDP plans
- eNPS submit
- Analytics dashboard

## 8) Danh sách component cần thiết kế
- AuthForm
- ProtectedLayout
- RoleBasedSidebar
- EmployeeDirectoryTable
- EmployeeProfilePanel
- DepartmentTreeView
- HiringRequestBoard
- CandidatePipelineTable
- InterviewScheduleCalendar (có thể làm bản đơn giản trước)
- OnboardingPlanTimeline
- SalaryBandManager
- PayrollRunForm
- PayslipTable
- KpiMetricForm + KpiResultForm
- LearningCourseTable
- IdpPlanBoard
- EnpsSurveyForm
- AnalyticsSummaryCards + TrendCharts

## 9) Quy tắc UI/UX quan trọng
- Luôn hiển thị trạng thái loading/skeleton.
- Luôn có empty state cho list.
- Thông báo lỗi theo `error.code` từ backend.
- Các action nguy hiểm (delete, reject) phải có confirm dialog.
- Các route không đủ quyền phải hiển thị 403 page thân thiện.

## 10) Acceptance checklist trước khi go-live FE
- Đăng nhập/đăng xuất/refresh session ổn định.
- Route guard theo role hoạt động đúng.
- Các màn HR core CRUD chạy được end-to-end.
- Các màn Recruitment/Onboarding/C&B/KPI/L&D có luồng tạo-và-xem cơ bản.
- Error states + empty states + loading states đầy đủ.
- Không có route nào gọi trực tiếp DB/Prisma từ FE.

## 11) Ghi chú thực tế hiện tại
- Backend đã đủ business core để làm FE.
- Một số tích hợp production (email provider, report file delivery) hiện đang ở mức nền/workflow.
- FE nên hiển thị trạng thái async cho các action queue-first (ví dụ payroll export request -> queued).
