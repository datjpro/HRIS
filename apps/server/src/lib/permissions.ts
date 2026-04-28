import type { Permission, Role } from "@hris/shared-types";

const rolePermissionMap: Record<Role, Permission[]> = {
  EMPLOYEE: ["profile.read.self", "department.read"],
  MANAGER: ["profile.read.self", "profile.read.team", "department.read"],
  HR: ["profile.read.self", "profile.read.team", "profile.read.company", "department.read", "department.write", "admin.users.read"],
  ADMIN: ["profile.read.self", "profile.read.team", "profile.read.company", "department.read", "department.write", "admin.users.read", "admin.system.manage"]
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissionMap[role].includes(permission);
}

