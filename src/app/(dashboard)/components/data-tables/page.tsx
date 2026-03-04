"use client";

import React from "react";
import { Download, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Avatar, AvatarGroup } from "@/components/molecules/Avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/atoms/Table";
import { DataTable, type ColumnDef } from "@/components/organisms/DataTable";
import { ActionMenu } from "@/components/molecules/ActionMenu";

// --- DUMMY DATA UNTUK SMART TABLE ---
type SystemUser = {
  id: string;
  user: { name: string; avatar?: string; email: string };
  role: string;
  status: "Active" | "Pending" | "Suspended";
  lastLogin: string;
};

const smartTableData: SystemUser[] = [
  { id: "USR-01", user: { name: "Yahya Idris", email: "yahya@example.com" }, role: "Superadmin", status: "Active", lastLogin: "2 mins ago" },
  { id: "USR-02", user: { name: "Sarah Connor", email: "sarah@example.com", avatar: "https://i.pravatar.cc/150?u=sarah" }, role: "Editor", status: "Active", lastLogin: "1 hour ago" },
  { id: "USR-03", user: { name: "John Smith", email: "john@example.com" }, role: "Viewer", status: "Pending", lastLogin: "Never" },
  { id: "USR-04", user: { name: "Jane Doe", email: "jane@example.com", avatar: "https://i.pravatar.cc/150?u=jane" }, role: "Admin", status: "Suspended", lastLogin: "5 days ago" },
];

export default function DataTablesComponentPage() {

  // Konfigurasi Kolom Smart Table
  const columns: ColumnDef<SystemUser>[] = [
    {
      header: "User",
      accessorKey: "user",
      cell: ({ value }) => (
        <div className="flex items-center gap-3">
          <Avatar fallback={value.name} src={value.avatar} size="sm" />
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-foreground truncate">{value.name}</span>
            <span className="text-xs text-foreground/50 truncate">{value.email}</span>
          </div>
        </div>
      )
    },
    { header: "Role", accessorKey: "role" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ value }) => {
        const variantMap: Record<string, "success" | "warning" | "danger"> = {
          Active: "success",
          Pending: "warning",
          Suspended: "danger"
        };
        return <Badge variant={variantMap[value as string]}>{value}</Badge>;
      }
    },
    { header: "Last Login", accessorKey: "lastLogin" },
    {
      header: "",
      accessorKey: "actions",
      sortable: false,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <ActionMenu 
            actions={[
              { label: "Edit Record", icon: Edit, onClick: () => alert(`Edit ${row.user.name}`) },
              { label: "Delete", icon: Trash2, variant: "danger", onClick: () => alert(`Delete ${row.user.name}`) }
            ]}
          />
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto pb-12">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Data Tables & Display</h1>
        <p className="text-foreground/60 text-sm mt-1">
          A collection of components used to display, format, and interact with large datasets.
        </p>
      </div>

      {/* SECTION 1: Status Badges & Pills */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">1. Badges & Pills</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success / Active</Badge>
            <Badge variant="warning">Warning / Pending</Badge>
            <Badge variant="danger">Danger / Error</Badge>
            <Badge variant="outline">Outline / Draft</Badge>
          </div>
        </div>
      </section>

      {/* SECTION 2: Avatars */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">2. User Avatars</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col tablet:flex-row gap-8">
          
          <div className="space-y-3">
            <p className="text-sm text-foreground/60 font-medium">Sizes & Fallbacks</p>
            <div className="flex items-end gap-4">
              <Avatar fallback="SM" size="sm" />
              <Avatar fallback="MD" size="md" />
              <Avatar fallback="LG" size="lg" />
              <Avatar src="https://i.pravatar.cc/150?u=demo" fallback="DM" size="lg" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-foreground/60 font-medium">Avatar Groups (Overlapping)</p>
            <AvatarGroup max={3}>
              <Avatar src="https://i.pravatar.cc/150?u=1" fallback="U1" />
              <Avatar src="https://i.pravatar.cc/150?u=2" fallback="U2" />
              <Avatar src="https://i.pravatar.cc/150?u=3" fallback="U3" />
              <Avatar fallback="U4" />
              <Avatar fallback="U5" />
            </AvatarGroup>
          </div>

        </div>
      </section>

      {/* SECTION 3: Basic Table Primitives */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">3. Table Primitives (Static)</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-foreground/60 mb-4">
            Raw UI components for building custom table layouts without the overhead of client-side sorting/pagination.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell><Badge variant="success">Paid</Badge></TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell><Badge variant="warning">Pending</Badge></TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* SECTION 4: Smart Data Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">4. Smart Data Table (Integrated)</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-foreground/60">
            A fully featured client-side table with global search, column sorting, pagination, and integrated Action Menus. Ready to be mapped to JSON API responses.
          </p>
          <div className="border border-border rounded-lg overflow-hidden">
            <DataTable 
              data={smartTableData} 
              columns={columns} 
              searchPlaceholder="Search users..." 
              itemsPerPage={3} 
            />
          </div>
        </div>
      </section>

    </div>
  );
}