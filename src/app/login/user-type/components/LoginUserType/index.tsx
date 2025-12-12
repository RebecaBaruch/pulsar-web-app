"use client";

import React from "react";
import UserSelectButton from "../UserSelectButton";
import { faUser, faStar } from "@fortawesome/free-regular-svg-icons";

export type LoginUserTypeValue = "client" | "specialist";

type Props = {
  onSelect: (value: LoginUserTypeValue) => void;
};

export default function LoginUserType({ onSelect }: Props) {
  return (
    <div className="flex flex-col w-full md:w-3/4 lg:w-fit gap-15 md:gap-8 lg:gap-10 xl:gap-12">
      <img
        src="/images/horizontal-logo.png"
        alt="Logo da Pulsar"
        className="lg:w-[150px] w-[150px]"
      />

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-black">
          Acesso personalizado
        </h1>
        <p className="text-lg md:text-md lg:text-md text-gray-darkest">
          Escolha seu perfil para continuar
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <UserSelectButton
          title="Cliente"
          description="Entre na sua conta e agende uma sessão"
          onClick={() => onSelect("client")}
          icon={faUser}
        />

        <UserSelectButton
          title="Especialista"
          description="Acompanhe seus atendimentos"
          onClick={() => onSelect("specialist")}
          icon={faStar}
        />
      </div>
    </div>
  );
}
