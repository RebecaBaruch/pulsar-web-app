import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-dark text-white px-6 py-10 mt-15">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img
            src="/images/logo-azul-branca.svg"
            alt="Pulsar Logo"
            className="h-10 mb-4"
          />
          <p className="text-sm">45.978.723/0001-06</p>
          <p className="text-sm">alex@psicofinorazen.com.br</p>
          <p className="text-sm">(11) 3021-6069</p>
        </div>

        <div>
          <h3 className="text-green font-semibold mb-3">Institucional</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Sobre a Pulsar</Link></li>
            <li><Link href="#">Política de Privacidade</Link></li>
            <li><Link href="#">Termos de Uso</Link></li>
            <li><Link href="#">Seja um(a) especialista</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-green font-semibold mb-3">Cuidados e Serviços</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Agendar uma sessão</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-green font-semibold mb-3">Conecte-se</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faTiktok} /></a>
            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center md:justify-between w-full mt-10 pt-4 text-xs text-center text-white-light">
        <p>
          © 2025 PULSAR TECNOLOGIA & DESENVOLVIMENTO PESSOAL LTDA. Todos os direitos reservados.
        </p>
        <p className="mt-2 md:mt-0">Desenvolvido por Lorem Ipsum</p>
      </div>
    </footer>
  );
}
