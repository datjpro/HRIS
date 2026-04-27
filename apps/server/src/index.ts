import { Hono } from "hono";
import { serve } from "bun";
import { authMiddleware } from "./middlewares/auth";
import { adminRouter } from "./routes/admin";
import { healthRouter } from "./routes/health";
import { meRouter } from "./routes/me";

const app = new Hono();

app.route("/", healthRouter);

app.use("/api/v1/*", authMiddleware);
app.route("/api/v1", meRouter);
app.route("/api/v1", adminRouter);

const port = Number(process.env.API_PORT ?? 3001);

serve({
  fetch: app.fetch,
  port
});

console.log(`HRIS server listening on http://localhost:${port}`);
