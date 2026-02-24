"use client";

import React from "react";
import SpinnerLoading from "@/components/SpinnerLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
  saving: boolean;
  saved: boolean;
};

export default function SaveStatus({ saving, saved }: Props) {
  if (!saving && !saved) return null;

  return (
    <div className="mt-4 text-sm text-gray-500">
      {saving ? (
        <span className="flex items-center gap-2">
          <SpinnerLoading /> Salvando...
        </span>
      ) : saved ? (
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCheck} /> Salvo!
        </span>
      ) : null}
    </div>
  );
}
