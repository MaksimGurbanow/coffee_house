import { lazy, Suspense } from "react";
import classes from "./ProductItem.module.scss";
import cn from "classnames";
import type { Product } from "../../../types/types";
import { useAuthContext } from "../../../context/AuthContext";

type ProductItemProps = Omit<Product, "sizez" | "additives" | "path"> & {
  onClick: () => void;
};

const Image = lazy(
  () => import("../../../shared/components/lazyImage/LazyImage.tsx")
);

const ProductItem = ({
  id,
  name,
  description,
  price,
  discountPrice,
  onClick,
}: ProductItemProps) => {
  const { user } = useAuthContext();

  const showDiscount = user && discountPrice;

  return (
    <div className={classes.productItem} data-name={name} onClick={onClick}>
      <div className={classes.image}>
        <Suspense>
          <Image id={id.toString()} />
        </Suspense>
      </div>

      <div className={classes.description}>
        <div className={classes.title}>
          <h3>{name}</h3>
          <div className={classes.text}>{description}</div>
        </div>

        <div className={classes.priceContainer}>
          {showDiscount && (
            <h3 className={cn(classes.price, classes.discounted)}>
              ${discountPrice}
            </h3>
          )}
          <h3
            className={cn(classes.price, {
              [classes.canceled]: showDiscount,
            })}
          >
            ${price}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
