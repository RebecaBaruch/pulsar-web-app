import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AppointmentData, CalendarViewMode } from '../types';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { CalendarGrid } from '../components/CalendarGrid';
import { AppointmentDetailsDrawer } from '../components/AppointmentDetailsDrawer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface ScheduleViewProps {
  visibleDays: Date[];
  timeSlots: string[];
  appointments: AppointmentData[];
  viewMode: CalendarViewMode;
  selectedAppointment: AppointmentData | null;
  onViewModeChange: (mode: CalendarViewMode) => void;
  onSelectAppointment: (app: AppointmentData | null) => void;
  onNext: () => void;
  onPrev: () => void;
  onToday: () => void;
  onRemarcar: (id: string) => void;
  onCancelar: (id: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  visibleDays,
  timeSlots,
  appointments,
  viewMode,
  selectedAppointment,
  onViewModeChange,
  onSelectAppointment,
  onNext,
  onPrev,
  onToday,
  onRemarcar,
  onCancelar,
}) => {
  return (
     <div className="flex flex-col w-full gap-8">
      <div className="flex-1 overflow-y-auto flex flex-col">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Agenda</h1>
            <p className="text-sm text-slate-400">Visualize e gerencie seus atendimentos.</p>
          </div>
        </div>

        {/* Controles de Navegação */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={onToday} 
              className="px-5 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
            >
              Hoje
            </button>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-sm">
              <button onClick={onPrev} className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
              </button>
              <button onClick={onNext} className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
              </button>
            </div>
            <span className="ml-2 font-bold text-sm text-slate-700">
              {viewMode === 'semana' && visibleDays.length > 0 ? (
                <span className="capitalize">
                  {format(visibleDays[0], "dd 'de' MMMM", { locale: ptBR })} - {format(visibleDays[6], "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </span>
              ) : (
                visibleDays[0] && <span className="capitalize">{format(visibleDays[0], "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              )}
            </span>
          </div>
          
          {/* Abas Alternadoras conforme o layout */}
          <div className="bg-slate-200/60 p-1 rounded-xl flex gap-1 text-xs font-semibold shadow-inner">
            <button 
              onClick={() => onViewModeChange('semana')}
              className={`px-4 py-2 rounded-lg transition-all ${viewMode === 'semana' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Semana
            </button>
            <button 
              onClick={() => onViewModeChange('dia')}
              className={`px-4 py-2 rounded-lg transition-all ${viewMode === 'dia' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Dia
            </button>
          </div>
        </div>

        {/* Instanciação correta do seu componente estrutural */}
        <CalendarGrid 
          visibleDays={visibleDays}
          timeSlots={timeSlots}
          appointments={appointments}
          viewMode={viewMode}
          onSelectAppointment={onSelectAppointment}
        />
      </div>

      <AppointmentDetailsDrawer 
        appointment={selectedAppointment} 
        onClose={() => onSelectAppointment(null)} 
        onRemarcar={onRemarcar} 
        onCancelar={onCancelar} 
      />
    </div>
  );
};