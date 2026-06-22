import { useState } from "react";

const useCart = (products = []) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (id) => {
    if (!cartItems.includes(id)) {
      setCartItems((prev) => [...prev, id]);
    }
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((x) => x !== id));
  };

  const toggleItem = (id, capacity) => {
    if (cartItems.includes(id)) {
      removeItem(id);
    } else {
      if (capacity && cartItems.length >= capacity) return;
      addItem(id);
    }
  };

  const clearCart = () => setCartItems([]);

  const isInCart = (id) => cartItems.includes(id);

  const itemsTotal = cartItems.reduce((sum, id) => {
    const product = products.find((p) => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  const itemCount = cartItems.length;

  return {
    cartItems,
    addItem,
    removeItem,
    toggleItem,
    clearCart,
    isInCart,
    itemsTotal,
    itemCount,
  };
};

export default useCart;