import type { SlideItemProps } from "../../../../types/props";
import classes from "./SlideItem.module.scss";

const SlideItem = ({
  path,
  title,
  description,
  price,
  style,
}: SlideItemProps) => {
  return (
    <div className={classes.slideItem} style={style}>
      <div className={classes.slideContent}>
        <img
          className={classes.slideImage}
          src={path}
          alt="slide item"
          draggable={false}
        />

        <h3 className={classes.title}>{title}</h3>

        <div className={classes.description}>{description}</div>

        <h3 className={classes.price}>${price}</h3>
      </div>
    </div>
  );
};

export default SlideItem;
