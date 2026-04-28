import { prisma } from "@hris/db";
import { QUEUE_NAMES, createWorker } from "@hris/redis";
import type { OnboardingJobPayload } from "@hris/shared-types";

const CHECKLIST_TEMPLATE_30_60_90 = [
  { phaseDay: 30, title: "Complete company orientation", description: "Review handbook, policies, and HR introduction." },
  { phaseDay: 30, title: "Set up work tools", description: "Email, chat, HRIS profile, and required access." },
  { phaseDay: 30, title: "Meet your buddy", description: "Connect with assigned buddy for first-month guidance." },
  { phaseDay: 60, title: "Department onboarding review", description: "Review role expectations and first deliverables with manager." },
  { phaseDay: 60, title: "Cross-team introductions", description: "Meet key stakeholders and partner teams." },
  { phaseDay: 60, title: "Initial performance check-in", description: "Review progress and unblock issues with manager." },
  { phaseDay: 90, title: "90-day performance review", description: "Assess readiness, ownership, and long-term goals." },
  { phaseDay: 90, title: "Confirm training plan", description: "Finalize learning path and next-quarter development targets." },
  { phaseDay: 90, title: "Onboarding closeout", description: "Complete onboarding and transition to standard employee cycle." }
] as const;

export function startOnboardingWorker(): { close(): Promise<void> } {
  return createWorker<OnboardingJobPayload>(QUEUE_NAMES.ONBOARDING, async (job) => {
    const employeeProfile = await prisma.employeeProfile.findUnique({
      where: { id: job.data.employeeProfileId },
      include: { onboardingPlans: true }
    });

    if (!employeeProfile) {
      console.log(`[Onboarding] Employee profile ${job.data.employeeProfileId} not found`);
      return;
    }

    const onboardingPlan = employeeProfile.onboardingPlans.find(
      (plan) => plan.applicationId === job.data.applicationId || plan.status === "PENDING"
    );

    if (!onboardingPlan) {
      console.log(`[Onboarding] Plan not found for employee profile ${job.data.employeeProfileId}`);
      return;
    }

    const existingTasks = await prisma.onboardingTask.count({
      where: { onboardingPlanId: onboardingPlan.id }
    });

    if (existingTasks === 0) {
      await prisma.onboardingTask.createMany({
        data: CHECKLIST_TEMPLATE_30_60_90.map((item) => ({
          onboardingPlanId: onboardingPlan.id,
          title: item.title,
          description: item.description,
          phaseDay: item.phaseDay,
          dueDate: new Date(employeeProfile.hireDate.getTime() + item.phaseDay * 24 * 60 * 60 * 1000),
          status: "TODO"
        }))
      });
    }

    await prisma.onboardingPlan.update({
      where: { id: onboardingPlan.id },
      data: {
        buddyUserId: job.data.buddyUserId,
        status: "ACTIVE",
        startedAt: onboardingPlan.startedAt ?? new Date()
      }
    });

    console.log(`[Onboarding] Generated checklist for employee profile ${job.data.employeeProfileId}`);
  });
}
