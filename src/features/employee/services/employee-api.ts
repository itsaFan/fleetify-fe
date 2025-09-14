import { api } from "@/configs/api-config";
import type { PaginatedEmps, QueryParams } from "../types";
import type { ApiResponseWithPagination, Employee } from "@/constants/types";

export const employeeApi = {
  async getEmployeeList(q: QueryParams): Promise<PaginatedEmps> {
    const res = await api.get<ApiResponseWithPagination<Employee[]>>(`/employee`, { params: q });

    return {
      employees: res.data.data,
      pagination: res.data.pagination,
    };
  },
};
