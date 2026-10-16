"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import NotificationBell from "@/components/NotificationBell";
import { useAuth } from "@/auth/useAuth";
import { RoutesUrls } from "@/utils/enum/routes-url";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function SpecialistHeader() {
  const { user } = useAuth();
  const avatarUrl = user?.avatarUrl?.trim() || null;
  const initials = getInitials(user?.name ?? "Especialista");

  return (
    <header className="relative hidden w-full shrink-0 items-center justify-end gap-3 border-b border-gray-100 bg-white/80 px-6 py-2.5 backdrop-blur-sm lg:flex lg:px-8">
      <Link
        href={RoutesUrls.SPECIALIST_SETTINGS}
        className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 ring-2 ring-transparent transition-shadow hover:ring-blue-200 focus:outline-none focus-visible:ring-blue"
        aria-label="Ir para configurações do perfil"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt=""
            fill
            sizes="36px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <span className="text-xs font-bold text-blue">{initials}</span>
        )}
      </Link>

      <NotificationBell />
    </header>
  );
}
