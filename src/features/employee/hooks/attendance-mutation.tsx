import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { attendanceApi } from "../services/attendance-api";
import { isAxiosError } from "@/configs/api-config";
import { ATTENDANCE_KEYS } from "@/constants/query-keys";

export const useEmployeAttendanceActionMutation = () => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (formData: { empId: string; action: "in" | "out" }) => {
      if (formData.action === "in") {
        return attendanceApi.createAttendance(formData.empId);
      }

      return attendanceApi.updateAttendance(formData.empId);
    },

    onSuccess: (data) => {
      // your API type is AttendanceActionApiResp, adjust path if needed
      const msg = (data as any)?.message || "Attendance recorded";
      setSuccessMessage(msg);
      setErrorMessage(null);
    },

    onError: (error) => {
      let msg = "Failed to process attendance";

      if (isAxiosError(error)) {
        const resErrorMsg = error.response?.data?.message || "";
        console.log("res", resErrorMsg);

        if (resErrorMsg.startsWith("not found: no open attendance")) {
          msg = "You don't have a check-in attendance";
        } else if (resErrorMsg.startsWith("already exists: already clocked in")) {
          msg = "You already checked in today";
        } else {
          msg = "Failed to process attendance";
        }
      }
      setErrorMessage(msg);
      setSuccessMessage(null);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ATTENDANCE_KEYS.all,
      });
    },
  });

  return {
    ...mutation,
    errorMessage,
    successMessage,
    clearError: () => setErrorMessage(null),
    clearSuccess: () => setSuccessMessage(null),
  };
};
