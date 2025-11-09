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
import { useTranslation } from "react-i18next";
import { PersonCircle } from "react-bootstrap-icons";
import Dropdown from "../dropdown/Dropdown.tsx";

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
  const isProfilePage = pathname === "/profile";
  const { t, i18n } = useTranslation();

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
                <li
                  className={classes.navItem}
                  key={item.label}
                  onClick={() => setModalIsHidden(true)}
                >
                  <a href={item.href} className={classes.navItemLink}>
                    {t(item.textId)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className={classes.menu}>
          {isMobile ? (
            <>
              <Dropdown
                label={i18n.language}
                options={["en", "ru", "tr"]}
                onOptionClick={(v) => i18n.changeLanguage(v)}
              />
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
            </>
          ) : (
            <div className={classes.menuItems}>
              <Dropdown
                label={i18n.language}
                options={["en", "ru", "tr"]}
                onOptionClick={(v) => i18n.changeLanguage(v)}
              />
              {user && !isProfilePage && (
                <div className={classes.menuItem}>
                  <Link
                    to="/profile"
                    id="profile-link"
                    className={classes.profileLink}
                  >
                    <PersonCircle style={{ minHeight: 20, minWidth: 20 }} />
                  </Link>
                </div>
              )}
              {(user || !!cart.items.length) && !isCartPage && (
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
                  {t("menu")}
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
      {isMobile && (
        <ModalMenu
          hidden={modalIsHidden}
          handleClick={() => setModalIsHidden(true)}
        />
      )}
    </header>
  );
};

export default Header;
