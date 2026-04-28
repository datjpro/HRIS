# HRIS FE-UI Build Roadmap

## 1. Muc tieu
Tai lieu nay chuyen hoa `docs/UI/DESIGN.md` thanh ke hoach xay dung FE-UI cho `apps/web`, dua tren backend business core da hoan thanh.

Muc tieu la:
- Dung mot UI system nhat quan theo design moi
- Uu tien man nghiep vu quan trong nhat truoc
- Giu dung boundary monorepo: FE chi goi API server, khong cham DB
- Tao duoc dashboard/workspace theo role: `EMPLOYEE`, `MANAGER`, `HR`, `ADMIN`

## 2. Dau vao chinh
### Design input
- `docs/UI/DESIGN.md`
- `docs/UI/code.html`
- `docs/UI/screen.png`

### Product/backend input
- `docs/frontend-implementation-ideas.md`
- Backend routes trong `apps/server/src/routes`
- Shared contracts trong `packages/shared-types`

## 3. Design principles can ap dung cho FE
### Visual language
- Modern Corporate + Minimalism
- Whitespace ro rang, nhin sach, uu tien data readability
- Primary action dung xanh duong lam accent, khong lam UI qua nhieu mau

### Typography
- Dung `Inter`
- Heading semi-bold, body regular, label medium
- Hierarchy dua vao contrast + spacing nhieu hon la thay doi co chu qua manh

### Layout
- Hybrid grid, max container ~ `1280px`
- Sidebar co dinh + content fluid
- Spacing theo buoc `4px`
- Dashboard cards va tables phai uu tien kha nang scan nhanh

### Components
- Card, table, badge, dialog, input, tabs, filter bar, side navigation
- Shadow nhe, border tinh gon, khong dung gradient loe loet

## 4. Uu tien nghiep vu cho FE
Can xay dung UI theo thu tu nghiep vu da co BE san sang nhat:

1. Authentication + Session
2. Employee self-service (`/me`)
3. HR core organization (`departments`, `employee directory`)
4. Recruitment
5. Onboarding
6. C&B + KPI
7. Learning + IDP + eNPS + Analytics
8. Admin workspace

## 5. Kien truc FE de xuat
## Route groups
- `(auth)`
  - `/signin`
- `(dashboard)`
  - `/me`
  - `/manager`
  - `/hr`
  - `/admin`

## Feature modules
- `features/auth`
- `features/dashboard`
- `features/me`
- `features/employees`
- `features/departments`
- `features/recruitment`
- `features/onboarding`
- `features/compensation`
- `features/kpi`
- `features/learning`
- `features/idp`
- `features/culture`
- `features/analytics`
- `features/admin`

## Shared layers
- `components/ui`
- `components/layout`
- `components/data-display`
- `components/forms`
- `lib/api`
- `lib/auth`
- `lib/permissions`
- `lib/formatters`
- `types/view-models`

## 6. Phase-by-phase FE-UI build plan
### Phase UI-1: Design foundation + app shell
**Muc tieu**
- Dung bo khung UI nen cho toan bo he thong

**Pham vi**
- Theme tokens tu design docs
- Typography scale
- Color tokens
- Border radius, spacing, elevation
- AppShell: sidebar, topbar, page container, breadcrumb, page header
- Core reusable components ban dau

**Components phai co**
- `Button`
- `Input`
- `Select`
- `Textarea`
- `Badge`
- `Card`
- `Dialog`
- `Tabs`
- `Table`
- `EmptyState`
- `Skeleton`
- `Toast`
- `PageHeader`
- `SectionHeader`
- `StatCard`

**Ket qua mong doi**
- FE co 1 bo UI consistent voi `docs/UI/DESIGN.md`
- Co layout role-based co the tai su dung cho tat ca modules

**Acceptance criteria**
- Co token mau/chu/khoang cach ro rang
- Co app shell desktop cho dashboard
- Co responsive basic cho laptop/tablet

---

### Phase UI-2: Auth + role-based navigation
**Muc tieu**
- Co trang login va dieu huong dung theo role

