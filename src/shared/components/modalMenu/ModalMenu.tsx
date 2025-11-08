import classes from "./ModalMenu.module.scss";
import MenuItem from "../../../assets/menuItem.svg?react";
import CartIcon from "../../../assets/cartIcon.svg?react";
import { menuItems } from "../../data";
import cn from "classnames";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const ModalMenu = ({
  hidden = true,
  handleClick,
}: {
  hidden?: boolean;
  handleClick: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className={cn(classes.modalMenu, { [classes.hidden]: hidden })}>
      <nav className={classes.modalNavbar} role="navigation">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.href}
              className={classes.menuItem}
              onClick={handleClick}
            >
              <a href={item.href}>{t(item.textId)}</a>
            </li>
          ))}
        </ul>

        <div className={classes.menuItem} id={classes.menuBtn}>
          <Link to="/menu">
            {t("menu")}
            <MenuItem
              style={{ minWidth: 40, minHeight: 40 }}
              className={classes.menuLinkIcon}
            />
          </Link>
        </div>

        <div className={classes.menuItem} id={classes.cartBtn}>
          <Link to="/cart">
            {t("cart")}
            <CartIcon style={{ minWidth: 40, minHeight: 40 }} />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default ModalMenu;
