'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import { getMonthName } from '@/utils/dateUtils';

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

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center bg-white rounded-[3rem] shadow-[0_80px_120px_-30px_rgba(0,0,0,0.12)] overflow-hidden border border-zinc-100 ring-1 ring-black/5 perspective-1000">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={monthIndex}
          custom={direction}
          initial={{ rotateX: direction > 0 ? -30 : 30, opacity: 0, scale: 0.95 }}
          animate={{ rotateX: 0, opacity: 1, scale: 1 }}
          exit={{ rotateX: direction > 0 ? 30 : -30, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full origin-top"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <HeroImage 
            monthName={monthName} 
            monthIndex={monthIndex}
            year={year} 
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="w-full flex flex-col md:flex-row p-10 lg:p-14 gap-14 bg-white">
        <div className="flex-[1.5]">
          <div className="flex justify-between items-center mb-10 px-6">
            <h2 className="text-3xl font-black italic text-zinc-900 tracking-tighter uppercase select-none">
              {monthName}
            </h2>
            <div className="flex gap-4">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-3 hover:bg-zinc-50 active:scale-95 rounded-full transition-all border border-zinc-100 shadow-sm bg-white"
                title="Previous Month"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button 
                onClick={() => changeMonth(1)}
                className="p-3 hover:bg-zinc-50 active:scale-95 rounded-full transition-all border border-zinc-200 shadow-sm bg-white"
                title="Next Month"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={monthIndex}
              initial={{ rotateX: -15, opacity: 0, y: 10 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={{ rotateX: 15, opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="origin-top"
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
        
        <div className="flex-1">
          <NotesPanel 
            selectedRange={{ start: rangeStart, end: rangeEnd }}
            note={getActiveNote()}
            onNoteChange={handleNoteChange}
          />
        </div>
      </div>

      <div className="w-full py-8 bg-zinc-50/50 border-t border-zinc-100 text-center select-none">
        <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.4em]">
          Interactive Digital Stationery &bull; Series 2026
        </p>
      </div>
    </div>
  );
}
