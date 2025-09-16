
import { ROUTES } from "@/constants/routes";
import AttendancePage from "@/pages/attendance/AttendancePage";
import type { RouteObject } from "react-router-dom";

export function attendanceRoutes(): RouteObject {
  return {
    path: `/${ROUTES.ATTENDANCES.BASE}`,
    children: [
      {
        index: true,
        element: <AttendancePage />,
        loader: async () => {},
      },
    ],
  };
}
