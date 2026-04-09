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
        relative aspect-square p-2 cursor-pointer transition-all duration-300 group
        flex flex-col items-center justify-center
        ${!isCurrentMonth ? 'text-zinc-200' : 'text-zinc-900'}
        ${isMiddle ? 'bg-accent-soft' : ''}
        ${isStart ? 'bg-accent rounded-l-full text-white' : ''}
        ${isEnd ? 'bg-accent rounded-r-full text-white' : ''}
        ${isStart && isEnd ? 'rounded-full' : ''}
        hover:bg-zinc-50
      `}
    >
      <span className={`
        text-sm font-black tracking-tight relative z-10
        ${(isStart || isEnd) ? 'text-white' : ''}
        ${isCurrentMonth ? '' : 'font-medium'}
      `}>
        {day}
      </span>
      
      {hasNote && (
        <div className={`
          absolute bottom-2 w-1 h-1 rounded-full 
          ${(isStart || isEnd) ? 'bg-white' : 'bg-accent'}
        `} title="note-indicator" />
      )}
      
      {/* Visual connection for range */}
      {isMiddle && (
        <div className="absolute inset-y-0 -inset-x-[1px] bg-accent-soft z-0" />
      )}
    </div>
  );
}
