import type { Permission, Role } from "@hris/shared-types";

const rolePermissionMap: Record<Role, Permission[]> = {
  EMPLOYEE: ["profile.read.self", "department.read"],
  MANAGER: [
    "profile.read.self",
    "profile.read.team",
    "department.read",
    "recruitment.request.read"
  ],
  HR: [
    "profile.read.self",
    "profile.read.team",
    "profile.read.company",
    "department.read",
    "department.write",
    "recruitment.request.read",
    "recruitment.request.write",
    "recruitment.request.approve",
    "recruitment.candidate.read",
    "recruitment.candidate.write",
    "recruitment.interview.write",
    "admin.users.read"
  ],
  ADMIN: [
    "profile.read.self",
    "profile.read.team",
    "profile.read.company",
    "department.read",
    "department.write",
    "recruitment.request.read",
    "recruitment.request.write",
    "recruitment.request.approve",
    "recruitment.candidate.read",
    "recruitment.candidate.write",
    "recruitment.interview.write",
    "admin.users.read",
    "admin.system.manage"
  ]
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissionMap[role].includes(permission);
}

