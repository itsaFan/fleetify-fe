import type z from "zod";
import type { ApiResponse } from "./../../../constants/types/api";
import type { Department, Queries } from "@/constants/types";
import type { DepartmentFormSchema } from "../services/schemas";

export type QueryParams = Omit<Queries, "tz" | "to" | "from" | "dept_id">;

export type CreateDeptResp = ApiResponse<Omit<Department, "id">>;
export type EditDeptResp = ApiResponse<Omit<Department, "id">>;
export type DeptApiData = {
  department_name: string;
  max_clock_in: string;
  max_clock_out: string;
};
export type DeptFormDataType = z.infer<typeof DepartmentFormSchema>;
