import React, { FC, useState } from 'react';
import { CalendarViewProps } from '../types/calendar';

const CalendarSidebar: FC<CalendarViewProps> = ({
  currentDate = new Date(),
  events = [],
  onDateChange,
  onViewChange
}) => {
  const [selectedView, setSelectedView] = useState<'month' | 'year'>('month');
  const weekDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const handleViewChange = (view: 'month' | 'year') => {
    setSelectedView(view);
    onViewChange?.(view);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <select 
            className="rounded border px-2 py-1"
            value={currentDate.getFullYear()}
            onChange={(e) => {
              const newDate = new Date(currentDate);
              newDate.setFullYear(parseInt(e.target.value));
              onDateChange?.(newDate);
            }}
          >
            <option>2020</option>
          </select>
          <select 
            className="rounded border px-2 py-1"
            value={currentDate.getMonth()}
            onChange={(e) => {
              const newDate = new Date(currentDate);
              newDate.setMonth(parseInt(e.target.value));
              onDateChange?.(newDate);
            }}
          >
            <option value={11}>Dec</option>
          </select>
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
          {Array.from({ length: 5 }).map((_, weekIndex) => (
            <tr key={weekIndex}>
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const day = weekIndex * 7 + dayIndex - 5;
                return (
                  <td key={dayIndex} className="p-2 text-center">
                    <span className={`inline-block h-8 w-8 rounded-full py-1.5 text-sm
                      ${day === 17 ? 'bg-blue-500 text-white' : 'text-gray-600'}`}>
                      {day > 0 && day <= 31 ? day : ''}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Upcoming Events */}
      <div className="mt-4 h-[calc(100vh-200px)] overflow-y-auto"> {/* Added fixed height and overflow */}
        <h3 className="mb-2 font-medium text-gray-800">Sự kiện sắp tới</h3>
        {events.length > 0 ? (
          <div className="space-y-2">
            {events.map((event, index) => (
              <div key={index} className="text-sm text-gray-600">
                {event.title}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
            <p className="text-sm text-gray-600">Không có sự kiện để hiển thị</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSidebar;