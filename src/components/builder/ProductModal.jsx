import { useEffect } from "react";
import Button from "../common/Button";
import Badge  from "../common/Badge";

const ProductModal = ({ product, inBox, onToggle, onClose }) => {

  // ── Close on Escape ──
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!product) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
          animate-[fadeUp_0.2s_ease_both]"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md
          animate-[popIn_0.3s_ease_both] relative">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full
              bg-[#F5F0E8] hover:bg-[#EDE5D4] flex items-center justify-center
              text-[#5C5040] hover:text-[#1A160E] transition-all duration-200"
          >
            ×
          </button>

          {/* Product Emoji */}
          <div className="h-40 bg-[#FAF7F0] rounded-t-2xl flex items-center
            justify-center text-7xl">
            {product.emoji}
          </div>

          {/* Content */}
          <div className="p-6">

            {/* Category Badge */}
            <div className="mb-3">
              <Badge label={product.cat} variant="default" />
            </div>

            {/* Name */}
            <h2 className="font-serif text-2xl font-bold text-[#1A160E] mb-1">
              {product.name}
            </h2>

            {/* Brand */}
            <p className="text-sm text-[#A8957B] mb-4">by {product.brand}</p>

            {/* Description */}
            <p className="text-sm text-[#5C5040] leading-relaxed mb-6">
              {product.description ||
                `A carefully curated ${product.cat} product from ${product.brand}. 
                Hand-selected to bring joy, quality, and intention to your BoxVerse experience.`}
            </p>

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold font-serif text-[#1A160E]">
                  ${product.price}
                </div>
                <div className="text-xs text-[#A8957B]">per item</div>
              </div>
              <Button
                label={inBox ? "Remove from Box" : "Add to Box ✦"}
                variant={inBox ? "outline" : "primary"}
                onClick={() => { onToggle(product.id); onClose(); }}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;