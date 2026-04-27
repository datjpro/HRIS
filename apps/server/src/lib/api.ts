import type { ApiError, ApiSuccess } from "@hris/shared-types";

export function successResponse<TData>(data: TData): ApiSuccess<TData> {
  return {
    success: true,
    data
  };
}

export function errorResponse(code: string, message: string): ApiError {
  return {
    success: false,
    error: {
      code,
      message
    }
  };
}

