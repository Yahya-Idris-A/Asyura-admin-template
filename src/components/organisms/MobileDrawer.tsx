"use client";

import { useUIStore } from "@/store/useUIStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut } from "lucide-react";
import { MENU_ITEMS } from "@/constants/navigation";
import { AccordionMenu } from "@/components/molecules/AccordionMenu";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/app/actions/auth";
import { useToastStore } from "@/store/useToastStore";

export const MobileDrawer = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const pathname = usePathname();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu(); // Ini akan trigger fungsi untuk mengubah state jadi false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Gagal melakukan logout:", error);
      addToast("Failed to log out.", "error");
    } finally{
      addToast("You have been logged out.", "success");
    }
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 tablet:hidden"
          />
          
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] bg-card border-t border-border rounded-t-4xl z-50 tablet:hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="font-semibold text-lg text-foreground">Navigation Menu</h2>
              <button 
                onClick={closeMobileMenu} 
                className="p-2 bg-background/50 rounded-full hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Area Konten: Looping data menu dari constant */}
            <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-1">
              {MENU_ITEMS.map((item, index) => (
                <AccordionMenu key={index} item={item} />
              ))}
            </div>
            {/* Footer Area: Tombol Logout (Sticky di bawah) */}
            <div className="p-6 border-t border-border shrink-0 bg-background/30 pb-safe">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 w-full p-3.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-colors font-semibold text-sm"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};