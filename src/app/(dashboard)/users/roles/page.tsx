"use client";

import React, { useState } from "react";
import { Shield, Plus, Users, Save, Copy } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/atoms/Table";
import { useToastStore } from "@/store/useToastStore";

// --- 1. Tipe Data ---
type Role = {
  id: string;
  name: string;
  userCount: number;
  description: string;
};

// Modul yang ada di aplikasi kita
const MODULES = [
  "Dashboard Overview",
  "Product Management",
  "Order Management",
  "Transactions",
  "User Management",
  "Roles & Permissions",
  "System Settings"
];

const ACTIONS = ["View", "Create", "Edit", "Delete"];

// Dummy Roles
const DUMMY_ROLES: Role[] = [
  { id: "R-001", name: "Superadmin", userCount: 2, description: "Full access to all system modules and settings." },
  { id: "R-002", name: "Admin", userCount: 5, description: "Access to all modules except Roles & Settings." },
  { id: "R-003", name: "Editor", userCount: 12, description: "Can manage products and content, but cannot delete." },
  { id: "R-004", name: "Viewer", userCount: 45, description: "Read-only access to specific dashboards." },
];

export default function RolesPermissionsPage() {
  const { addToast } = useToastStore();
  const [activeRole, setActiveRole] = useState<Role>(DUMMY_ROLES[0]);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk menyimpan matriks perizinan (Bentuk ideal untuk JSON Payload)
  // Format: { "Product Management-View": true, "Product Management-Edit": false, ... }
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});

  const handleTogglePermission = (module: string, action: string) => {
    const key = `${module}-${action}`;
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveMatrix = () => {
    setIsLoading(true);
    // Simulasi kirim data ke API Go
    setTimeout(() => {
      setIsLoading(false);
      addToast(`Permissions for ${activeRole.name} successfully updated!`, "success");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto">
      
      {/* Header Halaman */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Roles & Permissions</h1>
          <p className="text-foreground/60 text-sm mt-1">Manage what users can see and do across the application.</p>
        </div>
        <Button className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          Create New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 items-start">
        
        {/* KOLOM KIRI: Daftar Roles (Ambil 1 Kolom) */}
        <div className="desktop:col-span-1 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-2">Available Roles</h2>
          
          {DUMMY_ROLES.map((role) => {
            const isActive = activeRole.id === role.id;
            return (
              <div 
                key={role.id}
                onClick={() => setActiveRole(role)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200
                  ${isActive 
                    ? "bg-primary/5 border-primary shadow-sm" 
                    : "bg-card border-border hover:border-primary/50 hover:bg-background"
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${isActive ? "text-primary" : "text-foreground/50"}`} />
                    <span className={`font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>
                      {role.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-foreground/50 bg-background px-2 py-1 rounded-md border border-border">
                    <Users className="w-3 h-3" />
                    {role.userCount}
                  </div>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {role.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* KOLOM KANAN: Permission Matrix (Ambil 3 Kolom) */}
        <div className="desktop:col-span-3 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
          
          {/* Matrix Header */}
          <div className="p-6 border-b border-border flex flex-col tablet:flex-row tablet:items-center justify-between gap-4 bg-background/30">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                Configure: <span className="text-primary">{activeRole.name}</span>
              </h2>
              <p className="text-sm text-foreground/60 mt-1">
                Check the boxes below to grant specific access rights to this role.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="secondary" className="gap-2">
                <Copy className="w-4 h-4" /> Duplicate
              </Button>
              <Button variant="primary" className="gap-2" onClick={handleSaveMatrix} disabled={isLoading}>
                <Save className="w-4 h-4" /> 
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="p-0 overflow-x-auto custom-scrollbar">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow className="bg-background/50">
                  <TableHead className="w-[250px] font-semibold text-foreground">Module Name</TableHead>
                  {ACTIONS.map((action) => (
                    <TableHead key={action} className="text-center font-semibold text-foreground">
                      {action}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {MODULES.map((module, rowIndex) => (
                  <TableRow key={module} className="hover:bg-background/40">
                    <TableCell className="font-medium text-foreground py-4">
                      {module}
                    </TableCell>
                    
                    {ACTIONS.map((action) => {
                      const key = `${module}-${action}`;
                      
                      // Logika UI Khusus: Superadmin otomatis ke-check semua dan di-disable
                      const isSuperadmin = activeRole.name === "Superadmin";
                      const isChecked = isSuperadmin ? true : !!permissions[key];

                      return (
                        <TableCell key={action} className="text-center py-4">
                          <div className="flex justify-center">
                            <Checkbox 
                              checked={isChecked}
                              disabled={isSuperadmin}
                              onChange={() => handleTogglePermission(module, action)}
                            />
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Info Footer */}
          {activeRole.name === "Superadmin" && (
            <div className="p-4 bg-primary/10 border-t border-primary/20 text-primary text-sm font-medium flex items-center justify-center">
              Superadmin has unrestricted access to all modules by default. Matrix cannot be modified.
            </div>
          )}

        </div>
      </div>

    </div>
  );
}