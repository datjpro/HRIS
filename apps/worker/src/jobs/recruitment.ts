import { prisma } from "@hris/db";
import { QUEUE_NAMES, createWorker } from "@hris/redis";
import type { RecruitmentJobPayload } from "@hris/shared-types";

export function startRecruitmentWorker(): { close(): Promise<void> } {
  return createWorker<RecruitmentJobPayload>(QUEUE_NAMES.RECRUITMENT, async (job) => {
    switch (job.data.type) {
      case "send-interview-invitation": {
        console.log(
          `[Recruitment] Send interview invitation to ${job.data.candidateEmail} for ${job.data.roundLabel} at ${job.data.scheduledAt}`
        );
        break;
      }
      case "send-candidate-rejection": {
        console.log(
          `[Recruitment] Send rejection email to ${job.data.candidateEmail} for application ${job.data.applicationId}`
        );
        break;
      }
      case "sla-alert": {
        console.log(
          `[Recruitment] SLA alert for request ${job.data.requestCode} in department ${job.data.departmentName}`
        );
        await prisma.hiringRequest.update({
          where: { id: job.data.hiringRequestId },
          data: { slaAlertedAt: new Date() }
        });
        break;
      }
    }
  });
}

