import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function MeOnboardingPage() {
  return (
    <ModulePlaceholder
      eyebrow="Employee"
      title="My Onboarding"
      description="Placeholder page for onboarding checklists, buddy info and timeline progress."
      stats={[
        { title: "Timeline", value: "30/60/90", helperText: "Checkpoint structure", trendLabel: "Structured", trendVariant: "info" },
        { title: "Tasks", value: "14", helperText: "Expected checklist items", trendLabel: "Checklist", trendVariant: "neutral" },
        { title: "Buddy", value: "01", helperText: "Assigned support role", trendLabel: "Enabled", trendVariant: "success" }
      ]}
      bullets={[
        "Checklist timeline view",
        "Buddy details and progress",
        "Status badges for task completion"
      ]}
      emptyTitle="No onboarding plan shown yet"
      emptyDescription="This screen proves the shell for onboarding detail pages before task data is attached."
    />
  );
}
