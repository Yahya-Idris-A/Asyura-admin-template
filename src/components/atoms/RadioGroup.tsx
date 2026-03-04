"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { Label } from "./Label";

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  name?: string;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export const RadioGroup = ({
  options,
  value,
  onChange,
  label,
  name,
  orientation = "vertical",
  className = "",
}: RadioGroupProps) => {
  const reactId = useId();
  const groupName = name || `radio-group-${reactId}`;

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {label && <Label className="mb-1">{label}</Label>}
      
      <div className={`flex gap-4 ${orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"}`}>
        {options.map((option, index) => {
          const isSelected = value === option.value;
          const optionId = `${groupName}-opt-${index}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`relative flex items-start gap-3 p-3 cursor-pointer rounded-lg border transition-all duration-200
                ${isSelected 
                  ? "border-primary bg-primary/5 shadow-sm" 
                  : "border-border bg-background hover:border-primary/50"
                }
                ${orientation === "horizontal" ? "flex-1 min-w-[200px]" : "w-full"}
              `}
            >
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="radio"
                  id={optionId}
                  name={groupName}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => onChange(option.value)}
                  className="sr-only peer" // Sembunyikan radio asli untuk aksesibilitas
                />
                {/* Custom Radio Circle */}
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                  ${isSelected ? "border-primary" : "border-foreground/30 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50"}
                `}>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 rounded-full bg-primary"
                    />
                  )}
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-foreground/60 mt-0.5">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};