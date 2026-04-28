import { startOnboardingWorker } from "./jobs/onboarding";
import { startReportWorker } from "./jobs/reports";
import { startRecruitmentWorker } from "./jobs/recruitment";
import { startRecruitmentSlaScheduler } from "./scheduler/recruitment-sla";
import { startTrainingCommitmentScheduler } from "./scheduler/training";

const onboardingWorker = startOnboardingWorker();
const reportWorker = startReportWorker();
const recruitmentWorker = startRecruitmentWorker();
const stopRecruitmentScheduler = startRecruitmentSlaScheduler();
const stopScheduler = startTrainingCommitmentScheduler();

console.log("HRIS worker started");

const shutdown = async () => {
  stopScheduler();
  stopRecruitmentScheduler();
  await onboardingWorker.close();
  await reportWorker.close();
  await recruitmentWorker.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

