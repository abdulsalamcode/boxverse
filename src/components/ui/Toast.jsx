import { useEffect } from "react";

const ICONS = {
  success: "✅",
  error:   "❌",
  info:    "ℹ️",
  warning: "⚠️",
};

const COLORS = {
  success: "border-l-green-500  bg-green-50  text-green-800",
  error:   "border-l-red-500    bg-red-50    text-red-800",
  info:    "border-l-[#C9A84C]  bg-[#FDF8EE] text-[#7A5E1A]",
  warning: "border-l-orange-500 bg-orange-50 text-orange-800",
};

const Toast = ({ id, message, type = "info", onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`flex items-start gap-3 w-80 p-4 rounded-xl shadow-lg
      border border-gray-100 border-l-4 animate-[fadeUp_0.3s_ease_both]
      ${COLORS[type]}`}>

      {/* Icon */}
      <span className="text-lg shrink-0">{ICONS[type]}</span>

      {/* Message */}
      <p className="text-sm font-medium flex-1 leading-snug">{message}</p>

      {/* Close Button */}
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-gray-600 transition-colors
          duration-150 text-lg leading-none shrink-0"
      >
        ×
      </button>

    </div>
  );
};

export default Toast;