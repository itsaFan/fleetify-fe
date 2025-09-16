import { useEffect } from "react";
import ReactDOM from "react-dom";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import type { EmployeeFormDataType, QueryParams } from "../types";
import { useDepartmentListQuery } from "../hooks/department-query";
import { EmployeeFormSchema } from "../services/schemas";
import type { Employee } from "@/constants/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateEmployee, useDeleteEmployee, useUpdateEmployee } from "../hooks/employee-mutation";
import { useEmployeAttendanceActionMutation } from "../hooks/attendance-mutation";

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  employee: Employee;
  empId: string | number;
};

export function AddEmployeeModal({ isOpen, setIsOpen }: Omit<Props, "employee" | "empId">) {
  const query: QueryParams = {
    page: 1,
    limit: 50,
    sortBy: "id",
    sortDir: "asc",
    search: "",
  };
  const createEmployee = useCreateEmployee();
  const { data, isLoading } = useDepartmentListQuery(query);

  const form = useForm<EmployeeFormDataType>({
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: {
      name: "",
      address: "",
      department: "",
    },
  });

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body!.style.overflowY = "hidden";
    } else {
      body!.style.overflowY = "scroll";
    }
  }, [isOpen]);

  const departments = data?.departments || [];
  const { isDirty } = form.formState;
  const isMutating = createEmployee.isPending;

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  async function handleCreateEmployee(formData: EmployeeFormDataType) {
    createEmployee.mutateAsync(formData);
    setIsOpen(false);
    form.reset();
  }

  const content = (
    <div
      className={`fixed flex justify-center top-0 inset-x-0 z-[10] h-dvh pb-12 pt-24 px-4 bg-black/20 overflow-y-scroll cursor-pointer backdrop-blur-md`}
      onClick={closeModal}>
      <button className="bg-none border-none text-app-red text-lg absolute cursor-pointer right-2 top-2">
        <X />
      </button>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md h-fit rounded-xl overflow-hidden shadow cursor-auto bg-secondary`}>
        <div className="flex flex-col gap-3 p-4 w-full">
          <span className="font-bold text-lg">Create Employee</span>

          <div className="w-full h-[1px] bg-black/10" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateEmployee)} className="flex flex-col w-full gap-3">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel htmlFor="name" className="font-normal">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input id="name" className="w-full" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="address"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel htmlFor="address" className="font-normal">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input id="address" className="w-full" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="department"
                render={({ field }) => (
                  <FormItem className={`grid gap-2 `}>
                    <FormLabel className="font-normal">Department</FormLabel>
                    <FormControl>
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger className="relative w-full" aria-busy={isLoading || undefined}>
                          <SelectValue placeholder="Select department" />
                          {isLoading && <Loader2 className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin pointer-events-none" />}
                        </SelectTrigger>

                        <SelectContent>
                          {isLoading ? (
                            <div className="p-2 space-y-2">
                              {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton key={index} className="h-6" />
                              ))}
                            </div>
                          ) : departments?.length ? (
                            departments.map((dpt) => (
                              <SelectItem key={dpt.id} value={String(dpt.id)}>
                                {dpt.department_name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">No department found</div>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap items-center justify-end gap-2 pt-3 mt-3 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md cursor-pointer text-sm px-2 py-1 bg-app-red text-white hover:opacity-80 transition-opacity duration-200 ease-in-out">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isDirty || isMutating}
                  className="rounded-md cursor-pointer text-sm px-2 py-1 bg-app-green text-white disabled:opacity-50  disabled:cursor-not-allowed  hover:opacity-80 transition-opacity duration-200 ease-in-out">
                  {isMutating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );

  if (!isOpen) return <></>;

  // @ts-ignore
  return ReactDOM.createPortal(content, document.getElementById("portal"));
}

export function EditEmployeeModal({ isOpen, setIsOpen, employee }: Omit<Props, "empId">) {
  const query: QueryParams = {
    page: 1,
    limit: 50,
    sortBy: "id",
    sortDir: "asc",
    search: "",
  };
  const updateEmployee = useUpdateEmployee(employee.employee_id);
  const { data, isLoading } = useDepartmentListQuery(query);

  const form = useForm<z.infer<typeof EmployeeFormSchema>>({
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: {
      name: employee.name,
      address: employee.address,
      department: String(employee.department.id),
    },
  });

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body!.style.overflowY = "hidden";
    } else {
      body!.style.overflowY = "scroll";
    }
  }, [isOpen]);

  const departments = data?.departments || [];

  const { isDirty } = form.formState;
  const isMutating = updateEmployee.isPending;

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  async function handleUpdateEmployee(formData: z.infer<typeof EmployeeFormSchema>) {
    // console.log("form", formData);
    updateEmployee.mutateAsync(formData);
    setIsOpen(false);
    form.reset();
  }

  const content = (
    <div
      className={`fixed flex justify-center top-0 inset-x-0 z-[10] h-dvh pb-12 pt-24 px-4 bg-black/20 overflow-y-scroll cursor-pointer backdrop-blur-md`}
      onClick={closeModal}>
      <button className="bg-none border-none text-app-red text-lg absolute cursor-pointer right-2 top-2">
        <X />
      </button>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-xl h-fit rounded-xl overflow-hidden shadow cursor-auto bg-secondary`}>
        <div className="flex flex-col gap-3 p-4 w-full">
          <span className="font-bold text-lg">Edit Employee</span>

          <div className="w-full h-[1px] bg-black/10" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateEmployee)} className="flex flex-col w-full gap-3">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel htmlFor="name" className="font-normal">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input id="name" className="w-full" type="text" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="address"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel htmlFor="address" className="font-normal">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input id="address" className="w-full" type="text" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="department"
                render={({ field }) => (
                  <FormItem className={`grid gap-2 `}>
                    <FormLabel className="font-normal">Department</FormLabel>
                    <FormControl>
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger className="relative w-full" aria-busy={isLoading || undefined}>
                          <SelectValue placeholder="Select department" />
                          {isLoading && <Loader2 className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin pointer-events-none" />}
                        </SelectTrigger>

                        <SelectContent>
                          {isLoading ? (
                            <div className="p-2 space-y-2">
                              {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton key={index} className="h-6" />
                              ))}
                            </div>
                          ) : departments?.length ? (
                            departments.map((dpt) => (
                              <SelectItem key={dpt.id} value={String(dpt.id)}>
                                {dpt.department_name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">No department found</div>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap items-center justify-end gap-3 pt-3 mt-3 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md cursor-pointer text-sm px-2 py-1 bg-app-red text-white  hover:opacity-80 transition-opacity duration-200 ease-in-out">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isDirty || isMutating}
                  className="rounded-md cursor-pointer text-sm px-2 py-1 bg-app-green text-white disabled:opacity-50 disabled:cursor-not-allowed  hover:opacity-80 transition-opacity duration-200 ease-in-out">
                  {isMutating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );

  if (!isOpen) return <></>;

  // @ts-ignore
  return ReactDOM.createPortal(content, document.getElementById("portal"));
}

export function DeleteEmployeeModal({ isOpen, setIsOpen, empId }: Omit<Props, "employee">) {
  const deleteEmployee = useDeleteEmployee();
  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body!.style.overflowY = "hidden";
    } else {
      body!.style.overflowY = "scroll";
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  async function handleDeleteEmployee() {
    deleteEmployee.mutateAsync(String(empId).trim());

    setIsOpen(false);
  }

  const content = (
    <div
      className={`fixed flex justify-center top-0 inset-x-0 z-[1000] h-dvh pb-12 pt-24 sm:pt-32 px-4 bg-black/20 overflow-y-scroll cursor-pointer backdrop-blur-md`}
      onClick={closeModal}>
      <button className="bg-none border-none text-app-red text-lg absolute cursor-pointer right-2 top-2">
        <X />
      </button>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md h-fit rounded-xl overflow-hidden shadow cursor-auto bg-secondary`}>
        <div className="flex flex-col gap-1 p-4 w-full">
          <span className="font-bold text-lg">Delete Employee</span>
          <span className="text-sm opacity-75">This action cannot be undone. This will delete employee permanently.</span>

          <div className="flex flex-wrap items-center justify-end gap-2 pt-3 mt-3 border-t">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-md text-sm px-2 py-1 bg-zinc-400 text-white  hover:opacity-80 transition-opacity duration-200 ease-in-out">
              Cancel
            </button>
            <button
              onClick={handleDeleteEmployee}
              type="button"
              className="rounded-md text-sm px-2 py-1 bg-app-red text-white  hover:opacity-80 transition-opacity duration-200 ease-in-out">
              Delete Employee
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  if (!isOpen) return <></>;

  // @ts-ignore
  return ReactDOM.createPortal(content, document.getElementById("portal"));
}

export function AttendanceActionModal({ isOpen, setIsOpen, employee }: Omit<Props, "empId">) {
  const { mutateAsync, isPending, errorMessage, successMessage, clearError, clearSuccess } = useEmployeAttendanceActionMutation();
  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body!.style.overflowY = "hidden";
    } else {
      body!.style.overflowY = "scroll";
    }
  }, [isOpen]);

  const closeModal = () => {
    clearError();
    clearSuccess();
    setIsOpen(false);
  };

  const handleCheckin = async () => {
    await mutateAsync({ empId: String(employee.employee_id), action: "in" });
  };

  const handelCheckOut = async () => {
    await mutateAsync({ empId: String(employee.employee_id), action: "out" });
  };

  const content = (
    <div
      className={`fixed flex justify-center top-0 inset-x-0 z-[1000] h-dvh pb-12 pt-24 sm:pt-32 px-4 bg-black/20 overflow-y-scroll cursor-pointer backdrop-blur-md`}
      onClick={closeModal}>
      <button className="bg-none border-none text-app-red text-lg absolute cursor-pointer right-2 top-2">
        <X />
      </button>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md h-fit rounded-xl overflow-hidden shadow cursor-auto bg-secondary`}>
        <div className="flex flex-col gap-1 p-4 w-full">
          <div className="flex flex-col gap-2 justify-center text-center min-h-[8rem]">
            <span className="font-bold text-lg">Attandance Action</span>
            <span className="text-sm opacity-75">
              I'm {employee.name} from {employee.department.department_name}
            </span>

            {successMessage && <span className="text-sm text-app-green">{successMessage}</span>}
            {errorMessage && <span className="text-sm text-app-red">{errorMessage}</span>}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 mt-3 border-t">
            <button
              onClick={handleCheckin}
              type="button"
              disabled={isPending}
              className="rounded-md flex items-center gap-1 text-sm px-2 py-1 bg-app-blue text-white  disabled:opacity-50 disabled:cursor-not-allowed  hover:opacity-80 transition-opacity duration-200 ease-in-out">
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Check In"
              )}
            </button>
            <button
              onClick={handelCheckOut}
              type="button"
              disabled={isPending}
              className="rounded-md flex items-center gap-1 text-sm px-2 py-1 bg-app-red text-white disabled:opacity-50 disabled:cursor-not-allowed   hover:opacity-80 transition-opacity duration-200 ease-in-out">
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Check Out"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  if (!isOpen) return <></>;

  // @ts-ignore
  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
