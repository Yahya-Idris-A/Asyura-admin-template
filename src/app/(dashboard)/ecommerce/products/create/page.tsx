"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { Textarea } from "@/components/atoms/Textarea";
import { Label } from "@/components/atoms/Label";
import { CustomSelect } from "@/components/molecules/CustomSelect";
import { FileUploader } from "@/components/molecules/FileUploader";
import { useToastStore } from "@/store/useToastStore";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/useLoadingStore";

export default function CreateProductPage() {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { showLoading, updateProgress, hideLoading } = useLoadingStore();
  const [isLoading, setIsLoading] = useState(false);

  // State Form (Siap di-JSON-kan untuk dikirim ke Backend Go/PostgreSQL)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    discountPrice: "",
    sku: "",
    stock: "",
  });
  
  const [category, setCategory] = useState("electronics");
  const [status, setStatus] = useState("draft");
  const [images, setImages] = useState<File[]>([]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    showLoading("Uploading data to server...", 0);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      updateProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        // 3. Proses selesai, lepas kuncian layar
        hideLoading();
        setIsLoading(false);
        addToast("Product successfully created!", "success");
        router.push("/ecommerce/products");
      }
    }, 50);
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto">
      
      {/* Header Halaman */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-4 mb-2">
        
        {/* Judul & Tombol Back */}
        <div className="flex items-center gap-3">
          <Link href="/ecommerce/products" className="p-2 border border-border rounded-lg text-foreground/60 hover:text-foreground hover:bg-card transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl tablet:text-2xl font-bold tracking-tight text-foreground truncate">Add New Product</h1>
            <p className="text-foreground/60 text-xs tablet:text-sm mt-0.5 truncate">Create a new product for your catalog.</p>
          </div>
        </div>

        {/* Action Buttons (Full width di Mobile) */}
        <div className="flex items-center gap-2 w-full tablet:w-auto">
          <Button type="button" variant="secondary" className="flex-1 tablet:flex-none justify-center" onClick={() => router.push("/ecommerce/products")}>
            <X className="w-4 h-4 mr-1 tablet:mr-2" /> Discard
          </Button>
          <Button type="submit" variant="primary" className="flex-1 tablet:flex-none justify-center" disabled={isLoading}>
            <Save className="w-4 h-4 mr-1 tablet:mr-2" /> 
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
        
      </div>

      {/* Area Form: Grid 2 Kolom (Kiri Besar, Kanan Kecil) */}
      <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI: Info Utama */}
        <div className="desktop:col-span-2 space-y-6">
          
          {/* Section: General Info */}
          <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-semibold border-b border-border pb-4">General Information</h2>
            <FormField 
              label="Product Name" 
              placeholder="e.g. Wireless Noise-Cancelling Headphones" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <div className="flex flex-col gap-2">
              <Label required>Product Description</Label>
              <Textarea 
                placeholder="Write a detailed description..." 
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          {/* Section: Pricing & Inventory */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
              <h2 className="text-lg font-semibold border-b border-border pb-4">Pricing</h2>
              <FormField 
                label="Base Price ($)" 
                type="number" 
                placeholder="0.00" 
                required
                value={formData.basePrice}
                onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
              />
              <FormField 
                label="Discounted Price ($)" 
                type="number" 
                placeholder="0.00"
                helperText="Leave blank if no discount."
                value={formData.discountPrice}
                onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
              />
            </div>
            
            <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
              <h2 className="text-lg font-semibold border-b border-border pb-4">Inventory</h2>
              <FormField 
                label="SKU (Stock Keeping Unit)" 
                placeholder="e.g. PRD-ELEC-001" 
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
              />
              <FormField 
                label="Stock Quantity" 
                type="number" 
                placeholder="0" 
                required
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
              />
            </div>
          </div>

        </div>

        {/* KOLOM KANAN: Media & Organisasi */}
        <div className="space-y-6">
          
          {/* Section: Product Media */}
          <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-semibold border-b border-border pb-4">Product Images</h2>
            <FileUploader 
              accept="image/png, image/jpeg, image/webp" 
              maxSizeMB={5} 
              maxFiles={4}
              onChange={setImages}
              helperText="Upload up to 4 images. Recommended size: 1080x1080px."
            />
          </div>

          {/* Section: Organization */}
          <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-semibold border-b border-border pb-4">Organization</h2>
            
            <CustomSelect 
              label="Product Status"
              options={[
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
                { label: "Hidden", value: "hidden" },
              ]}
              value={status}
              onChange={setStatus}
            />

            <CustomSelect 
              label="Category"
              options={[
                { label: "Electronics", value: "electronics" },
                { label: "Furniture", value: "furniture" },
                { label: "Wearables", value: "wearables" },
                { label: "Accessories", value: "accessories" },
              ]}
              value={category}
              onChange={setCategory}
            />
          </div>

        </div>
      </div>
    </form>
  );
}