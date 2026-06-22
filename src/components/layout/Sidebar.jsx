import Button from "../common/Button";
import Badge from "../common/Badge";

const Sidebar = ({ selectedBox, cartItems, products, onRemove, onCheckout }) => {
  const itemsTotal = cartItems.reduce((sum, id) => {
    const product = products.find((p) => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  const grandTotal = selectedBox ? itemsTotal + selectedBox.price : 0;
  const filled = cartItems.length;
  const capacity = selectedBox?.capacity || 0;
  const pct = capacity > 0 ? Math.min((filled / capacity) * 100, 100) : 0;
  const isFull = filled >= capacity;

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-5 sticky top-24 w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold text-[#1A160E]">Your Box</h3>
        <Badge label={`${filled}/${capacity}`} variant="count" />
      </div>

      {/* Capacity Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-[#A8957B] mb-1.5">
          <span>Capacity</span>
          <span>{filled}/{capacity} items</span>
        </div>
        <div className="h-1.5 bg-[#F5F0E8] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isFull ? "bg-red-400" : "bg-[#C9A84C]"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        {isFull && (
          <p className="text-xs text-red-400 mt-1">📦 Box is full!</p>
        )}
      </div>

      {/* Box Visual — Item Chips */}
      <div className="border-2 border-dashed border-[#E0D7C5] rounded-xl min-h-[110px] flex flex-wrap gap-2 items-start content-start p-3 bg-[#FAF7F0] mb-4">
        {filled === 0 ? (
          <div className="w-full flex items-center justify-center min-h-[80px]">
            <p className="text-xs text-[#A8957B] text-center">
              ✦ Your box is empty<br />Add items to see them here
            </p>
          </div>
        ) : (
          cartItems.map((id) => {
            const product = products.find((p) => p.id === id);
            return (
              <div key={id}
                className="flex items-center gap-1.5 bg-white border border-[#E0D7C5] rounded-lg px-2.5 py-1.5 text-xs text-[#5C5040]">
                <span className="text-lg">{product?.emoji}</span>
                <span className="max-w-[80px] truncate">{product?.name.split(" ").slice(0, 2).join(" ")}</span>
                <button
                  onClick={() => onRemove(id)}
                  className="text-[#A8957B] hover:text-red-400 transition-colors duration-150 ml-1 text-sm leading-none">
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Price Breakdown */}
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex justify-between text-sm text-[#5C5040] py-1.5 border-b border-[#F0E8D5]">
          <span>{selectedBox?.name || "No box selected"}</span>
          <span>${selectedBox?.price?.toFixed(2) || "0.00"}</span>
        </div>
        {cartItems.map((id) => {
          const product = products.find((p) => p.id === id);
          return (
            <div key={id} className="flex justify-between text-sm text-[#5C5040] py-1.5 border-b border-[#F0E8D5]">
              <span className="truncate max-w-[160px]">{product?.name.split(" ").slice(0, 3).join(" ")}</span>
              <span>${product?.price}</span>
            </div>
          );
        })}
        <div className="flex justify-between text-sm font-bold text-[#1A160E] py-1.5 mt-1">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* CTA */}
      <Button
        label="Review & Ship →"
        variant="primary"
        disabled={filled === 0}
        onClick={onCheckout}
      />

      <div className="text-center mt-3">
        <button className="text-xs text-[#A8957B] hover:text-[#1A160E] transition-colors duration-200">
          ← Change container
        </button>
      </div>

    </div>
  );
};

export default Sidebar;