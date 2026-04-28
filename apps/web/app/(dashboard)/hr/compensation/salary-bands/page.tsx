import { ModulePlaceholder } from "../../../../../components/data-display/module-placeholder";

export default function HrSalaryBandsPage() {
  return (
    <ModulePlaceholder
      eyebrow="HR"
      title="Salary Bands"
      description="Placeholder for salary band management and validation-aware compensation settings."
      stats={[
        { title: "Bands", value: "18", helperText: "Department and level samples", trendLabel: "Configured", trendVariant: "info" },
        { title: "Currency", value: "VND", helperText: "Current payroll currency", trendLabel: "Default", trendVariant: "neutral" },
        { title: "Validation", value: "Strict", helperText: "Backend enforced ranges", trendLabel: "Protected", trendVariant: "success" }
      ]}
      bullets={[
        "Band list table",
        "Create/update salary band forms",
        "Department-level compensation structures"
      ]}
      quickLinks={[{ href: "/hr/analytics", label: "Go to analytics" }]}
      emptyTitle="Salary band placeholder"
      emptyDescription="Ready for compensation CRUD once business forms are wired."
    />
  );
}
