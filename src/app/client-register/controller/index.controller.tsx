"use client";

import React, { JSX } from "react";
import ClientRegisterView from "../view/index.view";
import WelcomeStep from "../components/WelcomeStep";
import PersonalDataForm from "../components/PersonalDataForm";
import EmergencyForm from "../components/EmergencyForm";
import AddressForm from "../components/AddressForm";
import ChoosePasswordForm from "../components/ChoosePasswordForm";
import { RegisterProvider } from "../context/RegisterContext";
import SpinnerLoading from "@/components/SpinnerLoading";

type Step = 1 | 2 | 3 | 4 | 5;
const STORAGE_KEY = "register_step";

function clampStep(n: number): Step {
  if (n < 1) return 1;
  if (n > 5) return 5;
  return n as Step;
}

export default function ClientRegisterController() {
  const [step, setStep] = React.useState<Step | null>(null);

  React.useEffect(() => {
    try {
      const fromStorage = sessionStorage.getItem(STORAGE_KEY);

      if (fromStorage) {
        const parsed = Number(fromStorage);
        if (!Number.isNaN(parsed)) {
          const s = clampStep(parsed);
          setStep(s);

          history.replaceState({ step: s }, "");
          return;
        }
      }

      const fromHistory = history.state?.step;

      if (typeof fromHistory === "number") {
        const s = clampStep(fromHistory);
        setStep(s);
        return;
      }

      history.replaceState({ step: 1 }, "");
      setStep(1);
    } catch {
      history.replaceState({ step: 1 }, "");
      setStep(1);
    }
  }, []);

  React.useEffect(() => {
    const onPop = (ev: PopStateEvent) => {
      const newStep = ev.state?.step;

      if (typeof newStep === "number") {
        const s = clampStep(newStep);
        setStep(s);

        try {
          sessionStorage.setItem(STORAGE_KEY, String(s));
        } catch {}
      }
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const goToStep = (newStepNumber: number) => {
    const s = clampStep(newStepNumber);
    setStep(s);

    try {
      history.pushState({ step: s }, "");
      sessionStorage.setItem(STORAGE_KEY, String(s));
    } catch {
      history.pushState({ step: s }, "");
    }
  };

  const handleNext = () => step && goToStep(step + 1);
  const handleBack = () => step && goToStep(step - 1);

  const steps: Record<Step, JSX.Element> = {
    1: <WelcomeStep onNext={handleNext} />,
    2: <PersonalDataForm onNext={handleNext} onBack={handleBack} />,
    3: <EmergencyForm onNext={handleNext} onBack={handleBack} />,
    4: <AddressForm onNext={handleNext} onBack={handleBack} />,
    5: <ChoosePasswordForm onNext={handleNext} onBack={handleBack} />,
  };

  const stepTitles = [
    "Cadastro",
    "Dados Pessoais",
    "Contato de Emergência",
    "Endereço",
    "Definir Senha",
    "Conclusão",
  ];

  if (step === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SpinnerLoading />
      </div>
    );
  }

  return (
    <RegisterProvider>
      <ClientRegisterView
        stepComponent={steps[step]}
        currentStep={step}
        totalSteps={5}
        stepTitles={stepTitles}
      />
    </RegisterProvider>
  );
}
