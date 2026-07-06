import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar
          title="Dashboard"
          subtitle="Ringkasan data toko"
          userName="Admin Toko"
          onLogout={handleLogout}
        />

        <main className="p-6">
          <h1 className="text-2xl font-bold">Isi Dashboard</h1>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;