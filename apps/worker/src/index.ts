import { startOnboardingWorker } from "./jobs/onboarding";
import { startTrainingCommitmentScheduler } from "./scheduler/training";

const worker = startOnboardingWorker();
const stopScheduler = startTrainingCommitmentScheduler();

console.log("HRIS worker started");

const shutdown = async () => {
  stopScheduler();
  await worker.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

