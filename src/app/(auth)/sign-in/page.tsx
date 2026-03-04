"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Hexagon, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { loginWithDummyToken } from "@/app/actions/auth";
import { useToastStore } from "@/store/useToastStore";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToastStore();
  
  // State siap tembak ke backend
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi delay jaringan, lalu tembak ke Server Action
    setTimeout(async () => {
      // Fungsi ini akan set cookie HTTP-Only dan otomatis pindah ke /users
      await loginWithDummyToken(formData.email);
      addToast("Login successful!", "success");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      
      {/* KIRI: Visual Branding (Sembunyi di Mobile) */}
      <div className="hidden desktop:flex flex-col justify-between w-1/2 bg-card border-r border-border p-12 relative overflow-hidden">
        {/* Dekorasi Background Halus */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center">
          <img 
            src="/Logo.png" 
            alt="Brand Logo" 
            className="h-10 w-auto object-contain" 
          />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
            Manage your <br /> enterprise ecosystem.
          </h1>
          <p className="text-foreground/60 text-lg">
            A high-performance universal template built for scalability, speed, and beautiful micro-interactions.
          </p>
        </div>

        <div className="relative z-10 text-sm text-foreground/40 font-medium">
          © {new Date().getFullYear()} Asyura. All rights reserved.
        </div>
      </div>

      {/* KANAN: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 tablet:p-12 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md space-y-8"
        >
          {/* Header Mobile Only */}
          <div className="flex desktop:hidden items-center justify-center mb-8">
            <img 
              src="/Logo.png" 
              alt="Brand Logo" 
              className="h-12 w-auto object-contain" 
            />
          </div>

          <div className="text-center desktop:text-left space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="text-foreground/60 text-sm">
              Enter your email and password to access your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <FormField 
                label="Email Address" 
                type="email" 
                placeholder="name@company.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none text-foreground">Password</label>
                  <Link href="#" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <FormField 
                  label="" // Dikosongkan karena label di-custom di atas
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full text-base h-11" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-foreground/60">
            Don't have an account?{" "}
            <Link href="/request-access" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Request access
            </Link>
          </p>
        </motion.div>
      </div>

    </div>
  );
}