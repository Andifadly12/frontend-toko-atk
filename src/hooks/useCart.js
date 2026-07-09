import { useState } from "react";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = product => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map(item =>
        item.id === product.id
          ? {
              ...item,
              qty: item.qty + 1,
              subtotal: (item.qty + 1) * item.selling_price,
            }
          : item,
      );

      setCartItems(updatedCart);
    } else {
      const newItem = {
        ...product,
        qty: 1,
        subtotal: product.selling_price,
      };

      setCartItems([newItem, ...cartItems]);
    }
  };

  const increaseQty = id => {
    const updatedCart = cartItems.map(item =>
      item.id === id
        ? {
            ...item,
            qty: item.qty + 1,
            subtotal: (item.qty + 1) * item.selling_price,
          }
        : item,
    );

    setCartItems(updatedCart);
  };

  const decreaseQty = id => {
    const updatedCart = cartItems
      .map(item =>
        item.id === id
          ? {
              ...item,
              qty: item.qty - 1,
              subtotal: (item.qty - 1) * item.selling_price,
            }
          : item,
      )
      .filter(item => item.qty > 0);

    setCartItems(updatedCart);
  };

  const removeFromCart = id => {
    const filteredCart = cartItems.filter(item => item.id !== id);
    setCartItems(filteredCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.subtotal,
    0,
  );

  return {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  };
};

export default useCart;
