import { Hono } from "hono";
import type { EmployeeProfile } from "@hris/shared-types";
import { successResponse } from "../lib/api";
import { checkPermission } from "../middlewares/permission";
import type { AppBindings } from "../lib/app-bindings";
import { prisma } from "@hris/db";

export const meRouter = new Hono<AppBindings>();

meRouter.get("/me", checkPermission("profile.read.self"), async (context) => {
  const user = context.var.user;
  const dbUser = await prisma.user.findUnique({ where: { id: user.sub } });

  if (!dbUser) {
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

  const profile: EmployeeProfile = {
    id: dbUser.id,
    fullName: dbUser.fullName,
    email: dbUser.email,
    role: user.role,
    departmentName: dbUser.department,
    managerId: dbUser.managerId ?? undefined,
    baseSalary: user.role === "HR" || user.role === "ADMIN" ? dbUser.baseSalary ?? undefined : undefined
  };

  return context.json(successResponse(profile));
});
