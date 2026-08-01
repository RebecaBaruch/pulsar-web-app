import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField";
import SelectInput from "@/components/SelectInput";
import { DateRangePicker } from "../DateRangePicker";

interface BlockFormPanelProps {
  blockType: string;
  setBlockType: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  startTime?: string;
  setStartTime?: (value: string) => void;
  endTime?: string;
  setEndTime?: (value: string) => void;
  reason: string;
  setReason: (value: string) => void;
  onAddBlock: () => void;
}

const blockTypeOptions = [
  { value: "Dia inteiro", label: "Dia inteiro" },
  { value: "Periodo", label: "Intervalo de datas" },
  { value: "Horario", label: "Horário" },
];

export const BlockFormPanel: React.FC<BlockFormPanelProps> = ({
  blockType,
  setBlockType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime = "08:00",
  setStartTime,
  endTime = "18:00",
  setEndTime,
  reason,
  setReason,
  onAddBlock,
}) => {
  return (
    <div className="lg:col-span-6 flex flex-col p-4 border border-gray-200 rounded-md bg-white gap-4">
      <SelectInput
        label="Tipo de bloqueio"
        placeholder="Selecione"
        options={blockTypeOptions}
        value={blockType}
        onChange={(val) =>
          setBlockType(Array.isArray(val) ? val[0] || "" : val)
        }
        width="full"
      />

      {blockType === "Dia inteiro" && (
        <InputField
          label="Data do bloqueio"
          type="date"
          value={startDate}
          onChange={(val) => {
            setStartDate(val);
            setEndDate(val);
          }}
          skipTypeValidation
          className="w-full"
        />
      )}

      {blockType === "Periodo" && (
        <div className="flex flex-col">
          <span className="block text-xs font-medium mb-1.5 text-black">
            Intervalo de datas
          </span>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onSelectRange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
        </div>
      )}

      {blockType === "Horario" && (
        <div className="flex flex-col gap-3">
          <InputField
            label="Data"
            type="date"
            value={startDate}
            onChange={(val) => {
              setStartDate(val);
              setEndDate(val);
            }}
            skipTypeValidation
            className="w-full"
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="block text-xs font-medium mb-1.5 text-black">
                Hora Início
              </span>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime && setStartTime(e.target.value)}
                className="w-full h-10 px-3 text-xs border border-gray-200 rounded bg-blue-lightest focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <span className="block text-xs font-medium mb-1.5 text-black">
                Hora Fim
              </span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime && setEndTime(e.target.value)}
                className="w-full h-10 px-3 text-xs border border-gray-200 rounded bg-blue-lightest focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      <InputField
        label="Motivo"
        placeholder="Ex: Férias, Compromisso pessoal"
        type="text"
        value={reason}
        onChange={setReason}
        className="w-full"
      />

      <div className="mt-1">
        <PrimaryButton
          text="Adicionar bloqueio"
          icon={faPlus}
          onClick={onAddBlock}
          color="blue"
        />
      </div>
    </div>
  );
};
