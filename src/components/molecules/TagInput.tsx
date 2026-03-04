"use client";

import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Label } from "../atoms/Label";

export interface TagInputProps {
  label?: string;
  placeholder?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  error?: string;
  className?: string;
}

export const TagInput = ({
  label,
  placeholder = "Add a tag and press Enter...",
  tags,
  onChange,
  maxTags = 10,
  error,
  className = "",
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Mencegah form submit kalau ada di dalam <form>
      const newTag = inputValue.trim();
      
      if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
        onChange([...tags, newTag]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      // Hapus tag terakhir kalau user tekan backspace saat input kosong
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && <Label>{label} {tags.length >= maxTags && <span className="text-foreground/50 text-xs ml-1">(Max {maxTags})</span>}</Label>}
      
      <div 
        className={`flex flex-wrap gap-2 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus-within:ring-2 focus-within:ring-offset-2 transition-colors min-h-[40px]
          ${error 
            ? "border-red-500 focus-within:ring-red-500/50" 
            : "border-border focus-within:border-primary focus-within:ring-primary/30"
          }
        `}
      >
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md text-xs font-medium animate-in zoom-in-95"
          >
            {tag}
            <button 
              type="button" 
              onClick={() => removeTag(index)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          disabled={tags.length >= maxTags}
          className="flex-1 bg-transparent min-w-[120px] focus:outline-none disabled:cursor-not-allowed placeholder:text-foreground/50"
        />
      </div>

      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
};