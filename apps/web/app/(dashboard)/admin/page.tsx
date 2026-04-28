import { ModulePlaceholder } from "../../../components/data-display/module-placeholder";

export default function AdminDashboardPage() {
  return (
    <ModulePlaceholder
      eyebrow="Admin"
      title="Good Morning, Admin"
      description="Platform health, users and configuration review now share the common enterprise dashboard layout."
      stats={[
        { title: "Users", value: "248", helperText: "Accounts synced in platform", trendLabel: "Healthy" },
        { title: "Policies", value: "14", helperText: "Configuration groups", trendLabel: "Review due" },
        { title: "Audit", value: "99.9%", helperText: "Operational uptime target", trendLabel: "Stable" }
      ]}
      bullets={[
        "Review platform users and access coverage",
        "Inspect configuration and operational health widgets",
        "Keep admin workspace visually aligned with HR dashboard patterns"
      ]}
      quickLinks={[{ href: "/admin/users", label: "User Administration" }, { href: "/ui-preview", label: "UI Review" }]}
      emptyTitle="Platform Admin Module"
      emptyDescription="Audit and system configuration panels can plug into this same dashboard composition."
      reviewLabel="Admin dashboard"
    />
  );
}
