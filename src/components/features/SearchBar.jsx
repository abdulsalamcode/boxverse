import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [query, setQuery]     = useState("");
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className={`flex items-center gap-2 bg-white border-2 rounded-xl
      px-4 py-2.5 transition-all duration-200 w-full
      ${focused
        ? "border-[#C9A84C] shadow-[0_0_0_3px_rgba(201,168,76,0.15)]"
        : "border-[#E0D7C5]"
      }`}>

      {/* Search Icon */}
      <svg
        className="w-4 h-4 text-[#A8957B] shrink-0"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={()  => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-[#1A160E]
          placeholder:text-[#C5B89A] outline-none"
      />

      {/* Clear Button */}
      {query && (
        <button
          onClick={handleClear}
          className="text-[#A8957B] hover:text-[#1A160E] transition-colors
            duration-150 text-lg leading-none shrink-0"
        >
          ×
        </button>
      )}

    </div>
  );
};

export default SearchBar;