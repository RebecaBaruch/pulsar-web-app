"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function CheckEmail() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-black">
            Cheque o seu e-mail!
          </h1>
          <FontAwesomeIcon
            icon={faCheckCircle}
            size="lg"
            className="text-green"
          />
        </div>
        <p className="text-lg md:text-md lg:text-md text-gray-darkest">
          Caso o e-mail exista, te enviamos um link com os passos para
          recuperação.
        </p>
      </div>
      <a href="/" className="text-blue font-semibold hover:underline">
        Voltar à página incial
      </a>
    </div>
  );
}
