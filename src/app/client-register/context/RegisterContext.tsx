"use client";

import React, { createContext, useContext, useState } from "react";

type RegisterData = {
  email: string;
  personal: {
    name: string;
    cpf: string;
    birthdate: string;
    phone: string;
    countryCode: string;
  };
  emergency: {
    contactName: string;
    relationship: string;
    phone: string;
    countryCode: string;
  };
  address: {
    zipCode: string;
    countryName: string;
    state: string;
    city: string;
    district: string;
    street: string;
    number: string;
    complement: string;
    noNumber: boolean;
  };
  security: {
    password: string;
    confirmPassword: string;
  };
};

type OnlyObjectKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends any[]
      ? never
      : K
    : never;
}[keyof T];

type RegisterContextType = {
  data: RegisterData;

  update: (patch: Partial<RegisterData>) => void;

  updateNested: <K extends OnlyObjectKeys<RegisterData>>(
    key: K,
    patch: Partial<RegisterData[K]>
  ) => void;
};

const defaultValue: RegisterData = {
  email: "",
  personal: {
    name: "",
    cpf: "",
    birthdate: "",
    phone: "",
    countryCode: "+55",
  },
  emergency: {
    contactName: "",
    relationship: "",
    phone: "",
    countryCode: "+55",
  },
  address: {
    zipCode: "",
    countryName: "brazil",
    state: "",
    city: "",
    district: "",
    street: "",
    number: "",
    complement: "",
    noNumber: false,
  },
  security: {
    password: "",
    confirmPassword: "",
  },
};

const RegisterContext = createContext<RegisterContextType | null>(null);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<RegisterData>(defaultValue);

  function update(patch: Partial<RegisterData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function updateNested<K extends OnlyObjectKeys<RegisterData>>(
    key: K,
    patch: Partial<RegisterData[K]>
  ) {
    setData((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...patch },
    }));
  }

  return (
    <RegisterContext.Provider value={{ data, update, updateNested }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  const ctx = useContext(RegisterContext);
  if (!ctx) throw new Error("useRegister must be used inside RegisterProvider");
  return ctx;
}
