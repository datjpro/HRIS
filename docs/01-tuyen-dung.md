# 01 — Quy trình Tuyển dụng (Recruitment)

> **Phạm vi áp dụng:** HR, Quản lý trực tiếp (Hiring Manager), Ban lãnh đạo
> **Chu kỳ review:** 1 năm/lần hoặc khi có thay đổi cơ cấu

---

## Mục lục

- [Tổng quan flow](#tổng-quan-flow)
- [Chi tiết từng bước](#chi-tiết-từng-bước)
- [Vai trò & trách nhiệm](#vai-trò--trách-nhiệm)
- [SLA & Tiêu chuẩn chất lượng](#sla--tiêu-chuẩn-chất-lượng)
- [Công cụ & Tài liệu](#công-cụ--tài-liệu)
- [Quy định & Chính sách](#quy-định--chính-sách)

---

## Tổng quan flow

```
[Hiring Manager]          [HR]                  [Leadership]          [Ứng viên]
      │                    │                          │                    │
      ▼                    │                          │                    │
 Phát sinh nhu cầu         │                          │                    │
 Điền Hiring Request  ───▶ │                          │                    │
      │                    ▼                          │                    │
      │             Tiếp nhận & thẩm định             │                    │
      │             (48h làm việc)                    │                    │
      │                    │                          │                    │
      │                    ▼                          │                    │
      │             Xin phê duyệt headcount ────────▶ │                    │
      │                    │                   Duyệt/Từ chối               │
      │                    │ ◀────────────────────── │                    │
      │                    │                          │                    │
      │             [Nếu DUYỆT]                       │                    │
      │                    ▼                          │                    │
      │             Viết JD + đăng tuyển              │                    │
      │             (các kênh phù hợp)                │           Nhận JD, nộp CV
      │                    │                          │      ◀─────────────│
      │                    ▼                          │                    │
      │             Sàng lọc CV theo scorecard        │                    │
      │             (5 ngày làm việc)                 │                    │
      │                    │                          │                    │
      │                    ▼                          │                    │
      │             Liên hệ & xếp lịch PV vòng 1     │      ◀─────────────│
      │                    │                          │                    │
      │                    ▼                          │       Tham dự PV 1 │
      │             PHỎNG VẤN VÒNG 1 (HR)            │ ◀──────────────────│
      │             - Culture fit                     │                    │
      │             - Soft skills                     │                    │
      │             - Kỳ vọng lương                  │                    │
      │                    │                          │                    │
      │             [Pass vòng 1]                     │                    │
      │ ◀──────────────────│                          │                    │
      ▼                    │                          │                    │
 PHỎNG VẤN VÒNG 2          │                          │       Tham dự PV 2 │
 (Hiring Manager)          │                          │ ◀──────────────────│
 - Technical/Domain        │                          │                    │
 - Case study / bài test   │                          │                    │
      │                    │                          │                    │
      ▼                    │                          │                    │
 Điền Interview Scorecard  │                          │                    │
 Đề xuất Offer ──────────▶ │                          │                    │
      │                    ▼                          │                    │
      │             So sánh salary band               │                    │
      │             Soạn Offer Letter    ────────────▶│                    │
      │                    │                   Phê duyệt Offer             │
      │                    │ ◀─────────────────────── │                    │
      │                    ▼                          │                    │
      │             Gửi Offer cho ứng viên ──────────────────────────────▶ │
      │                    │                          │   Chấp nhận / Từ chối
      │                    │ ◀────────────────────────────────────────────│
      │                    ▼                          │                    │
      │             Xử lý paperwork                   │                    │
      │             Chuyển sang Onboarding            │                    │
```

---

## Chi tiết từng bước

### Bước 1 — Xác định nhu cầu tuyển dụng

**Người thực hiện:** Hiring Manager

**Điều kiện kích hoạt:**
- Nhân viên nghỉ việc cần thay thế
- Mở rộng team theo kế hoạch tăng trưởng
- Dự án mới cần nhân lực bổ sung

**Hành động:**
1. Điền **Hiring Request Form** (xem template đính kèm)
2. Xác định rõ: vị trí, cấp bậc, mức lương dự kiến, timeline cần có người
3. Được manager cấp trên ký xác nhận trước khi gửi HR

**Output:** Hiring Request Form đã được duyệt bởi quản lý cấp trên

---

### Bước 2 — Thẩm định & Phê duyệt Headcount

**Người thực hiện:** HR + Leadership

**Thời gian xử lý:** Tối đa **3 ngày làm việc**

**HR thẩm định:**
- Kiểm tra headcount budget còn lại
- Đánh giá mức độ ưu tiên so với các vị trí khác đang mở
- Xác nhận salary range phù hợp với band lương hiện tại

**Leadership phê duyệt:**
- CEO/COO ký duyệt nếu vị trí từ Level 3 trở lên hoặc mức lương trên ngưỡng quy định
- Trưởng phòng HR ký duyệt cho các vị trí Level 1–2

**Output:** Email xác nhận phê duyệt từ HR/Leadership → Hiring Manager

---

### Bước 3 — Xây dựng JD & Đăng tuyển

**Người thực hiện:** HR (phối hợp Hiring Manager)

**Viết JD chuẩn (theo [JD Template](./templates/jd-template.md)):**
- Tên vị trí chính xác và title tiếng Anh (nếu có)
- Mô tả công việc: 5–7 đầu việc chính, dùng động từ hành động
- Yêu cầu: chia 2 nhóm **Must-have** và **Nice-to-have**
- Quyền lợi: liệt kê cụ thể, không dùng "cạnh tranh" chung chung
- Thông tin công ty: mô tả ngắn gọn, văn hóa, quy mô

**Kênh đăng tuyển theo vị trí:**

| Loại vị trí | Kênh ưu tiên |
|---|---|
| Tất cả | Internal Job Board (thông báo nội bộ trước 3 ngày) |
| Tech / Product | LinkedIn, TopDev, ITviec |
| Non-tech | TopCV, VietnamWorks, LinkedIn |
| Senior / Specialist | LinkedIn Premium, Headhunter |
| Intern | Facebook Groups, trường ĐH đối tác |

**Employee Referral Program:**
- Nhân viên giới thiệu người quen → thưởng **[X] triệu đồng** sau khi người được giới thiệu hoàn thành 3 tháng thử việc
- Thông báo rõ ràng qua Slack/email nội bộ khi có vị trí mở

---

### Bước 4 — Sàng lọc CV

**Người thực hiện:** HR

**Thời gian:** Tối đa **5 ngày làm việc** kể từ ngày đăng tuyển

**Quy trình sàng lọc:**

1. Dùng **CV Scorecard** (xem mục công cụ) — chấm điểm theo tiêu chí, không đánh giá cảm tính
2. Phân loại CV thành 3 nhóm:
   - ✅ **Pass** → Gửi lịch phỏng vấn vòng 1
   - 🔁 **Hold** → Giữ lại, xét sau nếu vòng 1 không đủ ứng viên
   - ❌ **Reject** → Gửi email từ chối lịch sự trong 48h

**Tiêu chí scorecard mẫu (điều chỉnh theo vị trí):**

| Tiêu chí | Điểm tối đa | Ghi chú |
|---|---|---|
| Kinh nghiệm liên quan | 30 | Số năm + độ liên quan ngành |
| Học vấn / Chứng chỉ | 15 | Phù hợp với JD |
| Thành tích nổi bật | 25 | Có số liệu cụ thể |
| Trình bày CV | 10 | Rõ ràng, không lỗi chính tả |
| Kỳ vọng lương phù hợp | 20 | Nằm trong band lương |
| **Tổng** | **100** | Pass: ≥ 65 điểm |

---

### Bước 5 — Phỏng vấn Vòng 1 (HR Interview)

**Người thực hiện:** HR

**Thời lượng:** 45–60 phút

**Mục tiêu:**
- Xác minh thông tin trong CV
- Đánh giá culture fit và soft skills
- Giới thiệu công ty, vị trí, kỳ vọng
- Sàng lọc về kỳ vọng lương và timeline

**Cấu trúc buổi phỏng vấn:**

```
00–05 phút   │ Chào hỏi, làm quen, giới thiệu format buổi PV
05–15 phút   │ Ứng viên tự giới thiệu bản thân
15–35 phút   │ HR hỏi behavioral questions (STAR method)
35–45 phút   │ HR giới thiệu công ty, văn hóa, quyền lợi
45–55 phút   │ Ứng viên đặt câu hỏi
55–60 phút   │ Thông báo bước tiếp theo & timeline
```

**Câu hỏi gợi ý (Culture Fit):**
- *"Kể về một môi trường làm việc mà bạn cảm thấy phát triển nhất. Điều gì khiến nó phù hợp với bạn?"*
- *"Bạn xử lý thế nào khi có conflict với đồng nghiệp / quản lý?"*
- *"Điều gì khiến bạn chọn ứng tuyển vị trí này tại thời điểm này?"*
- *"5 năm tới bạn muốn phát triển theo hướng nào?"*

**Output:** Interview note + Scorecard vòng 1 → Chia sẻ với Hiring Manager

---

### Bước 6 — Phỏng vấn Vòng 2 (Technical/Manager Interview)

**Người thực hiện:** Hiring Manager (+ có thể có thêm 1 senior trong team)

**Thời lượng:** 60–90 phút

**Mục tiêu:**
- Đánh giá năng lực chuyên môn, tư duy, kinh nghiệm
- Case study hoặc bài test thực tế (nếu cần)
- Xác nhận fit với team và phong cách làm việc

**Cấu trúc:**

```
00–05 phút   │ Chào hỏi
05–20 phút   │ Deep-dive kinh nghiệm chuyên môn
20–50 phút   │ Case study / Technical questions / Bài test
50–70 phút   │ Scenario questions (xử lý tình huống)
70–85 phút   │ Ứng viên đặt câu hỏi về team/công việc
85–90 phút   │ Thông báo bước tiếp theo
```

**Sau phỏng vấn:**
- Hiring Manager điền **Interview Scorecard** trong vòng **24h**
- Gửi nhận xét cho HR kèm đề xuất: Pass / Reject / cần vòng 3

---

### Bước 7 — Đề xuất & Gửi Offer

**Người thực hiện:** HR (phối hợp Hiring Manager + Leadership)

**Quy trình:**

1. HR kiểm tra salary expectation vs. band lương hiện tại
2. Hiring Manager đề xuất mức offer cụ thể (base + KPI + benefits)
3. HR soạn **Offer Letter** theo template, trình Leadership ký duyệt
4. Gửi offer qua email cho ứng viên → **deadline phản hồi: 3 ngày làm việc**
5. HR follow-up qua phone/Zalo nếu chưa có phản hồi sau 48h

**Xử lý counter-offer:**
- Nếu ứng viên counter: Hiring Manager + HR hội ý trong **24h**
- Không negotiate quá **[X]%** so với offer ban đầu trừ trường hợp đặc biệt (cần CEO duyệt)

**Sau khi ứng viên xác nhận:**
- Gửi **Welcome Email** với thông tin ngày đầu đi làm
- Gửi checklist chuẩn bị giấy tờ
- Chuyển hồ sơ sang bộ phận **Onboarding**

---

## Vai trò & Trách nhiệm

| Vai trò | Trách nhiệm chính |
|---|---|
| **HR Recruiter** | Quản lý toàn bộ pipeline, sàng lọc CV, PV vòng 1, soạn offer |
| **Hiring Manager** | Xác nhận nhu cầu, PV vòng 2, quyết định offer, scorecard |
| **HR Manager** | Duyệt JD, duyệt offer trong band, báo cáo recruitment metrics |
| **CEO/COO** | Duyệt headcount mới, duyệt offer vượt band hoặc cấp cao |
| **IT/Admin** | Chuẩn bị thiết bị, tài khoản trước ngày nhân viên vào |

---

## SLA & Tiêu chuẩn chất lượng

| Chỉ số | Mục tiêu | Ghi chú |
|---|---|---|
| Time to Fill | ≤ 30 ngày (non-tech) / ≤ 45 ngày (tech) | Tính từ ngày duyệt headcount |
| Time to Hire | ≤ 21 ngày | Tính từ ngày ứng viên apply |
| Offer Acceptance Rate | ≥ 80% | |
| CV-to-Interview Rate | 15–20% | |
| Phản hồi CV (reject) | ≤ 48h | Không để ứng viên chờ vô hạn |
| Phỏng vấn → Feedback | ≤ 24h | Hiring Manager gửi scorecard |
| Tỷ lệ pass thử việc | ≥ 85% | Nếu thấp → review lại quy trình PV |

---

## Công cụ & Tài liệu

### Công cụ gợi nghị

| Công cụ | Mục đích | Chi phí |
|---|---|---|
| Google Sheets / Notion | Quản lý pipeline ứng viên | Miễn phí |
| Base HRM / GreatDay | ATS tích hợp cho SME Việt Nam | Có phí |
| TopCV / VietnamWorks | Job board | Có phí |
| LinkedIn Recruiter Lite | Sourcing chủ động | Có phí |
| Google Meet / Zoom | Phỏng vấn online | Miễn phí / Có phí |

### Tài liệu mẫu

- 📄 [Hiring Request Form](./templates/hiring-request-form.md)
- 📄 [JD Template](./templates/jd-template.md)
- 📄 [CV Scorecard](./templates/cv-scorecard.md)
- 📄 [Interview Scorecard](./templates/interview-scorecard.md)
- 📄 [Offer Letter Template](./templates/offer-letter.md)

---

## Quy định & Chính sách

### Nguyên tắc tuyển dụng

- **Không phân biệt đối xử** theo giới tính, tuổi tác, tôn giáo, ngoại hình trong quá trình tuyển dụng
- **Bảo mật thông tin ứng viên** — dữ liệu CV chỉ được chia sẻ trong nội bộ, không được gửi ra ngoài
- **Ưu tiên nội bộ** — thông báo nội bộ trước ít nhất 3 ngày trước khi đăng ngoài

### Tuyển dụng người thân

- Nhân viên không được tham gia quyết định tuyển dụng đối với người thân trực tiếp (vợ/chồng, anh chị em, bố mẹ)
- Phải khai báo quan hệ với HR trước khi bắt đầu quy trình

### Bảo mật thông tin

- Mức lương offer không được tiết lộ với nhân viên khác
- Hiring Manager không tự ý làm offer ngoài quy trình — mọi offer phải qua HR

### Lưu trữ hồ sơ

- Hồ sơ ứng viên được tuyển: lưu trữ **vĩnh viễn** trong hệ thống
- Hồ sơ ứng viên không được tuyển: lưu trữ **2 năm** (có thể liên hệ lại sau)
- Xóa dữ liệu theo yêu cầu của ứng viên trong vòng 30 ngày
