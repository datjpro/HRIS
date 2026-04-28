import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function ManagerInterviewsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Manager"
      title="Interview Coordination"
      description="Placeholder for manager interview schedules and feedback workflows."
      stats={[
        { title: "Upcoming", value: "06", helperText: "Scheduled interviews", trendLabel: "This week", trendVariant: "info" },
        { title: "Feedback due", value: "02", helperText: "Need result submission", trendLabel: "Action", trendVariant: "warning" },
        { title: "Decision", value: "01", helperText: "Offer-ready candidate", trendLabel: "Ready", trendVariant: "success" }
      ]}
      bullets={[
        "Interview list or calendar shell",
        "Result submission CTA",
        "Status badges by interview round"
      ]}
      emptyTitle="Interview workflows will appear here"
      emptyDescription="The page is reserved for interview scheduling and feedback UI."
    />
  );
}
