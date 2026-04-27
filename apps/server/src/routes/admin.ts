import { Hono } from "hono";
import { successResponse } from "../lib/api";
import { roleMiddleware } from "../middlewares/role";

export const adminRouter = new Hono();

adminRouter.get("/admin/users", roleMiddleware(["ADMIN"]), (context) => {
  return context.json(
    successResponse({
      message: "Admin-only master data endpoint"
    })
  );
});

