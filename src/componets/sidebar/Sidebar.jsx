import { NavLink } from "react-dom";


function Sidebar() {
  const menus = [
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <aside className="min-h-screen w-64 bg-slate-900 px-4 py-6 text-white">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold">Toko ATK</h1>
        <p className="mt-1 text-sm text-slate-400">Admin Panel</p>
      </div>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;