import { BasicLayout } from "@/components/layout/BasicLayout";
import { unguardedRoute } from "@/configs/router-loader";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { employeeRoutes } from "./employee.routes";
import NotFoundPage from "@/pages/NotFoundPage";
import { departmentRoutes } from "./department.routes";
import { attendanceRoutes } from "./attendance.routes";
import { ROUTES } from "@/constants/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    loader: unguardedRoute,
    children: [
      {
        index: true,
        element: <Navigate to={`/${ROUTES.EMPLOYEE.BASE}`} replace />,
      },
      employeeRoutes(),
      departmentRoutes(),
      attendanceRoutes(),
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
