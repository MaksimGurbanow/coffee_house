import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import classes from "./Dropdown.module.scss";
import cn from "classnames";

const Dropdown = ({
  label,
  options,
  onOptionClick,
}: {
  label: string;
  options: readonly string[];
  onOptionClick: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        !(e.target as HTMLButtonElement).classList.contains(
          classes.dropdownButton
        )
      )
        setOpen(false);
    });
  }, []);

  return (
    <div className={classes.dropdownContainer}>
      <button
        className={`${classes.dropdownButton} ${open ? classes.open : ""}`}
        onClick={handleClick}
      >
        {label.toLocaleUpperCase()} <ChevronDown />
      </button>

      <div className={`${classes.optionList} ${open ? classes.visible : ""}`}>
        {options.map((option) => (
          <div
            key={option}
            className={cn(classes.optionItem, {
              [classes.active]: option === label,
            })}
            onClick={() => {
              onOptionClick(option);
              setOpen(false);
            }}
          >
            {option.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
