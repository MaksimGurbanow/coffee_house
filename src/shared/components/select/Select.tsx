import classes from "./Select.module.scss";
import cn from "classnames";
import type { SelectProps } from "../../../types/props";
import { useState, type FocusEvent } from "react";
import type {
  NonEmptyRule,
  ConfirmPasswordRule,
  LoginValidationRule,
  PasswordValidationRule,
  HouseNumberRule,
  ValidationRule,
} from "../../../types/types";

const Select = ({
  name,
  id,
  options,
  label,
  validationRule,
  validationOptions,
  onChange,
  defaultValue,
  formValue = "",
}: SelectProps) => {
  const [error, setError] = useState("");
  const handleBlur = (
    e: FocusEvent<HTMLSelectElement, Element>,
    validationRule: ValidationRule
  ) => {
    const target = e.target as HTMLSelectElement;
    if (!target) return;

    const value = target.value.trim();

    let errorMessage: string | null = null;
    if (validationOptions?.nonEmpty) {
      const fieldName = validationOptions?.fieldName || "This field";
      errorMessage = (validationRule as NonEmptyRule)(value, fieldName);
    } else if (
      validationOptions?.confirmPassword &&
      validationOptions.password
    ) {
      errorMessage = (validationRule as ConfirmPasswordRule)(
        validationOptions.password,
        value
      );
    } else {
      errorMessage = (
        validationRule as
          | LoginValidationRule
          | PasswordValidationRule
          | HouseNumberRule
      )(value);
    }
    if (errorMessage) {
      setError(errorMessage);
    }
  };

  const handleFocusIn = () => {
    setError("");
  };
  return (
    <div className={classes.inputContainer}>
      <label htmlFor={name} className={classes.inputLabel}>
        {label}
      </label>
      <select
        name={name}
        id={id}
        onChange={onChange}
        className={cn(classes.inputItem, classes.select, {
          [classes.invalid]: !!error,
        })}
        onBlur={(e) => handleBlur(e, validationRule)}
        onFocus={handleFocusIn}
        defaultValue={defaultValue || options[0].value}
      >
        {options.map((option) => (
          <option
            value={option.value}
            disabled={option.disabled}
            key={option.value}
            selected={formValue === option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={classes.errorText}>{error}</span>}
    </div>
  );
};

export default Select;
