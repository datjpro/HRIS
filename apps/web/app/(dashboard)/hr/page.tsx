import { ModulePlaceholder } from "../../../components/data-display/module-placeholder";

export default function HrDashboardPage() {
  return (
    <ModulePlaceholder
      eyebrow="HR"
      title="Good Morning, Admin"
      description="Here is what's happening across your organization today."
      stats={[
        { title: "Total Headcount", value: "1,248", helperText: "this month", trendLabel: "12 new" },
        { title: "Pending Approvals", value: "24", helperText: "Time Off, Expenses", trendLabel: "Needs action" },
        { title: "Open Roles", value: "16", helperText: "Across active hiring requests", trendLabel: "5 urgent" }
      ]}
      bullets={[
        "Monitor departments, directory and organization health",
        "Track recruitment, onboarding and compensation workflows",
        "Access analytics and culture operations from one shared dashboard"
      ]}
      quickLinks={[{ href: "/hr/departments", label: "Departments" }, { href: "/hr/employees", label: "Employee Directory" }, { href: "/hr/analytics", label: "Analytics" }]}
      emptyTitle="New Performance Module"
      emptyDescription="Check out the updated review cycle tools."
      reviewLabel="HR dashboard"
    />
  );
}

