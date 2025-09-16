import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeptApiData, DeptFormDataType } from "../types";
import { departmentApi } from "../services/department-api";
import { toast } from "sonner";
import { BadgeCheck } from "lucide-react";
import { isAxiosError } from "@/configs/api-config";
import { DEPARTMENT_KEYS } from "@/constants/query-keys";

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: DeptFormDataType) => {
      const apiData: DeptApiData = {
        department_name: formData.name.trim(),
        max_clock_in: String(formData.max_in).trim(),
        max_clock_out: String(formData.max_out).trim(),
      };

      return departmentApi.createDepartment(apiData);
    },

    onSuccess: async () => {
      toast(`Success`, {
        description: "You have successfully create department",
        duration: 2500,
        icon: <BadgeCheck size={21} className="mr-2 text-app-green" />,
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Create department failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
      } else {
        const message = "Create department failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
        console.error("Create department failed:", error);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: DEPARTMENT_KEYS.all,
      });
    },
  });

  return { ...mutation };
};

export const useUpdateDepartment = (deptName: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: DeptFormDataType) => {
      const apiData: DeptApiData = {
        department_name: formData.name.trim(),
        max_clock_in: String(formData.max_in).trim(),
        max_clock_out: String(formData.max_out).trim(),
      };

      return departmentApi.editDepartment(deptName, apiData);
    },

    onSuccess: async () => {
      toast(`Success`, {
        description: "You have successfully update department",
        duration: 2500,
        icon: <BadgeCheck size={21} className="mr-2 text-app-green" />,
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Update department failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
      } else {
        const message = "Update department failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
        console.error("Update department failed:", error);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: DEPARTMENT_KEYS.all,
      });
    },
  });

  return { ...mutation };
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (deptName: string) => {
      return departmentApi.deleteDepartment(deptName);
    },

    onSuccess: async () => {
      toast(`Success`, {
        description: "You have successfully delete department",
        duration: 2500,
        icon: <BadgeCheck size={21} className="mr-2 text-app-green" />,
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Delete department failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
      } else {
        const message = "Delete department failed";
        toast.error(message, {
          className: "bg-app-red!",
        });
        console.error("Delete department failed:", error);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: DEPARTMENT_KEYS.all,
      });
    },
  });

  return { ...mutation };
};
