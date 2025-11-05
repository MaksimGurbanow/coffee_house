export const loginValidationRules = (login: string): string | null => {
  if (login.length < 3) {
    return "Login must be at least 3 characters long.";
  }

  if (!/^[A-Za-z]/.test(login)) {
    return "Login must start with a letter.";
  }

  if (!/^[A-Za-z]+$/.test(login)) {
    return "Login can contain only English letters (A–Z, a–z).";
  }

  return null;
};

export const passwordValidationRules = (password: string): string | null => {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  return null;
};

export const confirmPasswordValidationRule = (
  password: string,
  confirmPassword: string
): string | null => {
  if (password !== confirmPassword) return "Passwords must match";
  return null;
};

export const nonEmptyRule = (value: string, field: string): string | null => {
  if (!value.length) return `${field} must be filled`;
  return null;
};

export const houseNumberRule = (value?: string | number): string | null => {
  if (Number(value) <= 1) return "House number must be greater than 1";

  return null;
};
