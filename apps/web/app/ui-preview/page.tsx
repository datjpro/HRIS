"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  EmptyState,
  Input,
  PageHeader,
  SectionHeader,
  Select,
  Skeleton,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tabs,
  Textarea
} from "../../components/ui";

export default function UiPreviewPage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="container" style={{ paddingBlock: "32px" }}>
      <PageHeader
        eyebrow="Foundation"
        title="Core UI Components"
        description="Preview the shared component primitives for the HRIS frontend."
        actions={<Button onClick={() => setOpen(true)}>Open dialog</Button>}
      />

      <div className="ui-preview-grid">
        <StatCard title="Headcount" value="248" helperText="Across all departments" trendLabel="+12 this month" trendVariant="success" />
        <StatCard title="Open roles" value="16" helperText="Hiring pipeline" trendLabel="5 urgent" trendVariant="warning" />
        <StatCard title="Completion" value="91%" helperText="Onboarding completion rate" trendLabel="Stable" trendVariant="info" />
      </div>

      <section className="ui-preview-section">
        <SectionHeader title="Actions and fields" description="Buttons, badges and form controls follow the shared theme tokens." />
        <Card>
          <CardHeader>
            <CardTitle>Form controls</CardTitle>
            <CardDescription>Use wrapper props for label, helper text and error states.</CardDescription>
          </CardHeader>
          <CardContent className="ui-preview-form-grid">
            <Input label="Employee name" placeholder="Jane Doe" description="Visible in directory and profile pages." />
            <Select
              label="Department"
              defaultValue="technology"
              options={[
                { label: "Technology", value: "technology" },
                { label: "Human Resources", value: "hr" },
                { label: "Finance", value: "finance" }
              ]}
            />
            <Textarea label="Notes" rows={4} placeholder="Add a short internal note..." />
          </CardContent>
          <CardFooter>
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Reject</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="ui-preview-section">
        <SectionHeader title="Status patterns" description="Badge and tabs establish common states for HR workflows." />
        <div className="ui-preview-split">
          <Card>
            <CardContent className="ui-preview-stack">
              <div className="ui-preview-badges">
                <Badge variant="neutral">Draft</Badge>
                <Badge variant="info">In progress</Badge>
                <Badge variant="success">Completed</Badge>
                <Badge variant="warning">Needs review</Badge>
                <Badge variant="danger">Blocked</Badge>
              </div>
              <Tabs
                items={[
                  { label: "Overview", value: "overview", content: <p>Summary cards and quick actions go here.</p> },
                  { label: "Directory", value: "directory", content: <p>Employee or department data tables plug into this surface.</p> },
                  { label: "Activity", value: "activity", content: <p>Recent HR operations and audit events can render here.</p> }
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Loading and empty states</CardTitle>
              <CardDescription>Use these while awaiting API results or when a list has no data.</CardDescription>
            </CardHeader>
            <CardContent className="ui-preview-stack">
              <Skeleton style={{ height: 18, width: "40%" }} />
              <Skeleton style={{ height: 14, width: "70%" }} />
              <Skeleton style={{ height: 120, width: "100%" }} />
              <EmptyState title="No onboarding plans yet" description="Create or trigger a plan to populate this workspace." action={<Button variant="secondary">Trigger onboarding</Button>} />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="ui-preview-section">
        <SectionHeader title="Table shell" description="Base table primitives work with any business module list." />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Jane Doe</TableCell>
                <TableCell>Senior Engineer</TableCell>
                <TableCell><Badge variant="info">In progress</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alex Smith</TableCell>
                <TableCell>Product Manager</TableCell>
                <TableCell><Badge variant="success">Completed</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm review"
        description="Use the base dialog shell for important actions and confirmations."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p>This modal is intentionally minimal and ready to be reused in HR flows.</p>
      </Dialog>
    </main>
  );
}
