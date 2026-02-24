"use client";

import React from "react";
import ProfileView from "../view/index.view";
import { useAuth } from "@/auth/useAuth";

export default function ProfileController() {
  // const { user, loading } = useAuth();

  // return <ProfileView user={user} loading={loading} />;
  return <ProfileView />;
}
