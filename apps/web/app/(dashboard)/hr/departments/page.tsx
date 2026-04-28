import { ModulePlaceholder } from "../../../../components/data-display/module-placeholder";

export default function HrDepartmentsPage() {
  return (
    <ModulePlaceholder
      eyebrow="HR"
      title="Departments"
      description="Placeholder for department list, tree view and CRUD actions."
      stats={[
        { title: "Departments", value: "12", helperText: "Sample organizational units", trendLabel: "Org core", trendVariant: "info" },
        { title: "Tree levels", value: "03", helperText: "Hierarchy depth sample", trendLabel: "Mapped", trendVariant: "neutral" },
        { title: "Actions", value: "CRUD", helperText: "Supported by backend", trendLabel: "Ready", trendVariant: "success" }
      ]}
      bullets={[
        "Department table and tree split layout",
        "Create/update/delete actions",
        "Manager assignment details later"
      ]}
      quickLinks={[{ href: "/hr/employees", label: "Go to employee directory" }]}
      emptyTitle="Departments UI loads here"
      emptyDescription="This route proves organization module navigation and layout."
    />
  );
}
