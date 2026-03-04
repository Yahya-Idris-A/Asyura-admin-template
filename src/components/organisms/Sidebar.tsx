"use client";

import { useUIStore } from "@/store/useUIStore";
import { MENU_ITEMS } from "@/constants/navigation";
import { AccordionMenu } from "@/components/molecules/AccordionMenu";
import { motion } from "framer-motion";
import { Hexagon, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/actions/auth";
import { useToastStore } from "@/store/useToastStore";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isSidebarCollapsed } = useUIStore();
  const { addToast } = useToastStore();

  const handleLogout = async () => {
    await logoutUser();
    addToast("You have been logged out.", "success");
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isSidebarCollapsed ? "80px" : "260px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden tablet:flex flex-col h-screen bg-card border-r border-border sticky top-0 z-30"
    >
      {/* Sidebar Header (Logo & Brand) */}
      <div 
        className={`h-16 flex items-center border-b border-border transition-all duration-200
          ${isSidebarCollapsed ? "justify-center px-0" : "justify-start px-4"}
        `}
      >
        <Link
          href="/dashboard"
          className="flex items-center overflow-hidden whitespace-nowrap"
        >
          {isSidebarCollapsed ? (
            // 1. Logo Lingkaran (Tampil saat sidebar nutup)
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              // TODO: Ganti nama file ini sesuai dengan logo lingkaran lo di folder public
              src="/Icon.png" 
              alt="Logo Icon" 
              className="w-8 h-8 object-contain shrink-0"
            />
          ) : (
            // 2. Logo Full dengan Teks (Tampil saat sidebar buka)
            <motion.img
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              // TODO: Ganti nama file ini sesuai dengan logo full teks lo di folder public
              src="/Logo.png" 
              alt="Brand Logo" 
              className="h-8 w-auto object-contain shrink-0"
            />
          )}
        </Link>
      </div>

      {/* Navigation Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 flex flex-col gap-1 custom-scrollbar">
        {MENU_ITEMS.map((item, index) => (
          /* Nanti kita bisa bikin variasi AccordionMenu khusus mini-sidebar, 
             tapi sementara kita pakai komponen yang sama, 
             dan sembunyikan teksnya pakai CSS jika collapsed */
          <div
            key={index}
            className={
              isSidebarCollapsed
                ? "opacity-0 pointer-events-none absolute"
                : "block"
            }
          >
            <AccordionMenu item={item} />
          </div>
        ))}

        {/* Placeholder untuk Mini Menu saat Collapsed */}
        {isSidebarCollapsed &&
          MENU_ITEMS.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = pathname.startsWith(item.href || "unmatchable");

            return (
            <div key={`mini-${index}`} className="relative group flex justify-center w-full mb-2">
              
              {/* --- BUMBU 1: Garis Indikator Kiri Meluncur --- */}
              {isActive && (
                <motion.div
                  layoutId="sidebarMiniIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              <button 
                onClick={() => {
                  if (hasChildren) {
                    useUIStore.getState().toggleSidebar();
                  } else {
                    if (item.href) router.push(item.href);
                  }
                }}
                className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
                  ${isActive 
                    ? "bg-primary/10 text-primary shadow-sm" // BUMBU 2: Glowing background
                    : "text-foreground/60 hover:text-foreground hover:bg-background"
                  }
                `}
                title={item.title}
              >
                {/* BUMBU 3: Fill color kalau aktif */}
                {item.icon && <item.icon className={`w-5 h-5 ${isActive ? "fill-primary/20" : ""}`} />}
              </button>
            </div>
          );
          })}
      </div>

      {/* Sidebar Footer (TOMBOL LOGOUT BARU) */}
      <div className="p-4 border-t border-border shrink-0">
        <button
          className={`flex items-center gap-3 w-full p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors ${isSidebarCollapsed ? "justify-center" : ""}`}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isSidebarCollapsed && (
            <span className="font-medium text-sm">Logout</span>
          )}
        </button>
      </div>
    </motion.aside>
  );
};
