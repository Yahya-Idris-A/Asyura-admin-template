import React from "react";
import { Check } from "lucide-react";

export type TimelineItemProps = {
  title: string;
  description?: string;
  time?: string;
  isCompleted?: boolean;
  isLast?: boolean;
};

export const Timeline = ({ items }: { items: TimelineItemProps[] }) => {
  return (
    <div className="flex flex-col w-full">
      {items.map((item, index) => (
        <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
          
          {/* Garis Vertikal (Kecuali item terakhir) */}
          {!item.isLast && (
            <div className="absolute left-[11px] top-7 bottom-[-8px] w-px bg-border" />
          )}

          {/* Indikator Titik / Ceklis */}
          <div className="relative shrink-0 mt-1">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-background z-10 relative
              ${item.isCompleted ? "border-primary text-primary" : "border-border text-transparent"}
            `}>
              {item.isCompleted && <Check className="w-3 h-3" />}
            </div>
          </div>

          {/* Konten Timeline */}
          <div className="flex flex-col flex-1 min-w-0 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <span className={`text-sm font-semibold ${item.isCompleted ? "text-foreground" : "text-foreground/70"}`}>
                {item.title}
              </span>
              {item.time && (
                <span className="text-xs font-medium text-foreground/50 whitespace-nowrap">
                  {item.time}
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-foreground/60 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

        </div>
      ))}
    </div>
  );
};