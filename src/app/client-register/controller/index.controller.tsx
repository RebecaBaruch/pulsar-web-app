// src/app/register/controller/index.controller.tsx

"use client";

import React, { JSX } from "react";
import ClientRegisterView from "../view/index.view";
import WelcomeStep from "../components/WelcomeStep"; // << NOVO COMPONENTE
import PersonalDataForm from "../components/PersonalDataForm"; // << AGORA STEP 2
import EmergencyForm from "../components/EmergencyForm";
import AddressForm from "../components/AddressForm";
import ChoosePasswordForm from "../components/ChoosePasswordForm";

export default function ClientRegisterController() {
  const [step, setStep] = React.useState(1);

  React.useEffect(() => {
    const stored = history.state?.step;

    if (typeof stored === "number") {
      setStep(stored);
    } else {
      history.replaceState({ step: 1 }, "");
    }
  }, []);

  React.useEffect(() => {
    const handlePop = (event: PopStateEvent) => {
      const s = event.state?.step;

      if (typeof s === "number") {
        setStep(s);
      }
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const goToStep = (newStep: number) => {
    const totalSteps = Object.keys(steps).length;
    if (newStep >= 1 && newStep <= totalSteps) {
      setStep(newStep);
      history.pushState({ step: newStep }, "");
    }
  };

  const handleNext = () => goToStep(step + 1);
  const handleBack = () => goToStep(step - 1);

  const steps: Record<number, JSX.Element> = {
    1: <WelcomeStep onNext={handleNext} />,
    2: <PersonalDataForm onNext={handleNext} onBack={handleBack} />,
    3: <EmergencyForm onNext={handleNext} onBack={handleBack} />,
    4: <AddressForm onNext={handleNext} onBack={handleBack} />,
    5: <ChoosePasswordForm onNext={handleNext} onBack={handleBack} />,
  };

  const stepTitles: string[] = [
    "Cadastro",
    "Dados Pessoais",
    "Contato de Emergência",
    "Endereço",
    "Definir Senha",
    "Conclusão",
  ];

  const totalSteps = Object.keys(steps).length;

  return (
    <ClientRegisterView
      stepComponent={steps[step]}
      currentStep={step}
      totalSteps={totalSteps}
      stepTitles={stepTitles}
    />
  );
}
