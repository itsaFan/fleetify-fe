import { api } from "@/configs/api-config";
import type { CreateEmpApiResp, EmployeeApiData, PaginatedEmps, QueryParams, UpdateEmpApiResp } from "../types";
import type { ApiResponseWithPagination, Employee } from "@/constants/types";

export const employeeApi = {
  async getEmployeeList(q: QueryParams): Promise<PaginatedEmps> {
    const res = await api.get<ApiResponseWithPagination<Employee[]>>(`/employee`, { params: q });

    return {
      employees: res.data.data,
      pagination: res.data.pagination,
    };
  },

  async createEmployee(data: EmployeeApiData): Promise<CreateEmpApiResp> {
    const res = await api.post<CreateEmpApiResp>("/employee", data);
    return res.data;
  },

  async editEmployee(empId: string, data: EmployeeApiData): Promise<UpdateEmpApiResp> {
    const res = await api.patch<CreateEmpApiResp>(`/employee/${empId}`, data);
    return res.data;
  },

  async deleteEmployee(empId: string): Promise<{ message: string }> {
    const res = await api.delete<{ message: string }>(`/employee/${empId}`);
    return res.data;
  },
};
