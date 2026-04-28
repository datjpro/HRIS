import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function ManagerTeamPage() {
  return (
    <ModulePlaceholder
      eyebrow="Manager"
      title="Team Overview"
      description="Placeholder for direct reports, team directory and visibility into key people signals."
      stats={[
        { title: "Direct reports", value: "09", helperText: "Expected manager scope", trendLabel: "Stable", trendVariant: "neutral" },
        { title: "Open actions", value: "03", helperText: "Approvals and reviews", trendLabel: "Needs review", trendVariant: "warning" },
        { title: "Team health", value: "88%", helperText: "KPI summary sample", trendLabel: "On track", trendVariant: "success" }
      ]}
      bullets={[
        "Team list using directory table",
        "Manager-only actions",
        "Visibility limited to direct reports"
      ]}
      quickLinks={[{ href: "/manager/recruitment-requests", label: "Recruitment requests" }, { href: "/manager/interviews", label: "Interviews" }]}
      emptyTitle="No team widgets yet"
      emptyDescription="Manager-specific list and summary cards will plug into this shell."
    />
  );
}
