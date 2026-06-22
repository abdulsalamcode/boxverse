import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const AdminNavbar = ({ title }) => {
  const navigate     = useNavigate();
  const { user }     = useAuthStore();

  return (
    <div className="bg-white border-b border-[#EDE5D4] px-6 py-4
      flex items-center justify-between sticky top-0 z-30">

      {/* Title */}
      <h1 className="font-serif text-xl font-bold text-[#1A160E]">
        {title || "Admin Panel"}
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Back to Site */}
        <button
          onClick={() => navigate("/")}
          className="text-xs text-[#A8957B] hover:text-[#C9A84C]
            transition-colors duration-200 flex items-center gap-1"
        >
          ← Back to Site
        </button>

        {/* Admin Badge */}
        <div className="flex items-center gap-2 bg-[#F2DFA0] text-[#7A5E1A]
          px-3 py-1.5 rounded-full">
          <span className="text-xs">👑</span>
          <span className="text-xs font-semibold">Admin</span>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#1A160E] flex items-center
          justify-center text-[#C9A84C] text-xs font-bold">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>

      </div>
    </div>
  );
};

export default AdminNavbar;