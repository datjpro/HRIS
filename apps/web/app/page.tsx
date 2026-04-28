import Link from "next/link";
import { Badge, Card, CardContent, CardHeader, CardTitle, PageHeader, StatCard } from "../components/ui";

export default function HomePage() {
  return (
    <main className="container home-page">
      <PageHeader
        eyebrow="HRIS"
        title="Frontend Foundation Workspace"
        description="Phase UI-1 is now scaffolded with shared tokens, core components, dashboard shell and placeholder workspaces."
        actions={<Badge variant="success">UI foundation ready</Badge>}
      />

      <div className="ui-preview-grid">
        <StatCard title="Theme" value="Done" helperText="Design tokens and Inter typography" trendLabel="P1" trendVariant="success" />
        <StatCard title="Components" value="14" helperText="Shared UI primitives available" trendLabel="P2" trendVariant="success" />
        <StatCard title="Shell" value="4" helperText="Workspace shells and navigation" trendLabel="P3/P4" trendVariant="info" />
      </div>

      <section className="ui-preview-section">
        <Card>
          <CardHeader>
            <CardTitle>Quick entry points</CardTitle>
          </CardHeader>
          <CardContent className="home-page__links">
            <Link href="/me" className="ui-quick-link">
              <span>Employee view</span>
              <span>→</span>
            </Link>
            <Link href="/manager" className="ui-quick-link">
              <span>Manager view</span>
              <span>→</span>
            </Link>
            <Link href="/hr" className="ui-quick-link">
              <span>HR view</span>
              <span>→</span>
            </Link>
            <Link href="/admin" className="ui-quick-link">
              <span>Admin view</span>
              <span>→</span>
            </Link>
            <Link href="/ui-preview" className="ui-quick-link">
              <span>UI preview</span>
              <span>→</span>
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

