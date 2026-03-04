"use client";

import React, { useState } from "react";
import { Save, Building, Shield, Bell, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { CustomSelect } from "@/components/molecules/CustomSelect";
import { FileUploader } from "@/components/molecules/FileUploader";
import { Checkbox } from "@/components/atoms/Checkbox";
import { useToastStore } from "@/store/useToastStore";

// Menu navigasi vertikal untuk Settings
const SETTINGS_TABS = [
  { id: "general", label: "General", icon: Building },
  { id: "security", label: "Security & Auth", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
];

export default function SystemSettingsPage() {
  const { addToast } = useToastStore();
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);

  // State Form General (Siap dikirim ke Backend)
  const [generalData, setGeneralData] = useState({
    companyName: "Asyura Innovations",
    supportEmail: "support@asyura.com",
    timezone: "asia-jakarta",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi proses update ke API
    setTimeout(() => {
      setIsLoading(false);
      addToast(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings updated successfully!`, "success");
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto">
      
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">System Settings</h1>
        <p className="text-foreground/60 text-sm mt-1">Manage your application preferences, security, and billing.</p>
      </div>

      <div className="flex flex-col tablet:flex-row gap-8 items-start">
        
        {/* KOLOM KIRI: Vertical Tabs */}
        <div className="w-full tablet:w-64 shrink-0 flex flex-col gap-1">
          {SETTINGS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left
                  ${isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground/70 hover:bg-card hover:text-foreground"
                  }
                `}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* KOLOM KANAN: Content Area */}
        <div className="flex-1 w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[500px]">
          <form onSubmit={handleSave} className="flex flex-col h-full">
            
            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                
                {/* TAB: GENERAL */}
                {activeTab === "general" && (
                  <motion.div
                    key="general"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 max-w-2xl"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Company Profile</h2>
                      <p className="text-sm text-foreground/60">This information will be displayed publicly on invoices and emails.</p>
                    </div>

                    <div className="space-y-4">
                      <FormField 
                        label="Company Name" 
                        value={generalData.companyName}
                        onChange={(e) => setGeneralData({...generalData, companyName: e.target.value})}
                        required
                      />
                      <FormField 
                        label="Support Email" 
                        type="email"
                        value={generalData.supportEmail}
                        onChange={(e) => setGeneralData({...generalData, supportEmail: e.target.value})}
                        required
                      />
                      <CustomSelect 
                        label="System Timezone"
                        options={[
                          { label: "Asia/Jakarta (GMT+7)", value: "asia-jakarta" },
                          { label: "UTC (Coordinated Universal Time)", value: "utc" },
                          { label: "America/New_York (EST)", value: "est" },
                        ]}
                        value={generalData.timezone}
                        onChange={(val) => setGeneralData({...generalData, timezone: val})}
                      />
                    </div>

                    <div className="pt-2">
                      <FileUploader 
                        label="Brand Logo" 
                        accept="image/png, image/svg+xml" 
                        maxSizeMB={2}
                        helperText="Upload your company logo. Max 2MB, PNG or SVG."
                        onChange={() => {}}
                      />
                    </div>
                  </motion.div>
                )}

                {/* TAB: SECURITY */}
                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 max-w-2xl"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Security Preferences</h2>
                      <p className="text-sm text-foreground/60">Keep your enterprise data safe with strict security policies.</p>
                    </div>

                    <div className="space-y-4 border border-border rounded-lg p-5 bg-background/50">
                      <h3 className="text-sm font-semibold text-foreground mb-3">Two-Factor Authentication (2FA)</h3>
                      <p className="text-sm text-foreground/60 mb-4">
                        Require all administrators to use an authenticator app when signing in.
                      </p>
                      <Button type="button" variant="secondary">Enable 2FA for all Admins</Button>
                    </div>

                    <div className="space-y-4 border border-border rounded-lg p-5 bg-background/50">
                      <h3 className="text-sm font-semibold text-foreground mb-3">Password Policy</h3>
                      <div className="space-y-3">
                        <Checkbox label="Require at least 12 characters" defaultChecked />
                        <Checkbox label="Require at least one uppercase letter and one number" defaultChecked />
                        <Checkbox label="Require password change every 90 days" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB: NOTIFICATIONS (Placeholder) */}
                {activeTab === "notifications" && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-foreground/60">Notification settings will be available here.</p>
                  </motion.div>
                )}

                {/* TAB: BILLING (Placeholder) */}
                {activeTab === "billing" && (
                  <motion.div
                    key="billing"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-foreground/60">Billing and subscription details will be available here.</p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-border bg-background/50 flex justify-end shrink-0">
              <Button type="submit" variant="primary" disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}