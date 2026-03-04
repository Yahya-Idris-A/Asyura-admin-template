"use client";

import { useToastStore } from "@/store/useToastStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 tablet:bottom-8 tablet:right-8 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          // Setup Icon & Warna berdasarkan tipe
          let Icon = Info;
          let colorClass = "text-blue-500 bg-blue-500/10 border-blue-500/20";
          
          if (toast.type === "success") {
            Icon = CheckCircle2;
            colorClass = "text-green-500 bg-green-500/10 border-green-500/20";
          } else if (toast.type === "error") {
            Icon = AlertCircle;
            colorClass = "text-red-500 bg-red-500/10 border-red-500/20";
          } else if (toast.type === "warning") {
            Icon = AlertCircle;
            colorClass = "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center gap-3 w-80 p-4 bg-card border border-border rounded-xl shadow-lg backdrop-blur-md"
            >
              <div className={`p-2 rounded-full shrink-0 ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <p className="flex-1 text-sm font-medium text-foreground">
                {toast.message}
              </p>

              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};