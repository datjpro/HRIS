import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function ManagerRecruitmentRequestsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Manager"
      title="Recruitment Requests"
      description="Placeholder for request initiation and approval steps relevant to line managers."
      stats={[
        { title: "Open requests", value: "04", helperText: "Sample hiring requests", trendLabel: "Pipeline", trendVariant: "info" },
        { title: "Approvals", value: "02", helperText: "Awaiting manager input", trendLabel: "Pending", trendVariant: "warning" },
        { title: "SLA", value: "48h", helperText: "Backend recruitment rule", trendLabel: "Tracked", trendVariant: "success" }
      ]}
      bullets={[
        "Manager request list and status",
        "Approval action entry point",
        "Filter by department or urgency later"
      ]}
      emptyTitle="Recruitment requests render here"
      emptyDescription="This placeholder validates the workspace before request and approval APIs are connected."
    />
  );
}
