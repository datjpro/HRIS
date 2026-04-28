import type { Permission, Role } from "@hris/shared-types";

const rolePermissionMap: Record<Role, Permission[]> = {
  EMPLOYEE: ["profile.read.self"],
  MANAGER: ["profile.read.self", "profile.read.team"],
  HR: ["profile.read.self", "profile.read.team", "profile.read.company", "admin.users.read"],
  ADMIN: ["profile.read.self", "profile.read.team", "profile.read.company", "admin.users.read", "admin.system.manage"]
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissionMap[role].includes(permission);
}

