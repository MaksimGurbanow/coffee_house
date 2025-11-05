import type {
  CSSProperties,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import type { ValidationOptions, ValidationRule } from "./types";

export interface SlideItemProps {
  path: string;
  title: string;
  description: string;
  price: string;
  style?: CSSProperties;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  radio?: boolean;
  radioValues?: { label: string; value: string; id: string }[];
  error?: string;
  label: string;
  validationRule: ValidationRule;
  validationOptions?: ValidationOptions;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string;
    label: string;
    disabled?: boolean;
    selected?: string;
  }[];
  error?: string;
  label: string;
  validationRule: ValidationRule;
  validationOptions?: ValidationOptions;
}
