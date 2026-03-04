"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, File as FileIcon, Image as ImageIcon } from "lucide-react";
import { Label } from "../atoms/Label";

export interface FileUploaderProps {
  label?: string;
  accept?: string; // cth: ".jpg,.png,.pdf" atau "image/*"
  maxFiles?: number;
  maxSizeMB?: number;
  onChange: (files: File[]) => void;
  helperText?: string;
}

export const FileUploader = ({
  label,
  accept = "*",
  maxFiles = 1,
  maxSizeMB = 5,
  onChange,
  helperText,
}: FileUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: File[]) => {
    setErrorMsg(null);
    let validFiles = [...selectedFiles];
    
    for (const file of newFiles) {
      // Validasi Ukuran
      if (file.size > maxSizeMB * 1024 * 1024) {
        setErrorMsg(`File "${file.name}" terlalu besar. Maksimal ${maxSizeMB}MB.`);
        continue;
      }
      
      // Mencegah duplikat berdasarkan nama & ukuran (sederhana)
      if (validFiles.find((f) => f.name === file.name && f.size === file.size)) continue;
      
      validFiles.push(file);
    }

    // Validasi Maksimal File
    if (validFiles.length > maxFiles) {
      setErrorMsg(`Maksimal hanya boleh mengunggah ${maxFiles} file.`);
      validFiles = validFiles.slice(0, maxFiles);
    }

    setSelectedFiles(validFiles);
    onChange(validFiles);
  }, [selectedFiles, maxFiles, maxSizeMB, onChange]);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter((_, idx) => idx !== indexToRemove);
    setSelectedFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label>{label}</Label>}

      {/* Drag & Drop Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors
          ${errorMsg ? "border-red-500 bg-red-500/5 hover:bg-red-500/10" : "border-border hover:border-primary hover:bg-primary/5 bg-card"}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={(e) => {
            if (e.target.files) handleFiles(Array.from(e.target.files));
            // Reset input value agar bisa upload file yang sama jika habis dihapus
            e.target.value = ''; 
          }}
        />
        
        <div className="p-3 bg-background rounded-full mb-3 shadow-sm text-foreground/60">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-foreground text-center">
          Click to upload <span className="font-normal text-foreground/60">or drag and drop</span>
        </p>
        <p className="text-xs text-foreground/50 mt-1 text-center">
          {accept === "*" ? "Semua jenis file didukung" : `Format: ${accept}`} (Max. {maxSizeMB}MB)
        </p>
      </div>

      {errorMsg && <p className="text-xs text-red-500 font-medium">{errorMsg}</p>}
      {helperText && !errorMsg && <p className="text-xs text-foreground/50">{helperText}</p>}

      {/* Preview Area */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex flex-col gap-2 mt-2">
            {selectedFiles.map((file, idx) => {
              const isImage = file.type.startsWith("image/");
              return (
                <motion.div 
                  key={`${file.name}-${idx}`}
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {/* Thumbnail/Icon */}
                    <div className="w-10 h-10 shrink-0 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden">
                      {isImage ? (
                        <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                      ) : (
                        <FileIcon className="w-5 h-5 text-foreground/50" />
                      )}
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-foreground truncate max-w-[200px]">{file.name}</span>
                      <span className="text-xs text-foreground/50">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                    className="p-1.5 text-foreground/50 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};