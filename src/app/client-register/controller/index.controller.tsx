"use client";

import React, { JSX } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ClientRegisterView from "../view/index.view";
import PersonalUserForm from "../components/personal-user-form";
import EmergencyForm from "../components/emergency-form";

export default function ClientRegisterController() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = React.useState(1);

  React.useEffect(() => {
    const stepFromUrl = Number(searchParams.get("step")) || 1;
    setStep(stepFromUrl);
  }, [searchParams]);

  const goToStep = (newStep: number) => {
    router.replace(`?step=${newStep}`);
  };

  const handleNext = () => goToStep(step + 1);
  const handleBack = () => goToStep(step - 1);

  const steps: Record<number, JSX.Element> = {
    1: <PersonalUserForm onNext={handleNext} />,
    2: <EmergencyForm onNext={handleNext} onBack={handleBack} />,
  };

  return <ClientRegisterView stepComponent={steps[step]} />;
}
