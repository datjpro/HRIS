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

