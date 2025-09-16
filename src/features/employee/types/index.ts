import type { ApiResponse, Department, Employee, Pagination, Queries } from "@/constants/types";
import type z from "zod";
import type { EmployeeFormSchema } from "../services/schemas";

export type QueryParams = Omit<Queries, "tz" | "to" | "from" | "dept_id">;

export type PaginatedEmps = {
  employees: Employee[];
  pagination: Pagination;
};

export type PaginatedDepts = {
  departments: Department[];
  pagination: Pagination;
};

export type EmployeeApiData = {
  name: string;
  address: string;
  department: number;
};

export type EmployeeFormDataType = z.infer<typeof EmployeeFormSchema>;
export type CreateEmpApiResp = ApiResponse<Employee>;
export type UpdateEmpApiResp = ApiResponse<Employee>;

export type AttendanceActionApiResp = ApiResponse<{
  attendance_id: string;
  employee_id: string;
  clock_in: string;
  clock_out?: string;
}>;
