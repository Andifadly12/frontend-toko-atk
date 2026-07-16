import { useState } from "react";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const getPrice = product => {
    return Number(product.selling_price || product.price || 0);
  };

  const addToCart = product => {
    const price = getPrice(product);

    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map(item => {
        if (item.id === product.id) {
          const newQty = Number(item.qty || 0) + 1;

          return {
            ...item,
            qty: newQty,
            selling_price: Number(item.selling_price || 0),
            subtotal: newQty * Number(item.selling_price || 0),
          };
        }

        return item;
      });

      setCartItems(updatedCart);
    } else {
      const newItem = {
        ...product,
        selling_price: price,
        qty: 1,
        subtotal: price,
      };

      setCartItems([newItem, ...cartItems]);
    }
  };

  const increaseQty = id => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const price = Number(item.selling_price || 0);
        const newQty = Number(item.qty || 0) + 1;

        return {
          ...item,
          qty: newQty,
          subtotal: newQty * price,
        };
      }

      return item;
    });

    setCartItems(updatedCart);
  };

  const decreaseQty = id => {
    const updatedCart = cartItems
      .map(item => {
        if (item.id === id) {
          const price = Number(item.selling_price || 0);
          const newQty = Number(item.qty || 0) - 1;

          return {
            ...item,
            qty: newQty,
            subtotal: newQty * price,
          };
        }

        return item;
      })
      .filter(item => item.qty > 0);

    setCartItems(updatedCart);
  };

  const removeFromCart = id => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((total, item) => {
    return total + Number(item.qty || 0);
  }, 0);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + Number(item.subtotal || 0);
  }, 0);

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
