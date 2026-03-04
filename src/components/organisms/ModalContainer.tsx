"use client";

import { useModalStore } from "@/store/useModalStore";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, Trash2, X } from "lucide-react";
import { Button } from "../atoms/Button";

export const ModalContainer = () => {
  const { isOpen, config, closeModal } = useModalStore();

  return (
    <AnimatePresence>
      {isOpen && config && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 tablet:p-0">
          
          {/* Backdrop Gelap & Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Kotak Modal Utama */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-10"
          >
            {/* Area Header & Deskripsi */}
            <div className="p-6 pb-4 flex gap-4">
              
              {/* Dynamic Icon berdasarkan tipe bahaya/info */}
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                config.variant === 'danger' ? 'bg-red-500/10 text-red-500' :
                config.variant === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-blue-500/10 text-blue-500'
              }`}>
                {config.variant === 'danger' ? <Trash2 className="w-5 h-5" /> :
                 config.variant === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                 <Info className="w-5 h-5" />}
              </div>
              
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-semibold text-foreground leading-none tracking-tight mb-2">
                  {config.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {config.description}
                </p>
              </div>
              
              {/* Tombol X (Close) */}
              <button onClick={closeModal} className="absolute top-4 right-4 p-2 text-foreground/50 hover:text-foreground transition-colors rounded-md hover:bg-background">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Area Footer (Action Buttons) */}
            <div className="px-6 py-4 bg-background/50 border-t border-border flex justify-end gap-3">
              <Button variant="ghost" onClick={closeModal}>
                {config.cancelText || "Cancel"}
              </Button>
              <Button 
                variant={config.variant === 'danger' ? 'danger' : 'primary'}
                onClick={() => {
                  config.onConfirm(); // Eksekusi aksi utama
                  closeModal();       // Tutup modal otomatis
                }}
              >
                {config.confirmText || "Confirm"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};