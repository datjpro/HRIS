import type { MiddlewareHandler } from "hono";
import { checkRateLimit } from "../lib/rate-limit";

const rateLimitWindowSeconds = Number(process.env.RATE_LIMIT_WINDOW_SECONDS ?? 60);
const authMax = Number(process.env.RATE_LIMIT_AUTH_MAX ?? 10);
const reportMax = Number(process.env.RATE_LIMIT_REPORT_MAX ?? 5);

export function authRateLimitMiddleware(): MiddlewareHandler {
  return async (context, next) => {
    const clientKey = context.req.header("x-forwarded-for") ?? context.req.header("x-real-ip") ?? "local";
    const result = await checkRateLimit({
      key: `rl:auth:${clientKey}`,
      limit: authMax,
      windowSeconds: rateLimitWindowSeconds
    });

    if (!result.allowed) {
      return context.json(
        {
          success: false,
          error: {
            code: "RATE_LIMITED",
            message: "Too many authentication requests"
          }
        },
        429
      );
    }

    await next();
  };
}

export function reportRateLimitMiddleware(): MiddlewareHandler {
  return async (context, next) => {
    const actorKey = context.req.header("authorization") ?? context.req.header("x-forwarded-for") ?? "local";
    const result = await checkRateLimit({
      key: `rl:report:${actorKey}`,
      limit: reportMax,
      windowSeconds: rateLimitWindowSeconds
    });

    if (!result.allowed) {
      return context.json(
        {
          success: false,
          error: {
            code: "RATE_LIMITED",
            message: "Too many payroll export requests"
          }
        },
        429
      );
    }

    await next();
  };
}

