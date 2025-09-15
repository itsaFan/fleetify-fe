import { api } from "@/configs/api-config";
import type { PaginatedDepts, QueryParams } from "../types";
import type { ApiResponseWithPagination, Department } from "@/constants/types";

export const departmentApi = {
  async getDepartmentList(q: QueryParams): Promise<PaginatedDepts> {
    const res = await api.get<ApiResponseWithPagination<Department[]>>("/departments", { params: q });

    return {
      departments: res.data.data,
      pagination: res.data.pagination,
    };
  },
};
