import { useNavigate } from "react-router";
import useAuthStore from "./authStores";

const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Yakin ingin logout?");

    if (!confirmLogout) return;

    logout();
    navigate("/login", { replace: true });
  };

  return handleLogout;
};

export default useLogout;
