import { useState } from "react";

export interface BlockedDate {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  reason: string;
}

export function useSpecificBlocks() {
  // Lista inicial com o item que aparece na sua imagem de exemplo
  const [blockedList, setBlockedList] = useState<BlockedDate[]>([
    {
      id: "1",
      type: "Especifico",
      startDate: "2026-07-15",
      endDate: "2026-07-15",
      reason: "Compromisso pessoal",
    },
  ]);

  // Estados do formulário
  const [blockType, setBlockType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleAddBlock = () => {
    if (!startDate || !blockType) return; // Validação básica

    const newBlock: BlockedDate = {
      id: Math.random().toString(36).substring(2, 9),
      type: blockType,
      startDate,
      endDate: endDate || startDate, // Se não houver fim, assume o mesmo dia
      reason: reason || "Bloqueio de agenda",
    };

    setBlockedList((prev) => [newBlock, ...prev]);

    // Limpar campos
    setBlockType("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  const handleRemoveBlock = (id: string) => {
    setBlockedList((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    blockedList,
    blockType,
    setBlockType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    reason,
    setReason,
    handleAddBlock,
    handleRemoveBlock,
  };
}