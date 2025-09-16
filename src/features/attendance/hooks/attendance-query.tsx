import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AtdQueryParams } from "../types";
import { ATTENDANCE_KEYS } from "@/constants/query-keys";
import { atdApi } from "../services/attendance-api";

export const useAtdHistoryQuery = (q: AtdQueryParams) => {
  return useQuery({
    queryKey: ATTENDANCE_KEYS.attendances(q),
    queryFn: () => atdApi.getAttendanceList(q),
    placeholderData: keepPreviousData,
  });
};
