import { useEffect, useState, useCallback } from "react";
import type { CardProduct, Category } from "../types/types";
import { useWidthObserver } from "./useWidthObserver";
import { getProducts } from "../api";

export const useProducts = () => {
  const [products, setProducts] = useState<CardProduct[]>([]);
  const [maxProductsToShow, setMaxProductsToShow] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>("coffee");
  const { ref } = useWidthObserver();

  const updateMaxProductsToShow = useCallback(() => {
    const width = window.innerWidth;
    setMaxProductsToShow(width < 768 ? 4 : width < 1200 ? 6 : 8);
  }, []);

  useEffect(() => {
    updateMaxProductsToShow();
    window.addEventListener("resize", updateMaxProductsToShow);
    return () => window.removeEventListener("resize", updateMaxProductsToShow);
  }, [updateMaxProductsToShow]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        if (isMounted) {
          setProducts(response);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("Something went wrong. Please refresh the page.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return {
    ref,
    products: filteredProducts,
    maxProductsToShow,
    loading,
    error,
    category,
    setCategory,
  };
};

export default useProducts;
