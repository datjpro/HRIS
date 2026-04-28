import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "@hris/db";
import { successResponse, errorResponse } from "../lib/api";
import type { AppBindings } from "../lib/app-bindings";
import { checkPermission } from "../middlewares/permission";

export const ldCultureAnalyticsRouter = new Hono<AppBindings>();

const trainingCourseSchema = z.object({
  departmentId: z.string().optional(),
  code: z.string().min(2),
  title: z.string().min(2),
  description: z.string().optional(),
  provider: z.string().optional(),
  commitmentMonths: z.number().int().nonnegative().optional(),
  startsAt: z.string().datetime().optional(),
  endsAt: z.string().datetime().optional(),
  status: z.string().optional()
});

const enrollmentSchema = z.object({
  trainingCourseId: z.string(),
  employeeProfileId: z.string(),
  completedAt: z.string().datetime().optional(),
  status: z.string().optional()
});

const idpSchema = z.object({
  employeeProfileId: z.string(),
  title: z.string().min(2),
  objective: z.string().min(2),
  targetDate: z.string().datetime().optional(),
  status: z.string().optional(),
  progressNote: z.string().optional()
});

const enpsSchema = z.object({
  period: z.string().min(4),
  score: z.number().int().min(0).max(10),
  comment: z.string().optional(),
  departmentCode: z.string().optional()
});

ldCultureAnalyticsRouter.get("/learning/courses", checkPermission("learning.read"), async (context) => {
  const departmentId = context.req.query("departmentId");
  const courses = await prisma.trainingCourse.findMany({
    where: departmentId ? { departmentId } : undefined,
    orderBy: [{ createdAt: "desc" }]
  });

  return context.json(
    successResponse(
      courses.map((item) => ({
        id: item.id,
        departmentId: item.departmentId ?? undefined,
        code: item.code,
        title: item.title,
        description: item.description ?? undefined,
        provider: item.provider ?? undefined,
        commitmentMonths: item.commitmentMonths,
        startsAt: item.startsAt?.toISOString(),
        endsAt: item.endsAt?.toISOString(),
        status: item.status
      }))
    )
  );
});

ldCultureAnalyticsRouter.post("/learning/courses", checkPermission("learning.write"), async (context) => {
  const body = await context.req.json();
  const parsed = trainingCourseSchema.safeParse(body);

  if (!parsed.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid training course payload"), 400);
  }

  const created = await prisma.trainingCourse.create({
    data: {
      departmentId: parsed.data.departmentId,
      code: parsed.data.code,
      title: parsed.data.title,
      description: parsed.data.description,
      provider: parsed.data.provider,
      commitmentMonths: parsed.data.commitmentMonths ?? 0,
      startsAt: parsed.data.startsAt ? new Date(parsed.data.startsAt) : undefined,
      endsAt: parsed.data.endsAt ? new Date(parsed.data.endsAt) : undefined,
      status: parsed.data.status ?? "PLANNED"
    }
  });

  return context.json(successResponse(created), 201);
});

ldCultureAnalyticsRouter.post("/learning/enrollments", checkPermission("learning.write"), async (context) => {
  const body = await context.req.json();
  const parsed = enrollmentSchema.safeParse(body);

  if (!parsed.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid training enrollment payload"), 400);
  }

  const course = await prisma.trainingCourse.findUnique({ where: { id: parsed.data.trainingCourseId } });
  if (!course) {
    return context.json(errorResponse("NOT_FOUND", "Training course not found"), 404);
  }

  const completedAt = parsed.data.completedAt ? new Date(parsed.data.completedAt) : undefined;
  const commitmentEndDate = completedAt
    ? new Date(completedAt.getTime() + course.commitmentMonths * 30 * 24 * 60 * 60 * 1000)
    : undefined;

  const enrollment = await prisma.trainingEnrollment.upsert({
    where: {
      trainingCourseId_employeeProfileId: {
        trainingCourseId: parsed.data.trainingCourseId,
        employeeProfileId: parsed.data.employeeProfileId
      }
    },
    update: {
      completedAt,
      commitmentEndDate,
      status: parsed.data.status ?? (completedAt ? "COMPLETED" : "ENROLLED")
    },
    create: {
      trainingCourseId: parsed.data.trainingCourseId,
      employeeProfileId: parsed.data.employeeProfileId,
      completedAt,
      commitmentEndDate,
      status: parsed.data.status ?? (completedAt ? "COMPLETED" : "ENROLLED")
    }
  });

  return context.json(successResponse(enrollment), 201);
});

