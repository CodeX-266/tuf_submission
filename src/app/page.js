import Calendar from '@/components/Calendar';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] dark:bg-[#0f172a] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      {/* Subtle desk/wall texture background */}
      <div className="fixed inset-0 opacity-40 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#94a3b8 0.5px, transparent 0.5px)',
             backgroundSize: '40px 40px' 
           }} />
      
      <main className="relative flex-1 flex flex-col items-center justify-center p-4 md:p-12 lg:p-24">
        {/* Floating shadows for the physical look */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl aspect-square bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
        
        <Calendar />
        
        <div className="mt-12 text-center opacity-40">
           <p className="text-xs font-black uppercase tracking-[0.4em]">Interactive Digital Stationery</p>
        </div>
      </main>
    </div>
  );
}
