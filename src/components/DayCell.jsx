export default function DayCell({ 
  day, 
  isCurrentMonth, 
  isStart, 
  isEnd, 
  isMiddle, 
  onClick,
  hasNote
}) {
  return (
    <div 
      onClick={onClick}
      className={`
        relative aspect-square p-2 cursor-pointer transition-all duration-200 group
        flex flex-col items-center justify-center
        ${!isCurrentMonth ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-900 dark:text-zinc-100'}
        ${isMiddle ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}
        ${isStart ? 'bg-indigo-600 rounded-l-full text-white !dark:text-white' : ''}
        ${isEnd ? 'bg-indigo-600 rounded-r-full text-white !dark:text-white' : ''}
        ${isStart && isEnd ? 'rounded-full' : ''}
        hover:bg-zinc-100 dark:hover:bg-zinc-800
      `}
    >
      <span className={`
        text-sm font-semibold relative z-10
        ${(isStart || isEnd) ? 'text-white' : ''}
      `}>
        {day}
      </span>
      
      {hasNote && (
        <div className={`
          absolute bottom-2 w-1 h-1 rounded-full 
          ${(isStart || isEnd) ? 'bg-white' : 'bg-indigo-500'}
        `} />
      )}
      
      {/* Visual connection for range */}
      {isMiddle && (
        <div className="absolute inset-y-0 -inset-x-[1px] bg-indigo-50 dark:bg-indigo-900/20 z-0" />
      )}
    </div>
  );
}
