"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function CheckEmail() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <h1 className="text-2xl md:text-3xl lg:text-xl font-bold text-black">
            Cheque o seu e-mail!
          </h1>
          <FontAwesomeIcon
            icon={faCheckCircle}
            size="lg"
            className="text-green"
          />
        </div>
        <p className="text-sm md:text-xs text-gray-darkest">
          Caso o e-mail exista, te enviamos um link com os passos para
          recuperação.
        </p>
      </div>
      <Link
        href={RoutesUrls.BASE_URL}
        className="text-blue font-semibold hover:underline"
      >
        Voltar à página inicial
      </Link>
    </div>
  );
}
