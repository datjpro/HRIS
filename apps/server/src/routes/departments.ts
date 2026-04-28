import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "@hris/db";
import { successResponse, errorResponse } from "../lib/api";
import { checkPermission } from "../middlewares/permission";
import type { AppBindings } from "../lib/app-bindings";
import { buildDepartmentTree, listDepartments } from "../lib/departments";
import { getCachedDepartmentTree, invalidateDepartmentTreeCache, setCachedDepartmentTree } from "../lib/department-cache";

export const departmentsRouter = new Hono<AppBindings>();

const departmentSchema = z.object({
  code: z.string().min(2),
  name: z.string().min(2),
  description: z.string().optional(),
  parentId: z.string().optional(),
  managerUserId: z.string().optional(),
  isActive: z.boolean().optional()
});

departmentsRouter.get("/departments", checkPermission("department.read"), async (context) => {
  const departments = await listDepartments();
  return context.json(successResponse(departments));
});

departmentsRouter.get("/departments/tree", checkPermission("department.read"), async (context) => {
  const cached = await getCachedDepartmentTree();
  if (cached) {
    return context.json(successResponse(cached));
  }

  const tree = await buildDepartmentTree();
  await setCachedDepartmentTree(tree);
  return context.json(successResponse(tree));
});

departmentsRouter.post("/departments", checkPermission("department.write"), async (context) => {
  const body = await context.req.json();
  const result = departmentSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid department payload"), 400);
  }

  const created = await prisma.department.create({
    data: {
      code: result.data.code,
      name: result.data.name,
      description: result.data.description,
      parentId: result.data.parentId,
      managerUserId: result.data.managerUserId,
      isActive: result.data.isActive ?? true
    }
  });

  await invalidateDepartmentTreeCache();

  return context.json(successResponse(created), 201);
});

departmentsRouter.put("/departments/:departmentId", checkPermission("department.write"), async (context) => {
  const departmentId = context.req.param("departmentId");
  const body = await context.req.json();
  const result = departmentSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid department payload"), 400);
  }

  const updated = await prisma.department.update({
    where: { id: departmentId },
    data: {
      code: result.data.code,
      name: result.data.name,
      description: result.data.description,
      parentId: result.data.parentId,
      managerUserId: result.data.managerUserId,
      isActive: result.data.isActive ?? true
    }
  });

  await invalidateDepartmentTreeCache();

  return context.json(successResponse(updated));
});

departmentsRouter.delete("/departments/:departmentId", checkPermission("department.write"), async (context) => {
  const departmentId = context.req.param("departmentId");

  await prisma.department.delete({ where: { id: departmentId } });
  await invalidateDepartmentTreeCache();

  return context.json(successResponse({ deleted: true }));
});

