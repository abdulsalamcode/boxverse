import { useState }   from "react";
import { useNavigate } from "react-router-dom";
import Button          from "../common/Button";
import DarkModeToggle  from "../ui/DarkModeToggle";
import { useAuthStore } from "../../store/authStore";
import { useUIStore }   from "../../store/uiStore";

const Navbar = () => {
  const navigate                = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { user, logout }        = useAuthStore();
  const openAuthModal           = useUIStore((state) => state.openAuthModal);

  return (
    <>
      <nav className="bg-[#1A160E] sticky top-0 z-50 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="text-[#C9A84C] font-serif text-2xl font-black
                tracking-wide cursor-pointer">
              Box<span className="text-white">Verse</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/" className="text-[#C5B89A] text-sm
                hover:text-[#C9A84C] transition-colors duration-200">
                Explore
              </a>
              <a href="/build" className="text-[#C5B89A] text-sm
                hover:text-[#C9A84C] transition-colors duration-200">
                Build a Box
              </a>
              <a href="/rewards" className="text-[#C5B89A] text-sm
                hover:text-[#C9A84C] transition-colors duration-200
                flex items-center gap-1">
                ⭐ Rewards
              </a>

              {/* Dark Mode */}
              <DarkModeToggle />

              {/* Auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center gap-2 text-sm text-[#C5B89A]
                      hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#C9A84C]
                      flex items-center justify-center text-[#1A160E]
                      text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name?.split(" ")[0]}</span>
                    <span className="text-xs">▾</span>
                  </button>

                  {/* Dropdown */}
                  {dropdown && (
                    <div className="absolute right-0 top-10 bg-white
                      border border-[#EDE5D4] rounded-xl shadow-xl w-44
                      overflow-hidden z-50 animate-[fadeUp_0.2s_ease_both]">
                      <a href="/profile"
                        className="flex items-center gap-2 px-4 py-3 text-sm
                          text-[#5C5040] hover:bg-[#FAF7F0] hover:text-[#1A160E]
                          transition-colors duration-150">
                        👤 My Profile
                      </a>
                      <a href="/orders"
                        className="flex items-center gap-2 px-4 py-3 text-sm
                          text-[#5C5040] hover:bg-[#FAF7F0] hover:text-[#1A160E]
                          transition-colors duration-150">
                        📦 My Orders
                      </a>
                      <a href="/rewards"
                        className="flex items-center gap-2 px-4 py-3 text-sm
                          text-[#5C5040] hover:bg-[#FAF7F0] hover:text-[#1A160E]
                          transition-colors duration-150">
                        ⭐ Rewards
                      </a>
                      <div className="border-t border-[#EDE5D4]" />
                      <button
                        onClick={() => { logout(); setDropdown(false); }}
                        className="w-full flex items-center gap-2 px-4 py-3
                          text-sm text-red-400 hover:bg-red-50
                          transition-colors duration-150"
                      >
                        🚪 Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  label="Sign In"
                  variant="primary"
                  onClick={openAuthModal}
                />
              )}
            </div>

            {/* Mobile Right */}
            <div className="md:hidden flex items-center gap-3">
              <DarkModeToggle />
              <button
                className="text-[#C5B89A]"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden flex flex-col gap-3 pb-5 pt-2
              border-t border-[#2E2318]">
              <a href="/" className="text-[#C5B89A] text-sm
                hover:text-[#C9A84C] transition-colors duration-200 pt-2">
                Explore
              </a>
              <a href="/build" className="text-[#C5B89A] text-sm
                hover:text-[#C9A84C] transition-colors duration-200">
                Build a Box
              </a>
              <a href="/rewards" className="text-[#C5B89A] text-sm
                hover:text-[#C9A84C] transition-colors duration-200">
                ⭐ Rewards
              </a>
              {user ? (
                <>
                  <a href="/profile" className="text-[#C5B89A] text-sm
                    hover:text-[#C9A84C] transition-colors duration-200">
                    👤 My Profile
                  </a>
                  <a href="/orders" className="text-[#C5B89A] text-sm
                    hover:text-[#C9A84C] transition-colors duration-200">
                    📦 My Orders
                  </a>
                  <button
                    onClick={logout}
                    className="text-sm text-red-400 text-left"
                  >
                    🚪 Sign Out
                  </button>
                </>
              ) : (
                <Button
                  label="Sign In"
                  variant="primary"
                  onClick={() => { setMenuOpen(false); openAuthModal(); }}
                />
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;