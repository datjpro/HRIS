export const PERMISSIONS = [
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
  "admin.users.read",
  "admin.system.manage"
] as const;

export type Permission = (typeof PERMISSIONS)[number];

