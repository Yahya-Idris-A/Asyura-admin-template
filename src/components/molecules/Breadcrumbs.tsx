import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string; // Jika tidak ada href, berarti ini halaman aktif (teks biasa)
};

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm">
      <ol className="flex items-center gap-1.5 tablet:gap-2">
        {/* Ikon Home sebagai awalan */}
        <li>
          <Link href="/home" className="flex items-center text-foreground/50 hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-1.5 tablet:gap-2">
              <ChevronRight className="w-4 h-4 text-foreground/30 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="font-medium text-foreground/50 hover:text-foreground transition-colors truncate max-w-[120px] tablet:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};