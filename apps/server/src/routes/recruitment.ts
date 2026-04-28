import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "@hris/db";
import { createQueue, QUEUE_NAMES } from "@hris/redis";
import { successResponse, errorResponse } from "../lib/api";
import type { AppBindings } from "../lib/app-bindings";
import { checkPermission } from "../middlewares/permission";
import type { RecruitmentJobPayload } from "@hris/shared-types";

export const recruitmentRouter = new Hono<AppBindings>();
const recruitmentQueue = createQueue(QUEUE_NAMES.RECRUITMENT);

const hiringRequestCreateSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  departmentId: z.string(),
  hiringManagerId: z.string().optional(),
  employmentType: z.string().min(2),
  headcount: z.number().int().min(1),
  priority: z.string().optional()
});

const approvalSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  approvalNote: z.string().optional()
});

const candidateSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  source: z.string().optional(),
  currentCompany: z.string().optional(),
  notes: z.string().optional()
});

const applicationSchema = z.object({
  hiringRequestId: z.string(),
  candidateId: z.string(),
  notes: z.string().optional()
});

const interviewSchema = z.object({
  applicationId: z.string(),
  interviewerId: z.string().optional(),
  roundLabel: z.string().min(2),
  scheduledAt: z.string().datetime()
});

const interviewResultSchema = z.object({
  result: z.enum(["PENDING", "PASS", "FAIL"]),
  feedback: z.string().optional()
});

const rejectionSchema = z.object({
  reason: z.string().optional()
});

function generateRequestCode(): string {
  return `REQ-${Date.now()}`;
}

recruitmentRouter.get("/recruitment/requests", checkPermission("recruitment.request.read"), async (context) => {
  const user = context.var.user;

  const requests = await prisma.hiringRequest.findMany({
    where:
      user.role === "HR" || user.role === "ADMIN"
        ? undefined
        : user.role === "MANAGER"
          ? { OR: [{ requesterId: user.sub }, { hiringManagerId: user.sub }] }
          : { requesterId: user.sub },
    include: {
      department: true
    },
    orderBy: [{ createdAt: "desc" }]
  });

  return context.json(
    successResponse(
      requests.map((item) => ({
        id: item.id,
        requestCode: item.requestCode,
        title: item.title,
        description: item.description ?? undefined,
        departmentId: item.departmentId,
        requesterId: item.requesterId,
        hiringManagerId: item.hiringManagerId ?? undefined,
        employmentType: item.employmentType,
        headcount: item.headcount,
        priority: item.priority,
        status: item.status,
        approvalNote: item.approvalNote ?? undefined,
        approvedAt: item.approvedAt?.toISOString(),
        requestedAt: item.requestedAt.toISOString(),
        slaDeadlineAt: item.slaDeadlineAt.toISOString()
      }))
    )
  );
});

recruitmentRouter.post("/recruitment/requests", checkPermission("recruitment.request.write"), async (context) => {
  const body = await context.req.json();
  const result = hiringRequestCreateSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid hiring request payload"), 400);
  }

  const requestedAt = new Date();
  const slaDeadlineAt = new Date(requestedAt.getTime() + 48 * 60 * 60 * 1000);

  const created = await prisma.hiringRequest.create({
    data: {
      requestCode: generateRequestCode(),
      title: result.data.title,
      description: result.data.description,
      departmentId: result.data.departmentId,
      requesterId: context.var.user.sub,
      hiringManagerId: result.data.hiringManagerId,
      employmentType: result.data.employmentType,
      headcount: result.data.headcount,
      priority: result.data.priority ?? "NORMAL",
      status: "PENDING_APPROVAL",
      requestedAt,
      slaDeadlineAt
    }
  });

  return context.json(successResponse(created), 201);
});

recruitmentRouter.post("/recruitment/requests/:requestId/approval", checkPermission("recruitment.request.approve"), async (context) => {
  const body = await context.req.json();
  const result = approvalSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid approval payload"), 400);
  }

  const updated = await prisma.hiringRequest.update({
    where: { id: context.req.param("requestId") },
    data: {
      status: result.data.status,
      approvalNote: result.data.approvalNote,
      approvedAt: result.data.status === "APPROVED" ? new Date() : null
    }
  });

  return context.json(successResponse(updated));
});

recruitmentRouter.get("/recruitment/candidates", checkPermission("recruitment.candidate.read"), async (context) => {
  const candidates = await prisma.candidate.findMany({ orderBy: [{ createdAt: "desc" }] });

  return context.json(
    successResponse(
      candidates.map((candidate) => ({
        id: candidate.id,
        fullName: candidate.fullName,
        email: candidate.email,
        phoneNumber: candidate.phoneNumber ?? undefined,
        source: candidate.source ?? undefined,
        currentCompany: candidate.currentCompany ?? undefined,
        notes: candidate.notes ?? undefined,
        status: candidate.status,
        appliedAt: candidate.appliedAt.toISOString()
      }))
    )
  );
});

recruitmentRouter.post("/recruitment/candidates", checkPermission("recruitment.candidate.write"), async (context) => {
  const body = await context.req.json();
  const result = candidateSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid candidate payload"), 400);
  }

  const created = await prisma.candidate.create({ data: result.data });
  return context.json(successResponse(created), 201);
});

