"use server";

import type { ApiResponse, EmployeeProfile } from "@hris/shared-types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export async function getMyProfile(): Promise<ApiResponse<EmployeeProfile>> {
  const response = await fetch(`${apiBaseUrl}/api/v1/me`, {
    headers: {
      "x-user-id": "employee-demo",
      "x-user-role": "EMPLOYEE"
    },
    cache: "no-store"
  });

  return (await response.json()) as ApiResponse<EmployeeProfile>;
}

