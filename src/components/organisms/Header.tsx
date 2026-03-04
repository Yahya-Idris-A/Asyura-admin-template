"use client";

import { Search, Bell, Sun, Moon, User, PanelLeftClose, PanelLeftOpen, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useUIStore } from "@/store/useUIStore";

export const Header = () => {
  // State dummy untuk tema (Nanti bisa diganti pakai next-themes atau Zustand)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Fungsi toggle tema sederhana
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-20 h-16 w-full bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 tablet:px-8">

      {/* --- OVERLAY MOBILE SEARCH --- */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute inset-0 z-50 bg-background flex items-center px-4 gap-3 tablet:hidden"
          >
            <button onClick={() => setIsMobileSearchOpen(false)} className="p-2 text-foreground/60 hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <input 
              autoFocus
              type="text" 
              placeholder="Search anything..." 
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-foreground/50 h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Kiri: Page Title atau Search Bar (Desktop) */}
      <div className="flex items-center flex-1 gap-2 tablet:gap-4">
        <button 
          onClick={toggleSidebar}
          className="hidden tablet:flex p-2 text-foreground/60 hover:text-foreground hover:bg-background/50 rounded-lg transition-colors"
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
        {/* Tombol Search ala macOS Spotlight - Sangat disukai di UI Unicorn */}
        <div className="hidden tablet:flex relative group w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 group-focus-within:text-primary transition-colors pointer-events-none" />
          <input 
            type="text"
            placeholder="Search anything..."
            className="w-full pl-9 pr-12 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/50"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-foreground/50">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        {/* Icon Search untuk Mobile */}
        <button onClick={() => setIsMobileSearchOpen(true)} className="tablet:hidden p-2 text-foreground/70 hover:text-primary transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Kanan: Actions (Theme, Notifications, Profile) */}
      <div className="flex items-center gap-2 tablet:gap-4">
        
        {/* Theme Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 text-foreground/70 hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        {/* Notifications (API-Ready: Nanti datanya bisa ditarik dari Kafka/Redis yang kamu pelajari) */}
        <div className="relative">
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-foreground/70 hover:bg-primary/10 hover:text-primary rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
          </motion.button>

          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                // FIX: Lebar responsif agar tidak tumpah di layar HP kecil (-right-2 untuk offset padding layar)
                className="absolute -right-2 tablet:right-0 mt-2 w-[calc(100vw-5rem)] max-w-sm bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <div className="p-3 border-b border-border bg-background/50">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                </div>
                <div className="p-2 flex flex-col gap-1 max-h-[300px] overflow-y-auto">
                  <div className="p-2 text-sm text-foreground/70 hover:bg-background rounded-md cursor-pointer">
                    <span className="font-semibold text-foreground block">Server Restart</span>
                    Database updated successfully.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile (API-Ready: Untuk integrasi dengan Wallet Service / Auth System kamu) */}
        <div className="h-8 w-px bg-border mx-1 hidden tablet:block"></div> {/* Divider */}
        
        <button className="flex items-center gap-3 pl-2 tablet:pl-0">
          <div className="hidden tablet:flex flex-col items-end">
            <span className="text-sm font-medium text-foreground">Admin User</span>
            <span className="text-[10px] text-foreground/60">Superadmin</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
            <User className="w-4 h-4" />
          </div>
        </button>
      </div>
      
    </header>
  );
};