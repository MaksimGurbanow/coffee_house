import type {
  ConfirmOrderDto,
  GetProfileResponse,
  LoginDto,
  LoginResponse,
  RegisterDto,
  RegisterResponse,
} from "../types/dto";
import type { CardProduct, Product } from "../types/types";

export const getFavoriteProducts = async (): Promise<CardProduct[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products/favorites`);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch favorites: ${res.status} ${res.statusText}`
    );
  }

  const data: CardProduct[] = (await res.json()).data;
  return data;
};

export const getProducts = async (): Promise<CardProduct[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch products: ${res.status} ${res.statusText}`
    );
  }

  const data: CardProduct[] = (await res.json()).data;
  return data;
};

export const getProductByID = async (
  id: string | number,
  signal: AbortController["signal"]
): Promise<Product> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
    signal,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  }
  
  const data: Product = (await res.json()).data;
  return data;
};

export const register = async (registerDto: RegisterDto) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerDto),
  });
  const data: RegisterResponse = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return data.data;
};

export const login = async (loginDto: LoginDto) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDto),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data: LoginResponse = await res.json();
  return data.data;
};
export const getProfile = async (token: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
  }
  const data: GetProfileResponse = await res.json();
  return data.data;
};

export const confirmOrder = async (confirmOrderDto: ConfirmOrderDto) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(confirmOrderDto),
  });
  if (!res.ok) {
    throw new Error(`Failed to confirm order: ${res.status} ${res.statusText}`);
  }
  const data: { data: { message: string; orderId: string } } = await res.json();

  return data;
};
