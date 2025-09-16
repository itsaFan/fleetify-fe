import { api } from "@/configs/api-config";
import type { CreateDeptResp, DeptApiData, EditDeptResp } from "../types";

export const departmentApi = {
  async createDepartment(data: DeptApiData): Promise<CreateDeptResp> {
    const res = await api.post<CreateDeptResp>("/departments", data);
    return res.data;
  },

  async editDepartment(name: string, data: DeptApiData): Promise<EditDeptResp> {
    const res = await api.patch<EditDeptResp>(`/departments/${name}`, data);
    return res.data;
  },

  async deleteDepartment(name: string): Promise<{ message: string }> {
    const res = await api.delete<{ message: string }>(`/departments/${name}`);
    return res.data;
  },
};
