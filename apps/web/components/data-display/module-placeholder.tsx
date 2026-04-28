import Link from "next/link";
import type { ReactNode } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  PageHeader,
  SectionHeader,
  Skeleton,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tabs
} from "../ui";

type QuickLink = {
  href: string;
  label: string;
};

type ModulePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  stats: Array<{
    title: string;
    value: string;
    helperText: string;
    trendLabel?: string;
    trendVariant?: "neutral" | "info" | "success" | "warning" | "danger";
  }>;
  bullets: string[];
  quickLinks?: QuickLink[];
  emptyTitle: string;
  emptyDescription: string;
  reviewLabel?: string;
  actions?: ReactNode;
};

export function ModulePlaceholder({
  eyebrow,
  title,
  description,
  stats,
  bullets,
  quickLinks = [],
  emptyTitle,
  emptyDescription,
  reviewLabel = "Foundation review",
  actions
}: ModulePlaceholderProps) {
  return (
    <div>
      <PageHeader eyebrow={eyebrow} title={title} description={description} actions={actions} />

      <div className="ui-preview-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            helperText={stat.helperText}
            trendLabel={stat.trendLabel}
            trendVariant={stat.trendVariant}
          />
        ))}
      </div>

      <section className="ui-preview-section">
        <SectionHeader
          title="Module placeholder"
          description="This route exists to review shell, hierarchy, card patterns, tables, empty states and navigation before data integration."
          actions={<Badge variant="info">{reviewLabel}</Badge>}
        />

        <div className="ui-preview-split">
          <Card>
            <CardHeader>
              <CardTitle>Planned content</CardTitle>
            </CardHeader>
            <CardContent className="ui-preview-stack">
              <ul className="ui-bullet-list">
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              {quickLinks.length ? (
                <div className="ui-quick-links">
                  {quickLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="ui-quick-link">
                      <span>{link.label}</span>
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>UI states</CardTitle>
            </CardHeader>
            <CardContent className="ui-preview-stack">
              <Skeleton style={{ height: 18, width: "45%" }} />
              <Skeleton style={{ height: 14, width: "80%" }} />
              <EmptyState title={emptyTitle} description={emptyDescription} action={<Button variant="secondary">Primary action later</Button>} />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="ui-preview-section">
        <SectionHeader title="List pattern preview" description="Base table shell and tabs preview for future business data." />
        <Tabs
          items={[
            {
              label: "Overview",
              value: "overview",
              content: <p>Use summary cards and quick actions at the top of each workspace.</p>
            },
            {
              label: "List",
              value: "list",
              content: (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Owner</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{title}</TableCell>
                        <TableCell>HRIS Team</TableCell>
                        <TableCell>
                          <Badge variant="info">Placeholder</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Connected page shell</TableCell>
                        <TableCell>UI Foundation</TableCell>
                        <TableCell>
                          <Badge variant="success">Ready</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )
            }
          ]}
        />
      </section>
    </div>
  );
}
