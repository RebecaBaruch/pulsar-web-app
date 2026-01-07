"use client";

import React from "react";
import LoginUserType from "../components/LoginUserType";
import LoginUserTypeSkeleton from "../components/Skeleton/LoginUserTypeSkeleton";
import type { LoginUserTypeValue } from "../components/LoginUserType";

type UserTypeViewProps = {
  isLoading?: boolean;
  onSelect: (type: LoginUserTypeValue) => void;
};

export default function UserTypeView({
  isLoading,
  onSelect,
}: UserTypeViewProps) {
  return (
    <section className="w-screen min-h-screen flex justify-center md:items-start lg:items-start m-0 px-6 py-18 md:py-30 lg:pt-20">
      {isLoading ? (
        <LoginUserTypeSkeleton />
      ) : (
        <LoginUserType onSelect={onSelect} />
      )}
    </section>
  );
}
