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

