import usePoints from "../../hooks/usePoints";

const ProgressBar = () => {
  const { points, level, nextLevel, progress } = usePoints();

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-5">

      {/* Level Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{level.emoji}</span>
          <div>
            <p className="text-sm font-bold text-[#1A160E]">{level.title}</p>
            <p className="text-xs text-[#A8957B]">Current Level</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-[#1A160E]">{nextLevel.title}</p>
          <p className="text-xs text-[#A8957B]">Next Level</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-[#F5F0E8] rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-[#C9A84C] to-[#F2DFA0]
            rounded-full transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Points Info */}
      <div className="flex items-center justify-between text-xs text-[#A8957B]">
        <span>{points} pts</span>
        <span>{nextLevel.required} pts needed</span>
      </div>

      {/* Motivational Text */}
      <div className="mt-3 text-center">
        <p className="text-xs text-[#5C5040]">
          {nextLevel.required - points > 0
            ? `${nextLevel.required - points} more points to reach ${nextLevel.title} ${nextLevel.emoji}`
            : "You've reached the top! 🏆"}
        </p>
      </div>

    </div>
  );
};

export default ProgressBar;