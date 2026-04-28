import { prisma } from "@hris/db";
import type { DepartmentDTO, DepartmentTreeNode } from "@hris/shared-types";

type FlatDepartment = DepartmentDTO;

function toDepartmentDto(item: {
  id: string;
  code: string;
  name: string;
  description: string | null;
  parentId: string | null;
  managerUserId: string | null;
  isActive: boolean;
}): DepartmentDTO {
  return {
    id: item.id,
    code: item.code,
    name: item.name,
    description: item.description ?? undefined,
    parentId: item.parentId ?? undefined,
    managerUserId: item.managerUserId ?? undefined,
    isActive: item.isActive
  };
}

export async function listDepartments(): Promise<DepartmentDTO[]> {
  const departments = await prisma.department.findMany({ orderBy: [{ name: "asc" }] });
  return departments.map(toDepartmentDto);
}

export async function buildDepartmentTree(): Promise<DepartmentTreeNode[]> {
  const departments = await listDepartments();
  const nodeMap = new Map<string, DepartmentTreeNode>();

  departments.forEach((department) => {
    nodeMap.set(department.id, {
      ...department,
      children: []
    });
  });

  const roots: DepartmentTreeNode[] = [];

  departments.forEach((department) => {
    const current = nodeMap.get(department.id)!;
    if (department.parentId) {
      const parent = nodeMap.get(department.parentId);
      if (parent) {
        parent.children.push(current);
        return;
      }
    }

    roots.push(current);
  });

  return roots;
}

