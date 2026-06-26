"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/auth/useAuth";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { AiOutlineAppstore, AiOutlineSetting } from "react-icons/ai";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: RoutesUrls.SPECIALIST_DASHBOARD,
    icon: AiOutlineAppstore,
  },
  {
    label: "Agenda",
    href: RoutesUrls.SPECIALIST_SCHEDULE,
    icon: FaRegCalendarAlt,
  },
  {
    label: "Disponibilidade",
    href: RoutesUrls.SPECIALIST_AVAILABILITY,
    icon: FaRegClock,
  },
  {
    label: "Configurações",
    href: RoutesUrls.SPECIALIST_SETTINGS,
    icon: AiOutlineSetting,
  },
];

export default function SpecialistSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await logout();
    router.push(RoutesUrls.BASE_URL);
  };

  return (
    <>
      {/* Mobile Show Button (not fixed so can be instantiated elsewhere) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-blue hover:bg-gray-50 transition-colors p-2 m-4 rounded z-50"
          aria-label="Abrir menu"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      )}
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed lg:relative top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-40 lg:z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <img
              src="/images/horizontal-logo.png"
              alt="Pulsar logo"
              className="w-20"
            />
          </Link>
          {/* Close Button (visible on mobile when sidebar is open, next to logo) */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-blue hover:bg-gray-50 transition-colors p-2 rounded"
              aria-label="Fechar menu"
            >
              <FontAwesomeIcon icon={faClose} className="text-lg" />
            </button>
          )}
        </div>
        {/* Logo Section */}

        {/* Menu Items */}
        <nav className="flex-1 pl-4 py-6">
          <div className="space-y-2" role="list">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.href} role="listitem">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue border-r-4 border-blue font-medium"
                        : "text-gray-dark hover:bg-gray-50 hover:text-blue"
                    }`}
                  >
                    <Icon className="text-lg w-5 h-5" />
                    <div>{item.label}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-dark hover:bg-red-50 hover:text-red-600 hover:cursor-pointer transition-all duration-200"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-lg w-5" />
            <div>Log out</div>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 lg:hidden z-30"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
