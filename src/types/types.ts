import type {
  confirmPasswordValidationRule,
  houseNumberRule,
  loginValidationRules,
  nonEmptyRule,
  passwordValidationRules,
} from "../utils/validationRules";

export interface Product {
  path: string;
  id: string | number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: "coffee" | "tea" | "dessert";
  sizes: {
    [size: string]: {
      size: string;
      price: string;
      discountPrice?: string;
    };
  };
  additives: {
    name: string;
    price: string;
    discountPrice?: string;
  }[];
}

export interface User {
  id: number;
  login: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
  createdAt: Date;
}

export type CardProduct = Omit<Product, "size" | "additives" | "path">;

export interface Cart {
  items: {
    title: string;
    productId: number;
    size: string;
    additives: string[];
    total: number;
    discountedTotal?: number;
    quantity: number;
    uniqueId: string;
  }[];
  totalPrice: number;
  discountedTotalPrice: number;
}

export type ChosenProduct = {
  productId: string;
  title: string;
  size: string;
  additives: string[];
  quantity: number;
  total: number;
  discountPrice: number;
};

export type Category = "coffee" | "tea" | "dessert";

export type LoginValidationRule = typeof loginValidationRules;
export type PasswordValidationRule = typeof passwordValidationRules;
export type NonEmptyRule = typeof nonEmptyRule;
export type HouseNumberRule = typeof houseNumberRule;
export type ConfirmPasswordRule = typeof confirmPasswordValidationRule;

export type ValidationRule =
  | LoginValidationRule
  | PasswordValidationRule
  | NonEmptyRule
  | HouseNumberRule
  | ConfirmPasswordRule;

export interface ValidationOptions {
  nonEmpty?: boolean;
  fieldName?: string;
  confirmPassword?: boolean;
  password?: string;
}
