"use client";

import React from "react";
import UserSelectButton from "../UserSelectButton";
import { faUser, faStar } from "@fortawesome/free-regular-svg-icons";

export type LoginUserTypeValue = "CLIENT" | "SPECIALIST";

type Props = {
  onSelect: (value: LoginUserTypeValue) => void;
};

export default function LoginUserType({ onSelect }: Props) {
  return (
    <div className="flex flex-col w-full md:w-3/4 lg:w-fit gap-8">
      <img
        src="/images/horizontal-logo.png"
        alt="Logo da Pulsar"
        className="w-[100px]"
      />

      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-md font-bold text-black">
          Acesso personalizado
        </h1>
        <p className="text-sm md:text-sm text-gray-darkest">
          Escolha seu perfil para continuar
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <UserSelectButton
          title="Cliente"
          description="Entre na sua conta e agende uma sessão"
          onClick={() => onSelect("CLIENT")}
          icon={faUser}
        />

        <UserSelectButton
          title="Especialista"
          description="Acompanhe seus atendimentos"
          onClick={() => onSelect("SPECIALIST")}
          icon={faStar}
        />
      </div>
    </div>
  );
}
