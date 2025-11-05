import { useEffect, useState } from "react";
import MenuContent from "./offer/Offer";
import ProductModal from "./productModal/ProductModal";
import type { Product } from "../../types/types";
import Loader from "../../shared/components/loader/Loader";
import Error from "../../shared/components/error/Error";
import { getProductByID } from "../../api";

const Menu = () => {
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itemInfo, setItemInfo] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId) {
      setItemInfo(null);
      return;
    }

    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const product = await getProductByID(productId, signal);
        setItemInfo(product);
        setError("");
      } catch {
        setError("Failed to load product. Please try again.");
        setProductId("");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      abortController.abort();
    };
  }, [productId]);

  const closeModal = () => {
    setProductId("");
  };

  useEffect(() => {
    setTimeout(() => setError(""), 5000);
  });
  return (
    <>
      <MenuContent setProductId={setProductId} />
      {itemInfo && <ProductModal product={itemInfo} onClose={closeModal} />}
      {loading && <Loader modal />}
      {error && <Error message={error} toast />}
    </>
  );
};

export default Menu;
