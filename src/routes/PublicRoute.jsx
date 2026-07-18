import { Navigate, Outlet } from "react-router";
import useAuthStore from "./authStore";

const PublicRoute = () => {
  const token = useAuthStore(state => state.token);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
