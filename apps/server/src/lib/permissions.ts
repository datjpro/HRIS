import type { Permission, Role } from "@hris/shared-types";

const rolePermissionMap: Record<Role, Permission[]> = {
  EMPLOYEE: ["profile.read.self", "department.read", "onboarding.read"],
  MANAGER: [
    "profile.read.self",
    "profile.read.team",
    "department.read",
    "onboarding.read",
    "recruitment.request.read",
    "kpi.read",
    "learning.read",
    "idp.read"
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
    "onboarding.read",
    "onboarding.write",
    "compensation.read",
    "compensation.write",
    "kpi.read",
    "kpi.write",
    "payroll.generate",
    "payroll.export",
    "learning.read",
    "learning.write",
    "idp.read",
    "idp.write",
    "culture.enps.submit",
    "analytics.read",
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
    "onboarding.read",
    "onboarding.write",
    "compensation.read",
    "compensation.write",
    "kpi.read",
    "kpi.write",
    "payroll.generate",
    "payroll.export",
    "learning.read",
    "learning.write",
    "idp.read",
    "idp.write",
    "culture.enps.submit",
    "analytics.read",
    "admin.users.read",
    "admin.system.manage"
  ]
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissionMap[role].includes(permission);
}

