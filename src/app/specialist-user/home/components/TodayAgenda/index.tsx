import LinkButton from "@/components/LinkButton";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { FaCheck, FaClock, FaFileLines } from "react-icons/fa6";

export interface TodayAgendaData {
  completed: number;
  remaining: number;
  total: number;
  progressPercentage: number;
}

interface TodayAgendaProps {
  data: TodayAgendaData;
}

export function TodayAgenda({ data }: TodayAgendaProps) {
  const clampedProgress = Math.min(Math.max(data.progressPercentage, 0), 100);

  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-md-gray-light flex flex-col justify-between md:min-h-[340px]">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-base md:text-lg font-bold text-gray-900">Agenda de hoje</h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Acompanhe o status dos seus atendimentos de hoje.
          </p>
        </div>

        {/* Progresso */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Progresso
            </span>
            <span className="text-md font-bold text-blue-500">
              {clampedProgress}%
            </span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
        </div>

        {/* Grade de Indicadores Sem Cortes */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
          
          {/* Concluídos */}
          <div className="bg-green-100/50 rounded-md p-2.5 sm:p-3 flex flex-col justify-between min-h-[85px]">
            <div className="flex flex-col sm:flex-row items-left sm:items-center gap-1 md:gap-2 text-green-700">
              <FaCheck size={11} className="flex-shrink-0 sm:block" />
              <span className="text-[8px] sm:text-[10px] md:text-[12px] font-bold uppercase tracking-wider whitespace-nowrap">
                Concluídos
              </span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
              {data.completed}
            </span>
          </div>

          {/* Restantes */}
          <div className="bg-blue-100/50 rounded-md p-2.5 sm:p-3 flex flex-col justify-between min-h-[85px]">
            <div className="flex flex-col sm:flex-row items-left sm:items-center gap-1 md:gap-2 text-blue-700">
              <FaClock size={11} className="flex-shrink-0 sm:block" />
              <span className="text-[8px] sm:text-[10px] md:text-[12px] font-bold uppercase tracking-wider whitespace-nowrap">
                Restantes
              </span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
              {data.remaining}
            </span>
          </div>

          {/* Total */}
          <div className="bg-gray-100 rounded-md p-2.5 sm:p-3 flex flex-col justify-between min-h-[85px]">
            <div className="flex flex-col sm:flex-row items-left sm:items-center gap-1 md:gap-2 text-gray-500">
              <FaFileLines size={11} className="flex-shrink-0 sm:block" />
              <span className="text-[8px] sm:text-[10px] md:text-[12px] font-bold uppercase tracking-wider whitespace-nowrap">
                Total
              </span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
              {data.total}
            </span>
          </div>

        </div>
      </div>

      <div className="text-left mt-8">
        <LinkButton
          href={RoutesUrls.SPECIALIST_SCHEDULE}
          text={"Agenda completa"}
        />
      </div>
    </div>
  );
}