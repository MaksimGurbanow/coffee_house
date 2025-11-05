import classes from "./ModalMenu.module.scss";
import MenuItem from "../../../assets/menuItem.svg?react";
import CartIcon from "../../../assets/cartIcon.svg?react";
import { menuItems } from "../../data";
import cn from "classnames";

const ModalMenu = ({ hidden = true }: { hidden?: boolean }) => {
  return (
    <div className={cn(classes.modalMenu, { [classes.hidden]: hidden })}>
      <nav className={classes.modalNavbar} role="navigation">
        <ul>
          {menuItems.map((item) => (
            <li key={item.href} className={classes.menuItem}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <div className={classes.menuItem} id={classes.menuBtn}>
          <a href="./menu.html">
            Menu
            <MenuItem
              style={{ minWidth: 40, minHeight: 40 }}
              className={classes.menuLinkIcon}
            />
          </a>
        </div>

        <div className={classes.menuItem} id={classes.cartBtn}>
          <a href="../pages/cart.html">
            Cart
            <CartIcon style={{ minWidth: 40, minHeight: 40 }} />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default ModalMenu;
