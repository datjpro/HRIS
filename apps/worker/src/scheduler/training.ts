import { prisma } from "@hris/db";

export function startTrainingCommitmentScheduler() {
  const interval = setInterval(async () => {
    const violations = await prisma.trainingEnrollment.findMany({
      where: {
        status: "COMPLETED",
        commitmentEndDate: { gt: new Date() },
        violationFlaggedAt: null,
        employeeProfile: {
          employmentStatus: "TERMINATED",
          terminationDate: { not: null }
        }
      },
      include: {
        employeeProfile: {
          include: {
            user: true
          }
        },
        trainingCourse: true
      }
    });

    for (const violation of violations) {
      await prisma.trainingEnrollment.update({
        where: { id: violation.id },
        data: { violationFlaggedAt: new Date() }
      });

      console.log(
        `[Training] Commitment violation flagged for ${violation.employeeProfile.user.fullName} on course ${violation.trainingCourse.title}`
      );
    }
  }, 60_000);

  return () => clearInterval(interval);
}

