import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function MeKpiPage() {
  return (
    <ModulePlaceholder
      eyebrow="Employee"
      title="My KPI"
      description="Performance placeholder for individual KPI results and progress widgets."
      stats={[
        { title: "Current cycle", value: "Q2", helperText: "Review period frame", trendLabel: "Active", trendVariant: "info" },
        { title: "Completion", value: "83%", helperText: "Target progress sample", trendLabel: "Healthy", trendVariant: "success" },
        { title: "Metrics", value: "05", helperText: "Expected KPI cards", trendLabel: "Scoped", trendVariant: "neutral" }
      ]}
      bullets={[
        "Summary cards for score and bonus",
        "Metric table with period context",
        "Employee-only visibility"
      ]}
      quickLinks={[{ href: "/me/idp", label: "Go to IDP" }]}
      emptyTitle="KPI modules connect here"
      emptyDescription="Foundation is ready for KPI results API integration."
    />
  );
}
