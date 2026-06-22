const QuantitySelector = ({ quantity, onIncrease, onDecrease, min = 1, max = 5 }) => {
  return (
    <div className="flex items-center gap-2">

      {/* Decrease */}
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="w-8 h-8 rounded-full border-2 border-[#E0D7C5] flex items-center
          justify-center text-[#5C5040] font-bold text-lg transition-all duration-200
          hover:border-[#C9A84C] hover:text-[#C9A84C]
          disabled:opacity-30 disabled:cursor-not-allowed"
      >
        −
      </button>

      {/* Count */}
      <div className="w-8 text-center font-bold text-[#1A160E] text-sm">
        {quantity}
      </div>

      {/* Increase */}
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-8 h-8 rounded-full border-2 border-[#E0D7C5] flex items-center
          justify-center text-[#5C5040] font-bold text-lg transition-all duration-200
          hover:border-[#C9A84C] hover:text-[#C9A84C]
          disabled:opacity-30 disabled:cursor-not-allowed"
      >
        +
      </button>

    </div>
  );
};

export default QuantitySelector;