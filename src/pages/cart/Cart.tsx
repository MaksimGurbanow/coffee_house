import cn from "classnames";
import classes from "./Cart.module.scss";
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import CartItem from "./cartItem/CartItem";
import { useCallback, useEffect, useState } from "react";
import Loader from "../../shared/components/loader/Loader";
import { confirmOrder } from "../../api";
import Error from "../../shared/components/error/Error";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { cart, clearCart } = useCartContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const { t } = useTranslation();

  const handleConfirmOrder = useCallback(async () => {
    setLoading(true);
    try {
      await confirmOrder({
        items: cart.items.map((item) => ({
          productId: item.productId,
          additives: item.additives,
          size: item.size,
          quantity: item.quantity,
        })),
        totalPrice: cart.totalPrice,
      });
      setResponse(t("order_response"));
      clearCart();
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }, [cart.items, cart.totalPrice, clearCart, t]);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 5000);
    }
  }, [error]);
  useEffect(() => {
    if (response) {
      setTimeout(() => setResponse(""), 5000);
    }
  }, [response]);
  return (
    <section className={classes.cart}>
      {loading && <Loader modal />}
      {error && <Error message={error} toast />}
      {response && <Error message={response} toast style="response" />}
      <div className={cn(classes.cartContainer, classes.container)}>
        <h1 className={classes.cartTitle}>{t("cart")}</h1>

        <div className={classes.cartList}>
          {!!cart.items.length &&
            cart.items.map((item) => <CartItem item={item} key={item.title} />)}
        </div>

        <div className={classes.cartData}>
          <div className={classes.cartTotalContainer}>
            <h5 className={classes.cartTotalLabel}>{t("total")}:</h5>
            <h5
              className={cn(classes.cartTotalValue, {
                [classes.canceled]: user,
              })}
            >
              ${cart.totalPrice.toFixed(2)}
            </h5>

            {user && (
              <h5 className={cn(classes.cartTotalValue, classes.discounted)}>
                ${cart.discountedTotalPrice.toFixed(2)}
              </h5>
            )}
          </div>

          {user && (
            <>
              <div className={classes.cartAddressContainer}>
                <h5 className={classes.cartAddressLabel}>{t("address")}:</h5>
                <h5 className={classes.cartAddressValue}>
                  {user.city}, {user.street}
                </h5>
              </div>
              <div className={classes.cartPayMethodContainer}>
                <h5 className={classes.cartPayMethodLabel}>{t("pay_by")}:</h5>
                <h5 className={classes.cartPayMethodValue}>
                  {user.paymentMethod}
                </h5>
              </div>
            </>
          )}
        </div>

        {user ? (
          <>
            {!!cart.items.length && (
              <button
                className={classes.confirmOrderButton}
                onClick={handleConfirmOrder}
              >
                {t("confirm")}
              </button>
            )}
          </>
        ) : (
          <div className={classes.authLinksContainer}>
            <a className={classes.authLink} href="/signIn">
              {t("sign")}
            </a>
            <a className={classes.authLink} href="/register">
              {t("registration")}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
