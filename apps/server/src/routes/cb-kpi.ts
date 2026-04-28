import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "@hris/db";
import { createQueue, QUEUE_NAMES } from "@hris/redis";
import { successResponse, errorResponse } from "../lib/api";
import type { AppBindings } from "../lib/app-bindings";
import { checkPermission } from "../middlewares/permission";
import { getCachedSalaryBands, invalidateSalaryBandCache, setCachedSalaryBands } from "../lib/salary-band-cache";
import type { PayrollExportJobPayload } from "@hris/shared-types";

export const cbKpiRouter = new Hono<AppBindings>();
const reportQueue = createQueue(QUEUE_NAMES.REPORTS);

const salaryBandSchema = z.object({
  departmentId: z.string(),
  roleLevel: z.string().min(2),
  minBaseSalary: z.number().nonnegative(),
  maxBaseSalary: z.number().nonnegative(),
  allowanceDefault: z.number().nonnegative().optional(),
  currency: z.string().optional(),
  isActive: z.boolean().optional()
});

const kpiMetricSchema = z.object({
  departmentId: z.string(),
  code: z.string().min(2),
  name: z.string().min(2),
  description: z.string().optional(),
  weight: z.number().positive(),
  targetValue: z.number().optional(),
  unit: z.string().optional(),
  isActive: z.boolean().optional()
});

const kpiResultSchema = z.object({
  employeeProfileId: z.string(),
  metricId: z.string(),
  period: z.string().min(4),
  achievedValue: z.number().optional(),
  score: z.number().min(0),
  bonusAmount: z.number().nonnegative().optional(),
  note: z.string().optional()
});

const payrollGenerateSchema = z.object({
  period: z.string().min(4),
  employeeProfileId: z.string().optional(),
  deduction: z.number().nonnegative().optional()
});

const payrollExportSchema = z.object({
  period: z.string().min(4)
});

cbKpiRouter.get("/compensation/salary-bands", checkPermission("compensation.read"), async (context) => {
  const departmentId = context.req.query("departmentId");

  if (!departmentId) {
    const bands = await prisma.salaryBand.findMany({ orderBy: [{ createdAt: "desc" }] });
    return context.json(successResponse(bands));
  }

  const cached = await getCachedSalaryBands(departmentId);
  if (cached) {
    return context.json(successResponse(cached));
  }

  const bands = await prisma.salaryBand.findMany({ where: { departmentId }, orderBy: [{ roleLevel: "asc" }] });
  await setCachedSalaryBands(departmentId, bands);
  return context.json(successResponse(bands));
});

cbKpiRouter.post("/compensation/salary-bands", checkPermission("compensation.write"), async (context) => {
  const body = await context.req.json();
  const parsed = salaryBandSchema.safeParse(body);

  if (!parsed.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid salary band payload"), 400);
  }

  const created = await prisma.salaryBand.create({
    data: {
      departmentId: parsed.data.departmentId,
      roleLevel: parsed.data.roleLevel,
      minBaseSalary: parsed.data.minBaseSalary,
      maxBaseSalary: parsed.data.maxBaseSalary,
      allowanceDefault: parsed.data.allowanceDefault ?? 0,
      currency: parsed.data.currency ?? "VND",
      isActive: parsed.data.isActive ?? true
    }
  });

  await invalidateSalaryBandCache(parsed.data.departmentId);
  return context.json(successResponse(created), 201);
});

cbKpiRouter.put("/compensation/salary-bands/:salaryBandId", checkPermission("compensation.write"), async (context) => {
  const body = await context.req.json();
  const parsed = salaryBandSchema.safeParse(body);

  if (!parsed.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid salary band payload"), 400);
  }

  const updated = await prisma.salaryBand.update({
    where: { id: context.req.param("salaryBandId") },
    data: {
      departmentId: parsed.data.departmentId,
      roleLevel: parsed.data.roleLevel,
      minBaseSalary: parsed.data.minBaseSalary,
      maxBaseSalary: parsed.data.maxBaseSalary,
      allowanceDefault: parsed.data.allowanceDefault ?? 0,
      currency: parsed.data.currency ?? "VND",
      isActive: parsed.data.isActive ?? true
    }
  });

  await invalidateSalaryBandCache(parsed.data.departmentId);
  return context.json(successResponse(updated));
});

cbKpiRouter.get("/kpi/metrics", checkPermission("kpi.read"), async (context) => {
  const departmentId = context.req.query("departmentId");
  const metrics = await prisma.kpiMetric.findMany({
    where: departmentId ? { departmentId } : undefined,
    orderBy: [{ createdAt: "desc" }]
  });

  return context.json(successResponse(metrics));
});

cbKpiRouter.post("/kpi/metrics", checkPermission("kpi.write"), async (context) => {
  const body = await context.req.json();
  const parsed = kpiMetricSchema.safeParse(body);

  if (!parsed.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid KPI metric payload"), 400);
  }

  const created = await prisma.kpiMetric.create({
    data: {
      departmentId: parsed.data.departmentId,
      code: parsed.data.code,
      name: parsed.data.name,
      description: parsed.data.description,
      weight: parsed.data.weight,
      targetValue: parsed.data.targetValue,
      unit: parsed.data.unit,
      isActive: parsed.data.isActive ?? true
    }
  });

  return context.json(successResponse(created), 201);
});

