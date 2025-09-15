import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { QueryParams } from "../types";
import { EMPLOYEE_KEYS } from "@/constants/query-keys";
import { employeeApi } from "../services/employee-api";

export const useEmployeeListQuery = (q: QueryParams) => {
  return useQuery({
    queryKey: EMPLOYEE_KEYS.employees(q),
    queryFn: () => employeeApi.getEmployeeList(q),
    placeholderData: keepPreviousData,
  });
};