recruitmentRouter.post("/recruitment/applications", checkPermission("recruitment.candidate.write"), async (context) => {
  const body = await context.req.json();
  const result = applicationSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid application payload"), 400);
  }

  const created = await prisma.application.create({
    data: {
      hiringRequestId: result.data.hiringRequestId,
      candidateId: result.data.candidateId,
      notes: result.data.notes,
      status: "APPLIED"
    }
  });

  return context.json(successResponse(created), 201);
});

recruitmentRouter.get("/recruitment/applications", checkPermission("recruitment.candidate.read"), async (context) => {
  const requestId = context.req.query("requestId");

  const applications = await prisma.application.findMany({
    where: requestId ? { hiringRequestId: requestId } : undefined,
    include: {
      candidate: true,
      hiringRequest: true
    },
    orderBy: [{ createdAt: "desc" }]
  });

  return context.json(
    successResponse(
      applications.map((item) => ({
        id: item.id,
        hiringRequestId: item.hiringRequestId,
        candidateId: item.candidateId,
        status: item.status,
        score: item.score ?? undefined,
        notes: item.notes ?? undefined,
        candidateName: item.candidate.fullName,
        requestCode: item.hiringRequest.requestCode
      }))
    )
  );
});

recruitmentRouter.post("/recruitment/interviews", checkPermission("recruitment.interview.write"), async (context) => {
  const body = await context.req.json();
  const result = interviewSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid interview payload"), 400);
  }

  const application = await prisma.application.findUnique({
    where: { id: result.data.applicationId },
    include: { candidate: true }
  });

  if (!application) {
    return context.json(errorResponse("NOT_FOUND", "Application not found"), 404);
  }

  const interview = await prisma.interview.create({
    data: {
      applicationId: result.data.applicationId,
      interviewerId: result.data.interviewerId,
      roundLabel: result.data.roundLabel,
      scheduledAt: new Date(result.data.scheduledAt)
    }
  });

  await prisma.application.update({
    where: { id: result.data.applicationId },
    data: { status: "INTERVIEWING" }
  });

  const payload: RecruitmentJobPayload = {
    type: "send-interview-invitation",
    interviewId: interview.id,
    candidateEmail: application.candidate.email,
    candidateName: application.candidate.fullName,
    roundLabel: interview.roundLabel,
    scheduledAt: interview.scheduledAt.toISOString()
  };

  await recruitmentQueue.add("send-interview-invitation", payload);

  return context.json(successResponse({ interviewId: interview.id, queued: true }), 202);
});

recruitmentRouter.get("/recruitment/interviews", checkPermission("recruitment.candidate.read"), async (context) => {
  const applicationId = context.req.query("applicationId");

  const interviews = await prisma.interview.findMany({
    where: applicationId ? { applicationId } : undefined,
    include: {
      application: {
        include: {
          candidate: true
        }
      }
    },
    orderBy: [{ scheduledAt: "asc" }]
  });

  return context.json(
    successResponse(
      interviews.map((item) => ({
        id: item.id,
        applicationId: item.applicationId,
        interviewerId: item.interviewerId ?? undefined,
        roundLabel: item.roundLabel,
        scheduledAt: item.scheduledAt.toISOString(),
        result: item.result,
        feedback: item.feedback ?? undefined,
        candidateName: item.application.candidate.fullName
      }))
    )
  );
});

recruitmentRouter.patch("/recruitment/interviews/:interviewId/result", checkPermission("recruitment.interview.write"), async (context) => {
  const body = await context.req.json();
  const result = interviewResultSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid interview result payload"), 400);
  }

  const interview = await prisma.interview.update({
    where: { id: context.req.param("interviewId") },
    data: {
      result: result.data.result,
      feedback: result.data.feedback
    },
    include: {
      application: true
    }
  });

  if (result.data.result === "PASS") {
    await prisma.application.update({
      where: { id: interview.applicationId },
      data: { status: "OFFERED" }
    });
  }

  if (result.data.result === "FAIL") {
    await prisma.application.update({
      where: { id: interview.applicationId },
      data: { status: "REJECTED" }
    });
  }

  return context.json(successResponse({ updated: true }));
});

recruitmentRouter.post("/recruitment/applications/:applicationId/reject", checkPermission("recruitment.candidate.write"), async (context) => {
  const body = await context.req.json();
  const result = rejectionSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid rejection payload"), 400);
  }

  const application = await prisma.application.findUnique({
    where: { id: context.req.param("applicationId") },
    include: { candidate: true }
  });

  if (!application) {
    return context.json(errorResponse("NOT_FOUND", "Application not found"), 404);
  }

  await prisma.application.update({
    where: { id: application.id },
    data: { status: "REJECTED", notes: result.data.reason ?? application.notes }
  });

  const payload: RecruitmentJobPayload = {
    type: "send-candidate-rejection",
    applicationId: application.id,
    candidateEmail: application.candidate.email,
    candidateName: application.candidate.fullName,
    reason: result.data.reason
  };

  await recruitmentQueue.add("send-candidate-rejection", payload);

  return context.json(successResponse({ applicationId: application.id, queued: true }), 202);
});
