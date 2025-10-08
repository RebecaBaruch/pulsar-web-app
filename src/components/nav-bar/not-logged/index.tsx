import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendar, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function NotLoggedNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="w-full p-7">
      <nav className="max-w-[1440px] mx-auto flex flex-row justify-between items-center flex-wrap">
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
            <Link
              href="/"
              className="bg-blue p-3 lg:p-2 rounded-md text-white hover:bg-blue-dark text-base lg:text-sm"
            >
              Criar uma conta
            </Link>
          </li>
          <li>
            <Link
              href="/"
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
      >
        <div className="flex justify-between items-center p-7 border-b border-gray-200">
          <Link href="/">
            <img
              src="/images/horizontal-logo.png"
              alt="Pulsar logo"
              className="w-28"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-blue"
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
            href="/"
            className="w-full bg-blue p-2 rounded-md text-white text-center hover:bg-blue-dark"
          >
            Criar uma conta
          </Link>
          <Link
            href="/"
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
