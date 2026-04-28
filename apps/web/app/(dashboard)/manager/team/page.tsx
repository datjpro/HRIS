import { DashboardDetailPage } from "../../../../components/dashboard-detail-page";
import { dashboardDetailConfigs } from "../../../../components/dashboard-detail-data";

export default function ManagerTeamPage() {
  return <DashboardDetailPage {...dashboardDetailConfigs.managerTeam} />;
}
