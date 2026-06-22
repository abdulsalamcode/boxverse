import { useState } from "react";

const DragDropBox = ({ cartItems, products, onRemove, capacity }) => {
  const [dragOver, setDragOver] = useState(false);
  const [draggingId, setDraggingId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setDraggingId(null);
  };

  const handleDragEnd = () => setDraggingId(null);

  const filled  = cartItems.length;
  const pct     = capacity > 0 ? Math.min((filled / capacity) * 100, 100) : 0;
  const isFull  = filled >= capacity;

  return (
    <div className="w-full">

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl min-h-[160px] p-4
          transition-all duration-300 flex flex-wrap gap-2
          content-start items-start
          ${dragOver
            ? "border-[#C9A84C] bg-[#FDF8EE] scale-[1.01]"
            : "border-[#E0D7C5] bg-[#FAF7F0]"
          }`}
      >
        {/* Empty State */}
        {filled === 0 && (
          <div className="w-full flex flex-col items-center justify-center
            min-h-[120px] gap-2">
            <span className="text-4xl">📦</span>
            <p className="text-xs text-[#A8957B] text-center">
              Drag products here to fill your box
            </p>
          </div>
        )}

        {/* Item Chips — Draggable */}
        {cartItems.map((id) => {
          const product = products.find((p) => p.id === id);
          return (
            <div
              key={id}
              draggable
              onDragStart={(e) => handleDragStart(e, id)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-2 bg-white border border-[#E0D7C5]
                rounded-xl px-3 py-2 text-xs text-[#5C5040] cursor-grab
                active:cursor-grabbing transition-all duration-200
                hover:border-[#C9A84C] hover:shadow-sm
                ${draggingId === id ? "opacity-40 scale-95" : "opacity-100"}`}
            >
              <span className="text-xl">{product?.emoji}</span>
              <span className="font-medium">
                {product?.name.split(" ").slice(0, 2).join(" ")}
              </span>
              <button
                onClick={() => onRemove(id)}
                className="ml-1 text-[#A8957B] hover:text-red-400
                  transition-colors duration-150 text-sm"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {/* Capacity Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-[#A8957B] mb-1.5">
          <span>{filled}/{capacity} items</span>
          <span className={isFull ? "text-red-400 font-medium" : ""}>
            {isFull ? "📦 Box Full!" : `${capacity - filled} slots left`}
          </span>
        </div>
        <div className="h-1.5 bg-[#F5F0E8] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500
              ${isFull ? "bg-red-400" : "bg-[#C9A84C]"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

    </div>
  );
};

export default DragDropBox;