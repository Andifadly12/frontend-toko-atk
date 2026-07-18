/* eslint-disable react-refresh/only-export-components */

import { createBrowserRouter } from "react-router";

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

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RedirectToDashboard from "./RedirectToDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RedirectToDashboard,
  },

  {
    Component: PublicRoute,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },

  {
    Component: ProtectedRoute,
    children: [
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
    ],
  },
]);

export default router;
