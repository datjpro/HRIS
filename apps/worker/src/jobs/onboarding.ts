import { QUEUE_NAMES, createWorker } from "@hris/redis";

export type OnboardingJobPayload = {
  employeeId: string;
  checklistTemplate: "30-60-90";
};

export function startOnboardingWorker(): { close(): Promise<void> } {
  return createWorker<OnboardingJobPayload>(QUEUE_NAMES.ONBOARDING, async (job) => {
    console.log(`Processing onboarding job for ${job.data.employeeId}`);
  });
}
