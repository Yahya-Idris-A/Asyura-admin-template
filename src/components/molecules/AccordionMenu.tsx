"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { type NavItem } from "@/constants/navigation";
import { usePathname } from "next/navigation";

export const AccordionMenu = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;

  // 1. Logika Aktif untuk Parent tanpa anak
  const isSingleActive = !hasChildren && pathname.startsWith(item.href || "unmatchable");

  // 2. Logika Aktif untuk mengecek apakah SALAH SATU anak sedang aktif
  const hasActiveChild = hasChildren && item.children?.some(child => 
    pathname === child.href || pathname.startsWith((child.href || "unmatchable") + "/")
  );

  // 3. Auto-open jika salah satu anak aktif
  const [isOpen, setIsOpen] = useState(hasActiveChild || false);

  // Jika tidak punya sub-menu, render Link biasa
  if (!hasChildren) {
    return (
      <Link 
        href={item.href || "#"}
        className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
          ${isSingleActive 
            ? "bg-primary/10 text-primary" 
            : "text-foreground/70 hover:text-foreground hover:bg-background/50"
          }
        `}
      >
        {item.icon && <item.icon className="w-5 h-5" />}
        <span>{item.title}</span>
      </Link>
    );
  }

  // Jika punya sub-menu, render Accordion
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium
          ${hasActiveChild && !isOpen
            // Jika anak aktif TAPI accordion ditutup (kasih highlight tipis di parent)
            ? "bg-primary/5 text-primary shadow-sm border border-primary/10"
            : isOpen
              ? "text-foreground" // Saat terbuka biasa
              : "text-foreground/70 hover:text-foreground hover:bg-background/50" // Normal state
          }
        `}
      >
        <div className="flex items-center gap-3">
          {item.icon && (
            <item.icon className={`w-5 h-5 ${hasActiveChild && !isOpen ? "fill-primary/20" : ""}`} />
          )}
          <span>{item.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={`w-4 h-4 ${hasActiveChild && !isOpen ? "text-primary" : "opacity-70"}`} />
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
            <div className="pl-11 pr-4 py-1.5 flex flex-col gap-1">
              {item.children?.map((child, index) => {
                // Logika aktif spesifik untuk anak ini
                const isChildActive = pathname === child.href || pathname.startsWith((child.href || "unmatchable") + "/");

                return (
                  <Link
                    key={index}
                    href={child.href || "#"}
                    className={`relative flex items-center px-3 py-2.5 text-sm rounded-lg transition-colors
                      ${isChildActive
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-foreground/60 hover:text-foreground hover:bg-background/50"
                      }
                    `}
                  >
                    {/* Indikator titik yang meluncur pakai Framer Motion */}
                    {isChildActive && (
                      <motion.div
                        layoutId={`activeSubMenuIndicator-${item.title}`} // Unique ID per grup accordion
                        className="absolute left-0 w-1.5 h-1.5 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Efek teks geser sedikit kalau aktif */}
                    <span className={`transition-all duration-200 ${isChildActive ? "ml-1.5" : ""}`}>
                      {child.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};