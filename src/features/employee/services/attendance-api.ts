import { api } from "@/configs/api-config";
import type { AttendanceActionApiResp } from "../types";

export const attendanceApi = {
  async createAttendance(empId: string): Promise<AttendanceActionApiResp> {
    const res = await api.post<AttendanceActionApiResp>(`/attendance/${empId}`);
    return res.data;
  },

  async updateAttendance(empId: string): Promise<AttendanceActionApiResp> {
    const res = await api.put<AttendanceActionApiResp>(`/attendance/${empId}`);
    return res.data;
  },
};
