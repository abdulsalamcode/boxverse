import { create } from "zustand";

const useWishlistStore = create((set, get) => ({
  wishlist: JSON.parse(localStorage.getItem("bv_wishlist") || "[]"),

  toggleWishlist: (id) => {
    const { wishlist } = get();
    const updated = wishlist.includes(id)
      ? wishlist.filter((x) => x !== id)
      : [...wishlist, id];
    localStorage.setItem("bv_wishlist", JSON.stringify(updated));
    set({ wishlist: updated });
  },

  addToWishlist: (id) => {
    const { wishlist } = get();
    if (!wishlist.includes(id)) {
      const updated = [...wishlist, id];
      localStorage.setItem("bv_wishlist", JSON.stringify(updated));
      set({ wishlist: updated });
    }
  },

  removeFromWishlist: (id) => {
    const updated = get().wishlist.filter((x) => x !== id);
    localStorage.setItem("bv_wishlist", JSON.stringify(updated));
    set({ wishlist: updated });
  },

  isWishlisted: (id) => get().wishlist.includes(id),

  clearWishlist: () => {
    localStorage.removeItem("bv_wishlist");
    set({ wishlist: [] });
  },
}));

export const useWishlist = () => useWishlistStore();
export default useWishlistStore;