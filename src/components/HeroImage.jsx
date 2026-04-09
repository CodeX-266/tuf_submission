import Image from 'next/image';

export default function HeroImage({ monthName, year }) {
  const heroImagePath = "/hero.png";

  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      {/* Wall Calendar Ring Binder (Coil) */}
      <div className="absolute -top-4 inset-x-0 flex justify-center z-30 pointer-events-none">
        <div className="flex gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-6 bg-zinc-400 rounded-full shadow-sm border-t border-zinc-200" />
          ))}
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-t-[2.5rem] shadow-2xl bg-zinc-900 border-x border-t border-white/10">
        {/* Actual Image */}
        <Image
          src={heroImagePath}
          alt={`${monthName} Hero`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Month/Year Overlay */}
        <div className="absolute bottom-16 right-12 text-right text-white z-20">
          <div className="text-sm font-medium uppercase tracking-[0.3em] opacity-80 mb-1">{year}</div>
          <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase drop-shadow-2xl">
            {monthName}
          </h2>
        </div>

        {/* Wave Mask / Transition Section */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-white dark:bg-zinc-950 z-10" 
             style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 20%, 80% 50%, 60% 0, 40% 50%, 20% 10%, 0 40%)' }}>
        </div>
      </div>
    </div>
  );
}
