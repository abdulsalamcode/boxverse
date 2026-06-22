import { useWishlist } from "../../hooks/useWishlist";

const WishlistButton = ({ productId, size = "md" }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const saved = isWishlisted(productId);

  const sizes = {
    sm: "w-6 h-6 text-sm",
    md: "w-8 h-8 text-base",
    lg: "w-10 h-10 text-lg",
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={`${sizes[size]} rounded-full flex items-center justify-center
        transition-all duration-200 hover:scale-110 active:scale-95
        ${saved
          ? "bg-red-50 text-red-400 border border-red-200"
          : "bg-[#F5F0E8] text-[#A8957B] border border-[#E0D7C5]"
        }`}
    >
      {saved ? "❤️" : "🤍"}
    </button>
  );
};

export default WishlistButton;