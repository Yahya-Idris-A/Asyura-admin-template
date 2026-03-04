"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Info, BellRing, ShieldAlert, Rocket, Trash2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { useToastStore } from "@/store/useToastStore";
import { useModalStore } from "@/store/useModalStore";
import { useLoadingStore } from "@/store/useLoadingStore";

export default function OverlaysPage() {
  const { addToast } = useToastStore();
  const { openModal } = useModalStore();
  const { showLoading, updateProgress, hideLoading } = useLoadingStore();

  // --- Fungsi Simulasi The Boss (Loading Overlay) ---
  const handleSimulateDataFlow = () => {
    showLoading("Establishing Secure Connection...", 0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5; // Naik secara random
      
      if (progress > 30 && progress < 60) {
        showLoading("Syncing database clusters...", progress);
      } else if (progress >= 60 && progress < 90) {
        showLoading("Verifying checksums...", progress);
      } else if (progress >= 100) {
        clearInterval(interval);
        updateProgress(100);
        showLoading("Complete!", 100);
        
        setTimeout(() => {
          hideLoading();
          addToast("Data synchronized successfully.", "success");
        }, 800);
      } else {
        updateProgress(progress);
      }
    }, 400);
  };

  const handleSimulateIndeterminate = () => {
    showLoading("Connecting to API endpoint...");
    setTimeout(() => {
      hideLoading();
      addToast("Connection failed due to timeout.", "error");
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto pb-12">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Modals & Overlays</h1>
        <p className="text-foreground/60 text-sm mt-1">
          Global, context-aware notification systems and screen-blocking layers controlled via Zustand.
        </p>
      </div>

      {/* SECTION 1: Toast Notifications */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">1. Toast Notifications</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-foreground/60 mb-6">
            Non-intrusive alerts that appear at the bottom right. They auto-dismiss after 3 seconds.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" onClick={() => addToast("Your settings have been saved.", "success")} className="gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Trigger Success
            </Button>
            <Button variant="secondary" onClick={() => addToast("Database connection lost.", "error")} className="gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" /> Trigger Error
            </Button>
            <Button variant="secondary" onClick={() => addToast("A new update is available.", "info")} className="gap-2">
              <Info className="w-4 h-4 text-blue-500" /> Trigger Info
            </Button>
            <Button variant="primary" onClick={() => {
              addToast("Task 1 completed", "success");
              setTimeout(() => addToast("Task 2 failed", "error"), 500);
              setTimeout(() => addToast("Please review logs", "info"), 1000);
            }} className="gap-2">
              <BellRing className="w-4 h-4" /> Trigger Multiple
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: Global Modals */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">2. Global Modals</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-foreground/60 mb-6">
            Action-requiring dialogs that dim the background. Useful for confirming destructive actions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="danger" 
              className="gap-2"
              onClick={() => openModal({
                title: "Delete Workspace?",
                description: "This will permanently delete the 'Project Alpha' workspace and all its associated data. This action cannot be undone.",
                variant: "danger",
                confirmText: "Yes, Delete It",
                onConfirm: () => addToast("Workspace deleted.", "error")
              })}
            >
              <Trash2 className="w-4 h-4" /> Danger Modal
            </Button>

            <Button 
              variant="secondary" 
              className="gap-2 text-yellow-500 hover:text-yellow-600"
              onClick={() => openModal({
                title: "Downgrade Plan",
                description: "You are about to downgrade your enterprise plan to the free tier. Some features will be disabled immediately.",
                variant: "warning",
                confirmText: "Acknowledge",
                onConfirm: () => addToast("Plan downgraded.", "warning")
              })}
            >
              <ShieldAlert className="w-4 h-4" /> Warning Modal
            </Button>

            <Button 
              variant="primary" 
              className="gap-2"
              onClick={() => openModal({
                title: "Deploy New Architecture",
                description: "Are you sure you want to push the latest Go microservices to production? This will restart the cluster.",
                variant: "info",
                confirmText: "Launch Now",
                onConfirm: () => handleSimulateDataFlow() // Menggabungkan Modal dengan Loading Overlay!
              })}
            >
              <Rocket className="w-4 h-4" /> Info Modal
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Boss (Global Loader) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">3. Non-dismissible Loading Overlays</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-foreground/60 mb-6">
            The ultimate screen-blocking layer. Use this when you absolutely must prevent the user from interacting with the app during a critical data transfer. Features the "Data Stream" animation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" onClick={handleSimulateIndeterminate} className="border-primary/50 text-foreground">
              Simulate Indeterminate (No Progress Bar)
            </Button>
            <Button variant="primary" onClick={handleSimulateDataFlow} className="shadow-primary/30 shadow-lg">
              Simulate Full Data Transfer (With Progress Bar)
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}