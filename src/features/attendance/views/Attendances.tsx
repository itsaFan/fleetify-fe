import { useState } from "react";
import { useAtdHistoryQuery } from "../hooks/attendance-query";
import type { AtdQueryParams } from "../types";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { DateRangeFilter, DepartmentFilter } from "./AttendanceFilter";
import { getDefaultMonthRange } from "@/lib/time-formatters";
import { useDebounce } from "@/hooks/use-debounce";

export default function Attendances() {
  const [page, setPage] = useState<number>(1);
  const [dateFilter, setDateFilter] = useState(() => getDefaultMonthRange());
  const debouncedDateFilter = useDebounce(dateFilter, 200);
  const [selectedDept, setSelectedDept] = useState("0");

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleDeptChange = (val: string) => {
    setPage(1);
    setSelectedDept(val);
  };

  const handleFilterDateRange = (next: { from: string; to: string }) => {
    setPage(1);
    setDateFilter({ from: next.from || "", to: next.to || "" });
  };

  const handleClearAllFilter = () => {
    setPage(1);
    setSelectedDept("0");
    setDateFilter(getDefaultMonthRange());
  };

  const formatStatusOut = (status: string) => {
    if (!status) return "";
    if (status === "no_out") return "Not checked out yet";
    return status.replace(/_/g, " ");
  };

  const query: AtdQueryParams = {
    page: page,
    limit: 5,
    from: debouncedDateFilter.from,
    to: debouncedDateFilter.to,
    tz: userTimezone,
    ...(selectedDept !== "0" && { dept_id: Number(selectedDept) }),
  };

  const { data, isLoading, isError, error } = useAtdHistoryQuery(query);

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

  const attendances = data?.attendances || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <>
      <div className="flex flex-col gap-3  p-3 sm:p-6 border border-border rounded-lg shadow-md w-full min-h-[24rem]">
        <div className="flex flex-wrap items-center justify-between">
          <span className="text-lg font-semibold">Total Attandances ({pagination?.totalData || 0})</span>
        </div>

        <div className="w-full h-[1px] bg-black/10" />
        <div className="flex flex-wrap items-end gap-3">
          <DateRangeFilter from={dateFilter.from} to={dateFilter.to} onChange={handleFilterDateRange} />
          <DepartmentFilter selectedDept={selectedDept} setSelectedDept={handleDeptChange} />
          <button
            onClick={handleClearAllFilter}
            className="bg-app-blue text-white rounded-md p-2 text-sm hover:opacity-70 cursor-pointer ease-in-out transition-opacity">
            Clear Filter
          </button>
        </div>

        <div className="rounded-md border ">
          <Table className="">
            <TableHeader className="rounded-lg">
              <TableRow>
                <TableHead className="">Date</TableHead>
                <TableHead className="">Employee</TableHead>
                <TableHead className="">Check In</TableHead>
                <TableHead className="">Check Out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendances.length > 0 ? (
                <>
                  {attendances.map((atd, index) => (
                    <TableRow key={`${atd.attendance_id}-${index}`}>
                      <TableCell className="font-medium">{atd.date_local}</TableCell>
                      <TableCell className="">{atd.employee_name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span> {atd.clock_in_local} </span>
                          <span className={`text-xs opacity-75 capitalize ${atd.status_in === "late" ? "text-app-red" : "text-app-green"}`}>
                            {atd.status_in}: {atd.delta_in_minutes} mins
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span> {atd.clock_out_local} </span>
                          <span className={`text-xs opacity-75 capitalize ${atd.status_out === "early_leave" ? "text-app-red" : "text-app-blue"}`}>
                            {formatStatusOut(atd.status_out)}
                            {atd.status_out !== "no_out" && `: ${atd.delta_out_minutes} mins`}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 font-medium">
                    No Attendance History Found
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
