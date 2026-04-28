import { redis } from "@hris/redis";

type RateLimitConfig = {
  key: string;
  limit: number;
  windowSeconds: number;
};

export async function checkRateLimit(config: RateLimitConfig): Promise<{ allowed: boolean; remaining: number }> {
  const current = await redis.incr(config.key);

  if (current === 1) {
    await redis.expire(config.key, config.windowSeconds);
  }

  return {
    allowed: current <= config.limit,
    remaining: Math.max(config.limit - current, 0)
  };
}

