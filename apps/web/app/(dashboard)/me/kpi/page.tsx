import { DashboardDetailPage } from "../../../../components/dashboard-detail-page";
import { dashboardDetailConfigs } from "../../../../components/dashboard-detail-data";

export default function MeKpiPage() {
  return <DashboardDetailPage {...dashboardDetailConfigs.meKpi} />;
}