ldCultureAnalyticsRouter.get("/idp/plans", checkPermission("idp.read"), async (context) => {
  const viewer = context.var.user;
  const employeeProfileId = context.req.query("employeeProfileId");

  const plans = await prisma.idpPlan.findMany({
    where:
      viewer.role === "HR" || viewer.role === "ADMIN"
        ? { employeeProfileId: employeeProfileId ?? undefined }
        : viewer.role === "MANAGER"
          ? {
              employeeProfile: {
                OR: [{ userId: viewer.sub }, { user: { managerId: viewer.sub } }]
              }
            }
          : {
              employeeProfile: { userId: viewer.sub }
            },
    orderBy: [{ createdAt: "desc" }]
  });

  return context.json(
    successResponse(
      plans.map((plan) => ({
        id: plan.id,
        employeeProfileId: plan.employeeProfileId,
        title: plan.title,
        objective: plan.objective,
        targetDate: plan.targetDate?.toISOString(),
        status: plan.status,
        progressNote: plan.progressNote ?? undefined
      }))
    )
  );
});

ldCultureAnalyticsRouter.post("/idp/plans", checkPermission("idp.write"), async (context) => {
  const body = await context.req.json();
  const parsed = idpSchema.safeParse(body);

  if (!parsed.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid IDP payload"), 400);
  }

  const created = await prisma.idpPlan.create({
    data: {
      employeeProfileId: parsed.data.employeeProfileId,
      title: parsed.data.title,
      objective: parsed.data.objective,
      targetDate: parsed.data.targetDate ? new Date(parsed.data.targetDate) : undefined,
      status: parsed.data.status ?? "ACTIVE",
      progressNote: parsed.data.progressNote
    }
  });

  return context.json(successResponse(created), 201);
});

ldCultureAnalyticsRouter.post("/culture/enps", checkPermission("culture.enps.submit"), async (context) => {
  const body = await context.req.json();
  const parsed = enpsSchema.safeParse(body);

  if (!parsed.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid eNPS payload"), 400);
  }

  const created = await prisma.enpsSurvey.create({
    data: {
      period: parsed.data.period,
      score: parsed.data.score,
      comment: parsed.data.comment,
      departmentCode: parsed.data.departmentCode
    }
  });

  return context.json(successResponse({ id: created.id, submitted: true }), 201);
});

ldCultureAnalyticsRouter.get("/analytics/dashboard", checkPermission("analytics.read"), async (context) => {
  const period = context.req.query("period") ?? new Date().toISOString().slice(0, 7);
  const activeHeadcount = await prisma.employeeProfile.count({ where: { employmentStatus: { not: "TERMINATED" } } });
  const onboardingCount = await prisma.onboardingPlan.count({ where: { status: { in: ["PENDING", "ACTIVE"] } } });
  const pendingHiringRequests = await prisma.hiringRequest.count({ where: { status: "PENDING_APPROVAL" } });

  const periodStart = new Date(`${period}-01T00:00:00.000Z`);
  const periodEnd = new Date(periodStart);
  periodEnd.setMonth(periodEnd.getMonth() + 1);

  const terminatedThisPeriod = await prisma.employeeProfile.count({
    where: {
      employmentStatus: "TERMINATED",
      terminationDate: {
        gte: periodStart,
        lt: periodEnd
      }
    }
  });

  const turnoverRate = activeHeadcount > 0 ? Number(((terminatedThisPeriod / activeHeadcount) * 100).toFixed(2)) : 0;

  const headcountTrend = [] as Array<{ period: string; activeEmployees: number }>;
  for (let index = 5; index >= 0; index -= 1) {
    const monthDate = new Date(periodStart);
    monthDate.setMonth(monthDate.getMonth() - index);
    const monthKey = monthDate.toISOString().slice(0, 7);
    const monthEnd = new Date(monthDate);
    monthEnd.setMonth(monthEnd.getMonth() + 1);

    const activeEmployees = await prisma.employeeProfile.count({
      where: {
        hireDate: { lt: monthEnd },
        OR: [{ terminationDate: null }, { terminationDate: { gte: monthDate } }]
      }
    });

    headcountTrend.push({
      period: monthKey,
      activeEmployees
    });
  }

  const enpsAggregate = await prisma.enpsSurvey.aggregate({
    where: { period },
    _avg: { score: true }
  });

  return context.json(
    successResponse({
      activeHeadcount,
      onboardingCount,
      pendingHiringRequests,
      turnoverRate,
      headcountTrend,
      enpsAverageScore: enpsAggregate._avg.score ?? null
    })
  );
});

