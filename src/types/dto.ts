import type { Cart, User } from "./types";

export type RegisterDto = {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number | undefined;
  paymentMethod: string;
};

export type LoginDto = {
  login: string;
  password: string;
};

export type GetProfileResponse = {
  data: Omit<User, "password">;
  message: string;
  error: string;
};

export type LoginResponse = {
  data: {
    access_token: string;
    user: Omit<User, "password">;
  };
  message: string;
};

export type ConfirmOrderDto = {
  items: Omit<Cart["items"][0], "uniqueId" | "title" | "total">[];
  totalPrice: number;
};

export type RegisterResponse = LoginResponse & { error?: string };
