import { api } from "@/configs/api-config";
import type { AtdQueryParams, AtdRespData, PaginatedAtdHistory } from "../types";
import type { ApiResponseWithPagination } from "@/constants/types";

export const atdApi = {
  async getAttendanceList(q: AtdQueryParams): Promise<PaginatedAtdHistory> {
    const res = await api.get<ApiResponseWithPagination<AtdRespData>>("/attendance/histories", { params: q });

    return {
      attendances: res.data.data.attendances,
      pagination: res.data.pagination,
    };
  },
};
