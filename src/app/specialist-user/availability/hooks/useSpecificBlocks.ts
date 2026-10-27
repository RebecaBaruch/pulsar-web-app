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
  const [blockedList, setBlockedList] = useState<BlockedDate[]>([]);
  const [blockType, setBlockType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleAddBlock = () => {
    if (!startDate || !blockType) return;

    const newBlock: BlockedDate = {
      id: Math.random().toString(36).substring(2, 9),
      type: blockType,
      startDate,
      endDate: endDate || startDate,
      reason: reason || "Bloqueio de agenda",
    };

    setBlockedList((prev) => [newBlock, ...prev]);
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
    setBlockedList,
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
