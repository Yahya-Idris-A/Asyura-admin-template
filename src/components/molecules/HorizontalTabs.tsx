"use client";

import React from "react";
import { motion } from "framer-motion";

export type TabItem = {
  id: string;
  label: string;
  icon?: React.ElementType;
};

interface HorizontalTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const HorizontalTabs = ({ tabs, activeTab, onChange, className = "" }: HorizontalTabsProps) => {
  return (
    <div className={`relative flex items-center w-full border-b border-border overflow-x-auto custom-scrollbar ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap
              ${isActive ? "text-primary" : "text-foreground/60 hover:text-foreground hover:bg-background/50"}
            `}
          >
            {tab.icon && <tab.icon className="w-4 h-4 shrink-0" />}
            {tab.label}

            {/* Garis indikator meluncur dengan Framer Motion */}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};