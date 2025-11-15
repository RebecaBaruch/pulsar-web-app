"use client";

import React, { JSX} from "react";
import ClientRegisterView from "../view/index.view";
import PersonalUserForm from "../components/personal-user-form";
import EmergencyForm from "../components/emergency-form";
import AddressForm from "../components/address-form";

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
    setStep(newStep);
    history.pushState({ step: newStep }, "");
  };

  const handleNext = () => goToStep(step + 1);
  const handleBack = () => goToStep(step - 1);

  const steps: Record<number, JSX.Element> = {
    1: <PersonalUserForm onNext={handleNext} />,
    2: <EmergencyForm onNext={handleNext} onBack={handleBack} />,
    3: <AddressForm onNext={handleNext} onBack={handleBack} />
  };

  return <ClientRegisterView stepComponent={steps[step]} />;
}
