import cn from "classnames";
import classes from "./Input.module.scss";
import type { InputProps } from "../../../types/props";
import type {
  ConfirmPasswordRule,
  HouseNumberRule,
  LoginValidationRule,
  NonEmptyRule,
  PasswordValidationRule,
  ValidationRule,
} from "../../../types/types";
import { useState, type FocusEvent } from "react";

const Input = ({
  name,
  type = "text",
  id,
  label,
  placeholder = "Placeholder",
  value,
  radioValues,
  onChange,
  radio = false,
  validationRule,
  validationOptions = {},
}: InputProps) => {
  const [error, setError] = useState("");
  const handleBlur = (
    e: FocusEvent<HTMLInputElement, Element>,
    validationRule: ValidationRule
  ) => {
    const target = e.target as HTMLInputElement;
    if (!target) return;

    const value = target.value.trim();

    let errorMessage: string | null = null;
    if (validationOptions.nonEmpty) {
      const fieldName = validationOptions.fieldName || "This field";
      errorMessage = (validationRule as NonEmptyRule)(value, fieldName);
    } else if (
      validationOptions.confirmPassword &&
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
    <div
      className={cn(classes.inputContainer, {
        [classes.paymentContainer]: radio,
      })}
    >
      {!radio ? (
        <>
          {label && (
            <label htmlFor={id || name} className={classes.inputLabel}>
              {label}
            </label>
          )}
          <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={cn(classes.inputItem, {
              [classes.invalid]: !!error,
            })}
            onBlur={(e) => handleBlur(e, validationRule)}
            onFocus={handleFocusIn}
          />
          {error && <span className={classes.errorText}>{error}</span>}
        </>
      ) : (
        <>
          <p>{label}</p>
          <div className={classes.paymentOptions}>
            {radioValues?.length &&
              radioValues.map((v) => (
                <label
                  htmlFor={v.id}
                  className={classes.paymentLabel}
                  key={v.id}
                >
                  <input
                    type="radio"
                    id={v.id}
                    name="paymentMethod"
                    value={v.value}
                    checked={v.value === value}
                    className={cn(classes.inputItem, classes.paymentInput)}
                    onChange={onChange}
                  />
                  <span className={classes.customRadio}></span>
                  {v.label}
                </label>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Input;
