export interface TimeRange {
  id: string;
  start: string;
  end: string;
}

export interface DayAvailability {
  dayName: string;
  enabled: boolean;
  isOpen: boolean; //accordion state
  ranges: TimeRange[];
}