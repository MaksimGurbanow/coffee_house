import { lazy, Suspense, useEffect, useState } from "react";
import classes from "./OrderHistory.module.scss";
import { getOrders } from "../../../../api";
import { useAuthContext } from "../../../../context/AuthContext";
import { useTranslation } from "react-i18next";
import type { Order } from "../../../../types/types";
import { formatDate } from "../../../../utils/formatDate.ts";

const Image = lazy(
  () => import("../../../../shared/components/lazyImage/LazyImage.tsx")
);

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuthContext();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchHistory = async () => {
      if (!token || !user) return;
      try {
        const orders = await getOrders(user.id, token);
        console.log(orders);
        setOrders(orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <section className={classes.orderHistory}>
      <h1 className={classes.orderTitle}>{t("orders")}</h1>
      <div className={classes.orderList}>
        {orders.map((order) => (
          <div key={order.id} className={classes.orderItem}>
            <div className={classes.orderInfo}>
              <h4 className={classes.orderId}>
                {t("order_id")}: {order.id}
              </h4>
              <h4>Created {formatDate(order.createdAt)}</h4>
            </div>
            <div className={classes.orderItemInfoContainer}>
              <div className={classes.items}>
                {order.items.map((item, index) => (
                  <div key={index} className={classes.itemContainer}>
                    <div className={classes.itemImage}>
                      <Suspense fallback={<div>Loading image...</div>}>
                        <Image
                          id={item.productId.toString()}
                          className={classes.image}
                        />
                      </Suspense>
                    </div>
                    <div key={index} className={classes.itemDetail}>
                      <span className={classes.itemSize}>{item.size}</span>
                      {item.additives.length > 0 && (
                        <span className={classes.itemAdditives}>
                          {item.additives.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <h3 className={classes.orderTotal}>
                {t("total")}: ${order.totalPrice.toFixed(2)}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderHistory;
