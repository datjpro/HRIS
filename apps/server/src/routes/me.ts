import { Hono } from "hono";
import type { EmployeeProfile, Role } from "@hris/shared-types";
import { successResponse } from "../lib/api";
import { roleMiddleware } from "../middlewares/role";

export const meRouter = new Hono();

meRouter.get("/me", roleMiddleware(["EMPLOYEE", "MANAGER", "HR", "ADMIN"]), (context) => {
  const userId = context.req.header("x-user-id") ?? "employee-demo";
  const role = (context.req.header("x-user-role") ?? "EMPLOYEE") as Role;

  const profile: EmployeeProfile = {
    id: userId,
    fullName: "Demo Employee",
    email: "employee@company.com",
    role,
    departmentName: role === "HR" ? "Human Resources" : "General",
    managerId: role === "EMPLOYEE" ? "manager-demo" : undefined
  };

  return context.json(successResponse(profile));
});
