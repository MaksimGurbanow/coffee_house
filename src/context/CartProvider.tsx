import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { Cart } from "../types/types";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalPrice: 0,
    discountedTotalPrice: 0,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed &&
          Array.isArray(parsed.items) &&
          typeof parsed.totalPrice === "number" &&
          typeof parsed.discountedTotalPrice === "number"
        ) {
          setCart(parsed);
        }
      }
    } catch {
      console.warn("Failed to parse cart from localStorage");
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  const addProductToCart = useCallback(
    (product: Omit<Cart["items"][0], "uniqueId">) => {
      setCart((prev) => {
        const updatedItems = [
          ...prev.items,
          {
            ...product,
            productId: Number(product.productId),
            uniqueId: crypto.randomUUID(),
          },
        ];
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.total,
          0
        );
        const discountedTotalPrice = updatedItems.reduce(
          (sum, item) => sum + (item.discountedTotal ?? item.total),
          0
        );
        localStorage.setItem(
          "cart",
          JSON.stringify({
            items: updatedItems,
            totalPrice,
            discountedTotalPrice,
          })
        );

        return { items: updatedItems, totalPrice, discountedTotalPrice };
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      totalPrice: 0,
      discountedTotalPrice: 0,
    });
  }, []);

  const removeProductFromCart = useCallback((uniqueId: string) => {
    setCart((prev) => {
      const updatedItems = prev.items.filter(
        (item) => item.uniqueId !== uniqueId
      );

      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.total,
        0
      );
      const discountedTotalPrice = updatedItems.reduce(
        (sum, item) => sum + (item.discountedTotal ?? item.total),
        0
      );

      return { items: updatedItems, totalPrice, discountedTotalPrice };
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addProductToCart,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
