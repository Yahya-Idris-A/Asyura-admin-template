"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Hexagon, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { useToastStore } from "@/store/useToastStore"; // Pakai Toast kita!

export default function RequestAccessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToastStore();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
  });

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      addToast("Your access request has been submitted. We will contact you soon!", "success");
      setFormData({ fullName: "", email: "", company: "" }); // Reset form
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      
      {/* KIRI: Visual Branding (Sama seperti Login) */}
      <div className="hidden desktop:flex flex-col justify-between w-1/2 bg-card border-r border-border p-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center gap-2">
          <Hexagon className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl tracking-tight text-foreground">UniDash</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
            Join the future of <br /> operational scale.
          </h1>
          <p className="text-foreground/60 text-lg">
            Request access to our unified enterprise dashboard and streamline your workflow today.
          </p>
        </div>

        <div className="relative z-10 text-sm text-foreground/40 font-medium">
          © 2026 UniDash Architecture. All rights reserved.
        </div>
      </div>

      {/* KANAN: Request Access Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 tablet:p-12 relative overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md space-y-8 my-auto py-8"
        >
          <div className="flex desktop:hidden items-center justify-center gap-2 mb-8">
            <Hexagon className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl tracking-tight">UniDash</span>
          </div>

          <div className="text-center desktop:text-left space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Request Access</h2>
            <p className="text-foreground/60 text-sm">
              Fill out the form below and our team will review your request.
            </p>
          </div>

          <form onSubmit={handleRequest} className="space-y-5">
            <FormField 
              label="Full Name" 
              placeholder="John Doe" 
              required 
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            
            <FormField 
              label="Work Email" 
              type="email" 
              placeholder="name@company.com" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <FormField 
              label="Company Name" 
              placeholder="Acme Corp" 
              required 
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />

            <Button type="submit" className="w-full text-base h-11 mt-2" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
              ) : (
                <>Submit Request <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-foreground/60">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>

    </div>
  );
}