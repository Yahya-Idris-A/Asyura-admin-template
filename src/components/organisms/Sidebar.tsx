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

export const Sidebar = () => {
  const router = useRouter();
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
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <Link
          href="/home"
          className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
        >
          <Hexagon className="w-8 h-8 text-primary shrink-0" />
          {!isSidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-lg text-foreground tracking-tight"
            >
              UniDash
            </motion.span>
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

            return (
              <button
                key={`mini-${index}`}
                onClick={() => {
                  if (hasChildren) {
                    // Kalau punya anak, ekspansi sidebar!
                    useUIStore.getState().toggleSidebar();
                  } else {
                    // Kalau nggak punya anak, langsung pindah halaman
                    if (item.href) router.push(item.href);
                  }
                }}
                className="flex items-center justify-center w-12 h-12 mx-auto mb-2 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                title={item.title}
              >
                {item.icon && <item.icon className="w-5 h-5" />}
              </button>
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
