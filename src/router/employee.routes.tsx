import EmployeePage from "@/pages/employee/EmployeePage";
import type { RouteObject } from "react-router-dom";

export function employeeRoutes(): RouteObject {
  return {
    path: "/employee",
    children: [
      {
        index: true,
        element: <EmployeePage />,
        loader: async () => {},
      },
    ],
  };
}
