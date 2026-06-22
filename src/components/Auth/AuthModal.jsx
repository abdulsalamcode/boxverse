import { useState } from "react";
import LoginForm    from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
          animate-[fadeUp_0.2s_ease_both]"
      />

      {/* Modal wrapper — allows scrolling on small viewports, caps height to viewport */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md
          max-h-[90vh] overflow-y-auto
          animate-[popIn_0.3s_ease_both] relative my-auto">

          {/* Top Bar */}
          <div className="bg-[#1A160E] px-6 py-5 flex items-center
            justify-between sticky top-0 z-10">
            <div className="text-[#C9A84C] font-serif text-xl font-black">
              Box<span className="text-white">Verse</span>
            </div>
            <button
              onClick={onClose}
              className="text-[#A8957B] hover:text-white transition-colors
                duration-200 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-[#EDE5D4] sticky top-[68px] bg-white z-10">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3.5 text-sm font-semibold transition-all
                duration-200 border-b-2
                ${mode === "login"
                  ? "border-[#C9A84C] text-[#1A160E]"
                  : "border-transparent text-[#A8957B] hover:text-[#1A160E]"
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-3.5 text-sm font-semibold transition-all
                duration-200 border-b-2
                ${mode === "register"
                  ? "border-[#C9A84C] text-[#1A160E]"
                  : "border-transparent text-[#A8957B] hover:text-[#1A160E]"
                }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <div className="p-6">
            {mode === "login"
              ? <LoginForm    onSuccess={onClose} onSwitch={() => setMode("register")} />
              : <RegisterForm onSuccess={onClose} onSwitch={() => setMode("login")}    />
            }
          </div>

        </div>
      </div>
    </>
  );
};

export default AuthModal;