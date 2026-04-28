import { prisma } from "@hris/db";
import { QUEUE_NAMES, createWorker } from "@hris/redis";
import type { PayrollExportJobPayload } from "@hris/shared-types";

export function startReportWorker(): { close(): Promise<void> } {
  return createWorker<PayrollExportJobPayload>(QUEUE_NAMES.REPORTS, async (job) => {
    const payslips = await prisma.payslip.findMany({
      where: { period: job.data.period },
      include: {
        employeeProfile: {
          include: {
            user: true,
            department: true
          }
        }
      },
      orderBy: [{ createdAt: "asc" }]
    });

    const rows = payslips.map((item) => ({
      employeeCode: item.employeeProfile.employeeCode,
      fullName: item.employeeProfile.user.fullName,
      department: item.employeeProfile.department.name,
      period: item.period,
      grossBaseSalary: item.grossBaseSalary,
      kpiBonus: item.kpiBonus,
      allowance: item.allowance,
      deduction: item.deduction,
      netSalary: item.netSalary,
      currency: item.currency
    }));

    console.log(`[Reports] Payroll export for ${job.data.period} requested by ${job.data.requestedByUserId}`);
    console.log(JSON.stringify(rows, null, 2));
  });
}

