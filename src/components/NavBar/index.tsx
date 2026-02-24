"use client";

import React from "react";
import NotLoggedNav from "../NavBar/NotLogged";
import LoggedNavBar from "../NavBar/LoggedNavBar";
import { useAuth } from "@/auth/useAuth";
import NotLoggedNavBarSkeleton from "./NotLogged/NotLoggedNavBarSkeletion";
import LoggedNavBarSkeleton from "./LoggedNavBar/LoggedNavBarSkeleton";

export default function NavBar() {
  const { isAuthenticated, loading } = useAuth();

  if (!isAuthenticated && loading) {
    return <NotLoggedNavBarSkeleton />;
  }

  if (isAuthenticated && loading) {
    return <LoggedNavBarSkeleton />;
  }

  return isAuthenticated ? <LoggedNavBar /> : <NotLoggedNav />;
}
