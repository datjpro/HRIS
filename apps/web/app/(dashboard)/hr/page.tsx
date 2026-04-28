import { Card, CardContent, CardHeader, CardTitle, PageHeader, StatCard } from "../../../components/ui";

export default function HrDashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="HR"
        title="HR Dashboard"
        description="Entry point for company-wide people operations, compensation, recruitment and analytics."
      />

      <div className="ui-preview-grid">
        <StatCard title="Headcount" value="248" helperText="Across all active departments" trendLabel="+12 this month" trendVariant="success" />
        <StatCard title="Open roles" value="16" helperText="Across all hiring requests" trendLabel="5 urgent" trendVariant="warning" />
        <StatCard title="Onboarding plans" value="07" helperText="Employees currently onboarding" trendLabel="In progress" trendVariant="info" />
      </div>

      <Card className="ui-preview-section">
        <CardHeader>
          <CardTitle>HR workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This shell is ready for departments, directory, recruitment, onboarding, compensation and analytics modules.</p>
        </CardContent>
      </Card>
    </div>
  );
}

