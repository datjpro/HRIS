import { Hono } from "hono";
import { successResponse } from "../lib/api";
import { checkPermission } from "../middlewares/permission";
import type { AppBindings } from "../lib/app-bindings";

export const adminRouter = new Hono<AppBindings>();

adminRouter.get("/admin/users", checkPermission("admin.users.read"), (context) => {
  return context.json(
    successResponse({
      message: "Admin-only master data endpoint"
    })
  );
});

