import React from "react";
import { BlockedDate } from "../../hooks/useSpecificBlocks";
import { BlockFormPanel } from "../BlockFormPanel";
import { BlockedListPanel } from "../BlockedListPanel";

interface SpecificBlocksCardProps {
  blockedList: BlockedDate[];
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
  onRemoveBlock: (id: string) => void;
}

export const SpecificBlocksCard: React.FC<SpecificBlocksCardProps> = (
  props,
) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
          Bloqueios específicos
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Configure horários e datas de folgas ou férias específicas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start w-full">
        <BlockFormPanel {...props} />
        <BlockedListPanel
          blockedList={props.blockedList}
          onRemoveBlock={props.onRemoveBlock}
        />
      </div>
    </div>
  );
};
