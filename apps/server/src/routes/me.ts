import { Hono } from "hono";
import type { EmployeeProfileDetail } from "@hris/shared-types";
import { successResponse } from "../lib/api";
import { checkPermission } from "../middlewares/permission";
import type { AppBindings } from "../lib/app-bindings";
import { getEmployeeProfileByUserId } from "../lib/employees";

export const meRouter = new Hono<AppBindings>();

meRouter.get("/me", checkPermission("profile.read.self"), async (context) => {
  const user = context.var.user;
  const profile = (await getEmployeeProfileByUserId(user.sub, user)) as EmployeeProfileDetail | null;

  if (!profile) {
    return context.json(
      {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "User profile not found"
        }
      },
      404
    );
  }

  return context.json(successResponse(profile));
});
