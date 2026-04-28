import { redis } from "@hris/redis";
import type { SalaryBandDTO } from "@hris/shared-types";

const CACHE_PREFIX = "hris:salary-band:";
const TTL_SECONDS = 300;

export async function getCachedSalaryBands(departmentId: string): Promise<SalaryBandDTO[] | null> {
  const raw = await redis.get(`${CACHE_PREFIX}${departmentId}`);
  return raw ? (JSON.parse(raw) as SalaryBandDTO[]) : null;
}

export async function setCachedSalaryBands(departmentId: string, bands: SalaryBandDTO[]): Promise<void> {
  await redis.set(`${CACHE_PREFIX}${departmentId}`, JSON.stringify(bands), "EX", TTL_SECONDS);
}

export async function invalidateSalaryBandCache(departmentId: string): Promise<void> {
  await redis.del(`${CACHE_PREFIX}${departmentId}`);
}

