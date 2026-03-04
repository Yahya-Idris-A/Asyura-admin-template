"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// --- 1. Komponen Progress Bar ---
export interface ProgressProps {
  value: number; // 0 sampai 100
  label?: string;
  showValue?: boolean;
  className?: string;
}

export const ProgressBar = ({ value, label, showValue = true, className = "" }: ProgressProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-sm font-medium">
          {label && <span className="text-foreground">{label}</span>}
          {showValue && <span className="text-foreground/70">{clampedValue}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/20">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

// --- 2. Komponen Spinner ---
export const Spinner = ({ size = 24, className = "" }: { size?: number; className?: string }) => {
  return (
    <Loader2 
      size={size} 
      className={`animate-spin text-primary ${className}`} 
    />
  );
};