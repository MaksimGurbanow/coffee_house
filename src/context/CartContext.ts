import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react";
import type { Cart } from "../types/types";

export type CartContextType = {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
  addProductToCart: (product: Omit<Cart["items"][0], "uniqueId">) => void;
  removeProductFromCart: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cart: { items: [], totalPrice: 0, discountedTotalPrice: 0 },
  setCart: () => {
    throw new Error("Context not provided");
  },
  addProductToCart: () => {
    throw new Error("Context not provided");
  },
  removeProductFromCart: () => {
    throw new Error("Context not provided");
  },
  clearCart: () => {
    throw new Error("Context not provided");
  },
});

export const useCartContext = () => useContext(CartContext);
