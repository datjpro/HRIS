import type { MiddlewareHandler } from "hono";
import { verifyAccessToken } from "../lib/jwt";
import type { AppBindings } from "../lib/app-bindings";

export const authMiddleware: MiddlewareHandler<AppBindings> = async (context, next) => {
  const authorizationHeader = context.req.header("authorization");
  const token = authorizationHeader?.startsWith("Bearer ") ? authorizationHeader.slice(7) : undefined;

  if (!token) {
    return context.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Missing bearer token"
        }
      },
      401
    );
  }

  try {
    const payload = await verifyAccessToken(token);
    context.set("user", payload);
    await next();
  } catch {
    return context.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Invalid or expired access token"
        }
      },
      401
    );
  }
};
