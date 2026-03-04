// src/app/users/page.tsx
"use client";

import { useState } from "react";
import { Plus, Users, UserCheck, UserX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import Komponen Kita
import { StatsCard } from "@/components/molecules/StatsCard";
import { FormField } from "@/components/molecules/FormField";
import { CustomSelect } from "@/components/molecules/CustomSelect";
import { FileUploader } from "@/components/molecules/FileUploader";
import { Button } from "@/components/atoms/Button";
import { DataTable, type ColumnDef } from "@/components/organisms/DataTable";
import { ActionMenu } from "@/components/molecules/ActionMenu";
import { useToastStore } from "@/store/useToastStore";
import { useModalStore } from "@/store/useModalStore";

// --- 1. Tipe Data & Dummy Data (Nanti diganti fetch dari API PostgreSQL) ---
type UserData = {
  id: string;
  name: string;
  role: string;
  status: "Active" | "Inactive";
  avatarUrl?: string;
};

const initialUsers: UserData[] = [
  {
    id: "USR-001",
    name: "Yahya Idris A.",
    role: "Superadmin",
    status: "Active",
  },
  { id: "USR-002", name: "Sarah Connor", role: "Editor", status: "Active" },
  { id: "USR-003", name: "John Smith", role: "Viewer", status: "Inactive" },
  { id: "USR-004", name: "Jane Doe", role: "Editor", status: "Active" },
  { id: "USR-005", name: "Alan Turing", role: "Admin", status: "Inactive" },
];

export default function UserManagementPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormAnimationDone, setIsFormAnimationDone] = useState(false);
  const [users, setUsers] = useState<UserData[]>(initialUsers);

  const { addToast } = useToastStore();
  const { openModal } = useModalStore();

  // State untuk Form
  const [newRole, setNewRole] = useState("");

  // --- 2. Konfigurasi Kolom Tabel ---
  const columns: ColumnDef<UserData>[] = [
    { header: "User ID", accessorKey: "id" },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
            {row.name.charAt(0)}
          </div>
          <span className="font-medium text-foreground">{row.name}</span>
        </div>
      ),
    },
    { header: "Role", accessorKey: "role" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ value }) => {
        const isActive = value === "Active";
        return (
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${isActive ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      header: "",
      accessorKey: "actions",
      sortable: false,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <ActionMenu
            actions={[
              {
                label: "Edit User",
                icon: UserCheck,
                onClick: () => alert(`Edit ${row.name}`),
              },
              {
                label: "Deactivate",
                icon: UserX,
                variant: "danger",
                onClick: () => {
                  // Panggil Global Modal di sini
                  openModal({
                    title: "Deactivate User",
                    description: `Are you sure you want to deactivate ${row.name}? They will lose access to the system immediately.`,
                    variant: "danger",
                    confirmText: "Yes, Deactivate",
                    onConfirm: () => {
                      // Di sini tempat lo nembak endpoint DELETE /api/users/:id ke backend Go lo
                      console.log(
                        `Menghapus data user ${row.id} ke database...`,
                      );

                      // Tampilkan Toast sukses setelah selesai
                      addToast(
                        `${row.name} has been deactivated successfully.`,
                        "success",
                      );
                    },
                  });
                },
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto">
      {/* Header Halaman & Tombol Aksi */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            User Management
          </h1>
          <p className="text-foreground/60 text-sm mt-1">
            Manage system access, roles, and user data.
          </p>
        </div>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          {isFormOpen ? "Cancel" : "Add New User"}
        </Button>
      </div>

      {/* Ringkasan Stats */}
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
        <StatsCard
          title="Total Users"
          value={users.length.toString()}
          trend={5.2}
          icon={<Users className="w-5 h-5" />}
        />
        <StatsCard
          title="Active Users"
          value={users.filter((u) => u.status === "Active").length.toString()}
          trend={12.5}
          icon={<UserCheck className="w-5 h-5" />}
        />
        <StatsCard
          title="Inactive Users"
          value={users.filter((u) => u.status === "Inactive").length.toString()}
          trend={-2.4}
          icon={<UserX className="w-5 h-5" />}
        />
      </div>

      {/* Area Expandable Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onAnimationStart={() => setIsFormAnimationDone(false)}
            onAnimationComplete={() => setIsFormAnimationDone(true)}
            className={`relative z-20 mb-4 ${isFormAnimationDone ? "overflow-visible" : "overflow-hidden"}`}
          >
            <div className="p-6 bg-card border border-border rounded-xl shadow-sm mb-2">
              <h2 className="text-lg font-semibold mb-4">Create New User</h2>
              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                {/* Kolom Kiri: Input Basic */}
                <div className="space-y-4">
                  <FormField
                    label="Full Name"
                    placeholder="Enter full name..."
                    required
                  />
                  <FormField
                    label="Email Address"
                    type="email"
                    placeholder="user@company.com"
                    required
                  />
                  <CustomSelect
                    label="Assign Role"
                    options={[
                      { label: "Superadmin", value: "Superadmin" },
                      { label: "Admin", value: "Admin" },
                      { label: "Editor", value: "Editor" },
                      { label: "Viewer", value: "Viewer" },
                    ]}
                    value={newRole}
                    onChange={setNewRole}
                  />
                </div>

                {/* Kolom Kanan: Uploader & Submit */}
                <div className="space-y-4 flex flex-col justify-between">
                  <FileUploader
                    label="Profile Picture (Optional)"
                    accept="image/png, image/jpeg"
                    maxSizeMB={2}
                    onChange={(files) => console.log(files)}
                  />
                  <div className="flex justify-end pt-4">
                    <Button
                      variant="primary"
                      onClick={() =>
                        addToast(
                          "New user successfully created!",
                          "success",
                          6000,
                        )
                      }
                    >
                      Save User
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Area Smart Data Table */}
      <div className="relative z-10 bg-card border border-border rounded-xl shadow-sm p-6">
        <DataTable
          data={users}
          columns={columns}
          searchPlaceholder="Search users by name, role, or ID..."
        />
      </div>
    </div>
  );
}
