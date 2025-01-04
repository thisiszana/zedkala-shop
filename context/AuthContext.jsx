"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { fetchRefreshToken } from "@/services/req";
import { useRouter } from "next/navigation";
import { useUserQuery } from "@/hooks/useUserQuery";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const router = useRouter();

  const { userData, isError, isLoading } = useUserQuery(user?.accessToken);

  useEffect(() => {
    const refreshToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken="))
      ?.split("=")[1];

    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (refreshToken && !accessToken) {
      fetchRefreshToken({ refreshToken })
        .then((data) => {
          if (data?.success && data.accessToken) {
            const expires = new Date(
              Date.now() + data.accessExpiresIn
            ).toUTCString();
            document.cookie = `accessToken=${data.accessToken}; expires=${expires}; path=/;`;
            setUser({ accessToken: data.accessToken });
          } else {
            setUser(null);
          }
        })
        .finally(() => setLoading(false));
    } else if (accessToken) {
      setUser({ accessToken });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    document.cookie = "refreshToken=; Max-Age=0; path=/;";
    document.cookie = "accessToken=; Max-Age=0; path=/;";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        userData,
        isError,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
