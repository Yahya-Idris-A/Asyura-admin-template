"use client";

import React from "react";
import { Download, ShoppingBag, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { StatsCard } from "@/components/molecules/StatsCard";
import { DataTable, type ColumnDef } from "@/components/organisms/DataTable";
import { ActionMenu } from "@/components/molecules/ActionMenu";

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
};

const dummyOrders: Order[] = [
  { id: "ORD-9912", customerName: "Alice Wonderland", customerEmail: "alice@example.com", date: "Oct 24, 2026", total: 450.00, status: "Delivered" },
  { id: "ORD-9913", customerName: "Bob Builder", customerEmail: "bob@example.com", date: "Oct 25, 2026", total: 129.50, status: "Processing" },
  { id: "ORD-9914", customerName: "Charlie Chaplin", customerEmail: "charlie@example.com", date: "Oct 25, 2026", total: 899.99, status: "Shipped" },
  { id: "ORD-9915", customerName: "Diana Prince", customerEmail: "diana@example.com", date: "Oct 26, 2026", total: 45.00, status: "Pending" },
  { id: "ORD-9916", customerName: "Bruce Wayne", customerEmail: "bruce@example.com", date: "Oct 26, 2026", total: 2450.00, status: "Cancelled" },
];

export default function OrderManagementPage() {
  
  const columns: ColumnDef<Order>[] = [
    { header: "Order ID", accessorKey: "id", cell: ({ value }) => <span className="font-medium text-foreground">{value}</span> },
    { 
      header: "Customer", 
      accessorKey: "customerName",
      cell: ({ row }) => (
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-foreground">{row.customerName}</span>
          <span className="text-xs text-foreground/50">{row.customerEmail}</span>
        </div>
      )
    },
    { header: "Date", accessorKey: "date" },
    { 
      header: "Total", 
      accessorKey: "total",
      cell: ({ value }) => <span className="font-medium">${value.toFixed(2)}</span>
    },
    { 
      header: "Status", 
      accessorKey: "status",
      cell: ({ value }) => {
        const colors = {
          "Pending": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          "Processing": "bg-blue-500/10 text-blue-500 border-blue-500/20",
          "Shipped": "bg-purple-500/10 text-purple-500 border-purple-500/20",
          "Delivered": "bg-green-500/10 text-green-500 border-green-500/20",
          "Cancelled": "bg-red-500/10 text-red-500 border-red-500/20",
        };
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        );
      }
    },
    {
      header: "",
      accessorKey: "actions",
      sortable: false,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <ActionMenu 
            actions={[
              { label: "View Details", icon: ShoppingBag, onClick: () => console.log(`View ${row.id}`) },
              { label: "Update Status", icon: Truck, onClick: () => console.log(`Update ${row.id}`) }
            ]}
          />
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto">
      
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Orders</h1>
          <p className="text-foreground/60 text-sm mt-1">Track and manage customer orders.</p>
        </div>
        <Button variant="secondary" className="gap-2 shrink-0">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 tablet:grid-cols-4 gap-4">
        <StatsCard title="Total Orders" value="2,845" trend={8.2} icon={<ShoppingBag className="w-5 h-5" />} />
        <StatsCard title="Pending" value="45" trend={-1.5} icon={<ShoppingBag className="w-5 h-5 text-yellow-500" />} />
        <StatsCard title="Shipped" value="128" trend={4.1} icon={<Truck className="w-5 h-5 text-purple-500" />} />
        <StatsCard title="Delivered" value="2,540" trend={12.0} icon={<CheckCircle2 className="w-5 h-5 text-green-500" />} />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-6 relative z-10">
        <DataTable data={dummyOrders} columns={columns} searchPlaceholder="Search by Order ID or Customer Name..." itemsPerPage={7} />
      </div>

    </div>
  );
}