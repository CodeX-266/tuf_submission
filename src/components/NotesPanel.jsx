export default function NotesPanel({ selectedRange, note, onNoteChange }) {
  const { start, end } = selectedRange;
  
  const title = start && end 
    ? `Notes for ${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : start 
      ? `Notes for ${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
      : 'Select a date or range';

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/10 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-inner">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 italic">{title}</h3>
        <div className="h-1 w-12 bg-indigo-500 mt-2 rounded-full" />
      </div>
      
      <div className="flex-1 relative">
        {/* Lined paper effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(transparent 31px, #000 32px)',
               backgroundSize: '100% 32px' 
             }} />
             
        <textarea 
          value={note || ''}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Jot down some notes..."
          className="w-full h-full bg-transparent resize-none outline-none text-lg leading-[32px] text-zinc-700 dark:text-zinc-300 relative z-10"
          style={{ paddingTop: '8px' }}
        />
      </div>
      
      <div className="mt-6 flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
        <span>Press anywhere to save</span>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
           <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
           <div className="w-2 h-2 rounded-full bg-zinc-500 dark:bg-zinc-500" />
        </div>
      </div>
    </div>
  );
}
