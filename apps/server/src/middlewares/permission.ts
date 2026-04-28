import type { MiddlewareHandler } from "hono";
import type { Permission } from "@hris/shared-types";
import type { AppBindings } from "../lib/app-bindings";
import { hasPermission } from "../lib/permissions";

export function checkPermission(permission: Permission): MiddlewareHandler<AppBindings> {
  return async (context, next) => {
    const user = context.var.user;

    if (!hasPermission(user.role, permission)) {
      return context.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "You do not have permission to access this resource"
          }
        },
        403
      );
    }

    await next();
  };
}

