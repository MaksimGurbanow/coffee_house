import { useEffect, useState } from "react";
import classes from "./CartItem.module.scss";
import DeleteCartItem from "../../../assets/delete-cart-item.svg?react";
import type { Cart } from "../../../types/types";
import { useCartContext } from "../../../context/CartContext";
import { useAuthContext } from "../../../context/AuthContext";

interface CartItemProps {
  item: Cart["items"][0];
}

const CartItem = ({ item }: CartItemProps) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const { removeProductFromCart } = useCartContext();
  const { user } = useAuthContext();

  // Load product image dynamically
  useEffect(() => {
    const loadImage = async () => {
      try {
        const module = await import(
          `../../../images/products/${item.productId}.jpg`
        );
        setImageSrc(module.default);
      } catch {
        setImageSrc("");
      }
    };
    loadImage();
  }, [item.productId]);

  const handleDelete = () => {
    removeProductFromCart(item.uniqueId);
  };

  return (
    <div className={classes.cartItemContainer}>
      <button className={classes.cartItemDelete} onClick={handleDelete}>
        <DeleteCartItem />
      </button>

      {imageSrc && (
        <img
          src={imageSrc}
          alt={item.title}
          className={classes.cartItemImage}
        />
      )}

      <div className={classes.cartItemInfo}>
        <h3 className={classes.cartItemName}>{item.title}</h3>
        <p className={classes.cartItemDetails}>
          {[item.size, ...item.additives].join(", ")}
        </p>
      </div>

      <h5
        className={`${classes.cartItemTotal} ${user ? classes.canceled : ""}`}
      >
        ${item.total.toFixed(2)}
      </h5>

      {user && (
        <h5 className={`${classes.cartItemTotal} ${classes.discounted}`}>
          ${item.discountedTotal?.toFixed(2)}
        </h5>
      )}
    </div>
  );
};

export default CartItem;
