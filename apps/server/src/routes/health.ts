import { Hono } from "hono";
import { successResponse } from "../lib/api";

export const healthRouter = new Hono();

healthRouter.get("/health", (context) => {
  return context.json(
    successResponse({
      service: "hris-server",
      status: "ok"
    })
  );
});

