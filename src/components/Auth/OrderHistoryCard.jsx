import Badge from "../common/Badge";

const STATUS_CONFIG = {
  pending:   { label: "Pending",   color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmed", color: "bg-blue-100   text-blue-700"   },
  packed:    { label: "Packed",    color: "bg-purple-100 text-purple-700" },
  shipped:   { label: "Shipped",   color: "bg-orange-100 text-orange-700" },
  delivered: { label: "Delivered", color: "bg-green-100  text-green-700"  },
  cancelled: { label: "Cancelled", color: "bg-red-100    text-red-700"    },
};

const OrderHistoryCard = ({ order }) => {
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-5
      hover:shadow-md transition-all duration-200">

      {/* Top Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{order.box.emoji}</span>
          <div>
            <p className="text-sm font-semibold text-[#1A160E]">
              {order.box.name}
            </p>
            <p className="text-xs text-[#A8957B]">#{order.id}</p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`text-xs font-semibold px-3 py-1 rounded-full
          ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Items Emoji Row */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {order.items.map((emoji, i) => (
          <span key={i}
            className="w-8 h-8 bg-[#FAF7F0] rounded-lg flex items-center
              justify-center text-lg border border-[#EDE5D4]">
            {emoji}
          </span>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between pt-3
        border-t border-[#F0E8D5]">
        <p className="text-xs text-[#A8957B]">{order.date}</p>
        <p className="text-sm font-bold text-[#1A160E] font-serif">
          ${order.total.toFixed(2)}
        </p>
      </div>

    </div>
  );
};

export default OrderHistoryCard;