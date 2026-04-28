import { Card, CardContent, CardHeader, CardTitle, PageHeader, StatCard } from "../../../components/ui";

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Admin Dashboard"
        description="Platform-level shell for user administration and system configuration views."
      />

      <div className="ui-preview-grid">
        <StatCard title="Users" value="248" helperText="Accounts synced in the platform" trendLabel="Healthy" trendVariant="success" />
        <StatCard title="Policies" value="14" helperText="Platform configuration groups" trendLabel="Review due" trendVariant="warning" />
        <StatCard title="Audit" value="99.9%" helperText="Operational uptime target" trendLabel="Stable" trendVariant="info" />
      </div>

      <Card className="ui-preview-section">
        <CardHeader>
          <CardTitle>Admin workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The shared dashboard shell now supports an admin route so later access-control pages can plug in cleanly.</p>
        </CardContent>
      </Card>
    </div>
  );
}
