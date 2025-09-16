import { useState } from "react";

import { Pencil, Trash } from "lucide-react";
import type { Department } from "@/constants/types";
import { DeleteDepartmentModal, EditDepartmentModal } from "./ActionModals";

type Props = {
  department: Department;
};

export default function DepartmentActions({ department }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDel, setIsOpenDel] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-0 justify-end">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="edit-employee"
          className=" px-1.5 rounded-md py-1 hover:bg-app-blue/10 text-app-blue transition-all duration-200 ease-in-out cursor-pointer">
          <Pencil size={14} />
        </button>

        <button
          onClick={() => setIsOpenDel(true)}
          className=" px-1.5 rounded-md py-1 hover:bg-app-red/10 text-app-red transition-all duration-200 ease-in-out cursor-pointer">
          <Trash size={14} />
        </button>
      </div>

      <EditDepartmentModal isOpen={isOpen} setIsOpen={setIsOpen} department={department} />
      <DeleteDepartmentModal isOpen={isOpenDel} setIsOpen={setIsOpenDel} department={department} />
    </>
  );
}
