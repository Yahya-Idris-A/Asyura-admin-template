"use client";

import React from "react";
import { Download, ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Wallet } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { StatsCard } from "@/components/molecules/StatsCard";
import { DataTable, type ColumnDef } from "@/components/organisms/DataTable";
import { ActionMenu } from "@/components/molecules/ActionMenu";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";

// --- 1. Tipe Data Transaksi ---
type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  status: "Completed" | "Pending" | "Failed";
};

// --- 2. Dummy Data (Bentuk JSON standar API) ---
const dummyTransactions: Transaction[] = [
  { id: "TRX-10092", date: "Oct 26, 2026", description: "Payment from Alice Wonderland", category: "Sales", amount: 450.00, type: "income", status: "Completed" },
  { id: "TRX-10091", date: "Oct 25, 2026", description: "AWS Cloud Hosting", category: "Infrastructure", amount: -129.50, type: "expense", status: "Completed" },
  { id: "TRX-10090", date: "Oct 25, 2026", description: "Payment from Charlie Chaplin", category: "Sales", amount: 899.99, type: "income", status: "Pending" },
  { id: "TRX-10089", date: "Oct 24, 2026", description: "Office Supplies", category: "Operational", amount: -45.00, type: "expense", status: "Completed" },
  { id: "TRX-10088", date: "Oct 24, 2026", description: "Refund for Bruce Wayne", category: "Refund", amount: -245.00, type: "expense", status: "Failed" },
];

// --- 3. Dummy Data untuk Chart ---
const chartData = [
  { name: "Mon", income: 4000, expense: 2400 },
  { name: "Tue", income: 3000, expense: 1398 },
  { name: "Wed", income: 2000, expense: 9800 },
  { name: "Thu", income: 2780, expense: 3908 },
  { name: "Fri", income: 1890, expense: 4800 },
  { name: "Sat", income: 2390, expense: 3800 },
  { name: "Sun", income: 3490, expense: 4300 },
];

export default function TransactionsPage() {
  
  // --- 4. Konfigurasi Kolom Buku Kas (Ledger) ---
  const columns: ColumnDef<Transaction>[] = [
    { 
      header: "Transaction", 
      accessorKey: "description",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full shrink-0 ${row.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {row.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-foreground truncate max-w-[200px]">{row.description}</span>
            <span className="text-xs text-foreground/50">{row.id} • {row.date}</span>
          </div>
        </div>
      )
    },
    { header: "Category", accessorKey: "category" },
    { 
      header: "Status", 
      accessorKey: "status",
      cell: ({ value }) => {
        const colors = {
          "Completed": "bg-green-500/10 text-green-500 border-green-500/20",
          "Pending": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          "Failed": "bg-red-500/10 text-red-500 border-red-500/20",
        };
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        );
      }
    },
    { 
      header: "Amount", 
      accessorKey: "amount",
      // Custom render untuk mengubah warna angka berdasarkan plus/minus
      cell: ({ row }) => (
        <span className={`font-medium ${row.type === 'income' ? 'text-green-500' : 'text-foreground'}`}>
          {row.type === 'income' ? '+' : ''}{row.amount < 0 ? `-$${Math.abs(row.amount).toFixed(2)}` : `$${row.amount.toFixed(2)}`}
        </span>
      )
    },
    {
      header: "",
      accessorKey: "actions",
      sortable: false,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <ActionMenu 
            actions={[
              { label: "View Invoice", icon: Download, onClick: () => console.log(`Invoice ${row.id}`) },
              { label: "Report Issue", icon: Wallet, variant: "danger", onClick: () => console.log(`Report ${row.id}`) }
            ]}
          />
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto">
      
      {/* Header Halaman */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Transactions</h1>
          <p className="text-foreground/60 text-sm mt-1">Monitor your cash flow, incoming payments, and expenses.</p>
        </div>
        <Button variant="secondary" className="gap-2 shrink-0">
          <Download className="w-4 h-4" />
          Download Statement
        </Button>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
        <StatsCard title="Current Balance" value="$124,563.00" trend={12.5} icon={<Wallet className="w-5 h-5" />} />
        <StatsCard title="Total Income" value="+$14,230.50" trend={8.2} icon={<ArrowUpRight className="w-5 h-5 text-green-500" />} />
        <StatsCard title="Total Expenses" value="-$3,450.20" trend={-2.4} icon={<ArrowDownRight className="w-5 h-5 text-red-500" />} />
      </div>

      {/* Area Tengah: Chart & Ringkasan */}
      <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
        
        {/* Chart Cash Flow (Ambil 2 Kolom) */}
        <div className="desktop:col-span-2 bg-card border border-border rounded-xl shadow-sm p-6 flex flex-col h-[400px]">
          <div className="mb-6">
            <h2 className="font-semibold text-foreground">Cash Flow Overview</h2>
            <p className="text-sm text-foreground/60">Income vs Expenses over the last 7 days.</p>
          </div>
          <div className="flex-1 w-full h-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="currentColor" className="text-foreground/50 text-xs" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" className="text-foreground/50 text-xs" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{ fill: 'var(--color-border)', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-foreground)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Transfer / Action Box (Ambil 1 Kolom) */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-6 flex flex-col">
          <h2 className="font-semibold text-foreground mb-4">Quick Action</h2>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">UniDash Corporate Card</p>
              <p className="text-xs text-foreground/60">**** **** **** 4092</p>
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-4 flex-1">
            Need to pay vendors or transfer funds to your operational bank account? Initiate a quick transfer here.
          </p>
          <Button className="w-full">Make a Transfer</Button>
        </div>
      </div>

      {/* Tabel Riwayat Transaksi */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6 relative z-10">
        <h2 className="font-semibold text-foreground mb-4">Recent Transactions</h2>
        <DataTable data={dummyTransactions} columns={columns} searchPlaceholder="Search by description or TRX ID..." itemsPerPage={5} />
      </div>

    </div>
  );
}