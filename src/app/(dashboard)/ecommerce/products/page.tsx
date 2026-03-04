"use client";

import { Plus, Package, Archive, Box } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { StatsCard } from "@/components/molecules/StatsCard";
import { DataTable, type ColumnDef } from "@/components/organisms/DataTable";
import { ActionMenu } from "@/components/molecules/ActionMenu";
import { useRouter } from "next/navigation";

// 1. Tipe Data Produk
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

// 2. Dummy Data
const dummyProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 299.99,
    stock: 145,
    status: "In Stock",
  },
  {
    id: "PRD-002",
    name: "Mechanical Keyboard Pro",
    category: "Electronics",
    price: 129.5,
    stock: 12,
    status: "Low Stock",
  },
  {
    id: "PRD-003",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 199.0,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PRD-004",
    name: "Smart Watch Series 8",
    category: "Wearables",
    price: 399.0,
    stock: 89,
    status: "In Stock",
  },
  {
    id: "PRD-005",
    name: "USB-C Hub Multiport Adapter",
    category: "Accessories",
    price: 45.0,
    stock: 350,
    status: "In Stock",
  },
];

export default function ProductListPage() {
  const router = useRouter();

  // 3. Konfigurasi Kolom Tabel
  const columns: ColumnDef<Product>[] = [
    {
      header: "Product Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {/* Thumbnail Placeholder */}
          <div className="w-10 h-10 rounded-md bg-foreground/5 border border-border flex items-center justify-center text-foreground/40 shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-foreground truncate max-w-[250px]">
              {row.name}
            </span>
            <span className="text-xs text-foreground/50">{row.id}</span>
          </div>
        </div>
      ),
    },
    { header: "Category", accessorKey: "category" },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ value }) => (
        <span className="font-medium">${value.toFixed(2)}</span>
      ),
    },
    { header: "Stock", accessorKey: "stock" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ value }) => {
        const colors = {
          "In Stock": "bg-green-500/10 text-green-500 border-green-500/20",
          "Low Stock": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          "Out of Stock": "bg-red-500/10 text-red-500 border-red-500/20",
        };
        return (
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colors[value as keyof typeof colors]}`}
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
                label: "Edit Product",
                icon: Package,
                onClick: () => console.log(`Edit ${row.name}`),
              },
              {
                label: "Archive",
                icon: Archive,
                variant: "danger",
                onClick: () => console.log(`Archive ${row.name}`),
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Products
          </h1>
          <p className="text-foreground/60 text-sm mt-1">
            Manage your catalog, pricing, and inventory.
          </p>
        </div>
        <Button
          className="gap-2 shrink-0"
          onClick={() => router.push("/ecommerce/products/create")}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Area */}
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
        <StatsCard
          title="Total Products"
          value="1,245"
          trend={12.5}
          icon={<Box className="w-5 h-5" />}
        />
        <StatsCard
          title="Low Stock Items"
          value="12"
          trend={-2.4}
          icon={<Package className="w-5 h-5" />}
        />
        <StatsCard
          title="Out of Stock"
          value="3"
          trend={0}
          icon={<Archive className="w-5 h-5" />}
        />
      </div>

      {/* Table Area */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6 relative z-10">
        <DataTable
          data={dummyProducts}
          columns={columns}
          searchPlaceholder="Search products by name or ID..."
        />
      </div>
    </div>
  );
}
