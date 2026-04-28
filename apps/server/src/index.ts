import { Hono } from "hono";
import { serve } from "bun";
import type { AppBindings } from "./lib/app-bindings";
import { authMiddleware } from "./middlewares/auth";
import { adminRouter } from "./routes/admin";
import { authRouter } from "./routes/auth";
import { cbKpiRouter } from "./routes/cb-kpi";
import { departmentsRouter } from "./routes/departments";
import { employeesRouter } from "./routes/employees";
import { healthRouter } from "./routes/health";
import { meRouter } from "./routes/me";
import { onboardingRouter } from "./routes/onboarding";
import { recruitmentRouter } from "./routes/recruitment";

const app = new Hono<AppBindings>();

app.route("/", healthRouter);
app.route("/api/v1/auth", authRouter);

app.use("/api/v1/*", authMiddleware);
app.route("/api/v1", cbKpiRouter);
app.route("/api/v1", departmentsRouter);
app.route("/api/v1", employeesRouter);
app.route("/api/v1", onboardingRouter);
app.route("/api/v1", recruitmentRouter);
app.route("/api/v1", meRouter);
app.route("/api/v1", adminRouter);

const port = Number(process.env.API_PORT ?? 3001);

serve({
  fetch: app.fetch,
  port
});

console.log(`HRIS server listening on http://localhost:${port}`);
