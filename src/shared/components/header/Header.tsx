import { useWidthObserver } from "../../../hooks/useWidthObserver.ts";
import classes from "./Header.module.scss";
import Logo from "../../../images/logo.png";
import CartIcon from "../../../assets/CartIcon.svg?react";
import MenuItem from "../../../assets/menuItem.svg?react";
import ModalMenu from "../modalMenu/ModalMenu";
import { menuItems } from "../../data";
import { useState } from "react";
import cn from "classnames";
import { Link, useLocation } from "react-router";
import { useAuthContext } from "../../../context/AuthContext.ts";
import { useCartContext } from "../../../context/CartContext.ts";

const Header = () => {
  const { isMobile, ref } = useWidthObserver();
  const [modalIsHidden, setModalIsHidden] = useState(true);
  const handleBurgerBtnClick = () => {
    setModalIsHidden((prev) => !prev);
  };
  const { user } = useAuthContext();
  const { cart } = useCartContext();
  const { pathname } = useLocation();
  const isCartPage = pathname === "/cart";
  return (
    <header className={classes.header} ref={ref}>
      <div className={classes.headerContainer}>
        <div className={classes.logo}>
          <Link to="home">
            <img src={Logo} alt="Coffee logo" />
          </Link>
        </div>

        {!isMobile && (
          <nav className={classes.nav}>
            <ul className={classes.navList}>
              {menuItems.map((item) => (
                <li className={classes.navItem} key={item.label}>
                  <a href={item.href} className={classes.navItemLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className={classes.menu}>
          {isMobile ? (
            <button
              className={cn(classes.burgerButton, {
                [classes.active]: !modalIsHidden,
              })}
              aria-label="Menu"
              onClick={handleBurgerBtnClick}
            >
              <div className={classes.burgerLines}>
                <svg
                  width="18"
                  height="2"
                  viewBox="0 0 18 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H17"
                    stroke="#403F3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  width="18"
                  height="2"
                  viewBox="0 0 18 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H17"
                    stroke="#403F3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          ) : (
            <div className={classes.menuItems}>
              {(user || cart.items.length) && !isCartPage && (
                <div className={classes.menuItem}>
                  <Link to="cart" id="cart-link" className={classes.cartLink}>
                    <CartIcon style={{ minWidth: 20, minHeight: 20 }} />
                    {!!cart.items.length && (
                      <span className={classes.productsInCart}>
                        {cart.items.length}
                      </span>
                    )}
                  </Link>
                </div>
              )}

              <div className={classes.menuItem}>
                <Link to="menu" className={classes.menuLink}>
                  Menu
                  <MenuItem
                    style={{ minWidth: 20, minHeight: 20 }}
                    className={classes.menuLinkIcon}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {isMobile && <ModalMenu hidden={modalIsHidden} />}
    </header>
  );
};

export default Header;
