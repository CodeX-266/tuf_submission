import DayCell from './DayCell';
import { getCalendarDays, isSameDate, isDateInRange } from '@/utils/dateUtils';

export default function CalendarGrid({ 
  currentDate, 
  rangeStart, 
  rangeEnd, 
  onDateClick,
  notes = {}
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const calendarDays = getCalendarDays(year, month);

  return (
    <div className="w-full bg-white px-2 md:px-8 pb-4 md:pb-8">
      <div className="grid grid-cols-7 mb-4">
        {days.map(day => (
          <div key={day} className="py-2 text-center text-[9px] md:text-[11px] font-black text-zinc-400 tracking-[0.1em] md:tracking-[0.2em] leading-none">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5 md:gap-y-1">
        {calendarDays.map((dayObj, index) => {
          const isStart = isSameDate(dayObj.date, rangeStart);
          const isEnd = isSameDate(dayObj.date, rangeEnd);
          const isMiddle = isDateInRange(dayObj.date, rangeStart, rangeEnd) && !isStart && !isEnd;
          const dateKey = dayObj.date.toISOString().split('T')[0];
          const hasNote = !!notes[dateKey];

          return (
            <DayCell 
              key={index}
              day={dayObj.day}
              isCurrentMonth={dayObj.isCurrentMonth}
              isStart={isStart}
              isEnd={isEnd}
              isMiddle={isMiddle}
              hasNote={hasNote}
              onClick={() => onDateClick(dayObj.date)}
            />
          );
        })}
      </div>
    </div>
  );
}
