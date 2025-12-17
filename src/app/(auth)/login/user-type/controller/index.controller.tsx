"use client";
import React from "react";
import UserTypeView from "../view/index.view";
import { useRouter } from "next/navigation";
import type { LoginUserTypeValue } from "../components/LoginUserType";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function UserTypeController() {
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (type: LoginUserTypeValue) => {
    sessionStorage.setItem("login_user_type", type);
    router.push(RoutesUrls.LOGIN);
  };

  return <UserTypeView isLoading={loading} onSelect={handleSelect} />;
}
