import Image from 'next/image';
import { getMonthImage } from '@/utils/dateUtils';

export default function HeroImage({ monthName, monthIndex, year }) {
  const heroImagePath = getMonthImage(monthIndex);

  return (
    <div className="relative w-full max-w-4xl mx-auto group bg-white shadow-2xl rounded-t-[2.5rem] overflow-hidden">
      {/* Wall Calendar Ring Binder (Coil) */}
      <div className="absolute top-0 inset-x-0 h-12 flex justify-center items-center z-30 pointer-events-none bg-gradient-to-b from-zinc-200 to-transparent">
        <div className="flex gap-[6px]">
          {Array.from({ length: 42 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-zinc-800 rounded-full shadow-inner opacity-40" title="binding-hole" />
          ))}
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden">
        {/* Actual Image */}
        <Image
          src={heroImagePath}
          alt={`${monthName} Hero`}
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
          priority
        />
        
        {/* Overlay Graduate for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Month/Year Overlay - Extra Bold for consistency */}
        <div className="absolute bottom-16 right-12 text-right text-white z-20 select-none">
          <div className="text-sm font-black uppercase tracking-[0.6em] opacity-90 mb-3 drop-shadow-lg">
            {year}
          </div>
          <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-none">
            {monthName}
          </h2>
        </div>

        {/* Wave Mask / Transition Section */}
        <div className="absolute bottom-[-1px] inset-x-0 h-24 bg-white z-10" 
             style={{ 
               clipPath: 'polygon(0 100%, 100% 100%, 100% 20%, 80% 50%, 60% 0, 40% 50%, 20% 10%, 0 40%)',
             }}>
        </div>
      </div>
    </div>
  );
}
