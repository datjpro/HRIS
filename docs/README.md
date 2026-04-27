# 📘 Hệ thống Quản lý Nhân sự — Tài liệu nội bộ

> **Phiên bản:** 1.0.0
> **Cập nhật lần cuối:** 2026
> **Đối tượng áp dụng:** Toàn thể nhân viên, quản lý, bộ phận HR

---

## Mục lục tài liệu

| # | Tài liệu | Mô tả | Đối tượng |
|---|---|---|---|
| 01 | [Tuyển dụng](./01-tuyen-dung.md) | Quy trình từ Hiring Request → Offer | HR, Manager, Leadership |
| 02 | [Onboarding & Hội nhập](./02-onboarding.md) | Hành trình 90 ngày đầu | HR, Manager, Nhân viên mới |
| 03 | [C&B & KPI](./03-cb-kpi.md) | Lương thưởng, salary band, hệ thống KPI | HR, Manager, Leadership |
| 04 | [Đào tạo & Phát triển](./04-dao-tao.md) | L&D framework, IDP, training policy | HR, Manager, Nhân viên |
| 05 | [Hiệu suất & Văn hóa](./05-hieu-suat-van-hoa.md) | Performance review, culture, engagement | Toàn bộ |

### Templates đi kèm

| Template | Mục đích |
|---|---|
| [JD Template](./templates/jd-template.md) | Mẫu mô tả công việc chuẩn |
| [Onboarding Checklist](./templates/onboarding-checklist.md) | Checklist hội nhập 90 ngày |
| [KPI Template](./templates/kpi-template.md) | Mẫu thiết lập KPI theo phòng ban |
| [Performance Review Form](./templates/performance-review.md) | Mẫu đánh giá hiệu suất định kỳ |

---

## Kiến trúc hệ thống tổng quan

```
┌─────────────────────────────────────────────────────────────────┐
│                     HỆ THỐNG HR — SME 50–200 NGƯỜI              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [TUYỂN DỤNG] ──▶ [ONBOARDING] ──▶ [VẬN HÀNH] ──▶ [PHÁT TRIỂN]│
│        │                │                │               │      │
│   Hiring Request    30-60-90        C&B + KPI         L&D Plan  │
│   JD + Screening    Checklist       Salary Band        IDP      │
│   Interview         Handbook        Review Cycle       Mentoring │
│   Offer Letter      Buddy System    Thưởng/Phạt        Training  │
│                                                                 │
│                    [VĂN HÓA & GẮN KẾT]                         │
│              Core Values · 1:1 · eNPS · Recognition            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  NỀN TẢNG: Hồ sơ nhân sự · Nội quy lao động · HĐLĐ · Chính sách│
└─────────────────────────────────────────────────────────────────┘
```

---

## Ma trận vai trò & trách nhiệm (RACI tổng quát)

| Hoạt động | HR | Manager | Leadership | Nhân viên |
|---|---|---|---|---|
| Xác định nhu cầu tuyển | I | R | A | — |
| Phỏng vấn vòng 1 | R | I | — | — |
| Phỏng vấn vòng 2 | I | R | C | — |
| Quyết định offer | C | R | A | — |
| Thực hiện onboarding | R | C | — | I |
| Thiết lập KPI | C | R | A | I |
| Đánh giá hiệu suất | R | R | A | R |
| Phê duyệt tăng lương | C | R | A | — |
| Xây dựng IDP | C | R | — | R |
| eNPS / Khảo sát gắn kết | R | I | I | R |

> **R** = Responsible (thực hiện) · **A** = Accountable (phê duyệt) · **C** = Consulted · **I** = Informed

---

## Nguyên tắc vận hành HR

1. **Minh bạch trước** — Mọi chính sách phải được viết thành văn bản và thông báo trước khi áp dụng.
2. **Nhất quán** — Áp dụng đồng đều cho tất cả mọi người, không có ngoại lệ không có cơ sở.
3. **Dữ liệu dẫn dắt** — Mọi quyết định nhân sự cần có bằng chứng (KPI, feedback, attendance...).
4. **Con người là trung tâm** — Hệ thống phục vụ con người, không phải ngược lại.
5. **Cải tiến liên tục** — Review và cập nhật chính sách ít nhất 1 lần/năm.

---

## Liên hệ & Góp ý

Mọi thắc mắc về tài liệu, liên hệ **Bộ phận HR** qua:
- Email nội bộ: `hr@company.com`
- Slack/Teams: `#hr-support`
- Giờ hỗ trợ: Thứ 2 – Thứ 6, 8:00 – 17:30
