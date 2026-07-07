import { createBrowserRouter, Navigate } from "react-router";

import Dashboard from "../componets/dasboard";
import Products from "../componets/product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/products",
    Component: Products,
  },
]);

export default router;