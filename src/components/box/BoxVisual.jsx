import { useEffect, useState } from "react";

const ItemChip = ({ product, onRemove }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center gap-1.5 bg-white border border-[#E0D7C5] rounded-lg
        px-2.5 py-1.5 text-xs text-[#5C5040] transition-all duration-200
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
    >
      <span className="text-lg">{product.emoji}</span>
      <span className="max-w-[80px] truncate">
        {product.name.split(" ").slice(0, 2).join(" ")}
      </span>
      <button
        onClick={() => onRemove(product.id)}
        className="text-[#A8957B] hover:text-red-400 transition-colors duration-150 ml-1 text-sm leading-none"
      >
        ×
      </button>
    </div>
  );
};

const BoxVisual = ({ cartItems, products, onRemove }) => {
  return (
    <div className="border-2 border-dashed border-[#E0D7C5] rounded-xl min-h-[120px] bg-[#FAF7F0] p-3">

      {cartItems.length === 0 ? (

        /* Empty State */
        <div className="flex flex-col items-center justify-center min-h-[96px] gap-2">
          <span className="text-2xl">📦</span>
          <p className="text-xs text-[#A8957B] text-center leading-relaxed">
            ✦ Your box is empty<br />
            Add items to see them here
          </p>
        </div>

      ) : (

        /* Filled State — Chip Grid */
        <div className="flex flex-wrap gap-2 content-start">
          {cartItems.map((id) => {
            const product = products.find((p) => p.id === id);
            if (!product) return null;
            return (
              <ItemChip
                key={id}
                product={product}
                onRemove={onRemove}
              />
            );
          })}
        </div>

      )}

    </div>
  );
};

export default BoxVisual;