import type { Department, Employee, Pagination, Queries } from "@/constants/types";

export type QueryParams = Omit<Queries, "tz" | "to" | "from" | "dept_id">;

export type PaginatedEmps = {
  employees: Employee[];
  pagination: Pagination;
};

export type PaginatedDepts = {
  departments: Department[];
  pagination: Pagination;
};
