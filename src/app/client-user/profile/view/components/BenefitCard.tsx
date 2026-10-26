import { useAuth } from "@/auth/useAuth";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import InputField from "@/components/InputField";
import LinkButton from "@/components/LinkButton";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clientCardClass } from "@/components/ClientPage";
import React from "react";

export default function BenefitCard() {
  const [benefit, setBenefit] = React.useState("");

  // const { user } = useAuth();
  const user = {
    benefit: {
      active: true,
      code: "BENEFIT123",
      title: "Benefício Compass UOL",
      description:
        "20% de desconto nas especialidades selecionadas pela sua empresa.",
      banner:
        "https://esginside.com.br/wp-content/uploads/2024/06/compass-UOL-jpg.webp",
    },
  };

  const BenefitActivated = () => {
    return (
      <div
        className={`${clientCardClass} flex w-full flex-col gap-10 p-4 md:flex-row`}
      >
        <div className="flex h-40 flex-1 flex-col items-center justify-center gap-2 overflow-hidden rounded-lg bg-gray-light">
          <img
            src={user.benefit.banner}
            alt="Banner do benefício"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-4 text-gray-darkest">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{user.benefit.title}</h3>
            <p className="text-xs md:text-sm">{user.benefit.description}</p>
          </div>
          <div className="w-fit">
            <SecondaryButton
              text="Cancelar benefício"
              color="red"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {user?.benefit?.active ? (
        <BenefitActivated />
      ) : (
        <div
          className={`${clientCardClass} flex w-full flex-col gap-10 p-4 md:flex-row`}
        >
          <div className="flex flex-1 flex-col justify-center gap-1 text-gray-darkest">
            <div className="flex flex-row gap-2 items-center">
              <FontAwesomeIcon icon={faGift} size="lg" color="blue"/>
              <h3 className="text-xl font-semibold">Ative seu benefício!</h3>
            </div>
            <p className="text-xs md:text-sm">
              Tem um benefício para usar? Insira o código ao lado e aproveite as
              vantagens exclusivas.
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <InputField
              placeholder="Código do benefício"
              type="text"
              value={benefit ?? ""}
              onChange={(v) => setBenefit(v)}
            />
            <PrimaryButton text={"Aplicar benefício"} color="blue" />
          </div>
        </div>
      )}
    </>
  );
}
