import { Card, CardContent, CardHeader, CardTitle, PageHeader, StatCard } from "../../../components/ui";

export default function ManagerDashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Manager"
        title="Manager Dashboard"
        description="Shared shell for team operations, approvals and direct report visibility."
      />

      <div className="ui-preview-grid">
        <StatCard title="Direct reports" value="09" helperText="Current reporting line" trendLabel="Stable" trendVariant="neutral" />
        <StatCard title="Pending approvals" value="03" helperText="Hiring and people ops" trendLabel="Needs review" trendVariant="warning" />
        <StatCard title="Team KPI" value="88%" helperText="Aggregated team performance" trendLabel="On track" trendVariant="success" />
      </div>

      <Card className="ui-preview-section">
        <CardHeader>
          <CardTitle>Manager workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The shell now supports manager-specific navigation and a consistent top-level dashboard area.</p>
        </CardContent>
      </Card>
    </div>
  );
}

