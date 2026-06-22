import usePoints from "../../hooks/usePoints";

const PointsDisplay = ({ compact = false }) => {
  const { points, level } = usePoints();

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 bg-[#F2DFA0] text-[#7A5E1A]
        px-3 py-1 rounded-full">
        <span className="text-sm">⭐</span>
        <span className="text-xs font-bold">{points} pts</span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold text-[#1A160E]">
          Your Points
        </h3>
        <span className="text-2xl">⭐</span>
      </div>

      {/* Points Big Display */}
      <div className="text-center py-4">
        <div className="font-serif text-5xl font-black text-[#C9A84C] mb-1">
          {points.toLocaleString()}
        </div>
        <div className="text-xs text-[#A8957B] uppercase tracking-widest">
          BoxVerse Points
        </div>
      </div>

      {/* Level Badge */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="text-lg">{level.emoji}</span>
        <span className="text-sm font-semibold text-[#1A160E]">
          {level.title}
        </span>
      </div>

    </div>
  );
};

export default PointsDisplay;