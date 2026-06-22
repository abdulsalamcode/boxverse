import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Box,
  ShoppingBag,
  Users,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/boxes", label: "Boxes", icon: Box },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-700">
          <h1 className="text-white font-bold text-lg">BoxVerse</h1>
          <p className="text-gray-500 text-xs">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}