import { redis } from "@hris/redis";
import type { DepartmentTreeNode } from "@hris/shared-types";

const DEPARTMENT_TREE_CACHE_KEY = "hris:org:department-tree";
const DEPARTMENT_TREE_TTL_SECONDS = 300;

export async function getCachedDepartmentTree(): Promise<DepartmentTreeNode[] | null> {
  const cached = await redis.get(DEPARTMENT_TREE_CACHE_KEY);
  return cached ? (JSON.parse(cached) as DepartmentTreeNode[]) : null;
}

export async function setCachedDepartmentTree(tree: DepartmentTreeNode[]): Promise<void> {
  await redis.set(DEPARTMENT_TREE_CACHE_KEY, JSON.stringify(tree), "EX", DEPARTMENT_TREE_TTL_SECONDS);
}

export async function invalidateDepartmentTreeCache(): Promise<void> {
  await redis.del(DEPARTMENT_TREE_CACHE_KEY);
}

