import { ModulePlaceholder } from "../../../components/data-display/module-placeholder";

export default function ManagerDashboardPage() {
  return (
    <ModulePlaceholder
      eyebrow="Manager"
      title="Good Morning, Manager"
      description="Here is what is happening across your team operations today."
      stats={[
        { title: "Direct Reports", value: "09", helperText: "Current reporting line", trendLabel: "Stable" },
        { title: "Pending Approvals", value: "03", helperText: "Hiring and people ops", trendLabel: "Needs review" },
        { title: "Team KPI", value: "88%", helperText: "Aggregated team performance", trendLabel: "On track" }
      ]}
      bullets={[
        "Monitor direct reports and team health",
        "Review recruitment requests and interviews",
        "Track manager approvals and KPI summaries"
      ]}
      quickLinks={[{ href: "/manager/team", label: "Team Overview" }, { href: "/manager/recruitment-requests", label: "Recruitment Requests" }, { href: "/manager/interviews", label: "Interviews" }]}
      emptyTitle="Manager Operations Module"
      emptyDescription="Review the updated manager workspace patterns and upcoming workflow surfaces."
      reviewLabel="Manager dashboard"
    />
  );
}

