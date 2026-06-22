import { useState }    from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const MENU = [
  { icon: "📊", label: "Dashboard",  path: "/admin"          },
  { icon: "📦", label: "Products",   path: "/admin/products" },
  { icon: "🎁", label: "Boxes",      path: "/admin/boxes"    },
  { icon: "🛒", label: "Orders",     path: "/admin/orders"   },
  { icon: "👥", label: "Users",      path: "/admin/users"    },
];

const AdminSidebar = () => {
  const navigate        = useNavigate();
  const location        = useLocation();
  const { user, logout} = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-[#1A160E] flex flex-col transition-all duration-300
      ${collapsed ? "w-16" : "w-56"} shrink-0 sticky top-0 h-screen`}>

      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5
        border-b border-[#2E2318]">
        {!collapsed && (
          <div className="text-[#C9A84C] font-serif text-lg font-black">
            Box<span className="text-white">Verse</span>
            <span className="text-[#A8957B] text-xs font-sans
              font-normal ml-1">Admin</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#A8957B] hover:text-[#C9A84C]
            transition-colors duration-200 ml-auto"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4">
        {MENU.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3
                transition-all duration-200 text-sm
                ${isActive
                  ? "bg-[#C9A84C]/15 text-[#C9A84C] border-r-2 border-[#C9A84C]"
                  : "text-[#A8957B] hover:bg-[#2E2318] hover:text-[#C5B89A]"
                }`}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className={`border-t border-[#2E2318] p-4`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center
            justify-center text-[#1A160E] text-xs font-bold shrink-0">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-[#A8957B] truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="w-full mt-3 text-xs text-red-400 hover:text-red-300
              text-left transition-colors duration-200"
          >
            🚪 Sign Out
          </button>
        )}
      </div>

    </div>
  );
};

export default AdminSidebar;