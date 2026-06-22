const ProductCard = ({ product, inBox, onToggle, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-200 border-[1.5px] hover:-translate-y-1 hover:shadow-lg
        ${inBox
          ? "border-[#C9A84C] shadow-[0_0_0_3px_rgba(201,168,76,0.15)]"
          : "border-[#EDE5D4] hover:border-[#F2DFA0]"
        }`}
    >
      {/* Thumbnail */}
      <div className="relative h-28 bg-[#FAF7F0] flex items-center justify-center text-5xl">
        {product.emoji}
        {inBox && (
          <div className="absolute inset-0 bg-[#C9A84C]/15 flex items-center justify-center">
            <div className="w-8 h-8 bg-[#C9A84C] rounded-full flex items-center
              justify-center animate-[popIn_0.2s_ease_both]">
              <svg className="w-4 h-4 text-[#1A160E]" fill="none"
                stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="text-sm font-semibold text-[#1A160E] leading-snug mb-0.5">
          {product.name}
        </h4>
        <p className="text-xs text-[#A8957B] mb-3">{product.brand}</p>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-[#1A160E]">${product.price}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(product.id);
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center
              text-lg font-bold transition-all duration-200 hover:scale-110
              border-none outline-none
              ${inBox ? "bg-red-400 text-white" : "bg-[#C9A84C] text-[#1A160E]"}`}
          >
            {inBox ? "−" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;