const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error = "",
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-xs font-semibold text-[#5C5040]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-[#FAF7F0] border rounded-lg px-3 py-2.5 text-sm text-[#1A160E] outline-none transition-all duration-200
          focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20
          ${error ? "border-red-400" : "border-[#E0D7C5]"}`}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Input;