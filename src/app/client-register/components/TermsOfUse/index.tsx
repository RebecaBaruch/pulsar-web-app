"use client";

import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { CustomCheckbox } from "@/components/CustomCheckbox";

type TermsOfUseProps = {
  onConcludeIt: () => void;
  onCancelIt: () => void;
};

export default function TermsOfUse({
  onConcludeIt,
  onCancelIt,
}: TermsOfUseProps) {
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  return (
    <div className="flex flex-col gap-12 h-fit">
      <img
        src="/images/horizontal-logo.png"
        alt="Logo da Pulsar"
        width="200px"
      />

      <div>
        <h1 className="text-2xl font-bold text-black">Termos de Uso</h1>
        <p className="font-medium">Leia com atenção</p>
      </div>

      <div className="flex flex-col gap-7">
        <div className="border border-gray-light bg-blue-lightest p-4 rounded-lg h-[40vh] overflow-y-scroll text-gray">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tortor odio, faucibus vitae leo quis, suscipit consectetur augue.
            Maecenas vulputate sodales nisi quis condimentum. Phasellus vitae mi
            id nibh accumsan sagittis. Morbi quis ante vel nibh posuere finibus.
            Duis eget diam vel lectus ultricies interdum at viverra metus.
            Maecenas semper, nisl vel facilisis tincidunt, est sem luctus velit,
            vel consectetur nunc eros et neque. Integer bibendum, purus vel
            ultricies hendrerit, ligula ex feugiat magna, sit amet tristique
            magna turpis at nisl. Fusce nunc metus, imperdiet sed lorem non,
            bibendum viverra libero. Sed iaculis turpis felis, ut tempus velit
            dictum quis. Ut eu diam accumsan, fermentum justo sed, luctus dolor.
            Vivamus euismod, libero in facilisis efficitur, ligula erat
            convallis risus, in dignissim erat odio a erat. Nullam euismod,
            augue in facilisis facilisis, libero erat fringilla nunc, in congue
            libero risus a est. In hac habitasse platea dictumst. Aenean
            euismod, risus et facilisis cursus, enim erat faucibus nunc, in
            convallis ligula odio a justo. Curabitur euismod, nisl vel
            consectetur interdum, nisl nisi aliquam nunc, at convallis enim leo
            in nunc.
          </p>
        </div>

        <CustomCheckbox
          label="Eu li e concordo com os Termos de Uso"
          checked={acceptedTerms}
          onChange={setAcceptedTerms}
        />

        <div className="flex flex-col justify-center items-center gap-4 mt-3">
          <PrimaryButton
            text="Concluir cadastro"
            onClick={onConcludeIt}
            isDisabled={!acceptedTerms}
          />
          <SecondaryButton text="Cancelar" onClick={onCancelIt} />
        </div>
      </div>
    </div>
  );
}
