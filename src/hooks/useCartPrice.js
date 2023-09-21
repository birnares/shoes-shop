import { useContext } from "react";
import { DataContext } from "../App";
export const useCartPrice = () => {
  const { cartItems, setCartItems } = useContext(DataContext);
  const cartPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return { cartItems, setCartItems, cartPrice };
};
