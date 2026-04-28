import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "@hris/db";
import { createAccessToken, createRefreshToken, getAccessExpiresInSeconds, verifyRefreshToken } from "../lib/jwt";
import { successResponse, errorResponse } from "../lib/api";
import type { Role } from "@hris/shared-types";

export const authRouter = new Hono();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  department: z.string(),
  role: z.enum(["EMPLOYEE", "MANAGER", "HR", "ADMIN"])
});

authRouter.post("/register", async (context) => {
  const body = await context.req.json();
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid registration data"), 400);
  }

  const existing = await prisma.user.findUnique({ where: { email: result.data.email } });
  if (existing) {
    return context.json(errorResponse("USER_EXISTS", "Email already registered"), 400);
  }

  const passwordHash = await Bun.password.hash(result.data.password);

  const user = await prisma.user.create({
    data: {
      email: result.data.email,
      fullName: result.data.fullName,
      department: result.data.department,
      role: result.data.role,
      accounts: {
        create: {
          password: passwordHash
        }
      }
    }
  });

  return context.json(successResponse({ id: user.id, email: user.email }));
});

authRouter.post("/login", async (context) => {
  const body = await context.req.json();
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return context.json(errorResponse("INVALID_INPUT", "Invalid email or password"), 400);
  }

  const user = await prisma.user.findUnique({
    where: { email: result.data.email },
    include: { accounts: { where: { provider: "credentials" } } }
  });

  const account = user?.accounts[0];
  if (!user || !account?.password) {
    return context.json(errorResponse("UNAUTHORIZED", "Invalid credentials"), 401);
  }

  const isPasswordValid = await Bun.password.verify(result.data.password, account.password);
  if (!isPasswordValid) {
    return context.json(errorResponse("UNAUTHORIZED", "Invalid credentials"), 401);
  }

  const claims = { userId: user.id, email: user.email, role: user.role as Role };
  const accessToken = await createAccessToken(claims);
  const { token: refreshToken, expiresAt } = await createRefreshToken(claims);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt
    }
  });

  return context.json(
    successResponse({
      accessToken,
      refreshToken,
      expiresIn: getAccessExpiresInSeconds()
    })
  );
});

authRouter.post("/refresh", async (context) => {
  const { refreshToken } = await context.req.json();
  if (!refreshToken) {
    return context.json(errorResponse("INVALID_TOKEN", "Refresh token is required"), 400);
  }

  try {
    const payload = await verifyRefreshToken(refreshToken);

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }
    });

    if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
      return context.json(errorResponse("UNAUTHORIZED", "Invalid or expired refresh token"), 401);
    }

    const user = storedToken.user;
    const claims = { userId: user.id, email: user.email, role: user.role as Role };
    const accessToken = await createAccessToken(claims);

    return context.json(
      successResponse({
        accessToken,
        expiresIn: getAccessExpiresInSeconds()
      })
    );
  } catch {
    return context.json(errorResponse("UNAUTHORIZED", "Invalid or expired refresh token"), 401);
  }
});
