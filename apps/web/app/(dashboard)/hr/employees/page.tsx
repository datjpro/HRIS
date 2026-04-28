import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function HrEmployeesPage() {
  return (
    <ModulePlaceholder
      eyebrow="HR"
      title="Employee Directory"
      description="Placeholder for company-wide employee list, profile preview and access-controlled fields."
      stats={[
        { title: "Headcount", value: "248", helperText: "Directory total sample", trendLabel: "Company-wide", trendVariant: "info" },
        { title: "Salary visibility", value: "HR", helperText: "Controlled by backend", trendLabel: "Protected", trendVariant: "success" },
        { title: "Filters", value: "Multi", helperText: "Department, role, status later", trendLabel: "Planned", trendVariant: "warning" }
      ]}
      bullets={[
        "Employee table with profile side panel",
        "Role and employment status badges",
        "Field-level sensitivity for compensation"
      ]}
      quickLinks={[{ href: "/hr/departments", label: "Back to departments" }]}
      emptyTitle="Directory table shell ready"
      emptyDescription="This placeholder validates the HR list experience before employee APIs are bound."
    />
  );
}
