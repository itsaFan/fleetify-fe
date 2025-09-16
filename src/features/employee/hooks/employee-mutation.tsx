import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmployeeFormDataType } from "../types";
import { employeeApi } from "../services/employee-api";
import { toast } from "sonner";
import { BadgeCheck } from "lucide-react";
import { isAxiosError } from "@/configs/api-config";
import { EMPLOYEE_KEYS } from "@/constants/query-keys";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: EmployeeFormDataType) => {
      const apiData = {
        name: formData.name.trim(),
        address: formData.address.trim(),
        department: Number(formData.department),
      };

      return employeeApi.createEmployee(apiData);
    },

    onSuccess: async () => {
      toast(`Success`, {
        description: "You have successfully create an employee",
        duration: 2500,
        icon: <BadgeCheck size={21} className="mr-2 text-app-green" />,
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Create employee failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
      } else {
        const message = "Create employee failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
        console.error("Create employee failed:", error);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: EMPLOYEE_KEYS.all,
      });
    },
  });

  return { ...mutation };
};

export const useUpdateEmployee = (empId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: EmployeeFormDataType) => {
      const apiData = {
        name: formData.name.trim(),
        address: formData.address.trim(),
        department: Number(formData.department),
      };

      return employeeApi.editEmployee(empId, apiData);
    },

    onSuccess: async () => {
      toast(`Success`, {
        description: "You have successfully update an employee",
        duration: 2500,
        icon: <BadgeCheck size={21} className="mr-2 text-app-green" />,
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Update employee failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
      } else {
        const message = "Update employee failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
        console.error("Update employee failed:", error);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: EMPLOYEE_KEYS.all,
      });
    },
  });

  return { ...mutation };
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (empId: string) => {
      return employeeApi.deleteEmployee(empId);
    },

    onSuccess: async () => {
      toast(`Success`, {
        description: "You have successfully delete an employee",
        duration: 2500,
        icon: <BadgeCheck size={21} className="mr-2 text-app-green" />,
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Delete employee failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
      } else {
        const message = "Delete employee failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
        console.error("Delete employee failed:", error);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: EMPLOYEE_KEYS.all,
      });
    },
  });

  return { ...mutation };
};
