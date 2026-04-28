import { startOnboardingWorker } from "./jobs/onboarding";
import { startRecruitmentWorker } from "./jobs/recruitment";
import { startRecruitmentSlaScheduler } from "./scheduler/recruitment-sla";
import { startTrainingCommitmentScheduler } from "./scheduler/training";

const onboardingWorker = startOnboardingWorker();
const recruitmentWorker = startRecruitmentWorker();
const stopRecruitmentScheduler = startRecruitmentSlaScheduler();
const stopScheduler = startTrainingCommitmentScheduler();

console.log("HRIS worker started");

const shutdown = async () => {
  stopScheduler();
  stopRecruitmentScheduler();
  await onboardingWorker.close();
  await recruitmentWorker.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

