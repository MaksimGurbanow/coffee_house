import i18n from "i18next";

export const loginValidationRules = (login: string): string | null => {
  if (login.length < 3) {
    return i18n.t("validation.login_short");
  }

  if (!/^[A-Za-z]/.test(login)) {
    return i18n.t("validation.login_start_letter");
  }

  if (!/^[A-Za-z]+$/.test(login)) {
    return i18n.t("validation.login_only_letters");
  }

  return null;
};

export const passwordValidationRules = (password: string): string | null => {
  if (password.length < 6) {
    return i18n.t("validation.password_short");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return i18n.t("validation.password_special");
  }

  return null;
};

export const confirmPasswordValidationRule = (
  password: string,
  confirmPassword: string
): string | null => {
  if (password !== confirmPassword)
    return i18n.t("validation.password_mismatch");
  return null;
};

export const nonEmptyRule = (value: string, field: string): string | null => {
  if (!value.length) return i18n.t("validation.required", { field });
  return null;
};

export const houseNumberRule = (value?: string | number): string | null => {
  if (Number(value) <= 1) return i18n.t("validation.house_number");
  return null;
};
