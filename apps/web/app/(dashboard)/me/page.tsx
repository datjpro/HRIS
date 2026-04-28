import { ModulePlaceholder } from "../../../components/data-display/module-placeholder";

export default function MeDashboardPage() {
  return (
    <ModulePlaceholder
      eyebrow="Employee"
      title="Good Morning, Employee"
      description="Here is what is happening across your personal HR workspace today."
      stats={[
        { title: "Open Tasks", value: "04", helperText: "Onboarding and policy actions", trendLabel: "Today" },
        { title: "Payslips", value: "12", helperText: "Available in your vault", trendLabel: "Up to date" },
        { title: "KPI Progress", value: "83%", helperText: "Current review cycle", trendLabel: "Healthy" }
      ]}
      bullets={[
        "Review personal profile and employment information",
        "Track KPI progress and related compensation outcomes",
        "Access self-service onboarding, IDP and payslip workspaces"
      ]}
      quickLinks={[{ href: "/me/profile", label: "My Profile" }, { href: "/me/payslips", label: "Payslips" }, { href: "/me/kpi", label: "KPI" }]}
      emptyTitle="New Self-Service Module"
      emptyDescription="Check out the updated employee workspace blocks and quick actions."
      reviewLabel="Employee dashboard"
    />
  );
}

