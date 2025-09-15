import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { QueryParams } from "../types";
import { DEPARTMENT_KEYS } from "@/constants/query-keys";
import { departmentApi } from "../services/department-api";

export const useDepartmentListQuery = (q: QueryParams) => {
  return useQuery({
    queryKey: DEPARTMENT_KEYS.departments(q),
    queryFn: () => departmentApi.getDepartmentList(q),
    placeholderData: keepPreviousData,
  });
};
