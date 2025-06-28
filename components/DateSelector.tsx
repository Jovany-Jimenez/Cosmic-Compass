
import React from 'react';

interface DateSelectorProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    disabled?: boolean;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onDateChange, disabled = false }) => {
    const dates: Date[] = [];
    const today = new Date();
    // Generate a range of dates around today for selection.
    for (let i = -5; i <= 5; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        dates.push(date);
    }

    const formatDate = (date: Date) => {
        return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.getDate(),
        };
    };

    return (
        <div className="flex justify-center">
            <div className="flex space-x-3 overflow-x-auto scroll-container py-2">
                {dates.map((date, index) => {
                    const { day, date: dayNum } = formatDate(date);
                    const isSelected = selectedDate.toDateString() === date.toDateString();
                    return (
                        <button
                            key={index}
                            onClick={() => onDateChange(date)}
                            disabled={disabled}
                            className={`flex flex-col items-center justify-center w-16 h-20 rounded-full flex-shrink-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${
                                isSelected ? 'bg-white text-slate-900 scale-105 shadow-lg' : 'bg-slate-700/50 text-white hover:bg-slate-600'
                            }`}
                            aria-pressed={isSelected}
                        >
                            <span className="text-xl font-bold">{dayNum}</span>
                            <span className="text-sm opacity-80">{day}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DateSelector;