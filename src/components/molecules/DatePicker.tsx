"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Label } from "../atoms/Label";

interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const DatePicker = ({
  label,
  value,
  onChange,
  placeholder = "Select a date",
  error,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // State untuk navigasi bulan/tahun di dalam kalender
  const [currentMonth, setCurrentMonth] = useState(value ? value.getMonth() : new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(value ? value.getFullYear() : new Date().getFullYear());
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-close saat klik di luar area kalender
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update kalender jika value dari luar (props) berubah
  useEffect(() => {
    if (value) {
      setCurrentMonth(value.getMonth());
      setCurrentYear(value.getFullYear());
    }
  }, [value]);

  // --- LOGIKA KALENDER ---
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleSelectDate = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    onChange(selectedDate);
    setIsOpen(false);
  };

  // Render kotak-kotak tanggal
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Kotak kosong sebelum tanggal 1
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }

    // Kotak tanggal
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = value?.getDate() === day && value?.getMonth() === currentMonth && value?.getFullYear() === currentYear;
      const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear;

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleSelectDate(day)}
          className={`h-8 w-8 rounded-md flex items-center justify-center text-sm transition-colors
            ${isSelected 
              ? "bg-primary text-primary-foreground font-semibold shadow-sm" 
              : isToday 
                ? "bg-primary/10 text-primary font-semibold" 
                : "text-foreground hover:bg-background hover:text-foreground"
            }
          `}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  // Format tanggal ke tulisan (contoh: "Oct 24, 2026")
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={containerRef}>
      {label && <Label>{label}</Label>}

      {/* Input Field (Trigger Popover) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between h-10 w-full rounded-md border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
          ${error 
            ? "border-red-500 focus:ring-red-500/50" 
            : "border-border hover:bg-background focus:border-primary focus:ring-primary/30"
          }
        `}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-foreground/50" />
          <span className={value ? "text-foreground font-medium" : "text-foreground/50"}>
            {value ? formatDate(value) : placeholder}
          </span>
        </div>
      </button>

      {/* Calendar Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-[calc(100%+8px)] left-0 w-[280px] bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden p-3"
          >
            {/* Calendar Header (Bulan & Tahun dengan Quick Jump) */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={handlePrevMonth}
                className="p-1 rounded-md hover:bg-background text-foreground/70 transition-colors shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Area Dropdown Cepat */}
              <div className="flex gap-1 items-center">
                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(Number(e.target.value))}
                  className="appearance-none bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer hover:text-primary transition-colors text-right px-1"
                >
                  {MONTH_NAMES.map((m, i) => (
                    <option key={m} value={i} className="bg-card text-foreground">{m}</option>
                  ))}
                </select>
                
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(Number(e.target.value))}
                  className="appearance-none bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer hover:text-primary transition-colors px-1"
                >
                  {/* Generate tahun dari 100 tahun lalu sampai 10 tahun ke depan */}
                  {Array.from({ length: 110 }, (_, i) => new Date().getFullYear() - 100 + i).map(y => (
                    <option key={y} value={y} className="bg-card text-foreground">{y}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleNextMonth}
                className="p-1 rounded-md hover:bg-background text-foreground/70 transition-colors shrink-0"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Nama-nama Hari */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map(day => (
                <div key={day} className="text-center text-[10px] font-medium text-foreground/50 uppercase">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid Tanggal */}
            <div className="grid grid-cols-7 gap-y-1 justify-items-center">
              {renderCalendarDays()}
            </div>
            
            {/* Tombol Today untuk *shortcut* */}
            <div className="mt-3 pt-3 border-t border-border flex justify-center">
               <button 
                 onClick={() => {
                   setCurrentMonth(new Date().getMonth());
                   setCurrentYear(new Date().getFullYear());
                   handleSelectDate(new Date().getDate());
                 }}
                 className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
               >
                 Go to Today
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
};