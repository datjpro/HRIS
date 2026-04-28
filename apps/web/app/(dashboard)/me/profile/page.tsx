import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function MeProfilePage() {
  return (
    <ModulePlaceholder
      eyebrow="Employee"
      title="My Profile"
      description="Profile placeholder for personal identity, role and employment information."
      stats={[
        { title: "Profile sections", value: "06", helperText: "Personal, job, compensation, contact", trendLabel: "Scoped", trendVariant: "info" },
        { title: "Editable fields", value: "12", helperText: "Future self-service coverage", trendLabel: "Planned", trendVariant: "warning" },
        { title: "Readiness", value: "P4", helperText: "Ready for API binding next", trendLabel: "Foundation", trendVariant: "success" }
      ]}
      bullets={[
        "Personal identity block",
        "Job and department details",
        "Read-only salary visibility based on backend permissions"
      ]}
      quickLinks={[{ href: "/me/payslips", label: "Go to payslips" }, { href: "/me/kpi", label: "Go to KPI" }]}
      emptyTitle="Profile widgets will load here"
      emptyDescription="This placeholder validates page rhythm, cards and empty-state treatments before business data wiring."
    />
  );
}
