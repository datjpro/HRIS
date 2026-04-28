import { prisma } from "@hris/db";
import { createQueue, QUEUE_NAMES } from "@hris/redis";
import type { RecruitmentJobPayload } from "@hris/shared-types";

const recruitmentQueue = createQueue(QUEUE_NAMES.RECRUITMENT);

export function startRecruitmentSlaScheduler() {
  const interval = setInterval(async () => {
    const overdueRequests = await prisma.hiringRequest.findMany({
      where: {
        status: "PENDING_APPROVAL",
        slaDeadlineAt: { lte: new Date() },
        slaAlertedAt: null
      },
      include: {
        department: true
      }
    });

    for (const request of overdueRequests) {
      const payload: RecruitmentJobPayload = {
        type: "sla-alert",
        hiringRequestId: request.id,
        requestCode: request.requestCode,
        departmentName: request.department.name
      };

      await recruitmentQueue.add(`sla-alert-${request.id}`, payload);
    }
  }, 60_000);

  return () => clearInterval(interval);
}

