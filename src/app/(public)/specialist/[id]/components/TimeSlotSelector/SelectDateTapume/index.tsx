import React from "react";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SelectDateTapume() {
  return (
    <div className="w-full rounded-md border border-gray-200 bg-gray-50 p-2 flex items-center justify-center gap-2">
      <FontAwesomeIcon icon={faCalendar} className="text-gray-400" size='sm' />
      <span className="text-gray-500 text-[10px] font-medium">
        Selecione uma data.
      </span>
    </div>
  );
}
