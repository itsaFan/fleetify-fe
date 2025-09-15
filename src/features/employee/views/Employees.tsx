import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEmployeeListQuery } from "../hooks/employee-query";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import type { QueryParams } from "../types";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import EmployeeActions from "./EmployeeActions";
import { Plus } from "lucide-react";

export function Employees() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const query: QueryParams = {
    page: page,
    limit: 5,
    sortBy: "id",
    sortDir: "asc",
    search: debouncedSearch,
  };

  const { data, isLoading, error } = useEmployeeListQuery(query);

  if (isLoading) {
    return (
      <>
        <span>Loading...</span>
      </>
    );
  }

  if (error) {
    return (
      <>
        <span>Error</span>
      </>
    );
  }

  const employees = data?.employees || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <>
      <div className="flex flex-col gap-3  p-3 sm:p-6 border border-border rounded-lg shadow-md w-full min-h-[24rem]">
        <div className="flex flex-wrap items-center justify-between">
          <span className="text-lg font-semibold">Total Employee ({pagination?.totalData || 0})</span>

          <button type="button" className="rounded-md flex items-center gap-1 text-sm px-2 py-1 bg-app-brand text-white  hover:opacity-80 transition-opacity duration-200 ease-in-out">
            <Plus size={14} />Add Employee
          </button>
        </div>
        <div className="w-full h-[1px] bg-black/10" />
        <div>
          <Input
            className="max-w-[16rem]"
            placeholder="Search name or department"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="rounded-md border">
          <Table className="">
            <TableHeader className="rounded-lg">
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.length > 0 ? (
                <>
                  {employees.map((emp, index) => (
                    <TableRow key={`${emp.id}-${index}`}>
                      <TableCell className="font-medium">{emp.name}</TableCell>
                      <TableCell>{emp.department.department_name}</TableCell>
                      <TableCell className="line-clamp-1">{emp.address}</TableCell>
                      <TableCell className="text-right">
                        <EmployeeActions employee={emp} />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 font-medium">
                    No Employee Found
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
    </>
  );
}
