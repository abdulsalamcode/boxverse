import Badge from "../common/Badge";

const BoxCard = ({ box, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(box)}
      className={`relative bg-white rounded-2xl p-5 cursor-pointer transition-all duration-200
        border-2 hover:shadow-lg hover:-translate-y-1
        ${isSelected
          ? "border-[#C9A84C] shadow-[0_0_0_4px_rgba(201,168,76,0.15)]"
          : "border-[#EDE5D4] hover:border-[#F2DFA0]"
        }`}
    >

      {/* Popular Badge */}
      {box.popular && (
        <div className="absolute top-3 right-3">
          <Badge label="⭐ Most Popular" variant="popular" />
        </div>
      )}

      {/* Checkmark Overlay */}
      {isSelected && (
        <div className="absolute top-3 left-3 w-6 h-6 bg-[#C9A84C] rounded-full flex items-center justify-center
          animate-[popIn_0.2s_ease]">
          <svg className="w-3 h-3 text-[#1A160E]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Emoji */}
      <div className="text-5xl mb-4">{box.emoji}</div>

      {/* Name */}
      <h3 className="font-serif text-lg font-bold text-[#1A160E] mb-1">
        {box.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-[#5C5040] leading-relaxed mb-4">
        {box.desc}
      </p>

      {/* Dimension Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {box.dims.map((dim) => (
          <Badge key={dim} label={dim} variant="default" />
        ))}
      </div>

      {/* Price */}
      <div className="text-xl font-bold text-[#1A160E]">
        ${box.price.toFixed(2)}
        <span className="text-xs font-normal text-[#A8957B] ml-1">/ box</span>
      </div>

    </div>
  );
};

export default BoxCard;