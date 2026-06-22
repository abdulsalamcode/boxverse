const StatCard = ({ icon, label, value, change, color = "gold" }) => {

  const colors = {
    gold:  "bg-[#F2DFA0] text-[#7A5E1A]",
    green: "bg-green-100  text-green-700",
    blue:  "bg-blue-100   text-blue-700",
    red:   "bg-red-100    text-red-700",
  };

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-5
      hover:shadow-md transition-all duration-200">

      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center
        text-xl mb-4 ${colors[color]}`}>
        {icon}
      </div>

      {/* Value */}
      <div className="font-serif text-3xl font-black text-[#1A160E] mb-1">
        {value}
      </div>

      {/* Label */}
      <div className="text-sm text-[#A8957B] mb-2">{label}</div>

      {/* Change */}
      {change && (
        <div className={`text-xs font-semibold
          ${change > 0 ? "text-green-600" : "text-red-400"}`}>
          {change > 0 ? "↑" : "↓"} {Math.abs(change)}% this month
        </div>
      )}

    </div>
  );
};

export default StatCard;