"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { Label } from "./Label";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export const Switch = ({ checked, onChange, label, disabled = false, id }: SwitchProps) => {
  const reactId = useId();

  const switchId = id || `switch-${reactId}`;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
          ${checked ? "bg-primary" : "bg-border"}
        `}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0"
          style={{ x: checked ? 20 : 0 }}
        />
      </button>
      {label && (
        <Label htmlFor={switchId} className="cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
          {label}
        </Label>
      )}
    </div>
  );
};