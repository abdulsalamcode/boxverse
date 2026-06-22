import { useState } from "react";
import { usePromoCode } from "../../hooks/usePromoCode";

const PromoCode = ({ onApply }) => {
  const [code, setCode]       = useState("");
  const [focused, setFocused] = useState(false);
  const { validate, applied, discount, error, reset } = usePromoCode();

  const handleApply = () => {
    const result = validate(code.trim().toUpperCase());
    if (result) onApply(result.discount);
  };

  const handleRemove = () => {
    reset();
    setCode("");
    onApply(0);
  };

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-5">

      <h3 className="font-serif text-base font-bold text-[#1A160E] mb-4">
        🏷️ Promo Code
      </h3>

      {/* Applied State */}
      {applied ? (
        <div className="flex items-center justify-between bg-green-50
          border border-green-200 rounded-xl px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-green-700">
              ✅ Code Applied!
            </p>
            <p className="text-xs text-green-600">
              {discount}% off your order
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="text-xs text-red-400 hover:text-red-600
              font-medium transition-colors duration-200"
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          {/* Input Row */}
          <div className="flex gap-2">
            <div className={`flex-1 flex items-center border-2 rounded-xl
              px-3 py-2 transition-all duration-200
              ${focused
                ? "border-[#C9A84C]"
                : error
                ? "border-red-300"
                : "border-[#E0D7C5]"
              }`}>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onFocus={() => setFocused(true)}
                onBlur={()  => setFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
                placeholder="Enter code e.g. BOXVERSE20"
                className="flex-1 bg-transparent text-sm text-[#1A160E]
                  placeholder:text-[#C5B89A] outline-none tracking-widest"
              />
            </div>
            <button
              onClick={handleApply}
              disabled={!code.trim()}
              className="bg-[#1A160E] text-[#C9A84C] text-sm font-semibold
                px-4 rounded-xl hover:opacity-85 transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-400 mt-2">❌ {error}</p>
          )}

          {/* Hint */}
          <p className="text-xs text-[#A8957B] mt-2">
            Try: <span className="font-mono font-semibold">BOXVERSE20</span> or{" "}
            <span className="font-mono font-semibold">FIRST10</span>
          </p>
        </>
      )}

    </div>
  );
};

export default PromoCode;