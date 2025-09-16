import { TIME_OPTIONS } from "@/lib/time-formatters";
import z from "zod";

export const DepartmentFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Department name is required" }),

  max_in: z.enum([...(TIME_OPTIONS as [string, ...string[]])], {
    message: "Please choose max clock in attendance",
  }),

  max_out: z.enum([...(TIME_OPTIONS as [string, ...string[]])], {
    message: "Please choose max clock out attendance",
  }),
});
