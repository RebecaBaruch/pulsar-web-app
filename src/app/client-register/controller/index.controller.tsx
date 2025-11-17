"use client";

import React, { JSX } from "react";
import ClientRegisterView from "../view/index.view";
import PersonalUserForm from "../components/PersonalUserForm";
import EmergencyForm from "../components/EmergencyForm";
import AddressForm from "../components/AddressForm";
import ChoosePasswordForm from "../components/ChoosePasswordForm";
import TermsOfUse from "../components/TermsOfUse";

export default function ClientRegisterController() {
  /**
   * Implements internal step navigation for a multi-step form using the browser's
   * History API. Each step transition is stored with pushState to support native
   * browser back/forward buttons. The component listens to "popstate" events to
   * restore the correct step without changing routes or URLs.
   */
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
    3: <AddressForm onNext={handleNext} onBack={handleBack} />,
    4: <ChoosePasswordForm onNext={handleNext} onBack={handleBack} />,
    5: <TermsOfUse onConcludeIt={() => {}} onCancelIt={() => {}} />
  };

  return <ClientRegisterView stepComponent={steps[step]} />;
}
