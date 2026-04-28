import type { DashboardDetailPageProps } from "./dashboard-detail-page";

export const dashboardDetailConfigs: Record<string, DashboardDetailPageProps> = {
  meProfile: {
    eyebrow: "Employee Workspace",
    title: "My Profile",
    description: "Review personal identity, reporting line, employment details, and sensitive profile sections in a cleaner self-service layout.",
    primaryActionLabel: "Update Profile",
    secondaryActionLabel: "Export Summary",
    metrics: [
      { icon: "badge", value: "06", label: "Profile Blocks", detail: "Identity, contact, job, payroll, emergency, documents", accentClass: "codeui-metric__icon--blue" },
      { icon: "edit_square", value: "12", label: "Editable Fields", detail: "Self-service coverage approved for employees", accentClass: "codeui-metric__icon--green" },
      { icon: "shield", value: "RBAC", label: "Protected Fields", detail: "Compensation and contract details stay server-controlled", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Profile Sections",
    tableSubtitle: "A cleaner breakdown of profile information employees access most often.",
    columns: [
      { key: "section", label: "Section" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "identity", primary: "Personal Identity", secondary: "Legal name, DOB, national ID", values: ["Employee", ""], status: "Ready", statusClass: "codeui-status--success", avatar: "PI", avatarClass: "codeui-table__avatar--blue" },
      { id: "job", primary: "Job Details", secondary: "Title, department, manager, level", values: ["HRIS", ""], status: "Synced", statusClass: "codeui-status--info", avatar: "JD", avatarClass: "codeui-table__avatar--neutral" },
      { id: "sensitive", primary: "Sensitive Compensation", secondary: "Base salary and contract metadata", values: ["HR Only", ""], status: "Restricted", statusClass: "codeui-status--warning", avatar: "SC", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/me/payslips", icon: "receipt_long", label: "My Payslips" },
      { href: "/me/kpi", icon: "query_stats", label: "My KPI" },
      { href: "/me/idp", icon: "school", label: "My Development Plan" }
    ],
    promoTitle: "Profile Refresh",
    promoDescription: "Keep employee records accurate before compensation and review cycles begin."
  },
  mePayslips: {
    eyebrow: "Employee Workspace",
    title: "My Payslips",
    description: "Browse payroll periods, document availability, and compensation status with a cleaner finance-oriented table.",
    primaryActionLabel: "Download Pack",
    secondaryActionLabel: "Export History",
    metrics: [
      { icon: "calendar_month", value: "12", label: "Periods", detail: "Monthly records visible in the current fiscal year", accentClass: "codeui-metric__icon--blue" },
      { icon: "picture_as_pdf", value: "PDF", label: "Formats", detail: "Download-ready statement output planned", accentClass: "codeui-metric__icon--green" },
      { icon: "lock", value: "Self", label: "Visibility", detail: "Only the employee sees their payroll history", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Recent Payroll Periods",
    tableSubtitle: "Track issued salary statements and processing status by month.",
    columns: [
      { key: "period", label: "Period" },
      { key: "amount", label: "Net Pay" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "apr", primary: "April 2026 Payroll", secondary: "Issued 26 Apr 2026", values: ["42,500,000 VND", ""], status: "Available", statusClass: "codeui-status--success", avatar: "04", avatarClass: "codeui-table__avatar--blue" },
      { id: "mar", primary: "March 2026 Payroll", secondary: "Issued 26 Mar 2026", values: ["42,500,000 VND", ""], status: "Available", statusClass: "codeui-status--success", avatar: "03", avatarClass: "codeui-table__avatar--neutral" },
      { id: "may", primary: "May 2026 Payroll", secondary: "Scheduled closing 28 May 2026", values: ["Pending close", ""], status: "In Review", statusClass: "codeui-status--info", avatar: "05", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/me/profile", icon: "account_circle", label: "Profile Overview" },
      { href: "/me/kpi", icon: "trending_up", label: "KPI Results" },
      { href: "/me/onboarding", icon: "task", label: "Onboarding Tasks" }
    ],
    promoTitle: "Payroll Transparency",
    promoDescription: "Self-service salary history reduces manual HR support and keeps audits simple."
  },
  meKpi: {
    eyebrow: "Employee Workspace",
    title: "My KPI",
    description: "Follow score progress, review milestones, and bonus-driving metrics in a cleaner performance workspace.",
    primaryActionLabel: "Review Metrics",
    secondaryActionLabel: "Export Progress",
    metrics: [
      { icon: "event", value: "Q2", label: "Current Cycle", detail: "Performance review window is active", accentClass: "codeui-metric__icon--blue" },
      { icon: "speed", value: "83%", label: "Completion", detail: "Individual target progress remains healthy", accentClass: "codeui-metric__icon--green" },
      { icon: "leaderboard", value: "05", label: "Tracked Metrics", detail: "Weighted scorecard visible to the employee", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Performance Metrics",
    tableSubtitle: "A compact KPI table modeled after the dashboard visual language.",
    columns: [
      { key: "metric", label: "Metric" },
      { key: "owner", label: "Weight" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "delivery", primary: "Delivery Efficiency", secondary: "Sprint throughput and release quality", values: ["35%", ""], status: "On Track", statusClass: "codeui-status--success", avatar: "DE", avatarClass: "codeui-table__avatar--blue" },
      { id: "quality", primary: "Quality Score", secondary: "Defect escape and stability outcomes", values: ["25%", ""], status: "Stable", statusClass: "codeui-status--info", avatar: "QS", avatarClass: "codeui-table__avatar--neutral" },
      { id: "growth", primary: "Learning Goal", secondary: "Certification and mentoring commitment", values: ["15%", ""], status: "Needs Update", statusClass: "codeui-status--warning", avatar: "LG", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/me/idp", icon: "school", label: "Individual Development Plan" },
      { href: "/me/profile", icon: "badge", label: "Profile Details" },
      { href: "/me/payslips", icon: "payments", label: "Payslip History" }
    ],
    promoTitle: "Performance Module",
    promoDescription: "Use the rebuilt KPI workspace as the foundation for result and bonus visualizations."
  },
  meOnboarding: {
    eyebrow: "Employee Workspace",
    title: "My Onboarding",
    description: "View 30-60-90 milestones, buddy support, and task completion in a polished onboarding timeline view.",
    primaryActionLabel: "Open Checklist",
    secondaryActionLabel: "Export Plan",
    metrics: [
      { icon: "timeline", value: "30/60/90", label: "Timeline", detail: "Milestones structured by phase", accentClass: "codeui-metric__icon--blue" },
      { icon: "task_alt", value: "14", label: "Tasks", detail: "Current checklist items assigned", accentClass: "codeui-metric__icon--green" },
      { icon: "diversity_3", value: "01", label: "Buddy", detail: "A support partner is assigned", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Onboarding Milestones",
    tableSubtitle: "Track the most important tasks and who owns each checkpoint.",
    columns: [
      { key: "task", label: "Task" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "docs", primary: "Complete Employee Documentation", secondary: "Submit all required IDs and payroll forms", values: ["Employee", ""], status: "In Progress", statusClass: "codeui-status--info", avatar: "ED", avatarClass: "codeui-table__avatar--blue" },
      { id: "it", primary: "Receive IT Assets", secondary: "Laptop, email, and collaboration access", values: ["IT Team", ""], status: "Completed", statusClass: "codeui-status--success", avatar: "IT", avatarClass: "codeui-table__avatar--neutral" },
      { id: "buddy", primary: "Meet Assigned Buddy", secondary: "Introductory session and first-week check-in", values: ["Buddy", ""], status: "Action Required", statusClass: "codeui-status--warning", avatar: "BD", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/me/profile", icon: "person", label: "Profile Setup" },
      { href: "/me/idp", icon: "rocket_launch", label: "Growth Plan" },
      { href: "/me/kpi", icon: "monitoring", label: "Performance Goals" }
    ],
    promoTitle: "Onboarding Journey",
    promoDescription: "A clearer checklist experience helps new hires finish critical tasks faster."
  },
  meIdp: {
    eyebrow: "Employee Workspace",
    title: "My IDP",
    description: "Plan personal growth priorities, learning commitments, and mentor alignment in a more intentional layout.",
    primaryActionLabel: "Add Goal",
    secondaryActionLabel: "Export Plan",
    metrics: [
      { icon: "school", value: "03", label: "Learning Goals", detail: "Active growth goals in the current cycle", accentClass: "codeui-metric__icon--blue" },
      { icon: "menu_book", value: "02", label: "Courses", detail: "Recommended or enrolled learning paths", accentClass: "codeui-metric__icon--green" },
      { icon: "groups", value: "01", label: "Mentor", detail: "Manager and mentor support connected", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Development Objectives",
    tableSubtitle: "Organize growth goals the same way business modules will later display real data.",
    columns: [
      { key: "goal", label: "Goal" },
      { key: "window", label: "Window" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "leadership", primary: "Improve Stakeholder Communication", secondary: "Present work with clearer business framing", values: ["Q2 2026", ""], status: "Active", statusClass: "codeui-status--info", avatar: "SC", avatarClass: "codeui-table__avatar--blue" },
      { id: "cert", primary: "Complete Data Analytics Course", secondary: "Advance reporting and dashboard literacy", values: ["Q3 2026", ""], status: "Planned", statusClass: "codeui-status--warning", avatar: "DA", avatarClass: "codeui-table__avatar--neutral" },
      { id: "mentor", primary: "Monthly Coaching Session", secondary: "Structured conversation with manager or mentor", values: ["Monthly", ""], status: "Scheduled", statusClass: "codeui-status--success", avatar: "MC", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/me/kpi", icon: "target", label: "KPI Alignment" },
      { href: "/me/profile", icon: "badge", label: "Profile Context" },
      { href: "/me/onboarding", icon: "checklist", label: "Onboarding Journey" }
    ],
    promoTitle: "Growth Culture",
    promoDescription: "A stronger development page will support IDP, training, and mentorship flows later."
  },
  managerTeam: {
    eyebrow: "Manager Workspace",
    title: "Team Overview",
    description: "Monitor direct reports, open approvals, and team health signals in a manager-focused workspace instead of a placeholder shell.",
    primaryActionLabel: "Review Team",
    secondaryActionLabel: "Export Team",
    metrics: [
      { icon: "groups", value: "09", label: "Direct Reports", detail: "Current span of control in the org", accentClass: "codeui-metric__icon--blue" },
      { icon: "approval", value: "03", label: "Open Actions", detail: "Approvals and coaching follow-ups pending", accentClass: "codeui-metric__icon--green" },
      { icon: "favorite", value: "88%", label: "Team Health", detail: "Illustrative pulse based on manager scope", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Direct Reports",
    tableSubtitle: "A manager-centric team table with status cues and role visibility.",
    columns: [
      { key: "employee", label: "Employee" },
      { key: "focus", label: "Focus Area" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "jane", primary: "Jane Doe", secondary: "jane.doe@company.com", values: ["Performance Coaching", ""], status: "On Track", statusClass: "codeui-status--success", avatar: "JD", avatarClass: "codeui-table__avatar--blue" },
      { id: "alex", primary: "Alex Smith", secondary: "alex.smith@company.com", values: ["Interview Panel", ""], status: "Needs Review", statusClass: "codeui-status--warning", avatar: "AS", avatarClass: "codeui-table__avatar--neutral" },
      { id: "maria", primary: "Maria Tran", secondary: "maria.tran@company.com", values: ["Onboarding Support", ""], status: "Active", statusClass: "codeui-status--info", avatar: "MT", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/manager/interviews", icon: "event_available", label: "Interview Panel" },
      { href: "/manager/recruitment-requests", icon: "description", label: "Recruitment Requests" },
      { href: "/manager", icon: "dashboard", label: "Manager Dashboard" }
    ],
    promoTitle: "Team Performance",
    promoDescription: "The rebuilt manager pages prepare the UI for team-level people insights and approvals."
  },
  managerInterviews: {
    eyebrow: "Manager Workspace",
    title: "Interviews",
    description: "Track upcoming interviews, panel owners, and candidate progress through a more structured manager UI.",
    primaryActionLabel: "Add Interview",
    secondaryActionLabel: "Export Schedule",
    metrics: [
      { icon: "event", value: "07", label: "Scheduled", detail: "Upcoming interview sessions this week", accentClass: "codeui-metric__icon--blue" },
      { icon: "group", value: "03", label: "Panel Roles", detail: "Hiring managers and interviewers assigned", accentClass: "codeui-metric__icon--green" },
      { icon: "timer", value: "48h", label: "SLA Window", detail: "Hiring response target for next actions", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Interview Schedule",
    tableSubtitle: "A cleaner interview board to support recruiting coordination.",
    columns: [
      { key: "candidate", label: "Candidate" },
      { key: "panel", label: "Panel" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "cand1", primary: "Nguyen Anh", secondary: "Frontend Engineer Candidate", values: ["Tech + Hiring Manager", ""], status: "Scheduled", statusClass: "codeui-status--info", avatar: "NA", avatarClass: "codeui-table__avatar--blue" },
      { id: "cand2", primary: "Tran Binh", secondary: "Product Manager Candidate", values: ["Case Review Panel", ""], status: "Feedback Ready", statusClass: "codeui-status--success", avatar: "TB", avatarClass: "codeui-table__avatar--neutral" },
      { id: "cand3", primary: "Linh Pham", secondary: "Sales Lead Candidate", values: ["Manager + HR", ""], status: "Pending Notes", statusClass: "codeui-status--warning", avatar: "LP", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/manager/team", icon: "groups", label: "Team Overview" },
      { href: "/manager/recruitment-requests", icon: "work", label: "Hiring Requests" },
      { href: "/hr/recruitment/requests", icon: "travel_explore", label: "HR Requests" }
    ],
    promoTitle: "Interview Flow",
    promoDescription: "This manager view will connect naturally to interview scheduling and feedback APIs later."
  },
  managerRecruitmentRequests: {
    eyebrow: "Manager Workspace",
    title: "Recruitment Requests",
    description: "Submit, review, and track open hiring requests in a more focused requisition management layout.",
    primaryActionLabel: "Create Request",
    secondaryActionLabel: "Export Queue",
    metrics: [
      { icon: "post_add", value: "05", label: "Open Requests", detail: "Current hiring needs under manager scope", accentClass: "codeui-metric__icon--blue" },
      { icon: "hourglass_top", value: "02", label: "Pending Approval", detail: "Waiting for HR or leadership review", accentClass: "codeui-metric__icon--green" },
      { icon: "check_circle", value: "03", label: "Approved", detail: "Roles cleared for active sourcing", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Hiring Requests",
    tableSubtitle: "A more concrete manager UI for headcount and requisition tracking.",
    columns: [
      { key: "request", label: "Request" },
      { key: "scope", label: "Department" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "req1", primary: "Senior Backend Engineer", secondary: "Need replacement for platform squad", values: ["Engineering", ""], status: "Pending Approval", statusClass: "codeui-status--warning", avatar: "BE", avatarClass: "codeui-table__avatar--blue" },
      { id: "req2", primary: "Product Analyst", secondary: "New analytics role for growth planning", values: ["Product", ""], status: "Approved", statusClass: "codeui-status--success", avatar: "PA", avatarClass: "codeui-table__avatar--neutral" },
      { id: "req3", primary: "Sales Trainer", secondary: "Capability uplift for regional teams", values: ["Sales", ""], status: "In Review", statusClass: "codeui-status--info", avatar: "ST", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/manager/interviews", icon: "event_note", label: "Interview Calendar" },
      { href: "/manager/team", icon: "people", label: "Direct Reports" },
      { href: "/hr/recruitment/requests", icon: "domain", label: "HR Queue" }
    ],
    promoTitle: "Hiring Pipeline",
    promoDescription: "This page is ready to evolve into a complete manager request and approval workspace."
  },
  hrDepartments: {
    eyebrow: "HR Workspace",
    title: "Departments",
    description: "Map organizational units, owners, and structure changes in a layout aligned to the new dashboard language.",
    primaryActionLabel: "Add Department",
    secondaryActionLabel: "Export Org",
    metrics: [
      { icon: "account_tree", value: "12", label: "Departments", detail: "Organizational units currently modeled", accentClass: "codeui-metric__icon--blue" },
      { icon: "layers", value: "03", label: "Hierarchy Levels", detail: "Depth in the current org structure", accentClass: "codeui-metric__icon--green" },
      { icon: "sync_alt", value: "04", label: "Pending Changes", detail: "Structural updates awaiting review", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Organization Structure",
    tableSubtitle: "A more realistic department table for HR-led organization management.",
    columns: [
      { key: "department", label: "Department" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "dep1", primary: "People Operations", secondary: "Core HR and employee services", values: ["Hanh Le", ""], status: "Stable", statusClass: "codeui-status--success", avatar: "PO", avatarClass: "codeui-table__avatar--blue" },
      { id: "dep2", primary: "Engineering", secondary: "Platform, product, and data squads", values: ["Minh Tran", ""], status: "Expansion", statusClass: "codeui-status--info", avatar: "EN", avatarClass: "codeui-table__avatar--neutral" },
      { id: "dep3", primary: "Commercial", secondary: "Sales and customer growth operations", values: ["Lan Pham", ""], status: "Needs Review", statusClass: "codeui-status--warning", avatar: "CO", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/hr/employees", icon: "group", label: "Employee Directory" },
      { href: "/hr/analytics", icon: "insights", label: "Analytics" },
      { href: "/hr", icon: "dashboard", label: "HR Dashboard" }
    ],
    promoTitle: "Org Design",
    promoDescription: "The org structure page sets up a stronger foundation for hierarchy and headcount management."
  },
  hrEmployees: {
    eyebrow: "HR Workspace",
    title: "Employee Directory",
    description: "Browse company-wide profiles, protected field visibility, and people operations workflows in a sharper HR table layout.",
    primaryActionLabel: "Add Employee",
    secondaryActionLabel: "Export Directory",
    metrics: [
      { icon: "group", value: "248", label: "Headcount", detail: "Company-wide people directory size", accentClass: "codeui-metric__icon--blue" },
      { icon: "visibility_lock", value: "HR", label: "Salary Access", detail: "Compensation details remain restricted by backend", accentClass: "codeui-metric__icon--green" },
      { icon: "filter_alt", value: "Multi", label: "Filters", detail: "Department, level, and lifecycle filters supported next", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "People Directory",
    tableSubtitle: "A more concrete employee listing surface for HR operations.",
    columns: [
      { key: "employee", label: "Employee" },
      { key: "role", label: "Role" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "emp1", primary: "Jane Doe", secondary: "jane.doe@company.com", values: ["Senior Engineer", ""], status: "Active", statusClass: "codeui-status--success", avatar: "JD", avatarClass: "codeui-table__avatar--blue" },
      { id: "emp2", primary: "Alex Smith", secondary: "alex.smith@company.com", values: ["Product Manager", ""], status: "Onboarding", statusClass: "codeui-status--info", avatar: "AS", avatarClass: "codeui-table__avatar--neutral" },
      { id: "emp3", primary: "Michael Johnson", secondary: "mjohnson@company.com", values: ["Sales Rep", ""], status: "Contract Review", statusClass: "codeui-status--warning", avatar: "MJ", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/hr/departments", icon: "account_tree", label: "Departments" },
      { href: "/hr/onboarding", icon: "task", label: "Onboarding" },
      { href: "/hr/compensation/salary-bands", icon: "payments", label: "Salary Bands" }
    ],
    promoTitle: "Directory Experience",
    promoDescription: "This layout is ready to evolve into the core employee management experience for HR."
  },
  hrOnboarding: {
    eyebrow: "HR Workspace",
    title: "Onboarding Operations",
    description: "Manage new hire readiness, checklist flow, and cross-functional owners in a more useful onboarding operations page.",
    primaryActionLabel: "Create Checklist",
    secondaryActionLabel: "Export Status",
    metrics: [
      { icon: "person_add", value: "18", label: "New Hires", detail: "Current onboarding cases in motion", accentClass: "codeui-metric__icon--blue" },
      { icon: "task_alt", value: "74%", label: "Completion", detail: "Checklist progress across all active cases", accentClass: "codeui-metric__icon--green" },
      { icon: "groups_2", value: "12", label: "Buddy Assignments", detail: "Support pairings configured by HR", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Onboarding Cases",
    tableSubtitle: "A stronger operational table for HR to monitor hiring-to-employee transitions.",
    columns: [
      { key: "employee", label: "Employee" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "on1", primary: "Thao Nguyen", secondary: "Starting 02 May 2026", values: ["People Ops", ""], status: "In Progress", statusClass: "codeui-status--info", avatar: "TN", avatarClass: "codeui-table__avatar--blue" },
      { id: "on2", primary: "Bao Tran", secondary: "Starting 05 May 2026", values: ["IT + Manager", ""], status: "Completed", statusClass: "codeui-status--success", avatar: "BT", avatarClass: "codeui-table__avatar--neutral" },
      { id: "on3", primary: "Trang Le", secondary: "Waiting for contract signature", values: ["HRBP", ""], status: "Action Required", statusClass: "codeui-status--warning", avatar: "TL", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/hr/recruitment/requests", icon: "work_history", label: "Recruitment Requests" },
      { href: "/hr/employees", icon: "badge", label: "Employee Directory" },
      { href: "/me/onboarding", icon: "person", label: "Employee View" }
    ],
    promoTitle: "30-60-90 Templates",
    promoDescription: "The rebuilt page gives HR a clear visual foundation for onboarding automation and checklist ownership."
  },
  hrRecruitmentRequests: {
    eyebrow: "HR Workspace",
    title: "Recruitment Requests",
    description: "Coordinate headcount approvals, sourcing flow, and SLA follow-up in a cleaner HR recruitment command view.",
    primaryActionLabel: "Approve Request",
    secondaryActionLabel: "Export Queue",
    metrics: [
      { icon: "work", value: "11", label: "Open Requests", detail: "Requests currently under HR ownership", accentClass: "codeui-metric__icon--blue" },
      { icon: "schedule", value: "48h", label: "SLA Target", detail: "Processing target for new hiring requests", accentClass: "codeui-metric__icon--green" },
      { icon: "mail", value: "Auto", label: "Notifications", detail: "Interview and rejection messaging handled asynchronously", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Hiring Queue",
    tableSubtitle: "A queue view aligned to the backend recruitment workflow already scaffolded.",
    columns: [
      { key: "request", label: "Request" },
      { key: "owner", label: "Hiring Owner" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "hrreq1", primary: "Senior Backend Engineer", secondary: "Replacement for platform squad", values: ["Minh Tran", ""], status: "Pending Approval", statusClass: "codeui-status--warning", avatar: "BE", avatarClass: "codeui-table__avatar--blue" },
      { id: "hrreq2", primary: "HR Operations Specialist", secondary: "Scale people services capacity", values: ["Hanh Le", ""], status: "Approved", statusClass: "codeui-status--success", avatar: "HR", avatarClass: "codeui-table__avatar--neutral" },
      { id: "hrreq3", primary: "Business Analyst", secondary: "Support leadership reporting needs", values: ["Dung Nguyen", ""], status: "SLA Watch", statusClass: "codeui-status--info", avatar: "BA", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/hr/onboarding", icon: "person_add_alt", label: "Onboarding Cases" },
      { href: "/manager/recruitment-requests", icon: "groups", label: "Manager Requests" },
      { href: "/hr/analytics", icon: "insights", label: "Recruitment Analytics" }
    ],
    promoTitle: "Recruitment SLA",
    promoDescription: "The visual structure is now aligned with the recruitment domain and async worker flows."
  },
  hrSalaryBands: {
    eyebrow: "HR Workspace",
    title: "Salary Bands",
    description: "Manage compensation frameworks and validation boundaries in a more polished compensation workspace.",
    primaryActionLabel: "Add Band",
    secondaryActionLabel: "Export Matrix",
    metrics: [
      { icon: "payments", value: "18", label: "Bands", detail: "Compensation ranges by level and department", accentClass: "codeui-metric__icon--blue" },
      { icon: "currency_exchange", value: "VND", label: "Base Currency", detail: "Current payroll denomination", accentClass: "codeui-metric__icon--green" },
      { icon: "verified_user", value: "Strict", label: "Validation", detail: "Server-enforced range and policy checks", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Compensation Bands",
    tableSubtitle: "A cleaner HR compensation view that will later map to salary band CRUD.",
    columns: [
      { key: "band", label: "Band" },
      { key: "range", label: "Range" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "band1", primary: "Engineering L3", secondary: "Mid-level individual contributor", values: ["28M - 42M VND", ""], status: "Active", statusClass: "codeui-status--success", avatar: "E3", avatarClass: "codeui-table__avatar--blue" },
      { id: "band2", primary: "Product M2", secondary: "Manager-level product leadership", values: ["40M - 58M VND", ""], status: "Under Review", statusClass: "codeui-status--warning", avatar: "P2", avatarClass: "codeui-table__avatar--neutral" },
      { id: "band3", primary: "Sales S1", secondary: "Commercial entry-level sales role", values: ["16M - 24M VND", ""], status: "Cached", statusClass: "codeui-status--info", avatar: "S1", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/hr/employees", icon: "group", label: "Employee Directory" },
      { href: "/hr/analytics", icon: "analytics", label: "Compensation Analytics" },
      { href: "/hr", icon: "dashboard", label: "HR Dashboard" }
    ],
    promoTitle: "Compensation Controls",
    promoDescription: "The compensation area now matches the rest of the UI system and is ready for data binding."
  },
  hrAnalytics: {
    eyebrow: "HR Workspace",
    title: "Analytics",
    description: "Review headcount trend, turnover, and leadership insight surfaces in a cleaner analytics dashboard frame.",
    primaryActionLabel: "Open Dashboard",
    secondaryActionLabel: "Export Snapshot",
    metrics: [
      { icon: "insights", value: "+12", label: "Headcount Trend", detail: "Illustrative monthly growth delta", accentClass: "codeui-metric__icon--blue" },
      { icon: "show_chart", value: "3.8%", label: "Turnover", detail: "Current rolling separation indicator", accentClass: "codeui-metric__icon--green" },
      { icon: "dashboard", value: "04", label: "Leadership Views", detail: "Operational dashboards prepared for executives", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Operational Signals",
    tableSubtitle: "A summary board aligned with leadership analytics requirements from the backend plan.",
    columns: [
      { key: "signal", label: "Signal" },
      { key: "window", label: "Window" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "headcount", primary: "Headcount Growth", secondary: "Company-wide hiring and movement overview", values: ["Monthly", ""], status: "Positive", statusClass: "codeui-status--success", avatar: "HC", avatarClass: "codeui-table__avatar--blue" },
      { id: "turnover", primary: "Turnover Watch", secondary: "Retention pressure by business area", values: ["Quarterly", ""], status: "Monitored", statusClass: "codeui-status--info", avatar: "TO", avatarClass: "codeui-table__avatar--neutral" },
      { id: "risk", primary: "Talent Risk", secondary: "Early warning indicators for leadership teams", values: ["Bi-weekly", ""], status: "Needs Review", statusClass: "codeui-status--warning", avatar: "TR", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/hr/departments", icon: "account_tree", label: "Org Structure" },
      { href: "/hr/employees", icon: "groups", label: "Employee Directory" },
      { href: "/admin/users", icon: "admin_panel_settings", label: "Admin Users" }
    ],
    promoTitle: "Leadership Insights",
    promoDescription: "The analytics area now feels consistent with the dashboard while staying ready for real chart data later."
  },
  adminUsers: {
    eyebrow: "Enterprise Admin",
    title: "User Administration",
    description: "Manage platform accounts, system roles, and access operations in a sharper admin control surface.",
    primaryActionLabel: "Add User",
    secondaryActionLabel: "Export Users",
    metrics: [
      { icon: "manage_accounts", value: "248", label: "Accounts", detail: "Illustrative active user base across the platform", accentClass: "codeui-metric__icon--blue" },
      { icon: "admin_panel_settings", value: "04", label: "Role Types", detail: "EMPLOYEE, MANAGER, HR, ADMIN", accentClass: "codeui-metric__icon--green" },
      { icon: "security", value: "Core", label: "Admin Scope", detail: "Configuration and permission control center", accentClass: "codeui-metric__icon--amber" }
    ],
    tableTitle: "Platform Users",
    tableSubtitle: "A more production-like administration page for access management workflows.",
    columns: [
      { key: "user", label: "User" },
      { key: "role", label: "Role" },
      { key: "status", label: "Status", align: "right" }
    ],
    rows: [
      { id: "user1", primary: "Admin Nguyen", secondary: "admin.nguyen@company.com", values: ["ADMIN", ""], status: "Active", statusClass: "codeui-status--success", avatar: "AN", avatarClass: "codeui-table__avatar--blue" },
      { id: "user2", primary: "Hanh Le", secondary: "hanh.le@company.com", values: ["HR", ""], status: "Policy Review", statusClass: "codeui-status--warning", avatar: "HL", avatarClass: "codeui-table__avatar--neutral" },
      { id: "user3", primary: "Minh Tran", secondary: "minh.tran@company.com", values: ["MANAGER", ""], status: "Provisioned", statusClass: "codeui-status--info", avatar: "MT", avatarClass: "codeui-table__avatar--danger" }
    ],
    quickLinks: [
      { href: "/admin", icon: "dashboard", label: "Admin Dashboard" },
      { href: "/hr/employees", icon: "badge", label: "Employee Profiles" },
      { href: "/hr/analytics", icon: "insights", label: "Leadership Analytics" }
    ],
    promoTitle: "Access Governance",
    promoDescription: "The admin UI is now aligned with the rest of the application and ready for role management flows."
  }
};
