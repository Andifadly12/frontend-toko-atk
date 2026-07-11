import { createBrowserRouter, Navigate } from "react-router";

import Dashboard from "../componets/dasboard";
import Products from "../componets/product";
import Category from "../componets/category";
import Customers from "../componets/customers";
import Suppliers from "../componets/suppliers";

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
  {
    path: "/categorys",
    Component: Category,
  },
  {
    path: "/customers",
    Component: Customers,
  },
  {
    path: "/suppliers",
    Component: Suppliers,
  },
]);

export default router;
