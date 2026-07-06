import { createBrowserRouter, Navigate } from "react-router";
import Dashboard from "../componets/dasboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;