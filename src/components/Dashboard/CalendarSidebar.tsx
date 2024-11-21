import React, { FC, useState, useEffect } from 'react';

interface Event {
id: string;
title: string;
date: Date;
description?: string;
}

interface CalendarViewProps {
currentDate?: Date;
events?: Event[];
onDateChange?: (date: Date) => void;
onViewChange?: (view: 'month' | 'year') => void;
onEventClick?: (event: Event) => void;
}

const CalendarSidebar: FC<CalendarViewProps> = ({
currentDate = new Date(),
events = [],
onDateChange,
onViewChange,
onEventClick
}) => {
const [selectedView, setSelectedView] = useState<'month' | 'year'>('month');
const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
const weekDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const months: string[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

useEffect(() => {
  setSelectedDate(currentDate);
}, [currentDate]);

const handleViewChange = (view: 'month' | 'year') => {
  setSelectedView(view);
  onViewChange?.(view);
};

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const generateCalendarDays = () => {
  const daysInMonth = getDaysInMonth(selectedDate);
  const firstDay = getFirstDayOfMonth(selectedDate);
  const days: (number | null)[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
};

const isToday = (day: number): boolean => {
  const today = new Date();
  return (
    day === today.getDate() &&
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getFullYear() === today.getFullYear()
  );
};

const hasEvents = (day: number): boolean => {
  return events.some(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === day &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });
};

// const getUpcomingEvents = () => {
//   const today = new Date();
//   return events
//     .filter(event => new Date(event.date) >= today)
//     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//     .slice(0, 10); // Show only next 10 events
// };

const renderCalendarDays = () => {
  const days = generateCalendarDays();
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = [];

  days.forEach((day, index) => {
    week.push(day);
    if ((index + 1) % 7 === 0 || index === days.length - 1) {
      weeks.push(week);
      week = [];
    }
  });

  return weeks;
};

const renderMonthView = () => (
  <>
    <table className="w-full">
      <thead>
        <tr>
          {weekDays.map((day) => (
            <th key={day} className="py-2 text-center text-sm font-medium text-gray-600">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {renderCalendarDays().map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((day, dayIndex) => (
              <td key={dayIndex} className="p-2 text-center">
                {day !== null && (
                  <button
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(day);
                      setSelectedDate(newDate);
                      onDateChange?.(newDate);
                    }}
                    className={`inline-block h-8 w-8 rounded-full py-1.5 text-sm
                      ${isToday(day) ? 'bg-blue-500 text-white' : 
                        hasEvents(day) ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}
                      hover:bg-blue-100 hover:text-blue-800
                    `}
                  >
                    {day}
                  </button>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

const renderYearView = () => {
  const monthsGrid = [];
  for (let i = 0; i < 12; i += 3) {
    monthsGrid.push(months.slice(i, i + 3));
  }

  const getMonthEvents = (monthIndex: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === monthIndex &&
              eventDate.getFullYear() === selectedDate.getFullYear();
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {monthsGrid.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((month, monthIndex) => {
            const actualMonthIndex = rowIndex * 3 + monthIndex;
            const monthEvents = getMonthEvents(actualMonthIndex);
            const isCurrentMonth = 
              new Date().getMonth() === actualMonthIndex && 
              new Date().getFullYear() === selectedDate.getFullYear();

            return (
              <button
                key={month}
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(actualMonthIndex);
                  setSelectedDate(newDate);
                  setSelectedView('month');
                  onDateChange?.(newDate);
                  onViewChange?.('month');
                }}
                className={`p-4 rounded-lg text-center transition-all
                  ${isCurrentMonth 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100'
                  }
                  ${monthEvents.length > 0 ? 'ring-2 ring-blue-200' : ''}
                `}
              >
                <div className="font-medium mb-1">{month}</div>
                {monthEvents.length > 0 && (
                  <div className="text-xs mt-1">
                    {monthEvents.length} events
                  </div>
                )}
              </button>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

return (
  <div className="rounded-lg bg-white p-4 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <select 
          className="rounded border px-2 py-1"
          value={selectedDate.getFullYear()}
          onChange={(e) => {
            const newDate = new Date(selectedDate);
            newDate.setFullYear(parseInt(e.target.value));
            setSelectedDate(newDate);
            onDateChange?.(newDate);
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - 5 + i}>
              {new Date().getFullYear() - 5 + i}
            </option>
          ))}
        </select>
        {selectedView === 'month' && (
          <select 
            className="rounded border px-2 py-1"
            value={selectedDate.getMonth()}
            onChange={(e) => {
              const newDate = new Date(selectedDate);
              newDate.setMonth(parseInt(e.target.value));
              setSelectedDate(newDate);
              onDateChange?.(newDate);
            }}
          >
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
        )}
        <button 
          className={`rounded px-3 py-1 text-sm ${
            selectedView === 'month' ? 'bg-blue-500 text-white' : 'text-gray-600'
          }`}
          onClick={() => handleViewChange('month')}
        >
          Month
        </button>
        <button 
          className={`rounded px-3 py-1 text-sm ${
            selectedView === 'year' ? 'bg-blue-500 text-white' : 'text-gray-600'
          }`}
          onClick={() => handleViewChange('year')}
        >
          Year
        </button>
      </div>
    </div>

    {selectedView === 'month' ? renderMonthView() : renderYearView()}

    {/* Upcoming Events */}
    <div className="mt-4 h-[calc(100vh-200px)] overflow-y-auto">
      <h3 className="mb-2 font-medium text-gray-800">Upcoming Events</h3>
      {events.length > 0 ? (
        <div className="space-y-2">
          {events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((event) => (
              <button
                key={event.id}
                onClick={() => onEventClick?.(event)}
                className="w-full rounded-md bg-gray-50 p-2 text-left hover:bg-gray-100"
              >
                <div className="text-sm font-medium text-gray-800">{event.title}</div>
                <div className="text-xs text-gray-600">
                  {new Date(event.date).toLocaleDateString()}
                </div>
                {event.description && (
                  <div className="mt-1 text-xs text-gray-600">{event.description}</div>
                )}
              </button>
            ))}
        </div>
      ) : (
        <div className="text-sm text-gray-600">No upcoming events</div>
      )}
    </div>
  </div>
);
};

export default CalendarSidebar;