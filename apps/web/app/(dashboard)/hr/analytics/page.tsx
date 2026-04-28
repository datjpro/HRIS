import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function HrAnalyticsPage() {
  return (
    <ModulePlaceholder
      eyebrow="HR"
      title="Analytics"
      description="Placeholder for headcount trend, turnover and operational leadership dashboards."
      stats={[
        { title: "Headcount trend", value: "+12", helperText: "Monthly delta sample", trendLabel: "Positive", trendVariant: "success" },
        { title: "Turnover", value: "3.8%", helperText: "Illustrative rate", trendLabel: "Monitored", trendVariant: "info" },
        { title: "Dashboards", value: "04", helperText: "Leadership summary blocks", trendLabel: "Scoped", trendVariant: "neutral" }
      ]}
      bullets={[
        "Summary KPI cards",
        "Chart surfaces later",
        "Leadership-focused operational trends"
      ]}
      emptyTitle="Analytics workspace placeholder"
      emptyDescription="The page shell is ready for the analytics endpoint and future chart widgets."
    />
  );
}
