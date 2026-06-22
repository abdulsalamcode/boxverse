import { create } from "zustand";

const useBoxStore = create((set, get) => ({

  // ── State ──
  selectedBox: null,
  cartItems:   [],
  step:        1,

  // ── Box Actions ──
  selectBox: (box) => set({ selectedBox: box }),

  clearBox: () => set({ selectedBox: null }),

  // ── Cart Actions ──
  addItem: (id) => {
    const { cartItems, selectedBox } = get();
    if (cartItems.includes(id)) return;
    if (selectedBox && cartItems.length >= selectedBox.capacity) return;
    set({ cartItems: [...cartItems, id] });
  },

  removeItem: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((x) => x !== id),
    }));
  },

  toggleItem: (id) => {
    const { cartItems, selectedBox } = get();
    if (cartItems.includes(id)) {
      set({ cartItems: cartItems.filter((x) => x !== id) });
    } else {
      if (selectedBox && cartItems.length >= selectedBox.capacity) return;
      set({ cartItems: [...cartItems, id] });
    }
  },

  clearCart: () => set({ cartItems: [] }),

  // ── Step Actions ──
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),

  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  goToStep: (n) => set({ step: n }),

  // ── Reset Everything ──
  resetAll: () => set({ selectedBox: null, cartItems: [], step: 1 }),

  // ── Derived Values ──
  getItemsTotal: (products) => {
    const { cartItems } = get();
    return cartItems.reduce((sum, id) => {
      const product = products.find((p) => p.id === id);
      return sum + (product?.price || 0);
    }, 0);
  },

  getGrandTotal: (products) => {
    const { selectedBox } = get();
    const itemsTotal = get().getItemsTotal(products);
    return selectedBox ? itemsTotal + selectedBox.price : 0;
  },

  isFull: () => {
    const { cartItems, selectedBox } = get();
    return selectedBox ? cartItems.length >= selectedBox.capacity : false;
  },

  remainingSlots: () => {
    const { cartItems, selectedBox } = get();
    return selectedBox ? selectedBox.capacity - cartItems.length : 0;
  },

  isInCart: (id) => {
    return get().cartItems.includes(id);
  },

}));

export default useBoxStore;