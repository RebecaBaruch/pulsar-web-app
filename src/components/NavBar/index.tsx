"use client";

import React from "react";
import NotLoggedNav from "../NavBar/NotLogged";
import LoggedNavBar from "../NavBar/LoggedNavBar";
import { useAuth } from "@/auth/useAuth";

export default function NavBar() {
  const { isAuthenticated, loading } = useAuth();

  // While auth state is loading, show the public navbar to avoid flicker
  if (loading) {
    return <NotLoggedNav />;
  }

  // Force re-render by using the full context value
  return isAuthenticated ? <LoggedNavBar /> : <NotLoggedNav />;
}
