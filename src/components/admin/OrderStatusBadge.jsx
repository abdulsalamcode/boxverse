const STATUS_CONFIG = {
  pending:   { label: "Pending",   bg: "bg-yellow-100 text-yellow-700", icon: "⏳" },
  confirmed: { label: "Confirmed", bg: "bg-blue-100   text-blue-700",   icon: "✅" },
  packed:    { label: "Packed",    bg: "bg-purple-100 text-purple-700", icon: "📦" },
  shipped:   { label: "Shipped",   bg: "bg-orange-100 text-orange-700", icon: "🚚" },
  delivered: { label: "Delivered", bg: "bg-green-100  text-green-700",  icon: "🎉" },
  cancelled: { label: "Cancelled", bg: "bg-red-100    text-red-700",    icon: "❌" },
};

const OrderStatusBadge = ({ status, onChange }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  if (!onChange) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1
        rounded-full text-xs font-semibold ${config.bg}`}>
        {config.icon} {config.label}
      </span>
    );
  }

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`text-xs font-semibold px-3 py-1.5 rounded-full
        border-none outline-none cursor-pointer ${config.bg}`}
    >
      {Object.entries(STATUS_CONFIG).map(([key, val]) => (
        <option key={key} value={key}>{val.icon} {val.label}</option>
      ))}
    </select>
  );
};

export default OrderStatusBadge;