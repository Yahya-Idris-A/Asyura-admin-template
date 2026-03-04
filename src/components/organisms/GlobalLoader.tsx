"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoadingStore } from "@/store/useLoadingStore";
import { Loader2, ServerCrash } from "lucide-react";
import { ProgressBar } from "../atoms/Progress"; // Import komponen dari list 2

export const GlobalLoader = () => {
  const { isLoading, text, progress } = useLoadingStore();

  const Icon = progress !== null ? ServerCrash : Loader2;

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto">
          
          {/* Backdrop Blur Super Pekat (Non-dismissible - gak ada onClick) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Kotak Loading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="relative bg-card border border-border rounded-xl shadow-2xl p-6 min-w-[300px] flex flex-col items-center text-center overflow-hidden"
          >
            {/* --- DATA TRANSFER ANIMATION HEADER --- */}
            {/* Container absolut di paling atas */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary/5 z-10">
               {/* Garis gradient yang bergerak */}
               <motion.div
                 className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
                 initial={{ x: "-100%" }}
                 animate={{ x: "200%" }}
                 transition={{
                   repeat: Infinity,
                   duration: 1.5,
                   ease: "linear", // Gerakan konstan biar seperti aliran data
                 }}
               />
            </div>
            {/* --------------------------------------- */}

            <div className="p-6 pt-10 flex flex-col items-center w-full">
                <div className="bg-primary/10 p-4 rounded-full mb-5 relative">
                  {/* Efek 'ping' (gelombang) di belakang icon */}
                  <span className="absolute inset-0 rounded-full animate-ping bg-primary/20"></span>
                  <Icon className={`w-8 h-8 text-primary relative z-10 ${progress === null ? 'animate-spin' : ''}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground tracking-tight mb-2">
                  {text}
                </h3>
                <p className="text-sm text-foreground/60 mb-6 leading-relaxed px-4">
                  Please maintain your connection. Do not close or refresh this window.
                </p>

                {/* Tampilkan Progress Bar jika ada nilainya */}
                {progress !== null && (
                  <div className="w-full bg-background/50 p-3 rounded-lg border border-border/50">
                    <ProgressBar value={progress} showValue={true} />
                  </div>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};