cbKpiRouter.get("/kpi/results", checkPermission("kpi.read"), async (context) => {
  const employeeProfileId = context.req.query("employeeProfileId");
  const period = context.req.query("period");

  const results = await prisma.kpiResult.findMany({
    where: {
      employeeProfileId: employeeProfileId ?? undefined,
      period: period ?? undefined
    },
    orderBy: [{ createdAt: "desc" }]
  });

  return context.json(successResponse(results));
});

cbKpiRouter.post("/kpi/results", checkPermission("kpi.write"), async (context) => {
  const body = await context.req.json();
  const parsed = kpiResultSchema.safeParse(body);

  if (!parsed.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid KPI result payload"), 400);
  }

  const upserted = await prisma.kpiResult.upsert({
    where: {
      employeeProfileId_metricId_period: {
        employeeProfileId: parsed.data.employeeProfileId,
        metricId: parsed.data.metricId,
        period: parsed.data.period
      }
    },
    update: {
      achievedValue: parsed.data.achievedValue,
      score: parsed.data.score,
      bonusAmount: parsed.data.bonusAmount ?? 0,
      note: parsed.data.note
    },
    create: {
      employeeProfileId: parsed.data.employeeProfileId,
      metricId: parsed.data.metricId,
      period: parsed.data.period,
      achievedValue: parsed.data.achievedValue,
      score: parsed.data.score,
      bonusAmount: parsed.data.bonusAmount ?? 0,
      note: parsed.data.note
    }
  });

  return context.json(successResponse(upserted));
});

cbKpiRouter.post("/compensation/payroll/generate", checkPermission("payroll.generate"), async (context) => {
  const body = await context.req.json();
  const parsed = payrollGenerateSchema.safeParse(body);

  if (!parsed.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid payroll payload"), 400);
  }

  const profiles = await prisma.employeeProfile.findMany({
    where: parsed.data.employeeProfileId ? { id: parsed.data.employeeProfileId } : undefined,
    include: {
      department: true,
      contracts: { where: { status: "ACTIVE" }, orderBy: [{ startDate: "desc" }], take: 1 },
      kpiResults: { where: { period: parsed.data.period } }
    }
  });

  const generated = [];

  for (const profile of profiles) {
    const activeContract = profile.contracts[0];
    if (!activeContract) {
      continue;
    }

    const salaryBand = await prisma.salaryBand.findFirst({
      where: {
        departmentId: profile.departmentId,
        roleLevel: profile.jobTitle,
        isActive: true
      }
    });

    const kpiBonus = profile.kpiResults.reduce((sum, item) => sum + item.bonusAmount, 0);
    const allowance = salaryBand?.allowanceDefault ?? 0;
    const deduction = parsed.data.deduction ?? 0;
    const grossBaseSalary = activeContract.baseSalary;
    const netSalary = grossBaseSalary + kpiBonus + allowance - deduction;

    const payslip = await prisma.payslip.upsert({
      where: {
        employeeProfileId_period: {
          employeeProfileId: profile.id,
          period: parsed.data.period
        }
      },
      update: {
        grossBaseSalary,
        kpiBonus,
        allowance,
        deduction,
        netSalary,
        currency: activeContract.salaryCurrency,
        generatedByUserId: context.var.user.sub,
        generatedAt: new Date()
      },
      create: {
        employeeProfileId: profile.id,
        period: parsed.data.period,
        grossBaseSalary,
        kpiBonus,
        allowance,
        deduction,
        netSalary,
        currency: activeContract.salaryCurrency,
        generatedByUserId: context.var.user.sub
      }
    });

    generated.push(payslip);
  }

  return context.json(successResponse(generated));
});

cbKpiRouter.get("/compensation/payslips", checkPermission("compensation.read"), async (context) => {
  const period = context.req.query("period");
  const viewer = context.var.user;

  const payslips = await prisma.payslip.findMany({
    where: {
      period: period ?? undefined,
      employeeProfile:
        viewer.role === "HR" || viewer.role === "ADMIN"
          ? undefined
          : viewer.role === "MANAGER"
            ? { user: { OR: [{ id: viewer.sub }, { managerId: viewer.sub }] } }
            : { userId: viewer.sub }
    },
    orderBy: [{ generatedAt: "desc" }]
  });

  return context.json(successResponse(payslips));
});

cbKpiRouter.post("/compensation/payroll/export", checkPermission("payroll.export"), async (context) => {
  const body = await context.req.json();
  const parsed = payrollExportSchema.safeParse(body);

  if (!parsed.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid payroll export payload"), 400);
  }

  const payload: PayrollExportJobPayload = {
    period: parsed.data.period,
    requestedByUserId: context.var.user.sub
  };

  await reportQueue.add(`payroll-export-${parsed.data.period}-${Date.now()}`, payload);

  return context.json(successResponse({ queued: true, period: parsed.data.period }), 202);
});

