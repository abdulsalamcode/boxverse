const FILTERS = [
  { label: "All Items",  value: "all" },
  { label: "Self-Care",  value: "self-care" },
  { label: "Artisan",    value: "artisan" },
  { label: "Tech",       value: "tech" },
  { label: "Lifestyle",  value: "lifestyle" },
];

const Filters = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.value;
        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border
              transition-all duration-200 cursor-pointer
              ${isActive
                ? "bg-[#1A160E] text-[#C9A84C] border-[#1A160E]"
                : "bg-white text-[#5C5040] border-[#E0D7C5] hover:border-[#C9A84C] hover:text-[#7A5E1A]"
              }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default Filters;