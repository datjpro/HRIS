import { Card, CardContent, CardHeader, CardTitle, PageHeader, StatCard } from "../../../components/ui";

export default function MeDashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Employee"
        title="My HR Space"
        description="Personal profile, KPI and self-service workspace built on the shared app shell."
      />

      <div className="ui-preview-grid">
        <StatCard title="Open tasks" value="04" helperText="Onboarding and policy actions" trendLabel="Today" trendVariant="info" />
        <StatCard title="Payslips" value="12" helperText="Available in personal vault" trendLabel="Up to date" trendVariant="success" />
        <StatCard title="KPI progress" value="83%" helperText="Current review cycle" trendLabel="Healthy" trendVariant="success" />
      </div>

      <Card className="ui-preview-section">
        <CardHeader>
          <CardTitle>Employee workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The dashboard shell is active. Business widgets and data-backed cards land here in the next phases.</p>
        </CardContent>
      </Card>
    </div>
  );
}

