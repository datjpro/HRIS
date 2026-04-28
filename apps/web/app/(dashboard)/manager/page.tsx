import { DashboardHome } from "../../../components/dashboard-home";

export default function ManagerDashboardPage() {
  return (
    <DashboardHome
      roleLabel="Manager Workspace"
      greetingName="Manager"
      summary="Review team onboarding, direct-report updates, and high-priority actions across your reporting lines."
      primaryActionLabel="Review Team"
    />
  );
}
