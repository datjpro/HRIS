import { ModulePlaceholder } from "../../../../../components/data-display/module-placeholder";

export default function HrRecruitmentRequestsPage() {
  return (
    <ModulePlaceholder
      eyebrow="HR"
      title="Recruitment Requests"
      description="Placeholder for hiring requests, approval states and SLA-aware review flow."
      stats={[
        { title: "Open requests", value: "16", helperText: "Sample hiring demand", trendLabel: "Pipeline", trendVariant: "info" },
        { title: "Over SLA", value: "02", helperText: "48h threshold sample", trendLabel: "Urgent", trendVariant: "danger" },
        { title: "Approved", value: "09", helperText: "Headcount decisions", trendLabel: "Progress", trendVariant: "success" }
      ]}
      bullets={[
        "Request list and status board",
        "Approval actions and audit trail entry point",
        "Urgency/SLA highlighting"
      ]}
      quickLinks={[{ href: "/hr/onboarding", label: "Go to onboarding" }]}
      emptyTitle="Recruitment requests placeholder"
      emptyDescription="Ready for the request and approval routes from the backend recruitment module."
    />
  );
}
