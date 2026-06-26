import React, { useEffect, useRef } from 'react';
import { format, isSameDay, isToday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AppointmentData } from '../../types';

interface CalendarGridProps {
  visibleDays: Date[];
  timeSlots: string[];
  appointments: AppointmentData[];
  viewMode: 'semana' | 'dia';
  onSelectAppointment: (app: AppointmentData) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  visibleDays,
  timeSlots,
  appointments,
  viewMode,
  onSelectAppointment,
}) => {
  const gridColsClass = viewMode === 'semana' ? 'grid-cols-8' : 'grid-cols-2';
  
  // Referências para controlar o scroll do container
  const containerRef = useRef<HTMLDivElement>(null);
  const nextAppointmentRef = useRef<HTMLDivElement>(null);

  // Efeito idêntico ao Outlook: roda apenas uma vez quando o componente monta
  useEffect(() => {
    if (nextAppointmentRef.current) {
      // Faz o scroll suave até o card do próximo atendimento ficar visível no topo
      nextAppointmentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    } else if (containerRef.current) {
      // Fallback: Caso não tenha nenhum agendamento hoje/futuro, 
      // scrolla por padrão para as 09:00 (início do horário comercial padrão)
      const commercialOrderIndex = timeSlots.indexOf("09:00");
      if (commercialOrderIndex !== -1) {
        containerRef.current.scrollTop = commercialOrderIndex * 112; // 112px é a altura h-28 de cada linha
      }
    }
  }, [appointments, timeSlots]);

  // Função auxiliar para descobrir qual agendamento é o mais próximo a partir de agora
  const getNextAppointmentId = (): string | null => {
    const now = new Date();
    
    // Filtra apenas agendamentos futuros (mesmo dia em horário posterior, ou dias seguintes)
    const futureAppointments = appointments
      .map(app => ({
        ...app,
        fullDateTime: parseISO(`${app.date}T${app.startTime}:00`)
      }))
      .filter(app => app.fullDateTime >= now)
      .sort((a, b) => a.fullDateTime.getTime() - b.fullDateTime.getTime());

    return futureAppointments.length > 0 ? futureAppointments[0].id : null;
  };

  const nextAppointmentId = getNextAppointmentId();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-240px)]">
      
      {/* Cabeçalho dos Dias */}
      <div className={`grid ${gridColsClass} border-b border-slate-100 bg-slate-50/60 text-center py-4 text-xs font-medium text-slate-400 items-center sticky top-0 z-20 backdrop-blur-md`}>
        <div className="flex items-center justify-center font-bold text-slate-500">Horário</div>
        
        {visibleDays.map((day, idx) => {
          const isCurrentDay = isToday(day);
          
          return (
            <div key={idx} className="flex justify-center items-center">
              {isCurrentDay ? (
                <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-md shadow-blue-500/10 flex flex-col items-center min-w-[64px]">
                  <span className="text-[10px] uppercase tracking-wider font-bold opacity-90">
                    {format(day, 'EEEE', { locale: ptBR }).split('-')[0]}
                  </span>
                  <span className="text-base font-extrabold mt-0.5">{format(day, 'd')}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-[11px] capitalize text-slate-400 font-medium tracking-wide">
                    {format(day, 'EEEE', { locale: ptBR }).split('-')[0]}
                  </span>
                  <span className="text-base font-bold text-slate-800 mt-0.5">{format(day, 'd')}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Linhas de Horários e Células com Scroll Independente */}
      <div 
        ref={containerRef}
        className="divide-y divide-slate-100 overflow-y-auto flex-1 scroll-smooth"
      >
        {timeSlots.map((time) => (
          <div key={time} className={`grid ${gridColsClass} h-28 relative`}>
            <div className="text-xs text-slate-400 p-3 font-semibold border-r border-slate-100 text-right pr-5 pt-3 bg-slate-50/5">
              {time}
            </div>

            {visibleDays.map((day, dayIdx) => {
              const dayAppointments = appointments.filter(
                app => app.startTime === time && isSameDay(new Date(app.date + 'T00:00:00'), day)
              );
              const isTodayColumn = isToday(day);

              return (
                <div 
                  key={dayIdx} 
                  className={`border-r border-slate-100 p-2 relative transition-colors ${
                    isTodayColumn ? 'bg-blue-50/10' : 'bg-white'
                  }`}
                >
                  {dayAppointments.map(app => {
                    const isNext = app.id === nextAppointmentId;
                    
                    return (
                      <div
                        key={app.id}
                        ref={isNext ? nextAppointmentRef : undefined} // Atribui a ref dinamicamente ao mais próximo
                        onClick={() => onSelectAppointment(app)}
                        className={`absolute inset-x-2 top-2 bottom-2 backdrop-blur-sm p-3 rounded-xl shadow-sm hover:shadow transition-all select-none cursor-pointer flex flex-col justify-between z-10 ${
                          isNext 
                            ? 'bg-blue-600 text-white border border-blue-700 hover:bg-blue-700' // Pequeno destaque se for o próximo absoluto do dia
                            : 'bg-blue-50/90 border border-blue-200/50 text-blue-800 hover:bg-blue-100/90'
                        }`}
                      >
                        <div>
                          <p className={`font-bold text-xs tracking-tight ${isNext ? 'text-white' : 'text-blue-900'}`}>{app.patientName}</p>
                          <p className={`text-[10px] font-semibold mt-0.5 ${isNext ? 'text-blue-100' : 'text-blue-600/90'}`}>{app.startTime} - 10:00</p>
                        </div>
                        <p className={`text-[10px] font-medium tracking-wide ${isNext ? 'text-blue-200' : 'text-blue-500'}`}>{app.type}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};