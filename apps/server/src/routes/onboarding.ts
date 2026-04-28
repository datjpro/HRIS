import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "@hris/db";
import { createQueue, QUEUE_NAMES } from "@hris/redis";
import { successResponse, errorResponse } from "../lib/api";
import type { AppBindings } from "../lib/app-bindings";
import { checkPermission } from "../middlewares/permission";
import type { OnboardingJobPayload } from "@hris/shared-types";

export const onboardingRouter = new Hono<AppBindings>();
const onboardingQueue = createQueue(QUEUE_NAMES.ONBOARDING);

const triggerSchema = z.object({
  applicationId: z.string(),
  buddyUserId: z.string().optional()
});

function generateEmployeeCode(): string {
  return `EMP-${Date.now()}`;
}

function generateTempPassword(): string {
  return `Temp@${Date.now()}`;
}

onboardingRouter.post("/onboarding/trigger", checkPermission("onboarding.write"), async (context) => {
  const body = await context.req.json();
  const result = triggerSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid onboarding trigger payload"), 400);
  }

  const application = await prisma.application.findUnique({
    where: { id: result.data.applicationId },
    include: {
      candidate: true,
      hiringRequest: {
        include: {
          department: true
        }
      },
      onboardingPlan: true
    }
  });

  if (!application) {
    return context.json(errorResponse("NOT_FOUND", "Application not found"), 404);
  }

  if (application.onboardingPlan) {
    return context.json(successResponse({ onboardingPlanId: application.onboardingPlan.id, queued: false }));
  }

  let user = await prisma.user.findUnique({ where: { email: application.candidate.email } });

  if (!user) {
    const tempPasswordHash = await Bun.password.hash(generateTempPassword());

    user = await prisma.user.create({
      data: {
        email: application.candidate.email,
        fullName: application.candidate.fullName,
        role: "EMPLOYEE",
        department: application.hiringRequest.department.name,
        accounts: {
          create: {
            provider: "credentials",
            password: tempPasswordHash
          }
        }
      }
    });
  }

  let employeeProfile = await prisma.employeeProfile.findUnique({ where: { userId: user.id } });

  if (!employeeProfile) {
    employeeProfile = await prisma.employeeProfile.create({
      data: {
        userId: user.id,
        employeeCode: generateEmployeeCode(),
        departmentId: application.hiringRequest.departmentId,
        jobTitle: application.hiringRequest.title,
        employmentStatus: "ONBOARDING",
        hireDate: new Date()
      }
    });
  }

  const buddyUserId = result.data.buddyUserId ?? application.hiringRequest.hiringManagerId ?? application.hiringRequest.department.managerUserId ?? undefined;

  const plan = await prisma.onboardingPlan.create({
    data: {
      employeeProfileId: employeeProfile.id,
      applicationId: application.id,
      buddyUserId,
      template: "30-60-90",
      status: "PENDING"
    }
  });

  await prisma.application.update({
    where: { id: application.id },
    data: { status: "HIRED" }
  });

  await prisma.candidate.update({
    where: { id: application.candidateId },
    data: { status: "HIRED" }
  });

  const payload: OnboardingJobPayload = {
    employeeProfileId: employeeProfile.id,
    applicationId: application.id,
    buddyUserId,
    checklistTemplate: "30-60-90"
  };

  await onboardingQueue.add(`generate-onboarding-${plan.id}`, payload);

  return context.json(successResponse({ onboardingPlanId: plan.id, queued: true }), 202);
});

onboardingRouter.get("/onboarding/plans", checkPermission("onboarding.read"), async (context) => {
  const user = context.var.user;
  const plans = await prisma.onboardingPlan.findMany({
    where:
      user.role === "HR" || user.role === "ADMIN"
        ? undefined
        : {
            employeeProfile: {
              userId: user.sub
            }
          },
    include: {
      tasks: true,
      employeeProfile: true
    },
    orderBy: [{ createdAt: "desc" }]
  });

  return context.json(
    successResponse(
      plans.map((plan) => ({
        id: plan.id,
        employeeProfileId: plan.employeeProfileId,
        applicationId: plan.applicationId ?? undefined,
        buddyUserId: plan.buddyUserId ?? undefined,
        template: plan.template,
        status: plan.status,
        startedAt: plan.startedAt?.toISOString(),
        completedAt: plan.completedAt?.toISOString(),
        tasksCount: plan.tasks.length
      }))
    )
  );
});

onboardingRouter.get("/onboarding/plans/:planId", checkPermission("onboarding.read"), async (context) => {
  const user = context.var.user;
  const plan = await prisma.onboardingPlan.findUnique({
    where: { id: context.req.param("planId") },
    include: {
      tasks: {
        orderBy: [{ phaseDay: "asc" }, { createdAt: "asc" }]
      },
      employeeProfile: true
    }
  });

  if (!plan) {
    return context.json(errorResponse("NOT_FOUND", "Onboarding plan not found"), 404);
  }

  const isOwner = plan.employeeProfile.userId === user.sub;
  const isHrAdmin = user.role === "HR" || user.role === "ADMIN";

  if (!isOwner && !isHrAdmin) {
    return context.json(errorResponse("FORBIDDEN", "You do not have permission to view this onboarding plan"), 403);
  }

  return context.json(
    successResponse({
      id: plan.id,
      employeeProfileId: plan.employeeProfileId,
      applicationId: plan.applicationId ?? undefined,
      buddyUserId: plan.buddyUserId ?? undefined,
      template: plan.template,
      status: plan.status,
      startedAt: plan.startedAt?.toISOString(),
      completedAt: plan.completedAt?.toISOString(),
      tasks: plan.tasks.map((task) => ({
        id: task.id,
        onboardingPlanId: task.onboardingPlanId,
        title: task.title,
        description: task.description ?? undefined,
        phaseDay: task.phaseDay,
        dueDate: task.dueDate.toISOString(),
        status: task.status,
        completedAt: task.completedAt?.toISOString()
      }))
    })
  );
});

