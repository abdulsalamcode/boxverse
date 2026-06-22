import { useWishlist } from "../../hooks/useWishlist";
import WishlistButton  from "./WishlistButton";
import Badge           from "../common/Badge";

const Wishlist = ({ products, onAddToBox }) => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">❤️</span>
          <h3 className="font-serif text-lg font-bold text-[#1A160E]">
            Wishlist
          </h3>
        </div>
        <Badge label={`${wishlistProducts.length} items`} variant="default" />
      </div>

      {/* Empty State */}
      {wishlistProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <span className="text-4xl">🤍</span>
          <p className="text-sm text-[#A8957B] text-center">
            No saved items yet — tap the heart on any product!
          </p>
        </div>
      )}

      {/* Wishlist Items */}
      <div className="flex flex-col gap-3">
        {wishlistProducts.map((product) => (
          <div key={product.id}
            className="flex items-center gap-3 p-3 bg-[#FAF7F0]
              rounded-xl border border-[#EDE5D4]">

            {/* Emoji */}
            <span className="text-3xl">{product.emoji}</span>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A160E] truncate">
                {product.name}
              </p>
              <p className="text-xs text-[#A8957B]">${product.price}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onAddToBox(product.id)}
                className="text-xs bg-[#C9A84C] text-[#1A160E] font-semibold
                  px-3 py-1.5 rounded-full hover:opacity-85
                  transition-all duration-200"
              >
                + Add
              </button>
              <WishlistButton productId={product.id} size="sm" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Wishlist;