const Badge = ({ label, variant = "default" }) => {
  const variants = {
    default:  "bg-[#F0E8D5] text-[#6B4E22]",
    gold:     "bg-[#C9A84C] text-[#1A160E]",
    dark:     "bg-[#1A160E] text-[#C9A84C]",
    green:    "bg-green-100 text-green-700",
    popular:  "bg-[#C9A84C] text-[#1A160E] uppercase tracking-widest text-[10px]",
    count:    "bg-[#C9A84C] text-[#1A160E] font-bold",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium
        ${variants[variant]}`}
    >
      {label}
    </span>
  );
};

export default Badge;