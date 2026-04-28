export const PERMISSIONS = [
  "profile.read.self",
  "profile.read.team",
  "profile.read.company",
  "department.read",
  "department.write",
  "admin.users.read",
  "admin.system.manage"
] as const;

export type Permission = (typeof PERMISSIONS)[number];

