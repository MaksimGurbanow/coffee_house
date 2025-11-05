import { useEffect } from "react";
import classes from "./Loader.module.scss";
import cn from "classnames";

interface LoaderProps {
  visible?: boolean;
  onClose?: () => void;
  modal?: boolean;
}

const Loader = ({ visible = true, onClose, modal = false }: LoaderProps) => {
  useEffect(() => {
    return () => {
      onClose?.();
    };
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={cn(classes.loaderOverlay, {
        [classes.modalLoaderOverlay]: modal,
      })}
    >
      <div className={classes.loaderSpinner}></div>
    </div>
  );
};

export default Loader;
