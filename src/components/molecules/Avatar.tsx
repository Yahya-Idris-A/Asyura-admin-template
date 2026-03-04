"use client";

import React, { useState } from "react";

// --- 1. Komponen Single Avatar ---
export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string; // Contoh: "YI" untuk Yahya Idris
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Avatar = ({ src, alt, fallback, size = "md", className = "" }: AvatarProps) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div className={`relative flex shrink-0 overflow-hidden rounded-full bg-primary/20 border border-background flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt || fallback}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-semibold text-primary uppercase tracking-wider">
          {fallback.substring(0, 2)}
        </span>
      )}
    </div>
  );
};

// --- 2. Komponen Avatar Group (Efek Tumpuk) ---
export const AvatarGroup = ({ children, max = 4 }: { children: React.ReactNode, max?: number }) => {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = childrenArray.slice(0, max);
  const extraAvatars = childrenArray.length - max;

  return (
    <div className="flex items-center -space-x-3">
      {visibleAvatars}
      {extraAvatars > 0 && (
        <div className="relative flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-background border border-border text-xs font-medium text-foreground/70 z-10">
          +{extraAvatars}
        </div>
      )}
    </div>
  );
};