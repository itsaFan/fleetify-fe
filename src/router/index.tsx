import { BasicLayout } from "@/components/layout/BasicLayout";
import { unguardedRoute } from "@/configs/router-loader";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { employeeRoutes } from "./employee.routes";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    loader: unguardedRoute,
    children: [
      {
        index: true,
        element: <Navigate to={`/employee`} replace />,
      },
      employeeRoutes(),
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
