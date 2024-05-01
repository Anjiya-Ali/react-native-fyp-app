import CartContext from "./cartContext";
import React, { useState } from "react";

const CartState = (props) => {
  const [cart, setCart] = useState([]);

  const addToCart = (courseId) => {
    if (!cart.includes(courseId)) {
        setCart([...cart, courseId]);
    }
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter((id) => id !== courseId));
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
