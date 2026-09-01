"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";
import FooterSkeleton from "./FooterSkeleton";

export default function Footer() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <FooterSkeleton />;
  }

  return (
    <footer className="w-full bg-[#f9fafb] text-gray-700 pt-12">
      {/* Conteúdo Principal do Footer */}
      <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Coluna 1: Logo, Slogan e Redes */}
          <div className="flex flex-col items-start space-y-4">
            <Image
              src="/images/logo-azul.svg" // Ajuste o caminho se necessário para o logo colorido
              alt="Pulsar Logo"
              width={160}
              height={50}
              className="h-auto w-auto"
            />
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              O espaço de sua saúde mental online, lugar do seu cuidado
              psicológico!
            </p>
            <div className="flex items-center space-x-4 text-gray-800 text-lg pt-1">
              <a
                href="https://www.instagram.com/soupulsar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-blue transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.facebook.com/Soupulsarr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue transition-colors"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://www.tiktok.com/@soupulsar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:text-blue transition-colors"
              >
                <FontAwesomeIcon icon={faTiktok} />
              </a>
              <a
                href="https://www.youtube.com/@soupulsar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-blue transition-colors"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Coluna 2: Institucional */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-base font-semibold text-gray-900">
              Institucional
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  Sobre a Pulsar
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  Seja um(a) especialista
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Cuidados e Serviços */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-base font-semibold text-gray-900">
              Cuidados e Serviços
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  Agendar uma sessão
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Entre em Contato */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-base font-semibold text-gray-900">
              Entre em contato
            </h3>
            <div className="space-y-1 text-sm text-gray-500 uppercase">
              <p>
                <a
                  href="mailto:alex@principiokaizen.com.br"
                  className="hover:text-gray-900 transition-colors"
                >
                  alex@principiokaizen.com.br
                </a>
              </p>
              <p>(11) 3591-6089</p>
            </div>
          </div>
        </div>
      </div>

      {/* Faixa Inferior (Sub-footer Azul) */}
      <div className="w-full bg-blue text-white text-xs py-4">
        <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p>
            © 2026 SM PSICOLOGIA TREINAMENTO E DESENVOLVIMENTO PESSOAL LTDA.
            Todos os direitos reservados.
          </p>
          <p className="font-medium">45.199.723/0001-08</p>
          <p>
            Desenvolvido por{" "}
            <span className="font-semibold">
              <Link
                href="https://www.linkedin.com/in/rebeca-baruch/"
                target="_blank"
                className="hover:underline"
              >
                Rebeca Baruch
              </Link>
              {" "} & {" "}
              <Link
                href="https://www.linkedin.com/in/mateus-ribeiro/"
                target="_blank"
                className="hover:underline"
              >
                Mateus Ribeiro
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
