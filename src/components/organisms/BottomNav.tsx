"use client";

import { LayoutDashboard, ShoppingBag, Users, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { motion } from "framer-motion";

export const BottomNav = () => {
  const pathname = usePathname();
  const { toggleMobileMenu } = useUIStore();

  const NAV_ITEMS = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "E-Comm", icon: ShoppingBag, href: "/ecommerce/products" },
    { name: "Users", icon: Users, href: "/users/all" },
  ];

  return (
    <div className="tablet:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-40 flex items-center justify-around px-2 pb-safe">
      {NAV_ITEMS.map((item) => {
        // Logika aktif sederhana (bisa diperbaiki pakai startsWith jika nested)
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors
              ${isActive ? "text-primary" : "text-foreground/50 hover:text-foreground"}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="bottomNavBubble"
                className="absolute inset-0 top-1.5 bottom-1.5 mx-2 bg-primary/10 rounded-xl -z-10"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            
            {/* --- BUMBU: Ikon lompat dikit dan fill color --- */}
            <motion.div
              animate={{ y: isActive ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "fill-primary/20" : ""}`} />
            </motion.div>
            
            <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
              {item.name}
            </span>
          </Link>
        );
      })}

      {/* Tombol More -> Buka Mobile Menu */}
      <button
        onClick={toggleMobileMenu}
        className="flex flex-col items-center justify-center w-16 h-full gap-1 text-foreground/50 hover:text-foreground transition-colors"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] font-medium">More</span>
      </button>
    </div>
  );
};