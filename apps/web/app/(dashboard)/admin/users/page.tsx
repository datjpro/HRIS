import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function AdminUsersPage() {
  return (
    <ModulePlaceholder
      eyebrow="Admin"
      title="User Administration"
      description="Placeholder for platform user list and future access management tooling."
      stats={[
        { title: "Accounts", value: "248", helperText: "Sample user base", trendLabel: "Synced", trendVariant: "info" },
        { title: "Roles", value: "04", helperText: "Current platform roles", trendLabel: "Defined", trendVariant: "neutral" },
        { title: "Admin scope", value: "Core", helperText: "Foundation platform area", trendLabel: "Ready", trendVariant: "success" }
      ]}
      bullets={[
        "User list and role chips",
        "Future admin actions",
        "Platform-level visibility patterns"
      ]}
      emptyTitle="Admin users placeholder"
      emptyDescription="This route validates the shell and admin-specific list treatment before data binding."
    />
  );
}
