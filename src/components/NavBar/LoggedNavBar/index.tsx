"use client";

import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useAuth } from "@/auth/useAuth";
import LoggedNavBarSkeleton from "./LoggedNavBarSkeleton";

export default function LoggedNavBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const userMenuRef = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleSignOut = async () => {
    await logout();
    // Navigate to home after logout completes
    router.push(RoutesUrls.BASE_URL);
  };

  const isActive = (path: string) => {
    return pathname === path
      ? "text-blue font-semibold"
      : "text-gray-dark hover:text-blue";
  };

  if (loading) {
    return <LoggedNavBarSkeleton />;
  }

  return (
    <>
      <div className="w-screen p-7 border-b border-gray-300">
        <nav
          className="w-full max-w-[1440px] md:mx-auto md:px-10 flex flex-row justify-between items-center flex-wrap"
          aria-label="Barra de navegação do usuário logado"
        >
          <Link href="/">
            <img
              src="/images/horizontal-logo.png"
              alt="Pulsar logo"
              className="w-28"
            />
          </Link>

          <button
            className="lg:hidden text-blue text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-controls="mobile-menu-logged"
            aria-expanded={isOpen}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex lg:items-center lg:space-x-6 list-none p-0 m-0">
            <li>
              <Link
                href={RoutesUrls.CLIENT_HOME}
                className={`${isActive(RoutesUrls.CLIENT_HOME)} text-base lg:text-sm`}
                aria-current={
                  pathname === RoutesUrls.CLIENT_HOME ? "page" : undefined
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={RoutesUrls.FIND_SPECIALIST}
                className={`${isActive(RoutesUrls.FIND_SPECIALIST)} text-base lg:text-sm`}
                aria-current={
                  pathname === RoutesUrls.FIND_SPECIALIST ? "page" : undefined
                }
              >
                Especialistas
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className={`${isActive("/sessions")} text-base lg:text-sm`}
                aria-current={pathname === "/sessions" ? "page" : undefined}
              >
                Sessões
              </Link>
            </li>
          </ul>

          <ul className="hidden lg:flex lg:items-center lg:space-x-6 list-none p-0 m-0">
            <li>
              <button
                aria-label="Notificações"
                className="text-blue text-lg"
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faBell} />
              </button>
            </li>
            <li className="relative" ref={userMenuRef}>
              <button
                aria-label="Abrir menu do usuário"
                aria-controls="user-menu"
                aria-expanded={userMenuOpen}
                className="text-blue text-lg"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
              {userMenuOpen && (
                <div
                  id="user-menu"
                  role="menu"
                  aria-label="Menu do usuário"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                >
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      router.push("/profile");
                    }}
                    role="menuitem"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-dark hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleSignOut();
                    }}
                    role="menuitem"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-dark hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu-logged"
            className="lg:hidden mt-4"
            role="region"
            aria-label="Menu móvel"
          >
            <ul className="flex flex-col space-y-4 list-none p-0 m-0">
              <li>
                <Link
                  href={RoutesUrls.CLIENT_HOME}
                  className={`${isActive(RoutesUrls.CLIENT_HOME)} text-base block`}
                  onClick={() => setIsOpen(false)}
                  aria-current={
                    pathname === RoutesUrls.CLIENT_HOME ? "page" : undefined
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={RoutesUrls.FIND_SPECIALIST}
                  className={`${isActive(RoutesUrls.FIND_SPECIALIST)} text-base block`}
                  onClick={() => setIsOpen(false)}
                  aria-current={
                    pathname === RoutesUrls.FIND_SPECIALIST ? "page" : undefined
                  }
                >
                  Especialistas
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className={`${isActive("/sessions")} text-base block`}
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname === "/sessions" ? "page" : undefined}
                >
                  Sessões
                </Link>
              </li>
              <li className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/profile");
                  }}
                  className="text-gray-dark hover:text-blue text-base block w-full text-left"
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  className="text-gray-dark hover:text-blue text-base block w-full text-left"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
