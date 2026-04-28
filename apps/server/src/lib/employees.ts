import { prisma } from "@hris/db";
import type { EmployeeDirectoryEntry, EmployeeProfileDetail, JwtPayload } from "@hris/shared-types";

type DirectoryRow = {
  id: string;
  employeeProfile: {
    employeeCode: string;
    jobTitle: string;
    employmentStatus: string;
    department: {
      id: string;
      name: string;
    };
    contracts: Array<{
      id: string;
      contractType: string;
      startDate: Date;
      endDate: Date | null;
      baseSalary: number;
      salaryCurrency: string;
      payrollCycle: string;
      status: string;
    }>;
    dateOfBirth: Date | null;
    phoneNumber: string | null;
    address: string | null;
    emergencyContactName: string | null;
    emergencyContactPhone: string | null;
  } | null;
  fullName: string;
  email: string;
  role: string;
  managerId: string | null;
};

function canViewSalary(viewerRole: JwtPayload["role"]): boolean {
  return viewerRole === "HR" || viewerRole === "ADMIN";
}

function toDirectoryEntry(row: DirectoryRow, viewerRole: JwtPayload["role"]): EmployeeDirectoryEntry | null {
  if (!row.employeeProfile) {
    return null;
  }

  const activeContract = row.employeeProfile.contracts.find((contract) => contract.status === "ACTIVE");

  return {
    id: row.id,
    employeeCode: row.employeeProfile.employeeCode,
    fullName: row.fullName,
    email: row.email,
    role: row.role as JwtPayload["role"],
    departmentId: row.employeeProfile.department.id,
    departmentName: row.employeeProfile.department.name,
    jobTitle: row.employeeProfile.jobTitle,
    managerId: row.managerId ?? undefined,
    employmentStatus: row.employeeProfile.employmentStatus,
    baseSalary: canViewSalary(viewerRole) ? activeContract?.baseSalary : undefined
  };
}

function toProfileDetail(row: DirectoryRow, viewerRole: JwtPayload["role"]): EmployeeProfileDetail | null {
  const directoryEntry = toDirectoryEntry(row, viewerRole);

  if (!directoryEntry || !row.employeeProfile) {
    return null;
  }

  return {
    ...directoryEntry,
    dateOfBirth: row.employeeProfile.dateOfBirth?.toISOString(),
    phoneNumber: row.employeeProfile.phoneNumber ?? undefined,
    address: row.employeeProfile.address ?? undefined,
    emergencyContactName: row.employeeProfile.emergencyContactName ?? undefined,
    emergencyContactPhone: row.employeeProfile.emergencyContactPhone ?? undefined,
    contracts: row.employeeProfile.contracts.map((contract) => ({
      id: contract.id,
      contractType: contract.contractType,
      startDate: contract.startDate.toISOString(),
      endDate: contract.endDate?.toISOString(),
      baseSalary: canViewSalary(viewerRole) ? contract.baseSalary : undefined,
      salaryCurrency: contract.salaryCurrency,
      payrollCycle: contract.payrollCycle,
      status: contract.status
    }))
  };
}

type DirectoryWhere = {
  id?: string;
  managerId?: string;
  OR?: Array<{ id?: string; managerId?: string }>;
  employeeProfile?: { isNot: null };
};

async function getUserRows(where: DirectoryWhere): Promise<DirectoryRow[]> {
  return prisma.user.findMany({
    where,
    include: {
      employeeProfile: {
        include: {
          department: true,
          contracts: {
            orderBy: [{ startDate: "desc" }]
          }
        }
      }
    },
    orderBy: [{ fullName: "asc" }]
  }) as Promise<DirectoryRow[]>;
}

export async function listEmployeeDirectory(viewer: JwtPayload): Promise<EmployeeDirectoryEntry[]> {
  let rows: DirectoryRow[] = [];

  if (viewer.role === "HR" || viewer.role === "ADMIN") {
    rows = await getUserRows({ employeeProfile: { isNot: null } });
  } else if (viewer.role === "MANAGER") {
    rows = await getUserRows({
      OR: [{ id: viewer.sub }, { managerId: viewer.sub }],
      employeeProfile: { isNot: null }
    });
  } else {
    rows = await getUserRows({ id: viewer.sub, employeeProfile: { isNot: null } });
  }

  return rows.map((row) => toDirectoryEntry(row, viewer.role)).filter((item): item is EmployeeDirectoryEntry => item !== null);
}

export async function getEmployeeProfileByUserId(targetUserId: string, viewer: JwtPayload): Promise<EmployeeProfileDetail | null> {
  const row = (await prisma.user.findUnique({
    where: { id: targetUserId },
    include: {
      employeeProfile: {
        include: {
          department: true,
          contracts: {
            orderBy: [{ startDate: "desc" }]
          }
        }
      }
    }
  })) as DirectoryRow | null;

  if (!row) {
    return null;
  }

  return toProfileDetail(row, viewer.role);
}
