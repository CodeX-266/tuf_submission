export default function Header() {
  return (
    <header className="w-full py-8 px-12 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-100 select-none">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <div className="text-2xl font-black tracking-tighter text-zinc-900 italic">Calendar<span className="text-zinc-400">OS</span></div>
      </div>
      <nav>
        <ul className="flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
          <li className="text-indigo-600 cursor-pointer">Collection</li>
          <li className="hover:text-zinc-900 transition-colors cursor-pointer">Schedule</li>
          <li className="hover:text-zinc-900 transition-colors cursor-pointer">Insights</li>
        </ul>
      </nav>
    </header>
  );
}
