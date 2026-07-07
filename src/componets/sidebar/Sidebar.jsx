import { NavLink } from "react-router";
import  menus  from "../../utils/menus";
import { colors } from "../../utils/color";

const Sidebar = () => {
  return (
    <aside
      className="min-h-screen w-64 px-4 py-6 text-white"
      style={{ backgroundColor: colors.background.sidebar }}
    >
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold">Toko ATK</h1>
        <p
          className="mt-1 text-sm"
          style={{ color: colors.text.light }}
        >
          Admin Panel
        </p>
      </div>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className="block rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-slate-800"
            style={({ isActive }) => ({
              backgroundColor: isActive ? colors.primary[600] : "transparent",
              color: isActive ? colors.text.white : "#cbd5e1",
            })}
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;