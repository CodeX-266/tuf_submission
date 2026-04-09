import Calendar from '@/components/Calendar';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-900 flex flex-col font-sans selection:bg-indigo-100 overflow-x-hidden">
      <main className="relative flex-1 flex flex-col items-center justify-center p-4 md:p-12 lg:p-24 z-10">
        <Calendar />
        
        <div className="mt-12 text-center opacity-30 select-none">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Interactive Digital Stationery</p>
        </div>
      </main>
    </div>
  );
}
