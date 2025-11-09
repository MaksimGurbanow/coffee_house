import type {
  ConfirmOrderDto,
  GetProfileResponse,
  LoginDto,
  LoginResponse,
  RegisterDto,
  RegisterResponse,
  UpdateUserDto,
} from "../types/dto";
import type { CardProduct, Order, Product } from "../types/types";

const url = import.meta.env.DEV
  ? "http://localhost:3000"
  : import.meta.env.VITE_API_URL;

export const getFavoriteProducts = async (): Promise<CardProduct[]> => {
  const res = await fetch(`${url}/products/favorites`);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch favorites: ${res.status} ${res.statusText}`
    );
  }

  const data: CardProduct[] = (await res.json()).data;
  return data;
};

export const getProducts = async (): Promise<CardProduct[]> => {
  const res = await fetch(`${url}/products`);

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
  const res = await fetch(`${url}/products/${id}`, {
    signal,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  }

  const data: Product = (await res.json()).data;
  return data;
};

export const register = async (registerDto: RegisterDto) => {
  const res = await fetch(`${url}/auth/register`, {
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

export const updateUser = async (
  updateUserDto: Partial<UpdateUserDto>,
  token: string
) => {
  console.log(updateUserDto);
  const res = await fetch(`${url}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateUserDto),
  });
  const data: RegisterResponse = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return data.data;
};

export const login = async (loginDto: LoginDto) => {
  console.log(loginDto);
  const res = await fetch(`${url}/auth/login`, {
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
  const res = await fetch(`${url}/auth/profile`, {
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

export const confirmOrder = async (
  confirmOrderDto: ConfirmOrderDto,
  token: string
) => {
  const res = await fetch(`${url}/orders/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(confirmOrderDto),
  });
  if (!res.ok) {
    throw new Error(`Failed to confirm order: ${res.status} ${res.statusText}`);
  }
  const data: { data: { message: string; orderId: string } } = await res.json();

  return data;
};

export const getOrders = async (
  userId: string | number,
  token: string
): Promise<Order[]> => {
  const res = await fetch(`${url}/orders/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.data;
};
