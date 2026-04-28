import type { MiddlewareHandler } from "hono";

export const requestAuditMiddleware: MiddlewareHandler = async (context, next) => {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  context.header("x-request-id", requestId);

  await next();

  const elapsedMs = Date.now() - startTime;
  const authHeader = context.req.header("authorization");
  const actor = authHeader ? "authenticated-or-tokened" : "anonymous";

  console.log(
    JSON.stringify({
      requestId,
      method: context.req.method,
      path: context.req.path,
      status: context.res.status,
      elapsedMs,
      actor,
      timestamp: new Date().toISOString()
    })
  );
};

