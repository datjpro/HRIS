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

export type HiringRequestDTO = {
  id: string;
  requestCode: string;
  title: string;
  description?: string;
  departmentId: string;
  requesterId: string;
  hiringManagerId?: string;
  employmentType: string;
  headcount: number;
  priority: string;
  status: string;
  approvalNote?: string;
  approvedAt?: string;
  requestedAt: string;
  slaDeadlineAt: string;
};

export type HiringRequestCreateDTO = {
  title: string;
  description?: string;
  departmentId: string;
  hiringManagerId?: string;
  employmentType: string;
  headcount: number;
  priority?: string;
};

export type HiringRequestApprovalDTO = {
  status: "APPROVED" | "REJECTED";
  approvalNote?: string;
};

export type CandidateDTO = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  source?: string;
  currentCompany?: string;
  notes?: string;
  status: string;
  appliedAt: string;
};

export type CandidateCreateDTO = {
  fullName: string;
  email: string;
  phoneNumber?: string;
  source?: string;
  currentCompany?: string;
  notes?: string;
};

export type ApplicationDTO = {
  id: string;
  hiringRequestId: string;
  candidateId: string;
  status: string;
  score?: number;
  notes?: string;
};

export type ApplicationCreateDTO = {
  hiringRequestId: string;
  candidateId: string;
  notes?: string;
};

export type InterviewDTO = {
  id: string;
  applicationId: string;
  interviewerId?: string;
  roundLabel: string;
  scheduledAt: string;
  result: string;
  feedback?: string;
};

export type InterviewCreateDTO = {
  applicationId: string;
  interviewerId?: string;
  roundLabel: string;
  scheduledAt: string;
};

export type RecruitmentJobPayload =
  | {
      type: "send-interview-invitation";
      interviewId: string;
      candidateEmail: string;
      candidateName: string;
      roundLabel: string;
      scheduledAt: string;
    }
  | {
      type: "send-candidate-rejection";
      applicationId: string;
      candidateEmail: string;
      candidateName: string;
      reason?: string;
    }
  | {
      type: "sla-alert";
      hiringRequestId: string;
      requestCode: string;
      departmentName: string;
    };

export type OnboardingPlanDTO = {
  id: string;
  employeeProfileId: string;
  applicationId?: string;
  buddyUserId?: string;
  template: string;
  status: string;
  startedAt?: string;
  completedAt?: string;
};

export type OnboardingTaskDTO = {
  id: string;
  onboardingPlanId: string;
  title: string;
  description?: string;
  phaseDay: number;
  dueDate: string;
  status: string;
  completedAt?: string;
};

export type OnboardingPlanDetail = OnboardingPlanDTO & {
  tasks: OnboardingTaskDTO[];
};

export type OnboardingTriggerDTO = {
  applicationId: string;
  buddyUserId?: string;
};

export type OnboardingJobPayload = {
  employeeProfileId: string;
  applicationId?: string;
  buddyUserId?: string;
  checklistTemplate: "30-60-90";
};

export type SalaryBandDTO = {
  id: string;
  departmentId: string;
  roleLevel: string;
  minBaseSalary: number;
  maxBaseSalary: number;
  allowanceDefault: number;
  currency: string;
  isActive: boolean;
};

export type SalaryBandUpsertDTO = {
  departmentId: string;
  roleLevel: string;
  minBaseSalary: number;
  maxBaseSalary: number;
  allowanceDefault?: number;
  currency?: string;
  isActive?: boolean;
};

export type KpiMetricDTO = {
  id: string;
  departmentId: string;
  code: string;
  name: string;
  description?: string;
  weight: number;
  targetValue?: number;
  unit?: string;
  isActive: boolean;
};

export type KpiResultDTO = {
  id: string;
  employeeProfileId: string;
  metricId: string;
  period: string;
  achievedValue?: number;
  score: number;
  bonusAmount: number;
  note?: string;
};

export type PayslipDTO = {
  id: string;
  employeeProfileId: string;
  period: string;
  grossBaseSalary: number;
  kpiBonus: number;
  allowance: number;
  deduction: number;
  netSalary: number;
  currency: string;
  generatedByUserId?: string;
  generatedAt: string;
};

export type PayrollGenerateDTO = {
  period: string;
  employeeProfileId?: string;
  deduction?: number;
};

export type PayrollExportJobPayload = {
  period: string;
  requestedByUserId: string;
};

