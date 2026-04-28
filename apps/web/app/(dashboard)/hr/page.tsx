import { DashboardHome } from "../../../components/dashboard-home";

export default function HrDashboardPage() {
  return (
    <DashboardHome
      roleLabel="HR Workspace"
      greetingName="HR"
      summary="Monitor headcount movement, onboarding pipelines, and operational shortcuts for people operations."
      primaryActionLabel="Onboard Employee"
    />
  );
}
