"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal} from "lucide-react";

export type ActionItem = {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  variant?: "default" | "danger";
};

interface ActionMenuProps {
  actions: ActionItem[];
}

export const ActionMenu = ({ actions }: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside untuk menutup menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Tombol Titik Tiga */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground/50 hover:text-foreground hover:bg-background/50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div className="p-1 flex flex-col gap-0.5">
              {actions.map((action, index) => {
                const isDanger = action.variant === "danger";
                return (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors w-full text-left
                      ${isDanger 
                        ? "text-red-500 hover:bg-red-500/10" 
                        : "text-foreground hover:bg-background"
                      }
                    `}
                  >
                    <action.icon className="w-4 h-4 shrink-0" />
                    <span className="font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};