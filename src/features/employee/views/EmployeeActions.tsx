import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { DeleteEmployeeModal, EditEmployeeModal } from "./ActionModals";
import type { Employee } from "@/constants/types";

type Props = {
  employee: Employee;
};

export default function EmployeeActions({ employee }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDel, setIsOpenDel] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-0 justify-end">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="edit-employee"
          className=" px-1.5 rounded-md py-1 hover:bg-app-blue/10 hover:text-app-blue transition-all duration-200 ease-in-out cursor-pointer">
          <Pencil size={14} />
        </button>

        <button
          onClick={() => setIsOpenDel(true)}
          className=" px-1.5 rounded-md py-1 hover:bg-app-red/10 hover:text-app-red transition-all duration-200 ease-in-out cursor-pointer">
          <Trash size={14} />
        </button>
      </div>
      <EditEmployeeModal isOpen={isOpen} setIsOpen={setIsOpen} employee={employee} />
      <DeleteEmployeeModal isOpen={isOpenDel} setIsOpen={setIsOpenDel} empId={employee.employee_id} />
    </>
  );
}
