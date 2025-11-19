import { useEffect, useMemo, useState } from "react";
import cn from "classnames";
import classes from "./ProductModal.module.scss";
import CloseIcon from "../../../assets/closeIcon.svg?react";
import type { Product } from "../../../types/types";
import { useAuthContext } from "../../../context/AuthContext";
import AlertIcon from "../../../images/info-empty.svg";
import { useCartContext } from "../../../context/CartContext";
import { useTranslation } from "react-i18next";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const OptionButton = ({
  price,
  discountedPrice,
  className,
  onClick,
  icon,
  text,
}: {
  price: string;
  discountedPrice?: string;
  className: string;
  onClick: () => void;
  icon: string | number;
  text: string;
}) => {
  const { user } = useAuthContext();
  const showDiscount = user && price !== discountedPrice && discountedPrice;
  return (
    <button className={className} onClick={onClick}>
      <span className={classes.sizeIcon}>{icon}</span>
      <span className={classes.sizeText}>{text}</span>
      <div className={classes.tooltip} style={{ position: "absolute" }}>
        <span className={classes.tooltipPrice}>
          <span className={cn({ [classes.canceled]: showDiscount })}>
            ${price}
          </span>
          {showDiscount && (
            <span className={classes.discounted}> → ${discountedPrice}</span>
          )}
        </span>
      </div>
    </button>
  );
};

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [chosenSize, setChosenSize] = useState<string>("");
  const [chosenAdditives, setChosenAdditives] = useState<string[]>([]);
  const { user } = useAuthContext();
  const { addProductToCart } = useCartContext();
  const { t } = useTranslation();

  const sortedSizes = useMemo(
    () =>
      Object.entries(product.sizes)
        .sort((a, b) => +a[1].size - +b[1].size)
        .map(([sizeName, sizeObj]) => ({ sizeName, ...sizeObj })),
    [product.sizes]
  );

  const additives = Object.values(product.additives);
  const basePrice = +product.price;
  const hasDiscount =
    user &&
    (product.discountPrice ||
      sortedSizes.some((s) => s.discountPrice !== s.price));

  useEffect(() => {
    if (sortedSizes.length) {
      setChosenSize(sortedSizes[0].size);
    }
  }, [sortedSizes]);

  const total: number = useMemo(() => {
    const sizeObj = sortedSizes.find((s) => s.size === chosenSize);
    const sizePrice = +(sizeObj ? sizeObj.price : 0) || basePrice;

    const additivesPrice = additives
      .filter((a) => chosenAdditives.includes(a.name))
      .reduce((sum, a) => +sum + +a.price, 0);

    return sizePrice + additivesPrice;
  }, [basePrice, sortedSizes, chosenSize, additives, chosenAdditives]);

  const discountedTotal = useMemo(() => {
    const sizeObj = sortedSizes.find((s) => s.size === chosenSize);
    const sizeDiscount = sizeObj?.discountPrice ?? sizeObj?.price ?? basePrice;

    const additivesDiscount = additives
      .filter((a) => chosenAdditives.includes(a.name))
      .reduce((sum, a) => +sum + +(a.discountPrice ?? a.price), 0);

    return +sizeDiscount + additivesDiscount;
  }, [basePrice, sortedSizes, chosenSize, additives, chosenAdditives]);

  const toggleAdditive = (addName: string) => {
    setChosenAdditives((prev) =>
      prev.includes(addName)
        ? prev.filter((name) => name !== addName)
        : [...prev, addName]
    );
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await import(
          `../../../images/products/${product.id}.jpg`
        );
        setImageSrc(image.default);
      } catch {
        console.warn(`Image for product ${product.id} not found`);
      }
    };
    fetchImage();
  }, [product.id]);

  const handleAddToCart = () => {
    addProductToCart({
      productId: +product.id,
      additives: chosenAdditives,
      size: chosenSize,
      title: product.name,
      discountedTotal,
      total,
      quantity: 1,
    });
    onClose();
  };

  if (!product) return null;

  return (
    <div className={classes.productModal} onClick={onClose}>
      <div
        className={cn(classes.container, classes.modalContainer)}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={classes.modalCloseBtn} onClick={onClose}>
          <CloseIcon />
        </button>

        <div className={classes.productItem}>
          {imageSrc && (
            <div className={classes.image}>
              <img src={imageSrc} alt={product.name} />
            </div>
          )}
        </div>

        <div className={classes.description}>
          <div className={classes.title}>
            <h3 className={classes.name}>{product.name}</h3>
            <div className={classes.text}>{product.description}</div>
          </div>

          <div className={classes.size}>
            <span className={classes.sizeTitle}>{t("size")}</span>
            <div className={classes.tabs}>
              {sortedSizes.map((size) => (
                <OptionButton
                  key={size.sizeName}
                  text={size.size}
                  icon={size.sizeName}
                  price={size.price}
                  discountedPrice={size.discountPrice}
                  onClick={() => setChosenSize(size.size)}
                  className={cn(classes.sizeBtn, {
                    [classes.chosen]: chosenSize === size.size,
                  })}
                />
              ))}
            </div>
          </div>

          <div className={classes.additives}>
            <span className={classes.additivesTitle}>{t("additives")}</span>
            <div className={classes.tabs}>
              {additives.map((add, index) => (
                <OptionButton
                  price={add.price}
                  discountedPrice={add.discountPrice}
                  icon={index + 1}
                  key={add.name}
                  text={add.name}
                  className={cn(classes.additivesBtn, {
                    [classes.chosen]: chosenAdditives.includes(add.name),
                  })}
                  onClick={() => toggleAdditive(add.name)}
                />
              ))}
            </div>
          </div>

          <div className={classes.total}>
            <h3 className={classes.totalText}>{t("total")}:</h3>
            <h3
              className={cn(classes.totalNum, {
                [classes.canceled]: hasDiscount && discountedTotal !== total,
              })}
            >
              ${total.toFixed(2)}
            </h3>

            {hasDiscount && discountedTotal !== total && (
              <h3 className={cn(classes.totalNum, classes.discounted)}>
                ${discountedTotal.toFixed(2)}
              </h3>
            )}
          </div>

          <div className={classes.alert}>
            <img src={AlertIcon} alt="alert icon" />
            {t("alert")}
          </div>

          <button className={classes.addToCartBtn} onClick={handleAddToCart}>
            {t("add_to_cart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
