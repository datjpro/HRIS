import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function MePayslipsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Employee"
      title="My Payslips"
      description="Self-service payslip history placeholder using shared tables and status patterns."
      stats={[
        { title: "Periods", value: "12", helperText: "Expected monthly records", trendLabel: "Annual", trendVariant: "neutral" },
        { title: "Downloads", value: "PDF", helperText: "Future export surface", trendLabel: "Planned", trendVariant: "info" },
        { title: "Visibility", value: "Self", helperText: "Restricted by backend role", trendLabel: "Secured", trendVariant: "success" }
      ]}
      bullets={[
        "Payslip list table",
        "Payroll period filter",
        "Detail drawer or downloadable file later"
      ]}
      quickLinks={[{ href: "/me/profile", label: "Back to profile" }]}
      emptyTitle="No payslips rendered yet"
      emptyDescription="The table shell is ready for payroll data from the compensation endpoints."
    />
  );
}
