"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "../atoms/Button";

interface PopconfirmProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  children: React.ReactNode; // Tombol trigger (misal: tombol Delete)
}

export const Popconfirm = ({ title, description, onConfirm, children }: PopconfirmProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Auto-close saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Wrapper untuk elemen trigger */}
      <div onClick={() => setIsOpen(!isOpen)} className="inline-block cursor-pointer">
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full right-0 mb-2 w-64 bg-card border border-border rounded-lg shadow-xl z-50 p-4"
          >
            <div className="flex gap-3 items-start mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground leading-tight">{title}</h4>
                {description && <p className="text-xs text-foreground/60 mt-1">{description}</p>}
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
                Batal
              </Button>
              <Button 
                size="sm" 
                variant="primary" 
                onClick={() => {
                  onConfirm();
                  setIsOpen(false);
                }}
              >
                Ya, Lanjutkan
              </Button>
            </div>
            
            {/* Segitiga panah ke bawah */}
            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-card border-b border-r border-border rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};