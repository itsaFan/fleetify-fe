import { ROUTES } from "@/constants/routes";
import DepartmentPage from "@/pages/department/DepartmentPage";
import type { RouteObject } from "react-router-dom";

export function departmentRoutes(): RouteObject {
  return {
    path: `/${ROUTES.DEPARTMENT.BASE}`,
    children: [
      {
        index: true,
        element: <DepartmentPage />,
        loader: async () => {},
      },
    ],
  };
}
