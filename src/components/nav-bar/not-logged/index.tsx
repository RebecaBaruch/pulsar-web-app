import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendar, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// import { RoutesUrls } from "@/utils/enum/routes-url";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

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
              href="#specs-section"
              className="text-gray-dark hover:text-blue text-base lg:text-sm"
            >
              Especialidades
            </Link>
          </li>
          <li>
            <Link
              href="#about-section"
              className="text-gray-dark hover:text-blue text-base lg:text-sm"
            >
              Quem somos
            </Link>
          </li>
          <li>
            <Link
              href="#for-companies-section"
              className="text-gray-dark hover:text-blue text-base lg:text-sm"
            >
              Para empresas
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
          <Link
            href="#specs-section"
            className="text-gray-700 hover:text-blue text-lg"
            onClick={() => setIsOpen(false)}
          >
            Epecialidades
          </Link>
          <Link
            href="#about-section"
            className="text-gray-700 hover:text-blue text-lg"
            onClick={() => setIsOpen(false)}
          >
            Quem somos
          </Link>
          <Link
            href="#for-companies-section"
            className="text-gray-700 hover:text-blue text-lg"
            onClick={() => setIsOpen(false)}
          >
            Para empresas
          </Link>
          <hr className="w-full border-gray-300" />

          <Link
            href="https://wa.me/+5511976121123"
            className="bg-blue w-full p-2 rounded-md text-white text-center hover:bg-blue-light gap-2"
          >
            Agendar uma consulta <FontAwesomeIcon icon={faWhatsapp} />
          </Link>
        </div>
      </div>
    </div>
  );
}
