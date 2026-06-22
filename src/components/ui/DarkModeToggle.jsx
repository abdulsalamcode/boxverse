import useDarkMode from "../../hooks/useDarkMode";

const DarkModeToggle = () => {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={`relative w-12 h-6 rounded-full transition-all duration-300
        focus:outline-none
        ${isDark ? "bg-[#C9A84C]" : "bg-[#E0D7C5]"}`}
    >
      {/* Thumb */}
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full
        flex items-center justify-center text-xs shadow-sm
        transition-all duration-300 bg-white
        ${isDark ? "translate-x-6" : "translate-x-0"}`}>
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
};

export default DarkModeToggle;