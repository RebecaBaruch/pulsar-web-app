"use client";

import { useContext } from "react";
import { AuthContext } from "./context";
import { AuthContextType } from "./authTypes";

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
