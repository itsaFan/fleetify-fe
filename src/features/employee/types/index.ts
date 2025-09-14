import type { Employee, Pagination, Queries } from "@/constants/types";

export type QueryParams = Omit<Queries, "tz" | "to" | "from" | "dept_id">;

export type PaginatedEmps = {
  employees: Employee[];
  pagination: Pagination;
};
