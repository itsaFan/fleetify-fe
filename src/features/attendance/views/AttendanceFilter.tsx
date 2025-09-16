import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useDepartmentListQuery } from "@/features/employee/hooks/department-query";
import { toYMD } from "@/lib/time-formatters";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useMemo } from "react";
import type { DateRange } from "react-day-picker";

type DepartmentProps = {
  selectedDept: string;
  setSelectedDept: (val: string) => void;
};

export function DepartmentFilter({ selectedDept, setSelectedDept }: DepartmentProps) {
  const { data: dept, isLoading: isLoadingDept } = useDepartmentListQuery({ page: 1, limit: 50, sortBy: "id", sortDir: "asc", search: "" });

  const departments = dept?.departments || [];
  return (
    <>
      <div className="flex flex-col gap-1 w-full max-w-[12rem]">
        <span className="text-sm font-medium">Filter Department</span>
        <Select value={selectedDept ?? ""} onValueChange={setSelectedDept}>
          <SelectTrigger className="relative w-full " aria-busy={isLoadingDept || undefined}>
            <SelectValue />
            {isLoadingDept && <Loader2 className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin pointer-events-none" />}
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="0">All departments</SelectItem>

            {isLoadingDept ? (
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
      </div>
    </>
  );
}

type DateRangeFilterProps = {
  from: string;
  to: string;
  onChange: (next: { from: string; to: string }) => void;
};

export function DateRangeFilter({ from, to, onChange }: DateRangeFilterProps) {
  const range: DateRange | undefined = useMemo(() => {
    const f = from ? new Date(from + "T00:00:00") : undefined;
    const t = to ? new Date(to + "T00:00:00") : undefined;
    return f || t ? { from: f, to: t } : undefined;
  }, [from, to]);

  const display = from && to ? `${from} to ${to}` : from ? `${from}` : to ? `${to}` : "";

  return (
    <div className="flex flex-col gap-1 w-full max-w-xs">
      <span className="text-sm font-medium">Filter History</span>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative w-full ">
              <Input readOnly value={display} placeholder="Filter date range" className="pr-4 w-full" />
              <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-70 pointer-events-none" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-full" align="end">
            <div>
              <Calendar
                mode="range"
                selected={range}
                onSelect={(r) => {
                  const nextFrom = r?.from ? toYMD(r.from) : "";
                  const nextTo = r?.to ? toYMD(r.to) : "";
                  onChange({ from: nextFrom, to: nextTo });
                }}
                numberOfMonths={1}
                defaultMonth={range?.from ?? new Date()}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
