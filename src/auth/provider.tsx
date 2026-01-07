"use client";

import React, { useEffect, useState } from "react";
import { AuthContext } from "./context";
import { AuthUser, AuthContextType } from "./authTypes";
import { tokenService } from "./services/tokenService";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = tokenService.get();

    try {
      const headers: HeadersInit = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("/api/me", {
        headers,
      });

      if (!res.ok) {
        setUser(null);
      } else {
        const data = await res.json();
        setUser(data.user);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    tokenService.clear();
    setUser(null);

    // Call server endpoint to clear httpOnly cookie
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Error clearing session cookie:", error);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const contextValue: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    refreshUser,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
