import { sign, verify } from "hono/jwt";
import type { JwtPayload, Role } from "@hris/shared-types";

const accessSecret = process.env.JWT_SECRET ?? "change-me-access-secret";
const refreshSecret = process.env.JWT_REFRESH_SECRET ?? "change-me-refresh-secret";
const accessExpiresInSeconds = Number(process.env.JWT_ACCESS_EXPIRES_IN_SECONDS ?? 900);
const refreshExpiresInSeconds = Number(process.env.JWT_REFRESH_EXPIRES_IN_SECONDS ?? 604800);

type JwtClaimsInput = {
  userId: string;
  email: string;
  role: Role;
};

export async function createAccessToken(input: JwtClaimsInput): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  return sign(
    {
      sub: input.userId,
      email: input.email,
      role: input.role,
      iat: now,
      exp: now + accessExpiresInSeconds
    },
    accessSecret
  );
}

export async function createRefreshToken(input: JwtClaimsInput): Promise<{ token: string; expiresAt: Date }> {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = new Date((now + refreshExpiresInSeconds) * 1000);

  const token = await sign(
    {
      sub: input.userId,
      email: input.email,
      role: input.role,
      iat: now,
      exp: now + refreshExpiresInSeconds
    },
    refreshSecret
  );

  return {
    token,
    expiresAt
  };
}

export async function verifyAccessToken(token: string): Promise<JwtPayload> {
  return (await verify(token, accessSecret)) as JwtPayload;
}

export async function verifyRefreshToken(token: string): Promise<JwtPayload> {
  return (await verify(token, refreshSecret)) as JwtPayload;
}

export function getAccessExpiresInSeconds(): number {
  return accessExpiresInSeconds;
}
