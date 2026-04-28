import { DashboardHome } from "../../../components/dashboard-home";

export default function MeDashboardPage() {
  return (
    <DashboardHome
      roleLabel="Employee Workspace"
      greetingName="Admin"
      summary="Access your daily HR overview, onboarding progress, and people operations shortcuts from one place."
      primaryActionLabel="Open Self Service"
    />
  );
}
