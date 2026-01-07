"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField";
import React from "react";
import CheckEmail from "../components/CheckEmail";

type ForgotPasswordProps = {
  email: string;
  error?: string;
  // isLoading: boolean;
  sent: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function ForgotPasswordView({
  email,
  sent,
  onEmailChange,
  onSubmit,
}: ForgotPasswordProps) {
  return (
    <section className="flex w-screen min-h-screen justify-center pt-15">
      <div className="flex flex-col w-full p-6 md:p-15 lg:py-10 lg:px-6 lg:max-w-lg gap-15 md:gap-15">
        <img
          src="/images/horizontal-logo.png"
          alt="Logo da Pulsar"
          className="lg:w-[150px] w-[150px]"
        />

        {sent ? (
          <CheckEmail />
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-black">
                Esqueceu sua senha?
              </h1>
              <p className="text-lg md:text-md lg:text-md text-gray-darkest">
                Digite o endereço de e-mail associado à sua conta e vamos te
                enviar um link para redefinir a sua senha.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <form
                onSubmit={onSubmit}
                className="flex flex-col items-center gap-6"
              >
                <div className="flex flex-col gap-6 w-full">
                  <InputField
                    type="text"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={onEmailChange}
                    required
                  />
                </div>

                <PrimaryButton type="submit" text="Enviar" />
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
