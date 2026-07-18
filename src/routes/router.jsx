import { createBrowserRouter, Navigate } from "react-router";

import Dashboard from "../componets/dasboard";
import Products from "../componets/product";
import Category from "../componets/category";
import Customers from "../componets/customers";
import Suppliers from "../componets/suppliers";
import Sales from "../componets/sales";
import Purchases from "../componets/purchases";
import Reports from "../componets/reports";
import Login from "../componets/auth/login";
import Register from "../componets/auth/registrasi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
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
  {
    path: "/sales",
    Component: Sales,
  },
  {
    path: "/purchases",
    Component: Purchases,
  },
  {
    path: "/reports",
    Component: Reports,
  },
]);

export default router;
