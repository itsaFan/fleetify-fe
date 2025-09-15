import { useEffect } from "react";
import ReactDOM from "react-dom";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import type { QueryParams } from "../types";
import { useDepartmentListQuery } from "../hooks/department-query";
import { EditEmpSchema } from "../services/schemas";
import type { Employee } from "@/constants/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  employee: Employee;
  empId: string | number;
};

export function EditEmployeeModal({ isOpen, setIsOpen, employee }: Omit<Props, "empId">) {
  const query: QueryParams = {
    page: 1,
    limit: 50,
    sortBy: "id",
    sortDir: "asc",
    search: "",
  };
  const { data, isLoading } = useDepartmentListQuery(query);

  const form = useForm<z.infer<typeof EditEmpSchema>>({
    resolver: zodResolver(EditEmpSchema),
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

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  async function handleUpdateEmployee(formData: z.infer<typeof EditEmpSchema>) {
    console.log("form", formData);
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
                  className="rounded-md text-sm px-2 py-1 bg-app-red text-white  hover:opacity-80 transition-opacity duration-200 ease-in-out">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md text-sm px-2 py-1 bg-app-green text-white  hover:opacity-80 transition-opacity duration-200 ease-in-out">
                  Save Changes
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

  const content = (
    <div
      className={`fixed flex justify-center top-0 inset-x-0 z-[1000] h-dvh pb-12 pt-[25%] px-4 bg-black/20 overflow-y-scroll cursor-pointer backdrop-blur-md`}
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
              type="submit"
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
