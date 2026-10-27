export interface TimeRange {
  id: string;
  backendId?: string;
  start: string;
  end: string;
}

export interface DayAvailability {
  dayName: string;
  dayOfWeek?: string;
  enabled: boolean;
  isOpen: boolean; //accordion state
  ranges: TimeRange[];
}