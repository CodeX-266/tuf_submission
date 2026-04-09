export default function NotesPanel({ selectedRange, note, onNoteChange }) {
  const { start, end } = selectedRange;
  
  const title = start && end 
    ? `Memos for ${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : start 
      ? `Memos for ${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
      : 'General Month Memos';

  return (
    <div className="flex flex-col h-full bg-zinc-50 rounded-[2.5rem] border border-zinc-100 p-8 shadow-inner overflow-hidden">
      <div className="mb-6 select-none text-left">
        <h3 className="text-xl font-black text-zinc-900 tracking-tight">{title}</h3>
        <div className="h-1.5 w-12 bg-accent mt-2 rounded-full shadow-sm transition-colors duration-1000" />
      </div>
      
      <div className="flex-1 relative">
        {/* Lined paper effect - subtle tint */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
             style={{ 
               backgroundImage: 'linear-gradient(transparent 31px, var(--accent-color) 32px)',
               backgroundSize: '100% 32px' 
             }} />
             
        <textarea 
          value={note || ''}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Start typing your memos here..."
          className="w-full h-full bg-transparent resize-none outline-none text-[17px] font-medium leading-[32px] text-zinc-800 placeholder-zinc-300 relative z-10"
          style={{ paddingTop: '8px' }}
        />
      </div>
      
      <div className="mt-8 flex justify-between items-center text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] select-none">
        <span className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent transition-colors duration-1000" />
          Auto-synchronized
        </span>
        <div className="flex gap-2">
           <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
           <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
           <div className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
        </div>
      </div>
    </div>
  );
}
