"use client";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import React from "react";

export type BenefitCheckProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  benefitTitle?: string;
  benefitDiscount?: string;
};

export default function BenefitCheck({
  checked = false,
  onChange,
  benefitTitle,
  benefitDiscount,
}: BenefitCheckProps) {
  const noBenefit = (
    <p className="text-xs text-gray-dark">
      Nenhum benefício disponível no momento.
    </p>
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-medium">Usar benefício</h2>
      <div className="flex flex-row items-center text-gray-darkest p-4 bg-white rounded-lg shadow-sm">
        {benefitTitle && benefitDiscount ? (
          <div className="flex flex-row items-center gap-2 text-gray-darkest">
            <CustomCheckbox checked={checked} onChange={onChange} />
            <div className="w-full flex flex-row items-center space-between gap-8">
              <h3 className="text-sm">{benefitTitle}</h3>
              <p className="text-xs text-gray-dark">{benefitDiscount}</p>
            </div>
          </div>
        ) : (
          noBenefit
        )}
      </div>
    </div>
  );
}
