import type { Role } from "./roles";

export type ApiSuccess<TData> = {
  success: true;
  data: TData;
  meta?: Record<string, string | number | boolean>;
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string | number | boolean>;
  };
};

export type ApiResponse<TData> = ApiSuccess<TData> | ApiError;

export type RequestUser = {
  id: string;
  role: Role;
};

export type EmployeeProfile = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  departmentName: string;
  managerId?: string;
  baseSalary?: number;
};

export type AuthTokenResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type JWTSchema = AuthTokenResponse;

export type LoginDTO = {
  email: string;
  password?: string; // Optional if using external auth
};

export type RegisterDTO = {
  email: string;
  fullName: string;
  department: string;
  role: Role;
  password?: string;
};

export type JwtPayload = {
  sub: string; // userId
  email: string;
  role: Role;
  iat: number;
  exp: number;
};

export type AuthPayload = JwtPayload;

export type DepartmentDTO = {
  id: string;
  code: string;
  name: string;
  description?: string;
  parentId?: string;
  managerUserId?: string;
  isActive: boolean;
};

export type DepartmentTreeNode = DepartmentDTO & {
  children: DepartmentTreeNode[];
};

export type DepartmentUpsertDTO = {
  code: string;
  name: string;
  description?: string;
  parentId?: string;
  managerUserId?: string;
  isActive?: boolean;
};

export type EmployeeDirectoryEntry = {
  id: string;
  employeeCode: string;
  fullName: string;
  email: string;
  role: Role;
  departmentId: string;
  departmentName: string;
  jobTitle: string;
  managerId?: string;
  employmentStatus: string;
  baseSalary?: number;
};

export type ContractSummary = {
  id: string;
  contractType: string;
  startDate: string;
  endDate?: string;
  baseSalary?: number;
  salaryCurrency: string;
  payrollCycle: string;
  status: string;
};

export type EmployeeProfileDetail = EmployeeDirectoryEntry & {
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  contracts: ContractSummary[];
};

