export const ROLES = ["EMPLOYEE", "MANAGER", "HR", "ADMIN"] as const;

export type Role = (typeof ROLES)[number];

export const DEFAULT_ROLE: Role = "EMPLOYEE";

