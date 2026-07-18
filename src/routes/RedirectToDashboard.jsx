import { Navigate } from "react-router";

const RedirectToDashboard = () => {
  return <Navigate to="/dashboard" replace />;
};

export default RedirectToDashboard;
