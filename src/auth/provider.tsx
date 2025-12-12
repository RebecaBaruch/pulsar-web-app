"use client";

import React from "react";
import { AuthContext } from "./context";
import { AuthUser } from "./types";
import { saveToken, getToken, clearToken } from "./storage";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    // Em produção: chamar endpoint /me
    setUser({
      id: "1",
      name: "Usuário",
      type: "client",
    });

    setLoading(false);
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    // Em produção: request ao backend
    const fakeToken = "token-123";

    saveToken(fakeToken);

    setUser({
      id: "1",
      name: username,
      type: sessionStorage.getItem("login_user_type") as any,
    });
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
