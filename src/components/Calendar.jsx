'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import { getMonthName, getMonthTheme, getMonthImage } from '@/utils/dateUtils';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Start at January 2026
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [notes, setNotes] = useState({});
  const [direction, setDirection] = useState(0);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    if (Object.keys(notes).length > 0) {
      localStorage.setItem('calendar-notes', JSON.stringify(notes));
    }
  }, [notes]);

  const handleDateClick = (date) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      if (date < rangeStart) {
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
    }
  };

  const handleNoteChange = (text) => {
    if (!rangeStart) return;
    
    const key = rangeEnd 
      ? `${rangeStart.toISOString().split('T')[0]}_${rangeEnd.toISOString().split('T')[0]}`
      : rangeStart.toISOString().split('T')[0];
    
    setNotes(prev => ({
      ...prev,
      [key]: text
    }));
  };

  const getActiveNote = () => {
    if (!rangeStart) return '';
    const key = rangeEnd 
      ? `${rangeStart.toISOString().split('T')[0]}_${rangeEnd.toISOString().split('T')[0]}`
      : rangeStart.toISOString().split('T')[0];
    return notes[key] || '';
  };

  const changeMonth = (offset) => {
    setDirection(offset);
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  const monthName = getMonthName(currentDate.getMonth());
  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const themeColor = getMonthTheme(monthIndex);
  const bgImage = getMonthImage(monthIndex);

  return (
    <>
      {/* Immersive Monthly Atmosphere Layer - Optimized for performance */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={monthIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "linear" }}
            className="absolute inset-0 gpu-accelerated"
          >
            <Image 
              src={bgImage} 
              alt=""
              fill
              className="object-cover blur-[40px] saturate-[150%] opacity-40 translate-z-0"
              priority
              sizes="100vw"
            />
            <div 
              className="absolute inset-0 transition-colors duration-[1000ms]"
              style={{ 
                background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, ${themeColor}, transparent 50%), transparent 80%)` 
              }} 
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Main Calendar Card */}
      <div 
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-[0_100px_160px_-40px_rgba(0,0,0,0.4)] overflow-hidden border border-white/20 perspective-1000 gpu-accelerated"
        style={{ '--accent-color': themeColor }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={monthIndex}
            custom={direction}
            initial={{ rotateX: direction > 0 ? -20 : 20, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: direction > 0 ? 20 : -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full origin-top gpu-accelerated"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <HeroImage 
              monthName={monthName} 
              monthIndex={monthIndex}
              year={year} 
              accentColor={themeColor}
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="w-full flex flex-col md:flex-row p-6 md:p-10 lg:p-14 gap-8 md:gap-14 bg-white/95 backdrop-blur-sm">
          <div className="flex-[1.5]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10 px-4 md:px-6 gap-6 sm:gap-0">
              <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight uppercase select-none">
                {monthName}
              </h2>
              <div className="flex gap-4">
                <button 
                  onClick={() => changeMonth(-1)}
                  className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-zinc-50 hover:bg-white border-2 border-transparent hover:border-accent transition-all duration-300 shadow-sm active:scale-95"
                  title="Previous Month"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-accent"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button 
                  onClick={() => changeMonth(1)}
                  className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-zinc-50 hover:bg-white border-2 border-transparent hover:border-accent transition-all duration-300 shadow-sm active:scale-95"
                  title="Next Month"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-accent"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={monthIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="gpu-accelerated"
              >
                <CalendarGrid 
                  currentDate={currentDate}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  onDateClick={handleDateClick}
                  notes={notes}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex-1 min-h-[400px]">
            <NotesPanel 
              selectedRange={{ start: rangeStart, end: rangeEnd }}
              note={getActiveNote()}
              onNoteChange={handleNoteChange}
            />
          </div>
        </div>

        <div className="w-full py-6 md:py-8 bg-zinc-50/80 border-t border-zinc-100 text-center select-none backdrop-blur-md">
          <p className="text-[9px] md:text-[11px] font-black text-zinc-400 uppercase tracking-[0.4em]">
            Interactive Digital Stationery &bull; Series 2026
          </p>
        </div>
      </div>
    </>
  );
}
