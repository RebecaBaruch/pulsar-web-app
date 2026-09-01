"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendar, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { RoutesUrls } from "@/utils/enum/routes-url";
import NotLoggedNavBarSkeleton from "./NotLoggedNavBarSkeletion";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useRouter } from "next/navigation";

export default function NotLoggedNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <NotLoggedNavBarSkeleton />;
  }

  return (
    <div className="w-screen bg-white shadow-gray-100 shadow-md sticky top-0 z-50">
      <nav
        className="w-full max-w-[1200px] md:mx-auto p-4 md:p-5 flex flex-row justify-between items-center flex-wrap"
        aria-label="Barra de navegação principal"
      >
        <Link href="/">
          <Image
            src="/images/horizontal-logo.png"
            alt="Pulsar logo"
            width={100}
            height={50}
          />
        </Link>

        <button
          className="lg:hidden text-blue text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <ul className="hidden lg:flex lg:items-center lg:space-x-6 list-none p-0 m-0">
          <li>
            <Link
              href="/"
              className="text-gray-dark hover:text-blue text-base lg:text-sm"
            >
              Especialidades
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-gray-dark hover:text-blue text-base lg:text-sm"
            >
              Quem somos
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-gray-dark hover:text-blue text-base lg:text-sm"
            >
              Para empresas
            </Link>
          </li>
        </ul>

        <ul className="hidden lg:flex lg:items-center lg:space-x-6 list-none p-0 m-0">
          <li>
            <Link
              href={RoutesUrls.FIND_SPECIALIST}
              className="text-blue hover:text-blue-dark flex items-center gap-2 text-base lg:text-sm"
            >
              Agendar uma consulta <FontAwesomeIcon icon={faCalendar} />
            </Link>
          </li>
          <li>
            <PrimaryButton
              text={"Criar uma conta"}
              onClick={() => router.replace(RoutesUrls.CLIENT_REGISTER)}
            />
          </li>
          <li>
            <Link
              href={RoutesUrls.USER_TYPE}
              className="text-blue hover:text-blue-dark text-base lg:text-sm"
            >
              Entrar
            </Link>
          </li>
        </ul>
      </nav>

      <div
        className={`
            fixed inset-0 z-50 bg-white flex flex-col 
            transition duration-300 ease-in-out
            ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-5 pointer-events-none"}
          `}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label="Menu de navegação móvel"
      >
        <div className="flex justify-between items-center p-7 border-b border-gray-200">
          <Link href="/">
            <Image
              src="/images/horizontal-logo.png"
              alt="Pulsar logo"
              width={28}
              height={50}
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-blue"
            aria-label="Fechar menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 space-y-6 px-10">
          <Link href="/" className="text-gray-700 hover:text-blue text-lg">
            Quem somos
          </Link>
          <Link href="/" className="text-gray-700 hover:text-blue text-lg">
            Especialidades
          </Link>
          <Link href="/" className="text-gray-700 hover:text-blue text-lg">
            Quero ser Pulsar
          </Link>
          <hr className="w-full border-gray-300" />
          <Link
            href={RoutesUrls.CLIENT_REGISTER}
            className="w-full bg-blue p-2 rounded-md text-white text-center hover:bg-blue-dark"
          >
            Criar uma conta
          </Link>
          <Link
            href={RoutesUrls.USER_TYPE}
            className="w-full border border-blue p-2 rounded-md text-blue text-center hover:bg-blue-light"
          >
            Entrar
          </Link>
          <Link
            href="/"
            className="text-blue hover:text-blue-dark flex items-center gap-2"
          >
            Agendar uma consulta <FontAwesomeIcon icon={faCalendar} />
          </Link>
        </div>
      </div>
    </div>
  );
}