**Pham vi**
- Trang `signin`
- Session bootstrap
- Refresh token flow
- Redirect theo role
- Sidebar menu theo role
- 403 page / unauthorized state

**Man hinh**
- `/signin`
- shared `Forbidden` / `Unauthorized` state

**API map**
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`

**Acceptance criteria**
- Login duoc voi account seed
- Session duoc giu on dinh
- Menu khac nhau theo `EMPLOYEE`, `MANAGER`, `HR`, `ADMIN`

---

### Phase UI-3: Employee self-service workspace
**Muc tieu**
- Hoan thien workspace cho nhan vien

**Pham vi**
- Dashboard ca nhan
- Ho so cua toi
- Payslip cua toi
- KPI cua toi
- IDP cua toi
- Onboarding plan cua toi

**Man hinh**
- `/me`
- `/me/profile`
- `/me/payslips`
- `/me/kpi`
- `/me/idp`
- `/me/onboarding`

**API map**
- `GET /api/v1/me`
- `GET /api/v1/compensation/payslips`
- `GET /api/v1/idp/plans`
- `GET /api/v1/onboarding/plans`
- `GET /api/v1/kpi/results`

**UI notes**
- Uu tien card summary + timeline + data table
- Tach thong tin ca nhan / cong viec / compensation thanh tung card

**Acceptance criteria**
- Employee xem duoc du lieu cua minh
- Loading/empty/error states day du

---

### Phase UI-4: HR organization workspace
**Muc tieu**
- Xay khu vuc quan ly co cau to chuc va nhan su

**Pham vi**
- Department list
- Department tree
- Create/update/delete department
- Employee directory
- Employee detail drawer/page

**Man hinh**
- `/hr`
- `/hr/departments`
- `/hr/employees`
- `/hr/employees/[userId]`

**API map**
- `GET /api/v1/departments`
- `GET /api/v1/departments/tree`
- `POST /api/v1/departments`
- `PUT /api/v1/departments/:departmentId`
- `DELETE /api/v1/departments/:departmentId`
- `GET /api/v1/employees/directory`
- `GET /api/v1/employees/:userId`

**UI notes**
- Department tree dung split-pane hoac left tree + right detail
- Employee directory dung table co filter co ban
- Salary fields chi render khi backend tra ve

**Acceptance criteria**
- HR thao tac duoc CRUD department
- Xem directory/profile dung role

---

### Phase UI-5: Recruitment workspace
**Muc tieu**
- Dung full workspace cho tuyen dung

**Pham vi**
- Hiring requests
- Approval flow
- Candidate list
- Application list
- Interview schedule/result
- Reject application action

**Man hinh**
- `/hr/recruitment/requests`
- `/hr/recruitment/candidates`
- `/hr/recruitment/applications`
- `/hr/recruitment/interviews`
- `/manager/recruitment-requests`

**API map**
- `GET/POST /api/v1/recruitment/requests`
- `POST /api/v1/recruitment/requests/:requestId/approval`
- `GET/POST /api/v1/recruitment/candidates`
- `GET/POST /api/v1/recruitment/applications`
- `GET/POST /api/v1/recruitment/interviews`
- `PATCH /api/v1/recruitment/interviews/:interviewId/result`
- `POST /api/v1/recruitment/applications/:applicationId/reject`

**UI notes**
- Uu tien board/list theo status
- Interview result dung status badge ro rang
- Actions quan trong dat trong row action menu + confirm dialog

**Acceptance criteria**
- Co the tao va theo doi request -> candidate -> application -> interview

---

### Phase UI-6: Onboarding workspace
**Muc tieu**
- Hien thi va kich hoat onboarding ro rang cho HR va nhan vien moi

**Pham vi**
- Trigger onboarding
- Danh sach plans
- Chi tiet plan + checklist timeline

**Man hinh**
- `/hr/onboarding`
- `/hr/onboarding/[planId]`
- `/me/onboarding`

**API map**
- `POST /api/v1/onboarding/trigger`
- `GET /api/v1/onboarding/plans`
- `GET /api/v1/onboarding/plans/:planId`

**UI notes**
- Dung timeline/checklist view
- Hien buddy, 30/60/90 tasks, status progression

**Acceptance criteria**
- HR trigger duoc onboarding
- Employee xem duoc task list cua minh

---

### Phase UI-7: C&B + KPI workspace
**Muc tieu**
- Hoan thien khu vuc compensation va performance

**Pham vi**
- Salary bands management
- KPI metrics
- KPI results
- Payroll generate
- Payslip list
- Payroll export request

**Man hinh**
- `/hr/compensation/salary-bands`
- `/hr/compensation/payroll`
- `/hr/compensation/payslips`
- `/hr/kpi/metrics`
- `/hr/kpi/results`
- `/me/payslips`
- `/me/kpi`

**API map**
- `GET/POST/PUT /api/v1/compensation/salary-bands`
- `POST /api/v1/compensation/payroll/generate`
- `GET /api/v1/compensation/payslips`
- `POST /api/v1/compensation/payroll/export`
- `GET/POST /api/v1/kpi/metrics`
- `GET/POST /api/v1/kpi/results`

**UI notes**
- Payroll export la async request -> hien trang thai queued
- KPI can co cards tong quan + table chi tiet

**Acceptance criteria**
- HR thuc hien duoc cac thao tac C&B core
- Employee xem duoc payslip/KPI cua minh

---

### Phase UI-8: Learning + IDP + Culture + Analytics
**Muc tieu**
- Hoan thien nhom workspace nang cao

**Pham vi**
- Learning courses
- Enrollments
- IDP plans
- eNPS survey
- Analytics dashboard

**Man hinh**
- `/hr/learning/courses`
- `/hr/idp`
- `/me/idp`
- `/hr/culture/enps`
- `/hr/analytics`

**API map**
- `GET/POST /api/v1/learning/courses`
- `POST /api/v1/learning/enrollments`
- `GET/POST /api/v1/idp/plans`
- `POST /api/v1/culture/enps`
- `GET /api/v1/analytics/dashboard`

**UI notes**
- Analytics dung stat cards + trend widgets
- eNPS form phai ro rang ve tinh an danh

**Acceptance criteria**
- HR co dashboard va khu vuc learning/idp/culture co ban hoat dong

---

### Phase UI-9: Admin workspace
**Muc tieu**
- Hoan thien khu vuc admin nen tang

**Pham vi**
- User list
- Basic admin dashboard

**Man hinh**
- `/admin`
- `/admin/users`

**API map**
- `GET /api/v1/admin/users`

**Acceptance criteria**
- Admin xem duoc danh sach users va thong tin co ban

## 7. Cross-cutting requirements
### Validation
- Form validation FE phai map gan voi schema backend
- Hien thi server error message theo field neu co the

### Permissions
- Role-based rendering o menu, page, CTA, row actions
- Khong render action ma role khong co quyen

### Async state
- Loading skeleton
- Empty state
- Error boundary/page-level error
- Toast cho create/update/delete/action requests

### Data UX
- Tables can co search/filter basic
- Dialog/form can keyboard-friendly
- Badges/thong ke dung mau theo status

## 8. Thu tu trien khai khuyen nghi
1. Foundation + AppShell
2. Auth + Session + Role menu
3. Employee self-service
4. HR organization
5. Recruitment
6. Onboarding
7. C&B + KPI
8. Learning + Analytics
9. Admin

## 9. Definition of Done cho FE-UI
Mot phase FE-UI duoc xem la xong khi:
- Co page/layout/components dung theo design system
- Hook/API service da noi duoc voi BE that
- Loading/empty/error states day du
- Role visibility dung
- Khong import DB/Prisma trong `apps/web`
- TypeScript strict khong co `any`
- Build duoc trong workspace

## 10. Tai lieu nay dung de lam gi tiep theo
Tu roadmap nay co the tach tiep thanh:
- 1 task plan cho tung phase UI
- 1 task plan scaffold `apps/web`
- 1 task plan implement tung module nghiep vu
