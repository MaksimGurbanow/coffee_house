import { Check } from "react-bootstrap-icons";
import classes from "./PaymentConfirm.module.scss";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { verifyPayment } from "../../api";
import { useCartContext } from "../../context/CartContext";

const PaymentConfirm = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isValid, setIsValid] = useState(false);
  const { clearCart } = useCartContext();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const hash = params.get("hash");
    const orderId = params.get("orderId");

    if (!hash || !orderId) {
      navigate("/cart");
      return;
    }

    const handleVerification = async () => {
      try {
        const { valid } = await verifyPayment(
          hash,
          orderId,
          localStorage.getItem("authToken")!
        );
        setIsValid(valid);
      } finally {
        clearCart();
      }
    };

    handleVerification();
  }, [search, user, navigate, clearCart]);

  if (!isValid) return null;

  return (
    <section className={classes.paymentConfirm}>
      <div className={classes.paymentCheckWrapper}>
        <Check width={150} height={150} color="#5df85d" />
      </div>
      <h4 className={classes.paymentTitle}>Order Confirmed</h4>
      <p className={classes.paymentText}>
        Thank you for your order! You can track your orders in your profile.
      </p>
      <button className={classes.menuButton}>
        <Link to="/menu">Back to Menu</Link>
      </button>
    </section>
  );
};

export default PaymentConfirm;
