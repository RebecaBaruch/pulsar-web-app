import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";
import { addDays, addMonths } from "date-fns";
import {
  getMonthLabels,
  getMonthMatrix,
  getSelectedWeekIndex,
} from "../utils/mobileCalendar";

const SWIPE_THRESHOLD = 56;
const DRAG_THRESHOLD = 28;

interface UseMobileCalendarHeaderProps {
  selectedDay: Date;
  isExpanded: boolean;
  currentMonthPivot: Date;
  onToggleExpanded: () => void;
  onSelectDay: (day: Date) => void;
  onSelectMonth: (month: Date) => void;
}

export function useMobileCalendarHeader({
  selectedDay,
  isExpanded,
  currentMonthPivot,
  onToggleExpanded,
  onSelectDay,
  onSelectMonth,
}: UseMobileCalendarHeaderProps) {
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(() =>
    currentMonthPivot.getFullYear(),
  );
  const monthPickerRef = useRef<HTMLDivElement>(null);
  const swipeOrigin = useRef<{ x: number; y: number } | null>(null);
  const swipeLock = useRef(false);
  const dragRef = useRef({ startY: 0, dragged: false });

  const monthMatrix = useMemo(
    () => getMonthMatrix(currentMonthPivot),
    [currentMonthPivot],
  );
  const weekCount = monthMatrix.length / 7;
  const selectedWeekIndex = getSelectedWeekIndex(monthMatrix, selectedDay);
  const monthLabels = useMemo(() => getMonthLabels(pickerYear), [pickerYear]);

  const closeMonthPicker = () => setIsMonthPickerOpen(false);

  const toggleExpanded = () => {
    closeMonthPicker();
    onToggleExpanded();
  };

  const toggleMonthPicker = () => {
    setIsMonthPickerOpen((open) => {
      if (!open) setPickerYear(currentMonthPivot.getFullYear());
      return !open;
    });
  };

  useEffect(() => {
    if (!isMonthPickerOpen) return;

    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!monthPickerRef.current?.contains(event.target as Node)) {
        closeMonthPicker();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMonthPicker();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMonthPickerOpen]);

  const handleMonthPick = (monthIndex: number) => {
    closeMonthPicker();
    const sameMonth =
      currentMonthPivot.getFullYear() === pickerYear &&
      currentMonthPivot.getMonth() === monthIndex;
    if (!sameMonth) onSelectMonth(new Date(pickerYear, monthIndex, 1));
  };

  const onDaysPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeOrigin.current = { x: event.clientX, y: event.clientY };
    swipeLock.current = false;
  };

  const onDaysPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!swipeOrigin.current) return;
    const dx = event.clientX - swipeOrigin.current.x;
    const dy = event.clientY - swipeOrigin.current.y;
    swipeOrigin.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

    swipeLock.current = true;
    if (isExpanded) {
      onSelectMonth(addMonths(currentMonthPivot, dx < 0 ? 1 : -1));
      return;
    }
    onSelectDay(addDays(selectedDay, dx < 0 ? 7 : -7));
  };

  const onDaysClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!swipeLock.current) return;
    event.preventDefault();
    event.stopPropagation();
    swipeLock.current = false;
  };

  const onHandlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    dragRef.current = { startY: event.clientY, dragged: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onHandlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current.startY === 0) return;
    const delta = event.clientY - dragRef.current.startY;
    dragRef.current.startY = 0;
    if (
      (delta > DRAG_THRESHOLD && !isExpanded) ||
      (delta < -DRAG_THRESHOLD && isExpanded)
    ) {
      dragRef.current.dragged = true;
      toggleExpanded();
    }
  };

  const onHandleClick = () => {
    if (dragRef.current.dragged) {
      dragRef.current.dragged = false;
      return;
    }
    toggleExpanded();
  };

  return {
    isMonthPickerOpen,
    pickerYear,
    setPickerYear,
    monthPickerRef,
    monthMatrix,
    weekCount,
    selectedWeekIndex,
    monthLabels,
    toggleMonthPicker,
    handleMonthPick,
    onDaysPointerDown,
    onDaysPointerUp,
    onDaysClickCapture,
    onHandlePointerDown,
    onHandlePointerUp,
    onHandleClick,
  };
}
