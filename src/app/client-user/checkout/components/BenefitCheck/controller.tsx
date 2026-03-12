import { useState } from "react";
import { BenefitCheckProps } from "./index";

export function useBenefitCheck(
  initialChecked: boolean,
  benefitTitle?: string,
  benefitDiscount?: string,
): BenefitCheckProps {
  const [checked, setChecked] = useState(initialChecked);

  return {
    checked,
    onChange: setChecked,
    benefitTitle,
    benefitDiscount,
  };
}
