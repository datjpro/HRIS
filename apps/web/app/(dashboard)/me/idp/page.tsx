import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function MeIdpPage() {
  return (
    <ModulePlaceholder
      eyebrow="Employee"
      title="My IDP"
      description="Placeholder page for personal development plans, objectives and progress notes."
      stats={[
        { title: "Plans", value: "03", helperText: "Sample development plans", trendLabel: "Tracked", trendVariant: "info" },
        { title: "Milestones", value: "08", helperText: "Goal checkpoints later", trendLabel: "Planned", trendVariant: "warning" },
        { title: "Visibility", value: "Self", helperText: "Employee and HR access", trendLabel: "Scoped", trendVariant: "success" }
      ]}
      bullets={[
        "IDP plan cards",
        "Progress notes and target dates",
        "Shared patterns with HR IDP workspace"
      ]}
      emptyTitle="IDP content appears here"
      emptyDescription="Use this page to review spacing, cards and workflow affordances before wiring the API."
    />
  );
}
