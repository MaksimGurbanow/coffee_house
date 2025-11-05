import { useEffect, useMemo, useState, type ReactNode } from "react";
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

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
