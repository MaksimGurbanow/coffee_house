import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProfile } from "../api";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/types";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const profile = await getProfile(token);
          setUser(profile);
        }
      } catch {
        setUser(null);
        localStorage.removeItem("authToken");
      }
    };
    fetchUser();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setUser(null);
  }, []);
  const value = useMemo(() => ({ user, setUser, logout }), [logout, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
