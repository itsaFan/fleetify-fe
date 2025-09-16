import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DeptFormDataType } from "../types";
import { DepartmentFormSchema } from "../services/schemas";
import { useCreateDepartment, useDeleteDepartment, useUpdateDepartment } from "../hooks/department-mutation";
import { TIME_OPTIONS } from "@/lib/time-formatters";
import type { Department } from "@/constants/types";

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  department: Department;
};

export function AddDepartmentModal({ isOpen, setIsOpen }: Omit<Props, "department">) {
  const createDepartment = useCreateDepartment();

  const form = useForm<DeptFormDataType>({
    resolver: zodResolver(DepartmentFormSchema),
    defaultValues: {
      name: "",
      max_in: "",
      max_out: "",
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

  const isMutating = createDepartment.isPending;

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  async function handleCreateDepartment(formData: DeptFormDataType) {
    // console.log(formData)
    createDepartment.mutateAsync(formData);
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
          <span className="font-bold text-lg">Create Department</span>

          <div className="w-full h-[1px] bg-black/10" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateDepartment)} className="flex flex-col w-full gap-3">
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
                name="max_in"
                render={({ field }) => (
                  <FormItem className={`grid gap-2 `}>
                    <FormLabel className="font-normal">Max Clock In</FormLabel>
                    <FormControl>
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger className="relative w-full" aria-busy={undefined}>
                          <SelectValue placeholder="Select max clock in" />
                        </SelectTrigger>

                        <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time.slice(0, 5)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="max_out"
                render={({ field }) => (
                  <FormItem className={`grid gap-2 `}>
                    <FormLabel className="font-normal">Max Clock Out</FormLabel>
                    <FormControl>
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger className="relative w-full" aria-busy={undefined}>
                          <SelectValue placeholder="Select max clock out" />
                        </SelectTrigger>

                        <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time.slice(0, 5)}
                            </SelectItem>
                          ))}
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
                  disabled={isMutating}
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

export function EditDepartmentModal({ department, isOpen, setIsOpen }: Props) {
  const updateDepartment = useUpdateDepartment(department.department_name);

  const form = useForm<DeptFormDataType>({
    resolver: zodResolver(DepartmentFormSchema),
    defaultValues: {
      name: department.department_name,
      max_in: department.max_clock_in,
      max_out: department.max_clock_out,
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

  const isMutating = updateDepartment.isPending;

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  async function handleCreateDepartment(formData: DeptFormDataType) {
    // console.log(formData)
    updateDepartment.mutateAsync(formData);
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
          <span className="font-bold text-lg">Edit Department</span>

          <div className="w-full h-[1px] bg-black/10" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateDepartment)} className="flex flex-col w-full gap-3">
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
                name="max_in"
                render={({ field }) => (
                  <FormItem className={`grid gap-2 `}>
                    <FormLabel className="font-normal">Max Clock In</FormLabel>
                    <FormControl>
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger className="relative w-full" aria-busy={undefined}>
                          <SelectValue placeholder="Select max clock in" />
                        </SelectTrigger>

                        <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time.slice(0, 5)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="max_out"
                render={({ field }) => (
                  <FormItem className={`grid gap-2 `}>
                    <FormLabel className="font-normal">Max Clock Out</FormLabel>
                    <FormControl>
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger className="relative w-full" aria-busy={undefined}>
                          <SelectValue placeholder="Select max clock out" />
                        </SelectTrigger>

                        <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time.slice(0, 5)}
                            </SelectItem>
                          ))}
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
                  disabled={isMutating}
                  className="rounded-md cursor-pointer text-sm px-2 py-1 bg-app-green text-white disabled:opacity-50  disabled:cursor-not-allowed  hover:opacity-80 transition-opacity duration-200 ease-in-out">
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

export function DeleteDepartmentModal({ department, isOpen, setIsOpen }: Props) {
  const deleteDepartment = useDeleteDepartment();
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
    deleteDepartment.mutateAsync(String(department.department_name).trim());
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
          <span className="font-bold text-lg">Delete Department</span>
          <span className="text-sm opacity-75">This action cannot be undone. This will delete department permanently.</span>

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
              Delete Department
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
