'use client';

import { useState, useEffect } from 'react';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import { getMonthName } from '@/utils/dateUtils';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Start at January 2026
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [notes, setNotes] = useState({});

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
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center bg-white dark:bg-zinc-950 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-zinc-100 dark:border-zinc-800">
      <HeroImage 
        monthName={getMonthName(currentDate.getMonth())} 
        year={currentDate.getFullYear()} 
      />
      
      <div className="w-full flex flex-col md:flex-row p-8 lg:p-12 gap-12">
        <div className="flex-[1.5]">
          <div className="flex justify-between items-center mb-8 px-8">
            <h2 className="text-2xl font-black italic text-indigo-600 dark:text-indigo-400 tracking-tight">
              {getMonthName(currentDate.getMonth())}
            </h2>
            <div className="flex gap-4">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button 
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
          
          <CalendarGrid 
            currentDate={currentDate}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onDateClick={handleDateClick}
            notes={notes}
          />
        </div>
        
        <div className="flex-1">
          <NotesPanel 
            selectedRange={{ start: rangeStart, end: rangeEnd }}
            note={getActiveNote()}
            onNoteChange={handleNoteChange}
          />
        </div>
      </div>

      <div className="w-full py-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 text-center">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Classic Wall Calendar Series &bull; 2026 Edition
        </p>
      </div>
    </div>
  );
}
