"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { type NavItem } from "@/constants/navigation";

export const AccordionMenu = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  // Jika tidak punya sub-menu, render Link biasa
  if (!hasChildren) {
    return (
      <Link 
        href={item.href || "#"}
        className="flex items-center gap-3 px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
      >
        {item.icon && <item.icon className="w-5 h-5" />}
        <span className="font-medium">{item.title}</span>
      </Link>
    );
  }

  // Jika punya sub-menu, render Accordion
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
          isOpen ? "text-primary bg-primary/5" : "text-foreground/80 hover:bg-card"
        }`}
      >
        <div className="flex items-center gap-3">
          {item.icon && <item.icon className="w-5 h-5" />}
          <span className="font-medium">{item.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 opacity-70" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-11 pr-4 py-2 flex flex-col gap-1">
              {item.children?.map((child, index) => (
                <Link
                  key={index}
                  href={child.href || "#"}
                  className="px-3 py-2 text-sm text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};