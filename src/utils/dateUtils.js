/**
 * Utility functions for date manipulation
 */

export const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }).format(date);
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const isSameDate = (d1, d2) => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const isDateInRange = (date, start, end) => {
  if (!date || !start || !end) return false;
  
  // Normalize dates to midnight for comparison
  const d = new Date(date).setHours(0, 0, 0, 0);
  const s = new Date(start).setHours(0, 0, 0, 0);
  const e = new Date(end).setHours(0, 0, 0, 0);
  
  return d >= s && d <= e;
};

export const getCalendarDays = (year, month) => {
  const days = [];
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  
  // Padding from previous month
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(prevYear, prevMonth, daysInPrevMonth - i),
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
    });
  }
  
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      day: i,
      isCurrentMonth: true,
    });
  }
  
  // Padding for next month
  const remainingCells = 42 - days.length; // 6 rows of 7 days
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(nextYear, nextMonth, i),
      day: i,
      isCurrentMonth: false,
    });
  }
  
  return days;
};

export const getMonthName = (monthIndex) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2026, monthIndex));
};

export const getMonthImage = (monthIndex) => {
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  return `/${months[monthIndex]}.png`;
};
