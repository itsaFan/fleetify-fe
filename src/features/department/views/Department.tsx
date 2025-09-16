import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import type { QueryParams } from "../types";
import { useDepartmentListQuery } from "@/features/employee/hooks/department-query";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DepartmentActions from "./DepartmentActions";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { AddDepartmentModal } from "./ActionModals";
import { Skeleton } from "@/components/ui/skeleton";

export default function Department() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const query: QueryParams = {
    page: page,
    limit: 5,
    sortBy: "id",
    sortDir: "desc",
    search: debouncedSearch,
  };

  const { data, isLoading, isError, error } = useDepartmentListQuery(query);

  if (isLoading) {
    return (
      <>
       <Skeleton className="w-full h-40 sm:h-[24rem]" />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <span>{error?.message}</span>
      </>
    );
  }

  const departments = data?.departments || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  console.log(departments);

  return (
    <>
      <div className="flex flex-col gap-3  p-3 sm:p-6 border border-border rounded-lg shadow-md w-full min-h-[24rem]">
        <div className="flex flex-wrap items-center justify-between">
          <span className="text-lg font-semibold">Total Departments ({pagination?.totalData || 0})</span>

          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="rounded-md flex items-center gap-1 text-sm px-2 py-1 bg-app-blue text-white  hover:opacity-80 transition-opacity duration-200 ease-in-out">
            <Plus size={14} />
            Add Department
          </button>
        </div>

        <div className="w-full h-[1px] bg-black/10" />
        <div>
          <Input
            className="max-w-[16rem]"
            placeholder="Search department"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="rounded-md border ">
          <Table className="">
            <TableHeader className="rounded-lg">
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead className="">Max Clock In</TableHead>
                <TableHead className="">Max Clock Out</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.length > 0 ? (
                <>
                  {departments.map((dept, index) => (
                    <TableRow key={`${dept.id}-${index}`}>
                      <TableCell className="font-medium">{dept.department_name}</TableCell>
                      <TableCell className="">{dept.max_clock_in}</TableCell>
                      <TableCell>{dept.max_clock_out}</TableCell>
                      <TableCell className="text-right">
                        <DepartmentActions department={dept} />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 font-medium">
                    No Departments Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} className={page === 1 ? "pointer-events-none opacity-50" : ""} />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <AddDepartmentModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
