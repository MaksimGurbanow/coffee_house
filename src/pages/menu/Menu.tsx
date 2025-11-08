import { useEffect, useState } from "react";
import MenuContent from "./offer/Offer";
import ProductModal from "./productModal/ProductModal";
import type { Product } from "../../types/types";
import Loader from "../../shared/components/loader/Loader";
import Error from "../../shared/components/error/Error";
import { getProductByID } from "../../api";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itemInfo, setItemInfo] = useState<Product | null>(null);
  const { t } = useTranslation();

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
        setError(t("load_error"));
        setProductId("");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      abortController.abort();
    };
  }, [productId, t]);

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
