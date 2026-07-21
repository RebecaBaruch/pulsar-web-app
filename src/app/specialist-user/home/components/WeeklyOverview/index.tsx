import LinkButton from "@/components/LinkButton";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { FaChartLine, FaChartSimple } from "react-icons/fa6";

export interface WeeklyOverviewData {
  completed: number;
  total: number;
  completedPercentage: number;
}

interface WeeklyOverviewProps {
  data: WeeklyOverviewData;
}

export function WeeklyOverview({ data }: WeeklyOverviewProps) {
  // Tamanhos responsivos: 100px no mobile (padrão) e 140px a partir de md
  const mobileSize = 100;
  const desktopSize = 140;
  const strokeWidth = 12;

  const clampedPercentage = Math.min(
    Math.max(data.completedPercentage, 0),
    100,
  );

  // Função auxiliar para calcular propriedades do SVG dinamicamente
  const getSvgProps = (size: number) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (clampedPercentage / 100) * circumference;
    return { radius, circumference, strokeDashoffset, size };
  };

  const mobileSvg = getSvgProps(mobileSize);
  const desktopSvg = getSvgProps(desktopSize);

  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-md-gray-light flex flex-col justify-between md:min-h-[340px]">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-base md:text-lg font-bold text-gray-900">Semana</h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Dados dos seus atendimentos dessa semana.
          </p>
        </div>

        <div className="flex flex-row items-center justify-between gap-4 md:gap-16 w-fit md:w-full">
          {/* Bloco de Dados Esquerdos */}
          <div className="flex-1 space-y-3 min-w-0 w-fit md:w-full">
            {/* Concluídos */}
            <div className="bg-blue-100 rounded-md p-3 flex flex-row items-left md:items-center gap-4 justify-between md:w-full">
              <div className="flex items-center gap-2 text-blue-500 min-w-0">
                <FaChartLine size={14} className="hidden md:block flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium text-gray-700 truncate">
                  Concluídos
                </span>
              </div>
              <span className="text-sm md:text-xl font-bold text-blue-700 flex-shrink-0">
                {data.completed}
              </span>
            </div>

            {/* Total */}
            <div className="bg-gray-100 rounded-md p-3 flex flex-row items-left md:items-center gap-4 justify-between w-full">
              <div className="flex items-center gap-2 text-gray-500 min-w-0">
                <FaChartSimple size={14} className="hidden md:block flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium text-gray-700 truncate">
                  Total
                </span>
              </div>
              <span className="text-sm md:text-xl font-bold text-gray-900 flex-shrink-0">
                {data.total}
              </span>
            </div>
          </div>

          {/* Gráfico SVG Donut Direito Otimizado */}
          <div className="relative flex items-center justify-center flex-shrink-0">
            {/* Versão Mobile (Visível apenas em telas menores que md) */}
            <div
              className="block md:hidden relative"
              style={{ width: mobileSize, height: mobileSize }}
            >
              <svg className="transform -rotate-90 w-full h-full">
                <circle
                  className="text-gray-100"
                  strokeWidth={strokeWidth}
                  stroke="currentColor"
                  fill="transparent"
                  r={mobileSvg.radius}
                  cx={mobileSize / 2}
                  cy={mobileSize / 2}
                />
                <circle
                  className="text-blue-500 transition-all duration-700 ease-out"
                  strokeWidth={strokeWidth}
                  strokeDasharray={mobileSvg.circumference}
                  strokeDashoffset={mobileSvg.strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r={mobileSvg.radius}
                  cx={mobileSize / 2}
                  cy={mobileSize / 2}
                />
              </svg>
            </div>

            {/* Versão Desktop (Visível apenas a partir de md) */}
            <div
              className="hidden md:block relative"
              style={{ width: desktopSize, height: desktopSize }}
            >
              <svg className="transform -rotate-90 w-full h-full">
                <circle
                  className="text-gray-100"
                  strokeWidth={strokeWidth}
                  stroke="currentColor"
                  fill="transparent"
                  r={desktopSvg.radius}
                  cx={desktopSize / 2}
                  cy={desktopSize / 2}
                />
                <circle
                  className="text-blue-500 transition-all duration-700 ease-out"
                  strokeWidth={strokeWidth}
                  strokeDasharray={desktopSvg.circumference}
                  strokeDashoffset={desktopSvg.strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r={desktopSvg.radius}
                  cx={desktopSize / 2}
                  cy={desktopSize / 2}
                />
              </svg>
            </div>

            {/* Texto Centralizado Adaptável */}
            <div className="absolute text-center flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg md:text-2xl font-black text-gray-900 tracking-tight">
                {clampedPercentage}%
              </span>
              <span className="text-[9px] md:text-[10px] font-semibold text-gray-500 uppercase tracking-wider block mt-0.5">
                concluído
              </span>
            </div>
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
