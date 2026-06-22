import { useState }      from "react";
import OrderHistoryCard  from "./OrderHistoryCard";
import { SkeletonGrid }  from "../ui/SkeletonCard";

const MOCK_ORDERS = [
  {
    id:          "BV-X7K2P1",
    date:        "June 10, 2024",
    box:         { name: "Signature Vault", emoji: "🎁" },
    items:       ["🕯️", "✨", "🍵", "📒", "🍯", "🧖"],
    total:       89.93,
    status:      "delivered",
  },
  {
    id:          "BV-M3R9T4",
    date:        "May 28, 2024",
    box:         { name: "Petite Chest", emoji: "📦" },
    items:       ["🧼", "🫙", "✒️", "🔌"],
    total:       42.98,
    status:      "shipped",
  },
  {
    id:          "BV-Q5W8L6",
    date:        "May 15, 2024",
    box:         { name: "Grand Edition", emoji: "🏛️" },
    items:       ["🕯️", "✨", "🍵", "📒", "🍯", "🎧", "🧖", "⌨️", "🧼", "🫙"],
    total:       241.98,
    status:      "confirmed",
  },
];

const OrderHistory = () => {
  const [loading] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-[#1A160E] mb-1">
          Order History
        </h2>
        <p className="text-sm text-[#A8957B]">
          All your BoxVerse creations in one place.
        </p>
      </div>

      {/* Loading */}
      {loading && <SkeletonGrid count={3} type="order" />}

      {/* Empty */}
      {!loading && MOCK_ORDERS.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <span className="text-5xl">📭</span>
          <p className="text-sm text-[#A8957B] text-center">
            No orders yet — start building your first box!
          </p>
        </div>
      )}

      {/* Orders */}
      {!loading && (
        <div className="flex flex-col gap-4">
          {MOCK_ORDERS.map((order) => (
            <OrderHistoryCard key={order.id} order={order} />
          ))}
        </div>
      )}

    </div>
  );
};

export default OrderHistory;