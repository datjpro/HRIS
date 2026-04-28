import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function HrOnboardingPage() {
  return (
    <ModulePlaceholder
      eyebrow="HR"
      title="Onboarding"
      description="Placeholder for onboarding trigger, plan list and checklist review."
      stats={[
        { title: "Active plans", value: "07", helperText: "Current onboarding journeys", trendLabel: "In progress", trendVariant: "info" },
        { title: "Templates", value: "30/60/90", helperText: "Checklist cadence", trendLabel: "Structured", trendVariant: "neutral" },
        { title: "Buddy assigned", value: "06", helperText: "Support coverage sample", trendLabel: "Enabled", trendVariant: "success" }
      ]}
      bullets={[
        "Plan list with status overview",
        "Trigger onboarding action",
        "Checklist detail route later"
      ]}
      quickLinks={[{ href: "/hr/recruitment/requests", label: "Back to recruitment" }]}
      emptyTitle="Onboarding plan placeholder"
      emptyDescription="Shell and states are ready for onboarding workflows."
    />
  );
}
