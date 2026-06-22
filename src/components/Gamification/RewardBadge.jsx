const RewardBadge = ({ badge, earned = false, size = "md" }) => {

  const sizes = {
    sm: { wrap: "w-16 h-16", emoji: "text-2xl", label: "text-[9px]" },
    md: { wrap: "w-24 h-24", emoji: "text-4xl", label: "text-xs"    },
    lg: { wrap: "w-32 h-32", emoji: "text-5xl", label: "text-sm"    },
  };

  const s = sizes[size];

  return (
    <div className="flex flex-col items-center gap-2">

      {/* Badge Circle */}
      <div className={`${s.wrap} rounded-full flex items-center justify-center
        border-2 transition-all duration-300 relative
        ${earned
          ? "bg-[#F2DFA0] border-[#C9A84C] shadow-[0_0_16px_rgba(201,168,76,0.3)]"
          : "bg-[#F5F0E8] border-[#E0D7C5] grayscale opacity-50"
        }`}>

        <span className={s.emoji}>{badge.emoji}</span>

        {/* Earned Checkmark */}
        {earned && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500
            rounded-full flex items-center justify-center text-white text-xs">
            ✓
          </div>
        )}
      </div>

      {/* Label */}
      <div className="text-center">
        <p className={`${s.label} font-semibold text-[#1A160E] leading-tight`}>
          {badge.title}
        </p>
        {!earned && (
          <p className="text-[9px] text-[#A8957B] mt-0.5">Locked 🔒</p>
        )}
      </div>

    </div>
  );
};

export default RewardBadge;