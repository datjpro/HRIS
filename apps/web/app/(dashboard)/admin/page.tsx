import { DashboardHome } from "../../../components/dashboard-home";

export default function AdminDashboardPage() {
  return (
    <DashboardHome
      roleLabel="Enterprise Admin"
      greetingName="Admin"
      summary="Stay on top of organization health, recent onboarding, and key admin workflows from the main dashboard."
      primaryActionLabel="Onboard Employee"
    />
  );
}
