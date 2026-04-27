import type { Context, Next } from "hono";
import type { Role } from "@hris/shared-types";
import { ROLES } from "@hris/shared-types";

export async function authMiddleware(context: Context, next: Next) {
  const userId = context.req.header("x-user-id");
  const roleHeader = context.req.header("x-user-role");

  if (!userId || !roleHeader || !ROLES.includes(roleHeader as Role)) {
    return context.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Missing or invalid authentication headers"
        }
      },
      401
    );
  }

  await next();
}
