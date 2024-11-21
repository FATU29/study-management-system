export interface CalendarEvent {
    title: string;
    date: Date;
    description?: string;
  }
  
  export interface CalendarViewProps {
    currentDate?: Date;
    events?: CalendarEvent[];
    onDateChange?: (date: Date) => void;
    onViewChange?: (view: 'month' | 'year') => void;
  }