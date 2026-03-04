"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../atoms/Table";
import { Input } from "../atoms/Input";

// Tipe data untuk konfigurasi kolom
export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T | string;
  // Opsional: Jika ingin render custom UI (misal: Badge status)
  cell?: (info: { row: T; value: any }) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchPlaceholder?: string;
  itemsPerPage?: number;
}

export function DataTable<T>({ 
  data, 
  columns, 
  searchPlaceholder = "Search...", 
  itemsPerPage = 5 
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | string; direction: "asc" | "desc" } | null>(null);

  // 1. Logika Filter (Search)
  const filteredData = useMemo(() => {
    if (!search) return data;
    const lowercasedSearch = search.toLowerCase();
    const searchInObject = (obj: any): boolean => {
      if (!obj) return false;
      if (typeof obj === "string" || typeof obj === "number") {
        return obj.toString().toLowerCase().includes(lowercasedSearch);
      }
      if (typeof obj === "object") {
        return Object.values(obj).some(val => searchInObject(val));
      }
      return false;
    };

    return data.filter((item) => searchInObject(item));
  }, [data, search]);

  // 2. Logika Sorting
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = (a as any)[sortConfig.key];
        let bValue = (b as any)[sortConfig.key];
        // Jika value berupa object (seperti kolom user), gabungkan valuenya jadi string agar bisa disortir alfabetis
        if (typeof aValue === "object" && aValue !== null) {
          aValue = Object.values(aValue).join(" ").toLowerCase();
        } else if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
        }

        if (typeof bValue === "object" && bValue !== null) {
          bValue = Object.values(bValue).join(" ").toLowerCase();
        } else if (typeof bValue === "string") {
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // 3. Logika Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof T | string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Table Toolbar (Search) */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset page saat mencari
            }}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table Area */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead 
                key={idx} 
                className={col.sortable !== false ? "cursor-pointer select-none hover:text-foreground" : ""}
                onClick={() => col.sortable !== false && handleSort(col.accessorKey)}
              >
                <div className="flex items-center gap-2">
                  {col.header}
                  {col.sortable !== false && sortConfig?.key === col.accessorKey && (
                    sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => {
                  const cellValue = (row as any)[col.accessorKey];
                  return (
                    <TableCell key={colIndex}>
                      {/* Cek apakah ada custom render, jika tidak tampilkan raw value */}
                      {col.cell ? col.cell({ row, value: cellValue }) : cellValue}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-foreground/50">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <span className="text-sm text-foreground/60">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border border-border rounded-md hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 border border-border rounded-md hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}