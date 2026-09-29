import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

type SpecCardProps = {
  icon: IconProp;
  title: string;
  introDescription: string;
  description: string;
  href: string;
};

export default function SpecCard({
  icon,
  title,
  introDescription,
  description,
  href,
}: SpecCardProps) {
  return (
    <Link href={href} className="block h-full group">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
        <div>
          {/* Badge do Ícone */}
          <div className="p-2.5 bg-blue/10 group-hover:bg-blue text-blue group-hover:text-white w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300">
            <FontAwesomeIcon icon={icon} className="w-5 h-5 text-lg" />
          </div>

          {/* Conteúdo de Texto */}
          <div className="mt-4 space-y-1.5">
            <h3 className="text-base lg:text-lg text-blue font-semibold group-hover:text-blue-dark transition-colors">
              {title}
            </h3>
            <p className="text-xs lg:text-sm text-gray- dark leading-relaxed">
              <span className="font-semibold text-gray-darkest">
                {introDescription}
              </span>{" "}
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}