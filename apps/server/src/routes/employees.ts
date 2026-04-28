import { Hono } from "hono";
import { errorResponse, successResponse } from "../lib/api";
import type { AppBindings } from "../lib/app-bindings";
import { checkPermission } from "../middlewares/permission";
import { getEmployeeProfileByUserId, listEmployeeDirectory } from "../lib/employees";

export const employeesRouter = new Hono<AppBindings>();

employeesRouter.get("/employees/directory", checkPermission("profile.read.self"), async (context) => {
  const directory = await listEmployeeDirectory(context.var.user);
  return context.json(successResponse(directory));
});

employeesRouter.get("/employees/:userId", checkPermission("profile.read.self"), async (context) => {
  const viewer = context.var.user;
  const targetUserId = context.req.param("userId");
  const profile = await getEmployeeProfileByUserId(targetUserId, viewer);

  if (!profile) {
    return context.json(errorResponse("NOT_FOUND", "Employee profile not found"), 404);
  }

  const isSelf = viewer.sub === targetUserId;
  const isHrOrAdmin = viewer.role === "HR" || viewer.role === "ADMIN";
  const isManagerViewingTeam = viewer.role === "MANAGER" && profile.managerId === viewer.sub;

  if (!isSelf && !isHrOrAdmin && !isManagerViewingTeam) {
    return context.json(errorResponse("FORBIDDEN", "You do not have permission to view this employee"), 403);
  }

  return context.json(successResponse(profile));
});

