import type { Context, Next } from "hono";
import type { Role } from "@hris/shared-types";

export function roleMiddleware(allowedRoles: Role[]) {
  return async (context: Context, next: Next) => {
    const role = context.req.header("x-user-role") as Role | undefined;

    if (!role || !allowedRoles.includes(role)) {
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
