import { useAuth } from "@/auth/useAuth";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clientCardClass } from "@/components/ClientPage";
import React from "react";
import { toast } from "sonner";

export default function BenefitCard() {
  const [benefit, setBenefit] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const { user } = useAuth();

  return (
    <div
      className={`${clientCardClass} flex w-full flex-col gap-10 p-4 md:flex-row`}
    >
      <div className="flex flex-1 flex-col justify-center gap-1 text-gray-darkest">
        <div className="flex flex-row items-center gap-2">
          <FontAwesomeIcon icon={faGift} size="lg" color="blue" />
          <h3 className="text-xl font-semibold">Ative seu benefício!</h3>
        </div>
        <p className="text-xs md:text-sm">
          Tem um benefício para usar? Solicite o código no seu e-mail corporativo
          e informe-o abaixo.
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <InputField
          placeholder="Código do benefício"
          type="text"
          value={benefit}
          onChange={(v) => setBenefit(v)}
        />
        <PrimaryButton
          text={submitting ? "Enviando…" : "Solicitar código por e-mail"}
          color="blue"
          isDisabled={submitting}
          onClick={async () => {
            if (submitting) return;
            setSubmitting(true);
            try {
              const res = await fetch("/api/partners/request-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user?.email }),
              });
              if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error ?? "Falha ao solicitar código");
              }
              toast.success("Verifique seu e-mail para ativar o benefício.");
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Erro ao solicitar código do benefício.",
              );
            } finally {
              setSubmitting(false);
            }
          }}
        />
      </div>
    </div>
  );
}
