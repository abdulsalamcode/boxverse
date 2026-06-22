const Button = ({ label, onClick, disabled = false, variant = "primary" }) => {
  const base =
    "px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#C9A84C] text-[#1A160E] hover:opacity-85 active:scale-95",
    outline: "bg-transparent border-2 border-[#1A160E] text-[#1A160E] hover:bg-[#1A160E] hover:text-[#C9A84C]",
    ghost:   "bg-transparent text-[#5C5040] hover:text-[#1A160E] hover:bg-[#F5F0E8]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {label}
    </button>
  );
};

export default Button;