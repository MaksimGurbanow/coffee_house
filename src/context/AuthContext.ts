import { createContext, useContext, type Dispatch } from "react";
import type { User } from "../types/types";

export type AuthContextType = {
  user: Omit<User, "password"> | null;
  setUser: Dispatch<React.SetStateAction<Omit<User, "password"> | null>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
    throw new Error("Context not provided");
  },
  logout: () => {
    throw new Error("Context not provided");
  },
});

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};
