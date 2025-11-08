import {
  lazy,
  Suspense,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import classes from "./Offer.module.scss";
import cn from "classnames";
import RefressIcon from "../../../assets/refresh-btn.svg?react";
import useProducts from "../../../hooks/useProducts";
import Loader from "../../../shared/components/loader/Loader";
import Error from "../../../shared/components/error/Error";
import { Trans, useTranslation } from "react-i18next";

const ProductItem = lazy(() => import("../productItem/ProductItem.tsx"));

const Offer = ({
  setProductId,
}: {
  setProductId: Dispatch<SetStateAction<string>>;
}) => {
  const { products, maxProductsToShow, loading, error, setCategory, category } =
    useProducts();
  const [visibleCount, setVisibleCount] = useState(maxProductsToShow);

  const handleRefresh = () => {
    setVisibleCount((prev) => prev + maxProductsToShow);
  };

  const handleCategoryChange = (category: "coffee" | "tea" | "dessert") => {
    setCategory(category);
    setVisibleCount(maxProductsToShow);
  };

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const { t } = useTranslation();

  return (
    <section className={classes.menu}>
      <div className={classes.container}>
        <div className={classes.offer}>
          <h1>
            <Trans i18nKey="menu_title">
              Behind each of our cups hides an
              <span className={classes.skewed}>amazing surprise</span>
            </Trans>
          </h1>

          {!loading && !error && (
            <div className={cn(classes.category, classes.tabs)}>
              <button
                data-category="coffee"
                className={cn({ [classes.chosen]: category === "coffee" })}
                onClick={() => handleCategoryChange("coffee")}
              >
                <span className={classes.categoryIcon}>☕</span>{" "}
                {t("coffee_cat")}
              </button>
              <button
                onClick={() => handleCategoryChange("tea")}
                className={cn({ [classes.chosen]: category === "tea" })}
              >
                <span className={classes.categoryIcon}>🫖</span> {t("tea_cat")}
              </button>
              <button
                onClick={() => handleCategoryChange("dessert")}
                className={cn({ [classes.chosen]: category === "dessert" })}
              >
                <span className={classes.categoryIcon}>🍰</span>{" "}
                {t("dessert_cat")}
              </button>
            </div>
          )}
        </div>

        <div className={classes.products}>
          {error && <Error message={error} />}
          {loading && <Loader visible />}
          <Suspense fallback={<Loader />}>
            {!loading &&
              !error &&
              visibleProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  {...product}
                  onClick={() => setProductId(product.id.toString())}
                />
              ))}
          </Suspense>
        </div>

        {!loading && !error && hasMore && (
          <button className={classes.refresh} onClick={handleRefresh}>
            <RefressIcon />
          </button>
        )}
      </div>
    </section>
  );
};

export default Offer;
