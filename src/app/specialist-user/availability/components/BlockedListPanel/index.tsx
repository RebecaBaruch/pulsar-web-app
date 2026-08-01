import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { BlockedDate } from "../../hooks/useSpecificBlocks";
import { formatDateFriendly } from "@/utils/dateUtils";

interface BlockedListPanelProps {
  blockedList: BlockedDate[];
  onRemoveBlock: (id: string) => void;
}

export const BlockedListPanel: React.FC<BlockedListPanelProps> = ({
  blockedList,
  onRemoveBlock,
}) => {
  return (
    <div className="lg:col-span-6 flex flex-col border border-gray-200 rounded-md bg-white overflow-hidden min-h-[300px]">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-800">
          Datas bloqueadas
        </h3>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3 max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        {blockedList.length > 0 ? (
          blockedList.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-md bg-white shadow-sm gap-4"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 flex-shrink-0">
                  <FontAwesomeIcon
                    icon={item.startTime ? faClock : faCalendarDays}
                    className="text-lg"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-gray-800 whitespace-nowrap">
                      {formatDateFriendly(item.startDate)}
                    </span>
                    {item.startDate !== item.endDate && item.endDate && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        até {formatDateFriendly(item.endDate)}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                      {item.startTime
                        ? `${item.startTime} - ${item.endTime}`
                        : item.startDate === item.endDate
                        ? "Dia inteiro"
                        : "Período"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium mt-0.5 truncate max-w-[220px] lg:max-w-[300px]">
                    {item.reason}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemoveBlock(item.id)}
                className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer flex-shrink-0"
              >
                <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center h-full">
            <p className="text-xs text-slate-400 italic">
              Nenhum bloqueio cadastrado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};