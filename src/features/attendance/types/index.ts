import type { Attendance, Pagination, Queries } from "@/constants/types";

export type AtdQueryParams = Omit<Queries, "sortBy" | "sortDir" | "search">;
export type AtdRespData = {
  from: string;
  to: string;
  tz_used_for_rules: string;
  tz_used_for_display: string;
  attendances: Attendance[];
};

export type PaginatedAtdHistory = {
  attendances: Attendance[];
  pagination: Pagination;
};
