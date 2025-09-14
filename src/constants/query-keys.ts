import type { Queries } from "./types";

export const EMPLOYEE_KEYS = {
  all: ["employees"] as const,
  employees: (params: Queries) => ["employees", "list", params] as const,
  detail: (empId: string) => ["employee", empId] as const,
};

export const DEPARTMENT_KEYS = {
  all: ["departments"] as const,
  departments: (params: Queries) => ["departments", "list", params] as const,
  detail: (name: string) => ["employee", name] as const,
};

export const ATTENDANCE_KEYS = {
  all: ["attendances"] as const,
  attendances: (params: Queries) => ["attendances", "list", params] as const,
  employeeAttendances: (params: Queries) => ["attendances", "employee", params] as const,
};
